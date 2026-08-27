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

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || 'rotaract-district-9126';
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

const OFFICIAL_PROJECTS = [
  {
    id: 'proj-smart-school',
    title: 'Smart School Makeover Project',
    category: 'Education',
    year: '2026',
    club: 'District 9126 Executive Initiative',
    location: 'District-wide (7 States)',
    image: '/images/projects/smart-school-makeover.jpg',
    description: 'Transforming secondary schools into modern learning hubs by refurbishing classrooms, providing brand new furniture, and installing a state-of-the-art computer lab with high-speed internet access alongside mentorship and digital literacy programs.',
    status: 'In Progress',
    progress: 65,
    statNumber: '500+',
    statLabel: 'Students Empowered',
    stats: [
      { icon: 'book', value: '500+', label: 'Students Benefiting' },
      { icon: 'zap', value: '₦6.5M', label: 'Total Investment' },
      { icon: 'pin', value: 'Lab + Classrooms', label: 'Facilities Refurbished' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-soft-skills',
    title: 'Acquire a Soft Skill Scholarship',
    category: 'Empowerment',
    year: '2026',
    club: 'District 9126 Human Capital Dev',
    location: 'Virtual / District 9126',
    image: '/images/projects/soft-skills-scholarship.jpg',
    description: 'Sponsoring 100 Rotaractors across 7 states to enroll in paid professional soft skill and tech courses on AQSkill with dedicated mentorship and tracking to enhance youth employability and entrepreneurial capacity.',
    status: 'In Progress',
    progress: 78,
    statNumber: '100',
    statLabel: 'Scholarships Awarded',
    stats: [
      { icon: 'users', value: '100', label: 'Rotaractors Sponsored' },
      { icon: 'zap', value: '₦700K', label: 'Scholarship Fund' },
      { icon: 'book', value: 'AQSkill', label: 'Learning Partner' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-abiamo',
    title: 'ABIAMO Maternal & Child Health Project',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract Club of Lead City & District Health Team',
    location: 'Odo Ona Elewe & Adaramagbo PHCs, Oyo State',
    image: '/images/projects/abiamo-maternal-health.jpg',
    description: 'Comprehensive maternal health intervention aimed at reducing maternal and under-5 mortality (SDG 3.1 & 3.2). Distributing delivery packs, providing antenatal supplies, and health education across Primary Health Centres.',
    status: 'In Progress',
    progress: 82,
    statNumber: '170+',
    statLabel: 'Mothers Supported',
    stats: [
      { icon: 'heart', value: '170+', label: 'Pregnant Women' },
      { icon: 'zap', value: '₦500K', label: 'Medical Grant' },
      { icon: 'pin', value: '3 PHCs', label: 'Health Facilities' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-shield',
    title: 'Project Shield: Cervical Cancer Prevention',
    category: 'Healthcare',
    year: '2026',
    club: 'Rotaract Club of Osogbo & District Healthcare Committee',
    location: 'Osogbo & South-West Communities',
    image: '/images/projects/project-shield-cancer.jpg',
    description: 'Combating cervical cancer through grassroots sensitization, HPV immunization for eligible young girls, and routine screening for women across underserved urban and rural communities.',
    status: 'In Progress',
    progress: 70,
    statNumber: '350+',
    statLabel: 'Screened & Vaccinated',
    stats: [
      { icon: 'heart', value: '350+', label: 'Women Screened' },
      { icon: 'zap', value: '₦700K', label: 'Project Outlay' },
      { icon: 'users', value: 'HPV Drive', label: 'Vaccination Campaign' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-enterprise-grant',
    title: 'Rotaract Enterprise Grant Initiative',
    category: 'Economic Development',
    year: '2026',
    club: 'District Vocational & Entrepreneurship Wing',
    location: 'District 9126 (7 States)',
    image: '/images/projects/enterprise-grant.jpg',
    description: 'Competitive business seed grant initiative empowering 8 outstanding Rotaractors (2 per quarter) with non-dilutive financial capital (₦250,000 each) and executive mentoring to launch and scale innovative ventures.',
    status: 'In Progress',
    progress: 50,
    statNumber: '8 Grants',
    statLabel: '₦2M Seed Capital',
    stats: [
      { icon: 'zap', value: '₦2.0M', label: 'Total Capital' },
      { icon: 'users', value: '8 Winners', label: 'Startups Funded' },
      { icon: 'pin', value: 'Quarterly', label: 'Cohort Cycles' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-4-way-test',
    title: "The 4-Way Test: A Compass for Life's Decision",
    category: 'Peacebuilding',
    year: '2026',
    club: 'District Executive Council & DRR Office',
    location: '7 States in District 9126',
    image: '/images/projects/district-strategic-docket-2.jpg',
    description: 'High-level advocacy, peacebuilding, and ethical leadership drive involving executive courtesy visits and the official presentation of Rotary 4-Way Test commemorative frames to all 7 First Ladies across District 9126.',
    status: 'In Progress',
    progress: 45,
    statNumber: '7 States',
    statLabel: 'First Ladies Reached',
    stats: [
      { icon: 'leaf', value: '7 States', label: 'First Ladies' },
      { icon: 'zap', value: '₦350K', label: 'Advocacy Outlay' },
      { icon: 'pin', value: 'Governance', label: 'Civic Alignment' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-100-acts',
    title: '100 Acts of Service Campaign',
    category: 'Community Service',
    year: '2026',
    club: '77 Chartered Clubs of District 9126',
    location: 'Across 77 Clubs',
    image: '/images/projects/100-acts-of-service.jpg',
    description: 'District-wide service mobilization encouraging Rotaractors across 77 clubs to execute and document 100 high-impact community acts — from charity visits to mentorship and cleanups, amplified by the District Media Team.',
    status: 'In Progress',
    progress: 88,
    statNumber: '100',
    statLabel: 'Impact Drives',
    stats: [
      { icon: 'heart', value: '100 Acts', label: 'Documented Impact' },
      { icon: 'users', value: '77 Clubs', label: 'Active Participation' },
      { icon: 'zap', value: '₦100K', label: 'Media Support' }
    ],
    createdAt: new Date().toISOString()
  }
];

async function seedViaRest() {
  console.log(`📡 Seeding ${OFFICIAL_PROJECTS.length} official projects to Firestore DB: ${PROJECT_ID}...`);

  for (const project of OFFICIAL_PROJECTS) {
    const url = `${BASE_URL}/projects/${project.id}?key=${API_KEY}`;
    const body = JSON.stringify({
      fields: toFirestoreFields(project)
    });

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(`❌ Failed to seed project ${project.id}:`, err);
      } else {
        console.log(`✅ Seeded project to Firestore DB: ${project.title}`);
      }
    } catch (e) {
      console.error(`❌ Network error for project ${project.id}:`, e.message);
    }
  }

  console.log('🎉 Firestore projects collection seeding complete!');
  process.exit(0);
}

seedViaRest();
