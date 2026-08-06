import React from 'react'
import SiteTheme from '@/components/site/SiteTheme'
import AtomicNav from '@sites/atomic-finds/components/AtomicNav'
import ConstellationHeroCanvas from '@sites/atomic-finds/components/ConstellationHeroCanvas'
import ProductGrid from '@/components/site/ProductGrid'
import { getSiteSettings, getProducts, getCollections, getPublishedPages } from '@/lib/data'
import { ATOMIC_FINDS_CLIENT_ID } from '@/lib/theme'
import '@sites/atomic-finds/styles/atomic-finds.css'

export const metadata = {
  title: 'Shop Collections | Atomic Finds ATX',
  description: 'Explore hand-restored 1970s rattan, bamboo, and mid-century vintage furniture collections in Austin, TX.',
}

export const revalidate = 60 // ISR refresh every 60 seconds

export default async function CollectionsPage() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || ATOMIC_FINDS_CLIENT_ID
  const [settings, products, collections, publishedPages] = await Promise.all([
    getSiteSettings(clientId),
    getProducts(),
    getCollections(),
    getPublishedPages(),
  ])

  return (
    <SiteTheme clientId={clientId}>
      <div className="af-homepage" style={{ minHeight: '100vh', background: '#141119' }}>
        <div className="af-weave-fixed" />
        <div className="af-page">
          <AtomicNav logoUrl={settings.logo_url || undefined} pages={publishedPages} />

          {/* Hero section with interactive Constellation Background (without buttons) */}
          <section className="relative overflow-hidden" style={{ minHeight: '520px' }}>
            <ConstellationHeroCanvas>
              <div className="max-w-4xl mx-auto text-center px-6 py-20 md:py-28" style={{ pointerEvents: 'auto' }}>
                <p className="af-section-eyebrow" style={{ color: 'var(--ochre-tan, #D9A05B)', marginBottom: '8px' }}>
                  Hand-Restored Vintage Treasures
                </p>
                <h1
                  className="af-section-title text-4xl md:text-6xl font-bold tracking-tight mb-4"
                  style={{ color: 'var(--celestial-yellow, #F5C842)', textShadow: '0 0 16px rgba(245,200,66,0.35)' }}
                >
                  Curated Shop Collections
                </h1>
                <p className="af-section-script text-lg md:text-xl mb-8" style={{ color: 'var(--bone-white, #FAF6EE)', maxWidth: '600px', margin: '0 auto 32px' }}>
                  Explore 1970s rattan, bamboo loungers, arched étagères, and sculptural mid-century showstoppers.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <a className="af-btn-solid" href="#catalog-grid">
                    Browse All Collections →
                  </a>
                  <a className="af-btn-outline" href="/#contact">
                    Ask Jennyfer About a Piece
                  </a>
                </div>
              </div>
            </ConstellationHeroCanvas>
          </section>

          {/* Main Product & Collection Grid */}
          <main id="catalog-grid" className="af-section py-16 px-6" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="max-w-site mx-auto">
              <ProductGrid
                products={products}
                collections={collections}
                title="Explore Catalog & Curated Sets"
              />
            </div>
          </main>

          {/* Footer */}
          <footer className="af-footer">
            <div className="af-footer-grid">
              <div>
                <a href="/">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="af-footer-logo" src={settings.logo_url || "/atomic-finds/logos/logo-mark-new.png"} alt={settings.site_title} />
                </a>
                <p className="af-footer-script">where vintage meets digital</p>
                <p className="af-footer-desc">{settings.site_description || 'Curated rattan & bamboo for the modern home.'}</p>
              </div>
              <div className="af-footer-col">
                <h4>Navigation</h4>
                <a className="af-footer-link" href="/">Home</a>
                <a className="af-footer-link" href="/collections">Shop Collections</a>
                <a className="af-footer-link" href="/#contact">Contact</a>
              </div>
              <div className="af-footer-col">
                <h4>Legal</h4>
                <a className="af-footer-link" href="/privacy">Privacy Policy</a>
                <a className="af-footer-link" href="/terms">Terms of Service</a>
                <a className="af-footer-link" href="/cookies">Cookie Policy</a>
                <a className="af-footer-link" href="/accessibility">Accessibility</a>
                <a className="af-footer-link" href="/use-of-ai">Use of AI</a>
              </div>
            </div>
            <div className="af-footer-bottom">
              <div>© {new Date().getFullYear()} {settings.site_title}. All rights reserved.</div>
              <div className="af-footer-credit">
                Website made with love by <a href="https://digitalallies.net" target="_blank" rel="noopener noreferrer">Digital Allies</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SiteTheme>
  )
}
