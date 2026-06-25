'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function PagesClient({ initialPages }: { initialPages: any[] }) {
  const [pages, setPages] = useState(initialPages);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    metaDesc: '',
    content: '',
    status: 'draft',
  });

  const handleNewPage = () => {
    setFormData({ id: '', title: '', slug: '', metaDesc: '', content: '', status: 'draft' });
    setIsEditing(true);
  };

  const handleEditPage = (page: any) => {
    setFormData({
      id: page.id,
      title: page.title,
      slug: page.slug,
      metaDesc: page.meta?.description || '',
      content: page.blocks ? JSON.stringify(page.blocks) : '', // Assuming simple text or blocks
      status: page.status,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    const payload = {
      client_id: clientId,
      title: formData.title,
      slug: formData.slug,
      meta: { description: formData.metaDesc },
      blocks: formData.content ? [{ type: 'text', data: formData.content }] : [],
      status: formData.status,
    };

    if (formData.id) {
      // Update
      const { data, error } = await supabase.from('pages').update(payload).eq('id', formData.id).select().single();
      if (!error && data) {
        setPages(pages.map(p => p.id === formData.id ? data : p));
        setIsEditing(false);
      } else {
        alert('Error updating page');
      }
    } else {
      // Insert
      const { data, error } = await supabase.from('pages').insert([payload]).select().single();
      if (!error && data) {
        setPages([...pages, data]);
        setIsEditing(false);
      } else {
        alert('Error creating page');
      }
    }
    router.refresh();
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? page.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="section active" id="pages-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Site Management</div>
          <h2>Pages</h2>
        </div>
        {!isEditing && (
          <button className="btn btn--primary" onClick={handleNewPage}>+ New Page</button>
        )}
      </div>

      {!isEditing ? (
        <>
          <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Pages</strong> — Create and manage website pages. Each page has a slug (URL), title, meta description, and content. Pages can be published or in draft status.
          </div>

          <div className="content-filters">
            <input type="text" className="form-control" placeholder="Search pages..." value={search} onChange={e => setSearch(e.target.value)} />
            <select className="form-control" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="content-grid" id="pagesGrid">
            {filteredPages.map(page => (
              <div key={page.id} className="content-item" onClick={() => handleEditPage(page)}>
                <div className="content-item__header">
                  <h3 className="content-item__title">{page.title}</h3>
                  <span className={`status status--${page.status}`}>{page.status}</span>
                </div>
                <div className="content-item__meta">/{page.slug}</div>
                <div className="content-item__excerpt">
                  {page.meta?.description || 'No description provided.'}
                </div>
              </div>
            ))}
            {filteredPages.length === 0 && (
              <p style={{ gridColumn: '1 / -1', color: 'var(--text-soft)' }}>No pages found.</p>
            )}
          </div>
        </>
      ) : (
        <div className="dev-task-form" id="pageForm">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Page Title</label>
              <input type="text" className="form-control" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">URL Slug</label>
              <input type="text" className="form-control" placeholder="e.g. about-us, services, contact" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Meta Description (for SEO)</label>
              <input type="text" className="form-control" placeholder="Brief description for search results" value={formData.metaDesc} onChange={e => setFormData({...formData, metaDesc: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Page Content</label>
              <textarea className="form-control" rows={12} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn--primary">Save Page</button>
              <button type="button" className="btn btn--secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
