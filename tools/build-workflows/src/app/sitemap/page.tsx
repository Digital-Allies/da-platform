import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'HTML Sitemap | Digital Allies Platform',
  description: 'Full overview of website pages and navigation structure.',
}

export default function SitemapPage() {
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Press Office & Articles', path: '/blog' },
    { title: 'Terms of Service', path: '/terms' },
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Cookie Policy', path: '/cookies' },
    { title: 'Accessibility Statement (WCAG 2.1 AA)', path: '/accessibility' },
    { title: 'AI Usage & Disclosure', path: '/use-of-ai' },
    { title: 'XML Sitemap (Search Engines & AI Bots)', path: '/sitemap.xml' },
  ]

  return (
    <main id="main-content" className="section bg-white min-h-screen py-16 px-6" role="main">
      <article className="max-w-4xl mx-auto prose-da">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--tok-font-heading, sans-serif)' }}>
          HTML Sitemap
        </h1>

        <ul className="space-y-3">
          {pages.map((p) => (
            <li key={p.path} className="border-b border-neutral-200 pb-2">
              <Link href={p.path} className="text-amber-800 font-semibold hover:underline">
                {p.title}
              </Link>
              <span className="text-xs text-neutral-500 font-mono ml-3">{p.path}</span>
            </li>
          ))}
        </ul>
      </article>
    </main>
  )
}
