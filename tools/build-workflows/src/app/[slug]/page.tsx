import { notFound } from 'next/navigation'
import { Navigation, Footer, BlockRenderer } from '@/components/site'
import SiteTheme from '@/components/site/SiteTheme'
import { getSiteSettings, getPageBySlug } from '@/lib/data'

export const revalidate = 60 // ISR — refresh every 60 seconds

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.meta?.description ?? undefined,
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getPageBySlug(slug),
  ])

  if (!page) notFound()

  return (
    <SiteTheme clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Navigation
        logoUrl={settings.logo_url || undefined}
        siteTitle={settings.site_title}
        ctaText={settings.hero_cta_text || 'Get in Touch'}
        ctaHref={settings.hero_cta_link || '#contact'}
      />

      <main>
        <BlockRenderer blocks={page.blocks} />
      </main>

      <Footer settings={settings} />
    </SiteTheme>
  )
}
