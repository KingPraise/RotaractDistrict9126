/**
 * Central Test Runner Harness for Rotaract District 9126 E2E Test Suite
 */

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

// Load environment variables if available
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Ensure baseline test environment variables so Firebase client & Admin SDKs initialize without fatal errors
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyFakeKeyForTestingDistrict9126App';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'rotaract-district-9126.firebaseapp.com';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'rotaract-district-9126';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'rotaract-district-9126.appspot.com';
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789012';
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789012:web:abcdef123456';
process.env.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'rotaract-district-9126';

export interface TestResultItem {
  name: string;
  status: 'pass' | 'fail';
  durationMs?: number;
  error?: string;
}

export interface SuiteResult {
  name: string;
  file: string;
  passed: number;
  failed: number;
  durationMs: number;
  tests: TestResultItem[];
}

export interface RunnerSummary {
  totalSuites: number;
  passedSuites: number;
  failedSuites: number;
  totalTests: number;
  totalPassed: number;
  totalFailed: number;
  durationMs: number;
  suites: SuiteResult[];
}

// ANSI colors for clean terminal output
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

export async function runAllSuites(options?: {
  tierFilter?: number;
  nameFilter?: string;
  rootDir?: string;
}): Promise<RunnerSummary> {
  const rootDir = options?.rootDir || path.resolve(__dirname);
  const startTime = Date.now();

  console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}   ROTARACT DISTRICT 9126 — E2E TEST RUNNER HARNESS   ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  // Discover all test suite directories (tier1-features, tier2-boundaries, tier3-combinations, tier4-scenarios)
  const tierDirs = ['tier1-features', 'tier2-boundaries', 'tier3-combinations', 'tier4-scenarios'];
  const suiteFiles: { tier: string; relativePath: string; absolutePath: string }[] = [];

  for (const tierDir of tierDirs) {
    const tierDirPath = path.join(rootDir, tierDir);
    if (!fs.existsSync(tierDirPath)) continue;

    if (options?.tierFilter) {
      const targetPrefix = `tier${options.tierFilter}`;
      if (!tierDir.startsWith(targetPrefix)) continue;
    }

    const files = fs.readdirSync(tierDirPath)
      .filter((f) => f.endsWith('.test.ts') || f.endsWith('.test.js'))
      .sort();

    for (const file of files) {
      if (options?.nameFilter && !file.includes(options.nameFilter)) {
        continue;
      }
      suiteFiles.push({
        tier: tierDir,
        relativePath: path.join(tierDir, file),
        absolutePath: path.join(tierDirPath, file),
      });
    }
  }

  if (suiteFiles.length === 0) {
    console.log(`${colors.yellow}⚠️ No test suite files discovered matching criteria.${colors.reset}\n`);
    return {
      totalSuites: 0,
      passedSuites: 0,
      failedSuites: 0,
      totalTests: 0,
      totalPassed: 0,
      totalFailed: 0,
      durationMs: Date.now() - startTime,
      suites: [],
    };
  }

  console.log(`${colors.dim}Discovered ${suiteFiles.length} test suite(s)... Starting execution.${colors.reset}\n`);

  const results: SuiteResult[] = [];
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  for (let i = 0; i < suiteFiles.length; i++) {
    const item = suiteFiles[i];
    const suiteStart = Date.now();

    try {
      // Convert Windows absolute path to valid file URL for ESM import
      const fileUrl = pathToFileURL(item.absolutePath).href;
      const suiteModule = await import(fileUrl);

      if (typeof suiteModule.run !== 'function') {
        console.log(`${colors.red}✖ [${item.relativePath}] does not export a run() function.${colors.reset}`);
        results.push({
          name: item.relativePath,
          file: item.relativePath,
          passed: 0,
          failed: 1,
          durationMs: Date.now() - suiteStart,
          tests: [
            {
              name: 'Export run() check',
              status: 'fail',
              error: 'Suite must export async run() function',
            },
          ],
        });
        totalFailed++;
        totalTests++;
        continue;
      }

      const suiteResult = await suiteModule.run();
      const durationMs = Date.now() - suiteStart;

      const passedCount = suiteResult.passed || 0;
      const failedCount = suiteResult.failed || 0;
      const suiteName = suiteResult.name || item.relativePath;

      totalTests += (passedCount + failedCount);
      totalPassed += passedCount;
      totalFailed += failedCount;

      results.push({
        name: suiteName,
        file: item.relativePath,
        passed: passedCount,
        failed: failedCount,
        durationMs,
        tests: suiteResult.tests || [],
      });

      // Terminal Output for this suite
      if (failedCount === 0) {
        console.log(
          `${colors.green}✔ PASS${colors.reset} ${colors.bold}${item.relativePath}${colors.reset} ` +
          `${colors.dim}(${passedCount} tests, ${durationMs}ms)${colors.reset}`
        );
      } else {
        console.log(
          `${colors.red}✖ FAIL${colors.reset} ${colors.bold}${item.relativePath}${colors.reset} ` +
          `${colors.red}(${failedCount} failed, ${passedCount} passed, ${durationMs}ms)${colors.reset}`
        );
        for (const t of suiteResult.tests || []) {
          if (t.status === 'fail') {
            console.log(`    ${colors.red}✖ ${t.name}${colors.reset}`);
            if (t.error) {
              console.log(`      ${colors.dim}${t.error.replace(/\n/g, '\n      ')}${colors.reset}`);
            }
          }
        }
      }
    } catch (err: any) {
      const durationMs = Date.now() - suiteStart;
      console.log(`${colors.red}✖ CRASH in ${item.relativePath}: ${err?.message || err}${colors.reset}`);
      if (err?.stack) {
        console.log(`${colors.dim}${err.stack}${colors.reset}`);
      }
      results.push({
        name: item.relativePath,
        file: item.relativePath,
        passed: 0,
        failed: 1,
        durationMs,
        tests: [
          {
            name: 'Suite Execution',
            status: 'fail',
            error: err?.message || String(err),
          },
        ],
      });
      totalFailed++;
      totalTests++;
    }
  }

  const durationMs = Date.now() - startTime;
  const passedSuites = results.filter((r) => r.failed === 0).length;
  const failedSuites = results.filter((r) => r.failed > 0).length;

  console.log(`\n${colors.bold}${colors.cyan}──────────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.bold}TEST SUITE SUMMARY${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}──────────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`  Suites:   ${passedSuites > 0 ? colors.green + passedSuites + ' passed' + colors.reset + ', ' : ''}${failedSuites > 0 ? colors.red + failedSuites + ' failed' + colors.reset + ', ' : ''}${results.length} total`);
  console.log(`  Tests:    ${totalPassed > 0 ? colors.green + totalPassed + ' passed' + colors.reset + ', ' : ''}${totalFailed > 0 ? colors.red + totalFailed + ' failed' + colors.reset + ', ' : ''}${totalTests} total`);
  console.log(`  Duration: ${(durationMs / 1000).toFixed(2)}s`);
  console.log(`${colors.bold}${colors.cyan}──────────────────────────────────────────────────────────────────────────${colors.reset}\n`);

  if (failedSuites === 0 && totalFailed === 0) {
    console.log(`${colors.bold}${colors.bgGreen}${colors.white} ALL TEST SUITES PASSED CLEANLY (100%) ${colors.reset}\n`);
  } else {
    console.log(`${colors.bold}${colors.bgRed}${colors.white} SOME TESTS FAILED — CHECK LOGS ABOVE ${colors.reset}\n`);
  }

  return {
    totalSuites: results.length,
    passedSuites,
    failedSuites,
    totalTests,
    totalPassed,
    totalFailed,
    durationMs,
    suites: results,
  };
}

// CLI Execution entry point
if (require.main === module || process.argv[1]?.endsWith('runner.ts') || process.argv[1]?.endsWith('runner.js')) {
  const args = process.argv.slice(2);
  let tierFilter: number | undefined;
  let nameFilter: string | undefined;

  for (const arg of args) {
    if (arg.startsWith('--tier=')) {
      tierFilter = parseInt(arg.replace('--tier=', ''), 10);
    } else if (arg.startsWith('--filter=')) {
      nameFilter = arg.replace('--filter=', '');
    }
  }

  runAllSuites({ tierFilter, nameFilter })
    .then((summary) => {
      if (summary.totalFailed > 0 || summary.failedSuites > 0) {
        process.exit(1);
      } else {
        process.exit(0);
      }
    })
    .catch((err) => {
      console.error('Fatal Runner Error:', err);
      process.exit(1);
    });
}
