// Reference only — rename ProductCardRef to ProductCard in your target codebase.
// CTA logic mirrors the production resolver at src/lib/commerce.ts
// (resolveProductCta) — see that file for the source of truth.
const CTA_DEFAULT_LABELS = {
  listing: 'View Listing',
  inquiry: 'Ask About This Item',
  direct: 'Message to Buy',
  checkout: 'Purchase Options',
};

function resolveCtaRef({ selling_state, cta_label, external_url }) {
  const state = selling_state || 'inquiry';
  // 'listing'/'checkout' only count as external once a URL actually exists —
  // otherwise both degrade to the inquiry flow, label included, so the
  // button never promises an outbound link (or a live checkout) that isn't there.
  const external = (state === 'listing' || state === 'checkout') && !!external_url;
  const label = cta_label || (external ? CTA_DEFAULT_LABELS[state] : CTA_DEFAULT_LABELS.inquiry);
  return { label, href: external ? external_url : '#contact', external };
}

/**
 * ProductCard — Single product from the live Supabase `products` table
 * @kind component
 */
function ProductCardRef({
  title,
  description,
  price,
  original_price,
  condition,
  location,
  listed_label,
  attributes,
  image_url,
  external_url,
  selling_state,
  cta_label,
  seller_name,
  seller_rating,
  ...props
}) {
  const cta = resolveCtaRef({ selling_state, cta_label, external_url });
  const attrEntries = attributes ? Object.entries(attributes).slice(0, 3) : [];
  const onSale = original_price != null && price != null;

  return (
    <div
      {...props}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-card-2) 100%)',
        border: 'var(--border-1)',
        transition: 'all var(--dur-base) var(--ease-out)',
        display: 'flex',
        flexDirection: 'column',
        ...props.style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(245,200,66,0.4)';
        e.currentTarget.style.boxShadow = 'var(--glow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--bg-inset)' }}>
        {image_url ? (
          <img src={image_url} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', color: 'var(--fg-soft)' }}>
            <img src="../assets/icons/woven-basket.png" alt="" style={{ width: 40, height: 40, objectFit: 'contain', opacity: 0.5 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Photo coming soon</span>
          </div>
        )}
        {condition && (
          <span style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(20,18,14,0.75)', color: 'var(--bone-white)' }}>{condition}</span>
        )}
        {onSale && (
          <span style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'var(--amber-orange)', color: '#1E1E1E', boxShadow: 'var(--glow-amber)' }}>Sale</span>
        )}
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--celestial-yellow)', textShadow: 'var(--glow-sm)', margin: '0 0 6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.25 }}>{title}</h3>

        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)', marginBottom: 'var(--space-3)' }}>
          {[location, listed_label].filter(Boolean).join(' · ')}
        </div>

        {attrEntries.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'var(--space-4)' }}>
            {attrEntries.map(([k, v]) => (
              <span key={k} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-body)', background: 'var(--bg-inset)', border: 'var(--border-1)', borderRadius: 'var(--radius-sm)', padding: '3px 8px' }}>{k}: {String(v)}</span>
            ))}
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--celestial-yellow)', textShadow: 'var(--glow-sm)', display: 'flex', alignItems: 'baseline', gap: 8 }}>
            {price == null ? (
              <span>Inquire</span>
            ) : (
              <>
                {onSale && <span style={{ fontSize: 14, color: 'var(--fg-soft)', textDecoration: 'line-through' }}>${original_price.toFixed(0)}</span>}
                <span>${price.toFixed(0)}</span>
              </>
            )}
          </div>
          <a
            href={cta.href}
            {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--celestial-yellow)', border: 'var(--border-1)', padding: '8px 14px', borderRadius: 'var(--radius-pill)', textDecoration: 'none', whiteSpace: 'nowrap' }}
          >{cta.label}{cta.external ? ' →' : ''}</a>
        </div>

        {(seller_name || seller_rating) && (
          <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: 'var(--border-1)', fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-soft)' }}>
            {[seller_name, seller_rating].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
    </div>
  );
}
