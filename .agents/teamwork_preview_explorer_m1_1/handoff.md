# Handoff Report: Milestone 1 TypeScript Schemas, Types & Data Alignment Investigation

**Agent**: teamwork_preview_explorer_m1_1  
**Working Directory**: `c:\Users\DELL\antigravity\Rotaract9126\.agents\teamwork_preview_explorer_m1_1`  
**Target Milestone**: Milestone 1 (Schemas & Types)  
**Parent Agent**: `e7c7d710-fad7-426f-8105-434ea577edf2`  
**Timestamp**: 2026-08-19T15:13:30Z  

---

## 1. Observation

A full static and dynamic codebase audit across `types/index.ts`, `app/`, `lib/`, `components/`, `actions/`, and `scripts/` yielded the following direct observations:

### 1.1 Existing `types/index.ts` (155 lines)
`types/index.ts` currently defines:
- `UserRole`: `'member' | 'president' | 'district_admin'` (`types/index.ts:1`)
- `DuesStatus`: `'pending' | 'cleared'` (`types/index.ts:2`)
- `DistrictState`: `'Osun' | 'Oyo' | 'Ondo' | 'Ekiti' | 'Kwara' | 'Niger' | 'Kogi' | 'E-Club / Multi-State'` (`types/index.ts:3`)
- `DistrictRegion`: `'South-West' | 'North-Central'` (`types/index.ts:4`)
- `ProspectStatus`: `'new' | 'contacted' | 'meeting_attended' | 'inducted'` (`types/index.ts:5`)
- `ClubType`: `'Community' | 'Campus' | 'E-Club'` (`types/index.ts:6`)
- `User`: `userId`, `firstName`, `lastName`, `email`, `rotaryId`, `clubId`, `role`, `duesStatus`, `avatarUrl`, `occupation`, `phoneNumber`, `createdAt?`, `updatedAt?` (`types/index.ts:12-26`)
- `Club`: `clubId`, `name`, `rotaryId?`, `memberCount?`, `clubType?`, `state`, `region`, `meetingVenue`, `meetingDay`, `meetingTime`, `presidentId`, `coordinates: { lat, lng }`, `createdAt?`, `updatedAt?` (`types/index.ts:32-50`)
- `HistoricalLeader`: `eraId`, `year`, `designation`, `leaderName`, `theme`, `rotaryYear`, `isCurrent?`, `district`, `avatarUrl?`, `notes?` (`types/index.ts:56-67`)
- `DistrictMetrics`: `activeClubs`, `totalRotaractors`, `constituentStates` (`types/index.ts:72-76`)
- `Prospect`: `prospectId`, `fullName`, `email`, `phone`, `assignedClubId`, `status`, `createdAt`, `notes?`, `preferredState?`, `updatedAt?` (`types/index.ts:82-93`)
- `Project`: `projectId`, `title`, `description`, `clubId`, `images: string[]`, `dateCompleted`, `category?`, `beneficiariesCount?`, `createdAt?`, `updatedAt?` (`types/index.ts:99-110`)
- `ActionResult<T>`: `success`, `data?`, `error?` (`types/index.ts:115-119`)
- `ProspectInput`: `fullName`, `email`, `phone`, `assignedClubId`, `preferredState?`, `notes?` (`types/index.ts:124-131`)
- `CloudinarySignaturePayload`: `signature`, `timestamp`, `apiKey`, `cloudName`, `folder` (`types/index.ts:136-142`)
- `MemberQRPayload`: `userId`, `rotaryId`, `clubId`, `duesStatus`, `issuedAt`, `signature?` (`types/index.ts:147-154`)

### 1.2 Missing Interfaces in `types/index.ts`
The following mandatory domain interfaces mandated by `ORIGINAL_REQUEST.md §R1`, `PROJECT.md §Feature 1`, and `SCOPE.md §20` are **completely absent** from `types/index.ts`:
1. `Article` (required for `/blog`, `articles-service.ts`, Firestore `articles` collection)
2. `DistrictEvent` (required for `/portal/dashboard`, `events-service.ts`, Firestore `events` collection)
3. `DuesPayment` (required for `/portal/dashboard`, `dashboard-service.ts`, Firestore `dues_payments` collection)
4. `DuesAuditLog` (required for `actions/dues.ts`, `dashboard-service.ts`, Firestore `dues_audit_log` collection)
5. `Subscriber` (required for `/blog`, `newsletter-service.ts`, Firestore `subscribers` collection)

