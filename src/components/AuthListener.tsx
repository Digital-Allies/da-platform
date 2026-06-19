'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AuthListener() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    let redirected = false

    // 1. Check current URL hash fragment immediately on mount.
    //    Recovery/invite emails from Supabase land on the site root with
    //    #access_token=...&type=recovery (or type=invite/signup).
    //    We need to intercept this before the page fully renders.
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    const isRecoveryOrInvite =
      hash.includes('type=recovery') ||
      hash.includes('type=invite') ||
      hash.includes('type=signup')

    if (hash && isRecoveryOrInvite) {
      redirected = true
      // Give Supabase JS a moment to exchange the token from the hash
      // before navigating away, otherwise updateUser() on the reset page
      // won't have a valid session.
      setTimeout(() => {
        router.push('/admin/reset-password')
      }, 500)
      return
    }

    // 2. Listen for Supabase auth state changes (e.g. PASSWORD_RECOVERY event)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' && !redirected) {
        redirected = true
        router.push('/admin/reset-password')
      }
    })

    // 3. Safety net: if the hash looked like a recovery URL but
    //    onAuthStateChange never fired (e.g. due to a network error or
    //    the Supabase client failing to parse the hash), force the redirect
    //    after 3 seconds so the user doesn't get stuck.
    let safetyTimer: ReturnType<typeof setTimeout> | null = null
    if (hash && hash.includes('access_token') && !redirected) {
      safetyTimer = setTimeout(() => {
        if (!redirected) {
          redirected = true
          router.push('/admin/reset-password')
        }
      }, 3000)
    }

    return () => {
      subscription.unsubscribe()
      if (safetyTimer) clearTimeout(safetyTimer)
    }
  }, [router])

  return null
}
