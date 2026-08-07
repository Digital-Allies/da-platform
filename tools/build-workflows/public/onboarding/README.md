# Client Onboarding Training Suite

## What's Here

This directory contains a comprehensive, expandable training system for all DA Platform clients. It's organized into multiple formats so you can use the right tool for the right situation.

---

## Files & How to Use Them

### 1. **SKILL-EXPANDED.md** (for Claude)
**What it is:** The expanded `client-onboarding` skill with all three modes (Build Gap Report, Onboarding Binder, Feature Training)

**When to use it:** Reference document for Claude Code when building onboarding materials

**Who uses it:** Developers, Claude agents

---

### 2. **binder-atomic-finds-interactive.html** (for Clients)
**What it is:** A beautiful, interactive HTML training guide pre-filled with Atomic Finds branding

**Features:**
- Dark celestial theme matching Atomic Finds brand
- Interactive table of contents (sidebar)
- Collapsible sections for deep dives
- Tabs for comparisons (Do's/Don'ts)
- Step-by-step walkthroughs with CSS-drawn UI
- CSV uploader tutorial (detailed)
- Collections guide
- Responsive design (works on phones)
- Print-friendly
- Dark/light mode toggle

**How to use:**
1. Save the URL or print it
2. Bookmark for quick access
3. Reference anytime you need help
4. Share with your team

**URL:** `[deployed-url]/onboarding/binder-atomic-finds-interactive.html`

---

### 3. **references/csv-uploader-guide.md** (Deep Reference)
**What it is:** Comprehensive CSV import documentation

**Covers:**
- Why collections matter
- Connected data explained
- CSV format (required columns, variants)
- Spreadsheet prep (Google Sheets, Excel)
- Step-by-step import
- Troubleshooting
- Best practices
- Use case examples

**When to use:**
- You're about to bulk-import products
- Import failed and you need to fix it
- You want to learn best practices

---

### 4. **references/platform-architecture.md** (Conceptual)
**What it is:** Non-technical explanation of how the DA Platform works

**Covers:**
- Three layers (Website, Admin, Database)
- How data flows
- Multi-tenant isolation & security
- Design tokens (what they are, how to use them)
- Products & collections (how they connect)
- Hosting setup
- Limits & scaling
- Glossary

**When to use:**
- You want to understand the system deeply
- You're explaining the platform to someone else
- You want to know what's happening behind the scenes

---

### 5. **references/atomic-finds-brand.md** (Brand Reference)
**What it is:** Atomic Finds-specific brand guide & copy templates

**Covers:**
- Brand story
- Color palette with hex codes
- Typography (Bagel Fat One, DM Sans, Pacifico)
- Voice & tone guidelines (Do's/Don'ts)
- The Four Mascots (Daisy, Milo, Tatiana, Malibu)
- SEO & AEO best practices for vintage furniture
- Product copy templates
- Copy examples
- Glossary

**When to use:**
- You're writing product descriptions
- You want to stay on-brand
- You need to organize products by mascot theme
- You're optimizing for search engines

---

### 6. **IMPLEMENTATION-PLAN.md** (Development)
**What it is:** Technical roadmap for integrating onboarding into the CMS

**Covers:**
- Goals of the integration
- How the project template system works
- 38-task "Website Launch" project template
- Implementation steps (code changes)
- Auto-population strategy (Phase 2)
- Dashboard progress card (Phase 2)
- Timeline & ownership

**When to use:**
- Anthony is building the integration
- Claude Code is implementing the template
- Planning what to tackle next

---

## How to Use All This

### For a New Client Launch (Anthony)

1. **Read the skill:** SKILL-EXPANDED.md (Section "Step 1: Read Project Context")
2. **Create the project template:** IMPLEMENTATION-PLAN.md (Step 1-2)
3. **Generate the binder:** Use claude-onboarding skill in Cowork
4. **Send to client:** HTML binder + link to this README
5. **Track progress:** Website Launch project in The Workshop

### For a Client Learning the Platform (Self-Service)

1. **Start here:** `binder-atomic-finds-interactive.html`
2. **Deep dive on CSV:** `references/csv-uploader-guide.md`
3. **Understand architecture:** `references/platform-architecture.md`
4. **Write great copy:** `references/atomic-finds-brand.md`

### For Development (Extending the System)

1. **Understand what exists:** SKILL-EXPANDED.md
2. **Review the plan:** IMPLEMENTATION-PLAN.md
3. **Reference specific features:** `references/` files
4. **Build & test:** Follow implementation steps

---

## Quick Links

| Need | File | Format |
|------|------|--------|
| **Learn how to use the platform** | binder-atomic-finds-interactive.html | Interactive HTML |
| **Understand CSV uploading** | references/csv-uploader-guide.md | Markdown |
| **Understand how the system works** | references/platform-architecture.md | Markdown |
| **Write on-brand copy** | references/atomic-finds-brand.md | Markdown |
| **See what's being built** | IMPLEMENTATION-PLAN.md | Markdown |
| **Understand the skill** | SKILL-EXPANDED.md | Markdown |

---

## Browser & Device Support

**binder-atomic-finds-interactive.html** works on:
- Desktop browsers (Chrome, Safari, Firefox, Edge)
- Mobile phones (iOS Safari, Android Chrome)
- Tablets (iPad, Android)
- Print (PDF-friendly styling)
- Dark/light mode (respects OS preference)

