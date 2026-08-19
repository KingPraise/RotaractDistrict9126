/**
 * Tier 1 - Suite 02: Firestore Security Rules & Access Control Evaluation Suite
 */

import {
  expectEqual,
  expectTruthy,
  expectFalsy,
} from '../helpers/assertions';

interface AuthContext {
  uid: string | null;
  role?: 'member' | 'president' | 'district_admin';
  clubId?: string;
}

interface FirestoreRuleEvaluator {
  canReadUser(auth: AuthContext): boolean;
  canCreateUser(auth: AuthContext, targetUserId: string): boolean;
  canUpdateUser(
    auth: AuthContext,
    targetUserId: string,
    existingData: { role: string; clubId: string; duesStatus: string; rotaryId: string },
    changedKeys: string[]
  ): boolean;
  canDeleteUser(auth: AuthContext): boolean;

  canReadClub(): boolean;
  canCreateClub(auth: AuthContext): boolean;
  canUpdateClub(auth: AuthContext, clubId: string): boolean;
  canDeleteClub(auth: AuthContext): boolean;

  canCreateProspect(): boolean;
  canReadProspect(auth: AuthContext, assignedClubId: string): boolean;
  canUpdateProspect(auth: AuthContext, assignedClubId: string): boolean;
  canDeleteProspect(auth: AuthContext): boolean;

  canReadProject(): boolean;
  canCreateProject(auth: AuthContext, projectClubId: string): boolean;
  canUpdateProject(auth: AuthContext, projectClubId: string): boolean;
  canDeleteProject(auth: AuthContext, projectClubId: string): boolean;
}

// Logic mirror of `firestore.rules`
const securityRulesEngine: FirestoreRuleEvaluator = {
  canReadUser(auth) {
    return auth.uid !== null;
  },
  canCreateUser(auth, targetUserId) {
    return auth.uid !== null && auth.uid === targetUserId;
  },
  canUpdateUser(auth, targetUserId, existingData, changedKeys) {
    if (!auth.uid) return false;
    if (auth.role === 'district_admin') return true;

    const restrictedKeys = ['role', 'duesStatus', 'rotaryId', 'clubId'];
    const isRestrictedModified = changedKeys.some((k) => restrictedKeys.includes(k));

    if (auth.uid === targetUserId && !isRestrictedModified) {
      return true;
    }

    // Club president can update member duesStatus for members in their own club
    if (auth.role === 'president' && auth.clubId === existingData.clubId) {
      const presRestrictedKeys = ['role', 'rotaryId', 'clubId'];
      const hasPresRestrictedKeys = changedKeys.some((k) => presRestrictedKeys.includes(k));
      return !hasPresRestrictedKeys;
    }

    return false;
  },
  canDeleteUser(auth) {
    return auth.uid !== null && auth.role === 'district_admin';
  },

  canReadClub() {
    return true; // Public read
  },
  canCreateClub(auth) {
    return auth.uid !== null && auth.role === 'district_admin';
  },
  canUpdateClub(auth, clubId) {
    if (!auth.uid) return false;
    if (auth.role === 'district_admin') return true;
    return auth.role === 'president' && auth.clubId === clubId;
  },
  canDeleteClub(auth) {
    return auth.uid !== null && auth.role === 'district_admin';
  },

  canCreateProspect() {
    return true; // Public lead capture
  },
  canReadProspect(auth, assignedClubId) {
    if (!auth.uid) return false;
    if (auth.role === 'district_admin') return true;
    return auth.role === 'president' && auth.clubId === assignedClubId;
  },
  canUpdateProspect(auth, assignedClubId) {
    if (!auth.uid) return false;
    if (auth.role === 'district_admin') return true;
    return auth.role === 'president' && auth.clubId === assignedClubId;
  },
  canDeleteProspect(auth) {
    return auth.uid !== null && auth.role === 'district_admin';
  },

  canReadProject() {
    return true; // Public showcase
  },
  canCreateProject(auth, projectClubId) {
    if (!auth.uid) return false;
    if (auth.role === 'district_admin') return true;
    return auth.role === 'president' && auth.clubId === projectClubId;
  },
  canUpdateProject(auth, projectClubId) {
    if (!auth.uid) return false;
    if (auth.role === 'district_admin') return true;
    return auth.role === 'president' && auth.clubId === projectClubId;
  },
  canDeleteProject(auth, projectClubId) {
    if (!auth.uid) return false;
    if (auth.role === 'district_admin') return true;
    return auth.role === 'president' && auth.clubId === projectClubId;
  },
};

