# Digital Allies

**AI Consultant & Tech Services for Small Businesses — Kingman, AZ**

> Clean engineering, clear communication, and follow-through that won't require follow up.

---

## What This Repo Is

This is the source for [digitalallies.net](https://digitalallies.net) — a single-file HTML website built without frameworks, dependencies, or build tools. It's fast, accessible, bilingual, and structured for both traditional search engines and AI assistants.

---

## Stack

- HTML5 with semantic markup and ARIA roles
- Tailwind CSS (CDN — no build step)
- Vanilla JavaScript — no frameworks
- Lucide Icons (CDN)
- Google Fonts: Lexend Deca + JetBrains Mono
- FormSubmit for contact form handling
- JSON-LD structured data (LocalBusiness, WebSite, FAQPage, Service schemas)

---

## Site Structure

```
digitalallies.net/
├── index.html              # Main site — hero, services, pricing, FAQ, contact
├── brand.html              # Brand guide — colors, typography, grid system, asset portal
├── favicon.svg
├── suspension bridge.png   # Hero section illustration
├── assets/
│   ├── Brand System/       # Logos, icons, document templates, ads, media
│   ├── design-icon.png
│   ├── integrations-icon.png
│   ├── automation-icon.png
│   └── support-icon.png
├── diagrams/               # AEO/SEO, process, language/accessibility diagrams
└── learn/
    ├── index.html          # Learning Hub — guides and video training index
    ├── seo-aeo.html        # Interactive guide: SEO vs AEO, schema generator, checklists
    ├── alttext.html        # Interactive guide: alt text best practices and live checker
    └── video-training.html # 100+ Vimeo platform tutorials with category filter
```

---

## Key Features

**Bilingual (EN/ES)**
Full content toggle via a `LanguageController` class. Language preference persists in `localStorage`. Screen reader announcements fire on toggle. No page reload.

**Accessibility**
WCAG 2.1 Level AA compliant. Full keyboard navigation. ARIA roles, labels, and landmark regions throughout. `prefers-reduced-motion` respected. Screen reader-friendly language toggle.

**AEO & Structured Data**
Every page has JSON-LD schema. `index.html` uses a combined array block covering `LocalBusiness`, `WebSite`, and `FAQPage`. Learn pages each carry `Article`, `FAQPage`, and `Service` schemas relevant to their content. The `knowsAbout` field on the `LocalBusiness` schema covers AI consulting, SEO/AEO, web design, and accessibility — targeting both traditional and AI-driven search.

**No-Framework JavaScript**
Language switching, symmetry demos, interactive checklists, schema generators, and video filtering all run on vanilla JS class instances. No React, no Vue, no build pipeline.

---

## Services Covered

| Service | Price |
|---|---|
| AI Consulting | Free |
| Tech Consulting | Free |
| Brand Discovery | Free |
| AEO & SEO Audit | Free |
| Website Design | From $800 |
| Graphic Design | From $100 |
| Full Project Build | From $800 |
| Monthly Maintenance | From $60 |
| Automation Setup | Quoted |

---

## Local SEO Signals

- **Address:** Kingman, Arizona (Mojave County)
- **Phone:** (928) 228-5769
- **Email:** contact@digitalallies.net
- **`areaServed`:** GeoCircle — 100km radius from Kingman coordinates (35.1894, -114.0530)
- **`knowsLanguage`:** en, es
- **`priceRange`:** Free–$$$

---

## Schema Coverage

| Page | Schema Types |
|---|---|
| `index.html` | LocalBusiness, WebSite, FAQPage (AI consulting, AEO, ghosting guarantee) |
| `learn/seo-aeo.html` | Article, FAQPage, Service (SEO/AEO) |
| `learn/alttext.html` | Article, FAQPage, Service (ADA/Accessibility) |
| `learn/index.html` | CollectionPage |

---

## Running Locally

No build step. Open any `.html` file directly in a browser, or serve the root with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Tailwind and Lucide load from CDN. No `npm install` required.

---

## Deployment

Push to GitHub. Deploy via GitHub Pages, Netlify, or any static host. After each deploy, submit updated pages for reindexing via [Google Search Console](https://search.google.com/search-console).

Priority reindex targets after a schema or meta update:
- `https://digitalallies.net/`
- `https://digitalallies.net/learn/seo-aeo`
- `https://digitalallies.net/learn/alttext`

---

## Brand Tokens

| Name | Hex |
|---|---|
| Bone White | `#F9F6F0` |
| Charcoal Grey | `#2D2D2D` |
| Pulse Blue | `#3A7BD5` |
| Light Pink | `#FADEEB` |
| Signal Red | `#C5301A` |

Typography: `Lexend Deca` (headers), `JetBrains Mono` (body/details)

Grid: 20px Technical Lace canvas with 0.5px structural borders at `#2D2D2D`

---

## Contact

- **(928) 228-5769** — call or text
- **contact@digitalallies.net**
- Kingman, Arizona

---

*Technological solutions for people with better things to do.*
