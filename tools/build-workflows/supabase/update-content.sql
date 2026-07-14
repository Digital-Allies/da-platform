-- ============================================================
-- Digital Allies — Update Database Content (Services & Testimonials)
--
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- CLIENT_ID for Digital Allies: '3d76b896-e1fb-49f0-a8db-f62fdd5bc258'

-- ─── 1. Clean existing records ───────────────────────────────
delete from services where client_id = '3d76b896-e1fb-49f0-a8db-f62fdd5bc258';
delete from testimonials where client_id = '3d76b896-e1fb-49f0-a8db-f62fdd5bc258';

-- ─── 2. Insert services (departments) ──────────────────────────
insert into services (client_id, title, description, icon, display_order) values
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'The Design Bureau',
    'I design before I develop. Websites, graphic design, menus, signage, pitch decks — polished visuals that look like you meant it. Brand discovery included.',
    '🎨',
    1
  ),
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Dept. of Cooperation',
    'Your apps talk to each other without arguing. Clean handoffs so you stop copying and pasting between platforms.',
    '🔄',
    2
  ),
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'The Self-Governing Bureau',
    'The boring, repetitive stuff runs automatically. You''ve got better things to do.',
    '⚙️',
    3
  ),
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'The Permanent Observation Post',
    'Monitoring runs 24/7. If something breaks at 2am, that''s my problem — not yours.',
    '📡',
    4
  );

-- ─── 3. Insert testimonials (reviews) ─────────────────────────
insert into testimonials (client_id, author_name, author_role, content, rating, display_order) values
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Sasha Esposito',
    'Marriage and Family Therapy, Inc.',
    'Anthony has a rare natural ability to step into the world of his client and tune into what is important to them. His guidance is a safe pathway through.',
    5,
    1
  ),
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Victoria Buckholz',
    'Journey to the Center of Hope',
    'Digital Allies has truly been a beacon of expertise and reliability. I wholeheartedly recommend them to any organization seeking a dependable and knowledgeable tech partner.',
    5,
    2
  ),
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Tao Wei',
    'Tao Wei Designs',
    'Working with Digital Allies is not just about achieving results. It is about experiencing the clarity of real collaboration — where questions get answered and decisions get made.',
    5,
    3
  );