export async function run(): Promise<{
  name: string;
  passed: number;
  failed: number;
  tests: { name: string; status: 'pass' | 'fail'; error?: string }[];
}> {
  const suiteName = 'Tier 1 - 02: Firestore Security Rules & Access Control';
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

  // 1. Users Collection Security Rules
  await executeTest('Users Rules: Allows owner self-update of profile info, blocks self-privilege escalation', () => {
    const memberAuth: AuthContext = { uid: 'usr-1', role: 'member', clubId: 'club-ibadan' };
    const unauth: AuthContext = { uid: null };

    // Unauthenticated read fails
    expectFalsy(securityRulesEngine.canReadUser(unauth), 'Unauthenticated read must fail');
    // Authenticated read succeeds
    expectTruthy(securityRulesEngine.canReadUser(memberAuth), 'Authenticated read should pass');

    // Owner updating non-sensitive fields
    const userData = { role: 'member', clubId: 'club-ibadan', duesStatus: 'pending', rotaryId: 'ROT-1' };
    expectTruthy(
      securityRulesEngine.canUpdateUser(memberAuth, 'usr-1', userData, ['phoneNumber', 'occupation']),
      'Owner can update phone and occupation'
    );

    // Owner attempting to promote themselves to admin
    expectFalsy(
      securityRulesEngine.canUpdateUser(memberAuth, 'usr-1', userData, ['role']),
      'Owner cannot modify their own role'
    );

    // Owner attempting to clear their own dues
    expectFalsy(
      securityRulesEngine.canUpdateUser(memberAuth, 'usr-1', userData, ['duesStatus']),
      'Owner cannot self-clear dues'
    );
  });

  // 2. Club President Dues Clearance Rule
  await executeTest('Users Rules: Club President can update member duesStatus for their club, but not change role', () => {
    const presAuth: AuthContext = { uid: 'pres-1', role: 'president', clubId: 'club-ibadan' };
    const otherPresAuth: AuthContext = { uid: 'pres-2', role: 'president', clubId: 'club-osogbo' };
    const memberData = { role: 'member', clubId: 'club-ibadan', duesStatus: 'pending', rotaryId: 'ROT-1' };

    // President of the same club modifying duesStatus
    expectTruthy(
      securityRulesEngine.canUpdateUser(presAuth, 'usr-1', memberData, ['duesStatus']),
      'President can update duesStatus for club member'
    );

    // President attempting to change user role to admin
    expectFalsy(
      securityRulesEngine.canUpdateUser(presAuth, 'usr-1', memberData, ['role']),
      'President cannot alter member role'
    );

    // President of another club attempting to alter duesStatus
    expectFalsy(
      securityRulesEngine.canUpdateUser(otherPresAuth, 'usr-1', memberData, ['duesStatus']),
      'President of different club cannot update other club members'
    );
  });

  // 3. Clubs Collection Security Rules
  await executeTest('Clubs Rules: Public read access; write restricted to District Admin and Club President', () => {
    const adminAuth: AuthContext = { uid: 'admin-1', role: 'district_admin' };
    const presAuth: AuthContext = { uid: 'pres-1', role: 'president', clubId: 'club-ibadan' };
    const memberAuth: AuthContext = { uid: 'usr-1', role: 'member', clubId: 'club-ibadan' };

    expectTruthy(securityRulesEngine.canReadClub(), 'Clubs directory must be publicly readable');

    // Admin can create and delete
    expectTruthy(securityRulesEngine.canCreateClub(adminAuth), 'Admin can create clubs');
    expectTruthy(securityRulesEngine.canDeleteClub(adminAuth), 'Admin can delete clubs');

    // President can update own club
    expectTruthy(securityRulesEngine.canUpdateClub(presAuth, 'club-ibadan'), 'President can update own club');
    expectFalsy(securityRulesEngine.canUpdateClub(presAuth, 'club-osogbo'), 'President cannot update other clubs');
    expectFalsy(securityRulesEngine.canCreateClub(presAuth), 'President cannot create clubs');

    // Member has no write privileges
    expectFalsy(securityRulesEngine.canUpdateClub(memberAuth, 'club-ibadan'), 'Regular member cannot update club');
  });

  // 4. Prospects Intake & Pipeline Security Rules
  await executeTest('Prospects Rules: Public intake create; pipeline visibility restricted to assigned club president & admin', () => {
    const adminAuth: AuthContext = { uid: 'admin-1', role: 'district_admin' };
    const ibadanPres: AuthContext = { uid: 'pres-1', role: 'president', clubId: 'club-ibadan' };
    const osunPres: AuthContext = { uid: 'pres-2', role: 'president', clubId: 'club-osogbo' };
    const regularMember: AuthContext = { uid: 'usr-1', role: 'member', clubId: 'club-ibadan' };

    expectTruthy(securityRulesEngine.canCreateProspect(), 'Public prospect submission must be open');

    // Read permissions
    expectTruthy(securityRulesEngine.canReadProspect(adminAuth, 'club-ibadan'), 'Admin can read any prospect');
    expectTruthy(securityRulesEngine.canReadProspect(ibadanPres, 'club-ibadan'), 'Assigned club president can read prospect');
    expectFalsy(securityRulesEngine.canReadProspect(osunPres, 'club-ibadan'), 'Other club president cannot read prospect');
    expectFalsy(securityRulesEngine.canReadProspect(regularMember, 'club-ibadan'), 'Regular member cannot read prospect leads');

    // Update status permissions
    expectTruthy(securityRulesEngine.canUpdateProspect(ibadanPres, 'club-ibadan'), 'Assigned president can advance Kanban status');
    expectFalsy(securityRulesEngine.canUpdateProspect(osunPres, 'club-ibadan'), 'Non-assigned president cannot advance Kanban');

    // Delete permissions
    expectTruthy(securityRulesEngine.canDeleteProspect(adminAuth), 'Only admin can delete prospect leads');
    expectFalsy(securityRulesEngine.canDeleteProspect(ibadanPres), 'President cannot delete prospect records');
  });

  // 5. Projects Showcase & Dashboard CRUD Rules
  await executeTest('Projects Rules: Public read; create, update, delete scoped to club president & district admin', () => {
    const adminAuth: AuthContext = { uid: 'admin-1', role: 'district_admin' };
    const presAuth: AuthContext = { uid: 'pres-1', role: 'president', clubId: 'club-lautech' };
    const otherPresAuth: AuthContext = { uid: 'pres-2', role: 'president', clubId: 'club-ibadan' };
    const memberAuth: AuthContext = { uid: 'usr-1', role: 'member', clubId: 'club-lautech' };

    expectTruthy(securityRulesEngine.canReadProject(), 'Projects showcase is publicly readable');

    // Admin privileges
    expectTruthy(securityRulesEngine.canCreateProject(adminAuth, 'club-lautech'), 'Admin can create projects');
    expectTruthy(securityRulesEngine.canUpdateProject(adminAuth, 'club-lautech'), 'Admin can update projects');
    expectTruthy(securityRulesEngine.canDeleteProject(adminAuth, 'club-lautech'), 'Admin can delete projects');

    // President privileges for own club
    expectTruthy(securityRulesEngine.canCreateProject(presAuth, 'club-lautech'), 'President can publish project for own club');
    expectTruthy(securityRulesEngine.canUpdateProject(presAuth, 'club-lautech'), 'President can edit own project');
    expectTruthy(securityRulesEngine.canDeleteProject(presAuth, 'club-lautech'), 'President can delete own project');

    // President attempting cross-club mutation
    expectFalsy(securityRulesEngine.canCreateProject(otherPresAuth, 'club-lautech'), 'President cannot create project for other clubs');
    expectFalsy(securityRulesEngine.canUpdateProject(otherPresAuth, 'club-lautech'), 'President cannot edit other club project');

    // Regular member denied
    expectFalsy(securityRulesEngine.canCreateProject(memberAuth, 'club-lautech'), 'Regular member cannot create project');
  });

  return {
    name: suiteName,
    passed,
    failed,
    tests,
  };
}
