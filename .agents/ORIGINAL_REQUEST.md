# Original User Request

## Initial Request — 2026-08-19T15:03:09Z

Build and integrate the complete end-to-end backend service architecture, live Firestore data pipelines, Server Actions, Cloudinary media upload handling, and automated Resend communication workflows for all public, administrative, and member-facing frontend routes of Rotaract District 9126.

Working directory: c:\Users\DELL\antigravity\Rotaract9126
Integrity mode: development

## Requirements

### R1. Live Firestore Collections & Data Schemas
Establish typed, production-ready collections and seed data in Firebase Firestore for:
- `users`: Member profiles, roles (`member`, `president`, `district_admin`), rotary IDs, and dues clearance statuses.
- `clubs`: 7-state club directory across Osun, Oyo, Ondo, Ekiti, Kwara, Niger, and Kogi with geocoded coordinates, venues, and meeting schedules.
- `projects`: Community impact initiatives with category tags, execution progress (0–100%), beneficiary stats, and Cloudinary image galleries.
- `articles`: Impact blog posts and district news with categories, read times, and author metadata.
- `events`: Upcoming district assemblies, DISCON 2026, and club meetings with registration links.
- `prospect_leads`: Prospective member intake pipeline with automated state routing and status lifecycle (`new` -> `contacted` -> `meeting_attended` -> `inducted`).
- `leadership`: Historical DRR leadership archive spanning 2023–2027 with themes and biographical profiles.
- `dues_payments` & `dues_audit_log`: Member financial payment records and immutable administrative clearance audit trails.
- `subscribers`: Email newsletter subscribers with duplication safeguards.

### R2. Core API Services & Server Actions Pipeline
Implement and verify all required services under `lib/services/` and `actions/`:
- `lib/services/events-service.ts`: Query and filter upcoming district/club events.
- `lib/services/articles-service.ts`: Query and index blog stories and news posts.
- `lib/services/dashboard-service.ts`: Resolver for member profiles, payment ledger, volunteer hours, and club rosters.
- `lib/services/newsletter-service.ts`: Newsletter subscription with regex validation and Firestore write.
- `lib/services/intake-service.ts`: Prospective lead intake with proximity club assignment.
- `lib/services/auth-service.ts`: Firebase Auth client wrappers and role-based access control sync.
- `lib/services/projects-service.ts`: Real-time Firestore synchronization for project uploads, edits, and deletions.
- `actions/upload.ts`: Signed Cloudinary asset upload signature generator.
- `actions/dues.ts`: Dues clearance mutation and audit logging.
- `actions/prospects.ts`: Prospect advancement and Resend email dispatch to district leadership.

### R3. Client Component Integration
Wire each frontend page (`/`, `/clubs`, `/projects`, `/blog`, `/heritage`, `/join`, `/login`, `/portal/dashboard`, `/portal/president`) to its respective backend service, ensuring proper loading states, optimistic UI updates, and error handling.

### R4. Build Verification
Ensure the complete codebase compiles cleanly with `npm run build` with 0 TypeScript or linting errors.

## Acceptance Criteria

### Backend & Service Integration
- [ ] All 10 application routes dynamically load and mutate data via their dedicated Firebase services without mock fallbacks.
- [ ] Member dues toggle accurately updates `users` and appends an immutable entry to `dues_audit_log`.
- [ ] Prospective member intake form creates a Firestore document in `prospect_leads` and triggers email alert via Resend.
- [ ] Projects CRUD in Member Dashboard seamlessly updates Firestore and synchronizes to the public projects showcase.
- [ ] `npm run build` compiles with 0 errors.
