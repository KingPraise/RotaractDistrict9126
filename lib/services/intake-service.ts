import { db } from '@/lib/firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface ProspectLeadInput {
  name: string;
  email: string;
  phone: string;
  state: string;
  preferredClub?: string;
  notes?: string;
}

export interface IntakeResult {
  success: boolean;
  id?: string;
  assignedClub?: string;
  error?: string;
}

// Default club routing fallback map by state
const STATE_DEFAULT_CLUBS: Record<string, string> = {
  Osun: 'Rotaract Club of Osogbo Metro',
  Oyo: 'Rotaract Club of Ibadan Central',
  Ondo: 'Rotaract Club of Akure Golden',
  Ekiti: 'Rotaract Club of Ado-Ekiti Prestige',
  Kwara: 'Rotaract Club of Ilorin Metro',
  Niger: 'Rotaract Club of Minna Central',
  Kogi: 'Rotaract Club of Lokoja Confluence',
};

/**
 * Submit prospective member lead to the District intake pipeline.
 * Saves to the `prospect_leads` collection in Firestore.
 */
export async function submitProspectLead(data: ProspectLeadInput): Promise<IntakeResult> {
  try {
    const cleanName = data.name?.trim();
    const cleanEmail = data.email?.trim().toLowerCase();
    const cleanPhone = data.phone?.trim();
    const cleanState = data.state?.trim() || 'Oyo';

    if (!cleanName || !cleanEmail || !cleanPhone) {
      return {
        success: false,
        error: 'Please fill in all required fields (Name, Email, and Phone Number).',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Assign preferred club or auto-assign by state
    const assignedClub =
      data.preferredClub?.trim() || STATE_DEFAULT_CLUBS[cleanState] || 'Rotaract Club of Ibadan Central';

    const leadsCollection = collection(db, 'prospect_leads');
    const docRef = await addDoc(leadsCollection, {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      state: cleanState,
      assignedClub,
      preferredClub: data.preferredClub?.trim() || '',
      status: 'pending',
      stage: 'intake',
      notes: data.notes?.trim() || '',
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString(),
    });

    return {
      success: true,
      id: docRef.id,
      assignedClub,
    };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Failed to submit intake lead.';
    console.error('Error in submitProspectLead service:', error);
    return {
      success: false,
      error: errMsg,
    };
  }
}
