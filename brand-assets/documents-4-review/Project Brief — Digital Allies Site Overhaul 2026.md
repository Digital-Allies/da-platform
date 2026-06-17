---

## **Project Brief — Digital Allies Site Overhaul 2026**

**Repo:** `Digital-Allies/DigitalAllies` **Working branch:** `site-overhaul-2026` **Brand skill to load first:** `/mnt/skills/user/digital-allies-brand/SKILL.md`

---

### **What's been done already (do not redo)**

* All oversized PNGs converted to WebP  
* Files reorganized into new subfolders  
* Repo cloned and pushed to `site-overhaul-2026` branch

---

### **Project 1 — Site Overhaul (27 issues, 7 milestones)**

**Start here. Complete in milestone order.**

**v1.0 — Asset Migration (do this first, everything else depends on it)** Update every HTML path reference across all pages to match the new file locations:

* Diagrams: `/diagrams/*.png` → `/assets/diagrams/*.webp`  
* Department icons: `/assets/*-icon.png` → `/assets/the-departments/*-icon.webp`  
* Suspension bridge desktop: `/suspension-bridge.png` → `/assets/suspension-bridge/suspension-bridge.webp`  
* Suspension bridge mobile: `/suspension bridge-mobile.webp` → `/assets/suspension-bridge/suspension-bridge-mobile.webp`

Also: remove brand files from `/assets/` root, delete `/projects/` folder, move all `.py` scripts to `/scripts/` with a README.

**v1.1 — Performance**

* Replace `cdn.tailwindcss.com` with a production Tailwind CLI build  
* Self-host and defer Lucide (`@1.17.0` and `@latest` are both loading — pick one, self-host it, add `defer`)  
* Self-host Google Fonts (JetBrains Mono \+ Lexend Deca) in `/assets/fonts/`  
* Add `_headers` file for Cloudflare 1-year cache on `/assets/*`

**v1.2 — Accessibility** All of these are WCAG 2.1 AA failures. DA sells accessibility services — these must be fixed.

* Add `<main>` to 8 pages missing it  
* Fix `#3a7bd5` color contrast to 4.5:1 minimum on bone-white backgrounds  
* Add labels to unlabeled form inputs (12 pages)  
* Fix heading order — flip cards jump to `<h4>` with no `<h3>`  
* Fix accessible name mismatch on floating contact button  
* Fix link contrast on `/learn/seo-aeo`  
* Add labels to two `<select>` elements in schema generator

**v1.3 — Best Practices**

* Replace 3 Vimeo embeds on `/learn/` with a video facade (thumbnail \+ click to load). Use `?dnt=1` on the player URL. This gets `/learn/` Best Practices from 58 → 90+.

**v1.4 — Content**

* Fix bilingual-web copy — remove "Anthony reviews every Spanish translation" — replace with "A dedicated human team translates every word"  
* Delete `/learn/video` page, add redirect to `/learn/`  
* Remove video section from bottom of `/learn/index.html`  
* Create `robots.txt` at repo root

**v1.5 — Schema**

* Audit all JSON-LD blocks on all pages, fix any malformed JSON  
* Add `Article` schema to all 7 `/learn/` pages  
* Add `FAQPage` schema to `/learn/seo-aeo` and `index.html`

**v1.6 — Standards**

* Create `/docs/CODE-STANDARDS.md` — the rules that prevent recurring AI-update issues  
* Create `README.md` with full folder structure map  
* Both documents must reference `digital-allies-brand` skill

---

### **Project 2 — SEO & Search Visibility (6 issues, 1 milestone)**

**Can run in parallel with v1.4 and v1.5 above.**

All tasks come from `da-seo-implementation.html` (attached to this conversation).

* Update `index.html` title, meta description, keywords, og/twitter tags  
* Replace full JSON-LD block on `index.html` — new `LocalBusiness` \+ `WebSite` \+ `FAQPage` with 5 FAQ entries. **Note:** update logo path from `/assets/img/da-logo.png` to actual logo location before committing. Add phone `+19282285769` if you want it indexed.  
* Add 3 new bilingual `<details>` FAQ blocks to `index.html` — EN/ES `data-` attributes already written  
* Update `learn/seo-aeo.html` — new title/meta \+ service callout section \+ `Service` schema  
* Update `learn/alttext.html` — new title/meta \+ service callout section \+ `Service` schema  
* After deploying: submit all 3 pages for reindexing in Google Search Console

---

### **Ground rules for every session**

1. Load `digital-allies-brand` skill before touching any HTML  
2. No `cdn.tailwindcss.com`, no `unpkg.com`, no unversioned CDN scripts  
3. Every `<script>` tag gets `defer` unless it's critical render-blocking CSS  
4. All images: WebP, lowercase-hyphenated, in correct subfolder  
5. Validate JSON-LD at `validator.schema.org` before committing  
6. Run Lighthouse after each milestone and note the score change

