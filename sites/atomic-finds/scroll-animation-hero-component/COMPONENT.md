# Celestial Scroll Hero — Atomic Finds design-system component

A scroll-scrubbed cinematic hero. As the visitor scrolls, six full-bleed 4:5
frames crossfade while a **continuous camera push-in** zooms toward the subject's
face — the Atomic Finds owner turns from gazing at the stars to meeting your eyes.
Scrolling back up reverses it. Inspired by breedlove.xyz.

**Character:** the real AF owner, framed inside the celestial-70s world (star /
constellation disc, night-cloud skies). Kin to the site's alien curator cast
(`atomic-finds-design-system/assets/alien-*.png`) without being one of them.

## Deliverables in this repo

| Artifact | Path | Use |
| --- | --- | --- |
| **HTML component** (canonical) | `celestial-hero.html` | Static sites, the design-system library, quick embeds. Framework-free. |
| **React component** | `tools/build-workflows/src/components/site/CelestialScrollHero.tsx` | The Next.js CMS engine. |
| **Optimized frames** | `assets/kai/web/frame-1..7.jpg` (~400 KB each) | Web-ready. Also copied to the CMS engine at `public/celestial-hero/`. |
| **Source frames** (2K) | `assets/kai/frame-*.png` | Masters for regenerating optimized frames or new endings. |
| **Manifest registration** | `atomic-finds-design-system/_ds_manifest.json` → `components[].CelestialScrollHero` | Makes it a first-class AF component. |

## Why this version is smooth (and the first build wasn't)

The original build split each beat into a **transparent cutout** of the owner
(`assets/kai/pose-*.webp`) floating on **separate sky gradients**, sized with
`object-fit: contain` at shrinking scales (0.70–0.82). That single choice caused
both reported problems:

- **"Not smooth"** — crossfading six discrete cutouts over a gentle container
  zoom reads as stepping, not a camera move.
- **"Frames 4/5/6 are cropped too much / should span the background"** — they were
  never cropped; they were *shrunken cutouts*, so they couldn't fill the frame.

This rebuild scrubs the **original full 2K frames** as full-bleed `object-fit:
cover` layers — exactly like breedlove's image sequence. Four things make it feel
cinematic:

1. **Full-bleed `cover`** — frames fill the whole viewport. This *is* the fix for
   "span the entire background."
2. **Continuous push-in** — the whole frame stack zooms `1.0 → 1+push` across the
   entire scroll, so motion never stops, even between frame swaps.
3. **Lerped progress** — raw scroll deltas are eased toward a target every
   animation frame (`smoothP += (target − smoothP) * 0.12`), so chunky wheel /
   trackpad scrolls render as buttery continuous motion. Biggest single win.
4. **Snappy two-frame dissolve** — each frame holds, then cross-dissolves inside a
   narrow 35–65% window (opacities always sum to 1). With only 6 distinct poses
   this keeps the double-exposure "ghost" brief — you dissolve past it while
   scrolling instead of lingering on a static 50/50 blend.

## Props / config

HTML config is via `data-cf-*` attributes on `.cf-hero`; React via props. Same names.

| Prop / attribute | Default | Notes |
| --- | --- | --- |
| `ending` / `data-cf-ending` | `smile` | `smile` (warm) or `playful` (peace sign + grin). |
| `screens` / `data-cf-screens` | `8` | Viewport-heights of scroll. Lower = faster scrub. |
| `push` / `data-cf-push` | `0.34` | Zoom intensity (0.15–0.5). |
| `mode` / `data-cf-mode` | `hero` | `hero` \| `about` \| `social` (social = centered 9:16 canvas). |
| `mist` / `data-cf-mist` | `on` | Foreground rising haze. |
| copy | AF defaults | `eyebrow`, `headline` (use `\n` for the break), `script`, `beat2`, `beat3`, `ctaText`, `ctaHref`. HTML: edit the DOM in `.cf-hero__beats`. |

Copy beats reveal by scroll: **Beat 1** headline over the opening wide shot →
**Beat 2** body at the push-in → **Beat 3** invitation + CTA at eye-contact.

## Usage

**HTML** — load AF tokens (optional; it self-contains without them), then drop the
`.cf-hero` section and the inline `<style>`/`<script>` from `celestial-hero.html`:

```html
<link rel="stylesheet" href="atomic-finds-design-system/colors_and_type.css">
<section class="cf-hero" data-cf-ending="smile" data-cf-screens="8"
         data-cf-push="0.34" data-cf-mode="hero" data-cf-assets="assets/kai/web"> … </section>
```

**React** (CMS engine):

```tsx
import CelestialScrollHero from '@/components/site/CelestialScrollHero'

<CelestialScrollHero
  mode="hero"
  headline={'Vintage, written\nin the stars'}
  ctaText="[ Meet the Family ]"
  ctaHref="/collection"
/>
```

Frames default to `/celestial-hero/frame-N.jpg` (already copied to the engine's
`public/`). Override with the `frames` prop for other subjects.

## Three uses (configured, not rebuilt)

- **Homepage hero** — `mode="hero"`, brand welcome copy, CTA into the shop.
- **Meet the owner / About** — `mode="about"`, founder-story copy, CTA to the story.
- **Social / ad** — `mode="social"` renders a centered 9:16 canvas; screen-record a
  scroll pass for a vertical IG/TikTok clip, or wire an autoplay driver.

## Regenerating optimized frames

```bash
cd assets/kai
for pair in frame-1.png:1 frame-2.jpg:2 frame-3.png:3 frame-4.png:4 \
            frame-5.png:5 frame-6-smile.png:6 frame-7-playful.png:7; do
  src=${pair%%:*}; n=${pair##*:}
  sips -s format jpeg -s formatOptions 80 -Z 2000 "$src" --out "web/frame-$n.jpg"
done
```

## Known follow-ups

- **Frame count is the ceiling on silkiness.** Six poses is the minimum for a
  crossfade scrub; breedlove uses dozens. To go fully silky, generate 2–4
  in-between frames per beat (identity-locked) with nano-banana and extend the
  sequence — the engine already handles any frame count.
- **Font-system conflict to reconcile (not decided here).** This site's
  `CLAUDE.md` documents **Lilita One / Tilda Script / DM Sans**, but the canonical
  `atomic-finds-design-system` package ships **Recoleta / Bromello / DM Sans**
  (`--font-display` / `--font-script`). The component consumes those token vars
  and falls back to the CLAUDE.md faces, so it renders correctly either way — but
  Anthony should pick one source of truth for the brand.
