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

const usersToSeed = [
  {
    uid: 'seed-president',
    email: 'president.ibadan@rotaractdistrict9126.com.ng',
    password: 'President2026!',
    displayName: 'Ibadan President',
    role: 'president',
    firstName: 'Ibadan',
    lastName: 'President',
    clubId: 'club-ibadan-central',
    duesStatus: 'cleared',
    rotaryId: 'ROT-9126-PRES'
  },
  {
    uid: 'seed-member',
    email: 'member.tunde@rotaractdistrict9126.com.ng',
    password: 'Member2026!',
    displayName: 'Tunde Member',
    role: 'member',
    firstName: 'Tunde',
    lastName: 'Member',
    clubId: 'club-ibadan-central',
    duesStatus: 'cleared',
    rotaryId: 'ROT-9126-2026'
  },
  {
    uid: 'seed-admin',
    email: 'admin@rotaractdistrict9126.com.ng',
    password: 'DistrictAdmin2026!',
    displayName: 'District Admin',
    role: 'district_admin',
    firstName: 'District',
    lastName: 'Admin',
    clubId: 'club-ibadan-central',
    duesStatus: 'cleared',
    rotaryId: 'ROT-9126-ADMIN'
  }
];

async function seedUsers() {
  console.log('Seeding credentials to Firebase...');
  
  for (const user of usersToSeed) {
    try {
      // 1. Create or Update Auth User
      try {
        await auth.updateUser(user.uid, {
          email: user.email,
          password: user.password,
          displayName: user.displayName
        });
        console.log(`Updated auth for: ${user.email}`);
      } catch (err) {
        if (err.code === 'auth/user-not-found') {
          await auth.createUser({
            uid: user.uid,
            email: user.email,
            password: user.password,
            displayName: user.displayName
          });
          console.log(`Created auth for: ${user.email}`);
        } else {
          throw err;
        }
      }

      // 2. Set Firestore Documents
      const timestamp = admin.firestore.FieldValue.serverTimestamp();
      
      const userData = {
        userId: user.uid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        role: user.role,
        clubId: user.clubId,
        duesStatus: user.duesStatus,
        rotaryId: user.rotaryId,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      await db.collection('auth_users').doc(user.uid).set(userData, { merge: true });
      await db.collection('users').doc(user.uid).set(userData, { merge: true });
      
      console.log(`Synced Firestore profiles for: ${user.email}`);
    } catch (error) {
      console.error(`Error processing ${user.email}:`, error);
    }
  }
  
  console.log('Seeding complete!');
  process.exit(0);
}

seedUsers();
