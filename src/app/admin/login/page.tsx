'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundImage: 'linear-gradient(var(--grid-line) .5px, transparent .5px), linear-gradient(90deg, var(--grid-line) .5px, transparent .5px)',
        backgroundSize: 'var(--lace-step) var(--lace-step)',
        backgroundColor: 'var(--bone-white)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ border: '1px solid var(--charcoal)', background: '#fff', padding: 40 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 28 }}>
            <span className="da-pulse" />
            <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 700, fontSize: 15 }}>
              Site Admin
            </span>
          </div>

          <h1 className="apage__title" style={{ fontSize: 20, marginBottom: 6 }}>Sign in</h1>
          <p className="apage__sub" style={{ marginBottom: 28 }}>Access the admin panel.</p>

          <form onSubmit={handleSubmit} className="editor-stack">
            <label className="afield">
              <span className="afield__label">Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                className="ainput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="afield">
              <span className="afield__label">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                className="ainput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && (
              <p style={{ fontSize: 12, color: 'var(--signal)', border: '1px solid var(--signal)', padding: '8px 12px' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="abtn abtn--primary"
              style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: 13 }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 16, fontFamily: 'var(--font-details)', fontSize: 12, color: 'var(--text-soft)' }}>
          &larr;{' '}
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Back to site
          </Link>
        </p>
      </div>
    </div>
  )
}
