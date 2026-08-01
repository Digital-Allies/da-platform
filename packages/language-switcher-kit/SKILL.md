---
name: da-language-switcher
description: Bake the Digital Allies client-side language switcher (data-attribute + LanguageController pattern, originally built for digitalallies.net) into any new client site the CMS platform provisions. Use whenever scaffolding a new client site, adding bilingual/multilingual support to an existing one, or troubleshooting a language toggle that isn't switching text.
---

# Digital Allies Language Switcher — CMS Baseline

This skill bakes the language switcher used on `digitalallies.net` into every new
client site the CMS platform (the Next.js "engine" at
`da-webwssite-build-workflows.vercel.app`) provisions. It is a hardened
version of the original single-site implementation — same core pattern,
fixed against the failure mode that already took the toggle down in
production once.

## When to use this

- Scaffolding a brand-new client site from the CMS engine.
- Adding EN/ES (or additional-language) support to an existing client site.
- A client reports "the language buttons highlight but don't change the text."
- Reviewing a CMS content-loader script (like `cms-loader.js`) that injects
  HTML dynamically from Supabase/the CMS database.

## Core pattern (do not deviate)

1. Every user-facing element carries `data-en="..."` / `data-es="..."` (add
   more `data-{lang}` attributes for additional languages). Translations live
   on the element — no separate language files.
2. `language-controller.js` (in this folder) is the single source of truth
   for switching logic. Copy it verbatim into the client site's static asset
   bundle — do not fork or re-derive it per client. Config differences (which
   languages, default language, language display names) go through
   `window.LANGUAGE_CONTROLLER_CONFIG`, set inline before the script tag.
3. `styles.css` (in this folder) provides the `.language-switcher` /
   `.lang-btn` / `.sr-only` classes via CSS custom properties. Override the
   custom properties per client for brand colors — don't hand-edit the rules.
4. Preference persists via `localStorage`, key `language` by default.

## Steps to bake this into a new client site

1. Copy `language-controller.js` and `styles.css` into the client's static
   asset scaffold (same folder as `global.js`/`style.css` today).
2. Add the two-button toggle markup (see `example.html`) to the shared
   header/nav partial so it appears on every page.
3. Tag every translatable element with `data-en`/`data-es` at template-authoring
   time. For CMS-managed content (services, testimonials, blog cards), see
   "CMS-managed content" below instead of hand-tagging.
4. In the CMS engine's per-client Settings, add/confirm an `enabled_languages`
   field (array, e.g. `["en","es"]`). Server-render `hreflang` alternate links
   and `og:locale` / `og:locale:alternate` meta tags from that setting on
   every page — see `example.html` for the tag shapes.
5. Run the testing checklist below before marking the client site launch-ready.

## CMS-managed content (the gap that bit us on digitalallies.net)

Static, hand-authored HTML can carry `data-en`/`data-es` directly. Content
that comes from Supabase and gets rendered client-side via `innerHTML`
(departments, testimonials, blog cards, anything a content-loader script
builds) cannot rely on someone remembering to add those attributes by hand
in a template string.

Two things fix this, and both should be standard for every new client, not
retrofitted later:

- **Storage convention**: bilingual fields in Supabase should be stored as
  `{ "en": "...", "es": "..." }` JSON (or paired `field_en` / `field_es`
  columns) — never a single plain-string column that only ever holds
  English. Decide this at schema design time for each new client's tables.
- **Render convention**: whatever loader script builds the card markup
  (the `cms-loader.js` equivalent) must emit `data-en`/`data-es` attributes
  on the elements it creates, pulling from that JSON. It does **not** need to
  call `updateContent()` itself — `language-controller.js` ships with a
  `MutationObserver` that detects newly-inserted DOM and translates it
  automatically. This is the fix for the exact bug found on
  `digitalallies.net`, where `cms-loader.js` content had no bilingual data at
  all and the loader also raced the static HTML on every page load.

## Known failure mode — already happened once, guard against it every time

On `digitalallies.net`, a merge (`site-overhaul-2026` → `main`) concatenated
`index.html` with itself: two `<html>`, two `<head>`, two `<body>`, two of
everything. Browsers silently merge this on render, so it wasn't visually
obvious, but the inline script declared `class LanguageController` twice,
which throws `SyntaxError: Identifier 'LanguageController' has already been
declared` — the entire script dies, `window.languageController` never gets
created, and clicking EN/ES highlights the button but changes nothing,
site-wide, with no visible error to a non-technical client.

Two mitigations, both already applied in this kit:

1. `language-controller.js` is now idempotent — if it somehow executes twice
   (duplicated markup, a caching bug, a bad merge), the second execution is
   a silent no-op instead of a fatal `SyntaxError`.
2. Add a pre-deploy check to the CMS engine's build/deploy pipeline that
   fails the build if the generated HTML contains more than one `<html`,
   `<body`, or `id="lang-en"` occurrence. This catches the class of bug at
   build time instead of after it's live in front of a client's customers.

## Testing checklist (run before every client launch)

- [ ] All text switches correctly when clicking between language buttons.
- [ ] The `.active` class is applied to the currently selected button.
- [ ] Language preference persists after a page refresh.
- [ ] `localStorage.getItem('language')` shows the correct value.
- [ ] `document.documentElement.lang` updates on switch.
- [ ] No errors in the browser console (specifically: no duplicate
      declaration errors — see "Known failure mode" above).
- [ ] Form input/textarea placeholders update correctly.
- [ ] CMS-managed content (services, testimonials, blog cards) translates
      after the content loader injects it — confirms the MutationObserver
      is catching dynamic content, not just static HTML.
- [ ] Keyboard accessible (buttons focusable, activatable with Enter/Space).
- [ ] `hreflang` and `og:locale` tags are present and match enabled languages.

## Files in this kit

| File | Purpose |
|---|---|
| `language-controller.js` | The controller. Copy verbatim into every client site. |
| `styles.css` | Themeable button/switcher styles via CSS custom properties. |
| `example.html` | Reference markup: static content, CMS-injected content, legal-link swapping, hreflang/og:locale tags. |
| `README.md` | Quick integration steps for a developer dropping this into a repo. |
| `plan.md` | Full research writeup: what digitalallies.net had, what the uploaded implementation guide adds, the live production bug found during research, and the rollout plan for the CMS platform. |
