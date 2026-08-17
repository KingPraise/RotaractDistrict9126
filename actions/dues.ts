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
): Promise<ActionResult<{ userId: string; duesStatus: DuesStatus; updatedAt: string }>> {
  try {
    if (!targetUserId || !newStatus) {
      return { success: false, error: 'Missing required parameters: targetUserId and newStatus.' };
    }

    if (newStatus !== 'cleared' && newStatus !== 'pending') {
      return { success: false, error: 'Invalid dues status. Must be "cleared" or "pending".' };
    }

    // Auth & RBAC Check
    if (callerToken) {
      const decodedToken = await verifyAuthToken(callerToken);
      if (!decodedToken) {
        return { success: false, error: 'Unauthorized: Invalid authentication session.' };
      }

      const callerProfile = await getUserProfile(decodedToken.uid);
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

    const updatedAt = new Date().toISOString();

    // Update in Firestore
    await adminDb.collection('users').doc(targetUserId).update({
      duesStatus: newStatus,
      updatedAt,
    });

    return {
      success: true,
      data: {
        userId: targetUserId,
        duesStatus: newStatus,
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

    const members: User[] = snapshot.docs.map((doc) => doc.data() as User);

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
