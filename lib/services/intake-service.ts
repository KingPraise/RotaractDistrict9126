import { db } from '@/lib/firebase/client';
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { isPlaceholderFirebaseConfig } from '@/lib/services/auth-service';

export interface ProspectLeadInput {
  name: string;
  email: string;
  phone: string;
  state: string;
  preferredClub?: string;
  notes?: string;
  source?: string;
}

export interface StoredProspectLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  assignedClub: string;
  preferredClub: string;
  source: string;
  date: string;
  stage: 'intake' | 'orientation' | 'induction_ready';
  notes: string;
  submittedAt: string;
}

export interface IntakeResult {
  success: boolean;
  id?: string;
  assignedClub?: string;
  lead?: StoredProspectLead;
  error?: string;
}

const LOCAL_PROSPECTS_KEY = 'district_9126_prospect_leads';

// Default club routing fallback map by state
const STATE_DEFAULT_CLUBS: Record<string, string> = {
  Osun: 'RAC Osogbo',
  Oyo: 'RAC Ibadan Ring Road',
  Ondo: 'RAC Akure',
  Ekiti: 'RAC Ado-Ekiti',
  Kwara: 'RAC Ilorin',
  Niger: 'RAC Minna',
  Kogi: 'RAC Lokoja',
};

function getLocalProspects(): StoredProspectLead[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_PROSPECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalProspects(leads: StoredProspectLead[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_PROSPECTS_KEY, JSON.stringify(leads));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Submit prospective member lead to the District intake pipeline.
 * Saves to the `prospect_leads` collection in Firestore and syncs locally.
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

    const assignedClub =
      data.preferredClub?.trim() || STATE_DEFAULT_CLUBS[cleanState] || 'RAC Ibadan Ring Road';

    const nowIso = new Date().toISOString();
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let leadId = `lead-${Date.now()}`;

    if (!isPlaceholderFirebaseConfig()) {
      try {
        const leadsCollection = collection(db, 'prospect_leads');
        const docRef = await addDoc(leadsCollection, {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          state: cleanState,
          assignedClub,
          preferredClub: data.preferredClub?.trim() || '',
          source: data.source || '/join',
          status: 'pending',
          stage: 'intake',
          notes: data.notes?.trim() || '',
          createdAt: serverTimestamp(),
          submittedAt: nowIso,
        });
        leadId = docRef.id;
      } catch {
        // Fallback to local leadId when offline
      }
    }

    const newLead: StoredProspectLead = {
      id: leadId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      state: cleanState,
      assignedClub,
      preferredClub: data.preferredClub?.trim() || assignedClub,
      source: data.source || '/join',
      date: formattedDate,
      stage: 'intake',
      notes: data.notes?.trim() || '',
      submittedAt: nowIso,
    };

    const existing = getLocalProspects().filter((l) => l.email !== cleanEmail);
    saveLocalProspects([newLead, ...existing]);

    return {
      success: true,
      id: leadId,
      assignedClub,
      lead: newLead,
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

/**
 * Retrieve prospect leads for the President or Executive pipeline.
 */
export async function getProspectLeads(clubFilter?: string): Promise<StoredProspectLead[]> {
  const localLeads = getLocalProspects();

  if (!isPlaceholderFirebaseConfig()) {
    try {
      const snapshot = await getDocs(collection(db, 'prospect_leads'));
      if (!snapshot.empty) {
        const remoteLeads: StoredProspectLead[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            name: d.name || d.fullName || '',
            email: d.email || '',
            phone: d.phone || '',
            state: d.state || d.preferredState || 'Oyo',
            assignedClub: d.assignedClub || d.assignedClubId || '',
            preferredClub: d.preferredClub || d.assignedClub || '',
            source: d.source || '/join',
            date:
              d.date ||
              (d.submittedAt
                ? new Date(d.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent'),
            stage:
              d.stage === 'orientation' || d.stage === 'induction_ready'
                ? d.stage
                : 'intake',
            notes: d.notes || '',
            submittedAt: d.submittedAt || new Date().toISOString(),
          };
        });
        const mergedMap = new Map<string, StoredProspectLead>();
        [...remoteLeads, ...localLeads].forEach((item) => {
          if (item.name && item.email) {
            mergedMap.set(item.id, item);
          }
        });
        const merged = Array.from(mergedMap.values());
        saveLocalProspects(merged);
        if (clubFilter) {
          return merged.filter(
            (l) =>
              !l.assignedClub ||
              l.assignedClub.toLowerCase().includes(clubFilter.toLowerCase()) ||
              clubFilter.toLowerCase().includes(l.assignedClub.toLowerCase())
          );
        }
        return merged;
      }
    } catch {
      // Fallback to local
    }
  }

  if (clubFilter) {
    const filtered = localLeads.filter(
      (l) =>
        !l.assignedClub ||
        l.assignedClub.toLowerCase().includes(clubFilter.toLowerCase()) ||
        clubFilter.toLowerCase().includes(l.assignedClub.toLowerCase())
    );
    return filtered.length > 0 ? filtered : localLeads;
  }

  return localLeads;
}

/**
 * Advance or update a prospect lead's Kanban stage
 */
export async function updateProspectLeadStage(
  id: string,
  stage: 'intake' | 'orientation' | 'induction_ready'
): Promise<boolean> {
  const localLeads = getLocalProspects();
  const updated = localLeads.map((l) => (l.id === id ? { ...l, stage } : l));
  saveLocalProspects(updated);

  if (!isPlaceholderFirebaseConfig()) {
    try {
      await updateDoc(doc(db, 'prospect_leads', id), {
        stage,
        updatedAt: new Date().toISOString(),
      });
    } catch {
      // Non-fatal
    }
  }

  return true;
}
