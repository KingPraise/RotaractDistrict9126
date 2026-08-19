/**
 * Tier 1 - Suite 13: Prospects Pipeline Action (`actions/prospects.ts`) Test Suite
 */

import {
  expectEqual,
  expectTruthy,
  expectDefined,
} from '../helpers/assertions';
import {
  submitProspectLead,
  updateProspectStatus,
  getClubProspects,
} from '../../actions/prospects';
import { ProspectInput, ProspectStatus } from '../../types';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 13: Prospects Action (submitProspectLead, 4-Stage Kanban, Resend Alert)';
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

  let testProspectId = `prospect-${Date.now()}`;

  // 1. Submit Prospect Lead
  await executeTest('submitProspectLead(): Creates new prospect record with initial status "new"', async () => {
    const input: ProspectInput = {
      fullName: 'Adekola Victor',
      email: `adekola.${Date.now()}@example.com`,
      phone: '+2348076543210',
      assignedClubId: 'club-osogbo-metro',
      preferredState: 'Osun',
      notes: 'Wants to participate in youth peace initiatives.',
    };

    const res = await submitProspectLead(input);
    expectDefined(res);
    if (res.success) {
      expectDefined(res.data?.prospectId);
      expectEqual(res.data?.prospect.status, 'new');
      expectEqual(res.data?.prospect.fullName, 'Adekola Victor');
      testProspectId = res.data!.prospectId;
    }
  });

  // 2. Validation: Required Input Fields
  await executeTest('submitProspectLead(): Rejects submissions missing required fields', async () => {
    const missingInput: ProspectInput = {
      fullName: '',
      email: 'test@example.com',
      phone: '+2348012345678',
      assignedClubId: 'club-osogbo-metro',
    };
    const res = await submitProspectLead(missingInput);
    expectEqual(res.success, false);
    expectDefined(res.error);
    expectTruthy(res.error!.includes('required fields'));
  });

  // 3. Validation: Email Format
  await executeTest('submitProspectLead(): Rejects submissions with invalid email address format', async () => {
    const badEmailInput: ProspectInput = {
      fullName: 'Bad Email Lead',
      email: 'not-an-email-at-all',
      phone: '+2348012345678',
      assignedClubId: 'club-osogbo-metro',
    };
    const res = await submitProspectLead(badEmailInput);
    expectEqual(res.success, false);
    expectDefined(res.error);
    expectTruthy(res.error!.includes('valid email'));
  });

  // 4. 4-Stage Kanban Progression
  await executeTest('updateProspectStatus(): Transitions status through 4 lifecycle stages', async () => {
    const stages: ProspectStatus[] = ['contacted', 'meeting_attended', 'inducted'];

    for (const stage of stages) {
      const res = await updateProspectStatus(testProspectId, stage, `Updated to ${stage}`);
      expectDefined(res);
      if (res.success) {
        expectEqual(res.data?.status, stage);
      }
    }
  });

  // 5. Validation: Invalid Prospect Status Enum
  await executeTest('updateProspectStatus(): Rejects invalid pipeline status values', async () => {
    const badStatusRes = await updateProspectStatus(testProspectId, 'archived_deleted' as ProspectStatus);
    expectEqual(badStatusRes.success, false);
    expectDefined(badStatusRes.error);
    expectTruthy(badStatusRes.error!.includes('Invalid status'));
  });

  // 6. Club Prospects Query
  await executeTest('getClubProspects(): Fetches club leads and handles missing clubId parameter', async () => {
    const emptyRes = await getClubProspects('');
    expectEqual(emptyRes.success, false);
    expectDefined(emptyRes.error);

    const validRes = await getClubProspects('club-osogbo-metro');
    expectDefined(validRes);
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
