# Handoff Report: Firestore Security Rules & RBAC Specification (Milestone 1)

**Agent**: Explorer 2 (Milestone 1)  
**Date**: 2026-08-19  
**Status**: Investigation Complete  
**Target Milestone**: Milestone 1 (Schemas, Types, Rules & Seeding)

---

## 1. Observation

Direct code examination across `firestore.rules`, TypeScript definitions (`types/index.ts`), Server Actions (`actions/*`), services (`lib/services/*`), seeding scripts (`scripts/*`), and UI components (`app/*`, `components/*`) reveals the following factual baseline:

### 1.1 Existing `firestore.rules` Analysis
- In `firestore.rules` (lines 1–109):
  - **Defined Collections**: Only 4 collections are defined: `users/{userId}` (lines 30–54), `clubs/{clubId}` (lines 57–64), `prospects/{prospectId}` (lines 67–83), and `projects/{projectId}` (lines 86–106).
  - **Missing Collections**: Missing 6 critical collections specified in `ORIGINAL_REQUEST.md §R1` and `PROJECT.md §2`: `articles`, `events`, `leadership`, `dues_payments`, `dues_audit_log`, `subscribers`, as well as `metrics` and `prospect_leads`.
  - **Helper Function Weakness**: `getUserData()` in line 16 (`get(/databases/$(database)/documents/users/$(request.auth.uid)).data`) lacks an `exists()` check. If evaluated for a new user without a document, it triggers a runtime rule evaluation failure.
  - **Role Extraction Incomplete**: `isDistrictAdmin()` (line 19) and `isClubPresident()` (line 23) rely solely on reading the `/users/{userId}` document, without checking Firebase Auth custom token claims (`request.auth.token.role`).
  - **Immutability Void**: There are no rules defined for `dues_audit_log`, failing to enforce the strict immutable audit log requirement from `ORIGINAL_REQUEST.md §R1, §AC`.
  - **Naming Discrepancy**: `intake-service.ts` writes to `prospect_leads` (`collection(db, 'prospect_leads')` at line 58), while `actions/prospects.ts` writes to `prospects` (`adminDb.collection('prospects')` at line 28), and `firestore.rules` only matched `prospects/{prospectId}`.

### 1.2 Access Patterns from Codebase
- **`users` (`users/{userId}`)**:
  - `lib/services/auth-service.ts` (lines 191–209): Writes user profile upon sign-up (`userId`, `firstName`, `lastName`, `email`, `rotaryId`, `clubId`, `role`, `duesStatus`, `avatarUrl`, `occupation`, `phoneNumber`).
  - `actions/dues.ts` (lines 59–62) & `lib/services/dashboard-service.ts` (lines 286–294): Updates `duesStatus` (`'cleared' | 'pending'`).
  - `app/portal/president/page.tsx` (lines 116–136): Club president toggles member dues.
- **`clubs` (`clubs/{clubId}`)**:
  - `app/clubs/page.tsx` (lines 33–51) & `components/clubs/ClubMap.tsx`: Publicly queried for the 77-club directory across 7 states.
  - `scripts/seed-admin-rest.js` (lines 114–205): 77 clubs with coordinates `{ lat, lng }`, `meetingVenue`, `meetingDay`, `meetingTime`, `presidentId`.
- **`projects` (`projects/{projectId}`)**:
  - `lib/services/projects-service.ts` (lines 123–169) & `app/portal/dashboard/page.tsx` (lines 62–98): Member dashboard and president console allow CRUD operations on club projects.
  - `app/projects/page.tsx` (lines 52–60) & `components/sections/ProjectsSection.tsx`: Publicly read by visitors.
- **`articles` (`articles/{articleId}`)**:
  - `app/blog/page.tsx` (lines 26–154, 189–203): Publicly read and filtered by category (`Impact Reports`, `Events`, `Community Stories`, `District News`, `Announcements`).
  - Managed by District Admin.
- **`events` (`events/{eventId}`)**:
  - `app/portal/dashboard/page.tsx` (lines 388–391) & `PROJECT.md §R2`: District assemblies (DISCON 2026) and club meetings; members can view and RSVP.
- **`prospect_leads` / `prospects` (`prospect_leads/{leadId}` / `prospects/{prospectId}`)**:
  - `lib/services/intake-service.ts` (lines 35–78): Public unauthenticated users submit intake form (`name`, `email`, `phone`, `state`, `preferredClub`, `notes`).
  - `actions/prospects.ts` (lines 12–45, 116–170): Public submission + President/Admin Kanban pipeline advancement (`new` -> `contacted` -> `meeting_attended` -> `inducted`).
