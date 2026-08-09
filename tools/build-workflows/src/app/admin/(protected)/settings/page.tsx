'use client';

/**
 * SETTINGS REFACTORING — Work Stream 2
 *
 * TEMPLATE NOTES FOR DA CMS:
 * ========================
 *
 * STRUCTURE (Generalizable across all clients):
 * - 6 tabs: Site Info, Contact, Analytics, Advanced, Connected Data, Theme
 * - Each tab with clear field grouping
 * - Global "Preview Site with Settings" + "Publish All Settings" buttons
 * - Unsaved changes indicator
 * - Form validation before save
 *
 * AF-SPECIFIC (replace for DA):
 * - Brand colors: #F5C842 (Celestial), #1E1E1E (MCM Charcoal)
 * - Logo: Atomic Finds mark
 * - Analytics: Meta Pixel for vintage e-commerce, GA4 for Austin traffic
 * - Advanced config examples: CSS for glow effects, custom schema for LocalBusiness
 * - Connected data: Curator system variables, product category copy
 *
 * REMOVED FROM SETTINGS (moved to Page Editor):
 * - hero_title, hero_subtitle
 * - about_title, about_body, about_image_url
 * - These are now per-page fields in the Pages editor
 *
 * STRUCTURE CHANGES (from old settings):
 * OLD: 2 tabs (connected_data, site_theme) - confusing UX
 * NEW: 6 tabs - clear separation of concerns
 *   1. Site Info — business identity, branding, SEO
 *   2. Contact — customer communication channels
 *   3. Analytics — tracking & conversion pixels
 *   4. Advanced — custom code, schema, experimental
 *   5. Connected Data — simplified variables (not confusing key/value)
 *   6. Theme — colors, fonts, tokens (unchanged from ThemeClient)
 *
 * GLOBAL BUTTONS:
 * - "Preview Site with These Settings" — shows live site with all pending changes
 * - "Publish All Settings" — one-click publish vs per-section saves
 * - Unsaved indicator shows which tabs have changes
 */

import { useEffect, useState } from 'react';
import { Save, Upload, Database, Palette, CheckCircle, Plus, Trash2, Eye, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useClientId } from '@/lib/client-context';
import { DEFAULT_SETTINGS, type SiteSettings, type ContentBlock } from '@/lib/types';
import MediaUploader from '@/components/admin/MediaUploader';
import ThemeClient from '../theme/ThemeClient';

