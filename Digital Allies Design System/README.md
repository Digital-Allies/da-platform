# Digital Allies — Design System

> "Technological Solutions for People with Better Things to Do."
> Based in Kingman, AZ · Serving Everywhere Else · Est. 2024 · Anthony

This folder is the canonical source for designing artifacts (websites,
slides, social posts, prototypes, brand documents) on behalf of **Digital
Allies**. It packages voice rules, color/type tokens, icon and logo
assets, recreated UI components, and ready-to-screenshot preview cards so
any future agent (or designer) can produce on-brand work without guessing.

---

## Sources

This system was assembled from the following inputs. All are referenced for
context only — copies of the assets that ship with this design system live
in `assets/`.

- **GitHub — primary live site** (HTML/CSS/JS, the source of truth for
  visual implementation):
  - https://github.com/Digital-Allies/DigitalAllies_V2 — `index.html`,
    `brand.html`, the four department icons, `suspension bridge.svg`,
    `favicon.svg`, and the `/diagrams` folder.
  - https://github.com/Digital-Allies/brand — companion brand repo.
- **Brand System (mounted folder)** — the working-files library:
  - `Brand/style_guide.txt` — the long-form Manifesto + Technical Blueprint
  - `Brand/blueprint.txt` — site copy reference
  - `Brand/002_..._Voice_Guide_Your_...txt` — long voice guide
  - `Brand/005_..._Voice_Guide_One_...txt` — one-pager voice guide
  - `Frame/Logo System/` — circle marks + horizontal banner lockups
  - `Frame/Icon System/` — six minimalist line-art "artifact" icons
  - `Abstract Brand Art —` *(banners & social tiles)*
  - `Document Suite/`, `Folder/`, `Ads/`, `Social Template Designs/`, and
    the *Kingman Data Story* IG carousel.

The reader of this skill is encouraged to explore those repos directly to
do an even better job of building Digital Allies designs.

---

## Index

| File / folder | What it is |
| --- | --- |
| `index.html` | One-page landing pad linking everything below. Open this first in the browser. |
| `README.md` | This file. The brand book. |
| `SKILL.md` | Cross-compatible skill manifest for Claude Code / Skills. |
| `colors_and_type.css` | All tokens. Import or inline whenever you build with this brand. |
| `fonts/*.ttf` | Local variable fonts (Lexend Deca + JetBrains Mono regular & italic). Loaded by `colors_and_type.css` via `@font-face`. |
| `assets/logo-*` | Banner lockups (blue + vermilion), wordmark, monogram, pulse-dot circles, favicon. |
| `assets/icon-*` | The Artifact Icons — topo, compass, rotary phone, metronome, engine, Route 66. |
| `assets/{design,integrations,automation,support}-icon.png` | Department badges used in the four-card services grid. |
| `assets/brand-art-*` | Abstract brand art (wavy lines, luminous blue dot tiles). |
| `assets/photo-*` | Photography — Kingman highway. |
| `assets/suspension-bridge.svg` / `.png` | The mission motif. |
| `assets/{process,aeo-seo-overview,language-overview}.png` | Architecture diagrams used inside the website. |
| `preview/colors-*.html` | Color palette cards (core, semantic, 95/5 rule). |
| `preview/type-*.html` | Typography specimens. |
| `preview/spacing-*.html` | Spacing scale + Technical Lace grid demo. |
| `preview/borders-shadows.html` | Borders + shadow elevation system. |
| `preview/components-*.html` | Buttons, inputs, pulse dot, pinned note, jargon flip card, dept card, accordion, transparency table, nav. |
| `preview/brand-*.html` | Logo lockups, icon system, dept badges, abstract art, bridge motif, photography vibe. |
| `preview/voice-*.html` | Jargon translation table + tone-spectrum coordinates. |
| `ui_kits/website/` | High-fidelity recreation of digitalallies.net as JSX components + a click-through `index.html`. |
| `slides/01..07-*.html` | Seven 16:9 slide templates (title, section header, content light, comparison, big quote, stats, end card). |
| `slides/index.html` | Gallery view of all slide templates. |
| `slides/_slide.css` | Shared slide-shell tokens (header, footer, display type, dark/light themes). |

