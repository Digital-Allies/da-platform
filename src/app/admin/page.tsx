import Link from 'next/link'
import { FileText, Briefcase, Star, Settings, MessageSquare, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

async function getDashboardCounts() {
  const supabase = await createClient()
  const [posts, services, testimonials, messages] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact' }).eq('client_id', CLIENT_ID),
    supabase.from('services').select('id', { count: 'exact' }).eq('client_id', CLIENT_ID),
    supabase.from('testimonials').select('id', { count: 'exact' }).eq('client_id', CLIENT_ID),
    supabase.from('contact_submissions').select('id', { count: 'exact' }).eq('client_id', CLIENT_ID).eq('read', false),
  ])
  return {
    posts: posts.count ?? 0,
    services: services.count ?? 0,
    testimonials: testimonials.count ?? 0,
    unreadMessages: messages.count ?? 0,
  }
}

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts()

  const stats = [
    { label: 'Blog Posts', value: counts.posts, href: '/admin/posts', icon: FileText },
    { label: 'Services', value: counts.services, href: '/admin/services', icon: Briefcase },
    { label: 'Testimonials', value: counts.testimonials, href: '/admin/testimonials', icon: Star },
    { label: 'Unread Messages', value: counts.unreadMessages, href: '/admin/messages', icon: MessageSquare },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline font-bold text-xl">Dashboard</h1>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-charcoal transition-colors"
        >
          <ExternalLink size={13} />
          View site
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Link key={href} href={href} className="admin-card hover:border-charcoal transition-colors">
            <Icon size={16} className="text-neutral-400 mb-3" />
            <p className="text-2xl font-headline font-bold">{value}</p>
            <p className="text-xs text-neutral-500 mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="font-headline font-semibold text-sm uppercase tracking-widest text-neutral-400 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/admin/posts/new" className="admin-card flex items-center gap-3 hover:border-charcoal transition-colors">
          <FileText size={16} />
          <span className="text-sm font-medium">New Blog Post</span>
        </Link>
        <Link href="/admin/settings" className="admin-card flex items-center gap-3 hover:border-charcoal transition-colors">
          <Settings size={16} />
          <span className="text-sm font-medium">Edit Site Settings</span>
        </Link>
      </div>
    </div>
  )
}
