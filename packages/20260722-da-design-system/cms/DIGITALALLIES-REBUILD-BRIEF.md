# Build Brief — Digital Allies (own site rebuild: Connected → Templated)

Filled from `sites/digitalallies/CLAUDE.md` + `README.md` (current static
build) + this session's Page Editor work. Follows `BUILD-BRIEF.template.md`'s
structure exactly so it drops straight into the real pipeline.

**Why this brief exists:** `digitalallies.net` is the one site in the whole
platform still on the **Connected** tier by accident, not by choice — it's a
separate static-HTML repo (`Digital-Allies/DigitalAllies`) that every fix
has to be hand-ported into (see `STATUS.md`'s repeated "still needs manual
porting" notes on the cms-loader/tailwind fixes). Moving it onto the
**Templated** tier — the same engine every client runs — means DA's own site
stops needing a second codebase and starts dogfooding the Page Editor,
the Theme Engine, and the module set in real, daily use.

---

## 1. Client
| Field | Value |
|---|---|
| Client name | Digital Allies |
| Slug | `digital-allies` |
| `client_id` | already exists (has a live Supabase `clients` row, used by digitalallies.net's current Supabase-fed sections) — confirm the UUID at Stage 4 |
| Primary domain | digitalallies.net |
| Admin user email(s) | contact@digitalallies.net |
| Contact-form destination | contact@digitalallies.net (currently FormSubmit — see §6) |

## 2. Website tier
- [x] **Templated** (target) — was Connected (static HTML), moving to the shared engine.
- Current repo being replaced: `Digital-Allies/DigitalAllies` (static, Tailwind pre-built, no framework).

## 3. Brand
| Token | Value |
|---|---|
| Primary / accent | Signal Red `#C5301A` |
| Canvas | Bone White `#F9F6F0` |
| Text / structure | Charcoal `#2D2D2D` |
| Secondary accent | Pulse Blue `#3A7BD5` (`#1D5FAD` for AA text contrast — carry this override into the engine's token set, it's a real accessibility fix, not a style choice) |
| Hover wash | Light Pink `#FADEEB` |
| Header font | Lexend Deca |
| Body font | JetBrains Mono |
| Logo | `packages/20260722-da-design-system/assets/logo-*` (current snapshot folder) |
| Voice | Primary voice per `GLOBAL_CONTEXT_FOR_CLAUDE.md` — DA's OWN jargon (Departments, Field Notes, Command Center, etc.) stays fully intact here — this is the one tenant where that vocabulary is correct everywhere, admin and public site both. |

## 4. Pages & blocks
Migrating from the current static site's real page list:

| Page | Slug | Blocks (in order) | Content source |
|---|---|---|---|
| Home | `/` | hero → services → testimonials → cta → contact | existing Supabase rows (already live) |
| Brand guide | `/brand` | richtext (asset portal) | mostly static reference — low priority to rebuild as blocks; candidate to keep as a static page for now |
| Learn hub | `/learn` | richtext (index/listing) | becomes the Posts/Articles list view |
| Learn articles (7: seo-aeo, alttext, ada-compliance, bilingual-web, dept-cooperation, design-bureau, self-governing-bureau) | `/learn/*` | richtext + embedded interactive widgets (SEO checker, alt-text checker) | **flag:** these aren't plain rich text — they carry standalone interactive JS (schema generators, live checkers). Each needs either a `customCode` block (Agency-tier per this session's spec) or a dedicated new block type — plain richtext will lose the interactivity. |
| Legal (privacy/terms/cookies) | `/privacy` `/terms` `/cookies` | richtext | static, low complexity |
| Sitemap | `/sitemap` | generated, not editorial | keep as a build-time generated page, not a CMS page |

## 5. Content collections
- [x] `pages` (blocks) — home + legal + brand guide
- [x] `articles`/`posts` — the 7 Learn pages become real posts, not static HTML (gains real editing, matches "Press Office" ask elsewhere in the platform)
- [x] `services` — already live
- [x] `testimonials` — already live
- [ ] `team_members`, `gallery_items` — not currently used by DA's site
- [ ] `content_calendar` — separate from the public site; already exists as its own admin module

## 6. Integrations & settings
- Contact form: **migrate off FormSubmit** onto the engine's existing `messages` insert + Resend pattern (already built and proven on other tenants) — removes a third-party form dependency.
- Bilingual EN/ES: **yes, required** — this is the one non-negotiable gap. The engine has no i18n system today; `I18N_SYSTEM_PLAN.md` scopes it (Phase 1 target: Atomic Finds) but it isn't built. **DA's own rebuild cannot ship without this, or ships as English-only regression** — needs a decision (see acceptance criteria).
- Structured data (JSON-LD: LocalBusiness/WebSite/FAQPage/Service/Article per page) — not something the engine emits today; needs to be added to the renderer, not just carried over as static markup.
- Accessibility: WCAG 2.1 AA is a current, tested baseline (see the Pulse Blue contrast override above) — treat as a hard requirement, not aspirational.

## 7. Environment / config
Existing `client_id` should already be provisioned (DA's Supabase rows are already live per `STATUS.md`'s 2026-07-16 audit) — confirm rather than assume, fill in at Stage 4.

## 8. Acceptance criteria
- [ ] Every page above renders with real blocks, not placeholder content.
- [ ] EN/ES toggle works with zero regressions from the current site (blocking — see §6).
- [ ] The 7 Learn articles' interactive widgets (SEO/AEO generator, alt-text checker) still function — not just their text.
- [ ] JSON-LD schema present per page, matching the current site's schema matrix (`docs/CODE-STANDARDS.md` in the static repo).
- [ ] Contact form creates a `messages` row + emails contact@digitalallies.net.
- [ ] Lighthouse ≥ 90, mobile holds at 375/768/1024px.
- [ ] Old `Digital-Allies/DigitalAllies` repo can be safely archived (DNS/Cloudflare cut over, redirects preserved for the two indexed Learn URLs Google has cached).

## 9. Design references
- `sites/digitalallies/CLAUDE.md` (this repo) — full design reference.
- This design-system project's `cms/page-editor.html` prototype + `PAGE_EDITOR_SPEC.md` — the builder DA's own site would be authored in.

---

## Sequencing recommendation
Don't start this rebuild yet. Two prerequisites should ship first, or DA's
site just re-inherits their gaps on a second codebase:
1. **The Page Editor** (this session's prototype → real build) — DA's own
   pages are the actual proving ground, but the editor needs to exist first.
2. **`I18N_SYSTEM_PLAN.md`'s Phase 1** — bilingual is non-negotiable for
   this site specifically (§6) and doesn't exist in the engine yet.

A third open question, not a blocker: the 7 Learn pages' custom interactive
widgets need a real answer (new block type vs. Agency-tier custom code)
before Stage 2 can call §4 "done."
