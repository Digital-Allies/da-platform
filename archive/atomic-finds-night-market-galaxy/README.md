# Atomic Finds — "Night Market Galaxy" brand (archived 2026-09-20)

This is the **retired** Atomic Finds ATX brand: dark-cosmic/celestial theme (`#1E1E1E` bg,
`#F5C842` gold, `#D4822A` orange, DM Sans + Bagel Fat One, Galaxy Card / starfield / celestial
scroll-hero motifs). Archived here by Anthony's direction (2026-09-20) — not deleted, kept for
reference since the build is "still very nice," just no longer the direction for the site.

**Status:** No Vercel URL is connected to Atomic Finds under this repo. This is intentional, not
a bug. A new Atomic Finds brand is being developed separately, in a different repo under the
Atomic Finds GitHub org, in a different conversation — do not build against it from here, and
do not port anything from this archive into the new brand without Anthony's direction.

**What's NOT archived, and why:** the Supabase schema, `clients` row, and all existing data for
Atomic Finds (`client_id = 443936d5-f92e-480b-b206-c65cfb52bdfc` — products, reviews, settings,
design_tokens rows) are untouched and still live in the shared Supabase project. Anthony
confirmed this exact setup will be reused for the new brand, so nothing there was moved.

**What's NOT archived yet, and why:** the live CMS app (`tools/build-workflows/`) has several
files that unconditionally import Atomic-Finds-specific code at module level, not gated behind
a client check:
- `src/app/page.tsx` — imports `AtomicFindsHomepage` from `@sites/atomic-finds/components/`
- `src/app/collections/page.tsx` — imports `AtomicNav`, `ConstellationHeroCanvas`, `atomic-finds.css`
- `src/components/site/ClientPageWrapper.tsx` — a **shared, cross-client** wrapper — imports
  `AtomicNav`, `Starfield`, `atomic-finds.css` from `@sites/atomic-finds/` at the top level
- `src/app/layout.tsx` — the root layout for **every client** — loads
  `/atomic-finds/language-switcher.css` and `/atomic-finds/language-controller.js` unconditionally

Because of this, `tools/build-workflows/sites/atomic-finds/`, `tools/build-workflows/public/atomic-finds/`,
and the shared `GalaxyCard.tsx`/`CelestialScrollHero.tsx` components were **left in place** rather
than moved here — removing them requires editing those shared files first (and a build/type-check
pass) or the CMS breaks for every tenant, not just Atomic Finds. This is real engineering work,
not a file move, and per this repo's own PR-scoping rule it should be its own small, reviewed PR —
not bundled into a docs/reorg pass. Flagged in `STATUS.md` (2026-09-20 entry) as a follow-up.

## What's here

- `root-sites-atomic-finds/` — the full former `sites/atomic-finds/` tree: brand/copy docs, the
  Claude Design handoff exports (`design_handoff_homepage/`, `design_handoff_product_grid/`), and
  the `assets/` folder (icons, patterns, product photos, logo variations). Not app code — no
  `package.json`, no framework config.
- `ATOMIC_FINDS_ONBOARDING_BACKUP.md` — the last surviving copy of the old brand's `/admin/onboarding`
  tab content (that live tab currently renders empty sections — see STATUS.md). Not being restored,
  since this whole surface belongs to the retired brand and will need rebuilding for the new one.
