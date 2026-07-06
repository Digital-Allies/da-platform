# Handoff: Healthcare Training Center — Learner App

## Overview
An authenticated learner experience for the **Healthcare Training Center** — a
"virtual building" training platform for healthcare professionals. A learner
lands in a **storefront Lobby**, sees five color-coded **Training Rooms** as
illustrated shopfronts, selects one (a card + 3D tile pop out), **enters the
room**, picks a **course**, works through a multi-module **Lesson**, and passes
a **Knowledge Check (quiz)** — which updates their progress live across the app.

The signature interaction is **entering a room**: the whole UI fades + slides
(≈250–350ms) and **recolors to that room's accent identity**, like stepping
through a door.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS + React
(via in-browser Babel)** — a working prototype showing intended look and
behavior, **not production code to ship directly**. The task is to **recreate
these designs in the target codebase's environment** (React/Next, Vue, native,
etc.) using its established component patterns, routing, and state libraries. If
no environment exists yet, choose an appropriate stack (React + a CSS solution
that supports design tokens is a natural fit) and implement there.

Treat the HTML as the **source of truth for layout, tokens, copy, and
interaction** — re-implement, don't copy-paste the Babel setup into production.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, room-accent system,
icons, illustrations, and interactions are all specified and match the
Healthcare Training Center design system. Recreate pixel-faithfully using the
codebase's libraries. The one caveat: the lobby art is **AI-generated isometric
illustration** (client-provided) used as a background plate with positioned
hotspots — see *Assets* and *Lobby* notes.

---

## Screens / Views

### 1. Lobby (Storefront) — `store.jsx` → `StoreLobby`
- **Purpose:** Wayfinding home. The learner chooses which Training Room to enter.
- **Layout:**
  - Header row (`.store-head`): left = eyebrow + H1 "Choose Your Training Path"
    + subhead; right = overall-progress ring (64px) + a **Store / List** segmented
    toggle (`.store-toggle`). Wraps on narrow widths.
  - **Scene** (`.iso-scene-wrap` › `.iso-stage`): a full-width hero illustration
    (`assets/iso/hero-lobby-2.png`) with **5 invisible hotspot buttons**
    (`.iso-hotspot`) absolutely positioned over the painted storefronts as % of
    the image box. Coordinates live in the `HOTSPOTS` map (cx/cy/rw/rh in %).
  - Support strip below (`.store-spaces`): 4 cards — Study Lounge, Resource
    Center, Live Classrooms, Help Desk (4-col → 2-col on mobile).
- **Hotspot states:**
  - *Hover* (only when nothing selected): `.iso-glow-ring` fades in (2.5px
    accent border + accent outer glow via `color-mix`), a floor spotlight
    (`::after`, blurred accent ellipse), and a `.iso-pill` label floats above
    the awning (room icon + name, accent background).
  - *Click → select:* a very light dim (`.iso-dim`, navy @ 18%) drops over the
    scene and a **pop-out** appears (`.iso-popout`, centered, `pointer-events:
    none` except its children):
    - **Info card** (`.iso-card`, white, `--radius-xl`, 320px) slides in from
      the left (`isoCardIn`, 350ms, `cubic-bezier(0.16,1,0.3,1)`,
      `forwards`): accent badge w/ room icon, "ROOM N" eyebrow, room name H2,
      "why this matters" paragraph, progress bar (if started), accent **"Enter
      Room →"** CTA, course-count footnote. Close affordances: × button, Escape
      key, or clicking the dim.
    - **Store tile** (`.iso-tile`, 340px) is the individual illustrated shop
      PNG, popped at a slight 3D tilt (`perspective(900px) rotateY(-8deg)
      rotateX(3deg)`) with a drop shadow; animates in via `isoTileIn`.
  - Clicking **Enter Room →** closes the pop-out and transitions into the Room.
- **List view** (toggle): renders the original card grid (`LobbyScreen … embedded`)
  — an accessible/mobile fallback. Choice persists in `localStorage`
  (`htc-lobby-mode`).

### 2. Room — `screens.jsx` → `RoomScreen`
- **Purpose:** Show the courses inside one Training Room; the UI is recolored to
  the room accent.
- **Layout:** full-bleed **accent banner** (`.ln-room-banner`) with back-to-lobby
  pill, room icon, "ROOM N", room name, tagline, and a courses-complete progress
  track. Body: breadcrumb + 2-col grid — left = course cards
  (`CourseCard`), right = aside ("Why This Room Matters" note + forum prompt).
- **Course card states:** Not started / In progress (shows % bar) / Completed
  (green check badge). Whole card is a button (click → open Lesson).

