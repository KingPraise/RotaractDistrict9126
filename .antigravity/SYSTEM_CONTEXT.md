# AGENT SYSTEM CONTEXT & INSTRUCTIONS: ROTARACT DISTRICT 9126 FRONTEND

## 1. Executive Summary & Tech Stack

You are the Lead Full-Stack Software Engineer building the official digital platform for Rotaract District 9126.
You are executing a Desktop-First, Mobile-Responsive Web Application built for high visual impact (Crypto/Web3 aesthetic) and high performance, deeply anchored by photography.

### Core Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS, Framer Motion (for animations), clsx, tailwind-merge
- **UI Architecture:** Glassmorphism, Neon/Cranberry glow highlights, heavy photography integration.
- **Icons:** Lucide React / Phosphor Icons
- **Backend / DB:** Firebase (Auth, Firestore) & Cloudinary (for media)
- **Deployment:** Netlify (linked to custom domain: www.rotaractdistrict9126.com.ng)
- **Design Source:** Figma Screens via Figma MCP

---

## 2. Design System & Style Tokens

### Brand Palette (Subject to change, refer to the UI UX design)

- **Rotaract Cranberry Primary:** `#D91B5C` (Primary CTAs, active glow, focus rings)
- **Rotaract Cranberry Deep:** `#A70C43` (Hover states, gradient stops)
- **Rotary Royal Blue Dark:** `#00246C` (Structural dark surfaces, hero gradients)
- **Deep Space Surface:** `#080C14` (Primary background canvas)
- **Excellence Gold Accent:** `#F7A81B` (Badges, spotlight highlights, VIP status)
- **Semantic Green:** `#16A34A` (Dues cleared, positive metrics)
- **Semantic Red:** `#DC2626` (Dues overdue, error states)
- **Glassmorphic Card Background:** `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(16px)`
- **Border Slate:** `rgba(255, 255, 255, 0.12)`

### Responsive Breakpoints

- **Desktop Primary Canvas:** `1440px` (Max content container: `1280px`)
- **Mobile Responsive Canvas:** `375px` (Minimum horizontal padding: `16px`)

---

## 3. Engineering Guidelines for Component Generation

1. **Figma MCP Inspection:** Always query the Figma node hierarchy first using MCP tools. Extract exact padding, gap, auto-layout directions, font sizes, and border-radii.
2. **Photography Mandate:** "Pictures everywhere." Integrate high-quality photography of people, community projects, and district teams into every section. Use dynamic masking, image bleed, and full-screen background photos with dark overlays.
3. **Next.js Image Optimization:** Every photo asset must use `next/image` with explicit `width`, `height`, or `fill` props alongside responsive `sizes` to handle high-resolution photography efficiently. Remote patterns for Cloudinary must be configured in `next.config.js`.
4. **Modular Component Structure:** Store atomic UI components in `@/components/ui/` and page-specific sections in `@/components/sections/`.
5. **Framer Motion Animations:** Wrap major landing page cards and section entries in lightweight Framer Motion fade/slide animations (`framer-motion`).
6. **No Visual Compromises:** Maintain the high-density visual depth, glassmorphic blurs, and neon border accents specified in the design. Do not simplify the visual aesthetic.

---

## 4. User Roles & Key Frontend Features

- **General Public / Prospect:** Public Hub, Club Finder (Google Maps API integration), Heritage Archive (transition from District 9125 to 9126), Impact Blog.
- **Registered Member:** Member Portal Dashboard, Digital Identity Card (with dynamic QR Code), Directory.
- **Club President:** Roster Management Console, One-Click Dues Clearance Toggles, Lead Pipeline (Kanban).
- **District Admin / DRR:** Executive Analytics Dashboard, Newsletter Builder interface, User Moderation.
