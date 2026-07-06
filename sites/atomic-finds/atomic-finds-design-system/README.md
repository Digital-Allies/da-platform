# Atomic Finds — Design System

> "Where Vintage Meets Digital — Curated Rattan for the Modern Home."
> Fran & Mabel's Rattan Revival Retreat · Est. 2024

This folder is the **canonical, transferable package** for the Atomic
Finds brand. It is structured exactly like a bound design system so it can
be selected in the system picker, loaded by other projects, and used to
build on-brand artifacts without guessing.

The aesthetic is **dark-mode celestial 70s**: a deep-charcoal canvas,
golden-glow neon accents, vintage rattan texture, and a signature
galaxy card with a neon ring frame.

---

## What's in this package

| File / folder | What it is |
| --- | --- |
| `colors_and_type.css` | All tokens (color, type, spacing, glow, motion) as CSS variables + base type styles. Import this first. |
| `styles.css` | The `.af-*` component & utility classes (buttons, cards, galaxy card, nav, footer, forms). Import after the tokens. |
| `_ds_bundle.js` | Hand-authored component bundle. Registers 8 React components on `window.AtomicFindsDesignSystem_af0620`. |
| `_ds_manifest.json` | Machine-readable manifest: namespace, components, templates, palette, type. |
| `templates/` | Four ready-to-use page layouts (homepage, product index, product detail, CMS admin) + `ds-base.js`. |
| `assets/` | Alien characters (transparent), logo monogram + wordmark, brand board. |
| `index.html` | One-page landing linking foundations, components, and templates. |

---

## How to use it

### 1. Load the foundation (any page)

```html
<link rel="stylesheet" href="atomic-finds-design-system/colors_and_type.css">
<link rel="stylesheet" href="atomic-finds-design-system/styles.css">
```

That's enough to use every `.af-*` class directly in static HTML — the
four templates work this way (no build step, fully editable).

### 2. Mount components (React / DC)

Load the bundle once, then mount from a DC template:

```html
<helmet>
  <link rel="stylesheet" href="atomic-finds-design-system/colors_and_type.css">
  <link rel="stylesheet" href="atomic-finds-design-system/styles.css">
  <script src="atomic-finds-design-system/_ds_bundle.js"></script>
</helmet>

<x-import component-from-global-scope="AtomicFindsDesignSystem_af0620.GalaxyCard"
          image="atomic-finds-design-system/assets/alien-milo.png"
          title="Milo" subtitle="Wooden record stand" script="Vinyl Guardian"
          hint-size="260px,360px"></x-import>
```

### Components (`window.AtomicFindsDesignSystem_af0620.*`)

| Component | Key props |
| --- | --- |
| `Button` | `variant` (primary/solid/amber), `href`, `disabled` |
| `Badge` | `status` (instock/featured/out) |
| `Card` | `title`, `text`, `price`, `image`, `emoji`, `badge` |
| `GalaxyCard` | `image`, `title`, `subtitle`, `script`, `stars` |
| `Testimonial` | `quote`, `author` |
| `Field` | `label`, `type`, `placeholder`, `options`, `required` |
| `Nav` | `logo`, `links`, `cta` |
| `Footer` | `columns`, `tagline`, `copyright` |

---

## Color — golden glow on deep charcoal

95% deep-charcoal + warm neutrals, 5% high-signal golden glow. Glow
replaces drop-shadow as the brand's depth cue.

| Token | Hex | Role |
| --- | --- | --- |
| Celestial Yellow | `#F5C842` | Primary accent — headlines, CTAs, glow |
| Amber Orange | `#D4822A` | Secondary glow — script subheads, hover |
| Bamboo Honey | `#D4A853` | Mid accent |
| Rattan Tan | `#C4956A` | Borders, dividers, weave texture |
| Woven Moss | `#556B4A` | Muted green accent — eco tags |
| Austin Clay | `#C1502E` | Deep rust accent (sparingly) |
| Bone White | `#F0E8D8` | Primary body text |
| Rattan Black | `#2A2017` | Card surfaces, section variation |
| Deep Charcoal | `#1E1E1E` | Primary background |

## Type — the cleanest reusable pairing

- **Recoleta** — display + headings. Warm, rounded retro serif set in
  title case, always glowing. *(Fallback: DM Serif Display.)*
- **Bromello** — script subheads, accents & product nicknames. A relaxed
  brush script that matches the logo. *(Fallback: Kaushan Script.)*
- **DM Sans** — body, labels, prices, table content. Clean humanist sans,
  weights 400/500/600/700.

## Shape & motion

- **Soft rounded frames** (8–16px radius) — this brand is *not* square
- **Glow, not shadow** — `--glow-sm/md/lg`, never `box-shadow` drop
- Hover: 6px lift + golden glow over 300ms `cubic-bezier(0.16,1,0.3,1)`
- The galaxy card scatters twinkling stars and frames its image in a
  neon ring; a little moon rides a tilted orbit — sweeping to the front
  of the card along the bottom and behind it across the top. The rounded
  frame continues straight into the info area with **no tag break**.

---

## Relationship to Digital Allies

Digital Allies is the **CMS platform** that powers the Atomic Finds site
(see `../Digital Allies CMS Integration.md`). Atomic Finds is a **separate
brand** with its own visual identity — this package. The CMS backend may
carry Digital Allies branding; the Atomic Finds storefront does not.

---

*Curated by Fran & Mabel. Built to be its own system.*