### 1.3 Field Alignment & Interface Discrepancies Across Codebase

#### A. Article / BlogPost Discrepancies
- In `app/blog/page.tsx:10-24`:
  ```typescript
  interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: 'Impact Reports' | 'Events' | 'Community Stories' | 'District News' | 'Announcements';
    date: string;
    readTime: string;
    author: { name: string; image: string };
    image: string;
    tags: string[];
    featured?: boolean;
  }
  ```
- In `PROJECT.md:54-59` and `SCOPE.md:25`:
  `Article` requires: `id` (or `articleId`), `title`, `excerpt`, `content?: string`, `category: string`, `readTime: string`, `author: { name: string; role?: string; avatar?: string; image?: string }`, `coverImage?: string`, `image?: string`, `publishedAt?: string`, `date?: string`, `featured?: boolean`, `tags: string[]`, `createdAt?: string`, `updatedAt?: string`.

#### B. DistrictEvent Discrepancies
- In `app/portal/dashboard/page.tsx:1184-1335`:
  Events table expects: `id`, `title`, `venue`, `location?`, `date`, `time`, `category`, `tagColor?`, `tagBg?`, `tagBorder?`, `isRegistered?`, `actionType?` (`'registered' | 'register' | 'pay'`).
- In `PROJECT.md:47-52` and `SCOPE.md:26`:
  `DistrictEvent` requires: `id` (or `eventId`), `title`, `description?: string`, `category: string`, `date: string`, `time: string`, `location?: string`, `venue: string`, `state?: DistrictState | string`, `registrationLink?: string`, `isDistrictWide?: boolean`, `rsvpCount?: number`, `coverImage?: string`, `tagColor?: string`, `tagBg?: string`, `tagBorder?: string`, `isRegistered?: boolean`, `actionType?: string`, `createdAt?: string`, `updatedAt?: string`.

#### C. Project vs ProjectItem Discrepancies
- `types/index.ts:99-110` defines `Project` with `projectId`, `images: string[]`, `dateCompleted`.
- `lib/services/projects-service.ts:3-19`, `components/sections/ProjectsSection.tsx:7`, `app/projects/page.tsx:23`, `app/portal/dashboard/page.tsx:46` all import and use `ProjectItem`:
  ```typescript
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
  ```
- In `PROJECT.md:61-68`: `projects-service.ts` uses `ProjectItem`.
- **Resolution Needed**: `Project` and `ProjectItem` must be unified/aliased with bidirectional field support (`id` & `projectId`, `club` & `clubId` & `clubName`, `image` & `images`, `year`, `location`, `status`, `progress`, `budget?`, `beneficiariesCount?`, `statNumber?`, `statLabel?`, `stats?`).

#### D. Club Model Discrepancies
- `types/index.ts:32-50` has `clubId`, `clubType?: ClubType`, `presidentId: string`, but lacks `id`, `city`, `meetingSchedule`, `president`, `presidentPhone`.
- `lib/clubs-data.ts:1-20` has `id: string`, `rotaryId: string`, `memberCount: number`, `type: string`, `state: string`, `city?: string`, `region: string`, `meetingVenue: string`, `meetingSchedule?: string`, `president?: string`, `presidentPhone?: string`.
- `app/clubs/page.tsx` and `app/join/page.tsx` access `club.id`, `club.name`, `club.type`, `club.state`, `club.city`, `club.meetingSchedule`, `club.president`, `club.rotaryId`, `club.coordinates`.
- `scripts/seed-admin-rest.js:114-205` populates `clubId`, `name`, `rotaryId`, `memberCount`, `clubType`, `state`, `region`, `meetingVenue`, `meetingDay`, `meetingTime`, `presidentId`, `coordinates`.
- **Resolution Needed**: `Club` must support both `clubId` and `id`, both `clubType` and `type`, optional `city`, `meetingSchedule`, `president` (name), `presidentId`, `presidentAvatar`, `presidentPhone`, `zone`.

