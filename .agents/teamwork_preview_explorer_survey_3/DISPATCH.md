## 2026-08-19T15:04:09Z
Survey Server Actions, Cloudinary integration, Resend email workflows, Auth/RBAC, environment variables, and build configuration.
Specifically investigate:
1. Server actions in `actions/` (`actions/upload.ts`, `actions/dues.ts`, `actions/prospects.ts`, etc.).
2. Cloudinary asset upload signing and media handling.
3. Resend email templates, dispatch mechanisms, and automated notifications for prospect leads and leadership.
4. Firebase Auth client wrappers and role-based access control sync (`member`, `president`, `district_admin`).
5. Project build setup: `package.json` dependencies, `next.config.js` / `ts.config.json`, environment variables (`.env.local`, `.env.example`), and build script requirements.
