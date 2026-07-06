# Digital Allies — GitHub Repository Structure & Consolidation Plan

## Ideal Directory Structure for GitHub

```
digital-allies/
├── README.md                          # Main project overview
├── CONTRIBUTING.md                    # Contribution guidelines
├── LICENSE                            # License file
├── CHANGELOG.md                       # Version history
│
├── .github/
│   └── workflows/                     # CI/CD (if needed)
│
├── design-system/                     # 🎨 CORE DESIGN SYSTEM
│   ├── README.md                      # Design system guide
│   ├── SKILL.md                       # Claude skill definition
│   ├── GLOBAL_CONTEXT_FOR_CLAUDE.md   # Brand context for AI
│   ├── index.html                     # DS landing page
│   │
│   ├── styles/
│   │   ├── colors_and_type.css        # Core tokens
│   │   ├── styles.css                 # Global styles
│   │   └── _slide.css                 # Slide template styles
│   │
│   ├── fonts/
│   │   ├── LexendDeca/                # All weights
│   │   └── JetBrainsMono/             # All weights + variants
│   │
│   ├── assets/
│   │   ├── logos/
│   │   │   ├── logo-banner-blue.png
│   │   │   ├── logo-banner-vermilion.png
│   │   │   ├── logo-wordmark.png
│   │   │   ├── logo-DA-mark.png
│   │   │   └── logo-pulse-*.png
│   │   ├── icons/
│   │   │   ├── icon-compass.png
│   │   │   ├── icon-engine.png
│   │   │   ├── icon-metronome.png
│   │   │   ├── icon-phone.png
│   │   │   ├── icon-route66.png
│   │   │   ├── icon-topo.png
│   │   │   ├── design-icon.png
│   │   │   ├── automation-icon.png
│   │   │   ├── support-icon.png
│   │   │   ├── integrations-icon.png
│   │   │   └── Integrations.svg
│   │   ├── brand-art/
│   │   │   ├── brand-art-banner-lines.png
│   │   │   ├── brand-art-dot-glow.png
│   │   │   ├── brand-art-dot-square.png
│   │   │   └── suspension-bridge.svg
│   │   ├── photography/
│   │   │   ├── photo-kingman-highway.png
│   │   │   ├── aeo-seo-overview.png
│   │   │   ├── language-overview.png
│   │   │   └── process.png
│   │   └── favicon/
│   │       ├── favicon.png
│   │       └── favicon.svg
│   │
│   ├── preview/                       # Interactive preview cards
│   │   ├── brand-colors/
│   │   │   ├── colors-95-5-rule.html
│   │   │   ├── colors-core.html
│   │   │   └── colors-semantic.html
│   │   ├── brand-typography/
│   │   │   ├── type-headings.html
│   │   │   ├── type-body-mono.html
│   │   │   └── type-eyebrow-cta.html
│   │   ├── brand-voice/
│   │   │   ├── voice-tone-spectrum.html
│   │   │   ├── voice-jargon-translation.html
│   │   │   └── brand-voice-marketing.html
│   │   ├── brand-imagery/
│   │   │   ├── brand-abstract-art.html
│   │   │   ├── brand-bridge-motif.html
│   │   │   ├── brand-logo-system.html
│   │   │   ├── brand-icon-system.html
│   │   │   └── brand-photography.html
│   │   ├── components/
│   │   │   ├── components-buttons.html
│   │   │   ├── components-inputs.html
│   │   │   ├── components-accordion.html
│   │   │   ├── components-nav.html
│   │   │   ├── components-pulse-dot.html
│   │   │   ├── components-pinned-note.html
│   │   │   ├── components-jargon-card.html
│   │   │   ├── components-dept-card.html
│   │   │   └── components-transparency-table.html
│   │   ├── spacing/
│   │   │   ├── spacing-scale.html
│   │   │   └── spacing-technical-lace.html
│   │   └── brand-system.html          # Master preview index
│   │
│   ├── components/                    # Reusable components (JSX/HTML)
│   │   ├── Button.jsx
│   │   ├── Nav.jsx
│   │   ├── Footer.jsx
│   │   ├── JargonJar.jsx
│   │   ├── Departments.jsx
│   │   ├── Pricing.jsx
│   │   ├── FieldNotes.jsx
│   │   ├── Diagrams.jsx
│   │   ├── Hero.jsx
│   │   └── ContentCalendar.jsx
│   │
│   ├── slides/                        # Slide templates (16:9)
│   │   ├── 01-title.html
│   │   ├── 02-section-header.html
│   │   ├── 03-content-light.html
│   │   ├── 04-comparison.html
│   │   ├── 05-big-quote.html
│   │   ├── 06-stat.html
│   │   ├── 07-end-card.html
│   │   └── index.html
│   │
│   ├── templates/                     # Page templates (CMS-ready)
│   │   ├── README.md
│   │   ├── BRAND_VOICE_CMS_INTEGRATION.md
│   │   ├── services-index/
│   │   │   ├── ServicesIndex.dc.html
│   │   │   ├── ds-base.js
│   │   │   ├── assets/
│   │   │   │   ├── icon-audit.png
│   │   │   │   ├── wavy-mountain.png
│   │   │   │   └── frame-divider.png
│   │   │   └── .thumbnail
│   │   └── tool-detail/
│   │       ├── ToolDetail.dc.html
│   │       ├── ds-base.js
│   │       ├── assets/
│   │       │   ├── wavy-pattern-blue.png
│   │       │   ├── wavy-pattern-dark.png
│   │       │   ├── icon-manuscript.png
│   │       │   ├── icon-design.png
│   │       │   └── icon-stack.png
│   │       └── .thumbnail
│   │
│   ├── demos/                         # Reference exports & bundles
│   │   ├── brand-system-bundled.html  # Bundled design system
│   │   └── social-carousels.html      # Social media templates
│   │
│   ├── downloads/                     # Asset packages for distribution
│   │   ├── da-logos.zip
│   │   ├── da-icons.zip
│   │   ├── da-fonts.zip
│   │   ├── da-photos.zip
│   │   ├── da-components.zip
│   │   └── da-preview-specimens.zip
│   │
│   ├── data/
│   │   ├── da-master-social-copy.csv  # 30-day content calendar
│   │   └── pamali-asset-prompts.csv   # Visual asset briefs
│   │
│   └── _ds_manifest.json              # Design system metadata (auto-generated)
│
├── cms-demo/                          # 🎯 CONNECTED CMS DEMO (Visual/Design Only)
│   ├── README.md                      # CMS demo overview & disclaimer
│   ├── index.html                     # CMS demo landing/showcase
│   ├── assets/
│   │   ├── screenshots/               # CMS UI mockups
│   │   ├── diagrams/                  # Architecture diagrams
│   │   └── demo-data/                 # Sample JSON for demo
│   ├── components/                    # CMS component mockups
│   │   ├── ContentCalendar.demo.html
│   │   ├── ToolManager.demo.html
│   │   ├── ContentEditor.demo.html
│   │   └── Dashboard.demo.html
│   └── docs/
│       ├── SETUP.md                   # How to set up real CMS
│       ├── API_REFERENCE.md           # API endpoints
│       └── INTEGRATION_GUIDE.md       # How to integrate with DS
│
├── docs/                              # Documentation
│   ├── INSTALLATION.md                # How to use the design system
│   ├── VOICE_GUIDE.md                 # Extended voice & tone rules
│   ├── COMPONENTS.md                  # Component documentation
│   ├── TEMPLATES.md                   # Template usage
│   ├── CMS_INTEGRATION.md             # CMS setup guide (symlink to design-system/)
│   └── FAQ.md                         # Frequently asked questions
│
└── examples/                          # Working examples
    ├── landing-page.html
    ├── blog-post.html
    ├── product-page.html
    └── social-carousel.html
```

