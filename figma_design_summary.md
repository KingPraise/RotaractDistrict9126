# Rotaract District 9126 — Comprehensive Design Tokens & Visual Specifications

> Deep inspection of Figma Design file `WpCwwHTvr6QqMrbSHCzJ7M` (Rotaract Project).
> Extracted frames: **Homepage Hero & Member Dashboard** (`5:7615`), **About Page Nav** (`2:263`), and **About Page Background & Sections** (`2:3`).

---

## 1. Executive Summary & Brand Identity

The Rotaract District 9126 design language is a **modern dark-mode luxury aesthetic** that blends Rotary International's heritage colors (Cranberry, Rose, Gold) with sleek glassmorphism, glowing radial gradients, crisp typography, and segmented card layouts.

- **Primary Brand Accent**: Rotary Cranberry / Rose (`#E11D48`, `#D91B5C`, `#981132`, `#BE123C`)
- **Secondary Brand Accent**: Rotary Gold / Warm Amber (`#D4A520`, `#FFC72C`, `#F59E0B`, `#FBBF24`)
- **Dark Foundation Surfaces**: Midnight Slate & Deep Navy (`#080C14`, `#0A0E1A`, `#0F1624`, `#0F172A`, `#1A1D2E`, `#1C1C1E`)
- **Success / Active State**: Emerald Green (`#10B981`, `#059669`)
- **Pending / Alert State**: Amber / Orange (`#F59E0B`)
- **Glassmorphism & Overlay**: Multi-stop alpha overlays `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.12)` with `backdrop-blur(16px)` and subtle borders.

---

## 2. Color Palette & Token Reference

### 2.1 Dark Surfaces & Card Backgrounds (Midnight Slate / Deep Navy)
| Hex Code | CSS RGBA | Occurrences | Sample Usages |
| :--- | :--- | :--- | :--- |
| `#1A1D2E` | `rgb(26, 29, 46)` | 225 | Vector (fill), Vector (fill) |
| `#1C1C1E99` | `rgba(28, 28, 30, 0.60)` | 54 | Vector (stroke: 1.1660916805267334px), Vector (stroke: 1.1660916805267334px) |
| `#1C1C1E66` | `rgba(28, 28, 30, 0.40)` | 36 | District 9126 (fill), Vector (stroke: 0.9157999753952026px) |
| `#1C1C1E` | `rgb(28, 28, 30)` | 20 | Rotaract (fill), Good morning, Tunde 👋 (fill) |
| `#080C1400` | `rgba(8, 12, 20, 0.00)` | 9 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#0F1624E5` | `rgba(15, 22, 36, 0.90)` | 9 | Overlay+Border+Shadow (fill), Overlay+Border+Shadow (fill) |
| `#080C14D9` | `rgba(8, 12, 20, 0.85)` | 9 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#080C141A` | `rgba(8, 12, 20, 0.10)` | 7 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#080C14F2` | `rgba(8, 12, 20, 0.95)` | 4 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#080C148C` | `rgba(8, 12, 20, 0.55)` | 4 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#111111` | `rgb(17, 17, 17)` | 3 | Background (fill), Gradient (gradient-stop) |
| `#080C14A6` | `rgba(8, 12, 20, 0.65)` | 3 | Gradient (gradient-stop), Gradient (gradient-stop) |

