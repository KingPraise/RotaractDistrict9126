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
