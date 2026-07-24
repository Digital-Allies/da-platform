# DA Platform — Master Context & Operations Plan
**Generated:** 2026-07-23 by Cowork session (full history synthesis)  
**Read this before every session. Update after every major change.**

---

## 1. WHO, WHAT, WHERE

**Anthony Cassella** — Digital Allies / Code Unicorn LLC, Kingman AZ.  
One-person shop. Zero paying clients as of July 2026 — everything bootstrapped.  
Strongest asset: project coordination and execution, not design or development.  
Pitch: "I coordinate and execute. I get things done and I don't disappear."

---

## 2. THE STACK (what exists, what's live, what's broken)

### Repos

| Repo | Purpose | Status |
|------|---------|--------|
| `Digital-Allies/da-platform` | Main monorepo — CMS engine + client sites + design system | Active build |
| `Digital-Allies/DigitalAllies` | Separate static site — what actually deploys to digitalallies.net | Live; has 2 known bugs (see §3) |
| `Digital-Allies/design-system` | Shared design system | Also at `~/Claude/projects/design-system/` |
| `cassellac/*` | Old standalone tools/demos | Out of scope — not tracked here |

### Local paths
- Monorepo: `/Users/cuus/Claude/projects/da-platform`
- CMS engine: `/Users/cuus/Claude/projects/da-platform/tools/build-workflows`
- Atomic Finds site: `/Users/cuus/Claude/projects/da-platform/sites/atomic-finds`

### Live URLs

| What | URL | Notes |
|------|-----|-------|
| CMS admin | https://cms.digitalallies.net → `/admin/login` | Live, working auth |
| Vercel project (CMS) | https://vercel.com/digital-allies/da-webwssite-build-workflows | Root dir: `tools/build-workflows` |
| GitHub (monorepo) | https://github.com/Digital-Allies/da-platform | Private |
| Live marketing site | https://digitalallies.net | Separate static repo |
| Atomic Finds live | atomic-finds-atx.vercel.app (or custom domain) | **Broken — wrong deploy branch (see §3 P0)** |
| Supabase | (login via Supabase dashboard) | Anon key: `sb_publishable_...` format |
| Claude Design — DA | https://claude.ai/design/p/6119845f-97e8-4b42-899f-193545fca758?via=share | Design system + CMS mocks |
| Claude Design — Atomic Finds | https://claude.ai/design/p/29110ac3-0a76-4fa1-a322-a78bc212a50d?via=share | Storefront design |
| CMS design mocks | https://claude.ai/design/p/6119845f-97e8-4b42-899f-193545fca758?file=cms%2Findex.html&via=share | Build process docs live here |

### Three tenants in the CMS

| Client | `client_id` | Domain | Status |
|--------|-------------|--------|--------|
| Digital Allies | (in Supabase clients table) | digitalallies.net | Live static; CMS wiring broken (see §3) |
| Healthcare Training Center | `7896354c-1d34-4649-85f5-51f2e5a7df6c` | HCTC Vercel URL | Placeholder; no deep build |
| Atomic Finds ATX | `443936d5-f92e-480b-b206-c65cfb52bdfc` | atomic-finds-atx | **Wrong deploy branch — P0** |

### Env vars (what matters)

Every Vercel project needs these set manually — they do NOT sync from `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — must be `sb_publishable_...` format, NOT legacy JWT
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_CLIENT_ID`
- `NEXT_PUBLIC_SITE_URL`
- `CONTACT_FORM_TO_EMAIL`
- `RESEND_API_KEY`

---

## 3. OPEN BUGS & BLOCKERS (priority order)