### 3. Lesson — `lessons.jsx` → `LessonScreen`
- **Purpose:** Work through a course: N content modules + a quiz.
- **Layout:** slim accent course header (back, room chip, course title, tags:
  minutes / level / "N modules + quiz"). Body = breadcrumb + 3-col:
  - **Left rail** (`.ls-rail`): module outline (numbered; seen modules show a
    check; quiz row at the bottom). Click to jump; sticky on desktop, wraps to a
    horizontal row ≤1080px.
  - **Center** (`.ls-card`): module 1 leads with a **video player placeholder**
    (`LessonPlayer`, accent background, play/pause, scrubber, CC); then a
    "Module X of N" eyebrow + module title + prose. Prose block types:
    paragraph, **key callout** (accent left-border + lightbulb), **bullet list**
    (accent checks), **patient-voice** quote card. Footer = Previous / Next, last
    module → "Take the Knowledge Check".
  - **Right rail** (`.ls-context`): "Why This Matters" note + a **My Notes**
    textarea that autosaves to `localStorage` (`htc-notes-{room}-{course}`).

### 4. Knowledge Check (Quiz) — `lessons.jsx` → `QuizScreen`
- **Purpose:** Assess; pass to complete the course.
- **Behavior:** N single-select questions (radio cards, accent when chosen);
  Submit enabled only when all answered. **Score = correct/total; pass ≥ 70%.**
  - *Result:* progress ring (success green / error red), pass or "not quite"
    copy, then **per-question feedback** (right/wrong mark, your answer, correct
    answer, explanation). Pass → **"Mark Course Complete"**; fail → "Try Again"
    (resets) + "Review Modules".
- **On complete:** sets that course's progress to 100%, returns to the Room, and
  fires a **completion toast** (`Toast`, auto-dismiss ~4.2s).

### Chrome (all screens)
- **Top nav** (`components.jsx` → `TopNav`): wordmark (click → Lobby), section
  links, notifications/avatar; tints to the active room accent inside a room.
- **Mobile bottom tab bar** (`BottomNav`): Home / Progress / Classes / Profile —
  shown ≤720px only.
- **Floating Help Desk** button (`.ln-help`), bottom-right.
- **Tweaks panel** (`tweaks-panel.jsx`): dev/demo control surface (page bg
  surface↔cream, density, reduce-motion). Not part of the shipping product UI —
  it's a prototype affordance; drop or replace in production.

---

## Interactions & Behavior
- **Room entry / navigation transition:** on enter-room / open-course / back,
  the app sets an `is-entering` class on `.ln-main` for a short fade, swaps the
  view, scrolls to top. Honor `reduceMotion` (skip the delay). Timing: ~150–180ms.
- **Recolor:** room + lesson screens set `--accent` / `--tint` from the room and
  the banner/CTA/accents read from them. Implement room accent as a theme
  variable scoped to the room subtree.
- **Animations:** card/tile pop (350–400ms, `cubic-bezier(0.16,1,0.3,1)`,
  `animation-fill-mode: forwards` — required, or elements snap back to
  `opacity:0`); progress fills use `--motion-spring`; toast slide-in.
  All decorative motion gated behind `prefers-reduced-motion`.
- **Persistence (localStorage):** `htc-progress-v1` (course→pct map),
  `htc-lobby-mode` (store|list), `htc-notes-*` (per-course notes),
  plus the Tweaks panel's own store. In production, progress/notes should be
  server-backed; keep keys/semantics as the spec.
- **Keyboard / a11y:** hotspots and cards are real `<button>`s with aria-labels;
  Escape closes the pop-out; quiz uses radio semantics. Maintain WCAG 2.1 AA
  (4.5:1 text, 3:1 UI) — the room accents were chosen to pass.

## State Management
- **`useProgress()`** (`screens.jsx`): seeds from the static `ROOMS` data,
  overlays a `localStorage` map keyed `"{roomId}::{courseTitle}" → pct`. Exposes
  `setPct(roomId, title, pct)`. `liveRoom(r, prog)` derives per-room
  `courses`/`done`/`total` for rendering. Replace with real data fetching +
  mutations in production; keep the derived-progress shape.
- **App view state** (`App`): `view` (`lobby|room|lesson`), `roomId`, `course`,
  `lobbyMode`, transient `entering` + `toast`. In a real app these map to routes
  (`/lobby`, `/room/:id`, `/room/:id/course/:slug`, `…/quiz`).
- **Lesson/Quiz local state:** current module, seen-set, answers, submitted,
  score.

## Design Tokens
Import the design-system stylesheet (`assets/colors_and_type.css`, shipped in
this bundle) — it defines every `--*` token. Key values:

**Brand / surface**
- Navy `#1E3A6E` (authority, headings, primary buttons) · Teal `#2B8FA9`
  (interaction/secondary) · Page bg Surface `#F4F6F9` · Card `#FFFFFF` ·
  Cream `#FAF7F2` (optional warm surface).
- Text: `--fg-1` (primary) / `--fg-2` (secondary) / `--fg-3` (muted).
- Borders: `--color-border` (light) / `--color-border-strong`.

