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

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || 'rotaract-district-9126';
const CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
let PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;

if (PRIVATE_KEY) {
  PRIVATE_KEY = PRIVATE_KEY.replace(/\\n/g, '\n');
}

/**
 * Generate Google OAuth2 Bearer Access Token from Service Account
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

const OFFICIAL_PROJECTS = [
  {
    id: 'proj-osogbo-maternal-wellness',
    title: 'Maternal Wellness Outreach & PHC Support',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract Club of Osogbo (with Rotary Club of Osogbo Central)',
    location: 'Primary Health Center, Gbonmi, Oke-Baale, Osogbo, Osun State',
    image: '/images/projects/osogbo-maternal-wellness.jpg',
    description: 'Strengthening maternal care through prenatal health education, donation of Maternal Wellness Kits to pregnant women, and provision of essential medical diagnostic equipment to Primary Health Centres.',
    status: 'Completed',
    progress: 100,
    statNumber: '150+',
    statLabel: 'Maternal Kits Distributed',
    stats: [
      { icon: 'heart', value: '150+', label: 'Mothers Supported' },
      { icon: 'zap', value: 'PHC Gbonmi', label: 'Health Centre Reached' },
      { icon: 'pin', value: 'Osogbo', label: 'Osun State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-lead-city-phc-survey',
    title: 'Primary Health Centres (PHC) Assessment & Outreach',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract Club of Lead City University',
    location: 'Foko PHC (UCH), Odo Ona Elewe PHC & Adaramagbo PHC, Oyo State',
    image: '/images/projects/lead-city-phc-team.jpg',
    description: 'Comprehensive baseline survey and medical outreach assessment across 3 Primary Health Centres to supply delivery packs, prenatal support, and health education to over 170 pregnant women attending antenatal clinics weekly.',
    status: 'Completed',
    progress: 100,
    statNumber: '3 PHCs',
    statLabel: 'Centres Surveyed',
    stats: [
      { icon: 'heart', value: '170+', label: 'Antenatal Mothers' },
      { icon: 'book', value: '3 Centres', label: 'PHCs Assessed' },
      { icon: 'pin', value: 'Oluyole LG', label: 'Oyo State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-agbale-ede-execution',
    title: 'Maternal Delivery Care & Baby Supplies Outreach',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract & Rotary Club of Agbale Ede',
    location: 'Platinum Embassy Hospital, Owode Road, Ede, Osun State',
    image: '/images/projects/agbale-ede-maternal-execution.jpg',
    description: 'Direct humanitarian project execution providing newborn baby delivery supply packs, maternal hygiene kits, and financial care assistance to nursing mothers and families in Ede community.',
    status: 'Completed',
    progress: 100,
    statNumber: '80+',
    statLabel: 'Mothers & Infants',
    stats: [
      { icon: 'heart', value: '80+', label: 'Families Benefiting' },
      { icon: 'zap', value: 'Delivery Kits', label: 'Supplies Donated' },
      { icon: 'pin', value: 'Ede', label: 'Osun State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-atiba-virtual-health',
    title: 'Healthy Beginnings: Virtual Maternal & Child Health Session',
    category: 'Healthcare',
    year: '2026',
    club: 'Rotaract Club of Atiba University Oyo',
    location: 'Atiba University / Virtual Outreach',
    image: '/images/projects/atiba-virtual-health.jpg',
    description: 'Specialized health awareness session featuring nursing professionals covering antenatal care, exclusive breastfeeding, maternal nutrition, danger signs in pregnancy, and childhood immunization myths.',
    status: 'Completed',
    progress: 100,
    statNumber: '250+',
    statLabel: 'Attendees & Learners',
    stats: [
      { icon: 'book', value: '250+', label: 'Session Attendees' },
      { icon: 'zap', value: 'Google Meet', label: 'Virtual Platform' },
      { icon: 'pin', value: 'Atiba Uni', label: 'Oyo State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-new-dawn-maternal',
    title: 'Maternal & Child Health Awareness & Relief Drive',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract E-Club of Nigeria New Dawn',
    location: 'ABUAD PTS Premises, Afe Babalola University',
    image: '/images/projects/new-dawn-maternal-health.jpg',
    description: 'Community health education, sanitary pad distribution, and long-lasting insecticidal mosquito net distribution for mothers and children to combat malaria and promote maternal wellness.',
    status: 'Completed',
    progress: 100,
    statNumber: '300+',
    statLabel: 'Pads & Nets Distributed',
    stats: [
      { icon: 'heart', value: '300+', label: 'Pads & Nets' },
      { icon: 'zap', value: 'Health Talk', label: 'Clinical Guidance' },
      { icon: 'pin', value: 'ABUAD PTS', label: 'Ekiti State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-oyo-central-phc',
    title: 'Primary Health Community Sensitization & Vitals Screening',
    category: 'Community Service',
    year: '2026',
    club: 'Rotaract Club of Oyo Central',
    location: 'Oyo Town, Oyo State',
    image: '/images/projects/oyo-central-phc-outreach.jpg',
    description: 'Grassroots community mobilization and healthcare assistance outreach with nursing students and Rotaractors conducting blood pressure, sugar level screenings, and maternal education in local town centres.',
    status: 'Completed',
    progress: 100,
    statNumber: '200+',
    statLabel: 'Residents Screened',
    stats: [
      { icon: 'users', value: '200+', label: 'Citizens Reached' },
      { icon: 'heart', value: 'Free Vitals', label: 'Clinical Checks' },
      { icon: 'pin', value: 'Oyo Central', label: 'Oyo State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-ilorin-gra-four-way-test',
    title: 'The 4-Way Test Presentation & Maternal Health Outreach',
    category: 'Peacebuilding',
    year: '2026',
    club: 'Rotaract Club of Ilorin GRA',
    location: 'Ilorin, Kwara State',
    image: '/images/projects/ilorin-gra-four-way-test.jpg',
    description: 'High-level peacebuilding and ethical leadership outreach promoting the Rotary 4-Way Test alongside maternal wellness packs and healthcare supplies distribution to local community healthcare beneficiaries.',
    status: 'Completed',
    progress: 100,
    statNumber: '120+',
    statLabel: 'Community Members Reached',
    stats: [
      { icon: 'leaf', value: '4-Way Test', label: 'Ethical Leadership' },
      { icon: 'heart', value: '120+', label: 'Beneficiaries' },
      { icon: 'pin', value: 'Ilorin GRA', label: 'Kwara State' }
    ],
    createdAt: new Date().toISOString()
  }
];

async function seedAdminRest() {
  const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;
  console.log('🔐 Authenticating Service Account via Google OAuth2...');
  const token = await getGoogleAccessToken();
  console.log('✅ Access Token acquired. Seeding official projects to Firestore collection `projects`...');

  for (const project of OFFICIAL_PROJECTS) {
    const url = `${BASE_URL}/projects/${project.id}`;
    const body = JSON.stringify({
      fields: toFirestoreFields(project)
    });

    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ Error writing ${project.id}:`, err);
    } else {
      console.log(`✅ Seeded to Firestore: ${project.title}`);
    }
  }

  console.log('🎉 All exact projects successfully written to Firebase Firestore DB!');
  process.exit(0);
}

seedAdminRest().catch(console.error);
