# Connected CMS — Digital Allies Client Site Platform

A multi-tenant CMS admin panel built with Next.js 15 + Supabase. The goal is a platform Anthony can use to manage his own site and eventually sell to clients as a hosted website + CMS subscription — a direct replacement for Duda.

---

## The Vision

**Phase 1 (now):** Connect the existing `digitalallies.net` site to the CMS admin so Anthony can publish blog posts, update services, manage testimonials, and handle bilingual content without hand-coding everything from scratch.

**Phase 2:** Onboard paying clients. Each client gets a Vercel-hosted website (built in this CMS) and their own admin panel login to manage it themselves.

**This is not Duda. It's better.** Anthony owns the infrastructure, the code, and the client relationships. No platform lock-in.

---

## Three Repos

| Repo | Purpose | GitHub | Current URL | Target |
|---|---|---|---|---|
| **This repo** | CMS admin panel (Next.js) | [cassellac/da-webwssite-build-workflows](https://github.com/cassellac/da-webwssite-build-workflows) | [da-webwssite-build-workflows.vercel.app](https://da-webwssite-build-workflows.vercel.app/) | admin.digitalallies.net or separate Vercel URL |
| **DA Public Site** | The real digitalallies.net — DO NOT REPLACE | [Digital-Allies/DigitalAllies](https://github.com/Digital-Allies/DigitalAllies) | `digitalallies.net` (GitHub Pages) | Move to Vercel, stays visually identical |
| **Design System** | DA brand + component reference (static HTML) | Inside this repo or separate | [digital-allies.github.io/design-system](https://digital-allies.github.io/design-system/) | Deploy to Vercel separately |

---

## Architecture: How the CMS Connects to the Existing Site

**The `digitalallies.net` site is NOT being replaced.** Its HTML, CSS, design, and language switcher stay exactly as-is. The CMS connects to it by adding Supabase reads for dynamic content.

```
┌─────────────────────────────────┐     ┌────────────────────────────────────┐
│  CMS Admin (this repo)          │     │  digitalallies.net (DigitalAllies) │
│  da-webwssite-build-workflows   │     │  Existing static HTML/CSS/JS site  │
│                                 │     │  Visual design stays 100% intact   │
│  Anthony logs in, writes a      │────▶│                                    │
│  blog post, hits Publish        │     │  A JS snippet fetches published    │
│                                 │     │  posts from Supabase and renders   │
│  Data saved to Supabase         │     │  them into the existing blog       │
└─────────────────────────────────┘     │  section layout                    │
              │                         └────────────────────────────────────┘
              ▼
    ┌──────────────────┐
    │  Supabase        │
    │  posts           │
    │  services        │
    │  testimonials    │
    │  settings        │
    │  (scoped by      │
    │   client_id)     │
    └──────────────────┘
```

**What "connecting" the existing site means in practice:**

1. Add `@supabase/supabase-js` to the `DigitalAllies` repo (CDN script tag or npm)
2. Replace any hardcoded blog post list with a JS fetch from the `posts` table
3. Optionally fetch `services` and `testimonials` to replace those hardcoded sections too
4. The bilingual content (EN/ES) will eventually be managed through the CMS rather than hand-coded
5. The "View Live Site" link in the CMS admin opens `digitalallies.net`

The existing site's HTML structure, CSS, animations, language switcher, and all custom code stay exactly as-is. Supabase just feeds the dynamic content into the existing layouts.

---

## Admin Panel Design Reference

The admin panel UI follows the **Connected CMS prototype** (`cms-suite` repo). That prototype defines the exact visual language for everything inside the admin — dashboard layout, sidebar nav, card components, form fields, status indicators, the EN|ES toggle, the Technical Lace grid, all of it.

**The prototype is the admin design spec.** Any work done on the admin panel's UI should match it. The admin is NOT a generic Next.js CRUD interface — it has a specific look that was deliberately designed.

The `cms-suite` prototype is at: `/Users/cuus/Claude/projects/cms-suite`

What "Toggle to Live Site" does in the admin: opens `digitalallies.net` — the real, existing public website. It does NOT show a Next.js-generated page.

---

## Two Client Types

### Type A: Existing site (DA's own site)
Client already has a designed, coded website. The CMS connects to it via Supabase JS reads. The public site stays in its own repo with its own design.

### Type B: New client (no existing site)
The CMS builds their public site too. The Next.js public components (Navigation, Hero, ThreeColumnGrid, etc.) in this repo generate their full website. One admin panel, one deployment, done.

The `da-webwssite-build-workflows` repo supports both types. For DA's own site right now, it's Type A.

---

## Onboarding a New Client

No new repo needed. Same codebase, new Vercel deployment, new `CLIENT_ID`. Here's the full flow:

**Step 1 — Add them to Supabase**

In Supabase SQL Editor, insert their client row and seed their content:

```sql
-- Generate a UUID at https://www.uuidgenerator.net or use gen_random_uuid()
INSERT INTO clients (id, name, slug, domain)
VALUES ('YOUR-NEW-UUID', 'Client Name', 'client-slug', 'clientdomain.com');

INSERT INTO settings (client_id, key, value) VALUES
  ('YOUR-NEW-UUID', 'site_title', 'Client Name'),
  ('YOUR-NEW-UUID', 'brand_color', '#HEX'),
  ('YOUR-NEW-UUID', 'hero_title', 'Their headline here'),
  ('YOUR-NEW-UUID', 'phone', '(555) 000-0000'),
  ('YOUR-NEW-UUID', 'email', 'hello@clientdomain.com');
```

**Step 2 — Deploy to Vercel**

1. Go to Vercel → Add New Project → Import `cassellac/da-webwssite-build-workflows`
2. Set env vars (same as DA's, but with the new CLIENT_ID):
   - `NEXT_PUBLIC_CLIENT_ID` = their UUID
   - `NEXT_PUBLIC_SITE_URL` = `https://clientdomain.com`
   - All Supabase keys stay the same (shared Supabase project)
   - `CONTACT_FORM_TO_EMAIL` = their email or Anthony's for now
3. Deploy

**Step 3 — Domain**

Point their domain's DNS at Vercel. Add the custom domain in Vercel project settings.

**Step 4 — Admin access**

Supabase → Authentication → Users → Invite → their email address.
They log in at `https://clientdomain.com/admin`.

**Step 5 — Populate content**

Either Anthony fills it in through the admin, or the client does themselves after login.

---

That's it. Every client runs on the same codebase. Supabase RLS ensures they only ever see their own data.

---

## Current Status

**CMS admin deploys successfully on Vercel.** The build works, all 7 env vars are set.

**The CMS looks empty** because the Supabase seed data hasn't been run yet. Two SQL files need to be run in Supabase SQL Editor to populate DA's settings and content.

**The `digitalallies.net` site is not yet connected to Supabase.** That work happens in the `DigitalAllies` repo after the CMS admin is fully set up.

### What's done

- Full Next.js 15 app (TypeScript, Tailwind, App Router, ISR)
- DA brand design system wired throughout: Bone White, Charcoal, Signal Red, Pulse Blue, Technical Lace grid, Lexend Deca + JetBrains Mono
- Admin area with dashboard, posts editor (Tiptap rich text), services, testimonials, settings pages
- Public-facing components for Type B clients: Navigation, Hero, ThreeColumnGrid, TestimonialCarousel, TwoColumn, ContactForm, Footer
- Supabase schema: 8 tables, RLS, row-level security scoped by `client_id`
- Contact form wired to Resend
- All env vars set in Vercel
- `sync.command` in this folder — double-click in Finder to pull/push to GitHub

### What needs to happen next (in order)

**Step 1 — Finish the CMS admin setup**

1. **Run `supabase/seed-da.sql`** in Supabase SQL Editor  
   Inserts DA's client row, settings (Signal Red brand, hero copy, phone, email, about text), 3 services, 2 placeholder testimonials.

2. **Run `supabase/security-fixes.sql`** in Supabase SQL Editor  
   Patches two real security warnings on `get_my_client_id()`.

3. **Enable leaked password protection** in Supabase  
   Authentication → Providers → Email → enable "Leaked password protection."

4. **Create the admin user in Supabase**  
   Authentication → Users → Invite → `contact@digitalallies.net`. Required to log into `/admin`.

5. **Push to GitHub and redeploy on Vercel**  
   Use `sync.command` (double-click in Finder) to push latest code. Trigger redeploy in Vercel.

**Step 2 — Move `digitalallies.net` to Vercel**

6. Import `Digital-Allies/DigitalAllies` into Vercel (static HTML, no build command needed)
7. Update Cloudflare DNS to point `digitalallies.net` at that Vercel deployment (removes GitHub Pages dependency)

**Step 3 — Connect the existing site to Supabase**

8. Add Supabase JS client to the `DigitalAllies` repo
9. Replace hardcoded blog section with a Supabase fetch for published posts
10. Optionally connect services/testimonials sections to Supabase data
11. Update `NEXT_PUBLIC_SITE_URL` env var in Vercel from the preview URL to `https://digitalallies.net`

**Step 4 — Handoff and polish**

12. Replace the 2 placeholder testimonials in the CMS admin at `/admin/testimonials`
13. Fix language switcher on 3 article pages (`alttext.html`, `seo-aeo.html`, `video-training.html`) — needs `data-en`/`data-es` attributes and Spanish translations added
14. Apply SEO updates from `/Users/cuus/Claude/PROJECTS/da-seo-updates.md`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS + custom DA design tokens in `src/styles/globals.css` |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (`@supabase/ssr`) |
| Email | Resend |
| Rich text editor | Tiptap |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |
| Fonts | Lexend Deca + JetBrains Mono (Google Fonts, loaded in globals.css) |

---

## Environment Variables

Set in Vercel project settings and in `.env.local` for local dev (not committed to git).

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://auwhvicpyiwsubucanpb.supabase.co` | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (in .env.local) | Public — safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | (in .env.local) | **Sensitive** — never expose client-side |
| `NEXT_PUBLIC_CLIENT_ID` | `3d76b896-e1fb-49f0-a8db-f62fdd5bc258` | DA's UUID in Supabase `clients` table |
| `NEXT_PUBLIC_SITE_URL` | `https://da-webwssite-build-workflows.vercel.app` | Update to `https://digitalallies.net` after domain switch |
| `CONTACT_FORM_TO_EMAIL` | `acinktown@gmail.com` | |
| `RESEND_API_KEY` | (in .env.local) | **Sensitive** |

---

## DA Brand Tokens

Defined in `src/styles/globals.css` and `tailwind.config.js`.

| Token | Hex | Use |
|---|---|---|
| Bone White | `#F9F6F0` | Canvas / backgrounds |
| Charcoal | `#2D2D2D` | Text, borders, structure |
| Signal Red | `#C5301A` | Primary CTAs, `--brand` default, alerts |
| Pulse Blue | `#3A7BD5` | Links, admin nav, animated logo dot |
| Technical Lace | — | 20px grid at 7% opacity — `.grid-overlay` CSS class |

`--brand` is injected on `<body>` from `settings.brand_color` in Supabase. Defaults to Signal Red if no settings row exists.

---

## Key Files

```
src/
├── app/
│   ├── layout.tsx          ← Root layout; injects --brand CSS var
│   ├── page.tsx            ← Public homepage (for Type B clients)
│   └── admin/              ← Admin panel (auth-gated)
├── components/
│   ├── site/               ← Public components for Type B clients
│   └── admin/              ← Admin UI components
├── lib/
│   ├── data.ts             ← Supabase fetchers, all scoped by CLIENT_ID
│   ├── supabase-server.ts  ← Server client using @supabase/ssr
│   └── types.ts            ← TypeScript types + parseSettings() + DEFAULT_SETTINGS
└── styles/
    └── globals.css         ← All DA tokens, component classes, full admin CSS

supabase/
├── schema.sql              ← Already run — creates all 8 tables
├── seed-da.sql             ← ⚠ NEEDS TO BE RUN — populates DA content
└── security-fixes.sql      ← ⚠ NEEDS TO BE RUN — patches security warnings
```

---

## Supabase Project

- **URL:** `https://auwhvicpyiwsubucanpb.supabase.co`
- **DA Client UUID:** `3d76b896-e1fb-49f0-a8db-f62fdd5bc258`
- Schema is already applied. `clients` table has two rows — only `3d76b896...` is active. The other (`19147f36...`) is a stale test row, safe to delete.

---

## Vercel Project (CMS Admin)

- **Project ID:** `prj_cPSPjfdY9dac5qdzTupDb2FEgVQD`
- **Live URL:** `https://da-webwssite-build-workflows.vercel.app`
- **Target:** This will eventually become the admin panel URL. `digitalallies.net` points at the existing static site, not this app.

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000/admin
```

```bash
npx tsc --noEmit   # TypeScript check, no build needed
```
