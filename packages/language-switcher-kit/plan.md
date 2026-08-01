# Language Switcher — Research Findings and CMS Rollout Plan

## Where I looked

Your local chat session history only went back 5 sessions, and none touched
this topic. Notion and Google Drive had the real trail: a Notion page and two
Google Docs documenting the exact system built for digitalallies.net, plus a
recent bug-audit doc that changes the plan. Slack, Gong, and email weren't
connected or didn't return anything relevant.

## What already existed (built last year, documented Oct–Nov 2025)

Three matching sources confirm the same design:

- Notion: "Digital Allies - Multilingual Implementation (English/Spanish)"
- Two Google Docs with the same content ("Implementation Guide" and "Making
  a Website Bilingual")
- Notion "Digital Allies - Technology Stack & Architecture," which credits
  `global.js` as the file owning language switching on the live site

The pattern, in short: every translatable element carries `data-en`/`data-es`
attributes. A `LanguageController` JavaScript class reads/writes
`localStorage`, swaps text on click, and toggles an `.active` class on the
EN/ES buttons. Zero dependencies, zero page reload.

## What your uploaded guide adds on top of that

The PDF you attached is the same core pattern, expanded with production
hardening that wasn't in the original docs:

- An ARIA live region that announces "Language changed to Spanish" to screen
  reader users on each toggle
- `hreflang` alternate tags and `og:locale` / `og:locale:alternate` meta tags
  for multilingual SEO
- A DOM-caching pattern for performance on pages with a lot of translatable
  elements
- A troubleshooting table and a full pre-launch testing checklist
- An explicit note that adding a third language (French, in the example)
  needs zero controller changes

## The finding that changes the plan

While cross-referencing, I found a bug-audit document in your Drive dated
July 16, 2026 — six days ago. It says the language switcher is currently
broken sitewide on digitalallies.net, and it's not the issue you thought you
were chasing:

- A merge (`site-overhaul-2026` → `main`) left `index.html` duplicated —
  two `<html>`, two `<head>`, two of everything, concatenated into one file.
  Browsers silently merge this on render, so it isn't visually obvious.
- That duplication means `class LanguageController {...}` gets declared
  twice, which throws `SyntaxError: Identifier 'LanguageController' has
  already been declared`. The whole script dies on load.
- Result: clicking EN/ES visually highlights the button but never changes
  any text, for every visitor, on every page.
- Separately, `cms-loader.js` now fetches Departments/Testimonials content
  from Supabase and rebuilds those sections via `innerHTML` on every page
  load. That content has no `data-en`/`data-es` attributes at all, so even
  once the syntax error is fixed, CMS-managed content still won't translate.

**This needs a source-level fix in the `Digital-Allies/DigitalAllies` repo**
(remove the duplicated HTML and redeploy). I don't have GitHub or Vercel
access connected in this session, so I can't push that fix myself — treat it
as your top action item today, independent of the CMS platform work below.

## Why it broke this way — the actual design gap

The original system assumes all translatable content exists as static HTML
at page load. That held for a hand-authored one-page site. It stopped
holding the moment the CMS platform started injecting content dynamically
from Supabase. Nobody updated the loader to keep the language switcher in
the loop, so CMS-managed sections silently shipped English-only. Every new
client site built on the same CMS engine will hit this exact problem the
moment its CMS-managed sections go live, unless the pattern itself is fixed
before it's baked in everywhere.

## What I built

Everything is in `language-switcher-kit/`, alongside this file:

- **`language-controller.js`** — hardened version of the original
  controller. Same public behavior, plus: idempotent (safe even if the
  duplicated-HTML bug happens again — the second execution is now a silent
  no-op instead of a fatal error), a `MutationObserver` that auto-translates
  any CMS-injected content the moment it's inserted (closes the gap above
  without touching `cms-loader.js`), config-driven support for any number of
  languages, and the ARIA/accessibility additions from your guide.
- **`styles.css`** — same visual system, rebuilt with CSS custom properties
  so each new client can restyle without touching structure.
- **`example.html`** — reference implementation: static content, a simulated
  CMS content injection (proving the auto-translate works), legal-page link
  swapping, and the SEO meta tags.
- **`SKILL.md`** — a skill to invoke every time a new client site is
  scaffolded in the CMS engine, so this is baked in from day one instead of
  retrofitted per client. Includes the Supabase bilingual-field convention,
  the pre-deploy duplicate-HTML guard, and the full launch testing checklist.
- **`README.md`** — quick integration steps for whoever's touching the repo.

## Rollout plan for the CMS platform

1. Fix the live digitalallies.net bug today: dedupe `index.html`, redeploy.
   Not blocked on anything below.
2. Add `language-controller.js` and `styles.css` to the CMS engine's site
   scaffold so every new client site ships with this by default, rather than
   being added per client after the fact.
3. Standardize the Supabase content convention for all new clients: bilingual
   fields stored as `{en, es}` JSON (or paired `field_en`/`field_es` columns),
   decided at schema design time — not bolted on after a client asks for
   Spanish.
4. Update whichever loader script each client site uses (the `cms-loader.js`
   equivalent) to emit `data-{lang}` attributes when it builds cards from
   that content. No extra work is needed to react to it once emitted — the
   `MutationObserver` in the new controller picks it up automatically.
5. Add a build-time check to the CMS engine's deploy pipeline that fails the
   build if generated HTML has duplicate `<html`, `<body`, or `id="lang-en"`
   occurrences. Direct guard against the exact bug that just took down
   digitalallies.net's toggle.
6. Add an `enabled_languages` setting per client in the CMS admin (the
   engine's Settings module already exists — this just adds a field to it),
   and generate `hreflang`/`og:locale` tags server-side from that setting.
7. Run the testing checklist in `SKILL.md` before every new client launch,
   including the CMS-managed-content check, not just the static-content one.

## What I couldn't verify from here

- Whether `index.html` has actually been fixed since the July 16 audit, and
  the current state of `da-webwssite-build-workflows.vercel.app/admin` — no
  GitHub or Vercel connector is active in this session, so I couldn't check
  the live repo or deployment directly.
- Whether any work has happened on this since documented conversations
  outside Notion/Drive (Slack, email, Gong) since those weren't connected or
  didn't return relevant results here.
