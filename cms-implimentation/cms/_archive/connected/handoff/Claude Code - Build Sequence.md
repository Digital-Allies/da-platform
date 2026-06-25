# Handoff: Digital Allies — Connected CMS (Phase 1)

> Paste the **Kickoff message** below as your first message to Claude Code (or Claude Cowork). Then each working day, paste that day's prompt. One day, one prompt.

---

## Kickoff message (paste first, once)

```
You're my engineering partner building the Digital Allies Connected CMS. I drive, you write the code — keep explanations short and give me exact commands and clicks.

THE GOAL (Phase 1): a connected loop. I edit a page in the admin ("the Press Office") and the live site digitalallies.net changes. One client (Digital Allies, my own agency) for now, but keep the seams for multi-client + plan-gating later.

STACK: Next.js (App Router, TypeScript, Tailwind) on Vercel · Supabase for Postgres + Auth + Storage · GitHub for source. I work online-first — I do not keep a local checkout, so prefer a GitHub Codespace / cloud workflow over local commands, and when something must run in a terminal assume it is a Codespace terminal.

BRAND: square corners, 1px charcoal borders, ruled-paper grid, Lexend Deca headers + JetBrains Mono body. Bone White #F9F6F0 / Charcoal #2D2D2D / Pulse Blue #3A7BD5 / Signal Red #C5301A. No emoji, no gradients. Voice is plain, dry, confident — bracketed CTAs like [ Send a Transmission ]. The admin uses brand nouns: Press Office, The Departments, Command Center, transmissions.

REFERENCE FILES I'll share: the prototype + design system (visual target), store.js (the data model), and the Build Plan (architecture). Read them before building.

We go one focused task per day over ~4 weeks; I'll paste a specific prompt each day. Today, just confirm you understand the goal and tell me which reference files you want first.
```

---

## The build sequence — one prompt per working day

### Week 1 — Lay the rails
_Repo, deploy pipeline, and a database — connected and shipping a skeleton._

#### Day 01 · Repo + Next.js skeleton
*Goal: A real codebase, version-controlled. (~120 min)*

```
You're helping me build the Digital Allies Connected CMS — Next.js (App Router, TypeScript, Tailwind) on Vercel, Supabase for data + auth. Scaffold a fresh Next.js app in this folder. Set up a clean folder structure I can grow into (an (admin) group for the auth-gated workspace, a (site) group for the public renderer, lib/ for data + plans). Get it running locally, then give me the exact git commands to make the first commit on `main` and create a `develop` branch. Keep explanations short — I'm driving you, not writing the code myself.
```

**Done when —** `npm run dev` serves the starter on localhost. / GitHub shows the Next.js starter on a green first commit.

#### Day 02 · Vercel auto-deploy + previews
*Goal: Every push deploys itself. (~90 min)*

```
My Next.js repo is on GitHub and imported into Vercel. Walk me through confirming auto-deploy works: how to verify `main` is the production branch, how to trigger and find a Preview deploy from a pull request, and where build settings live. Give me a tiny throwaay change to push on a branch so I can see a preview URL appear. List the exact clicks in the Vercel dashboard — assume I'm looking at it right now.
```

**Done when —** The live URL shows your starter. / Pushing main redeploys prod; a PR gives a preview URL.

#### Day 03 · Supabase project + wiring
*Goal: Database created and reachable from the deploy. (~135 min)*

```
Help me connect Supabase to my Next.js app on Vercel. I've created a Supabase project. Tell me exactly which keys to copy (URL, anon, service-role) and which to mark public vs server-only. Install `@supabase/supabase-js` and `@supabase/ssr` and create the browser + server client helpers in lib/. Then give me the Vercel CLI commands to set the env vars for all three environments and to pull them locally with `vercel env pull`. Finish by writing me a one-line test that proves the deployed app can reach Supabase.
```

**Done when —** `NEXT_PUBLIC_SUPABASE_URL`, anon key, and service key all present. / A deployed test page reads a value from Supabase with no errors.

#### Day 04 · The map + brand tokens in-repo
*Goal: Claude can re-read the plan and build to the brand each day. (~110 min)*

```
Read the files in /reference (store.js and the Build Plan) so you understand the data model and target architecture. Then: (1) wire the Digital Allies brand tokens into the app — add colors_and_type.css and the Lexend Deca + JetBrains Mono fonts to global styles so pages render in the brand; (2) write a short ARCHITECTURE.md from the Build Plan's Vercel layout that you and I can both re-read each day. Show me a single styled test page proving the fonts and charcoal/bone colors are live.
```

**Done when —** A page styled with brand vars renders in Lexend Deca + JetBrains Mono. / Repo has brand tokens loaded and an architecture note.

#### Day 05 · Magic-link auth
*Goal: You can log in; strangers can't. (~135 min)*

