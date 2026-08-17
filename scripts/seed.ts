import dotenv from 'dotenv';
import path from 'path';
import { Club, HistoricalLeader, DistrictMetrics } from '@/types';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import * as admin from 'firebase-admin';

function initAdmin() {
  if (admin.apps.length > 0) return admin.apps[0]!;

  const projectId = process.env.FIREBASE_PROJECT_ID || 'rotaract-district-9126';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (clientEmail && privateKey) {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  }

  return admin.initializeApp({ projectId });
}

const app = initAdmin();
const db = admin.firestore(app);

// 7 CONSTITUENT STATES DATASET (South-West & North-Central)
const SEED_CLUBS: Club[] = [
  // 1. Osun State (South-West)
  {
    clubId: 'club-osogbo-metro',
    name: 'Rotaract Club of Osogbo Metro',
    state: 'Osun',
    region: 'South-West',
    meetingVenue: 'Heritage Hotel Conference Hall, Osogbo',
    meetingDay: 'Every 2nd & 4th Sunday',
    meetingTime: '4:30 PM',
    presidentId: 'user-pres-osogbo',
    coordinates: { lat: 7.7827, lng: 4.5418 },
  },
  {
    clubId: 'club-oau-ile-ife',
    name: 'Rotaract Club of OAU Ile-Ife',
    state: 'Osun',
    region: 'South-West',
    meetingVenue: 'Amphitheatre, Obafemi Awolowo University, Ile-Ife',
    meetingDay: 'Every Friday',
    meetingTime: '5:00 PM',
    presidentId: 'user-pres-oau',
    coordinates: { lat: 7.5186, lng: 4.5284 },
  },

  // 2. Oyo State (South-West)
  {
    clubId: 'club-ibadan-central',
    name: 'Rotaract Club of Ibadan Central',
    state: 'Oyo',
    region: 'South-West',
    meetingVenue: 'University of Ibadan Guest Houses, Ibadan',
    meetingDay: 'Every 1st & 3rd Sunday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-ibadan',
    coordinates: { lat: 7.4443, lng: 3.8997 },
  },
  {
    clubId: 'club-lautech-ogbomoso',
    name: 'Rotaract Club of LAUTECH',
    state: 'Oyo',
    region: 'South-West',
    meetingVenue: 'MKO Hall, LAUTECH Campus, Ogbomoso',
    meetingDay: 'Every 2nd & 4th Saturday',
    meetingTime: '3:00 PM',
    presidentId: 'user-pres-lautech',
    coordinates: { lat: 8.1333, lng: 4.2567 },
  },

  // 3. Ondo State (South-West)
  {
    clubId: 'club-akure-golden',
    name: 'Rotaract Club of Akure Golden',
    state: 'Ondo',
    region: 'South-West',
    meetingVenue: 'Sunview Hotel Banquet Room, Alagbaka, Akure',
    meetingDay: 'Every 2nd & 4th Sunday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-akure',
    coordinates: { lat: 7.2571, lng: 5.2058 },
  },
  {
    clubId: 'club-futa-akure',
    name: 'Rotaract Club of FUTA',
    state: 'Ondo',
    region: 'South-West',
    meetingVenue: 'SEET Auditorium, Federal University of Technology, Akure',
    meetingDay: 'Every Wednesday',
    meetingTime: '5:00 PM',
    presidentId: 'user-pres-futa',
    coordinates: { lat: 7.3034, lng: 5.1378 },
  },

  // 4. Ekiti State (South-West)
  {
    clubId: 'club-ado-ekiti-prestige',
    name: 'Rotaract Club of Ado-Ekiti Prestige',
    state: 'Ekiti',
    region: 'South-West',
    meetingVenue: 'Prosperous Hotel Hall, Bank Road, Ado-Ekiti',
    meetingDay: 'Every 1st & 3rd Sunday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-ado',
    coordinates: { lat: 7.6213, lng: 5.2215 },
  },
  {
    clubId: 'club-eksu-ado',
    name: 'Rotaract Club of EKSU',
    state: 'Ekiti',
    region: 'South-West',
    meetingVenue: 'Faculty of Science Lecture Theatre, EKSU, Ado-Ekiti',
    meetingDay: 'Every Friday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-eksu',
    coordinates: { lat: 7.7126, lng: 5.2536 },
  },

  // 5. Kwara State (North-Central)
  {
    clubId: 'club-ilorin-metro',
    name: 'Rotaract Club of Ilorin Metro',
    state: 'Kwara',
    region: 'North-Central',
    meetingVenue: 'Kwara Hotels Conference Suite, GRA, Ilorin',
    meetingDay: 'Every 1st & 3rd Saturday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-ilorin',
    coordinates: { lat: 8.4799, lng: 4.5418 },
  },
  {
    clubId: 'club-unilorin-campus',
    name: 'Rotaract Club of University of Ilorin',
    state: 'Kwara',
    region: 'North-Central',
    meetingVenue: 'Student Union Building, Main Campus, UNILORIN',
    meetingDay: 'Every Thursday',
    meetingTime: '4:30 PM',
    presidentId: 'user-pres-unilorin',
    coordinates: { lat: 8.4842, lng: 4.6728 },
  },

  // 6. Niger State (North-Central)
  {
    clubId: 'club-minna-central',
    name: 'Rotaract Club of Minna Central',
    state: 'Niger',
    region: 'North-Central',
    meetingVenue: 'Hydro Hotel Conference Hall, Minna',
    meetingDay: 'Every 2nd & 4th Saturday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-minna',
    coordinates: { lat: 9.6178, lng: 6.5569 },
  },
  {
    clubId: 'club-futminna-bosso',
    name: 'Rotaract Club of FUTMinna',
    state: 'Niger',
    region: 'North-Central',
    meetingVenue: 'Bosso Campus Auditorium, FUT Minna',
    meetingDay: 'Every Wednesday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-futminna',
    coordinates: { lat: 9.5833, lng: 6.5500 },
  },

  // 7. Kogi State (North-Central)
  {
    clubId: 'club-lokoja-confluence',
    name: 'Rotaract Club of Lokoja Confluence',
    state: 'Kogi',
    region: 'North-Central',
    meetingVenue: 'Confluence Beach Hotel Banquet Room, Lokoja',
    meetingDay: 'Every 1st & 3rd Sunday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-lokoja',
    coordinates: { lat: 7.7969, lng: 6.7405 },
  },
];