- **`leadership` (`leadership/{eraId}`)**:
  - `scripts/seed-admin-rest.js` (lines 208–257) & `app/about/page.tsx` (lines 73–139): Publicly read 4 DRR eras (2023–2027) with themes, biographies, and photos.
- **`dues_payments` (`dues_payments/{paymentId}`)**:
  - `lib/services/dashboard-service.ts` (lines 124–165) & `app/portal/dashboard/page.tsx` (lines 672–800): Financial ledger where members see their own payments and presidents/admins see club receipts.
- **`dues_audit_log` (`dues_audit_log/{logId}`)**:
  - `lib/services/dashboard-service.ts` (lines 300–307) & `actions/dues.ts`: Append-only audit entries containing `memberId`, `targetUserId`, `newStatus`, `clearedBy`, `timestamp`. Must be strictly read-only after creation.
- **`subscribers` (`subscribers/{subscriberDocId}`)**:
  - `lib/services/newsletter-service.ts` (lines 14–46): Public users subscribe with email. Calls `getDoc` on `subscribers/{subscriberDocId}` to check existence before `setDoc`.
- **`metrics` (`metrics/{metricId}`)**:
  - `scripts/seed-admin-rest.js` (lines 260–270): District-wide public statistics (`activeClubs: 77`, `totalRotaractors: 700`, `constituentStates: 7`).

---

## 2. Logic Chain

### 2.1 Role-Based Access Control Architecture
1. **Multi-Source Role Verification (Custom Claims + User Document)**:
   - Fast path: Firebase Auth token custom claim (`request.auth.token.role`).
   - Fallback/Direct path: Firestore user document (`/databases/$(database)/documents/users/$(request.auth.uid)`).
   - Resilience: Checking `exists(...)` prior to calling `get(...).data` prevents unhandled security rule errors for uninitialized profiles.
2. **Three-Tier User Hierarchy**:
   - `district_admin`: Full administrative oversight across all collections.
   - `president`: Administrative control scoped to their specific club (`getUserData().clubId == clubId` or `resource.data.clubId == getUserData().clubId`).
   - `member`: Standard authenticated user with personal profile read/write access and self-payment ledger visibility.