---

## The Voice in One Sentence

> *"The sharp, straight-talking tech guy you actually want to call —
> because he picks up, explains things plainly, and doesn't make you feel
> dumb for asking."*

**Internally**: The Knowledgeable Neighbor. Expert precision, zero
condescension, a dry joke when it earns its place.

---

## Content Fundamentals

Voice is the most distinctive thing about this brand. Get the words wrong
and the visual system collapses — they're load-bearing.

### Person & address
- **First person singular ("I")** — this is a one-person operation, and
  the voice acknowledges that. *"I build systems that don't require a
  master's degree to operate."* Use "we" only when speaking about the
  brand's collective philosophy (rare); never "our team."
- **Direct address to the reader ("you")** — *"You've got better things
  to do."*
- Owner / signatory: **Anthony**. Location: **Kingman, Arizona**.

### Casing & punctuation
- **Sentence case** for headlines. **Title Case** is reserved for proper
  nouns and the named "Departments" / "Bureau" / "Post" constructions.
- Eyebrow labels (above headings) are **UPPERCASE TRACKED**, often
  surrounded by `·` middots: `BASED IN KINGMAN, AZ · SERVING EVERYWHERE ELSE`.
- Buttons and CTAs are wrapped in **square brackets**: `[ Inquire Within ]`,
  `[ View the Diagrams ]`, `[ Submit Transmission ]`.
- Em-dashes (—) and `&rarr;` arrows used for inline flow:
  *"Discover → Design → Build → Maintain."*
- Prices use the explicit "From $X" convention. **No** "$" without a
  number, no "starting at," no "$X+".

### Vocabulary tics — the proprietary nouns
The brand renames generic categories as if they were government bureaus.
**Use these labels.** Do not invent new ones.

| Generic | DA name |
| --- | --- |
| Services overview | **The Departments** |
| Design & brand work | **The Design Bureau** |
| Integrations | **Dept. of Cooperation** |
| Automation | **The Self-Governing Bureau** |
| Support / monitoring | **The Permanent Observation Post** |
| Pricing table | **The Transparency Table** |
| Hero section / landing | **The Lobby** |
| Architecture explainers | **The Diagrams** |
| Testimonials | **Field Notes** / *Archive: Field Notes* |
| Contact form | **Send a Transmission** / *The Command Center* |
| Confidentiality clause | **The No-Ghosting Guarantee** |
| Free strategy / paid execution split | **The Reciprocity Loop** |

### Tone spectrum (the literal coordinates from the voice guide)
- Formal ←→ **Casual**: 65 % casual
- Dry ←→ Warm: 55 % dry
- Technical ←→ **Plain**: 70 % plain
- **Confident** ←→ Eager: 75 % confident
- Performing ←→ **Authentic**: 100 % authentic

### Examples — DO write like this

> "Your apps talk to each other. You don't have to."
> "We answer the phone. In person. Every time."
> "Repetitive tasks are for machines. Go take a real lunch break."
> "Monitoring runs 24/7. If something breaks at 2am, that's my problem
> — not yours."
> "Strategy is free. Execution is paid."
> "All quotes are given before work begins. No surprises. No silent
> scope creep."
> "I am historically easy to reach. I live in Kingman. If you call, I
> answer. It is a very avant-garde concept called 'Doing My Job.'"

### Examples — DO NOT write like this
- ❌ *"We facilitate seamless API-level ecosystem integration."*
- ❌ *"We're passionate about nurturing your digital journey."*
- ❌ *"Leverage scalable, user-centric digital solutions for modern enterprises."*
- ❌ Anything that requires the reader to look up a word to keep reading.

### The Jargon Jar (always available)
The brand maintains a public translation table. Use it as a guardrail —
if you find yourself reaching for the left column, rewrite using the right.