---

## Workflow: Creating Training for Other Clients

**Template:** Use Atomic Finds version as a starting point. For each new client:

1. **Duplicate** `binder-atomic-finds-interactive.html` → `binder-[CLIENT-SLUG]-interactive.html`
2. **Search & replace:**
   - "Atomic Finds" → Client name
   - Brand colors (#F5C842 → their primary)
   - Brand fonts (Bagel Fat One → their heading font)
   - URLs (atomicfindsatx.store → their domain)
   - Voice examples → their voice/messaging
3. **Keep the structure** (everything else scales)
4. **Save to same directory:** `/public/onboarding/`

---

## Features of the Interactive Binder

### Navigation
- **Sticky header** with logo and action buttons
- **Table of contents sidebar** (clickable sections)
- **Smooth scrolling** to each section

### Content Organization
- **Cover page** with client branding
- **Sections** that are self-contained (can be reordered)
- **Collapsible sections** for deep dives
- **Tabs** for comparisons and workflows

### Interactivity
- **Dark/light mode toggle** (respects OS preference)
- **Print button** in nav
- **Bookmarkable sections** (share specific URL anchors)
- **Mobile-responsive** (no horizontal scrolling)

### Content Types
- **Step-by-step guides** with numbered steps
- **Tables** with client data
- **Checklists** with checkboxes
- **Color swatches** (actual colors displayed)
- **Code blocks** for CSV examples
- **Collapsible Q&A** for troubleshooting

---

## Customization for New Clients

Every new client should get a branded version. Here's what changes:

| Element | Atomic Finds | Your Client |
|---------|---|---|
| Primary color | #F5C842 (Celestial Yellow) | Their brand primary |
| Logo | Atomic Finds logo | Their logo/name |
| Heading font | Bagel Fat One | Their heading font |
| Tagline | "Far-out finds, down-to-earth prices" | Their tagline |
| Voice examples | Vintage furniture language | Their industry language |
| Product categories | SEATING, STORAGE, DECOR | Their categories |
| Mascots section | Daisy, Milo, Tatiana, Malibu | Their brand personas (or remove) |
| URLs | atomicfindsatx.store | Their domain |
| Email | atomicfindsatx@gmail.com | Their email |

---

## Project Template Status

The **Website Launch** project template (in ProjectsClient.tsx) includes:

- **Phase 1:** Technical Foundation (8 tasks)
- **Phase 2:** Content & Brand (6 tasks)
- **Phase 3:** Required Pages (8 tasks)
- **Phase 4:** SEO & AEO (5 tasks)
- **Phase 5:** Performance & Accessibility (6 tasks)
- **Phase 6:** Admin Setup & Handoff (5 tasks)

**Total:** 38 tasks, auto-populated when you create a "Website Launch" project in The Workshop.

---

## How These Connect

```
DA Platform Client (e.g., Atomic Finds)
    ↓
    ├─→ Onboarding Binder (HTML) ← Training document
    │   ├─ CSV Uploader Guide (reference)
    │   ├─ Platform Architecture (reference)
    │   └─ Brand Guide (reference)
    │
    ├─→ Website Launch Project (CMS) ← Track progress
    │   └─ 38 tasks across 6 phases
    │
    └─→ Live Site + Admin Dashboard ← Use the platform
```

---

## Pro Tips

1. **Bookmark the binder:** Save it in your browser as a quick reference
2. **Print if needed:** PDF-friendly styling makes it a great printable guide
3. **Dark mode:** The binder respects your system preference
4. **Sections are linkable:** Share specific parts with just the anchor (e.g., `#products`)
5. **Use the project:** For accountability, track progress in The Workshop
6. **Customize early:** Adapt colors/fonts for each client before sending

---

## Maintenance

These files should be updated when:
- The platform gains new features (add to skill + binder)
- Client onboarding process changes (update IMPLEMENTATION-PLAN.md)
- Brand/voice guidelines evolve (update references)
- Common questions arise (add to troubleshooting sections)

---

## Learning Path

**If you're a new Atomic Finds client:**
1. Start with the binder (5 min overview)
2. Read "How to Login" section (2 min)
3. Try adding a product (10 min)
4. Deep dive into CSV uploader when ready (15 min)
5. Reach out if you get stuck

**If you're learning by doing:**
1. Log in and poke around
2. Bookmark the binder
3. Reference as needed
4. Email contact@digitalallies.net with questions

**If you're building this for a new client:**
1. Read SKILL-EXPANDED.md for the full context
2. Use ProjectsClient.tsx template approach
3. Duplicate binder HTML and customize
4. Send HTML + this README + login credentials

---

## Need Help?

- **Quick question?** Check the binder's troubleshooting section
- **Building products?** Read the brand guide and CSV uploader guide
- **Can't log in?** Email contact@digitalallies.net
- **Want to dive deeper?** Read platform-architecture.md
- **Found an error?** Let Anthony know

---

## Version History

- **v1.0** (August 2026): Initial Atomic Finds binder + comprehensive skill + all references + implementation plan
- **v2.0** (TBD): Project template integration live + auto-population feature + dashboard progress card

---

**Last Updated:** August 6, 2026  
**Maintainer:** Digital Allies (Anthony)  
**Status:** Active & Growing

