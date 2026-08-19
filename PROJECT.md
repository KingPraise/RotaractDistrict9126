# Project: Rotaract District 9126 Backend Architecture & Full Integration

## Architecture
- **Framework**: Next.js 14 App Router with React 18, TypeScript, Tailwind CSS, Lucide React, Framer Motion, Leaflet.
- **Database**: Google Firebase Cloud Firestore (live collections with security rules).
- **Authentication & RBAC**: Firebase Authentication (Client SDK) with Server-Side token verification (`firebase-admin`). Roles: `member`, `president`, `district_admin`.
- **Server Actions**: Next.js Server Actions (`actions/`) executing on Node runtime for privileged mutations (Cloudinary signature signing, Dues clearance with audit logging, Prospect lead management with Resend email notification).
- **Media Pipeline**: Cloudinary CDN direct signed uploads via `actions/upload.ts`.
- **Communication Workflows**: Resend API integration for automated email alerts and prospect notifications.
- **State & Sync**: Dual-layer architecture: Live Firestore `onSnapshot` subscriptions for real-time reactivity in client components, supplemented with Server Actions for transactional writes.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | TypeScript Types & Interfaces | Complete definitions for `Article`, `DistrictEvent`, `DuesPayment`, `DuesAuditLog`, `Subscriber`, `User`, `Club`, `Project`, `Prospect` in `types/index.ts` | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Firestore Security Rules | Comprehensive RBAC rules for all 9 collections (`users`, `clubs`, `projects`, `articles`, `events`, `prospect_leads`, `leadership`, `dues_payments`/`dues_audit_log`, `subscribers`) in `firestore.rules` | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Firestore Database Seeding | Seed scripts and live data population for 77 clubs across 7 states, 4 DRR leadership records, projects, articles, events, and metrics | M1 | ORIGINAL_REQUEST §R1 |
| 4 | Events Service (`events-service.ts`) | Query, filter by category/state, RSVP, and fetch upcoming district/club events from Firestore | M2 | ORIGINAL_REQUEST §R2 |
| 5 | Articles Service (`articles-service.ts`) | Query, index, category filter, and fetch impact stories and news from Firestore | M2 | ORIGINAL_REQUEST §R2 |
| 6 | Projects Service Real-Time Sync (`projects-service.ts`) | Upgrade from localStorage to live Firestore queries, real-time snapshot subscriptions, and CRUD mutations | M2 | ORIGINAL_REQUEST §R2 |
| 7 | Dashboard & Member Service (`dashboard-service.ts`) | Resolver for member profiles, payment ledger, volunteer metrics, and club rosters | M2 | ORIGINAL_REQUEST §R2 |
| 8 | Newsletter Service (`newsletter-service.ts`) | Email regex validation and deduplicated Firestore writes to `subscribers` collection | M2 | ORIGINAL_REQUEST §R2 |
| 9 | Lead Intake Service (`intake-service.ts`) | Prospective lead intake with automatic 7-state proximity club routing | M2 | ORIGINAL_REQUEST §R2 |
| 10 | Auth & Client RBAC Service (`auth-service.ts`) | Firebase Auth client wrappers (`signInWithEmail`, `signUpWithEmail`, `sendPasswordReset`, `signOutUser`) and role sync | M2 | ORIGINAL_REQUEST §R2 |
| 11 | Cloudinary Signed Upload Action (`actions/upload.ts`) | Secure SHA-1 signature generation for direct client-to-Cloudinary CDN image uploads | M2 | ORIGINAL_REQUEST §R2 |
| 12 | Dues Clearance Action (`actions/dues.ts`) | RBAC-checked dues status toggle on `users` with immutable write to `dues_audit_log` | M2 | ORIGINAL_REQUEST §R2 |
| 13 | Prospect Pipeline Action (`actions/prospects.ts`) | Lead submission, 4-stage Kanban advancement (`new` -> `contacted` -> `meeting_attended` -> `inducted`), and Resend email notification | M2 | ORIGINAL_REQUEST §R2 |
| 14 | Blog & Newsletter UI Integration (`/blog`) | Dynamic article listing with category filtering, search, and live newsletter subscription form | M3 | ORIGINAL_REQUEST §R3 |
| 15 | Member Portal Dashboard UI Integration (`/portal/dashboard`) | Live Events tab with RSVP, Projects tab with real-time Firestore CRUD, Dues tab with ledger, Digital ID card | M3 | ORIGINAL_REQUEST §R3 |
| 16 | President Console UI Integration (`/portal/president`) | Membership roster with 1-click dues toggle and Prospective member Kanban pipeline | M3 | ORIGINAL_REQUEST §R3 |
| 17 | Public Directory & Map UI Integration (`/clubs`, `/join`) | 77-club directory with search, filter by state/type, interactive Leaflet map, WhatsApp contact generation | M3 | ORIGINAL_REQUEST §R3 |
| 18 | Projects Showcase & Homepage UI Integration (`/projects`, `/`) | 3D featured carousel, category filter, impact stats ribbon, synchronized live with dashboard updates | M3 | ORIGINAL_REQUEST §R3 |
| 19 | E2E Test Suite (Tiers 1–4) | Comprehensive opaque-box test suite covering feature tests, boundaries, cross-feature workflows, and real-world scenarios | M4 | ORIGINAL_REQUEST §AC |
| 20 | Adversarial Hardening (Tier 5), Audit & Build Verification | White-box stress tests, Forensic Auditor integrity verification, and clean `npm run build` compilation | M5 | ORIGINAL_REQUEST §R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Schemas, Types, Rules & Seeding | `types/index.ts`, `firestore.rules`, seed scripts (`scripts/seed.ts`, `scripts/seed-admin-rest.js`), seed datasets | none | PLANNED |
| M2 | Core Services & Server Actions Pipeline | `lib/services/*` (events, articles, projects, dashboard, newsletter, intake, auth), `actions/*` (upload, dues with audit log, prospects with Resend) | M1 | PLANNED |
| M3 | Client Component & Route Integration | Wire all routes (`/`, `/clubs`, `/projects`, `/blog`, `/heritage`, `/join`, `/login`, `/portal/dashboard`, `/portal/president`) to live services | M2 | PLANNED |
| M4 | E2E Testing Track (Tiers 1–4) | Test infrastructure, test runner, Tier 1–4 test cases, publish `TEST_READY.md` | M1, M2 (Parallel Track) | PLANNED |
| M5 | Final E2E Pass, Adversarial Hardening (Tier 5), Audit & Build | Run 100% E2E tests, Tier 5 adversarial coverage hardening, forensic audit veto check, `npm run build` verification | M3, M4 | PLANNED |

