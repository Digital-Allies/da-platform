'use client';

import { useEffect, useState } from 'react';
import { Save, Upload, Database, Palette, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useClientId } from '@/lib/client-context';
import { DEFAULT_SETTINGS, type SiteSettings } from '@/lib/types';
import MediaUploader from '@/components/admin/MediaUploader';
import ThemeClient from '../theme/ThemeClient';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'connected_data' | 'site_theme'>('connected_data');
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [customDataKeys, setCustomDataKeys] = useState<Array<{ key: string; value: string }>>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  
  const [themeTokens, setThemeTokens] = useState<any>(null);
  const [themeRowId, setThemeRowId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  
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

        if (loaded.custom_data) {
          try {
            const parsed = JSON.parse(loaded.custom_data);
            if (Array.isArray(parsed)) setCustomDataKeys(parsed);
          } catch (e) {
            console.error('Failed to parse custom_data', e);
          }
        }

        setSettings({ ...DEFAULT_SETTINGS, ...loaded });
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

  const handleAddCustomDataKey = () => {
    if (!newKeyName.trim()) return;
    const cleanKey = newKeyName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    setCustomDataKeys(prev => [...prev, { key: cleanKey, value: newKeyValue }]);
    setNewKeyName('');
    setNewKeyValue('');
  };

  const handleRemoveCustomDataKey = (index: number) => {
    setCustomDataKeys(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      // 1. Save settings as key-value rows in 'settings' table
      const rows = Object.entries(settings).map(([k, v]) => ({
        client_id: clientId,
        key: k,
        value: v == null ? null : String(v),
        updated_at: new Date().toISOString(),
      }));

      // Add custom_data json row
      rows.push({
        client_id: clientId,
        key: 'custom_data',
        value: JSON.stringify(customDataKeys),
        updated_at: new Date().toISOString(),
      });

      const { error: settingsError } = await supabase
        .from('settings')
        .upsert(rows, { onConflict: 'client_id,key' });

      if (settingsError) {
        // Fallback: try site_settings table if project uses single row
        await supabase
          .from('site_settings')
          .upsert({ ...settings, client_id: clientId, custom_data: customDataKeys }, { onConflict: 'client_id' });
      }

      setSavedSuccess(true);
    } catch (err: any) {
      alert('Error saving connected data settings: ' + (err.message || 'Unknown error'));
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

  return (
    <div className="ws-page" style={{ padding: '32px' }}>
      <div className="ws-head" style={{ marginBottom: '24px' }}>
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Workspace & Client Data</div>
          <h2>Settings & Connected Data</h2>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color, #ccc)', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('connected_data')}
          style={{
            padding: '12px 20px',
            background: activeTab === 'connected_data' ? 'var(--bg-alt, #fff)' : 'transparent',
            border: activeTab === 'connected_data' ? '1px solid var(--border-color, #ccc)' : 'none',
            borderBottom: activeTab === 'connected_data' ? '2px solid var(--tok-primary, #B7791F)' : 'none',
            fontWeight: activeTab === 'connected_data' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Database size={16} /> Connected Data
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('site_theme')}
          style={{
            padding: '12px 20px',
            background: activeTab === 'site_theme' ? 'var(--bg-alt, #fff)' : 'transparent',
            border: activeTab === 'site_theme' ? '1px solid var(--border-color, #ccc)' : 'none',
            borderBottom: activeTab === 'site_theme' ? '2px solid var(--tok-primary, #B7791F)' : 'none',
            fontWeight: activeTab === 'site_theme' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Palette size={16} /> Site Theme
        </button>
      </div>

      {/* Sub-Tab 1: Connected Data */}
      {activeTab === 'connected_data' && (
        <form onSubmit={handleSubmitSettings}>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-alt, #fafafa)', border: '1px solid var(--border-color, #eee)', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Connected Data Engine</strong> — All business copy, contact details, media assets, and custom copy variables defined here are synced directly across your page builder blocks and collections.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Left Column: Business & Media */}
            <div style={{ background: 'var(--bg, #fff)', border: '1px solid var(--border-color, #ddd)', padding: '24px', borderRadius: '6px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px' }}>Business Identity & Brand Media</h3>
              
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Business Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.site_title || ''}
                  onChange={e => handleTextChange('site_title', e.target.value)}
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Tagline</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={settings.tagline || ''}
                  onChange={e => handleTextChange('tagline', e.target.value)}
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">SEO Description</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={settings.site_description || ''}
                  onChange={e => handleTextChange('site_description', e.target.value)}
                />
              </div>

              <MediaUploader
                label="Brand Logo Asset"
                hint="Upload brand logo file directly to client storage bucket"
                value={settings.logo_url || ''}
                onChange={url => handleTextChange('logo_url', url)}
              />

              <MediaUploader
                label="Favicon Asset"
                hint="Upload 32x32 website icon file directly to storage"
                value={settings.favicon_url || ''}
                onChange={url => handleTextChange('favicon_url', url)}
              />

              <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '24px', marginBottom: '16px' }}>Hero & About Copy</h3>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Hero Headline</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.hero_title || ''}
                  onChange={e => handleTextChange('hero_title', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Hero Subtitle</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={settings.hero_subtitle || ''}
                  onChange={e => handleTextChange('hero_subtitle', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">About Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.about_title || ''}
                  onChange={e => handleTextChange('about_title', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">About Body Copy</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={settings.about_body || ''}
                  onChange={e => handleTextChange('about_body', e.target.value)}
                />
              </div>
              <MediaUploader
                label="About Featured Photo"
                hint="Upload brand or store photo for about section"
                value={settings.about_image_url || ''}
                onChange={url => handleTextChange('about_image_url', url)}
              />
            </div>

            {/* Right Column: Contact, Policies & Custom Variables */}
            <div style={{ background: 'var(--bg, #fff)', border: '1px solid var(--border-color, #ddd)', padding: '24px', borderRadius: '6px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px' }}>Contact Info & Location</h3>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.phone || ''}
                  onChange={e => handleTextChange('phone', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Support Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.email || ''}
                  onChange={e => handleTextChange('email', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Location / Address</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={settings.address || ''}
                  onChange={e => handleTextChange('address', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Business Hours</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={settings.business_hours || ''}
                  onChange={e => handleTextChange('business_hours', e.target.value)}
                />
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '24px', marginBottom: '16px' }}>Store Policies & Analytics</h3>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Announcement Banner Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.announcement_banner || ''}
                  onChange={e => handleTextChange('announcement_banner', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Shipping Policy & Delivery Terms</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={settings.shipping_policy || ''}
                  onChange={e => handleTextChange('shipping_policy', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Return & Exchange Policy</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={settings.return_policy || ''}
                  onChange={e => handleTextChange('return_policy', e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className="form-label font-bold text-xs uppercase tracking-wider mb-1 block">Google Analytics ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="G-XXXXXXXXXX"
                  value={settings.google_analytics_id || ''}
                  onChange={e => handleTextChange('google_analytics_id', e.target.value)}
                />
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '24px', marginBottom: '16px' }}>Custom Connected Copy Dictionary</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-soft, #666)', marginBottom: '12px' }}>
                Add custom copy variables (e.g. <code>free_shipping_threshold</code>) usable across any page builder block or layout.
              </p>

              {customDataKeys.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold', width: '120px' }}>
                    {item.key}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={item.value}
                    onChange={e => {
                      const updated = [...customDataKeys];
                      updated[idx].value = e.target.value;
                      setCustomDataKeys(updated);
                    }}
                    style={{ fontSize: '12px', flex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => handleRemoveCustomDataKey(idx)}
                    style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--signal, #C5301A)' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="variable_name (e.g. promo_code)"
                  value={newKeyName}
                  onChange={e => setNewKeyName(e.target.value)}
                  style={{ fontSize: '12px' }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Value string"
                  value={newKeyValue}
                  onChange={e => setNewKeyValue(e.target.value)}
                  style={{ fontSize: '12px' }}
                />
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleAddCustomDataKey}
                  style={{ fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  <Plus size={12} /> Add Copy
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving Data...' : 'Save Connected Data'}
            </button>
            {savedSuccess && (
              <span style={{ color: '#155724', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> Connected data saved & synced!
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
