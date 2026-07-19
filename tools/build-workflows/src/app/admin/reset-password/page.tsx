'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [linkError, setLinkError] = useState('')

  useEffect(() => {
    // Supabase reports an expired/invalid/already-used recovery link as
    // #error=...&error_description=... in the URL hash, not a normal page
    // load — surface that clearly instead of showing a dead-end form.
    const hash = new URLSearchParams(window.location.hash.slice(1))
    const description = hash.get('error_description')
    if (description) {
      setLinkError(description.replace(/\+/g, ' '))
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    // Redirect to admin dashboard after 2 seconds
    setTimeout(() => {
      router.push('/admin')
      router.refresh()
    }, 2000)
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
              Digital Allies
            </span>
          </div>

          <h1 className="apage__title" style={{ fontSize: 22, marginBottom: 8, fontFamily: 'var(--font-headers)', fontWeight: 700, color: 'var(--charcoal)' }}>
            {linkError ? 'Link expired' : 'Set Password'}
          </h1>
          <p className="apage__sub" style={{ marginBottom: 32, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {linkError
              ? linkError
              : success
              ? 'Password updated. Redirecting to admin...'
              : 'Set a new password for your admin account.'}
          </p>

          {linkError && (
            <Link
              href="/admin/login"
              className="abtn abtn--primary login-submit-btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px 18px',
                fontSize: 13,
                fontFamily: 'var(--font-details)',
                letterSpacing: '0.08em',
                boxShadow: 'var(--shadow-sm)',
                textDecoration: 'none',
                display: 'flex',
              }}
            >
              Request a new link
            </Link>
          )}

          {!success && !linkError && (
            <form onSubmit={handleSubmit} className="editor-stack">
              <label className="afield">
                <span className="afield__label" style={{ fontFamily: 'var(--font-details)', fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}>
                  New Password
                </span>
                <input
                  type="password"
                  required
                  className="ainput"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className="afield">
                <span className="afield__label" style={{ fontFamily: 'var(--font-details)', fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}>
                  Confirm Password
                </span>
                <input
                  type="password"
                  required
                  className="ainput"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Saving…' : 'Update Password'}
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
          <Link href="/admin/login" style={{ color: 'inherit', textDecoration: 'none' }}>
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
