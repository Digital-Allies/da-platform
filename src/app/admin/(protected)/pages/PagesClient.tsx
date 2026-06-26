'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ArrowUp, ArrowDown, Trash, Plus } from 'lucide-react';

interface Block {
  type: string;
  data: any;
}

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
    status: 'draft',
  });

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);

  const handleNewPage = () => {
    setFormData({ id: '', title: '', slug: '', metaDesc: '', status: 'draft' });
    setBlocks([
      { type: 'hero', data: { title: 'Welcome to our site', subtitle: 'This is the hero subtitle', ctaText: 'Get Started', ctaLink: '#contact' } },
      { type: 'richtext', data: { content: '<p>Edit this paragraph to add custom information.</p>' } }
    ]);
    setSelectedBlockIndex(0);
    setIsEditing(true);
  };

  const handleEditPage = (page: any) => {
    setFormData({
      id: page.id,
      title: page.title,
      slug: page.slug,
      metaDesc: page.meta?.description || '',
      status: page.status,
    });
    setBlocks(page.blocks || []);
    setSelectedBlockIndex((page.blocks && page.blocks.length > 0) ? 0 : null);
    setIsEditing(true);
  };

  const handleAddBlock = (type: string) => {
    let defaultData = {};
    if (type === 'hero') {
      defaultData = { title: 'New Hero Block', subtitle: 'Subtitle goes here', ctaText: 'Click Me', ctaLink: '#' };
    } else if (type === 'richtext') {
      defaultData = { content: '<p>Richtext content goes here.</p>' };
    } else if (type === 'services') {
      defaultData = { title: 'Our Services', description: 'Brief description' };
    } else if (type === 'testimonials') {
      defaultData = { title: 'What Clients Say', description: 'Client review descriptions' };
    } else if (type === 'cta') {
      defaultData = { title: 'Ready to start?', subtitle: 'Get in touch today', buttonText: 'Contact Us', buttonLink: '#contact' };
    }

    const newBlocks = [...blocks, { type, data: defaultData }];
    setBlocks(newBlocks);
    setSelectedBlockIndex(newBlocks.length - 1);
  };

  const handleRemoveBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
    if (selectedBlockIndex === index) {
      setSelectedBlockIndex(newBlocks.length > 0 ? 0 : null);
    } else if (selectedBlockIndex !== null && selectedBlockIndex > index) {
      setSelectedBlockIndex(selectedBlockIndex - 1);
    }
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;

    setBlocks(newBlocks);
    setSelectedBlockIndex(targetIndex);
  };

  const handleBlockDataChange = (index: number, key: string, value: any) => {
    const newBlocks = [...blocks];
    newBlocks[index].data = {
      ...newBlocks[index].data,
      [key]: value
    };
    setBlocks(newBlocks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    const payload = {
      client_id: clientId,
      title: formData.title,
      slug: formData.slug,
      meta: { description: formData.metaDesc },
      blocks: blocks,
      status: formData.status,
      updated_at: new Date().toISOString(),
    };

    if (formData.id) {
      // Update
      const { data, error } = await supabase.from('pages').update(payload).eq('id', formData.id).select().single();
      if (!error && data) {
        setPages(pages.map(p => p.id === formData.id ? data : p));
        setIsEditing(false);
      } else {
        alert('Error updating page: ' + (error?.message || 'unknown error'));
      }
    } else {
      // Insert
      const { data, error } = await supabase.from('pages').insert([payload]).select().single();
      if (!error && data) {
        setPages([...pages, data]);
        setIsEditing(false);
      } else {
        alert('Error creating page: ' + (error?.message || 'unknown error'));
      }
    }
    router.refresh();
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? page.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Dynamic iframe srcDoc generator
  const generatePreviewHtml = () => {
    const blocksHtml = blocks.map(block => {
      const brandColor = '#3A7BD5';
      switch (block.type) {
        case 'hero':
          return `
            <header style="background: ${brandColor}; color: white; padding: 60px 20px; text-align: center; font-family: 'Lexend Deca', sans-serif;">
              <h1 style="font-size: 36px; margin: 0 0 12px 0;">${block.data.title || 'Hero Title'}</h1>
              <p style="font-size: 16px; opacity: 0.9; max-width: 600px; margin: 0 auto 20px auto; font-family: 'JetBrains Mono', monospace;">${block.data.subtitle || 'Hero Subtitle'}</p>
              ${block.data.ctaText ? `<a href="${block.data.ctaLink || '#'}" style="display: inline-block; padding: 10px 20px; background: white; color: ${brandColor}; font-weight: bold; text-decoration: none; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 13px;">${block.data.ctaText}</a>` : ''}
            </header>
          `;
        case 'richtext':
          return `
            <section style="padding: 40px 20px; max-width: 800px; margin: 0 auto; line-height: 1.6; font-family: 'JetBrains Mono', monospace; color: #2D2D2D;">
              ${block.data.content || '<p>Start typing content...</p>'}
            </section>
          `;
        case 'services':
          return `
            <section style="padding: 45px 20px; text-align: center; background: #FCFAED; font-family: 'Lexend Deca', sans-serif;">
              <h2 style="font-size: 24px; margin-bottom: 24px; color: #2D2D2D;">${block.data.title || 'Our Services'}</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; max-width: 800px; margin: 0 auto;">
                <div style="background: white; padding: 18px; border: 1px solid #2D2D2D; text-align: left;">
                  <h3 style="margin-top: 0; font-size: 16px;">Strategy Consulting</h3>
                  <p style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #6b6b6b;">Expert digital strategy alignment.</p>
                </div>
                <div style="background: white; padding: 18px; border: 1px solid #2D2D2D; text-align: left;">
                  <h3 style="margin-top: 0; font-size: 16px;">Web Development</h3>
                  <p style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #6b6b6b;">Premium website builders and apps.</p>
                </div>
              </div>
            </section>
          `;
        case 'testimonials':
          return `
            <section style="padding: 45px 20px; text-align: center; background: white; font-family: 'Lexend Deca', sans-serif;">
              <h2 style="font-size: 24px; margin-bottom: 24px; color: #2D2D2D;">${block.data.title || 'What Clients Say'}</h2>
              <div style="max-width: 600px; margin: 0 auto; border: 1px solid #2D2D2D; padding: 24px; background: #FCFAED; font-family: 'JetBrains Mono', monospace;">
                <p style="font-style: italic; font-size: 14px; color: #2D2D2D;">"Digital Allies transformed our online presence. High quality, great communication."</p>
                <p style="font-weight: bold; margin-top: 12px; color: ${brandColor};">- Jane Doe, CEO</p>
              </div>
            </section>
          `;
        case 'cta':
          return `
            <section style="padding: 45px 20px; text-align: center; background: #2D2D2D; color: white; font-family: 'Lexend Deca', sans-serif;">
              <h2 style="font-size: 24px; margin-bottom: 12px;">${block.data.title || 'Ready to elevate?'}</h2>
              <p style="color: #888; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px;">${block.data.subtitle || 'Let\'s discuss how we can partner.'}</p>
              <a href="${block.data.buttonLink || '#'}" style="display: inline-block; padding: 10px 20px; background: ${brandColor}; color: white; text-decoration: none; font-weight: bold; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 13px;">${block.data.buttonText || 'Contact Us'}</a>
            </section>
          `;
        default:
          return '';
      }
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Lexend+Deca:wght@700&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; padding: 0; background: #F9F6F0; font-family: sans-serif; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${blocksHtml}
        </body>
      </html>
    `;
  };

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
            <strong>Pages</strong> — Create and manage website pages. Each page has a slug (URL), title, meta description, and component blocks.
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', minHeight: '600px' }}>
          {/* Left panel: editor form */}
          <div className="dev-task-form" style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px', width: '100%', maxWidth: 'none', margin: '0' }}>
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

              {/* Blocks Editor */}
              <div style={{ borderTop: 'var(--border-1)', paddingTop: '20px', marginTop: '20px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Page Blocks</h3>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('hero')} style={{ padding: '6px 10px', minWidth: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={12}/> Hero</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('richtext')} style={{ padding: '6px 10px', minWidth: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={12}/> Richtext</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('services')} style={{ padding: '6px 10px', minWidth: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={12}/> Services</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('testimonials')} style={{ padding: '6px 10px', minWidth: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={12}/> Testimonials</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('cta')} style={{ padding: '6px 10px', minWidth: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={12}/> CTA</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {blocks.map((block, idx) => (
                    <div key={idx} style={{ border: selectedBlockIndex === idx ? '2px solid var(--accent)' : '1px solid var(--charcoal)', padding: '12px', background: 'var(--bg-alt)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <strong style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Block {idx + 1}: {block.type}</strong>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button type="button" className="btn btn--secondary" onClick={() => handleMoveBlock(idx, 'up')} disabled={idx === 0} style={{ padding: '4px', minWidth: 'auto' }}><ArrowUp size={12} /></button>
                          <button type="button" className="btn btn--secondary" onClick={() => handleMoveBlock(idx, 'down')} disabled={idx === blocks.length - 1} style={{ padding: '4px', minWidth: 'auto' }}><ArrowDown size={12} /></button>
                          <button type="button" className="btn btn--secondary" onClick={() => setSelectedBlockIndex(idx)} style={{ padding: '4px 8px', fontSize: '10px', minWidth: 'auto' }}>Edit</button>
                          <button type="button" className="btn btn--secondary" onClick={() => handleRemoveBlock(idx)} style={{ padding: '4px', minWidth: 'auto', color: 'var(--signal)' }}><Trash size={12} /></button>
                        </div>
                      </div>

                      {selectedBlockIndex === idx && (
                        <div style={{ background: 'var(--bg)', padding: '12px', border: 'var(--border-hairline)', marginTop: '8px' }}>
                          {block.type === 'hero' && (
                            <>
                              <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label className="form-label">Headline</label>
                                <input type="text" className="form-control" value={block.data.title || ''} onChange={e => handleBlockDataChange(idx, 'title', e.target.value)} />
                              </div>
                              <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label className="form-label">Subheading</label>
                                <input type="text" className="form-control" value={block.data.subtitle || ''} onChange={e => handleBlockDataChange(idx, 'subtitle', e.target.value)} />
                              </div>
                              <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label className="form-label">CTA Text</label>
                                <input type="text" className="form-control" value={block.data.ctaText || ''} onChange={e => handleBlockDataChange(idx, 'ctaText', e.target.value)} />
                              </div>
                              <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label className="form-label">CTA Link</label>
                                <input type="text" className="form-control" value={block.data.ctaLink || ''} onChange={e => handleBlockDataChange(idx, 'ctaLink', e.target.value)} />
                              </div>
                            </>
                          )}
                          {block.type === 'richtext' && (
                            <div className="form-group" style={{ marginBottom: '10px' }}>
                              <label className="form-label">HTML Content</label>
                              <textarea className="form-control" rows={6} value={block.data.content || ''} onChange={e => handleBlockDataChange(idx, 'content', e.target.value)} />
                            </div>
                          )}
                          {block.type === 'services' && (
                            <div className="form-group" style={{ marginBottom: '10px' }}>
                              <label className="form-label">Section Title</label>
                              <input type="text" className="form-control" value={block.data.title || ''} onChange={e => handleBlockDataChange(idx, 'title', e.target.value)} />
                            </div>
                          )}
                          {block.type === 'testimonials' && (
                            <div className="form-group" style={{ marginBottom: '10px' }}>
                              <label className="form-label">Section Title</label>
                              <input type="text" className="form-control" value={block.data.title || ''} onChange={e => handleBlockDataChange(idx, 'title', e.target.value)} />
                            </div>
                          )}
                          {block.type === 'cta' && (
                            <>
                              <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label className="form-label">Headline</label>
                                <input type="text" className="form-control" value={block.data.title || ''} onChange={e => handleBlockDataChange(idx, 'title', e.target.value)} />
                              </div>
                              <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label className="form-label">Subheading</label>
                                <input type="text" className="form-control" value={block.data.subtitle || ''} onChange={e => handleBlockDataChange(idx, 'subtitle', e.target.value)} />
                              </div>
                              <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label className="form-label">Button Text</label>
                                <input type="text" className="form-control" value={block.data.buttonText || ''} onChange={e => handleBlockDataChange(idx, 'buttonText', e.target.value)} />
                              </div>
                              <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label className="form-label">Button Link</label>
                                <input type="text" className="form-control" value={block.data.buttonLink || ''} onChange={e => handleBlockDataChange(idx, 'buttonLink', e.target.value)} />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
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

          {/* Right panel: visual preview */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', border: 'var(--border-1)', background: '#fff' }}>
            <div style={{ background: 'var(--bg-alt)', borderBottom: 'var(--border-1)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Live Layout Preview</span>
              <span className="status status--review" style={{ fontSize: '9px' }}>Previewing</span>
            </div>
            <iframe
              srcDoc={generatePreviewHtml()}
              style={{ width: '100%', flex: '1', border: 'none', background: '#F9F6F0' }}
              title="Live Preview"
            />
          </div>
        </div>
      )}
    </section>
  );
}
