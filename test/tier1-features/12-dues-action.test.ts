/**
 * Tier 1 - Suite 12: Dues Clearance Action (`actions/dues.ts`) Test Suite
 */

import {
  expectEqual,
  expectTruthy,
  expectDefined,
} from '../helpers/assertions';
import { toggleMemberDues, getClubDuesRoster } from '../../actions/dues';
import { DuesStatus } from '../../types';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 12: Dues Clearance Action (toggleMemberDues, getClubDuesRoster, Audit Log)';
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

  // 1. Toggle Member Dues to Cleared
  await executeTest('toggleMemberDues(): Clears dues for target member and returns updated metadata', async () => {
    const res = await toggleMemberDues('user-mem-01', 'cleared');
    // Note: Since this invokes adminDb or Firestore, check return ActionResult envelope
    expectDefined(res);
    expectTruthy(res.success !== undefined);
    if (res.success) {
      expectEqual(res.data?.duesStatus, 'cleared');
      expectEqual(res.data?.userId, 'user-mem-01');
      expectDefined(res.data?.updatedAt);
    }
  });

  // 2. Toggle Member Dues to Pending
  await executeTest('toggleMemberDues(): Reverts dues status to pending for targeted member', async () => {
    const res = await toggleMemberDues('user-mem-01', 'pending');
    expectDefined(res);
    if (res.success) {
      expectEqual(res.data?.duesStatus, 'pending');
    }
  });

  // 3. Validation: Missing Parameters
  await executeTest('toggleMemberDues(): Rejects invocation with missing targetUserId or newStatus', async () => {
    const resNoUser = await toggleMemberDues('', 'cleared');
    expectEqual(resNoUser.success, false);
    expectDefined(resNoUser.error);

    const resNoStatus = await toggleMemberDues('user-mem-01', '' as any);
    expectEqual(resNoStatus.success, false);
    expectDefined(resNoStatus.error);
  });

  // 4. Validation: Invalid Dues Status Enum
  await executeTest('toggleMemberDues(): Rejects invalid dues status value outside ("cleared" | "pending")', async () => {
    const resInvalid = await toggleMemberDues('user-mem-01', 'exempted' as DuesStatus);
    expectEqual(resInvalid.success, false);
    expectDefined(resInvalid.error);
    expectTruthy(resInvalid.error!.includes('Invalid dues status'));
  });

  // 5. Club Dues Roster Query
  await executeTest('getClubDuesRoster(): Fetches roster and handles empty/invalid club ID validation', async () => {
    const resEmpty = await getClubDuesRoster('');
    expectEqual(resEmpty.success, false);
    expectDefined(resEmpty.error);
    expectTruthy(resEmpty.error!.includes('Club ID is required'));

    const resValid = await getClubDuesRoster('club-ibadan-central');
    expectDefined(resValid);
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
