# Digital Allies — Code Standards

> Reference for anyone (human or AI) working on digitalallies.net.

---

## Brand

**Always load the `digital-allies-brand` skill before creating any branded content.**
It provides the exact hex codes, font stack, layout system, and voice rules.

Brand skill: `digital-allies-brand` (available in Claude / Cowork)

---

## HTML Conventions

### File names
- Lowercase, hyphen-separated: `seo-aeo.html`, `bilingual-web.html`
- Root pages: `index.html`, `brand.html`, `privacy.html`
- Learn pages live in `learn/`

### Asset paths
| From root (`index.html`) | From `learn/` subpages |
|---|---|
| `assets/css/tailwind.min.css` | `../assets/css/tailwind.min.css` |
| `assets/js/lucide-da.js` | `../assets/js/lucide-da.js` |
| `assets/fonts/fonts.css` | `../assets/fonts/fonts.css` |
| `assets/css/a11y.css` | `../assets/css/a11y.css` |

### Required `<head>` load order
```html
<!-- 1. Fonts first (preconnect + stylesheet) -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{prefix}assets/fonts/fonts.css">

<!-- 2. Tailwind (built CSS) -->
<link rel="stylesheet" href="{prefix}assets/css/tailwind.min.css">

<!-- 3. Accessibility overrides -->
<link rel="stylesheet" href="{prefix}assets/css/a11y.css">

<!-- 4. JSON-LD schemas (one per type, in <head>) -->
<script type="application/ld+json">{ ... }</script>
```

### Required `<body>` structure
```html
<body>
  <!-- Skip link -->
  <a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to content</a>

  <!-- Header + nav -->
  <header>...</header>
  <nav>...</nav>

  <!-- Main content landmark -->
  <main id="main-content" tabindex="-1">
    ...
  </main>

  <!-- Footer -->
  <footer>...</footer>

  <!-- Lucide (bottom of body) -->
  <script src="{prefix}assets/js/lucide-da.js"></script>
  <script>lucide.createIcons();</script>
</body>
```

### Bilingual text
All user-visible strings must have both attributes:
```html
<p data-en="English text" data-es="Texto en español">English text</p>
```
The `LanguageController` class swaps `textContent` on toggle.

---

## CSS Conventions

### Tailwind build
- Source: `tailwind.config.js` at repo root
- Output: `assets/css/tailwind.min.css`
- Rebuild: `npx tailwindcss -c tailwind.config.js -o assets/css/tailwind.min.css --minify`

### Custom classes (used across site)
| Class | Purpose |
|---|---|
| `structural-border` | 0.5px `#2D2D2D` solid border |
| `font-headers` | Lexend Deca |
| `sr-only` | Screen-reader-only (visually hidden) |

### Color contrast rule
Do NOT use `text-primary-blue` (`#3A7BD5`) for body text on bone-white — it fails
WCAG AA (3.7:1). Use `#1D5FAD` instead. The `a11y.css` override enforces this.

---

## JavaScript Conventions

- Vanilla JS only — no frameworks, no build step beyond Tailwind
- Class-based: one JS class per major interactive feature
- No inline event handlers (use `addEventListener`)
- `lucide.createIcons()` must appear **once** per page, after the Lucide `<script>` tag

### Lucide icons
Available icons (custom 4-icon bundle): `archive`, `ghost`, `mic`, `video`
Usage: `<i data-lucide="video"></i>` — rendered by `lucide.createIcons()`

To add a new icon, rebuild `assets/js/lucide-da.js` from `node_modules/lucide/dist/esm/icons/`.

---

## JSON-LD Schema Standards

### Schema matrix

| Page | Required schemas |
|---|---|
| `index.html` | ProfessionalService, WebSite, FAQPage |
| `learn/index.html` | CollectionPage |
| All other `learn/*.html` | Service, Article |
| `learn/seo-aeo.html` | Service, Article, FAQPage |
| `learn/alttext.html` | Service, Article, FAQPage |

### Article schema template
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Page title (match <title> tag, strip site name)",
  "description": "Meta description content",
  "url": "https://digitalallies.net/learn/page-slug",
  "author": {
    "@type": "Person",
    "name": "Anthony",
    "worksFor": {
      "@type": "Organization",
      "name": "Digital Allies",
      "telephone": "+1-928-228-5769"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Digital Allies",
    "url": "https://digitalallies.net"
  },
  "dateModified": "YYYY-MM-DD",
  "mainEntityOfPage": "https://digitalallies.net/learn/page-slug"
}
```

### Rules
- JSON-LD blocks go in `<head>`, one per `@type`
- Validate at [validator.schema.org](https://validator.schema.org) before committing
- `dateModified` must be updated whenever content changes

---

## Accessibility Checklist

Before merging any HTML change, verify:

- [ ] All images have descriptive `alt` text (or `alt=""` if decorative)
- [ ] All form inputs have `<label for="...">` or `aria-label`
- [ ] Heading hierarchy is sequential (h1 → h2 → h3 — no skips)
- [ ] All interactive elements are keyboard-reachable (`tabindex` where needed)
- [ ] Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text
- [ ] Decorative elements have `aria-hidden="true"`
- [ ] `<main id="main-content">` is present on every page
- [ ] Skip link present and functional

---

## Commit Message Format

```
v{major}.{minor}: short description — what changed

- bullet list of specific changes
- one line per file or concern
```

Examples:
```
v1.2: accessibility - WCAG 2.1 AA compliance

- Fix color contrast on text-primary-blue (3.7:1 → 5.4:1)
- Add <main> landmark to 9 pages
- Fix label for= on 12 schema generator inputs
```

---

## Caching & Deployment

`_headers` (Cloudflare Pages):
- `assets/*`: 1 year immutable (`Cache-Control: public, max-age=31536000, immutable`)
- `*.html`: no-cache (`Cache-Control: no-cache, must-revalidate`)

**When updating any versioned asset (fonts, CSS, JS), bump the filename or add a
query-string version so existing caches are busted.**

`_redirects`:
- Use for removed or renamed pages: `/old-path /new-path 301`

---

## Utility Scripts

Scripts in `scripts/` are local utilities — they are NOT part of the build pipeline:

| Script | Purpose |
|---|---|
| `add_socials.py` | Add social meta tags to pages |
| `fix_json_syntax.py` | Lint and fix JSON-LD blocks |
| `inject_service_schema.py` | Inject Service schema into learn pages |
| `update_index.py` | Batch-update index.html |
| `update_learn.py` | Batch-update learn/ pages |
| `update_sitemap.py` | Regenerate sitemap |
