-- ============================================================
-- Atomic Finds — real product seed data (from Jennyfer's Facebook
-- Marketplace listings, provided 2026-07-17). Run AFTER
-- migrations/20260117000000_products_table.sql.
--
-- NOTE: image_url is left NULL for all four — the source data didn't
-- include photo URLs. Real product photos still need to be added before
-- this is usable on a live page; do not backfill with placeholder images.
--
-- NOTE: only 4 products are seeded here. A 5th item was cut off mid-paste
-- in the original message (title only, no other fields) — re-send the
-- rest of the catalog when ready and this file can be extended.
-- ============================================================

-- Safe to re-run: clear out these exact listings (by external_url) before
-- re-inserting, so this doesn't create duplicates on a second run.
delete from products where client_id = '443936d5-f92e-480b-b206-c65cfb52bdfc' and external_url in (
  'https://www.facebook.com/marketplace/item/2150548818844605/',
  'https://www.facebook.com/marketplace/item/3235493369971776/',
  'https://www.facebook.com/marketplace/item/1504095271020600/',
  'https://www.facebook.com/marketplace/item/1365991472086639/'
);

insert into products (
  client_id, title, description, price, original_price, condition,
  location, listed_label, attributes, external_url, seller_name,
  seller_rating, display_order
) values
(
  '443936d5-f92e-480b-b206-c65cfb52bdfc',
  'Vintage MCM Dining Set – Table + 4 Swivel Chairs',
  'Vintage 1970s-style dining set with wood-grain laminate tabletop, chrome pedestal base, and four cream vinyl swivel chairs on rolling chrome caster bases. Light surface wear and one repaired edge chip on table. Pickup South Austin. Final sale.',
  550.00, null, 'Used - Good', 'Austin, TX', '3 days ago',
  '{"Number of Seats": 4, "Decor Style": "Mid-Century Modern"}'::jsonb,
  'https://www.facebook.com/marketplace/item/2150548818844605/',
  'Jennyfer Gomez', '81 ratings - Highly rated', 1
),
(
  '443936d5-f92e-480b-b206-c65cfb52bdfc',
  'Vintage Wicker Waterfall Dresser | Boho Coastal Rattan Chest',
  'Vintage wicker waterfall dresser with four drawers, handwoven details, warm honey finish. Beautiful vintage condition with age-appropriate wear. Pickup South Austin. Final sale.',
  285.00, 365.00, 'Used - Good', 'Austin, TX', '4 days ago',
  '{"Date Range": "1970-1979", "Dimensions": "38in W x 33in D x 19in H", "Drawers": 4}'::jsonb,
  'https://www.facebook.com/marketplace/item/3235493369971776/',
  'Jennyfer Gomez', '81 ratings - Highly rated', 2
),
(
  '443936d5-f92e-480b-b206-c65cfb52bdfc',
  'Nordic Scandinavian Side Table / Mesa Lateral Escandinava 16x16',
  'Simple Nordic Scandinavian side table with clean minimalist wood design. Perfect condition. South Austin pickup. Final sale.',
  55.00, null, 'Used - like new', 'Austin, TX', 'In stock',
  '{"Decor Style": "Scandinavian", "Dimensions": "16in x 16in, 16.5in tall"}'::jsonb,
  'https://www.facebook.com/marketplace/item/1504095271020600/',
  'Jennyfer Gomez', '81 ratings - Highly rated', 3
),
(
  '443936d5-f92e-480b-b206-c65cfb52bdfc',
  'Vintage Bamboo & Wicker Bistro Set | Coastal Boho | 2 Chairs + Glass Table',
  'Vintage bamboo/wicker bistro set with two sculptural fan-back chairs and a wicker pedestal glass-top table. Excellent vintage condition, no structural issues. Pickup South Austin. Final sale.',
  250.00, null, 'Used - Good', 'Austin, TX', '2 weeks ago',
  '{"Number of Pieces": 3, "Type": "Bistro Set"}'::jsonb,
  'https://www.facebook.com/marketplace/item/1365991472086639/',
  'Jennyfer Gomez', '81 ratings - Highly rated', 4
);
