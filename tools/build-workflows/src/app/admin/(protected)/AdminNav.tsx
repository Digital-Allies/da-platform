'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, Briefcase, Star, MessageSquare,
  Settings, LogOut, ExternalLink, ShoppingBag, Quote,
} from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface AdminNavProps {
  userEmail: string
  unreadCount?: number
}

const NAV_ITEMS = [
  { label: 'Dashboard',      href: '/admin',              icon: LayoutDashboard, exact: true },
  { label: 'Posts',          href: '/admin/posts',        icon: FileText },
  { label: 'Departments',    href: '/admin/services',     icon: Briefcase },
  { label: 'Field Notes',    href: '/admin/testimonials', icon: Star },
  { label: 'The Showroom',   href: '/admin/products',     icon: ShoppingBag },
  { label: 'Reviews',        href: '/admin/reviews',      icon: Quote },
  { label: 'Command Center', href: '/admin/messages',     icon: MessageSquare },
  { label: 'Settings',       href: '/admin/settings',     icon: Settings },
]

export default function AdminNav({ userEmail, unreadCount = 0 }: AdminNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  function isActive(item: typeof NAV_ITEMS[0]) {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <header className="admin-topbar">
      {/* Brand */}
      <Link href="/admin" className="admin-brand">
        <span className="da-pulse" />
        Site Admin
      </Link>

      {/* Nav links */}
      <nav className="admin-topbar__nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`navitem${active ? ' is-active' : ''}`}
            >
              <Icon size={13} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Right side */}
      <div className="admin-topbar__right">
        {unreadCount > 0 && (
          <Link href="/admin/messages" className="admin-badge" style={{ textDecoration: 'none' }}>
            {unreadCount}
          </Link>
        )}
        <a href="/" target="_blank" rel="noopener noreferrer" className="admin-user">
          <ExternalLink size={13} />
          View site
        </a>
        <button className="admin-user" onClick={signOut}>
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </header>
  )
}
