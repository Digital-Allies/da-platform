# Atomic Finds ATX — Design Assets & Handoffs

Atomic Finds ATX is a vintage rattan & bamboo furniture business restored and
curated in Austin by **Jennyfer Gomez**. This directory holds the design
system, brand assets, and Claude Design handoffs that feed the **live site**,
which is built and served from `tools/build-workflows` (the shared DA CMS
platform) — this folder is not itself a runnable app.

> For current colors, type, spacing, and commerce rules, **`CLAUDE.md` in this
> directory is the source of truth**, synced 2026-07-21 from the Claude Design
> project. This README is an index of what's in the folder, not a duplicate
> spec — if the two ever disagree, `CLAUDE.md` wins.

## Where the live implementation actually lives

| Piece | Path (in `tools/build-workflows`) |
|---|---|
| Bespoke homepage | `src/components/site/atomic-finds/AtomicFindsHomepage.tsx` |
| Homepage styles | `src/styles/atomic-finds.css` |
| Product grid + quick-view modal | `src/components/site/ProductGrid.tsx` |
| Galaxy Card (signature featured-product component) | `src/components/site/GalaxyCard.tsx` |
| CTA / selling-state resolver | `src/lib/commerce.ts` (`resolveProductCta`) |
| Products admin ("The Showroom") | `src/app/admin/(protected)/products/page.tsx` |
| Reviews admin | `src/app/admin/(protected)/reviews/page.tsx` |
| Commerce schema migration | `supabase/migrations/20260121000000_products_commerce_fields.sql` |
| Reviews schema migration | `supabase/migrations/20260122000000_reviews_table.sql` |
| Catalog + reviews seed data | `supabase/seed-atomic-finds-catalog.sql`, `supabase/seed-atomic-finds-reviews.sql` |

The homepage route (`src/app/page.tsx`) special-cases Atomic Finds by
`NEXT_PUBLIC_CLIENT_ID` to render `AtomicFindsHomepage` instead of the
generic block-based renderer other clients use, so the layout can match the
approved design pixel-for-pixel.

## Commerce architecture (why this matters for future clients)

Atomic Finds is the platform's first real e-commerce-oriented build, and its
patterns are meant to be reused, not one-offs:

- **Flexible conversion layer, not a checkout commitment.** Sales today
  happen off-platform (Facebook Marketplace, direct payment, inquiry) — there
  is no native checkout yet. Each product has a `selling_state`
  (`listing | inquiry | direct | checkout`) and an optional `cta_label`
  override; `resolveProductCta()` is the single place any component computes
  a CTA label and destination, so a future checkout provider can slot in
  without touching component code. CTAs are never hard-coded to "Buy Now."
- **Quick-view modal, not per-product pages** — `ProductGrid` and
  `GalaxyCard` both open a shared detail modal instead of routing to a
  dedicated product URL.
- **Reviews are a reusable, source-agnostic feature.** The `reviews` table
  has a free-text `source` field (Facebook, Google, Yelp, etc.), editable per
  review in the admin UI — it is not hard-coded to Facebook even though every
  current review was sourced from Jennyfer's Facebook Marketplace profile.
- **Admin-first.** Both products ("The Showroom") and reviews are fully
  CRUD-able by a non-technical owner from `/admin`, following the same
  pattern as the platform's existing Services module.

## What's in this directory

As of 2026-07-21 this folder was cleaned up — three superseded generations
of design-system exports, two abandoned scroll-hero prototypes, a
standalone Galaxy Card prototype, dev screenshots, and image-gen scratch
output were removed (nothing in `tools/build-workflows` or the handoffs
below referenced any of it). What's left is current:

### Design system & brand
- `CLAUDE.md` — **current** design tokens, type, spacing, motion, voice, and commerce rules (read this first)
- `Master Setup Guide_ Atomic Finds Digital Destination (1).txt` — early strategy doc; has real owner contact info and review themes, technical instructions are stale (describes a different, never-used platform) — worth a human skim to extract anything still useful, otherwise safe to remove

### Claude Design handoffs (source of the live build)
- `design_handoff_homepage/` — full homepage HTML/CSS/tokens/fonts pulled from the approved Claude Design project (`29110ac3-0a76-4fa1-a322-a78bc212a50d`), plus `products-catalog.json` / `reviews-catalog.json` reference data. Includes the `GalaxyCard` reference component — this is the current source for `GalaxyCard.tsx`, not the old standalone prototype (removed).
- `design_handoff_product_grid/` — ProductCard/ProductGrid reference components and prompt, updated to match the shipped `resolveProductCta()` contract

### Assets
- `assets/` — fonts, raw Marketplace product photos (still needed for `products.image_url`, currently null on several rows), curator character art, patterns, logo variations. Some subfolders here (pattern/icon/logo variants, design-guide reference screenshots) look like exploratory leftovers rather than shipped assets — flagged for a closer pass, not yet touched.

## Status

- ✅ Homepage (hero, about, shop grid, curators, featured Galaxy Cards, process, reviews, contact, footer) built and visually verified against the approved design
- ✅ Product catalog (10 real photographed pieces) + admin "Showroom" CRUD
- ✅ Reviews (19 real reviews) + admin CRUD with editable `source` field
- ⏳ Native on-site checkout — intentionally not built yet; architecture supports adding it later without a rework
- ⏳ Reviews migration/seed still need to be run against Supabase (commerce-fields migration and catalog seed have already been run)
