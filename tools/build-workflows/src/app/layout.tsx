import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import { getSiteSettings } from '@/lib/data'
import AuthListener from '@/components/AuthListener'
import FacebookSdk from '@/components/FacebookSdk'
import { Analytics } from '@vercel/analytics/react'
import { IntlProvider } from '@/components/IntlProvider'

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

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const isAtomicFinds = clientId === '443936d5-f92e-480b-b206-c65cfb52bdfc'

  return (
    <html lang="en">
      <head>
        {isAtomicFinds && (
          <>
            <link rel="stylesheet" href="/atomic-finds/language-switcher.css" />
            <script dangerouslySetInnerHTML={{
              __html: `window.LANGUAGE_CONTROLLER_CONFIG = { languages: ['en', 'es'], defaultLanguage: 'en', languageNames: { en: 'English', es: 'Español' } };`
            }} />
          </>
        )}
      </head>
      {/* `--brand` is intentionally NOT set here — it comes from the client's
          design_tokens/theme.ts primary color via SiteTheme.tsx, which always
          overrode a body-level value anyway. See lib/types.ts SiteSettings
          note on the removed `brand_color` field. */}
      <body className="min-h-screen">
        <IntlProvider>
          <AuthListener />
          <FacebookSdk appId={settings.facebook_app_id} />
          <Analytics />
          {children}
        </IntlProvider>
        {isAtomicFinds && (
          <Script src="/atomic-finds/language-controller.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  )
}
