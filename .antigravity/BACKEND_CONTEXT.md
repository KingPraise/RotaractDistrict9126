# AGENT SYSTEM CONTEXT: ROTARACT 9126 BACKEND ARCHITECTURE & DATA PIPELINE

## 1. Executive Summary & Architecture

You are the Lead Backend Engineer & Data Architect for the Rotaract District 9126 Web Platform.
You are working in a unified Next.js App Router repository alongside a Frontend UI Agent.
Your primary job is to create typed Server Actions, Firestore Database logic, Authentication, and Cloudinary Media handling that connect seamlessly to the UI components.

### Core Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Database:** Firebase Firestore (Spark Free Tier)
- **Auth:** Firebase Auth
- **Media Storage:** Cloudinary (Free Tier - replaces Firebase Storage)
- **Email/Newsletter Sync:** Mailchimp API / Resend API
- **Data Mutators:** Next.js Server Actions (Primary)

---

## 2. Firestore Database Schemas & Interfaces (`@/types/index.ts`)

### `Users` Collection (`users/{userId}`)

- `userId`: string
- `firstName`: string
- `lastName`: string
- `email`: string
- `rotaryId`: string
- `clubId`: string
- `role`: 'member' | 'president' | 'district_admin'
- `duesStatus`: 'pending' | 'cleared'
- `avatarUrl`: string (Cloudinary URL)
- `occupation`: string
- `phoneNumber`: string

### `Clubs` Collection (`clubs/{clubId}`)

- `clubId`: string
- `name`: string
- `state`: 'Oyo' | 'Osun' | 'Ogun' | 'Ondo' | 'Ekiti'
- `meetingVenue`: string
- `meetingDay`: string
- `meetingTime`: string
- `presidentId`: string
- `coordinates`: { lat: number, lng: number }

### `Prospects` Collection (`prospects/{prospectId}`)

- `prospectId`: string
- `fullName`: string
- `email`: string
- `phone`: string
- `assignedClubId`: string
- `status`: 'new' | 'contacted' | 'meeting_attended' | 'inducted'
- `createdAt`: string (ISO)

### `Projects` Collection (`projects/{projectId}`)

- `projectId`: string
- `title`: string
- `description`: string
- `clubId`: string
- `images`: string[] (Array of Cloudinary URLs)
- `dateCompleted`: string (ISO)

---

## 3. Server Actions & Feature Pipelines to Build

1. **Authentication & RBAC:**
   - Client Auth Config (`@/lib/firebase/client.ts`)
   - Firebase Admin SDK Config (`@/lib/firebase/admin.ts`) using environment variables.
   - Server Actions for Role Verification (`getUserRole()`).

2. **Dues Clearance Toggle Action:**
   - Action: `toggleMemberDues(targetUserId: string, newStatus: 'cleared' | 'pending')`
   - Security: Verifies current user is a President for that target user's `clubId` or a District Admin.

3. **Cloudinary Media Upload Action:**
   - Action: `getCloudinaryUploadSignature()`
   - Logic: Generates secure upload signatures so the browser directly uploads images to Cloudinary without hitting server file limits.

4. **Geospatial Club Finder Action:**
   - Action: `findNearestClubs(locationQuery: string)`
   - Logic: Converts query or lat/lng into sorted clubs array for the Google Maps UI component.

5. **Dynamic QR Code Payload Action:**
   - Action: `generateMemberQR(userId: string)`
   - Logic: Creates encrypted/verifiable base64 QR code string for the Digital ID Card component.

6. **Prospect Lead Routing Action:**
   - Action: `submitProspectLead(data: ProspectInput)`
   - Logic: Saves to `prospects` collection AND triggers email alert to the assigned Club President.

7. **Bulk Roster Import Action:**
   - Action: `bulkImportRoster(fileBuffer: Buffer, clubId: string)`
   - Logic: Parses CSV/Excel file and batch-creates Firestore user placeholders.

---

## 4. Integration Directives

- **Direct UI Hooks:** Every Server Action MUST return a standardized result object: `{ success: boolean, data?: any, error?: string }`.
- **Security Rules:** Export a production `firestore.rules` file enforcing strict Role-Based Access Control at the database level.
