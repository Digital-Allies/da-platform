# Atomic Finds Design System

**Vintage rattan. Modern sensibility. Curated with love by Fran & Mabel.**

A comprehensive dark-mode design system for Atomic Finds ATX — blending celestial 70s aesthetics with premium vintage rattan & bamboo curation. This system provides tokens, components, UI kits, and guidelines for building cohesive interfaces across all Atomic Finds digital products.

---

## Sources & Context

### Provided Materials
- **Atomic Finds Design System** (mounted local folder) — Contains existing brand guidelines, visual assets, component library references, and style documentation from Fran & Mabel's Rattan Revival Retreat
- **Key Files Reviewed:**
  - `Brand Voice & Usage Guide.md` — Copywriting, tone, and messaging standards
  - `Atomic Fines Dark Mode Style Guide.md` — Complete visual guidelines
  - `atomic-finds-design-system/` folder — Existing CSS tokens, colors, typography, and component patterns
  - `assets/` folder — Alien character assets, logos, and visual materials

### Company Overview
**Atomic Finds ATX** is a curated vintage rattan furniture business founded by Fran & Mabel. They source, restore, and resell authentic mid-century and 1970s rattan and bamboo pieces with a focus on craftsmanship, sustainability, and authentic storytelling.

**Products:**
- **E-commerce website** — Hero-driven homepage, product catalog, collection browsing, shopping cart
- **CMS/Admin interface** — Product management, inventory, content creation (via Digital Allies CMS)

**Brand Personality:**
- Warm, authentic, handmade
- Expert but approachable
- Celebrates heritage and sustainability
- Uses whimsical alien characters as visual mascots of discovery

---

## Visual Identity

### Color Palette — Dark Mode Celestial 70s

The system uses a carefully curated 6-core palette derived from vintage rattan tones and cosmic inspiration:

| Color | Hex | Role |
|-------|-----|------|
| Deep Charcoal | #1E1E1E | Primary background |
| Rattan Black | #2A2017 | Card surfaces, section variation |
| Celestial Yellow | #F5C842 | Primary accent, glow effect |
| Amber Orange | #D4822A | Secondary accent, script, hover |
| Bone White | #F0E8D8 | Body text, primary foreground |
| Woven Moss | #556B4A | Eco tags, muted accents |

### Typography

- **Headings (Display / H1 / H3):** Lilita One — chunky, characterful display for titles, card names, and prices. The single working heading face.
- **H2 / Script:** Tilda Script — brush script for H2 and accent taglines / logo. The **only** script in the system — never stack it with another decorative face.
- **Body:** DM Sans — clean, warm, humanist sans for body copy and UI
- **Expressive (optional):** Agbalumo — warm retro-rounded display, available for rare one-off moments; not used by default

### Key Design Motifs

- **Glow over shadow** — Uses golden `text-shadow` and `box-shadow` effects instead of traditional drop shadows
- **Rattan weave texture** — Subtle diagonal pattern overlay at ~3% opacity, evoking woven rattan
- **Orbital rings** — Signature "Galaxy Card" component features a tilted 3D orbital ring that wraps the card, with a glowing moon orbiting in front/behind for depth
- **Soft corners** — All radius values are soft (6, 12, 18, 24px) — never square edges
- **Warm color grading** — Photography and overlays lean toward amber, gold, and warm brown tones

### Motion & Interaction

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — bouncy, organic feel
- **Durations:** 180ms (quick), 300ms (standard), 600ms (slow)
- **Hover behavior:** Cards lift 6px upward, glow intensifies, text gains subtle shadow
- **No animations unless** `prefers-reduced-motion: no-preference`

---

## CONTENT FUNDAMENTALS

### Voice & Tone

**Character:** Warm, authentic, expert-but-approachable. Sounds like two friends who know their stuff and genuinely love what they do.

**Core Values in Copy:**
1. **Handcrafted Heritage** — Celebrate the story behind each piece. Emphasize mid-century craftsmanship, era-specific details, condition authenticity.
2. **Sustainable by Nature** — Frame vintage buying as the ultimate eco-choice: no waste, timeless design, built to last generations.
3. **Fran & Mabel's Personality** — The business is built on real people. Honor their taste, expertise, and warmth. Use their names; avoid corporate language.

