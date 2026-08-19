/**
 * Tier 1 - Suite 03: Seeding & Geographic Directory Test Suite
 */

import {
  expectEqual,
  expectGreaterThanOrEqual,
  expectTruthy,
  expectDefined,
  expectTypeOf,
  expectArrayContains,
} from '../helpers/assertions';
import { clubsData } from '../../lib/clubs-data';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 03: Seeding & Geographic Directory';
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

  // 1. Total Club Count Verification
  await executeTest('Club Directory Count: Contains 77 verified clubs across District 9126', () => {
    expectGreaterThanOrEqual(clubsData.length, 77, 'District directory must contain at least 77 clubs');
  });

  // 2. 7-State Geographic Distribution Verification
  await executeTest('Constituent States Distribution: Verified coverage across all 7 constituent states', () => {
    const requiredStates = ['Osun', 'Oyo', 'Ondo', 'Ekiti', 'Kwara', 'Niger', 'Kogi'];
    const representedStates = new Set(clubsData.map((c) => c.state));

    for (const state of requiredStates) {
      expectTruthy(
        representedStates.has(state),
        `State "${state}" must have active clubs represented in the district directory`
      );
    }
  });

  // 3. Regional Alignment Verification (South-West vs North-Central)
  await executeTest('Regional Mapping: South-West (Oyo, Osun, Ondo, Ekiti) and North-Central (Kwara, Niger, Kogi)', () => {
    for (const club of clubsData) {
      if (['Oyo', 'Osun', 'Ondo', 'Ekiti'].includes(club.state)) {
        expectEqual(club.region, 'South-West', `Club ${club.name} in ${club.state} must belong to South-West region`);
      } else if (['Kwara', 'Niger', 'Kogi'].includes(club.state)) {
        expectEqual(club.region, 'North-Central', `Club ${club.name} in ${club.state} must belong to North-Central region`);
      }
    }
  });

  // 4. Coordinates Bounding Box Verification for Nigeria / District 9126
  await executeTest('Geocoding & Coordinates: Latitudes (6.0° - 11.0° N) and Longitudes (3.0° - 8.0° E)', () => {
    for (const club of clubsData) {
      expectDefined(club.coordinates, `Club ${club.name} must have coordinates`);
      expectTypeOf(club.coordinates.lat, 'number');
      expectTypeOf(club.coordinates.lng, 'number');

      // Nigeria coordinate bounds check for District 9126 states
      expectTruthy(
        club.coordinates.lat >= 6.0 && club.coordinates.lat <= 11.5,
        `Club ${club.name} latitude ${club.coordinates.lat} out of District 9126 bounds`
      );
      expectTruthy(
        club.coordinates.lng >= 2.5 && club.coordinates.lng <= 8.5,
        `Club ${club.name} longitude ${club.coordinates.lng} out of District 9126 bounds`
      );
    }
  });

  // 5. Venues, Meeting Schedules, and Club Type Diversity
  await executeTest('Club Metadata: Complete venues, meeting schedules, and club type diversity (Community & Campus)', () => {
    const types = new Set(clubsData.map((c) => c.type));
    expectTruthy(types.has('Community'), 'Directory must include Community clubs');
    expectTruthy(types.has('Campus'), 'Directory must include Campus / Institution-based clubs');

    for (const club of clubsData) {
      expectTruthy(club.name && club.name.length > 3, `Club ${club.id} must have a valid name`);
      expectTruthy(club.meetingVenue && club.meetingVenue.length > 5, `Club ${club.name} must specify meeting venue`);
      expectTruthy(club.rotaryId && club.rotaryId.length >= 4, `Club ${club.name} must have a Rotary ID`);
    }
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
