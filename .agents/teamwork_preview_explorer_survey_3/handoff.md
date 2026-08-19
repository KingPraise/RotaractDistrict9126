# Server Actions, Cloudinary, Resend, Auth/RBAC & Build Configuration Survey

## 1. Observation

### Focus Area 1: Server Actions Pipeline (`actions/`)
- **`actions/upload.ts` (lines 13–54)**:
  - Exported function: `getCloudinaryUploadSignature(folder: string = 'rotaract_9126/general'): Promise<ActionResult<CloudinarySignaturePayload>>`.
  - Logic: Generates SHA-1 hash of `folder=${folder}&timestamp=${timestamp}${apiSecret}` using Node's `crypto.createHash('sha1')`.
  - Credentials read: `process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME`, `process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY`, `process.env.CLOUDINARY_API_SECRET`.
  - Returns payload: `{ signature, timestamp, apiKey, cloudName, folder }`.
- **`actions/dues.ts` (lines 14–120)**:
  - Exported functions:
    1. `toggleMemberDues(targetUserId: string, newStatus: DuesStatus, callerToken?: string)`: Updates Firestore `users/{targetUserId}` document with `duesStatus` (`'cleared' | 'pending'`) and `updatedAt`. If `callerToken` is provided, verifies caller role via `verifyAuthToken` and ensures caller is a `district_admin` or `president` of the target member's club.
    2. `getClubDuesRoster(clubId: string, callerToken?: string)`: Queries `users` collection in Firestore `where('clubId', '==', clubId)`.
  - **Observation on Audit Log**: Line 59–62 updates `users` doc directly (`await adminDb.collection('users').doc(targetUserId).update(...)`), but does NOT write to `dues_audit_log`. Note: in `lib/services/dashboard-service.ts:updateMemberDuesStatus` (lines 300–307), writes to `dues_audit_log` ARE present (`await addDoc(collection(db, 'dues_audit_log'), ...)`).
- **`actions/prospects.ts` (lines 12–227)**:
  - Exported functions:
    1. `submitProspectLead(input: ProspectInput)`: Validates name, phone, email regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), assigned club. Writes to Firestore collection `prospects` (document ID auto-generated). Dispatches notification email via Resend REST API (`https://api.resend.com/emails`) using `process.env.RESEND_API_KEY`.
    2. `updateProspectStatus(prospectId: string, newStatus: ProspectStatus, notes?: string, callerToken?: string)`: Validates status (`'new' | 'contacted' | 'meeting_attended' | 'inducted'`), verifies Admin / assigned President permission if token provided, and updates `prospects/{prospectId}` doc.
    3. `getClubProspects(clubId: string, callerToken?: string)`: Queries `prospects` collection `where('assignedClubId', '==', clubId).orderBy('createdAt', 'desc')`.
  - **Observation on Collection Naming**: `actions/prospects.ts` writes to `prospects`, while `lib/services/intake-service.ts` writes to `prospect_leads`.

### Focus Area 2: Cloudinary Media Upload & Configuration
- **Configuration (`next.config.mjs`, lines 3–16)**:
  ```js
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  }
  ```
