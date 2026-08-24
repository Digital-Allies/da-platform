# Task for Claude Code: rename Ally CMS infrastructure (da-platform → ally-cms)

Paste this whole file to Claude Code, running from `~/Claude/projects/da-platform` on Anthony's
machine (not from Cowork/cloud — the cloud session's GitHub connector cannot write to this repo:
403 "Resource not accessible by integration", confirmed 2026-08-23).

## Context

Digital Allies is standardizing the name of its CMS platform to **ally-cms** (lowercase,
hyphenated) across three systems that currently use three different names for the same project:

| Platform | Current name/ID                              | Target        |
|----------|-----------------------------------------------|---------------|
| GitHub   | `Digital-Allies/da-platform`                  | `Digital-Allies/ally-cms` |
| Supabase | "Digital Allies CMS" (ref `auwhvicpyiwsubucanpb`, fixed) | display name "ally-cms" |
| Vercel   | `da-webwssite-build-workflows` (team `digital-allies`, prj_cPSPjfdY9dac5qdzTupDb2FEgVQD) | `ally-cms` |

None of these three platforms expose a "rename project" call through the MCP connectors used in
the planning session — every rename below goes through each platform's own dashboard, CLI, or
REST API, not a Cowork tool. Do them **one platform at a time, in the order below**, verifying
after each before moving on. Never delete anything as part of this — archive or leave in place if
unsure.

## Step 0 — Preflight (confirms you have the access this task needs)

- [ ] `gh auth status` — must show a GitHub account with admin rights on `Digital-Allies/da-platform`.
      **Requires: Anthony's own GitHub login** — this is exactly what the cloud session lacked.
- [ ] `vercel whoami` and `vercel teams ls` — must show you're logged into the "Digital Allies" team (`digital-allies`).
      **Requires: Anthony's Vercel login.**
