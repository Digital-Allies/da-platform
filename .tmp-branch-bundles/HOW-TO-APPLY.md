# Applying these branch bundles

This session's git access is currently read-only for both `Digital-Allies/da-platform` and `Digital-Allies/DigitalAllies` — every push attempt gets: "access denied by the git proxy: <repo> is not in this session's authorized repository set... add the repository to the session's sources." The GitHub connector itself is connected and enabled (confirmed), so this is a separate, session/environment-level allowlist, not a connector auth issue — it needs to be added wherever this environment's repository access is configured (see chat for what to look for). Until then, here are all five finished branches as bundles.

For each bundle, from a local clone of the matching repo with real push access:

```bash
git fetch /path/to/<bundle-file> <branch-name>:<branch-name>
git push origin <branch-name>
```

## Digital-Allies/da-platform (4 branches)
- `section-registry-and-blocks.bundle` → branch `feature/section-registry-and-blocks` — section registry refactor + faq/stats/quote/media blocks + LanguageSwitcher/AccessibilityStatement/UseOfAI/Sitemap components
- `finish-theming-engine.bundle` → branch `feature/finish-theming-engine` — wires type_scale/spacing/logo/favicon into the live theming pipeline
- `tenant-labels-and-onboarding-docs.bundle` → branch `fix/tenant-labels-and-onboarding-docs` — tenant-aware admin nav labels + onboarding template SQL fix + stale doc path fixes
- `atomic-finds-detokenize-and-archive.bundle` → branch `chore/atomic-finds-detokenize-and-archive` — archives old Atomic Finds branding material, de-hardcodes brand values to design tokens (zero visual change)

## Digital-Allies/DigitalAllies (1 branch)
- `cms-loader-fix.bundle` → branch `fix/cms-loader-undefined-key-and-escaping` — fixes the live `/learn/` page (undefined `SUPABASE_ANON_KEY` reference broke the whole script) and ports an already-fixed escapeHtml() sanitization pass from the da-platform monorepo's copy that never made it into this live repo. This one's small and safe to merge immediately — it only touches `assets/js/cms-loader.js`, no visual change except that `/learn/` starts working again.
