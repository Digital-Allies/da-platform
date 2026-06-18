'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AuthListener() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // 1. Check current URL hash fragment immediately on mount
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (hash && (hash.includes('type=recovery') || hash.includes('type=invite') || hash.includes('type=signup'))) {
      router.push('/admin/reset-password')
      return
    }

    // 2. Listen for Supabase auth state changes (e.g. PASSWORD_RECOVERY event)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        router.push('/admin/reset-password')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return null
}
