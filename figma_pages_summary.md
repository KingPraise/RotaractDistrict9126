# Figma Design Extraction & Specification: Rotaract District 9126 Secondary Pages
> **Figma File Key:** `WpCwwHTvr6QqMrbSHCzJ7M`  
> **Target Nodes:** About Page (`2:2`), Club Finder (`2:1232`), Project Page (`2:2976`), Blog Page (`2:4658`), Sign In Page (`5:2`)

---
## 1. Overview & Page Matrix
| Page Name | Node ID | Canvas Dimensions | Root Fills / Background | Core Layout Mode | Primary Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **About Page** | `2:2` | 1364 x 5676 px | `#121212`, `#080C14`, `#F8F5F2` | Hybrid (Vertical Sections) | District narrative, leadership, pillars, stats, flagship projects |
| **Club Finder** | `2:1232` | 1366 x 1019 px (content 1178px) | `#080C14`, `#F8F5F4` | Two-column split layout (505px sidebar / 860px map) | Interactive club search, filtering, meeting locator & interest CTA |
| **Project Page** | `2:2976` | 1363 x 2463 px | `#121212`, `#080C14` | Vertical Stack with 1200px max container | Featured projects, stats ribbon, categorized filterable project grid |
| **Blog Page** | `2:4658` | 1363 x 3101 px | `#121212`, `#080C14` | Vertical Stack with 1200px / 1280px container | Editorial hero, category pill tabs, featured cover story, articles grid, newsletter |
| **Sign In Page** | `5:2` | 1517 x 710 px | `#080C14` | Centered Card (448px container) | Member / Admin authentication, credential inputs, TLS security info |

---
## 2. Deep Dive Page Breakdowns
### 2.1 About Page Full (`2:2`)
- **Dimensions:** `1364.0 x 5676.0 px`
- **Root Fills / Backgrounds:** `#121212`, `#080C14`, `#F8F5F2` (cream body surface)
- **Direct Root Children:** `Background` (`2:3`), `Nav` (`2:263`), `Overlay+OverlayBlur` Search Palette (`2:281`)

#### Section Structure (Top-to-Bottom Order)
1. **Hero Header Section** (`2:4` — `1364 x 785.7 px`)
   - **Background:** `#111111` with multi-layer background carousel images, radial and linear gradient overlays.
   - **Heading 1:** `1089.6 x 171.4 px` — `Fellowship. Service.` (`#FFFFFF`, Inter 900, 109.3px, drop shadow) + `Impact.` (`#F87171`, Inter 900, 61.5px).
   - **Description:** `Rotaract District 9126 unites thousands of young leaders across Ondo, Ekiti, Osun, Oyo, Kogi, Niger, and Kwara...` (Inter 400, 19.2px, color `#FFFFFF`, max-width 671px).
   - **Hero CTAs:**
     - Primary Button (`2:24` — `194.5 x 50.0 px`): Fill `#981132`, Corner Radius `999px` (pill), Text `Discover More` (Inter 700, 16px `#FFFFFF`), right icon badge with background blur (`#000000` 35% opacity, border `1px #FFFFFF`). Dual drop shadows.
     - Secondary Ghost Button (`2:29` — `176.6 x 58.0 px`): Stroke `1px rgba(255,255,255,0.10)`, Radius `16px`, Text `Our Impact` (Inter 600, 16px `rgba(255,255,255,0.70)`), Play/Star vector icon.
   - **Floating Metric Ribbon / Card** (`2:36` — `1105 x 126.6 px`):
     - Background: `#FFFFFF`, Radius `16px`, Drop shadow `radius: 40px, y: 8px`.
     - 3 Stat Columns divided by vertical borders:
       - `3,200+` (Inter 900, 54.6px `#D4A520` Rotary Gold) → `Members` (Inter 400, 12px `#000000`)
       - `180+` (Inter 900, 54.6px `#D4A520`) → `Projects` (Inter 400, 12px `#000000`)
       - `50,000+` (Inter 900, 54.6px `#D4A520`) → `Beneficiaries` (Inter 400, 12px `#000000`)
   - **Slide Indicator Dots & Controls:** 3 inactive pill indicators (`3x8px`, `rgba(255,255,255,0.35)`), 1 active indicator (`3x22px`, `#981132`), Glass circular control button (`40x40px`, radius `full`, background `rgba(255,255,255,0.07)`, blur `12px`).

2. **'Live from the Field' / Impact in Motion Section** (`2:54` — `1364 x 866.4 px`)
   - **Eyebrow Tag:** `Live from the Field` (Inter 600, 12px `#D91B5C` uppercase tracking) + Gradient divider line (`65x1px`).
   - **Section Heading:** `Impact in Motion` (Inter 900, 47.8px `#D4A520`, drop shadow) + Subtitle (Inter 400, 16px `#000000`).
   - **Horizontal Card Scroll Container** (`2:60` — `1364 x 442.7 px`):
     - 4 Impact Moment Story Cards (`320.0 x 426.7 px` each, Corner Radius `16px`, Stroke `1px #FFFFFF`, Drop shadow):
       1. `Children Vaccinated` (Card `2:61`): Image fill + Dark gradient overlay, Stat `500+` (Inter 900, 35.2px gradient fill), Tag `Health Outreach · Oyo State` (Inter 400, 12px `rgba(255,255,255,0.40)`).
       2. `Youth Trained` (Card `2:68`): Image fill, Stat `2,400` (Inter 900, 35.2px), Tag `Digital Skills Academy · Ibadan`.
       3. `7 States United` (Card `2:75`): Image fill, Stat `47 Clubs` (Inter 900, 35.2px), Tag `Ondo · Ekiti · Osun · Oyo · Kogi · Niger · Kwara`.
       4. `Rotaractors United` (Card `2:82`): Image fill, Stat `400+` (Inter 900, 35.2px), Tag `District Leadership Summit 2026`.