```
Set up magic-link auth for the Digital Allies CMS using Supabase + @supabase/ssr. Build a /login page (brand-styled, square corners, JetBrains Mono), the sign-in action that sends a magic link, the callback handler, and middleware that protects every route in the (admin) group and redirects logged-out users to /login. Tell me exactly what to set for Site URL and redirect URLs in the Supabase Auth dashboard (localhost + my vercel.app URL) and how to add myself as the first user.
```

**Done when —** You click the email link, land on a protected `/dashboard` stub; logged-out users bounce to `/login`.


### Week 2 — The store
_Translate the prototype's data shape into a real, secured Supabase database — seeded with the real site._

#### Day 06 · Schema: clients + settings
*Goal: The tenant record the whole model hangs off. (~120 min)*

```
Using store.js in /reference as the source of truth for shape, write the SQL to create a `clients` table (id, name, domain, initials, brand_color, plan enum starter|studio|agency, owner boolean, live_url, admin_url) and a place to store per-client site settings (hero, about, phone, email, hours — JSONB is fine). Give me the migration to paste into the Supabase SQL editor, then a seed insert for the Digital Allies client (owner=true, plan=agency) using the DA_SETTINGS values from store.js.
```

**Done when —** The clients + settings rows are visible in the Table editor.

#### Day 07 · Schema: content collections
*Goal: Somewhere for every kind of content to live. (~120 min)*

```
Continue the Supabase schema for the Digital Allies CMS. Create the content tables, each with a `client_id` foreign key to clients: `pages` (with a `blocks` JSONB column), `articles`, `departments`, `field_notes`, `messages`. Add the columns the prototype uses (slug, status, excerpt, etc.) and indexes on (client_id, slug) and (client_id, status). Give me one migration to paste into the SQL editor and a quick checklist to confirm the tables and FKs in the Table editor.
```

**Done when —** All five tables exist with the right columns + FKs.

#### Day 08 · Seed the real site
*Goal: The actual Digital Allies content, in the database. (~110 min)*

```
Write a seed script that loads the real Digital Allies content from /reference/store.js (DA_PAGES, plus its articles, departments, and field notes) into my Supabase tables for the Digital Allies client. Preserve the page blocks exactly as JSONB. Make it idempotent so I can re-run it safely. Tell me how to run it and give me one SQL query I can paste to confirm the Home page came back with its hero / departments / fieldNotes / cta blocks intact.
```

**Done when —** Querying pages for DA returns the Home page with its hero / departments / fieldNotes / cta blocks intact.

#### Day 09 · RLS — the security boundary
*Goal: Drafts stay private; published is public; tenants never cross. (~135 min)*

```
Lock down the Digital Allies CMS database with Row Level Security. First add a `memberships` table linking auth users to clients. Then enable RLS on clients and all content tables and write policies so: (a) a member can read and write rows for their client; (b) the anon role can read ONLY rows where status = 'published'; (c) nobody can read another client's data. Give me the SQL to paste, then exact steps to verify with the anon key that drafts are invisible and writes are rejected. This is irreversible-ish — explain anything risky before I run it.
```

**Done when —** The anon key can read published pages but cannot see drafts or write anything.

#### Day 10 · lib/store.ts — the swap
*Goal: The prototype's data functions, now backed by Postgres. (~135 min)*

```
Build lib/store.ts — the data-access layer for the Digital Allies CMS — exposing the same functions the prototype's store.js had (getSite, getPages, getPage, savePage, getArticles, saveArticle, getDepartments, getFieldNotes, getMessages, getSettings, saveSettings), but backed by Supabase queries scoped to a client_id. Also write lib/plans.ts with the three tiers and a `can(client, module)` helper. Then show me a server component that calls getPages() and renders the real Digital Allies page titles from the database.
```

**Done when —** A page calls getPages() and lists the real page titles from Supabase.


### Week 3 — The Press Office
_Port the admin workspace so it reads and writes the live database — the half you'll actually use every day._

#### Day 11 · Admin shell + dashboard
*Goal: The workspace frame, with real numbers. (~120 min)*

```
Port the admin workspace shell from the prototype into the (admin) layout: the side nav, top bar, and client identity, all brand-styled (charcoal/bone, square corners, Lexend Deca headers). Build the Dashboard as the landing screen with live counts — total pages, drafts, unread transmissions — read through lib/store.ts. Match the look of the prototype in /reference. Show me /dashboard rendering real numbers from Supabase.
```

**Done when —** Logged-in `/dashboard` shows real counts from Supabase in the brand shell.

#### Day 12 · Pages list + builder (read)
*Goal: See the real pages and their blocks. (~120 min)*

```
Build the Press Office Pages module for the Digital Allies CMS. A list view of pages (title, slug, status badge, last updated) and, on opening a page, a block renderer that shows its blocks (hero, richtext, departments, fieldNotes, cta) read-only for now, reading through lib/store.ts. Keep it brand-styled. Show me the seeded Home page rendering its blocks in the correct order.
```

**Done when —** Opening the Home page shows its blocks in order.

#### Day 13 · Page builder (write)
*Goal: Edits that stick. (~135 min)*

