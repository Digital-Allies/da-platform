# Digital Allies

**AI Consultant & Tech Services for Small Businesses — Kingman, AZ**

> Clean engineering, clear communication, and follow-through that won't require follow-up.

---

## What This Repo Is

Source for [digitalallies.net](https://digitalallies.net) — a multi-page static HTML site
built without frameworks. Fast, accessible, bilingual (EN/ES), and structured for both
traditional search engines and AI assistants.

---

## Stack

| Layer | Tool | Notes |
|---|---|---|
| CSS | Tailwind CSS 3 (built) | `assets/css/tailwind.min.css` — no CDN |
| Icons | Lucide v1.17.0 (custom build) | `assets/js/lucide-da.js` — 4 icons, 3 KB |
| Fonts | JetBrains Mono + Lexend Deca | `assets/fonts/` — woff2, latin + latin-ext via @fontsource |
| JS | Vanilla | No frameworks |
| Schema | JSON-LD | LocalBusiness, WebSite, FAQPage, Service, Article per page |
| Hosting | Cloudflare Pages | `_headers` for 1-year asset cache |
| Forms | FormSubmit | No server required |

---

## Folder Structure

```
digitalallies.net/
├── index.html                  # Home: hero, services, pricing, FAQ, contact
├── brand.html                  # Brand guide: colors, typography, grid, asset portal
├── cookies.html
├── privacy.html
├── terms.html
├── sitemap.html
├── sitemap.xml
├── robots.txt
├── _headers                    # Cloudflare cache headers
├── _redirects                  # Cloudflare redirects (e.g. /learn/video-training → /learn/)
├── favicon.svg / favicon.png
│
├── assets/
│   ├── css/
│   │   ├── tailwind.min.css    # Tailwind production build (self-hosted)
│   │   └── a11y.css            # WCAG 2.1 AA overrides (e.g. contrast fix)
│   ├── js/
│   │   └── lucide-da.js        # Custom 4-icon Lucide bundle
│   ├── fonts/
│   │   ├── fonts.css           # @font-face declarations
│   │   ├── jetbrains-mono-*.woff2
│   │   └── lexend-deca-*.woff2
│   ├── diagrams/               # Diagram images (.webp)
│   ├── departments/            # Department icon images (.webp)
│   └── suspension-bridge/      # Hero illustration assets
│
├── learn/
│   ├── index.html              # Learning Hub (CollectionPage schema)
│   ├── seo-aeo.html            # Interactive SEO/AEO guide + schema generator
│   ├── alttext.html            # Alt-text guide + live checker
│   ├── ada-compliance.html     # ADA & web accessibility
│   ├── bilingual-web.html      # Bilingual web design
│   ├── dept-cooperation.html   # App integrations
│   ├── design-bureau.html      # Design & brand
│   └── self-governing-bureau.html  # Business automation
│
├── scripts/                    # Utility Python scripts (not part of build)
│   ├── README.md
│   └── *.py
│
└── docs/
    └── CODE-STANDARDS.md       # This file's companion — coding standards
```

---

## Key Features

**Bilingual (EN/ES)**
Full content toggle via `LanguageController`. Language persists in `localStorage`.
Screen reader announcements fire on toggle. No page reload. All text uses
`data-en` / `data-es` attributes.

**Accessibility — WCAG 2.1 AA**
All pages: semantic landmarks, `<main id="main-content">`, ARIA labels,
focus management, `prefers-reduced-motion`. Color contrast enforced via `a11y.css`
(Pulse Blue #3A7BD5 → #1D5FAD for text on bone-white background, 5.4:1 ratio).

**Structured Data**
Every page has JSON-LD schema. Learn pages carry both Service and Article schemas.
`index.html` and `learn/seo-aeo.html` include FAQPage. See `docs/CODE-STANDARDS.md`
for the full schema matrix.

**No-Build JavaScript**
Language switching, symmetry demos, interactive checklists, schema generators
all run on vanilla JS class instances. The only "build" is Tailwind CSS.

---

## Running Locally

```bash
npx serve .
# or
python3 -m http.server 8080
```

No `npm install` required for the site itself. To rebuild Tailwind or the Lucide bundle,
see `docs/CODE-STANDARDS.md`.

---

## Deployment

Push to `site-overhaul-2026` branch → merge to `main` → Cloudflare Pages auto-deploys.

After any schema or meta update, reindex these URLs in Google Search Console:
- `https://digitalallies.net/`
- `https://digitalallies.net/learn/seo-aeo`
- `https://digitalallies.net/learn/alttext`

---

## Brand Tokens

| Token | Hex | Usage |
|---|---|---|
| Bone White | `#F9F6F0` | Background |
| Charcoal | `#2D2D2D` | Text, borders |
| Pulse Blue | `#3A7BD5` | Links, accents (use `#1D5FAD` for text on bone-white) |
| Signal Red | `#C5301A` | Labels, CTAs |
| Light Pink | `#FADEEB` | Hover states |

Typography: `Lexend Deca` (headers, body) · `JetBrains Mono` (code, detail labels)

Grid: 20px Technical Lace canvas · 0.5px structural borders at `#2D2D2D`

**For full brand guidance:** use the `digital-allies-brand` skill in Claude (Cowork).

---

## Contact

- **(928) 228-5769** — call or text
- **contact@digitalallies.net**
- Kingman, Arizona

---

*Technological solutions for people with better things to do.*