3. **'Who We Are' / Mission & Heritage Section** (`2:90` — `1364 x 849.9 px`)
   - **Eyebrow:** `Who We Are` (Inter 600, 12px `#D91B5C`) + Gradient line (`81x1px`).
   - **Heading 2:** `Powered by Purpose.` (Inter 900, 54.6px `#D4A520`) & `Driven by People.` (Inter 900, 34.2px `#D4A520`).
   - **Body Text:** `District 9126 is a constellation of 47 Rotaract clubs united under one banner...` (Inter 400, 16.8px `#000000`, LH: 27.3px).
   - **Featured Blockquote:** Stroke `0px` left border `#D91B5C`, Giant quote mark `"` (Inter 400, 80px `#D91B5C`), Quote text: `We believe the most powerful force for good in any community is a young person who has been trusted with responsibility and equipped to lead.` (Inter 600, 18.4px `#000000`), Citation: `— D9126 Founding Charter, 2009` (Inter 400, 12.8px `rgba(0,0,0,0.45)`).
   - **3-Photo Collage Grid:** 3 Image containers (`390.3 x 292.7 px` each, Corner Radius `16px`, Linear gradient bottom overlays).

4. **'Experience the District' / 4 Core Pillars Section** (`2:111` — `1364 x 931.0 px`)
   - **Background:** `#981132` (Rotaract Crimson) with radial atmospheric background lighting.
   - **Heading:** `Life in Rotaract` (Inter 900, 51.2px `#FFFFFF`) + `is never ordinary.` (Inter 700, 31.4px `rgba(255,255,255,0.70)`).
   - **4 Pillar Cards Grid** (`289.0 x 433.5 px` each, Corner Radius `16px`, full-height background imagery with gradient shading):
     1. **Club Life** (`2:117`): `Weekly meetings, new friendships, and a community that shows up` (Inter 800, 15.2px title, Inter 400, 11.5px desc `rgba(255,255,255,0.65)`).
     2. **Community Service** (`2:122`): `Hands-on impact — boreholes, vaccines, classrooms, meals`.
     3. **Leadership Training** (`2:127`): `Workshops, summits, and mentorships that sharpen the next generation`.
     4. **District Events** (`2:132`): `Conferences, award nights, and district-wide celebrations of impact`.
   - **Section Action CTA:** Pill Button (`2:137` — `178.5 x 48.0 px`): Fill `#FFFFFF`, Radius `999px`, Text `Find Your Club` (Inter 700, 14px `#981132`), with round arrow badge.

5. **Executive Council / Meet the Leadership Section** (`2:142` — `1364 x 852.6 px`)
   - **Eyebrow:** `Executive Council` (Inter 600, 12px `#D91B5C`) between dual divider lines (`49x1px`).
   - **Heading:** `Meet the Leadership` (Inter 900, 47.8px `#D4A520`, drop shadow) + Subtitle: `The District 9126 executive council driving impact across seven Nigerian states` (Inter 400, 16px `#000000`).
   - **Leadership Card Grid (6 Executive Council Cards):**
     - Dimensions: `184.3 x 319.8 px`, Radius `16px`, Background `rgba(15,22,36,0.90)` (`#0F1624`), Border `1px #FFFFFF`, Drop shadow.
     - Photo aspect: `182.3 x 243.1 px` (`3:4` vertical portrait ratio) with gradient overlay.
     - Leaders featured:
       1. **Oluwafemi Adeleke** — *District Rotaract Representative (DRR)* (Name: Inter 700 12.8px `#ECEEF5`, Role: Inter 600 10.9px `#D91B5C`)
       2. **Tunde Adeyemi** — *District Rotaract Co-Representative*
       3. **Chukwuemeka Obi** — *Director of Service Projects*
       4. **Folake Adesanya** — *Director of Finance*
       5. **Babajide Olawale** — *Director of Membership*
       6. **Adaeze Nwosu** — *Director of Marketing & Comms*

6. **Flagship Projects / Action Meets Impact Section** (`2:186` — `1364 x 634.7 px`)
   - **Eyebrow:** `Flagship Projects` (`#D91B5C`) + Heading `Where Action Meets Impact` (`#D4A520`, Inter 900, 47.8px).
   - **Header CTA Button:** `View All Projects` (`179.7 x 42.0 px`, Radius `12px`, Stroke `1px #FFFFFF`, Text Inter 600 14px `rgba(255,255,255,0.70)`).
   - **3 Project Cards** (`385.0 x 322.9 px` each, Corner Radius `16px`, Stroke `1px #FFFFFF`):
     - Top Image Container (`383.0 x 224.0 px`, Background `#0F1624` + image fill).
     - Bottom Blur Info Glass Overlay (`383.0 x 96.9 px`, Background `rgba(15,22,36,0.90)`, Background Blur):
       1. **Operation Vaccinate 500** (`2:196`): Location `Ogbomoso, Oyo State` (12px), Stat `500` (Inter 900, 17.6px `#D91B5C`), Subtext `Children Vaccinated` (12px `rgba(255,255,255,0.40)`).
       2. **Clean Water for Offa** (`2:208`): Location `Offa, Kwara State`, Stat `2`, Subtext `Boreholes Constructed`.
       3. **Digital Skills Academy** (`2:220`): Location `Ibadan, Oyo State`, Stat `2,400`, Subtext `Youth Trained`.

