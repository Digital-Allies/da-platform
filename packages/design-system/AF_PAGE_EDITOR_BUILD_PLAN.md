# AF Page Editor Build — Phase 1: Design System → Blocks

**Goal:** Enable AF editors to log in and drag/drop brand-specific blocks (Hero, Products, Featured, Curators, Contact) with live preview. Zero breaking changes to the current editor.

**Timeline:** This week (sessions through Friday)

---

## Phase 1A: Migrate AF Design System into `sites/atomic-finds/design_system/` (Today)

### Task 1: Folder Structure
```
sites/atomic-finds/
├── design_system/                     ← NEW
│   ├── index.ts                       (export all)
│   ├── tokens.css                     (from handoff/tokens/)
│   ├── blocks/
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   ├── Featured.tsx               (GalaxyCard wrapper)
│   │   ├── Curators.tsx
│   │   ├── Contact.tsx
│   │   └── index.ts                   (export all)
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── GalaxyCard.tsx
│   │   └── index.ts                   (export all)
│   ├── guidelines/
│   │   ├── colors.html
│   │   └── ...
│   └── assets/
│       ├── fonts/
│       ├── logos/
│       ├── products/
│       ├── curators/
│       └── patterns/
│
└── design_handoff_homepage/           ← KEEP (reference only)
```

### Task 2: Copy from Handoff
- [ ] Copy `design_handoff_homepage/tokens/*.css` → `design_system/tokens.css` (consolidate into one file)
- [ ] Copy `design_handoff_homepage/assets/` → `design_system/assets/`
- [ ] Copy `design_handoff_homepage/guidelines/*.html` → `design_system/guidelines/`

### Task 3: Create Index Exports
**File:** `sites/atomic-finds/design_system/index.ts`

```typescript
export * from './blocks';
export * from './components';
export { default as tokens } from './tokens.css';
```

**File:** `sites/atomic-finds/design_system/blocks/index.ts`

```typescript
export { Hero } from './Hero';
export { Products } from './Products';
export { Featured } from './Featured';
export { Curators } from './Curators';
export { Contact } from './Contact';
```

**File:** `sites/atomic-finds/design_system/components/index.ts`

```typescript
export { Button } from './Button';
export { Badge } from './Badge';
export { Card } from './Card';
export { ProductGrid } from './ProductGrid';
export { GalaxyCard } from './GalaxyCard';
```

---

## Phase 1B: Move Existing AF Components → `design_system/` (Today)

These already exist in `tools/build-workflows/src/components/`. Move them to `sites/atomic-finds/design_system/components/` with token refactoring.

