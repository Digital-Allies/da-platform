import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { getSiteSettings } from '@/lib/data'
import { getDesignTokens } from '@/lib/theme'
import AdminShell from './AdminShell'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const [settings, tokens] = await Promise.all([
    getSiteSettings(),
    Promise.resolve(getDesignTokens(CLIENT_ID)),
  ])

  return (
    <AdminShell
      userEmail={user.email ?? ''}
      businessName={settings.site_title}
      accentColor={tokens.colors.primary}
    >
      {children}
    </AdminShell>
  )
}
