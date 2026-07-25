'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

// Shown instead of the dashboard when a signed-in user has no matching row
// in `clients` (auth_user_id not set) — otherwise layout.tsx would have
// nothing to scope any query to, and the old behavior of falling through to
// the env var's client silently showed one tenant's data to another's login.
export default function UnlinkedAccount({ userEmail }: { userEmail: string }) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="da-lace" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ border: '1px solid var(--charcoal)', background: '#ffffff', padding: '48px 40px', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-headers)', fontWeight: 700, fontSize: 22, marginBottom: 12, color: 'var(--charcoal)' }}>
            Account not linked
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>
            <strong>{userEmail}</strong> is signed in, but isn&apos;t connected to a client site yet.
            Ask an admin to link this login to a client record in Supabase, then sign in again.
          </p>
          <button onClick={handleLogout} className="abtn abtn--primary" style={{ fontFamily: 'var(--font-details)', fontSize: 13 }}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
