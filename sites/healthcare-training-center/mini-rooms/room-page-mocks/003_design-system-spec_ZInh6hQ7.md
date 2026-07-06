# Healthcare Training Center — Design System Spec
**Version 1.0 | Status: Draft for Review**

---

## 1. Brand Foundation

### 1.1 Brand Identity

**Name:** Healthcare Training Center
**Tagline (primary):** Learn. Grow. Make a Difference.
**Tagline (secondary):** Empowering Knowledge. Enhancing Care. Building a Better Future.

### 1.2 Additional Tagline Options (For Review)

These are alternatives and variations to consider — some can serve as a primary tagline, others work well as sub-headlines or section copy.

**Short & Punchy (primary tagline candidates)**
- "Step Inside. Step Up." — plays directly on the room-entry metaphor
- "Enter. Learn. Lead." — three beats, mirrors the room concept
- "Where Better Care Begins." — simple, patient-first, no jargon
- "Built by a Lawyer. Designed for People." — differentiates her immediately; her story is the brand

**Benefit-Driven**
- "Train With Purpose. Care With Confidence." — outcome-focused, professional
- "Knowledge That Protects. Training That Transforms." — speaks to legal compliance + the human mission
- "Five Rooms. One Mission. Better Healthcare." — describes the product and the why in one line
- "The Training Every Healthcare Worker Deserves." — nods to the room concept, patient-forward

**Warm & Welcoming (works well in the Lobby/onboarding)**
- "Your Path to Better Care Starts Here." — lobby screen welcome copy
- "Where Healthcare Teams Get It Right." — confidence without arrogance
- "Come In. We've Been Expecting You." — inviting, plays on the storefront entry experience

> **Recommendation:** Use "Step Inside. Step Up." as the primary tagline — it directly echoes the storefront/room UI and is memorable. Keep "Learn. Grow. Make a Difference." as the mission statement shown inside the app. Use "Empowering Knowledge. Enhancing Care. Building a Better Future." in the footer and certificates.

**Brand Positioning:**
A people-first training platform for healthcare professionals and organizations. Not cold or clinical — warm, credible, and empowering. The brand says: "This system is broken, but *you* can be the change in it."

**Brand Personality:**
- Trustworthy — credentialed, legally sound, professionally authoritative
- Warm — patient-centered, human, never condescending
- Empowering — learners leave more capable than when they arrived
- Clear — no jargon, no confusion, no bureaucratic language

**Core Promise:**
Healthcare professionals who complete training here treat people better — not because the law says they have to, but because they understand why it matters.

---

## 2. Color System

### 2.1 Primary Palette (Confirmed Direction)

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-navy` | Deep Navy | `#1E3A6E` | Primary brand, nav backgrounds, hero sections, headings |
| `--color-teal` | Teal | `#2B8FA9` | Secondary brand, interactive states, links, highlights |
| `--color-white` | White | `#FFFFFF` | Card backgrounds, content areas |
| `--color-surface` | Surface Gray | `#F4F6F9` | Page backgrounds, inactive states |
| `--color-border` | Border | `#D0D8E8` | Dividers, input borders |

### 2.2 Training Track Colors
Each of the 5 training rooms has its own accent color. These are used consistently on room cards, room headers, icons, progress bars, and certificates.

| Room | Token | Name | Hex | Rationale |
|---|---|---|---|---|
| 1 — Customer Service | `--color-room-cs` | Sky Blue | `#3B7DD8` | Approachable, communication-forward |
| 2 — HIPAA / Privacy & Security | `--color-room-hipaa` | Teal Green | `#2BA89A` | Trust, protection, security |
| 3 — Compliance | `--color-room-compliance` | Emerald | `#2EAA6E` | Go/approved, integrity, standards |
| 4 — Medical Records | `--color-room-records` | Indigo | `#7B5EA7` | Precision, depth, documentation |
| 5 — Finance | `--color-room-finance` | Amber | `#D4A017` | Value, accountability, revenue |

