import React from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

  // 1. Fetch Client info
  const { data: client } = await supabase
    .from('clients')
    .select('business_name')
    .eq('id', CLIENT_ID)
    .single()

  // 2. Fetch stats
  const [
    { count: totalProjects },
    { count: totalContent },
    { count: totalNotes },
    { count: totalTasks }
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('client_id', CLIENT_ID).eq('status', 'active'),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('client_id', CLIENT_ID),
    supabase.from('research_notes').select('*', { count: 'exact', head: true }).eq('client_id', CLIENT_ID),
    supabase.from('dev_tasks').select('*', { count: 'exact', head: true }).eq('client_id', CLIENT_ID).neq('status', 'closed')
  ])

  // 3. Fetch recent activity (from notifications)
  const { data: activities } = await supabase
    .from('notifications')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false })
    .limit(5)

  // 4. Fetch upcoming deadlines
  const { data: deadlines } = await supabase
    .from('project_tasks')
    .select('title, due_date, priority')
    .eq('client_id', CLIENT_ID)
    .neq('status', 'done')
    .order('due_date', { ascending: true })
    .limit(5)

  // Time of day greeting
  const hour = new Date().getHours()
  let greeting = 'Good Morning'
  if (hour >= 12 && hour < 17) greeting = 'Good Afternoon'
  else if (hour >= 17) greeting = 'Good Evening'

  const businessName = client?.business_name || 'Admin'

  return (
    <div className="ws-page">
      <section className="section active" id="dashboard-section">
        <div className="ws-head">
          <div>
            <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted" id="breadcrumb">Dashboard</div>
            <h1>{greeting}, {businessName}</h1>
            <div className="ws-head__sub">Here's what's happening across your digital footprint.</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="ws-stat-grid stats-grid">
            <Link href="/admin/projects" className="ws-stat stat-card" style={{ textDecoration: 'none' }}>
              <div className="ws-stat__top">
                <span className="ws-stat__label">Active Projects</span>
              </div>
              <span className="ws-stat__val stat-card__number" id="totalProjects">{totalProjects ?? 0}</span>
            </Link>
            <Link href="/admin/content" className="ws-stat stat-card" style={{ textDecoration: 'none' }}>
              <div className="ws-stat__top">
                <span className="ws-stat__label">Content Pieces</span>
              </div>
              <span className="ws-stat__val stat-card__number" id="totalContent">{totalContent ?? 0}</span>
            </Link>
            <Link href="/admin/research" className="ws-stat stat-card" style={{ textDecoration: 'none' }}>
              <div className="ws-stat__top">
                <span className="ws-stat__label">Research Notes</span>
              </div>
              <span className="ws-stat__val stat-card__number" id="totalNotes">{totalNotes ?? 0}</span>
            </Link>
            <Link href="/admin/development" className="ws-stat stat-card" style={{ textDecoration: 'none' }}>
              <div className="ws-stat__top">
                <span className="ws-stat__label">Dev Tasks</span>
              </div>
              <span className="ws-stat__val stat-card__number" id="totalTasks">{totalTasks ?? 0}</span>
            </Link>
          </div>

          <div className="widget-grid">
            <div className="widget">
              <h3>Recent Activity</h3>
              <div className="activity-feed" id="activityFeed">
                {activities && activities.length > 0 ? (
                  activities.map((act) => (
                    <div key={act.id} className="activity-item">
                      <div className="activity-icon">
                        {act.type === 'alert' ? '⚠️' : '📝'}
                      </div>
                      <div className="activity-content">
                        <p><strong>{act.title}</strong> — {act.message}</p>
                        <small>{new Date(act.created_at).toLocaleDateString()}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: 'var(--text-soft)', fontSize: '13px' }}>
                    No recent activity found.
                  </div>
                )}
              </div>
            </div>

            <div className="widget">
              <h3>Upcoming Deadlines</h3>
              <div className="deadline-list" id="deadlineList">
                {deadlines && deadlines.length > 0 ? (
                  deadlines.map((dl, idx) => {
                    const isHigh = dl.priority === 'high'
                    const dateStr = dl.due_date ? new Date(dl.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No Date'
                    return (
                      <div key={idx} className={`deadline-item ${isHigh ? 'priority-high' : 'priority-medium'}`}>
                        <div className="deadline-date">{dateStr}</div>
                        <div className="deadline-content">
                          <p>{dl.title}</p>
                          <span className={`status status--${isHigh ? 'error' : 'warning'}`}>
                            {dl.priority ? `${dl.priority.charAt(0).toUpperCase()}${dl.priority.slice(1)} Priority` : 'Normal'}
                          </span>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div style={{ color: 'var(--text-soft)', fontSize: '13px' }}>
                    No upcoming deadlines.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <Link href="/admin/content?tab=create" className="btn btn--primary quick-action-btn">+ New Content</Link>
            <Link href="/admin/projects?action=new" className="btn btn--primary quick-action-btn">+ New Project</Link>
            <Link href="/admin/research?action=new" className="btn btn--primary quick-action-btn">+ New Note</Link>
            <Link href="/admin/development?action=new" className="btn btn--primary quick-action-btn">+ New Task</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
