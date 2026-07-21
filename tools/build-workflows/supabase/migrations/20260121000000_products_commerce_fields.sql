-- ============================================================
-- Products — commerce fields (Atomic Finds ATX storefront)
-- Adds the catalog fields from the design-system product schema
-- (sku/category/tagline/badge/in_stock/origin/era/dimensions) plus
-- the flexible conversion layer (STATUS.md decision #8): a per-product
-- selling_state driving the CTA, with an optional label override.
-- Run this in: Supabase Dashboard -> SQL Editor -> New Query
-- (safe to re-run)
-- ============================================================

alter table products
  add column if not exists sku           text,
  add column if not exists category      text,           -- drives catalog tabs, e.g. "Chairs" / "Lamps" / "Shelving"
  add column if not exists tagline       text,           -- short script accent line, e.g. "icon of the 70s"
  add column if not exists badge         text,           -- 'featured' | 'instock' (display label; catalog "Featured" rows)
  add column if not exists in_stock      boolean not null default true,
  add column if not exists origin        text,           -- e.g. "Philippines"
  add column if not exists era           text,           -- e.g. "1970s"
  add column if not exists dimensions    text,           -- freeform, e.g. 'H 58" x W 40" x D 32"'
  add column if not exists selling_state text not null default 'listing',
  add column if not exists cta_label     text;           -- optional CTA override; defaults derive from selling_state

-- Constraints added separately so re-runs don't fail on existing ones
do $$ begin
  alter table products add constraint products_badge_check
    check (badge is null or badge in ('featured','instock'));
exception when duplicate_object then null; end $$;

do $$ begin
  -- The conversion path varies per product and stays provider-agnostic:
  --   listing  -> outbound link (external_url: Marketplace today)
  --   inquiry  -> interest/contact flow ("Ask About This Item")
  --   direct   -> direct-payment coordination ("Message to Buy")
  --   checkout -> future on-site/hosted purchase flow (provider TBD)
  alter table products add constraint products_selling_state_check
    check (selling_state in ('listing','inquiry','direct','checkout'));
exception when duplicate_object then null; end $$;

-- inquiry/direct products may have no outbound listing URL
alter table products alter column external_url drop not null;

-- Per-client unique SKU (only when a SKU is set)
create unique index if not exists idx_products_client_sku
  on products(client_id, sku) where sku is not null;

-- Category tabs filter
create index if not exists idx_products_client_category
  on products(client_id, category);
