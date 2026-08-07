'use client'

// Atomic Finds ATX nav — sticky brand bar + link row. Split out from
// AtomicFindsHomepage.tsx (a server component) because the mobile menu
// needs client-side open/close state; everything else about the homepage
// stays server-rendered. Below 768px the link row collapses behind a
// hamburger toggle instead of wrapping/overflowing the 320-375px viewports
// it was never given room for.

import { useState } from 'react'

const ASSET = '/atomic-finds'

const LINKS = [
  { href: '#shop', icon: 'nav-shop.png', label: 'Shop', labelEs: 'Tienda' },
  { href: '#process', icon: 'nav-process.png', label: 'How It Works', labelEs: 'Cómo Funciona' },
  { href: '#reviews', icon: 'nav-reviews.png', label: 'Reviews', labelEs: 'Reseñas' },
  { href: '#contact', icon: 'nav-contact.png', label: 'Contact', labelEs: 'Contacto' },
]

interface AtomicNavProps {
  /** From settings.logo_url — falls back to the static brand mark when unset */
  logoUrl?: string
  /** Published CMS pages to render dynamically in navigation */
  pages?: Array<{ title: string; slug: string }>
}

export default function AtomicNav({ logoUrl, pages = [] }: AtomicNavProps) {
  const [open, setOpen] = useState(false)
  const [activeRoll, setActiveRoll] = useState<string | null>(null)

  const handlePillClick = (key: string) => {
    setActiveRoll(key)
    setTimeout(() => setActiveRoll(null), 650)
    setOpen(false)
  }

  return (
    <nav className="af-nav">
      <a className="af-nav-logo" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="af-nav-logo-mark" src={logoUrl || `${ASSET}/logos/logo-mark-new.png`} alt="Atomic Finds ATX" width={99} height={101} />
      </a>

      <button
        type="button"
        className="af-nav-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="af-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="af-nav-toggle-bar" />
        <span className="af-nav-toggle-bar" />
        <span className="af-nav-toggle-bar" />
      </button>

      <div id="af-nav-panel" className={`af-nav-links${open ? ' af-nav-links--open' : ''}`}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            className="af-nav-pill"
            href={l.href}
            onClick={() => handlePillClick(l.href)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSET}/icons/${l.icon}`}
              alt=""
              className={`af-pill-img${activeRoll === l.href ? ' af-pill-img--rolling' : ''}`}
            />
            <span className="af-pill-label" data-en={l.label} data-es={l.labelEs}>{l.label}</span>
          </a>
        ))}
        {pages
          .filter((p) => !['privacy', 'terms', 'cookies', 'accessibility', 'use-of-ai', 'legal', 'sitemap'].includes(p.slug.toLowerCase().trim()))
          .map((p) => (
            <a
              key={p.slug}
              className="af-nav-pill"
              href={`/${p.slug}`}
              onClick={() => handlePillClick(p.slug)}
            >
              <span className="af-pill-label">{p.title}</span>
            </a>
          ))}
        <div className="af-nav-lang language-switcher">
          <button
            id="lang-en"
            className="lang-btn active"
            type="button"
            onClick={() => (window as any).toggleLanguage?.('en')}
            aria-pressed="true"
            title="English"
          >
            EN
          </button>
          <button
            id="lang-es"
            className="lang-btn"
            type="button"
            onClick={() => (window as any).toggleLanguage?.('es')}
            aria-pressed="false"
            title="Español"
          >
            ES
          </button>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a className="af-nav-cta" href="#shop" onClick={() => handlePillClick('#shop-cta')}>
          <img
            src={`${ASSET}/icons/nav-shop.png`}
            alt=""
            className={`af-pill-img${activeRoll === '#shop-cta' ? ' af-pill-img--rolling' : ''}`}
          />
          <span data-en="Shop Now" data-es="Compra Ahora">Shop Now</span>
        </a>
      </div>
    </nav>
  )
}