**Vocabulary:**
- ✅ Use: "Handpicked," "Restored," "1970s," "Mid-century," specific piece names ("Peacock Chair," "Sunburst Mirror")
- ❌ Avoid: "Pre-owned," "Refurbished," "Authentic vintage authenticity," "Retro period," generic terms

**Punctuation & Style:**
- Em-dashes (—) for flow and emphasis
- Square brackets [ ] for CTAs: "[ Explore Collection ]"
- Sentence case for headers
- ALL CAPS for labels/eyebrows: "FEATURED COLLECTION"
- No emoji in marketing copy; let the aliens do the visual work

**Button Copy (Use Square Brackets):**
- "[ Explore Collection ]" — Hero, general browsing
- "[ View Full Catalog ]" — Category pages
- "[ Schedule Viewing ]" — High-value pieces
- "[ Learn Our Story ]" — About section
- "[ Get in Touch ]" — Contact / custom requests

**Example Product Description:**
> "This 1970s peacock chair is the statement piece every room deserves. The iconic fan-back design is instantly recognizable, and the natural rattan has that perfect patina that says 'I've been loved.' Ready to add authentic mid-century energy to your space—or make someone's year as a gift."

---

## VISUAL FOUNDATIONS

### Background & Texture Systems

**Rattan Weave Pattern:**
A subtle diagonal cross-hatch pattern (3–5% opacity) applied to dark backgrounds, evoking the woven texture of vintage rattan furniture. Creates warmth and dimensionality without overwhelming content.

**Section Backgrounds:**
- **Hero:** Warm radial gradient overlay (amber/orange at 50% opacity, fading out) over the weave, plus a linear gradient from warm charcoal to deep black
- **Cards:** Secondary dark surfaces (#2A2017) with 1px golden border, 2px on hover
- **CTA Sections:** Deep charcoal with hero gradient overlay for emphasis
- **Gallery/Featured:** Darkest backgrounds with subtle warm radial glows

**Photography & Imagery:**
- **Style:** Warm lighting (golden hour), close-ups showing rattan texture, lifestyle context
- **Placement:** Hero full-bleed or right column (text left); gallery grids; featured sections with breathing room
- **Color Grading:** Warm tones, slightly desaturated, no harsh shadows
- **Aliens:** Full-body character illustrations (transparent PNGs), ~280–400px, placed in hero or special sections with golden drop-shadow filter

### Spacing System

**Base:** 4px scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 120px)

- **Micro:** 4–8px (button padding, form spacing)
- **Standard:** 16–24px (component margins, card padding)
- **Large:** 32–48px (section gaps, grid gaps)
- **Extreme:** 80–120px (section top/bottom padding)

**Layout Rules:**
- Max width: 1280px (standard), 820px (prose content)
- Section padding: 120px vertical, 48px horizontal
- Gap: 32px (grids), 20px (buttons/elements), 48px (column layouts)

### Border & Shape System

**Radius (Never Square):**
- Small: 6px
- Medium: 12px
- Large: 18px
- Extra Large: 24px
- Pill: 999px (fully rounded buttons, badges)

**Borders:**
- Light: 1px solid rgba(245,200,66,0.15) — subtle gold at low opacity
- Strong: 2px solid #F5C842 — golden, used on hover or primary focus
- Dashed: 1px dashed rgba(92,74,61,0.5) — dividers, soft breaks

### Shadow & Glow System

**Replaces traditional drop-shadow with glowing effects:**

- **Glow Small:** `0 0 8px rgba(245,200,66,0.35)` — subtle golden halos
- **Glow Medium:** `0 0 16px rgba(245,200,66,0.50)` — standard cards/buttons
- **Glow Large:** `0 0 30px rgba(245,200,66,0.60)` — hero elements, emphasis
- **Glow Amber:** `0 0 12px rgba(212,130,42,0.55)` — secondary warmth
- **Glow Ring:** `0 0 12px rgba(245,200,66,0.9), 0 0 32px rgba(212,130,42,0.6)` — orbital rings (Galaxy Card)

**Text Shadow:** Applied to headlines for luminous, glowing effect without actual text stroke

### Component Patterns

**Buttons:**
- Fully rounded pills (border-radius: 999px)
- Solid yellow (primary action): Filled, glowing, lifts 2px on hover
- Outlined primary/amber (secondary): Transparent with 2px border, glow on hover
- Disabled: 45% opacity, no transform, no glow
- Typography: DM Sans, 14px, 700 weight, ALL CAPS, +0.04em tracking