3. **Public Access Scoping**:
   - Open read (`allow read: if true;`): `clubs`, `projects`, `articles`, `events`, `leadership`, `metrics`.
   - Open create (`allow create: if true;`): `prospect_leads`, `prospects`, `subscribers`.
   - Restricted PII protection: `prospect_leads` / `prospects` read access MUST NOT be public (protecting prospective members' phone numbers, emails, and notes).
4. **Financial Audit Immutability**:
   - `dues_audit_log` documents must NEVER be updated or deleted (`allow update, delete: if false;`).
   - `users` update rules must prevent members from elevating their own `role` or clearing their own `duesStatus` (`!request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'duesStatus', 'rotaryId', 'clubId'])`).

---

## 3. Recommended Helper Functions & Rules Implementation

### 3.1 Core Security Helper Functions

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // --- RBAC & AUTH HELPER FUNCTIONS ---

    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function userDocExists() {
      return isAuthenticated() && exists(/databases/$(database)/documents/users/$(request.auth.uid));
    }

    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    function isDistrictAdmin() {
      return isAuthenticated() && (
        (request.auth.token.role == 'district_admin') ||
        (userDocExists() && getUserData().role == 'district_admin')
      );
    }

    function isPresident() {
      return isAuthenticated() && (
        (request.auth.token.role == 'president') ||
        (userDocExists() && getUserData().role == 'president')
      );
    }

    function isClubPresident(clubId) {
      return isAuthenticated() && (
        (request.auth.token.role == 'president' && request.auth.token.clubId == clubId) ||
        (userDocExists() && getUserData().role == 'president' && getUserData().clubId == clubId)
      );
    }

    // Email validation regex helper
    function isValidEmail(email) {
      return email is string && email.matches('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$');
    }
```

### 3.2 Collection Access Matrix & Rule Specifications

| # | Collection Path | Read Permission | Create Permission | Update Permission | Delete Permission | Field Protections & Constraints |
|---|---|---|---|---|---|---|
| 1 | `users/{userId}` | Authenticated (`isAuthenticated()`) | Self only (`isOwner(userId)`) | Admin full; Self (no role/duesStatus/rotaryId/clubId alteration); Club President (can toggle duesStatus for club members) | District Admin only | Protected keys on self-update: `['role', 'duesStatus', 'rotaryId', 'clubId']` |
| 2 | `clubs/{clubId}` | Public (`true`) | District Admin only | District Admin OR assigned Club President (`isClubPresident(clubId)`) | District Admin only | Map coordinates `{ lat, lng }`, state, meeting info |
| 3 | `projects/{projectId}` | Public (`true`) | District Admin OR Club President for club (`isClubPresident(request.resource.data.clubId)`) | District Admin OR Club President for club (`isClubPresident(resource.data.clubId)`) | District Admin OR Club President for club (`isClubPresident(resource.data.clubId)`) | Valid title, progress (0–100), clubId |
| 4 | `articles/{articleId}` | Public (`true`) | District Admin only | District Admin only | District Admin only | Blog & news publishing |
| 5 | `events/{eventId}` | Public (`true`) | District Admin OR Club President | District Admin OR Club President | District Admin OR Club President | Date, venue, registrationLink, rsvpCount |
| 6 | `prospect_leads/{leadId}` & `prospects/{prospectId}` | Admin OR assigned Club President (`isClubPresident(resource.data.assignedClubId)`) | Public (`true`) with schema validation | Admin OR assigned Club President | District Admin only | Public cannot read leads (PII protection); create requires valid email |
| 7 | `leadership/{eraId}` | Public (`true`) | District Admin only | District Admin only | District Admin only | Historical DRR lineage (2023–2027) |
| 8 | `dues_payments/{paymentId}` | Member self (`isOwner(resource.data.userId)` / `memberId`), Club President, or Admin | Member self (submitting payment), Club President, or Admin | District Admin OR Club President | District Admin only | Member ledger & financial clearance records |
| 9 | `dues_audit_log/{logId}` | District Admin OR Club President for member's club | Authenticated Admin / Club President | **DENIED (`false`)** | **DENIED (`false`)** | **IMMUTABLE AUDIT TRAIL** (updates & deletes strictly prohibited) |
| 10 | `subscribers/{subscriberId}` | Get: Public / Admin; List: Admin only | Public (`true`) with valid email format | District Admin only | District Admin only | Newsletter subscription list with duplication prevention |
| 11 | `metrics/{metricId}` | Public (`true`) | District Admin only | District Admin only | District Admin only | District public stats counter |
| 12 | `auth_users/{userId}` | Self (`isOwner(userId)`) OR Admin | Self (`isOwner(userId)`) OR Admin | Self (`isOwner(userId)`) OR Admin | District Admin only | Auth sync fallback cache |

---

## 4. Caveats

1. **Dual Collection Support for Prospects**: Both `prospect_leads` and `prospects` must be covered in `firestore.rules` or unified in Milestone 2 service migration so neither direct client intake (`intake-service.ts`) nor Server Action pipelines (`actions/prospects.ts`) encounter permission errors.
2. **Subscriber Collection Querying vs Single Doc Read**: In `newsletter-service.ts`, `getDoc(subscriberRef)` is executed by an unauthenticated client. Therefore, `subscribers/{subscriberId}` must allow `get: if true;` while keeping `list: if isDistrictAdmin();` to prevent public mass scraping of the subscriber database.
3. **Admin SDK Privileged Operations**: Server Actions (`actions/dues.ts`, `actions/prospects.ts`) utilize `firebase-admin` which bypasses Firestore security rules on the server. However, direct client Firestore subscriptions (`onSnapshot`, `getDocs`, `addDoc`) in `lib/services/*` rely directly on `firestore.rules`. Both layers must be aligned.

---

## 5. Conclusion

1. The current `firestore.rules` file is incomplete and misses 6 out of the 9 required collections, creating security holes or blocking required service operations.
2. All 10 collections across District 9126 have been cataloged with precise read, create, update, delete, and field validation constraints.
3. The proposed security rules provide robust, enterprise-grade Role-Based Access Control (RBAC) supporting District Admins, Club Presidents, Members, and Public Guests, with immutable financial audit trails and PII protection for prospective members.

---

## 6. Verification Method

To verify the security rules and RBAC implementation:
1. **Rule Syntax & Validation**:
   - Inspect `firestore.rules` to ensure all 10 collection matches (`users`, `clubs`, `projects`, `articles`, `events`, `prospect_leads`/`prospects`, `leadership`, `dues_payments`, `dues_audit_log`, `subscribers`, `metrics`) are present.
2. **Automated Test Suite**:
   - Run Milestone 4 / Tier 1 test `test/tier1-features/02-security-rules.test.ts` to verify authenticated vs unauthenticated access across every collection.
   - Run `test/tier2-boundaries/05-rbac-unauthorized-access.test.ts` to verify that non-admin/non-president users cannot modify `role`, `duesStatus`, or alter `dues_audit_log`.
3. **Build Integrity**:
   - Run `npm run build` to confirm zero compilation or TypeScript errors across the workspace.
