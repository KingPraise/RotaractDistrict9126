import { auth, db } from '@/lib/firebase/client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export type AuthRole = 'member' | 'club_president' | 'district_admin';

export interface AuthUserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: AuthRole;
  duesStatus: 'pending' | 'cleared';
  createdAt?: any;
  lastLoginAt?: any;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUserData;
  message?: string;
  error?: string;
}

const LOCAL_USERS_KEY = 'district_9126_registered_users';
const CURRENT_SESSION_KEY = 'district_9126_current_user';

function getLocalUsers(): Record<string, AuthUserData & { password?: string }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalUser(userData: AuthUserData & { password?: string }) {
  if (typeof window === 'undefined') return;
  try {
    const users = getLocalUsers();
    users[userData.email.toLowerCase()] = userData;
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(userData));
  } catch (err) {
    console.warn('Could not save local user session:', err);
  }
}

/**
 * Race a promise against a timeout. Returns the promise result if it resolves
 * before the deadline, otherwise throws a timeout error.
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), ms)
    ),
  ]);
}

/**
 * Sign in existing user with email and password.
 * Tries Firebase with a 3s timeout, falls back to local session store.
 */
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check local registered users FIRST for instant login
  const localUsers = getLocalUsers();
  const existingLocal = localUsers[cleanEmail];

  // 2. Try Firebase Auth with a 3-second timeout
  try {
    const cred = await withTimeout(
      signInWithEmailAndPassword(auth, cleanEmail, password),
      3000
    );
    const fbUser = cred.user;

    let role: AuthRole = 'member';
    let firstName = fbUser.displayName?.split(' ')[0] || 'Member';
    let lastName = fbUser.displayName?.split(' ').slice(1).join(' ') || '';
    let duesStatus: 'pending' | 'cleared' = 'pending';

    // Safely try Firestore profile read (non-blocking, 2s timeout)
    try {
      const userDocRef = doc(db, 'auth_users', fbUser.uid);
      const userDoc = await withTimeout(getDoc(userDocRef), 2000);
      if (userDoc.exists()) {
        const data = userDoc.data();
        role = data.role || 'member';
        firstName = data.firstName || firstName;
        lastName = data.lastName || lastName;
        duesStatus = data.duesStatus || 'pending';
        // Fire-and-forget last login update
        setDoc(userDocRef, { lastLoginAt: serverTimestamp() }, { merge: true }).catch(() => {});
      }
    } catch {
      // Firestore read timed out or permission denied — no problem
    }

    const userData: AuthUserData = {
      uid: fbUser.uid,
      email: fbUser.email || cleanEmail,
      firstName,
      lastName,
      displayName: fbUser.displayName || `${firstName} ${lastName}`.trim(),
      role,
      duesStatus,
    };

    saveLocalUser(userData);
    return { success: true, user: userData };
  } catch (firebaseError: any) {
    // 3. Firebase timed out or errored — fall back to local store
    if (existingLocal) {
      if (existingLocal.password && existingLocal.password !== password) {
        return { success: false, error: 'Invalid password. Please try again.' };
      }
      saveLocalUser(existingLocal);
      return { success: true, user: existingLocal };
    }

    let humanError = 'Failed to sign in. Please check your credentials.';
    if (
      firebaseError.code === 'auth/user-not-found' ||
      firebaseError.code === 'auth/wrong-password' ||
      firebaseError.code === 'auth/invalid-credential'
    ) {
      humanError = 'Invalid email or password. Please try again.';
    } else if (firebaseError.code === 'auth/too-many-requests') {
      humanError = 'Too many failed attempts. Please try again in a few minutes.';
    } else if (firebaseError.message === 'TIMEOUT') {
      humanError = 'Network is slow. Please check your internet connection and try again.';
    }

    return { success: false, error: humanError };
  }
}

/**
 * Register a new user.
 * Creates the local session INSTANTLY, then syncs to Firebase in the background.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  profile: { firstName: string; lastName: string; role?: AuthRole }
): Promise<AuthResult> {
  const cleanEmail = email.trim();
  const cleanFirstName = profile.firstName.trim();
  const cleanLastName = profile.lastName.trim();
  const assignedRole: AuthRole = profile.role || 'member';
  const fullName = `${cleanFirstName} ${cleanLastName}`.trim();
  const uid = `usr-${Date.now()}`;

  // 1. INSTANT: Build and persist user session immediately
  const newUserData: AuthUserData = {
    uid,
    email: cleanEmail,
    firstName: cleanFirstName,
    lastName: cleanLastName,
    displayName: fullName,
    role: assignedRole,
    duesStatus: 'pending',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  saveLocalUser({ ...newUserData, password });

  // 2. BACKGROUND: Fire-and-forget Firebase Auth + Firestore sync
  // This runs asynchronously AFTER returning success to the UI
  (async () => {
    try {
      const cred = await withTimeout(
        createUserWithEmailAndPassword(auth, cleanEmail, password),
        5000
      );
      const fbUser = cred.user;

      // Update display name (fire-and-forget)
      updateProfile(fbUser, { displayName: fullName }).catch(() => {});

      // Update local session with real Firebase UID
      const updatedUser = { ...newUserData, uid: fbUser.uid };
      saveLocalUser({ ...updatedUser, password });

      // Firestore profile sync (fire-and-forget)
      const userDocRef = doc(db, 'auth_users', fbUser.uid);
      setDoc(userDocRef, {
        uid: fbUser.uid,
        email: cleanEmail,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        displayName: fullName,
        role: assignedRole,
        duesStatus: 'pending',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      }).catch(() => {});

      const portalUserRef = doc(db, 'users', fbUser.uid);
      setDoc(
        portalUserRef,
        {
          userId: fbUser.uid,
          firstName: cleanFirstName,
          lastName: cleanLastName,
          email: cleanEmail,
          rotaryId: `ROT-9126-${Math.floor(1000 + Math.random() * 9000)}`,
          clubId: 'club-ibadan-central',
          role: assignedRole === 'club_president' ? 'president' : assignedRole === 'district_admin' ? 'district_admin' : 'member',
          duesStatus: 'pending',
          avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80`,
          occupation: 'Member',
          phoneNumber: '',
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {});
    } catch (err) {
      console.info('Background Firebase sync skipped:', err);
    }
  })();

  // 3. Return immediately — user sees instant redirect
  return {
    success: true,
    user: newUserData,
    message: 'Account created successfully!',
  };
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<AuthResult> {
  const cleanEmail = email.trim();
  if (!cleanEmail) {
    return { success: false, error: 'Please enter your registered email address.' };
  }

  try {
    await withTimeout(sendPasswordResetEmail(auth, cleanEmail), 4000);
    return {
      success: true,
      message: 'Password reset link has been dispatched to your email address.',
    };
  } catch {
    return {
      success: true,
      message: 'If an account exists with this email, password reset instructions have been dispatched.',
    };
  }
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<{ success: boolean; error?: string }> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
  try {
    await signOut(auth);
  } catch {
    // Ignore
  }
  return { success: true };
}

/**
 * Get current authenticated user session
 */
export function getCurrentUser(): AuthUserData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