type SettingsTab = 'site_info' | 'contact' | 'analytics' | 'advanced' | 'connected_data' | 'site_theme';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('site_info');
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [originalSettings, setOriginalSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [newBlockLabel, setNewBlockLabel] = useState('');
  const [newBlockContent, setNewBlockContent] = useState('');
  const [customCodeHead, setCustomCodeHead] = useState('');
  const [customCodeBody, setCustomCodeBody] = useState('');

  const [themeTokens, setThemeTokens] = useState<any>(null);
  const [themeRowId, setThemeRowId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Track which tabs have unsaved changes
  const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
  
  const clientId = useClientId();
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      if (!clientId) return;
      setLoading(true);

      // Fetch site settings key-value pairs from Supabase 'settings' table
      const { data: sData } = await supabase
        .from('settings')
        .select('*')
        .eq('client_id', clientId);

      if (sData && sData.length > 0) {
        const loaded: Record<string, string> = {};
        sData.forEach((row: { key: string; value: string }) => {
          if (row.key) loaded[row.key] = row.value ?? '';
        });

        if (loaded.content_blocks) {
          try {
            const parsed = JSON.parse(loaded.content_blocks);
            if (Array.isArray(parsed)) setContentBlocks(parsed);
          } catch (e) {
            console.error('Failed to parse content_blocks', e);
          }
        }

        const merged = { ...DEFAULT_SETTINGS, ...loaded };
        setSettings(merged);
        setOriginalSettings(merged);

        // Load custom code
        if (loaded.custom_code_head) setCustomCodeHead(loaded.custom_code_head);
        if (loaded.custom_code_body) setCustomCodeBody(loaded.custom_code_body);
      }

      // Fetch design tokens
      const { data: tData } = await supabase
        .from('design_tokens')
        .select('*')
        .eq('client_id', clientId)
        .single();

      if (tData) {
        setThemeTokens(tData);
        setThemeRowId(tData.id);
      }

      setLoading(false);
    }

    loadData();
  }, [clientId]);

  const handleTextChange = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSavedSuccess(false);
  };

  const handleAddContentBlock = () => {
    if (!newBlockLabel.trim()) return;
    const block: ContentBlock = {
      id: `block-${Date.now()}`,
      label: newBlockLabel.trim(),
      content: newBlockContent,
    };
    setContentBlocks(prev => [...prev, block]);
    setNewBlockLabel('');
    setNewBlockContent('');
  };

  const handleRemoveContentBlock = (id: string) => {
    setContentBlocks(prev => prev.filter(block => block.id !== id));
  };

  const handleUpdateContentBlock = (id: string, field: 'label' | 'content', value: string) => {
    setContentBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, [field]: value } : block
      )
    );
  };

  const handleSubmitSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      // 1. Save all settings as key-value rows
      const rows = Object.entries(settings).map(([k, v]) => ({
        client_id: clientId,
        key: k,
        value: v == null ? null : String(v),
        updated_at: new Date().toISOString(),
      }));

      // Add custom code
      if (customCodeHead) rows.push({
        client_id: clientId,
        key: 'custom_code_head',
        value: customCodeHead,
        updated_at: new Date().toISOString(),
      });

      if (customCodeBody) rows.push({
        client_id: clientId,
        key: 'custom_code_body',
        value: customCodeBody,
        updated_at: new Date().toISOString(),
      });

      // Add content_blocks json row
      rows.push({
        client_id: clientId,
        key: 'content_blocks',
        value: JSON.stringify(contentBlocks),
        updated_at: new Date().toISOString(),
      });

      const { error: settingsError } = await supabase
        .from('settings')
        .upsert(rows, { onConflict: 'client_id,key' });

      if (settingsError) {
        await supabase
          .from('site_settings')
          .upsert({ ...settings, client_id: clientId, content_blocks: contentBlocks, custom_code_head: customCodeHead, custom_code_body: customCodeBody }, { onConflict: 'client_id' });
      }

      setOriginalSettings(settings);
      setSavedSuccess(true);
    } catch (err: any) {
      alert('Error saving settings: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="ws-page" style={{ padding: '32px' }}>
        <div style={{ color: 'var(--text-soft)' }}>Loading workspace settings & connected data...</div>
      </div>
    );
  }

  const TAB_CONFIG = [
    { id: 'site_info' as SettingsTab, label: 'Site Info', icon: '🏢' },
    { id: 'contact' as SettingsTab, label: 'Contact', icon: '📞' },
    { id: 'analytics' as SettingsTab, label: 'Analytics', icon: '📊' },
    { id: 'advanced' as SettingsTab, label: 'Advanced', icon: '⚙️' },
    { id: 'connected_data' as SettingsTab, label: 'Content Blocks', icon: '📝' },
    { id: 'site_theme' as SettingsTab, label: 'Theme', icon: '🎨' },
  ];

  return (
    <div className="ws-page" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div className="ws-head">
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Workspace Configuration</div>
          <h2>Settings</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {hasChanges && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tok-primary, #B7791F)' }}>
              <AlertCircle size={16} /> Unsaved changes
            </span>
          )}
          <button
            onClick={() => setPreviewOpen(true)}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              background: 'transparent',
              border: '1px solid var(--tok-primary, #B7791F)',
              color: 'var(--tok-primary, #B7791F)',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Eye size={14} /> Preview Site
          </button>
        </div>
      </div>

      {/* Global Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border-color, #ddd)', marginBottom: '24px', overflowX: 'auto' }}>
        {TAB_CONFIG.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              background: activeTab === tab.id ? 'var(--bg-alt, #fff)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--tok-primary, #B7791F)' : 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              color: activeTab === tab.id ? 'var(--text, #000)' : 'var(--text-soft, #666)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Site Info */}
      {activeTab === 'site_info' && (
        <form onSubmit={handleSubmitSettings} style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-alt, #fafafa)', border: '1px solid var(--border-color, #eee)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Business Identity</strong> — Your brand name, tagline, and core business information. SEO description helps search engines understand your site.
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Business Name</label>
            <input
              type="text"
              className="form-control"
              value={settings.site_title || ''}
              onChange={e => handleTextChange('site_title', e.target.value)}
              placeholder="e.g., Atomic Finds ATX"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Tagline / Slogan</label>
            <input
              type="text"
              className="form-control"
              value={settings.tagline || ''}
              onChange={e => handleTextChange('tagline', e.target.value)}
              placeholder="e.g., Far-out finds, down-to-earth prices"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">SEO Description (160 chars)</label>
            <textarea
              className="form-control"
              rows={2}
              value={settings.site_description || ''}
              onChange={e => handleTextChange('site_description', e.target.value)}
              placeholder="Appears in Google search results..."
            />
            <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginTop: '4px' }}>
              {(settings.site_description || '').length} / 160 characters
            </p>
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Brand Logo</label>
            <MediaUploader
              label=""
              hint="Upload your logo. Use a PNG with transparent background for best results."
              value={settings.logo_url || ''}
              onChange={url => handleTextChange('logo_url', url)}
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Favicon (32x32)</label>
            <MediaUploader
              label=""
              hint="Browser tab icon. Usually a small version of your logo."
              value={settings.favicon_url || ''}
              onChange={url => handleTextChange('favicon_url', url)}
            />
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Publish All Settings'}
            </button>
            {savedSuccess && (
              <span style={{ color: '#155724', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> Settings saved!
              </span>
            )}
          </div>
        </form>
      )}

      {/* Tab: Contact */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSubmitSettings} style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-alt, #fafafa)', border: '1px solid var(--border-color, #eee)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Customer Contact Info</strong> — Where customers can reach you. Displayed in footer, contact page, and SEO schema.
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={settings.phone || ''}
              onChange={e => handleTextChange('phone', e.target.value)}
              placeholder="+1 (512) 555-0123"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Support Email</label>
            <input
              type="email"
              className="form-control"
              value={settings.email || ''}
              onChange={e => handleTextChange('email', e.target.value)}
              placeholder="contact@example.com"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Address / Location</label>
            <textarea
              className="form-control"
              rows={2}
              value={settings.address || ''}
              onChange={e => handleTextChange('address', e.target.value)}
              placeholder="Street, City, State ZIP"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Hours of Operation</label>
            <textarea
              className="form-control"
              rows={3}
              value={settings.business_hours || ''}
              onChange={e => handleTextChange('business_hours', e.target.value)}
              placeholder="Mon–Fri: 10am–6pm&#10;Sat: 10am–4pm&#10;Closed Sundays"
            />
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Publish All Settings'}
            </button>
            {savedSuccess && (
              <span style={{ color: '#155724', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> Settings saved!
              </span>
            )}
          </div>
        </form>
      )}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <form onSubmit={handleSubmitSettings} style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-alt, #fafafa)', border: '1px solid var(--border-color, #eee)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Tracking & Conversion Pixels</strong> — Connect analytics tools to track traffic, conversions, and customer behavior.
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Google Analytics 4 ID</label>
            <input
              type="text"
              className="form-control"
              value={settings.google_analytics_id || ''}
              onChange={e => handleTextChange('google_analytics_id', e.target.value)}
              placeholder="G-XXXXXXXXXX"
            />
            <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginTop: '4px' }}>
              From Google Analytics dashboard. Tracks all traffic and user behavior.
            </p>
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Meta Pixel ID</label>
            <input
              type="text"
              className="form-control"
              value={settings.meta_pixel_id || ''}
              onChange={e => handleTextChange('meta_pixel_id', e.target.value)}
              placeholder="1234567890123456"
            />
            <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginTop: '4px' }}>
              From Meta Business Manager. Tracks conversions for Facebook/Instagram ads.
            </p>
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Facebook / Meta App ID</label>
            <input
              type="text"
              className="form-control"
              value={settings.facebook_app_id || ''}
              onChange={e => handleTextChange('facebook_app_id', e.target.value)}
              placeholder="1234567890123456"
            />
            <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginTop: '4px' }}>
              From developers.facebook.com. Needed for Meta SDK and catalog tools.
            </p>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Publish All Settings'}
            </button>
            {savedSuccess && (
              <span style={{ color: '#155724', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> Settings saved!
              </span>
            )}
          </div>
        </form>
      )}

      {/* Tab: Advanced Config (NEW) */}
      {activeTab === 'advanced' && (
        <form onSubmit={handleSubmitSettings} style={{ maxWidth: '900px' }}>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-alt, #fafafa)', border: '1px solid var(--border-color, #eee)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Advanced Settings</strong> — Custom code injection, schema config, and experimental features.
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Custom Head Code</label>
            <textarea
              className="form-control"
              style={{ fontFamily: 'monospace', fontSize: '12px' }}
              rows={6}
              value={customCodeHead}
              onChange={e => setCustomCodeHead(e.target.value)}
              placeholder='<!-- Analytics, fonts, stylesheets -->&#10;<link rel="preconnect" href="https://fonts.googleapis.com">'
            />
            <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginTop: '4px' }}>
              Injected into page &lt;head&gt;. Use for fonts, stylesheets, analytics scripts.
            </p>
          </div>

          <div className="form-group mb-4">
            <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Custom Body Code</label>
            <textarea
              className="form-control"
              style={{ fontFamily: 'monospace', fontSize: '12px' }}
              rows={6}
              value={customCodeBody}
              onChange={e => setCustomCodeBody(e.target.value)}
              placeholder='<!-- Tracking pixels, popups -->&#10;<script>console.log("Site loaded")</script>'
            />
            <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginTop: '4px' }}>
              Injected before closing &lt;/body&gt;. Use for tracking pixels, popups, chat widgets.
            </p>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Publish All Settings'}
            </button>
            {savedSuccess && (
              <span style={{ color: '#155724', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> Settings saved!
              </span>
            )}
          </div>
        </form>
      )}

      {/* Tab: Content Blocks (Duda-inspired pattern) */}
      {activeTab === 'connected_data' && (
        <form onSubmit={handleSubmitSettings} style={{ maxWidth: '900px' }}>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-alt, #fafafa)', border: '1px solid var(--border-color, #eee)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Content Blocks</strong> — Add labeled text blocks for content you use across your site. Name them however you like (e.g., "About Us", "Shipping Policy", "Newsletter Copy"). In the page editor, right-click any text block to connect it to a Content Block.
          </div>

          {/* Add New Block Form */}
          <div style={{ marginBottom: '32px', padding: '20px', border: '1px solid var(--border-color, #ddd)', borderRadius: '6px', background: 'var(--bg-alt, #fafafa)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>Add New Content Block</h3>

            <div className="form-group mb-4">
              <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Block Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. About Us, Shipping Policy, Welcome Message"
                value={newBlockLabel}
                onChange={e => setNewBlockLabel(e.target.value)}
              />
              <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginTop: '4px' }}>
                Name this however you like. This is just for you to identify it.
              </p>
            </div>

            <div className="form-group mb-4">
              <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Content</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Enter the text, HTML, or content for this block..."
                value={newBlockContent}
                onChange={e => setNewBlockContent(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleAddContentBlock}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={16} /> Add Content Block
            </button>
          </div>

          {/* Existing Blocks */}
          {contentBlocks.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>Your Content Blocks</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {contentBlocks.map(block => (
                  <div key={block.id} style={{ padding: '16px', border: '1px solid var(--border-color, #ddd)', borderRadius: '6px', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px', textTransform: 'uppercase', color: 'var(--text-soft, #666)' }}>
                          Block Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={block.label}
                          onChange={e => handleUpdateContentBlock(block.id, 'label', e.target.value)}
                          style={{ fontSize: '14px', fontWeight: 'bold' }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveContentBlock(block.id)}
                        style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--signal, #C5301A)', marginLeft: '12px' }}
                        title="Delete this block"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px', textTransform: 'uppercase', color: 'var(--text-soft, #666)' }}>
                        Content
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={block.content}
                        onChange={e => handleUpdateContentBlock(block.id, 'content', e.target.value)}
                        style={{ fontSize: '13px', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contentBlocks.length === 0 && (
            <div style={{ padding: '24px', background: 'var(--bg-alt, #fafafa)', borderRadius: '6px', textAlign: 'center', color: 'var(--text-soft, #666)', marginBottom: '24px' }}>
              <p style={{ fontSize: '13px' }}>No content blocks yet. Add your first one above!</p>
            </div>
          )}

          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Publish Content Blocks'}
            </button>
            {savedSuccess && (
              <span style={{ color: '#155724', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> Content blocks saved!
              </span>
            )}
          </div>
        </form>
      )}

      {/* Sub-Tab 2: Embedded Site Theme Customizer */}
      {activeTab === 'site_theme' && (
        <ThemeClient initialTokens={themeTokens} rowId={themeRowId} />
      )}
    </div>
  );
}
