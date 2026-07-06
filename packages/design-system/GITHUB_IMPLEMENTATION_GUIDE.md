# Digital Allies — GitHub Consolidation Implementation Guide

## Quick Start (TL;DR)

1. **Read** `GITHUB_CONSOLIDATION_PLAN.md` for the full structure
2. **Run cleanup** using the checklist below
3. **Reorganize** into new folder structure
4. **Test** links & push to GitHub

---

## Step-by-Step Implementation

### STEP 1: Backup & Create New Structure

```bash
# Create the new folder structure
mkdir -p design-system/{styles,fonts,assets/{logos,icons,brand-art,photography,favicon},preview/{brand-colors,brand-typography,brand-voice,brand-imagery,components,spacing},components,slides,templates,demos,data,downloads}

mkdir -p cms-demo/{assets/{screenshots,diagrams,demo-data},components,docs}

mkdir -p docs examples
```

### STEP 2: Move Design System Core Files

**Move to `design-system/` root:**
```
colors_and_type.css → design-system/styles/colors_and_type.css
styles.css → design-system/styles/styles.css
README.md → design-system/README.md
SKILL.md → design-system/SKILL.md
GLOBAL_CONTEXT_FOR_CLAUDE.md → design-system/GLOBAL_CONTEXT_FOR_CLAUDE.md
index.html → design-system/index.html
```

**Move to `design-system/styles/`:**
```
slides/_slide.css → design-system/styles/_slide.css
```

**Move to `design-system/fonts/`:**
```
fonts/* → design-system/fonts/
```

**Move to `design-system/assets/`:**
```
All .png, .svg files from assets/ → design-system/assets/
Organize by type: logos/, icons/, brand-art/, photography/, favicon/
```

**Move to `design-system/preview/`:**
```
preview/colors-*.html → design-system/preview/brand-colors/
preview/type-*.html → design-system/preview/brand-typography/
preview/voice-*.html → design-system/preview/brand-voice/
preview/brand-*.html → design-system/preview/brand-imagery/
preview/components-*.html → design-system/preview/components/
preview/spacing-*.html → design-system/preview/spacing/
preview/brand-system.html → design-system/preview/index.html
```

**Move to `design-system/components/`:**
```
ui_kits/website/* → design-system/components/
```

**Move to `design-system/slides/`:**
```
slides/* → design-system/slides/
```

**Move to `design-system/templates/`:**
```
templates/* → design-system/templates/
```

**Move to `design-system/data/`:**
```
uploads/da-master-social-copy.csv → design-system/data/
uploads/pamali-asset-prompts.csv → design-system/data/
```

**Move to `design-system/demos/`:**
```
export/brand-system-bundled.html → design-system/demos/
export/digital-allies-social-carousels.html → design-system/demos/
```

**Move to `design-system/downloads/`:**
```
downloads/* → design-system/downloads/
```

### STEP 3: Create CMS Demo Folder

**Create `cms-demo/README.md`:**
```markdown
# Digital Allies — Connected CMS (Design Demo)

⚠️ **DISCLAIMER**: This is a visual design demo and documentation layer only.

For the **working, functional Connected CMS**, see the separate Barcelona repository: [link to real CMS repo]

## What's Here

- **Visual mockups** of the CMS dashboard interface
- **Sample JSON** for content calendar, tools, services
- **Integration guides** (how to wire the real CMS to the design system)
- **Architecture diagrams** (how components talk to each other)

## Real CMS Setup

If you want to build the actual CMS:
1. See `docs/SETUP.md` for requirements
2. See `docs/INTEGRATION_GUIDE.md` for how to connect to the design system
3. See `docs/API_REFERENCE.md` for API endpoints

## Using These Mockups

- Dashboard mockup → `components/Dashboard.demo.html`
- Content calendar UI → `components/ContentCalendar.demo.html`
- Tool editor → `components/ToolManager.demo.html`
- Sample data → `demo-data/`

Everything here is HTML/CSS mockups. No actual backend functionality.
```

**Create sample JSON in `cms-demo/demo-data/`:**
```json
// sample-content-calendar.json
{
  "calendar": [
    {
      "day": 1,
      "week": 1,
      "category": "Local data",
      "topic": "Mohave County market",
      "hook": "Mohave County has a real bilingual market.",
      "caption": "...",
      "cta": "Ask for a bilingual audit.",
      "promptRef": "Day 1 · Bilingual storefront",
      "status": "scheduled",
      "scheduledDate": "2026-06-18"
    }
  ]
}
```

### STEP 4: Update Root Level

**Keep only these files at project root:**
```
README.md (main overview)
LICENSE
CHANGELOG.md
CONTRIBUTING.md
.gitignore
GITHUB_CONSOLIDATION_PLAN.md (can move to docs/ later)
GLOBAL_CONTEXT_FOR_CLAUDE.md (symlink to design-system/, or keep copy)
```

**Delete from root:**
```
.design-canvas.state.json
.thumbnail
PUBLISHING.md
```

### STEP 5: Create Root README.md