### 2.3 Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#28A745` | Completion states, passing scores, certificates issued |
| `--color-warning` | `#FFC107` | Upcoming deadlines, incomplete modules |
| `--color-error` | `#DC3545` | Failed assessments, required field errors |
| `--color-info` | `#17A2B8` | Announcements, tooltips, live class indicators |

### 2.4 Alternate Palette Options (For Review)

**Option A — "Compassionate Authority"**
Keeps the navy authority but swaps teal for a warmer slate blue. Feels more like a trusted law firm that cares.
- Primary Navy: `#1B3A5C`
- Accent Blue: `#4A7CB5`
- Warm Cream: `#FAF7F2`
- Sage Green: `#5B9A73`
- Muted Gold: `#C8971F`

**Option B — "Modern Care"**
Lighter, more modern. Feels closer to a consumer health app. Better if the audience skews younger.
- Charcoal: `#1F2937`
- Electric Teal: `#0891B2`
- Light Surface: `#F8FAFC`
- Soft Green: `#10B981`
- Lavender: `#818CF8`

**Option C — "Warm & Trustworthy"**
The warmest option. Still professional but more approachable — closer to a teaching hospital than a law office.
- Deep Forest: `#1A4731`
- Warm Teal: `#2D9B8A`
- Cream White: `#FDFAF5`
- Coral: `#E07B54` (for CTAs)
- Slate: `#475569`

> **Recommendation:** Stick with the confirmed navy/teal direction but reference Option A's warm cream `#FAF7F2` for page backgrounds instead of cool gray. The warmth signals "people-first" without losing professionalism.

---

## 3. Typography

### 3.1 Type Scale

**Heading Font:** Montserrat (Google Fonts — free)
- Authoritative, geometric, modern. Used in healthcare and legal contexts widely.
- Weights in use: ExtraBold (800), Bold (700), SemiBold (600)

**Body Font:** Inter (Google Fonts — free)
- Designed for screen readability. Exceptional at small sizes. Industry standard for UI.
- Weights in use: Regular (400), Medium (500), SemiBold (600)

**Accent Font (optional for certificates/badges):** Playfair Display
- Classic serif, signals credibility and achievement. Use only for certification display names.

### 3.2 Type Scale Tokens

| Token | Size | Weight | Font | Usage |
|---|---|---|---|---|
| `--text-display` | 48px / 3rem | ExtraBold | Montserrat | Hero headlines |
| `--text-h1` | 36px / 2.25rem | Bold | Montserrat | Page titles |
| `--text-h2` | 28px / 1.75rem | Bold | Montserrat | Section headers |
| `--text-h3` | 22px / 1.375rem | SemiBold | Montserrat | Card titles, room names |
| `--text-h4` | 18px / 1.125rem | SemiBold | Montserrat | Sub-headers |
| `--text-body-lg` | 18px / 1.125rem | Regular | Inter | Intro paragraphs |
| `--text-body` | 16px / 1rem | Regular | Inter | Default body copy |
| `--text-body-sm` | 14px / 0.875rem | Regular | Inter | Secondary copy, captions |
| `--text-label` | 12px / 0.75rem | SemiBold | Inter | Tags, badges, labels |
| `--text-ui` | 14px / 0.875rem | Medium | Inter | Buttons, nav, form inputs |

### 3.3 Line Height

- Headings: 1.2
- Body copy: 1.6
- UI elements: 1.4

---

## 4. Spacing System

Base unit: **8px**

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Micro gaps, icon padding |
| `--space-2` | 8px | Tight component padding |
| `--space-3` | 12px | Compact layouts |
| `--space-4` | 16px | Default padding |
| `--space-5` | 24px | Card padding, section gaps |
| `--space-6` | 32px | Component separation |
| `--space-7` | 48px | Section breaks |
| `--space-8` | 64px | Hero padding, major sections |
| `--space-9` | 96px | Page-level vertical rhythm |

