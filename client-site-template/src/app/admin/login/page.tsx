'use client'

import { useState } from 'react'
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
    <div className="min-h-screen grid-overlay flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="border border-charcoal bg-white p-8">
          <h1 className="font-headline font-bold text-xl mb-1">Admin Login</h1>
          <p className="text-sm text-neutral-500 mb-6">Sign in to manage your site.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="admin-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="admin-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs text-alert border border-alert px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary w-full mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-4">
          &larr;{' '}
          <a href="/" className="hover:text-charcoal transition-colors">
            Back to site
          </a>
        </p>
      </div>
    </div>
  )
}
