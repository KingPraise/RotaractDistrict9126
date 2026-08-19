/**
 * Tier 1 - Suite 08: Newsletter Service (`newsletter-service.ts`) Test Suite
 */

import {
  expectEqual,
  expectTruthy,
  expectFalsy,
  expectDefined,
} from '../helpers/assertions';
import { subscribeNewsletter } from '../../lib/services/newsletter-service';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 08: Newsletter Service (Email Regex, Deduplication, Writes)';
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

  // 1. Valid Email Subscription
  await executeTest('subscribeNewsletter(): Successfully processes valid email subscription', async () => {
    const email = `test.member.${Date.now()}@rotaract9126.org`;
    const result = await subscribeNewsletter(email);

    expectEqual(result.success, true, 'Valid subscription must succeed');
    expectDefined(result.message, 'Must return a success confirmation message');
  });

  // 2. Empty / Whitespace Email Rejection
  await executeTest('subscribeNewsletter(): Rejects empty and whitespace-only email submissions', async () => {
    const emptyResult = await subscribeNewsletter('');
    expectEqual(emptyResult.success, false);
    expectDefined(emptyResult.error);

    const spaceResult = await subscribeNewsletter('   ');
    expectEqual(spaceResult.success, false);
    expectDefined(spaceResult.error);
  });

  // 3. Invalid Email Format Rejection
  await executeTest('subscribeNewsletter(): Validates RFC email regex format and rejects malformed inputs', async () => {
    const malformedEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@domain..com',
      'user name@domain.com',
    ];

    for (const badEmail of malformedEmails) {
      const result = await subscribeNewsletter(badEmail);
      expectEqual(result.success, false, `Should reject malformed email: ${badEmail}`);
      expectDefined(result.error);
    }
  });

  // 4. Deduplication & Idempotent Subscription
  await executeTest('subscribeNewsletter(): Handles duplicate email gracefully without crashing', async () => {
    const email = 'duplicate.test@rotaractdistrict9126.org';
    const firstAttempt = await subscribeNewsletter(email);
    expectEqual(firstAttempt.success, true);

    const secondAttempt = await subscribeNewsletter(email);
    expectEqual(secondAttempt.success, true, 'Duplicate subscription should handle gracefully');
  });

  // 5. Normalization & Case Insensitivity
  await executeTest('subscribeNewsletter(): Normalizes mixed-case and whitespace-padded emails', async () => {
    const mixedEmail = '   ROTARACT.MEMBER.9126@GMAIL.COM   ';
    const result = await subscribeNewsletter(mixedEmail);
    expectEqual(result.success, true, 'Normalized email should succeed');
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