---

## Consolidation Workflow

### Phase 1: Audit & Identify Redundancies

**Files to KEEP (Core Assets):**
- ✅ `fonts/` — Keep all (LexendDeca + JetBrainsMono in all weights)
- ✅ `assets/` — All logos, icons, photography, brand art
- ✅ `styles.css` + `colors_and_type.css` — Core tokens
- ✅ `preview/` — All design system cards (keep organized in subfolders)
- ✅ `slides/` — All 7 slide templates + index
- ✅ `templates/` — Both services-index and tool-detail DCs
- ✅ `ui_kits/website/` — All JSX components
- ✅ `social/` — Social media highlight components
- ✅ `README.md`, `SKILL.md`, `GLOBAL_CONTEXT_FOR_CLAUDE.md`

**Files to DELETE (Duplicates/Legacy):**
- ❌ `downloads/` — Keep only in new structure as distribution zips
- ❌ `.design-canvas.state.json` — Local editor state, not needed for repo
- ❌ `uploads/` — Temporary upload folder, consolidate into assets/
- ❌ `screenshots/` — Keep only final reference screenshots in docs/
- ❌ `export/` — Keep only final bundled versions in demos/
- ❌ `PUBLISHING.md` — Merge into main README or docs/

**Uploads to Audit & Consolidate:**
- Brand-specific uploads → Move to `design-system/assets/`
- Duplicate images (with version hashes) → Keep one, delete duplicates
- PDFs (analytics, reports) → Keep only if relevant, move to `docs/`
- Duplicate fonts → Delete from uploads (already in `fonts/`)
- Temp files (numbered PNGs like `1.png`, `2.png`) → Delete

---

