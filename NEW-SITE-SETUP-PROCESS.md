# Digital Allies — New Client Site Setup Process
**Read by every agent starting a new site build. Update when the platform evolves.**  
**Companion to:** `DA-PLATFORM-MASTER-CONTEXT.md`, `tools/build-workflows/web-design-platform-skill.md`, `tools/build-workflows/templates/CLIENT-ONBOARDING.template.md`

---

## 0. OVERVIEW

Every new site on the DA Platform goes through 6 phases in order. No phase is optional. The platform is multi-tenant (one Supabase, one codebase, isolated by `client_id` + RLS), and every site must meet the same non-negotiable standards regardless of client type or tier.

Starting point: **Claude Design** → design approval → code. Never code before the design is approved.

---

## PHASE 0 — Visual Foundation (Claude Design or equivalent)

**Goal:** Establish the approved visual identity before a single line of code is written.

### 0.1 Design Foundation Session
1. Open Claude Design at https://claude.ai/design
2. Reference the DA Design System (https://claude.ai/design/p/6119845f-97e8-4b42-899f-193545fca758)
3. Create the client's own design project — NOT a fork of the DA design system. Each client has their own visual identity per Decision #7 in `STATUS.md`.
4. Produce mockups for at minimum:
   - Homepage (hero, primary sections, footer)
   - One interior page (services or about)
   - Mobile viewport

### 0.2 Design Tokens (Lock Before Coding)
Extract and document before coding begins:
- Primary color, secondary color, background, surface, text, textMuted, border
- Heading font + body font (and accent/script font if applicable)
- Border radius (sharp, medium, or rounded)
- Whether the grid overlay (20px technical lace) is on or off

These feed directly into `design_tokens` seed and `theme.ts`. No token should be decided in code — it should already be in the design.

### 0.3 Content Foundation
Before coding, collect or draft:
- Site title, tagline, meta description
- Hero headline + subtitle + CTA text + CTA link
- About copy (150–300 words)
- Contact info (phone, email, address, hours)
- Social handles

This feeds the `settings` seed and removes the need for placeholder text in code.

---

## PHASE 1 — Supabase Tenant Setup

**Reference:** `tools/build-workflows/templates/CLIENT-ONBOARDING.template.md` for the full checklist.

### 1.1 Create the client row
```sql
-- Generate UUID first: gen_random_uuid() in Supabase or uuidgenerator.net
insert into clients (id, auth_user_id, business_name) values
  ('<UUID>', null, '<Client Name>')
on conflict (id) do update set business_name = excluded.business_name;
```

Write the UUID into:
- `DA-PLATFORM-MASTER-CONTEXT.md` §2 tenant table
- The Build Brief §7
- The seed files below

### 1.2 Seed files — required, in order

| File | Table | Contents |
|------|-------|----------|
| `seed-<client>-settings.sql` | `settings` | 20 keys: Identity (6), Hero (4), About (3), Contact (4), Social (4) |
| `seed-<client>-design-tokens.sql` | `design_tokens` | colors, fonts, type_scale, spacing, logo, favicon |
| `seed-<client>-pages.sql` | `pages` | draft homepage + key pages as block stacks |
| `seed-<client>-catalog.sql` | `products` / `services` | starter content if applicable |

**Template:** Copy from `seed-atomic-finds-settings.sql` / `seed-atomic-finds-design-tokens.sql` and replace `client_id` and values.

All seeds use `on conflict (...) do update` for idempotency. Safe to re-run.

### 1.3 Auth setup
- Supabase → Authentication → Users → Invite → client admin email
- Supabase → Auth → URL config → add the client's domain (and localhost for dev)
- Anthony sends login link + temp password

### 1.4 RLS verification (do not skip)
With the anon key:
- [ ] Published rows are readable by anyone
- [ ] Draft rows are not readable by anon
- [ ] Another client's rows return zero results (not an error, just empty)
- [ ] Writes as anon are rejected (expect 403)

---

## PHASE 2 — Vercel Deployment

### 2.1 New Vercel project
- Import from `Digital-Allies/da-platform` → Root directory: `tools/build-workflows`
- Branch: `main` (always — never deploy a feature branch to production)

### 2.2 Required env vars (manual paste — they don't sync from `.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL        = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   = sb_publishable_...   (NOT the legacy eyJ... format)
SUPABASE_SERVICE_ROLE_KEY       = sb_secret_...         (mark Sensitive; do NOT add to client sites, only the CMS engine)
NEXT_PUBLIC_CLIENT_ID           = <client UUID>         ← most common mistake: wrong UUID here
NEXT_PUBLIC_SITE_URL            = https://clientdomain.com
CONTACT_FORM_TO_EMAIL           = client@email.com
RESEND_API_KEY                  = re_...                (DA's shared key)
```

**Common mistake:** `NEXT_PUBLIC_CLIENT_ID` must be the `clients.id` UUID (the one you inserted in Phase 1), NOT the Supabase auth user UUID. These are different. Confirm by checking `select id from clients where business_name = '...'` in Supabase SQL Editor.

### 2.3 Domain
- Add domain in Vercel project settings
- Point registrar DNS (A record or CNAME) at Vercel
- Verify HTTPS green + magic-link login works on real domain

---

## PHASE 3 — NON-NEGOTIABLES (every site, no exceptions)

These are not optional. They are baked into the platform standard. If any of these are missing at launch, the site is not done.

### 3.1 Accessibility — WCAG 2.1 AA STRICT
- **Color contrast:** 4.5:1 minimum for normal text, 3:1 for large text (18px+ regular or 14px+ bold) and UI components. Use https://webaim.org/resources/contrastchecker/ to verify.
- **Alt text:** Every `<img>` must have descriptive alt text. No `alt=""` on content images. No `alt="image"`, `alt="photo"`, or filename text. Describe what the image shows and why it matters.
- **Aria labels:** All interactive elements without visible text need `aria-label`. Icon-only buttons, social links, hamburger menus, close buttons.
- **Proper HTML structure:** One `<h1>` per page. Logical heading order (h1 → h2 → h3, never skip). Landmark regions (`<main>`, `<nav>`, `<footer>`, `<section aria-label="...">`).
- **Keyboard navigation:** Every interactive element reachable and operable via Tab/Enter/Space. Focus order follows visual order.
- **Focus states:** Visible, never hidden (`outline: none` is forbidden without an equivalent replacement). 2px solid in brand color at minimum.
- **Touch targets:** Minimum 44×44px for all buttons and links (especially on mobile).
- **Form labels:** Every `<input>` has an associated `<label for="...">`. No placeholder-only labels.
- **Reduce motion:** Honor `prefers-reduced-motion`. Wrap all animations in the media query.
- **Accessibility statement page:** `/accessibility` — see §3.5 Required Pages.

**Tooling:** Run axe DevTools browser extension on every page before launch. Target zero critical/serious violations.

### 3.2 Multilingual — Language Switcher (Required Component)
Every DA Platform site ships ready to switch language. English-only at launch is fine; the infrastructure must exist.

**Required:**
- Language switcher component in the `<Navigation>` and `<Footer>` (globe icon + language dropdown)
- All user-facing strings externalized to an i18n dictionary (never hardcoded in JSX)
- `next-intl` (or equivalent) configured with at minimum an `en.json` locale file
- The switcher must be keyboard-accessible (dropdown navigable by arrow keys, Escape closes)
- URL structure: `/` = English, `/es/` = Spanish (or use `?lang=` param — decide per project, document in the Build Brief)

**Language Switcher component location (once built):** `packages/design-system/src/components/LanguageSwitcher.tsx`  
**Status as of 2026-07-24:** Not yet built — scheduled as part of the DA site rebuild. Add to every new site once available.

**Stub for now:** Add a `<!-- LANGUAGE_SWITCHER_PLACEHOLDER -->` comment in Navigation and Footer so it's clear where it goes.

### 3.3 SEO Readiness
- `<title>` unique per page — reads from `settings.site_title` + page title
- `<meta name="description">` unique per page — reads from `settings.site_description` or page meta
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- JSON-LD structured data:
  - `LocalBusiness` on the homepage (name, url, phone, address)
  - `BreadcrumbList` on interior pages
  - `Article` on blog posts
- `sitemap.xml` — auto-generated by Next.js (`app/sitemap.ts`). Must include all published pages, articles, and key routes.
- `robots.txt` — allow all crawlers; disallow `/admin`
- Canonical URLs — `<link rel="canonical" href="...">` on every page
- Image filenames — descriptive (`peacock-chair-1970s-rattan.jpg` not `IMG_4821.jpg`)

### 3.4 AI Readiness
- **`/use-of-ai` page** — required on every site. Explains how Digital Allies uses AI in the build process, what content was AI-assisted, and what was human-reviewed. Template: see §Required Pages below.
- **`llms.txt`** — a plain-text file at the root describing the site for AI crawlers. Format: brief description, key pages, contact, permissions for AI training (client's choice).
- **Structured data** (see §3.3) helps AI systems understand the business accurately.
- Content generated with AI must be reviewed and approved by a human before publishing.

### 3.5 Required Pages (every site must have these)
Every site deploys with these pages seeded in the `pages` table:

| Slug | Title | Status at Launch | Notes |
|------|-------|------------------|-------|
| `home` | Home | Published | Block stack (hero + primary sections) |
| `about` | About | Published | Two-column or richtext |
| `contact` | Contact | Published | ContactForm block |
| `terms` | Terms of Service | Published | Legal copy — DA template + client-specific customization |
| `privacy` | Privacy Policy | Published | CCPA + GDPR basics |
| `cookies` | Cookie Policy | Published | What cookies are set and why |
| `accessibility` | Accessibility Statement | Published | WCAG conformance level, known gaps, contact for issues |
| `use-of-ai` | Our Use of AI | Published | How AI was used, what was human-reviewed |
| `sitemap` | Sitemap | Published | Human-readable HTML sitemap linking all pages |

**For blogs/articles clients:** Also seed `learn` or `blog` as an index page with the articles block.

### 3.6 Production-Only Dependencies
- No `devDependencies` in the production bundle. All dependencies used in production code must be in `dependencies`, not `devDependencies`.
- No `console.log` statements in production code. Use a structured logger or remove before launch.
- No test files, mocks, or stubs in the production build. Keep them in `__tests__/` or `*.test.ts` files (excluded automatically by Next.js).
- Use `next/dynamic` with `{ ssr: false }` only when truly needed — prefer server components.
- No unused imports or components. Run `tsc --noEmit` + ESLint clean before every deploy.
- Image optimization: Use `next/image` for all images. Never raw `<img>` tags in production. Set explicit `width`, `height`, and meaningful `alt`.

### 3.7 Legal & Compliance
- Privacy Policy covers: what data is collected, how it's used, cookies, third-party services (Supabase, Vercel, Resend), user rights (CCPA/GDPR)
- Cookie notice/banner if analytics or tracking cookies are set (Vercel Web Analytics sets none — fine to skip banner if that's the only analytics)
- Contact form: only collect name, email, message — minimum data
- Accessibility statement must include: conformance level (AA target), known limitations, contact method for accessibility issues

---

## PHASE 4 — CMS Template Setup

Every page is seeded as a block stack so the client can edit it from day one.

### 4.1 Block stack pattern (confirmed in BlockRenderer.tsx)
```json
[
  { "type": "hero",    "data": { "title": "...", "subtitle": "...", "ctaText": "...", "ctaLink": "..." } },
  { "type": "services", "data": { "title": "Services" } },
  { "type": "richtext", "data": { "content": "<p>About us...</p>" } },
  { "type": "testimonials", "data": { "title": "What clients say" } },
  { "type": "cta",     "data": { "title": "...", "subtitle": "...", "buttonText": "...", "buttonLink": "..." } },
  { "type": "contact", "data": { "title": "Get in Touch", "subtitle": "..." } }
]
```

Current block types in `BlockRenderer.tsx`: `hero`, `richtext`, `services`, `products`, `testimonials`, `cta`, `contact`  
Planned (not yet built): `media`, `stats`, `quote`, `faq`

### 4.2 Design tokens row (design_tokens table)
One row per client. Contains the values the admin Theme editor reads and writes.
```sql
-- See seed-atomic-finds-design-tokens.sql for full template
insert into design_tokens (client_id, colors, fonts, type_scale, spacing, logo, favicon)
values ('<uuid>', '{...}'::jsonb, '{...}'::jsonb, '{...}'::jsonb, '{...}'::jsonb, '/logo.png', '/favicon.ico')
on conflict (client_id) do update set ...;
```

---

## PHASE 5 — Launch QA

Run before any site goes live. No exceptions.

### 5.1 Accessibility QA
- [ ] axe DevTools: zero Critical, zero Serious violations on all pages
- [ ] Color contrast: verify all text/background combos with WebaAIM Contrast Checker
- [ ] Keyboard only: navigate the full page without mouse — every link, button, form field reachable
- [ ] Screen reader: VoiceOver (Mac) on homepage + contact form — heading structure and form labels read correctly
- [ ] Images: all content images have descriptive alt text
- [ ] Focus: Tab order is logical; focus ring is visible

### 5.2 Performance QA
- [ ] Lighthouse (Chrome DevTools) on homepage: ≥ 90 Performance, ≥ 90 Accessibility, ≥ 90 SEO, ≥ 90 Best Practices
- [ ] LCP < 2.5s, CLS < 0.1, FID < 100ms
- [ ] All images use `next/image` with explicit dimensions
- [ ] No render-blocking resources

### 5.3 SEO QA
- [ ] `<title>` and `<meta description>` unique per page and present
- [ ] OG image present and 1200×630px
- [ ] `sitemap.xml` accessible at `/sitemap.xml`, includes all published pages
- [ ] `robots.txt` present, `/admin` disallowed
- [ ] JSON-LD `LocalBusiness` valid (test with https://validator.schema.org/)

### 5.4 Functional QA
- [ ] Contact form: submits → Supabase row created + email arrives at `CONTACT_FORM_TO_EMAIL`
- [ ] Admin login: client can log in, edit a setting, see it on the live site
- [ ] All navigation links resolve (no 404s)
- [ ] 404 page styled (not Next.js default)
- [ ] HTTPS green, no mixed content warnings
- [ ] Language switcher placeholder visible (or functional if i18n implemented)

### 5.5 Legal pages QA
- [ ] `/terms`, `/privacy`, `/cookies`, `/accessibility`, `/use-of-ai`, `/sitemap` all load
- [ ] Each has the correct meta title and description
- [ ] Contact email in accessibility statement is the client's email

---

## PHASE 6 — Client Handoff

1. Send login credentials + admin URL
2. Short walkthrough (5 min max): log in, edit a setting, publish a change, add a service
3. Link to any recorded walkthroughs
4. Confirm client can operate the CMS without help
5. Update `DA-PLATFORM-MASTER-CONTEXT.md` — add site to tenant table with status "Live ✅"

---

## SKILLS & TOOLS REGISTRY

Referenced by name throughout this process. Load these before working on related tasks.

### Cowork Skills (available in this session)
| Skill | When to use |
|-------|-------------|
| `digital-allies-brand` | Any branded content — HTML pages, docs, social, proposals |
| `da-dark-mode-design-spec` | Dark-variant DA surfaces (zo.space, CMS dark theme) |
| `frontend-design` | Web components, landing pages, dashboards |
| `da-social-campaign` | Social media campaigns and scheduling |
| `da-sound-brief` | Branded audio content, music for video/reels |
| `local-leads` | Lead generation for Mohave County B2B outreach |
| `nextjs-supabase-auth` | Supabase Auth integration with Next.js App Router |
| `web-animation-framer-motion` | Animation patterns (Motion/Framer Motion) |
| `docx` / `pptx` / `pdf` | Document generation |
| `stripe-projects` | Stripe product/subscription/invoice management |
| `da-social-campaign` | Social calendar, Meta posts, GBP posts |
| `vpai:vibe-prospecting` | Contact/company research for outreach |
| `legal:compliance-check` | Compliance review for new features/pages |

### Platform Skills / Reference Docs
| Document | Location | Purpose |
|----------|----------|---------|
| `web-design-platform-skill.md` | `tools/build-workflows/` | Full design system reference — typography, color, components, voice, animations |
| `CLIENT-ONBOARDING.template.md` | `tools/build-workflows/templates/` | Step-by-step onboarding checklist (Supabase, Vercel, Auth, DNS, QA, handoff) |
| `BUILD-BRIEF.template.md` | `tools/build-workflows/templates/` | Build brief template — fill before any site work starts |
| `PIPELINE.md` | `tools/build-workflows/` | The full 5-stage pipeline from intake to handoff |
| `DA-PLATFORM-MASTER-CONTEXT.md` | Repo root | Running cross-agent context — bugs, schedule, decisions |
| `STATUS.md` | Repo root | Current state — read first |

### Components — Built
| Component | File | Notes |
|-----------|------|-------|
| `Navigation` | `src/components/site/Navigation.tsx` | Site nav with logo, links, CTA |
| `Hero` | `src/components/site/Hero.tsx` | Full-width hero |
| `ProductGrid` | `src/components/site/ProductGrid.tsx` | Product catalog with category filter |
| `ContactForm` | `src/components/site/ContactForm.tsx` | Contact + Supabase + Resend |
| `Footer` | `src/components/site/Footer.tsx` | Settings-driven footer |
| `BlockRenderer` | `src/components/site/BlockRenderer.tsx` | Renders page block stacks |
| `SiteTheme` | `src/components/site/SiteTheme.tsx` | Injects `--tok-*` CSS variables |
| `RevealOnScroll` | `src/components/site/RevealOnScroll.tsx` | Intersection observer scroll reveals |
| `CTAButton` | `src/components/site/CTAButton.tsx` | Primary/secondary/ghost button variants |
| `AtomicFindsHomepage` | `src/components/site/atomic-finds/` | Bespoke AF homepage (client-specific) |

### Components — Required But Not Yet Built
| Component | Purpose | Priority |
|-----------|---------|----------|
| `LanguageSwitcher` | Globe icon + locale dropdown in nav/footer; keyboard-accessible | HIGH — blocks i18n on any site |
| `AccessibilityStatement` | Auto-generated page template from site settings | MEDIUM |
| `UseOfAI` | AI disclosure page template | MEDIUM |
| `Sitemap` | Human-readable HTML sitemap auto-generated from `pages` table | MEDIUM |
| `CookieBanner` | Lightweight notice (only needed if tracking cookies set) | LOW — skip if only Vercel Analytics |
| `FAQBlock` | Accordion FAQ section for BlockRenderer | MEDIUM |
| `StatsBlock` | Stat strip for BlockRenderer | MEDIUM |
| `QuoteBlock` | Pinned quote section for BlockRenderer | LOW |
| `/admin/pages` real page builder | Section-based drag/drop page editor | Aug 5–6 build slot |

---

## DA SERVICES → PLATFORM FEATURE MAPPING

This maps what Digital Allies sells/offers to what the platform must provide.

| DA Service | What It Means | Platform Requirement |
|-----------|---------------|---------------------|
| "Accessible design" | WCAG 2.1 AA, every site | §3.1 — non-negotiable, launch blocker |
| "Multilingual" | Language switcher, i18n-ready | §3.2 — LanguageSwitcher component (build now) |
| "AI-ready" | AI disclosure, structured data, llms.txt | §3.4 — /use-of-ai page + llms.txt |
| "SEO foundation" | Sitemap, schema, meta, OG | §3.3 — baked into every build |
| "Legal compliance" | Terms, privacy, cookies, a11y statement | §3.5 — required pages list |
| "CMS editing" | Admin panel, block page builder | BlockRenderer + /admin/pages (Aug 5–6) |
| "Design system" | Each client's own tokens, never looks like DA | design_tokens seed + SiteTheme per Decision #7 |
| "Fast deploy" | ~3–4 hours from contract to live | Phases 1–3 + seed scripts |
| "Starter / Pro / Agency" | Feature tier gating | `clients.plan` column (migration exists, unapplied — see STATUS.md P4) |

---

## DIGITAL ALLIES SITE REBUILD — Project Spec

**Source:** Claude Design conversation 2026-07-24  
**Target:** digitalallies.net (deployed from `Digital-Allies/DigitalAllies` repo, NOT da-platform)  
**See also:** `DA-PLATFORM-MASTER-CONTEXT.md` §3 P1, P2

### Rebuild Goals
1. Bring the DA site in line with all §3 non-negotiables above
2. Rebuild all pages as CMS-editable templates (via block system)
3. Production-grade codebase — no dev leakage, no placeholder content

### Visual Design First
Before any code:
- Review homepage comments in the existing Claude Design project
- Apply visual system updates to the DA design system (the design system itself needs visual updates, not just content)
- Establish what is changing visually before touching code

### Missing Pages (add to the site rebuild)
| Page | Notes |
|------|-------|
| `/learn` | Article index — fixes P1 (cms-loader.js broken) once the loader is fixed |
| `/learn/[slug]` | Individual article/blog post pages |
| `/sitemap` | Human-readable sitemap |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |
| `/cookies` | Cookie Policy |
| `/accessibility` | Accessibility Statement |
| `/use-of-ai` | AI Disclosure page |

### What Each Page Needs
- All new pages: CMS template format (block-based or richtext) so Anthony can edit without code
- Full accessibility (WCAG 2.1 AA, strict contrast, aria, alt text)
- Language switcher stub (or full i18n if LanguageSwitcher is built by then)
- SEO meta (title, description, OG, canonical, JSON-LD where applicable)
- Production-only dependencies (no dev leakage)

### Legal Page Copy (DA-specific)
- Terms: governs use of the DA Platform, admin access, payment for services
- Privacy: covers Supabase data storage, Resend email, Vercel analytics, contact form submissions
- AI Disclosure: DA uses Claude (Anthropic) for content generation and design assistance; all AI output is reviewed and approved by Anthony before publishing
- Accessibility: targeting WCAG 2.1 AA; contact Anthony for issues

### Build Order for the Rebuild
1. Visual design review + system updates in Claude Design
2. Fix P1 (cms-loader.js) in `Digital-Allies/DigitalAllies` → restores `/learn` articles
3. Scaffold missing pages as CMS templates (seed into `pages` table for DA client)
4. Build `LanguageSwitcher` component → add to nav + footer
5. Audit existing pages for a11y violations → fix all Critical/Serious
6. Strict contrast ratio pass on all color combinations
7. Add JSON-LD to homepage and articles
8. Generate `sitemap.xml` dynamic route
9. QA per Phase 5 checklist above
10. Deploy

---

*End of process document. Keep this current — when a step is completed or the platform evolves, update the relevant section.*
