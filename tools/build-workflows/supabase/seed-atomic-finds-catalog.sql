-- ============================================================
-- Atomic Finds ATX — designed catalog seed (10 photographed pieces)
-- Source: the Claude Design system's products-catalog.json (prices
-- converted from cents to dollars). Run AFTER
-- migrations/20260121000000_products_commerce_fields.sql.
--
-- These are inquiry products (no Marketplace listing link) — the CTA
-- routes to the contact flow per the flexible conversion layer
-- (STATUS.md decision #8). The 4 earlier Marketplace rows from
-- seed-atomic-finds-products.sql are separate pieces and keep their
-- 'listing' state; together the catalog is 14 items.
--
-- image_url paths point at the photos shipped in the CMS engine at
-- tools/build-workflows/public/atomic-finds/products/.
--
-- NOTE: 4 more photos exist without data rows yet (product-lamp-01,
-- product-bookshelf-03, product-peacock-chair-05,
-- product-bamboo-armchair-09) — add them via the admin Showroom once
-- titles/prices are known.
-- ============================================================

-- Safe to re-run: clear these exact rows (by client + SKU) first.
delete from products
where client_id = '2afb056f-408d-419d-be2b-d414ffffdd5c'
  and sku in ('AF-002','AF-004','AF-006','AF-007','AF-008','AF-010','AF-011','AF-012','AF-013','AF-014');

insert into products (
  client_id, sku, title, category, tagline, description, price,
  image_url, badge, in_stock, origin, era, dimensions,
  condition, location, listed_label, selling_state,
  seller_name, seller_rating, display_order
) values
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-002',
  'Peacock Chair', 'Chairs', 'icon of the 70s',
  '1970s rattan peacock chair, restored cane back. A dramatic seating option for sunrooms, studios, or anywhere bold.',
  1450.00, '/atomic-finds/products/product-peacock-chair-02.png',
  'featured', true, 'Philippines', '1970s', 'H 58" x W 40" x D 32"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 5
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-004',
  'Rattan Lounge Chair', 'Chairs', 'vintage find',
  'Newly restored upholstery in neutral linen. A statement piece that catches light beautifully.',
  145.00, '/atomic-finds/products/product-rattan-chair-04.png',
  'featured', true, 'United States', '1970s', 'H 34" x W 28" x D 30"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 6
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-010',
  'Blue MCM Armchair', 'Chairs', 'plush meets rattan',
  'Deep blue upholstery on a rattan-accented mid-century base. Unexpected and striking.',
  595.00, '/atomic-finds/products/product-blue-mcm-armchair-10.png',
  'instock', true, 'United States', '1960s', 'H 30" x W 30" x D 32"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 7
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-008',
  'Rattan Armchair', 'Chairs', 'everyday elegance',
  'A sturdy woven rattan armchair, ready to be your favorite reading spot.',
  195.00, '/atomic-finds/products/product-rattan-armchair-08.png',
  'instock', true, 'Philippines', '1970s', 'H 32" x W 26" x D 28"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 8
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-013',
  'Striped Wicker Chair', 'Chairs', 'work in style',
  'A round-backed wicker chair with striped detailing. Lightweight and surprisingly comfortable.',
  165.00, '/atomic-finds/products/product-striped-wicker-chair-13.png',
  'instock', true, 'United States', '1970s', 'H 33" x W 24" x D 24"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 9
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-014',
  'Teal MCM Chair', 'Chairs', 'clean lines, warm soul',
  'A sleek teal side chair in the mid-century modern tradition — understated confidence.',
  445.00, '/atomic-finds/products/product-teal-mcm-chair-14.png',
  'instock', true, 'United States', '1960s', 'H 31" x W 22" x D 24"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 10
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-006',
  'Woven Floor Lamp', 'Lamps', 'warm light, big mood',
  'A naturalistic wicker floor lamp with a tightly woven pole form. Rewired with modern fittings.',
  175.00, '/atomic-finds/products/product-floor-lamp-06.png',
  'instock', true, 'Philippines', '1970s', 'H 62" x Dia 16"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 11
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-007',
  'Arched Étagère', 'Shelving', 'vertical drama',
  'Tall woven shelving unit with a graceful arched top and multiple display shelves.',
  385.00, '/atomic-finds/products/product-arched-etagere-07.png',
  'instock', true, 'Philippines', '1970s', 'H 74" x W 30" x D 14"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 12
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-011',
  'Rattan Bookshelf', 'Shelving', 'rattan meets modern',
  'Open rattan bookshelf — a rare combination of organic material and clean modernism.',
  520.00, '/atomic-finds/products/product-rattan-bookshelf-11.png',
  'featured', true, 'United States', '1970s', 'H 68" x W 32" x D 12"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 13
),
(
  '2afb056f-408d-419d-be2b-d414ffffdd5c', 'AF-012',
  'Wicker Cabinet', 'Shelving', 'storage with soul',
  'Closed wicker cabinet with woven doors — hides the clutter, keeps the character.',
  410.00, '/atomic-finds/products/product-wicker-cabinet-12.png',
  'instock', true, 'Philippines', '1970s', 'H 66" x W 34" x D 18"',
  'Restored', 'Austin, TX', 'In stock', 'inquiry',
  'Jennyfer Gomez', '81 ratings - Highly rated', 14
);
