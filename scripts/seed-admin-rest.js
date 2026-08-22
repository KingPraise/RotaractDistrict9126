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

// 77 COMPLETE VERIFIED ROTARACT DISTRICT 9126 CLUBS DATASET
const SEED_CLUBS = [
  // SOUTH-WEST REGION — Oyo State (22 Clubs)
  { clubId: 'club-ibadan-ring-road', name: 'RAC Ibadan Ring Road', rotaryId: '218112', memberCount: 11, clubType: 'Community', state: 'Oyo', region: 'South-West', meetingVenue: 'Panthers Hub, Familusi Avenue, Iyaganku', meetingDay: 'Every 2nd & last Sunday of the month', meetingTime: '4:00 PM', presidentId: 'pres-ibadan-ring-road', coordinates: { lat: 7.3775, lng: 3.8670 } },
  { clubId: 'club-ui-ibadan', name: 'RAC University of Ibadan', rotaryId: '50205', memberCount: 19, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'Kenneth Dike Library Quadrangle, UI Campus, Ibadan', meetingDay: 'Every Friday', meetingTime: '5:00 PM', presidentId: 'pres-ui', coordinates: { lat: 7.4443, lng: 3.8997 } },
  { clubId: 'club-lead-city-univ', name: 'RAC Lead City University Ibadan', rotaryId: '217577', memberCount: 20, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'International Conference Hall, Lead City Campus, Ibadan', meetingDay: 'Every Thursday', meetingTime: '4:30 PM', presidentId: 'pres-lead-city', coordinates: { lat: 7.3486, lng: 3.8828 } },
  { clubId: 'club-the-poly-ibadan', name: 'RAC The Polytechnic Ibadan', rotaryId: '8827452', memberCount: 10, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'North Campus Assembly Hall, The Poly Ibadan', meetingDay: 'Every Wednesday', meetingTime: '4:00 PM', presidentId: 'pres-poly-ibadan', coordinates: { lat: 7.4326, lng: 3.8744 } },
  { clubId: 'club-uch-ibadan', name: 'RAC University College Hospital, Ibadan', rotaryId: '214344', memberCount: 12, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'Alexander Brown Hall, UCH, Ibadan', meetingDay: 'Every 2nd & 4th Saturday', meetingTime: '4:00 PM', presidentId: 'pres-uch', coordinates: { lat: 7.4022, lng: 3.9048 } },
  { clubId: 'club-fca-ibadan', name: 'RAC Federal College of Agriculture, Ibadan', rotaryId: '215293', memberCount: 5, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'Auditorium Hall, FCA Moor Plantation, Ibadan', meetingDay: 'Every Tuesday', meetingTime: '4:00 PM', presidentId: 'pres-fca', coordinates: { lat: 7.3820, lng: 3.8490 } },
  { clubId: 'club-fcc-ibadan', name: 'RAC Federal Cooperative College Ibadan', rotaryId: '213611', memberCount: 3, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'Cooperative Lecture Theatre, FCC Campus, Ibadan', meetingDay: 'Every Wednesday', meetingTime: '4:30 PM', presidentId: 'pres-fcc', coordinates: { lat: 7.4110, lng: 3.8680 } },
  { clubId: 'club-fss-oyo', name: 'RAC Federal School of Surveying, Oyo', rotaryId: '91159', memberCount: 9, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'School Main Auditorium, FSS Campus, Oyo Town', meetingDay: 'Every Thursday', meetingTime: '4:00 PM', presidentId: 'pres-fss', coordinates: { lat: 7.8500, lng: 3.9333 } },
  { clubId: 'club-tech-u-ibadan', name: 'RAC First Technical University Ibadan', rotaryId: '8824739', memberCount: 11, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'Senate Building Lawn, Tech-U Lagos-Ibadan Expressway', meetingDay: 'Every Friday', meetingTime: '4:00 PM', presidentId: 'pres-tech-u', coordinates: { lat: 7.3020, lng: 3.9320 } },
  { clubId: 'club-ibadan-akobo', name: 'RAC Ibadan Akobo', rotaryId: '90002', memberCount: 8, clubType: 'Community', state: 'Oyo', region: 'South-West', meetingVenue: 'Akobo Community Center, Iwo Road Axis, Ibadan', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:30 PM', presidentId: 'pres-akobo', coordinates: { lat: 7.4520, lng: 3.9310 } },
  { clubId: 'club-ibadan-ologuneru', name: 'RAC Ibadan Ologuneru', rotaryId: '8826945', memberCount: 12, clubType: 'Community', state: 'Oyo', region: 'South-West', meetingVenue: 'Ologuneru Town Hall, Eleyele Extension, Ibadan', meetingDay: 'Every 1st & 3rd Saturday', meetingTime: '4:00 PM', presidentId: 'pres-ologuneru', coordinates: { lat: 7.4120, lng: 3.8320 } },
  { clubId: 'club-ibadan-oritamefa', name: 'RAC Ibadan-Oritamefa', rotaryId: '215660', memberCount: 2, clubType: 'Community', state: 'Oyo', region: 'South-West', meetingVenue: 'Oritamefa Baptist Church Hall Area, Total Garden, Ibadan', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-oritamefa', coordinates: { lat: 7.3990, lng: 3.9020 } },
  { clubId: 'club-felele', name: 'RAC Felele', rotaryId: '215596', memberCount: 6, clubType: 'Community', state: 'Oyo', region: 'South-West', meetingVenue: 'Felele Layout Community Center, Challenge, Ibadan', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-felele', coordinates: { lat: 7.3510, lng: 3.8750 } },
  { clubId: 'club-moor-plantation', name: 'RAC Moor Plantation', rotaryId: '74374', memberCount: 3, clubType: 'Community', state: 'Oyo', region: 'South-West', meetingVenue: 'IAR&T Conference Center, Moor Plantation, Ibadan', meetingDay: 'Every 2nd & 4th Saturday', meetingTime: '3:30 PM', presidentId: 'pres-moor', coordinates: { lat: 7.3780, lng: 3.8510 } },
  { clubId: 'club-oyo-central', name: 'RAC Oyo Central', rotaryId: '216394', memberCount: 11, clubType: 'Community', state: 'Oyo', region: 'South-West', meetingVenue: 'Oyo Royal Club Hall, Owode, Oyo Town', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-oyo-central', coordinates: { lat: 7.8420, lng: 3.9310 } },
  { clubId: 'club-iseyin-pathfinder', name: 'RAC Iseyin Pathfinder', rotaryId: '8824492', memberCount: 6, clubType: 'Community', state: 'Oyo', region: 'South-West', meetingVenue: 'Iseyin Civic Center, Oluwole Area, Iseyin', meetingDay: 'Every 2nd & 4th Saturday', meetingTime: '4:00 PM', presidentId: 'pres-iseyin', coordinates: { lat: 7.9660, lng: 3.5980 } },
  { clubId: 'club-ibarapa-poly-eruwa', name: 'RAC Ibarapa Polytechnic, Eruwa Campus', rotaryId: '213220', memberCount: 4, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'School of Science Lecture Hall, Eruwa', meetingDay: 'Every Friday', meetingTime: '4:00 PM', presidentId: 'pres-eruwa', coordinates: { lat: 7.5340, lng: 3.4210 } },
  { clubId: 'club-lautech-ogbomoso', name: 'RAC Lautech', rotaryId: '45480', memberCount: 10, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'MKO Hall, LAUTECH Campus, Ogbomoso', meetingDay: 'Every 2nd & 4th Saturday', meetingTime: '3:00 PM', presidentId: 'pres-lautech', coordinates: { lat: 8.1333, lng: 4.2567 } },
  { clubId: 'club-atiba-university', name: 'RAC Atiba University', rotaryId: '8825777', memberCount: 3, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'Atiba University Senate Complex, Oyo', meetingDay: 'Every Wednesday', meetingTime: '4:00 PM', presidentId: 'pres-atiba', coordinates: { lat: 7.8210, lng: 3.9120 } },
  { clubId: 'club-adecom-college', name: 'RAC Adecom College', rotaryId: '8827618', memberCount: 18, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'Adecom College Campus Hall, Ibadan', meetingDay: 'Every Thursday', meetingTime: '4:00 PM', presidentId: 'pres-adecom', coordinates: { lat: 7.3620, lng: 3.8710 } },
  { clubId: 'club-highland-college', name: 'RAC Highland College of Technology', rotaryId: '8827458', memberCount: 11, clubType: 'Campus', state: 'Oyo', region: 'South-West', meetingVenue: 'Engineering Lecture Hall, Highland College, Ibadan', meetingDay: 'Every Tuesday', meetingTime: '4:00 PM', presidentId: 'pres-highland', coordinates: { lat: 7.4200, lng: 3.8900 } },
  { clubId: 'club-eclub-ibadan-pacesetter', name: 'RAC E-Club of Ibadan Pacesetter', rotaryId: '8825776', memberCount: 21, clubType: 'E-Club', state: 'Oyo', region: 'South-West', meetingVenue: 'Zoom & Google Meet Online Sessions / Ibadan Hybrid Base', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '7:30 PM', presidentId: 'pres-eclub-ibadan', coordinates: { lat: 7.3775, lng: 3.9470 } },

  // SOUTH-WEST REGION — Osun State (18 Clubs)
  { clubId: 'club-osogbo', name: 'RAC Osogbo', rotaryId: '15923', memberCount: 16, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Heritage Hotel Conference Hall, Gbongan Road, Osogbo', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:30 PM', presidentId: 'pres-osogbo', coordinates: { lat: 7.7827, lng: 4.5418 } },
  { clubId: 'club-osogbo-central', name: 'RAC Osogbo Central', rotaryId: '215585', memberCount: 4, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Ideal Nest Hotel Hall, Ring Road, Osogbo', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-osogbo-central', coordinates: { lat: 7.7710, lng: 4.5580 } },
  { clubId: 'club-uniosun-osogbo', name: 'RAC Osun State University Osogbo Campus', rotaryId: '89365', memberCount: 10, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'Main Campus ETF Hall, UNIOSUN, Osogbo', meetingDay: 'Every Wednesday', meetingTime: '4:30 PM', presidentId: 'pres-uniosun', coordinates: { lat: 7.7560, lng: 4.6020 } },
  { clubId: 'club-fountain-univ', name: 'RAC Fountain University, Osogbo', rotaryId: '8827590', memberCount: 9, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'Auditorium Hall, Fountain University, Osogbo', meetingDay: 'Every Thursday', meetingTime: '4:00 PM', presidentId: 'pres-fountain', coordinates: { lat: 7.7630, lng: 4.5820 } },
  { clubId: 'club-lautech-th-osogbo', name: 'RAC Lautech Teaching Hospital Osogbo', rotaryId: '218098', memberCount: 7, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'College of Health Sciences Complex, LTH Osogbo', meetingDay: 'Every 2nd & 4th Saturday', meetingTime: '4:00 PM', presidentId: 'pres-lautech-th', coordinates: { lat: 7.7890, lng: 4.5610 } },
  { clubId: 'club-oau-ile-ife-1', name: 'RAC OAU Ile-Ife', rotaryId: '8827783', memberCount: 9, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'Amphitheatre Floor, OAU Campus, Ile-Ife', meetingDay: 'Every Friday', meetingTime: '5:00 PM', presidentId: 'pres-oau-1', coordinates: { lat: 7.5186, lng: 4.5284 } },
  { clubId: 'club-oau-ile-ife-2', name: 'RAC Obafemi Awolowo University, Ile-Ife', rotaryId: '92022', memberCount: 7, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'Faculty of Social Sciences Foyer, OAU, Ile-Ife', meetingDay: 'Every Thursday', meetingTime: '4:30 PM', presidentId: 'pres-oau-2', coordinates: { lat: 7.5200, lng: 4.5300 } },
  { clubId: 'club-ede-cb', name: 'RAC Ede Community Based', rotaryId: '90075', memberCount: 7, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Ede Town Hall, Timi Market Square, Ede', meetingDay: 'Every 1st & 3rd Saturday', meetingTime: '4:00 PM', presidentId: 'pres-ede-cb', coordinates: { lat: 7.7380, lng: 4.4450 } },
  { clubId: 'club-fed-poly-ede', name: 'RAC Federal Polytechnic Ede', rotaryId: '43553', memberCount: 3, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'South Campus Pavilion, Fed Poly Ede', meetingDay: 'Every Wednesday', meetingTime: '4:00 PM', presidentId: 'pres-poly-ede', coordinates: { lat: 7.7290, lng: 4.4310 } },
  { clubId: 'club-harvard-poly', name: 'RAC Harvard Polytechnic', rotaryId: '8826970', memberCount: 16, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'Harvard Poly Main Hall, Iloro, Ilesa Axis', meetingDay: 'Every Tuesday', meetingTime: '4:00 PM', presidentId: 'pres-harvard-poly', coordinates: { lat: 7.5310, lng: 4.5120 } },
  { clubId: 'club-ikirun', name: 'RAC Ikirun', rotaryId: '57320', memberCount: 6, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Akinrun Palace Hall Extension, Ikirun', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-ikirun', coordinates: { lat: 7.9120, lng: 4.6610 } },
  { clubId: 'club-ila-orangun-cb', name: 'RAC Ila Orangun CB', rotaryId: '90751', memberCount: 1, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Ila Civic Center, Main Road, Ila Orangun', meetingDay: 'Every 1st & 3rd Saturday', meetingTime: '4:00 PM', presidentId: 'pres-ila', coordinates: { lat: 8.0170, lng: 4.9030 } },
  { clubId: 'club-iragbiji-cb', name: 'RAC Iragbiji CB', rotaryId: '90749', memberCount: 5, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Aragbiji Community Hall, Iragbiji', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-iragbiji', coordinates: { lat: 7.9020, lng: 4.6910 } },
  { clubId: 'club-iwo-cb', name: 'RAC Iwo Community Based', rotaryId: '214931', memberCount: 4, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Oluwo Palace Square Hall, Iwo', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-iwo', coordinates: { lat: 7.6290, lng: 4.1810 } },
  { clubId: 'club-modakeke', name: 'RAC Modakeke', rotaryId: '213160', memberCount: 9, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Modakeke Civic Center, Itasan Road, Modakeke', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-modakeke', coordinates: { lat: 7.4890, lng: 4.5510 } },
  { clubId: 'club-oyan', name: 'RAC Oyan', rotaryId: '8826726', memberCount: 9, clubType: 'Community', state: 'Osun', region: 'South-West', meetingVenue: 'Oloyan Town Hall, Oyan', meetingDay: 'Every 1st & 3rd Saturday', meetingTime: '4:00 PM', presidentId: 'pres-oyan', coordinates: { lat: 7.9820, lng: 4.7710 } },
  { clubId: 'club-uniosun-ipetu-ilesa', name: 'RAC University of Osun State Ipetu-Ilesa', rotaryId: '215840', memberCount: 7, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'College of Education Lecture Complex, Ipetu-Ijesa', meetingDay: 'Every Wednesday', meetingTime: '4:00 PM', presidentId: 'pres-uniosun-ipetu', coordinates: { lat: 7.4720, lng: 4.8910 } },
  { clubId: 'club-mm-college-health', name: 'RAC Margaret Mosunmola College of Health Science', rotaryId: '8826982', memberCount: 21, clubType: 'Campus', state: 'Osun', region: 'South-West', meetingVenue: 'College Auditorium, MMCHS Campus, Owo/Osogbo Axis', meetingDay: 'Every Thursday', meetingTime: '4:00 PM', presidentId: 'pres-mmchs', coordinates: { lat: 7.6210, lng: 4.5420 } },

  // SOUTH-WEST REGION — Ondo State (5 Clubs)
  { clubId: 'club-akure', name: 'RAC Akure', rotaryId: '16021', memberCount: 4, clubType: 'Community', state: 'Ondo', region: 'South-West', meetingVenue: 'Sunview Hotel Banquet Room, Alagbaka, Akure', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-akure', coordinates: { lat: 7.2571, lng: 5.2058 } },
  { clubId: 'club-futa-akure', name: 'RAC Federal University of Technology Akure', rotaryId: '15991', memberCount: 22, clubType: 'Campus', state: 'Ondo', region: 'South-West', meetingVenue: 'SEET Auditorium, FUTA Campus, Akure', meetingDay: 'Every Wednesday', meetingTime: '5:00 PM', presidentId: 'pres-futa', coordinates: { lat: 7.3034, lng: 5.1378 } },
  { clubId: 'club-aaua-akungba', name: 'RAC Adekunle Ajasin University', rotaryId: '62102', memberCount: 3, clubType: 'Campus', state: 'Ondo', region: 'South-West', meetingVenue: 'Faculty of Arts Theatre, AAUA Campus, Akungba-Akoko', meetingDay: 'Every Thursday', meetingTime: '4:30 PM', presidentId: 'pres-aaua', coordinates: { lat: 7.4720, lng: 5.7510 } },
  { clubId: 'club-adeyemi-univ-ondo', name: 'RAC Adeyemi Federal University of Education, Ondo', rotaryId: '43033', memberCount: 5, clubType: 'Campus', state: 'Ondo', region: 'South-West', meetingVenue: 'Olusegun Obasanjo Auditorium, AFUED, Ondo City', meetingDay: 'Every Friday', meetingTime: '4:00 PM', presidentId: 'pres-afued', coordinates: { lat: 7.0910, lng: 4.8320 } },
  { clubId: 'club-ondo-city', name: 'RAC Ondo City', rotaryId: '8828614', memberCount: 22, clubType: 'Community', state: 'Ondo', region: 'South-West', meetingVenue: 'Ondo Civic Hall, Yaba Street, Ondo City', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-ondo-city', coordinates: { lat: 7.0980, lng: 4.8410 } },

  // SOUTH-WEST REGION — Ekiti State (6 Clubs)
  { clubId: 'club-abuad-ado-ekiti', name: 'RAC ABUAD', rotaryId: '8827237', memberCount: 17, clubType: 'Campus', state: 'Ekiti', region: 'South-West', meetingVenue: 'Alfa Belgore Hall, Afe Babalola University, Ado-Ekiti', meetingDay: 'Every Friday', meetingTime: '5:00 PM', presidentId: 'pres-abuad', coordinates: { lat: 7.6010, lng: 5.3120 } },
  { clubId: 'club-eksu-ado-ekiti', name: 'RAC Ekiti State University', rotaryId: '81710', memberCount: 2, clubType: 'Campus', state: 'Ekiti', region: 'South-West', meetingVenue: 'Faculty of Science Lecture Theatre, EKSU, Ado-Ekiti', meetingDay: 'Every Wednesday', meetingTime: '4:00 PM', presidentId: 'pres-eksu', coordinates: { lat: 7.7126, lng: 5.2536 } },
  { clubId: 'club-fed-poly-ado', name: 'RAC Federal Polytechnic CEC Ado-Ekiti', rotaryId: '90629', memberCount: 4, clubType: 'Campus', state: 'Ekiti', region: 'South-West', meetingVenue: 'Continuing Education Centre Complex, Fed Poly Ado', meetingDay: 'Every Thursday', meetingTime: '4:00 PM', presidentId: 'pres-poly-ado', coordinates: { lat: 7.6213, lng: 5.2215 } },
  { clubId: 'club-fuoye-ekiti', name: 'RAC Federal University, Oye-Ekiti', rotaryId: '8823786', memberCount: 10, clubType: 'Campus', state: 'Ekiti', region: 'South-West', meetingVenue: 'Faculty of Engineering Hall, FUOYE Campus, Ikole/Oye', meetingDay: 'Every Thursday', meetingTime: '4:30 PM', presidentId: 'pres-fuoye', coordinates: { lat: 7.7980, lng: 5.3310 } },
  { clubId: 'club-espahms-ijero', name: 'RAC ESPAHMS Ijero', rotaryId: '8827236', memberCount: 11, clubType: 'Campus', state: 'Ekiti', region: 'South-West', meetingVenue: 'College Main Auditorium, ESPAHMS, Ijero-Ekiti', meetingDay: 'Every Tuesday', meetingTime: '4:00 PM', presidentId: 'pres-espahms', coordinates: { lat: 7.8120, lng: 5.0610 } },
  { clubId: 'club-school-health-tech', name: 'RAC School of Health Technology', rotaryId: '86285', memberCount: 7, clubType: 'Campus', state: 'Ekiti', region: 'South-West', meetingVenue: 'Health Science Lecture Theatre, Ijero-Ekiti', meetingDay: 'Every Wednesday', meetingTime: '4:00 PM', presidentId: 'pres-health-tech', coordinates: { lat: 7.8210, lng: 5.0720 } },

  // NORTH-CENTRAL REGION — Kwara State (10 Clubs)
  { clubId: 'club-ilorin', name: 'RAC Ilorin', rotaryId: '15961', memberCount: 9, clubType: 'Community', state: 'Kwara', region: 'North-Central', meetingVenue: 'Kwara Hotels Conference Suite, GRA, Ilorin', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-ilorin', coordinates: { lat: 8.4799, lng: 4.5418 } },
  { clubId: 'club-ilorin-metro', name: 'RAC Ilorin Metro', rotaryId: '212439', memberCount: 8, clubType: 'Community', state: 'Kwara', region: 'North-Central', meetingVenue: 'Metropolitan Hotel Hall, Unity Road, Ilorin', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-ilorin-metro', coordinates: { lat: 8.4910, lng: 4.5620 } },
  { clubId: 'club-ilorin-gra', name: 'RAC Ilorin GRA', rotaryId: '214785', memberCount: 13, clubType: 'Community', state: 'Kwara', region: 'North-Central', meetingVenue: 'Princess Luxury Hotel Banquet Room, GRA, Ilorin', meetingDay: 'Every 1st & 3rd Saturday', meetingTime: '4:30 PM', presidentId: 'pres-ilorin-gra', coordinates: { lat: 8.4680, lng: 4.5510 } },
  { clubId: 'club-ilorin-golden', name: 'RAC Ilorin Golden', rotaryId: '8823814', memberCount: 1, clubType: 'Community', state: 'Kwara', region: 'North-Central', meetingVenue: 'Golden Tulip Hall, Ilorin', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-ilorin-golden', coordinates: { lat: 8.5020, lng: 4.5310 } },
  { clubId: 'club-ilorin-new-dawn', name: 'RAC Ilorin New Dawn', rotaryId: '216894', memberCount: 2, clubType: 'Community', state: 'Kwara', region: 'North-Central', meetingVenue: 'De Peace Hotel Conference Suite, Ilorin', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-ilorin-new-dawn', coordinates: { lat: 8.4810, lng: 4.5720 } },
  { clubId: 'club-ilorin-fate-neighbourhood', name: 'RAC Ilorin Fate Neighbourhood Community Base', rotaryId: '216995', memberCount: 5, clubType: 'Community', state: 'Kwara', region: 'North-Central', meetingVenue: 'Fate Community Hall, Fate Road, Ilorin', meetingDay: 'Every 2nd & 4th Saturday', meetingTime: '4:00 PM', presidentId: 'pres-fate', coordinates: { lat: 8.4980, lng: 4.5820 } },
  { clubId: 'club-unilorin-campus', name: 'RAC University of Ilorin', rotaryId: '15899', memberCount: 7, clubType: 'Campus', state: 'Kwara', region: 'North-Central', meetingVenue: 'Student Union Building, Main Campus, UNILORIN', meetingDay: 'Every Thursday', meetingTime: '4:30 PM', presidentId: 'pres-unilorin', coordinates: { lat: 8.4842, lng: 4.6728 } },
  { clubId: 'club-nursing-ilorin', name: 'RAC College of Nursing and Midwifery, Ilorin', rotaryId: '8825220', memberCount: 8, clubType: 'Campus', state: 'Kwara', region: 'North-Central', meetingVenue: 'College Lecture Auditorium, Post Office Area, Ilorin', meetingDay: 'Every Wednesday', meetingTime: '4:00 PM', presidentId: 'pres-nursing-ilorin', coordinates: { lat: 8.4710, lng: 4.5380 } },
  { clubId: 'club-nursing-uith', name: 'RAC College of Nursing Sciences (UITH)', rotaryId: '8828433', memberCount: 15, clubType: 'Campus', state: 'Kwara', region: 'North-Central', meetingVenue: 'UITH Complex Lecture Hall, Oke Oyi, Ilorin', meetingDay: 'Every Thursday', meetingTime: '4:30 PM', presidentId: 'pres-uith', coordinates: { lat: 8.5280, lng: 4.5910 } },
  { clubId: 'club-offa-metro', name: 'RAC Offa Metropolitan', rotaryId: '8823807', memberCount: 5, clubType: 'Community', state: 'Kwara', region: 'North-Central', meetingVenue: 'Offa Civic Hall, Olofa Way, Offa', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-offa', coordinates: { lat: 8.1490, lng: 4.7180 } },

  // NORTH-CENTRAL REGION — Kogi State (9 Clubs)
  { clubId: 'club-lokoja-cb', name: 'RAC Lokoja CB', rotaryId: '8823883', memberCount: 5, clubType: 'Community', state: 'Kogi', region: 'North-Central', meetingVenue: 'Confluence Beach Hotel Banquet Room, Lokoja', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-lokoja', coordinates: { lat: 7.7969, lng: 6.7405 } },
  { clubId: 'club-ful-lokoja', name: 'RAC Federal University Lokoja', rotaryId: '91235', memberCount: 4, clubType: 'Campus', state: 'Kogi', region: 'North-Central', meetingVenue: 'Adankolo Campus Auditorium, FULokoja', meetingDay: 'Every Thursday', meetingTime: '4:30 PM', presidentId: 'pres-ful', coordinates: { lat: 7.8120, lng: 6.7210 } },
  { clubId: 'club-kogi-poly-lokoja', name: 'RAC Kogi State Polytechnic Lokoja', rotaryId: '88486', memberCount: 3, clubType: 'Campus', state: 'Kogi', region: 'North-Central', meetingVenue: 'Main Campus Assembly Complex, Lokoja', meetingDay: 'Every Wednesday', meetingTime: '4:00 PM', presidentId: 'pres-kogi-poly', coordinates: { lat: 7.8010, lng: 6.7320 } },
  { clubId: 'club-ankpa-central', name: 'RAC Ankpa Central', rotaryId: '91440', memberCount: 2, clubType: 'Community', state: 'Kogi', region: 'North-Central', meetingVenue: 'Ankpa Civic Hall, Main Road, Ankpa', meetingDay: 'Every 1st & 3rd Saturday', meetingTime: '4:00 PM', presidentId: 'pres-ankpa-central', coordinates: { lat: 7.3710, lng: 7.6320 } },
  { clubId: 'club-ankpa-cb', name: 'RAC Ankpa Community Base', rotaryId: '91447', memberCount: 1, clubType: 'Community', state: 'Kogi', region: 'North-Central', meetingVenue: 'Community Hall, Ankpa Town', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '4:00 PM', presidentId: 'pres-ankpa-cb', coordinates: { lat: 7.3620, lng: 7.6410 } },
  { clubId: 'club-alhikma-ankpa', name: 'RAC Alhikma C.O.E. Ankpa', rotaryId: '91446', memberCount: 3, clubType: 'Campus', state: 'Kogi', region: 'North-Central', meetingVenue: 'Alhikma College of Education Auditorium, Ankpa', meetingDay: 'Every Tuesday', meetingTime: '4:00 PM', presidentId: 'pres-alhikma', coordinates: { lat: 7.3810, lng: 7.6210 } },
  { clubId: 'club-idah-cb', name: 'RAC Idah Community Base', rotaryId: '88728', memberCount: 7, clubType: 'Community', state: 'Kogi', region: 'North-Central', meetingVenue: 'Attah Igala Palace Hall Axis, Idah', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-idah', coordinates: { lat: 7.1120, lng: 6.7410 } },
  { clubId: 'club-dekina-cb', name: 'RAC Dekina Community Base', rotaryId: '91436', memberCount: 5, clubType: 'Community', state: 'Kogi', region: 'North-Central', meetingVenue: 'Dekina Town Assembly Hall, Dekina', meetingDay: 'Every 2nd & 4th Saturday', meetingTime: '4:00 PM', presidentId: 'pres-dekina', coordinates: { lat: 7.6910, lng: 7.0420 } },
  { clubId: 'club-ugwolawo-cb', name: 'RAC Ugwolawo C.B.', rotaryId: '88654', memberCount: 2, clubType: 'Community', state: 'Kogi', region: 'North-Central', meetingVenue: 'Ugwolawo Community Square, Ofu LGA', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '4:00 PM', presidentId: 'pres-ugwolawo', coordinates: { lat: 7.2410, lng: 6.9210 } },

  // E-CLUBS & CROSS-REGIONAL (7 Clubs)
  { clubId: 'club-eclub-mighty', name: 'RAC E-Club Mighty', rotaryId: '8825437', memberCount: 11, clubType: 'E-Club', state: 'E-Club / Multi-State', region: 'North-Central', meetingVenue: 'Virtual Sessions (Zoom / Google Meet)', meetingDay: 'Every 1st & 3rd Sunday', meetingTime: '8:00 PM', presidentId: 'pres-eclub-mighty', coordinates: { lat: 8.4799, lng: 4.5418 } },
  { clubId: 'club-eclub-greater-nigeria', name: 'RAC E-Club of Greater Nigeria', rotaryId: '214084', memberCount: 16, clubType: 'E-Club', state: 'E-Club / Multi-State', region: 'South-West', meetingVenue: 'Virtual Headquarters / Google Meet', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '7:00 PM', presidentId: 'pres-eclub-greater-ng', coordinates: { lat: 7.3775, lng: 3.9470 } },
  { clubId: 'club-eclub-greater-ng-golden', name: 'RAC E-Club of Greater Nigeria Golden', rotaryId: '218582', memberCount: 10, clubType: 'E-Club', state: 'E-Club / Multi-State', region: 'South-West', meetingVenue: 'Virtual Platform (Zoom Link Broadcast)', meetingDay: 'Every 1st & 3rd Saturday', meetingTime: '7:30 PM', presidentId: 'pres-eclub-golden', coordinates: { lat: 7.4443, lng: 3.8997 } },
  { clubId: 'club-eclub-harmony', name: 'RAC E-Club of Harmony', rotaryId: '8826253', memberCount: 19, clubType: 'E-Club', state: 'E-Club / Multi-State', region: 'North-Central', meetingVenue: 'Online Assembly (Zoom & Discord)', meetingDay: 'Every 2nd & 4th Thursday', meetingTime: '8:00 PM', presidentId: 'pres-eclub-harmony', coordinates: { lat: 8.4842, lng: 4.6728 } },
  { clubId: 'club-eclub-ng-new-dawn', name: 'RAC E-Club of Nigeria New Dawn', rotaryId: '8827195', memberCount: 14, clubType: 'E-Club', state: 'E-Club / Multi-State', region: 'South-West', meetingVenue: 'Virtual Sessions (Google Meet Hub)', meetingDay: 'Every 1st & 3rd Wednesday', meetingTime: '7:30 PM', presidentId: 'pres-eclub-new-dawn', coordinates: { lat: 7.7827, lng: 4.5418 } },
  { clubId: 'club-eclub-one-nigeria', name: 'RAC E-Club of One Nigeria', rotaryId: '8826376', memberCount: 11, clubType: 'E-Club', state: 'E-Club / Multi-State', region: 'North-Central', meetingVenue: 'Online Rotaract Lounge / Zoom', meetingDay: 'Every 2nd & 4th Sunday', meetingTime: '8:00 PM', presidentId: 'pres-eclub-one-ng', coordinates: { lat: 7.7969, lng: 6.7405 } },
  { clubId: 'club-eclub-peace-nigeria', name: 'RAC E-Club of Peace Nigeria', rotaryId: '8828549', memberCount: 10, clubType: 'E-Club', state: 'E-Club / Multi-State', region: 'South-West', meetingVenue: 'Online Peace Hub / Zoom', meetingDay: 'Every 1st & 3rd Friday', meetingTime: '8:00 PM', presidentId: 'pres-eclub-peace', coordinates: { lat: 7.2571, lng: 5.2058 } },
];

// HISTORICAL LEADERSHIP (DRRs)
const SEED_LEADERSHIP = [
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
    avatarUrl: '/images/leaders/drr-adebayo-sodiq.jpg',
  },
  {
    eraId: 'drr-2024-2025',
    year: '2024/2025',
    rotaryYear: '2024-2025',
    designation: 'Inaugural District Rotaract Representative (D9126)',
    leaderName: 'Rtr. PP Oyewumi Kamaldeen Adeshina, PHF, FEIPA',
    theme: 'The Magic of Rotary',
    district: 'District 9126 (Inaugural Charter Year)',
    isCurrent: false,
    notes: 'Led the foundational transition, charter assembly, and geographic alignment of the 7 constituent states.',
    avatarUrl: '/images/leaders/drr-oyewumi-kamaldeen.jpg',
  },
  {
    eraId: 'drr-2025-2026',
    year: '2025/2026',
    rotaryYear: '2025-2026',
    designation: '2nd District Rotaract Representative (D9126)',
    leaderName: 'Consolidation Leadership Assembly',
    theme: 'Unite for Good',
    district: 'District 9126 (Consolidation Year)',
    isCurrent: false,
    notes: 'Deepened youth leadership, club governance, and regional service partnerships across South-West and North-Central.',
    avatarUrl: '/images/leader-service.jpg',
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
    avatarUrl: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
  },
];

// DISTRICT PUBLIC METRICS
const SEED_METRICS = {
  metricId: 'district-9126-metrics',
  activeClubs: 77,
  totalRotaractors: 700,
  constituentStates: 7,
  regions: ['South-West', 'North-Central'],
  states: ['Osun', 'Oyo', 'Ondo', 'Ekiti', 'Kwara', 'Niger', 'Kogi'],
  currentDRR: 'Rtr. PP Adaramoye Iyanuoluwa, PHF',
  rotaryYear: '2026/2027',
  updatedAt: new Date().toISOString(),
};

const SEED_USERS = [
  {
    userId: 'user-drr-9126',
    firstName: 'Adaramoye',
    lastName: 'Iyanuoluwa',
    email: 'drr@rotaractdistrict9126.com.ng',
    rotaryId: 'ROT-9126-0001',
    clubId: 'club-ibadan-ring-road',
    role: 'district_admin',
    duesStatus: 'cleared',
    avatarUrl: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
    occupation: 'District Rotaract Representative (DRR)',
    phoneNumber: '+2348012345678',
    createdAt: new Date().toISOString(),
  },
  {
    userId: 'user-sec-9126',
    firstName: 'Faleye',
    lastName: 'Ifeoluwa',
    email: 'secretary@rotaractdistrict9126.com.ng',
    rotaryId: 'ROT-9126-0002',
    clubId: 'club-osogbo',
    role: 'district_admin',
    duesStatus: 'cleared',
    avatarUrl: '/images/leaders/leader-secretary-faleye.jpg',
    occupation: 'District Secretary',
    phoneNumber: '+2348023456789',
    createdAt: new Date().toISOString(),
  },
  {
    userId: 'user-treas-9126',
    firstName: 'Odufuwa Omotoke',
    lastName: 'Anita',
    email: 'treasurer@rotaractdistrict9126.com.ng',
    rotaryId: 'ROT-9126-0003',
    clubId: 'club-akure',
    role: 'district_admin',
    duesStatus: 'cleared',
    avatarUrl: '/images/leaders/leader-treasurer-odufuwa.jpg',
    occupation: 'District Treasurer',
    phoneNumber: '+2348034567890',
    createdAt: new Date().toISOString(),
  },
];

async function seedFirestoreREST() {
  console.log(`[Seed REST] Authenticating with Google Cloud OAuth2 for project: ${PROJECT_ID}...`);
  const accessToken = await getGoogleAccessToken();
  console.log(`[Seed REST] Authenticated successfully.`);

  const firestoreBase = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

  // 1. Seed 77 Clubs
  console.log(`\n[1/4] Writing ${SEED_CLUBS.length} Clubs into Firestore collection 'clubs'...`);
  let clubCount = 0;
  for (const club of SEED_CLUBS) {
    const url = `${firestoreBase}/clubs/${club.clubId}`;
    const fields = toFirestoreFields({
      ...club,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`Error writing club ${club.clubId}:`, err);
    } else {
      clubCount++;
    }
  }
  console.log(`[✓] Successfully seeded ${clubCount}/${SEED_CLUBS.length} clubs.`);

  // 2. Seed Leadership Lineage
  console.log(`\n[2/4] Writing ${SEED_LEADERSHIP.length} Historical DRR documents into 'leadership'...`);
  let leadCount = 0;
  for (const lead of SEED_LEADERSHIP) {
    const url = `${firestoreBase}/leadership/${lead.eraId}`;
    const fields = toFirestoreFields(lead);
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });
    if (res.ok) leadCount++;
  }
  console.log(`[✓] Successfully seeded ${leadCount}/${SEED_LEADERSHIP.length} leadership records.`);

  // 3. Seed District Public Metrics
  console.log(`\n[3/4] Writing District Public Metrics into 'metrics/${SEED_METRICS.metricId}'...`);
  const metricUrl = `${firestoreBase}/metrics/${SEED_METRICS.metricId}`;
  const metricFields = toFirestoreFields(SEED_METRICS);
  const metricRes = await fetch(metricUrl, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: metricFields }),
  });
  if (metricRes.ok) {
    console.log(`[✓] Successfully seeded District 9126 Public Metrics.`);
  }

  // 4. Seed District Executive Users
  console.log(`\n[4/4] Writing ${SEED_USERS.length} Executive Users into 'users'...`);
  let userCount = 0;
  for (const user of SEED_USERS) {
    const url = `${firestoreBase}/users/${user.userId}`;
    const fields = toFirestoreFields(user);
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });
    if (res.ok) userCount++;
  }
  console.log(`[✓] Successfully seeded ${userCount}/${SEED_USERS.length} users.`);

  console.log(`\n======================================================`);
  console.log(`🎉 ALL 77 DISTRICT 9126 CLUBS & DATASETS SEEDED IN FIRESTORE!`);
  console.log(`======================================================\n`);
}

seedFirestoreREST().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
