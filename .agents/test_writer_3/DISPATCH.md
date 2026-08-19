## 2026-08-19T19:36:02Z

You are test_writer_3 for Rotaract District 9126 E2E Testing Track.
Your working directory is: c:\Users\DELL\antigravity\Rotaract9126\.agents\test_writer_3\
The project workspace root is: c:\Users\DELL\antigravity\Rotaract9126

MANDATORY FIRST STEPS:
1. Read c:\Users\DELL\antigravity\Rotaract9126\.agents\ORIGINAL_REQUEST.md
2. Read c:\Users\DELL\antigravity\Rotaract9126\PROJECT.md
3. Read c:\Users\DELL\antigravity\Rotaract9126\TEST_INFRA.md
4. Read c:\Users\DELL\antigravity\Rotaract9126\.agents\sub_orch_e2e\SCOPE.md
5. Check existing test runner and helpers at `test/runner.ts`, `test/helpers/assertions.ts`, `test/helpers/test-context.ts`, `test/helpers/mock-payloads.ts`, and `test/tier1-features/*.test.ts`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Assigned Scope & Exclusive File Ownership:
Write all test suites for Tier 2, Tier 3, and Tier 4 adhering to the structure in `TEST_INFRA.md`:

1. `test/tier2-boundaries/` (Boundary & Corner Cases, >=5 tests per file):
   - `01-null-empty-inputs.test.ts` (empty names, null clubIds, missing emails, undefined filters, empty arrays)
   - `02-geo-coordinates-limits.test.ts` (latitude/longitude boundaries for 7 states, extreme coords, invalid states, multi-state fallback)
   - `03-email-regex-fuzzing.test.ts` (invalid email patterns, unicode, sql/xss injection vectors, leading/trailing spaces, case sensitivity)
   - `04-large-payloads-overflow.test.ts` (oversized descriptions, max beneficiaries, 100+ images array, execution progress <0 or >100, long strings)
   - `05-rbac-unauthorized-access.test.ts` (members attempting president actions, invalid tokens, dues clearance tampering, role escalation)

2. `test/tier3-combinations/` (Pairwise Cross-Feature Interactions, >=4 tests per file):
   - `01-dues-toggle-audit-ledger.test.ts` (dues toggle -> user status update -> immutable audit log creation -> dashboard ledger reflection)
   - `02-prospect-intake-resend-kanban.test.ts` (intake submission -> proximity club routing -> Resend email trigger -> Kanban state transitions: new -> contacted -> meeting_attended -> inducted)
   - `03-project-crud-showcase-sync.test.ts` (create/update project in dashboard -> real-time Firestore sync -> public projects showcase & carousel update)
   - `04-auth-role-roster-visibility.test.ts` (role assignment -> president console access -> club roster filtering and member privacy)
   - `05-newsletter-duplication-safeguard.test.ts` (repeated subscription attempts -> deduplication check -> idempotent response and timestamp refresh)

3. `test/tier4-scenarios/` (Real-World District Workflows, full scenario per file):
   - `01-new-member-onboarding-lifecycle.test.ts` (full workflow: prospective lead -> email alert -> president interview -> meeting attendance -> induction -> user creation -> digital ID card)
   - `02-club-president-annual-audit-cycle.test.ts` (full workflow: president login -> member roster review -> dues clearance toggle -> audit log verification -> financial summary)
   - `03-discon-2026-campaign-workflow.test.ts` (full workflow: DISCON event creation -> member RSVP -> article publication -> project showcase integration -> Cloudinary media upload)
   - `04-multi-state-club-finder-intake.test.ts` (full workflow: prospective user searches 7-state directory -> filters by Osun/Oyo/etc. -> locates nearest club on map -> submits intake form)
   - `05-district-drr-transition-heritage.test.ts` (full workflow: DRR theme archive query -> 2023-2027 history -> impact metrics calculation -> public heritage page display)

Execution and Verification:
- Import assertion utilities from `test/helpers/assertions.ts` and test context from `test/helpers/test-context.ts`.
- Ensure each test file exports `run(): Promise<{ name: string; passed: number; failed: number; tests: { name: string; status: 'pass' | 'fail'; error?: string }[] }>`.
- Run the full test suite using `npx tsx test/runner.ts` (or `node` with tsx) and verify that all Tier 1, Tier 2, Tier 3, and Tier 4 tests pass completely (100% pass rate).
- Write `handoff.md` in your working directory with detailed breakdown of tests, counts, and execution output.
