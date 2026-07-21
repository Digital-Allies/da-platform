'use client'

// GalaxyCard — Atomic Finds ATX signature featured-product card. Ported from
// sites/atomic-finds/design_handoff_homepage/components/GalaxyCard.reference.jsx:
// a tilted 3D orbital ring with an orbiting moon around a nebula-washed product
// card, hover lift/scale, click opens a detail dialog.
//
// The reference's dialog CTA was a hard-coded "Add to Cart" — replaced here
// with resolveProductCta() per the flexible conversion layer (STATUS.md
// decision #8), consistent with ProductGrid. Everything else — geometry,
// colors, motion — is a faithful port.

import { useEffect, useId, useState } from 'react'
import { type Product } from '@/lib/types'
import { resolveProductCta } from '@/lib/commerce'

interface GalaxyCardProps {
  product: Product
  /** Nebula background image behind the card (design choice per card, not stored on the product) */
  bg?: string
}

function OrbitIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" />
      <path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />
    </svg>
  )
}

function ProductImage({ image, title, style }: { image: string | null; title: string; style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'relative', width: '90%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10, ...style }}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0 8px, rgba(0,0,0,0.28) 8px 16px)', border: '1px dashed rgba(240,232,216,0.45)' }}>
          <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,232,216,0.8)' }}>
            product shot
          </span>
        </div>
      )}
    </div>
  )
}

