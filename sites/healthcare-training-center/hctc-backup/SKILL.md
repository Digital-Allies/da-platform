---
name: healthcare-training-center-design
description: Use this skill to generate well-branded interfaces and assets for the Healthcare Training Center, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out
and create static HTML files for the user to view. If working on production code, you can
copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build
or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## What's here
- `README.md` — brand context, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — all design tokens (color, type, spacing, elevation, radius,
  motion) + semantic helper classes. Import this in every artifact.
- `assets/phosphor/` — self-hosted Phosphor icon font (regular / bold / fill). Link the
  per-weight `style.css` files; use `<i class="ph ph-name"></i>` (or `ph-fill` / `ph-bold`).
- `assets/reference/` — the two source concept infographics (store + center floor plans).
- `preview/` — small specimen cards for every token group (reference, not for reuse).
- `ui_kits/learner-app/` — the signature Lobby → Room → Course app (React/JSX components).
- `ui_kits/marketing/` — the public marketing site recreation.

## The one thing to get right
This brand is a **virtual building**. Learners enter a **Lobby**, pick one of **5 color-coded
Training Rooms**, and the whole UI recolors to that room's identity. Always lead with that
metaphor, keep `#F4F6F9` as the page background so navy/teal/room colors pop as accents,
write warm second-person copy, and never use emoji.
