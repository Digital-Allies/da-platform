-- ============================================================
-- Review: 14 Atomic Finds products corrupted by a CSV-importer bug
-- Supabase SQL Editor → New Query → Paste → Run the SELECT first
-- ============================================================
--
-- Context (2026-08-07): live browser testing on atomicfindsatx.store
-- surfaced two 404'd image requests on the homepage. Root cause traced to
-- src/components/admin/CSVCollectionImporter.tsx's CSV row parser, which
-- used a naive regex instead of a real CSV parser and broke on:
--   (a) any unquoted multi-word field (e.g. a "Seller" column value like
--       "Jennyfer Gomez") — split into extra tokens on whitespace, which
--       shifts every later column in that row by one position, and
--   (b) any quoted field containing an embedded literal `"` (e.g. a
--       dimensions value like `H 58" x W 40"`) — the old regex's
--       non-greedy `".*?"` match terminated at the FIRST embedded quote
--       instead of un-escaping a doubled `""`, again misaligning columns.
--
-- The parser itself is already fixed in code (same commit that adds this
-- file) — this file is ONLY about the 14 rows that were inserted through
-- the broken parser before the fix landed. All 14 share the exact same
-- created_at (2026-08-07 04:34:12.523959+00), confirming one single CSV
-- import batch, not 14 separate incidents.
--
-- Every row in the batch has at least one corrupted field: an `image_url`
-- or `external_url` of the literal string "Gomez" or "rated" (fragments
-- of a "Seller: Jennyfer Gomez" / "Rating: ...highly rated" column that
-- doesn't exist in the products schema and bled into the wrong column),
-- one row's `image_url` is a mangled JSON-looking dimensions fragment,
-- and several `description` values were truncated to just their last
-- word (e.g. "beautifully.", "shelves.", "striking.") — same
-- word-splitting bug eating everything before the last token.
--
-- The original CSV values that got shifted out are NOT recoverable from
-- the database — only fragments survived. Recommended fix: delete this
-- batch and re-run the same CSV file through the importer now that it's
-- fixed (re-exporting/re-uploading is simpler and more reliable than
-- trying to hand-reconstruct 14 rows from partial fragments).
--
-- ─── Step 1: review the exact rows (read-only) ──────────────
select id, title, price, category, image_url, description, external_url,
       selling_state, display_order, created_at
from products
where created_at = '2026-08-07 04:34:12.523959+00'
order by display_order;

-- ─── Step 2: delete the batch, ONLY after confirming above ──
-- Scoped to this exact timestamp + client, not a broad delete. Uncomment
-- and run only once you've decided to re-import rather than hand-fix.
-- delete from products
-- where created_at = '2026-08-07 04:34:12.523959+00'
--   and client_id = '443936d5-f92e-480b-b206-c65cfb52bdfc';