### 2.2 White & Translucent White Overlays
| Hex Code | CSS RGBA | Occurrences | Sample Usages |
| :--- | :--- | :--- | :--- |
| `#FFFFFF` | `rgb(255, 255, 255)` | 45 | MemberDashboard (fill), Help Centre (fill) |
| `#FFFFFF66` | `rgba(255, 255, 255, 0.40)` | 17 | Health Outreach · Oyo State (fill), Digital Skills Academy · Ibadan (fill) |
| `#FFFFFFB2` | `rgba(255, 255, 255, 0.70)` | 11 | Vector (stroke: 1.3333333730697632px), Our Impact (fill) |
| `#FFFFFF12` | `rgba(255, 255, 255, 0.07)` | 10 | Button (fill), Overlay+Border+Shadow (stroke: 1.0px) |
| `#FFFFFFA6` | `rgba(255, 255, 255, 0.65)` | 8 | Learn More (fill), Rotaract D9126 (fill) |
| `#FFFFFF08` | `rgba(255, 255, 255, 0.03)` | 6 | Vertical Divider (stroke: 0.0px), Vertical Divider (stroke: 0.0px) |
| `#FFFFFF4D` | `rgba(255, 255, 255, 0.30)` | 5 | Button (stroke: 1.111109972000122px), Card Holder (fill) |
| `#FFFFFF14` | `rgba(255, 255, 255, 0.08)` | 5 | Overlay+Border+Shadow (stroke: 1.0px), Overlay+Border+Shadow (stroke: 1.0px) |
| `#FFFFFFF2` | `rgba(255, 255, 255, 0.95)` | 4 | Vector (stroke: 1.1660916805267334px), Vector (stroke: 1.1660916805267334px) |
| `#FFFFFF26` | `rgba(255, 255, 255, 0.15)` | 4 | Text (stroke: 1.111109972000122px), Text (stroke: 1.111109972000122px) |
| `#FFFFFF01` | `rgba(255, 255, 255, 0.00)` | 4 | Overlay+Border+Shadow (fill), Overlay+Border+Shadow (fill) |
| `#FFFFFF00` | `rgba(255, 255, 255, 0.00)` | 4 | Gradient (gradient-stop), Gradient (gradient-stop) |

### 2.3 Primary Brand & Accents (Rotary Cranberry / Crimson / Rose / Violet)
| Hex Code | CSS RGBA | Occurrences | Sample Usages |
| :--- | :--- | :--- | :--- |
| `#981132` | `rgb(152, 17, 50)` | 24 | Button (fill), Container (fill) |
| `#D91B5C` | `rgb(217, 27, 92)` | 24 | Container (gradient-stop), Container (gradient-stop) |
| `#D91B5C00` | `rgba(217, 27, 92, 0.00)` | 10 | Horizontal Divider (gradient-stop), Gradient (gradient-stop) |
| `#A855F7` | `rgb(168, 85, 247)` | 4 | Container (gradient-stop), Container (gradient-stop) |
| `#98113200` | `rgba(152, 17, 50, 0.00)` | 3 | Container (gradient-stop), Container (gradient-stop) |
| `#A855F700` | `rgba(168, 85, 247, 0.00)` | 3 | Horizontal Divider (gradient-stop), Gradient (gradient-stop) |
| `#98113212` | `rgba(152, 17, 50, 0.07)` | 2 | Container (gradient-stop), Container (gradient-stop) |
| `#A855F70F` | `rgba(168, 85, 247, 0.06)` | 2 | ProfileCard (gradient-stop), Gradient (gradient-stop) |
| `#D91B5C12` | `rgba(217, 27, 92, 0.07)` | 2 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#D91B5C22` | `rgba(217, 27, 92, 0.13)` | 2 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#9811321A` | `rgba(152, 17, 50, 0.10)` | 1 | Button (fill) |
| `#9811324D` | `rgba(152, 17, 50, 0.30)` | 1 | Button (stroke: 1.111109972000122px) |

### 2.4 Black & Translucent Dark Overlays
| Hex Code | CSS RGBA | Occurrences | Sample Usages |
| :--- | :--- | :--- | :--- |
| `#00000014` | `rgba(0, 0, 0, 0.08)` | 22 | DashSidebar (stroke: 1.0px), Container (stroke: 1.0px) |
| `#0000000F` | `rgba(0, 0, 0, 0.06)` | 17 | Container (fill), Container (fill) |
| `#00000000` | `rgba(0, 0, 0, 0.00)` | 15 | Button (stroke: 1.111109972000122px), Button (stroke: 1.111109972000122px) |
| `#00000006` | `rgba(0, 0, 0, 0.02)` | 13 | Container (fill), Container (fill) |
| `#0000000A` | `rgba(0, 0, 0, 0.04)` | 12 | Button (fill), Button (fill) |
| `#000000` | `rgb(0, 0, 0)` | 7 | Members (fill), Projects (fill) |
| `#00000012` | `rgba(0, 0, 0, 0.07)` | 3 | Button (fill), Paragraph+VerticalBorder (stroke: 0.0px) |
| `#00000052` | `rgba(0, 0, 0, 0.32)` | 2 | Text (fill), Text (fill) |
| `#00000059` | `rgba(0, 0, 0, 0.35)` | 2 | Overlay+Border+OverlayBlur (fill), Overlay+Border+OverlayBlur (fill) |
| `#0000002E` | `rgba(0, 0, 0, 0.18)` | 2 | Overlay+Border (fill), Gradient (gradient-stop) |
| `#0000000D` | `rgba(0, 0, 0, 0.05)` | 1 | Button (fill) |
| `#00000017` | `rgba(0, 0, 0, 0.09)` | 1 | Background+HorizontalBorder+Shadow+OverlayBlur (stroke: 0.0px) |

