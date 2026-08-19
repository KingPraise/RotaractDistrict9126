# Frontend Route & Client Component Survey Report

**Agent**: `teamwork_preview_explorer_survey_1`  
**Date**: 2026-08-19T15:08:00Z  
**Target Project**: Rotaract District 9126 Platform (`rotaract-district-9126`)  
**Scope**: Comprehensive Survey of All Frontend Routes, Client Components, State Management, Forms, Mock Data, Schemas, and UI Contracts.

---

## 1. Observation

### 1.1 Route Inventory & Component Hierarchy

The application utilizes Next.js App Router (14.2.6) with TypeScript and Tailwind CSS. The survey revealed **12 routes** (including the 10 core routes specified in `ORIGINAL_REQUEST.md`):

| Route Path | Primary Page File | Main Components Rendered | Client/Server Boundary | Current Data Source |
|---|---|---|---|---|
| `/` (Homepage) | `app/page.tsx` (L1–30) | `Navbar`, `HeroSection`, `ImpactSection`, `WhoWeAreSection`, `DistrictGovernorSection`, `ExperienceSection`, `LeadershipSection`, `ProjectsSection`, `CTASection`, `Footer` | Server Page wrapping `'use client'` sections | Static hardcoded arrays + `projects-service` |
| `/about` | `app/about/page.tsx` (L1–1086) | `Navbar`, `DistrictGovernorSection`, `DRRSpotlightSection`, `RotaryTooltip`, `CountUp`, Leader Dossier Modal, `Footer` | `'use client'` Page | Hardcoded `redistrictingTimeline`, `pastLeaders`, `currentTeam`, `sevenStates` |
| `/clubs` | `app/clubs/page.tsx` (L1–318) | `Navbar`, `ClubMap` (dynamic Leaflet import L11–21), Club Directory List, Search & Filter Bar | `'use client'` Page | Hardcoded `lib/clubs-data.ts` (1,115 lines) |
| `/projects` | `app/projects/page.tsx` (L1–442) | `Navbar`, 3D Featured Carousel, 4-Metric Impact Ribbon, Masonry Project Grid with Sliding Drawer, `Footer` | `'use client'` Page | `lib/services/projects-service.ts` (`localStorage` / in-memory) |
| `/blog` | `app/blog/page.tsx` (L1–607) | `Navbar`, Editorial Hero Story, 2-Column Highlight Grid, Masonry Dispatches, Fortnightly Newsletter Form, `Footer` | `'use client'` Page | Hardcoded `blogPosts` array (9 items) + live `subscribeNewsletter` |
| `/heritage` | `app/heritage/page.tsx` (L1–6) | Server `redirect('/about')` | Server Page | N/A (Redirects to `/about#lineage`) |
| `/join` | `app/join/page.tsx` (L1–393) | `Navbar`, `JoinClubDirectory` (Suspense), WhatsApp Direct Connect Grid, `Footer` | `'use client'` Page | Hardcoded `lib/clubs-data.ts` |
| `/login` | `app/login/page.tsx` (L1–8) | `AuthContainer` (`initialMode="login"`) | `'use client'` Page | `lib/services/auth-service.ts` |
| `/register` | `app/register/page.tsx` (L1–8) | `AuthContainer` (`initialMode="register"`) | `'use client'` Page | `lib/services/auth-service.ts` |
| `/forgot-password` | `app/forgot-password/page.tsx` (L1–8) | `AuthContainer` (`initialMode="forgot"`) | `'use client'` Page | `lib/services/auth-service.ts` |
| `/portal/dashboard` | `app/portal/dashboard/page.tsx` (L1–1763) | Sidebar Navigation, Header, 7 Inner Views (`Dashboard`, `Identity Card`, `Events`, `Projects`, `Dues & Payments`, `Directory`, `Settings`), Right Rail Digital ID Card & Notices | `'use client'` Page | `dashboard-service.ts`, `projects-service.ts`, hardcoded states |
| `/portal/president` | `app/portal/president/page.tsx` (L1–394) | `Navbar`, Executive Stats, Membership Roster Table (1-click Dues Toggle), Prospective Member Kanban Pipeline, `Footer` | `'use client'` Page | `actions/dues.ts`, `actions/prospects.ts`, `INITIAL_ROSTER`, `INITIAL_PROSPECTS` |