7. **'Ready to make a difference?' Final CTA Section** (`2:232` — `1364 x 618.7 px`)
   - **Background:** `#981132` (Crimson) with radial glow gradient.
   - **Heading:** `Join the Movement.` (Inter 900, 64px `#FFFFFF`) + `Build the Future.` (Inter 900, 38.4px `rgba(255,255,255,0.75)`).
   - **Body:** `There is a Rotaract club near you. Find your community, step into your purpose...` (Inter 400, 16.8px).
   - **Action Buttons:**
     - Button 1 (`228.7 x 58.0 px`): Fill `#FFFFFF`, Radius `999px`, Text `Find a Club Near You` (Inter 700, 15px `#981132`), right circle badge.
     - Button 2 (`214.8 x 58.0 px`): Stroke `1px #FFFFFF`, Radius `16px`, Text `Explore Our Impact` (Inter 600, 16px `rgba(255,255,255,0.85)`).

8. **Footer** (`2:246` — `1364 x 137.0 px`)
   - Background `#981132` + Top border `1px linear gradient`.
   - Brand Logo Lockup (`40x40px` emblem + `Rotaract` 14px `#FFFFFF` / `District 9126` 10px).
   - Links: `Homepage`, `Clubs`, `Projects`, `Blog` (Inter 600 12px `rgba(255,255,255,0.70)`).
   - Divider (`2x14px`, `rgba(255,255,255,0.25)`).
   - Secondary Links: `Privacy`, `Terms`, `Contact` (Inter 400 12px `rgba(255,255,255,0.50)`).
   - Copyright: `© 2024–25 Rotaract District 9126` (Inter 400 11.2px `rgba(255,255,255,0.50)`).

9. **Sticky Navigation Bar** (`2:263` — `1363 x 60.0 px`)
   - Background `rgba(255,255,255,0.97)` (`#FFFFFF`), Bottom drop shadow, Background blur.
   - Left: Rotaract Emblem (`36x36px`) + `Rotaract` (`#981132`, 13px bold) / `District 9126` (`#9CA3AF`, 9px).
   - Center Nav Links: `About` (Active state: `#981132` bold with underline bar `38.7x2.5px`), `Clubs` (`#374151`, 13px medium), `Projects` (`#374151`), `Blog` (`#374151`).
   - Right Actions: `Sign In` (`#6B7280`, 13px) + Pill Button `Join a Club` (`118.8x34px`, Fill `#981132`, Radius `999px`, Text 11.5px bold `#FFFFFF`).

10. **Command Palette / Search Modal Overlay** (`2:281` — `1364 x 577.0 px`)
    - Backdrop: `rgba(8, 12, 20, 0.80)` (`#080C14CC`) with backdrop blur.
    - Search Input Box (`2:282` — `660.6 x 59.2 px`, Radius `20px`, Fill `rgba(10,14,26,0.97)`, Stroke `1px #FFFFFF`):
      - Search icon (`21.3x21.3px`), Placeholder: `Search members, clubs, projects, or articles...` (Inter 400, 21.3px `rgba(236,238,245,0.50)`), `ESC` key pill (`38.1x22.3px`, radius `7px`, fill `rgba(255,255,255,0.07)`).
    - Search Results Dropdown Window (`2:292` — `660.6 x 284.3 px`, Radius `20px`, Fill `rgba(8,11,22,0.97)`, Stroke `1px #FFFFFF`):
      - Recent Searches Chips (Radius `8px`, Fill `rgba(255,255,255,0.05)`, Stroke `1px #FFFFFF`): `Leadership Summit 2026`, `Oyo State clubs`, `vaccination project`, `District Directory`.
      - Quick Links Action Buttons (`306.1 x 52.4 px`, Radius `12px`, Fill `rgba(255,255,255,0.04)`, Stroke `1px #FFFFFF`): `My Dashboard`, `District Directory`, `Find a Club`, `Impact Projects`, `News Hub`, `Admin Console`.
      - Footer Keyboard Shortcut Legend (`658.7 x 40.7 px`): `↑↓ Navigate`, `↵ Select`, `ESC Close`, Green status dot (`#22C55E`), `District 9126` branding.


---
### 2.2 Club Finder Page (`2:1232`)
- **Dimensions:** `1366.0 x 1019.0 px` (App container `1366 x 1178 px`)
- **Root Fills / Backgrounds:** `#080C14`, `#F8F5F2`, `#F8F5F4`
- **Layout Architecture:** Fixed 2-Column Split View:
  - **Left Sidebar Panel** (`505.4 x 1178.0 px`): Search, filters, and scrollable list of Club Cards.
  - **Right Interactive Map & Detail View** (`860.6 x 1178.0 px`): Map background surface, pin markers, geographic clustering, floating stats widgets.

#### Structural Components & Controls
1. **Header / Search & Filter Section** (`2:1241` — `504.4 x 355.8 px`, Padding: `Top: 100px, Right: 22px, Bottom: 18px, Left: 22px`):
   - **Eyebrow:** `Club Finder` (Inter 700, 9px `#981132` uppercase) + Linear gradient accent line (`361.4x1px`).
   - **Title:** `Find Your Community` (Inter 900, 22px `#1C1C1E`, LH: 25.3px).
   - **Search Input Box** (`2:1254` — `460.4 x 40.8 px`):
     - Radius: `12px`, Fill: `rgba(255,255,255,0.85)`, Stroke: `1px rgba(0,0,0,0.10)`, Padding: `10px 36px`.
     - Search icon (`#6B7280`) + Placeholder: `Search by name or area…` (Inter 400, 12.5px `rgba(28,28,30,0.50)`).
   - **Club Type Category Filter Pills** (`2:1260` — Horizontal gap `5px`):
     - Active Pill (`2:1261`): `All` — Radius `20px`, Fill `Linear Gradient (Crimson)`, Stroke `1px #000000`, Text Inter 700 10px `#FFFFFF`.
     - Inactive Pills (`2:1264`, `2:1267`, `2:1270`): `Campus`, `Professional`, `Community` — Radius `20px`, Fill `rgba(255,255,255,0.72)`, Stroke `1px rgba(0,0,0,0.08)`, Text Inter 500 10px `#1C1C1E`.
   - **State Filter & Counter Bar** (`2:1274` — `460.4 x 25.0 px`):
     - State Dropdown Pill (`79x25px`): `State: All` (Inter 500 10px `#374151`), Chevron icon.
     - Result Counter: `20 clubs` (Inter 400 10.5px `#6B7280`).

