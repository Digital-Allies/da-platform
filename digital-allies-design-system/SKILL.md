---
name: digital-allies-design
description: Use this skill to generate well-branded interfaces and assets for Digital Allies — a Kingman, AZ one-person technology shop — either for production or for throwaway prototypes/mocks. Contains the brand voice, color and type tokens, fonts, logo and icon assets, recreated UI components, and slide templates needed to design on-brand work.
user-invocable: true
---

Read the `README.md` file at the root of this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, social tiles, etc.), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What lives here

- `README.md` — Full brand book. Voice rules, content fundamentals, visual foundations, iconography, sample copy. **Read this first.**
- `colors_and_type.css` — All the design tokens (colors, type, spacing, motion, structural borders). Import or inline into any HTML you build.
- `assets/` — Logos (banner lockups + circle marks), the artifact-icon set, department badges, abstract brand art, photography, the suspension-bridge motif, favicons.
- `preview/` — One HTML card per design-system concept (palette, type scale, spacing, buttons, jargon table, etc). Useful as in-place examples.
- `ui_kits/website/` — Pixel-fidelity recreation of `digitalallies.net` split into reusable JSX components (Nav, Hero, JargonJar, Departments, Pricing, Footer, …). Compose these for any new website work.
- `slides/` — Seven 16:9 slide templates: title, section header, content (light), comparison, pinned quote, stats, end card. Built on `_slide.css` plus the root tokens.

## Voice in one sentence

**"The sharp, straight-talking tech guy you actually want to call — because he picks up, explains things plainly, and doesn't make you feel dumb for asking."**

When in doubt, ask yourself: *would Anthony actually say this?* If it needs a character voice, rewrite it.

## Quick rules

- **Colors**: Bone White `#F9F6F0`, Charcoal `#2D2D2D`, Pulse Blue `#3A7BD5`, Light Pink `#FADEEB`, Signal Red `#C5301A`. 95% neutral, 5% accent — never stacked.
- **Type**: Lexend Deca (headers) + JetBrains Mono (body/details). Square corners. 1 px structural borders.
- **Grid**: 20 px Technical Lace ruled-paper background. 2× the whitespace you'd normally use.
- **No emoji.** Use middots, em-dashes, `[ bracketed CTAs ]`, and the red signal dot instead.
- **Only continuous animation** = the Pulse Dot. Calm motion otherwise.
- **Bilingual** (EN + ES) by default via `data-en` / `data-es` attributes.
