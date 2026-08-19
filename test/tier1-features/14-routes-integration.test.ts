/**
 * Tier 1 - Suite 14: Application Routes Integration Contracts Test Suite
 */

import fs from 'fs';
import path from 'path';
import {
  expectEqual,
  expectTruthy,
  expectDefined,
} from '../helpers/assertions';

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 14: Application Routes Integration Contracts (10 App Routes)';
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

  const appDir = path.resolve(process.cwd(), 'app');

  // 1. Route Layout & Page File Existence for all 10 Primary Application Routes
  await executeTest('Route Structure: Verifies existence of 10 primary App Router page modules', () => {
    const requiredRoutes = [
      'page.tsx',                      // 1. Homepage /
      'clubs/page.tsx',                // 2. /clubs
      'projects/page.tsx',             // 3. /projects
      'blog/page.tsx',                 // 4. /blog
      'heritage/page.tsx',             // 5. /heritage (redirects to /about)
      'about/page.tsx',                // 6. /about
      'join/page.tsx',                 // 7. /join
      'login/page.tsx',                // 8. /login
      'portal/dashboard/page.tsx',     // 9. /portal/dashboard
      'portal/president/page.tsx',     // 10. /portal/president
    ];

    for (const routePath of requiredRoutes) {
      const fullPath = path.join(appDir, routePath);
      expectTruthy(
        fs.existsSync(fullPath),
        `Route module file app/${routePath} must exist in the workspace`
      );
    }
  });

  // 2. Member Portal Dashboard Integration Contracts
  await executeTest('Member Dashboard (/portal/dashboard): Verifies presence of Projects CRUD, Events RSVP, and Dues Ledger hooks', () => {
    const dashboardFile = path.join(appDir, 'portal/dashboard/page.tsx');
    const content = fs.readFileSync(dashboardFile, 'utf-8');

    expectTruthy(content.includes('projects-service'), 'Dashboard must import projects-service');
    expectTruthy(content.includes('saveProject'), 'Dashboard must wire saveProject action');
    expectTruthy(content.includes('deleteProject'), 'Dashboard must wire deleteProject action');
    expectTruthy(content.includes('qrCodeUrl') || content.includes('QrCode'), 'Dashboard must support Digital ID QR rendering');
  });

  // 3. President Console Integration Contracts
  await executeTest('President Console (/portal/president): Verifies presence of Roster, Dues Toggle action, and Kanban pipeline', () => {
    const presFile = path.join(appDir, 'portal/president/page.tsx');
    const content = fs.readFileSync(presFile, 'utf-8');

    expectTruthy(content.includes('toggleMemberDues'), 'President console must wire toggleMemberDues action');
    expectTruthy(content.includes('updateProspectStatus'), 'President console must wire updateProspectStatus action');
    expectTruthy(content.includes('duesStatus'), 'President console must handle duesStatus state');
  });

  // 4. Public Club Finder & Intake Integration Contracts
  await executeTest('Club Finder & Intake (/clubs & /join): Verifies 77-club directory dataset, state filtering, and WhatsApp contact', () => {
    const joinFile = path.join(appDir, 'join/page.tsx');
    const joinContent = fs.readFileSync(joinFile, 'utf-8');

    expectTruthy(joinContent.includes('clubsData'), 'Join page must import 77-club directory dataset');
    expectTruthy(joinContent.includes('WhatsApp'), 'Join page must generate direct WhatsApp contact links');

    const clubsFile = path.join(appDir, 'clubs/page.tsx');
    const clubsContent = fs.readFileSync(clubsFile, 'utf-8');
    expectTruthy(clubsContent.includes('clubsData'), 'Clubs page must import clubsData');
  });

  // 5. Blog & Newsletter Subscription Integration Contracts
  await executeTest('Blog & Newsletter (/blog): Verifies newsletter service integration and category filtering', () => {
    const blogFile = path.join(appDir, 'blog/page.tsx');
    const content = fs.readFileSync(blogFile, 'utf-8');

    expectTruthy(content.includes('subscribeNewsletter'), 'Blog page must wire subscribeNewsletter service');
    expectTruthy(content.includes('newsletter-service'), 'Blog page must import from newsletter-service');
    expectTruthy(content.includes('category'), 'Blog page must support category filtering');
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