```markdown
# Digital Allies

Sharp, straight-talking tech solutions from Kingman, Arizona.

"Technological Solutions for People with Better Things to Do."

---

## 📦 What's Here

### **Design System** (`design-system/`)
The complete, production-ready design system for Digital Allies. All brand rules, components, templates, typography, colors, and voice guidelines.

**Quick start:** See `design-system/README.md`

### **CMS Demo** (`cms-demo/`)
Visual mockups and documentation for the Connected CMS. This is a design demo only — the actual CMS lives in a separate repository.

**Quick start:** See `cms-demo/README.md`

### **Documentation** (`docs/`)
Extended guides, FAQs, and integration instructions.

### **Examples** (`examples/`)
Working examples using the design system.

---

## 🚀 Getting Started

1. **For design system work:** Go to `design-system/README.md`
2. **For CMS integration:** Go to `design-system/templates/BRAND_VOICE_CMS_INTEGRATION.md`
3. **For voice/tone:** Go to `design-system/GLOBAL_CONTEXT_FOR_CLAUDE.md`
4. **For the real CMS:** See `cms-demo/README.md` for instructions

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `design-system/index.html` | Design system preview |
| `design-system/README.md` | Full brand book |
| `design-system/SKILL.md` | Claude skill definition |
| `design-system/GLOBAL_CONTEXT_FOR_CLAUDE.md` | Brand context for AI |
| `design-system/templates/` | CMS-ready page templates |
| `design-system/components/` | Reusable UI components |
| `design-system/slides/` | Slide presentation templates |
| `cms-demo/README.md` | CMS demo overview |
| `docs/` | Extended documentation |

---

## 🎯 Brand Essentials

**Voice:** Sharp, straight-talking, plainly spoken. No corporate jargon.

**Colors:** Bone White (#F9F6F0) + Charcoal (#2D2D2D) + Pulse Blue (#3A7BD5) + Signal Red (#C5301A). 95% neutral, 5% accent.

**Type:** Lexend Deca (headers) + JetBrains Mono (body).

**Owner:** Anthony · **Location:** Kingman, Arizona

---

## 📖 License

[Your license here]

---

**Last updated:** June 18, 2026
```

### STEP 6: Update Links Everywhere

**In `design-system/index.html`:** Update all relative paths
```html
<!-- Before -->
<link rel="stylesheet" href="colors_and_type.css">

<!-- After -->
<link rel="stylesheet" href="styles/colors_and_type.css">
```

**In `design-system/preview/*.html`:** Update asset paths
```html
<!-- Before -->
<img src="../assets/logo-banner-blue.png">

<!-- After -->
<img src="../../assets/logos/logo-banner-blue.png">
```

**In `design-system/components/*.jsx`:** Update component imports
```jsx
// Before
import colors from '../colors_and_type.css'

// After
import colors from '../styles/colors_and_type.css'
```

### STEP 7: Delete Legacy/Duplicate Files

**From `uploads/` — Delete these patterns:**
```
1.png, 2.png, 3.png, ... (numbered temp files)
*-hash.ttf (font duplicates with version hashes)
*-hash.png (image duplicates with version hashes)
Acquisition_overview (1-4).pdf (keep only latest)
BST Analytics Report.pdf (keep if relevant)
```

**Keep in `uploads/` (or move to `design-system/data/`):**
```
da-master-social-copy.csv
pamali-asset-prompts.csv
30-day-content-calendar.pdf
```

**Delete from root:**
```
.design-canvas.state.json
.thumbnail
PUBLISHING.md
```

**Delete folders (if empty after moving files):**
```
old /export
old /screenshots (keep only 1–2 in /docs)
old /preview (moved to design-system/preview)
old /assets (moved to design-system/assets)
```

### STEP 8: Create `.gitignore`

```gitignore
# Local editor state
.design-canvas.state.json
.DS_Store
.env
.vscode/

# Build artifacts
node_modules/
dist/
build/

# Temp files
*.tmp
*.log
uploads/
```

### STEP 9: Test & Verify

- [ ] All image paths work (check browser console)
- [ ] All component imports resolve
- [ ] All CSS links load correctly
- [ ] Relative paths work in subfolders
- [ ] GitHub folder structure is clean & logical
- [ ] No broken links when viewed in GitHub web UI

### STEP 10: Commit & Push to GitHub

```bash
git add .
git commit -m "refactor: consolidate design system and CMS demo into GitHub-ready structure"
git push origin main
```

---

## Common Pitfalls to Avoid

❌ **Don't:** Keep `/uploads` folder in repo (it's for temp files)
✅ **Do:** Move all permanent assets into `design-system/assets/`

❌ **Don't:** Use absolute paths (e.g., `/assets/logo.png`)
✅ **Do:** Use relative paths (e.g., `../assets/logos/logo-banner-blue.png`)

❌ **Don't:** Leave `.design-canvas.state.json` in repo
✅ **Do:** Delete it (it's local editor state)

❌ **Don't:** Mix design system and CMS in root level
✅ **Do:** Keep them in separate `design-system/` and `cms-demo/` folders

❌ **Don't:** Forget to update image/asset paths after moving
✅ **Do:** Test all links before pushing

---

## Need Help?

If you get stuck on any step:
1. Check the folder structure in `GITHUB_CONSOLIDATION_PLAN.md`
2. Verify all relative paths match the new structure
3. Test one preview file locally to confirm links work
4. Then batch-apply the same fixes to similar files

---

**Ready to start?** Begin with STEP 1 and work through in order.
