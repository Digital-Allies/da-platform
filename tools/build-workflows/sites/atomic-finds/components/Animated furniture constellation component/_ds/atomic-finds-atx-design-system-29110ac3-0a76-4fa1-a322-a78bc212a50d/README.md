# Atomic Finds Design System

**Far-out finds, down-to-earth prices.**

A dark-mode design system for Atomic Finds ATX — celestial 70s aesthetics wrapped around premium vintage rattan & bamboo curation. Tokens, components, guidelines, and a homepage template for building cohesive Atomic Finds interfaces.

---

## The Owner

**Jennyfer** is the sole owner, sourcer, and restorer behind Atomic Finds ATX, based in Austin, TX. She hand-sources authentic mid-century and 1970s rattan and bamboo pieces, restores them herself, and sells them with the full story attached. Every "About," "Curated by," or "Handpicked by" credit in this system refers to Jennyfer — she is the only person described as the owner or curator anywhere in Atomic Finds copy.

**Note on "Fran & Mabel":** these names appear in some legacy assets and archived docs. They are **not** owners or people — they're the names of two vintage furniture sets (a rattan settee/chair pairing) that were once photographed together. Do not use "Fran & Mabel" to describe the business, its voice, or anyone on the team; if referenced at all, it's strictly as a product/collection name.

**Brand Personality:**

- Warm, authentic, handmade
- Expert but approachable — Jennyfer knows her stuff and genuinely loves what she does
- Celebrates heritage and sustainability
- Uses whimsical alien mascots ("The Curators") as visual characters of discovery — never as substitutes for Jennyfer herself

---

## Logo System

Assets live in `assets/logos/`; see `guidelines/logo.card.html` for the full specimen.

| File | Use |
| --- | --- |
| `primary-navigation-home-logo.png` | The nav/header mark — site header, always on dark surfaces. This is the default "go home" logo. |
| `logo-dark-bg.png` | Full lockup for dark surfaces (hero, footer, print on charcoal) |
| `logo-light-bg.png` | Full lockup for light/paper surfaces (packaging, light emails) |
| `logo-monogram-light-bg.png` | Compact monogram — favicon, social avatar, tight spaces only |
| `logo-pill-badge.png` | Rounded badge mark — stickers, tags, small stamps |
| `logo-catchphrase-lockup.png` | Logo + catchphrase wide lockup — footers, packaging, hero close |

**Rules:** never recolor the mark, never place it on a busy photo without a scrim, keep clear space equal to the mark's own height on all sides, and always reach for `primary-navigation-home-logo.png` first for anything resembling a site header.

### Catchphrases & Positioning

**Primary positioning line** (hero eyebrow, homepage lead):

> **Far-out finds, down-to-earth prices.**

Four-word logo-lockup cadence — short, staccato, all lower- or sentence-case, pairs with the wordmark:

> **Restored. Vintage. Rattan. Bamboo.**

Other approved catchphrases, same rhythm:

- **Handpicked. Restored. Ready for its forever home.**
- **Sourced with an eye. Restored with love.**
- **Mid-century, made to last.**
- **Giving vintage a second life.**

