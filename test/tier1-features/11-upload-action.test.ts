/**
 * Tier 1 - Suite 11: Cloudinary Upload Action (`actions/upload.ts`) Test Suite
 */

import crypto from 'crypto';
import {
  expectEqual,
  expectTruthy,
  expectDefined,
  expectSchemaValid,
} from '../helpers/assertions';
import { withMockEnv } from '../helpers/test-context';
import { validateCloudinarySignatureSchema } from '../helpers/mock-payloads';
import { getCloudinaryUploadSignature } from '../../actions/upload';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 11: Cloudinary Upload Action (SHA-1 Signature, Timestamp, Folder)';
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

  const mockCloudEnv = {
    CLOUDINARY_CLOUD_NAME: 'rotaract-district-9126',
    CLOUDINARY_API_KEY: '123456789012345',
    CLOUDINARY_API_SECRET: 'test_cloudinary_api_secret_key_abcdef',
  };

  // 1. Signature Generation with Default Folder
  await executeTest('getCloudinaryUploadSignature(): Generates valid SHA-1 signature and parameters', async () => {
    await withMockEnv(mockCloudEnv, async () => {
      const res = await getCloudinaryUploadSignature();
      expectEqual(res.success, true);
      expectDefined(res.data);
      expectSchemaValid(res.data, validateCloudinarySignatureSchema);
      expectEqual(res.data.folder, 'rotaract_9126/general');
      expectEqual(res.data.cloudName, 'rotaract-district-9126');
      expectEqual(res.data.apiKey, '123456789012345');
    });
  });

  // 2. Custom Target Folder Signing
  await executeTest('getCloudinaryUploadSignature(folder): Correctly binds custom folder path into signature', async () => {
    await withMockEnv(mockCloudEnv, async () => {
      const res = await getCloudinaryUploadSignature('rotaract_9126/projects');
      expectEqual(res.success, true);
      expectDefined(res.data);
      expectEqual(res.data.folder, 'rotaract_9126/projects');
    });
  });

  // 3. Cryptographic SHA-1 Algorithm Verification
  await executeTest('Signature Verification: Verifies exact SHA-1 hash over (folder & timestamp & apiSecret)', async () => {
    await withMockEnv(mockCloudEnv, async () => {
      const folder = 'rotaract_9126/avatars';
      const res = await getCloudinaryUploadSignature(folder);
      expectEqual(res.success, true);
      expectDefined(res.data);

      // Independently compute expected SHA-1
      const paramsToSign = `folder=${folder}&timestamp=${res.data.timestamp}${mockCloudEnv.CLOUDINARY_API_SECRET}`;
      const expectedSignature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

      expectEqual(res.data.signature, expectedSignature, 'Returned signature must match independently computed SHA-1');
    });
  });

  // 4. Missing Credentials Environment Handling
  await executeTest('getCloudinaryUploadSignature(): Gracefully fails when Cloudinary credentials are missing', async () => {
    await withMockEnv(
      {
        CLOUDINARY_CLOUD_NAME: undefined,
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: undefined,
        CLOUDINARY_API_KEY: undefined,
        NEXT_PUBLIC_CLOUDINARY_API_KEY: undefined,
        CLOUDINARY_API_SECRET: undefined,
      },
      async () => {
        const res = await getCloudinaryUploadSignature();
        expectEqual(res.success, false);
        expectDefined(res.error);
        expectTruthy(res.error!.includes('credentials are not configured'));
      }
    );
  });

  // 5. Timestamp Freshness Verification
  await executeTest('Timestamp Freshness: Generates epoch timestamp within acceptable clock drift (<5s)', async () => {
    await withMockEnv(mockCloudEnv, async () => {
      const beforeEpoch = Math.round(Date.now() / 1000);
      const res = await getCloudinaryUploadSignature();
      const afterEpoch = Math.round(Date.now() / 1000);

      expectDefined(res.data);
      expectTruthy(
        res.data.timestamp >= beforeEpoch - 1 && res.data.timestamp <= afterEpoch + 1,
        'Timestamp must be freshly generated'
      );
    });
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