### P0 — Atomic Finds deploying wrong branch
**Root cause:** Vercel `atomic-finds-atx` project is set to branch `claude/products-table-review-fixes-doa26m` (PR #4's stale branch), not `main`. 22 commits of work are invisible on production.

**Anthony click (required):** Vercel → `atomic-finds-atx` → Settings → Git → Production Branch → change to `main` → trigger redeploy.

---

### P1 — digitalallies.net/learn is silently broken
**Root cause:** `Digital-Allies/DigitalAllies` repo's `assets/js/cms-loader.js` has had a `ReferenceError` since commit `f77d1596` (2026-07-16). The `SUPABASE_ANON_KEY` constant was renamed to `supabase_anon_new` but two references in the `headers` object still use the old name. Script throws before it runs → `#learn-articles-grid` shows "Loading articles..." permanently.

**Fix (in `Digital-Allies/DigitalAllies` repo, NOT da-platform):** Change the two `SUPABASE_ANON_KEY` references inside the `headers` object to `supabase_anon_new`. While in the file, add `escapeHtml()` wrapping (diff pattern: `da-platform` commit `6876c63`).

---

### P2 — digitalallies.net homepage no longer CMS-connected
**Root cause:** PR #52 (2026-07-14) rewrote the homepage and dropped `cms-loader.js`. Services/Testimonials edits in the CMS admin now have zero effect on the live homepage. Sections are hardcoded HTML.

**Decision needed (Anthony):** Is the static-homepage approach intentional? If reconnection is wanted, it needs to go into the `Digital-Allies/DigitalAllies` repo, not `da-platform`.

---

### P3 — Supabase security items still unconfirmed
- `supabase/security-fixes.sql` applied? (Not confirmed since 2026-07-16)
- Leaked-password protection enabled in Supabase Auth?
- Duplicate key pair cleaned up ("default" vs "supabase_anon_new/_service_role_new")?
- Old compromised Resend key revoked?

---

### P4 — Atomic Finds settings table is empty
`settings` has zero rows for the Atomic Finds `client_id`. Logo in `AtomicNav` will fall back to static brand mark until Anthony seeds a settings row via `/admin/settings`.

---

### P5 — HCTC may be hitting legacy-key error
`NEXT_PUBLIC_SUPABASE_ANON_KEY` on the `healthcare-training-center` Vercel project is still the old JWT format. Legacy keys were disabled. Site may be broken — not tested live yet.

---

### P6 — `digital-allies` Vercel project has zero env vars
The live marketing site Vercel project has no env vars configured. How it reads Supabase data is unknown. Needs investigation.

---

## 4. WHAT'S BEEN BUILT (verified as real, not stale)

These all exist in `tools/build-workflows` and are working:

- ✅ Auth — login, logout, password reset (middleware fix applied 2026-07-22)
- ✅ Admin dashboard (DA-branded, pulls from tenant `settings` table)
- ✅ Press Office / Content (`/admin/content`) — templates exist, data layer works; live bug is in separate repo
- ✅ Services ("The Departments") — full CRUD + RLS
- ✅ Testimonials ("Field Notes") — full CRUD + RLS
- ✅ Projects + Tasks ("The Workshop") — full CRUD, Kanban, 3 real templates (Software/Marketing/SEO)
- ✅ Atomic Finds storefront — Galaxy Card, ProductGrid, reviews, mobile-responsive, settings-driven logo
- ✅ Commerce schema — `products` table with `selling_state` CTA resolver
- ✅ Design system tokens (`--tok-*` vars) consumed by all public components
- ✅ Per-client theming via `SiteTheme.tsx`
- ✅ `cms.digitalallies.net` domain connected
- ✅ ISR/cookies bug fixed (public data fetchers no longer stuck on mock data)
- ✅ Language switcher system (hardened `LanguageController` pattern)

---

## 5. WHAT'S GENUINELY NOT BUILT YET

- ❌ `/admin/pages` — live preview uses hardcoded HTML; no real components; no code-view (scheduled Aug 5–6)
- ❌ Block renderer for public site — pages render from Supabase blocks (partially implemented per `implementation_plan.md`, not verified complete)
- ❌ Atomic Finds Vercel project creation (blocked on P0 fix first, then design finalization)
- ❌ Atomic Finds real product photos + 5th product from Jenny
- ❌ Checkout provider integration (blocked on Jenny conversation about provider)
- ❌ i18n system (plan exists: `I18N_SYSTEM_PLAN.md`; not started)
- ❌ Theme engine — admin-editable per-client theming (plan: `THEME_ENGINE_PLAN.md`; not started)
- ❌ Per-site document storage (contracts/invoices) — backlog, not scoped
- ❌ HCTC site — still placeholder; no build plan finalized
- ❌ DA site rebuilt inside monorepo — `sites/digitalallies` is a frozen import; actual live site is separate

---

## 6. DESIGN ASSET INVENTORY

### Claude Design projects
- **Digital Allies design system:** https://claude.ai/design/p/6119845f-97e8-4b42-899f-193545fca758?via=share
  - CMS folder has build process docs and mock UIs (canonical for CMS design work)
- **Atomic Finds ATX storefront:** https://claude.ai/design/p/29110ac3-0a76-4fa1-a322-a78bc212a50d?via=share
  - Homepage handoff: `sites/atomic-finds/design_handoff_homepage/`
  - Product grid handoff: `sites/atomic-finds/design_handoff_product_grid/`

### Design system files (local)
- Tokens: `packages/20260722-da-design-system/` — includes `GLOBAL_CONTEXT_FOR_CLAUDE.md` (full brand spec)
- Brand guide: see `GLOBAL_CONTEXT_FOR_CLAUDE.md` for colors, type, voice, vocabulary

### Brand tokens (quick ref)
- Bone White: `#F9F6F0` | Charcoal: `#2D2D2D` | Pulse Blue: `#3A7BD5` | Signal Red: `#C5301A` | Light Pink: `#FADEEB`
- Headers: Lexend Deca 700 | Body: JetBrains Mono
- Grid: 20px technical lace | Corners: square | Shadows: minimal

### Atomic Finds fonts
- Bagel Fat One / Pacifico / Agbalumo / DM Sans (NOT Tilda Script — watermarked trial only)

---

## 7. WORKFLOW & TOOL INVENTORY

### Your current workflow (as described)
Design concept → Asset gen (Canva / Luma Labs) → Canva → Claude Design → Claude Code or Antigravity → GitHub → Vercel → Supabase

### Agents in use
| Agent | Where | Role |
|-------|-------|------|
| Claude Code | Terminal (`claude`) | Primary build agent; commits to `main` |
| Antigravity | Separate session | Secondary agent; tasks in `tools/build-workflows/tasks/antigravity/` |
| Claude Design | claude.ai/design | UI design + design system; pushes to local via sync |
| Cowork (this session) | Claude desktop | Planning, organization, research, document authoring |

### Key context files every agent should read at session start
1. `/Users/cuus/Claude/projects/da-platform/STATUS.md` — running project state
2. `/Users/cuus/Claude/projects/da-platform/BUILD-SCHEDULE.md` — what's next
3. `/Users/cuus/Claude/projects/da-platform/AGENTS.md` — workspace conventions
4. `tools/build-workflows/tasks/anthony/TODO.md` — Anthony-only action items
5. `packages/20260722-da-design-system/GLOBAL_CONTEXT_FOR_CLAUDE.md` — brand spec
6. **This file** — master context

---

## 8. INSTALLED SKILLS (relevant to DA work)

| Skill | Use it for |
|-------|-----------|
| `digital-allies-brand` | Any branded content — HTML, docs, social, reports |
| `da-dark-mode-design-spec` | Dark-themed DA surfaces |
| `da-social-campaign` | Social posting calendar, campaign setup |
| `da-sound-brief` | Audio/music for videos, ads, reels |
| `local-leads` | B2B lead generation in Mohave County |
| `frontend-design` | Production-grade web components and UI |
| `canvas-design` | Posters, visual art, static design pieces |
| `paula-scher-design` | Type-driven editorial/poster design |
| `docx` | Word documents (proposals, contracts, client docs) |
| `pptx` | Slide decks and presentations |
| `pdf` | Reading, merging, creating PDFs |
| `xlsx` | Spreadsheets and data tables |
| `image-gen` | AI image generation |
| `stripe-projects` | Stripe product catalog, billing, subscriptions |
| `brand-voice:brand-voice-enforcement` | Enforce DA voice in any content |
| `marketing:content-creation` | Blog, social, email content |
| `marketing:campaign-plan` | Full campaign briefs |
| `small-business:smb-router` | Business operation routing |
| `engineering:code-review` | Code review before merging |
| `engineering:system-design` | Architecture decisions |
| `doc-coauthoring` | Structured documentation workflow |
| `postiz:postiz` | Schedule posts to 28+ social channels |
| `cowork-plugin-management:create-cowork-plugin` | Build new plugins |

### Connectors available (authorized)
- Google Calendar | Gmail | Google Drive
- Notion | Zapier
- Figma (plugin installed)
- Adobe Creative Cloud (plugin installed)
- Canva (via marketing plugin)

### Connectors needing auth
- Stripe, HubSpot, Slack, GitHub (via engineering plugin), Linear, Airtable

---

## 9. TOOLS TO ADOPT (recommended additions)

### Design & Component

| Tool | Why | Cost |
|------|-----|------|
| **shadcn/ui** | Already used in the codebase (`@/components/ui/`). Copy-paste components with Radix UI primitives. Full Tailwind + TypeScript. | Free |
| **DaisyUI** | Best Tailwind component library for rapid prototyping; 35 themes, zero JS deps | Free |
| **Storybook** | Document and test design system components in isolation; pairs with the `packages/design-system` | Free (Chromatic visual testing has generous free tier) |
| **Style Dictionary** (Amazon OSS) | Single token source → outputs CSS, iOS, Android. Lock down `--tok-*` vars across platforms | Free |
| **Penpot** | Open-source Figma alternative; browser-based, self-hostable, collaborative | Free (cloud) |
| **Zeroheight** | Pull Figma + Storybook into one design system site | Free (1 editor) |

### Engineering Productivity

| Tool | Why | Cost |
|------|-----|------|
| **Continue.dev** | Open-source AI code assistant for VS Code; use your own Claude API key | Free (bring your own key) |
| **Greptile** | Already reviewing PRs — keep using it. Code review bot that understands your codebase | Free tier |
| **GitHub Copilot Free** | In-editor suggestions; limited but useful for boilerplate | Free |
| **Chromatic** | Visual regression testing for Storybook components; catches ring/overflow regressions like the ones in Atomic Finds | Free tier (5000 snapshots/mo) |

### Client Onboarding & Documentation

| Tool | Why | Cost |
|------|-----|------|
| **Notion** | Client portal, onboarding docs, knowledge base — already in use | Free for individuals |
| **HubSpot CRM** | Client pipeline, onboarding stages, contact management | Free (unlimited contacts) |
| **Softr** | Build client portals from Notion/Airtable data — no code | Free tier |
| **PandaDoc** | Proposals, contracts, e-signatures; the missing piece between estimates and project kickoff | Free tier (3 docs/month) |
| **Typeform** | Interactive client intake forms | Free (10 questions) |
| **Docusign** (already a connector) | E-signatures on contracts | Via plugin |

### AI & Automation

| Tool | Why | Cost |
|------|-----|------|
| **Ollama** | Run local LLMs (Llama, Mistral, CodeLlama) — private, no API costs | Free |
| **Zapier** (already connected) | Wire CMS events to email, Slack, Notion | Free tier (100 tasks/month) |
| **Postiz** (already connected) | Schedule social posts to 28+ channels from one place | Connected |

---

## 10. DAILY BUILD ROUTINE (reformatted with full context)

### DA Platform Daily Build
**When:** Weekdays, ~135 min  
**Read first (in order):**
1. `STATUS.md` → https://github.com/Digital-Allies/da-platform/blob/main/STATUS.md
2. `BUILD-SCHEDULE.md` → https://github.com/Digital-Allies/da-platform/blob/main/BUILD-SCHEDULE.md
3. `tasks/anthony/TODO.md` → check if any Anthony items completed since last session
4. This file (`DA-PLATFORM-MASTER-CONTEXT.md`) → check P0–P6 bugs

**Check before building:**
- Live CMS: https://cms.digitalallies.net/admin/login
- Vercel deployments: https://vercel.com/digital-allies
- GitHub PRs open: https://github.com/Digital-Allies/da-platform/pulls

**Build protocol:**
- One focused task per session (follow `BUILD-SCHEDULE.md` slot in order)
- Claude Code: `cd /Users/cuus/Claude/projects/da-platform/tools/build-workflows && claude`
- Always open with: "Read STATUS.md, BUILD-SCHEDULE.md, and DA-PLATFORM-MASTER-CONTEXT.md before starting."
- `tsc --noEmit` before committing
- Update `STATUS.md` with a dated entry after every session
- Commit message format: `type(scope): description` — e.g. `feat(atomic-finds): add settings logo wiring`

**End of session:**
- `git status` — confirm clean or committed
- Update `STATUS.md` — what changed, what's true now, what's next
- Update `BUILD-SCHEDULE.md` — mark the day's slot done or superseded

---

## 11. WEEKLY INFRA MAINTENANCE ROUTINE (reformatted with context)

**When:** Saturday or Sunday, ~60 min  
**Purpose:** Catch drift, validate live state, prevent the pattern of stale docs claiming wrong things.

### Step 1 — Live site verification (15 min)
- Load https://digitalallies.net — does homepage render correctly?
- Load https://digitalallies.net/learn/ — is `#learn-articles-grid` showing articles or "Loading..."? (Currently BROKEN — see P1)
- Load https://cms.digitalallies.net/admin/login — does login work?
- Load the Atomic Finds live URL — do Galaxy Cards, reviews, and mobile nav render? (Currently BROKEN — see P0)
- Load HCTC Vercel URL — does it load or throw a Supabase key error? (Suspected BROKEN — see P5)

### Step 2 — Vercel deployment check (10 min)
- https://vercel.com/digital-allies → confirm all projects show green latest deployment from `main`
- Check `atomic-finds-atx` specifically — what branch is it deploying from? (Should be `main` after P0 fix)
- Check build logs for any errors

### Step 3 — Supabase health check (10 min)
- Supabase dashboard → Database → confirm no migration failures
- Supabase → Authentication → Security Advisor → check for new warnings
- Confirm `supabase_anon_new` key pair is still what's in use (not the "default" pair)

### Step 4 — GitHub audit (10 min)
- https://github.com/Digital-Allies/da-platform/pulls — any open PRs older than 48h need review or close
- https://github.com/Digital-Allies — any unexpected branches? Clean up merged branches.
- https://github.com/Digital-Allies/DigitalAllies — check if P1 (cms-loader.js bug) has been fixed

### Step 5 — Docs sync (15 min)
- Open `PROJECT-LINKS.md` (in the `2026-da-db-rebuild` Claude project) — verify all links still accurate
- Open `STATUS.md` — does it match actual live state? If not, correct it
- Open this file — any resolved bugs to move from §3 to §4?
- **Rule: verify by loading the URL / reading the code, never by asserting what the doc already says**

---

## 12. TWICE-DAILY CONTEXT BRIEFING ROUTINE (new)

**When:** Morning (before first build session) + Evening (before late session or before stopping)  
**Goal:** Establish full context for any agent or for Anthony within 5 minutes  
**Claude Code prompt to open every session with:**

```
Read the following files in order before doing anything:
1. /Users/cuus/Claude/projects/da-platform/DA-PLATFORM-MASTER-CONTEXT.md
2. /Users/cuus/Claude/projects/da-platform/STATUS.md
3. /Users/cuus/Claude/projects/da-platform/BUILD-SCHEDULE.md
4. /Users/cuus/Claude/projects/da-platform/tools/build-workflows/tasks/anthony/TODO.md

After reading, produce a one-page brief covering:
- Current P0/P1 bugs (from §3 of MASTER-CONTEXT)
- What today's BUILD-SCHEDULE slot is
- Any Anthony action items that are blocking build progress
- What the previous session changed (last STATUS.md entry)
- One recommended first action for this session

Do not start any build work until this brief is confirmed correct.
```

**Cowork prompt for the evening sync:**
```
Read DA-PLATFORM-MASTER-CONTEXT.md, STATUS.md, and the last 10 git commits 
(git log --oneline -10 in da-platform). Confirm:
- What was completed today
- What is still open from today's BUILD-SCHEDULE slot
- Any new bugs or blockers discovered
- STATUS.md is updated with today's date entry
- BUILD-SCHEDULE.md slot marked correctly (done / superseded / in-progress)
Update this file (DA-PLATFORM-MASTER-CONTEXT.md §3 and §4) if any bugs resolved or discovered.
```

---

## 13. BUILD SCHEDULE — WHAT'S NEXT (current as of 2026-07-23)

| Date | Task | Status | Owner |
|------|------|--------|-------|
| Before anything | Fix P0 — Atomic Finds deploy branch | **BLOCKED on Anthony** | Anthony in Vercel |
| Before anything | Fix P1 — cms-loader.js ReferenceError in DigitalAllies repo | **BLOCKED on Anthony or scoped session** | 1-line fix |
| Aug 5–6 | `/admin/pages` — real components + code-view + live preview | Genuine build needed | Claude Code |
| Parallel | Atomic Finds Vercel project creation | Blocked on P0 fix + design finalization | Anthony + Claude |
| Parallel | 5th product + real photos from Jenny | Blocked on Jenny | Anthony |
| Parallel | Checkout provider decision | Blocked on Jenny conversation | Anthony |
| Backlog | i18n system (EN/ES) | Plan exists in `I18N_SYSTEM_PLAN.md` | Claude Code |
| Backlog | Theme engine (admin-editable theming) | Plan exists in `THEME_ENGINE_PLAN.md` | Claude Code |
| Backlog | Per-site document storage (contracts/invoices) | Not scoped | — |
| Backlog | HCTC site build | No plan yet | — |
| After Phase 1 | Two portfolio sites (friend + Anthony's mom) | Rides same engine | Claude Code |
| Phase 2 | Multi-client onboarding UI, plan gating, Stripe billing | Out of scope until Phase 1 ships | — |

---

## 14. CLIENT ONBOARDING WORKFLOW (recommended)

For onboarding new clients to the DA Platform (beyond Digital Allies and the two current clients):

1. **Intake** → Typeform (collect brand colors, fonts, content, contact email)
2. **Proposal** → PandaDoc template (pull from DA document kit or build in Cowork with `docx` skill)
3. **Contract + signature** → PandaDoc or Docusign connector
4. **Project kickoff** → Notion client portal page (scope, timeline, deliverables)
5. **CMS onboarding** → Create `clients` row in Supabase, seed settings, create Vercel project
6. **Training** → Build tutorial HTML page in Claude Design (CMS folder pattern) or use Notion
7. **Handoff** → DA Legal Compliance Checklist skill (`da-legal-compliance-checklist`) before launch

**Anthony clicks for each new client:**
- Supabase → insert row into `clients` table (get `client_id`)
- Link `auth_user_id` to the new client (before first client login)
- Vercel → create project from `da-platform` repo, root `tools/build-workflows`
- Set all env vars (see §2 env vars list above)
- Add client domain in Vercel → Settings → Domains
- Update Supabase Auth → URL Configuration with new domain

---

## 15. DESIGN → CODE PIPELINE

Anthony's current workflow works. These additions tighten the loop:

1. **Concept** → Sketch or describe in Cowork (`frontend-design` skill for quick HTML prototypes)
2. **Asset gen** → Luma Labs / Canva / Adobe Creative Cloud / `image-gen` skill
3. **Design system** → Claude Design (https://claude.ai/design/p/6119845f...) — CMS folder for admin mocks
4. **Handoff** → Export from Claude Design; save reference components to `design_handoff_*/` in the repo
5. **Build** → Claude Code reads handoff + CLAUDE.md + brand tokens; implements in `tools/build-workflows`
6. **Review** → Greptile (already wired to GitHub PRs), then Anthony spot-check on live URL
7. **Merge + deploy** → PR to `main`, Vercel auto-deploys
8. **Verify** → Load live URL; check STATUS.md entry matches reality

**Key rule:** Design changes must land in `design_handoff_*/` directories before Claude Code builds them. Do not describe design in a chat and expect the agent to infer it — write it down in the handoff README.

---

## 16. CONFLICTS & GAPS FOUND IN THIS AUDIT

| Conflict | Resolution |
|----------|-----------|
| `sites/digitalallies` (monorepo) vs `Digital-Allies/DigitalAllies` (live repo) | These are two separate things. Monorepo copy is FROZEN. All live fixes go to `DigitalAllies` repo. Never confuse them. |
| `CMS_IMPLEMENTATION_PLAN.html` and older docs in `_archive/` | Superseded. Canonical plan is `BUILD-SCHEDULE.md` + `STATUS.md`. Do not read archived files for current state. |
| PR #4 branch still deployed on Atomic Finds | P0 bug. Fix = Vercel branch setting change. |
| `MAINTENANCE-CHECKLIST.md` links scope — some listed out-of-scope `cassellac/*` repos | Per 2026-07-22 Anthony directive: scope is CMS engine + its client sites only. Remove cassellac links from checklist. |
| Stale `AdminNav.tsx` reference in docs | File was deleted. The correct five-file list is in `ARCHITECTURE.md`. |
| Multiple Supabase key pairs ("default" + "_new") | The `_new` pair is what's in use. "Default" should be revoked. |
| `PROJECT-LINKS.md` in the Claude project had two stale items as of 2026-07-22 | Rewritten 2026-07-22. Use only the rewritten version. |

---

## 17. HISTORY SNAPSHOT (what got us here)

- **Before July 2026:** Built DA website (HTML/static), Stripe catalog, brand system, AEO pipeline, BST site (Duda), Atomic Finds concept. Working in multiple AI tools without shared context.
- **~Day 1–15 (June–early July):** Built CMS engine in Next.js — auth, Supabase schema + RLS, Press Office, Services, Testimonials, Projects. Deployed to Vercel from `cassellac` repo.
- **Jul 6:** Imported everything into `da-platform` monorepo under `Digital-Allies` org.
- **Jul 7–10:** Security fixes, Vercel re-point, mobile login fix, per-client theming.
- **Jul 13–17:** Block renderer (partial), contact form wiring, DNS/domain work. `cms.digitalallies.net` went live Jul 17. Vercel re-point confirmed Jul 10.
- **Jul 19:** Full env var audit; found and fixed legacy key error (admin was completely broken). Supabase key rotation.
- **Jul 20:** XSS fix in cms-loader.js, dead tailwind config removed (both in monorepo frozen copy — need porting to live repo).
- **Jul 21:** Atomic Finds full storefront built — Galaxy Card, ProductGrid, commerce schema, admin Showroom. ARCHITECTURE.md written. Mobile-responsive design shipped. Stale backlog items confirmed superseded.
- **Jul 22:** Auth bug fixed (reset-password middleware). Visual regressions on Atomic Finds fixed (rings, logo, card sizing). Found P0 (wrong deploy branch).
- **Jul 23:** `/admin/projects` confirmed superseded. `/admin/content` live-parity check found the cms-loader.js ReferenceError on live digitalallies.net/learn/. This master context document created.

---

*Last updated: 2026-07-23 | Next update: after next build session | Owner: Anthony + whichever agent ran the session*
