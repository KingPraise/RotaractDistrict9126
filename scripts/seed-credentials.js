const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const auth = admin.auth();
const db = admin.firestore();

// FRESH REALISTIC USERS FOR EACH ROLE
const freshUsers = [
  {
    uid: 'usr-district-admin',
    email: 'admin.femi@rotaractdistrict9126.com.ng',
    password: 'DistrictAdmin2026!',
    displayName: 'Oluwafemi Adeleke',
    firstName: 'Oluwafemi',
    lastName: 'Adeleke',
    role: 'district_admin',
    clubId: 'club-ibadan-ring-road',
    clubName: 'RAC Ibadan Ring Road',
    duesStatus: 'cleared',
    rotaryId: 'ROT-9126-DRR01',
    state: 'Oyo State',
    region: 'South-West',
    phone: '+234 802 345 6789',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format'
  },
  {
    uid: 'usr-club-president',
    email: 'president.timi@rotaractdistrict9126.com.ng',
    password: 'President2026!',
    displayName: 'Peleyeju Timileyin',
    firstName: 'Peleyeju',
    lastName: 'Timileyin',
    role: 'club_president',
    clubId: 'club-ibadan-ring-road',
    clubName: 'RAC Ibadan Ring Road',
    duesStatus: 'cleared',
    rotaryId: 'ROT-9126-PRES01',
    state: 'Oyo State',
    region: 'South-West',
    phone: '+234 902 115 5714',
    avatarUrl: '/images/presidents/peleyeju-timileyin-omotayo.jpg'
  },
  {
    uid: 'usr-active-member',
    email: 'member.ayomide@rotaractdistrict9126.com.ng',
    password: 'Member2026!',
    displayName: 'Ayomide Balogun',
    firstName: 'Ayomide',
    lastName: 'Balogun',
    role: 'member',
    clubId: 'club-ui-ibadan',
    clubName: 'RAC University of Ibadan',
    duesStatus: 'cleared',
    rotaryId: 'ROT-9126-MEM01',
    state: 'Oyo State',
    region: 'South-West',
    phone: '+234 813 456 7890',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format'
  },
  {
    uid: 'usr-dues-overdue-member',
    email: 'member.chinedu@rotaractdistrict9126.com.ng',
    password: 'Member2026!',
    displayName: 'Chinedu Eze',
    firstName: 'Chinedu',
    lastName: 'Eze',
    role: 'member',
    clubId: 'club-osogbo',
    clubName: 'RAC Osogbo',
    duesStatus: 'overdue',
    rotaryId: 'ROT-9126-MEM02',
    state: 'Osun State',
    region: 'South-West',
    phone: '+234 809 123 4567',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format'
  }
];

async function resetAndSeed() {
  console.log('🔄 Step 1: Deleting existing Firebase Auth users...');
  try {
    let pageToken;
    do {
      const listUsersResult = await auth.listUsers(1000, pageToken);
      const uids = listUsersResult.users.map(u => u.uid);
      if (uids.length > 0) {
        const deleteResult = await auth.deleteUsers(uids);
        console.log(`Deleted ${deleteResult.successCount} auth users.`);
      }
      pageToken = listUsersResult.pageToken;
    } while (pageToken);
  } catch (err) {
    console.error('Error deleting auth users:', err.message);
  }

  console.log('🔄 Step 2: Clearing Firestore user collections...');
  try {
    for (const col of ['users', 'auth_users', 'members']) {
      const snap = await db.collection(col).get();
      const batch = db.batch();
      snap.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      console.log(`Cleared collection: ${col} (${snap.size} documents)`);
    }
  } catch (err) {
    console.error('Error clearing Firestore:', err.message);
  }

  console.log('✨ Step 3: Creating fresh role accounts...');
  for (const user of freshUsers) {
    try {
      // 1. Create Auth User
      await auth.createUser({
        uid: user.uid,
        email: user.email,
        password: user.password,
        displayName: user.displayName,
      });
      console.log(`✅ Auth created: ${user.email} (${user.role})`);

      // 2. Set Firestore Documents
      const timestamp = admin.firestore.FieldValue.serverTimestamp();
      const userData = {
        userId: user.uid,
        uid: user.uid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        role: user.role,
        clubId: user.clubId,
        clubName: user.clubName,
        duesStatus: user.duesStatus,
        rotaryId: user.rotaryId,
        state: user.state,
        region: user.region,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      await db.collection('auth_users').doc(user.uid).set(userData);
      await db.collection('users').doc(user.uid).set(userData);
      await db.collection('members').doc(user.uid).set(userData);
      console.log(`✅ Firestore synced: ${user.displayName}`);
    } catch (err) {
      console.error(`❌ Error creating ${user.email}:`, err.message);
    }
  }

  console.log('🎉 Reset and seeding complete!');
  process.exit(0);
}

resetAndSeed();

