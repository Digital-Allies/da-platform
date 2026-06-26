'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Calendar, Layers, FileText, Image as ImageIcon, Search } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  type: string;
  excerpt: string;
  body: string;
  tags: string[];
  hero_image: string;
  status: string;
  scheduled_date: string;
  created_at: string;
}

interface CalendarItem {
  id?: string;
  day: number;
  category: string;
  topic: string;
  hook: string;
  caption: string;
  cta: string;
  status: 'draft' | 'approved' | 'scheduled' | 'posted';
}

export default function ContentClient({ initialArticles, initialCalendar }: { initialArticles: any[], initialCalendar: any[] }) {
  const [activeTab, setActiveTab] = useState('library');
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [calendar, setCalendar] = useState<CalendarItem[]>(initialCalendar);
  
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  const supabase = createClient();
  const router = useRouter();

  // Content form state
  const [contentForm, setContentForm] = useState({
    id: '',
    title: '',
    type: 'Blog Post',
    status: 'draft',
    tags: '',
    body: '',
    author: '',
    featured_image_url: '',
    slug: '',
    scheduled_date: '',
    meta_title: '',
    meta_description: ''
  });

  // Calendar item modal state
  const [editingCalendarItem, setEditingCalendarItem] = useState<CalendarItem | null>(null);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setContentForm(prev => ({
      ...prev,
      title,
      slug
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'featured_image_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { data, error } = await supabase.storage
        .from('client-assets')
        .upload(filePath, file);

      if (error) {
        alert('Upload failed: ' + error.message);
      } else if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('client-assets')
          .getPublicUrl(filePath);
        
        setContentForm(prev => ({ ...prev, [fieldName]: publicUrl }));
      }
    } catch (err: any) {
      alert('Upload exception: ' + err.message);
    }
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const payload = {
      client_id: clientId,
      title: contentForm.title,
      slug: contentForm.slug || contentForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      type: contentForm.type,
      status: contentForm.status,
      tags: contentForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      body: contentForm.body,
      excerpt: contentForm.meta_description || contentForm.body.substring(0, 150),
      hero_image: contentForm.featured_image_url || null,
      scheduled_date: contentForm.status === 'scheduled' && contentForm.scheduled_date ? new Date(contentForm.scheduled_date).toISOString() : null,
      updated_at: new Date().toISOString()
    };

    if (contentForm.id) {
      // Update
      const { data, error } = await supabase.from('articles').update(payload).eq('id', contentForm.id).select().single();
      if (!error && data) {
        setArticles(articles.map(a => a.id === contentForm.id ? data : a));
        setActiveTab('library');
        resetForm();
        router.refresh();
      } else {
        alert('Error updating article: ' + (error?.message || 'unknown error'));
      }
    } else {
      // Insert
      const { data, error } = await supabase.from('articles').insert([payload]).select().single();
      if (!error && data) {
        setArticles([data, ...articles]);
        setActiveTab('library');
        resetForm();
        router.refresh();
      } else {
        alert('Error creating article: ' + (error?.message || 'unknown error'));
      }
    }
  };

  const resetForm = () => {
    setContentForm({
      id: '',
      title: '',
      type: 'Blog Post',
      status: 'draft',
      tags: '',
      body: '',
      author: '',
      featured_image_url: '',
      slug: '',
      scheduled_date: '',
      meta_title: '',
      meta_description: ''
    });
  };

  const handleEditArticle = (article: Article) => {
    setContentForm({
      id: article.id,
      title: article.title,
      type: article.type || 'Blog Post',
      status: article.status,
      tags: article.tags ? article.tags.join(', ') : '',
      body: article.body || '',
      author: '',
      featured_image_url: article.hero_image || '',
      slug: article.slug,
      scheduled_date: article.scheduled_date ? new Date(article.scheduled_date).toISOString().slice(0, 16) : '',
      meta_title: article.title,
      meta_description: article.excerpt || ''
    });
    setActiveTab('create');
  };

  const useTemplate = (templateName: string) => {
    let title = '';
    let type = 'Blog Post';
    let body = '';

    if (templateName === 'blog') {
      title = 'Blog Post: [Enter Topic Here]';
      type = 'Blog Post';
      body = `<h2>Introduction</h2>\n<p>Hook the reader and introduce the main topic here...</p>\n\n<h2>Key Takeaways</h2>\n<ul>\n  <li>First key point explanation.</li>\n  <li>Second key point explanation.</li>\n</ul>\n\n<h2>Conclusion</h2>\n<p>Summary and call to action.</p>`;
    } else if (templateName === 'pr') {
      title = 'FOR IMMEDIATE RELEASE: [Enter Headline Here]';
      type = 'Press Release';
      body = `<p><strong>[CITY, STATE] — [DATE]</strong> — Lead paragraph containing who, what, when, where, and why.</p>\n\n<p>Supporting paragraph with a quote from a key executive or client.</p>\n\n<p>Boilerplate about Digital Allies goes here.</p>`;
    } else if (templateName === 'case') {
      title = 'Case Study: [Enter Client Name Here]';
      type = 'Case Study';
      body = `<h2>The Challenge</h2>\n<p>Describe the client's original pain points and objectives...</p>\n\n<h2>The Solution</h2>\n<p>Explain the strategy and technology implemented by Digital Allies...</p>\n\n<h2>The Results</h2>\n<p>Highlight key metrics and client feedback.</p>`;
    }

    setContentForm({
      id: '',
      title,
      type,
      status: 'draft',
      tags: '',
      body,
      author: '',
      featured_image_url: '',
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      scheduled_date: '',
      meta_title: '',
      meta_description: ''
    });
    setActiveTab('create');
  };

  // Calendar item click handler
  const handleCalendarDayClick = (dayNumber: number) => {
    const existing = calendar.find(item => item.day === dayNumber);
    if (existing) {
      setEditingCalendarItem(existing);
    } else {
      setEditingCalendarItem({
        day: dayNumber,
        category: 'DA Standard',
        topic: '',
        hook: '',
        caption: '',
        cta: '',
        status: 'draft'
      });
    }
    setCalendarModalOpen(true);
  };

  const handleCalendarSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCalendarItem) return;

    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const payload = {
      client_id: clientId,
      day: editingCalendarItem.day,
      week: Math.ceil(editingCalendarItem.day / 7),
      category: editingCalendarItem.category,
      topic: editingCalendarItem.topic,
      hook: editingCalendarItem.hook,
      caption: editingCalendarItem.caption,
      cta: editingCalendarItem.cta,
      status: editingCalendarItem.status,
      updated_at: new Date().toISOString()
    };

    if (editingCalendarItem.id) {
      // Update
      const { data, error } = await supabase.from('content_calendar').update(payload).eq('id', editingCalendarItem.id).select().single();
      if (!error && data) {
        setCalendar(calendar.map(item => item.id === editingCalendarItem.id ? data : item));
        setCalendarModalOpen(false);
      } else {
        alert('Error saving calendar item');
      }
    } else {
      // Insert
      const { data, error } = await supabase.from('content_calendar').insert([payload]).select().single();
      if (!error && data) {
        setCalendar([...calendar, data]);
        setCalendarModalOpen(false);
      } else {
        alert('Error creating calendar item');
      }
    }
    router.refresh();
  };

  // Filtering
  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchText.toLowerCase()) || 
                          (art.body && art.body.toLowerCase().includes(searchText.toLowerCase()));
    const matchesType = typeFilter ? art.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  return (
    <section className="section active" id="content-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Content</div>
          <h2>The Press Office</h2>
        </div>
        <button className="btn btn--primary" onClick={() => { resetForm(); setActiveTab('create'); }}>+ New Content</button>
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
            <strong>Content Library</strong> — Access and edit all published, scheduled, review, and draft long-form press assets.
          </div>
          <div className="content-filters">
            <div style={{ position: 'relative', flex: '1' }}>
              <input type="text" className="form-control" placeholder="Search title or content..." value={searchText} onChange={e => setSearchText(e.target.value)} />
            </div>
            <select className="form-control" style={{ maxWidth: '200px' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="">All Types</option>
              <option value="Blog Post">Blog Post</option>
              <option value="Press Release">Press Release</option>
              <option value="Case Study">Case Study</option>
            </select>
          </div>
          <div className="content-grid">
            {filteredArticles.map(article => (
              <div key={article.id} className="content-item" style={{ cursor: 'pointer' }} onClick={() => handleEditArticle(article)}>
                {article.hero_image && (
                  <div style={{ height: '140px', background: `url(${article.hero_image}) center/cover no-repeat`, marginBottom: '12px', borderBottom: 'var(--border-1)' }} />
                )}
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
            {filteredArticles.length === 0 && (
              <p style={{ gridColumn: '1 / -1', color: 'var(--text-soft)' }}>No content found matching your filters.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="tab-content active" id="create-tab">
          <form className="content-form" onSubmit={handleContentSubmit}>
            <div className="form-group">
              <label className="form-label">Article Title</label>
              <input type="text" className="form-control" required value={contentForm.title} onChange={e => handleTitleChange(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">URL Slug</label>
                <input type="text" className="form-control" required value={contentForm.slug} onChange={e => setContentForm({...contentForm, slug: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Author Name</label>
                <input type="text" className="form-control" value={contentForm.author} onChange={e => setContentForm({...contentForm, author: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Content Type</label>
                <select className="form-control" required value={contentForm.type} onChange={e => setContentForm({...contentForm, type: e.target.value})}>
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
            </div>

            {contentForm.status === 'scheduled' && (
              <div className="form-group">
                <label className="form-label">Scheduled Publish Date</label>
                <input type="datetime-local" className="form-control" required value={contentForm.scheduled_date} onChange={e => setContentForm({...contentForm, scheduled_date: e.target.value})} />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Featured Image</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" className="form-control" placeholder="Image URL (upload or paste)" value={contentForm.featured_image_url} onChange={e => setContentForm({...contentForm, featured_image_url: e.target.value})} />
                <label className="btn btn--secondary" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <Layers size={14}/> Upload
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(e, 'featured_image_url')} />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input type="text" className="form-control" placeholder="e.g. Local Data, Machine Translation, Trust" value={contentForm.tags} onChange={e => setContentForm({...contentForm, tags: e.target.value})} />
            </div>

            <div className="form-group">
              <label className="form-label">Content Body (HTML Supported)</label>
              <textarea className="form-control" rows={12} required value={contentForm.body} onChange={e => setContentForm({...contentForm, body: e.target.value})} />
            </div>

            {/* SEO Panel */}
            <div style={{ border: 'var(--border-1)', padding: '16px', background: 'var(--bg-alt)', marginTop: '20px', marginBottom: '20px' }}>
              <strong style={{ display: 'block', marginBottom: '10px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SEO Fields</strong>
              <div className="form-group">
                <label className="form-label">Meta Description</label>
                <textarea className="form-control" rows={3} placeholder="Brief summary of the article..." value={contentForm.meta_description} onChange={e => setContentForm({...contentForm, meta_description: e.target.value})} />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--primary">Save Content</button>
              <button type="button" className="btn btn--secondary" onClick={() => setActiveTab('library')}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="tab-content active" id="calendar-tab">
          <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Marketing Content Calendar</strong> — Set up content topics for the 30-day marketing lifecycle. Click any day to add or edit topics.
          </div>
          <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const item = calendar.find(c => c.day === dayNum);
              return (
                <div key={dayNum} onClick={() => handleCalendarDayClick(dayNum)} style={{ border: 'var(--border-1)', padding: '10px', background: 'var(--bg)', minHeight: '120px', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '11px', color: 'var(--signal)' }}>Day {dayNum}</strong>
                    {item && <span className="status status--review" style={{ fontSize: '8px', padding: '1px 3px' }}>{item.status}</span>}
                  </div>
                  {item ? (
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.topic}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-soft)', marginTop: '4px' }}>{item.category}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '10px', color: 'var(--text-soft)', fontStyle: 'italic', marginTop: '10px' }}>+ Add plans</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="tab-content active" id="templates-tab">
          <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Content Templates</strong> — Instantiate preset standard formatting templates.
          </div>
          <div className="templates-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="template-card" style={{ border: 'var(--border-1)', padding: '20px', background: 'var(--bg)' }}>
              <FileText size={24} style={{ marginBottom: '10px' }} />
              <h4>Blog Post Structure</h4>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', marginBottom: '16px' }}>Intro, key takeaways list, and call-to-action ending.</p>
              <button className="btn btn--secondary" onClick={() => useTemplate('blog')}>Use Template</button>
            </div>
            <div className="template-card" style={{ border: 'var(--border-1)', padding: '20px', background: 'var(--bg)' }}>
              <Layers size={24} style={{ marginBottom: '10px' }} />
              <h4>Press Release</h4>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', marginBottom: '16px' }}>FOR IMMEDIATE RELEASE headline, location prefix, and boilerplate layout.</p>
              <button className="btn btn--secondary" onClick={() => useTemplate('pr')}>Use Template</button>
            </div>
            <div className="template-card" style={{ border: 'var(--border-1)', padding: '20px', background: 'var(--bg)' }}>
              <Calendar size={24} style={{ marginBottom: '10px' }} />
              <h4>Case Study Detail</h4>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', marginBottom: '16px' }}>The Challenge, The Solution, and The Results metric structure.</p>
              <button className="btn btn--secondary" onClick={() => useTemplate('case')}>Use Template</button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Item Modal */}
      {calendarModalOpen && editingCalendarItem && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: '9999' }}>
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '16px' }}>Marketing Task — Day {editingCalendarItem.day}</h3>
            <form onSubmit={handleCalendarSave}>
              <div className="form-group">
                <label className="form-label">Topic / Headline</label>
                <input type="text" className="form-control" required value={editingCalendarItem.topic} onChange={e => setEditingCalendarItem({...editingCalendarItem, topic: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Marketing Category</label>
                <select className="form-control" value={editingCalendarItem.category} onChange={e => setEditingCalendarItem({...editingCalendarItem, category: e.target.value})}>
                  <option value="Local Data">Local Data</option>
                  <option value="Machine Translation">Machine Translation</option>
                  <option value="Trust & Culture">Trust & Culture</option>
                  <option value="DA Standard">DA Standard</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Hook</label>
                <input type="text" className="form-control" value={editingCalendarItem.hook} onChange={e => setEditingCalendarItem({...editingCalendarItem, hook: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Social Media Caption</label>
                <textarea className="form-control" rows={3} value={editingCalendarItem.caption} onChange={e => setEditingCalendarItem({...editingCalendarItem, caption: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Call-to-Action (CTA)</label>
                <input type="text" className="form-control" value={editingCalendarItem.cta} onChange={e => setEditingCalendarItem({...editingCalendarItem, cta: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={editingCalendarItem.status} onChange={e => setEditingCalendarItem({...editingCalendarItem, status: e.target.value as any})}>
                  <option value="draft">Draft</option>
                  <option value="approved">Approved</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="posted">Posted</option>
                </select>
              </div>
              <div className="form-actions" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn--secondary" onClick={() => setCalendarModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
