import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import AdminShell from './AdminShell'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  return (
    <AdminShell userEmail={user.email ?? ''}>
      {children}
    </AdminShell>
  )
}
