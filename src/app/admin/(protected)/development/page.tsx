import React from 'react';

export default function WorkshopPage() {
  return (
    <div className="ws-page">
      <section className="section active" id="development-section">
        <div className="ws-head">
          <div>
            <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Development Tracker</div>
            <h2>The Workshop</h2>
          </div>
          <button className="btn btn--primary">+ New Task</button>
        </div>

        <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Dev Tracker</strong> — Technical tasks, bugs, and feature requests. <em>Coming soon (requires DB migration).</em>
        </div>

        <div className="dev-tabs">
          <button className="tab-btn active">Features</button>
          <button className="tab-btn">Bugs</button>
          <button className="tab-btn">Milestones</button>
        </div>

        <div className="tab-content active" id="features-tab">
          <div className="dev-filters">
            <select className="form-control">
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
            </select>
            <select className="form-control">
              <option value="">All Priority</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="dev-tasks-grid">
            <div className="dev-task-item">
              <div>
                <h4 className="dev-task-item__title">CMS Backend Integration</h4>
                <div className="dev-task-item__description">Wire up the dashboard template to Supabase collections.</div>
              </div>
              <div className="dev-task-item__actions">
                <span className="status status--testing">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
