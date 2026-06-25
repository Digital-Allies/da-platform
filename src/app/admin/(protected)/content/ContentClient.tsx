'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ContentClient({ initialArticles, initialCalendar }: { initialArticles: any[], initialCalendar: any[] }) {
  const [activeTab, setActiveTab] = useState('library');
  const [articles, setArticles] = useState(initialArticles);
  const [calendar, setCalendar] = useState(initialCalendar);
  
  const supabase = createClient();
  const router = useRouter();

  // Content form state
  const [contentForm, setContentForm] = useState({
    title: '', type: '', status: 'draft', tags: '', body: ''
  });

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const payload = {
      client_id: clientId,
      title: contentForm.title,
      slug: contentForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      type: contentForm.type,
      status: contentForm.status,
      tags: contentForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      body: contentForm.body
    };

    const { data, error } = await supabase.from('articles').insert([payload]).select().single();
    if (!error && data) {
      setArticles([data, ...articles]);
      setActiveTab('library');
      setContentForm({ title: '', type: '', status: 'draft', tags: '', body: '' });
      router.refresh();
    } else {
      alert('Error creating content');
    }
  };

  return (
    <section className="section active" id="content-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Content</div>
          <h2>The Press Office</h2>
        </div>
        <button className="btn btn--primary" onClick={() => setActiveTab('create')}>+ New Content</button>
      </div>

      <div className="content-tabs">
        <button className={`tab-btn ${activeTab === 'library' ? 'active' : ''}`} onClick={() => setActiveTab('library')}>Content Library</button>
        <button className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>Create Content</button>
        <button className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>Content Calendar</button>
        <button className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>Templates</button>
      </div>

      {activeTab === 'library' && (
        <div className="tab-content active" id="library-tab">
          <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
              <strong>Content Library</strong> — All published and draft long-form content (blog posts, press releases, case studies).
          </div>
          <div className="content-filters">
              <input type="text" className="form-control" placeholder="Search content..." />
              <select className="form-control">
                  <option value="">All Types</option>
                  <option value="Blog Post">Blog Post</option>
                  <option value="Press Release">Press Release</option>
                  <option value="Case Study">Case Study</option>
              </select>
          </div>
          <div className="content-grid">
            {articles.map(article => (
              <div key={article.id} className="content-item">
                <div className="content-item__header">
                  <h3 className="content-item__title">{article.title}</h3>
                  <span className={`status status--${article.status}`}>{article.status}</span>
                </div>
                <div className="content-item__meta">
                  <span className="content-item__type">{article.type || 'Blog Post'}</span>
                  {new Date(article.created_at).toLocaleDateString()}
                </div>
                <div className="content-item__excerpt">{article.excerpt || 'No excerpt available.'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="tab-content active" id="create-tab">
          <form className="content-form" onSubmit={handleContentSubmit}>
            <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" required value={contentForm.title} onChange={e => setContentForm({...contentForm, title: e.target.value})} />
            </div>
            <div className="form-group">
                <label className="form-label">Content Type</label>
                <select className="form-control" required value={contentForm.type} onChange={e => setContentForm({...contentForm, type: e.target.value})}>
                    <option value="">Select type</option>
                    <option value="Blog Post">Blog Post</option>
                    <option value="Press Release">Press Release</option>
                    <option value="Case Study">Case Study</option>
                </select>
            </div>
            <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={contentForm.status} onChange={e => setContentForm({...contentForm, status: e.target.value})}>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                </select>
            </div>
            <div className="form-group">
                <label className="form-label">Tags</label>
                <input type="text" className="form-control" placeholder="Separate tags with commas" value={contentForm.tags} onChange={e => setContentForm({...contentForm, tags: e.target.value})} />
            </div>
            <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-control" rows={10} required value={contentForm.body} onChange={e => setContentForm({...contentForm, body: e.target.value})} />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn--primary">Save Content</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="tab-content active" id="calendar-tab">
          <div className="calendar-controls">
              <h3>30-Day Marketing Content Calendar</h3>
          </div>
          <div className="calendar-grid">
            {calendar.map(item => (
              <div key={item.id} className="calendar-item">
                <div className="calendar-item__day">Day {item.day}</div>
                <div className="calendar-item__header">
                  <div className="calendar-item__topic">{item.topic}</div>
                </div>
                <div className="calendar-item__category">{item.category}</div>
                <div className="calendar-item__hook">{item.hook}</div>
                <div className="calendar-item__caption">{item.caption}</div>
                <div className="calendar-item__cta">{item.cta}</div>
                <div className="calendar-item__status">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="tab-content active" id="templates-tab">
          <div className="templates-grid">
              <div className="template-card">
                  <h4>Blog Post Structure</h4>
                  <button className="btn btn--secondary" onClick={() => setActiveTab('create')}>Use Template</button>
              </div>
          </div>
        </div>
      )}
    </section>
  );
}
