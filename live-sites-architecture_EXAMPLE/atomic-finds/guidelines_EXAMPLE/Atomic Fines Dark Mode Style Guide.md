# Atomic Fines — Dark Mode Design System
## Complete Visual & Brand Guidelines

---

## Overview

Atomic Fines embraces a **luxe dark aesthetic** inspired by vintage rattan craftsmanship fused with cosmic wonder. The design balances warmth (golden glows, rattan textures) with mystery (deep charcoal backgrounds, subtle overlays), creating an experience that feels both timeless and forward-thinking.

**Core Concept:** *Where Vintage Meets Digital — Curated Rattan & Bamboo for the Modern Home*

---

## Color Palette

### Primary Palette (95/5 Rule Reimagined)
| Color | Hex | Role | Usage |
|-------|-----|------|-------|
| **Deep Charcoal** | #1a1a1a | Primary background | Page backgrounds, dark sections |
| **Rattan Black** | #2a2017 | Secondary background | Card backgrounds, section variation |
| **Celestial Yellow** | #ffd966 | Primary accent (GLOW) | Headlines, primary text, main CTAs |
| **Amber Orange** | #d4822a | Secondary glow | Borders, hover states, accents |
| **Rattan Tan** | #d4aa82 | Tertiary accent | Borders, subheadings, texture |
| **Bone White** | #f0e6d6 | Body text | Main prose, readable text |
| **Woven Moss** | #a89a8a | Muted text | Secondary text, captions |

### Accent Colors
| Color | Hex | Role |
|-------|-----|------|
| Warm Gold (glow) | #f4c430 | Text shadows, glowing effects |
| Rich Brown | #5c4a3d | Rattan texture overlays |
| Deep Navy | #1a1a2e | Section dividers, subtle depth |

---

## Typography

### Font Stack
- **Display/Headers:** Playfair Display (Google Fonts) — elegant, high x-height, serif
- **Subheadings:** Cinzel (Google Fonts) — classical, refined serif
- **Body/Details:** JetBrains Mono (Google Fonts) — technical clarity, monospace

### Type Scale

| Level | Font | Size | Weight | Color | Glow |
|-------|------|------|--------|-------|------|
| **H1 (Hero)** | Playfair Display | 72px | 800 | #ffd966 | 0 0 30px rgba(255,217,102,0.6) |
| **H2 (Section)** | Playfair Display | 56px | 800 | #ffd966 | 0 0 20px rgba(255,217,102,0.5) |
| **H3 (Card)** | Cinzel | 20px | 600 | #ffd966 | 0 0 10px rgba(244,196,48,0.3) |
| **Subtitle** | Cinzel | 24px | 600 | #d4aa82 | 0 0 10px rgba(212,170,130,0.4) |
| **Body** | JetBrains Mono | 15px | 400 | #d4d4c4 | none |
| **Small Text** | JetBrains Mono | 12px | 400 | #b8b8a8 | none |
| **Eyebrow/Label** | JetBrains Mono | 12px | 600 | #c4956a | none |

### Text Effects
- **Glow Text:** Primary headlines use `text-shadow: 0 0 20px rgba(255,217,102,0.5)` minimum
- **Subtle Glow:** Secondary elements use `0 0 10px rgba(244,196,48,0.3)`
- **Line Height:** 1.7–1.8 for generous breathing room
- **Letter Spacing:** Headers -0.5px to -1px; labels +1.5px to +2px

---

## Background & Texture Systems

### Rattan Weave Texture
```css
background-image: 
  repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212,170,130,0.03) 2px, rgba(212,170,130,0.03) 4px),
  repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(212,170,130,0.03) 2px, rgba(212,170,130,0.03) 4px);
```
Applied at 3–5% opacity to create subtle diagonal weave pattern without overwhelming content.

### Section Backgrounds
- **Hero:** `linear-gradient(135deg, #2a2420 0%, #1a1a1a 50%, #242420 100%)`
- **Default:** `#1a1a1a` (solid dark)
- **Gallery/Featured:** `linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #1f1f1b 100%)`
- **CTA:** `linear-gradient(135deg, #2a2420 0%, #1a1a1a 50%, #242420 100%)`

