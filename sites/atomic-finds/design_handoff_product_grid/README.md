# Handoff: Product Grid (Featured Finds)

> **Updated 2026-07-21 for the flexible conversion layer.** The CTA is
> driven per product by a `selling_state` field (`listing` / `inquiry` /
> `direct` / `checkout`) resolved through `resolveProductCta()` in
> `src/lib/commerce.ts` (the production source of truth) — not a single
> fixed "View Listing" link. `ProductCard.reference.jsx` /
> `ProductGrid.reference.jsx` / `ProductCard.prompt.md` in this package
> implement and document that resolver so they stay consistent with the
> shipped `ProductGrid.tsx` component. See root `STATUS.md` decision #8
> and `sites/atomic-finds/CLAUDE.md` "Commerce rules" for the full policy.
> Everything else in this spec (layout, tokens, image fallback, price
> states, title clamp) is unchanged.

## Overview
Homepage "Featured Products" section wired to the live Supabase `products` table (see `da-platform` repo, PR #1). This package hands off a hi-fi React reference implementation of `ProductCard` / `ProductGrid` styled to the Atomic Finds ATX design system, ready to drop into the Next.js CMS engine's `BlockRenderer.tsx` as the `case 'products':` block.

## About the Design Files
The `.jsx` files here are **hi-fidelity design-system reference components**, not the final production files — they run today inside an HTML/React-via-CDN preview environment (React loaded from a `<script>` tag, no build step, inline styles instead of Tailwind/CSS modules). Recreate them in the app's existing stack: convert inline `style={{ ... }}` objects to the codebase's actual styling approach (Tailwind classes, CSS modules, styled-components — whatever `da-platform` already uses), keep the DOM structure, class of interactions, and exact visual values below.

## Fidelity
**High-fidelity.** Colors, spacing, typography, and copy are final — pull hex/token values directly from `tokens/*.css` in this bundle rather than eyeballing the screenshot.

## Data contract (already live)
Components expect props shaped exactly like a `products` row — no transform needed:
```ts
{ id, title, description, price, original_price, condition, location,
  listed_label, attributes, image_url, external_url, seller_name,
  seller_rating, selling_state, cta_label, display_order }
```
Sort by `display_order` ascending before passing in (canonical sort, already the DB order from `getProducts()`).

## Components

### ProductGrid
- Props: `title` (string, default `"Featured Finds"`), `products` (array, see contract above).
- Renders an `<h2>` heading (only if `title` is truthy) + a CSS grid of cards: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, `gap: 24px`.
- Heading: Bagel Fat One (fallback DM Serif Display/Georgia), `--fs-h1` (clamp 38–64px), color `--celestial-yellow` (#F5C842), text-shadow `--glow-md` (`0 0 16px rgba(245,200,66,0.50)`), centered, `margin-bottom: 40px`.

### ProductCard (one grid cell)
- Container: `border-radius: 18px`, `overflow: hidden`, background `linear-gradient(180deg, #23201B 0%, #1B1916 100%)`, `border: 1px solid rgba(245,200,66,0.15)`, flex column.
  - Hover: `translateY(-6px)`, border → `rgba(245,200,66,0.4)`, `box-shadow: 0 0 16px rgba(245,200,66,0.50)`, 300ms ease-out.
- **Image area**: `aspect-ratio: 4/3`, background `#14120E`.
  - `image_url` present → `<img>` cover-fit.
  - `image_url` null (the **launch state**, present on every seeded row — not an edge case) → centered fallback: 40×40px icon (`assets/icons/woven-basket.png`, 0.5 opacity) + "Photo coming soon" label, 11px uppercase, `--fg-soft` color, `0.08em` letter-spacing.
  - `condition` tag, top-left: pill, `rgba(20,18,14,0.75)` bg, bone-white text (#F0E8D8), 10px/700/uppercase.
  - "Sale" badge, top-right, shown only when `original_price != null && price != null`: `--amber-orange` (#D4822A) bg, `#1E1E1E` text, glow `0 0 12px rgba(212,130,42,0.55)`.
- **Title**: Bagel Fat One 18px, `--celestial-yellow`, `text-shadow: 0 0 8px rgba(245,200,66,0.35)`, clamped to 2 lines (`-webkit-line-clamp: 2`) — titles run long in real data, this clamp is required, not optional.
- **Meta line**: `location` + `listed_label` joined with " · ", 12px, `--fg-muted` (#9A8F7D). Display `listed_label` verbatim — never parse/reformat ("3 days ago", "In stock" are both valid as-is).
- **Attribute chips**: up to 3 entries from the free-form `attributes` object, rendered `Key: value` — 11px pill, `#D9CFBF` text, `#14120E` bg, 1px border, 6px radius.
- **Price row**: `price == null` → "Inquire" (only state, no dollar sign). Else current price in Bagel Fat One 20px `--celestial-yellow`; if on sale, `original_price` shown first with strikethrough at 14px `--fg-soft` (#6A6052).
- **CTA**: right-aligned pill button/link, resolved from `selling_state` (never hard-coded "Buy Now"): `listing`/`checkout` with `external_url` set → opens that link in a new tab (`target="_blank" rel="noopener noreferrer"`), default label "View Listing"/"Purchase Options"; otherwise → links to `#contact` in the current tab, default label "Ask About This Item"/"Message to Buy". `cta_label` overrides the default label for any state. 11px/700/uppercase, `--celestial-yellow` text, 1px border, pill radius.
- **Trust line** (only if `seller_name` or `seller_rating` present): top-bordered footer row, `seller_name` + `seller_rating` joined " · ", 11px `--fg-soft`.

## Design Tokens
See `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` for the full source of truth. Key values used here:
- `--celestial-yellow: #F5C842` (primary accent)
- `--amber-orange: #D4822A` (sale badge / secondary accent)
- `--bone-white: #F0E8D8`, `--fg-body: #D9CFBF`, `--fg-muted: #9A8F7D`, `--fg-soft: #6A6052`
- `--bg-card: #23201B`, `--bg-card-2: #1B1916`, `--bg-inset: #14120E`
- Radius: `--radius-sm 6px`, `--radius-lg 18px`, `--radius-pill 999px`
- Glow: `--glow-sm 0 0 8px rgba(245,200,66,.35)`, `--glow-md 0 0 16px rgba(245,200,66,.50)`, `--glow-amber 0 0 12px rgba(212,130,42,.55)`
- Fonts: **Bagel Fat One** (headings/titles/prices), **DM Sans** (body/meta), self-hosted `@font-face` in `tokens/typography.css` — font files not included in this bundle, pull from the design system project or Google Fonts (Bagel Fat One is Google-hosted).

## CMS wiring (per the original brief)
```tsx
case 'products':
  return (
    <div key={index} id="products">
      <ProductGrid
        title={block.data.title || 'Featured Finds'}
        products={products}   // getProducts() output, already sorted by display_order
      />
    </div>
  )
```
- Components take `products` as a prop — no fetching inside `ProductCard`/`ProductGrid`.
- Keep this a server-component-friendly implementation; if hover/interaction needs a client boundary, isolate it in a small `'use client'` leaf rather than making the whole grid client-side.

## Assets
- `assets/icons/woven-basket.png` — image-fallback icon (included in this bundle).

## Files in this bundle
- `ProductCard.reference.jsx` — reference component (exported as `ProductCardRef`; rename to `ProductCard` in your codebase)
- `ProductGrid.reference.jsx` — grid wrapper (exported as `ProductGridRef`; rename to `ProductGrid`; self-contained, no cross-file import)
- `ProductCard.prompt.md` — wiring notes (visual element → `products` column)
- `products.card.html` — the live reference, viewable in-repo (its stylesheet/bundle paths point at the sibling `../design_handoff_homepage/` copies); styled with the 4 real seeded rows from the brief
- `tokens/` — colors, typography, spacing source-of-truth CSS
