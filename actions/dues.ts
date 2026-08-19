'use server';

import { adminDb, verifyAuthToken, getUserProfile } from '@/lib/firebase/admin';
import { ActionResult, DuesStatus, User } from '@/types';

/**
 * Toggle or update a member's dues status.
 * Security: Caller must be a District Admin OR the President of the target member's club.
 *
 * @param targetUserId - ID of the member whose dues are being updated
 * @param newStatus - 'cleared' | 'pending'
 * @param callerToken - Firebase Auth ID token of the user executing the action
 */
export async function toggleMemberDues(
  targetUserId: string,
  newStatus: DuesStatus,
  callerToken?: string
): Promise<ActionResult<{ userId: string; duesStatus: DuesStatus; auditLogId: string; updatedAt: string }>> {
  try {
    if (!targetUserId || !newStatus) {
      return { success: false, error: 'Missing required parameters: targetUserId and newStatus.' };
    }

    if (newStatus !== 'cleared' && newStatus !== 'pending') {
      return { success: false, error: 'Invalid dues status. Must be "cleared" or "pending".' };
    }

    let callerProfile: User | null = null;

    // Auth & RBAC Check
    if (callerToken) {
      const decodedToken = await verifyAuthToken(callerToken);
      if (!decodedToken) {
        return { success: false, error: 'Unauthorized: Invalid authentication session.' };
      }

      callerProfile = await getUserProfile(decodedToken.uid);
      if (!callerProfile) {
        return { success: false, error: 'Caller user profile not found.' };
      }

      const targetProfile = await getUserProfile(targetUserId);
      if (!targetProfile) {
        return { success: false, error: 'Target member profile not found.' };
      }

      const isDistrictAdmin = callerProfile.role === 'district_admin';
      const isClubPresident = callerProfile.role === 'president' && callerProfile.clubId === targetProfile.clubId;

      if (!isDistrictAdmin && !isClubPresident) {
        return {
          success: false,
          error: 'Forbidden: Only the Club President or a District Admin can modify dues clearance.',
        };
      }
    }

    const targetProfile = await getUserProfile(targetUserId);
    const updatedAt = new Date().toISOString();

    // 1. Update in Firestore `users` collection
    await adminDb.collection('users').doc(targetUserId).set({
      duesStatus: newStatus,
      updatedAt,
    }, { merge: true });

    // Also sync to `auth_users` if exists
    try {
      await adminDb.collection('auth_users').doc(targetUserId).set({
        duesStatus: newStatus,
        updatedAt,
      }, { merge: true });
    } catch {
      // Non-critical fallback
    }

    // 2. Append immutable audit log to `dues_audit_log`
    const targetUserName = targetProfile
      ? `${targetProfile.firstName || ''} ${targetProfile.lastName || ''}`.trim() || 'Rotaract Member'
      : 'Rotaract Member';

    const modifiedBy = callerProfile?.userId || 'system_admin';
    const modifiedByName = callerProfile
      ? `${callerProfile.firstName || ''} ${callerProfile.lastName || ''}`.trim() || 'District Officer'
      : 'District Officer';
    const modifiedByRole = callerProfile?.role || 'district_admin';

    const auditDocRef = await adminDb.collection('dues_audit_log').add({
      targetUserId,
      memberId: targetUserId,
      targetUserName,
      clubId: targetProfile?.clubId || '',
      previousStatus: targetProfile?.duesStatus || 'pending',
      newStatus,
      modifiedBy,
      clearedBy: modifiedByName,
      modifiedByName,
      modifiedByRole,
      timestamp: updatedAt,
      createdAt: updatedAt,
      updatedAt,
      reason: `Administrative clearance update to ${newStatus}`,
    });

    return {
      success: true,
      data: {
        userId: targetUserId,
        duesStatus: newStatus,
        auditLogId: auditDocRef.id,
        updatedAt,
      },
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error in toggleMemberDues:', error);
    return {
      success: false,
      error: `Failed to update dues status: ${errMessage}`,
    };
  }
}

/**
 * Fetch dues roster for a specific club
 */
export async function getClubDuesRoster(
  clubId: string,
  callerToken?: string
): Promise<ActionResult<User[]>> {
  try {
    if (!clubId) {
      return { success: false, error: 'Club ID is required.' };
    }

    if (callerToken) {
      const decodedToken = await verifyAuthToken(callerToken);
      if (!decodedToken) {
        return { success: false, error: 'Unauthorized access.' };
      }
    }

    const snapshot = await adminDb
      .collection('users')
      .where('clubId', '==', clubId)
      .get();

    const members: User[] = snapshot.docs.map((doc) => ({
      userId: doc.id,
      id: doc.id,
      ...(doc.data() as Omit<User, 'userId' | 'id'>),
    }));

    return {
      success: true,
      data: members,
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error in getClubDuesRoster:', error);
    return {
      success: false,
      error: `Failed to fetch club roster: ${errMessage}`,
    };
  }
}