#### E. Prospect / ProspectLead / ProspectInput Discrepancies
- `types/index.ts:82-93` has `prospectId`, `assignedClubId`, `preferredState`.
- `lib/services/intake-service.ts:4-18` defines `ProspectLeadInput` (`name`, `email`, `phone`, `state`, `preferredClub`, `notes`) and writes to `prospect_leads` with `name`, `email`, `phone`, `state`, `assignedClub`, `preferredClub`, `status: 'pending'`, `stage: 'intake'`.
- `actions/prospects.ts:12-43` defines `submitProspectLead(input: ProspectInput)` and writes to `prospects` with `prospectId`, `fullName`, `email`, `phone`, `assignedClubId`, `status: 'new'`, `notes`, `preferredState`.
- `app/portal/president/page.tsx:68-102` uses `Prospect` with `prospectId`, `fullName`, `email`, `phone`, `assignedClubId`, `status` (`'new' | 'contacted' | 'meeting_attended' | 'inducted'`).
- **Resolution Needed**: Support `Prospect` with aliases `id` / `prospectId`, `fullName` / `name`, `assignedClubId` / `assignedClub`, `preferredState` / `state`, `preferredClubId` / `preferredClub`, `stage`. Export `ProspectLead = Prospect` and unify `ProspectInput` and `ProspectLeadInput`.

#### F. DuesPayment and DuesAuditLog Discrepancies
- `lib/services/dashboard-service.ts:125-165` queries `dues_payments` where `memberId == userId` and reads `docSnap.id`, `status` (`Cleared` | `Pending` | `Defaulted`), `period`, `amount`, `avatar`.
- `lib/services/dashboard-service.ts:300-307` writes to `dues_audit_log` with `memberId`, `newStatus`, `clearedBy`, `timestamp`, `updatedAt`.
- `actions/dues.ts:14-72` updates `users/{targetUserId}.duesStatus` and `PROJECT.md:72-76` specifies audit logging.
- **Resolution Needed**: Define `DuesPayment` (`id`, `userId`/`memberId`, `userName?`, `clubId?`, `clubName?`, `amount`, `currency?`, `status`, `paymentDate`, `session?`, `period?`, `reference?`, `paymentMethod?`, `createdAt?`) and `DuesAuditLog` (`id`/`auditLogId`, `targetUserId`/`memberId`, `targetUserName?`, `clubId?`, `previousStatus?`, `newStatus`, `modifiedBy`/`clearedBy`, `modifiedByName?`, `modifiedByRole?`, `timestamp`, `reason?`, `createdAt?`, `updatedAt?`).

#### G. User / Auth Profile Discrepancies
- `types/index.ts:12-26` defines `User`.
- `lib/services/auth-service.ts:12-24` defines `AuthRole` (`'member' | 'club_president' | 'district_admin'`) and `AuthUserData` (`uid`, `email`, `firstName`, `lastName`, `displayName`, `role`, `duesStatus`).
- `lib/services/dashboard-service.ts:17-32` and `56-58` defines `MemberDashboardState` and `ClubMemberRecord extends User` with `memberType?: 'Active' | 'Alumni'`.
- `actions/dues.ts:3` imports `User` and checks `role === 'district_admin'` or `role === 'president'`.
- **Resolution Needed**: Expand `User` with optional fields: `id?: string`, `fullName?: string`, `displayName?: string`, `clubName?: string`, `state?: string`, `region?: string`, `volunteerHours?: number`, `impactPoints?: number`, `memberType?: 'Active' | 'Alumni'`, `joinedDate?: string`.

---

## 2. Logic Chain

1. **Step 1: Ground Truth from Requirements**  
   - Observation §1.2 confirms that Milestone 1 explicitly requires complete TypeScript data models in `types/index.ts` covering all 9 collections (`users`, `clubs`, `projects`, `articles`, `events`, `prospect_leads`, `leadership`, `dues_payments`/`dues_audit_log`, `subscribers`).
   - `types/index.ts` currently lacks definitions for 5 of these 9 collection entities.

