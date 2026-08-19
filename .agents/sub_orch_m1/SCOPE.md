# Scope: Milestone 1 - Schemas, Types, Rules & Seeding

## Architecture
- Module/Package Boundaries:
  - `types/index.ts`: TypeScript data models and domain entities for the entire application.
  - `firestore.rules`: Security rules protecting all 9 Firestore collections with Role-Based Access Control (RBAC).
  - `scripts/seed.ts` & `scripts/seed-admin-rest.js`: Seeding tools to populate live Firestore collections with complete, authentic datasets.
- Data Flow:
  - TypeScript types define the schema contract for client services (`lib/services/`), server actions (`actions/`), and frontend components (`app/`, `components/`).
  - Security rules enforce access control at the Firestore level for all direct client reads/writes.
  - Seeding populates initial data for clubs (77 clubs across 7 states: Osun, Oyo, Ondo, Ekiti, Kwara, Niger, Kogi), leadership (4 DRR eras 2023–2027), projects, articles, events, sample users, and metrics.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | TypeScript Types & Interfaces | Complete definitions for `Article`, `DistrictEvent`, `DuesPayment`, `DuesAuditLog`, `Subscriber`, `User`, `Club`, `Project`, `Prospect` in `types/index.ts` | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Firestore Security Rules | Comprehensive RBAC rules for all 9 collections (`users`, `clubs`, `projects`, `articles`, `events`, `prospect_leads`, `leadership`, `dues_payments`/`dues_audit_log`, `subscribers`) in `firestore.rules` | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Firestore Database Seeding | Seed scripts and live data population for 77 clubs across 7 states, 4 DRR leadership records, projects, articles, events, and metrics | M1 | ORIGINAL_REQUEST §R1 |

## Interface Contracts & Schemas
- `types/index.ts`:
  - `User`: id, fullName, email, role (`member` | `president` | `district_admin`), clubId, clubName, rotaryId, duesStatus (`cleared` | `pending`), volunteerHours, avatarUrl, createdAt, etc.
  - `Club`: id, name, state (Osun, Oyo, Ondo, Ekiti, Kwara, Niger, Kogi), zone, meetingDay, meetingTime, meetingVenue, presidentName, presidentPhone, coordinates: { lat, lng }, createdAt, etc.
  - `ProjectItem` / `Project`: id, title, description, category, clubId, clubName, location, progress, budget, beneficiariesCount, images: string[], status, createdAt, updatedAt, etc.
  - `Article`: id, title, excerpt, content, category, readTime, author: { name, role, avatar }, coverImage, publishedAt, featured, tags, etc.
  - `DistrictEvent`: id, title, description, category, date, time, location, venue, state, registrationLink, isDistrictWide, rsvpCount, coverImage, etc.
  - `Prospect` / `ProspectLead`: id, fullName, email, phone, state, preferredClubId, preferredClubName, status (`new` | `contacted` | `meeting_attended` | `inducted`), notes, createdAt, updatedAt, etc.
  - `LeadershipRecord` / `Leader`: id, name, role, term, theme, bio, image, achievements: string[], etc.
  - `DuesPayment`: id, userId, userName, clubId, amount, currency, status, paymentDate, session, reference, etc.
  - `DuesAuditLog`: id, targetUserId, targetUserName, clubId, previousStatus, newStatus, modifiedBy, modifiedByName, modifiedByRole, timestamp, reason, etc.
  - `Subscriber`: id, email, subscribedAt, active, source, etc.

- `firestore.rules`:
  - Helper functions for auth check, admin check, president check, self check.
  - Public read for `clubs`, `projects`, `articles`, `events`, `leadership`.
  - Public create for `prospect_leads` and `subscribers`.
  - Auth read/write rules for `users`, `dues_payments`, `dues_audit_log`, `projects`.

- Seeding:
  - 77 Clubs across 7 states.
  - 4 DRR Leadership records (2023–2027).
  - Projects, Articles, Events, Sample Users with roles, Metrics.
  - Execute seeding against live Firestore.
