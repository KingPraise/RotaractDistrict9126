/**
 * Tier 1 - Suite 09: Lead Intake Service (`intake-service.ts`) Test Suite
 */

import {
  expectEqual,
  expectTruthy,
  expectDefined,
} from '../helpers/assertions';
import { submitProspectLead, ProspectLeadInput } from '../../lib/services/intake-service';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 09: Lead Intake Service (7-State Proximity Club Routing & Validation)';
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

  // 1. Valid Intake Submission
  await executeTest('submitProspectLead(): Successfully creates lead document and returns assigned club', async () => {
    const input: ProspectLeadInput = {
      name: 'Adewale Adeleke',
      email: `adewale.${Date.now()}@example.com`,
      phone: '+2348039876543',
      state: 'Oyo',
      notes: 'Excited to join Rotaract for community leadership and service.',
    };

    const result = await submitProspectLead(input);
    expectEqual(result.success, true);
    expectDefined(result.assignedClub);
    expectEqual(result.assignedClub, 'Rotaract Club of Ibadan Central');
  });

  // 2. Required Fields Validation
  await executeTest('submitProspectLead(): Rejects lead when required fields (name, email, phone) are missing', async () => {
    const missingName: ProspectLeadInput = {
      name: '',
      email: 'lead@example.com',
      phone: '+2348012345678',
      state: 'Osun',
    };
    const res1 = await submitProspectLead(missingName);
    expectEqual(res1.success, false);
    expectDefined(res1.error);

    const missingEmail: ProspectLeadInput = {
      name: 'John Doe',
      email: '',
      phone: '+2348012345678',
      state: 'Osun',
    };
    const res2 = await submitProspectLead(missingEmail);
    expectEqual(res2.success, false);
  });

  // 3. 7-State Proximity Routing Table
  await executeTest('submitProspectLead(): Automatically routes leads to designated hub clubs across all 7 constituent states', async () => {
    const stateRoutingExpectations: Record<string, string> = {
      Osun: 'Rotaract Club of Osogbo Metro',
      Oyo: 'Rotaract Club of Ibadan Central',
      Ondo: 'Rotaract Club of Akure Golden',
      Ekiti: 'Rotaract Club of Ado-Ekiti Prestige',
      Kwara: 'Rotaract Club of Ilorin Metro',
      Niger: 'Rotaract Club of Minna Central',
      Kogi: 'Rotaract Club of Lokoja Confluence',
    };

    for (const [state, expectedClub] of Object.entries(stateRoutingExpectations)) {
      const input: ProspectLeadInput = {
        name: `Prospect of ${state}`,
        email: `lead.${state.toLowerCase()}.${Date.now()}@example.com`,
        phone: '+2348012345678',
        state,
      };

      const result = await submitProspectLead(input);
      expectEqual(result.success, true, `Should successfully submit for state: ${state}`);
      expectEqual(result.assignedClub, expectedClub, `State ${state} should route to ${expectedClub}`);
    }
  });

  // 4. Preferred Club Override
  await executeTest('submitProspectLead(): Respects user explicitly chosen preferred club override', async () => {
    const input: ProspectLeadInput = {
      name: 'Student Leader',
      email: `student.${Date.now()}@ui.edu.ng`,
      phone: '+2348098765432',
      state: 'Oyo',
      preferredClub: 'Rotaract Club of University of Ibadan',
    };

    const result = await submitProspectLead(input);
    expectEqual(result.success, true);
    expectEqual(result.assignedClub, 'Rotaract Club of University of Ibadan');
  });

  // 5. Email Regex Validation in Lead Pipeline
  await executeTest('submitProspectLead(): Rejects invalid email syntax', async () => {
    const badInput: ProspectLeadInput = {
      name: 'Invalid Email User',
      email: 'not-a-valid-email-syntax',
      phone: '+2348012345678',
      state: 'Osun',
    };

    const result = await submitProspectLead(badInput);
    expectEqual(result.success, false);
    expectDefined(result.error);
    expectTruthy(result.error!.includes('email'));
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