**The five room accents (signature system)** — each has a ~5–8% tint:
| Room | Accent | Token |
|---|---|---|
| Customer Service | `#3B7DD8` | `--color-room-cs` (+ `-tint`) |
| HIPAA, Privacy & Security | `#2BA89A` | `--color-room-hipaa` |
| Compliance | `#2EAA6E` | `--color-room-compliance` |
| Medical Records | `#7B5EA7` | `--color-room-records` |
| Finance | `#D4A017` | `--color-room-finance` |

**Semantic:** success / warning / error / info (+ tints) — state only.

**Type:** **Montserrat** (ExtraBold/Bold/SemiBold) for headings + wordmark;
**Inter** for body/UI; **Playfair Display** for certificate/badge names only.
Headings: line-height 1.2, slight negative tracking. Body: 1.6. Display ~48px.
Scale tokens: `--text-display/h1/h2/h3/h4/body/body-sm/label/ui`.

**Spacing:** strict **8px grid** (`--space-1…9`). Sections 48–96px. Content
max **1280px** (`--content-max`), centered.

**Radius:** `--radius-sm` 4 · `--radius-md` 8 · `--radius-lg` 16 · `--radius-xl`
24 · `--radius-full`. Cards 16; course cards/buttons 8; pills full.

**Elevation:** soft navy-tinted shadows — `--shadow-sm` (resting cards),
`--shadow-md` (room cards/modals), `--shadow-lg` (drawers/pop-out). Never black.
Focus ring: `--shadow-focus` (teal). Never use the default browser outline.

**Motion:** `--motion-fast` 100ms (hover) · `--motion-base` 200ms (panels/tabs)
· `--motion-slow` 350ms (page/modal) · `--motion-spring` 400ms (progress/badge).

## Assets
- **Icons:** **Phosphor** web-font, self-hosted in `assets/phosphor/`
  (regular / bold / fill). Usage `<i class="ph ph-shield-check">` /
  `<i class="ph-fill ph-users">`. Per-room icons: CS `ph-users`, HIPAA
  `ph-shield-check`, Compliance `ph-clipboard-text` (kit uses `ph-clipboard-text`/
  `ph-clipboard`), Records `ph-folder-open`, Finance `ph-currency-dollar`.
  In production, swap to the Phosphor npm package.
- **Lobby illustrations (`assets/iso/`)** — **client-provided, AI-generated
  isometric art**:
  - `hero-lobby-2.png` — the hero plate the hotspots sit on (the lobby scene in
    use). `hero-lobby.png` is an alternate.
  - `store-cs / store-hipaa / store-compliance / store-records / store-finance
    .png` — the five individual shop tiles used in the pop-out.
  - `popout-concept.png` — concept reference only (not rendered).
  > These are raster art. If the room set or storefront layout changes, the art
  > must be regenerated and the `HOTSPOTS` % coordinates re-measured. For a fully
  > responsive/production build, consider replacing the single hero plate with
  > per-store positioned tiles so hotspots aren't tied to a baked-in image.
- **No logo file** — wordmark is Montserrat ExtraBold type, navy.

## Files (in this bundle, under `app_source/`)
- `Healthcare Training Center - Learner App.html` — entry; script/load order.
- `app/rooms.jsx` — `ROOMS` data (id, name, n, color, tint, icon, desc, why,
  courses) + helpers. **The content model.**
- `app/components.jsx` — shared UI: `TopNav`, `RoomCard`, `CourseCard`,
  `ProgressRing`, `ProgressBar`, `Button`, badges.
- `app/screens.jsx` — `App` shell, `useProgress`, `LobbyScreen` (list view),
  `RoomScreen`, `Toast`, `BottomNav`.
- `app/store.jsx` — `StoreLobby` (image hotspot lobby + pop-out), `HOTSPOTS`,
  `STORE_IMG`, `SUPPORT_SPACES`, `StoreHeader`.
- `app/lessons.jsx` — `LESSON_CONTENT` (authored per-room modules + quizzes),
  `LessonScreen`, `QuizScreen`, `LessonPlayer`, prose block renderer.
- `app/kit.css` — all component styles (builds on the tokens below).
- `app/tweaks-panel.jsx` — prototype Tweaks surface (not shipping UI).
- `assets/colors_and_type.css` — **the design-system tokens** (import this).
- `assets/phosphor/` — icon font. `assets/iso/` — lobby illustrations.

## Implementation notes / recommendations
- Re-implement views as **routes**, not a `view` state switch.
- Make **room accent** a scoped theme (CSS variables on a room wrapper or a
  theme provider) so banner/CTA/callouts inherit it — that's the whole brand.
- Keep **progress derivation** (`liveRoom`) as the pattern: static course list +
  a server-backed progress overlay → derived done/total.
- Replace `localStorage` with API calls for progress & notes; keep lobby-mode +
  Tweaks client-side.
- Preserve **`animation-fill-mode: forwards`** on the pop-out card/tile.
- Honor `prefers-reduced-motion` everywhere; maintain AA contrast.
- The **Tweaks panel** is a prototype tool — exclude from production.
