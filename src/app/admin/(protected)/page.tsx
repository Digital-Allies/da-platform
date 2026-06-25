import React from 'react'

export default async function AdminDashboardPage() {
  return (
    <div className="ws-page">
      <section className="section active" id="dashboard-section">
        <div className="ws-head">
            <div>
                <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted" id="breadcrumb">Dashboard</div>
                <h1>Good Morning, Admin</h1>
                <div className="ws-head__sub">Here's what's happening across Digital Allies.</div>
            </div>
        </div>

        <div className="dashboard-grid">
            <div className="ws-stat-grid stats-grid">
                <div className="ws-stat stat-card">
                    <div className="ws-stat__top">
                        <span className="ws-stat__label">Active Projects</span>
                    </div>
                    <span className="ws-stat__val stat-card__number" id="totalProjects">12</span>
                </div>
                <div className="ws-stat stat-card">
                    <div className="ws-stat__top">
                        <span className="ws-stat__label">Content Pieces</span>
                    </div>
                    <span className="ws-stat__val stat-card__number" id="totalContent">45</span>
                </div>
                <div className="ws-stat stat-card">
                    <div className="ws-stat__top">
                        <span className="ws-stat__label">Research Notes</span>
                    </div>
                    <span className="ws-stat__val stat-card__number" id="totalNotes">8</span>
                </div>
                <div className="ws-stat stat-card">
                    <div className="ws-stat__top">
                        <span className="ws-stat__label">Dev Tasks</span>
                    </div>
                    <span className="ws-stat__val stat-card__number" id="totalTasks">23</span>
                </div>
            </div>

            <div className="widget-grid">
                <div className="widget">
                    <h3>Recent Activity</h3>
                    <div className="activity-feed" id="activityFeed">
                        <div className="activity-item">
                            <div className="activity-icon">📝</div>
                            <div className="activity-content">
                                <p><strong>Digital Transformation Guide</strong> was published</p>
                                <small>2 hours ago</small>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">✅</div>
                            <div className="activity-content">
                                <p><strong>Design homepage mockup</strong> completed</p>
                                <small>1 day ago</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="widget">
                    <h3>Upcoming Deadlines</h3>
                    <div className="deadline-list" id="deadlineList">
                        <div className="deadline-item priority-high">
                            <div className="deadline-date">Oct 15</div>
                            <div className="deadline-content">
                                <p>Contact form bug fix</p>
                                <span className="status status--error">High Priority</span>
                            </div>
                        </div>
                        <div className="deadline-item priority-medium">
                            <div className="deadline-date">Oct 18</div>
                            <div className="deadline-content">
                                <p>Business automation blog post</p>
                                <span className="status status--warning">Medium Priority</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <button className="btn btn--primary quick-action-btn" data-action="new-content">+ New Content</button>
                <button className="btn btn--primary quick-action-btn" data-action="new-project">+ New Project</button>
                <button className="btn btn--primary quick-action-btn" data-action="new-note">+ New Note</button>
                <button className="btn btn--primary quick-action-btn" data-action="new-task">+ New Task</button>
            </div>
        </div>
      </section>
    </div>
  )
}