2. **Step 2: Dual Layer Consistency (Frontend & Backend)**  
   - Observation §1.3.A–G highlights existing naming divergences (e.g. `ProjectItem.id` vs `Project.projectId`, `Club.id` vs `Club.clubId`, `Article` vs `BlogPost`).
   - If `types/index.ts` defines rigid schemas without optional compatibility aliases, either `npm run build` will fail when services are integrated in Milestone 2/3, or existing working UI pages (`/projects`, `/clubs`, `/blog`, `/portal/dashboard`) will require massive breaking rewrites.

3. **Step 3: Non-Destructive Extension Strategy**  
   - By creating unified interfaces with primary canonical fields matching the Firestore seed and Server Action contracts, while providing optional property aliases matching existing client state (`id`, `club`, `image`, `date`, `name`), both existing components and new live services will compile with 0 TypeScript errors.

4. **Step 4: Type Union & Enums Harmonization**  
   - All string literal unions (`UserRole`, `DuesStatus`, `DistrictState`, `DistrictRegion`, `ProspectStatus`, `ClubType`, `ArticleCategory`, `EventCategory`, `ProjectStatus`, `PaymentMethod`, `PaymentStatus`) are formalized and exported to eliminate magic strings across `lib/services/` and `actions/`.

---

## 3. Caveats

1. **Firestore REST & Admin SDK Date Serialization**:  
   In Firestore document payloads, dates can be stored as ISO strings (`string`) or `FieldValue` / `Timestamp` / `serverTimestamp()`. Types should allow `string | any` for `createdAt`, `updatedAt`, `timestamp`, `publishedAt` to remain robust across both Client SDK (`Timestamp`), Admin SDK, and serialized Server Actions (`string`).
2. **Dynamic UI Metrics**:  
   Components in `/portal/dashboard` calculate `impactPoints` dynamically (`eventsAttended * 80 + volunteerHours * 10 + projectsJoined * 70`). `User` and `DistrictMetrics` include optional fields to allow both stored and calculated properties.
3. **Read-Only Scope Compliance**:  
   No source code files outside of `.agents/teamwork_preview_explorer_m1_1/` were modified during this investigation.

---

## 4. Conclusion & Recommended Schema Definition

The file `types/index.ts` should be expanded to provide a complete, robust, 100% typed foundation for the entire application.

Below is the exact, complete, drop-in replacement recommended for `types/index.ts`:

```typescript
/**
 * Rotaract District 9126 — Complete TypeScript Domain Models & Schemas
 * Covers: Users, Clubs, Projects, Articles, Events, Prospects, Leadership, Dues, Subscribers, Actions
 */

// ==========================================
// 1. DOMAIN ENUMS & UNION TYPES
// ==========================================

export type UserRole = 'member' | 'president' | 'district_admin' | 'club_president';
export type DuesStatus = 'pending' | 'cleared' | 'defaulted';
export type DistrictState = 
  | 'Osun' 
  | 'Oyo' 
  | 'Ondo' 
  | 'Ekiti' 
  | 'Kwara' 
  | 'Niger' 
  | 'Kogi' 
  | 'E-Club / Multi-State' 
  | 'E-Clubs';
export type DistrictRegion = 'South-West' | 'North-Central';
export type ProspectStatus = 'new' | 'contacted' | 'meeting_attended' | 'inducted' | 'pending';
export type ClubType = 'Community' | 'Campus' | 'E-Club' | 'Professional';
export type ProjectStatus = 'In Progress' | 'Completed' | 'Upcoming';
export type ArticleCategory = 
  | 'Impact Reports' 
  | 'Events' 
  | 'Community Stories' 
  | 'District News' 
  | 'Announcements'
  | string;
export type EventCategory = 
  | 'District' 
  | 'Club' 
  | 'Community' 
  | 'Admin' 
  | 'Leadership'
  | string;
export type PaymentStatus = 'Cleared' | 'Pending' | 'Defaulted' | 'cleared' | 'pending' | 'defaulted';
export type PaymentMethod = 'Bank Transfer' | 'Cash' | 'Card' | 'Online' | string;
export type SubscriberStatus = 'active' | 'unsubscribed';

// ==========================================
// 2. USER & AUTHENTICATION SCHEMAS
// ==========================================

/**
 * User schema representing Rotaract members, club presidents, and district executives.
 * Stored in Firestore collection: `users/{userId}` and `auth_users/{uid}`
 */
export interface User {
  userId: string;
  id?: string; // Optional alias for docSnap.id
  firstName: string;
  lastName: string;
  fullName?: string;
  displayName?: string;
  email: string;
  rotaryId: string;
  clubId: string;
  clubName?: string;
  state?: DistrictState | string;
  region?: DistrictRegion | string;
  role: UserRole;
  duesStatus: DuesStatus;
  avatarUrl: string;
  occupation: string;
  phoneNumber: string;
  volunteerHours?: number;
  impactPoints?: number;
  memberType?: 'Active' | 'Alumni';
  joinedDate?: string;
  createdAt?: string | any;
  updatedAt?: string | any;
}

export type AuthRole = 'member' | 'club_president' | 'district_admin';

export interface AuthUserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: AuthRole;
  duesStatus: 'pending' | 'cleared';
  createdAt?: any;
  lastLoginAt?: any;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUserData;
  message?: string;
  error?: string;
}

// ==========================================
// 3. CLUB DIRECTORY SCHEMA
// ==========================================

/**
 * Club schema representing Rotaract clubs across District 9126 (77 clubs across 7 states).
 * Stored in Firestore collection: `clubs/{clubId}`
 */
export interface Club {
  clubId: string;
  id?: string; // Alias for clubId
  name: string;
  rotaryId?: string | number;
  memberCount?: number;
  clubType?: ClubType;
  type?: string; // Alias for clubType
  state: DistrictState | string;
  city?: string;
  region: DistrictRegion | string;
  meetingVenue: string;
  meetingDay?: string;
  meetingTime?: string;
  meetingSchedule?: string;
  presidentId?: string;
  president?: string; // President name
  presidentName?: string;
  presidentAvatar?: string;
  presidentPhone?: string;
  zone?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt?: string | any;
  updatedAt?: string | any;
}

// ==========================================
// 4. PROJECT SCHEMAS
// ==========================================

/**
 * Project schema representing community impact and service initiatives.
 * Stored in Firestore collection: `projects/{projectId}`
 */
export interface Project {
  projectId: string;
  id?: string; // Alias for projectId
  title: string;
  description?: string;
  category: string;
  year?: string;
  clubId?: string;
  club?: string; // Club display name
  clubName?: string;
  location?: string;
  image?: string; // Cover image URL
  images?: string[]; // Image gallery
  height?: string;
  dateCompleted?: string;
  status?: ProjectStatus;
  progress?: number; // 0 to 100
  budget?: number;
  beneficiariesCount?: number;
  statNumber?: string;
  statLabel?: string;
  stats?: Array<{ icon: string; value: string; label: string }>;
  createdAt?: string | any;
  updatedAt?: string | any;
}

/** Compatible alias for UI components and services */
export type ProjectItem = Project & {
  id: string;
  title: string;
  category: string;
  year: string;
  club: string;
  location: string;
  image: string;
  status: 'In Progress' | 'Completed' | 'Upcoming';
  progress: number;
};

// ==========================================
// 5. ARTICLE & BLOG SCHEMAS
// ==========================================

export interface ArticleAuthor {
  name: string;
  role?: string;
  image?: string;
  avatar?: string;
}

/**
 * Article schema for district impact stories, news, and editorial posts.
 * Stored in Firestore collection: `articles/{articleId}`
 */
export interface Article {
  id: string;
  articleId?: string;
  title: string;
  excerpt: string;
  content?: string;
  category: ArticleCategory;
  date?: string;
  publishedAt?: string;
  readTime: string;
  author: ArticleAuthor;
  image: string; // Cover image
  coverImage?: string;
  tags: string[];
  featured?: boolean;
  createdAt?: string | any;
  updatedAt?: string | any;
}

/** Compatible alias for Blog UI */
export type BlogPost = Article;

// ==========================================
// 6. DISTRICT EVENT SCHEMAS
// ==========================================

/**
 * District Event schema for assemblies, conferences (DISCON 2026), and club meetings.
 * Stored in Firestore collection: `events/{eventId}`
 */
export interface DistrictEvent {
  id: string;
  eventId?: string;
  title: string;
  description?: string;
  category: EventCategory;
  date: string;
  time: string;
  location?: string;
  venue: string;
  state?: DistrictState | string;
  registrationLink?: string;
  isDistrictWide?: boolean;
  rsvpCount?: number;
  coverImage?: string;
  tagColor?: string;
  tagBg?: string;
  tagBorder?: string;
  isRegistered?: boolean;
  actionType?: 'registered' | 'register' | 'pay' | string;
  createdAt?: string | any;
  updatedAt?: string | any;
}

// ==========================================
// 7. PROSPECT LEAD SCHEMAS
// ==========================================

/**
 * Prospective member intake lead schema.
 * Stored in Firestore collection: `prospect_leads/{leadId}` or `prospects/{prospectId}`
 */
export interface Prospect {
  prospectId: string;
  id?: string; // Alias for prospectId
  fullName: string;
  name?: string; // Alias for fullName
  email: string;
  phone: string;
  assignedClubId?: string;
  assignedClub?: string; // Club Name or ID
  assignedClubName?: string;
  preferredClubId?: string;
  preferredClub?: string;
  status: ProspectStatus;
  stage?: string;
  notes?: string;
  preferredState?: DistrictState | string;
  state?: DistrictState | string;
  submittedAt?: string;
  createdAt: string | any;
  updatedAt?: string | any;
}

export type ProspectLead = Prospect;

export interface ProspectInput {
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  assignedClubId?: string;
  preferredClub?: string;
  preferredState?: DistrictState | string;
  state?: string;
  notes?: string;
}

export type ProspectLeadInput = ProspectInput;

export interface IntakeResult {
  success: boolean;
  id?: string;
  assignedClub?: string;
  error?: string;
}

// ==========================================
// 8. FINANCIAL DUES & AUDIT LOG SCHEMAS
// ==========================================

/**
 * Member financial dues payment ledger record.
 * Stored in Firestore collection: `dues_payments/{paymentId}`
 */
export interface DuesPayment {
  id: string;
  paymentId?: string;
  userId?: string;
  memberId?: string;
  userName?: string;
  name?: string;
  clubId?: string;
  clubName?: string;
  club?: string;
  amount: number;
  currency?: string;
  status: PaymentStatus;
  paymentDate?: string;
  date?: string;
  session?: string;
  period?: string;
  reference?: string;
  paymentMethod?: PaymentMethod;
  method?: PaymentMethod;
  avatar?: string;
  createdAt?: string | any;
}

/**
 * Immutable administrative dues clearance audit log.
 * Stored in Firestore collection: `dues_audit_log/{logId}`
 */
export interface DuesAuditLog {
  id: string;
  auditLogId?: string;
  targetUserId: string;
  memberId?: string;
  targetUserName?: string;
  clubId?: string;
  previousStatus?: DuesStatus;
  newStatus: DuesStatus;
  modifiedBy: string;
  clearedBy?: string;
  modifiedByName?: string;
  modifiedByRole?: UserRole | string;
  timestamp: string | any;
  reason?: string;
  createdAt?: string | any;
  updatedAt?: string | any;
}

// ==========================================
// 9. NEWSLETTER SUBSCRIBER SCHEMA
// ==========================================

/**
 * Email newsletter subscriber schema with deduplication support.
 * Stored in Firestore collection: `subscribers/{subscriberId}`
 */
export interface Subscriber {
  id?: string;
  subscriberId?: string;
  email: string;
  status: SubscriberStatus | string;
  active?: boolean;
  source?: string;
  subscribedAt: string;
  createdAt?: string | any;
  updatedAt?: string | any;
}

export interface NewsletterResult {
  success: boolean;
  message?: string;
  error?: string;
}

// ==========================================
// 10. HISTORICAL LEADERSHIP & METRICS
// ==========================================

/**
 * Historical DRR leadership archive schema spanning District 9125 anchor & D9126 eras.
 * Stored in Firestore collection: `leadership/{eraId}`
 */
export interface HistoricalLeader {
  eraId: string;
  id?: string;
  year: string;
  tenure?: string;
  designation: string;
  title?: string;
  role?: string;
  leaderName: string;
  name?: string;
  theme: string;
  rotaryYear: string;
  isCurrent?: boolean;
  district: string;
  avatarUrl?: string;
  image?: string;
  fallbackImage?: string;
  credentials?: string;
  notes?: string;
  bio?: string;
  roleNote?: string;
  badge?: string;
  accentColor?: string;
  glowColor?: string;
  highlights?: string[];
  achievements?: string[];
  createdAt?: string | any;
  updatedAt?: string | any;
}

export type LeadershipRecord = HistoricalLeader;

export interface DistrictMetrics {
  metricId?: string;
  activeClubs: number;
  totalRotaractors: number;
  constituentStates: number;
  regions?: DistrictRegion[] | string[];
  states?: DistrictState[] | string[];
  currentDRR?: string;
  rotaryYear?: string;
  updatedAt?: string;
}

// ==========================================
// 11. DASHBOARD & UI AGGREGATE TYPES
// ==========================================

export interface MemberDashboardState {
  member: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    rotaryId: string;
    clubId: string;
    clubName: string;
    state: string;
    region: string;
    role: string;
    duesStatus: DuesStatus;
    avatarUrl: string;
    occupation: string;
    phoneNumber: string;
  };
  metrics: {
    impactPoints: number;
    eventsAttended: number;
    projectsJoined: number;
    volunteerHours: number;
  };
  monthlyActivity: Array<{
    month: string;
    count: number;
    height: string;
    isCurrent?: boolean;
  }>;
  duesRecords: Array<{
    id: string;
    name: string;
    club: string;
    status: 'Cleared' | 'Pending' | 'Defaulted';
    period: string;
    amount?: number;
    avatar: string;
  }>;
}

export interface ClubMemberRecord extends User {
  memberType?: 'Active' | 'Alumni';
}

// ==========================================
// 12. SERVER ACTIONS & MEDIA PAYLOADS
// ==========================================

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CloudinarySignaturePayload {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export interface MemberQRPayload {
  userId: string;
  rotaryId: string;
  clubId: string;
  duesStatus: DuesStatus;
  issuedAt: number;
  signature?: string;
}
```