2. **Club Cards Feed** (`2:1289` — `504.4 x 822.2 px`, Vertical gap `10px`, Padding: `14px 18px 20px 14px`):
   - **Card Design Specification (`ClubCard` `2:1291`, `2:1349`, etc.):**
     - Dimensions: `472.4 x 177.0 px`
     - Corner Radius: `18px`
     - Background Fill: `rgba(255, 255, 255, 0.82)` with Glassmorphism blur
     - Border / Stroke: `1px rgba(0, 0, 0, 0.08)`
     - Shadows: Dual elevation (Inner shadow + soft drop shadow `0 4px 16px rgba(0,0,0,0.06)`)
     - Padding: `Top: 18px, Right: 18px, Bottom: 16px, Left: 18px`
   - **Card Header Row (`434.0 x 48.0 px`):**
     - **Leader Avatar with Live Status:** Container `46x46px`, Gradient ring (`rad 23px`), Avatar Image `42x42px` (`rad 21px`), Green Online Badge `11x11px` (`#22C55E`, stroke `2px #FFFFFF`).
     - **Club Name & President:** Club Name (Inter 700 14.5px `#1C1C1E`), President: e.g. `Pres. Funmi Olatunde` (Inter 400 11.5px `#6B7280`).
     - **Badge / Category Tag:** Pill `92x20px` (`rad 20px`, fill `rgba(152,17,50,0.09)` `#98113217`, stroke `1px #981132`), Text: `PROFESSIONAL` / `CAMPUS` / `COMMUNITY` (Inter 700 9px `#981132` or `#8B3A7A` or `#A70C43`).
   - **Card Metadata Tags Row (`434.4 x 37.0 px`):**
     - Location Chip (`78x25px`, rad `20px`, fill `rgba(0,0,0,0.04)`): Pin Icon + `Ado-Ekiti` (Inter 400 10px `#374151`).
     - Meeting Schedule Chip (`94x25px`): Clock Icon + `Tue 6:00 PM` (Inter 400 10px `#374151`).
     - Membership Size Chip (`94x25px`): Users Icon + `33 members` (Inter 400 10px `#374151`).
   - **Card Action CTA (`434.0 x 42.0 px`):**
     - Button: Fill `#981132`, Corner Radius `999px` (pill), Padding `8px 10px 8px 20px`.
     - Label: `Express Interest` (Inter 700 13.5px `#FFFFFF`) + Circular dark arrow badge (`26x26px`, fill `rgba(0,0,0,0.35)`, stroke `1px #FFFFFF`).

3. **Right Map & Detail Panel** (`2:2450` — `860.6 x 1178.0 px`):
   - Full-canvas interactive geographic map displaying pins across the 7 District states (Ondo, Ekiti, Osun, Oyo, Kogi, Niger, Kwara).
   - Floating map controls (`2:2623` — `128x139px`): Zoom in/out, re-center, layer toggle.
   - Floating status indicator (`2:2650` — `135x28px`): `Showing 20 Clubs Active`.


---
### 2.3 Project Page (`2:2976`)
- **Dimensions:** `1363.0 x 2463.45 px` (Content container `1280 x 2327 px`)
- **Root Fills / Backgrounds:** `#121212`, `#080C14` (Deep Dark District Theme)
- **Layout Architecture:** Vertical Stack with standard `1200px` content grid.

#### Section Breakdown
1. **Hero Header & Impact Overview** (`2:2980` — `1200.0 x 405.3 px`, Padding: `Top: 100px, Bottom: 48px`):
   - Atmospheric gradient background with 7 subtle vertical grid guidelines (`1.0 x 405.2 px`).
   - **Heading 1:** `Action Beyond Words.` (Inter 900, 64px `#FFFFFF`, LH: 67.2px) + Sub-headline `Transforming Communities Across 7 States` (Inter 900, 38.4px `#D4A520`).
   - **Intro Narrative:** Paragraph describing district projects in healthcare, literacy, clean water, and economic development (Inter 400, 16px `rgba(255,255,255,0.75)`).

2. **Featured Flagship Project Showcase** (`2:2998` — `1200.0 x 611.0 px`, Gap: `32px`):
   - **Section Eyebrow:** `Featured Initiative` (Inter 600, 12px `#D91B5C`) + Divider line (`64x1px`).
   - **Hero Project Banner (`1200 x 500 px`):**
     - Massive landscape photography card (Corner Radius `20px`, Stroke `1px rgba(255,255,255,0.12)`, Drop shadow).
     - Project Title, Multi-tag pills (`Basic Education & Literacy`, `Oyo State`, `Completed 2025`), Impact metric (`4,500+ Students Reached`), and `View Full Project Story` Pill Button.

