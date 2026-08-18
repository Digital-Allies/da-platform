# CMS-to-Site Sync Reference

Verified 2026-08-18 against live code — this replaces the per-module table in
`CRITICAL-FIXES-SPEC.md`'s Fix 3, which turned out to be stale in several
places (see below). Update this file, don't recreate it, if sync behavior
changes.

## Actual behavior

Every public-facing route (`/`, `/[slug]`, `/collections`, `/blog`,
`/blog/[slug]`) declares `export const revalidate = 60` (Next.js ISR). That
single setting governs **everything** rendered inside those routes, not just
the "primary" content of the page:

| Data | Rendered inside | Latency |
|---|---|---|
| Pages (published) | `/[slug]` | ≤60s |
| Collections | `/collections`, homepage | ≤60s |
| Blog posts | `/blog`, `/blog/[slug]` | ≤60s |
| Products | homepage, `/collections` (no standalone product route exists) | ≤60s |
| Settings (site name, logo, contact info) | every public route, via `getSiteSettings()` | ≤60s |
| Brand Theme (design tokens) | every public route, via `SiteTheme` → `getLiveDesignTokens()` | ≤60s |

There is no module that's genuinely real-time on the public site, and no
module that's actually disconnected. Every `get*()` helper in
`src/lib/data.ts` correctly scopes by `client_id` and filters
`status = 'published'` where relevant — checked `getPublishedPages`,
`getCollections`, `getPublishedPosts`, `getPageBySlug` directly. The admin's
own view is unaffected by any of this: `src/app/admin/(protected)/layout.tsx`
sets no `revalidate`, and cookie-based auth already forces dynamic rendering,
so a client always sees their own just-saved data immediately inside the
admin — the delay is public-site-only.

**`CRITICAL-FIXES-SPEC.md`'s Fix 3 table was stale**, not just imprecise:
Collections and Blog were marked "0/10" / "in progress," but both are wired
to live Supabase data with correct status filtering — same as everything
else. Settings and Brand Theme were marked "Real-time," but they render
inside the same ISR'd routes as everything else, so they carry the same ≤60s
delay, not zero.

**Re-reading the acceptance criterion:** Fix 3's target state says "live
within 30 seconds (or match ISR revalidate time)." The current uniform 60s
window *is* the ISR revalidate time, so it already satisfies the criterion
as literally written, even though it misses the "30 seconds" figure quoted
next to it. Worth Anthony confirming whether 60s is acceptable in practice
(e.g., during a live client demo) or whether it needs tightening.

## What's genuinely missing: success feedback

Zero success feedback anywhere in the admin. Every save handler across
Pages, Collections, Content/Blog, Settings, Theme, Products, Projects,
Development, and Research shows a browser `alert()` on error only (24 call
sites, all under `src/app/admin/(protected)/`). On success the form just
closes silently — e.g. `PagesClient.tsx`'s `handleSubmit` calls
`setIsEditing(false)` with no confirmation of any kind. This is the real
version of the problem Fix 3 describes ("client has no way to know if their
edit stuck") — it's a UI gap, not a connectivity gap.

**Not built in this session, on purpose:** `CMS-90-DAY-ROADMAP-REVISED.md`
Milestone 2 already scopes "Add toast notifications for success/error/warning
messages" across all modules as its own deliverable. Bolting a one-off toast
onto just Pages/Collections/Blog here would mean picking a pattern in
isolation now and likely ripping it out when Milestone 2 does the real
cross-admin implementation — redundant work, and it touches a different
system (admin-wide UI feedback) than this fix's actual scope (site sync
latency). Deferring to Milestone 2 instead of duplicating it.

## Instant revalidation (optional enhancement) — blocked on Anthony

The spec's `/api/revalidate` example assumes the admin and the public site
share one deployment/origin. They don't: `cms.digitalallies.net` (shared
admin, all tenants) and each client's public site (e.g.
`atomicfindsatx.store`) are **separate Vercel deployments**, each with its
own `NEXT_PUBLIC_CLIENT_ID` and origin — confirmed via `middleware.ts` (the
root-redirect-to-login logic is scoped specifically to the
`cms.digitalallies.net` host). Triggering instant revalidation from an admin
save means a cross-origin server-to-server call, which needs:

- a shared secret env var (e.g. `REVALIDATE_SECRET`) set on both the admin
  deployment and every public-site deployment, and
- each client's public site URL recorded somewhere the admin can read it
  (not currently stored anywhere)

Both require adding or changing Vercel environment variables, which
`CLAUDE.md` reserves for Anthony's sign-off. Not implemented this session —
flagging it as the real fix if 60s ISR turns out not to be fast enough, but
it needs Anthony's decision on the secret + per-project Vercel env setup
first.

## Summary

| Module | Syncs to live site? | Latency | Notes |
|---|---|---|---|
| Pages | ✅ | ≤60s (ISR) | status-filtered correctly |
| Collections | ✅ | ≤60s (ISR) | status-filtered correctly; contradicts spec's stale "0/10" |
| Blog / Press Office | ✅ | ≤60s (ISR) | status-filtered correctly; contradicts spec's stale "in progress" |
| Products | ✅ | ≤60s (ISR) | no standalone product route; rendered inside homepage/collections |
| Settings (name/logo/contact) | ✅ | ≤60s (ISR) | not real-time as spec claimed — same ISR window as everything else |
| Brand Theme | ✅ | ≤60s (ISR) | not real-time as spec claimed — `SiteTheme` renders inside the same ISR'd routes |
| Success feedback on save | ❌ | n/a | no toast/confirmation anywhere in admin; error-only `alert()`s (see above) |
