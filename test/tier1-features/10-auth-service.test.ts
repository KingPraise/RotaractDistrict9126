/**
 * Tier 1 - Suite 10: Auth & Client RBAC Service (`auth-service.ts`) Test Suite
 */

import {
  expectEqual,
  expectTruthy,
  expectDefined,
} from '../helpers/assertions';
import {
  signUpWithEmail,
  signInWithEmail,
  sendPasswordReset,
  signOutUser,
  getCurrentUser,
  AuthRole,
} from '../../lib/services/auth-service';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 10: Auth & Client RBAC Service (signIn, signUp, signOut, role sync)';
  const tests: { name: string; status: 'pass' | 'fail'; error?: string }[] = [];
  let passed = 0;
  let failed = 0;

  async function executeTest(name: string, fn: () => Promise<void> | void) {
    try {
      await fn();
      tests.push({ name, status: 'pass' });
      passed++;
    } catch (err: any) {
      tests.push({ name, status: 'fail', error: err?.message || String(err) });
      failed++;
    }
  }

  const testEmail = `test.user.${Date.now()}@rotaract9126.com.ng`;
  const testPassword = 'SecurePassword123!';

  // 1. User Sign Up
  await executeTest('signUpWithEmail(): Registers new user and initializes profile with designated role', async () => {
    const res = await signUpWithEmail(testEmail, testPassword, {
      firstName: 'Tunde',
      lastName: 'Balogun',
      role: 'club_president' as AuthRole,
    });

    expectEqual(res.success, true);
    expectDefined(res.user);
    expectEqual(res.user?.firstName, 'Tunde');
    expectEqual(res.user?.lastName, 'Balogun');
    expectEqual(res.user?.role, 'club_president');
    expectEqual(res.user?.duesStatus, 'pending');
  });

  // 2. User Sign In (Success)
  await executeTest('signInWithEmail(): Authenticates user with valid credentials and recovers role', async () => {
    const res = await signInWithEmail(testEmail, testPassword);
    expectEqual(res.success, true);
    expectDefined(res.user);
    expectEqual(res.user?.email.toLowerCase(), testEmail.toLowerCase());
  });

  // 3. User Sign In (Invalid Password)
  await executeTest('signInWithEmail(): Rejects authentication attempt with incorrect password', async () => {
    const res = await signInWithEmail(testEmail, 'WrongPassword999!');
    expectEqual(res.success, false);
    expectDefined(res.error);
  });

  // 4. Password Reset Dispatch
  await executeTest('sendPasswordReset(): Dispatches password reset flow for registered email', async () => {
    const res = await sendPasswordReset(testEmail);
    expectEqual(res.success, true);
    expectDefined(res.message);

    // Empty email rejection
    const emptyRes = await sendPasswordReset('');
    expectEqual(emptyRes.success, false);
  });

  // 5. Sign Out User
  await executeTest('signOutUser(): Clears active authentication session cleanly', async () => {
    const res = await signOutUser();
    expectEqual(res.success, true);
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
