const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDocs, collection, writeBatch } = require('firebase/firestore');

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const equalsIdx = trimmed.indexOf('=');
      if (equalsIdx > 0) {
        const key = trimmed.substring(0, equalsIdx).trim();
        let val = trimmed.substring(equalsIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  }
}

loadEnv();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SEED_CLUBS = [
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

async function seed() {
  console.log('🚀 Connecting via Firebase Client SDK (REST/Web Channel)...');
  console.log(`📡 Project ID: ${firebaseConfig.projectId}`);

  try {
    // 1. Seed Clubs
    console.log('\n📍 Seeding 10 Clubs across 5 States...');
    for (const club of SEED_CLUBS) {
      await setDoc(doc(db, 'clubs', club.clubId), {
        ...club,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      console.log(`  -> Seeded club: ${club.name} (${club.state})`);
    }

    // 2. Seed Projects
    console.log('\n🌟 Seeding Community Projects...');
    for (const project of SEED_PROJECTS) {
      await setDoc(doc(db, 'projects', project.projectId), {
        ...project,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      console.log(`  -> Seeded project: ${project.title}`);
    }

    // 3. Verify Read
    console.log('\n🔍 Verifying live Firestore read connection...');
    const snapshot = await getDocs(collection(db, 'clubs'));
    console.log(`🔥 Verified ${snapshot.docs.length} clubs live in Firestore database!`);

    console.log('\n🎉 ALL LIVE DATABASE SEEDING & CONNECTION TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
