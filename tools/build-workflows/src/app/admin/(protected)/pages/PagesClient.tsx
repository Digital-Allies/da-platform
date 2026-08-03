'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useClientId } from '@/lib/client-context';
import { useRouter } from 'next/navigation';
import { ArrowUp, ArrowDown, Trash, Plus, Zap, Check, Code2 } from 'lucide-react';

interface Block {
  type: string;
  data: any;
  bindings?: Record<string, string>;
  customCode?: string | null;
}

interface PagesClientProps {
  initialPages: any[];
  siteSettings?: any;
  designTokens?: any;
}

const CONNECTED_DATA_OPTIONS = [
  { key: '{site_title}', label: 'Business Name (e.g. Atomic Finds ATX)' },
  { key: '{tagline}', label: 'Business Tagline' },
  { key: '{phone}', label: 'Support Phone Number' },
  { key: '{email}', label: 'Support Email Address' },
  { key: '{address}', label: 'Location / Address Line' },
  { key: '{hero_title}', label: 'Hero Headline' },
  { key: '{hero_subtitle}', label: 'Hero Subheading' },
  { key: '{about_title}', label: 'About Section Title' },
  { key: '{about_body}', label: 'About Body Copy' },
  { key: '{announcement_banner}', label: 'Announcement Banner Bar' },
  { key: '{shipping_policy}', label: 'Shipping Policy Terms' },
  { key: '{return_policy}', label: 'Return & Exchange Policy' },
];

