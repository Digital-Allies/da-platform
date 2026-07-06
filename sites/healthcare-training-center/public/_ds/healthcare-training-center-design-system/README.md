# Healthcare Training Center — Design System

> **Tagline:** *Step Inside. Step Up.* · **Mission:** *Learn. Grow. Make a Difference.*
> **Footer line:** *Empowering Knowledge. Enhancing Care. Building a Better Future.*

A people-first training platform for healthcare professionals and the organizations
that employ them. The defining idea is a **virtual building**: learners arrive at a
**Lobby / Reception**, see five color-coded **Training Rooms** through the "windows,"
and click to **enter a room** — at which point the entire UI takes on that room's
subject and color identity. The brand is warm, credible, and empowering — *not* cold
or clinical. Founded by a lawyer whose story (a family member's poor care experience)
*is* the brand: "This system is broken, but **you** can be the change in it."

---

## The Five Rooms

| # | Room | Accent | Token | Covers |
|---|------|--------|-------|--------|
| 1 | Customer Service | Sky Blue `#3B7DD8` | `--color-room-cs` | Communication, empathy, de-escalation |
| 2 | HIPAA, Privacy & Security | Teal Green `#2BA89A` | `--color-room-hipaa` | PHI, privacy rule, breach prevention |
| 3 | Compliance | Emerald `#2EAA6E` | `--color-room-compliance` | Laws, fraud/waste/abuse, ethics |
| 4 | Medical Records | Indigo `#7B5EA7` | `--color-room-records` | EHR, documentation, retention |
| 5 | Finance | Amber `#D4A017` | `--color-room-finance` | Revenue cycle, billing, collections |

Plus shared spaces: **Study Lounge**, **Resource Center**, **Live Classrooms**,
**Help Desk**, and (B2B) an **Admin Portal**.

---

## Products / Surfaces

1. **Marketing Site** (public) — landing page, our story, pricing, login/signup.
2. **Learner App** (authenticated) — the Lobby dashboard, individual Training Rooms,
   course/lesson pages, My Progress, badges & certificates.
3. **B2B Admin Portal** — team roster, assign training, compliance reports, billing.

UI kits in `ui_kits/` recreate the first two surfaces as high-fidelity click-thru
prototypes.

---

## Sources provided

- **`uploads/design-system-spec.md`** — the authoritative v1.0 spec (colors, type,
  spacing, components, page templates, nav architecture, a11y, motion). This design
  system is a faithful build-out of that spec.
- **`uploads/IMG_2239.JPEG`** — "Virtual Healthcare Training **Store**" concept
  infographic (futuristic storefront, help desk, study lounge). Copied to
  `assets/reference/virtual-store-floorplan.jpeg`.
- **`uploads/IMG_2241.JPEG`** — "Healthcare Training **Center**" floor-plan concept
  (lobby/reception + 5 rooms + support spaces). Copied to
  `assets/reference/training-center-floorplan.jpeg`.

> Note: the two images are **concept art / metaphor references**, not screenshots of a
> shipped product. They establish the building/room metaphor; the spec defines the
> actual digital UI. There is no codebase or Figma file — the spec is the source of truth.

---

## CONTENT FUNDAMENTALS

**Voice:** Warm authority. Credentialed and legally sound, but never bureaucratic or
condescending. The brand sounds like a trusted mentor who happens to be an expert —
confident without arrogance ("Where Healthcare Teams Get It Right," not "The Best
Training Platform").

**Person:** Speaks to the learner as **"you"**; the organization is **"we."** Copy is
direct and second-person: "Your Path to Better Care Starts Here," "We're here to help
you succeed." The founder's first-person story appears in the *Our Story* section only.

**Casing:**
- Headlines & section headers — **Title Case** ("Choose Your Training Path," "What's
  Inside Each Training Room").
- Taglines often use **short punchy fragments with periods** as beats:
  "Step Inside. Step Up." · "Learn. Grow. Make a Difference." · "Learn Virtually.
  Anytime. Anywhere."
- Labels, badges, room numbers — **UPPERCASE** ("ROOM 1," "TOPICS INCLUDE,"
  "LIVE NOW," "NEW").
- Body copy — sentence case.

**Sentence rhythm:** Loves the **rule of three** ("Enter. Learn. Lead.", "Empowering
Knowledge. Enhancing Care. Building a Better Future."). Pairs a benefit with a feeling
("Train With Purpose. Care With Confidence.").

**The "why" framing:** Everything ties back to the patient. Each room carries a
**"Why This Room Matters"** note written from a patient-advocacy lens — the stakes are
always human, never abstract compliance. Outcomes are spelled out plainly: "OUTCOME:
Protect patient information, maintain privacy, and prevent data breaches."

**Jargon:** Avoided in marketing/onboarding; allowed (and accurate) inside course
content where it's the subject matter (PHI, FWA, Stark Law, CPT/ICD-10). Never used to
sound impressive.

**Emoji:** **Not used.** The brand reads as professional. Meaning is carried by
Phosphor icons and the room color system, not emoji.

**Examples to emulate:**
- Hero: *"A New Innovative Healthcare Training Center — Empowering Knowledge.
  Enhancing Care. Building a Better Future."*
- Help desk: *"Hi! We're here to help you succeed."*
- Lobby welcome: *"Welcome back, [Name]"* + *"Choose Your Training Path."*
- CTA buttons: *"Enter Room →", "Start Your Journey Today", "Join Live Class",
  "View Dashboard."*
- Locked room tooltip: *"Ask your admin to unlock."*

---

## VISUAL FOUNDATIONS

**Overall vibe:** Clean, institutional-but-warm. Reads like a teaching hospital crossed
with a trusted professional-services firm. Lots of white/cream space, confident navy
headers, color used purposefully (every accent *means* a room or a state).

**Color:**
- Primary is **Deep Navy `#1E3A6E`** (authority) + **Teal `#2B8FA9`** (interaction).
- Page backgrounds are light — the canonical primary background is cool
  **Surface `#F4F6F9`** (`--bg-page`). It's deliberately low-chroma so the darker
  brand colors (navy, teal) and the saturated room accents read as crisp,
  high-contrast accents on top of it. White (`--bg-card`) is reserved for content
  cards that lift off the page; warm **Cream `#FAF7F2`** is an optional alternative
  for marketing surfaces that want extra warmth.
- The **five room accents** are the system's signature. They are saturated but not
  neon, and each comes with a ~5–8% tint for room backgrounds and chips.
- Semantic colors (success/warning/error/info) are standard and only used for state.
- Contrast meets **WCAG 2.1 AA** (4.5:1 text, 3:1 large/UI) — non-negotiable.

**Type:** **Montserrat** (geometric, ExtraBold/Bold/SemiBold) for all headings and the
wordmark; **Inter** for all body and UI; **Playfair Display** *only* for certificate
and badge display names. Headings are tight (1.2 line-height, slight negative tracking);
body is airy (1.6). Big, confident hero sizes (48px display).

**Spacing & layout:** Strict **8px grid**. Generous section breaks (48–96px). Content
maxes at **1280px**, centered. Mobile-first (designed at 375px up). Card grids: rooms in
3-2 / 2-3, courses in 3-col → 2-col → 1-col.

**Backgrounds:** Predominantly flat light fills (cream/surface/white). **No heavy
gradients**, no busy textures. Room pages get a *very* subtle (≈5%) tint of the room
color. Full-bleed color **banners** (navy or room accent) anchor heros and room
headers — color blocking, not imagery, is the primary device. Photography, when used,
is warm and human (real healthcare workers); the concept art skews cool/blue and
digital, but production imagery should lean warm.

**Cards:** White background, **`--radius-lg` (16px)** for room/feature cards,
**`--radius-md` (8px)** for course cards and buttons. Borders are light
(`--color-border`) or borderless with a soft shadow. Room entry cards have a
**full-color header band (~40% height)** with a centered white icon — the "door."

**Elevation:** Soft, low, navy-tinted shadows — `sm` (1px) for resting cards, `md`
(4–12px) for room cards/modals, `lg` (8–24px) for drawers/floating panels. Never harsh
or black; shadows use `rgba(16,36,61,…)`.

**Borders & radii:** 1px light borders on inputs and dividers. Radius scale: 4 / 8 / 16 /
24 / full. Pills (`--radius-full`) for badges, progress bars, room-number chips, avatars.

**Buttons:** Solid fills (navy primary, teal secondary, room-accent for in-room CTAs),
2px navy outline for tertiary, ghost teal for subtle links, red for danger. Three sizes
(48 / 40 / 32px height). CTAs frequently carry a trailing **arrow →**.

**Hover / press states:**
- Hover: color **darkens** one step (e.g. teal → `--color-teal-600`), shadow deepens.
- Room cards on hover: **scale(1.02) + brighten + deeper shadow** — "a door opening."
- Press: settle to the darker shade; subtle (no aggressive shrink). Buttons keep a
  visible focus ring (`--shadow-focus`, teal).

**Motion:** Purposeful, never decorative. `fast` 100ms (hover), `base` 200ms (panels/
tabs), `slow` 350ms (page/modal), `spring` 400ms (progress fill, badge unlock). The
signature transition is **entering a room**: 250–350ms fade + slight upward slide, like
stepping through a door, with the whole page recoloring to the room. Always respects
`prefers-reduced-motion`.

**Transparency / blur:** Used sparingly — translucent white over color banners
(`--fg-on-color-dim`) for secondary text, light tints for chips. No glassmorphism as a
decorative trope.

**Iconography vibe:** Line/duotone Phosphor icons, medium weight — see ICONOGRAPHY.

---

## ICONOGRAPHY

**Library:** **Phosphor Icons** (free, open-source, MIT). Chosen for a friendly-but-
precise weight that matches the brand. Use the **Regular** weight for most UI and
**Fill** or **Duotone** for the large white room icons on color banners.

**How it's loaded here:** the Phosphor web-font is **self-hosted** in
`assets/phosphor/` (regular / bold / fill weights, woff2) so the system works offline.
Link the per-weight stylesheet(s) you need:

```html
<link rel="stylesheet" href="assets/phosphor/regular/style.css">
<link rel="stylesheet" href="assets/phosphor/fill/style.css">
<link rel="stylesheet" href="assets/phosphor/bold/style.css">
<!-- usage:  <i class="ph ph-shield-check"></i>  /  <i class="ph-fill ph-users"></i> -->
```

> Substitution note: the spec names Phosphor explicitly, so no substitution was needed.
> Source: github.com/phosphor-icons/web (MIT). Only regular/bold/fill were imported; pull
> light/thin/duotone the same way if a design needs them.

**Per-room icons (confirmed):**
| Room | Phosphor name |
|---|---|
| Customer Service | `ph-users` (or `ph-chat-circle`) |
| HIPAA / Privacy | `ph-shield-check` |
| Compliance | `ph-clipboard-text` |
| Medical Records | `ph-folder-open` |
| Finance | `ph-currency-dollar` |

**General UI icons:** progress `ph-chart-bar`, certificate `ph-certificate`, live class
`ph-video-camera`, study lounge `ph-books`, resource center `ph-archive`, help desk
`ph-headset`, badge `ph-medal`, notifications `ph-bell`, lobby/home `ph-house`.

**Emoji:** never used as iconography. **Unicode** is limited to the trailing arrow
**→** on CTAs and the checkmark **✓** on completion badges. Everything else is a
Phosphor glyph.

**Logo / wordmark:** No logo file was provided. The brand currently uses a **Montserrat
ExtraBold wordmark** ("Healthcare Training Center") in navy, often stacked under a small
"A NEW INNOVATIVE" eyebrow, sometimes paired with a medical-cross + figure mark in the
footer. The UI kits render the wordmark in type; see *Caveats* in the chat — a real logo
mark is an open question from the spec.

---

## FILES — index / manifest

**Root**
- `README.md` — this file.
- `colors_and_type.css` — all CSS variables (color, type, spacing, elevation, radius,
  motion) + semantic helper classes. Import this everywhere.
- `SKILL.md` — Agent-Skills-compatible entry point.

**`assets/`**
- `reference/` — the two source concept infographics.
- `phosphor/` — self-hosted Phosphor icon font (regular / bold / fill weights).
- (logos are rendered from the Phosphor font + Montserrat type; no raster logo exists.)

**`preview/`** — small HTML cards that populate the **Design System** tab (colors, type,
spacing, components, etc.). Not meant to be used directly in designs.

**`ui_kits/`**
- `marketing/` — public landing site recreation (`index.html` + JSX components).
- `learner-app/` — the Lobby → Room → Course authenticated app (`index.html` + JSX).

See each kit's own `README.md` for its component inventory.
