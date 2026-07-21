'use client'

// Storefront catalog: category tabs + product cards + quick-view modal.
// Built from sites/atomic-finds/design_handoff_product_grid (visual spec) with
// the flexible conversion layer from STATUS.md decision #8: the CTA is driven
// per product by selling_state via resolveProductCta() — never hard-coded.
// Quick-view modal instead of separate product pages (current direction).
// Styled entirely from the client's --tok-* theme variables so the pattern is
// reusable by any commerce client, not just Atomic Finds ATX.

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { type Product } from '@/lib/types'
import { resolveProductCta } from '@/lib/commerce'

interface ProductGridProps {
  title?: string
  products: Product[]
}

const glow = (opacity: number) => `0 0 16px color-mix(in srgb, var(--tok-primary) ${Math.round(opacity * 100)}%, transparent)`

function formatPrice(value: number): string {
  return `$${Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

function ImageFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ color: 'var(--tok-text-muted)' }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ opacity: 0.5 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.5-3.5L9 20" />
      </svg>
      <span className="text-[11px] uppercase tracking-widest">Photo coming soon</span>
    </div>
  )
}

function ProductCta({ product, onInquire }: { product: Product; onInquire?: () => void }) {
  const cta = resolveProductCta(product)
  const style: CSSProperties = {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
    color: 'var(--tok-primary)', border: '1px solid var(--tok-border)',
    padding: '8px 14px', borderRadius: 'var(--tok-radius-lg, 999px)', whiteSpace: 'nowrap', textDecoration: 'none',
  }
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" style={style} onClick={(e) => e.stopPropagation()}>
        {cta.label} →
      </a>
    )
  }
  return (
    <a
      href={cta.href}
      style={style}
      onClick={(e) => {
        e.stopPropagation()
        onInquire?.()
      }}
    >
      {cta.label}
    </a>
  )
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const onSale = product.original_price != null && product.price != null
  const cornerBadge = onSale ? 'Sale' : product.badge === 'featured' ? 'Featured' : null

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Quick view: ${product.title}`}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
      className="flex flex-col overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 focus-visible:-translate-y-1.5 outline-none"
      style={{
        borderRadius: 'var(--tok-radius-lg)',
        background: 'linear-gradient(180deg, var(--tok-surface) 0%, color-mix(in srgb, var(--tok-surface) 80%, black) 100%)',
        border: '1px solid var(--tok-border)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = glow(0.5) }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
    >
      <div className="relative" style={{ aspectRatio: '4/3', background: 'color-mix(in srgb, var(--tok-surface) 60%, black)' }}>
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <ImageFallback />
        )}
        {(product.category || product.condition) && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
            style={{ borderRadius: 999, background: 'rgba(0,0,0,0.55)', color: 'var(--tok-text)' }}
          >
            {product.category || product.condition}
          </span>
        )}
        {cornerBadge && (
          <span
            className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
            style={{
              borderRadius: 999,
              background: onSale ? 'var(--tok-secondary)' : 'var(--tok-primary)',
              color: 'var(--tok-bg)',
              boxShadow: glow(0.4),
            }}
          >
            {cornerBadge}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3
          className="text-lg leading-snug mb-1.5"
          style={{
            fontFamily: 'var(--tok-font-heading)',
            color: 'var(--tok-primary)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {product.title}
        </h3>

        {(product.location || product.listed_label) && (
          <div className="text-xs mb-3" style={{ color: 'var(--tok-text-muted)' }}>
            {[product.location, product.listed_label].filter(Boolean).join(' · ')}
          </div>
        )}

        {product.attributes && Object.keys(product.attributes).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {Object.entries(product.attributes).slice(0, 3).map(([k, v]) => (
              <span
                key={k}
                className="text-[11px] px-2 py-0.5"
                style={{ color: 'var(--tok-text)', background: 'color-mix(in srgb, var(--tok-surface) 60%, black)', border: '1px solid var(--tok-border)', borderRadius: 'var(--tok-radius)' }}
              >
                {k}: {String(v)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2" style={{ fontFamily: 'var(--tok-font-heading)', color: 'var(--tok-primary)', fontSize: 20 }}>
            {product.price == null ? (
              <span>Inquire</span>
            ) : (
              <>
                {onSale && (
                  <span className="line-through" style={{ fontSize: 14, color: 'var(--tok-text-muted)' }}>
                    {formatPrice(product.original_price as number)}
                  </span>
                )}
                <span>{formatPrice(product.price)}</span>
              </>
            )}
          </div>
          <ProductCta product={product} />
        </div>

        {(product.seller_name || product.seller_rating) && (
          <div className="mt-3 pt-3 text-[11px]" style={{ borderTop: '1px solid var(--tok-border)', color: 'var(--tok-text-muted)' }}>
            {[product.seller_name, product.seller_rating].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
    </div>
  )
}

function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const onSale = product.original_price != null && product.price != null
  const specs: Array<[string, string]> = []
  if (product.dimensions) specs.push(['Dimensions', product.dimensions])
  if (product.origin) specs.push(['Origin', product.origin])
  if (product.era) specs.push(['Era', product.era])
  if (product.condition) specs.push(['Condition', product.condition])
  for (const [k, v] of Object.entries(product.attributes ?? {})) specs.push([k, String(v)])

  return (
    <div
      // z-[200] (not the default z-50) so this sits above any sticky nav a host
      // page defines — Atomic Finds ATX's nav is z-index:100. No md: escalation
      // on padding here — this project's Tailwind spacing scale is redefined
      // to design-system section sizes (p-8 = 120px), not the Tailwind default.
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto grid md:grid-cols-2"
        style={{ borderRadius: 'var(--tok-radius-lg)', background: 'var(--tok-surface)', border: '1px solid var(--tok-border)', boxShadow: glow(0.35) }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center text-lg"
          style={{ borderRadius: 999, background: 'rgba(0,0,0,0.45)', color: 'var(--tok-text)', border: '1px solid var(--tok-border)' }}
        >
          ✕
        </button>

        <div style={{ aspectRatio: '1/1', background: 'color-mix(in srgb, var(--tok-surface) 60%, black)' }}>
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <ImageFallback />
          )}
        </div>

        {/* p-4, not p-6/p-8 — this project's Tailwind spacing scale is
            redefined to design-system section sizes (p-6=64px, p-8=120px),
            which left almost none of this ~270-330px column for text and
            forced every line to wrap one word at a time. */}
        <div className="p-4 flex flex-col">
          {product.tagline && (
            <div className="mb-1" style={{ fontFamily: "'Pacifico', cursive", color: 'var(--tok-secondary)', fontSize: 18 }}>
              {product.tagline}
            </div>
          )}
          <h2 className="mb-3" style={{ fontFamily: 'var(--tok-font-heading)', color: 'var(--tok-primary)', fontSize: 26, lineHeight: 1.15 }}>
            {product.title}
          </h2>
          {product.description && (
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--tok-text)' }}>
              {product.description}
            </p>
          )}
          {specs.length > 0 && (
            <dl className="text-xs mb-4 space-y-1" style={{ color: 'var(--tok-text-muted)' }}>
              {specs.map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="font-semibold">{k}:</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-4" style={{ borderTop: '1px solid var(--tok-border)' }}>
            <div className="flex items-baseline gap-2" style={{ fontFamily: 'var(--tok-font-heading)', color: 'var(--tok-primary)', fontSize: 24 }}>
              {product.price == null ? (
                <span>Inquire</span>
              ) : (
                <>
                  {onSale && (
                    <span className="line-through" style={{ fontSize: 15, color: 'var(--tok-text-muted)' }}>
                      {formatPrice(product.original_price as number)}
                    </span>
                  )}
                  <span>{formatPrice(product.price)}</span>
                </>
              )}
            </div>
            {/* Full-width in the modal's narrower detail column — the card's
                inline price+CTA row is too tight for longer CTA labels like
                "Ask About This Item". */}
            <div className="flex justify-center">
              <ProductCta product={product} onInquire={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid({ title = 'Featured Finds', products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [quickView, setQuickView] = useState<Product | null>(null)

  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const p of products) if (p.category) set.add(p.category)
    return Array.from(set)
  }, [products])

  const visible = activeCategory ? products.filter((p) => p.category === activeCategory) : products

  if (!products.length) return null

  return (
    <section className="section">
      <div className="section-inner">
        {title && (
          <h2
            className="text-center mb-4"
            style={{ fontFamily: 'var(--tok-font-heading)', color: 'var(--tok-primary)', fontSize: 'clamp(32px, 4.5vw, 52px)', textShadow: glow(0.5) }}
          >
            {title}
          </h2>
        )}
        <p className="text-center text-sm mb-8" style={{ color: 'var(--tok-text-muted)' }}>
          {products.length} piece{products.length === 1 ? '' : 's'} available
        </p>

        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Product categories">
            {[null, ...categories].map((cat) => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat ?? '__all'}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
                  style={{
                    borderRadius: 999,
                    border: `1px solid ${active ? 'var(--tok-primary)' : 'var(--tok-border)'}`,
                    background: active ? 'var(--tok-primary)' : 'transparent',
                    color: active ? 'var(--tok-bg)' : 'var(--tok-text)',
                  }}
                >
                  {cat ?? 'All'}
                </button>
              )
            })}
          </div>
        )}

        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={() => setQuickView(p)} />
          ))}
        </div>
      </div>

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </section>
  )
}
