# Survey Report: Data Schemas, Firebase/Firestore Architecture, Services & Seed Datasets

**Agent:** `teamwork_preview_explorer_survey_2`  
**Workspace:** `c:\Users\DELL\antigravity\Rotaract9126`  
**Target Milestone:** Full Backend & Live Firestore Integration Survey  

---

## 1. Observation

A detailed audit across `lib/`, `types/`, `actions/`, `scripts/`, `firestore.rules`, and frontend routes (`app/`, `components/`) reveals the exact current state of schemas, Firebase integrations, and services.

### 1.1 Existing Files Inventory

| Path | Purpose / Description | Status / Observations |
|---|---|---|
| `types/index.ts` (155 lines) | Core TypeScript interfaces | Contains `User`, `Club`, `HistoricalLeader`, `DistrictMetrics`, `Prospect`, `Project`, `ActionResult`, `ProspectInput`, `CloudinarySignaturePayload`, `MemberQRPayload`. **Missing:** `Article`, `DistrictEvent`, `DuesPayment`, `DuesAuditLog`, `Subscriber`. |
| `lib/firebase/client.ts` (20 lines) | Client Firebase singleton | Initializes `FirebaseApp`, `Auth`, `Firestore` via `NEXT_PUBLIC_FIREBASE_*` environment variables. Exports `{ app, auth, db }`. |
| `lib/firebase/admin.ts` (86 lines) | Server Firebase Admin SDK | Initializes `admin.app.App`, `adminAuth`, `adminDb` via service account JSON / env credentials. Exports helper utilities `verifyAuthToken`, `getUserProfile`, `getUserRole`. |
| `firestore.rules` (109 lines) | Security rules | Rules define access for `users/{userId}`, `clubs/{clubId}`, `prospects/{prospectId}`, and `projects/{projectId}`. **Missing:** rules for `articles`, `events`, `leadership`, `dues_payments`, `dues_audit_log`, `subscribers`. |
| `lib/clubs-data.ts` (1115 lines) | Static 77-club directory | Contains static array `clubsData: Club[]` across 7 states (Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, E-Clubs). |
| `lib/services/auth-service.ts` (222 lines) | Firebase Auth & Client RBAC | Implements `signInWithEmail`, `signUpWithEmail`, `sendPasswordReset`, `signOutUser`. Syncs across `auth_users` and `users` collections. |
| `lib/services/dashboard-service.ts` (418 lines) | Member & Club Dashboard service | Implements `getMemberDashboardData`, `updateMemberDuesStatus`, `getClubRoster`. Interacts with `users`, `clubs`, `dues_payments`, `event_attendances`, `dues_audit_log`. |
| `lib/services/intake-service.ts` (87 lines) | Prospective member lead capture | Implements `submitProspectLead`. Saves leads to collection `prospect_leads` with default state club routing. |
| `lib/services/newsletter-service.ts` (60 lines) | Newsletter subscription | Implements `subscribeNewsletter`. Sanitizes email as doc ID to prevent duplicates; saves to `subscribers` collection. |
| `lib/services/projects-service.ts` (187 lines) | Community projects store | **Uses `localStorage` (`district_9126_projects_db`) and synthetic window events**. Not yet connected to Firestore `projects` collection. |
| `lib/services/events-service.ts` | Events service | **MISSING** — does not exist yet. |
| `lib/services/articles-service.ts` | Articles / Blog service | **MISSING** — does not exist yet. |
| `actions/dues.ts` (121 lines) | Server Action for dues clearance | Implements `toggleMemberDues` and `getClubDuesRoster`. Updates `users/{userId}`, but currently does not append to `dues_audit_log`. |
| `actions/prospects.ts` (228 lines) | Server Action for lead management | Implements `submitProspectLead`, `updateProspectStatus`, `getClubProspects`. Writes to collection `prospects` and triggers Resend email alerts. |
| `actions/upload.ts` (55 lines) | Server Action for Cloudinary signing | Implements `getCloudinaryUploadSignature` generating SHA-1 signature for client uploads. |
| `scripts/seed-admin-rest.js` (414 lines) | REST-based Admin Firestore seeder | Uses Google OAuth2 Service Account JWT to seed 77 clubs, 4 leadership DRR records, metrics, and 3 admin users. |
| `scripts/seed.ts` (288 lines) | TypeScript Admin SDK seeder | Seeds 13 clubs across 7 states, 4 leadership records, metrics via `firebase-admin` batch writes. |
| `scripts/seed.js` / `scripts/seed-rest.js` / `scripts/seed-client.js` | Legacy / alternate seed scripts | Historical seed test files. |

