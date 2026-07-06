# Client onboarding runbook — <CLIENT NAME>

Stage 4 of the pipeline: stand a client up on the live Platform. Work top to
bottom. Every client runs on the same shared codebase and Supabase; isolation is
by `client_id` + RLS. See `../PIPELINE.md`.

Prerequisite: a complete Build Brief and an approved build on a Vercel preview.

---

## 1. Supabase — create the tenant

- [ ] Generate a UUID for `client_id` (`gen_random_uuid()` or uuidgenerator.net).
- [ ] Insert the client row:
      ```sql
      insert into clients (id, name, slug, domain)
      values ('<UUID>', '<Client Name>', '<slug>', '<domain>');
      ```
- [ ] Insert `settings` rows (site_title, brand_color, hero copy, phone, email).
- [ ] Insert `design_tokens` for the Brand face (colors, fonts, logo).
- [ ] Seed starter content (services, testimonials, a first page) per the brief.
- [ ] Write the `client_id` back into the Build Brief §7.

## 2. Vercel — deploy their face

**Templated tier:**
- [ ] New Project → import the shared repo (`da-platform` / build-workflows).
- [ ] Set env vars: `NEXT_PUBLIC_CLIENT_ID` = their UUID, `NEXT_PUBLIC_SITE_URL`
      = their domain, `CONTACT_FORM_TO_EMAIL` = their email. Supabase keys stay
      the shared values.
- [ ] Deploy; confirm a green build.

**Connected tier:**
- [ ] In the client's existing site repo, add the Supabase client + the content
      fetches for the sections that go dynamic.
- [ ] Set the same `CLIENT_ID` / Supabase env vars there.
- [ ] Deploy that repo to Vercel.

## 3. Auth — give them their key

- [ ] Supabase → Authentication → Users → Invite → the admin email(s) from the
      brief. They log in at `<domain>/admin`.
- [ ] Supabase → Auth → URL config: add `<domain>` (and localhost for dev) to
      Site URL + redirect URLs.

## 4. Domain & DNS

- [ ] Add the domain (and `www`) in the Vercel project.
- [ ] Point the registrar's A / CNAME records at Vercel.
- [ ] Verify HTTPS resolves and magic-link login works on the real domain.
- [ ] Keep any old site reachable until the new one is verified.

## 5. RLS verification — the wall holds

- [ ] With the anon key: published rows are readable, drafts are not.
- [ ] With the anon key: another client's rows are not readable.
- [ ] Writes as anon are rejected.

## 6. Launch QA

- [ ] Every page loads; blocks in order.
- [ ] Admin login → edit a page → live site changes (the connected loop).
- [ ] Contact form: creates a message row + emails the brief's address + appears
      in the admin inbox.
- [ ] Mobile holds at 375 / 768 / 1024px; Lighthouse ≥ 90.
- [ ] Meta tags, favicon, 404 present.

## 7. Handoff

- [ ] Send login + admin link.
- [ ] 5-minute walkthrough (log in, edit a post, add a service, edit settings).
- [ ] Confirm they can drive it themselves.

---

*Done when: the client has all three faces live — their Admin, their Brand,
their Website — and only their own data is reachable.*