3. **District Impact Stats Ribbon** (`2:3071` — `1200.0 x 145.0 px`):
   - Background: `rgba(15, 22, 36, 0.85)` (`#0F1624`), Radius `16px`, Stroke `1px rgba(255,255,255,0.10)`, Background Blur `16px`.
   - 4 Column Layout with vertical divider borders (`298.8 x 135.0 px` each):
     1. Icon (Check circle) + Number `180+` (Inter 900, 30px `#D4A520`) + `PROJECTS COMPLETED` (Inter 700, 10px `rgba(255,255,255,0.50)` tracking +1.5px).
     2. Icon (Building/Club) + Number `47` (Inter 900, 30px `#D4A520`) + `ACTIVE CLUBS`.
     3. Icon (Heart/Users) + Number `50K+` (Inter 900, 30px `#D4A520`) + `LIVES IMPACTED`.
     4. Icon (Globe) + Number `7` (Inter 900, 30px `#D4A520`) + `COUNTRIES REACHED`.

4. **All Projects Directory & Filterable Grid** (`2:3099` — `1200.0 x 1165.7 px`):
   - **Filter & Search Bar (`1200 x 80 px`):**
     - Rotary 7 Areas of Focus Category Tabs: `All Projects`, `Maternal & Child Health`, `Water & Sanitation`, `Economic Development`, `Peacebuilding`, `Environment`, `Education`.
     - Active state: Pill fill `#981132`, Text `#FFFFFF`; Inactive state: Pill fill `rgba(255,255,255,0.06)`, Text `rgba(255,255,255,0.60)`.
   - **Project Grid (`1200 x 1014.7 px`):**
     - 9 Project Cards (`386.7 x 380px`, `386.7 x 280px`, `386.7 x 260px` in staggered masonry/grid).
     - Card Structure: Radius `16px`, Stroke `1px rgba(255,255,255,0.10)`, Background `#0F1624`, Image cover (`16:9` ratio), Category badge, Location pin tag, Progress bar / Beneficiary count, View Details arrow.


---
### 2.4 Blog Page (`2:4658`)
- **Dimensions:** `1363.0 x 3101.55 px` (Content container `1280 x 2651.5 px`)
- **Root Fills / Backgrounds:** `#121212`, `#080C14`
- **Layout Architecture:** Modern Editorial Layout with Hero Split, Category Navigator, Multi-tier Article Hierarchy.

#### Section Breakdown
1. **Editorial Header & Search Bar** (`2:4662` — `1200.0 x 184.8 px`, Gap: `562px`):
   - Left Title Container (`268.6 x 184.8 px`): Eyebrow `District News & Insights` (`#D91B5C`) + Heading 1 `The Rotaract Voice` (Inter 900, 48px `#FFFFFF`).
   - Right Search Box (`2:4674` — `320.0 x 46.0 px`): Radius `12px`, Fill `rgba(255,255,255,0.06)`, Stroke `1px rgba(255,255,255,0.12)`, Placeholder `Search articles, stories…` (Inter 400 13px).

2. **Category Filter Tabs Bar** (`2:4680` — `1200.0 x 40.0 px`, Gap: `8px`):
   - Buttons: `ALL` (Active: `#981132` fill, `#FFFFFF`), `IMPACT REPORTS`, `EVENTS`, `COMMUNITY STORIES`, `DISTRICT NEWS`, `ANNOUNCEMENTS` (Radius `10px`, Fill `rgba(255,255,255,0.05)`, Stroke `1px rgba(255,255,255,0.08)`, Text Inter 600 11px uppercase `rgba(255,255,255,0.60)`).
   - Story Counter: `9 stories` (Inter 400 11px `rgba(255,255,255,0.40)`).

3. **Trending Stories Quick Banner** (`2:4698` — `1200.0 x 126.0 px`):
   - 4 Column glass strip (`298.8 x 124.0 px` each, Radius `16px`, Stroke `1px rgba(255,255,255,0.08)`):
     - Micro-headline, Author, Read time (e.g. `3 min read`), Trending badge.

4. **Lead Featured Article Cover Story** (`2:4719` — `1200.0 x 493.7 px`):
   - Two-column horizontal hero card (`1198.0 x 491.7 px`, Radius `20px`, Fill `#0F1624`, Stroke `1px rgba(255,255,255,0.12)`, Drop shadow):
     - Left: Featured Cover Image (`580 x 450 px`, Radius `14px`).
     - Right: Category Pill (`DISTRICT HIGHLIGHT`, `#D91B5C`), Article Title `District 9126 Records Unprecedented Growth in 2025/26 Rotary Year` (Inter 900, 32px `#FFFFFF`), Excerpt (Inter 400, 15px `rgba(255,255,255,0.70)`), Author Avatar + Name + Date + Read Time, `Read Full Article` button.

5. **Secondary Featured Articles Row** (`2:4759` — `1200.0 x 600.9 px`):
   - 2 Large Feature Cards (`588.0 x 600.9 px` and `588.0 x 578.9 px`, Radius `18px`, Stroke `1px rgba(255,255,255,0.10)`, Background `#0F1624`):
     - Card 1: `RYLA 2026: Inspiring 500 Young Leaders in Osun State`
     - Card 2: `Clean Water Initiative Reaches 12 Rural Communities in Kwara`

6. **Standard 3-Column Article Grid** (`2:4819` — `1200.0 x 847.9 px`, CSS Grid / 3 columns):
   - 6 Standard Article Cards (`384.0 x 444.8 px` and `384.0 x 379.1 px`):
     - Card Top: Image thumbnail (`384 x 220 px`, radius top `16px`).
     - Card Body: Category Pill, Date (`Oct 14, 2025`), Title (Inter 700 18px `#FFFFFF`), Snippet (Inter 400 13px `rgba(255,255,255,0.60)`), Author row.

