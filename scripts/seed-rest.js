const fs = require('fs');
const path = require('path');

// Read .env.local
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

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'rotaract-district-9126';
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function toFirestoreValue(val) {
  if (typeof val === 'string') return { stringValue: val };
  if (typeof val === 'number') {
    return Number.isInteger(val) ? { integerValue: val.toString() } : { doubleValue: val };
  }
  if (typeof val === 'boolean') return { booleanValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (val && typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { nullValue: null };
}

function toFirestoreFields(obj) {
  const fields = {};
  for (const [key, value] of Object.entries(obj)) {
    fields[key] = toFirestoreValue(value);
  }
  return fields;
}

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

async function seedFirestoreViaRest() {
  console.log('🚀 Connecting to live Firestore REST API endpoint...');
  console.log(`📡 Target Project: ${PROJECT_ID}`);
  console.log(`🔑 API Key Configured: ${API_KEY ? 'Yes' : 'No'}`);

  // 1. Seed Clubs
  console.log('\n📍 Writing Clubs across 5 States (Oyo, Osun, Ogun, Ondo, Ekiti)...');
  for (const club of SEED_CLUBS) {
    const url = `${BASE_URL}/clubs/${club.clubId}?key=${API_KEY}`;
    const payload = {
      fields: toFirestoreFields({
        ...club,
        updatedAt: new Date().toISOString(),
      }),
    };

    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to write club ${club.clubId}: ${errText}`);
    }
    console.log(`  -> Successfully seeded: ${club.name} (${club.state})`);
  }

  // 2. Seed Projects
  console.log('\n🌟 Writing Community Impact Projects...');
  for (const proj of SEED_PROJECTS) {
    const url = `${BASE_URL}/projects/${proj.projectId}?key=${API_KEY}`;
    const payload = {
      fields: toFirestoreFields({
        ...proj,
        updatedAt: new Date().toISOString(),
      }),
    };

    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to write project ${proj.projectId}: ${errText}`);
    }
    console.log(`  -> Successfully seeded project: ${proj.title}`);
  }

  // 3. Verify Live Read
  console.log('\n🔍 Verifying live data reads from Firestore REST API...');
  const readRes = await fetch(`${BASE_URL}/clubs?key=${API_KEY}`);
  if (!readRes.ok) {
    const err = await readRes.text();
    throw new Error(`Failed to read clubs collection: ${err}`);
  }
  const readData = await readRes.json();
  const count = readData.documents ? readData.documents.length : 0;
  console.log(`🔥 Live Firestore Document Count in 'clubs' collection: ${count}`);

  console.log('\n🎉 ALL LIVE DATABASE SEEDING & CONNECTION TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}

seedFirestoreViaRest().catch((err) => {
  console.error('\n❌ Error during REST seed:', err);
  process.exit(1);
});
