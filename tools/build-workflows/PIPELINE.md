# The DA CMS build pipeline

The canonical, repeatable path for turning a website + CMS idea into a live,
client-managed site on the Digital Allies platform. Every site — Digital Allies'
own, Atomic Finds, HCTC, and every future client — travels these same rails.

Read this first. Everything else in `tools/build-workflows/` is detail hanging
off this spine.

---

## The model (say it this way)

**One Platform, built once.** A single Next.js 15 + Supabase + Vercel engine:
the admin app, the shared component library / design system, and one Supabase
database. We build and maintain this once.

**Each client gets three faces — configured, not rebuilt:**

| Face | What it is | How it's produced |
|---|---|---|
| **Admin** | Their own login → their own admin workspace, at their own web address | The shared admin app, scoped to their `client_id` |
| **Brand** | Their colors, fonts, logo — their look | Their tokens in the `design_tokens` / `settings` rows, layered on shared components |
| **Website** | Their pages and content | Either the shared engine renders it, or their own site is fed by the CMS (see tiers) |

A new client is a **new room key**, not a new building. New Vercel deployment +
a new `NEXT_PUBLIC_CLIENT_ID`, pointed at the same shared Supabase. Row-level
security walls every client off — they only ever see their own data.

**The Website face has two tiers — this is the only branch in the whole factory:**

- **Templated** — the shared engine renders the site from blocks + the client's
  brand tokens. No custom front-end code. Fastest path (hours, not weeks).
  *Fit: Atomic Finds, most future clients.*
- **Connected** — the client has their own custom-built site (its own code and
  stack); the shared CMS + Supabase feed it content through the API. We connect,
  we don't rebuild. *Fit: digitalallies.net (static HTML), HCTC (Vite/React).*

The Admin and Brand faces are always the shared engine. Only the Website face
picks a tier.

---

## The four stages

Concept → Brief → Build → Wire. Each stage names the tool that owns it, the work
it does, the one artifact it hands to the next stage, and its "done when."

```
STAGE 1 · CONCEPT          STAGE 2 · BRIEF            STAGE 3 · BUILD             STAGE 4 · WIRE & SHIP
Claude Design / claude.ai  the handoff contract       Claude Code / Antigravity   GitHub · Vercel · Supabase
────────────────────────   ────────────────────────   ─────────────────────────   ─────────────────────────
Design the site + CMS in   Pin the concept down into  Implement against the        Deploy the client: seed
the brand. Decide pages,   a Build Brief: pages,      shared engine + design       Supabase, set env +
blocks, brand tokens,      blocks, content model,     system. No design            CLIENT_ID, invite admin,
Website tier.              tier, env, acceptance.     decisions invented here.     domain, RLS check, QA.
        │                          │                          │                          │
   design refs +              Build Brief doc            working code on a           live client (Admin +
   filled brief               (templates/)              branch + preview URL        Brand + Website)
```

### Stage 1 — Concept  *(owner: Anthony + Claude Design)*
Design the site and its admin in the Digital Allies brand — pages, sections,
the content that will live in the CMS, and the client's brand tokens. Work
visually; this is where taste happens.
- **Input:** a client and an intent ("HCTC needs X").
- **Output artifact:** design references (screens / block layouts) **plus** a
  filled-in `templates/BUILD-BRIEF.template.md`.
- **Done when:** the page + block list is agreed, brand tokens are chosen, and
  the Website tier (Templated or Connected) is decided.

### Stage 2 — Brief  *(owner: Anthony, with Claude)*
Turn the concept into the contract the builder works from. This is the seam
between design and code — the thing that stops Stage 3 from guessing.
- **Input:** the Stage 1 design + rough brief.
- **Output artifact:** a complete Build Brief (from the template) — the single
  source of truth for the build.
- **Done when:** every field in the brief is filled, including acceptance
  criteria ("what does done look like").

### Stage 3 — Build  *(owner: Claude Code / Antigravity)*
Implement the brief against the shared engine. For Digital Allies' own build,
the day-by-day detail already exists: `tasks/Claude Code - Build Sequence.md`
(a 20-working-day sequence). Reuse it as the template for any Templated client.
- **Input:** the Build Brief.
- **Rule:** no new design decisions here — if the brief is ambiguous, kick back
  to Stage 2. Build to the design system; never hand-roll what a brand component
  already covers.
- **Output artifact:** working code on a branch, green Vercel preview URL.
- **Done when:** the brief's acceptance criteria pass on the preview.

### Stage 4 — Wire & Ship  *(owner: Claude Code + Anthony's clicks)*
Stand the client up on the live infrastructure. Follow
`templates/CLIENT-ONBOARDING.template.md` step by step.
- **Input:** approved build on preview.
- **Work:** Supabase (client row, settings, tokens, seed content) · Vercel
  (project + env vars + `CLIENT_ID`) · Auth (invite admin, Site URL + redirects)
  · domain/DNS · RLS verification · launch QA.
- **Output:** a live client with all three faces working.
- **Done when:** the connected loop is real — an edit in their Admin changes
  their live Website, and no other client's data is reachable.

---

## Where everything lives

```
da-platform/
├── tools/build-workflows/          ← the Platform engine + this pipeline
│   ├── PIPELINE.md                 ← you are here (the spine)
│   ├── templates/
│   │   ├── BUILD-BRIEF.template.md      ← Stage 1→2 handoff artifact
│   │   └── CLIENT-ONBOARDING.template.md ← Stage 4 runbook, per client
│   ├── tasks/Claude Code - Build Sequence.md ← Stage 3 detail (20-day)
│   ├── src/                        ← the Next.js admin + public engine
│   └── supabase/                   ← schema, migrations, seed, RLS
├── packages/design-system/         ← the shared Brand: tokens, components
└── sites/                          ← per-client Website face
    ├── digitalallies/              ← Connected (static HTML)
    ├── atomic-finds/               ← Templated candidate
    └── healthcare-training-center/ ← Connected (Vite/React)
```

---

## Stack (the Platform)

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Data + Auth | Supabase (Postgres, Auth, Storage, Row-Level Security) |
| Multi-tenant | one database, isolated by `client_id` + RLS |
| Styling | Tailwind + DA design tokens (`src/styles/globals.css`) |
| Editor | Tiptap · Forms: React Hook Form + Zod |
| Email | Resend |
| Hosting | Vercel (auto-deploy from GitHub; new client = new deploy + `CLIENT_ID`) |
| Fonts | Lexend Deca (headers) + JetBrains Mono (body) |

Shared Supabase project and the DA client UUID are recorded in `README.md`.
Sensitive keys live only in `.env.local` and Vercel env — never committed.

---

## A note on the older docs (reconciling the drift)

Earlier planning produced a static `dashboard.html` CMS prototype (see
`cms-implimentation/cms/`). That was a useful sketch, but the **canonical CMS is
the Next.js engine in `src/`** — that is what the Build Sequence, the schema, and
this pipeline target. Treat the HTML dashboard and its wiring guides as
historical reference, not the build target. Nothing is deleted; it just isn't
the road we're driving.

---

*Model and naming locked: The Platform · Admin / Brand / Website · Templated /
Connected. Keep the language stable — we are done rebranding.*