---

### 1.2 Data Schemas and Collection Structures Audit

#### 1. `users` (`users/{userId}`)
- **Location:** `types/index.ts:12-26`
- **Fields:**
  - `userId: string` (Firebase Auth UID)
  - `firstName: string`
  - `lastName: string`
  - `email: string`
  - `rotaryId: string` (e.g. `ROT-9126-0001`)
  - `clubId: string` (references `clubs/{clubId}`)
  - `role: 'member' | 'president' | 'district_admin'`
  - `duesStatus: 'pending' | 'cleared'`
  - `avatarUrl: string`
  - `occupation: string`
  - `phoneNumber: string`
  - `createdAt?: string`
  - `updatedAt?: string`
- **Observation:** `auth-service.ts` also interacts with `auth_users/{uid}` using `role: 'member' | 'club_president' | 'district_admin'`. Dual collection synchronization is implemented in `signUpWithEmail`.

#### 2. `clubs` (`clubs/{clubId}`)
- **Location:** `types/index.ts:32-50`, `lib/clubs-data.ts:22-1114`, `scripts/seed-admin-rest.js:114-205`
- **Constituent States:** 7 States (Osun, Oyo, Ondo, Ekiti, Kwara, Niger, Kogi) + E-Clubs / Multi-State.
  - Oyo (22 clubs)
  - Osun (18 clubs)
  - Ondo (5 clubs)
  - Ekiti (6 clubs)
  - Kwara (10 clubs)
  - Kogi (9 clubs)
  - Niger (Minna Central, FUTMinna in `scripts/seed.ts`)
  - E-Clubs (7 clubs)
  - Total: 77 Chartered Clubs.
- **Fields:**
  - `clubId: string` (slug, e.g. `club-ibadan-ring-road`)
  - `name: string`
  - `rotaryId?: string | number`
  - `memberCount?: number`
  - `clubType?: 'Community' | 'Campus' | 'E-Club'`
  - `state: 'Osun' | 'Oyo' | 'Ondo' | 'Ekiti' | 'Kwara' | 'Niger' | 'Kogi' | 'E-Club / Multi-State'`
  - `region: 'South-West' | 'North-Central'`
  - `meetingVenue: string`
  - `meetingDay: string`
  - `meetingTime: string`
  - `presidentId: string`
  - `coordinates: { lat: number; lng: number }`
  - `createdAt?: string`, `updatedAt?: string`

#### 3. `projects` (`projects/{projectId}`)
- **Location:** `types/index.ts:99-110` vs `lib/services/projects-service.ts:3-19`
- **Required Production Fields:**
  - `projectId: string` (or `id`)
  - `title: string`
  - `description: string`
  - `category: string` ('Healthcare' | 'WASH' | 'Education' | 'Environment' | 'Food Security' | 'Empowerment')
  - `clubId: string`
  - `club?: string`
  - `location: string`
  - `year?: string`
  - `images: string[]` (or `image: string` with Cloudinary URLs)
  - `status: 'In Progress' | 'Completed' | 'Upcoming'`
  - `progress: number` (0–100)
  - `beneficiariesCount?: number` (or `statNumber`, `statLabel`, `stats` array)
  - `dateCompleted?: string`
  - `createdAt?: string`, `updatedAt?: string`

