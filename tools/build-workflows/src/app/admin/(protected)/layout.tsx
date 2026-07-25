import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import { getSiteSettings } from '@/lib/data'
import { getDesignTokens } from '@/lib/theme'
import AdminShell from './AdminShell'
import UnlinkedAccount from './UnlinkedAccount'

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
      accentColor={tokens.colors.primary}
      clientId={clientId}
    >
      {children}
    </AdminShell>
  )
}
