import React from 'react';

export default function ResearchPage() {
  return (
    <div className="ws-page">
      <section className="section active" id="research-section">
        <div className="ws-head">
          <div>
            <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Documentation</div>
            <h2>Research</h2>
          </div>
          <button className="btn btn--primary">+ New Note</button>
        </div>

        <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Research & Notes</strong> — Internal documentation and client notes. <em>Coming soon (requires DB migration).</em>
        </div>

        <div className="research-layout">
          <div className="notebooks-sidebar">
            <h3>Notebooks</h3>
            <div className="notebook-list">
              <div className="notebook-item active">All Notes</div>
              <div className="notebook-item">Strategy</div>
              <div className="notebook-item">Discovery</div>
            </div>
          </div>

          <div className="notes-content">
            <div className="notes-header">
              <input type="text" className="form-control" placeholder="Search notes..." />
              <button className="btn btn--secondary">Export Notes</button>
            </div>
            
            <div className="notes-grid">
              <div className="note-item">
                <h4 className="note-item__title">Digital Allies Brand Positioning</h4>
                <div className="note-item__preview">Notes from the initial brand discovery session discussing core values and positioning...</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
