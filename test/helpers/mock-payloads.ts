/**
 * Mock Payloads and Schema Generators for Rotaract District 9126
 */

import {
  User,
  Club,
  HistoricalLeader,
  DistrictMetrics,
  Prospect,
  Project,
  ActionResult,
  ProspectInput,
  CloudinarySignaturePayload,
  MemberQRPayload,
  UserRole,
  DuesStatus,
  DistrictState,
  DistrictRegion,
  ProspectStatus,
  ClubType,
} from '../../types';

export interface DistrictEvent {
  id: string;
  title: string;
  description: string;
  category: 'assembly' | 'conference' | 'service' | 'meeting' | 'social';
  date: string;
  time: string;
  venue: string;
  state: DistrictState;
  registrationUrl?: string;
  attendeesCount?: number;
  attendeeIds?: string[];
  bannerUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Impact Reports' | 'Events' | 'Community Stories' | 'District News' | 'Announcements';
  date: string;
  readTime: string;
  author: {
    name: string;
    image: string;
    role?: string;
  };
  image: string;
  tags: string[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DuesPayment {
  paymentId: string;
  memberId: string;
  amount: number;
  currency: string;
  period: string;
  status: 'cleared' | 'pending' | 'defaulted';
  reference: string;
  paidAt: string;
  receiptUrl?: string;
}

export interface DuesAuditLog {
  logId: string;
  memberId: string;
  newStatus: DuesStatus;
  clearedBy: string;
  timestamp: string;
  notes?: string;
}

export interface Subscriber {
  subscriberId: string;
  email: string;
  status: 'active' | 'unsubscribed';
  source: string;
  subscribedAt: string;
}

export function generateMockUser(overrides?: Partial<User>): User {
  const id = overrides?.userId || `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  return {
    userId: id,
    firstName: 'Oluwaseun',
    lastName: 'Adeleke',
    email: `oluwaseun.${id}@rotaractdistrict9126.com.ng`,
    rotaryId: `ROT-9126-${Math.floor(1000 + Math.random() * 9000)}`,
    clubId: 'club-ibadan-central',
    role: 'member',
    duesStatus: 'cleared',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    occupation: 'Software Engineer',
    phoneNumber: '+2348012345678',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function generateMockClub(overrides?: Partial<Club>): Club {
  const id = overrides?.clubId || `club-${Date.now()}`;
  return {
    clubId: id,
    name: 'Rotaract Club of Ibadan Central',
    rotaryId: '218112',
    memberCount: 25,
    clubType: 'Community',
    state: 'Oyo',
    region: 'South-West',
    meetingVenue: 'University of Ibadan Guest Houses, Ibadan',
    meetingDay: 'Every 1st & 3rd Sunday',
    meetingTime: '4:00 PM',
    presidentId: 'user-pres-ibadan',
    coordinates: {
      lat: 7.4443,
      lng: 3.8997,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function generateMockHistoricalLeader(overrides?: Partial<HistoricalLeader>): HistoricalLeader {
  return {
    eraId: 'drr-2026-2027',
    year: '2026/2027',
    rotaryYear: '2026-2027',
    designation: '3rd District Rotaract Representative (D9126)',
    leaderName: 'Rtr. PP Adaramoye Iyanuoluwa, PHF',
    theme: 'Creating Lasting Impact',
    district: 'District 9126 (Current Administration)',
    isCurrent: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    notes: 'Pioneering digital platform transformation, verified credentials, and multi-state humanitarian missions.',
    ...overrides,
  };
}

export function generateMockDistrictMetrics(overrides?: Partial<DistrictMetrics>): DistrictMetrics {
  return {
    activeClubs: 77,
    totalRotaractors: 700,
    constituentStates: 7,
    ...overrides,
  };
}

export function generateMockProspect(overrides?: Partial<Prospect>): Prospect {
  const id = overrides?.prospectId || `prospect-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  return {
    prospectId: id,
    fullName: 'Babatunde Fashola',
    email: `prospect.${id}@example.com`,
    phone: '+2348031234567',
    assignedClubId: 'club-osogbo-metro',
    status: 'new',
    createdAt: new Date().toISOString(),
    preferredState: 'Osun',
    notes: 'Interested in community health outreach and literacy programs.',
    ...overrides,
  };
}

export function generateMockProject(overrides?: Partial<Project>): Project {
  const id = overrides?.projectId || `proj-${Date.now()}`;
  return {
    projectId: id,
    title: 'Operation Vaccinate 500',
    description: 'Comprehensive mass immunization campaign targeting pediatric communities across rural clusters.',
    clubId: 'club-lautech-ogbomoso',
    images: [
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=700&fit=crop&auto=format',
    ],
    dateCompleted: '2026-07-15',
    category: 'Healthcare',
    beneficiariesCount: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function generateMockEvent(overrides?: Partial<DistrictEvent>): DistrictEvent {
  const id = overrides?.id || `event-${Date.now()}`;
  return {
    id,
    title: 'District Conference (DISCON 2026)',
    description: 'Annual flagship district assembly, presidential handover, and humanitarian awards banquet.',
    category: 'conference',
    date: '2026-10-24',
    time: '09:00 AM WAT',
    venue: 'International Conference Centre, University of Ibadan, Oyo State',
    state: 'Oyo',
    registrationUrl: 'https://rotaractdistrict9126.org/discon2026',
    attendeesCount: 450,
    attendeeIds: ['user-001', 'user-002'],
    bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&auto=format',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

export function generateMockArticle(overrides?: Partial<Article>): Article {
  const id = overrides?.id || `article-${Date.now()}`;
  return {
    id,
    title: 'Clean Water Initiative Brings Potable Water to Over 1,200 Households',
    excerpt: 'Solar-powered borehole commissioned in Offa, providing sustainable clean water access.',
    content: 'Full story text detailing the community assessment, technical drilling, and water committee training.',
    category: 'Impact Reports',
    date: '2026-08-01',
    readTime: '5 min read',
    author: {
      name: 'Dr. Kehinde Ogundele',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format',
      role: 'District Public Image Chair',
    },
    image: 'https://images.unsplash.com/photo-1621353880071-4752fa42cbc7?w=1200&h=800&fit=crop&auto=format',
    tags: ['#WASH', '#CleanWater', '#District9126'],
    featured: true,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

export function generateMockDuesPayment(overrides?: Partial<DuesPayment>): DuesPayment {
  const id = overrides?.paymentId || `pay-${Date.now()}`;
  return {
    paymentId: id,
    memberId: 'user-mem-01',
    amount: 7500,
    currency: 'NGN',
    period: '2026-H1',
    status: 'cleared',
    reference: `REF-D9126-${Date.now()}`,
    paidAt: new Date().toISOString(),
    receiptUrl: 'https://cdn.district9126.org/receipts/rec-001.pdf',
    ...overrides,
  };
}

export function generateMockDuesAuditLog(overrides?: Partial<DuesAuditLog>): DuesAuditLog {
  const id = overrides?.logId || `audit-${Date.now()}`;
  return {
    logId: id,
    memberId: 'user-mem-01',
    newStatus: 'cleared',
    clearedBy: 'user-pres-ibadan',
    timestamp: new Date().toISOString(),
    notes: 'Verified bank transfer receipt for 2026/2027 district capitation.',
    ...overrides,
  };
}

export function generateMockSubscriber(overrides?: Partial<Subscriber>): Subscriber {
  const id = overrides?.subscriberId || `sub-${Date.now()}`;
  return {
    subscriberId: id,
    email: 'member@rotaractdistrict9126.org',
    status: 'active',
    source: 'blog_footer',
    subscribedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function generateMockCloudinaryPayload(overrides?: Partial<CloudinarySignaturePayload>): CloudinarySignaturePayload {
  return {
    signature: '7a9b8c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
    timestamp: Math.round(Date.now() / 1000),
    apiKey: '912612345678901',
    cloudName: 'rotaract-district-9126',
    folder: 'rotaract_9126/projects',
    ...overrides,
  };
}

export function generateMockMemberQRPayload(overrides?: Partial<MemberQRPayload>): MemberQRPayload {
  return {
    userId: 'usr-9126-001',
    rotaryId: 'ROT-9126-1002',
    clubId: 'club-ibadan-central',
    duesStatus: 'cleared',
    issuedAt: Math.round(Date.now() / 1000),
    signature: 'sig_verified_district_authority_9126',
    ...overrides,
  };
}

// ----------------- SCHEMA VALIDATORS -----------------

export function validateUserSchema(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['User must be an object'] };

  const validRoles: UserRole[] = ['member', 'president', 'district_admin'];
  const validDues: DuesStatus[] = ['pending', 'cleared'];

  if (typeof data.userId !== 'string' || !data.userId) errors.push('userId must be a non-empty string');
  if (typeof data.firstName !== 'string' || !data.firstName) errors.push('firstName must be a non-empty string');
  if (typeof data.lastName !== 'string' || !data.lastName) errors.push('lastName must be a non-empty string');
  if (typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('email must be valid');
  if (typeof data.rotaryId !== 'string' || !data.rotaryId) errors.push('rotaryId must be a non-empty string');
  if (typeof data.clubId !== 'string' || !data.clubId) errors.push('clubId must be a non-empty string');
  if (!validRoles.includes(data.role)) errors.push(`role must be one of: ${validRoles.join(', ')}`);
  if (!validDues.includes(data.duesStatus)) errors.push(`duesStatus must be one of: ${validDues.join(', ')}`);
  if (typeof data.avatarUrl !== 'string') errors.push('avatarUrl must be a string');
  if (typeof data.occupation !== 'string') errors.push('occupation must be a string');
  if (typeof data.phoneNumber !== 'string') errors.push('phoneNumber must be a string');

  return { valid: errors.length === 0, errors };
}

export function validateClubSchema(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['Club must be an object'] };

  const validStates: DistrictState[] = ['Osun', 'Oyo', 'Ondo', 'Ekiti', 'Kwara', 'Niger', 'Kogi', 'E-Club / Multi-State'];
  const validRegions: DistrictRegion[] = ['South-West', 'North-Central'];

  if (typeof data.clubId !== 'string' || !data.clubId) errors.push('clubId must be a non-empty string');
  if (typeof data.name !== 'string' || !data.name) errors.push('name must be a non-empty string');
  if (!validStates.includes(data.state)) errors.push(`state must be one of: ${validStates.join(', ')}`);
  if (!validRegions.includes(data.region)) errors.push(`region must be one of: ${validRegions.join(', ')}`);
  if (typeof data.meetingVenue !== 'string' || !data.meetingVenue) errors.push('meetingVenue must be a non-empty string');
  if (typeof data.meetingDay !== 'string') errors.push('meetingDay must be a string');
  if (typeof data.meetingTime !== 'string') errors.push('meetingTime must be a string');
  if (typeof data.presidentId !== 'string') errors.push('presidentId must be a string');
  if (!data.coordinates || typeof data.coordinates.lat !== 'number' || typeof data.coordinates.lng !== 'number') {
    errors.push('coordinates must contain numeric lat and lng');
  }

  return { valid: errors.length === 0, errors };
}

export function validateHistoricalLeaderSchema(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['HistoricalLeader must be an object'] };

  if (typeof data.eraId !== 'string' || !data.eraId) errors.push('eraId must be a non-empty string');
  if (typeof data.year !== 'string' || !data.year) errors.push('year must be a non-empty string');
  if (typeof data.designation !== 'string' || !data.designation) errors.push('designation must be a non-empty string');
  if (typeof data.leaderName !== 'string' || !data.leaderName) errors.push('leaderName must be a non-empty string');
  if (typeof data.theme !== 'string' || !data.theme) errors.push('theme must be a non-empty string');
  if (typeof data.rotaryYear !== 'string' || !data.rotaryYear) errors.push('rotaryYear must be a non-empty string');
  if (typeof data.district !== 'string' || !data.district) errors.push('district must be a non-empty string');

  return { valid: errors.length === 0, errors };
}

export function validateDistrictMetricsSchema(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['DistrictMetrics must be an object'] };

  if (typeof data.activeClubs !== 'number' || data.activeClubs < 0) errors.push('activeClubs must be non-negative number');
  if (typeof data.totalRotaractors !== 'number' || data.totalRotaractors < 0) errors.push('totalRotaractors must be non-negative number');
  if (typeof data.constituentStates !== 'number' || data.constituentStates < 1) errors.push('constituentStates must be >= 1');

  return { valid: errors.length === 0, errors };
}

export function validateProspectSchema(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['Prospect must be an object'] };

  const validStatuses: ProspectStatus[] = ['new', 'contacted', 'meeting_attended', 'inducted'];

  if (typeof data.prospectId !== 'string' || !data.prospectId) errors.push('prospectId must be a non-empty string');
  if (typeof data.fullName !== 'string' || !data.fullName) errors.push('fullName must be a non-empty string');
  if (typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('email must be valid');
  if (typeof data.phone !== 'string' || !data.phone) errors.push('phone must be a non-empty string');
  if (typeof data.assignedClubId !== 'string' || !data.assignedClubId) errors.push('assignedClubId must be a non-empty string');
  if (!validStatuses.includes(data.status)) errors.push(`status must be one of: ${validStatuses.join(', ')}`);
  if (typeof data.createdAt !== 'string') errors.push('createdAt must be a string');

  return { valid: errors.length === 0, errors };
}

export function validateProjectSchema(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['Project must be an object'] };

  if (typeof data.projectId !== 'string' || !data.projectId) errors.push('projectId must be a non-empty string');
  if (typeof data.title !== 'string' || !data.title) errors.push('title must be a non-empty string');
  if (typeof data.description !== 'string' || !data.description) errors.push('description must be a non-empty string');
  if (typeof data.clubId !== 'string' || !data.clubId) errors.push('clubId must be a non-empty string');
  if (!Array.isArray(data.images)) errors.push('images must be an array');
  if (typeof data.dateCompleted !== 'string') errors.push('dateCompleted must be a string');

  return { valid: errors.length === 0, errors };
}

export function validateCloudinarySignatureSchema(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['Payload must be an object'] };

  if (typeof data.signature !== 'string' || data.signature.length !== 40) errors.push('signature must be a 40-char SHA-1 hex string');
  if (typeof data.timestamp !== 'number' || data.timestamp <= 0) errors.push('timestamp must be a valid epoch number');
  if (typeof data.apiKey !== 'string' || !data.apiKey) errors.push('apiKey must be a non-empty string');
  if (typeof data.cloudName !== 'string' || !data.cloudName) errors.push('cloudName must be a non-empty string');
  if (typeof data.folder !== 'string' || !data.folder) errors.push('folder must be a non-empty string');

  return { valid: errors.length === 0, errors };
}

export function validateMemberQRPayloadSchema(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['MemberQRPayload must be an object'] };

  if (typeof data.userId !== 'string' || !data.userId) errors.push('userId must be a non-empty string');
  if (typeof data.rotaryId !== 'string' || !data.rotaryId) errors.push('rotaryId must be a non-empty string');
  if (typeof data.clubId !== 'string' || !data.clubId) errors.push('clubId must be a non-empty string');
  if (data.duesStatus !== 'cleared' && data.duesStatus !== 'pending') errors.push('duesStatus must be "cleared" or "pending"');
  if (typeof data.issuedAt !== 'number' || data.issuedAt <= 0) errors.push('issuedAt must be positive epoch timestamp');

  return { valid: errors.length === 0, errors };
}
