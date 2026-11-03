import { auth, db } from '@/lib/firebase/client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
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
  clubId?: string;
  clubName?: string;
  state?: string;
  phoneNumber?: string;
  rotaryId?: string;
  createdAt?: any;
  lastLoginAt?: any;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUserData;
  message?: string;
  error?: string;
}

export const LOCAL_USERS_KEY = 'district_9126_registered_users';
export const CURRENT_SESSION_KEY = 'district_9126_current_user';
export const SESSION_COOKIE_NAME = 'd9126_session';

export function isPlaceholderFirebaseConfig(): boolean {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '';
  return !apiKey || apiKey.startsWith('AIzaSy1234567890') || apiKey === 'mock-key';
}

export function setSessionCookie(userData: AuthUserData | null) {
  if (typeof document === 'undefined') return;
  try {
    if (!userData) {
      document.cookie = `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
      return;
    }
    const payload = encodeURIComponent(
      JSON.stringify({
        uid: userData.uid,
        role: userData.role,
        email: userData.email,
        clubId: userData.clubId || '',
      })
    );
    document.cookie = `${SESSION_COOKIE_NAME}=${payload}; Path=/; Max-Age=604800; SameSite=Lax`;
  } catch {
    // Ignore cookie errors in restricted contexts
  }
}

export function getLocalUsers(): Record<string, AuthUserData & { password?: string }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveLocalUser(userData: AuthUserData & { password?: string }) {
  if (typeof window === 'undefined') return;
  try {
    const users = getLocalUsers();
    const key = userData.email.toLowerCase();
    const existing = users[key] || {};
    const merged = { ...existing, ...userData };
    users[key] = merged;
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));

    const { password: _, ...sessionUser } = merged;
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(sessionUser));
    setSessionCookie(sessionUser);
  } catch (err) {
    console.warn('Could not save local user session:', err);
  }
}

export function updateCurrentUserSession(partial: Partial<AuthUserData>): AuthUserData | null {
  if (typeof window === 'undefined') return null;
  const current = getCurrentUser();
  if (!current) return null;
  const updated: AuthUserData = { ...current, ...partial };
  saveLocalUser(updated);
  return updated;
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
 * Tries Firebase with a 3s timeout (when live keys are configured), falls back to local session store.
 */
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check local registered users FIRST for instant login
  const localUsers = getLocalUsers();
  const existingLocal = localUsers[cleanEmail];

  if (isPlaceholderFirebaseConfig()) {
    if (existingLocal) {
      if (existingLocal.password && existingLocal.password !== password) {
        return { success: false, error: 'Invalid email or password. Please try again.' };
      }
      const { password: _, ...sessionUser } = existingLocal;
      saveLocalUser(existingLocal);
      return { success: true, user: sessionUser };
    }
    return { success: false, error: 'Invalid email or password. Please try again.' };
  }

  // 2. Try Firebase Auth with a 3-second timeout
  try {
    const cred = await withTimeout(
      signInWithEmailAndPassword(auth, cleanEmail, password),
      3000
    );
    const fbUser = cred.user;

    let role: AuthRole = existingLocal?.role || 'member';
    let firstName = fbUser.displayName?.split(' ')[0] || existingLocal?.firstName || 'Member';
    let lastName = fbUser.displayName?.split(' ').slice(1).join(' ') || existingLocal?.lastName || '';
    let duesStatus: 'pending' | 'cleared' = existingLocal?.duesStatus || 'pending';
    let clubId = existingLocal?.clubId || '';
    let clubName = existingLocal?.clubName || '';

    // Safely try Firestore profile read (non-blocking, 2s timeout)
    try {
      const userDocRef = doc(db, 'auth_users', fbUser.uid);
      const userDoc = await withTimeout(getDoc(userDocRef), 2000);
      if (userDoc.exists()) {
        const data = userDoc.data();
        role = data.role || role;
        firstName = data.firstName || firstName;
        lastName = data.lastName || lastName;
        duesStatus = data.duesStatus || duesStatus;
        clubId = data.clubId || clubId;
        clubName = data.clubName || clubName;
        setDoc(userDocRef, { lastLoginAt: serverTimestamp() }, { merge: true }).catch(() => {});
      }
    } catch {
      // Firestore read timed out or permission denied
    }

    const userData: AuthUserData = {
      uid: fbUser.uid,
      email: fbUser.email || cleanEmail,
      firstName,
      lastName,
      displayName: fbUser.displayName || `${firstName} ${lastName}`.trim(),
      role,
      duesStatus,
      clubId,
      clubName,
    };

    saveLocalUser({ ...userData, password });
    return { success: true, user: userData };
  } catch (firebaseError: any) {
    // 3. Firebase timed out or errored — fall back to local store
    if (existingLocal) {
      if (existingLocal.password && existingLocal.password !== password) {
        return { success: false, error: 'Invalid password. Please try again.' };
      }
      const { password: _, ...sessionUser } = existingLocal;
      saveLocalUser(existingLocal);
      return { success: true, user: sessionUser };
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
 * Creates the local session INSTANTLY, then syncs to Firebase in the background when live keys exist.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  profile: { firstName: string; lastName: string; role?: AuthRole; clubId?: string; clubName?: string }
): Promise<AuthResult> {
  const cleanEmail = email.trim();
  const cleanFirstName = profile.firstName.trim();
  const cleanLastName = profile.lastName.trim();
  const assignedRole: AuthRole = profile.role || 'member';
  const fullName = `${cleanFirstName} ${cleanLastName}`.trim();
  const uid = `usr-${Date.now()}`;
  const rotaryId = `ROT-9126-${String(Date.now()).slice(-4)}`;

  // 1. INSTANT: Build and persist user session immediately
  const newUserData: AuthUserData = {
    uid,
    email: cleanEmail,
    firstName: cleanFirstName,
    lastName: cleanLastName,
    displayName: fullName,
    role: assignedRole,
    duesStatus: 'pending',
    clubId: profile.clubId || 'rac-ibadan-ring-road',
    clubName: profile.clubName || 'RAC Ibadan Ring Road',
    rotaryId,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  saveLocalUser({ ...newUserData, password });

  // 2. BACKGROUND: Fire-and-forget Firebase Auth + Firestore sync when real keys exist
  if (!isPlaceholderFirebaseConfig()) {
    (async () => {
      try {
        const cred = await withTimeout(
          createUserWithEmailAndPassword(auth, cleanEmail, password),
          5000
        );
        const fbUser = cred.user;

        updateProfile(fbUser, { displayName: fullName }).catch(() => {});

        const updatedUser = { ...newUserData, uid: fbUser.uid };
        saveLocalUser({ ...updatedUser, password });

        const userDocRef = doc(db, 'auth_users', fbUser.uid);
        setDoc(userDocRef, {
          uid: fbUser.uid,
          email: cleanEmail,
          firstName: cleanFirstName,
          lastName: cleanLastName,
          displayName: fullName,
          role: assignedRole,
          duesStatus: 'pending',
          clubId: updatedUser.clubId,
          clubName: updatedUser.clubName,
          rotaryId,
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
            rotaryId,
            clubId: updatedUser.clubId,
            clubName: updatedUser.clubName,
            role:
              assignedRole === 'club_president'
                ? 'president'
                : assignedRole === 'district_admin'
                ? 'district_admin'
                : 'member',
            duesStatus: 'pending',
            avatarUrl: '',
            occupation: assignedRole === 'club_president' ? 'Club President' : 'Member',
            phoneNumber: '',
            createdAt: new Date().toISOString(),
          },
          { merge: true }
        ).catch(() => {});
      } catch (err) {
        console.info('Background Firebase sync skipped:', err);
      }
    })();
  }

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

  if (isPlaceholderFirebaseConfig()) {
    return {
      success: true,
      message: 'If an account exists with this email, password reset instructions have been dispatched.',
    };
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
    setSessionCookie(null);
  }
  if (!isPlaceholderFirebaseConfig()) {
    try {
      await signOut(auth);
    } catch {
      // Ignore
    }
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
    if (!raw) {
      setSessionCookie(null);
      return null;
    }
    const parsed: AuthUserData = JSON.parse(raw);
    setSessionCookie(parsed);
    return parsed;
  } catch {
    return null;
  }
}