---

### 1.2 Route-by-Route Deep Investigation

#### 1. Homepage (`/` -> `app/page.tsx`)
- **File**: `app/page.tsx` (30 lines).
- **Structure**:
  - `HeroSection` (`components/sections/HeroSection.tsx`, L1–220): 4 background cross-fading carousel images (7s timer), entrance animations, animated stat ribbon (`CountUp` to 77 Active Clubs, 700+ Rotaractors, 50,000+ Beneficiaries). Action buttons link to `/join` ("Discover More") and `/projects` ("Our Impact").
  - `ImpactSection` (`components/sections/ImpactSection.tsx`, L1–154): Horizontal snap-scrolling carousel with 4 hardcoded impact cards (Children Vaccinated, Youth Trained, 7 States United, Rotaractors United).
  - `WhoWeAreSection` (`components/sections/WhoWeAreSection.tsx`, L1–124): Purpose statement, Founding Charter 2009 quote, 3-image grid.
  - `DistrictGovernorSection` (`components/sections/DistrictGovernorSection.tsx`, L1–317): 5-photo interactive carousel with auto-rotation (6s interval), 5 thumbnail selectors, official biography of DG Rtn. Olaniyi Amoo Okin (2026/2027), 3 governance pillars, and CTA links.
  - `ExperienceSection` (`components/sections/ExperienceSection.tsx`, L1–154): 4 experience pillars (Club Life, Community Service, Leadership Training, District Events) with crimson overlay cards and button linking to `/clubs`.
  - `LeadershipSection` (`components/sections/LeadershipSection.tsx`, L1–168): 7 executive leaders grid (DRR Adaramoye Iyanuoluwa, IPDRR Raji Abeeb, Founding DRR Oyewumi Kamaldeen, Chief of Staff Hussain Abdulhakeem, Secretary Faleye Ifeoluwa, Treasurer Odufuwa Omotoke, Strategic Advisor Adebayo Sodiq) with interactive `RotaryTooltip`.
  - `ProjectsSection` (`components/sections/ProjectsSection.tsx`, L1–134): Displays top 3 projects from `getStoredProjects()` and listens to updates via `subscribeToProjects()`.
  - `CTASection` (`components/sections/CTASection.tsx`, L1–138): Final call-to-action buttons linking to `/clubs` and `/projects`.

#### 2. About Page (`/about` -> `app/about/page.tsx`)
- **File**: `app/about/page.tsx` (1,086 lines).
- **State Management**:
  - `activeTab`: `'overview' | 'history' | 'states' | 'team' | 'past-leaders'`.
  - `searchQuery`: filter executive team by name, role, department.
  - `selectedDept`: category filter (`'All'`, `'Executive Office'`, `'Advisory Council'`, `'Secretariat'`, `'Finance & Accounts'`, `'Service Projects'`, `'Strategy & Governance'`).
  - `selectedLeaderModal`: `LeaderMember | null` controlling the pop-up dossier modal.
- **Embedded Data**:
  - `redistrictingTimeline`: 6 chronological milestones from District 9125 legacy (2009–2024), RI provisional approval (April 2022), final ratification (April 2024), sovereign birth (1 July 2024), Foundation Era (2024–2025), and Sitting Era (2026–2027).
  - `pastLeaders`: 4 eras (Era 00: Adebayo Sodiq Babatunde, Era 01: Oyewumi Kamaldeen Adeshina, Era 02: Raji Abeeb Adekola, Era 03: Adaramoye Iyanuoluwa).
  - `currentTeam`: 7 executive board dossiers with phone and email endpoints.
  - `sevenStates`: State directory covering Osun, Oyo, Ondo, Ekiti, Kwara, Niger, and Kogi with major hubs and signature service focus.