#### 4. `articles` (`articles/{articleId}`)
- **Location:** Currently hardcoded in `app/blog/page.tsx:26-154`
- **Required Production Fields:**
  - `articleId: string` (or `id`)
  - `title: string`
  - `excerpt: string`
  - `content?: string`
  - `category: 'Impact Reports' | 'Events' | 'Community Stories' | 'District News' | 'Announcements'`
  - `date: string` (or `publishedAt: string`)
  - `readTime: string`
  - `author: { name: string; image: string; role?: string }`
  - `image: string`
  - `tags: string[]`
  - `featured?: boolean`
  - `createdAt?: string`, `updatedAt?: string`

#### 5. `events` (`events/{eventId}`)
- **Location:** Currently hardcoded in `app/portal/dashboard/page.tsx:1190-1262`
- **Required Production Fields:**
  - `eventId: string` (or `id`)
  - `title: string`
  - `venue: string`
  - `date: string` (e.g. `Aug 12, 2026` or ISO date)
  - `time: string` (e.g. `8:00 AM`)
  - `category: 'District' | 'Club' | 'Community' | 'Admin' | 'Assembly' | 'DISCON'`
  - `tagColor?: string`, `tagBg?: string`, `tagBorder?: string`
  - `description?: string`
  - `registrationUrl?: string`
  - `isRegistered?: boolean`
  - `actionType?: 'register' | 'registered' | 'pay'`
  - `createdAt?: string`, `updatedAt?: string`

#### 6. `prospect_leads` / `prospects` (`prospect_leads/{leadId}` or `prospects/{prospectId}`)
- **Location:** `types/index.ts:82-93`, `actions/prospects.ts:32-42`, `lib/services/intake-service.ts:59-71`
- **Collection Name Discrepancy:**
  - `actions/prospects.ts` writes to `prospects`
  - `lib/services/intake-service.ts` writes to `prospect_leads`
  - `firestore.rules` rules match `/prospects/{prospectId}`
  - `ORIGINAL_REQUEST.md` specifies `prospect_leads` with status lifecycle (`new` -> `contacted` -> `meeting_attended` -> `inducted`)
- **Required Fields:**
  - `prospectId: string` (or `id`)
  - `fullName: string` (or `name`)
  - `email: string`
  - `phone: string`
  - `assignedClubId: string` (or `assignedClub`)
  - `preferredState?: DistrictState`
  - `status: 'new' | 'contacted' | 'meeting_attended' | 'inducted'`
  - `notes?: string`
  - `createdAt: string | FieldValue`
  - `updatedAt?: string`

#### 7. `leadership` (`leadership/{eraId}`)
- **Location:** `types/index.ts:56-67`, `scripts/seed-admin-rest.js:208-257`, `app/about/page.tsx:80-239`
- **Historical DRRs (4 Eras):**
  1. `drr-2023-2024`: 15th DRR (D9125) Rtr. PP Adebayo Sodiq Babatunde, PHF+1 (Theme: *Create Hope in the World*)
  2. `drr-2024-2025`: Inaugural 1st DRR (D9126) Rtr. PP Oyewumi Kamaldeen Adeshina, PHF, FEIPA (Theme: *The Magic of Rotary*)
  3. `drr-2025-2026`: 2nd DRR (D9126) Rtr. PP Raji Abeeb Adekola, PHF (Theme: *Unite for Greater Impact*)
  4. `drr-2026-2027`: Sitting 3rd DRR (D9126) Rtr. PP Adaramoye Iyanuoluwa, PHF (Theme: *Creating Lasting Impact*, `isCurrent: true`)
- **Fields:**
  - `eraId: string`
  - `year: string` (e.g. `'2026/2027'`)
  - `rotaryYear: string` (e.g. `'2026-2027'`)
  - `designation: string`
  - `leaderName: string`
  - `theme: string`
  - `district: string`
  - `isCurrent?: boolean`
  - `avatarUrl?: string`
  - `notes?: string`

