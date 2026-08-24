import React from 'react'
import ClientPageWrapper from '@/components/site/ClientPageWrapper'
import { Sitemap } from '@da-platform/design-system/components/Sitemap'
import { getPublishedPages } from '@/lib/data'
import { RESERVED_PAGE_SLUGS } from '@/lib/reserved-slugs'

export const metadata = {
  title: 'HTML Sitemap | Digital Allies Platform',
  description: 'Full overview of website pages and navigation structure.',
}

const STATIC_LINKS = [
  { title: 'Terms of Service', path: '/terms' },
  { title: 'Privacy Policy', path: '/privacy' },
  { title: 'Cookie Policy', path: '/cookies' },
  { title: 'Accessibility Statement (WCAG 2.1 AA)', path: '/accessibility' },
  { title: 'Use of AI Disclosure', path: '/use-of-ai' },
  { title: 'XML Sitemap (search engines & AI bots)', path: '/sitemap.xml' },
]

export default async function SitemapPage() {
  const allPages = await getPublishedPages()
  const pages = allPages
    .filter((p: any) => !RESERVED_PAGE_SLUGS.includes(String(p.slug).toLowerCase().trim()))
    .map((p: any) => ({ title: p.title, slug: p.slug }))

  return (
    <ClientPageWrapper title="Sitemap" subtitle="Every published page on this site">
      <Sitemap pages={pages} staticLinks={STATIC_LINKS} />
    </ClientPageWrapper>
  )
}
