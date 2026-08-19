## 2026-08-19T15:11:12Z

You are test_writer_1 for Rotaract District 9126 E2E Testing Track.
Your working directory is: c:\Users\DELL\antigravity\Rotaract9126\.agents\test_writer_1\
The project workspace root is: c:\Users\DELL\antigravity\Rotaract9126

MANDATORY FIRST STEPS:
1. Read c:\Users\DELL\antigravity\Rotaract9126\.agents\ORIGINAL_REQUEST.md
2. Read c:\Users\DELL\antigravity\Rotaract9126\PROJECT.md
3. Read c:\Users\DELL\antigravity\Rotaract9126\TEST_INFRA.md
4. Read c:\Users\DELL\antigravity\Rotaract9126\.agents\sub_orch_e2e\SCOPE.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Exclusive File Ownership:
- `test/runner.ts` (The central test runner harness that discovers all test files in `test/tier*`, executes them, counts passed/failed assertions, formats nice terminal reports, and exits with code 0 on success)
- `test/helpers/assertions.ts` (Custom typed assertion functions: `expectEqual`, `expectDeepEqual`, `expectThrowsAsync`, `expectMatch`, `expectTruthy`, `expectFalsy`, `expectArrayContains`, `expectSchemaValid`, etc.)
- `test/helpers/test-context.ts` (Environment setup, test context fixtures, mock Firestore state helpers)
- `test/helpers/mock-payloads.ts` (Schema-valid test fixtures and generators for all 9 collections / schemas)
- `test/tier1-features/` test suites:
  - `01-types-schemas.test.ts` (>=5 tests for User, Club, HistoricalLeader, DistrictMetrics, Prospect, Project, ActionResult, ProspectInput, CloudinarySignaturePayload, MemberQRPayload)
  - `02-security-rules.test.ts` (>=5 tests for Firestore security rules logic & RBAC permissions)
  - `03-seeding-geo.test.ts` (>=5 tests for 77 clubs across Osun, Oyo, Ondo, Ekiti, Kwara, Niger, Kogi with coordinates and venues)
  - `04-events-service.test.ts` (>=5 tests for getEvents, getEventById, registerForEvent, category/state filtering)
  - `05-articles-service.test.ts` (>=5 tests for getArticles, getFeaturedArticle, getArticleById, category & search)
  - `06-projects-service.test.ts` (>=5 tests for subscribeToLiveProjects, getProjects, createProjectDoc, updateProjectDoc, deleteProjectDoc)
  - `07-dashboard-service.test.ts` (>=5 tests for member dashboard resolver, roster, ledger, volunteer hours)
  - `08-newsletter-service.test.ts` (>=5 tests for email regex validation, deduplication, subscription write)
  - `09-intake-service.test.ts` (>=5 tests for 7-state proximity club routing, lead intake validation)
  - `10-auth-service.test.ts` (>=5 tests for signIn, signUp, signOut, role sync)
  - `11-upload-action.test.ts` (>=5 tests for Cloudinary SHA-1 signature generation, timestamp, folder)
  - `12-dues-action.test.ts` (>=5 tests for toggleMemberDues, getClubDuesRoster, audit log entry creation)
  - `13-prospects-action.test.ts` (>=5 tests for submitProspectLead, updateProspectStatus, 4-stage Kanban, Resend alert)
  - `14-routes-integration.test.ts` (>=5 tests for route integration contracts across 10 application routes)