export default function GalaxyCard({ product, bg }: GalaxyCardProps) {
  const id = 'gc-' + useId().replace(/:/g, '')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const priceStr = product.price != null ? product.price.toLocaleString('en-US', { maximumFractionDigits: 0 }) : 'Inquire'
  const cta = resolveProductCta(product)

  const cardBg = bg
    ? `linear-gradient(160deg, rgba(20,17,12,0.32) 0%, rgba(12,11,8,0.74) 80%), url("${bg}") center/cover no-repeat`
    : 'radial-gradient(ellipse at 28% 16%, rgba(245,200,66,0.16) 0%, transparent 52%), radial-gradient(ellipse at 80% 84%, rgba(212,130,42,0.14) 0%, transparent 55%), #14120E'

  const gold = 'rgba(245, 200, 66, 0.7)'

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <style>{`
        @keyframes ${id}-spin { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
        @keyframes ${id}-rev  { from { transform: rotateZ(360deg); } to { transform: rotateZ(0deg); } }
        #${id}-scene { transition: transform 500ms cubic-bezier(0.16,1,0.3,1); }
        #${id}-group:hover #${id}-scene { transform: scale(1.03); }
        @media (prefers-reduced-motion: no-preference) {
          #${id}-ring   { animation: ${id}-spin 25s linear infinite; }
          #${id}-planet { animation: ${id}-rev  25s linear infinite; }
        }
      `}</style>

      <div
        id={`${id}-group`}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) } }}
        style={{ position: 'relative', cursor: 'pointer', width: 'clamp(280px, 90vw, 360px)', height: 'clamp(400px, 120vw, 520px)', flexShrink: 0, isolation: 'isolate', perspective: 1200 }}
      >
        <div id={`${id}-scene`} style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 'clamp(500px, 150vw, 700px)', height: 'clamp(500px, 150vw, 700px)', transform: 'translate(-50%, -50%)', transformStyle: 'preserve-3d', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotateZ(-35deg) rotateX(75deg)', transformStyle: 'preserve-3d' }}>
              <div id={`${id}-ring`} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: `4px solid ${gold}`, boxShadow: '0 0 30px rgba(245,200,66,0.6), inset 0 0 20px rgba(245,200,66,0.4)', transformStyle: 'preserve-3d' }}>
                <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1px solid rgba(245,200,66,0.3)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)', transformStyle: 'preserve-3d' }}>
                  <div id={`${id}-planet`} style={{ transformStyle: 'preserve-3d' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', boxShadow: '0 0 15px rgba(163,228,215,0.8), inset 0 0 8px rgba(0,0,0,0.5)', border: '1px solid rgba(207,255,245,0.5)', transform: 'rotateX(-75deg) rotateZ(35deg)', background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #A3E4D7 20%, #2B8271 60%, #0A362E 100%)' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: 8, height: 8, borderRadius: '50%', background: '#F0E8D8', boxShadow: '0 0 15px #F0E8D8' }} />
                <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 10, height: 10, borderRadius: '50%', background: '#F5C842', boxShadow: '0 0 20px #F5C842' }} />
                <div style={{ position: 'absolute', top: '40%', right: '5%', width: 6, height: 6, borderRadius: '50%', background: '#F0E8D8', boxShadow: '0 0 10px #F0E8D8' }} />
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 24, background: cardBg, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid rgba(245,200,66,0.4)', boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(245,200,66,0.15)' }}>
            <div style={{ height: 260, width: '94%', margin: '12px auto 0', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)', border: '2px solid rgba(245,200,66,0.4)', backgroundColor: '#2D2D2D' }}>
              <ProductImage image={product.image_url} title={product.title} />
            </div>

            <div style={{ flex: 1, padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'var(--bone-white)', background: 'linear-gradient(180deg, rgba(14,12,9,0) 0%, rgba(14,12,9,0.42) 55%, rgba(14,12,9,0.72) 100%)' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 42, letterSpacing: '0.01em', color: 'var(--celestial-yellow)', lineHeight: 1, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{product.title}</h3>
                {product.tagline && (
                  <p style={{ fontFamily: 'var(--font-script)', fontSize: 30, color: 'var(--amber-orange)', margin: '0 0 12px 0', lineHeight: 1.1 }}>{product.tagline}</p>
                )}
                {product.description && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.55, margin: 0, opacity: 0.95, textShadow: '0 1px 6px rgba(0,0,0,0.9)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
                )}
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--celestial-yellow)', color: '#1E1E1E', padding: '2px 16px', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 20, boxShadow: '0 0 15px rgba(245,200,66,0.3)' }}>
                  {product.price != null ? `$${priceStr}` : 'Inquire'}
                  <OrbitIcon size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          role="presentation"
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={product.title}
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: '90vw', maxWidth: 800, maxHeight: '90vh', overflow: 'auto', background: 'var(--bg-card-2)', borderRadius: 18, border: '1px solid rgba(245,200,66,0.3)', boxShadow: '0 0 50px rgba(245,200,66,0.12)', display: 'flex', flexWrap: 'wrap' }}
          >
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(240,232,216,0.85)', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
            >
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>

            <div style={{ flex: '1 1 320px', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: '#2D2D2D' }}>
              <ProductImage image={product.image_url} title={product.title} style={{ width: '100%', height: '100%' }} />
            </div>

            <div style={{ flex: '1 1 320px', padding: 32, display: 'flex', flexDirection: 'column', color: 'var(--bone-white)', background: 'linear-gradient(180deg, #242424 0%, #16140F 100%)' }}>
              <div style={{ marginBottom: 24, marginTop: 8 }}>
                {product.tagline && (
                  <p style={{ fontFamily: 'var(--font-script)', fontSize: 30, color: 'var(--amber-orange)', margin: '0 0 8px 0', lineHeight: 1.1 }}>{product.tagline}</p>
                )}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--celestial-yellow)', lineHeight: 1, margin: '0 0 20px 0' }}>{product.title}</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-body)', lineHeight: 1.7, margin: 0 }}>
                  {product.description}
                  {(product.dimensions || product.origin || product.era) && <><br /><br /></>}
                  {product.dimensions && <>Dimensions: {product.dimensions}<br /></>}
                  {product.origin && <>Origin: {product.origin}<br /></>}
                  {product.era && <>Era: {product.era}</>}
                </p>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--celestial-yellow)' }}>
                    {product.price != null ? `$${priceStr}` : 'Inquire'}
                  </span>
                </div>
                <a
                  href={cta.href}
                  {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: () => setOpen(false) })}
                  style={{ width: '100%', boxSizing: 'border-box', background: 'var(--celestial-yellow)', color: '#1E1E1E', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, letterSpacing: '0.04em', padding: '16px 24px', borderRadius: 999, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}
                >
                  <OrbitIcon size={18} />
                  {cta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