7. **Newsletter Subscription CTA Card** (`2:4974` — `1200.0 x 248.0 px`):
   - Background: Gradient `#981132` to `#4A0818`, Radius `20px`, Inner container `1136 x 152 px`.
   - Heading: `Stay Connected with District 9126` (Inter 900 28px `#FFFFFF`) + Subtitle.
   - Inline Form: Email input (`360x44px`, radius `12px`, background `rgba(255,255,255,0.15)`) + Subscribe Pill Button (`140x44px`, fill `#FFFFFF`, text `#981132` bold).


---
### 2.5 Sign In Page (`5:2`)
- **Dimensions:** `1517.0 x 710.0 px` (Body container `1517.8 x 654.4 px`)
- **Root Fills / Backgrounds:** `#080C14` (Dark Space Canvas)
- **Layout Architecture:** Centered Auth Card with Top Brand Header and Bottom Security Verification.

#### Section Breakdown & Form Controls
1. **Top District Accent Line** (`5:9` — `1517.8 x 4.0 px`):
   - Solid brand bar at the top edge (`#981132` Rotaract Crimson).

2. **Brand Header Lockup** (`5:10` — `107.0 x 84.0 px`, Gap: `8px`, Centered):
   - Rotaract Emblem Icon (`5:11` — `48.0 x 48.0 px`, Image fill).
   - Title: `Rotaract` (Inter 900, 16px `#FFFFFF`, LH: 16px).
   - Subtitle: `District 9126` (Inter 600, 10px `#9CA3AF`, LH: 10px).

3. **Authentication Card Container** (`5:19` — `448.0 x 547.0 px`, Card Body `5:20` — `416.0 x 501.0 px`):
   - **Card Surface:** Background `rgba(15, 22, 36, 0.95)` (`#0F1624`), Radius `20px`, Stroke `1.11px rgba(255,255,255,0.12)`, Drop Shadow `0 12px 40px rgba(0,0,0,0.50)`.
   - **Card Top Brand Accent Bar** (`5:21` — `414.0 x 4.0 px`): Linear gradient accent line.
   - **Card Heading & Subheading** (`5:29` — `358.0 x 59.0 px`):
     - `Welcome back` (`5:31`): Inter 800, 25.6px `#FFFFFF`, LH: 31px.
     - `Sign in to your District 9126 account` (`5:34`): Inter 400, 12.8px `rgba(236,238,245,0.60)`.
   - **Email Input Field** (`5:36` — `358.0 x 68.0 px`):
     - Label (`5:38`): `Email address` (Inter 600, 12.0px `#ECEEF5`).
     - Input Box (`5:45`): `358.0 x 46.0 px`, Corner Radius `16px`, Fill `rgba(255,255,255,0.05)`, Stroke `1.11px rgba(255,255,255,0.15)`, Padding `12px 16px`, Left Email Icon (`15x15px`).
   - **Password Input Field** (`5:47` — `358.0 x 68.0 px`):
     - Label (`5:49`): `Password` (Inter 600, 12.0px `#ECEEF5`).
     - Input Box (`5:56`): `358.0 x 46.0 px`, Corner Radius `16px`, Fill `rgba(255,255,255,0.05)`, Stroke `1.11px rgba(255,255,255,0.15)`, Left Lock Icon, Right Eye (Show/Hide) Icon.
   - **Remember Me & Forgot Password Row** (`5:63` — `358.0 x 18.0 px`):
     - Checkbox (`5:65`): `16.0 x 16.0 px`, Corner Radius `4px`, Stroke `1.11px rgba(255,255,255,0.30)` + Label `Remember me` (Inter 400, 12px `#ECEEF5`).
     - Link (`5:70`): `Forgot password?` (Inter 600, 12.0px `#D91B5C` / `#981132`).
   - **Primary Submit Button** (`5:72` — `358.0 x 42.0 px`):
     - Fill: `#981132` (Rotaract Crimson), Corner Radius: `999px` (Pill).
     - Label: `Sign In` (Inter 700, 13.5px `#FFFFFF`, LH: 21px).
     - Action Icon Badge (`5:75`): `26.0 x 26.0 px`, Radius `13px`, Fill `rgba(0,0,0,0.30)`, Stroke `1.11px #FFFFFF` with arrow vector.
   - **Or Divider** (`5:78` — `358.0 x 23.0 px`):
     - Two horizontal lines (`159.0 x 1.0 px`, fill `rgba(255,255,255,0.10)`) flanking `or` (Inter 400, 10.0px `rgba(255,255,255,0.40)`).
   - **Sign Up Link Row** (`5:84` — `358.0 x 24.0 px`):
     - Text: `Don't have an account?` (Inter 400, 12.0px `rgba(255,255,255,0.60)`).
     - Button: `Create account` (Inter 600, 16.0px `#D4A520` Rotary Gold / `#D91B5C`).
   - **Terms Disclaimer** (`5:92` — `416.0 x 46.0 px`):
     - `By signing in you agree to the Terms of Service and Privacy Policy of Rotaract District 9126.` (Inter 400, 11px `rgba(255,255,255,0.35)`, LH: 16px).

4. **Security & Protocol Badge** (`5:96` — `341.0 x 16.0 px`, Centered):
   - Lock & Shield Icon (`11x11px`) + Text: `SECURED · DISTRICT 9126 IDENTITY SYSTEM · TLS 1.3` (Inter 600, 9px `rgba(236,238,245,0.30)` tracking +1.2px).

5. **Back Navigation Link** (`5:103` — `90.0 x 16.0 px`):
   - Arrow Left Icon (`14x14px`) + Text `Back to site` (Inter 600, 12px `rgba(255,255,255,0.60)`).


---
## 3. Global Design Token Registry (Aggregated Across All Pages)
This section compiles every unique visual property across all five secondary pages to serve as the unified design token system.

