# Paula Scher Typographic Design System

## When to Use This Skill

Use when a client wants a website, print piece, or digital asset that is:
- Type-driven and poster-style (the type IS the visual)
- Inspired by: Paula Scher / Public Theater, Polish Poster School, A24, Criterion Collection
- Needs a cohesive cover/card system where each item has a distinct personality but belongs to the same visual family
- Warm, editorial, or indie in character — bookstores, theaters, record shops, arts orgs, independent brands

Trigger phrases: "poster style", "type-driven", "Paula Scher", "Public Theater", "Criterion Collection", "A24 aesthetic", "Polish poster", "editorial design", "indie bookstore", "make the type the art"

---

## Core Design Principles

### 1. The Stacked Headline (Public Theater Method)
The headline is not a line of text — it's a vertical composition. Each word or phrase occupies its own horizontal band, with deliberately mismatched sizes and weights.

**Rules:**
- At least 3 different size levels in one headline (XS / SM / LG / XL)
- Alternate between roman and italic within the stack
- Use indentation and right-alignment to create rhythm, not symmetry
- The largest word should be so big it almost can't fit — let it breathe into the margins
- One word or line in the brand accent color; all others in ink

**CSS pattern:**
```css
.hero-line--xs  { font-size: clamp(0.9rem, 2vw, 1.1rem); letter-spacing: 0.18em; text-transform: uppercase; }
.hero-line--sm  { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 300; font-style: italic; }
.hero-line--lg  { font-size: clamp(5rem, 14vw, 10rem); font-weight: 900; }
.hero-line--xl  { font-size: clamp(5.5rem, 16vw, 11.5rem); font-weight: 900; font-style: italic; }
.hero-line--offset    { padding-left: clamp(2rem, 8vw, 7rem); }
.hero-line--right     { text-align: right; }
```

---

### 2. The Cover/Card System (Criterion Method)
Every card in a grid is its own designed poster. They share a palette and typeface family, but each has a unique background, color treatment, and motif.

**Rules:**
- Each cover gets a Criterion-style collection number (№01, №02, etc.)
- Each cover gets a genre stamp in the corner — tiny, bordered, tracked caps
- Each cover has one inline SVG motif that is specific to the title's content
- Three typographic approaches are distributed across the grid: (a) massive italic serif fills, (b) condensed bold sans stack, (c) multi-scale eclectic mix
- No two adjacent covers should share the same background color
- Dark and light covers should alternate across the grid

**Cover template (aspect ratio: 3:4):**
```html
<div class="book-cover cover-[title-slug]">
  <div class="c-head">
    <span class="c-num">№0X</span>
    <span class="c-genre">Genre</span>
  </div>
  <!-- Title composition: choose one of the 3 approaches -->
  <div class="c-title-wrap">...</div>
  <!-- SVG motif: simple, flat, 1-2 colors -->
  <svg class="c-motif">...</svg>
  <span class="c-author">Author Name</span>
</div>
```

**Hover behavior:**
```css
.book-cover:hover {
  transform: translateY(-6px) rotate(1.8deg);
  box-shadow: 10px 18px 40px rgba(26,26,26,0.22);
}
```

---

### 3. Palette System (95/5 Rule with Warmth)
Foundation is neutral (cream + ink). The 5% of accent color does all the work.

**Standard warm bookstore palette:**
```
--saffron:    #E8A33D   /* Primary accent — used for ~5% of any surface */
--ink:        #1A1A1A   /* Near-black — borders, heavy type, backgrounds */
--cream:      #F5EDDC   /* Main background */
--dusty-rose: #C97B7B   /* Secondary warm accent */
--sage:       #8FA888   /* Cool-warm balance */
--coral:      #D4614A   /* High-energy accent */
--navy:       #1A2744   /* Deep cool dark */
```

**Cover background distribution across 8 cards:**
- Ink #0D0D0D — 2 covers (the dramatic dark ones)
- Saffron #E8A33D — 1 cover (the warm golden one)
- Dusty Rose #C97B7B — 1 cover
- Sage (deeper) #4E6E52 — 1 cover
- Coral #D4614A — 1 cover
- Navy #1A2744 — 1 cover
- Cream #F5EDDC with ink border — 1 cover (the Criterion-clean one)

---

### 4. Typography Stack
```
Display:   Fraunces (Google Fonts) — variable optical size, beautiful italic
Condensed: Barlow Condensed 700/800/900 — for the Public Theater bold stack
Body:      Plus Jakarta Sans 400/500/600 — clean, readable, modern
```

**Import URL:**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700;1,9..144,900&family=Barlow+Condensed:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

**Typography pairing logic:**
- Fraunces heavy italic → emotional, romantic, dramatic titles
- Barlow Condensed → kinetic, bold, Public Theater energy
- Mixed in same composition → pick ONE dominant approach per cover, one contrast element

---

### 5. The Featured / Spotlight Section (Warm Gradient)
The animated gradient is contained — used as a full-width band for a single featured product, not as a page background.

