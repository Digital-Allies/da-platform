---
name: client-onboarding
description: >
  DA Platform comprehensive client onboarding & training skill. Use this skill whenever Anthony wants to: track a client site build, check what's missing before handoff, generate an onboarding binder (printable/digital handoff doc with interactive tutorials), prep the first-login welcome tour, teach a client how to use CMS features (especially CSV uploader, collections, connected data, design tokens), create feature-specific tutorials, or evaluate if a specific client can be handed off yet. Triggers on: "onboarding binder", "is [client] ready to launch", "handoff [client]", "send onboarding to [client]", "track build progress for [client]", "what's missing for [client]", "client user guide", "prepare client handoff", "generate binder", "onboard [client name]", "create training for [client]", "teach [client] how to use", "csv importer tutorial", "collections guide", "connected data", "platform architecture", or any request to prepare documentation or training for a client. Use it even when the ask is vague like "what do I still need to do for Atomic Finds" — that's a build-gap check. Also use it proactively: whenever a new client build is ready, generate full training materials covering all platform features, not just the basics.
---

# Client Onboarding Skill — Comprehensive Training & Handoff

Three modes, each targeting a different handoff phase.

**MODE A — Build Gap Report:** Check what's still missing before a client can be handed off. Read their project files and produce a prioritized gap list.

**MODE B — Onboarding Binder:** Generate the full client handoff document. An HTML file formatted for both digital viewing and print, covering the CMS, brand, URLs, contacts, and complete how-to guides with interactive tutorials on all platform features.

**MODE C — Feature-Specific Training:** Create deep-dive training modules for specific CMS features (CSV uploader, collections & connected data, products/showroom, pages, design system integration, SEO/AEO, etc.). Standalone tutorials with interactive walkthroughs, video transcripts, troubleshooting, and copy-paste templates.

All three modes start by reading the project context. The binder is the end product of a completed build — but you can generate a partial draft at any point to see what it will look like and what's still missing.

---

## Step 1 — Read the client's project context (All Modes)

Always start here regardless of mode.

Read these files in order:

1. `/Users/cuus/Claude/projects/da-platform/STATUS.md` — last session state, open bugs
2. `/Users/cuus/Claude/projects/da-platform/DA-PLATFORM-MASTER-CONTEXT.md` — tenant table, bug priorities, URLs, platform architecture
3. `/Users/cuus/Claude/projects/da-platform/AGENTS.md` — monorepo structure, naming conventions
4. `/Users/cuus/Claude/projects/da-platform/NEW-SITE-SETUP-PROCESS.md` — the setup checklist phases
5. Client-specific files:
   - `tools/build-workflows/sites/<client-slug>/CLAUDE.md` — brand tokens, type, voice
   - `tools/build-workflows/supabase/seed-<client-slug>-settings.sql` — site settings
   - `tools/build-workflows/supabase/seed-<client-slug>-design-tokens.sql` — brand colors + fonts
   - `tools/build-workflows/public/<client-slug>/` — static assets structure

Extract these client facts:
- `client_name` — display name (e.g. "Atomic Finds ATX")
- `client_slug` — slug used in filenames (e.g. "atomic-finds")
- `client_id` — UUID from MASTER-CONTEXT tenant table
- `client_email` — admin email from the settings seed or context
- `live_url` — their public website
- `admin_url` — CMS login URL (always `https://cms.digitalallies.net/admin`)
- `contact_name` — primary contact (owner name)
- `brand_colors` — primary, secondary, background, text from CLAUDE.md
- `brand_fonts` — heading + body fonts, where used
- `brand_voice` — 3-5 sentence summary of their voice, tone, vocabulary
- `business_description` — what they sell / offer (1–2 sentences)
- `platform_features_enabled` — which CMS tabs this client has access to

---

## Step 2 (Mode A) — Generate the Build Gap Report

Run the build checklist from `references/build-checklist.md`. For each item, mark it as:
- ✅ Done — verified in STATUS.md or live
- ⚠️ Partial — exists but has a known issue
- ❌ Missing — not done

Group findings into three buckets:

**Must-fix before handoff** — client cannot use the platform without these.
**Nice-to-fix** — affects experience but not blocking.
**Future/Phase 2** — deliberate deferred items, not urgent.

Output a clean Markdown report. End with a verdict: "Ready to hand off" or "Not yet — fix [X] first."

---

## Step 3 (Mode B) — Generate the Comprehensive Onboarding Binder

