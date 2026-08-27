const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');
let serviceAccount;

if (fs.existsSync(serviceAccountPath)) {
  serviceAccount = require(serviceAccountPath);
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  console.error('❌ Missing service-account.json');
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

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

async function seedFirestoreProjects() {
  console.log('🔄 Seeding official projects into Firestore `projects` collection...');
  try {
    const batch = db.batch();
    for (const proj of OFFICIAL_PROJECTS) {
      const docRef = db.collection('projects').doc(proj.id);
      batch.set(docRef, {
        ...proj,
        createdAtServer: admin.firestore.FieldValue.serverTimestamp(),
        updatedAtServer: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    await batch.commit();
    console.log(`✅ Successfully seeded ${OFFICIAL_PROJECTS.length} official projects to Firestore!`);
  } catch (err) {
    console.error('❌ Error seeding projects to Firestore:', err);
  }
  process.exit(0);
}

seedFirestoreProjects();
