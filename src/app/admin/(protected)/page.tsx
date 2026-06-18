import Link from 'next/link'
import { FileText, Briefcase, Star, MessageSquare, Settings, ExternalLink, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

async function getDashboardCounts() {
  const supabase = await createClient()
  const [posts, drafts, services, testimonials, unread, total] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('client_id', CLIENT_ID),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('client_id', CLIENT_ID).eq('status', 'draft'),
    supabase.from('services').select('id', { count: 'exact', head: true }).eq('client_id', CLIENT_ID),
    supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('client_id', CLIENT_ID),
    supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('client_id', CLIENT_ID).eq('read', false),
    supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('client_id', CLIENT_ID),
  ])
  return {
    posts: posts.count ?? 0,
    drafts: drafts.count ?? 0,
    services: services.count ?? 0,
    testimonials: testimonials.count ?? 0,
    unreadMessages: unread.count ?? 0,
    totalMessages: total.count ?? 0,
  }
}

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts()

  return (
    <div className="apage">
      {/* Page header */}
      <div className="apage__head">
        <div>
          <h1 className="apage__title">Dashboard</h1>
          <p className="apage__sub">Everything you change here goes live on the site.</p>
        </div>
        <div className="apage__actions">
          <a href="/" target="_blank" rel="noopener noreferrer" className="abtn abtn--ghost">
            <ExternalLink size={13} /> View site
          </a>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <Link href="/admin/posts" className="stat-card">
          <div className="stat-card__top">
            <FileText size={15} />
          </div>
          <span className="stat-card__val">{counts.posts}</span>
          <span className="stat-card__label">Blog Posts</span>
          <span className="stat-card__sub">{counts.drafts} draft{counts.drafts !== 1 ? 's' : ''}</span>
        </Link>

        <Link href="/admin/services" className="stat-card">
          <div className="stat-card__top">
            <Briefcase size={15} />
          </div>
          <span className="stat-card__val">{counts.services}</span>
          <span className="stat-card__label">Departments</span>
          <span className="stat-card__sub">live on site</span>
        </Link>

        <Link href="/admin/testimonials" className="stat-card">
          <div className="stat-card__top">
            <Star size={15} />
          </div>
          <span className="stat-card__val">{counts.testimonials}</span>
          <span className="stat-card__label">Field Notes</span>
          <span className="stat-card__sub">published</span>
        </Link>

        <Link href="/admin/messages" className={`stat-card${counts.unreadMessages > 0 ? ' stat-card--alert' : ''}`}>
          <div className="stat-card__top">
            <MessageSquare size={15} />
            {counts.unreadMessages > 0 && <span className="da-signal-dot" />}
          </div>
          <span className="stat-card__val">{counts.unreadMessages}</span>
          <span className="stat-card__label">Unread Transmissions</span>
          <span className="stat-card__sub">{counts.totalMessages} total</span>
        </Link>
      </div>

      {/* Quick actions */}
      <h2 className="asubhead">Quick actions</h2>
      <div className="quick-grid">
        <Link href="/admin/posts/new" className="quick-card">
          <FileText size={16} />
          <span>New blog post</span>
          <ArrowRight size={14} className="quick-card__arrow" />
        </Link>
        <Link href="/admin/services" className="quick-card">
          <Briefcase size={16} />
          <span>Edit a Department</span>
          <ArrowRight size={14} className="quick-card__arrow" />
        </Link>
        <Link href="/admin/settings" className="quick-card">
          <Settings size={16} />
          <span>Edit site settings</span>
          <ArrowRight size={14} className="quick-card__arrow" />
        </Link>
        <Link href="/admin/messages" className="quick-card">
          <MessageSquare size={16} />
          <span>Read transmissions</span>
          <ArrowRight size={14} className="quick-card__arrow" />
        </Link>
      </div>

      {/* Pinned note */}
      <div className="da-pinned dash-pin">
        <strong>Connected, not copied.</strong> This admin and the public site read from the same source.
        Save a change here, and it&rsquo;s already live.
      </div>
    </div>
  )
}