---

## 5. Elevation & Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Subtle card lift |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.10)` | Room cards, modals |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.14)` | Floating panels, drawers |
| `--shadow-focus` | `0 0 0 3px rgba(43,143,169,0.35)` | Keyboard focus ring (teal) |

---

## 6. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Badges, tags, small inputs |
| `--radius-md` | 8px | Cards, buttons, modals |
| `--radius-lg` | 16px | Room cards, feature panels |
| `--radius-xl` | 24px | Hero cards, lobby tiles |
| `--radius-full` | 9999px | Avatars, pills, progress bars |

---

## 7. Component Library

### 7.1 Navigation

**Primary Nav (authenticated)**
- Logo left — "Healthcare Training Center" wordmark in Montserrat ExtraBold
- Nav links: Lobby | My Progress | Live Classes | Study Lounge | Resources
- Right side: notifications bell, user avatar + name, logout
- Background: `--color-navy`
- Active state: teal underline + slightly lighter background

**Mobile Nav**
- Hamburger menu collapses to bottom tab bar on mobile
- Bottom tabs: Home | My Progress | Classes | Profile

### 7.2 The Storefront & Room-Entry System (Core UI Pattern)

This is the defining interaction of the entire product. The platform is structured as a virtual building — users arrive at a lobby (storefront front door), see the rooms available to them, and click to enter one. Once inside, the entire UI changes to reflect that room's subject and color identity.

---

**The Lobby (Storefront Exterior)**

The lobby is what users see immediately after login. Think of it as looking at the front of a building with five departments visible through the windows.

- Background: `--color-surface` (warm light gray or cream)
- "Choose Your Training Path" heading centered above the room grid
- 5 room entry cards displayed in a grid (3-2 or 2-3 on desktop, 1-col on mobile)
- No sidebar clutter — the rooms are the focus

**Room Entry Cards (Lobby view)**

Each card is a visual "door" into a training room:
- Full-color header band in room's accent color (about 40% of card height)
- Large room icon centered in the header (white SVG on color)
- Room number badge: small pill top-left ("Room 1", "Room 2", etc.)
- Room name: `--text-h3` Montserrat Bold, below header
- One-line description: what this room covers
- Progress bar: shows completion if started
- "Enter Room →" CTA button in room's accent color
- Hover state: subtle scale(1.02) + deeper shadow + accent color brightens slightly — feels like a door is being opened

**States:**
- Default: card with `--shadow-sm`
- Hover: `--shadow-md`, scale(1.02), color brightens
- Active/In Progress: progress bar visible, "Continue →" CTA
- Completed: green "✓ Complete" badge in top-right corner, "Review →" CTA
- Locked (B2B restriction): card grayed out, lock icon overlay, tooltip "Ask your admin to unlock"

---

**Entering a Room (The Transition)**

When a user clicks "Enter Room," they transition into that room's immersive space. This is a full-page context switch — not a modal or drawer.

- Page-level transition: 250ms fade + slight upward slide (like stepping through a door)
- The entire page shifts to that room's color identity:
  - Top nav accent bar changes to room color
  - Page header is a full-width banner in room's accent color
  - All buttons, progress bars, and highlights use room's accent color
  - Breadcrumb shows: Lobby > Room Name
- The user knows exactly where they are at all times

**Inside a Room — Layout:**
- Top: Full-width room banner (accent color bg, white text)
  - Room icon large, room number, room name, tagline
  - Your progress: "X of Y courses complete" + progress bar
  - "← Back to Lobby" link top-left
- Body: Course grid — all courses available in this room
- Sidebar (desktop): "Why this matters" — 2-3 sentences about the real-world stakes of this subject, written from a patient-advocacy lens
- Footer strip inside room: "Got questions? Ask in the [Room Name] Forum →"

