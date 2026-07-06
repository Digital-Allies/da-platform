import type { Metadata } from 'next'
import '../styles/globals.css'
import { getSiteSettings } from '@/lib/data'
import AuthListener from '@/components/AuthListener'

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
        // Inject the client's brand color as a CSS variable
        style={{ '--brand': settings.brand_color } as React.CSSProperties}
      >
        <AuthListener />
        {children}
      </body>
    </html>
  )
}
