---
name: Reproduce Before Fixing, Verify After
description: When the user reports a bug or error, reproduce it first, fix it, then prove the fix with the same reproduction before pushing.
trigger: always_on
---
# Reproduce Before Fixing, Verify After

**CRITICAL INSTRUCTION:**
Whenever the user reports an error, crash, broken UI, or asks you to "fix" something they noticed, you MUST follow this loop. A passing `npm run build` is NOT proof that a bug is fixed.

1. **Reproduce first.** Recreate the user's exact steps and environment (device/viewport, page, clicks, navigation) against the CURRENT/pre-fix code, and capture the actual error (console/pageerror message, stack, screenshot). Use the `reproduce-and-verify-bug` skill.
2. **Confirm the root cause** from the captured error. Do not patch based on a guess alone.
3. **Fix** the underlying cause (and add defensive handling where it makes sense).
4. **Verify with the same reproduction** against the fixed build. The original error must be gone AND the intended behaviour must visibly work (check the screenshot, not just "no crash").
5. **Build** (`npm run build`) per `always-build-before-push.md`, then commit and push.
6. **Report** a before/after table (steps × old result × new result), the root-cause error message, and any unrelated pre-existing errors you noticed.
7. **Clean up** temporary servers, worktrees, and junctions. Never leave stray files in the project.

If reproduction is genuinely impossible (e.g. needs production-only credentials or a real device), say so explicitly to the user BEFORE pushing, explain what you verified instead, and ask them to confirm on their device.
