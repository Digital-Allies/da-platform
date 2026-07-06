# Build Brief — <CLIENT NAME>

The contract between design (Stage 1) and build (Stage 3). Fill every field. If a
field is unknown, write "TBD" — never leave it blank, so the gap is visible. When
this is complete, the builder should never have to guess or invent a design
decision. See `../PIPELINE.md` for how this fits.

---

## 1. Client

| Field | Value |
|---|---|
| Client name | |
| Slug (url-safe) | |
| `client_id` (UUID) | assigned at onboarding — leave blank until Stage 4 |
| Primary domain | |
| Admin user email(s) to invite | |
| Contact-form destination email | |

## 2. Website tier  *(pick one — the only branch in the factory)*

- [ ] **Templated** — the shared engine renders the site from blocks + tokens.
- [ ] **Connected** — client has their own site; the CMS feeds it via Supabase.
      Repo / stack of the existing site: __________________________

## 3. Brand (the Brand face)

| Token | Value | Default if blank |
|---|---|---|
| Primary / accent color | | Signal Red `#C5301A` |
| Canvas (background) | | Bone White `#F9F6F0` |
| Text / structure | | Charcoal `#2D2D2D` |
| Header font | | Lexend Deca |
| Body font | | JetBrains Mono |
| Logo asset (path / upload) | | |
| Voice notes (how they sound) | | plain, short sentences, no jargon |

## 4. Pages & blocks (the Website face)

List every page. For each, list its blocks in order and where the content comes
from. Block types the engine knows: `hero`, `richtext`, `departments`/`services`,
`fieldNotes`/`testimonials`, `twoColumn`, `threeColumnGrid`, `cta`, `contactForm`.

| Page | Slug | Blocks (in order) | Content source |
|---|---|---|---|
| Home | `/` | hero → … → cta | |
| | | | |

## 5. Content collections (what the CMS manages)

Tick what this client needs. Each maps to a Supabase table, scoped by `client_id`.

- [ ] `pages` (block-built pages) — always on
- [ ] `articles` (blog / journal)
- [ ] `services`
- [ ] `testimonials`
- [ ] `team_members`
- [ ] `gallery_items`
- [ ] `content_calendar` (marketing run)
- [ ] other: ______________________

## 6. Integrations & settings

- Contact form: insert to `messages` + email via Resend to the address in §1.
- Bilingual (EN/ES)? [ ] yes  [ ] no — Spanish is human-reviewed, not machine.
- Other integrations (analytics, booking, payments): ______________________

## 7. Environment / config (filled at Stage 4)

| Var | Value |
|---|---|
| `NEXT_PUBLIC_CLIENT_ID` | |
| `NEXT_PUBLIC_SITE_URL` | |
| `CONTACT_FORM_TO_EMAIL` | |
| (Supabase URL / keys) | shared project — see onboarding runbook |

## 8. Acceptance criteria  *(what "done" means)*

Concrete, checkable statements. The build is done when all pass on the preview.

- [ ] Every listed page renders with its blocks in order.
- [ ] The Brand tokens are live (colors + fonts match §3).
- [ ] Admin login works; editing a page changes the live site.
- [ ] Contact form creates a message row and emails §1's address.
- [ ] Drafts and other clients' data are invisible to the anon/public role.
- [ ] Mobile layout holds at 375 / 768 / 1024px; Lighthouse ≥ 90.
- [ ] client-specific: ______________________

## 9. Design references (Stage 1 output)

Links / files for the concept: screens, block layouts, brand board.

- 