### 3.1 Color Palette & Semantic System
| Semantic Category | Color Value | Hex / RGBA Code | Usage & Applications |
| :--- | :--- | :--- | :--- |
| **Primary Brand Crimson** | `#981132` | `rgb(152, 17, 50)` | Primary buttons, active nav tabs, section background (Pillars, Final CTA), brand headers, logos |
| **Brand Accent Crimson Glow** | `#A70C43` | `rgb(167, 12, 67)` | Hover glows, secondary badge borders, community tags |
| **Brand Pink / Vibrant Rose** | `#D91B5C` | `rgb(217, 27, 92)` | Eyebrows, stat numbers, quote marks, category highlights, links |
| **Coral Accent** | `#F87171` | `rgb(248, 113, 113)` | Hero headline accent word (`Impact.`), error highlights |
| **Rotary Gold Primary** | `#D4A520` | `rgb(212, 165, 32)` | Section headings (`Meet the Leadership`, `Powered by Purpose`), key milestone metrics (`3,200+`, `180+`, `50,000+`) |
| **Darkest Space Canvas** | `#080C14` | `rgb(8, 12, 20)` | App base canvas, outer frame background, search modal backdrop |
| **Dark Surface Surface 1** | `#0F1624` | `rgb(15, 22, 36)` | Standard dark card backgrounds (Leadership, Projects, Blog cards, Auth card) |
| **Dark Surface Surface 2** | `#111111` | `rgb(17, 17, 17)` | Hero background containers |
| **Dark Surface Surface 3** | `#121212` | `rgb(18, 18, 18)` | Fallback dark canvas base |
| **Dark Surface Tint** | `#0A0E1A` | `rgb(10, 14, 26)` | Command palette input fill (`0.97` opacity) |
| **Light Surface Canvas** | `#F8F5F2` | `rgb(248, 245, 242)` | About page body section background |
| **Light Surface Alternative** | `#F8F5F4` | `rgb(248, 245, 244)` | Club finder main container background |
| **Pure White Surface** | `#FFFFFF` | `rgb(255, 255, 255)` | Stat cards, nav bar surface, light buttons, high contrast headings |
| **Text Heading Light** | `#ECEEF5` | `rgb(236, 238, 245)` | High-contrast light text on dark surfaces, leader names, command palette text |
| **Text Heading Dark** | `#1C1C1E` | `rgb(28, 28, 30)` | High-contrast dark text on light surfaces (Club Finder titles, card headings) |
| **Text Body Dark** | `#374151` | `rgb(55, 65, 81)` | Nav links, club card meeting details, secondary text on light bg |
| **Text Muted Gray** | `#6B7280` | `rgb(107, 114, 128)` | Club president titles, filter labels, inactive indicators |
| **Text Sub-Muted Gray** | `#9CA3AF` | `rgb(156, 163, 175)` | District sub-labels, footer secondary text |
| **Status Success Green** | `#22C55E` | `rgb(34, 197, 94)` | Active online indicator badges, verified indicators |
| **Purple Campus Tag** | `#8B3A7A` | `rgb(139, 58, 122)` | Campus club category badge fill & border |
| **Glass White Stroke** | `rgba(255,255,255,0.10 - 0.15)` | `rgba(255,255,255,0.12)` | Glass card borders, input borders on dark bg, divider strokes |
| **Glass Dark Stroke** | `rgba(0,0,0,0.06 - 0.10)` | `rgba(0,0,0,0.08)` | Card borders on light cream surfaces |

### 3.2 Typography Scale & Text Tokens
**Primary Font Family:** `Inter` (Sans-serif)  
**Secondary Font Family:** `Lucida Console` (Monospace / Code labels)  
**Font Weights Used:** `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`, `700 (Bold)`, `800 (ExtraBold)`, `900 (Black)`

| Token Name | Font Size (px) | Approx REM | Primary Weight | Line Height | Usage in Design |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display-2xl` | `109.3px` | `6.83rem` | 900 (Black) | `103.8px` | Hero H1 Display (`Fellowship. Service.`) |
| `text-display-xl` | `80.0px` | `5.00rem` | 400 (Regular) | `80.0px` | Decorative quote mark `"` |
| `text-display-lg` | `64.0px` | `4.00rem` | 900 (Black) | `67.2px` | Main Hero H1 / CTA H1 (`Join the Movement.`, `Action Beyond Words.`) |
| `text-display-md` | `61.5px` | `3.84rem` | 900 (Black) | `67.6px` | Hero Headline Accent Word (`Impact.`) |
| `text-display-sm` | `54.6px` | `3.41rem` | 900 (Black) | `57.4px` | Hero milestone counters (`3,200+`, `180+`), Section H2 (`Powered by Purpose.`) |
| `text-heading-2xl` | `51.2px` | `3.20rem` | 900 (Black) | `53.8px` | Pillar Section H2 (`Life in Rotaract`) |
| `text-heading-xl` | `47.8px` | `2.99rem` | 900 (Black) | `59.8px` | Major Section Headings (`Impact in Motion`, `Meet the Leadership`, `Where Action Meets Impact`) |
| `text-heading-lg` | `38.4px` | `2.40rem` | 900 (Black) | `44.2px` | Secondary Section Titles (`Build the Future.`) |
| `text-heading-md` | `35.2px` | `2.20rem` | 900 (Black) | `35.2px` | Story Card Metric Counters (`500+`, `2,400`, `47 Clubs`, `400+`) |
| `text-heading-sm` | `32.0px` | `2.00rem` | 900 (Black) | `38.4px` | Featured Article Headline (`District 9126 Records...`) |
| `text-heading-xs` | `25.6px` | `1.60rem` | 800 (ExtraBold) | `31.0px` | Auth Page H2 (`Welcome back`) |
| `text-title-lg` | `22.0px` | `1.38rem` | 900 (Black) | `25.3px` | Club Finder Page Title (`Find Your Community`) |
| `text-title-md` | `21.3px` | `1.33rem` | 400 (Regular) | `25.8px` | Command Palette Search Input text |
| `text-title-sm` | `18.4px` | `1.15rem` | 600 / 700 | `29.4px` | Featured Quote text, Flagship Project card titles |
| `text-body-lg` | `16.8px` / `16.0px` | `1.00rem` | 400 / 600 | `24.0px` - `27.3px` | Standard Body text, Section lead descriptions, Primary button text |
| `text-body-md` | `14.5px` / `14.0px` | `0.90rem` | 700 / 600 | `17.4px` - `21.0px` | Club name titles, Nav Brand label, Secondary button labels |
| `text-body-sm` | `13.0px` / `12.8px` | `0.81rem` | 500 / 600 | `19.5px` | Nav link items, Leadership member names, Auth inputs |
| `text-caption` | `12.0px` | `0.75rem` | 400 / 600 | `16.0px` | Eyebrow badges (`Who We Are`, `Live from the Field`), Meta tags, Footers |
| `text-micro` | `10.0px` / `9.0px` | `0.60rem` | 700 / 600 | `13.5px` | Category badge text (`PROFESSIONAL`, `CAMPUS`), Security badge, Key shortcuts |

