export type UserRole = 'member' | 'president' | 'district_admin';
export type DuesStatus = 'pending' | 'cleared';
export type DistrictState = 'Oyo' | 'Osun' | 'Ogun' | 'Ondo' | 'Ekiti';
export type ProspectStatus = 'new' | 'contacted' | 'meeting_attended' | 'inducted';

/**
 * User schema representing Rotaract members, club presidents, and district executives.
 * Stored in Firestore collection: `users/{userId}`
 */
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  rotaryId: string;
  clubId: string;
  role: UserRole;
  duesStatus: DuesStatus;
  avatarUrl: string;
  occupation: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Club schema representing Rotaract clubs across District 9126.
 * Stored in Firestore collection: `clubs/{clubId}`
 */
export interface Club {
  clubId: string;
  name: string;
  state: DistrictState;
  meetingVenue: string;
  meetingDay: string;
  meetingTime: string;
  presidentId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Prospect schema representing prospective members entering through the lead pipeline.
 * Stored in Firestore collection: `prospects/{prospectId}`
 */
export interface Prospect {
  prospectId: string;
  fullName: string;
  email: string;
  phone: string;
  assignedClubId: string;
  status: ProspectStatus;
  createdAt: string;
  notes?: string;
  preferredState?: DistrictState;
  updatedAt?: string;
}

/**
 * Project schema representing community impact and service projects.
 * Stored in Firestore collection: `projects/{projectId}`
 */
export interface Project {
  projectId: string;
  title: string;
  description: string;
  clubId: string;
  images: string[];
  dateCompleted: string;
  category?: string;
  beneficiariesCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Standard Server Action Response Interface
 */
export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Input DTO for prospect lead capture
 */
export interface ProspectInput {
  fullName: string;
  email: string;
  phone: string;
  assignedClubId: string;
  preferredState?: DistrictState;
  notes?: string;
}

/**
 * Payload response for Cloudinary direct upload signatures
 */
export interface CloudinarySignaturePayload {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

/**
 * Dynamic QR Code verification payload
 */
export interface MemberQRPayload {
  userId: string;
  rotaryId: string;
  clubId: string;
  duesStatus: DuesStatus;
  issuedAt: number;
  signature?: string;
}
