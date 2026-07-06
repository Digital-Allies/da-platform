# Learner App — UI Kit

A high-fidelity, click-through recreation of the authenticated **Learner App** — the
heart of the Healthcare Training Center product and its "virtual building" metaphor.

Open `index.html`. Click any room card to **enter** it: the page fades + recolors to that
room's identity (nav accent bar, banner, breadcrumb, buttons, the page tint). Click
**Back to Lobby** (or the logo) to return.

## Screens
- **Lobby / Reception** — welcome header + overall progress ring, the "Choose Your
  Training Path" grid of 5 room cards, and a sidebar (live class + upcoming session).
- **Training Room (immersive)** — full-width accent banner with room progress, a course
  grid, and a "Why This Room Matters" patient-advocacy sidebar + forum strip.

## Components (`*.jsx`)
- `rooms.jsx` — the 5-room data model (colors, copy, course lists, progress) + helpers.
- `components.jsx` — `TopNav`, `Button`, `ProgressBar`, `ProgressRing`, `StatusPill`,
  `RoomCard` (the signature "door"), `CourseCard`.
- `screens.jsx` — `LobbyScreen`, `RoomScreen`, and the `App` shell (room-entry transition).
- `kit.css` — all kit styling, built on the root `colors_and_type.css` tokens.

## Notes
- Icons are the self-hosted Phosphor font (`../../assets/phosphor/...`).
- Interactions are cosmetic (no real auth/data) — this is a design recreation, not
  production code. Components are intentionally simple and reusable.
- Faithful to `uploads/design-system-spec.md` §7.2 (Storefront & Room-Entry System) and
  §8.2–8.3 (Lobby + Individual Training Room templates).
