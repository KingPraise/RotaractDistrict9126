/**
 * Tier 1 - Suite 07: Dashboard & Member Service (`dashboard-service.ts`) Test Suite
 */

import {
  expectEqual,
  expectGreaterThanOrEqual,
  expectTruthy,
  expectDefined,
  expectTypeOf,
} from '../helpers/assertions';
import {
  getMemberDashboardData,
  updateMemberDuesStatus,
  getClubRoster,
  MemberDashboardState,
} from '../../lib/services/dashboard-service';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 07: Dashboard & Member Service (Resolver, Roster, Ledger, Volunteer Hours)';
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

  // 1. Member Dashboard State Resolver
  await executeTest('getMemberDashboardData(): Resolves comprehensive member profile, metrics, and dues status', async () => {
    const data: MemberDashboardState = await getMemberDashboardData('user-mem-01');

    expectDefined(data);
    expectDefined(data.member);
    expectDefined(data.member.firstName);
    expectDefined(data.member.lastName);
    expectDefined(data.member.rotaryId);
    expectDefined(data.member.clubName);
    expectDefined(data.member.duesStatus);

    expectDefined(data.metrics);
    expectTypeOf(data.metrics.impactPoints, 'number');
    expectTypeOf(data.metrics.eventsAttended, 'number');
    expectTypeOf(data.metrics.volunteerHours, 'number');
    expectTypeOf(data.metrics.projectsJoined, 'number');
  });

  // 2. Metrics Formula Integrity
  await executeTest('Impact Points Calculation: Validates formula (events*80 + hours*10 + projects*70)', async () => {
    const data = await getMemberDashboardData('user-mem-01');
    const { eventsAttended, volunteerHours, projectsJoined, impactPoints } = data.metrics;

    const expectedImpact = eventsAttended * 80 + volunteerHours * 10 + projectsJoined * 70;
    expectEqual(impactPoints, expectedImpact, 'Impact points must precisely match weighted activity formula');
  });

  // 3. Monthly Activity & Dues Ledger Structure
  await executeTest('Monthly Activity & Dues Records: Provides chart bars and financial payment ledger entries', async () => {
    const data = await getMemberDashboardData('user-mem-01');

    expectTruthy(Array.isArray(data.monthlyActivity), 'monthlyActivity must be an array');
    expectGreaterThanOrEqual(data.monthlyActivity.length, 6, 'Must contain historical monthly trend data');
    expectDefined(data.monthlyActivity[0].month);
    expectDefined(data.monthlyActivity[0].height);

    expectTruthy(Array.isArray(data.duesRecords), 'duesRecords must be an array');
    expectGreaterThanOrEqual(data.duesRecords.length, 1, 'Must contain at least 1 dues record');
    expectDefined(data.duesRecords[0].id);
    expectDefined(data.duesRecords[0].period);
  });

  // 4. Update Member Dues Status Action
  await executeTest('updateMemberDuesStatus(): Toggles dues clearance and appends audit log record', async () => {
    const result = await updateMemberDuesStatus('user-mem-01', 'cleared', 'user-pres-ibadan');
    expectTruthy(result.success, 'Dues update should report success');
  });

  // 5. Club Roster Resolver
  await executeTest('getClubRoster(): Resolves member roster for specified club with Active/Alumni classification', async () => {
    const roster = await getClubRoster('club-ibadan-ring-road');
    expectTruthy(Array.isArray(roster), 'getClubRoster must return an array');
    expectGreaterThanOrEqual(roster.length, 1, 'Roster should contain club members');

    for (const member of roster) {
      expectDefined(member.userId);
      expectDefined(member.firstName);
      expectDefined(member.role);
      expectDefined(member.duesStatus);
      expectTruthy(
        member.duesStatus === 'cleared' || member.duesStatus === 'pending',
        'Dues status must be cleared or pending'
      );
    }
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
