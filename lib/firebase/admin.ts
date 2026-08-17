import * as admin from 'firebase-admin';
import { User, UserRole } from '@/types';

function getAdminApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    // Handle escaped newlines from environment strings
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id || projectId,
      });
    } catch {
      // Fallback to individual variables if JSON parse fails
    }
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

  // Fallback to application default credentials (useful in Google Cloud / Firebase Hosting environments)
  return admin.initializeApp({
    projectId,
  });
}

const adminApp = getAdminApp();
const adminAuth = admin.auth(adminApp);
const adminDb = admin.firestore(adminApp);

/**
 * Verify a Firebase Auth ID Token from the client and return the decoded token.
 */
export async function verifyAuthToken(idToken: string): Promise<admin.auth.DecodedIdToken | null> {
  try {
    return await adminAuth.verifyIdToken(idToken);
  } catch (error) {
    console.error('Error verifying auth token:', error);
    return null;
  }
}

/**
 * Helper to fetch a User document directly by userId with typed response
 */
export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const doc = await adminDb.collection('users').doc(userId).get();
    if (!doc.exists) return null;
    return doc.data() as User;
  } catch (error) {
    console.error(`Error fetching user profile for ${userId}:`, error);
    return null;
  }
}

/**
 * Helper to verify user permissions (RBAC)
 */
export async function getUserRole(userId: string): Promise<UserRole | null> {
  const user = await getUserProfile(userId);
  return user?.role ?? null;
}

export { adminApp, adminAuth, adminDb };