### Phase 2: Organize Into New Structure

1. **Create folder structure** at project root
2. **Move design system assets** into `design-system/` with proper subfolders
3. **Create CMS demo folder** with visual mockups + integration docs
4. **Create docs folder** with extended documentation
5. **Clean up root level** — only essential files remain

---

### Phase 3: Create CMS Demo Layer

Since your Connected CMS is a separate, real project, create a **visual/design demo** that shows:
- CMS dashboard mockups (HTML preview)
- Sample data structures (JSON)
- Integration architecture (diagrams)
- Setup instructions (pointing to real CMS repo)
- **Disclaimer**: "This is a design demo. For the working CMS, see [link to Barcelona repo]"

---

## Cleanup Checklist

- [ ] **Identify & delete duplicates in `uploads/`**
  - Remove image files with version hashes (e.g., `filename-hash.png`)
  - Keep only one copy of each asset
  - Delete duplicate font files (already in `fonts/`)

- [ ] **Consolidate brand imagery**
  - Move relevant uploads to `design-system/assets/`
  - Delete temp/reference-only images

- [ ] **Archive or delete legacy files**
  - `PUBLISHING.md` → Merge into README or delete
  - `.design-canvas.state.json` → Delete (local editor state)
  - `screenshots/` → Keep only 2–3 reference screenshots in `docs/`

- [ ] **Organize preview cards into subfolders**
  - Create `preview/brand-colors/`, `preview/brand-typography/`, etc.
  - Group by category (voice, colors, components, imagery, spacing)

- [ ] **Update root files**
  - Add main `README.md` (overview + quick start)
  - Add `CONTRIBUTING.md` (how to contribute)
  - Add `LICENSE` file
  - Add `CHANGELOG.md` (version history)

- [ ] **Create CMS demo folder** with:
  - `cms-demo/README.md` (disclaimer + overview)
  - `cms-demo/index.html` (visual showcase)
  - `cms-demo/docs/SETUP.md` (real setup instructions)
  - Sample JSON in `cms-demo/demo-data/`

- [ ] **Test GitHub structure**
  - Push to GitHub
  - Verify all links work in GitHub web UI
  - Check that folder structure is clean & logical

---

## Files to Delete (Specific List)

**From root:**
```
.design-canvas.state.json      # Local editor state
.thumbnail                       # Design system auto-generated
PUBLISHING.md                   # Merge or delete
```

**From uploads/ (Keep CSV + PDF only):**
```
❌ Delete all numbered files (1.png, 2.png, etc.)
❌ Delete all with version hashes (-hash.ttf, -hash.png, etc.)
❌ Delete duplicate PDFs (keep only latest versions)
❌ Delete all font files (already in fonts/)
✅ KEEP: da-master-social-copy.csv
✅ KEEP: pamali-asset-prompts.csv
✅ KEEP: 30-day-content-calendar.pdf
✅ KEEP: Latest acquisition/analytics reports (if relevant)
```

**From export/ (Keep demos):**
```
✅ KEEP: brand-system-bundled.html → Move to demos/
✅ KEEP: digital-allies-social-carousels.html → Move to demos/
```

**From downloads/ (Keep as reference):**
```
All .zip files are distribution packages
Keep them for now, but note they're generated from assets/
Consider if they're needed in GitHub or if they should be auto-generated
```

**From screenshots/:**
```
❌ Delete all except 2–3 reference shots
✅ KEEP: social-check.png → Move to docs/
```

---

## GitHub-Ready Checklist

Before pushing:

- [ ] **No `/uploads` folder** (or empty it to `design-system/assets/`)
- [ ] **No `/downloads` folder** (or document as pre-built zips)
- [ ] **No local editor state files** (`.design-canvas.state.json`)
- [ ] **No duplicate images** (clean up hash versions)
- [ ] **Root README.md** → Main entry point
- [ ] **`design-system/` is self-contained** → All assets referenced correctly
- [ ] **`cms-demo/` has disclaimer** → Clear it's a demo, not the real CMS
- [ ] **All links are relative** (no absolute paths)
- [ ] **`.gitignore` excludes temp files** (node_modules, .DS_Store, etc.)
- [ ] **All folders have `README.md` or index file**

---

## Next Steps (In Order)

1. **Backup current project** (in case you need to reference anything)
2. **Create new folder structure** at project root (don't delete old files yet)
3. **Move files** into new structure (use copy, then delete old)
4. **Test all links** (relative paths, image references, component imports)
5. **Update `index.html`** to link to new locations
6. **Create CMS demo folder** with mockups + docs
7. **Run final audit** (delete empty folders, unused files)
8. **Push to GitHub** and verify structure in web UI
9. **Update repo README** with overview + how to use

---

**Questions about specific files or what to keep?** List them and I'll advise on each one.