### Task 4: Component Migration
- [ ] `AtomicFindsHomepage.tsx` → Split into blocks in `design_system/blocks/` (don't delete yet, keep for reference)
- [ ] `ProductGrid.tsx` → `design_system/components/ProductGrid.tsx`
- [ ] `GalaxyCard.tsx` → `design_system/components/GalaxyCard.tsx`
- [ ] `Curators.tsx` → `design_system/components/Curators.tsx` (if exists; if not, create from handoff)
- [ ] Create `Button.tsx`, `Badge.tsx`, `Card.tsx` in `design_system/components/` (reuse from `packages/design-system/` as template)

### Task 5: Token Refactoring
For each component moved:
- [ ] Replace hardcoded colors with `var(--tok-*)` refs
- [ ] Verify fonts reference `--tok-heading-font`, `--tok-body-font`, etc.
- [ ] Update spacing to use `--tok-spacing-*`
- [ ] Update radius to use `--tok-radius-*`
- [ ] Update shadows to use `--tok-glow-*`

---

## Phase 1C: Create AF Block Components (Today–Tomorrow)

These are the page-editor blocks AF editors will see. Each wraps a component and adds editable fields.

### Block Template (Standard Structure)

```typescript
// Hero.tsx
interface HeroBlockProps {
  data: {
    eyebrow?: string;
    headline: string;
    subheadline?: string;
    body?: string;
    cta1Label?: string;
    cta1Link?: string;
    cta2Label?: string;
    cta2Link?: string;
    backgroundImage?: string;
  };
  isEditing?: boolean;
  onUpdate?: (data: Partial<HeroBlockProps['data']>) => void;
}

export const Hero: React.FC<HeroBlockProps> = ({ data, isEditing, onUpdate }) => {
  // Render with AF tokens
  // If isEditing, show inline edit fields
  // On field change, call onUpdate(newData)
};
```

### Task 6: Create Blocks

**Hero Block**
- [ ] File: `sites/atomic-finds/design_system/blocks/Hero.tsx`
- [ ] Fields: eyebrow, headline, subheadline, body, 2 CTAs (label + link), background image
- [ ] Styling: dark charcoal bg + starfield pattern, AF fonts, yellow text/buttons
- [ ] Edit mode: inline fields when `isEditing=true`

**Products Block**
- [ ] File: `sites/atomic-finds/design_system/blocks/Products.tsx`
- [ ] Wraps `ProductGrid` component
- [ ] Fields: category filter, product count, grid columns
- [ ] Data source: live `getProducts()` from Supabase (same as current)

**Featured Block** (GalaxyCard wrapper)
- [ ] File: `sites/atomic-fits/design_system/blocks/Featured.tsx`
- [ ] Renders 3 GalaxyCard instances
- [ ] Fields: product IDs for each card (select from dropdown)
- [ ] Durability callout text

**Curators Block**
- [ ] File: `sites/atomic-finds/design_system/blocks/Curators.tsx`
- [ ] 4 static mascot cards (Daisy, Milo, Tatiana, Malibu)
- [ ] Fields: optional custom titles/quotes per curator
- [ ] Styling: AF fonts, token colors, glow on hover

**Contact Block**
- [ ] File: `sites/atomic-finds/design_system/blocks/Contact.tsx`
- [ ] Contact form + optional contact info cards
- [ ] Fields: form label, submit button text, contact info (phone, email, address)
- [ ] Integrates with existing Resend form wiring

---

## Phase 2: CMS Engine Integration (Tomorrow–Wednesday)

**Blocked on Phase 1 completion.** Once blocks exist, wire them into the page editor.

### Task 7: Block Loader
**File:** `tools/build-workflows/src/lib/loadClientBlocks.ts`

```typescript
import { ATOMIC_FINDS_CLIENT_ID } from '@/lib/constants';

export async function getClientBlocks(clientId: string) {
  if (clientId === ATOMIC_FINDS_CLIENT_ID) {
    const blocks = await import('../../../../sites/atomic-finds/design_system/blocks');
    return blocks;
  }
  // Fallback to generic blocks
  const blocks = await import('@/components/blocks');
  return blocks;
}
```

### Task 8: Update BlockLibrary
**File:** `tools/build-workflows/src/app/admin/pages/BlockLibrary.tsx`

- [ ] Import `getClientBlocks()` 
- [ ] Load blocks based on logged-in user's `client_id`
- [ ] Render block buttons dynamically (not hardcoded)
- [ ] Each button: add the block to the page

### Task 9: Update PageEditor Preview
**File:** `tools/build-workflows/src/app/admin/pages/PageEditor.tsx`

- [ ] Load client's tokens (e.g., `atomic-finds-tokens.css`) based on logged-in user
- [ ] Render blocks using the client's component versions
- [ ] Live preview shows AF branding (dark bg, yellow accents, etc.)

---

## Phase 3: QA & Launch (Thursday–Friday)

### Task 10: AF Editor Testing
- [ ] Log in as `atomicfindsatx@gmail.com`
- [ ] Navigate to `/admin/pages`
- [ ] Add a Hero block → preview renders with AF branding (dark charcoal, AF fonts, yellow text)
- [ ] Add a Products block → shows live products with AF styling
- [ ] Add a Featured block → GalaxyCards render with AF glow effects
- [ ] Add a Curators block → mascots display
- [ ] Add a Contact block → form renders with AF button styling
- [ ] Edit inline: change headline text → live preview updates
- [ ] Create a draft page → save succeeds
- [ ] Publish a page → live AF site shows the page with brand styling

### Task 11: Verify No Breaking Changes
- [ ] DA editors can still log in and edit `/admin/pages` (uses fallback generic blocks)
- [ ] HCTC editors can still log in (placeholder)
- [ ] Generic block buttons still work for clients without custom design systems

### Task 12: Documentation
- [ ] Update `sites/atomic-finds/README.md`: "✅ Page editor blocks created and AF-branded"
- [ ] Update `tools/build-workflows/ARCHITECTURE.md`: document block loader + client-specific blocks pattern
- [ ] Add example in `SYNC_ARCHITECTURE.md`: "How to add blocks for a new client"

---

## Done When

- [ ] `sites/atomic-finds/design_system/` folder exists with all blocks and components
- [ ] AF editors log in to `/admin/pages` and see AF-branded block buttons
- [ ] Dragging a block creates an AF-styled section in the live preview
- [ ] Editing fields updates the preview in real-time
- [ ] Save/publish works (page stored in Supabase `pages` table)
- [ ] Zero breaking changes to other clients' editors
- [ ] `tsc --noEmit` passes
- [ ] Live AF site renders published pages with correct branding

---

## Notes for Claude Code

- **Don't delete `AtomicFindsHomepage.tsx` yet** — keep it as reference while building blocks
- **Keep `tools/build-workflows/src/components/` clean** — only shared primitives stay there (Button, Input, Card from `packages/design-system/`)
- **Block edit mode:** When `isEditing=true`, show inline form fields; when false, show polished rendered output
- **Import paths:** `sites/atomic-finds/design_system/` is a peer of `tools/build-workflows/` — use relative paths like `../../../../sites/atomic-finds/...`
- **No hardcoded client IDs in components** — all branching based on `clientId` param passed from CMS engine
- **Commit message:** `feat(af-editor): create AF-branded page blocks (Hero, Products, Featured, Curators, Contact)`

