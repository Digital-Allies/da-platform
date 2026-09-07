# Atomic Finds — Token Sync & Component Refactoring Checklist

**Goal:** Wire the approved Atomic Finds design system (Claude Design project `29110ac3-0a76-4fa1-a322-a78bc212a50d`) into the CMS engine so all components read `--tok-*` CSS variables instead of hardcoded colors.

**Handoff location:** `sites/atomic-finds/design_handoff_homepage/`

---

## Phase 1: Token Extraction (30 min)

Read the handoff's token files and extract exact values.

### 1.1 — Colors
**Source:** `sites/atomic-finds/design_handoff_homepage/tokens/colors.css`

Extract these into a new file `tools/build-workflows/src/styles/atomic-finds-tokens.css`:

- [ ] `--tok-bg-primary` = `#1E1E1E` (Deep Charcoal)
- [ ] `--tok-bg-secondary` = `#181613` (alt dark)
- [ ] `--tok-bg-hero-from` = `#211C14` (hero gradient start)
- [ ] `--tok-bg-hero-to` = `#16140F` (hero gradient end)
- [ ] `--tok-surface` = `#2A2017` (Rattan Black, cards)
- [ ] `--tok-surface-gradient-from` = `#23201B` (card gradient start)
- [ ] `--tok-surface-gradient-to` = `#1B1916` (card gradient end)
- [ ] `--tok-surface-inset` = `#14120E` (card inset/border)
- [ ] `--tok-primary-accent` = `#F5C842` (Celestial Yellow)
- [ ] `--tok-secondary-accent` = `#D4822A` (Amber Orange)
- [ ] `--tok-text-primary` = `#F0E8D8` (Bone White)
- [ ] `--tok-text-body` = `#D9CFBF` (body text)
- [ ] `--tok-text-muted` = `#9A8F7D` (secondary text)
- [ ] `--tok-text-soft` = `#6A6052` (tertiary text)
- [ ] `--tok-accent-moss` = `#556B4A` (Woven Moss, eco tags)
- [ ] `--tok-accent-tan` = `#C4956A` (rattan tan)
- [ ] `--tok-accent-clay` = `#C1502E` (Austin clay, sparingly)

### 1.2 — Typography
**Source:** `sites/atomic-finds/design_handoff_homepage/tokens/typography.css`

- [ ] `--tok-heading-font` = `'Bagel Fat One', serif` (self-hosted at `fonts/BagelFatOne-Regular.ttf`)
- [ ] `--tok-script-font` = `'Pacifico', cursive` (Google Fonts)
- [ ] `--tok-expressive-font` = `'Agbalumo', serif` (self-hosted, rare use)
- [ ] `--tok-body-font` = `'DM Sans', sans-serif` (Google Fonts)

**Scale (clamped):**
- [ ] `--tok-fs-display` = `clamp(48px, 8vw, 88px)` (Display/H1)
- [ ] `--tok-fs-h1` = `clamp(38px, 6vw, 64px)` (H1)
- [ ] `--tok-fs-h2` = `clamp(30px, 4.5vw, 48px)` (H2, script accents)
- [ ] `--tok-fs-h3` = `22px` (H3)
- [ ] `--tok-fs-body` = `16px` (Body text)
- [ ] `--tok-fs-small` = `14px` (Small)
- [ ] `--tok-fs-label` = `12px` (Label)

### 1.3 — Spacing (4px base scale)
**Source:** `sites/atomic-finds/design_handoff_homepage/tokens/spacing.css`

- [ ] `--tok-spacing-xs` = `4px`
- [ ] `--tok-spacing-sm` = `8px`
- [ ] `--tok-spacing-md` = `12px`
- [ ] `--tok-spacing-lg` = `16px`
- [ ] `--tok-spacing-xl` = `20px`
- [ ] `--tok-spacing-2xl` = `24px`
- [ ] `--tok-spacing-3xl` = `32px`
- [ ] `--tok-spacing-4xl` = `40px`
- [ ] `--tok-spacing-5xl` = `48px`
- [ ] `--tok-spacing-6xl` = `64px`
- [ ] `--tok-spacing-7xl` = `80px`
- [ ] `--tok-spacing-8xl` = `120px`

**Section padding:**
- [ ] `--tok-section-padding-vertical` = `120px`
- [ ] `--tok-section-padding-horizontal` = `48px`
- [ ] `--tok-max-width` = `1280px`
- [ ] `--tok-prose-width` = `820px`

