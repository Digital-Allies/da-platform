import type { Metadata } from 'next'
import '../styles/globals.css'
import { getSiteSettings } from '@/lib/data'
import AuthListener from '@/components/AuthListener'
import FacebookSdk from '@/components/FacebookSdk'
import { Analytics } from '@vercel/analytics/react'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: settings.site_title,
      template: `%s | ${settings.site_title}`,
    },
    description: settings.site_description || settings.tagline,
    openGraph: {
      siteName: settings.site_title,
      type: 'website',
    },
    ...(settings.favicon_url && { icons: { icon: settings.favicon_url } }),
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="en">
      <body
        className="min-h-screen"
        style={{ '--brand': settings.brand_color } as React.CSSProperties}
      >
        <AuthListener />
        <FacebookSdk appId={settings.facebook_app_id} />
        <Analytics />
        {children}
      </body>
    </html>
  )
}