### 2.5 Secondary Brand (Rotary Gold / Warm Amber / Accent)
| Hex Code | CSS RGBA | Occurrences | Sample Usages |
| :--- | :--- | :--- | :--- |
| `#D4A520` | `rgb(212, 165, 32)` | 9 | 22 hrs (fill), 3,200+ (fill) |

### 2.6 Neutral & Muted Slate / Grays
| Hex Code | CSS RGBA | Occurrences | Sample Usages |
| :--- | :--- | :--- | :--- |
| `#ECEEF5EB` | `rgba(236, 238, 245, 0.92)` | 6 | Oluwafemi Adeleke (fill), Tunde Adeyemi (fill) |
| `#64051EEB` | `rgba(100, 5, 30, 0.92)` | 4 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#64051E66` | `rgba(100, 5, 30, 0.40)` | 4 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#64051E00` | `rgba(100, 5, 30, 0.00)` | 4 | Gradient (gradient-stop), Gradient (gradient-stop) |
| `#F7A81B` | `rgb(247, 168, 27)` | 3 | Container (fill), Container (fill) |
| `#374151` | `rgb(55, 65, 81)` | 3 | Button → Clubs (fill), Button → Projects (fill) |
| `#F8F5F2` | `rgb(248, 245, 242)` | 2 | App (fill), Background (fill) |
| `#25D366` | `rgb(37, 211, 102)` | 2 | Vector (fill), Vector (fill) |
| `#F7A81B14` | `rgba(247, 168, 27, 0.08)` | 2 | Container (fill), Text (fill) |
| `#F4F1F0` | `rgb(244, 241, 240)` | 1 | DashSidebar (fill) |
| `#ECEEF5` | `rgb(236, 238, 245)` | 1 | Tunde Adeyemi (fill) |
| `#ECEEF56B` | `rgba(236, 238, 245, 0.42)` | 1 | Active Member (fill) |

### 2.7 Success & Active State (Emerald / Green)
| Hex Code | CSS RGBA | Occurrences | Sample Usages |
| :--- | :--- | :--- | :--- |
| `#22C55E` | `rgb(34, 197, 94)` | 4 | Container (fill), Registered (fill) |
| `#22C55E14` | `rgba(34, 197, 94, 0.08)` | 3 | Text (fill), Container (fill) |
| `#22C55E28` | `rgba(34, 197, 94, 0.16)` | 2 | Text (stroke: 1.111109972000122px), Text (stroke: 1.111109972000122px) |
| `#22C55E2E` | `rgba(34, 197, 94, 0.18)` | 1 | Container (fill) |
| `#22C55E61` | `rgba(34, 197, 94, 0.38)` | 1 | Container (stroke: 1.111109972000122px) |
| `#22C55EE5` | `rgba(34, 197, 94, 0.90)` | 1 | ACTIVE (fill) |
| `#22C55E25` | `rgba(34, 197, 94, 0.14)` | 1 | Container (stroke: 1.111109972000122px) |

### 2.8 Tech & Accent Colors (Navy Blue / Indigo / Slate Blue)
| Hex Code | CSS RGBA | Occurrences | Sample Usages |
| :--- | :--- | :--- | :--- |
| `#29325B` | `rgb(41, 50, 91)` | 1 | CompactMemberCard (gradient-stop) |