#### 3. Clubs Directory & Map (`/clubs` -> `app/clubs/page.tsx`)
- **File**: `app/clubs/page.tsx` (318 lines).
- **State Management**:
  - `searchQuery`: search across club name, state, city, and rotaryId.
  - `selectedType`: `'All' | 'Campus' | 'Professional' | 'Community'`.
  - `selectedState`: `'All' | 'Oyo' | 'Osun' | 'Ondo' | 'Ekiti' | 'Kwara' | 'Kogi' | 'E-Clubs'`.
  - `mobileView`: `'list' | 'map'`.
  - `activeClubId`: active club ID selected either from list card click or map marker click.
- **Components**:
  - `ClubMap` (`components/clubs/ClubMap.tsx`, L1–171): Dynamically loaded Leaflet canvas centered at `[7.85, 4.5]`, rendering colored custom markers by club type with interactive popups and `flyTo` camera transitions on active selection.
  - Card list rendering 77 clubs with "Express Interest" action button routing to `/join?club=<clubName>`.
- **Data Source**:
  - `lib/clubs-data.ts` (1,115 lines): Currently hardcoded array of `Club` objects with coordinates, meeting venues, and schedules.

#### 4. Projects Showcase (`/projects` -> `app/projects/page.tsx`)
- **File**: `app/projects/page.tsx` (442 lines).
- **State Management**:
  - `projectsList`: `ProjectItem[]` loaded on mount and subscribed via `subscribeToProjects()`.
  - `selectedCategory`: `'All' | 'Healthcare' | 'WASH' | 'Education' | 'Environment' | 'Food Security' | 'Empowerment'`.
  - `searchQuery`: filters title, location, club name.
  - `activeSlide`: index for 3D carousel rotating top 3 featured projects with translation & scaling styles.
- **UI Interaction**:
  - CSS Masonry column feed with hover sliding bottom drawer revealing impact statistics, metrics icons, and full report links.
- **Data Source**:
  - `lib/services/projects-service.ts` (L1–187): Currently backed by `localStorage` (`district_9126_projects_db`) and window dispatch events.

#### 5. Impact Blog (`/blog` -> `app/blog/page.tsx`)
- **File**: `app/blog/page.tsx` (607 lines).
- **State Management**:
  - `selectedCategory`: `'All' | 'Impact Reports' | 'Events' | 'Community Stories' | 'District News' | 'Announcements'`.
  - `searchQuery`: filters title, excerpt, and hashtags.
  - `newsletterEmail`: string.
  - `isSubscribing`: boolean.
  - `newsletterStatus`: `{ success: boolean; message: string } | null`.
- **Forms & Handlers**:
  - Fortnightly Newsletter CTA Form (`handleNewsletterSubmit` L165–187): calls `subscribeNewsletter(email)` in `lib/services/newsletter-service.ts`.
- **Data Source**:
  - `blogPosts`: 9 hardcoded article entries with author avatars, read times, and tags.

#### 6. Heritage Archive (`/heritage` -> `app/heritage/page.tsx`)
- **File**: `app/heritage/page.tsx` (6 lines).
- **Behavior**: Calls Next.js `redirect('/about')` to display the DRR lineage and 4 governance eras.

#### 7. Join & Intake (`/join` -> `app/join/page.tsx`)
- **File**: `app/join/page.tsx` (393 lines).
- **State Management**:
  - Reads search params `club` and `state`.
  - `searchQuery`, `selectedState`, `selectedType`.
- **UI Interaction**:
  - Renders 77 club presidential contact cards with direct WhatsApp chat generator (`wa.me/<number>?text=...`) and meeting venue/time details.
- **Service Integration Readiness**:
  - `lib/services/intake-service.ts` (`submitProspectLead` L1–87) and `actions/prospects.ts` (`submitProspectLead` L1–110) are ready to capture structured prospect inquiries, auto-assign proximity clubs, record into `prospect_leads` in Firestore, and trigger Resend email notifications.

