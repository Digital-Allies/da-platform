# Digital Allies Design System

**Technological Solutions for People with Better Things to Do.**

---

## 🎨 Color Palette

### Core Colors (5 Anchor)
| Color | Hex | Role |
|-------|-----|------|
| **Bone White** | #F9F6F0 | Canvas, background |
| **Charcoal** | #2D2D2D | Text, borders, structure |
| **Pulse Blue** | #3A7BD5 | Action, links, live connection |
| **Signal Red** | #C5301A | Attention, POI markers, warnings |
| **Pinned Note** | #FCFAED | Callout cards (functional accent) |
| **Light Pink** | #FADEEB | Subtle hover, accent wash |

### Philosophy: 95/5 Rule
**95% neutral canvas + 5% high-signal accents.** The brand breathes with whitespace. Accents are reserved for critical UI moments—actions, warnings, live states.

---

## 🔤 Typography

### Font Stack
- **Headers:** Lexend Deca (700 weight primary)
- **Body & Details:** JetBrains Mono (monospace for clarity)

### Type Scale

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Display | Lexend Deca | 64px | 700 | Hero titles, marquee |
| H1 | Lexend Deca | 40px | 700 | Page titles, section intros |
| H2 | Lexend Deca | 30px | 700 | Subsection titles |
| H3 | Lexend Deca | 18px | 600 | Card titles, callouts |
| Body | JetBrains Mono | 14px | 400 | Paragraph text (1.55 line height) |
| Small | JetBrains Mono | 12px | 400 | Captions, meta, secondary info |
| Eyebrow | JetBrains Mono | 10px | 700 | Uppercase tracked labels |
| Micro | JetBrains Mono | 9px | 700 | Tags, tiny labels |

### Line Height
- **Tight:** 1.1 (headings, display)
- **Snug:** 1.25 (subheadings)
- **Normal:** 1.55 (body, paragraphs)
- **Relaxed:** 1.7 (quoted text, highlighted blocks)

---

## 📏 Spacing Scale

**20px Technical Lace baseline (4px sub-unit)** — all spacing multiples of the core unit.

| Token | Value | Common Use |
|-------|-------|-----------|
| --space-1 | 4px | Micro spacers, icon padding |
| --space-2 | 8px | Small gaps between inline elements |
| --space-3 | 12px | Button padding, form element gaps |
| --space-4 | 16px | Card padding, section gaps |
| --space-5 | 20px | **One grid unit** — structural spacing |
| --space-6 | 24px | Card padding, outer gaps |
| --space-8 | 32px | Major section spacing |
| --space-10 | 40px | **Two grid units** — extreme whitespace |
| --space-12 | 48px | Between major sections |
| --space-16 | 64px | Full-width gutters |
| --space-20 | 80px | **Extreme whitespace** — breathing room |
| --space-24 | 96px | Page-level spacing |

---

## 🎲 Technical Lace Grid

The signature brand texture—a ruled-paper grid at **20px intervals**. Applied to backgrounds throughout the system. Creates a technical, approachable aesthetic reminiscent of blueprints and analog tools.

**Never use as a functional UI grid.** It is purely visual texture.

---

## 🎯 Components & Marks

### Pulse Dot
- **Size:** 12px
- **Animation:** 3000ms pulse (scale 1 → 1.25, opacity 1 → 0.5)
- **Purpose:** Live connection indicator only
- **Never:** Decorative use