```
Make the Digital Allies page builder editable. Wire up: reordering blocks (drag or up/down), editing each block's data inline, adding and removing blocks, and a Save that writes the blocks array back to the page's JSONB column via lib/store.ts. Add a draft/published status toggle. Optimistic UI is fine. Show me that editing the hero heading and saving changes the row in Supabase and survives a page reload.
```

**Done when —** Editing the hero heading and saving changes the row and survives a reload.

#### Day 14 · Articles + Settings
*Goal: The Journal and the site's own knobs. (~135 min)*

```
Build two more Press Office areas for the Digital Allies CMS. (1) Articles (The Journal): a list plus an editor with title, slug, excerpt, content, and a draft/published toggle, all through lib/store.ts. (2) Site Settings: a form bound to the client's settings record (hero title/subtitle, about, phone, email, hours) that saves back to Supabase. Brand-styled. Show me publishing an article and editing a setting, both persisting after reload.
```

**Done when —** You can publish an article and edit settings, both persisting.

#### Day 15 · Command Center + polish
*Goal: The inbox, and a workspace that feels finished. (~120 min)*

```
Finish the Press Office. Build the Command Center: a read-only inbox listing transmissions (the `messages` table) with read/unread state and a detail view. Then polish the workspace — tidy the nav, add empty states in the brand voice, and stub a lock icon next to Studio+ modules (Projects, Research, Workshop) using the can() helper, even though they're hidden in Phase 1. Walk the whole edit → save → reload loop with me and flag anything rough.
```

**Done when —** The admin matches the prototype and is backed entirely by the database.


### Week 4 — Go live
_Render the public site from the same store, wire the domain and email, and close the loop on the real digitalallies.net._

#### Day 16 · Public renderer
*Goal: The site, drawn from the database. (~135 min)*

```
Build the public site renderer for the Digital Allies CMS at (site)/[client]. Create a block registry that maps each block type (hero, richtext, departments, fieldNotes, cta) to a brand-styled React component, reading ONLY published data through lib/store.ts (no auth). The departments and fieldNotes blocks should pull their live collections. Render the real Digital Allies Home page from Supabase at a public URL and show it to me.
```

**Done when —** A public URL renders the real Home page from Supabase, no auth.

#### Day 17 · Full site parity
*Goal: It looks like digitalallies.net — because it is. (~135 min)*

```
Extend the public renderer to full parity with digitalallies.net. Render the About page, the Services page when published, and individual article pages. Make sure departments and field notes pull live from their tables. Use the Digital Allies design system components and tokens so it matches the brand exactly — don't hand-roll CSS where a brand component exists. Show me the public site reading entirely from the store and looking like the real site.
```

**Done when —** The public site matches the brand and reads entirely from the store.

#### Day 18 · The transmission loop
*Goal: The contact form actually reaches you. (~120 min)*

```
Wire the contact form (Send a Transmission) on the public Digital Allies site to do two things on submit: insert a row into the `messages` table, and send a transactional email to contact@digitalallies.net. Recommend Resend vs Supabase SMTP for a one-person setup and set up whichever is simpler. Put the API key in Vercel env. Use a server action. Show me that a submission creates a message row, emails me, and appears in the admin Command Center inbox.
```

**Done when —** Submitting the form creates a row, emails you, and shows in the admin inbox.

#### Day 19 · Domain + DNS cutover
*Goal: The real address, pointed at the new site. Do this early in the day. (~110 min)*

```
Help me point digitalallies.net at this Vercel deployment safely — this is a live cutover, so go slow and tell me what's reversible. Walk me through: adding digitalallies.net and www to the Vercel project, the exact A/CNAME records to set at my registrar, how to verify propagation, and updating Supabase Auth Site URL + redirect URLs to the real domain. Keep the old site reachable until the new one is verified over HTTPS and magic-link login works on the real domain.
```

**Done when —** https://digitalallies.net serves the new site over HTTPS and magic-link login still works.

#### Day 20 · Launch QA + cut over
*Goal: Close the loop. Ship it. (~135 min)*

```
Run final launch QA on the Digital Allies CMS with me. Give me a tight checklist to verify: every public page loads, the contact form works end-to-end, login works on digitalallies.net, drafts stay hidden from anon, mobile layout holds, and Lighthouse is reasonable. Then give me the commands to do a clean production deploy from `main` and tag a `v1` release on GitHub. Finally, confirm the connected loop: I edit a page in the Press Office and digitalallies.net changes.
```

**Done when —** The connected loop is live. Phase 1 shipped.

---

## How this maps to your week
- **Mon–Fri:** one prompt above, ~135 min, end with a commit + a green Vercel deploy.
- **Sat–Sun:** review only (skim commits, confirm deploys, back up the DB) — no new prompts.
- Interactive checklist with copy buttons: **Connected CMS - 30-Day Run.html**.
- Calendar (28 days + alarms for Apple Calendar): **Digital Allies CMS - 30-Day Run.ics**.

*Phase 2 (multi-client, plan gating, Stripe billing, The Workshop) is intentionally out of scope here — additive once the loop is live.*
