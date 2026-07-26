'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useClientId } from '@/lib/client-context';
import { useRouter } from 'next/navigation';
import { Palette, CheckCircle, RefreshCw } from 'lucide-react';

interface ThemeTokens {
  primary_color: string;
  accent_color: string;
  bg_color: string;
  surface_color: string;
  fg_body_color: string;
  font_header: string;
  font_body: string;
}

const DEFAULT_THEME: ThemeTokens = {
  primary_color: '#B7791F',
  accent_color: '#C5301A',
  bg_color: '#F9F6F0',
  surface_color: '#FFFFFF',
  fg_body_color: '#2D2D2D',
  font_header: 'Lexend Deca',
  font_body: 'JetBrains Mono',
};

export default function ThemeClient({
  initialTokens,
  rowId,
}: {
  initialTokens: any;
  rowId: string | null;
}) {
  const [tokens, setTokens] = useState<ThemeTokens>({
    primary_color: initialTokens?.primary_color || DEFAULT_THEME.primary_color,
    accent_color: initialTokens?.accent_color || DEFAULT_THEME.accent_color,
    bg_color: initialTokens?.bg_color || DEFAULT_THEME.bg_color,
    surface_color: initialTokens?.surface_color || DEFAULT_THEME.surface_color,
    fg_body_color: initialTokens?.fg_body_color || DEFAULT_THEME.fg_body_color,
    font_header: initialTokens?.font_header || DEFAULT_THEME.font_header,
    font_body: initialTokens?.font_body || DEFAULT_THEME.font_body,
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const clientId = useClientId();

  const handleColorChange = (key: keyof ThemeTokens, value: string) => {
    setTokens(prev => ({ ...prev, [key]: value }));
    setSavedSuccess(false);
  };

  const handleResetDefaults = () => {
    setTokens(DEFAULT_THEME);
    setSavedSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const payload = {
      client_id: clientId,
      colors: {
        bg: tokens.bg_color,
        surface: tokens.surface_color,
        text: tokens.fg_body_color,
        primary: tokens.primary_color,
        secondary: tokens.accent_color,
      },
      fonts: {
        heading: tokens.font_header,
        body: tokens.font_body,
      },
      updated_at: new Date().toISOString(),
    };

    if (rowId) {
      const { error } = await supabase
        .from('design_tokens')
        .update(payload)
        .eq('id', rowId);

      if (!error) {
        setSavedSuccess(true);
      } else {
        alert('Error updating brand tokens: ' + error.message);
      }
    } else {
      const { error } = await supabase
        .from('design_tokens')
        .insert([payload]);

      if (!error) {
        setSavedSuccess(true);
      } else {
        alert('Error creating brand tokens: ' + error.message);
      }
    }
    setSaving(false);
    router.refresh();
  };

  return (
    <section className="section active" id="theme-section">
      <div className="ws-head">
        <div>
          <div className="ws-head__eyebrow da-eyebrow da-eyebrow--muted">Brand & Styling</div>
          <h2>Brand Theme Customizer</h2>
        </div>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={handleResetDefaults}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} /> Reset Defaults
        </button>
      </div>

      <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-alt)', border: 'var(--border-1)', fontSize: '13px', lineHeight: 1.6 }}>
        <strong>Brand Theme Engine</strong> — Customize brand color tokens and typography for your site. Changes are injected into CSS variables (<code>--tok-*</code>) across all public pages.
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Controls */}
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={16} /> Color Tokens
            </h3>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Primary Brand Color</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={tokens.primary_color}
                  onChange={e => handleColorChange('primary_color', e.target.value)}
                  style={{ width: '40px', height: '40px', border: '1px solid #ccc', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={tokens.primary_color}
                  onChange={e => handleColorChange('primary_color', e.target.value)}
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Accent / Signal Color</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={tokens.accent_color}
                  onChange={e => handleColorChange('accent_color', e.target.value)}
                  style={{ width: '40px', height: '40px', border: '1px solid #ccc', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={tokens.accent_color}
                  onChange={e => handleColorChange('accent_color', e.target.value)}
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Background Color</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={tokens.bg_color}
                  onChange={e => handleColorChange('bg_color', e.target.value)}
                  style={{ width: '40px', height: '40px', border: '1px solid #ccc', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={tokens.bg_color}
                  onChange={e => handleColorChange('bg_color', e.target.value)}
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Body Text Color</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={tokens.fg_body_color}
                  onChange={e => handleColorChange('fg_body_color', e.target.value)}
                  style={{ width: '40px', height: '40px', border: '1px solid #ccc', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={tokens.fg_body_color}
                  onChange={e => handleColorChange('fg_body_color', e.target.value)}
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>

            <h3 style={{ fontSize: '15px', marginTop: '24px', marginBottom: '16px' }}>Typography Presets</h3>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Heading Font Family</label>
              <input
                type="text"
                className="form-control"
                value={tokens.font_header}
                onChange={e => handleColorChange('font_header', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Body Font Family</label>
              <input
                type="text"
                className="form-control"
                value={tokens.font_body}
                onChange={e => handleColorChange('font_body', e.target.value)}
              />
            </div>
          </div>

          {/* Live Preview Card */}
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>Live Brand Token Swatches</h3>
            <div
              style={{
                background: tokens.bg_color,
                color: tokens.fg_body_color,
                padding: '24px',
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            >
              <h4 style={{ fontFamily: tokens.font_header, fontSize: '22px', margin: '0 0 10px 0', color: tokens.primary_color }}>
                Brand Header Sample
              </h4>
              <p style={{ fontFamily: tokens.font_body, fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                This card demonstrates how your selected background color, primary color, body font, and action buttons render together.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  style={{
                    background: tokens.primary_color,
                    color: '#FFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontFamily: tokens.font_body,
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  Primary Action
                </button>
                <button
                  type="button"
                  style={{
                    background: tokens.accent_color,
                    color: '#FFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontFamily: tokens.font_body,
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  Accent Badge
                </button>
              </div>
            </div>

            {savedSuccess && (
              <div style={{ padding: '12px', background: '#D4EDDA', color: '#155724', border: '1px solid #C3E6CB', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <CheckCircle size={16} /> Brand tokens updated successfully!
              </div>
            )}
          </div>
        </div>

        <div className="form-actions" style={{ marginTop: '24px' }}>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Theme Tokens'}
          </button>
        </div>
      </form>
    </section>
  );
}
