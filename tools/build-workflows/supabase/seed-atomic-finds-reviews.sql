-- ============================================================
-- Atomic Finds ATX — real customer reviews (from Jennyfer's Facebook
-- Marketplace profile, via the Claude Design system's reviews-catalog.json).
-- All 19 rows, most recent first; 6 are featured_on_homepage per the
-- design (matches the homepage's hardcoded 6-review grid exactly).
-- Run AFTER migrations/20260122000000_reviews_table.sql.
-- Never fabricate reviews — only real ones from that profile.
-- ============================================================

-- Safe to re-run: clear this client's reviews first (whole-table refresh,
-- since reviews aren't individually addressable the way SKUs are).
delete from reviews where client_id = '443936d5-f92e-480b-b206-c65cfb52bdfc';

insert into reviews (
  client_id, reviewer_name, review_date, rating_type, text, seller_response,
  source, notable_tags, featured_on_homepage, sort_order
) values
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Esteban', '2026-07-13', 'written', 'Jennyfer and her husband are awesome! Wonderful sellers and wonderful people. We live nearby and they even went out of their way to deliver the table so I didn''t have to get a U-Haul. Thank you so much!', null, 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], true, 1),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Ally', '2026-06-04', 'written', 'Thank you!', null, 'facebook', ARRAY['Pricing','Item Description','Punctuality','Communication'], false, 2),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Michael', '2026-06-19', 'rating_only', null, null, 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], false, 3),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Butler', '2026-05-26', 'written', 'Very nice seller :)', null, 'facebook', ARRAY[]::text[], false, 4),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Amanda', '2026-05-24', 'written', 'It was great doing business with Jennyfer. The barcart is exactly as described! She was fast to respond and very friendly.', null, 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], true, 5),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Christian', '2026-05-30', 'rating_only', null, null, 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], false, 6),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Emily', '2026-05-28', 'rating_only', null, null, 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], false, 7),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Michelle', '2026-05-22', 'rating_only', null, null, 'facebook', ARRAY['Communication','Pricing','Item Description'], false, 8),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Brittney', '2026-04-27', 'written', 'Very kind and friendly!! Absolutely loved buying from her and I am OBSESSED with the set I got!! I will most likely be back >:)', 'Awe thank you so much for your awesome review ! I''m so glad you love it as much as I do ! Enjoy it !', 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], true, 9),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Rob', '2026-04-06', 'rating_only', null, null, 'facebook', ARRAY['Punctuality','Communication','Item Description'], false, 10),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'McKenzie', '2026-03-27', 'written', 'Wonderful, perfect, amazing, and great in every way! MY CHAIRS ARE SO FREAKING CUTE', null, 'facebook', ARRAY[]::text[], true, 11),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Jaime', '2026-03-26', 'rating_only', null, null, 'facebook', ARRAY['Pricing','Item Description','Punctuality','Communication'], false, 12),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Desiree', '2026-03-26', 'written', 'Great item for a wonderful price and very easy to communicate and pickup', null, 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], true, 13),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Johannah', '2026-03-13', 'rating_only', null, null, 'facebook', ARRAY['Item Description','Communication'], false, 14),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Cynthia', '2026-03-08', 'rating_only', null, null, 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], false, 15),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Meg', '2026-03-10', 'written', 'My experience with Jennyfer was great! She was very fair in pricing + negotiation, plus she made the pickup process very easy.', null, 'facebook', ARRAY['Communication','Pricing'], true, 16),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Margaret', '2026-02-23', 'rating_only', null, null, 'facebook', ARRAY['Punctuality','Communication','Pricing','Item Description'], false, 17),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Aahana', '2026-02-22', 'written', 'Very poor communicator, never provides full information, did not answer messages, when answering only few Words. Very likely a Scam. DO NOT BUY from her.', 'Hi Aahana, I''m sorry you felt this way. I always try to respond as quickly as possible and provide accurate information for every listing. Many buyers have had positive experiences, as reflected in my other reviews. I wish you the best in finding what you''re looking for.', 'facebook', ARRAY[]::text[], false, 18),
('443936d5-f92e-480b-b206-c65cfb52bdfc', 'Kyle', '2026-02-14', 'written', 'Quick to respond and friendly! Product was exactly as described.', 'Thank you Kyle! I''m glad everything worked out and that the piece was exactly what you expected. Enjoy it!', 'facebook', ARRAY[]::text[], false, 19);
