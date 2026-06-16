import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import AdminNav from './AdminNav'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  // Unread message count for the nav badge
  const { count: unreadCount } = await supabase
    .from('contact_submissions')
    .select('id', { count: 'exact', head: true })
    .eq('client_id', CLIENT_ID)
    .eq('read', false)

  return (
    <div className="admin admin--topbar" style={{ height: '100vh' }}>
      <AdminNav userEmail={user.email ?? ''} unreadCount={unreadCount ?? 0} />
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
