# Web Design Platform Skill
## Next.js + Supabase + Vercel Client Site System

**Purpose:** Build fast, maintainable, client-managed websites using a reusable component library, unified design system, and automated deployment.

**Who uses this:** Anthony (designer/builder) and client teams (content managers via admin panel).

---

## PART 1: SYSTEM ARCHITECTURE

### Stack
- **Frontend:** Next.js 14+ (React)
- **Backend:** Supabase (PostgreSQL + Auth + Row-Level Security)
- **Hosting:** Vercel (auto-deploy from GitHub)
- **Database:** 1 Supabase project (all clients, isolated via RLS)
- **Repo:** 1 GitHub repo (monorepo structure, multiple deployments)

### Database Schema (Multi-Tenant)

```sql
-- Clients (auth users)
clients (
  id UUID PRIMARY KEY,
  auth_user_id UUID (links to Supabase auth),
  business_name TEXT,
  created_at TIMESTAMP
)

-- Content
posts (
  id UUID,
  client_id UUID,
  title TEXT,
  content TEXT (HTML from rich text editor),
  slug TEXT (URL-safe),
  status TEXT ('draft' | 'published'),
  published_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

services (
  id UUID,
  client_id UUID,
  title TEXT,
  description TEXT,
  price TEXT (optional),
  order INT (display order),
  created_at TIMESTAMP
)

testimonials (
  id UUID,
  client_id UUID,
  author_name TEXT,
  author_role TEXT,
  content TEXT,
  order INT,
  created_at TIMESTAMP
)

team_members (
  id UUID,
  client_id UUID,
  name TEXT,
  role TEXT,
  bio TEXT,
  image_url TEXT (Supabase Storage),
  order INT,
  created_at TIMESTAMP
)

gallery_items (
  id UUID,
  client_id UUID,
  title TEXT,
  image_url TEXT (Supabase Storage),
  category TEXT,
  order INT,
  created_at TIMESTAMP
)

settings (
  id UUID,
  client_id UUID,
  key TEXT,
  value TEXT,
  created_at TIMESTAMP
)
```

**Row-Level Security (RLS):** Every table has a policy that allows users to read/write only their own client_id.

---

## PART 2: DESIGN SYSTEM

### Philosophy

Platform design principles — applied to every client site, regardless of their brand:
- **95/5 Rule:** 95% of the canvas stays neutral (background + text). The remaining 5% carries all color weight. Every client gets ONE primary brand color; the rest is neutral.
- **Confidence Through Simplicity:** Generous whitespace. No decorative fluff.
- **One Animated Element:** Never more than one piece of motion on a page (usually the button hover or scroll reveal).
- **Earned design decisions:** Every visual choice is grounded in the client's brief — not carried over from another client or from the platform's own brand.

### Color Palette (Per Client — Established in Claude Design)

Each client's color system is established in Phase 0 before coding begins. There are no platform defaults — the client's brand drives every choice.

| Role | Usage | Source |
|---|---|---|
| **Canvas** | Page background | From client brief / Claude Design |
| **Text** | Body copy, UI labels | From client brief |
| **Primary Brand** | Buttons, links, accents | Client's primary brand color |
| **Surface** | Card backgrounds, panels | Derived from canvas |
| **Border** | Structural lines, dividers | Derived from text color |
| **Alert** | Form validation errors | Client's error state (or standard red if unspecified) |

**5% Rule Implementation:**
- Use primary brand color only for: buttons, links, hover states, icons, one accent line per section
- Everything else: background, text, structural borders — all neutral
- If you're using more than 5% color, remove something

These values are extracted into the `design_tokens` seed file (Phase 1) and injected via `SiteTheme.tsx` as CSS variables (`--tok-primary`, `--tok-bg`, etc.) — never hardcoded in component files.

### Typography (Per Client — Established in Claude Design)

Typography is chosen per client in Phase 0 based on their brand personality. There are no platform font defaults.

**Selection criteria:**
- Heading font: chosen for the client's tone (editorial, playful, technical, warm, etc.)
- Body font: legible, web-safe or Google Font, optimized for readability
- Never more than 2 typefaces per site
- Confirm both fonts are available via Google Fonts or system stack (no licensing issues)