**Cards:**
- Background: #23201B (rattan black) with 1px golden border
- Padding: 24px standard, 14px compact
- Hover: Lift 6px, border glows stronger, glow effect appears
- Border radius: 18px (large)
- Image wells: Radial gradient dark center for depth

**Galaxy Card (Signature Component):**
- Central feature: Glowing orbital ring (2.5px golden border) wraps the entire card
- Ring depth: Tilted 3D effect so the moon appears in front at the bottom, behind at the top
- Moon: 18px glowing sphere, orbits continuously at 16s, speeds up on hover (8s)
- Card interior: Single continuous rounded shape; image flows straight into info
- Image well: 94% width, dark `#2D2D2D` inset panel, gold border, holds the product shot
- Background: galaxy nebula watercolor (`bg` prop) behind a dark scrim, giving each card its own cosmic wash
- Ring: tilted 3D gold orbital ring (25s spin) with a teal moon orbiting — behind the card up top, in front along the bottom
- Stars: three static glowing points on the ring
- Text: Title in Lilita One (heading font), amber Tilda Script tagline, body description, amber price pill with orbit icon
- Size: 360px × 520px, hover scale 1.03

**Badges & Status Indicators:**
- In Stock: Golden background, dark text, small glow
- Featured: Amber background, dark text, amber glow
- Out of Stock: Transparent, woven-moss border and text
- Eco/Restored: Woven-moss background, bone-white text
- Typography: DM Sans, 11px, 700, ALL CAPS, +0.10em tracking