| Corporate Speak | DA Translation |
| --- | --- |
| Leverage synergies across touchpoints | Make the parts work together. |
| End-to-end digital transformation | We fix what's broken and build what's missing. |
| Scalable solutions for your growth journey | It works now and won't fall apart later. |
| SEO-optimized content ecosystems | Your site shows up when people search. That's the goal. |
| Robust backend infrastructure | The stuff running quietly in the background so nothing crashes. |
| Holistic brand alignment | Your logo, site, and words look like they know each other. |
| Onboarding workflow optimization | Getting started without the runaround. |
| Synergy | Working together (without the posturing). |
| Scalable | It won't break when more than three people show up. |
| Deep Dive | Looking at it for more than five minutes. |
| Bandwidth | Time. Just regular human time. |
| Disruptive | Actually useful. |
| Leverage | To use. |

### Emoji & vibe
- **No emoji.** None. The brand uses **square brackets**, **middots**,
  **em-dashes**, and the occasional **red signal dot** instead.
- Headlines occasionally use ASCII punctuation as ornamentation:
  `[ View the Diagrams ]`, `+` close-buttons that rotate on open.

### Bilingual
- Every public-facing string ships **EN + ES** via `data-en` / `data-es`
  attributes and an `EN | ES` toggle in the nav.
- Spanish is registered, not translated: *"Soluciones Tecnológicas para
  Personas con Cosas Mejores que Hacer."* Anthony reviews every line.

---

## Visual Foundations

> *"Aesthetic symmetry serves as a visual proxy for technical competence.
> A perfectly aligned grid is proof that the architect can count."*

The brand is corner-square, ruled-paper, museum-cardstock. Think
1960s research-manual mixed with a modern minimal-tech site.

### Color — the 95/5 rule
95 % of every canvas is neutral (Bone White + Charcoal). The remaining
5 % is reserved for high-signal accents. Never stack accents.

| Token | Hex | Role |
| --- | --- | --- |
| Bone White | `#F9F6F0` | Canvas. Default background. |
| Charcoal Grey | `#2D2D2D` | All borders, all body text, all headings. |
| Pulse Blue | `#3A7BD5` | Live state, links, the pulse-dot logo. |
| Light Pink | `#FADEEB` | Subtle hover wash + highlight plates. |
| Signal Red (Anderson Vermillion) | `#C5301A` | POI markers, the red pin, primary CTA. |
| Pinned-note Yellow | `#FCFAED` | Functional accent for testimonials / quotes. |

Use the helpers in `colors_and_type.css`:
- `.da-bg` / `.da-bg-alt` / `.da-bg-dark`
- text colors via the `color: var(--accent | --signal | --fg-muted)` vars
- `.da-pulse`, `.da-signal-dot`, `.da-pinned`

### Type
- **Lexend Deca** — headers, eyebrows in bold, action callouts, card
  titles. Chosen for high x-height and scannability under glare.
- **JetBrains Mono** — body, prices, system messages, table content,
  details. Enforces grid discipline.
- Load both from Google Fonts. Weights used: 400, 500, 600, 700.
- Heading sizes step from `--fs-display` (~64px) down through
  `--fs-h1`/`h2`/`h3`/`h4`. Body is 14px. The brand favors generous
  line-height (1.55–1.7) — text breathes.

### Spacing — the Technical Lace grid
- The baseline is a **20px ruled grid** (the `--lace-step`). Every
  body background carries it as a 0.5 px charcoal rule at 7% opacity.
- Sub-units step in 4 px (`--space-1`).
- "Extreme whitespace" is the rule: **2× the padding** of a generic
  marketing template. Sections are typically `py-20` (80 px top/bottom).
- Max content width is **1024 px** (`max-w-5xl`) for prose, **1280 px**
  (`max-w-7xl`) for the department grid + footer.

### Backgrounds & imagery
- **Ruled-paper grid behind everything** (Technical Lace). This is the
  brand's most recognizable feature.
- **No gradients** except inside abstract brand art (which is decorative,
  not structural).
- Photography style: **desolate desert, Route 66, Kingman highways** —
  warm tan / neutral, often dusk, never tropical or saturated.
