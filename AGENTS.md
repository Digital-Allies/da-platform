# da-platform — Digital Allies CMS monorepo

**Read `STATUS.md` first.** Current state, open bugs, what's next.  
**Read `DA-PLATFORM-MASTER-CONTEXT.md`** for deeper context on architecture, decisions, and all three tenants.

---

## What this is

One Next.js codebase, one Supabase project, three client sites — all isolated by `client_id` + Row-Level Security. Anthony builds and maintains everything. Clients log in to edit their own content via `/admin`.

**Sites:** Digital Allies (digitalallies.net) · Atomic Finds ATX (atomicfindsatx.store) · Healthcare Training Center  
**CMS admin:** cms.digitalallies.net (deployed from `tools/build-workflows`)  
**Repo:** Digital-Allies/da-platform (private)

---

## Directory rules

```
packages/design-system/            ← shared components, tokens, styles ONLY
tools/build-workflows/             ← the CMS engine (Next.js app, admin, API)
sites/digitalallies/               ← frozen import, not the live site
sites/atomic-finds/                ← reference only
sites/healthcare-training-center/  ← reference only
```

- Shared components live in `packages/design-system`. Never copy them into a site directory.
- All live deployments use `tools/build-workflows` as their Vercel root directory.
- `sites/*` are frozen historical imports. The live DA site deploys from a separate repo: `Digital-Allies/DigitalAllies`.

---

## Before touching any code

1. Read `STATUS.md` — check what's in progress and what's blocked.
2. Confirm which client you're working in — never modify another client's seed files or data.
3. If touching Supabase schema (migrations, RLS policies) — stop and flag to Anthony before running.

---

## Naming conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Seed files | `seed-<client-slug>-<table>.sql` | `seed-atomic-finds-settings.sql` |
| Shared components | PascalCase in `packages/design-system/src/components/` | `LanguageSwitcher.tsx` |
| Site-specific components | PascalCase, colocated with their feature | `AtomicFindsHomepage.tsx` |
| Supabase queries | camelCase, in `src/lib/data.ts` | `getProductsByClient()` |
| CSS design tokens | `--tok-*` prefix | `--tok-primary`, `--tok-bg` |
| Client-side env vars | `NEXT_PUBLIC_*` | `NEXT_PUBLIC_CLIENT_ID` |
| Server-only env vars | no prefix | `SUPABASE_SERVICE_ROLE_KEY` |

---

## Platform non-negotiables

These apply to every client site. Don't skip them.

- **WCAG 2.1 AA** — 4.5:1 contrast on body text, 3:1 on large text and UI. Verify with the actual color tokens, not by sight.
- **No hardcoded colors or fonts in components** — always use `--tok-*` CSS variables injected by `SiteTheme.tsx`. Each client has their own tokens.
- **`next/image` only** — never a raw `<img>` tag in production code.
- **No `console.log` in production code.**
- **Required pages on every live site:** home, about, contact, terms, privacy, cookies, accessibility, use-of-ai, sitemap.
- **i18n-ready** — all user-facing strings externalized; add `<!-- LANGUAGE_SWITCHER_PLACEHOLDER -->` in nav + footer until the component is built.

Full detail: `NEW-SITE-SETUP-PROCESS.md`

---

## What requires Anthony's sign-off

Always stop and confirm with Anthony before:

- Running SQL against the live Supabase project — especially schema changes, RLS edits, or any DELETE
- Merging to `main` or triggering a production redeploy
- Changing environment variables in Vercel
- Any action that touches more than one client's data

Everything else — writing files, running shell scripts, installing packages, committing to branches, reading logs — proceed without asking.

---

## Keep PRs scoped to one concern

A bug fix found while doing a task can ship in the same PR if it's small and directly required to make that task's own change work. Once a fix is trending past **~3 commits**, or touches files/systems the original task isn't changing, stop extending the branch — open a new one instead (or log it in `STATUS.md`/a GitHub issue if it's too big to finish now). Anything from the sign-off list above already implies its own PR — don't fold schema/env/prod-merge work into a feature branch.

This applies to every agent working in this repo, scheduled or interactive — PR #10 (2026-07-26 → 2026-07-30) grew across 5 sessions into a mix of unrelated features and got hard to track, which is what this rule is protecting against.