#### 8, 9, 10. Auth System (`/login`, `/register`, `/forgot-password`)
- **Files**:
  - `app/login/page.tsx` (8 lines) -> `<AuthContainer initialMode="login" />`
  - `app/register/page.tsx` (8 lines) -> `<AuthContainer initialMode="register" />`
  - `app/forgot-password/page.tsx` (8 lines) -> `<AuthContainer initialMode="forgot" />`
  - `components/auth/AuthContainer.tsx` (468 lines).
- **Form State**:
  - `firstName`, `lastName`, `email`, `password`, `confirmPassword`, `rememberMe`, `showPassword`, `error`, `successMessage`, `isLoading`.
- **Handlers**:
  - `handleSubmit` (L55–125):
    - `signInWithEmail(email, password)` -> redirects to `/portal/president` for presidents/admins, `/portal/dashboard` for members.
    - `signUpWithEmail(email, password, { firstName, lastName, role: 'member' })` -> redirects to `/portal/dashboard`.
    - `sendPasswordReset(email)` -> displays success notification.

#### 11. Member Portal Dashboard (`/portal/dashboard` -> `app/portal/dashboard/page.tsx`)
- **File**: `app/portal/dashboard/page.tsx` (1,763 lines).
- **Navigation Views**:
  1. `Dashboard`: Impact points, events attended, projects joined stat cards, monthly bar chart with filter switcher (`Events`, `Projects`, `Volunteering`), member dues roster with live search and CSV export.
  2. `Identity Card` (L1339–1471): Credit-card aspect ratio (1.586/1) digital pass with dynamic QR verification code (`https://api.qrserver.com/v1/create-qr-code/...`), masked ID, club affiliation, and 6-field member ledger (Member ID, Tier, Club, Joined, Dues Status, Dues Paid).
  3. `Events` (L1152–1338): Interactive calendar of upcoming district and club assemblies, RSVP buttons, and registration links.
  4. `Projects` (L818–1050): Full Projects CRUD console:
     - "Upload New Project" modal with Title, Category, Status, Execution Progress slider (0–100%), Club, Location, Year, Image URL, Description, Beneficiaries statNumber and statLabel.
     - "Edit" project handler.
     - "Delete" project handler with confirmation prompt.
     - Synchronizes in real time with public `/` and `/projects` views.
  5. `Dues & Payments` (L672–817): Current status banner (`Cleared` vs `Pending`), next due fee (₦4,500), consecutive terms cleared counter, payment history ledger with downloadable receipt action.
  6. `Directory` (L568–671): Searchable directory of active and alumni club members with status pills and avatar previews.
  7. `Settings` (L410–566): Profile edit form (First Name, Full Name, Email, Phone, Club) and toggles (Email notifications, District newsletter, Two-factor authentication).
- **Right Rail**:
  - Compact Digital ID Pass with verified QR seal, "Save Pass" download, "Share ID" action, and District Notices board.

#### 12. President Administration Console (`/portal/president` -> `app/portal/president/page.tsx`)
- **File**: `app/portal/president/page.tsx` (394 lines).
- **State Management**:
  - `roster`: `User[]` initialized from `INITIAL_ROSTER`.
  - `prospects`: `Prospect[]` initialized from `INITIAL_PROSPECTS`.
  - `isUpdatingDues`: `string | null` (tracking pending user update).
- **Action Handlers**:
  - `handleToggleDues(userId, currentStatus)` (L117–136): Optimistically updates local dues status and calls `toggleMemberDues(userId, newStatus)` Server Action in `actions/dues.ts`.
  - `handleAdvanceProspect(prospectId, currentStatus)` (L139–150): Advances candidate along the Kanban lifecycle (`new` -> `contacted` -> `meeting_attended` -> `inducted`) and calls `updateProspectStatus(prospectId, nextStatus)` Server Action in `actions/prospects.ts`.
- **Kanban Columns**:
  - 4 columns: New Inquiries (`#D4A520`), Contacted (`#38BDF8`), Meeting Attended (`#A855F7`), Inducted / Ready (`#16A34A`).

---

### 1.3 Schema Contracts & Props Survey

From `types/index.ts` and the UI survey, the client pages expect the following typed models:

```typescript
// 1. User Profile (Firestore: users/{userId})
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  rotaryId: string;
  clubId: string;
  role: 'member' | 'president' | 'district_admin';
  duesStatus: 'pending' | 'cleared';
  avatarUrl: string;
  occupation: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

// 2. Club Directory (Firestore: clubs/{clubId})
export interface Club {
  clubId: string;
  name: string;
  rotaryId?: string | number;
  memberCount?: number;
  clubType?: 'Community' | 'Campus' | 'E-Club';
  state: 'Osun' | 'Oyo' | 'Ondo' | 'Ekiti' | 'Kwara' | 'Niger' | 'Kogi' | 'E-Club / Multi-State';
  region: 'South-West' | 'North-Central';
  meetingVenue: string;
  meetingDay: string;
  meetingTime: string;
  presidentId: string;
  coordinates: { lat: number; lng: number };
  createdAt?: string;
  updatedAt?: string;
}

// 3. Projects Showcase & Dashboard CRUD (Firestore: projects/{projectId})
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  club: string;
  location: string;
  image: string;
  height?: string;
  description?: string;
  status: 'In Progress' | 'Completed' | 'Upcoming';
  progress: number;
  statNumber?: string;
  statLabel?: string;
  stats?: Array<{ icon: string; value: string; label: string }>;
  createdAt?: string;
}

// 4. Articles / Blog (Firestore: articles/{articleId})
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: 'Impact Reports' | 'Events' | 'Community Stories' | 'District News' | 'Announcements';
  date: string;
  readTime: string;
  author: { name: string; image: string };
  image: string;
  tags: string[];
  featured?: boolean;
  createdAt?: string;
}

// 5. Events (Firestore: events/{eventId})
export interface DistrictEvent {
  id: string;
  title: string;
  category: 'Conference' | 'Assembly' | 'Training' | 'Outreach' | 'Meeting';
  date: string;
  time: string;
  location: string;
  state: string;
  image?: string;
  registrationUrl?: string;
  rsvpCount?: number;
}

// 6. Prospective Leads (Firestore: prospect_leads/{prospectId})
export interface Prospect {
  prospectId: string;
  fullName: string;
  email: string;
  phone: string;
  assignedClubId: string;
  status: 'new' | 'contacted' | 'meeting_attended' | 'inducted';
  createdAt: string;
  notes?: string;
  preferredState?: string;
  updatedAt?: string;
}

// 7. Leadership Heritage (Firestore: leadership/{eraId})
export interface HistoricalLeader {
  eraId: string;
  year: string;
  designation: string;
  leaderName: string;
  theme: string;
  rotaryYear: string;
  isCurrent?: boolean;
  district: string;
  avatarUrl?: string;
  notes?: string;
}
```

---

## 2. Logic Chain

1. **Observation 1**: `app/projects/page.tsx` and `app/portal/dashboard/page.tsx` currently synchronize project mutations through `lib/services/projects-service.ts`, which relies on browser `localStorage` and `window.dispatchEvent`.  
   **Deduction**: While the client UI interfaces (CRUD forms, edit modals, deletion confirm dialogs, and progress bars) are fully styled and responsive, `projects-service.ts` must be converted to live Firestore reads (`collection(db, 'projects')`), real-time snapshots (`onSnapshot`), and Firestore mutations (`addDoc`, `updateDoc`, `deleteDoc`).

2. **Observation 2**: `app/blog/page.tsx` uses a static `blogPosts` array (9 items) while its newsletter subscription form already calls `subscribeNewsletter` in `lib/services/newsletter-service.ts`.  
   **Deduction**: A dedicated `lib/services/articles-service.ts` is required to query the `articles` collection in Firestore with category filtering, indexing, and optional real-time synchronization so blog posts load dynamically.

3. **Observation 3**: The Member Portal (`app/portal/dashboard/page.tsx`) contains a full `Events` tab with registrations and RSVPs, but there is currently no `lib/services/events-service.ts`.  
   **Deduction**: `lib/services/events-service.ts` must be created to query the `events` collection in Firestore (DISCON 2026, District Assemblies, leadership summits) and allow live RSVP / event count increments.