```css
@keyframes gradientDrift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.sc-featured {
  background: linear-gradient(-45deg, #E8A33D, #D4614A, #C97B7B, #E8B86D, #E8A33D);
  background-size: 400% 400%;
  animation: gradientDrift 12s ease infinite;
}
```

Structure: 3-column grid inside — [Label/context] [Cover poster] [Product info + CTA]
The cover in the featured section gets a slight rotation (-2deg) and a deeper shadow.

---

### 6. SVG Motif System
Each cover gets one small inline SVG motif. Keep them:
- Simple: 3–6 paths maximum
- Flat: fill or stroke only, no gradients in the SVG
- Thematic: motif connects to the book/product content
- Transparent: use `opacity: 0.08–0.25` so they read as texture, not illustration

**Motif vocabulary for books:**
| Genre      | Motif ideas                                  |
|-----------|----------------------------------------------|
| Fantasy   | Crown, sword, eye, rune, moon                |
| Sci-Fi    | Circuit nodes, seed/flame, orbit rings        |
| Romance   | Concentric circles, bird, interlinked rings   |
| Literary  | Horizontal rules, location shield, typewriter |
| Mystery   | Keyhole, candle, fingerprint arc              |
| Children's| Circuit, star, simple animal outline          |
| Historical| Compass rose, sun arc, feather quill          |
| Nonfiction| Grid lines, hourglass, bar chart silhouette   |

---

### 7. Section Dividers
Use 2px solid ink borders between every major section. This is the grid structure of the design — it signals that each section is a distinct publication zone.

```css
section { border-bottom: 2px solid var(--ink); }
```

Section headers always use the same pattern:
```html
<div class="sc-section-header">
  <h2>Section Title</h2>             <!-- Barlow Condensed, uppercase -->
  <span class="rule"></span>          <!-- flex: 1, 2px solid ink -->
  <span class="sub-label">context</span>
</div>
```

---

### 8. Dark Section (Curator's Notebook Method)
One section per page should use ink background for visual contrast. In this system, it's the editorial/review section.

- Background: `#1A1A1A`
- Text: cream `#F5EDDC`
- Accent stripe: `3px solid var(--saffron)` on left border of each card
- Card background: `rgba(245,237,220,0.05)` — barely visible
- Card border: `1px solid rgba(245,237,220,0.12)`

---

### 9. Interactive Micro-Moments
Every page should have at least one small personality interaction. Use sparingly.

**YES/NO pattern (brand voice check):**
```html
<div class="sc-yesno" id="yesno">
  <span class="q">Do I need another book today?</span>
  <div class="btns">
    <button onclick="yesnoAnswer('yes')">Yes</button>
    <button onclick="yesnoAnswer('no')">No</button>
  </div>
  <span class="reply" id="yesno-reply" style="display:none"></span>
</div>
<script>
function yesnoAnswer(a) {
  document.getElementById('yesno').querySelector('.btns').style.display = 'none';
  document.getElementById('yesno').querySelector('.q').style.display = 'none';
  const reply = document.getElementById('yesno-reply');
  reply.style.display = 'block';
  if (a === 'yes') reply.textContent = 'You already knew. Keep scrolling. ↓';
  else {
    reply.textContent = 'That was a test. There is no correct answer.';
    setTimeout(() => document.querySelector('.shelf').scrollIntoView({ behavior: 'smooth' }), 1200);
  }
}
</script>
```

---

## Duda Compatibility Notes

When implementing this system in Duda:

1. **Scope all CSS** under a root class (`.sc-root`) to prevent leakage into Duda's layout engine
2. **No `position: fixed`** or `100vw` on elements inside widgets — Duda handles the viewport
3. **Google Fonts** → Move `@import` to Duda's Global Fonts settings in production
4. **Shopify Buy Button** → The `.book-cover` + `.book-card__meta` blocks are designed to be replaced with Shopify Buy Button embeds. Set the container padding to `0px` in the Duda widget settings so the embed aligns to the grid
5. **Featured section** → Place in a full-width Duda row with no column padding
6. **Dark section** → Set the Duda row background to `#1A1A1A` and place the HTML widget inside with zero padding

---

## Output Format

When invoked, build a complete, self-contained HTML file with:

1. All CSS scoped under `.sc-root`
2. Google Fonts `<link>` tag in `<head>`
3. Sections in order: Nav → Hero (stacked headline) → Featured (gradient) → Grid (poster covers) → Dark editorial section → Info strip → Footer
4. Each book/product card as a unique poster composition
5. At least one micro-interaction (YES/NO or equivalent)
6. Inline SVG motifs — no external image dependencies
7. Comments marking Duda widget boundaries and Shopify swap points
8. Fully responsive at 1100px / 900px / 600px breakpoints

**File naming convention:** `[project-slug]-demo-v[n].html`

---

## Reference Project

`saffron-co-demo-v2.html` — Saffron & Co. Bookstore, Kingman AZ  
8 poster covers, featured gradient section, YES/NO hero, Curator's Notebook, full Duda-compatible structure.
