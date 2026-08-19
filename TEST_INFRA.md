# E2E Test Infra: Rotaract District 9126

## Test Philosophy
- Opaque-box, requirement-driven testing derived strictly from `ORIGINAL_REQUEST.md` and user specifications.
- Dual-layer validation: Validates typed data contracts, Firestore database pipelines, Server Actions, REST/Admin boundaries, and Next.js frontend route integration.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Scenarios.
- Zero mock reliance: Validates against actual schemas, logic, validation rules, and error handling contracts.

## Feature Inventory & Test Coverage Map
| # | Feature | Source (requirement) | Tier 1 (Min 5) | Tier 2 (Min 5) | Tier 3 (Pairwise) | Tier 4 (Scenario) |
|---|---------|---------------------|:--------------:|:--------------:|:-----------------:|:-----------------:|
| 1 | TypeScript Types & Data Interfaces | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | Firestore Security Rules & Access Control | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 3 | Firestore Database Seeding & Geographic Directory | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 4 | Events Service (`events-service.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 5 | Articles Service (`articles-service.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 6 | Projects Service Real-Time Sync (`projects-service.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 7 | Dashboard & Member Service (`dashboard-service.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 8 | Newsletter Service (`newsletter-service.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 9 | Lead Intake Service (`intake-service.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 10 | Auth & Client RBAC Service (`auth-service.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 11 | Cloudinary Signed Upload Action (`actions/upload.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 12 | Dues Clearance Action (`actions/dues.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 13 | Prospect Pipeline Action (`actions/prospects.ts`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 14 | Blog & Newsletter UI Integration (`/blog`) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 15 | Member Portal Dashboard UI Integration (`/portal/dashboard`) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 16 | President Console UI Integration (`/portal/president`) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 17 | Public Directory & Map UI Integration (`/clubs`, `/join`) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 18 | Projects Showcase & Homepage UI Integration (`/projects`, `/`) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 19 | Historical Leadership Heritage & Metrics (`/heritage`) | ORIGINAL_REQUEST §R1, §R3 | 5 | 5 | ✓ | ✓ |
| 20 | Build Compilation & Type Safety (`npm run build`) | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |

## Test Architecture & Layout
- **Runner**: Node/TSX test runner with structured assertion library and report generation (`test/runner.ts` / `npm run test:e2e`).
- **Test Directory Structure**:
  ```
  test/
  ├── runner.ts                      # Central runner harness with tier selection, timing & report output
  ├── helpers/
  │   ├── assertions.ts              # Strict typed assertions & custom validators
  │   ├── test-context.ts            # Test environment fixtures & setup
  │   └── mock-payloads.ts           # Schema-valid and edge-case generators
  ├── tier1-features/                # Tier 1: Feature Coverage (≥5 per feature)
  │   ├── 01-types-schemas.test.ts
  │   ├── 02-security-rules.test.ts
  │   ├── 03-seeding-geo.test.ts
  │   ├── 04-events-service.test.ts
  │   ├── 05-articles-service.test.ts
  │   ├── 06-projects-service.test.ts
  │   ├── 07-dashboard-service.test.ts
  │   ├── 08-newsletter-service.test.ts
  │   ├── 09-intake-service.test.ts
  │   ├── 10-auth-service.test.ts
  │   ├── 11-upload-action.test.ts
  │   ├── 12-dues-action.test.ts
  │   ├── 13-prospects-action.test.ts
  │   └── 14-routes-integration.test.ts
  ├── tier2-boundaries/              # Tier 2: Boundary & Corner Cases (≥5 per feature)
  │   ├── 01-null-empty-inputs.test.ts
  │   ├── 02-geo-coordinates-limits.test.ts
  │   ├── 03-email-regex-fuzzing.test.ts
  │   ├── 04-large-payloads-overflow.test.ts
  │   └── 05-rbac-unauthorized-access.test.ts
  ├── tier3-combinations/            # Tier 3: Pairwise Cross-Feature Interactions
  │   ├── 01-dues-toggle-audit-ledger.test.ts
  │   ├── 02-prospect-intake-resend-kanban.test.ts
  │   ├── 03-project-crud-showcase-sync.test.ts
  │   ├── 04-auth-role-roster-visibility.test.ts
  │   └── 05-newsletter-duplication-safeguard.test.ts
  └── tier4-scenarios/               # Tier 4: Real-World District Workflows
      ├── 01-new-member-onboarding-lifecycle.test.ts
      ├── 02-club-president-annual-audit-cycle.test.ts
      ├── 03-discon-2026-campaign-workflow.test.ts
      ├── 04-multi-state-club-finder-intake.test.ts
      └── 05-district-drr-transition-heritage.test.ts
  ```

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | New Member Onboarding & Induction Flow | F1, F9, F10, F13, F15, F16 | High |
| 2 | Club President Annual Audit & Dues Ledger Reconciliation | F2, F7, F12, F15, F16 | High |
| 3 | DISCON 2026 District Assembly Campaign & Media Upload | F4, F5, F6, F11, F14, F18 | High |
| 4 | 7-State Club Finder & Automated Proximity Intake | F3, F9, F13, F17 | High |
| 5 | DRR Historical Transition & District Impact Metrics Sync | F1, F3, F7, F18, F19 | Medium |

## Coverage Thresholds & Target Counts
- **Tier 1**: ≥5 test cases × 20 features = ≥100 test cases
- **Tier 2**: ≥5 test cases × 20 features = ≥100 boundary/corner test cases
- **Tier 3**: ≥20 pairwise cross-feature interaction test cases
- **Tier 4**: ≥5 comprehensive real-world district workflow scenarios
- **Total Minimum Target**: ≥225 test cases passing with exit code 0
