# Kai — Scroll Hero: Developer Build Spec

## Overview

A scroll-scrubbed website hero. The visitor's scroll position drives which frame is displayed, creating the illusion of a camera push-in while Kai rotates from gazing at the sea to direct eye contact. Scrolling back up reverses the sequence.

---

## Frame Inventory


| #   | Asset ID   | Shot           | Gaze Angle        | Description                                                       |
| --- | ---------- | -------------- | ----------------- | ----------------------------------------------------------------- |
| 1   | `U1WjcsvX` | Medium-wide    | ~90° (profile)    | Kai in full profile, gazing at the sea. Max foreground sea-spray. |
| 2   | `S23eNndM` | Medium         | ~60°              | Head turned ~30° toward viewer. Aware but still looking out.      |
| 3   | `OKAkIUmk` | Medium-close   | ~30°              | 3/4 angle. Eyes drifting toward viewer. Sea receding.             |
| 4   | `2p6M4hto` | Close-up       | ~10°              | Nearly facing. Eyes almost on camera. Atmospheric bokeh.          |
| 5   | `s-Zlej33` | Tight close-up | 0° (front)        | Fully facing. Steady neutral gaze, direct eye contact.            |
| 6   | `svtXs-3_` | Tight close-up | 0° — **Ending A** | **Calm / reassuring** expression. Soft steady eyes, closed lips.  |
| 7   | `OUiXlyb4` | Tight close-up | 0° — **Ending B** | **Warm welcoming smile.** Eyes bright and crinkled.               |


> **Ending choice:** Use Frame 6 for trust/authority narratives; Frame 7 for welcoming/onboarding contexts.

---

## Scroll → Frame Mapping

```
scrollProgress  →  frame
─────────────────────────
0%       →  Frame 1
0–16%    →  Frame 1
17–33%   →  Frame 2
34–50%   →  Frame 3
51–66%   →  Frame 4
67–83%   →  Frame 5
84–100%  →  Frame 6 or 7 (pick one as the hero ending)
```

**Implementation (JavaScript):**

```js
const frames = [f1, f2, f3, f4, f5, f6]; // or f7 for smile variant
const HERO_HEIGHT = window.innerHeight * 6; // 600vh total scroll range

window.addEventListener('scroll', () => {
  const progress = Math.min(window.scrollY / HERO_HEIGHT, 1);
  const idx = Math.min(Math.floor(progress * frames.length), frames.length - 1);
  showFrame(idx);
});

function showFrame(idx) {
  frames.forEach((f, i) => f.style.opacity = i === idx ? 1 : 0);
}
```

---

## Parallax Layer Stack

```
z-index: 40  →  Kai (the frame images) — fixed-position, full-viewport
z-index: 30  →  Foreground sea-spray / mist overlay (fades out as scroll progresses, 0.8 → 0 opacity)
z-index: 20  →  Text/UI overlay (tagline, CTA, nav)
z-index: 10  →  Background gradient (teal-slate → very dark, subtle parallax 0.3x scroll rate)
z-index: 0   →  Page body content (below the hero)
```

**Foreground mist fade:**

```js
const mistOpacity = Math.max(0, 0.8 - (scrollProgress * 2));
mistLayer.style.opacity = mistOpacity;
```

---

## Preload &amp; Performance

```html
<!-- Preload all frames in <head> for instant scrub -->
<link rel="preload" as="image" href="frame1.png">
<link rel="preload" as="image" href="frame2.png">
<link rel="preload" as="image" href="frame3.png">
<link rel="preload" as="image" href="frame4.png">
<link rel="preload" as="image" href="frame5.png">
<link rel="preload" as="image" href="frame6.png"> <!-- or 7 -->
```

- All frames same dimensions (4:5 portrait) — no layout shift on swap
- Use `opacity` transitions (not `display`) for GPU compositing
- Debounce scroll handler at ~16ms (60fps cap)
- Consider `IntersectionObserver` to activate only when hero is in viewport

---

## Reduced-Motion Fallback

```css
@media (prefers-reduced-motion: reduce) {
  .kai-hero { /* Show Frame 6 (calm) statically — no scroll scrub */ }
  .kai-hero img { opacity: 0; }
  .kai-hero img:last-child { opacity: 1; } /* Frame 6 */
}
```

Disable scroll listener entirely when `matchMedia('(prefers-reduced-motion: reduce)').matches`.

---

## Aspect Ratio &amp; Responsive Behavior

- **Native ratio:** 4:5 portrait (e.g. 1600 × 2000 px)
- **Mobile (&lt; 768px):** Full-width, left-aligned or centered, hero height = `100svh`
- **Desktop:** Hero section occupies ~50% of viewport width, right side; text/CTA on left
- **Crop strategy:** Use `object-fit: cover` with `object-position: center top` to keep Kai's face centered during viewport resizing

---

## Character Reference

**Asset ID:** `sS5vE2va` — Kai character design sheet (identity anchor for future regenerations or additional frames).