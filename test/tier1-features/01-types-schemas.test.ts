/**
 * Tier 1 - Suite 01: TypeScript Types & Schema Validation Test Suite
 */

import {
  expectEqual,
  expectTruthy,
  expectFalsy,
  expectSchemaValid,
  expectDefined,
  expectTypeOf,
} from '../helpers/assertions';
import {
  generateMockUser,
  generateMockClub,
  generateMockHistoricalLeader,
  generateMockDistrictMetrics,
  generateMockProspect,
  generateMockProject,
  generateMockCloudinaryPayload,
  generateMockMemberQRPayload,
  validateUserSchema,
  validateClubSchema,
  validateHistoricalLeaderSchema,
  validateDistrictMetricsSchema,
  validateProspectSchema,
  validateProjectSchema,
  validateCloudinarySignatureSchema,
  validateMemberQRPayloadSchema,
} from '../helpers/mock-payloads';
import { ActionResult, ProspectInput, UserRole, DuesStatus, DistrictState } from '../../types';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 01: Types & Data Schemas';
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

  // 1. User Schema Verification
  await executeTest('User Schema: Validates required fields, email format, role enum and dues clearance', () => {
    const validUser = generateMockUser({
      role: 'president',
      duesStatus: 'cleared',
    });
    expectSchemaValid(validUser, validateUserSchema, 'User schema should pass validation');
    expectEqual(validUser.role, 'president');
    expectEqual(validUser.duesStatus, 'cleared');

    // Negative validation: invalid email
    const invalidEmailUser = { ...validUser, email: 'not-an-email' };
    const invalidResult = validateUserSchema(invalidEmailUser);
    expectFalsy(invalidResult.valid, 'Invalid email format must be rejected');
    expectTruthy(invalidResult.errors?.some((e) => e.includes('email')), 'Error should specify email');

    // Negative validation: invalid role
    const invalidRoleUser = { ...validUser, role: 'super_god' as UserRole };
    const invalidRoleResult = validateUserSchema(invalidRoleUser);
    expectFalsy(invalidRoleResult.valid, 'Invalid role must be rejected');
  });

  // 2. Club Schema Verification
  await executeTest('Club Schema: Validates 7 constituent states, regions, and geographic coordinates', () => {
    const validClub = generateMockClub({
      state: 'Osun',
      region: 'South-West',
      coordinates: { lat: 7.7827, lng: 4.5418 },
    });
    expectSchemaValid(validClub, validateClubSchema, 'Club schema should pass validation');
    expectTypeOf(validClub.coordinates.lat, 'number');
    expectTypeOf(validClub.coordinates.lng, 'number');

    // Negative validation: invalid state outside 7 states
    const invalidStateClub = { ...validClub, state: 'Lagos' as DistrictState };
    const invalidResult = validateClubSchema(invalidStateClub);
    expectFalsy(invalidResult.valid, 'State outside District 9126 boundary must be rejected');

    // Negative validation: missing coordinates
    const missingCoordsClub = { ...validClub, coordinates: null as any };
    const missingCoordsResult = validateClubSchema(missingCoordsClub);
    expectFalsy(missingCoordsResult.valid, 'Missing coordinates must fail');
  });

  // 3. HistoricalLeader & DistrictMetrics Schema Verification
  await executeTest('HistoricalLeader & DistrictMetrics: Validates DRR heritage and district public stats', () => {
    const leader = generateMockHistoricalLeader({
      eraId: 'drr-2024-2025',
      leaderName: 'Rtr. PP Oyewumi Kamaldeen',
      year: '2024/2025',
      rotaryYear: '2024-2025',
      designation: 'Inaugural District Rotaract Representative (D9126)',
      theme: 'The Magic of Rotary',
      district: 'District 9126',
    });
    expectSchemaValid(leader, validateHistoricalLeaderSchema, 'Leader schema should pass validation');
    expectEqual(leader.isCurrent, true);

    const metrics = generateMockDistrictMetrics({
      activeClubs: 77,
      totalRotaractors: 700,
      constituentStates: 7,
    });
    expectSchemaValid(metrics, validateDistrictMetricsSchema, 'Metrics schema should pass validation');
    expectEqual(metrics.activeClubs, 77);
    expectEqual(metrics.constituentStates, 7);
  });

  // 4. Prospect & ProspectInput Schema Verification
  await executeTest('Prospect & ProspectInput: Validates intake fields, 4 pipeline lifecycle stages and assignment', () => {
    const prospect = generateMockProspect({
      status: 'meeting_attended',
      preferredState: 'Kwara',
    });
    expectSchemaValid(prospect, validateProspectSchema, 'Prospect schema should pass validation');
    expectEqual(prospect.status, 'meeting_attended');

    const inputDto: ProspectInput = {
      fullName: 'Aisha Bello',
      email: 'aisha.bello@example.com',
      phone: '+2348055551234',
      assignedClubId: 'club-ilorin-metro',
      preferredState: 'Kwara',
      notes: 'Interested in environmental community projects',
    };
    expectDefined(inputDto.fullName);
    expectDefined(inputDto.email);
    expectDefined(inputDto.assignedClubId);
  });

  // 5. Project & Media Signature Verification
  await executeTest('Project, Cloudinary & QR Payloads: Validates community impact, SHA-1 signature and dynamic QR contract', () => {
    const project = generateMockProject({
      beneficiariesCount: 1200,
      category: 'WASH',
    });
    expectSchemaValid(project, validateProjectSchema, 'Project schema should pass validation');
    expectEqual(project.images.length >= 1, true);

    const cloudinaryPayload = generateMockCloudinaryPayload({
      folder: 'rotaract_9126/projects',
    });
    expectSchemaValid(cloudinaryPayload, validateCloudinarySignatureSchema, 'Cloudinary payload should pass validation');
    expectEqual(cloudinaryPayload.signature.length, 40);

    const qrPayload = generateMockMemberQRPayload({
      duesStatus: 'cleared',
    });
    expectSchemaValid(qrPayload, validateMemberQRPayloadSchema, 'QR payload should pass validation');
    expectEqual(qrPayload.duesStatus, 'cleared');
  });

  // 6. ActionResult Generic Interface Verification
  await executeTest('ActionResult: Validates discriminated success and error response envelopes', () => {
    const successResult: ActionResult<{ id: string }> = {
      success: true,
      data: { id: 'usr-123' },
    };
    expectEqual(successResult.success, true);
    expectEqual(successResult.data?.id, 'usr-123');

    const errorResult: ActionResult = {
      success: false,
      error: 'Unauthorized access',
    };
    expectEqual(errorResult.success, false);
    expectEqual(errorResult.error, 'Unauthorized access');
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
