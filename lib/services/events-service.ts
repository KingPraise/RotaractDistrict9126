import { db } from '@/lib/firebase/client';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

export interface DistrictEvent {
  id: string;
  title: string;
  theme?: string;
  date: string;
  month: string;
  day: string;
  year: string;
  time: string;
  venue: string;
  state: 'Osun' | 'Oyo' | 'Ondo' | 'Ekiti' | 'Kwara' | 'Niger' | 'Kogi' | 'District-Wide';
  region?: 'South-West' | 'North-Central';
  category: 'Conference' | 'Training' | 'Service Project' | 'Social' | 'Assembly';
  image: string;
  description: string;
  registrationUrl?: string;
  registrationStatus: 'open' | 'closed' | 'early_bird';
  attendeeCount?: number;
  featured?: boolean;
}

export const INITIAL_EVENTS: DistrictEvent[] = [
  {
    id: 'evt-discon-2026',
    title: 'District 9126 Conference (DISCON 2026)',
    theme: 'Creating Lasting Impact Across Borders',
    date: 'October 15 – 18, 2026',
    month: 'OCT',
    day: '15',
    year: '2026',
    time: '9:00 AM WAT',
    venue: 'June 12 Cultural Centre, Abeokuta & Virtual Hub',
    state: 'District-Wide',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&auto=format',
    description: 'The premier annual gathering of Rotaractors, Rotary leaders, and youth delegates across all 7 constituent states with keynote addresses, awards, and networking.',
    registrationStatus: 'early_bird',
    attendeeCount: 450,
    featured: true,
  },
  {
    id: 'evt-ryla-2026',
    title: 'Rotary Youth Leadership Awards (RYLA)',
    theme: 'Catalyzing Next-Generation Civic Leaders',
    date: 'November 5 – 8, 2026',
    month: 'NOV',
    day: '05',
    year: '2026',
    time: '8:00 AM WAT',
    venue: 'International Institute of Tropical Agriculture (IITA), Ibadan',
    state: 'Oyo',
    region: 'South-West',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&h=800&fit=crop&auto=format',
    description: 'High-impact 4-day intensive leadership boot camp featuring experiential outdoor challenges, professional mentorship, and ethical governance workshops.',
    registrationStatus: 'open',
    attendeeCount: 180,
    featured: true,
  },
  {
    id: 'evt-health-outreach-kwara',
    title: 'Multi-State Rural Health & Immunization Mission',
    theme: 'Every Child Protected, Every Mother Safe',
    date: 'September 12, 2026',
    month: 'SEP',
    day: '12',
    year: '2026',
    time: '7:30 AM WAT',
    venue: 'Primary Healthcare Centre, Ganmo & Ilorin Environs',
    state: 'Kwara',
    region: 'North-Central',
    category: 'Service Project',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop&auto=format',
    description: 'Combined community health screening, malaria testing, pediatric vitamins administration, and clean hygiene kit distribution.',
    registrationStatus: 'open',
    attendeeCount: 70,
    featured: false,
  },
  {
    id: 'evt-presidents-forum-q3',
    title: 'District Executives & Club Presidents Quarterly Forum',
    theme: 'Institutional Excellence and Financial Clearance',
    date: 'August 29, 2026',
    month: 'AUG',
    day: '29',
    year: '2026',
    time: '4:00 PM WAT',
    venue: 'Virtual Teleconference (Google Meet / Zoom)',
    state: 'District-Wide',
    category: 'Assembly',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=800&fit=crop&auto=format',
    description: 'Mandatory quarterly governance check-in for all 77 chartered club presidents and district committee chairs.',
    registrationStatus: 'open',
    attendeeCount: 95,
    featured: false,
  },
];

/**
 * Fetch all district events with optional category and state filtering
 */
export async function getDistrictEvents(filter?: {
  category?: string;
  state?: string;
}): Promise<DistrictEvent[]> {
  try {
    const eventsRef = collection(db, 'events');
    const snapshot = await getDocs(eventsRef);

    if (!snapshot.empty) {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as DistrictEvent[];

      return items.filter((evt) => {
        const matchCategory = !filter?.category || filter.category === 'All' || evt.category === filter.category;
        const matchState = !filter?.state || filter.state === 'All' || evt.state === filter.state;
        return matchCategory && matchState;
      });
    }

    return INITIAL_EVENTS.filter((evt) => {
      const matchCategory = !filter?.category || filter.category === 'All' || evt.category === filter.category;
      const matchState = !filter?.state || filter.state === 'All' || evt.state === filter.state;
      return matchCategory && matchState;
    });
  } catch (err) {
    console.warn('Fallback to local events dataset:', err);
    return INITIAL_EVENTS;
  }
}

/**
 * Fetch featured upcoming events for Homepage and Portals
 */
export async function getUpcomingFeaturedEvents(limitCount = 3): Promise<DistrictEvent[]> {
  const all = await getDistrictEvents();
  return all.filter((e) => e.featured).slice(0, limitCount);
}

/**
 * Register attendee for an event
 */
export async function registerForEvent(
  eventId: string,
  attendee: { name: string; email: string; phone: string; clubName?: string }
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const registrationsRef = collection(db, 'event_registrations');
    await addDoc(registrationsRef, {
      eventId,
      ...attendee,
      registeredAt: new Date().toISOString(),
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: 'Event registration confirmed! You will receive confirmation details via email.',
    };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Registration failed.';
    return { success: false, error: errMsg };
  }
}