The binder is a self-contained HTML file with interactive elements, CSS-drawn UI walkthroughs, and copy-paste templates. Save it to:
`/Users/cuus/Claude/projects/da-platform/tools/build-workflows/public/onboarding/binder-<client-slug>.html`

### Binder structure — comprehensive edition

Build the binder in this exact order. All content must be client-specific — no placeholder text.

**FRONT MATTER**
- Cover page (client name, date, DA credit)
- Table of contents (interactive TOC, bookmarkable anchors)
- Welcome letter

**SECTION 1 — Welcome & Quick Start**
- Warm, personal welcome addressed to the contact name
- What this document covers (5-7 bullet points covering all major features)
- How to get help: Anthony's email + phone, response time SLA
- First 30 days: checklist of key setup tasks

**SECTION 2 — Your Website At A Glance**
A quick-reference card with:
- Live website URL (clickable)
- Admin/CMS URL: https://cms.digitalallies.net/admin
- Your login email
- Support email: hello@digitalallies.net
- Link to this binder (printable PDF + online)

**SECTION 3 — Logging In & Security**
Step-by-step with CSS-drawn UI representations (no screenshots):
1. Go to cms.digitalallies.net/admin
2. Enter your email
3. Check your email for magic link
4. Click the link or enter verification code
5. Set your password
6. You arrive at the Dashboard

Include: password security best practices, password reset flow, session timeout behavior.

**SECTION 4 — Platform Architecture (Non-Technical Overview)**
Plain-language explanation of how the DA platform works:
- One central admin panel serves multiple sites (multi-tenant architecture)
- Your data is isolated from other sites using `client_id` (explain that this is a security boundary)
- Every page, product, article, and setting is linked to your specific business
- Behind the scenes: Supabase database + Next.js website engine + Vercel hosting
- Design tokens control the colors/fonts across your entire site from one place
- Why this matters: "You edit content once in the admin, and it shows up on your live website automatically"

**SECTION 5 — Your CMS Dashboard**
A CSS-drawn sidebar showing the nav items for this specific client. For each section that exists, explain in one sentence what it does. Use the descriptions from `references/cms-sections.md`, but customize for the client's actual features.

**SECTION 6 — Feature Guide: Pages**
(Only if `/admin/pages` is enabled for this client)
- What pages are and why they matter
- The difference between draft and published
- CSS-drawn UI showing page editor blocks (hero, product grid, contact form, rich text, etc.)
- Step-by-step: how to edit a page
- Step-by-step: how to publish a page
- Responsive preview on mobile
- Common mistakes to avoid

**SECTION 7 — Feature Guide: Products / Showroom**
(Only if this is a commerce client)
- What the showroom is (your product catalog)
- Key fields explained:
  - Title (product name)
  - Price
  - Category
  - Image URL
  - Description
  - Status (Draft, Published, Archived)
  - Selling method (View Listing, Show Interest, Direct purchase)
  - In Stock toggle
  - Featured toggle (appears on homepage)
- Step-by-step: add a new product
- Step-by-step: update a product price
- Step-by-step: mark something as sold (uncheck "In Stock")
- Step-by-step: upload a product image
- Best practices: photo tips, descriptions that sell, pricing strategy

**SECTION 8 — DEEP DIVE: CSV Uploader & Collections**
(Priority feature — comprehensive walkthrough)

**8.1 — Understanding Collections**
- What is a collection? (A curated group of related products)
- Examples: "Best Sellers", "Living Room Finds", "Under $200", "New Arrivals"
- Why collections matter: highlight specific groups, organize by mood/style/price
- Collections can be toggled "Featured" to appear on the homepage

**8.2 — Understanding Connected Data**
- Products and collections are linked through `item_ids` (a list of product IDs in the collection)
- When you import products via CSV, they can be automatically added to a collection
- When you delete a product, it's automatically removed from all collections that reference it
- This is why it's called "connected" — changes in one place cascade to related records

**8.3 — CSV Format & Preparation**
- Required columns: Title, Price, Category, Image URL, Description
- Optional columns: External URL (marketplace link), Selling State (inquiry / purchase)
- How to prepare your spreadsheet:
  - Use Google Sheets, Excel, or Numbers
  - Header row MUST be: `Title, Price, Category, Image URL, Description`
  - One product per row
  - Prices as numbers only (no $ symbol)
  - URLs must be complete and working
  - Description can be 1–3 sentences
