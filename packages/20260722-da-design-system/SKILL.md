---
name: digital-allies-design
description: Use this skill to generate well-branded interfaces and assets for Digital Allies — a Kingman, AZ one-person technology shop — either for production or for throwaway prototypes/mocks. Contains the brand voice, color and type tokens, fonts, logo and icon assets, recreated UI components, and slide templates needed to design on-brand work.
user-invocable: true
github-repo: https://github.com/Digital-Allies/design-system
live-url: https://brand.digitalallies.net
---

Read the `README.md` file at the root of this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, social tiles, etc.), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What lives here

- `README.md` — Full brand book. Voice rules, content fundamentals, visual foundations, iconography, sample copy. **Read this first.**
- `preview/brand-voice-marketing.html` — Brand Voice & Marketing Hub. Primary voice (canonical), secondary voice (marketing-specific), target audience personas, 30-day content calendar structure, all 30 visual asset prompts (Pamali library), CMS integration guide.
- `templates/BRAND_VOICE_CMS_INTEGRATION.md` — Step-by-step guide for connecting the ContentCalendar component to your CMS (Barcelona). Collection setup, API endpoints, mounting instructions, Pamali integration.
- `ui_kits/website/ContentCalendar.jsx` — Reusable React component for live 30-day content calendar display. Sortable by day/category/status, filterable, CMS-hookable. Mount in marketing dashboards.
- `colors_and_type.css` — All the design tokens (colors, type, spacing, motion, structural borders). Import or inline into any HTML you build.
- `assets/` — Logos (banner lockups + circle marks), the artifact-icon set, department badges, abstract brand art, photography, the suspension-bridge motif, favicons.
- `preview/` — One HTML card per design-system concept (palette, type scale, spacing, buttons, jargon table, voice guide, etc). Useful as in-place examples.
- `ui_kits/website/` — Pixel-fidelity recreation of `digitalallies.net` split into reusable JSX components (Nav, Hero, JargonJar, Departments, Pricing, Footer, …). Compose these for any new website work.
- `slides/` — Seven 16:9 slide templates: title, section header, content (light), comparison, pinned quote, stats, end card. Built on `_slide.css` plus the root tokens.
- `templates/services-index/` & `templates/tool-detail/` — CMS-ready page templates for services landing page and individual tool detail pages. Design Components (`.dc.html`) that integrate with connected CMS projects.

## Voice in one sentence

**"The sharp, straight-talking tech guy you actually want to call — because he picks up, explains things plainly, and doesn't make you feel dumb for asking."**

When in doubt, ask yourself: *would Anthony actually say this?* If it needs a character voice, rewrite it.

## Two voices

**Primary Voice** (used everywhere): Expert precision, zero condescension, dry joke when earned. 65% casual, 45% warm, 70% plain, 75% confident, 100% authentic. See `README.md` lines 1–200 for complete rules, Jargon Jar, vocabulary, examples.

**Secondary Voice** (marketing/social only): Warmer, slightly more conversational, but still authentic. 75% casual, 60% warm, 80% plain, 70% confident, 100% authentic. Use for social posts, emails, ads, promotional copy. See `preview/brand-voice-marketing.html` for tone spectrum, examples, when to use.

**Key rules**: No corporate speak. Translate jargon. First-person singular ("I"), direct address ("you"). Owner: Anthony. Location: Kingman, Arizona. Use proprietary vocabulary (The Departments, The Design Bureau, Send a Transmission, etc. — see Jargon Jar). No emoji. Use middots, em-dashes, `[ bracketed CTAs ]`, red signal dots instead.

## Quick rules

- **Colors**: Bone White `#F9F6F0`, Charcoal `#2D2D2D`, Pulse Blue `#3A7BD5`, Light Pink `#FADEEB`, Signal Red `#C5301A`. 95% neutral, 5% accent — never stacked.
- **Type**: Lexend Deca (headers) + JetBrains Mono (body/details). Square corners. 1 px structural borders.
- **Grid**: 20 px Technical Lace ruled-paper background. 2× the whitespace you'd normally use.
- **No emoji.** Use middots, em-dashes, `[ bracketed CTAs ]`, and the red signal dot instead.
- **Only continuous animation** = the Pulse Dot. Calm motion otherwise.
- **Bilingual** (EN + ES) by default via `data-en` / `data-es` attributes.

## Content calendar

30-day social + email marketing calendar. Cycle of 4 weeks: Week 1 (Local data), Week 2 (Machine translation), Week 3 (Trust & culture), Week 4 (Digital Allies standard). Each day has: topic, hook, caption, CTA, visual asset prompt. Managed via CMS (Barcelona) using ContentCalendar.jsx component. See `templates/BRAND_VOICE_CMS_INTEGRATION.md` for setup.