#### 8. `dues_payments` & `dues_audit_log`
- **Location:** `lib/services/dashboard-service.ts:125-164, 300-307`, `actions/dues.ts:59-63`
- **Fields for `dues_payments`:**
  - `paymentId: string`
  - `memberId: string`
  - `clubId: string`
  - `amount: number` (e.g. `7500`)
  - `period: string` (e.g. `'Jan – Jun 2026'`)
  - `status: 'cleared' | 'pending' | 'defaulted'`
  - `createdAt?: string`
- **Fields for `dues_audit_log`:**
  - `logId: string`
  - `memberId: string`
  - `newStatus: 'cleared' | 'pending'`
  - `clearedBy: string` (Admin/President userId or email)
  - `timestamp: FieldValue` (serverTimestamp)
  - `updatedAt: string`

#### 9. `subscribers` (`subscribers/{subscriberId}`)
- **Location:** `lib/services/newsletter-service.ts:28-45`
- **Fields:**
  - `subscriberId: string` (sanitized email, e.g. `user_example_com`)
  - `email: string`
  - `status: 'active' | 'unsubscribed'`
  - `source: string` (e.g. `'blog_footer'`)
  - `createdAt: FieldValue` (serverTimestamp)
  - `subscribedAt: string`

---

### 1.3 Service Implementation Status Audit

| Service File | Current Status | Key Functions / Missing Elements |
|---|---|---|
| `lib/services/events-service.ts` | **NOT IMPLEMENTED** | Needs functions: `getEvents(filter?)`, `getEventById(id)`, `registerForEvent(eventId, userId)`. |
| `lib/services/articles-service.ts` | **NOT IMPLEMENTED** | Needs functions: `getArticles(category?, search?)`, `getFeaturedArticle()`, `getArticleById(id)`. |
| `lib/services/dashboard-service.ts` | **IMPLEMENTED (Client SDK)** | Implements `getMemberDashboardData`, `updateMemberDuesStatus`, `getClubRoster`. Has fallback mock data when collections are empty. |
| `lib/services/newsletter-service.ts` | **IMPLEMENTED (Client SDK)** | Implements `subscribeNewsletter`. Has email regex validation and docId deduplication. |
| `lib/services/intake-service.ts` | **IMPLEMENTED (Client SDK)** | Implements `submitProspectLead`. Auto-assigns default clubs per state; writes to `prospect_leads`. |
| `lib/services/auth-service.ts` | **IMPLEMENTED (Client SDK)** | Implements `signInWithEmail`, `signUpWithEmail`, `sendPasswordReset`, `signOutUser`. |
| `lib/services/projects-service.ts` | **PARTIALLY IMPLEMENTED (LocalStorage only)** | Implements CRUD using `localStorage` and `CustomEvent`. Must be replaced with live Firestore `collection(db, 'projects')` queries, snapshots, and mutation functions (`getProjects`, `createProject`, `updateProjectDoc`, `deleteProjectDoc`, `subscribeToLiveProjects`). |

---

## 2. Logic Chain

1. **Schema Consistency:** The frontend and server actions rely on consistent Firestore collections. Where collection names differ (e.g. `prospects` in `actions/prospects.ts` and `firestore.rules` vs `prospect_leads` in `intake-service.ts` and `ORIGINAL_REQUEST.md`), queries will miss documents unless aligned.
2. **Missing Services:** Pages `/blog` and `/portal/dashboard` currently hardcode articles and events in their JSX. Building `lib/services/articles-service.ts` and `lib/services/events-service.ts` and seeding their respective collections will enable 100% dynamic loading without mock fallbacks.
3. **Projects Synchronization:** `lib/services/projects-service.ts` currently stores projects in browser `localStorage`. To fulfill Acceptance Criteria ("Projects CRUD in Member Dashboard seamlessly updates Firestore and synchronizes to the public projects showcase"), `projects-service.ts` must use Firestore client SDK (`collection`, `onSnapshot`, `addDoc`, `updateDoc`, `deleteDoc`).
4. **Dues Audit Trail:** While `dashboard-service.ts` writes to `dues_audit_log`, `actions/dues.ts` currently only updates `users`. Adding the immutable write to `dues_audit_log` in `actions/dues.ts` ensures Server Action mutations preserve the full audit trail.
5. **Firestore Security Rules:** Collections `articles`, `events`, `leadership`, `dues_payments`, `dues_audit_log`, and `subscribers` currently have no matching rules in `firestore.rules`. Adding them ensures security compliance and allows client-side reads/writes where appropriate.