**Rules (universal — apply to every site):**
- Headlines: Bold weight, 24px–80px depending on context
- Subheadings: Semibold, 18px–32px
- Body: Regular weight, 14px–16px
- Line height (body): 1.6 (generous spacing for readability)
- Line height (headlines): 1.2 (tight, authoritative)
- Minimum body font size: 14px (smaller fails WCAG at small sizes)

### Spacing & Layout

**Grid:**
- 12-column centered grid, 1280px max-width (or 1024px for compact layouts)
- Padding: 40px mobile, 60px+ desktop
- Gutters: 16px–24px between columns

**Spacing Scale (8px base):**
```
8px, 16px, 24px, 32px, 48px, 64px, 80px, 120px
```

**Section Spacing:**
- Between major sections: 80–120px vertical margin
- Within sections: 24–48px for subsections
- Padding inside cards: 24–32px

**The Symmetry Break (Optional):**
- One element nudged 5–10px off-center per page
- ONLY for a strategic element (CTA button, callout, accent line)
- ONLY in the primary brand color or red
- Creates visual interest without clutter

### Grid Overlay (Optional Pattern)

A subtle 20px grid overlay can signal structure and technical rigor. It is an optional design choice — confirm with the client's visual direction in Phase 0.

**Implementation (use client's background + text colors, not hardcoded values):**
```css
/* Replace hex values with client's design tokens */
background-color: var(--tok-bg);
background-image:
  linear-gradient(rgba(var(--tok-text-rgb), 0.07) 0.5px, transparent 0.5px),
  linear-gradient(90deg, rgba(var(--tok-text-rgb), 0.07) 0.5px, transparent 0.5px);
background-size: 20px 20px;
```

### Borders & Structure

- Use borders to separate regions, not decorate
- Cards, sections, inputs: structural borders using the client's border token (`--tok-border`)
- Border weight: 1px standard
- Decide per client whether to use borders vs. shadows — match the client's visual direction from Phase 0

### Animations (Minimal)

**One rule: No more than one animated element per page.**

**Allowed animations:**
- Button hover: Scale 1.05 + color change (0.2s ease)
- Scroll reveals: Fade-in + slide-up (0.6s ease-out, 100ms stagger between items)
- Loading states: Spinning dot or pulse (0.8s loop)
- Form validation: Subtle border color change (0.3s ease)

**Forbidden:**
- Gratuitous background animations
- Multiple parallax elements
- Morphing shapes
- Slide-in modals (use instant or fade-in)
- Any animation longer than 1s

**Scroll animations (apply to sections):**
```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Triggered on scroll intersection, 0.6s ease-out */
```

### Icons

**Use:** Literal, simple icons that make visual sense (phone, envelope, map pin, calendar).

**Avoid:** Generic tech glyphs (clouds, gears, Wi-Fi symbols), abstract shapes.

**Source:** Lucide React (built-in icon library with minimal aesthetic).

---

## PART 3: COMPONENT LIBRARY

### 3.1 Hero Section

**Variants:**
- Image overlay (image + dark overlay + text on top)
- Dark background (solid color + text)
- Light background (bone white + accent color accent stripe)
- Video background (optional, for premium sites)

**Props:**
- `title`: Main headline (Lexend Deca, bold, 48–64px)
- `subtitle`: Subheading (body font, 18–24px)
- `cta_text`: Button label
- `cta_link`: Button target (internal or external)
- `background_color`: Primary brand color (or image)
- `text_color`: White or charcoal (auto-contrast based on background)

**Structure:**
```
┌────────────────────────────────────────┐
│                                        │
│  [Headline]                            │
│  [Subtitle]                            │
│  [CTA Button]                          │
│                                        │
└────────────────────────────────────────┘
```

**Mobile:** Full-width, 60vh min-height on mobile, 70vh desktop. Text center-aligned. Button full-width on mobile.

---

### 3.2 Two-Column Section

**Variants:**
- Image left, text right
- Image right, text left
- No image (text only with background color)

**Props:**
- `title`: Section heading
- `description`: Body text (can include formatted paragraphs)
- `image_url`: Optional image
- `image_alt`: Alt text for accessibility
- `button_text`: Optional CTA
- `button_link`: Optional CTA target

**Structure:**
```
[Image]    [Title]
           [Description]
           [Button]
```

**Spacing:** 60px gap between columns (larger on desktop, 24px on mobile).

---

### 3.3 Three-Column Grid

**Used for:** Services, team, features, gallery.

**Props:**
- `items`: Array of {title, description, image_url, icon}
- `columns`: 3 desktop, 2 tablet, 1 mobile
- `gap`: 24px (default)

**Card structure:**
```
[Icon or Image]
[Title]
[Description]
[Optional Link]
```

**Spacing:** Cards have 1px border (client's border token), 24px padding, 0–3px hover lift (translateY).

---

### 3.4 Contact Form

**Fields:**
- Name (required, text)
- Email (required, email validation)
- Phone (optional, text)
- Message (required, textarea)
- Subject (optional, select or text)

**Behavior:**
- On submit: Store in Supabase + send email to client
- Success state: "Thanks! We'll be in touch." message
- Error state: Red border + error message below field
- Loading state: Button becomes disabled with spinner

**Accessibility:** Labels linked to inputs, focus states visible, error messages semantic.

---

### 3.5 Navigation

**Props:**
- `sticky`: Boolean (default: true)
- `logo`: Site title + pulse animation (or custom logo)
- `links`: Array of {label, href}
- `cta_button`: Optional secondary CTA

**Mobile behavior:** Hamburger menu at 768px breakpoint. Drawer slides in from left.

**Styling:** Background + text from client's design tokens. 1px bottom border. 16–32px padding.

---

### 3.6 CTA Button

**Variants:**
- Primary (brand color background, white text)
- Secondary (white background, brand color text, border)
- Ghost (transparent background, brand color text, on hover: light background)

**Sizes:**
- Small (12px padding, 12px font)
- Medium (16px padding, 14px font) — default
- Large (24px padding, 16px font)

**Hover:** Scale 1.05, shadow (optional), color shift (optional).

**Focus:** 2px solid brand color border, 2px offset.

---

### 3.7 Blog Post (Full Page)

**Structure:**
```
[Hero with featured image]
[Title]
[Metadata: Author, Date, Read time]
[Content (HTML from rich text editor)]
[Share buttons]
[Related posts (3-card grid)]
[CTA: Subscribe or Contact]
```

**Props:**
- `title`: Post heading
- `excerpt`: Short description (SEO meta, social preview)
- `content`: HTML from Supabase
- `featured_image`: Blog post image
- `author`: Author name (from settings)
- `published_date`: ISO date
- `category`: Blog category (optional)

---

### 3.8 Testimonial Carousel (Optional)

**Behavior:**
- Auto-advance every 6 seconds (or manual controls)
- Fade-in/fade-out between slides
- Show 1 slide mobile, 2 slides desktop

**Card structure:**
```
[Quote mark icon]
[Testimonial text]
[Author name]
[Author role/company]
[Star rating (optional)]
```

---

### 3.9 Footer

**Structure:**
```
[Company name/logo]
[Contact info: Phone, Email, Address]
[Quick links: About, Services, Blog, Contact]
[Social icons: LinkedIn, Instagram, Facebook]
[Copyright + site link]
[Language toggle (if bilingual)]
```

**Mobile:** Stacked layout, single column. Links arranged vertically.

---

## PART 4: ADMIN PANEL (CMS)

### Client Dashboard Flow

1. **Login**
   - Email + password via Supabase Auth
   - "Forgot password" link
   - Brand logo + site title displayed

2. **Dashboard Home**
   - "Welcome back, [Business Name]"
   - Quick actions: New post, New service, Manage testimonials
   - Recent activity feed (optional)

3. **Content Management**

   **Posts**
   - List view: Table with title, status (draft/published), date, actions
   - New/Edit form:
     - Title, slug (auto-generated), featured image upload
     - Rich text editor (Tiptap) for body content
     - Status dropdown (draft/published)
     - Publish date picker (optional)
     - Delete button
   - Preview: Open in new tab to see live site

   **Services**
   - List view: Cards or table, drag-to-reorder
   - New/Edit form:
     - Title, description, price (optional), icon picker
     - Order number (auto-assigned, drag-to-reorder in list)
   - Delete option

   **Testimonials**
   - List view: Cards with author name, quote excerpt
   - New/Edit form:
     - Author name, role/company, testimonial text
     - Star rating (1–5), image (optional)
     - Order number
   - Delete option

   **Team Members (if multi-page)**
   - List, edit, reorder
   - Upload image (Supabase Storage)

   **Gallery (if needed)**
   - Grid view of images
   - Drag-to-reorder
   - Upload new images
   - Delete images

4. **Site Settings**
   - Site title (displays in nav and footer)
   - Site description (SEO meta)
   - Business phone, email, address
   - Social links (Instagram, Facebook, LinkedIn URLs)
   - Brand color picker (hex input or color picker UI)
   - Logo upload (Supabase Storage)
   - Tagline/tagline text
   - Business hours (optional)

5. **Help/Support**
   - Link to video walkthroughs
   - FAQ (embedded or link)
   - "Contact Anthony" button

6. **Logout**

### Tech Stack (Admin)
- **UI Framework:** Next.js + React
- **UI Components:** shadcn/ui (pre-built, accessible, Tailwind-powered)
- **Forms:** React Hook Form + Zod (validation)
- **Rich text editor:** Tiptap (lightweight, extensible)
- **File uploads:** Supabase Storage client SDK
- **Authentication:** Supabase Auth (email/password)
- **Styling:** Tailwind CSS

---

## PART 5: BUILD WORKFLOW

### For Anthony (Designer/Builder)

**Timeline: ~3–4 hours from contract to live site**

1. **Setup** (15 min)
   - Clone client-site template from GitHub
   - Create new Vercel project linked to GitHub branch
   - Create Supabase user for client (email + temporary password)

2. **Customize** (45 min)
   - Update site title → `settings` table
   - Set primary brand color → `settings` table (or color picker in admin panel)
   - Upload logo → Supabase Storage
   - Add initial services (copy from demo spec) → `services` table
   - Write about/hero text → `settings` table
   - Update contact info (phone, email, address) → `settings` table

3. **Deploy** (15 min)
   - Push to GitHub
   - Vercel auto-deploys
   - Add custom domain (or use Vercel subdomain)
   - Test on mobile and desktop

4. **Handoff** (30 min)
   - Email client login credentials + admin panel link
   - Send 5-minute video walkthrough:
     - How to log in
     - How to edit a post
     - How to add a service
     - How to add a testimonial
     - How to update site settings
   - Offer 1 support call (optional)

5. **Client Takes Over**
   - Client logs in and manages content
   - You maintain infrastructure (Vercel + Supabase uptime)
   - Offer retainer (optional: $99/mo for email support + monthly updates)

---

## PART 6: DESIGN STANDARDS PER CLIENT TYPE

### Small Retail (Antique Shop, Bakery, Boutique)

**Homepage sections:**
1. Hero (image overlay or video background)
2. About / What We Carry (2-column with image)
3. Featured Products (3-column grid)
4. Hours & Location (2-column: hours table + Google Maps embed)
5. Testimonials carousel (optional)
6. Contact CTA

**Content types:** Blog (optional for updates/promotions), Services (product categories), Testimonials

**Animations:** Scroll reveals on "Featured Products" section. No parallax.

**Color:** One primary brand color (client's logo color or signature color).

---

### Service-Based (Consulting, Coaching, Agency)

**Homepage sections:**
1. Hero (text + CTA, minimal background)
2. Services (3-column card grid)
3. How It Works (numbered steps, 3-column layout)
4. Testimonials (carousel or static cards)
5. Blog / Case Studies (if applicable)
6. FAQ (accordion or simple Q&A)
7. Contact form

**Content types:** Blog (regular updates), Services (high detail), Testimonials, Team members (optional)

**Animations:** Scroll reveals on Services cards. Button hovers. No gratuitous motion.

**Color:** Professional, single brand color + neutrals.

---

### Multi-Service Business (Dental, Medical, Auto Repair)

**Pages:**
- Home (hero + services overview + testimonials + CTA)
- Services (individual pages per service, detailed)
- About (team members, credentials, story)
- Blog (health tips, industry news, etc.)
- Contact (form + hours + address + appointment CTA)

**Content types:** Blog, Services (detailed), Team members, Gallery (optional)

**Animations:** Minimal. Scroll reveals on hero and service cards only.

**Color:** Trust-building: blues, greens, or warm earth tones. One primary, rest neutral.

---

### Non-Profit / Community

**Pages:**
- Home (mission statement, impact numbers, how to help)
- About / Our Team
- Programs / Services
- Get Involved (volunteering, donations)
- Blog / News
- Contact / Location

**Content types:** Blog, Programs (like services), Team, Gallery

**Animations:** Minimal. Focus on clarity and accessibility.

**Color:** Warm, approachable. Single brand color.

---

## PART 7: VOICE & TONE FOR CLIENT SITES

**Principle:** Every client site should sound like the client, not like a generic web designer.

**But apply these rules:**

1. **No jargon.** If a customer needs a glossary, you've lost them.
2. **Short sentences.** Busy people scan. Make every word count.
3. **Confidence, not hype.** "We do X really well" beats "Industry-leading X solutions."
4. **Action words.** "Learn," "Try," "Book," "Call" — not "Explore," "Leverage," "Optimize."
5. **Local, not corporate.** If the client is in Kingman, AZ, celebrate that. Don't hide it.

**CTA Copy (examples):**
- ✅ "See our work"
- ✅ "Book an appointment"
- ✅ "Call us at (928) 555-1234"
- ✅ "Get started"
- ❌ "Leverage our solutions"
- ❌ "Explore our ecosystem"
- ❌ "Unlock growth potential"

---

## PART 8: PERFORMANCE & SEO STANDARDS

### Core Web Vitals (Lighthouse target ≥ 90)

- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

### Implementation

- Use Next.js Image component (auto-optimization)
- Lazy-load below-the-fold content
- Minimize CSS/JS (tree-shaking via Next.js)
- No external analytics bloat (use Vercel Web Analytics, which is lightweight)
- Compress images (WebP format, responsive sizes)

### SEO Basics

- Semantic HTML (h1 → h2 → h3 hierarchy)
- Meta descriptions (120–160 chars, unique per page)
- OG tags (title, description, image for social sharing)
- Sitemap auto-generated (Next.js)
- robots.txt configured
- Fast load times (helps ranking)

---

## PART 9: PLATFORM NON-NEGOTIABLES (Every Site, No Exceptions)

These rules apply regardless of client type, budget, or aesthetic. They are not optional and are not design choices — they are platform standards.

**For full implementation detail, see `NEW-SITE-SETUP-PROCESS.md` §3.**

### 9.1 Accessibility — WCAG 2.1 AA STRICT
- 4.5:1 contrast minimum for body text; 3:1 for large text (18px+ regular or 14px+ bold) and UI components
- Descriptive alt text on all content images
- `aria-label` on all icon-only interactive elements
- One `<h1>` per page; logical heading order; landmark regions
- Keyboard navigation — every element reachable and operable via Tab/Enter/Space
- Visible focus states — never `outline: none` without an equivalent replacement
- 44×44px minimum touch targets on mobile
- `<label for>` linked to every `<input>`
- `prefers-reduced-motion` honored for all animations

### 9.2 Language Switcher (Required — Not Yet Built)
Every site must ship with the infrastructure to switch language. English-only at launch is acceptable; the switcher must exist.

- Add `<!-- LANGUAGE_SWITCHER_PLACEHOLDER -->` in Navigation and Footer until the component is built
- All user-facing strings must be externalized to an i18n dictionary — no hardcoded copy in JSX
- Component location (once built): `packages/design-system/src/components/LanguageSwitcher.tsx`

### 9.3 Required Pages (Every Site)
Every site must have these pages seeded before launch:

| Slug | Title |
|------|-------|
| `home` | Home |
| `about` | About |
| `contact` | Contact |
| `terms` | Terms of Service |
| `privacy` | Privacy Policy |
| `cookies` | Cookie Policy |
| `accessibility` | Accessibility Statement |
| `use-of-ai` | Our Use of AI |
| `sitemap` | Sitemap |

### 9.4 Production Code Standards
- No `console.log` in production code
- No devDependencies in the production bundle
- All images via `next/image` — no raw `<img>` tags
- `tsc --noEmit` + ESLint clean before every deploy

---

## PART 9B: ACCESSIBILITY — QUICK REFERENCE

- **Color contrast:** 4.5:1 for normal text, 3:1 for large text — verified per client's actual color tokens
- **Focus states:** Visible 2px outline in client's primary brand color
- **Touch targets:** Minimum 44×44px for buttons/links
- **Alt text:** Descriptive and content-specific (not filenames, not "image")
- **Semantic HTML:** `<button>`, `<a>`, `<form>`, proper heading order
- **Keyboard navigation:** All interactive elements reachable via Tab
- **Form labels:** `<label for="...">` linked to every `<input>`

**Tool:** Run axe DevTools on every page before launch. Target zero Critical and Serious violations.

---

## PART 10: DEPLOYMENT CHECKLIST

Before handing to client:

- [ ] All text proofread and spell-checked
- [ ] Images optimized and compressed
- [ ] Mobile layout tested (375px, 768px, 1024px breakpoints)
- [ ] Form validation working (success + error states)
- [ ] Contact form sends emails to client
- [ ] Navigation links tested
- [ ] Lighthouse score ≥ 90
- [ ] Meta tags filled in (title, description, OG image)
- [ ] Favicon set
- [ ] 404 page customized (or working default)
- [ ] Analytics tracking in place (optional: Vercel Web Analytics)
- [ ] Sitemap and robots.txt verified
- [ ] Admin panel tested (client can log in and edit)
- [ ] Custom domain pointing correctly

---

## PART 11: CONTENT TEMPLATES (BY TYPE)

### Blog Post Template

```
Title: [Clear, benefit-driven headline]
Excerpt: [2 sentences, appears in listings and social preview]
Featured Image: [1200x630px, optimized]

Content:
├─ Opening (hook, 1-2 sentences)
├─ Problem (what's the issue?)
├─ Solution (how we solve it)
├─ Steps/Details (3-5 clear sections)
├─ Testimonial or example (optional)
└─ CTA (book, call, read more)

Meta:
├─ Author: [Client name or team]
├─ Date: [Published date]
├─ Category: [Tag for grouping]
└─ Keywords: [For SEO, 3-5 terms]
```

### Service/Product Card

```
Title: [What is it?]
Description: [2-3 sentences, what's the benefit?]
Icon or Image: [Illustrates the service]
Price: [Optional, if applicable]
CTA: [Learn more / Book now / Add to cart]
```

### Testimonial

```
Quote: [Real customer quote, 1-2 sentences]
Author: [Full name]
Role: [Job title or relationship to business]
Rating: [1-5 stars, optional]
Image: [Optional client photo]
```

### FAQ Entry

```
Question: [Client's actual question, clear and specific]
Answer: [Concise explanation, 2-4 sentences]
CTA: [Optional, if answer leads to action]
```

---

## PART 12: QUICK REFERENCE (FOR ANTHONY)

### When building a new site:

1. **Clone template** → Update Git branch name
2. **Customize design** → Primary color, logo, content
3. **Deploy** → Push to GitHub, Vercel auto-deploys
4. **Create user** → Supabase Auth, send credentials
5. **Send video** → 5-minute walkthrough
6. **Done** → Client manages content, you monitor uptime

### Color system reminder:
- 95% neutral (client's canvas + text tokens)
- 5% brand color (buttons, accents, links)
- Colors come from Claude Design Phase 0 — never invented in code
- Use CSS variables (`--tok-*`) — never hardcode hex values in components

### Typography reminder:
- Heading + body fonts chosen in Phase 0 for this client specifically
- Max 2 typefaces per site
- Line height 1.6 (body), 1.2 (headlines)
- Min 14px body size

### Animation reminder:
- One moving element per page MAX
- Scroll reveals (fade + slide) on key sections
- Button hovers (scale + color)
- Nothing longer than 1 second

### Voice reminder:
- Plain language always
- Short sentences
- Action words ("Book," "Call," "Learn")
- No corporate jargon

---

## GETTING STARTED

### Phase 1: Build core infrastructure
1. Set up Next.js repo (monorepo structure)
2. Set up Supabase project (schema + RLS)
3. Create client-site template (all components)
4. Create admin-panel template (dashboard + CRUD)
5. Deploy template to Vercel

### Phase 2: Build first client site (internal test)
1. Follow build workflow above
2. Test admin panel (create post, edit service, etc.)
3. Test form submission (email + Supabase)
4. Test mobile responsiveness
5. Verify Lighthouse score

### Phase 3: Document and package
1. Create video walkthroughs (login, edit, add content)
2. Write client onboarding email
3. Create admin panel FAQ
4. Package skill for reuse

### Phase 4: First real client
1. Use workflow to build site (3–4 hours)
2. Hand off to client
3. Collect feedback
4. Iterate on process

---

**End of Skill Document**
