# Rotaract District 9126 — Official Digital Platform

<div align="center">

![Rotaract District 9126](public/images/rotaract-logo.png)

### **Fellowship. Leadership. Service.**
*Uniting 77 Chartered Clubs & 700+ Young Changemakers across 7 Nigerian States.*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://www.netlify.com/)

[Explore Live Demo](https://rotaractdistrict9126.com.ng) · [Find a Club Near You](https://rotaractdistrict9126.com.ng/clubs) · [Project Showcase](https://rotaractdistrict9126.com.ng/projects) · [Join District 9126](https://rotaractdistrict9126.com.ng/join)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [District 9126 Impact Metrics](#-district-9126-impact-metrics)
- [Key Features & Architecture](#-key-features--architecture)
- [Design System & Color Tokens](#-design-system--color-tokens)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Environment Variables](#-environment-variables)
- [SEO & OpenGraph Architecture](#-seo--opengraph-architecture)
- [Deployment on Netlify](#-deployment-on-netlify)
- [District Leadership & Governance](#-district-leadership--governance)
- [Contributing & License](#-contributing--license)

---

## 🌍 Overview

**Rotaract District 9126** is the official digital infrastructure for youth leadership, fellowship, and humanitarian action across South-West and North-Central Nigeria. Serving seven constituent states — **Oyo, Osun, Ondo, Ekiti, Kwara, Kogi, and Niger** — this platform provides an interactive ecosystem for prospective members, club executives, district officers, and global Rotary partners.

### Core Objectives:
1. **Club Discovery**: Connect individuals with verified community, campus, professional, and e-clubs across the 7 states.
2. **Impact Visibility**: Showcase documented humanitarian projects addressing healthcare, WASH, basic education, and economic development.
3. **Governance & Automation**: Streamline prospective member intake, dues verification, and district historical archives.

---

## 📊 District 9126 Impact Metrics

```mermaid
graph LR
    A[Rotaract District 9126] --> B[77 Chartered Clubs]
    A --> C[700+ Active Rotaractors]
    A --> D[50,000+ Lives Impacted]
    A --> E[180+ Completed Projects]
    A --> F[7 Constituent States]
```

- **77 Active Clubs** spanning 7 Nigerian states and institutional campuses.
- **700+ Registered Members** actively driving weekly service and professional development.
- **50,000+ Humanitarian Beneficiaries** reached via signature community service initiatives.
- **180+ Completed Projects** in maternal healthcare, borehole construction, digital literacy, and environmental action.

---

## ✨ Key Features & Architecture

### 1. 🏛️ Split-Screen Interactive Club Directory (`/clubs`)
- **Real-Time Split Layout**: 37% responsive directory list on desktop paired with a 63% interactive district map canvas.
- **Multi-Filter Engine**: Filter clubs by state (`Oyo`, `Osun`, `Ondo`, `Ekiti`, `Kwara`, `Kogi`, `Niger`, `E-Clubs`) and classification (`Campus`, `Community`, `Professional`).
- **Club Dossier Cards**: Displays meeting times, venue addresses, direct president contacts, and 1-click prospective member routing.
- **Mobile-Adaptive Switch**: Floating toggle button allowing mobile users to seamlessly swap between **List View** and **Map View**.

### 2. 🚀 3D Perspective Projects Showcase (`/projects`)
- **3D Coverflow Carousel**: Interactive carousel stage (`perspective: 1200px`) featuring flagship humanitarian campaigns (*Operation Vaccinate 500*, *Clean Water for Offa*, *Digital Skills Academy*).
- **4-Metric Impact Ribbon**: Real-time statistical dashboard of district-wide achievements.
- **Masonry Grid with Hover Drawers**: Fluid CSS columns with category-themed badges and sliding bottom statistical drawers.

### 3. 📜 District Heritage & DRR Lineage (`/heritage`)
- **Historical Leadership Succession**: Chronicles the administrative transition and stewardship from 2023 to 2027.
- **Verified Executive Council Profiles**: Authentic DRR and IPDRR profiles, theme mottos, and founding charter milestones.

### 4. 📝 Prospective Member Intake Form (`/join`)
- **Multi-Step Prospect Registration**: Captures applicant details, skill profiles, and auto-routes submissions to the relevant club president.
- **Instant Club Assignment**: Dynamic dropdowns populated from the 77-club verified dataset.

### 5. 🔐 Member Portal & President Console (`/portal`)
- **Digital ID Card**: Interactive digital membership verification with cryptographic QR verification.
- **Dues Clearance Tracker**: Real-time tracking of district capitation fees and member status.
- **President Administration Kanban**: Intake candidate pipelines and administrative clearance controls.

### 6. ⚡ Global Command Palette (`Ctrl + K` / `Cmd + K`)
- **Instant Search**: Modal search indexing all clubs, projects, leadership contacts, and platform shortcuts.

---

## 🎨 Design System & Color Tokens

The UI follows the official Rotary International Brand Guidelines with bespoke modern digital tokens:

| Token Name | Hex Code | Purpose | Preview |
| :--- | :--- | :--- | :--- |
| **Cranberry Maroon** | `#981132` | Primary brand identifier, CTA containers, navbar accents | `rgb(152, 17, 50)` |
| **Rotary Gold** | `#D4A520` | Section headings, metric numerals, highlight text | `rgb(212, 165, 32)` |
| **Rose Cranberry** | `#D91B5C` | Section eyebrows, pill tags, interactive hover glows | `rgb(217, 27, 92)` |
| **Deep Obsidian** | `#080C14` | High-contrast leader cards, project drawer overlays | `rgb(8, 12, 20)` |
| **Warm Canvas** | `#F8F5F2` | Ambient light page backgrounds and card containers | `rgb(248, 245, 242)` |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Static Site Generation)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom typography & animation plugins
- **Motion & Micro-interactions**: [Framer Motion 11](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Firebase / Firestore](https://firebase.google.com/) with Firebase Admin SDK
- **Deployment**: [Netlify](https://www.netlify.com/) with continuous git integration via `@netlify/plugin-nextjs`

---

## 📁 Project Directory Structure

```plaintext
Rotaract9126/
├── actions/                   # Next.js Server Actions (Intake, Prospects)
├── app/                       # Next.js 14 App Router
│   ├── clubs/                 # Split-screen Club Directory (/clubs)
│   ├── heritage/              # District Heritage & DRR Lineage (/heritage)
│   ├── join/                  # Prospect Intake Engine (/join)
│   ├── portal/                # Member Portal & President Dashboard
│   ├── projects/              # 3D Coverflow & Masonry Project Showcase (/projects)
│   ├── globals.css            # Global CSS, typography, animations
│   ├── layout.tsx             # Root layout with Schema.org JSON-LD & SEO
│   ├── manifest.ts            # PWA Web Manifest
│   ├── opengraph-image.tsx    # Dynamic 1200x630 Social Graph Generator
│   ├── page.tsx               # District Homepage (8 Reconciled Sections)
│   ├── robots.ts              # Dynamic robots.txt
│   └── sitemap.ts             # Dynamic XML Sitemap generator
├── components/
│   ├── layout/                # Fixed Glass Navbar & Responsive Footer
│   ├── sections/              # Homepage Section Modules (Hero, Impact, Leadership, etc.)
│   ├── seo/                   # JSON-LD Structured Schema Component
│   └── ui/                    # Reusable UI Atoms (CountUp, RotaryTooltip, Modal)
├── leaders/                   # Source high-res portraits & official logo assets
├── lib/
│   ├── clubs-data.ts          # Centralized single source of truth (77 Verified Clubs)
│   └── firebase.ts            # Firebase client SDK initialization
├── public/                    # Static assets, official logos, and imagery
├── netlify.toml               # Netlify build configuration & runtime plugin
└── package.json               # Dependencies and scripts
```

---

## 💻 Getting Started & Local Development

### 1. Prerequisites
- **Node.js**: `v18.17.0` or higher (`v20.x` recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 2. Clone the Repository
```bash
git clone https://github.com/KingPraise/RotaractDistrict9126.git
cd RotaractDistrict9126
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Firebase credentials:
```bash
cp .env.example .env.local
```

### 5. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 6. Build for Production
```bash
npm run build
npm run start
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following keys:

```env
# Firebase Client SDK Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Firebase Admin SDK Configuration (Server-Side)
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@your-project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

---

## 🔍 SEO & OpenGraph Architecture

The application includes enterprise-level SEO to rank first on Google for Rotaract District 9126 search queries:

- **Dynamic Social Card (`/opengraph-image`)**: Generates an optimized `1200×630px` social share banner featuring verified district metrics.
- **Dynamic XML Sitemap (`/sitemap.xml`)**: Automated sitemap indexing all public routes with crawl priorities.
- **Search Engine Directives (`/robots.txt`)**: Crawler rules directing Googlebot directly to the sitemap.
- **JSON-LD Schema Markup**: Embedded `NGO` and `WebSite` schemas enabling Google Knowledge Graph cards and Sitelinks search boxes.
- **Geographic Targeting**: Coordinates and regional tags (`geo.region: NG-OY`) anchoring search relevance to Nigerian districts.

---

## 🚀 Deployment on Netlify

The repository is configured for zero-configuration continuous deployment with Netlify via [`netlify.toml`](netlify.toml):

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

### Steps to Deploy:
1. Log in to [Netlify](https://app.netlify.com).
2. Click **"Add new site"** $\rightarrow$ **"Import an existing project"** $\rightarrow$ select **GitHub**.
3. Select **`KingPraise/RotaractDistrict9126`**.
4. In **Site Configuration $\rightarrow$ Environment Variables**, add your Firebase keys.
5. Click **"Deploy Site"**.

---

## 👥 District Leadership & Governance

### Executive Council (2026/2027 Rotary Year)

| Role | Officer |
| :--- | :--- |
| **District Rotaract Representative (DRR)** | **Rtr. PP Adaramoye Iyanuoluwa** |
| **Immediate Past DRR (IPDRR)** | **Rtr. PP Oyewumi Kamaldeen (PHF, FEIPA)** |
| **Director of Service Projects** | **Rtr. Chukwuemeka Obi** |
| **District Secretary** | **Rtr. PP Faleye Ifeoluwa** |
| **District Treasurer** | **Rtr. PP Odufuwa Omotoke Anita** |
| **Strategic Advisor & 15th DRR** | **Rtr. PP Adebayo Sodiq Babatunde (PHF+1)** |

### Constituent States
- **Oyo State** (Ibadan, Ogbomoso, Oyo, Saki)
- **Osun State** (Osogbo, Ile-Ife, Ilesa, Ede)
- **Ondo State** (Akure, Ondo, Owo)
- **Ekiti State** (Ado-Ekiti, Ikole, Ijero)
- **Kwara State** (Ilorin, Offa, Omu-Aran)
- **Kogi State** (Lokoja, Okene, Kabba)
- **Niger State** (Minna, Bida, Suleja)

---

## 📜 License & Credits

- **Rotaract Emblem & Rotary Wheel**: Trademarks of [Rotary International](https://www.rotary.org).
- **Codebase License**: MIT License — maintained by the **Rotaract District 9126 Technology & Media Committee**.

<div align="center">
  <sub>Built with ❤️ for Rotaract District 9126 · Service Above Self</sub>
</div>