### Signal Dot
- **Size:** 14px
- **Color:** Signal Red (#C5301A)
- **Animation:** None (always static)
- **Purpose:** POI marker, attention cue
- **Shadow:** Subtle drop shadow (2px offset, 20% opacity)

### Pinned Note Card
- **Background:** Pinned Note yellow (#FCFAED)
- **Border:** 1px charcoal + 4px left red accent
- **Pin:** Red circle (14px) centered at top with drop shadow
- **Use:** Callouts, warnings, brand voice highlights

---

## 🎬 Motion & Animation

### Timing Durations
| Duration | Use Case | Timing Function |
|----------|----------|-----------------|
| 180ms | Micro interactions (hover, focus) | cubic-bezier(0.4, 0, 0.2, 1) |
| 300ms | Standard transitions | cubic-bezier(0.16, 1, 0.3, 1) |
| 600ms | Fade-ins, large movements | cubic-bezier(0.16, 1, 0.3, 1) |
| 3000ms | Pulse dot animation (ONLY) | ease-in-out |

### Philosophy
**Calm motion.** The pulse dot is the only continuous animation in the system. Prefer stillness to motion. Motion should always serve purpose—never decoration.

---

## ⬜ Borders & Radius

### Corner Philosophy
**The brand is corner-square.** Corners are cut at 90°. Radius is minimal and functional.

| Token | Value | Use |
|-------|-------|-----|
| --radius-0 | 0 | Primary — all structural corners |
| --radius-1 | 2px | Form fields only |
| --radius-pill | 999px | Pulse dot, signal dot ONLY |

### Border Styles
| Token | Value | Use |
|-------|-------|-----|
| --border-1 | 1px solid #2D2D2D | Primary structural borders |
| --border-hairline | 1px solid rgba(45,45,45, 0.15) | Soft dividers inside cards |
| --border-dashed | 1px dashed rgba(45,45,45, 0.18) | Sketch-mode dividers |

---

## 🎤 Voice & Tone

### Primary Voice
**Authoritative but warm.** Technical clarity meets human empathy. We speak as the expert who genuinely wants to help—no corporate jargon, no condescension.

**Tagline:** "Technological Solutions for People with Better Things to Do."

### Tone Spectrum
- **Technical & Clear:** Spec docs, API copy, developer-facing content
- **Human & Direct:** Marketing, case studies, audience-facing messaging
- **Midwest Pragmatic:** No-nonsense, grounded, respectful of user time

### Audience
Local and regional B2B (Kingman, AZ—small business, light digital presence). We communicate at the level of the owner/operator—practical, actionable, not theoretical.

---

## 🎨 Brand Marks & Assets

The design system includes:
- **Logo Lockups:** Horizontal banner, stacked, favicon
- **Pulse Dot Animation:** Live connection indicator
- **Department Badges:** Circular variants for the four service areas
- **Artifact Icons:** Topo, compass, rotary phone, metronome, engine, Route 66
- **Photography Vibe:** Kingman highways, desert beige, warm analog aesthetic
- **Brand Motifs:** Suspension bridge (mission illustration), wavy-line banners, luminous-blue-dot tiles

---

## 🛠 Quick Reference: CSS Variables

Link `styles.css` to access all tokens:

```css
/* Colors */
--bone-white, --charcoal, --pulse-blue, --signal-red, --pinned-note, --light-pink

/* Typography */
--font-headers, --font-body, --font-details
--fs-display, --fs-h1, --fs-h2, --fs-h3, --fs-h4, --fs-body, --fs-small, --fs-micro, --fs-nano
--lh-tight, --lh-snug, --lh-normal, --lh-relaxed
--tracking-wide, --tracking-wider, --tracking-widest

/* Spacing */
--space-1 through --space-24

/* Structure */
--border-1, --border-hairline, --border-dashed
--radius-0, --radius-1, --radius-pill

/* Motion */
--ease-out, --ease-snap
--dur-quick, --dur-base, --dur-slow, --dur-pulse

/* Layout */
--lace-step (20px)
--content-max (1024px)
--wide-max (1280px)
```

---

## 📂 Component Categories

### Brand
- Logo Lockups
- Photography Vibe
- Department Badges
- Artifact Icons
- Brand Motifs (Bridge, Abstract Art)

### Typography
- Headings (H1–H4)
- Body & Mono
- Eyebrow Labels
- Type Scale Preview

### Foundation
- Colors (Core, Semantic, Tints)
- Spacing Scale
- Technical Lace Grid
- Borders & Shadows

### Components
- Buttons
- Inputs & Form Fields
- Navigation Patterns
- Accordion / Expandable
- Pinned Note Card
- Pulse Dot Animation
- Department Card
- Jargon Card (with tooltip)

### Voice & Content
- Primary Voice Guidelines
- Tone Spectrum
- Target Audience Definition
- Content Calendar & Asset Prompts
- Jargon Translation (Plain English mapping)

---

## 🚀 Getting Started

1. **Import global styles:** `<link rel="stylesheet" href="styles.css">`
2. **Use semantic class names:** `.da-h1`, `.da-body`, `.da-eyebrow`, `.da-pinned`, etc.
3. **Reference CSS variables:** All tokens are available as `var(--token-name)`
4. **Follow the grid:** 20px Technical Lace for all background textures
5. **Respect the 95/5 rule:** 95% neutral, 5% signal accent

---

## 📋 Design System Files

| File | Purpose |
|------|---------|
| `styles.css` | Global stylesheet (imports colors_and_type.css) |
| `colors_and_type.css` | Tokens, type scale, base resets, utility classes |
| `fonts/` | Local font files (Lexend Deca, JetBrains Mono) |
| `index.html` | Design system landing page |
| `preview/` | Component cards & specification sheets |
| `templates/` | Reusable design component templates |
| `assets/` | Brand marks, icons, case study PDFs |
| `cms/` | Marketing hub & content calendar |

---

**Last updated:** July 2026  
**Version:** 1.0  
**Status:** Live & Maintained
