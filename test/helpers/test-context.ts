/**
 * Test Context & Mock Environment Setup for Rotaract District 9126
 */

import {
  generateMockUser,
  generateMockClub,
  generateMockHistoricalLeader,
  generateMockDistrictMetrics,
  generateMockProspect,
  generateMockProject,
  generateMockEvent,
  generateMockArticle,
  generateMockDuesPayment,
  generateMockDuesAuditLog,
  generateMockSubscriber,
} from './mock-payloads';

export interface InMemoryFirestoreState {
  users: Map<string, any>;
  clubs: Map<string, any>;
  leadership: Map<string, any>;
  metrics: Map<string, any>;
  prospects: Map<string, any>;
  prospect_leads: Map<string, any>;
  projects: Map<string, any>;
  events: Map<string, any>;
  articles: Map<string, any>;
  dues_payments: Map<string, any>;
  dues_audit_log: Map<string, any>;
  subscribers: Map<string, any>;
  auth_users: Map<string, any>;
  event_attendances: Map<string, any>;
}

export class MockFirestoreDatabase {
  public collections: InMemoryFirestoreState;

  constructor() {
    this.collections = this.createEmptyState();
  }

  private createEmptyState(): InMemoryFirestoreState {
    return {
      users: new Map(),
      clubs: new Map(),
      leadership: new Map(),
      metrics: new Map(),
      prospects: new Map(),
      prospect_leads: new Map(),
      projects: new Map(),
      events: new Map(),
      articles: new Map(),
      dues_payments: new Map(),
      dues_audit_log: new Map(),
      subscribers: new Map(),
      auth_users: new Map(),
      event_attendances: new Map(),
    };
  }

  public reset(): void {
    this.collections = this.createEmptyState();
  }

  public seedDefaultData(): void {
    this.reset();

    // 1. Seed Metrics
    const metrics = generateMockDistrictMetrics();
    this.collections.metrics.set('district-9126-metrics', metrics);

    // 2. Seed Sample Clubs
    const club1 = generateMockClub({
      clubId: 'club-ibadan-central',
      name: 'Rotaract Club of Ibadan Central',
      state: 'Oyo',
      region: 'South-West',
      presidentId: 'user-pres-ibadan',
    });
    const club2 = generateMockClub({
      clubId: 'club-osogbo-metro',
      name: 'Rotaract Club of Osogbo Metro',
      state: 'Osun',
      region: 'South-West',
      presidentId: 'user-pres-osogbo',
    });
    const club3 = generateMockClub({
      clubId: 'club-akure-golden',
      name: 'Rotaract Club of Akure Golden',
      state: 'Ondo',
      region: 'South-West',
      presidentId: 'user-pres-akure',
    });
    this.collections.clubs.set(club1.clubId, club1);
    this.collections.clubs.set(club2.clubId, club2);
    this.collections.clubs.set(club3.clubId, club3);

    // 3. Seed Sample Users
    const adminUser = generateMockUser({
      userId: 'user-admin-01',
      firstName: 'District',
      lastName: 'Administrator',
      role: 'district_admin',
      clubId: 'club-ibadan-central',
      email: 'admin@rotaractdistrict9126.com.ng',
    });
    const presUser = generateMockUser({
      userId: 'user-pres-ibadan',
      firstName: 'Tolu',
      lastName: 'Adeleke',
      role: 'president',
      clubId: 'club-ibadan-central',
      email: 'president.ibadan@rotaractdistrict9126.com.ng',
    });
    const memberUser = generateMockUser({
      userId: 'user-mem-01',
      firstName: 'Chidinma',
      lastName: 'Okafor',
      role: 'member',
      clubId: 'club-ibadan-central',
      email: 'chidinma.o@example.com',
      duesStatus: 'cleared',
    });
    this.collections.users.set(adminUser.userId, adminUser);
    this.collections.users.set(presUser.userId, presUser);
    this.collections.users.set(memberUser.userId, memberUser);

    // 4. Seed Leadership
    const leader = generateMockHistoricalLeader();
    this.collections.leadership.set(leader.eraId, leader);

    // 5. Seed Projects
    const proj1 = generateMockProject({ projectId: 'proj-1', clubId: 'club-ibadan-central' });
    this.collections.projects.set(proj1.projectId, proj1);

    // 6. Seed Events
    const ev1 = generateMockEvent({ id: 'event-discon-2026' });
    this.collections.events.set(ev1.id, ev1);

    // 7. Seed Articles
    const art1 = generateMockArticle({ id: 'article-water-offa' });
    this.collections.articles.set(art1.id, art1);
  }

  public getDoc(collectionName: keyof InMemoryFirestoreState, docId: string): any | null {
    return this.collections[collectionName]?.get(docId) || null;
  }

  public setDoc(collectionName: keyof InMemoryFirestoreState, docId: string, data: any, merge: boolean = false): void {
    if (!this.collections[collectionName]) {
      (this.collections as any)[collectionName] = new Map();
    }
    if (merge && this.collections[collectionName].has(docId)) {
      const existing = this.collections[collectionName].get(docId);
      this.collections[collectionName].set(docId, { ...existing, ...data });
    } else {
      this.collections[collectionName].set(docId, { ...data });
    }
  }

  public updateDoc(collectionName: keyof InMemoryFirestoreState, docId: string, updates: any): boolean {
    if (!this.collections[collectionName]?.has(docId)) return false;
    const existing = this.collections[collectionName].get(docId);
    this.collections[collectionName].set(docId, { ...existing, ...updates });
    return true;
  }

  public deleteDoc(collectionName: keyof InMemoryFirestoreState, docId: string): boolean {
    return this.collections[collectionName]?.delete(docId) ?? false;
  }

  public queryCollection(
    collectionName: keyof InMemoryFirestoreState,
    predicate?: (item: any) => boolean
  ): any[] {
    const list = Array.from(this.collections[collectionName]?.values() || []);
    return predicate ? list.filter(predicate) : list;
  }
}

/**
 * Global Test Context Singleton
 */
export const testDb = new MockFirestoreDatabase();

/**
 * Helper to run code with temporary environment variable overrides
 */
export async function withMockEnv<T>(envOverrides: Record<string, string | undefined>, fn: () => Promise<T>): Promise<T> {
  const originalEnv: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(envOverrides)) {
    originalEnv[key] = process.env[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

/**
 * Generate a mock DecodedIdToken for testing authentication and RBAC checks
 */
export function createMockAuthToken(claims: {
  uid: string;
  email?: string;
  role?: 'member' | 'president' | 'district_admin';
  clubId?: string;
}): string {
  const payload = {
    uid: claims.uid,
    email: claims.email || `${claims.uid}@rotaractdistrict9126.com.ng`,
    role: claims.role || 'member',
    clubId: claims.clubId || 'club-ibadan-central',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };
  return `mock_token_${Buffer.from(JSON.stringify(payload)).toString('base64')}`;
}

/**
 * Parse mock token back to payload
 */
export function parseMockAuthToken(token: string): any | null {
  if (!token.startsWith('mock_token_')) return null;
  try {
    const base64 = token.replace('mock_token_', '');
    const jsonStr = Buffer.from(base64, 'base64').toString('utf-8');
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}