- **Direct Upload Verification (`scripts/test-cloudinary.js`)**:
  - Direct upload test script generates signature and posts a 1x1 test image to `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`.
  - Live credentials in `.env.local` (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dkayul64b"`, `CLOUDINARY_API_KEY="399688398522134"`, `CLOUDINARY_API_SECRET="NkvXrZBrGLbnMjG1YYNaku-dMPM"`).
- **UI Integration State**:
  - `app/portal/dashboard/page.tsx` contains project creation modals with image URL input, but direct Cloudinary file drop/upload widget is not yet wired to `getCloudinaryUploadSignature`.

### Focus Area 3: Resend Email Integration & Notification Workflows
- **Package & Credentials**:
  - `package.json` line 26: `"resend": "^3.5.0"`
  - `.env.local` line 23: `RESEND_API_KEY="<REDACTED>"`
- **Lead Alert Email (`actions/prospects.ts`, lines 47–90)**:
  - Triggered immediately after lead document write.
  - Resolves club name from `clubs/{assignedClubId}`.
  - Sends styled HTML notification to `kingpraise15@gmail.com` with sender `Rotaract 9126 <onboarding@resend.dev>` and subject `New Lead: ${newProspect.fullName} (${clubName})`.
- **Gaps**:
  - No autoresponder welcome email sent to the prospect lead upon submission.
  - No email notification dispatched when prospect status moves across the pipeline.
  - Newsletter subscription in `lib/services/newsletter-service.ts` writes to `subscribers` collection but does not trigger a welcome email via Resend.

### Focus Area 4: Firebase Auth Client Wrappers & Role-Based Access Control (RBAC)
- **Client Auth Initializer (`lib/firebase/client.ts`)**:
  - Uses `initializeApp`, `getAuth`, `getFirestore` with `NEXT_PUBLIC_FIREBASE_*` environment variables.
- **Admin SDK Initializer (`lib/firebase/admin.ts`)**:
  - Singleton `getAdminApp()` parses `FIREBASE_PRIVATE_KEY` (handling `\n`), `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PROJECT_ID`.
  - Helpers: `verifyAuthToken(idToken)`, `getUserProfile(userId)`, `getUserRole(userId)`.
- **Auth Service Wrappers (`lib/services/auth-service.ts`)**:
  - `signInWithEmail(email, password)`: Authenticates via `signInWithEmailAndPassword`, retrieves user role from `auth_users/{uid}` (defaults to `'member'`), updates `lastLoginAt`.
  - `signUpWithEmail(email, password, { firstName, lastName, role })`: Creates Firebase user, updates profile `displayName`, writes profile to `auth_users` collection, and dual-syncs to `users/{uid}` collection with `rotaryId`, default `clubId: 'club-ibadan-central'`, `role: 'member'`, `duesStatus: 'pending'`.
  - `sendPasswordReset(email)`: Dispatches password reset link via Firebase Auth.
  - `signOutUser()`: Clears current session via `signOut(auth)`.
- **Security Rules (`firestore.rules`)**:
  - Defined rules for `users`, `clubs`, `prospects`, `projects`.
  - Helper functions `isAuthenticated()`, `isDistrictAdmin()`, `isClubPresident(clubId)`, `isOwner(userId)`.
  - Prevents non-admin/non-president users from modifying `role`, `duesStatus`, `rotaryId`, `clubId`.

### Focus Area 5: Project Build Setup & Environment Variables
- **Dependencies (`package.json`)**:
  - Next.js: `14.2.6` (running `14.2.35` under node)
  - React: `18.3.1`, React-DOM: `18.3.1`
  - Firebase: `10.13.0`, Firebase-Admin: `12.4.0`
  - Resend: `3.5.0`
  - Framer-Motion: `11.3.28`, Leaflet: `1.9.4`, React-Leaflet: `4.2.1`, Lucide-React: `0.436.0`, Tailwindcss: `3.4.10`, TypeScript: `5.5.4`
- **TypeScript (`tsconfig.json`)**:
  - Path alias: `"@/*": ["./*"]`
  - `npx tsc --noEmit` executed with exit code 0 (0 errors).
- **Production Build Execution (`npm run build`)**:
  - Clean production build compiled with exit code 0.
  - Successfully generated static and dynamic routes for all 18 endpoints (`/`, `/about`, `/blog`, `/clubs`, `/forgot-password`, `/heritage`, `/join`, `/login`, `/manifest.webmanifest`, `/opengraph-image`, `/portal/dashboard`, `/portal/president`, `/projects`, `/register`, `/robots.txt`, `/sitemap.xml`).
- **Environment Variables**:
  - `.env.example` documents all required keys.
  - `.env.local` contains valid, active live keys for Firebase Client, Firebase Admin, Cloudinary, Google Maps, and Resend.

---

## 2. Logic Chain

1. **Server Actions vs Acceptance Criteria**:
   - `actions/dues.ts` mutates `users/{targetUserId}` doc, but Acceptance Criteria 2 states: *"Member dues toggle accurately updates `users` and appends an immutable entry to `dues_audit_log`."* Currently only `lib/services/dashboard-service.ts:updateMemberDuesStatus` writes to `dues_audit_log`. `actions/dues.ts` must be updated to write to `dues_audit_log` upon every dues toggle.
2. **Collection Naming Discrepancies**:
   - `actions/prospects.ts` and `firestore.rules` use `prospects` collection, whereas `lib/services/intake-service.ts` and `ORIGINAL_REQUEST.md` specify `prospect_leads`. These should be unified to prevent pipeline fragmentation.
3. **Missing Core Services**:
   - Requirement R2 requires `lib/services/events-service.ts` and `lib/services/articles-service.ts`. Currently, `events` and `blog` pages use local sample data arrays rather than Firestore queries.
4. **Client Real-Time Firestore Sync**:
   - `lib/services/projects-service.ts` currently relies on browser `localStorage` (`district_9126_projects_db`) and custom `window.dispatchEvent` instead of Firestore `onSnapshot` / collection writes. Connecting `projects-service.ts` directly to Firestore is necessary to fulfill Acceptance Criteria 4 ("Projects CRUD in Member Dashboard seamlessly updates Firestore and synchronizes to the public projects showcase").
5. **Cloudinary Asset Uploads**:
   - `actions/upload.ts` produces valid upload signatures. To enable media uploads from the UI (member avatar changes, project photo uploads), client components should call `getCloudinaryUploadSignature` and post directly to Cloudinary.

---

## 3. Caveats

1. **Live External API Rate Limits**: Resend free tier has domain verification requirements (`from: onboarding@resend.dev` is limited to verified sandbox recipient `kingpraise15@gmail.com`). For production delivery to all recipients, custom domain verification on Resend is required.
2. **Dual Auth Collections**: `auth_users` and `users` are both written during `signUpWithEmail`. The canonical user directory should be standardized on `users` with `userId` matching `fbUser.uid`.
3. **Google Maps Demo Key**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is present; Leaflet / React-Leaflet is used on `/clubs` as the primary interactive map engine to guarantee zero-cost client map rendering.

---

## 4. Conclusion

- **Server Actions**: `actions/upload.ts`, `actions/dues.ts`, and `actions/prospects.ts` are structurally sound and functioning. `actions/dues.ts` requires the addition of `dues_audit_log` record creation, and collection naming between `prospects` and `prospect_leads` should be normalized.
- **Cloudinary Integration**: Signed direct upload architecture is established and validated. Client file-drop widgets can directly consume `getCloudinaryUploadSignature()`.
- **Resend Email System**: Resend lead alert dispatch is implemented in `actions/prospects.ts`. Opportunity exists to add automated welcome email responses and newsletter notifications.
- **Firebase Auth & RBAC**: Firebase Client and Admin SDK configurations are in place. Role enforcement is supported via token verification in Server Actions and `firestore.rules`.
- **Build & Compilation**: Codebase passes TypeScript validation (`npx tsc --noEmit` -> exit code 0) and Next.js production build (`npm run build` -> exit code 0, 18/18 routes generated).

---

## 5. Verification Method

1. **TypeScript Compilation Check**:
   ```bash
   npx tsc --noEmit
   ```
   *Expected result: Exits with code 0.*

2. **Cloudinary Signature & Upload Verification**:
   ```bash
   node scripts/test-cloudinary.js
   ```
   *Expected result: Outputs "✅ Cloudinary direct upload SUCCESSFUL!" with secure URL and public ID.*

3. **Build Compilation Check**:
   ```bash
   npm run build
   ```
   *Expected result: Clean Next.js static and dynamic route compilation with 0 errors across 18 routes.*

4. **Inspection Points**:
   - `actions/upload.ts`: Verify signature formula `folder=${folder}&timestamp=${timestamp}${apiSecret}`.
   - `actions/dues.ts`: Verify RBAC caller verification and `users` doc update.
   - `actions/prospects.ts`: Verify lead document insertion and Resend API fetch call.
   - `lib/services/auth-service.ts`: Verify `signInWithEmail`, `signUpWithEmail`, and `signOutUser`.
   - `firestore.rules`: Verify RBAC helper rules.