**Leaving a Room**

Users return to the Lobby via:
- "← Back to Lobby" breadcrumb link
- Clicking the logo
- Bottom tab "Home" on mobile

The transition reverses — fade back to the neutral lobby. The room card they came from now reflects updated progress.

### 7.3 Course Cards

Used inside each room to display individual courses.

- Thumbnail or subject illustration (top)
- Course title: `--text-h4`
- Duration + difficulty badge
- Progress ring (if started)
- Completion checkmark (if done)
- "Start" / "Continue" / "Review" button

### 7.4 Buttons

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| Primary | `--color-navy` | White | None | Main CTAs |
| Secondary | `--color-teal` | White | None | Secondary actions |
| Outline | Transparent | `--color-navy` | 2px navy | Tertiary actions |
| Track (dynamic) | Room accent color | White | None | Room-specific CTAs |
| Ghost | Transparent | `--color-teal` | None | Subtle links |
| Danger | `--color-error` | White | None | Destructive actions |

**Button sizing:**
- Large: 48px height, 24px horizontal padding — hero CTAs
- Default: 40px height, 20px horizontal padding — most UI
- Small: 32px height, 16px horizontal padding — inline actions

### 7.5 Progress Indicators

**Linear Progress Bar**
- Track: `--color-border`
- Fill: room accent color or `--color-success`
- Height: 6px, `--radius-full`
- Shows percentage as label: "18 of 24 courses"

**Circular Progress Ring**
- Used on the main dashboard
- Large format (120px) shows overall platform progress
- Smaller (40px) used on individual course cards

**Badge System**
- Completion badges are circular, 80px
- Icon + room color background
- Earnable badges: "First Day", "Fast Learner", "Compliance Pro", etc.
- Displayed on user profile and dashboard

### 7.6 Help Desk Widget

- Fixed bottom-right on all authenticated pages
- Default state: chat bubble icon in `--color-teal`
- Expanded: chat panel slides up, 320px wide
- Shows: "Hi! We're here to help you succeed."
- Live chat indicator: green dot if staff online
- Falls back to email form when offline

### 7.7 Announcement Banner

- Full-width below primary nav
- Background: `--color-info` or room accent if course-specific
- Dismiss X on right
- Used for new course announcements, upcoming live sessions

### 7.8 Form Inputs

- Height: 44px (minimum touch target)
- Border: 1px `--color-border`, `--radius-md`
- Focus: `--shadow-focus` (teal ring)
- Error: red border + error message below
- Label above field, never inside (accessibility)

### 7.9 Data Display — Progress Table

Used in B2B admin portal and My Progress view.

- Sortable columns
- Row hover: light navy tint
- Completion column: colored pill (In Progress / Completed / Not Started)
- Export button (CSV) top right

---

## 8. Page Templates

### 8.1 Marketing / Landing Page

