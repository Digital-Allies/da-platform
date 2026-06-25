import React from 'react';

export default function ProjectsPage() {
  return (
    <div className="ws-page">
      <section className="section active" id="projects-section">
        <div className="ws-head">
          <div>
            <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Organization</div>
            <h2>Projects</h2>
          </div>
          <button className="btn btn--primary">+ New Project</button>
        </div>

        <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Projects Kanban</strong> — Track project statuses. <em>Coming soon (requires DB migration).</em>
        </div>

        <div className="project-selector">
          <select className="form-control">
            <option>Loading projects...</option>
          </select>
        </div>

        <div className="kanban-board">
          <div className="kanban-column">
            <div className="kanban-column__header">
              <h3 className="kanban-column__title">To Do</h3>
              <span className="kanban-column__count">0</span>
            </div>
            <div className="kanban-column__tasks"></div>
          </div>
          <div className="kanban-column">
            <div className="kanban-column__header">
              <h3 className="kanban-column__title">In Progress</h3>
              <span className="kanban-column__count">0</span>
            </div>
            <div className="kanban-column__tasks"></div>
          </div>
          <div className="kanban-column">
            <div className="kanban-column__header">
              <h3 className="kanban-column__title">Review</h3>
              <span className="kanban-column__count">0</span>
            </div>
            <div className="kanban-column__tasks"></div>
          </div>
          <div className="kanban-column">
            <div className="kanban-column__header">
              <h3 className="kanban-column__title">Done</h3>
              <span className="kanban-column__count">0</span>
            </div>
            <div className="kanban-column__tasks"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