### Radial Glow Overlays
Applied as pseudo-elements with low opacity:
```css
radial-gradient(ellipse at 30% 60%, rgba(244,196,48,0.06) 0%, transparent 50%)
```
Creates warmth without visibility; feels ambient rather than graphic.

---

## Component Patterns

### Navigation Bar
- **Background:** `rgba(26,26,26,0.95)` with `backdrop-filter: blur(10px)`
- **Border:** 2px solid #d4aa82 (rattan tan)
- **Logo:** Playfair Display, 24px, #ffd966, glowing
- **Links:** JetBrains Mono, 12px, #c4956a, hover → #ffd966 + glow + underline
- **Sticky:** `position: sticky; top: 0; z-index: 100`

### Hero Section
- **Layout:** 2-column grid (text left, image right) on desktop, stacked mobile
- **H1:** 72px Playfair, #ffd966, glowing
- **Subtitle:** 24px Cinzel, #d4aa82, glowing
- **Body:** 15px JetBrains Mono, #d4d4c4, line-height 1.8
- **Buttons:** Border-based, outlines, hover lifts + glow

### Feature Cards
- **Background:** `rgba(45,45,45,0.5)` with `backdrop-filter: blur(10px)`
- **Border:** 1px solid #d4aa82
- **Hover:** Background → `rgba(244,196,48,0.08)`, border → #ffd966, lift 6px, glow
- **Icon:** 48px, #ffd966, glowing
- **Title:** 20px Cinzel, #ffd966, glowing
- **Text:** 13px JetBrains Mono, #b8b8a8

### Gallery Cards
- **Background:** `rgba(45,45,45,0.6)` with backdrop filter
- **Border:** 1px solid #d4aa82
- **Placeholder:** Gradient overlay with subtle weave texture
- **Hover:** Lift 6px, border → #ffd966, glow effect
- **Info Section:** Dark background, gold title, muted text

### CTA Buttons
```css
border: 2px solid #d4aa82;
background: transparent;
color: #ffd966;
padding: 14px 32px;
text-transform: uppercase;
letter-spacing: 1.5px;
```
**Hover:** 
- Background: `rgba(244,196,48,0.1)`
- Border: #ffd966
- Glow: `0 0 20px rgba(255,217,102,0.3)`

### Footer
- **Background:** #0f0f0f (darkest)
- **Border-top:** 2px solid #d4aa82
- **Headings:** Cinzel, #ffd966, glowing
- **Links:** 12px, #8a8a7a, hover → #ffd966 + glow
- **Divider:** 1px solid #333

---

## Spacing & Layout

### Spacing Scale
- **Micro:** 4px, 8px
- **Small:** 12px, 16px
- **Standard:** 20px, 24px, 32px
- **Large:** 48px, 60px
- **Extreme:** 80px, 120px (section padding)

### Layout Rules
- **Max Width:** 1280px (standard), 800px (prose)
- **Section Padding:** 120px top/bottom vertical, 48px left/right horizontal
- **Card Padding:** 40px (feature), 20px (gallery info)
- **Gap:** 32px (grid), 20px (buttons), 48px (columns)

### Grid Systems
- **Feature Grid:** `repeat(auto-fit, minmax(280px, 1fr))`
- **Gallery Grid:** `repeat(auto-fit, minmax(240px, 1fr))`
- **Footer Grid:** `repeat(auto-fit, minmax(240px, 1fr))`

---

## Animation & Interaction

### Hover Effects
- **Cards:** `transform: translateY(-6px)` over 300ms
- **Text Links:** Color shift + glow over 300ms
- **Buttons:** Background shift + glow, no scale (maintains layout)

### Glowing Text Animation (Optional)
```css
@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 10px rgba(244,196,48,0.4); }
  50% { text-shadow: 0 0 20px rgba(244,196,48,0.6); }
}
animation: glow-pulse 3s ease-in-out infinite;
```
Applied sparingly to hero H1 for emphasis.

### Easing
- Standard: `cubic-bezier(0.16, 1, 0.3, 1)` (bouncy-smooth)
- Duration: 300ms for hover, 600ms for major transitions