**Sections (top to bottom):**
1. Nav — logo, "Log In" + "Start Free Trial" CTAs
2. Hero — headline, tagline, "Choose Your Training Path" button, hero illustration
3. 5 Training Tracks — horizontal card row or grid
4. Why This Exists — founder story (your mom's story), patient-first mission
5. Who It's For — two paths: Organizations / Individuals
6. Features — Live & On-Demand, Simulations, Certificates, Mobile Friendly
7. Testimonials / Social Proof
8. Pricing (B2B org plans + B2C individual plan)
9. Footer — nav links, legal disclaimer, copyright

### 8.2 Lobby / Dashboard (The "Reception Area")

This is the main screen after login. It mirrors the reception area concept from the images.

**Layout:**
- Top: "Welcome back, [Name]" + overall progress ring
- Center: "Choose Your Training Path" — 5 room cards in a responsive grid (3-2 or 2-3 on desktop, 1-col on mobile)
- Right sidebar (desktop): Live class today, Announcements, Upcoming events
- Bottom strip: Quick links — Study Lounge, Resource Center, Live Classrooms, Support

### 8.3 Individual Training Room (Inside the Room)

The user has clicked "Enter Room" and is now inside. This page IS the room — the full UI reflects the room's identity, not generic platform chrome.

**Visual identity shift (from Lobby → Room):**
- Nav accent bar: switches from navy to room accent color
- Page background: very light tint of room color (5% opacity) — subtle but present
- All interactive elements (buttons, links, progress fill) use room accent color
- Breadcrumb: "Lobby → [Room Name]"

**Layout:**
- Full-width hero banner (room accent color background)
  - Large room icon (left), Room number + name (center), Progress summary (right)
  - "X of Y courses complete" + progress bar in white
- Course grid below banner: 3-col (desktop), 2-col (tablet), 1-col (mobile)
- Right sidebar (desktop only):
  - "Why This Room Matters" — patient-advocacy context written by your mom
  - Upcoming live session for this topic (if scheduled)
  - Link to this room's discussion forum
- Sticky "Ask a Question" button bottom-right (room-colored, links to topic forum)

### 8.4 Course / Lesson Page

- Video player or reading panel (top)
- Module navigation sidebar (collapsible)
- Notes panel (user can take personal notes)
- Quiz/assessment at end of module
- "Mark Complete" button
- Next lesson button

### 8.5 My Progress Dashboard

- Overall completion ring + stats
- Room-by-room breakdown (bar chart per room)
- Badges earned
- Certificates available to download/share
- Activity feed: "Completed X on [date]"

### 8.6 B2B Admin Portal

For organizations managing employee training.

- Team roster with progress per member
- Assign training paths to employees
- Set deadlines + send reminders
- Download compliance reports (critical for legal/audit purposes)
- Billing + seat management

---

## 9. Navigation Architecture

```
Public (Unauthenticated)
├── Landing Page
├── About / Our Story
├── Pricing
├── Login
└── Sign Up (Individual or Organization)

App (Authenticated — Individual Learner)
├── Lobby (Home Dashboard)
│   ├── Room 1: Customer Service
│   │   └── Courses (list + individual lesson pages)
│   ├── Room 2: HIPAA Privacy & Security
│   ├── Room 3: Compliance
│   ├── Room 4: Medical Records
│   └── Room 5: Finance
├── My Progress
│   ├── Badges & Certificates
│   └── Activity History
├── Live Classrooms
│   ├── Upcoming Sessions
│   └── Join Live Class
├── Study Lounge
│   ├── Discussion Forums (by topic)
│   ├── Peer Networking
│   └── Group Study Sessions
├── Resource Center
│   ├── Tools & Templates
│   ├── Policies & FAQs
│   └── Job Aids
└── Profile & Settings

App (Authenticated — B2B Admin)
├── All of the above (as a learner)
└── Admin Portal
    ├── Team Roster
    ├── Assign Training
    ├── Compliance Reports
    └── Billing & Seats
```

---

## 10. Responsive Breakpoints

| Token | Width | Description |
|---|---|---|
| `--bp-mobile` | 375px | Base — single column, bottom nav |
| `--bp-tablet` | 768px | 2-column grid, side nav visible |
| `--bp-laptop` | 1024px | Full layout, sidebar active |
| `--bp-desktop` | 1280px | Standard desktop target |
| `--bp-wide` | 1440px | Max content width, centered |

**Mobile-first principle:** All components are designed for 375px first, then expanded. This matters because healthcare workers may access training on their phones between shifts.

---

## 11. Iconography

**Icon library:** Phosphor Icons (free, open source, consistent with the weight of the brand)

**Per-room icons (confirmed):**
- Customer Service: `users` or `chat-circle`
- HIPAA / Privacy: `shield-check`
- Compliance: `clipboard-text`
- Medical Records: `folder-open`
- Finance: `currency-dollar`

**General UI icons:**
- Progress: `chart-bar`
- Certificate: `certificate`
- Live class: `video-camera`
- Study lounge: `books`
- Resource center: `archive`
- Help desk: `headset`
- Badge: `medal`

---

## 12. Accessibility Requirements

All components must meet **WCAG 2.1 AA** minimum. Healthcare platforms may face legal scrutiny — accessibility is non-negotiable.

**Key rules:**
- Color contrast: 4.5:1 for body text, 3:1 for large text and UI components
- All interactive elements have visible focus states (`--shadow-focus`)
- All images have descriptive alt text
- All form inputs have associated labels (no placeholder-only labeling)
- Videos include captions (required for HIPAA training content)
- Touch targets minimum 44x44px
- Keyboard navigation supported throughout
- Screen reader compatible (ARIA roles on all dynamic components)

---

## 13. Motion & Animation

**Guiding principle:** Purposeful, never decorative. Motion signals state change — not personality.

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `--motion-fast` | 100ms | ease-out | Button hover, icon states |
| `--motion-base` | 200ms | ease-in-out | Panel open/close, tab switches |
| `--motion-slow` | 350ms | ease-in-out | Page transitions, modal entrance |
| `--motion-spring` | 400ms | spring(1, 0.5) | Progress bar fill, badge unlock |

**Reduce motion:** Always respect `prefers-reduced-motion`. When set, disable all transitions and animations.

---

## 14. Design Tokens — Master Reference

These are the raw tokens to feed into Claude Design / Figma variables.

```json
{
  "color": {
    "navy": "#1E3A6E",
    "teal": "#2B8FA9",
    "white": "#FFFFFF",
    "surface": "#F4F6F9",
    "border": "#D0D8E8",
    "room-cs": "#3B7DD8",
    "room-hipaa": "#2BA89A",
    "room-compliance": "#2EAA6E",
    "room-records": "#7B5EA7",
    "room-finance": "#D4A017",
    "success": "#28A745",
    "warning": "#FFC107",
    "error": "#DC3545",
    "info": "#17A2B8"
  },
  "font": {
    "heading": "Montserrat",
    "body": "Inter",
    "display": "Montserrat",
    "certificate": "Playfair Display"
  },
  "radius": {
    "sm": "4px",
    "md": "8px",
    "lg": "16px",
    "xl": "24px",
    "full": "9999px"
  },
  "shadow": {
    "sm": "0 1px 3px rgba(0,0,0,0.08)",
    "md": "0 4px 12px rgba(0,0,0,0.10)",
    "lg": "0 8px 24px rgba(0,0,0,0.14)",
    "focus": "0 0 0 3px rgba(43,143,169,0.35)"
  },
  "spacing": {
    "1": "4px", "2": "8px", "3": "12px", "4": "16px",
    "5": "24px", "6": "32px", "7": "48px", "8": "64px", "9": "96px"
  },
  "breakpoint": {
    "mobile": "375px",
    "tablet": "768px",
    "laptop": "1024px",
    "desktop": "1280px",
    "wide": "1440px"
  }
}
```

---

## 15. Open Questions for Next Session

Before moving into Figma Make, confirm the following:

- [ ] Business name finalized? (Currently: Healthcare Training Center)
- [ ] Does your mom want a logo mark (icon + wordmark) or wordmark only?
- [ ] Preferred alternate palette from Section 2.4, or confirmed original?
- [ ] Will courses be built in-house or via a 3rd-party LMS embed (Thinkific, Teachable, etc.)?
- [ ] Does the B2B portal need a separate login URL (company.healthcaretrainingcenter.com)?
- [ ] Any existing legal disclaimers or regulatory notices to include in footer?

---

*Prepared by: Claude (Cowork Mode) | For: Healthcare Training Center | Project: Design System v1.0*
*Next step: Feed design tokens into Claude Design → Export components → Figma Make working demo*