- How to export as CSV:
  - Google Sheets: File → Download → CSV (.csv)
  - Excel: File → Save As → CSV UTF-8 (.csv)
  - Copy-paste template provided (see Appendix)

**8.4 — Step-by-Step CSV Import (Interactive Walkthrough)**
1. Navigate to `/admin/showroom`
2. Scroll to "Import Spreadsheet Collection (CSV)"
3. Click the upload area or drag-and-drop your file
4. Review the parsed rows in the preview (shows how many products will be created)
5. If you want these products added to an existing collection, open that collection first, then import from there
6. Click "Execute Import"
7. Wait for success message (products appear in your catalog instantly)
8. Products are now live and will appear on your storefront if marked "Published" and "In Stock"

With CSS-drawn UI showing each step.

**8.5 — Troubleshooting CSV Issues**
- "CSV file must have a header row and at least 1 data row"
  → Make sure row 1 is headers, row 2+ is data. At least 2 rows total.
- "Failed to import spreadsheet collection"
  → Check that Image URLs are complete and valid (start with https://)
  → Check that Price column has numbers only
  → Try re-exporting as UTF-8 CSV
- Products imported but not showing on site
  → Check "Published" status in the Showroom editor
  → Check "In Stock" toggle
  → Check that the category matches your site's taxonomy

**SECTION 9 — Feature Guide: Collections (Continued)**
- Step-by-step: create a new collection
- Step-by-step: add products to a collection manually (without CSV)
- Step-by-step: toggle a collection as Featured (shows on homepage)
- Step-by-step: edit collection name/order
- Best practices: naming conventions, collection strategy

**SECTION 10 — Feature Guide: Design System & Brand Controls**
(Explain at client's technical comfort level)

**10.1 — Design Tokens (What They Are)**
- Design tokens are reusable values (colors, fonts, spacing, shadows) that control how your site looks
- Tokens have names like `--tok-primary` (your main brand color)
- Every button, heading, link, and section uses these tokens
- Update ONE token, and it changes everywhere

**10.2 — Brand Theme Editor**
- Location: `/admin/brand-theme` (if enabled for this client)
- What you can edit:
  - Primary color (main brand color — buttons, headings, accents)
  - Secondary color (supporting accent)
  - Background color
  - Text color
  - Font family for headings
  - Font family for body text
- How to edit:
  1. Click a color swatch
  2. Pick a new color (or paste hex code like #F5C842)
  3. Click Save
  4. Changes appear on your live site within seconds
- CSS-drawn UI showing the color swatches and live preview

**10.3 — Advanced: Design Tokens and Code**
- For clients with technical interest: explanation of CSS variables, how tokens work under the hood
- Where tokens live in the codebase
- How to ensure a new component uses tokens (never hardcoded colors)

**SECTION 11 — Feature Guide: SEO & Getting Found Online**
Plain-language explanation of search optimization, customized for the client:

**11.1 — What is SEO? Why it matters.**
- SEO = making sure people can find you on Google (and other search engines)
- The platform does most of this automatically: sitemaps, robots.txt, meta tags, structured data
- You control: page titles, descriptions, image alt text, keywords in your copy

**11.2 — Platform-Provided SEO (What's Automatic)**
- The platform generates `sitemap.xml` (tells Google every page you have)
- The platform generates `robots.txt` (tells Google how to crawl)
- Every page has Open Graph tags for social sharing previews
- JSON-LD structured data on your homepage (helps AI search engines understand your business)

**11.3 — Client-Controlled SEO**
- Page title (appears in browser tab and search results)
- Meta description (appears under your title in Google)
- Image alt text (describes images for accessibility + SEO)
- Keywords in your copy (use material names, local geographic references, descriptive language)
- Internal links (link to related products/pages)

**11.4 — AEO: Answer Engine Optimization**
- AEO = making sure AI search assistants (Claude, ChatGPT, Perplexity) understand your business
- These tools parse structured data (JSON-LD) and descriptions to answer user queries
- Best practices: explicit material names, geographic anchoring, clear item descriptions
- Example for Atomic Finds: "Vintage Wicker Waterfall Dresser | Boho Coastal Rattan Chest | Hand-Restored in Austin, TX"
  → Search engines now understand: material, style, era, location, condition

**11.5 — SEO Checklist for Content**
- [ ] Page title includes your business name or main keyword
- [ ] Meta description is 50-160 characters and compelling
- [ ] All images have descriptive alt text (not "photo1.jpg")
- [ ] Important pages are linked from your homepage/nav
- [ ] Product descriptions include material, size, condition, origin
- [ ] Geographic references (city, region) are included where relevant
- [ ] You've submitted your sitemap to Google Search Console

**SECTION 12 — Feature Guide: The Press Office (Blog / Articles)**
(Only if enabled)
- What the Press Office is
- Article templates: Blog Post, Press Release, Case Study
- Step-by-step: write and publish an article
- Articles auto-publish to `/learn` on your site
- Best practices: headlines, body copy, images, call-to-action

**SECTION 13 — Feature Guide: The Workshop (Projects & Tasks)**
(Only if enabled)
- What the Workshop is (internal project management)
- How to create a project
- Kanban board: To Do → In Progress → Done
- How to invite Digital Allies (Anthony) to a project
- Use cases: photo shoots, new launches, redesigns, seasonal planning

**SECTION 14 — Feature Guide: Settings**
- Location: `/admin/settings`
- What lives here: business name, tagline, phone, email, address, hours, social links, hero copy
- How to update a setting:
  1. Find the field
  2. Click to edit
  3. Type new value
  4. Click Save
- Changes appear on your live site within seconds

**SECTION 15 — Best Practices & Tips**
- Mobile preview before publishing (test on phone-sized screen)
- Keep copy short and scannable (headings, bullets, short paragraphs)
- Use descriptive image names (`vintage-rattan-chair-side-view.jpg` not `photo1.jpg`)
- Update social links so visitors can follow you
- Proofread everything before publishing (typos hurt credibility)
- Test the contact form to make sure it works

**SECTION 16 — Troubleshooting & Common Issues**

**Q: I published something but it's not showing on the site**
- A: Give it 10-30 seconds for the cache to update. Refresh the page. Check that you clicked "Publish" (not just "Save Draft").

**Q: How do I undo a change?**
- A: The CMS doesn't have a full undo history, but you can edit the record again. Consider drafting big changes in another tool first (Google Docs, Notion).

**Q: Can I schedule a post to publish later?**
- A: Not yet — publish dates are Phase 2. For now, write in Draft mode, then Publish when ready.

**Q: My images look blurry/stretched**
- A: The platform auto-crops and optimizes images. Make sure your source image is high-quality (1200px+ wide). Avoid tiny images that get enlarged.

**Q: I want to change my brand colors**
- A: Use the Brand Theme editor. Test the new colors on a few pages first (use Draft mode) before going live.

**Q: Can I delete a product/article?**
- A: Products move to "Archived" status (hidden but kept for records). Articles can't be deleted, but you can unpublish them.

**SECTION 17 — Important Contacts & URLs**
A formatted reference card:

| What | Details |
|------|---------|
| Your live website | [live_url] |
| CMS login | https://cms.digitalallies.net/admin |
| CMS documentation | This binder (digital or print) |
| Support email | hello@digitalallies.net |
| Support phone | [Anthony's phone] |
| Response time | Within 24 hours (weekdays) |
| Emergency issues | Email + note "URGENT" in subject |
| Billing & contracts | [Anthony's email] |
| Built by | Digital Allies — digitalallies.net |

**SECTION 18 — Brand Reference**
Brief brand guide for the client to reference when creating content:
- Color palette (swatches rendered in CSS with hex values, brand names)
- Typography (font names, sizes, where used)
- Voice and tone guidance (5-7 do's and don'ts, specific to the client's brand)
- Logo usage notes (where to find it in the platform, sizing, usage rules)
- Key messaging/catchphrases (if applicable)

**SECTION 19 — First 30 Days: Get-Started Checklist**
- [ ] Change your password (Settings > Change Password)
- [ ] Update your business info (Settings > Identity)
- [ ] Add your business hours and location (Settings > Contact)
- [ ] Add social media links (Settings > Social)
- [ ] Review and edit your homepage (Pages > Home)
- [ ] Add at least 5 products (Showroom > Add Item)
- [ ] Test the contact form (visit your site, fill it out)
- [ ] Share the live URL with friends (get feedback)
- [ ] Add a blog post (Press Office > New Article)
- [ ] Check mobile preview (resize browser or load on phone)

**APPENDIX A — Glossary**
Non-technical definitions for terms the client will encounter:
- CMS (Content Management System)
- Block / Section (reusable chunk of a page — hero, product grid, contact form)
- Draft vs Published (Draft: only you see it; Published: everyone sees it)
- SEO (Search Engine Optimization)
- AEO (Answer Engine Optimization)
- Design Tokens (reusable colors, fonts, spacing values)
- Collection (curated group of products)
- Product (individual item in your showroom)
- Category (type of product — CHAIRS, LAMPS, etc.)
- Selling State (how a product is sold: View Listing, Show Interest, Direct Purchase)
- Client ID (a unique identifier that keeps your data separate from other sites)
- Supabase (the database that stores all your content)
- Vercel (the hosting platform that makes your site fast)

**APPENDIX B — CSV Template**
A copy-paste-ready CSV template with example data.

**APPENDIX C — Keyboard Shortcuts**
Quick reference for power users (if applicable).

**APPENDIX D — Mobile Optimization Tips**
How to make sure your content looks good on phones.

---

### Binder visual design rules

The binder should feel premium, professional, and client-branded:

- Load the client's heading font from Google Fonts
- Background: white (#FFFFFF) for print compatibility
- Accent color: the client's primary brand color (from their design tokens)
- Secondary: the client's secondary color
- Body text: #1A1A1A or the client's text-color token
- Headings: the client's heading font
- Body: a clean sans-serif (DM Sans if available, otherwise system-ui)
- Section numbers: large, light, in the accent color
- CSS-drawn UI elements: simple rectangles with minimal styling — just enough to orient the client
- Print media query: hide navigation elements, ensure page breaks between major sections, use print-safe fonts
- Page size in print: US Letter (8.5 × 11in)
- Interactive elements (if HTML): hoverable links, collapsible sections, smooth scroll anchors
- Include a toggle for light/dark mode (respects OS preference)

---

## Step 4 (Mode C) — Create Feature-Specific Training Modules

For deep dives on individual features, generate standalone tutorial pages covering:

**Available modules:**
- CSV Uploader & Collections (detailed walkthrough + troubleshooting)
- Products & Showroom (adding, editing, categories, selling methods, photos)
- Connected Data (how collections link to products, data integrity, cascading updates)
- Design System & Brand Tokens (understanding tokens, editing colors/fonts, verifying WCAG compliance)
- SEO & AEO Best Practices (keyword strategy, meta tags, structured data, AI search optimization)
- Pages & Block Editor (creating pages, available blocks, layout strategies, responsive design)
- Press Office / Blog (writing articles, publishing, scheduling, categories)
- The Workshop (project management, task tracking, team collaboration)
- Mobile Optimization (testing on different screen sizes, responsive images, touch targets)
- Performance (page speed, image optimization, caching, Core Web Vitals)

Each module includes:
- 5-minute overview
- Interactive step-by-step walkthrough (CSS-drawn UI or video transcript)
- Common mistakes & how to avoid them
- Copy-paste templates (if applicable)
- Troubleshooting FAQ
- Links to full documentation

---

## Step 5 — After generating the binder/training (All Modes)

Tell Anthony:
1. What's in the binder/training (summary, not a full reprint)
2. Whether any gaps were found that prevent sending it yet
3. The exact path to the HTML file
4. What still needs to be wired (welcome banner, first-login tour if not built)
5. Whether the binder is ready to send to the client right now
6. Recommended: send the binder link + welcome email draft along with client login credentials

---

## Reference files

Read these when generating the binder:

- `references/cms-sections.md` — non-technical descriptions of each CMS tab
- `references/build-checklist.md` — the full launch checklist
- `references/csv-uploader-guide.md` — detailed CSV import workflow (NEW)
- `references/platform-architecture.md` — multi-tenant CMS concepts explained simply (NEW)
- `references/atomic-finds-brand.md` — Atomic Finds-specific templates and branding (NEW)

---

## Naming + output paths

| Output | Path |
|--------|------|
| Onboarding binder | `tools/build-workflows/public/onboarding/binder-<slug>.html` |
| CSV uploader tutorial | `tools/build-workflows/public/onboarding/tutorial-csv-<slug>.html` |
| Collections deep dive | `tools/build-workflows/public/onboarding/tutorial-collections-<slug>.html` |
| Design tokens guide | `tools/build-workflows/public/onboarding/tutorial-design-tokens-<slug>.html` |
| SEO/AEO guide | `tools/build-workflows/public/onboarding/tutorial-seo-aeo-<slug>.html` |
| First-login tour | `tools/build-workflows/public/onboarding/tour-<slug>.html` |
| Gap report | Generated inline in chat (Markdown) |
| Welcome email | Generated inline in chat or saved to `public/onboarding/email-welcome-<slug>.txt` |