### 1.4 — Effects (Shadows as Glows)
**Source:** `sites/atomic-finds/design_handoff_homepage/tokens/spacing.css`

- [ ] `--tok-glow-sm` = `0 0 8px rgba(245, 200, 66, 0.35)` (yellow glow)
- [ ] `--tok-glow-md` = `0 0 16px rgba(245, 200, 66, 0.5)` (yellow glow)
- [ ] `--tok-glow-lg` = `0 0 30px rgba(245, 200, 66, 0.6)` (yellow glow)
- [ ] `--tok-glow-amber` = `0 0 12px rgba(212, 130, 42, 0.55)` (amber glow)
- [ ] `--tok-glow-ring` = `inset 0 0 0 1px rgba(245, 200, 66, 0.15)` (subtle border glow)

### 1.5 — Radius & Borders
- [ ] `--tok-radius-sm` = `6px`
- [ ] `--tok-radius-md` = `12px`
- [ ] `--tok-radius-lg` = `18px`
- [ ] `--tok-radius-xl` = `24px`
- [ ] `--tok-radius-pill` = `999px`
- [ ] `--tok-border-default` = `1px solid rgba(245, 200, 66, 0.15)`
- [ ] `--tok-border-focus` = `2px solid #F5C842`

### 1.6 — Motion
- [ ] `--tok-easing` = `cubic-bezier(0.16, 1, 0.3, 1)`
- [ ] `--tok-duration-fast` = `180ms`
- [ ] `--tok-duration-base` = `300ms`
- [ ] `--tok-duration-slow` = `600ms`

---

## Phase 2: Font Import (15 min)

Make fonts available in the CMS engine.

### 2.1 — Self-hosted Fonts
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/fonts/BagelFatOne-Regular.ttf` → `tools/build-workflows/public/fonts/`
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/fonts/Agbalumo-Regular.ttf` → `tools/build-workflows/public/fonts/` (if present)
- [ ] Add `@font-face` rules to `tools/build-workflows/src/styles/atomic-finds-tokens.css`:

```css
@font-face {
  font-family: 'Bagel Fat One';
  src: url('/fonts/BagelFatOne-Regular.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: 'Agbalumo';
  src: url('/fonts/Agbalumo-Regular.ttf') format('truetype');
  font-weight: 400;
}
```

