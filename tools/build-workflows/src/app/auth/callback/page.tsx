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
    async function handleCallback() {
      // ── PKCE flow (Supabase default since 2024) ──────────────────
      // Invite/recovery links arrive as ?code=xxx, type may be present
      const searchParams = new URLSearchParams(window.location.search)
      const code = searchParams.get('code')
      const codeType = searchParams.get('type') // 'invite' | 'recovery' | null

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
          setError(exchangeError.message)
          setInitializing(false)
          return
        }
        // For invite/recovery, always show the password-set form.
        // If type isn't in the URL (some Supabase versions omit it), check the
        // user object — invited users have no password and need to set one.
        if (codeType === 'invite' || codeType === 'recovery' || !codeType) {
          const { data: { user } } = await supabase.auth.getUser()
          // If the user was just invited, show the set-password form.
          // If they already have a confirmed session (magic link), go to admin.
          if (user?.app_metadata?.provider === 'email' && codeType !== 'magiclink') {
            setType(codeType ?? 'invite')
            setInitializing(false)
            return
          }
        }
        router.replace('/admin')
        return
      }

      // ── Implicit/hash flow (legacy, kept for backward compat) ────
      const hash = window.location.hash.substring(1)
      const hashParams = new URLSearchParams(hash)
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const tokenType = hashParams.get('type')

      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (sessionError) {
          setError(sessionError.message)
          setInitializing(false)
          return
        }
        if (tokenType === 'invite' || tokenType === 'recovery') {
          setType(tokenType)
          setInitializing(false)
          return
        }
        router.replace('/admin')
        return
      }

      // Nothing usable in the URL — send to login
      router.replace('/admin/login')
    }

    handleCallback()
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

  const isInvite = type === 'invite' || type === null

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
