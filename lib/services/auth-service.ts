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

/**
 * Sign in existing user with email and password
 */
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
    const fbUser = cred.user;

    // Fetch user profile from `auth_users`
    const userDocRef = doc(db, 'auth_users', fbUser.uid);
    const userDoc = await getDoc(userDocRef);

    let role: AuthRole = 'member';
    let firstName = fbUser.displayName?.split(' ')[0] || '';
    let lastName = fbUser.displayName?.split(' ').slice(1).join(' ') || '';

    if (userDoc.exists()) {
      const data = userDoc.data();
      role = data.role || 'member';
      firstName = data.firstName || firstName;
      lastName = data.lastName || lastName;

      // Update last login
      await setDoc(userDocRef, { lastLoginAt: serverTimestamp() }, { merge: true });
    }

    const userData: AuthUserData = {
      uid: fbUser.uid,
      email: fbUser.email || '',
      firstName,
      lastName,
      displayName: fbUser.displayName || `${firstName} ${lastName}`,
      role,
      duesStatus: userDoc.exists() ? userDoc.data().duesStatus || 'pending' : 'pending',
    };

    return {
      success: true,
      user: userData,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    let humanError = 'Failed to sign in. Please check your credentials.';

    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
      humanError = 'Invalid email or password. Please try again.';
    } else if (err.code === 'auth/too-many-requests') {
      humanError = 'Too many failed login attempts. Please reset your password or try again later.';
    } else if (err.message) {
      humanError = err.message;
    }

    return {
      success: false,
      error: humanError,
    };
  }
}

/**
 * Register a new user with email, password, and custom profile fields
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  profile: { firstName: string; lastName: string; role?: AuthRole }
): Promise<AuthResult> {
  try {
    const cleanEmail = email.trim();
    const cleanFirstName = profile.firstName.trim();
    const cleanLastName = profile.lastName.trim();
    const assignedRole: AuthRole = profile.role || 'member';
    const fullName = `${cleanFirstName} ${cleanLastName}`;

    const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    const fbUser = cred.user;

    // Update Firebase Auth profile display name
    await updateProfile(fbUser, { displayName: fullName });

    const newUserData: AuthUserData = {
      uid: fbUser.uid,
      email: cleanEmail,
      firstName: cleanFirstName,
      lastName: cleanLastName,
      displayName: fullName,
      role: assignedRole,
      duesStatus: 'pending',
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    };

    // Store in `auth_users` collection for RBAC
    const userDocRef = doc(db, 'auth_users', fbUser.uid);
    await setDoc(userDocRef, newUserData);

    // Also sync to `users` collection for portal compatibility
    const portalUserRef = doc(db, 'users', fbUser.uid);
    await setDoc(
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
    );

    return {
      success: true,
      user: newUserData,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    let humanError = 'Failed to create account. Please try again.';

    if (err.code === 'auth/email-already-in-use') {
      humanError = 'An account with this email address already exists.';
    } else if (err.code === 'auth/weak-password') {
      humanError = 'Password is too weak. Please use at least 8 characters with numbers or symbols.';
    } else if (err.message) {
      humanError = err.message;
    }

    return {
      success: false,
      error: humanError,
    };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<AuthResult> {
  try {
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      return { success: false, error: 'Please enter your registered email address.' };
    }

    await sendPasswordResetEmail(auth, cleanEmail);

    return {
      success: true,
      message: 'Password reset link has been dispatched to your email address.',
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    let humanError = 'Failed to send password reset email.';

    if (err.code === 'auth/user-not-found') {
      // Return success message to avoid account enumeration attacks
      return {
        success: true,
        message: 'If an account exists with this email, a reset link has been sent.',
      };
    } else if (err.message) {
      humanError = err.message;
    }

    return {
      success: false,
      error: humanError,
    };
  }
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<{ success: boolean; error?: string }> {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Failed to sign out.';
    return { success: false, error: errMsg };
  }
}
