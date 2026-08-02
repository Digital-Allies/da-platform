# Handoff: Atomic Finds ATX — Homepage & Design System

## Overview
Full brand/design system (tokens, component library, guideline specimens) plus the homepage built from it. This is going live as the production Atomic Finds ATX site.

## About the Design Files
The files here are **hi-fidelity design references** built in a build-step-free HTML/React-via-CDN environment (React from a `<script>` tag, inline styles, a compiled `_ds_bundle.js` powering the design-system components). `index.html` opens directly in a browser and is fully self-contained (all asset paths are relative to this folder) — use it to see and interact with the real design pixel-for-pixel. The task is to **recreate this design in the target codebase's actual stack** (the `da-platform` Next.js app), not to ship this HTML/JS as production code.

## Fidelity
**High-fidelity.** All colors, type, spacing, copy, and imagery are final — pull exact values from `tokens/*.css`, not from eyeballing.

## Sections (in page order)
1. **Nav** — sticky, logo (`nav-logo-mark`, 99×101px) + 4 links + CTA pill, dark bg with bottom hairline border.
2. **Hero** — eyebrow "Far-out finds, down-to-earth prices.", H1 "Atomic Finds ATX", script subhead "Vintage, Written in the Stars", body "Explore authentic 1970s rattan and bamboo, restored in Austin for a new generation. Timeless design, built to last.", 2 CTAs (solid + outline).
3. **What We Do / Meet Jennyfer** — 360px portrait (`assets/team/jennyfer-gomez-atx.webp`) + copy grid, real owner bio.
4. **ATOMIC FINDS ATX text band** — full-bleed glow display type, hover lift.
5. **The Collection (Shop)** — subhead "Curated rattan & bamboo for modern living. Every piece is hand-picked, restored, and ready to adopt.", category tabs + product grid, cards driven by the inline `products` array (JS) today — see `products-catalog.json` / the ProductGrid handoff for the live-data version.
6. **The Curators** — 4 mascot cards, each with a lane/voice: Daisy (Laid-Back Tastemaker), Milo (Detail Nerd), Tatiana (The Bold One), Malibu (Host With the Most).
7. **In the Spotlight (Featured)** — 3 `GalaxyCard` design-system components + durability callout ("Vintage rattan that has already outlasted three generations of trends. Built for another 50 years.") — click for detail modal.
8. **How We Deliver (Process)** — 4-step list + delivery stat card + animated truck icon.
9. **Reviews** — driven by `reviews-catalog.json` (19 entries, 10 written + 9 ratings-only; built for future Supabase CMS wiring).
10. **Contact + Footer** — contact cards, form, footer nav/logo, "where vintage meets digital" tagline lockup.

## Design Tokens
Source of truth: `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`.
- Core palette: `--celestial-yellow #F5C842`, `--amber-orange #D4822A`, `--bone-white #F0E8D8`, `--woven-moss #556B4A`, `--deep-charcoal #1E1E1E` / `--rattan-black #2A2017`.
- Fonts: **Bagel Fat One** (display/H1/H3, self-hosted `fonts/BagelFatOne-Regular.ttf`), **Pacifico** (H2/script, Google Fonts), **Agbalumo** (rare expressive, self-hosted), **DM Sans** (body, Google Fonts).
- Radius: 6/12/18/24px + pill. Glow effects replace shadows (`--glow-sm/md/lg/amber/ring`) — see `tokens/spacing.css`.

## Components (design-system library, `components/`)
Each is a paired `Name.jsx` + `Name.d.ts` (+ `Name.prompt.md` usage notes) compiled into `_ds_bundle.js`, exposed at `window.AtomicFindsDesignSystem_29110a.<Name>`:
- **Button**, **Badge**, **Card** — general UI primitives.
- **GalaxyCard** — signature orbital-ring featured-product card (tilted 3D ring, orbiting moon, nebula wash, detail dialog).
- **Icon** — 31 brand icons.
- **ProductCard / ProductGrid** — live Supabase `products` table renderer; see the separate `design_handoff_product_grid` package for the full data-contract spec — this is the component that should replace the homepage's current hardcoded `products` JS array once wired to `getProducts()`.

`guidelines/` has one `.card.html` specimen per topic (colors, typography, spacing, shapes, effects, logo, curators, brand voice, starfield) — open any of them for an isolated reference of that system slice.

## Known gap — Featured Products data
The homepage's "The Collection" grid still uses a hardcoded JS `products` array (see bottom of `index.html`) rather than the live Supabase table. Replace it with `ProductGrid` fed by `getProducts()` — full spec, states (null image/price, sale pricing, long titles), and CMS wiring snippet are in the companion `design_handoff_product_grid` handoff package.

## Assets
`assets/` (logos, icons, product photography, alien mascot illustrations, galaxy-card backgrounds, patterns) and `fonts/` (Bagel Fat One, Agbalumo) are included in full — copy into the target codebase's static asset pipeline as-is.

## Files in this bundle
- `index.html` — the homepage, fully self-contained/viewable as-is
- `_ds_bundle.js` — compiled design-system components (reference only — reimplement in the target stack, don't ship this file)
- `styles.css` — global reset + imports the token stylesheets
- `components/` — component source (`.jsx` + `.d.ts` + usage notes)
- `tokens/` — colors, typography, spacing CSS (source of truth for all values)
- `guidelines/` — specimen pages per system area
- `products-catalog.json`, `reviews-catalog.json` — structured content fixtures for the Shop and Reviews sections
