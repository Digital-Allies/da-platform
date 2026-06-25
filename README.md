# Atomic Finds Design System — Complete Deliverables

## What's Included

### 1. Brand Foundation
- **Atomic Fines Brand System.dc.html** — Dark-mode visual identity guide: color palette, typography, spacing, and component patterns
- **Atomic Fines Color Palette.dc.html** — Interactive swatch reference with usage examples and contrast notes
- **Brand Voice & Usage Guide.md** — Copywriting and tone guidelines for all touchpoints
- **Atomic Fines Dark Mode Style Guide.md** — Full visual + brand reference

### 2. Website & Frontend
- **Atomic Fines Final Website.dc.html** — The canonical homepage:
  - Sticky navigation bar
  - Hero with glowing headline + alien character
  - Feature grid (4 cards)
  - Featured collection gallery (6 pieces)
  - CTA section
  - Multi-column footer
- **Component Library.dc.html** — Reusable component system:
  - Button styles (primary outline, solid, amber accent)
  - Badges and status indicators
  - Product cards + the signature galaxy card with neon ring frame
  - Testimonial pattern
  - Form elements
  - Color reference

### 3. CMS & Admin
- **CMS Admin Interface.dc.html** — Admin dashboard with sidebar nav, dashboard metrics, product table, and create/edit forms
- **Digital Allies CMS Integration.md** — Backend integration guide (the CMS platform is Digital Allies; the Atomic Finds brand styling is entirely its own)
- **cms-schema.json** — Content structure and data models

### 4. Visual Assets
- **assets/alien-daisy.png**, **alien-malibu.png**, **alien-milo.png**, **alien-ruso.png**, **alien-totiana.png** — Transparent alien characters (rattan-themed)

---

## Design System Overview

### Color Palette — Dark Mode (Golden Glow)
| Color | Hex | Role |
|-------|-----|------|
| Celestial Yellow | #ffd966 | Primary accent — headlines, CTAs, glow |
| Amber Orange | #d4822a | Secondary glow — cursive subheads, hover |
| Rattan Tan | #d4aa82 | Borders, dividers, nav rules, texture |
| Bone White | #f0e6d6 | Primary body text |
| Woven Moss | #b8b8a8 | Muted text, captions |
| Rattan Black | #2a2017 | Card surfaces, section variation |
| Deep Charcoal | #0a0a0a | Primary background |
| Hero Gradient | #1a1510 → #0a0a0a | Hero + CTA depth backgrounds |

### Typography
- **Display/Headers:** Playfair Display — 56–72px, 800, glowing
- **Subheadings/Accents:** Great Vibes (cursive) — 28–32px, amber
- **Body & Details:** JetBrains Mono — 14–15px body, 12px labels
- **Line height:** 1.7–1.8 for breathing room
- **Labels:** UPPERCASE tracked +2px

### Spacing
- Scale: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 60 · 80 · 120px
- **Section padding:** 80–120px top/bottom
- **Max width:** 1280px containers, 800px prose

### Component Patterns
- **Buttons:** Outlined primary (golden glow on hover), solid yellow, amber accent
- **Cards:** 2px rattan-tan border, hover lift (6px) + neon glow
- **Galaxy card:** Continuous rounded frame, galaxy-lit background, neon ring around the image, info flows straight down (no tag break)
- **Badges:** Status indicators in golden/amber
- **Forms:** Dark inputs with golden focus ring

---

## How to Use This System

### For Designers
1. Open **Atomic Fines Brand System.dc.html** for visual reference
2. Refer to **Brand Voice & Usage Guide.md** for copywriting rules
3. Use **Component Library.dc.html** as your pattern reference

### For Content Managers
1. Use **CMS Admin Interface.dc.html** as your reference for workflows
2. Refer to **Brand Voice & Usage Guide.md** when writing copy

---

## Brand Voice Summary

**The Voice:** Warm, authentic, handmade. Fran & Mabel know their stuff and genuinely love what they do.

**Core Values:**
- Handcrafted heritage (celebrate every piece's story)
- Sustainable by nature (giving vintage a second life)
- Fran & Mabel's personality (real people, real taste)

**Key Phrases:**
- "Handpicked vintage rattan, restored with love"
- "Each piece tells a story of mid-century craftsmanship"
- "Curated by Fran & Mabel"
- "Giving vintage a second life"

---

## Project File Structure

```
atomic-finds-design-system/
├── Atomic Fines Brand System.dc.html     (Brand guidelines — dark mode)
├── Atomic Fines Color Palette.dc.html    (Swatch reference)
├── Atomic Fines Final Website.dc.html    (Homepage)
├── Component Library.dc.html             (Reusable components)
├── CMS Admin Interface.dc.html           (Admin dashboard)
├── Brand Voice & Usage Guide.md          (Copywriting rules)
├── Atomic Fines Dark Mode Style Guide.md (Visual reference)
├── Digital Allies CMS Integration.md     (Backend integration)
├── cms-schema.json                       (Data structure)
└── assets/
    ├── alien-daisy.png
    ├── alien-malibu.png
    ├── alien-milo.png
    ├── alien-ruso.png
    └── alien-totiana.png
```

---

**Created:** June 2026
**Brand:** Atomic Finds — Fran & Mabel's Rattan Revival Retreat
**Aesthetic:** Dark-mode celestial 70s — deep charcoal, golden-glow neon, vintage rattan
**Status:** Production-Ready