---

## Dark Mode Principles

1. **Contrast is King:** All text must meet WCAG AA standards (4.5:1 minimum)
2. **Glow Over Shadow:** Use text-shadow for depth, not drop-shadow
3. **Warm Over Cool:** Favor ambers, golds, and warm browns over cool blues
4. **Texture Over Flatness:** Rattan weave texture adds dimensionality
5. **Clarity First:** No decorative elements that obscure readability

---

## Photography & Imagery

### Style
- Warm lighting (golden hour preferred)
- Close-ups showing rattan texture and detail
- Lifestyle context (pieces in rooms, hand-holding items)
- No harsh shadows; soft, diffused light
- Color grading: warm tones, slightly desaturated

### Placement
- **Hero:** Full-bleed or right column (with text on left)
- **Gallery:** Grid cards with emoji placeholders (photos TBD)
- **Testimonials:** Optional small circular avatars
- **Featured Sections:** Large, breathing room around image

### Optimization
- Load via CDN with lazy-loading
- Responsive srcset for mobile
- WebP with JPEG fallback
- Max width 1280px; let CSS handle scaling

---

## Alien Character Integration

The alien characters serve as **visual guides of curiosity and whimsy**:
- Appear in hero section (right column, full-body)
- Optional in footer or special sections
- Use drop-shadow filters: `drop-shadow(0 0 40px rgba(244,196,48,0.2))`
- **Without white backgrounds** — transparent or extracted
- Sized to 280–400px depending on context

---

## Accessibility Checklist

- ✅ All text ≥12px; body ≥15px
- ✅ Links have `:focus` ring (blue or glow)
- ✅ Color not sole indicator (use text + icon)
- ✅ Contrast ≥4.5:1 for body, ≥3:1 for large text
- ✅ Alt text on all images
- ✅ Form labels associated with inputs
- ✅ Keyboard navigation (no mouse-only traps)

---

## Brand Voice Applied to Design

The visual language mirrors the warmth and authenticity of the brand voice:
- **Warmth:** Golden glows, amber borders, rattan textures
- **Authenticity:** No glossy gradients; handmade texture visible
- **Expertise:** Clear typography hierarchy, generous spacing
- **Accessibility:** Dark mode respects user preference; high contrast

---

## Page Templates

### Homepage Structure
1. Navigation (sticky)
2. Hero (image + text, 2-col)
3. Features (4-card grid)
4. Gallery (6-card grid, darker section)
5. CTA (centered, dark gradient)
6. Footer (4-column)

### Product Detail Page (Future)
1. Navigation
2. Hero (large image left, details right)
3. Description (prose + specs)
4. Related Products (3-card grid)
5. Testimonials (pinned notes)
6. Footer

### Blog Post Layout (Future)
1. Navigation
2. Header (title, date, author)
3. Featured Image (full-width)
4. Content (prose with occasional image breaks)
5. Author Bio
6. Related Posts (3-card grid)
7. Footer

---

## File Structure for Implementation

```
assets/
├── aliens/
│   ├── alien-primary-transparent.webp
│   ├── alien-secondary-transparent.webp
│   └── ...
├── textures/
│   ├── rattan-weave-pattern.webp (optional, for enhancement)
│   └── ...
└── photography/
    ├── hero-image.webp
    ├── gallery-*.webp
    └── ...

styles/
├── atomic-fines-dark.css (main stylesheet)
├── animations.css
└── responsive.css

pages/
├── index.html (homepage)
├── product.html (product detail)
└── blog.html (blog post)
```

---

## Next Steps

1. ✅ Swap alien images (transparent versions)
2. ⏳ Add real photography to hero & gallery
3. ⏳ Build product detail page
4. ⏳ Create blog post template
5. ⏳ Integrate with CMS backend
6. ⏳ Test responsive breakpoints (mobile, tablet)
7. ⏳ Validate accessibility (WCAG AA)

---

*Atomic Fines Design System — Dark Mode Edition*  
*Last updated: June 20, 2026*  
*Built for Fran & Mabel's Rattan Revival Retreat*
