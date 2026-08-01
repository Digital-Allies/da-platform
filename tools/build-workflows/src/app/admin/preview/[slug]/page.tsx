import { notFound } from 'next/navigation'
import { Navigation, Footer, BlockRenderer } from '@/components/site'
import SiteTheme from '@/components/site/SiteTheme'
import { getSiteSettings, getPageBySlugAny } from '@/lib/data'

export const revalidate = 0 // No caching for previews

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlugAny(slug)
  if (!page) return {}
  return {
    title: `[DRAFT] ${page.title}`,
    description: page.meta?.description ?? undefined,
  }
}

export default async function AdminPreviewPage({ params }: Props) {
  const { slug } = await params
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getPageBySlugAny(slug),
  ])

  if (!page) notFound()

  return (
    <SiteTheme clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, background: '#FFA500', color: '#000', padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
        🔍 ADMIN PREVIEW (Draft: "{page.title}") — Not visible to public
      </div>

      <div style={{ marginTop: 52 }}>
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
      </div>
    </SiteTheme>
  )
}