4. **Observation 4**: In `app/portal/president/page.tsx`, `handleToggleDues` and `handleAdvanceProspect` call Server Actions `toggleMemberDues` (in `actions/dues.ts`) and `updateProspectStatus` (in `actions/prospects.ts`).  
   **Deduction**: The frontend client components already implement optimistic UI state updates. The Server Actions must ensure seamless execution against Firestore with immutable logging in `dues_audit_log` and role-based clearance verification.

5. **Observation 5**: In `app/clubs/page.tsx` and `components/clubs/ClubMap.tsx`, 77 clubs are rendered using static data from `lib/clubs-data.ts`.  
   **Deduction**: Firestore collection `clubs` needs to be seeded with all 77 clubs and their coordinates so that `/clubs` and `/join` can query Firestore directly while retaining high-speed client-side memoized filtering.

6. **Observation 6**: In `actions/upload.ts`, `getCloudinaryUploadSignature` is implemented using Node crypto HMAC SHA-1.  
   **Deduction**: The frontend image uploaders in Member Dashboard Project Management can request signed upload parameters directly from `actions/upload.ts` and POST multi-part image binaries directly to Cloudinary CDN, receiving secure HTTPS URLs.

---

## 3. Caveats

1. **Client-Side Leaflet Dynamic Import**: `components/clubs/ClubMap.tsx` must always be imported using `next/dynamic` with `{ ssr: false }` because Leaflet accesses `window` and `document` at import time.
2. **Suspense Boundaries for Search Params**: `app/join/page.tsx` and `components/auth/AuthContainer.tsx` use `useSearchParams()`. Next.js build requires these components to be wrapped in `<Suspense>` boundaries to avoid build-time static deoptimization errors.
3. **QR Code Generation**: The Member Digital ID card uses an external QR rendering endpoint (`https://api.qrserver.com/v1/create-qr-code/`) with an offline payload fallback.

---

## 4. Conclusion

The frontend architecture across all 12 routes is fully structured, beautifully styled, and responsive. All form inputs, modal dialogs, toggle switches, filter pills, and navigation tabs are in place with explicit prop contracts.

To achieve complete end-to-end integration:
1. Seed Firestore collections (`users`, `clubs`, `projects`, `articles`, `events`, `prospect_leads`, `leadership`, `dues_payments`, `dues_audit_log`, `subscribers`).
2. Upgrade `lib/services/projects-service.ts` from `localStorage` to live Firestore `onSnapshot` / `addDoc` / `updateDoc` / `deleteDoc`.
3. Implement `lib/services/articles-service.ts` and `lib/services/events-service.ts`.
4. Connect `/blog` to `articles-service.ts` and `/portal/dashboard` Events tab to `events-service.ts`.
5. Connect `/clubs` and `/join` to `clubs` collection.
6. Verify seamless compilation with `npm run build`.

---

## 5. Verification Method

To independently verify the frontend routes, props, and client integration:
1. **Source Code Inspection**:
   - `app/page.tsx` (Homepage & Sections)
   - `app/about/page.tsx` (About, History & Leadership)
   - `app/clubs/page.tsx` & `components/clubs/ClubMap.tsx` (Clubs & Leaflet Map)
   - `app/projects/page.tsx` (Projects Showcase)
   - `app/blog/page.tsx` (Blog & Newsletter Form)
   - `app/join/page.tsx` (Join & WhatsApp Connect)
   - `app/login/page.tsx` & `components/auth/AuthContainer.tsx` (Auth system)
   - `app/portal/dashboard/page.tsx` (Member Portal & Projects CRUD)
   - `app/portal/president/page.tsx` (President Console, Dues Toggle & Kanban)
2. **Build Verification**:
   - Run `npm run build` in PowerShell from `c:\Users\DELL\antigravity\Rotaract9126`.
   - Invalidation conditions: Any TypeScript compilation errors (`tsc`), missing route parameters, or unhandled Suspense boundaries around `useSearchParams`.