- Abstract brand art: **thin black wavy lines** + occasional
  **luminous blue dot** on dark backgrounds (see
  `assets/brand-art-*`). Used for blog headers, social tiles, and
  full-bleed hero overlays.
- **Suspension bridge.svg** — semantic motif: technology as a bridge to
  opportunity. Use on About / mission pages.

### Symmetry Break
The strategic visual move: build everything on a strict grid, then **nudge
a single signal-red highlight 5–10 px off-center.** This creates a
"visual itch" that pulls the eye to one focal point per view. The
*only* element that may break symmetry is the red signal dot or the red
underline. Never break symmetry with anything blue or pink.

### Borders, corners, cards
- Every container that needs to feel "built" carries the
  **structural border** — 1 px solid `#2D2D2D`. (`.da-border`.)
- **Corners are square.** `border-radius: 0` is the default. The only
  exception is the pulse dot itself (a perfect circle) and inputs
  (`2px` for affordance).
- Cards are **flat**: bone-white background, charcoal border, optional
  `--shadow-sm`. **No** drop shadows + rounded corners + colored
  left-borders combo. The closest the brand gets is the **pinned-note**
  pattern: pinned-yellow background, red 4 px left-border, red dot pin
  at top-center.
- Dividers inside cards use `--border-hairline` (15 % charcoal). Pricing
  rows use `border-bottom: 1px dashed` (the "dashed price row" pattern).

### Shadows
- The grid does the structural work. Shadows are used very sparingly.
  - `--shadow-sm` on resting cards (subtle).
  - `--shadow-md` on the live demo card.
  - `--shadow-lg` on hover-lift only.
  - `--shadow-pin` on the red signal dot (gives it physical weight).
- No glow effects, no `box-shadow: inset`. Inner shadows are not part of
  the language.

### Animation
- **Calm.** The only continuous animation in the brand is the
  **pulse dot** (3 s breathe + 2.2 s ring expansion).
- Hover lifts: `translateY(-6px)` over **300–400 ms** with the
  `cubic-bezier(0.16, 1, 0.3, 1)` curve.
- Flip cards (Jargon Jar) flip on click in 600 ms.
- `+` icons on accordions rotate 45° to become `×`.
- **No bounces, no parallax, no scroll-jacking.** The brand is calm.

### Hover & press states
- **Hover** on body buttons: background swap to `--accent-soft`
  (Light Pink) or invert to `--fg` (charcoal).
- **Hover** on cards: 6 px lift + `--shadow-lg` + optional border swap
  to `--accent`.
- **Hover** on nav links: text color → `--accent`.
- **Press** on buttons: no shrink. The button's *background* swaps to
  charcoal. This keeps the layout grid intact.
- **Focus** rings: `box-shadow: 0 0 0 2px rgba(58,123,213,0.15)` +
  border swap to Pulse Blue. **Never** outline; never default browser
  ring.

### Transparency & blur
- The brand does **not** use frosted-glass / `backdrop-filter` effects.
- Light-pink hover washes are at `bg-light-pink/20` (12 % opacity) when
  drawn over the grid. That's the maximum transparency the brand uses.

### Imagery vibe
- **Warm, analog, slightly faded.** Desert beiges and museum-paper
  off-whites dominate. When color appears, it's the brand's own Pulse
  Blue or Signal Red.
- **No people stock photos.** No team headshots beyond Anthony's own.
- **No glossy product mockups.** The brand prefers blueprints, diagrams,
  topographic maps, and physical artifacts (a rotary phone, a metronome).

---

## Iconography

The icon language is unique enough that it deserves rules. Substitution
is allowed only when documented.

### Primary set — the Artifact Icons
Six hand-drawn line-art icons drawn in 1 px charcoal, often with a single
red dot to mark a peak / focal point. These are the *named* department
artifacts:

| File | Concept | Notes |
| --- | --- | --- |
| `assets/icon-topo.png` | Topographical contour | "The Permanent Observation Post" — support / monitoring |
| `assets/icon-phone.png` | Rotary phone | Direct line / "we answer" |
| `assets/icon-metronome.png` | Metronome | Automation / rhythm of the Bureau |
| `assets/icon-engine.png` | Engine / mechanism | Integrations — internal mechanics |
| `assets/icon-compass.png` | Compass rose | Wayfinding / strategy |
| `assets/icon-route66.png` | Route 66 shield | Kingman locality |
| `assets/design-icon.png` | Design Bureau mark | rendered as a circular badge |
| `assets/integrations-icon.png` | Cooperation mark | circular badge |
| `assets/automation-icon.png` | Self-Governing Bureau mark | circular badge |
| `assets/support-icon.png` | Observation Post mark | circular badge |

> **Hard rule from the style guide**: *abstract tech shapes (clouds,
> gears, generic nodes) are forbidden.* Replace with literal vintage
> artifacts. If you need a new icon, sketch a real-world object in 1 px
> line-art, then add (optionally) a single red dot at the focal point.

### Secondary set — Lucide (CDN)
The shipping website also uses **Lucide Icons** from CDN for utility UI
(menu, ×, chevrons, mail, phone, etc.). Lucide's 1.5 px stroke matches
the brand's line-art aesthetic well, so it's the **only** sanctioned
substitute when the Artifact set doesn't cover a need.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<i data-lucide="phone"></i>
<script>lucide.createIcons();</script>
```

If Lucide doesn't cover a concept, **Heroicons (outline, 1.5 px)** is
the next-best CDN match. Document any substitution.

### Emoji & unicode
- **No emoji.** The brand uses `·` middots, `→`/`←` arrows, `+` plus
  signs, and bracketed labels (`[ … ]`) instead.

### Logo system
- `assets/logo-banner-blue.png` — primary horizontal lockup (blue dot +
  wordmark) on white. **The default.**
- `assets/logo-banner-vermilion.png` / `-vermilion-glow.png` — red-dot
  variant. Use when blue would clash (e.g. on Pulse-Blue backgrounds).
- `assets/logo-banner-blue-lrg.png` — large-size export.
- `assets/logo-banner-small.png` — compact (favicon-adjacent).
- `assets/logo-wordmark.png` — type-only mark (no dot).
- `assets/logo-DA-mark.png` — "DA" monogram (rare).
- `assets/logo-pulse-blue.png` / `logo-pulse-red.png` — the standalone
  dot mark.
- `assets/favicon.svg` — the red-dot favicon.

Clear space around the logo = the height of the dot itself.

---

## Sample copy reuse

Below are real lines from the shipping site. Reuse them verbatim when the
context fits — they're load-bearing brand expressions.

- **Hero**: "Technological Solutions for People with Better Things to Do."
- **Hero subhead**: "I build systems that don't require a master's degree to operate."
- **Hero pinned note**: "Clean engineering, clear communication, and follow-through that won't require follow up."
- **CTAs**: `[ Inquire Within ]` / `[ View the Diagrams ]`
- **Departments tagline**: "Four distinct operations. One point of contact."
- **Pricing tagline**: "Strategy is Free. Execution is Paid."
- **Reciprocity Loop intro**: "I do not charge for conversations or clarity. Call it a professional courtesy."
- **No-Ghosting Guarantee**: "If I take your project, I finish it. If something changes, I tell you. Going quiet is not part of my service model."
- **Closing line**: "I am historically easy to reach. I live in Kingman. If you call, I answer. It is a very avant-garde concept called 'Doing My Job.'"
- **Footer**: "Need a strategic ally?"
- **Contact form**: *The Command Center* → *Send a Transmission*

---

## Contact / reference

- **Web**: https://digitalallies.net
- **Phone**: (928) 228-5769 (Kingman, AZ)
- **Email**: contact@digitalallies.net
- **Owner**: Anthony
- **Repos**: `Digital-Allies/DigitalAllies_V2`, `Digital-Allies/brand`

---

*High-end engineering delivered with the enthusiasm of a librarian on a Tuesday.*