---

## 3. Caveats

1. **Firebase Admin vs Client SDK Usage:** `actions/*` use `firebase-admin` (Server Actions running in Node.js runtime), whereas `lib/services/*` use the client SDK (`firebase/firestore`). Both are valid and complementary, but schema field naming must remain identical between both.
2. **Service Account in Environment:** Seeding via `scripts/seed-admin-rest.js` uses Google Cloud REST OAuth2 and `rotaract-district-9126-firebase-adminsdk-fbsvc-2fe7b2b487.json` or `.env.local`. When running in production (e.g. Netlify / Vercel), `FIREBASE_SERVICE_ACCOUNT_KEY` or `FIREBASE_PRIVATE_KEY` + `FIREBASE_CLIENT_EMAIL` are required.
3. **Resend API Key:** `actions/prospects.ts` sends email notifications to `kingpraise15@gmail.com` via Resend. If `RESEND_API_KEY` is not present, it fails gracefully with a warning log without crashing the lead creation.

---

## 4. Conclusion

- **Architecture is 75% framed**: Core client and admin singletons (`lib/firebase/client.ts`, `lib/firebase/admin.ts`), 77-club directory dataset, authentication, newsletter, and dues actions are already built.
- **Key gaps to close for complete backend integration**:
  1. Create `lib/services/events-service.ts` and `lib/services/articles-service.ts`.
  2. Upgrade `lib/services/projects-service.ts` from `localStorage` to real-time Firestore synchronization.
  3. Align `types/index.ts` with explicit types for `Article`, `DistrictEvent`, `DuesPayment`, `DuesAuditLog`, `Subscriber`.
  4. Ensure `actions/dues.ts` writes to `dues_audit_log`.
  5. Harmonize `prospect_leads` / `prospects` collection naming across `actions/prospects.ts`, `lib/services/intake-service.ts`, and `firestore.rules`.
  6. Update `firestore.rules` to include rules for all 9 collections (`users`, `clubs`, `projects`, `articles`, `events`, `prospect_leads`/`prospects`, `leadership`, `dues_payments` & `dues_audit_log`, `subscribers`).
  7. Seed live Firestore with the full initial datasets (77 clubs, 4 leadership DRRs, district metrics, projects, articles, events, users).

---

## 5. Verification Method

To independently verify all findings:

1. **Verify Existing Services & Files:**
   ```powershell
   ls lib/services
   ls types
   ls actions
   ls scripts
   ```
2. **Inspect Type Definitions:**
   `types/index.ts` lines 1 to 155.
3. **Inspect Services:**
   - `lib/services/auth-service.ts`
   - `lib/services/dashboard-service.ts`
   - `lib/services/intake-service.ts`
   - `lib/services/newsletter-service.ts`
   - `lib/services/projects-service.ts`
4. **Inspect Server Actions & Rules:**
   - `actions/dues.ts`
   - `actions/prospects.ts`
   - `actions/upload.ts`
   - `firestore.rules`
5. **Inspect Seed Scripts:**
   - `scripts/seed-admin-rest.js`
   - `scripts/seed.ts`
6. **Compile & Type-Check:**
   ```powershell
   npx tsc --noEmit
   npm run build
   ```