### 2.7 Gradients Reference
| Gradient Name | Type | CSS Definition | Usage Area |
| :--- | :--- | :--- | :--- |
| **Primary Rotary Gradient** | Linear | `linear-gradient(to right, #D91B5C, #E11D48, #F59E0B)` | CTA Buttons (`+ New Registration`, `Join a Club`) |
| **Digital Member ID Card** | Linear | `linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)` | Digital Membership Card (`5:7980`) |
| **Hero Ambient Glow Left** | Radial | `radial-gradient(circle, rgba(225, 29, 72, 0.18) 0%, rgba(15, 23, 42, 0) 70%)` | Background Glow Container (`5:7625`) |
| **Hero Ambient Glow Right** | Radial | `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 70%)` | Background Glow Container (`5:7626`) |
| **Card Bottom Dark Overlay** | Linear | `linear-gradient(to top, rgba(10, 14, 26, 0.95) 0%, rgba(10, 14, 26, 0.2) 60%, transparent 100%)` | Photo cards (Leadership, Impact, Projects) |
| **Gold Section Accent Divider** | Linear | `linear-gradient(to right, transparent, #FFC72C, transparent)` | Section tag dividers |

---

## 3. Typography Scale & Specifications

| Role / Level | Font Family | Size (px / rem) | Weight | Line Height | Letter Spacing | Sample Text |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero Title** | `Inter` | 109.30000305175781px (6.831rem) | 900 | 103.82px | -1.2px | "Fellowship. Service." |
| **Display / Hero Title** | `Inter` | 80.0px (5.0rem) | 400 | 80.0px | 0.0px | """ |
| **Display / Hero Title** | `Inter` | 64.0px (4.0rem) | 900 | 67.2px | 0.0px | "Join the Movement." |
| **Display / Hero Title** | `Inter` | 61.5px (3.844rem) | 900 | 67.62px | -1.2px | "Impact." |
| **Display / Hero Title** | `Inter` | 54.599998474121094px (3.412rem) | 900 | 54.64px | 0.0px | "3,200+" |
| **Display / Hero Title** | `Inter` | 54.599998474121094px (3.412rem) | 900 | 57.37px | 0.0px | "Powered by Purpose." |
| **Display / Hero Title** | `Inter` | 51.20000076293945px (3.2rem) | 900 | 53.76px | 0.0px | "Life in Rotaract" |
| **Display / Hero Title** | `Inter` | 47.79999923706055px (2.987rem) | 900 | 59.76px | 0.0px | "Impact in Motion" |
| **Heading 1** | `Inter` | 38.400001525878906px (2.4rem) | 900 | 44.16px | 0.0px | "Build the Future." |
| **Heading 1** | `Inter` | 35.20000076293945px (2.2rem) | 900 | 35.2px | 0.0px | "500+" |
| **Heading 1** | `Inter` | 34.20000076293945px (2.138rem) | 900 | 39.27px | 0.0px | "Driven by People." |
| **Heading 1** | `Inter` | 33.599998474121094px (2.1rem) | 800 | 36.96px | -0.67px | "Good morning, Tunde 👋" |
| **Heading 1** | `Inter` | 31.399999618530273px (1.962rem) | 700 | 32.99px | 0.0px | "is never ordinary." |
| **Heading 2** | `Inter` | 22.0px (1.375rem) | 800 | 26.4px | -0.44px | "Help Centre" |
| **Heading 2** | `Inter` | 20.0px (1.25rem) | 800 | 30.0px | 0.0px | "22 hrs" |
| **Heading 2** | `Inter` | 20.0px (1.25rem) | 400 | 20.0px | 0.0px | "✉" |
| **Heading 3 / Subheading** | `Inter` | 19.200000762939453px (1.2rem) | 400 | 31.2px | 0.0px | "Rotaract District 9126 unites thousands " |
| **Heading 3 / Subheading** | `Inter` | 18.399999618530273px (1.15rem) | 600 | 29.44px | 0.0px | "We believe the most powerful force for g" |
| **Heading 3 / Subheading** | `Inter` | 18.0px (1.125rem) | 700 | 22.5px | 0.0px | "Operation Vaccinate 500" |
| **Heading 3 / Subheading** | `Inter` | 17.600000381469727px (1.1rem) | 900 | 26.4px | 0.0px | "500" |
| **Heading 3 / Subheading** | `Inter` | 16.799999237060547px (1.05rem) | 400 | 27.3px | 0.0px | "District 9126 is a constellation of 47 R" |
| **Heading 3 / Subheading** | `Inter` | 16.799999237060547px (1.05rem) | 400 | 28.56px | 0.0px | "There is a Rotaract club near you. Find " |
| **Heading 3 / Subheading** | `Inter` | 16.0px (1.0rem) | 700 | 24.0px | 0.32px | "Discover More" |
| **Heading 3 / Subheading** | `Inter` | 16.0px (1.0rem) | 600 | 24.0px | 0.0px | "📅" |
| **Heading 3 / Subheading** | `Inter` | 16.0px (1.0rem) | 400 | 24.0px | 0.0px | "Real moments from across District 9126 —" |

---

## 4. Spacing, Padding & Border Radius Tokens

### Spacing & Item Gaps (`itemSpacing`)
- **Micro (2px - 6px)**: Icon + text spacing, badge internal gaps, mini pill badges.
- **Small (8px - 10px)**: Button icon/label spacing, navigation list item gaps.
- **Medium (12px - 16px)**: Card internal content vertical rhythm, form input padding, sidebar item padding.
- **Large (20px - 24px)**: Card group gaps, right panel widget padding, section inner container padding.
- **X-Large (32px - 64px)**: Major section gaps, hero split column gaps, footer column gaps.

### Border Radii (`cornerRadius`)
| Token Name | Value | Usages in UI |
| :--- | :--- | :--- |
| `rounded-xs` | `2px` - `3px` | Tiny active bar indicators, divider accents |
| `rounded-sm` | `4px` - `6px` | Tag badges (`ACTIVE`, `Pending`), segmented progress bars |
| `rounded-md` | `8px` - `10px` | Small action buttons, icon containers, quick action buttons |
| `rounded-lg` | `12px` - `14px` | Secondary buttons, dropdowns, search input container |
| `rounded-xl` | `16px` | Support channel cards, FAQ accordion items, profile cards |
| `rounded-2xl` | `20px` - `24px` | Digital ID Card, Leadership photo cards, Flagship project cards |
| `rounded-full` | `9999px` | User avatars, primary pill CTA buttons (`Join a Club`, `Find Your Club`) |

---

## 5. Component Deep Dive: Navigation Bar (`2:263`)

- **Container**: `1363px x 60px`, fixed/sticky at top, `z-50`.
- **Background**: `rgba(10, 14, 26, 0.75)` with `backdrop-filter: blur(16px)`.
- **Border**: `border-b border-white/10` (`rgba(255, 255, 255, 0.08)`).
- **Shadow**: `0px 4px 20px -2px rgba(0, 0, 0, 0.4)`.
- **Layout**: Horizontal flex, `justify-between`, `items-center`, `px-8` (32px padding).

### Sub-elements:
1. **Brand Logo** (`2:265`):
   - Rotaract Emblem image (`36x36px`).
   - Text: `Rotaract` (13px, font-bold, tracking-wide, `#FFFFFF`).
   - Subtext: `District 9126` (9px, font-medium, `#FFC72C` Rotary Gold).
2. **Nav Links** (`2:269` - `2:274`):
   - Items: `About` (Active), `Clubs`, `Projects`, `Blog`.
   - Typography: 14px, font-medium, color `#E2E8F0` (inactive: `rgba(255, 255, 255, 0.7)`).
   - Active Indicator: Horizontal bar below `About` (`38.7px x 2.5px`, fill `#E11D48`, rounded).
3. **Actions** (`2:275` - `2:280`):
   - `Sign In`: Ghost button, 14px font, `text-white/80 hover:text-white`.
   - `Join a Club`: Primary pill button (`118.8px x 34px`), gradient background `#D91B5C` -> `#E11D48`, white text (13px bold), right icon circle (`22x22px` overlay with arrow vector).

---

## 6. Component Deep Dive: Homepage Hero & Dashboard (`5:7615`)

### 6.1 Layout Overview
- Total Frame Dimensions: `1517px x 654px`.
- Background: `#0B0F19` with ambient radial glows (`5:7625` left rose glow, `5:7626` right cyan glow).
- 2-Column Grid / Flex:
  - **Left Sidebar** (`5:7628`): `210px` width, fixed height.
  - **Dashboard Content** (`5:7830`): `1308px` width, containing Header + 2-Column Body (Help Center `1036px` + Right Panel `272px`).

### 6.2 Sidebar (`5:7628`)
- **Header**: Rotaract D9126 logo (`32x32px`) + collapse toggle button (`23x23px`).
- **Navigation Sections**:
  - `MAIN`: Dashboard, Identity Card, Events, Projects, Dues & Payments, Directory.
  - `FEATURES`: Club Reports, Analytics.
  - `TOOLS`: Settings, Help Centre (Highlighted active with `#E11D48` indicator).
- **Item Style**: `193px x 36px`, rounded-lg (`8px`), 14px text, 14x14px vector icons, hover fill `rgba(255, 255, 255, 0.05)`.
- **Executive CTA Card** (`5:7783`):
  - Background: Gradient card (`189px x 110px`, rounded-xl, `#1E293B` to `#0F172A`).
  - Heading: `Become an Exec!` (14px font-bold, text-white).
  - Subtext: `Elevate your role and lead your club forward this season.` (11px, text-slate-300).
  - Actions: `Apply Now` (Primary gradient button) + `Learn More` (Ghost button).
- **User Profile Card** (`5:7803`):
  - Name: `Tunde Adeyemi` (13px font-semibold).
  - Role: `Active Member` (11px text-emerald-400).
  - Avatar: `41x41px` circle photo with active ring indicator.
  - Sign Out button (`5:7819`): `text-rose-400 hover:text-rose-300` with exit icon.

### 6.3 Dashboard Header (`5:7831`)
- Greeting: `Good morning, Tunde 👋` (28px font-bold, tracking-tight).
- Date: `Saturday, 15 August 2026` (13px, font-medium, text-slate-400).
- Buttons:
  - `Manage Events`: `131px x 33px`, outline style (`border border-slate-700 bg-slate-800/60 text-slate-200`).
  - `Export`: `85px x 33px`, outline style (`border border-slate-700 bg-slate-800/60 text-slate-200`).
  - `+ New Registration`: `181px x 38px`, primary gradient button (`linear-gradient(to right, #D91B5C, #F59E0B)` with rounded-lg, shadow).
  - Notification icon button: `34x34px` with badge dot (`6x6px #EF4444`).
  - User avatar thumbnail: `36x36px` circle with gold/rose border.

### 6.4 Help Centre & FAQ Section (`5:7871`)
- Section Header: `Support` tag + `Help Centre` title (22px font-bold).
- **Support Cards Grid** (2 Columns, each `491px x 65px`):
  1. `Email support` -> `support@rotaract9126.org` (with ✉ mail icon).
  2. `WhatsApp group` -> `Join D9126 Members Group` (with WhatsApp logo icon).
  - Style: `bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center gap-4`.
- **FAQ Accordion List** (`5:7909`):
  - 6 expandable question cards (`990px x 46px` each, rounded-lg, `bg-slate-900/50 border border-slate-800/80 mb-2`):
    1. *How do I pay my dues?*
    2. *How do I register for an event?*
    3. *What is my membership tier?*
    4. *How do I update my profile photo?*
    5. *Can I switch clubs?*
    6. *How are impact points calculated?*

### 6.5 Right Panel Widgets (`5:7955`)
1. **Search Input** (`5:7957`): `239px x 35px`, `bg-slate-900 border border-slate-700/60 rounded-lg`, search icon + text `Search anything...`.
2. **Member Filter Tabs** (`5:7967`): Segmented pill toggle (`Active` pill `#E11D48` vs `Alumni` ghost) + `+ Register` CTA button.
3. **Digital Member ID Card** (`5:7980`):
   - Dimensions: `238.9px x 168px` (aspect ratio ~1.42).
   - Background: Dark violet gradient `linear-gradient(135deg, #1E1B4B, #312E81, #4338CA)` + subtle micro-pattern.
   - Header: Rotaract D9126 logo + `ACTIVE` badge (`#10B981` emerald pill).
   - Card Number: `**** **** **** 0847` (monospaced tracking-widest).
   - Cardholder: `Tunde Adeyemi` | Exp: `08/27`.
   - QR Code: `58.5x58.5px` high-precision vector QR code component.
4. **Quick Actions Grid** (`5:8243`):
   - 4 action tiles: `📅 Register Event`, `💳 Pay Dues`, `👥 Invite Member`, `⚙️ More`.
   - Style: `55px x 70px`, `bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col items-center justify-center`.
5. **Volunteer Hours Goal Progress** (`5:8273`):
   - Header: `Volunteer Hours Goal`.
   - Metric: `22 hrs` (24px font-bold text-white) `of 50 hr goal` (12px text-slate-400).
   - Segmented Bar: 10-step progress pill bar (`4 filled #E11D48`, `6 empty #334155`).
   - Legend: Club Events (40%), District Proj (30%), Comm. Service (20%), Training (10%).
6. **Upcoming Events Widget** (`5:8327`):
   - Header: `Upcoming Events` + calendar action icon.
   - Event Items:
     - `District Leadership Summit` · Aug 5 -> `[Registered]` (`#10B981` pill).
     - `Ibadan Blood Donation Drive` · Aug 12 -> `[Registered]` (`#10B981` pill).
     - `Q3 Dues Deadline` · Aug 31 -> `[Pending]` (`#F59E0B` amber pill).
   - Footer: `View All` full-width button (`border border-slate-800 rounded-lg py-1.5`).

---

## 7. Component Deep Dive: About Page Sections (`2:3`)

### 7.1 Section 1: Hero Section (`2:4`)
- Dimensions: `1364px x 786px`.
- Background: Multi-layer image carousel + dark linear overlay + radial gradient glow.
- Heading: `Fellowship. Service.` (96px font-black text-white) + `Impact.` (96px font-black gradient `#E11D48` to `#FFC72C`).
- Subtitle: `Rotaract District 9126 unites thousands of young leaders across Ondo, Ekiti, Osun, Oyo, Kogi, Niger, and Kwara in a relentless pursuit of community transformation — from grassroots action to global connection.` (18px, font-normal, text-slate-200).
- CTAs: `Discover More` (Primary pill button with arrow circle) + `Our Impact` (Ghost outline button with play/sparkle icon).
- **Stats Counter Float Card** (`2:36`):
  - Dimensions: `1105px x 127px`, floating at hero bottom.
  - Style: `bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-around`.
  - Counters:
    - `3,200+` Members (48px font-bold text-white + 14px label text-slate-400).
    - `180+` Projects (48px font-bold text-white + 14px label text-slate-400).
    - `50,000+` Beneficiaries (48px font-bold text-white + 14px label text-slate-400).

### 7.2 Section 2: Live from the Field / Impact in Motion (`2:54`)
- Dimensions: `1364px x 866px`.
- Tag: `Live from the Field` with gold linear divider line.
- Heading: `Impact in Motion` (44px font-bold).
- Description: `Real moments from across District 9126 — seven states, one movement, measured in lives changed.`
- **Card Carousel Grid** (4 portrait photo cards, each `320px x 427px`, rounded-2xl, border border-white/10, shadow-xl):
  1. **Children Vaccinated**: `500+` metric gradient, `Children Vaccinated`, `Health Outreach · Oyo State`.
  2. **Youth Trained**: `2,400` metric gradient, `Youth Trained`, `Digital Skills Academy · Ibadan`.
  3. **7 States United**: `47 Clubs` metric gradient, `7 States United`, `Ondo · Ekiti · Osun · Oyo · Kogi · Niger · Kwara`.
  4. **Rotaractors United**: `400+` metric gradient, `Rotaractors United`, `District Leadership Summit 2026`.

### 7.3 Section 3: Who We Are (`2:90`)
- Heading: `Powered by Purpose.` (48px font-black) + `Driven by People.` (48px font-black gradient).
- Blockquote Box (`2:99`):
  - Giant quote mark `"` (64px `#E11D48`).
  - Quote text: `We believe the most powerful force for good in any community is a young person who has been trusted with responsibility and equipped to lead.` (20px font-medium italic).
  - Citation: `— D9126 Founding Charter, 2009` (13px font-semibold text-slate-400).
- Photo mosaic gallery: 3 cards (`390px x 293px` each with rounded-xl).

### 7.4 Section 4: Experience the District (`2:111`)
- Heading: `Life in Rotaract is never ordinary.` (44px font-bold).
- 4 Pillar Cards (`289px x 434px` each, full-height image background with dark bottom gradient):
  1. `Club Life`: Weekly meetings, new friendships, and a community that shows up.
  2. `Community Service`: Hands-on impact — boreholes, vaccines, classrooms, meals.
  3. `Leadership Training`: Workshops, summits, and mentorships that sharpen the next generation.
  4. `District Events`: Conferences, award nights, and district-wide celebrations of impact.
- CTA: `Find Your Club` pill button (`178.5px x 48px`).

### 7.5 Section 5: Executive Council Leadership (`2:142`)
- Heading: `Meet the Leadership` (44px font-bold).
- Subtitle: `The District 9126 executive council driving impact across seven Nigerian states`.
- 6 Leader Profile Cards (`184px x 320px` each, rounded-2xl, border border-white/10):
  1. **Oluwafemi Adeleke** — *District Rotaract Representative*
  2. **Tunde Adeyemi** — *District Rotaract Co- Representative*
  3. **Chukwuemeka Obi** — *Director of Service Projects*
  4. **Folake Adesanya** — *Director of Finance*
  5. **Babajide Olawale** — *Director of Membership*
  6. **Adaeze Nwosu** — *Director of Marketing & Comms*

### 7.6 Section 6: Flagship Projects (`2:186`)
- Heading: `Where Action Meets Impact` (44px font-bold) + `View All Projects` arrow link.
- 3 Project Cards (`385px x 323px` each, top photo `224px` + bottom glassmorphism info overlay `97px`):
  1. **Operation Vaccinate 500** · *Ogbomoso, Oyo State* -> `500 Children Vaccinated`.
  2. **Clean Water for Offa** · *Offa, Kwara State* -> `2 Boreholes Constructed`.
  3. **Digital Skills Academy** · *Ibadan, Oyo State* -> `2,400 Youth Trained`.

### 7.7 Section 7: Call to Action Banner (`2:232`)
- Heading: `Join the Movement. Build the Future.` (54px font-black).
- Description: `There is a Rotaract club near you. Find your community, step into your purpose, and become part of a global network of changemakers.` (16px font-normal).
- Buttons: `Find a Club Near You` (Primary pill button `229px x 58px`) + `Explore Our Impact` (Outline pill button `215px x 58px`).

### 7.8 Section 8: Footer (`2:246`)
- Top Border: `border-t border-white/10` with gradient line.
- Left: Rotaract District 9126 logo.
- Navigation: `Homepage`, `Clubs`, `Projects`, `Blog` | Divider | `Privacy`, `Terms`, `Contact`.
- Right / Bottom: `© 2024–25 Rotaract District 9126`.

---

## 8. Tailwind CSS Configuration Snippet

To implement this exact design system in Tailwind CSS / React, use the following theme extensions:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rotaract: {
          primary: '#E11D48',      // Main Cranberry Rose
          dark: '#D91B5C',         // Deep Cranberry
          gold: '#FFC72C',         // Rotary Gold
          amber: '#F59E0B',        // Warm Amber
          navy: '#0A0E1A',         // Ultra-dark background
          surface: '#0F172A',      // Card & sidebar surface
          surfaceHover: '#1E293B', // Interactive surface hover
          cardBorder: 'rgba(255, 255, 255, 0.08)',
          subtleText: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'rotaract-grad': 'linear-gradient(135deg, #D91B5C 0%, #E11D48 50%, #F59E0B 100%)',
        'rotaract-card': 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
        'ambient-glow-rose': 'radial-gradient(circle at 30% 30%, rgba(225, 29, 72, 0.15) 0%, rgba(10, 14, 26, 0) 70%)',
        'ambient-glow-blue': 'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.12) 0%, rgba(10, 14, 26, 0) 70%)'
      },
      boxShadow: {
        'rotaract-glow': '0 0 25px -5px rgba(225, 29, 72, 0.3)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px'
      }
    }
  }
};
```
