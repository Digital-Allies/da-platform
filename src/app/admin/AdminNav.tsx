'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Briefcase, Star, Settings, LogOut, Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface AdminNavProps {
  userEmail: string
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Posts', href: '/admin/posts', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminNav({ userEmail }: AdminNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-charcoal text-canvas border-b border-neutral-700">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/admin" className="font-headline font-bold text-sm flex-shrink-0">
          Site Admin
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors rounded-sm
                  ${active ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/10'}`}
              >
                <Icon size={13} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User + sign out */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-xs text-neutral-400">{userEmail}</span>
          <button
            onClick={signOut}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="md:hidden border-t border-neutral-700 px-6 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors
                  ${active ? 'text-white bg-white/15' : 'text-neutral-400 hover:text-white'}`}
              >
                <Icon size={13} />
                {label}
              </Link>
            )
          })}
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-white mt-2 border-t border-neutral-700"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </nav>
      )}
    </header>
  )
}
