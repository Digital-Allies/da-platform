'use client'

// Atomic Finds ATX nav — sticky brand bar + link row. Split out from
// AtomicFindsHomepage.tsx (a server component) because the mobile menu
// needs client-side open/close state; everything else about the homepage
// stays server-rendered. Below 768px the link row collapses behind a
// hamburger toggle instead of wrapping/overflowing the 320-375px viewports
// it was never given room for.

import { useState } from 'react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

const ASSET = '/atomic-finds'

const LINKS = [
  { href: '#shop', icon: 'Shop.png', label: 'Shop' },
  { href: '#process', icon: 'restoration.png', label: 'How It Works' },
  { href: '#reviews', icon: 'star.png', label: 'Reviews' },
  { href: '#contact', icon: 'Contact.png', label: 'Contact' },
]

interface AtomicNavProps {
  /** From settings.logo_url — falls back to the static brand mark when unset */
  logoUrl?: string
  /** Published CMS pages to render dynamically in navigation */
  pages?: Array<{ title: string; slug: string }>
}

export default function AtomicNav({ logoUrl, pages = [] }: AtomicNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="af-nav">
      <a className="af-nav-logo" href="#home">
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

      <div id="af-nav-panel" className={`af-nav-links${open ? ' af-nav-links--open' : ''}`} aria-hidden={!open} inert={!open}>
        {LINKS.map((l) => (
          // eslint-disable-next-line @next/next/no-img-element
          <a key={l.href} className="af-nav-link" href={l.href} onClick={() => setOpen(false)}>
            <img src={`${ASSET}/icons/${l.icon}`} alt="" />{l.label}
          </a>
        ))}
        {pages.map((p) => (
          <a key={p.slug} className="af-nav-link" href={`/${p.slug}`} onClick={() => setOpen(false)}>
            {p.title}
          </a>
        ))}
        <div className="af-nav-lang">
          <LanguageSwitcher variant="dark" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a className="af-nav-cta" href="#shop" onClick={() => setOpen(false)}>
          <img src={`${ASSET}/icons/Cart.png`} alt="" />Shop Now
        </a>
      </div>
    </nav>
  )
}