export default function PagesClient({ initialPages, siteSettings = {}, designTokens = {} }: PagesClientProps) {
  const [pages, setPages] = useState(initialPages);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');
  const supabase = createClient();
  const router = useRouter();
  const clientId = useClientId();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    metaDesc: '',
    status: 'draft',
  });

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [blockTab, setBlockTab] = useState<'content' | 'code'>('content');

  const selectBlock = (index: number | null) => {
    setSelectedBlockIndex(index);
    setBlockTab('content');
  };

  // Extract design tokens for live preview
  const primaryColor = designTokens?.primary_color || designTokens?.colors?.primary || '#B7791F';
  const accentColor = designTokens?.accent_color || designTokens?.colors?.secondary || '#C5301A';
  const bgColor = designTokens?.bg_color || designTokens?.colors?.bg || '#F9F6F0';
  const textColor = designTokens?.fg_body_color || designTokens?.colors?.text || '#2D2D2D';
  const fontHeading = designTokens?.font_header || designTokens?.fonts?.heading || 'Lexend Deca';
  const fontBody = designTokens?.font_body || designTokens?.fonts?.body || 'JetBrains Mono';
  const buttonRadius = designTokens?.button_radius || '6px';
  const buttonGlow = designTokens?.button_glow || '0 4px 14px rgba(183,121,31,0.3)';

  // Resolve Connected Data strings
  const resolveText = (text: string = '') => {
    if (!text) return '';
    let resolved = text;
    resolved = resolved.replace(/{site_title}/g, siteSettings?.site_title || 'Digital Allies');
    resolved = resolved.replace(/{tagline}/g, siteSettings?.tagline || '');
    resolved = resolved.replace(/{phone}/g, siteSettings?.phone || '');
    resolved = resolved.replace(/{email}/g, siteSettings?.email || '');
    resolved = resolved.replace(/{address}/g, siteSettings?.address || '');
    resolved = resolved.replace(/{hero_title}/g, siteSettings?.hero_title || '');
    resolved = resolved.replace(/{hero_subtitle}/g, siteSettings?.hero_subtitle || '');
    resolved = resolved.replace(/{about_title}/g, siteSettings?.about_title || '');
    resolved = resolved.replace(/{about_body}/g, siteSettings?.about_body || '');
    resolved = resolved.replace(/{announcement_banner}/g, siteSettings?.announcement_banner || '');
    resolved = resolved.replace(/{shipping_policy}/g, siteSettings?.shipping_policy || '');
    resolved = resolved.replace(/{return_policy}/g, siteSettings?.return_policy || '');
    return resolved;
  };

  const handleNewPage = () => {
    setFormData({ id: '', title: '', slug: '', metaDesc: '', status: 'draft' });
    setBlocks([
      { type: 'hero', data: { title: '{hero_title}', subtitle: '{hero_subtitle}', ctaText: 'Explore Catalog', ctaLink: '#showroom' } },
      { type: 'richtext', data: { content: '<p>Welcome to {site_title}. {tagline}</p>' } }
    ]);
    selectBlock(0);
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
    selectBlock((page.blocks && page.blocks.length > 0) ? 0 : null);
    setIsEditing(true);
  };

  const handleAddBlock = (type: string) => {
    let defaultData = {};
    if (type === 'hero') {
      defaultData = { title: '{hero_title}', subtitle: '{hero_subtitle}', ctaText: 'Shop Collection', ctaLink: '#showroom' };
    } else if (type === 'richtext') {
      defaultData = { content: '<p>Welcome to {site_title}. Edit this copy or connect to live data variables.</p>' };
    } else if (type === 'services') {
      defaultData = { title: 'Our Services', description: 'Curated solutions' };
    } else if (type === 'testimonials') {
      defaultData = { title: 'Customer Reviews', description: 'What buyers say' };
    } else if (type === 'products') {
      defaultData = { title: 'Featured Finds Catalog' };
    } else if (type === 'cta') {
      defaultData = { title: 'Ready to Order?', subtitle: 'Contact our store team today', buttonText: 'Contact Us', buttonLink: '#contact' };
    } else if (type === 'contact') {
      defaultData = { title: 'Get in Touch', subtitle: 'Call us at {phone} or send a message below.' };
    }

    const newBlocks = [...blocks, { type, data: defaultData }];
    setBlocks(newBlocks);
    selectBlock(newBlocks.length - 1);
  };

  const handleRemoveBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
    if (selectedBlockIndex === index) {
      selectBlock(newBlocks.length > 0 ? 0 : null);
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

  const handleBlockCodeChange = (index: number, value: string) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], customCode: value };
    setBlocks(newBlocks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const { data, error } = await supabase.from('pages').update(payload).eq('id', formData.id).select().single();
      if (!error && data) {
        setPages(pages.map(p => p.id === formData.id ? data : p));
        setIsEditing(false);
      } else {
        alert('Error updating page: ' + (error?.message || 'unknown error'));
      }
    } else {
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

  // Generate dynamic preview HTML using client design tokens and resolved connected data
  const generatePreviewHtml = () => {
    const blocksHtml = blocks.map(block => {
      if (block.customCode) {
        return `<div>${resolveText(block.customCode)}</div>`;
      }
      switch (block.type) {
        case 'hero':
          return `
            <header style="background: ${primaryColor}; color: white; padding: 60px 20px; text-align: center; font-family: '${fontHeading}', sans-serif;">
              <h1 style="font-size: 36px; margin: 0 0 12px 0;">${resolveText(block.data.title) || 'Hero Headline'}</h1>
              <p style="font-size: 16px; opacity: 0.9; max-width: 600px; margin: 0 auto 20px auto; font-family: '${fontBody}', monospace;">${resolveText(block.data.subtitle) || 'Hero Subheading'}</p>
              ${block.data.ctaText ? `<a href="${block.data.ctaLink || '#'}" style="display: inline-block; padding: 10px 22px; background: white; color: ${primaryColor}; font-weight: bold; text-decoration: none; border-radius: ${buttonRadius}; box-shadow: ${buttonGlow}; font-family: '${fontBody}', monospace; font-size: 13px;">${resolveText(block.data.ctaText)}</a>` : ''}
            </header>
          `;
        case 'richtext':
          return `
            <section style="padding: 40px 20px; max-width: 800px; margin: 0 auto; line-height: 1.6; font-family: '${fontBody}', monospace; color: ${textColor};">
              ${resolveText(block.data.content) || '<p>Start typing content...</p>'}
            </section>
          `;
        case 'services':
          return `
            <section style="padding: 45px 20px; text-align: center; background: ${bgColor}; font-family: '${fontHeading}', sans-serif;">
              <h2 style="font-size: 24px; margin-bottom: 24px; color: ${textColor};">${resolveText(block.data.title) || 'Our Services'}</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; max-width: 800px; margin: 0 auto;">
                <div style="background: white; padding: 18px; border: 1px solid ${textColor}; text-align: left; border-radius: ${buttonRadius};">
                  <h3 style="margin-top: 0; font-size: 16px;">Strategy Consulting</h3>
                  <p style="font-family: '${fontBody}', monospace; font-size: 12px; color: #6b6b6b;">Expert digital strategy alignment.</p>
                </div>
                <div style="background: white; padding: 18px; border: 1px solid ${textColor}; text-align: left; border-radius: ${buttonRadius};">
                  <h3 style="margin-top: 0; font-size: 16px;">Web Development</h3>
                  <p style="font-family: '${fontBody}', monospace; font-size: 12px; color: #6b6b6b;">Premium website builders and apps.</p>
                </div>
              </div>
            </section>
          `;
        case 'testimonials':
          return `
            <section style="padding: 45px 20px; text-align: center; background: white; font-family: '${fontHeading}', sans-serif;">
              <h2 style="font-size: 24px; margin-bottom: 24px; color: ${textColor};">${resolveText(block.data.title) || 'Customer Reviews'}</h2>
              <div style="max-width: 600px; margin: 0 auto; border: 1px solid ${textColor}; padding: 24px; background: ${bgColor}; font-family: '${fontBody}', monospace; border-radius: ${buttonRadius};">
                <p style="font-style: italic; font-size: 14px; color: ${textColor};">"High quality items, authentic customer service, and fast response times."</p>
                <p style="font-weight: bold; margin-top: 12px; color: ${primaryColor};">- Verified Buyer</p>
              </div>
            </section>
          `;
        case 'products':
          return `
            <section style="padding: 45px 20px; text-align: center; background: #1E1E1E; font-family: '${fontHeading}', sans-serif;">
              <h2 style="font-size: 24px; margin-bottom: 24px; color: ${primaryColor};">${resolveText(block.data.title) || 'Featured Catalog'}</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 800px; margin: 0 auto;">
                <div style="background: #23201B; border: 1px solid rgba(245,200,66,0.15); border-radius: 12px; padding: 14px; text-align: left;">
                  <div style="height: 90px; background: #14120E; border-radius: 8px; margin-bottom: 10px;"></div>
                  <h3 style="margin: 0 0 6px; font-size: 14px; color: ${primaryColor};">Vintage Item Sample</h3>
                  <p style="font-family: '${fontBody}', monospace; font-size: 11px; color: #9A8F7D; margin: 0;">Live Products render directly from Supabase</p>
                </div>
              </div>
            </section>
          `;
        case 'cta':
          return `
            <section style="padding: 45px 20px; text-align: center; background: ${textColor}; color: white; font-family: '${fontHeading}', sans-serif;">
              <h2 style="font-size: 24px; margin-bottom: 12px;">${resolveText(block.data.title) || 'Ready to start?'}</h2>
              <p style="color: #aaa; font-family: '${fontBody}', monospace; font-size: 13px; margin-bottom: 20px;">${resolveText(block.data.subtitle) || 'Contact us today.'}</p>
              <a href="${block.data.buttonLink || '#'}" style="display: inline-block; padding: 10px 22px; background: ${primaryColor}; color: white; text-decoration: none; font-weight: bold; border-radius: ${buttonRadius}; box-shadow: ${buttonGlow}; font-family: '${fontBody}', monospace; font-size: 13px;">${resolveText(block.data.buttonText) || 'Contact Us'}</a>
            </section>
          `;
        case 'contact':
          return `
            <section style="padding: 45px 20px; text-align: center; background: ${bgColor}; border-top: 1px solid ${textColor}; font-family: '${fontHeading}', sans-serif;">
              <h2 style="font-size: 24px; margin-bottom: 8px; color: ${textColor};">${resolveText(block.data.title) || 'Get in Touch'}</h2>
              <p style="color: #6b6b6b; font-family: '${fontBody}', monospace; font-size: 13px; margin-bottom: 24px;">${resolveText(block.data.subtitle) || 'Fill out the form below.'}</p>
              <div style="max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid ${textColor}; background: white; text-align: left; border-radius: ${buttonRadius};">
                <div style="margin-bottom: 12px;">
                  <label style="display: block; font-size: 11px; font-weight: bold; margin-bottom: 4px; text-transform: uppercase; color: ${textColor};">Name</label>
                  <div style="height: 36px; border: 1px solid #E0DDD5; background: #fdfdfd; border-radius: 4px;"></div>
                </div>
                <div style="margin-bottom: 12px;">
                  <label style="display: block; font-size: 11px; font-weight: bold; margin-bottom: 4px; text-transform: uppercase; color: ${textColor};">Email</label>
                  <div style="height: 36px; border: 1px solid #E0DDD5; background: #fdfdfd; border-radius: 4px;"></div>
                </div>
                <div style="margin-bottom: 12px;">
                  <label style="display: block; font-size: 11px; font-weight: bold; margin-bottom: 4px; text-transform: uppercase; color: ${textColor};">Message</label>
                  <div style="height: 70px; border: 1px solid #E0DDD5; background: #fdfdfd; border-radius: 4px;"></div>
                </div>
                <div style="display: inline-block; padding: 10px 20px; background: ${primaryColor}; color: white; font-weight: bold; font-family: '${fontBody}', monospace; font-size: 12px; text-transform: uppercase; border-radius: ${buttonRadius}; box-shadow: ${buttonGlow};">Send Message</div>
              </div>
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
            body { margin: 0; padding: 0; background: ${bgColor}; font-family: '${fontBody}', monospace; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${blocksHtml}
        </body>
      </html>
    `;
  };

  // Helper field input with Duda-style Connect to Data picker
  const ConnectedInputField = ({
    label,
    value,
    onChange,
    isTextarea = false,
  }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    isTextarea?: boolean;
  }) => {
    const [pickerOpen, setPickerOpen] = useState(false);

    return (
      <div className="form-group" style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <label className="form-label font-bold text-xs uppercase tracking-wider">{label}</label>
          <button
            type="button"
            onClick={() => setPickerOpen(!pickerOpen)}
            style={{
              fontSize: '11px',
              color: 'var(--tok-primary, #B7791F)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 'bold',
            }}
          >
            <Zap size={12} /> {pickerOpen ? 'Close Data Picker' : '⚡ Connect to Data'}
          </button>
        </div>

        {pickerOpen && (
          <div style={{ background: 'var(--bg-alt, #fafafa)', border: '1px solid var(--tok-primary, #B7791F)', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Select Connected Variable:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '120px', overflowY: 'auto' }}>
              {CONNECTED_DATA_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    onChange(opt.key);
                    setPickerOpen(false);
                  }}
                  style={{
                    textAlign: 'left',
                    fontSize: '11px',
                    padding: '4px 8px',
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                >
                  <strong style={{ color: 'var(--tok-primary, #B7791F)' }}>{opt.key}</strong> — {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {isTextarea ? (
          <textarea
            className="form-control"
            rows={4}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className="form-control"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <section className="section active" id="pages-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Site Builder Engine</div>
          <h2>Pages & Layout Builder</h2>
        </div>
        {!isEditing && (
          <button className="btn btn--primary" onClick={handleNewPage}>+ New Page</button>
        )}
      </div>

      {!isEditing ? (
        <>
          <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Pages Editor</strong> — Manage site pages and connect blocks directly to your Supabase data & brand theme tokens.
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
        <div className="pe-split-grid">
          {/* Left panel: editor form */}
          <div className="dev-task-form" style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px', width: '100%', maxWidth: 'none', margin: '0' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="form-label font-bold text-xs uppercase">Page Title</label>
                <input type="text" className="form-control" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group mb-3">
                <label className="form-label font-bold text-xs uppercase">URL Slug</label>
                <input type="text" className="form-control" placeholder="e.g. about, showroom, contact" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
              </div>
              <div className="form-group mb-3">
                <label className="form-label font-bold text-xs uppercase">Meta Description (SEO)</label>
                <input type="text" className="form-control" placeholder="Brief description for search engines" value={formData.metaDesc} onChange={e => setFormData({...formData, metaDesc: e.target.value})} />
              </div>

              {/* Blocks Editor */}
              <div style={{ borderTop: 'var(--border-1)', paddingTop: '20px', marginTop: '20px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Component Blocks</h3>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('hero')} style={{ padding: '6px 10px', fontSize: '11px' }}><Plus size={12}/> Hero</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('richtext')} style={{ padding: '6px 10px', fontSize: '11px' }}><Plus size={12}/> Richtext</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('services')} style={{ padding: '6px 10px', fontSize: '11px' }}><Plus size={12}/> Services</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('testimonials')} style={{ padding: '6px 10px', fontSize: '11px' }}><Plus size={12}/> Reviews</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('products')} style={{ padding: '6px 10px', fontSize: '11px' }}><Plus size={12}/> Catalog</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('cta')} style={{ padding: '6px 10px', fontSize: '11px' }}><Plus size={12}/> CTA</button>
                  <button type="button" className="btn btn--secondary" onClick={() => handleAddBlock('contact')} style={{ padding: '6px 10px', fontSize: '11px' }}><Plus size={12}/> Contact Form</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {blocks.map((block, idx) => (
                    <div key={idx} style={{ border: selectedBlockIndex === idx ? '2px solid var(--tok-primary, #B7791F)' : '1px solid var(--charcoal)', padding: '12px', background: 'var(--bg-alt)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Block {idx + 1}: {block.type}</strong>
                          {['products', 'services', 'testimonials'].includes(block.type) ? (
                            <span style={{ fontSize: '10px', background: 'rgba(183,121,31,0.15)', color: 'var(--tok-primary, #B7791F)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>⚡ Dynamic DB Block</span>
                          ) : (
                            <span style={{ fontSize: '10px', background: '#eee', color: '#666', padding: '2px 6px', borderRadius: '4px' }}>📝 Editable Copy</span>
                          )}
                          {block.customCode && (
                            <span style={{ fontSize: '10px', background: 'rgba(30,30,30,0.85)', color: '#d4d4d4', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '3px' }}><Code2 size={10} /> Custom Code Active</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button type="button" className="btn btn--secondary" onClick={() => handleMoveBlock(idx, 'up')} disabled={idx === 0} style={{ padding: '4px' }}><ArrowUp size={12} /></button>
                          <button type="button" className="btn btn--secondary" onClick={() => handleMoveBlock(idx, 'down')} disabled={idx === blocks.length - 1} style={{ padding: '4px' }}><ArrowDown size={12} /></button>
                          <button type="button" className="btn btn--secondary" onClick={() => selectBlock(idx)} style={{ padding: '4px 8px', fontSize: '10px' }}>Edit</button>
                          <button type="button" className="btn btn--secondary" onClick={() => handleRemoveBlock(idx)} style={{ padding: '4px', color: 'var(--signal)' }}><Trash size={12} /></button>
                        </div>
                      </div>

                      {selectedBlockIndex === idx && (
                        <div style={{ background: 'var(--bg)', padding: '14px', border: 'var(--border-hairline)', marginTop: '8px' }}>
                          <div style={{ display: 'flex', gap: '2px', marginBottom: '12px', borderBottom: '1px solid var(--charcoal)' }}>
                            <button
                              type="button"
                              onClick={() => setBlockTab('content')}
                              style={{
                                padding: '6px 14px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em',
                                border: 'none',
                                cursor: 'pointer',
                                background: blockTab === 'content' ? 'var(--charcoal)' : 'transparent',
                                color: blockTab === 'content' ? '#fff' : 'inherit',
                              }}
                            >
                              Content
                            </button>
                            <button
                              type="button"
                              onClick={() => setBlockTab('code')}
                              style={{
                                padding: '6px 14px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: blockTab === 'code' ? 'var(--charcoal)' : 'transparent',
                                color: blockTab === 'code' ? '#fff' : 'inherit',
                              }}
                            >
                              <Code2 size={12} /> Code
                            </button>
                          </div>

                          {blockTab === 'code' ? (
                            <div>
                              <p style={{ fontSize: '11px', color: 'var(--text-soft, #6b6b6b)', marginBottom: '8px', lineHeight: 1.5 }}>
                                Raw HTML/CSS override for this block. When filled in, this replaces the
                                structured Content fields above on both this preview and the live site.
                                Supports the same <code>{'{tokens}'}</code> as Connected Data. Leave empty to
                                use the normal component.
                              </p>
                              <div className="code-wrap" style={{ position: 'relative' }}>
                                <textarea
                                  spellCheck={false}
                                  value={block.customCode || ''}
                                  onChange={e => handleBlockCodeChange(idx, e.target.value)}
                                  placeholder={`<section>\n  <h2>Custom markup for this block</h2>\n</section>`}
                                  style={{
                                    width: '100%',
                                    height: '220px',
                                    fontFamily: 'var(--font-details, monospace)',
                                    fontSize: '11.5px',
                                    background: '#1e1e1e',
                                    color: '#d4d4d4',
                                    border: '1px solid var(--charcoal)',
                                    padding: '12px',
                                    lineHeight: 1.6,
                                    resize: 'vertical',
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                          <>
                          {block.type === 'hero' && (
                            <>
                              <ConnectedInputField label="Headline" value={block.data.title} onChange={v => handleBlockDataChange(idx, 'title', v)} />
                              <ConnectedInputField label="Subheading" value={block.data.subtitle} onChange={v => handleBlockDataChange(idx, 'subtitle', v)} />
                              <ConnectedInputField label="CTA Button Text" value={block.data.ctaText} onChange={v => handleBlockDataChange(idx, 'ctaText', v)} />
                              <ConnectedInputField label="CTA Button Link" value={block.data.ctaLink} onChange={v => handleBlockDataChange(idx, 'ctaLink', v)} />
                            </>
                          )}
                          {block.type === 'richtext' && (
                            <ConnectedInputField label="HTML / Text Content" isTextarea value={block.data.content} onChange={v => handleBlockDataChange(idx, 'content', v)} />
                          )}
                          {block.type === 'services' && (
                            <ConnectedInputField label="Section Title" value={block.data.title} onChange={v => handleBlockDataChange(idx, 'title', v)} />
                          )}
                          {block.type === 'testimonials' && (
                            <ConnectedInputField label="Section Title" value={block.data.title} onChange={v => handleBlockDataChange(idx, 'title', v)} />
                          )}
                          {block.type === 'products' && (
                            <ConnectedInputField label="Section Title" value={block.data.title} onChange={v => handleBlockDataChange(idx, 'title', v)} />
                          )}
                          {block.type === 'cta' && (
                            <>
                              <ConnectedInputField label="Headline" value={block.data.title} onChange={v => handleBlockDataChange(idx, 'title', v)} />
                              <ConnectedInputField label="Subheading" value={block.data.subtitle} onChange={v => handleBlockDataChange(idx, 'subtitle', v)} />
                              <ConnectedInputField label="Button Text" value={block.data.buttonText} onChange={v => handleBlockDataChange(idx, 'buttonText', v)} />
                              <ConnectedInputField label="Button Link" value={block.data.buttonLink} onChange={v => handleBlockDataChange(idx, 'buttonLink', v)} />
                            </>
                          )}
                          {block.type === 'contact' && (
                            <>
                              <ConnectedInputField label="Headline" value={block.data.title} onChange={v => handleBlockDataChange(idx, 'title', v)} />
                              <ConnectedInputField label="Subheading" value={block.data.subtitle} onChange={v => handleBlockDataChange(idx, 'subtitle', v)} />
                            </>
                          )}
                          </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="form-label font-bold text-xs uppercase">Status</label>
                <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="form-actions" style={{ marginTop: '20px' }}>
                <button type="submit" className="btn btn--primary">Save Page</button>
                <button type="button" className="btn btn--secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>

          {/* Right panel: visual preview with responsive viewport toggle */}
          <div className="pe-preview-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', border: 'var(--border-1)', background: '#fff' }}>
            <div className="pe-preview-toolbar" style={{ background: 'var(--bg-alt)', borderBottom: 'var(--border-1)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Live Dynamic Preview</span>
                <span className={`status status--${formData.status}`}>{formData.status}</span>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  className={`btn btn--secondary ${previewViewport === 'desktop' ? 'active' : ''}`}
                  onClick={() => setPreviewViewport('desktop')}
                  style={{ padding: '4px 10px', fontSize: '11px', minWidth: 'auto', background: previewViewport === 'desktop' ? 'var(--charcoal)' : 'transparent', color: previewViewport === 'desktop' ? '#fff' : 'inherit' }}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  className={`btn btn--secondary ${previewViewport === 'mobile' ? 'active' : ''}`}
                  onClick={() => setPreviewViewport('mobile')}
                  style={{ padding: '4px 10px', fontSize: '11px', minWidth: 'auto', background: previewViewport === 'mobile' ? 'var(--charcoal)' : 'transparent', color: previewViewport === 'mobile' ? '#fff' : 'inherit' }}
                >
                  Mobile (375px)
                </button>
              </div>
            </div>
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center', background: '#EAE7E0', padding: previewViewport === 'mobile' ? '20px 0' : '0', overflowY: 'auto', overflowX: 'hidden' }}>
              <iframe
                srcDoc={generatePreviewHtml()}
                style={{
                  width: previewViewport === 'mobile' ? '375px' : '100%',
                  maxWidth: '100%',
                  height: previewViewport === 'mobile' ? '667px' : '100%',
                  border: previewViewport === 'mobile' ? '2px solid var(--charcoal)' : 'none',
                  borderRadius: previewViewport === 'mobile' ? '12px' : '0',
                  background: bgColor,
                  boxShadow: previewViewport === 'mobile' ? '0 10px 25px rgba(0,0,0,0.15)' : 'none',
                  transition: 'width 0.2s ease, height 0.2s ease'
                }}
                title="Live Dynamic Preview"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
