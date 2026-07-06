'use client'

import { useState } from 'react'
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
            Set Password
          </h1>
          <p className="apage__sub" style={{ marginBottom: 32, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {success ? 'Password updated. Redirecting to admin...' : 'Set a new password for your admin account.'}
          </p>

          {!success && (
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
