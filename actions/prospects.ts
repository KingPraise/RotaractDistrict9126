'use server';

import { adminDb, verifyAuthToken, getUserProfile } from '@/lib/firebase/admin';
import { ActionResult, Prospect, ProspectInput, ProspectStatus } from '@/types';

/**
 * Submit a new prospective member lead into the District pipeline.
 * Publicly accessible via the Join/Interest intake form.
 *
 * @param input - Lead contact details and assigned club
 */
export async function submitProspectLead(
  input: ProspectInput
): Promise<ActionResult<{ prospectId: string; prospect: Prospect }>> {
  try {
    if (!input.fullName?.trim() || !input.email?.trim() || !input.phone?.trim() || !input.assignedClubId?.trim()) {
      return {
        success: false,
        error: 'Please fill in all required fields: full name, email, phone number, and selected club.',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    const prospectRef = adminDb.collection('prospects').doc();
    const prospectId = prospectRef.id;
    const createdAt = new Date().toISOString();

    const newProspect: Prospect = {
      prospectId,
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      assignedClubId: input.assignedClubId,
      status: 'new',
      createdAt,
      notes: input.notes?.trim() || '',
      preferredState: input.preferredState,
    };

    await prospectRef.set(newProspect);

    // Alert Club President / Notification Trigger
    try {
      const clubDoc = await adminDb.collection('clubs').doc(input.assignedClubId).get();
      if (clubDoc.exists) {
        const clubData = clubDoc.data();
        console.log(
          `[LEAD ALERT] New prospect ${newProspect.fullName} assigned to Club ${clubData?.name || input.assignedClubId} (President ID: ${clubData?.presidentId})`
        );
        // Future: Trigger Resend/Mailchimp transactional email to president
      }
    } catch (alertErr) {
      console.warn('Non-fatal: Could not dispatch president alert:', alertErr);
    }

    return {
      success: true,
      data: {
        prospectId,
        prospect: newProspect,
      },
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error in submitProspectLead:', error);
    return {
      success: false,
      error: `Failed to submit lead: ${errMessage}`,
    };
  }
}

/**
 * Update prospect progression status (Kanban pipeline)
 * Status: 'new' | 'contacted' | 'meeting_attended' | 'inducted'
 */
export async function updateProspectStatus(
  prospectId: string,
  newStatus: ProspectStatus,
  notes?: string,
  callerToken?: string
): Promise<ActionResult<{ prospectId: string; status: ProspectStatus; updatedAt: string }>> {
  try {
    if (!prospectId || !newStatus) {
      return { success: false, error: 'Prospect ID and new status are required.' };
    }

    const validStatuses: ProspectStatus[] = ['new', 'contacted', 'meeting_attended', 'inducted'];
    if (!validStatuses.includes(newStatus)) {
      return { success: false, error: 'Invalid status provided.' };
    }

    // RBAC Check
    if (callerToken) {
      const decoded = await verifyAuthToken(callerToken);
      if (!decoded) {
        return { success: false, error: 'Unauthorized: Invalid authentication session.' };
      }

      const callerProfile = await getUserProfile(decoded.uid);
      const prospectDoc = await adminDb.collection('prospects').doc(prospectId).get();
      if (!prospectDoc.exists) {
        return { success: false, error: 'Prospect not found.' };
      }

      const prospectData = prospectDoc.data() as Prospect;
      const isDistrictAdmin = callerProfile?.role === 'district_admin';
      const isAssignedPresident =
        callerProfile?.role === 'president' && callerProfile.clubId === prospectData.assignedClubId;

      if (!isDistrictAdmin && !isAssignedPresident) {
        return {
          success: false,
          error: 'Forbidden: You do not have permission to manage this club’s leads.',
        };
      }
    }

    const updatedAt = new Date().toISOString();
    const updatePayload: Partial<Prospect> = {
      status: newStatus,
      updatedAt,
    };

    if (notes !== undefined) {
      updatePayload.notes = notes;
    }

    await adminDb.collection('prospects').doc(prospectId).update(updatePayload);

    return {
      success: true,
      data: {
        prospectId,
        status: newStatus,
        updatedAt,
      },
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error in updateProspectStatus:', error);
    return {
      success: false,
      error: `Failed to update prospect status: ${errMessage}`,
    };
  }
}

/**
 * Fetch prospects assigned to a specific club for Kanban view
 */
export async function getClubProspects(
  clubId: string,
  callerToken?: string
): Promise<ActionResult<Prospect[]>> {
  try {
    if (!clubId) {
      return { success: false, error: 'Club ID is required.' };
    }

    if (callerToken) {
      const decoded = await verifyAuthToken(callerToken);
      if (!decoded) {
        return { success: false, error: 'Unauthorized access.' };
      }
    }

    const snapshot = await adminDb
      .collection('prospects')
      .where('assignedClubId', '==', clubId)
      .orderBy('createdAt', 'desc')
      .get();

    const prospects: Prospect[] = snapshot.docs.map((doc) => doc.data() as Prospect);

    return {
      success: true,
      data: prospects,
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error in getClubProspects:', error);
    return {
      success: false,
      error: `Failed to fetch club prospects: ${errMessage}`,
    };
  }
}
