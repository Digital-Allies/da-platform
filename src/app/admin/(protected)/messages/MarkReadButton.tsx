'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function MarkReadButton({ id }: { id: string }) {
  const router = useRouter()

  async function markRead() {
    const supabase = createClient()
    await supabase.from('contact_submissions').update({ read: true }).eq('id', id)
    router.refresh()
  }

  return (
    <button
      onClick={markRead}
      className="flex-shrink-0 text-xs text-neutral-400 hover:text-charcoal transition-colors whitespace-nowrap"
    >
      Mark read
    </button>
  )
}
