---
name: Require Local Build Before Push
description: Enforces a local build check (e.g., npm run build) before any git push operation.
trigger: always_on
---
# Always Build Before Push

**CRITICAL INSTRUCTION:**
Before you run git push or deploy any changes, you MUST verify that the project builds locally without errors. 

1. Run the local build command (e.g., 
pm run build or 
px next build).
2. Wait for the build to complete successfully.
3. If the build fails, you MUST fix the errors and re-run the build until it passes.
4. Only after a completely successful local build are you permitted to run git push.