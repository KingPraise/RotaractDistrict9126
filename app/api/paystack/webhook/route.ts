import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-paystack-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const payload = await req.text();
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret) {
      console.error('PAYSTACK_SECRET_KEY is missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac('sha512', secret)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(payload);

    if (event.event === 'charge.success') {
      const data = event.data;
      const { customer, metadata, amount, reference, channel, paid_at } = data;
      
      const email = customer?.email;
      const memberId = metadata?.memberId;
      const sessionYear = metadata?.sessionYear || '2026/2027';

      if (!memberId && !email) {
        return NextResponse.json({ error: 'Missing member identification' }, { status: 400 });
      }

      let targetUserId = memberId;

      if (!targetUserId && email) {
        const usersSnap = await adminDb.collection('users').where('email', '==', email.toLowerCase()).get();
        if (!usersSnap.empty) {
          targetUserId = usersSnap.docs[0].id;
        }
      }

      if (!targetUserId) {
        return NextResponse.json({ error: 'Member not found' }, { status: 404 });
      }

      const userRef = adminDb.collection('users').doc(targetUserId);
      const userDoc = await userRef.get();
      
      if (!userDoc.exists) {
        return NextResponse.json({ error: 'Member not found' }, { status: 404 });
      }

      const userData = userDoc.data();
      const clubId = userData?.clubId || '';
      const targetUserName = `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim() || 'Rotaract Member';
      
      const realAmount = amount / 100; // Convert kobo to naira
      const timestamp = new Date().toISOString();

      // 1. Update User Document
      await userRef.set({
        duesStatus: 'cleared',
        duesPaidAt: paid_at || timestamp,
        updatedAt: timestamp
      }, { merge: true });

      // Sync to auth_users if needed
      try {
        await adminDb.collection('auth_users').doc(targetUserId).set({
          duesStatus: 'cleared',
          updatedAt: timestamp
        }, { merge: true });
      } catch {
        // non-critical
      }

      // 2. Insert into dues_payments
      await adminDb.collection('dues_payments').doc(reference).set({
        memberId: targetUserId,
        name: targetUserName,
        email: email,
        clubId: clubId,
        amount: realAmount,
        currency: 'NGN',
        reference: reference,
        channel: channel,
        sessionYear: sessionYear,
        status: 'cleared',
        paidAt: paid_at || timestamp,
        createdAt: timestamp
      });

      // 3. Immutable Audit Log
      await adminDb.collection('dues_audit_log').add({
        targetUserId: targetUserId,
        memberId: targetUserId,
        targetUserName: targetUserName,
        clubId: clubId,
        previousStatus: userData?.duesStatus || 'pending',
        newStatus: 'cleared',
        modifiedBy: 'SYSTEM',
        clearedBy: 'PAYSTACK_WEBHOOK',
        modifiedByName: 'Paystack Automated Reconciliation',
        modifiedByRole: 'system',
        reference: reference,
        amount: realAmount,
        timestamp: timestamp,
        createdAt: timestamp,
        updatedAt: timestamp,
        reason: 'Automated clearance via Paystack successful transaction'
      });
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
