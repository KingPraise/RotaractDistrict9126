import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local first, fallback to .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import * as admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
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

// Seed Data Definition
const SEED_CLUBS = [
  // Oyo State
  {
    clubId: 'club-ibadan-central',
    name: 'Rotaract Club of Ibadan Central',
    state: 'Oyo',
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
    meetingVenue: 'MKO Hall, LAUTECH Campus, Ogbomoso',
    meetingDay: 'Every 2nd & 4th Saturday',
    meetingTime: '3:00 PM',
    presidentId: 'user-pres-lautech',
    coordinates: { lat: 8.1333, lng: 4.2567 },
  },

  // Osun State
  {
    clubId: 'club-osogbo-metro',
    name: 'Rotaract Club of Osogbo Metro',
    state: 'Osun',
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
    meetingVenue: 'Amphitheatre, Obafemi Awolowo University, Ile-Ife',
    meetingDay: 'Every Friday',
    meetingTime: '5:00 PM',
    presidentId: 'user-pres-oau',
    coordinates: { lat: 7.5186, lng: 4.5284 },
  },

  // Ogun State
  {
    clubId: 'club-abeokuta-hills',
    name: 'Rotaract Club of Abeokuta Hills',
    state: 'Ogun',
    meetingVenue: 'Olusegun Obasanjo Presidential Library (OOPL), Abeokuta',
    meetingDay: 'Every 1st & 3rd Saturday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-abeokuta',
    coordinates: { lat: 7.1475, lng: 3.3619 },
  },
  {
    clubId: 'club-oou-ago-iwoye',
    name: 'Rotaract Club of OOU Ago-Iwoye',
    state: 'Ogun',
    meetingVenue: 'Student Union Building, OOU Campus, Ago-Iwoye',
    meetingDay: 'Every Thursday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-oou',
    coordinates: { lat: 6.9422, lng: 3.9213 },
  },

  // Ondo State
  {
    clubId: 'club-akure-golden',
    name: 'Rotaract Club of Akure Golden',
    state: 'Ondo',
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
    meetingVenue: 'SEET Auditorium, Federal University of Technology, Akure',
    meetingDay: 'Every Wednesday',
    meetingTime: '5:00 PM',
    presidentId: 'user-pres-futa',
    coordinates: { lat: 7.3034, lng: 5.1378 },
  },

  // Ekiti State
  {
    clubId: 'club-ado-ekiti-prestige',
    name: 'Rotaract Club of Ado-Ekiti Prestige',
    state: 'Ekiti',
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
    meetingVenue: 'Faculty of Science Lecture Theatre, EKSU, Ado-Ekiti',
    meetingDay: 'Every Friday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-eksu',
    coordinates: { lat: 7.7126, lng: 5.2536 },
  },
];

const SEED_USERS = [
  {
    userId: 'user-drr-9126',
    firstName: 'District',
    lastName: 'Representative',
    email: 'drr@rotaractdistrict9126.com.ng',
    rotaryId: 'ROT-9126-0001',
    clubId: 'club-ibadan-central',
    role: 'district_admin',
    duesStatus: 'cleared',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    occupation: 'Software Engineer & Community Builder',
    phoneNumber: '+2348012345678',
    createdAt: new Date().toISOString(),
  },
  {
    userId: 'user-pres-ibadan',
    firstName: 'Tolu',
    lastName: 'Adeleke',
    email: 'president.ibadancentral@rotaractdistrict9126.com.ng',
    rotaryId: 'ROT-9126-1002',
    clubId: 'club-ibadan-central',
    role: 'president',
    duesStatus: 'cleared',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    occupation: 'Brand Designer',
    phoneNumber: '+2348023456789',
    createdAt: new Date().toISOString(),
  },
  {
    userId: 'user-pres-osogbo',
    firstName: 'Adeola',
    lastName: 'Oyelaran',
    email: 'president.osogbometro@rotaractdistrict9126.com.ng',
    rotaryId: 'ROT-9126-1003',
    clubId: 'club-osogbo-metro',
    role: 'president',
    duesStatus: 'cleared',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    occupation: 'Financial Analyst',
    phoneNumber: '+2348034567890',
    createdAt: new Date().toISOString(),
  },
];

const SEED_PROJECTS = [
  {
    projectId: 'proj-clean-water-oyo',
    title: 'Clean Water Borehole Initiative - Oyo Rural Community',
    description:
      'Installation of solar-powered potable water boreholes serving over 1,500 residents with zero contamination risk.',
    clubId: 'club-ibadan-central',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80',
    ],
    dateCompleted: '2026-05-15',
    category: 'Water, Sanitation & Hygiene',
    beneficiariesCount: 1500,
    createdAt: new Date().toISOString(),
  },
  {
    projectId: 'proj-education-osun',
    title: 'Back-to-School Digital Literacy & Book Drive',
    description:
      'Donation of 50 refurbished laptops and 1,000 educational textbooks to public secondary schools across Osun State.',
    clubId: 'club-osogbo-metro',
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    ],
    dateCompleted: '2026-06-20',
    category: 'Basic Education & Literacy',
    beneficiariesCount: 850,
    createdAt: new Date().toISOString(),
  },
  {
    projectId: 'proj-health-ondo',
    title: 'Maternal & Child Health Medical Outreach',
    description:
      'Free prenatal vitamins, ultrasound screenings, and pediatric care for 600+ nursing mothers in rural Ondo communities.',
    clubId: 'club-akure-golden',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    ],
    dateCompleted: '2026-07-10',
    category: 'Disease Prevention & Maternal Health',
    beneficiariesCount: 620,
    createdAt: new Date().toISOString(),
  },
];

async function seedDatabase() {
  console.log('🚀 Starting District 9126 Database Seed...');
  console.log(`📡 Project ID: ${process.env.FIREBASE_PROJECT_ID}`);

  try {
    // 1. Seed Clubs
    console.log('\n📍 Seeding Clubs across 5 States (Oyo, Osun, Ogun, Ondo, Ekiti)...');
    const clubBatch = db.batch();
    for (const club of SEED_CLUBS) {
      const ref = db.collection('clubs').doc(club.clubId);
      clubBatch.set(ref, { ...club, updatedAt: new Date().toISOString() }, { merge: true });
    }
    await clubBatch.commit();
    console.log(`✅ Seeded ${SEED_CLUBS.length} clubs successfully.`);

    // 2. Seed Initial Users (Admins & Presidents)
    console.log('\n👤 Seeding District Admin & Club Presidents...');
    const userBatch = db.batch();
    for (const user of SEED_USERS) {
      const ref = db.collection('users').doc(user.userId);
      userBatch.set(ref, { ...user, updatedAt: new Date().toISOString() }, { merge: true });
    }
    await userBatch.commit();
    console.log(`✅ Seeded ${SEED_USERS.length} user profiles successfully.`);

    // 3. Seed Projects
    console.log('\n🌟 Seeding Community Impact Projects...');
    const projBatch = db.batch();
    for (const project of SEED_PROJECTS) {
      const ref = db.collection('projects').doc(project.projectId);
      projBatch.set(ref, { ...project, updatedAt: new Date().toISOString() }, { merge: true });
    }
    await projBatch.commit();
    console.log(`✅ Seeded ${SEED_PROJECTS.length} impact projects successfully.`);

    console.log('\n✨ Database seeding completed successfully for Rotaract District 9126!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed with error:', error);
    process.exit(1);
  }
}

seedDatabase();
