---
name: reproduce-and-verify-bug
description: Reproduce a user-reported bug in this Next.js site (including mobile-only bugs) against the pre-fix code, then verify the fix with the same script. Use whenever the user reports an error, crash, or broken behaviour.
---
# Reproduce & Verify a Bug

## 1. Tooling (one-time, outside the project)
Playwright is NOT a project dependency. Install it in the conversation scratch dir and use the installed Edge/Chrome; no browser download is needed.
```powershell
$t="<artifactDir>\scratch\mobiletest"; New-Item -ItemType Directory -Force $t | Out-Null
cd $t; npm init -y | Out-Null; npm i playwright-core@1.48.2 --no-audit --no-fund
Copy-Item "<repo>\.agents\skills\reproduce-and-verify-bug\scripts\repro-template.js" "$t\repro.js"
```

## 2. Run the PRE-FIX code (before editing anything, or from the last good commit)
```powershell
$old="<artifactDir>\scratch\rd-old"
git worktree add $old <pre-fix-commit>
New-Item -ItemType Junction -Path "$old\node_modules" -Target "$PWD\node_modules" | Out-Null
Copy-Item .env.local "$old\.env.local"
cd $old; npm run build; npx next start -p 3101     # run as daemon
```
For a quick check before any edits, just `npm run build; npx next start -p 3100` in the repo.

## 3. Script the user's exact steps
Edit the `STEPS` array in `repro.js` (goto/tap/click/fill/back), choose the device (`iPhone 13` for mobile reports, `Desktop Chrome` otherwise), then:
```powershell
node repro.js http://localhost:3101 OLD
```
Expect `crashed=true` and/or the real error in the log. **If it doesn't reproduce, keep adjusting the steps/device until it does, before writing a fix.**

## 4. Fix, build, verify
```powershell
npm run build; npx next start -p 3100              # fixed code, daemon
node repro.js http://localhost:3100 NEW
```
Every step must report `crashed=false`, the original error must be gone, and you must **open the NEW screenshots** to confirm the intended behaviour actually works.

## 5. Clean up (always)
```powershell
# kill both `next start` daemons via manage_task, then:
cmd /c rmdir "$old\node_modules"     # remove junction FIRST so real node_modules is untouched
git worktree remove --force $old; git worktree prune
git status --short                   # must show only intended changes
```

## Known pitfalls in this repo
- Mobile views hide panels with `hidden lg:flex`; libraries like Leaflet initialise at 0×0 there. Always test mobile flows on an emulated phone.
- Errors thrown inside React effects show the generic Next "Application error" screen. `app/error.tsx` / `app/global-error.tsx` now catch these, so look for "We hit a snag" too.
- Pre-existing, unrelated noise: a 404 asset and a Google "API key not valid" 400. Note it, but don't confuse it with the bug.
