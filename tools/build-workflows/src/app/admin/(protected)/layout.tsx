import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import { getSiteSettings } from '@/lib/data'
import { getDesignTokens } from '@/lib/theme'
import AdminShell from './AdminShell'
import UnlinkedAccount from './UnlinkedAccount'

// The root layout's generateMetadata() resolves settings from the
// deployment's static NEXT_PUBLIC_CLIENT_ID env var — fine for a
// single-tenant site, but on the shared cms.digitalallies.net admin every
// client logs into the same deployment, so the browser tab always showed
// "Digital Allies" regardless of who was signed in. Override here with the
// actual signed-in tenant's settings; `title: { absolute }` bypasses the
// root layout's `%s | ${default}` template instead of appending to it.
export async function generateMetadata(): Promise<Metadata> {
  const clientId = await getCurrentClientId()
  if (!clientId) return {}

  const settings = await getSiteSettings(clientId)
  return {
    title: { absolute: `${settings.site_title} Admin` },
    description: settings.site_description || settings.tagline,
    openGraph: {
      siteName: settings.site_title,
      title: `${settings.site_title} Admin`,
    },
  }
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  // Tenant is resolved from the logged-in user (clients.auth_user_id), not
  // from NEXT_PUBLIC_CLIENT_ID — that env var is fixed per deployment, so it
  // can't distinguish an Atomic Finds login from a Digital Allies login on
  // the shared cms.digitalallies.net admin.
  const clientId = await getCurrentClientId()
  if (!clientId) {
    return <UnlinkedAccount userEmail={user.email ?? ''} />
  }

  const [settings, tokens] = await Promise.all([
    getSiteSettings(clientId),
    Promise.resolve(getDesignTokens(clientId)),
  ])

  return (
    <AdminShell
      userEmail={user.email ?? ''}
      businessName={settings.site_title}
      logoUrl={settings.logo_url || undefined}
      accentColor={tokens.colors.primary}
      clientId={clientId}
    >
      {children}
    </AdminShell>
  )
}
