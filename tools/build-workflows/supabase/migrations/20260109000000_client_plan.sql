-- Future-proofing for subscription tiers (agency-tier features like global
-- design-system editing). No gating logic yet — just reserving the column so
-- the schema doesn't need a breaking migration once tiers are designed.
alter table clients add column if not exists plan text not null default 'standard';