## Interface Contracts

### `lib/services/events-service.ts`
```typescript
export async function getEvents(filter?: { category?: string; state?: string; limit?: number }): Promise<DistrictEvent[]>;
export async function getEventById(eventId: string): Promise<DistrictEvent | null>;
export async function registerForEvent(eventId: string, userId: string): Promise<{ success: boolean; error?: string }>;
```

### `lib/services/articles-service.ts`
```typescript
export async function getArticles(options?: { category?: string; search?: string; limit?: number }): Promise<Article[]>;
export async function getFeaturedArticle(): Promise<Article | null>;
export async function getArticleById(articleId: string): Promise<Article | null>;
```

### `lib/services/projects-service.ts`
```typescript
export function subscribeToLiveProjects(callback: (projects: ProjectItem[]) => void): () => void;
export async function getProjects(filter?: { category?: string }): Promise<ProjectItem[]>;
export async function createProjectDoc(project: Omit<ProjectItem, 'id' | 'createdAt'>): Promise<{ success: boolean; id?: string; error?: string }>;
export async function updateProjectDoc(id: string, updates: Partial<ProjectItem>): Promise<{ success: boolean; error?: string }>;
export async function deleteProjectDoc(id: string): Promise<{ success: boolean; error?: string }>;
```

### `actions/dues.ts`
```typescript
export async function toggleMemberDues(
  targetUserId: string,
  newStatus: 'cleared' | 'pending',
  callerToken?: string
): Promise<ActionResult<{ userId: string; duesStatus: 'cleared' | 'pending'; auditLogId: string }>>;

export async function getClubDuesRoster(
  clubId: string,
  callerToken?: string
): Promise<ActionResult<User[]>>;
```

### `actions/prospects.ts`
```typescript
export async function submitProspectLead(
  input: ProspectInput
): Promise<ActionResult<{ prospectId: string }>>;

export async function updateProspectStatus(
  prospectId: string,
  newStatus: 'new' | 'contacted' | 'meeting_attended' | 'inducted',
  notes?: string,
  callerToken?: string
): Promise<ActionResult<{ prospectId: string; status: string }>>;

export async function getClubProspects(
  clubId: string,
  callerToken?: string
): Promise<ActionResult<Prospect[]>>;
```

### `actions/upload.ts`
```typescript
export async function getCloudinaryUploadSignature(
  folder?: string
): Promise<ActionResult<CloudinarySignaturePayload>>;
```

## Code Layout
- `types/index.ts` — Type definitions
- `firestore.rules` — Firestore Security Rules
- `scripts/` — Database seeding and test utility scripts
- `lib/firebase/client.ts` — Firebase Client SDK initialization
- `lib/firebase/admin.ts` — Firebase Admin SDK initialization & RBAC verification
- `lib/services/` — Core client-side and server-side data services
- `actions/` — Server Actions for privileged mutations and third-party integrations
- `app/` — Next.js App Router route pages and layouts
- `components/` — UI sections, components, modals, and charts
- `test/` or `e2e/` — E2E test harness and test suites
