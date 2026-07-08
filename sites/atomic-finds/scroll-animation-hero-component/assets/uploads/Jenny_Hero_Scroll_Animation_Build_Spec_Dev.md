# Jenny Hero — Scroll Animation Build Spec (Dev Handoff)

**Effect:** Scroll-scrubbed image sequence. As the user scrolls down the hero, frames advance to create a camera push-in (medium → close-up) while Jenny turns from looking away to direct eye contact. Scrolling up reverses it. Foreground clouds parallax faster to feel like rising.

## Frame sequence (in scroll order)


| Step           | Asset ID   | State                                  |
| -------------- | ---------- | -------------------------------------- |
| 1              | `DHN9MVCO` | Medium, near-profile, mirror at temple |
| 2              | `uUIE9MxP` | Slight zoom, head turning in           |
| 3              | `xCG9J_3-` | Mid zoom, three-quarter                |
| 4              | `igqbSLO7` | Closer, near eye contact               |
| 5              | `OgFPIlMR` | Close-up, direct eye contact           |
| 6 (end A)      | `tUGJK7T9` | Close-up + warm smile                  |
| 7 (end B, alt) | `8Ex4sq90` | Close-up + peace sign / tongue out     |


- - Format: 4:5 portrait, **2K (1792×2400) — production-ready**.
- End on frame 6 **or** 7 (pick one; optional: swap by time of day / random for personality).

## Scroll mapping

- Pin the hero section (e.g., GSAP **ScrollTrigger** with `pin: true`, or Lenis + rAF).
- Map scroll progress `0→1` across the pinned section to frame index `1→6`. Use `Math.round(progress * (N-1))` to pick the frame; swap the visible `<img>`/canvas draw.
- **Scrub:** tie directly to scroll position (not time) so up-scroll reverses naturally.
- Easing: slight ease-in-out on progress for a smoother feel; keep frame swaps crisp.

## Layers (parallax)

1. **Background** (stars/constellations) — static or scale ~1.02, slowest.
2. **Subject sequence** (the frames above) — mid layer, the scrubbed images.
3. **Foreground clouds** — fastest layer, translateY downward as progress increases (reinforces "rising"). Can be a separate PNG with alpha, or CSS transform.
4. **Headline type** — pinned to background layer; fades/scrolls away as zoom concludes.

## Performance

- **Preload all frames** before enabling scrub (avoid flash on fast scroll).
- Optimize each frame (WebP/AVIF, ~150–300 KB).
- Only 6–7 frames → light; if smoother scrub wanted later, generate in-between frames.
- Respect `prefers-reduced-motion`: fall back to a single static hero (frame 6).

## Notes

- - Frame 1 direction is FIXED — opening now flows cleanly into frame 2.
- - A ~5s motion **preview video** accompanies this doc to show the intended feel.
  ## Hero Copy (by scroll beat)

  Reveal each block as the scroll progresses; fade the previous one out.

  **Beat 1 — top / zoomed-out (frames 1–2, gazing away):**
  > # Vintage, Written in the Stars

  **Beat 2 — push-in (frames 3–4, turning toward you):**
  > Curated rattan &amp; bamboo treasures, restored in Austin — and sent your way from across the galaxy.

  **Beat 3 — close-up / eye contact + smile (frames 5–6):**
  > Every piece has a name, a past, and a place in your orbit.
  >
  > **[ Meet the Family ]**

  *Type: headline in Lilita One, body in Inter, CTA pill in celestial yellow #F5C842. Beat 1 large over negative space; Beats 2–3 smaller, lower-third.*