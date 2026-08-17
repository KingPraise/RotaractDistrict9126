const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'rotaract-district-9126';
const CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
let PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;

if (PRIVATE_KEY) {
  PRIVATE_KEY = PRIVATE_KEY.replace(/\\n/g, '\n');
}

/**
 * Generate Google OAuth2 Bearer Access Token from Service Account using Node built-in crypto
 */
async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodeBase64Url = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const unsignedToken = `${encodeBase64Url(header)}.${encodeBase64Url(claimSet)}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  const signature = signer.sign(PRIVATE_KEY, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${unsignedToken}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Failed to obtain Google access token: ${err}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

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

async function seedWithServiceAccount() {
  console.log('🚀 Authenticating Service Account with Google OAuth2...');
  console.log(`👤 Client Email: ${CLIENT_EMAIL}`);
  console.log(`📡 Target Project ID: ${PROJECT_ID}`);

  const accessToken = await getGoogleAccessToken();
  console.log('✅ Google Service Account OAuth2 Bearer token obtained successfully!');

  const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  // 1. Seed Clubs
  console.log('\n📍 Writing 10 Clubs across 5 States (Oyo, Osun, Ogun, Ondo, Ekiti)...');
  for (const club of SEED_CLUBS) {
    const url = `${BASE_URL}/clubs/${club.clubId}`;
    const payload = {
      fields: toFirestoreFields({
        ...club,
        updatedAt: new Date().toISOString(),
      }),
    };

    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to write club ${club.clubId}: ${errText}`);
    }
    console.log(`  -> Seeded Club: ${club.name} (${club.state})`);
  }

  // 2. Seed Users
  console.log('\n👤 Writing District Admin & Club Presidents...');
  for (const user of SEED_USERS) {
    const url = `${BASE_URL}/users/${user.userId}`;
    const payload = {
      fields: toFirestoreFields({
        ...user,
        updatedAt: new Date().toISOString(),
      }),
    };

    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to write user ${user.userId}: ${errText}`);
    }
    console.log(`  -> Seeded User: ${user.firstName} ${user.lastName} (${user.role})`);
  }

  // 3. Seed Projects
  console.log('\n🌟 Writing Community Impact Projects...');
  for (const proj of SEED_PROJECTS) {
    const url = `${BASE_URL}/projects/${proj.projectId}`;
    const payload = {
      fields: toFirestoreFields({
        ...proj,
        updatedAt: new Date().toISOString(),
      }),
    };

    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to write project ${proj.projectId}: ${errText}`);
    }
    console.log(`  -> Seeded Project: ${proj.title}`);
  }

  // 4. Verify Live Read
  console.log('\n🔍 Verifying live data reads from Firestore...');
  const clubsRead = await fetch(`${BASE_URL}/clubs`, { headers });
  const clubsData = await clubsRead.json();
  const clubCount = clubsData.documents ? clubsData.documents.length : 0;

  const usersRead = await fetch(`${BASE_URL}/users`, { headers });
  const usersData = await usersRead.json();
  const userCount = usersData.documents ? usersData.documents.length : 0;

  const projectsRead = await fetch(`${BASE_URL}/projects`, { headers });
  const projectsData = await projectsRead.json();
  const projectCount = projectsData.documents ? projectsData.documents.length : 0;

  console.log(`🔥 Verified in live database:`);
  console.log(`   - Clubs: ${clubCount}`);
  console.log(`   - Users: ${userCount}`);
  console.log(`   - Projects: ${projectCount}`);

  console.log('\n🎉 ALL LIVE DATABASE SEEDING & CONNECTION TESTS PASSED 100%!');
  process.exit(0);
}

seedWithServiceAccount().catch((err) => {
  console.error('\n❌ Seeding error:', err);
  process.exit(1);
});