**Form Elements:**
- Label: DM Sans, 12px, 700, ALL CAPS, +0.10em tracking, amber color
- Input/Select/Textarea: Dark inset background (#14120E), 1px subtle golden border
- Focus: 2px golden border, glow shadow (0 0 0 2px + 0 0 14px)
- Placeholder: Muted text color
- Padding: 12px horizontal, 12px vertical

**Navigation Bar:**
- Background: Deep charcoal at 92% opacity with blur backdrop (10px)
- Border: 1px golden at low opacity
- Logo: Playfair Display (display family), 24px, glowing yellow
- Links: DM Sans, 12px, 600, ALL CAPS, +0.04em tracking; hover gains glow + color shift
- Position: Sticky (top: 0, z-index: 100)

**Footer:**
- Background: Darkest charcoal (#161310)
- Border-top: 1px golden at low opacity
- Grid: auto-fit columns, 200px min, 48px gap
- Headings: Display family, 16px, golden, glowing
- Links: 12px, muted text, hover → golden + glow
- Divider: 1px dashed rich brown

### Hover & Interaction States

**Cards & Containers:**
- Transform: translateY(-6px) upward
- Border: Golden color, stronger opacity
- Glow: Medium or large intensity
- Duration: 300ms ease-out
- No state change if `prefers-reduced-motion: reduce`

**Links & Buttons:**
- Color shift (muted → golden)
- Text glow: Small to medium
- Background (if transparent): Subtle golden tint, ~10% opacity
- Duration: 300ms ease-out

**Images:**
- Slight scale-up (1.02x) on hover
- Optional: Warm overlay fade-in
- Duration: 300ms ease-out

### Typography Hierarchy

| Level | Family | Size | Weight | Color | Glow |
|-------|--------|------|--------|-------|------|
| Display | Lilita One | 88px | 400 | Bone White | Medium glow |
| H1 | Lilita One | 64px | 400 | Celestial Yellow | Medium glow |
| H2 | Tilda Script | 48px | 400 | Celestial Yellow | Medium glow |
| H3 | Lilita One | 22px | 400 | Celestial Yellow | Small glow |
| Script (Accent) | Tilda Script | 38px | 400 | Amber Orange | Amber glow |
| Expressive (optional) | Agbalumo | — | 400 | Bamboo Honey | Small glow |
| Body | DM Sans | 16px | 400 | Bone White | None |
| Small | DM Sans | 14px | 400 | Muted | None |
| Label/Eyebrow | DM Sans | 12px | 600 | Amber Orange | None |

**Line Height:**
- Tight: 1.05 (display, short text)
- Snug: 1.15 (headings)
- Normal: 1.6 (body text)
- Relaxed: 1.75 (generous prose)

---

## Components

### Core UI Primitives
- **Button** — Primary, secondary, amber variants; sizes
- **Badge** — Status indicators (in-stock, featured, eco, out-of-stock)
- **Card** — Feature cards, product cards, testimonial cards
- **Galaxy Card** — Signature orbital ring component
- **Input/Select/Textarea** — Form elements with golden focus
- **Icon Button** — Small interaction targets
- **Testimonial** — Quote pattern with author

### Variants & States
- Default, hover, active, disabled, loading (where applicable)
- All components respect `prefers-reduced-motion`
- Dark mode is the canonical design; high contrast ensured

---

## UI Kits

### Atomic Finds Website
Homepage and core screens demonstrating:
- Sticky navigation with logo and links
- Hero section (image + headline + CTA)
- Feature grid (4 cards)
- Gallery grid (6 product/collection pieces)
- CTA section with prominent button
- Multi-column footer with links and social

---

## Accessibility

**WCAG AA Compliance:**
- ✅ All text ≥14px (body), labels ≥12px
- ✅ Contrast ≥4.5:1 for body text, ≥3:1 for large text
- ✅ Links have visible focus state (golden glow)
- ✅ Form inputs labeled and associated
- ✅ Keyboard navigation fully supported
- ✅ No mouse-only interactions
- ✅ Reduced-motion respected (animations disabled if preference set)
- ✅ Alt text on all images
- ✅ Color not sole indicator of status (icon + text used together)

---

## File Structure

```
/
├── styles.css                    (root @import manifest)
├── tokens/
│   ├── colors.css              (color custom properties)
│   ├── typography.css          (font stacks, type scale)
│   └── spacing.css             (spacing, radius, borders)
├── components/
│   ├── buttons/
│   │   ├── Button.jsx
│   │   ├── Button.d.ts
│   │   ├── Button.prompt.md
│   │   └── buttons.card.html
│   ├── feedback/
│   │   ├── Badge.jsx
│   │   ├── Badge.d.ts
│   │   └── badges.card.html
│   ├── cards/
│   │   ├── Card.jsx
│   │   ├── Card.d.ts
│   │   ├── GalaxyCard.jsx
│   │   ├── GalaxyCard.d.ts
│   │   └── cards.card.html
│   └── forms/
│       ├── Input.jsx
│       ├── Input.d.ts
│       └── forms.card.html
├── assets/
│   ├── aliens/
│   │   ├── alien-daisy.png
│   │   ├── alien-malibu.png
│   │   └── ...
│   ├── logos/
│   └── illustrations/
├── guidelines/
│   ├── colors.card.html
│   ├── typography.card.html
│   ├── spacing.card.html
│   └── brand.card.html
└── ui_kits/
    └── atomic_finds_website/
        ├── index.html
        ├── Homepage.jsx
        └── ...
```

---

## Building with This System

### For Designers
1. Reference this README for brand voice, visual principles, and color palette
2. Use the component cards in the Design System tab to see live examples
3. Import colors, type scales, and spacing tokens from `styles.css`
4. Follow the interaction patterns and hover states documented above

### For Developers
1. Link `styles.css` (which imports all tokens)
2. Import components from the compiled `_ds_bundle.js` using the namespace
3. Use CSS custom properties for theming: `var(--celestial-yellow)`, `var(--glow-md)`, etc.
4. Respect `prefers-reduced-motion` in all interactive features
5. Test against WCAG AA contrast and focus state requirements

### For Content
- Follow the Brand Voice guidelines in copywriting
- Use the provided button copy; keep language warm, authentic, plain
- Celebrate the story behind every piece
- Reference Fran & Mabel and their expertise

---

## Roadmap

- ✅ Foundation: Colors, typography, spacing, glow system
- ✅ Components: Button, Badge, Card, Galaxy Card, Form elements
- ⏳ UI Kit: Complete Atomic Finds website template
- ⏳ Guidelines Cards: Interactive specimen cards for Design System tab
- ⏳ Starting Points: Seed screens for consuming projects

---

**Last Updated:** June 24, 2026  
**Brand:** Atomic Finds ATX — Fran & Mabel's Rattan Revival Retreat  
**Aesthetic:** Dark-mode celestial 70s with golden-glow neon accents and vintage rattan warmth