### 2.2 — Google Fonts
- [ ] Add to `tools/build-workflows/src/app/layout.tsx` (in `<head>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
<link href="https://fonts.googleapis.com/css2?family=Pacifico&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
```

---

## Phase 3: Asset Migration (20 min)

Copy all static assets into the CMS engine.

### 3.1 — Logos & Icons
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/assets/logo*` → `tools/build-workflows/public/atomic-finds/logos/`
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/assets/icons/*` → `tools/build-workflows/public/atomic-finds/icons/`

### 3.2 — Product Photography
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/assets/products/*` → `tools/build-workflows/public/atomic-finds/products/`

### 3.3 — Illustrations & Patterns
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/assets/curators/*` → `tools/build-workflows/public/atomic-finds/curators/` (Daisy, Milo, Tatiana, Malibu)
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/assets/patterns/*` → `tools/build-workflows/public/atomic-finds/patterns/` (starfield, gradients, etc.)
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/assets/galaxy/*` → `tools/build-workflows/public/atomic-finds/galaxy/` (GalaxyCard nebula backgrounds)

### 3.4 — Team Photos
- [ ] Copy `sites/atomic-finds/design_handoff_homepage/assets/team/*` → `tools/build-workflows/public/atomic-finds/team/`

---

## Phase 4: Component Refactoring (90 min)

Update components to use token variables instead of hardcoded colors.

### 4.1 — ProductCard.tsx
**File:** `tools/build-workflows/src/components/ProductCard.tsx`

- [ ] Replace hardcoded card background with `background: var(--tok-surface)`
- [ ] Replace hardcoded card gradient with `background: linear-gradient(135deg, var(--tok-surface-gradient-from) 0%, var(--tok-surface-gradient-to) 100%)`
- [ ] Replace border color with `border: var(--tok-border-default)`
- [ ] Replace text colors:
  - [ ] Title → `color: var(--tok-text-primary)`
  - [ ] Price → `color: var(--tok-primary-accent)`
  - [ ] Tagline → `color: var(--tok-text-body)`
- [ ] Replace hover shadow with `box-shadow: var(--tok-glow-md)` + `transform: translateY(-6px)`
- [ ] Replace radius with `border-radius: var(--tok-radius-lg)`
- [ ] Add transition: `transition: all var(--tok-duration-base) var(--tok-easing)`

### 4.2 — GalaxyCard.tsx
**File:** `tools/build-workflows/src/components/GalaxyCard.tsx`

- [ ] Replace card background: `background: var(--tok-surface)`
- [ ] Replace orbital ring stroke: `stroke: var(--tok-primary-accent)`
- [ ] Replace moon glow: `filter: drop-shadow(var(--tok-glow-md))`
- [ ] Replace text colors (same as ProductCard above)
- [ ] Replace detail modal background: `background: var(--tok-bg-primary)`
- [ ] Replace detail modal border: `border: var(--tok-border-default)`
- [ ] Verify orbit animation respects `prefers-reduced-motion`

### 4.3 — Badge.tsx
**File:** `tools/build-workflows/src/components/Badge.tsx`

**Variants:**
- [ ] **In Stock** → bg: `var(--tok-primary-accent)`, text: `var(--tok-bg-primary)`
- [ ] **Featured** → bg: `var(--tok-secondary-accent)`, text: `var(--tok-bg-primary)`
- [ ] **Sale** → bg: `var(--tok-secondary-accent)`, text: `var(--tok-text-primary)`
- [ ] **Out of Stock** → border: `var(--tok-border-default)`, text: `var(--tok-text-muted)`
- [ ] **Eco** → bg: `var(--tok-accent-moss)`, text: `var(--tok-text-primary)`

- [ ] Font: `font-family: var(--tok-body-font)`
- [ ] Size: `font-size: var(--tok-fs-label)`
- [ ] Weight: `font-weight: 700`
- [ ] Text transform: `text-transform: uppercase`
- [ ] Radius: `border-radius: var(--tok-radius-pill)`

### 4.4 — Button.tsx
**File:** `tools/build-workflows/src/components/Button.tsx`

**Primary variant:**
- [ ] bg: `var(--tok-primary-accent)`
- [ ] text: `var(--tok-bg-primary)`
- [ ] On hover: `box-shadow: var(--tok-glow-md)` + `transform: translateY(-2px)`

**Secondary (outline) variant:**
- [ ] border: `var(--tok-border-focus)`
- [ ] text: `var(--tok-primary-accent)`
- [ ] On hover: same glow + lift as primary

- [ ] Font: `var(--tok-body-font)`, weight 700, uppercase
- [ ] Size: `var(--tok-fs-small)` (14px)
- [ ] Radius: `var(--tok-radius-pill)` (square brackets design)
- [ ] Padding: `var(--tok-spacing-lg) var(--tok-spacing-xl)` (16px 20px)

### 4.5 — ProductGrid.tsx
**File:** `tools/build-workflows/src/components/ProductGrid.tsx`

- [ ] Map category tabs to use `var(--tok-primary-accent)` for active state
- [ ] Card container: use ProductCard component (which now uses tokens)
- [ ] Grid gap: `gap: var(--tok-spacing-2xl)` (24px)
- [ ] Grid columns: `grid-template-columns: repeat(auto-fit, minmax(clamp(280px, 90vw, 360px), 1fr))`
- [ ] Ensure null-image fallback uses token colors

### 4.6 — Curators Component (NEW)
**File:** `tools/build-workflows/src/components/Curators.tsx` (if doesn't exist)

Create component with 4 mascot cards:
- [ ] Daisy (Laid-Back Tastemaker) — `assets/curators/daisy.png`
- [ ] Milo (Detail Nerd) — `assets/curators/milo.png`
- [ ] Tatiana (The Bold One) — `assets/curators/tatiana.png`
- [ ] Malibu (Host With the Most) — `assets/curators/malibu.png`

Per card:
- [ ] Avatar image: 200×200px
- [ ] Name (H3): `font-family: var(--tok-heading-font)`, `font-size: var(--tok-fs-h3)`
- [ ] Role (small): `color: var(--tok-text-muted)`, `font-size: var(--tok-fs-small)`
- [ ] Quote (body): `color: var(--tok-text-body)`, `font-size: var(--tok-fs-body)`
- [ ] Card background: `var(--tok-surface)`
- [ ] Card border: `var(--tok-border-default)`
- [ ] Card radius: `var(--tok-radius-lg)`
- [ ] Hover: `box-shadow: var(--tok-glow-md)` + `transform: translateY(-6px)`

### 4.7 — AtomicFindsHomepage.tsx
**File:** `tools/build-workflows/src/app/AtomicFindsHomepage.tsx`

- [ ] Hero background: `background: linear-gradient(135deg, var(--tok-bg-hero-from) 0%, var(--tok-bg-hero-to) 100%)`
- [ ] Section backgrounds alternate: `var(--tok-bg-primary)` and `var(--tok-bg-secondary)`
- [ ] Text colors: headings → `var(--tok-text-primary)`, body → `var(--tok-text-body)`
- [ ] Section spacing: padding `var(--tok-section-padding-vertical) var(--tok-section-padding-horizontal)`
- [ ] Import Curators component, render below "What We Do" section
- [ ] Verify all hardcoded hex colors are replaced with `--tok-*` vars

---

## Phase 5: Verification (30 min)

### 5.1 — Type Check
- [ ] Run `npx tsc --noEmit` in `tools/build-workflows/` → zero errors
- [ ] All component props match `.d.ts` definitions

### 5.2 — Build & Deploy
- [ ] Run `npm run build` → succeeds end-to-end
- [ ] No Tailwind errors (all `@tailwind` directives process)
- [ ] All image paths resolve (no 404s in build log)

### 5.3 — Live Verification
- [ ] Load `https://atomicfindsatx.vercel.app` in Chrome
- [ ] **Visual checks:**
  - [ ] Hero background is dark charcoal gradient (not white)
  - [ ] Product cards have yellow glow on hover (not no shadow)
  - [ ] Text is bone white on dark background (readable contrast)
  - [ ] Badges render with correct colors (yellow for In Stock, orange for Featured)
  - [ ] Buttons are yellow with pill radius
  - [ ] Curators section displays 4 mascot cards with avatars + text
  - [ ] Mobile (375px) responsive: cards stack, text readable
  - [ ] Fonts render: headers are Bagel Fat One (chunky, bold), body is DM Sans
- [ ] **Interactive checks:**
  - [ ] ProductCard hover lifts and glows
  - [ ] GalaxyCard detail modal opens/closes
  - [ ] Category tabs filter products
  - [ ] Contact form visible and functional

### 5.4 — Accessibility
- [ ] Lighthouse report: no color contrast errors
- [ ] All text meets 4.5:1 contrast ratio (yellow on charcoal, white on dark)
- [ ] Tab order correct, focus indicators visible
- [ ] Motion: load with DevTools `prefers-reduced-motion: reduce` — animations respect it

### 5.5 — Documentation
- [ ] Update `sites/atomic-finds/README.md`:
  - [ ] "✅ Tokens synced from design system"
  - [ ] "✅ Components use --tok-* variables"
  - [ ] "✅ Fonts imported (Bagel Fat One, Pacifico, DM Sans)"
  - [ ] "✅ All assets migrated"
  - [ ] List any remaining gaps (if any)

- [ ] Update `tools/build-workflows/ARCHITECTURE.md`:
  - [ ] Add "Atomic Finds token override system" section
  - [ ] Document where client-specific tokens live

---

## Done When

- [ ] All colors in `atomic-finds-tokens.css` match the handoff exactly
- [ ] All components in the live CMS engine read `--tok-*` vars, zero hardcoded colors
- [ ] Live site (`atomicfindsatx.vercel.app`) matches the approved design
- [ ] `tsc --noEmit` passes
- [ ] Lighthouse: ≥90 on desktop, ≥85 on mobile
- [ ] Accessibility: zero color-contrast errors
- [ ] README + ARCHITECTURE updated

---

## Notes for Claude Code

- **Source of truth:** `sites/atomic-finds/design_handoff_homepage/tokens/` — extract exact values, don't round or approximate
- **Component pattern:** Every component should have inline `style=` with `var(--tok-*)` references; no CSS classes that aren't Tailwind utilities
- **Responsive sizing:** Use `clamp()` for font sizes and spacing, not media queries. Example: `fontSize: 'clamp(48px, 8vw, 88px)'`
- **Accessibility first:** Ensure hover states have visual feedback (glow or lift), focus states are visible, and text contrast meets WCAG AA
- **Commit message:** `feat(atomic-finds): sync design tokens and refactor components to use --tok-* variables`
- **No breaking changes:** If existing components are used elsewhere, add new token vars rather than removing old ones