### 3.3 Border Radius Tokens
| Radius Token | Value (px) | Applications & Visual Hierarchy |
| :--- | :--- | :--- |
| `radius-xs` | `4.0px` | Checkboxes, subtle micro-elements |
| `radius-sm` | `6.0px` - `8.0px` | Keyboard shortcut keycaps (`ESC`, `↑↓`), Quick search chip tags |
| `radius-md` | `12.0px` | Search inputs, ghost action buttons, newsletter email field, category tabs |
| `radius-lg` | `16.0px` | Stat ribbons, Section photo collages, Pillar cards, Leadership council cards, Project cards, Auth input fields |
| `radius-xl` | `18.0px` - `20.0px` | ClubCards (`18px`), Auth modal card (`20px`), Command palette window (`20px`), Featured hero article (`20px`) |
| `radius-full` | `999.0px` | All Primary Action CTA Buttons (`Join a Club`, `Find Your Club`, `Sign In`, `Express Interest`, `Discover More`), Type pills |

### 3.4 Shadow & Effect Tokens
| Effect Token | Type | Parameters | Usage |
| :--- | :--- | :--- | :--- |
| `shadow-card-dark` | `DROP_SHADOW` | `radius: 16px - 24px, offset: (0, 8), color: rgba(0,0,0,0.50)` | Leadership cards, project cards, blog cards |
| `shadow-modal-glow` | `DROP_SHADOW` | `radius: 40px, offset: (0, 8), color: rgba(0,0,0,0.40)` | Floating metric card ribbon, Command palette |
| `shadow-button-primary`| `DROP_SHADOW` | `radius: 6px (y:1) + radius: 20px (y:4), color: rgba(152,17,50,0.40)` | Crimson primary pill buttons |
| `shadow-card-light` | `DROP_SHADOW` | `radius: 16px, offset: (0, 4), color: rgba(0,0,0,0.06)` | ClubCards in Club Finder |
| `shadow-card-inner` | `INNER_SHADOW` | `radius: 1px, offset: (0, 1), color: rgba(255,255,255,0.10)` | ClubCards top rim reflection |
| `blur-glass-nav` | `BACKGROUND_BLUR` | `radius: 12px` | Sticky navigation bar, search modal background |
| `blur-glass-card` | `BACKGROUND_BLUR` | `radius: 16px` | Floating project info glass slabs, leadership badge plates |

### 3.5 Spacing Scale & Container Architecture
- **Canvas Frame Widths:**
  - Desktop Standard: `1363px` - `1366px` (About, Club Finder, Project, Blog)
  - Wide Desktop: `1517px` (Sign In Page)
- **Max Container Constraints:**
  - Standard Content Container: `1200px` centered (`Project Page`, `Blog Page`, `About Page` sections)
  - Wide Container: `1280px`
  - Auth Form Container: `448px` centered (`Sign In Page`)
  - Split Sidebar Panel: `505.4px` (Club Finder left panel) + `860.6px` (Club Finder right map)
- **Vertical Section Spacing:**
  - Section Top Padding: `100px` (Hero headers)
  - Section Bottom Padding: `48px` - `80px`
  - Intra-Section Gap: `32px` - `48px`
- **Component Spacings & Gaps:**
  - Card Internal Padding: `18px - 22px`
  - Button Padding: `8px 20px` (Primary Pill), `12px 24px` (Large CTA)
  - Grid Gaps: `10px` (Club cards), `16px` (Leadership cards), `24px` (Project & Blog grid)

---
## 4. Implementation Guidelines for Tailwind CSS & Codebase
```typescript
// Proposed tailwind.config.ts extension based on extracted Figma tokens
export const themeConfig = {
  extend: {
    colors: {
      rotaract: {
        crimson: '#981132',
        'crimson-dark': '#4A0818',
        'crimson-glow': '#A70C43',
        rose: '#D91B5C',
        coral: '#F87171',
        gold: '#D4A520',
      },
      surface: {
        darkest: '#080C14',
        card: '#0F1624',
        cream: '#F8F5F2',
        light: '#F8F5F4',
      },
      status: {
        online: '#22C55E',
        campus: '#8B3A7A',
        professional: '#981132',
        community: '#A70C43',
      }
    },
    borderRadius: {
      'card': '16px',
      'card-lg': '18px',
      'modal': '20px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    }
  }
};
```