---

## 5. Verification Method

To independently verify the completeness, correctness, and compatibility of this schema design:

1. **Verify Interface Presence**:
   Inspect `types/index.ts` after worker implementation to ensure all 12 schema groups are exported:
   - `User`, `UserRole`, `AuthRole`, `AuthUserData`, `AuthResult`
   - `Club`, `ClubType`, `DistrictState`, `DistrictRegion`
   - `Project`, `ProjectItem`, `ProjectStatus`
   - `Article`, `BlogPost`, `ArticleAuthor`, `ArticleCategory`
   - `DistrictEvent`, `EventCategory`
   - `Prospect`, `ProspectLead`, `ProspectInput`, `ProspectLeadInput`, `IntakeResult`
   - `DuesPayment`, `DuesAuditLog`, `PaymentStatus`, `PaymentMethod`
   - `Subscriber`, `NewsletterResult`
   - `HistoricalLeader`, `LeadershipRecord`, `DistrictMetrics`
   - `MemberDashboardState`, `ClubMemberRecord`
   - `ActionResult`, `CloudinarySignaturePayload`, `MemberQRPayload`

2. **Verify Type Import & Build Compatibility**:
   Run the project TypeScript check:
   ```bash
   npx tsc --noEmit
   ```
   Or run the full Next.js build:
   ```bash
   npm run build
   ```
   Expected: 0 type errors from `types/index.ts`.

3. **Invalidation Conditions**:
   - Any property required by `app/` routes or `lib/services/` that fails type resolution against `types/index.ts`.
   - Any missing collection entity among the 9 required Firestore collections.
