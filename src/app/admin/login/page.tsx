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
      className="da-lace"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div
          style={{
            border: '1px solid var(--charcoal)',
            backgroundColor: '#ffffff',
            padding: '48px 40px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div className="da-pulse-stack">
              <span className="da-pulse" />
            </div>
            <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>
              Digital Allies
            </span>
          </div>

          <h1 className="apage__title" style={{ fontSize: 22, marginBottom: 8, fontFamily: 'var(--font-headers)', fontWeight: 700, color: 'var(--charcoal)' }}>
            Sign in
          </h1>
          <p className="apage__sub" style={{ marginBottom: 32, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Access the client site admin panel.
          </p>

          <form onSubmit={handleSubmit} className="editor-stack">
            <label className="afield">
              <span className="afield__label" style={{ fontFamily: 'var(--font-details)', fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}>
                Email
              </span>
              <input
                type="email"
                autoComplete="email"
                required
                className="ainput"
                style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="afield">
              <span className="afield__label" style={{ fontFamily: 'var(--font-details)', fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}>
                Password
              </span>
              <input
                type="password"
                autoComplete="current-password"
                required
                className="ainput"
                style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && (
              <p
                style={{
                  fontFamily: 'var(--font-details)',
                  fontSize: 12,
                  color: 'var(--signal)',
                  border: '1px solid var(--signal)',
                  backgroundColor: 'rgba(197, 48, 26, 0.04)',
                  padding: '10px 14px',
                  margin: '8px 0',
                  lineHeight: '1.5',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="abtn abtn--primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px 18px',
                fontSize: 13,
                fontFamily: 'var(--font-details)',
                letterSpacing: '0.08em',
                marginTop: 8,
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: 24,
            fontFamily: 'var(--font-details)',
            fontSize: 12,
            color: 'var(--text-soft)',
          }}
        >
          &larr;{' '}
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Back to site
          </Link>
        </p>
      </div>
    </div>
  )
}