- [ ] Have a Supabase **personal access token** ready (Account → Access Tokens at
      https://supabase.com/dashboard/account/tokens) — project renames go through the Management
      API, not the project-scoped anon/service keys already in `.env`. **Requires: a token generated
      from Anthony's Supabase account** (this is separate from anything already configured).
- [ ] `cd ~/Claude/projects/da-platform && git fetch --all && git status && git branch -a` —
      confirm there's no uncommitted work or unpushed branches you'd clobber. (Note: as of
      2026-08-23 there were 4 local feature/fix branches sitting unpushed in this exact clone —
      confirm with Anthony whether those have since been pushed before doing anything destructive.)

## Step 1 — Supabase rename (do first: lowest risk, zero downstream impact)

The project **ref** `auwhvicpyiwsubucanpb` is permanent and cannot be changed — it's baked into
the DB host, the REST/GraphQL URL, and every existing API key. Renaming the *display name* does
not touch any of that, so this is safe to do with nothing else to follow up on.

- [ ] Dashboard: https://supabase.com/dashboard/project/auwhvicpyiwsubucanpb/settings/general
      → Project name → `ally-cms`
- [ ] Or via API:
      ```
      curl -X PATCH https://api.supabase.com/v1/projects/auwhvicpyiwsubucanpb \
        -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"name":"ally-cms"}'
      ```
- [ ] Cosmetic-only, local dev config: in `tools/build-workflows/supabase/config.toml`, change
      `project_id = "da-webwssite-build-workflows"` → `project_id = "ally-cms"`. This only labels
      local `supabase start` Docker containers — it has no effect on the remote project.
- [ ] Verify: dashboard shows "ally-cms"; app still logs in fine (nothing else could have broken,
      since the ref/URL/keys didn't change).

## Step 2 — GitHub repo rename (`da-platform` → `ally-cms`)

GitHub redirects the old URL to the new one indefinitely (as long as no one else claims
`da-platform` under this org later), but clean up in-repo references anyway.

- [ ] `gh repo rename ally-cms --repo Digital-Allies/da-platform`
- [ ] `git remote -v` to see the current remote URL format, then:
      `git remote set-url origin <same-form-but-with-ally-cms>` (e.g.
      `git@github.com:Digital-Allies/ally-cms.git`)
- [ ] Optional, cosmetic: rename the local folder itself (`cd .. && mv da-platform ally-cms`).
- [ ] Text sweep for the old repo/project name (do **not** touch `auwhvicpyiwsubucanpb` — that's
      the Supabase ref, unrelated and permanent):
      ```
      grep -rl "da-webwssite-build-workflows" . --exclude-dir=.git
      grep -rl "Digital-Allies/da-platform" . --exclude-dir=.git
      ```
      Known hits as of 2026-08-24 (verify this list is still current — files may have changed):
      `README.md`, `tools/build-workflows/README.md`, `tools/build-workflows/sync.command`,
      `tools/build-workflows/tasks/anthony/TODO.md`, `tools/build-workflows/openapi.json`,
      `BUILD-SCHEDULE.md`, `CRITICAL-FIXES-SPEC.md`, `STATUS.md`,
      `CMS-90-DAY-ROADMAP-REVISED.md`, `DA-PLATFORM-MASTER-CONTEXT.md`,
      `packages/design-system/INTEGRATION_OVERVIEW.md`,
      `packages/language-switcher-kit/plan.md`, `packages/language-switcher-kit/SKILL.md`.
      For `STATUS.md` specifically, this is a 200KB running log — only fix the header/summary
      references, leave historical dated entries as-is (they're a record of what was true then).
- [ ] Commit: `git add -A && git commit -m "chore: rename repo references da-platform -> ally-cms"`
      then `git push`.
- [ ] **Ask Anthony before touching, don't do automatically:** the legacy standalone repo
      `cassellac/da-webwssite-build-workflows` is called out in `tools/build-workflows/README.md`
      as "archive-only; do not commit to it." Consider archiving it on GitHub (Settings → Danger
      Zone → Archive this repository) so it's clearly marked dead, rather than renaming it.
- [ ] **Out of scope unless asked:** `Digital-Allies/DigitalAllies` and `Digital-Allies/design-system`
      also contain historical docs mentioning the old name (`cms/INTEGRATION_OVERVIEW.md`,
      `cms/anthony-tasks.html`, `CMS Developer Handoff.html`). Documentation only, not live config
      — fine to leave, or fix opportunistically.

## Step 3 — Vercel project rename (do this LAST — it's the one that changes live URLs)

- [ ] Before renaming, check env vars for anything hardcoding the old `*.vercel.app` subdomain:
      `vercel env ls --scope digital-allies da-webwssite-build-workflows`
      Specifically `NEXT_PUBLIC_SITE_URL` — if it's set to `https://cms.digitalallies.net`, you're
      safe (that custom domain doesn't move). If it's hardcoded to the vercel.app subdomain,
      update it to the custom domain (or the new vercel.app name) before or right after renaming.
- [ ] Rename (no CLI subcommand for this — use the API or dashboard):
      ```
      curl -X PATCH "https://api.vercel.com/v9/projects/da-webwssite-build-workflows?teamId=team_n8nAHmnyGo6r5ITlPhwmLV4w" \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"name":"ally-cms"}'
      ```
      **Requires: a Vercel personal access token** (Account Settings → Tokens) — separate from
      the CLI's browser login. Or do it by hand: Project → Settings → General → Project Name.
- [ ] This changes the two auto-generated URLs to `ally-cms-digital-allies.vercel.app` and
      `ally-cms-git-main-digital-allies.vercel.app`. The custom domain `cms.digitalallies.net` is
      untouched.
- [ ] Check Supabase Auth → URL Configuration → Redirect URLs
      (https://supabase.com/dashboard/project/auwhvicpyiwsubucanpb/auth/url-configuration) for any
      entry using the old `*.vercel.app` subdomain; add the new one if one's needed there.
- [ ] Force a redeploy (push a commit, or `vercel --prod`) and confirm the build is green and
      `https://cms.digitalallies.net/admin/login` still works.
- [ ] Confirm Project → Settings → Git still shows it connected to `Digital-Allies/ally-cms` —
      Vercel tracks the link by repo ID, so the Step 2 rename should already be reflected, but verify.

## Step 4 — New dedicated Vercel account (separate effort — not a rename, a migration)

This part cannot be scripted at all — creating a Vercel account requires a human to sign up and
accept billing terms. **Requires: Anthony, in a browser, on whichever email should own the new
account.**

1. Anthony signs up at https://vercel.com/signup. A plain personal account is enough — it'll stay
   on the free Hobby tier, same as today.
2. **Decide scope before moving anything** (recommend, don't assume): move only the live,
   load-bearing projects — `ally-cms` (the CMS engine) and `atomic-finds-atx` (the client site
   built on it), and optionally `digital-allies` (DA's own marketing site — same Supabase
   backend, separate repo). Leave `design-system`, `design-systems-collection`,
   `healthcare-training-center`, and `ez-dash` on the current "Digital Allies" team — they're
   side projects or inactive (the `ez-dash` Supabase project is already `INACTIVE`) and don't
   need to share the new account's quota.
3. For each project being moved, try in this order:
   - **Transfer** (Project → Settings → Advanced → Transfer Project) — keeps deployment history;
     the destination account has to accept it. Try this first.
   - **Recreate**, only if transfer isn't offered for this account-type pairing: in the new
     account, `vercel link` the same GitHub repo + root directory, copy env vars
     (`vercel env pull` from the old project → `vercel env add` in the new one), then in the OLD
     project remove the custom domain (Settings → Domains → Remove) and immediately add it to the
     NEW project (Settings → Domains → Add). Expect a few minutes of DNS/TLS downtime on
     `cms.digitalallies.net` during the switch. Only delete the old project once the new one is
     confirmed live.
4. After the move, grep the repo once more for the old team slug `digital-allies` in case
   anything (docs, env var values, webhook URLs) still points at it.

## Verification (after everything above)

- [ ] `cms.digitalallies.net/admin/login` loads and login works
- [ ] `atomicfindsatx.store` loads and pulls live data
- [ ] `digitalallies.net` still loads (unaffected, but confirm the shared-repo text edits in
      Step 2 didn't break its build)
- [ ] Supabase dashboard shows "ally-cms", ref still `auwhvicpyiwsubucanpb`
- [ ] `github.com/Digital-Allies/da-platform` redirects to `github.com/Digital-Allies/ally-cms`
- [ ] Vercel shows "ally-cms" as the project name, under whichever account now owns it
- [ ] `grep -r "da-webwssite-build-workflows" .` in the repo returns nothing outside of
      `STATUS.md`'s historical log entries
