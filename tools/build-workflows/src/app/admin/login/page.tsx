'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { DEFAULT_SETTINGS } from '@/lib/types'

export default function AdminLoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'reset'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [businessName, setBusinessName] = useState(DEFAULT_SETTINGS.site_title)

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
    if (!clientId) return
    createClient()
      .from('settings')
      .select('key, value')
      .eq('client_id', clientId)
      .eq('key', 'site_title')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setBusinessName(data.value)
      })
  }, [])

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

  async function handleResetRequest(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })

    setLoading(false)

    if (resetError) {
      setError(resetError.message)
      return
    }

    setResetSent(true)
  }

  return (
    <div className="da-lace login-page-container">
      <style>{`
        .login-page-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .login-card {
          width: 100%;
          max-width: 380px;
          border: 1px solid var(--charcoal);
          background-color: #ffffff;
          padding: 48px 40px;
          box-shadow: var(--shadow-md);
        }
        @media (max-width: 480px) {
          .login-page-container {
            padding: 16px;
          }
          .login-card {
            padding: 32px 20px;
          }
          .ainput {
            font-size: 16px !important;
            padding: 11px 12px !important;
          }
          .login-submit-btn {
            padding: 14px 20px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div className="login-card">
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div className="da-pulse-stack">
              <span className="da-pulse" />
            </div>
            <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>
              {businessName}
            </span>
          </div>

          <h1 className="apage__title" style={{ fontSize: 22, marginBottom: 8, fontFamily: 'var(--font-headers)', fontWeight: 700, color: 'var(--charcoal)' }}>
            {mode === 'signin' ? 'Sign in' : 'Reset password'}
          </h1>
          <p className="apage__sub" style={{ marginBottom: 32, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {mode === 'signin'
              ? 'Access the client site admin panel.'
              : resetSent
              ? `Check ${email} for a reset link.`
              : "Enter your email and we'll send a reset link."}
          </p>

          {mode === 'signin' ? (
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
                className="abtn abtn--primary login-submit-btn"
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

              <button
                type="button"
                onClick={() => {
                  setMode('reset')
                  setError('')
                  setResetSent(false)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginTop: 12,
                  fontFamily: 'var(--font-details)',
                  fontSize: 12,
                  color: 'var(--text-soft)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                }}
              >
                Forgot password?
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetRequest} className="editor-stack">
              {!resetSent && (
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
              )}

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

              {!resetSent && (
                <button
                  type="submit"
                  disabled={loading}
                  className="abtn abtn--primary login-submit-btn"
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
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMode('signin')
                  setError('')
                  setResetSent(false)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginTop: 12,
                  fontFamily: 'var(--font-details)',
                  fontSize: 12,
                  color: 'var(--text-soft)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                }}
              >
                Back to sign in
              </button>
            </form>
          )}
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
