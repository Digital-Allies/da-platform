---
name: da-dark-mode-design-spec
description: Digital Allies dark-mode UI design spec — charcoal canvas with a light ruled grid, bone/white type hierarchy, pink + light-blue accent pair, and a flat (non-glassmorphic) hover/card treatment. Use whenever building or restyling any dark-themed Digital Allies surface (zo.space pages, the CMS platform, or the planned standalone dark UI kit) so it matches the established dark variant instead of re-deriving colors from the light-mode brand reference.
compatibility: Created for Zo Computer
metadata:
  author: digitalallies.zo.computer
  companion_to: Marketing/design-system-reference-260719.md
  status: locked-in 2026-07-23
---

# Digital Allies — Dark Mode Design Spec

This is the dark counterpart to the light-theme reference in `Marketing/design-system-reference-260719.md`
(source repo: [Digital-Allies/design-system](https://github.com/Digital-Allies/design-system)). It codifies
the dark UI that's already live on the `digitalallies.zo.space` Command Deck, with the token adjustments
Anthony locked in on 2026-07-23. This is the intended base for the long-planned standalone dark UI kit that
will sit alongside the primary brand, the marketing site, and the CMS platform — so treat these tokens as
canonical, not page-specific.

Read `assets/theme.ts` for a copy-pasteable token object matching this spec exactly.

## The vibe
Same geometric/editorial "Technical Lace" language as the light theme — square corners, thin borders,
floating panels, no drop shadows, no photography — just inverted onto a charcoal canvas. **The light ruled
grid sitting on top of the charcoal is the signature move of this variant — never drop it, never darken it
into invisibility.**

## Canvas
| Token | Hex / value | Use |
|---|---|---|
| `bg` | `#1E1D1B` | Outermost page background |
| `canvas` | `#2D2D2D` | Charcoal surface the grid sits on |
| `gridLine` | `rgba(249,246,240,0.06)` | 20px × 20px ruled grid over the canvas (light-on-dark) |

```css
background-color: #2D2D2D;
background-image:
  linear-gradient(rgba(249,246,240,0.06) 1px, transparent 1px),
  linear-gradient(90deg, rgba(249,246,240,0.06) 1px, transparent 1px);
background-size: 20px 20px;
```

## Type
- Headlines: **Lexend Deca**, **semibold (600)**, tight line-height (1.1), color **bone** `#F9F6F0`.
  - This is a deliberate change from the light-theme spec's bold/700 headline weight — dark-mode headings
    are semibold, not bold.
- Body copy (paragraphs, descriptions — the actual reading text): **JetBrains Mono**, color **white** `#FFFFFF`.
  - This is the one correction from the original Command Deck build, which used bone for body copy too.
    Bone is now reserved for headings only; running body text is pure white.
- Secondary/meta text (timestamps, counts, footnotes, small labels under a heading): JetBrains Mono, color
  **muted** `#B7B2A8` — unchanged, still a distinct third tier below body white.
- Eyebrows: uppercase, JetBrains Mono, `letter-spacing: 0.18em`, colored with one of the two accents below
  (see mapping table).

**Summary: white body, bone headings, semibold headline weight.**

## Accent colors — pink + light blue only
The darkest brand accents — `pulse-blue` `#3A7BD5` and `signal-red` `#C5301A` — are **retired from this dark
variant**. Every place they used to appear (eyebrows, status text, badges, button outlines, CTA text, hover
accents, the pulse-dot mark) now uses one of these two lighter, dark-mode-native accents instead:

| Token | Value | Role |
|---|---|---|
| `accentPink` | `#FADEEB` at **85% opacity** → `rgba(250,222,235,0.85)` | Badges/pills, secondary eyebrow accent, attention text that used to be signal-red |
| `accentBlue` | `#4A79CE` | Live/status indicators, button outlines, CTA text, links, hover accents, the pulse-dot mark — everything that used to be pulse-blue |

Old → new mapping, for retrofitting existing pages:

| Old role | Old color | New color |
|---|---|---|
| "System Live" / status eyebrow | pulse-blue `#3A7BD5` | accent-blue `#4A79CE` |
| Pulse-dot animated mark | pulse-blue `#3A7BD5` | accent-blue `#4A79CE` |
| Section eyebrow accent (attention) | signal-red `#C5301A` | accent-pink `rgba(250,222,235,0.85)` |
| Cadence/status badge border+text | light-pink `#FADEEB` @ 100% | accent-pink `rgba(250,222,235,0.85)` |
| Secondary CTA / button outline border | pulse-blue `#3A7BD5` | accent-blue `#4A79CE` |
| Breadcrumb / folder-icon active state | pulse-blue `#3A7BD5` | accent-blue `#4A79CE` |
| Error/warning panel border | signal-red `#C5301A` | accent-pink `rgba(250,222,235,0.85)` |

Do not reach for `#3A7BD5` or `#C5301A` in a dark-mode context — if a design calls for the darkest brand
blue or red, that's a light-theme decision; pull from `Marketing/design-system-reference-260719.md` instead.

## Hover & card surface treatment — flat, not glass
This is the part Anthony explicitly likes and wants preserved as-is: a **flat, low-key wash**, not
glassmorphism. No `backdrop-filter: blur(...)`, no translucent layering, no frosted-glass look — just a
single flat semi-transparent overlay in the bone tone.

| Token | Value | Use |
|---|---|---|
| `cardBg` | `rgba(249,246,240,0.03)` | Panel / card background |
| `hoverBg` | `rgba(249,246,240,0.05)` | Hover state on buttons, links, list rows |
| `border` | `rgba(249,246,240,0.16)` | 1px solid panel/button borders, square corners (no radius) |

The card background and the hover background sit close together on purpose (0.03 → 0.05) — that near-equal
step is what reads as "glassmorphism-adjacent but flat" rather than a literal glass effect. Keep that
relationship when adding new components; don't add blur or drop shadows to chase a "more glass" look.

## Structural rules (inherited from the light-theme spec, unchanged)
- Square corners everywhere; no border radius on panels/buttons.
- 1px solid borders define panel edges — the "floating object" look, not drop shadows.
- 4px-based spacing scale; one grid unit = 20px, matching the grid line pitch.
- The pulse-dot is the only continuously-animated element — now in accent-blue `#4A79CE` instead of the old
  pulse-blue.

## Where this is already live
`digitalallies.zo.space` (the Command Deck homepage and its sub-pages) is the reference implementation.
When asked to build a new dark-themed zo.space page, CMS view, or a piece of the future standalone dark UI
kit, start from `assets/theme.ts` and this spec rather than re-deriving tokens from the Command Deck's route
code or the light-theme reference.