// HISTORICAL LEADERSHIP (DRRs)
const SEED_LEADERSHIP: HistoricalLeader[] = [
  {
    eraId: 'drr-2023-2024',
    year: '2023/2024',
    rotaryYear: '2023-2024',
    designation: '15th District Rotaract Representative (D9125)',
    leaderName: 'Rtr. PP Adebayo Sodiq Babatunde, PHF+1',
    theme: 'Create Hope in the World',
    district: 'District 9125 (Pre-Redistricting Anchor)',
    isCurrent: false,
    notes: 'Steered the final consolidated year of District 9125 with historic membership growth and community impact.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  },
  {
    eraId: 'drr-2024-2025',
    year: '2024/2025',
    rotaryYear: '2024-2025',
    designation: 'Inaugural District Rotaract Representative (D9126)',
    leaderName: 'Rtr. PP Oyewumi Kamaldeen',
    theme: 'The Magic of Rotary',
    district: 'District 9126 (Inaugural Charter Year)',
    isCurrent: false,
    notes: 'Led the foundational transition, charter assembly, and geographic alignment of the 7 constituent states.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  },
  {
    eraId: 'drr-2025-2026',
    year: '2025/2026',
    rotaryYear: '2025-2026',
    designation: '2nd District Rotaract Representative (D9126)',
    leaderName: 'Consolidation Leadership Team',
    theme: 'Unite for Good',
    district: 'District 9126 (Consolidation Year)',
    isCurrent: false,
    notes: 'Deepened youth leadership, club governance, and regional service partnerships across South-West and North-Central.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  },
  {
    eraId: 'drr-2026-2027',
    year: '2026/2027',
    rotaryYear: '2026-2027',
    designation: '3rd District Rotaract Representative (D9126)',
    leaderName: 'Rtr. PP Adaramoye Iyanuoluwa, PHF',
    theme: 'Creating Lasting Impact',
    district: 'District 9126 (Current Administration)',
    isCurrent: true,
    notes: 'Pioneering digital platform transformation, verified credentials, and multi-state humanitarian missions.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  },
];

async function seedDatabase() {
  console.log('🚀 Seeding District 9126 Revised 7-State Data and Leadership Models...');

  try {
    // 1. Seed Metrics
    await db.collection('metrics').doc('district-9126-metrics').set({
      activeClubs: 77,
      totalRotaractors: 700,
      constituentStates: 7,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    console.log('✅ District metrics document updated (77 Clubs | ~700 Members | 7 States).');

    // 2. Seed Leadership
    const leadBatch = db.batch();
    for (const l of SEED_LEADERSHIP) {
      leadBatch.set(db.collection('leadership').doc(l.eraId), { ...l, updatedAt: new Date().toISOString() }, { merge: true });
    }
    await leadBatch.commit();
    console.log(`✅ Seeded ${SEED_LEADERSHIP.length} DRR leadership records.`);

    // 3. Seed Clubs
    const clubBatch = db.batch();
    for (const c of SEED_CLUBS) {
      clubBatch.set(db.collection('clubs').doc(c.clubId), { ...c, updatedAt: new Date().toISOString() }, { merge: true });
    }
    await clubBatch.commit();
    console.log(`✅ Seeded ${SEED_CLUBS.length} clubs across 7 constituent states.`);

    console.log('🎉 Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
