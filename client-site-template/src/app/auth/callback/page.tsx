'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [type, setType] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const hash = window.location.hash.substring(1) // strip leading #
    const params = new URLSearchParams(hash)

    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    const tokenType = params.get('type') // 'invite' | 'recovery' | 'signup'

    if (!accessToken || !refreshToken) {
      router.replace('/admin/login')
      return
    }

    supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        if (error) {
          setError(error.message)
          setInitializing(false)
          return
        }

        if (tokenType === 'invite' || tokenType === 'recovery') {
          setType(tokenType)
          setInitializing(false)
        } else {
          // Magic link or email confirmation — go straight to admin
          router.replace('/admin')
        }
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.replace('/admin')
  }

  if (initializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--canvas, #F9F6F0)' }}
      >
        <p style={{ color: 'var(--charcoal, #2D2D2D)', fontFamily: 'Inter, sans-serif' }}>
          Setting up your account…
        </p>
      </div>
    )
  }

  const isInvite = type === 'invite'

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--canvas, #F9F6F0)' }}
    >
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: 'Lexend Deca, sans-serif', color: 'var(--charcoal, #2D2D2D)' }}
        >
          {isInvite ? 'Create your password' : 'Reset your password'}
        </h1>
        <p className="text-sm mb-6" style={{ color: '#666' }}>
          {isInvite
            ? 'Choose a password to activate your admin account.'
            : 'Enter a new password for your account.'}
        </p>

        <form onSubmit={handleSetPassword} noValidate>
          <div className="mb-4">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              autoFocus
              placeholder="At least 8 characters"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm" className="label">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              className="field"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              minLength={8}
              required
              placeholder="Repeat your password"
            />
          </div>

          {error && (
            <p className="text-sm mb-4" style={{ color: '#dc2626' }}>
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Saving…' : isInvite ? 'Set password & enter admin' : 'Reset password'}
          </button>
        </form>
      </div>
    </div>
  )
}
