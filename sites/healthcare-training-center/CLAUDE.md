# Healthcare Training Center — Design Reference (CLAUDE.md)

Training platform for healthcare professionals. Metaphor: a virtual building — Lobby, 5 color-coded Training Rooms, shared spaces. Warm and credible, not clinical.

## Colors
- Primary: `#1E3A6E` (Deep Navy, authority) · Interaction: `#2B8FA9` (Teal)
- Page bg: `#F4F6F9` (Surface) · Cards: `#FFFFFF` · Optional warm marketing bg: `#FAF7F2` (Cream)
- **Room accents** (each w/ 5–8% tint for backgrounds/chips):
  - Customer Service: `#3B7DD8` (Sky Blue)
  - HIPAA/Privacy: `#2BA89A` (Teal Green)
  - Compliance: `#2EAA6E` (Emerald)
  - Medical Records: `#7B5EA7` (Indigo)
  - Finance: `#D4A017` (Amber)
- Semantic success/warning/error/info are standard, state-only. WCAG AA required (4.5:1 text, 3:1 large/UI).

## Type
- Headings/wordmark: **Montserrat** (ExtraBold/Bold/SemiBold), tight 1.2 line-height, slight negative tracking.
- Body/UI: **Inter**, 1.6 line-height.
- Certificates/badge display names only: **Playfair Display**.
- Hero display ~48px.

## Shape & Layout
- 8px grid. Section breaks 48–96px. Max width 1280px, mobile-first from 375px.
- Radius: room/feature cards 16px (`--radius-lg`), course cards/buttons 8px (`--radius-md`), pills full-round for badges/progress/avatars.
- Shadows: soft, navy-tinted (`rgba(16,36,61,…)`), never harsh/black. sm 1px / md 4–12px / lg 8–24px.
- Room entry card = full-color header band (~40% height) with centered white icon — "the door."
- No heavy gradients or busy textures; room pages get ~5% tint of room color.

## Motion
fast 100ms (hover), base 200ms (panels/tabs), slow 350ms (page/modal), spring 400ms (progress/badge). Signature: "entering a room" = 250–350ms fade + slight upward slide + full-page recolor to room accent. Respect `prefers-reduced-motion`.

## Voice
Warm authority — confident, not arrogant. Speaks to learner as "you," org as "we." Title Case headlines. Rule-of-three rhythm ("Enter. Learn. Lead."). Every room has a "Why This Room Matters" patient-advocacy note. No emoji. CTAs often end in arrow →, e.g. "Enter Room →."

## Iconography
**Phosphor Icons** (self-hosted, `assets/phosphor/`), Regular weight for UI, Fill/Duotone for large white icons on color banners.
- Customer Service: `ph-users` · HIPAA: `ph-shield-check` · Compliance: `ph-clipboard-text`
- Medical Records: `ph-folder-open` · Finance: `ph-currency-dollar`
- No emoji; only unicode is trailing → on CTAs and ✓ on completed badges.

## Key Components
- Buttons: solid navy (primary) / teal (secondary) / room-accent (in-room CTA), 2px navy outline (tertiary), ghost teal (link), red (danger). Heights 48/40/32px.
- Hover: darken one shade + deepen shadow. Room cards: `scale(1.02)` + brighten + deeper shadow.
- No logo file exists yet — wordmark is set in Montserrat ExtraBold navy; flag as open item if a mark is needed.

## Source
Full system: project `e713df44-cee5-4029-8d8e-0344131708f7` (spec, UI kits for marketing site + learner app).