Other positioning lines (use sparingly, don't stack with the primary):

- Where Vintage Meets Digital
- The Digital Bazaar for Vintage Souls
- Good taste doesn't have to cost a fortune.

Use one per layout max — pair with the logo lockup or as a hero sub-line, never stacked with another script line.

---

## Visual Identity

### Color Palette — Dark Mode Celestial 70s

| Color | Hex | Role |
| --- | --- | --- |
| Deep Charcoal | #1E1E1E | Primary background |
| Rattan Black | #2A2017 | Card surfaces, section variation |
| Celestial Yellow | #F5C842 | Primary accent, glow effect |
| Amber Orange | #D4822A | Secondary accent, script, hover |
| Bone White | #F0E8D8 | Body text, primary foreground |
| Woven Moss | #556B4A | Eco tags, muted accents |

### Typography

All three brand faces are self-hosted locally in `fonts/` — no broken/staged copies remain.

- **Headings (Display / H1 / H3):** Bagel Fat One (`fonts/BagelFatOne-Regular.ttf`) — chunky, characterful display for titles, card names, and prices.
- **H2 / Script:** Pacifico (Google Fonts) — brush script for H2 and accent taglines / logo. The **only** script in the system — never stack with another decorative face. (Tilda Script's only available file was a watermarked trial build, so it's been retired in favor of Pacifico — also the live site's script font.)
- **Body:** DM Sans (Google-hosted) — clean, warm, humanist sans for body copy and UI.
- **Expressive (optional):** Agbalumo (`fonts/Agbalumo-Regular.ttf`) — warm retro-rounded display for rare one-off moments; not used by default.

### Key Design Motifs

- **Glow over shadow** — golden `text-shadow`/`box-shadow` instead of traditional drop shadows
- **Rattan weave texture** — subtle diagonal pattern overlay at \~3% opacity
- **Starry galaxy backgrounds** — `.af-starfield` utility (see `tokens/spacing.css` + `guidelines/starfield.card.html`) layers twinkling star points over the hero gradient for full-width cosmic sections
- **Orbital rings** — the Galaxy Card's signature tilted 3D ring + orbiting moon
- **Soft corners** — radius values 6/12/18/24/pill — never square edges
- **Warm color grading** — amber, gold, warm brown throughout photography and overlays

### Motion & Interaction

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — bouncy, organic
- **Durations:** 180ms (quick), 300ms (standard), 600ms (slow)
- **Hover behavior:** cards lift 6px, glow intensifies
- **Respects** `prefers-reduced-motion`

---

## CONTENT FUNDAMENTALS

### Voice & Tone

**Character:** Warm, authentic, expert-but-approachable. Sounds like Jennyfer — a professional who knows her stuff and genuinely loves what she does.

**Core Values in Copy:**

1. **Handcrafted Heritage** — celebrate the story behind each piece; mid-century craftsmanship, era-specific detail, condition authenticity.
2. **Sustainable by Nature** — vintage buying as the ultimate eco-choice: no waste, timeless design, built to last generations.
3. **Jennyfer's Personality** — the business is built on a real person. Honor her taste, expertise, and warmth. Use her name; avoid corporate language, and never attribute the business to anyone else.

**Vocabulary:**

- ✅ Use: "Handpicked," "Restored," "1970s," "Mid-century," specific piece names ("Peacock Chair," "Sunburst Mirror")
- ❌ Avoid: "Pre-owned," "Refurbished," "Authentic vintage authenticity," "Retro period," generic terms

**Punctuation & Style:**

- Em-dashes (—) for flow and emphasis
- Square brackets \[ \] for CTAs: "\[ Explore Collection \]"
- Sentence case for headers; ALL CAPS for labels/eyebrows: "FEATURED COLLECTION"
- No emoji in marketing copy; let The Curators do the visual work

**Button Copy:**

- "\[ Explore Collection \]" — Hero, general browsing
- "\[ View Full Catalog \]" — Category pages
- "\[ Schedule Viewing \]" — High-value pieces
- "\[ Learn Our Story \]" — About section
- "\[ Get in Touch \]" — Contact / custom requests

**Page Description Blocks (short, on-file):**

- **About / Story:** Restored with love in Austin, TX. We hunt the far reaches of the vintage universe so every rattan and bamboo piece lands in your home with presence — minus the boutique markup.
- **Shop / Collection:** Curated rattan & bamboo for modern living. Every piece is hand-picked, restored, and ready to adopt.
- **Durability line (feature callout):** Vintage rattan that has already outlasted three generations of trends. Built for another 50 years.

**Example Product Description:**

> "This 1970s peacock chair is the statement piece every room deserves. The iconic fan-back design is instantly recognizable, and the natural rattan has that perfect patina that says 'I've been loved.' Ready to add authentic mid-century energy to your space—or make someone's year as a gift."

---

## VISUAL FOUNDATIONS

### Background & Texture Systems

**Rattan Weave Pattern:** Subtle diagonal cross-hatch (3–5% opacity) on dark backgrounds.

**Starry Galaxy Background:** `.af-starfield` — ten scattered star points (twinkle animation) layered over any section; use for hero, Galaxy Card surrounds, or a full-bleed feature band.

**Section Backgrounds:**

- **Hero:** Warm radial gradient overlay over the weave, plus charcoal-to-black linear gradient
- **Cards:** Secondary dark surfaces (#2A2017) with 1px golden border, 2px on hover
- **CTA Sections:** Deep charcoal with hero gradient overlay
- **Gallery/Featured:** Darkest backgrounds with subtle warm radial glows

**Photography & Imagery:**

- Warm lighting (golden hour), close-ups of rattan texture, lifestyle context
- Warm, slightly desaturated color grading, no harsh shadows
- The Curators: full-body illustrated mascots (transparent PNGs), \~280–400px, golden drop-shadow filter

### Spacing System

**Base:** 4px scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 120px)

- Micro: 4–8px · Standard: 16–24px · Large: 32–48px · Extreme: 80–120px

**Layout Rules:**

- Max width: 1280px (standard), 820px (prose)
- Section padding: 120px vertical, 48px horizontal
- Gap: 32px (grids), 20px (buttons), 48px (columns)

### Border & Shape System

**Radius:** Small 6px · Medium 12px · Large 18px · XL 24px · Pill 999px

**Borders:**

- Light: 1px solid rgba(245,200,66,0.15)
- Strong: 2px solid #F5C842
- Dashed: 1px dashed rgba(92,74,61,0.5)

### Shadow & Glow System

- **Glow Small:** `0 0 8px rgba(245,200,66,0.35)`
- **Glow Medium:** `0 0 16px rgba(245,200,66,0.50)`
- **Glow Large:** `0 0 30px rgba(245,200,66,0.60)`
- **Glow Amber:** `0 0 12px rgba(212,130,42,0.55)`
- **Glow Ring:** `0 0 12px rgba(245,200,66,0.9), 0 0 32px rgba(212,130,42,0.6)` — orbital rings (Galaxy Card)

### Component Patterns

**Buttons:** fully rounded pills, solid yellow primary (glows, lifts 2px on hover), outlined amber secondary, 45% opacity disabled. DM Sans 14px 700 ALL CAPS +0.04em.

**Cards:** #23201B surface, 1px golden border, 24px padding, hover lift 6px + stronger glow, 18px radius.

**Galaxy Card (Signature Component)** — status: ✅ up to date, verified against latest spec:

- Glowing orbital ring (2.5px gold) wraps the card, tilted 3D so the moon reads in front at bottom, behind at top
- Teal glowing moon orbits continuously (25s), three static stars on the ring
- Image well: 94% width, dark inset panel, gold border
- Background: nebula wash (`bg` prop) behind a dark scrim — unique cosmic tint per card
- Text: Bagel Fat One title, amber Pacifico tagline, body description, amber price pill with orbit icon
- Size: 360×520px, hover scale 1.03
- Fonts, icons, and image paths all verified against real local assets — no broken references

**Badges:** In Stock (gold bg), Featured (amber bg), Out of Stock (moss outline), Eco/Restored (moss bg). DM Sans 11px 700 ALL CAPS +0.10em.

**Forms:** ALL CAPS amber labels, dark inset fields, 2px gold glow on focus.

**Navigation Bar:** Charcoal 92% + blur backdrop, 1px gold border, `primary-navigation-home-logo.png` as the home mark, ALL CAPS DM Sans links with glow on hover, sticky top.

**Footer:** Darkest charcoal, 1px gold border-top, auto-fit column grid, dashed divider.

### Hover & Interaction States

- **Cards/Containers:** translateY(-6px), golden border, medium/large glow, 300ms ease-out
- **Links/Buttons:** color shift to gold, small-medium text glow, subtle gold tint bg
- **Images:** 1.02x scale on hover, optional warm overlay fade
- **Full-width text bands** (e.g. "ATOMIC FINDS ATX"): subtle lift (translateY(-2px)) + glow intensify on hover

### Typography Hierarchy

| Level | Family | Size | Weight | Color | Glow |
| --- | --- | --- | --- | --- | --- |
| Display | Bagel Fat One | 88px | 400 | Bone White | Medium |
| H1 | Bagel Fat One | 64px | 400 | Celestial Yellow | Medium |
| H2 | Pacifico | 48px | 400 | Celestial Yellow | Medium |
| H3 | Bagel Fat One | 22px | 400 | Celestial Yellow | Small |
| Script (Accent) | Pacifico | 38px | 400 | Amber Orange | Amber |
| Expressive (optional) | Agbalumo | — | 400 | Bamboo Honey | Small |
| Body | DM Sans | 18px | 400 | Bone White | None |
| Small | DM Sans | 14px | 400 | Muted | None |
| Label/Eyebrow | DM Sans | 12px | 600 | Amber Orange | None |

Body size raised from 16px → 18px for legibility and contrast at homepage scale (see Homepage Spec).

**Line Height:** Tight 1.05 · Snug 1.15 · Normal 1.6 · Relaxed 1.75

---

## Components

- **Button** — Primary, secondary, amber variants; sizes
- **Badge** — Status indicators (in-stock, featured, eco, out-of-stock)
- **Card** — Feature cards, product cards, testimonial cards
- **ProductCard / ProductGrid** — Live Supabase `products` table, drop-in for the CMS engine's `products` block (image fallback, sale price, "Inquire" state, attribute chips, seller trust line)
- **Galaxy Card** — Signature orbital ring component (verified current, see above)
- **Input/Select/Textarea** — Form elements with golden focus
- **Icon** — 31 brand icons (nav, features, furniture, celestial) — all real source artwork, no broken exports

All components respect `prefers-reduced-motion`; dark mode is canonical.

---

## Homepage Spec

See **`ui_kits/website/index.html`** — the full reference homepage, matching the live Atomic Finds ATX site's section structure (hero, collection, featured galaxy cards, process, reviews, contact) with these system updates layered in. Full brief for handoff to Figma Make: **`ui_kits/website/Homepage-Handoff-README.md`**.

1. **Nav** — `primary-navigation-home-logo.png` at 56px with a glow plate + hover-intensifying drop-shadow; nav background lightened to `rgba(52,40,24,0.94)` so the navy mark reads with contrast.
2. **Body text** raised to 18px on `--fg-body` (higher-contrast bone white) everywhere copy previously used the dimmer muted tone.
3. **About Jennyfer** section — portrait + bio establishing the real owner behind sourcing and restoration.
4. **Full-width "ATOMIC FINDS ATX" text band** — full-bleed, all caps, Bagel Fat One, celestial yellow with multi-layer glow; lift + glow boost on hover.
5. **The Curators** section (renamed from "Alien Characters") — same four mascot illustrations, relabeled.
6. **Fixed starry galaxy background** — \~90 twinkling star points behind a weave overlay, spanning the full page (plus `.af-starfield` utility for standalone sections elsewhere).
7. **The Collection** — category tabs + full product grid using the 14 real product photos + subhead "Curated rattan & bamboo for modern living. Every piece is hand-picked, restored, and ready to adopt."
8. **In the Spotlight** — three live `GalaxyCard` components (real design-system component, not a static mock) + durability callout: "Vintage rattan that has already outlasted three generations of trends. Built for another 50 years."
9. **How We Deliver, Reviews, Contact, Footer** — ported with Jennyfer as the sole named owner (no "Fran & Mabel").

Structure: sticky nav → hero (starfield) → The Curators → About Jennyfer → full-width ATOMIC FINDS ATX band → The Collection → In the Spotlight (Galaxy Cards) → How We Deliver → Reviews → Contact → Footer.

---

## Accessibility

**WCAG AA Compliance:**

- ✅ Body text now 18px (was 16px) for stronger legibility; labels ≥12px
- ✅ Contrast ≥4.5:1 for body text (upgraded to `--fg-body` from `--fg-muted` where copy is primary reading content), ≥3:1 for large text
- ✅ Links have visible focus state (golden glow)
- ✅ Form inputs labeled and associated
- ✅ Keyboard navigation fully supported
- ✅ Reduced-motion respected
- ✅ Alt text on all images
- ✅ Color not sole indicator of status (icon + text used together)

---

## File Structure

```
/
├── styles.css
├── fonts/
│   ├── BagelFatOne-Regular.ttf
│   └── Agbalumo-Regular.ttf  (Pacifico loads from Google Fonts; Tilda Script's only copy was a watermarked demo, retired)
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   └── spacing.css              (incl. .af-starfield utility)
├── components/
│   ├── Button.jsx / Badge.jsx / Card.jsx / GalaxyCard.jsx / Icon.jsx
│   └── *.card.html
├── assets/
│   ├── logos/                   (primary-navigation-home-logo, wordmark, monogram, catchphrase lockup)
│   ├── icons/                   (31 real brand icons)
│   ├── aliens/                  (The Curators mascot illustrations)
│   ├── patterns/ , galaxy-card-backgrounds/
│   └── products/
├── guidelines/
│   ├── colors-*.card.html, typography.card.html, spacing.card.html, effects.card.html, shapes.card.html
│   ├── brand-voice.card.html
│   ├── logo.card.html
│   ├── starfield.card.html
│   └── curators.card.html
└── ui_kits/
    └── website/index.html       (Homepage Spec — see above)
```

---

## Building with This System

### For Designers

1. Reference this README for brand voice, visual principles, and color palette
2. Use the component cards in the Design System tab
3. Import colors, type scales, and spacing tokens from `styles.css`

### For Developers

1. Link `styles.css`
2. Import components from `_ds_bundle.js` via the namespace
3. Use CSS custom properties for theming
4. Respect `prefers-reduced-motion`
5. Test against WCAG AA

### For Content

- Follow the Brand Voice guidelines
- Use the provided button copy; keep language warm, authentic, plain
- Celebrate the story behind every piece
- Credit Jennyfer — never Fran & Mabel — as the person behind the business

---

## Roadmap

- ✅ Foundation: Colors, typography (self-hosted, verified), spacing, glow system
- ✅ Components: Button, Badge, Card, Galaxy Card, Form elements, Icon (31/31 real assets)
- ✅ Logo system: nav mark, lockups, monogram, catchphrase
- ✅ Homepage spec: About Jennyfer, full-width text band, starfield backgrounds, The Curators
- ⏳ Starting Points: Seed screens for consuming projects

---

**Last Updated:** July 16, 2026\
**Owner:** Jennyfer — Atomic Finds ATX\
**Aesthetic:** Dark-mode celestial 70s with golden-glow neon accents and vintage rattan warmth
