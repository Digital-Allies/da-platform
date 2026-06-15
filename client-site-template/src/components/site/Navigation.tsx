'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

interface NavItem {
  label: string
  href: string
}

interface NavigationProps {
  logoUrl?: string
  siteTitle: string
  ctaText?: string
  ctaHref?: string
  navItems?: NavItem[]
}

const DEFAULT_NAV: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation({
  logoUrl,
  siteTitle,
  ctaText = 'Get in Touch',
  ctaHref = '#contact',
  navItems = DEFAULT_NAV,
}: NavigationProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-charcoal">
      <div className="mx-auto max-w-site px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Logo / wordmark */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          {logoUrl ? (
            <Image src={logoUrl} alt={siteTitle} width={120} height={40} className="h-8 w-auto object-contain" />
          ) : (
            <span className="font-headline font-bold text-lg leading-none text-charcoal">
              {siteTitle}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-charcoal hover:opacity-60 transition-opacity font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={ctaHref}
          className="hidden md:inline-flex btn btn-primary text-sm px-5 py-2"
        >
          {ctaText}
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-charcoal bg-canvas">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-3 text-sm font-medium text-charcoal border-b border-neutral-light last:border-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="mt-4 btn btn-primary w-full text-center text-sm"
              onClick={() => setOpen(false)}
            >
              {ctaText}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
