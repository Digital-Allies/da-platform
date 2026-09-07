'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useClientId } from '@/lib/client-context';
import { useRouter } from 'next/navigation';
import { Palette, CheckCircle, RefreshCw } from 'lucide-react';
import { DEFAULT_TYPE_SCALE, DEFAULT_SPACING } from '@/lib/theme';

interface CustomToken {
  name: string;
  value: string;
}

interface ThemeTokens {
  primary_color: string;
  accent_color: string;
  bg_color: string;
  surface_color: string;
  fg_body_color: string;
  font_header: string;
  font_body: string;
  button_radius: string;
  button_glow: string;
  card_glow: string;
  section_spacing: string;
  logo: string;
  favicon: string;
  custom_tokens: CustomToken[];
}

const DEFAULT_THEME: ThemeTokens = {
  primary_color: '#B7791F',
  accent_color: '#C5301A',
  bg_color: '#F9F6F0',
  surface_color: '#FFFFFF',
  fg_body_color: '#2D2D2D',
  font_header: 'Lexend Deca',
  font_body: 'JetBrains Mono',
  button_radius: '6px',
  button_glow: '0 4px 14px rgba(183,121,31,0.3)',
  card_glow: '0 10px 30px rgba(0,0,0,0.06)',
  section_spacing: '80px',
  logo: '',
  favicon: '',
  custom_tokens: [],
};

export default function ThemeClient({
  initialTokens,
  rowId,
}: {
  initialTokens: any;
  rowId: string | null;
}) {
  const [tokens, setTokens] = useState<ThemeTokens>({
    primary_color: initialTokens?.primary_color || initialTokens?.colors?.primary || DEFAULT_THEME.primary_color,
    accent_color: initialTokens?.accent_color || initialTokens?.colors?.secondary || DEFAULT_THEME.accent_color,
    bg_color: initialTokens?.bg_color || initialTokens?.colors?.bg || DEFAULT_THEME.bg_color,
    surface_color: initialTokens?.surface_color || initialTokens?.colors?.surface || DEFAULT_THEME.surface_color,
    fg_body_color: initialTokens?.fg_body_color || initialTokens?.colors?.text || DEFAULT_THEME.fg_body_color,
    font_header: initialTokens?.font_header || initialTokens?.fonts?.heading || DEFAULT_THEME.font_header,
    font_body: initialTokens?.font_body || initialTokens?.fonts?.body || DEFAULT_THEME.font_body,
    button_radius: initialTokens?.ui_extra?.button_radius || DEFAULT_THEME.button_radius,
    button_glow: initialTokens?.ui_extra?.button_glow || DEFAULT_THEME.button_glow,
    card_glow: initialTokens?.ui_extra?.card_glow || DEFAULT_THEME.card_glow,
    section_spacing: initialTokens?.ui_extra?.section_spacing || DEFAULT_THEME.section_spacing,
    logo: initialTokens?.logo || DEFAULT_THEME.logo,
    favicon: initialTokens?.favicon || DEFAULT_THEME.favicon,
    custom_tokens: initialTokens?.ui_extra?.custom_tokens || [],
  });

  // type_scale/spacing already hold real seeded data (see
  // seed-atomic-finds-design-tokens.sql) that this editor doesn't expose
  // controls for yet — round-trip them unmodified on save so a Theme save
  // here never wipes them out.
  const passthroughTypeScale = initialTokens?.type_scale ?? undefined;
  const passthroughSpacing = initialTokens?.spacing ?? undefined;

  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenValue, setNewTokenValue] = useState('#000000');

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const clientId = useClientId();

  const handleFieldChange = (key: keyof ThemeTokens, value: any) => {
    setTokens(prev => ({ ...prev, [key]: value }));
    setSavedSuccess(false);
  };

  const handleAddCustomToken = () => {
    if (!newTokenName.trim()) return;
    const cleanKey = newTokenName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    setTokens(prev => ({
      ...prev,
      custom_tokens: [...prev.custom_tokens, { name: cleanKey, value: newTokenValue }]
    }));
    setNewTokenName('');
    setNewTokenValue('#000000');
  };

  const handleRemoveCustomToken = (index: number) => {
    setTokens(prev => ({
      ...prev,
      custom_tokens: prev.custom_tokens.filter((_, i) => i !== index)
    }));
  };

  const handleResetDefaults = () => {
    setTokens(DEFAULT_THEME);
    setSavedSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    // design_tokens only has colors/fonts/type_scale/spacing/logo/favicon/
    // ui_extra columns (see supabase/migrations/20260101000002_cms_tables.sql
    // + 20260727000000_design_tokens_ui_extra.sql, run 2026-07-29) — there
    // are no flat primary_color/button_radius/etc columns, so sending those
    // directly made every save fail with a "column does not exist" error.
    // `spacing` and `type_scale` aren't spare capacity either — they already
    // hold real per-client data (see seed-atomic-finds-design-tokens.sql: a
    // numeric spacing scale and a type scale), so stuffing button/glow
    // tokens in there would silently overwrite that on the next save. The
    // dedicated `ui_extra` jsonb column holds them instead.
    const payload: Record<string, any> = {
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
      // `logo` has no editable field on this page (edit it on Settings,
      // which is the actual consumer for logos today — see the "known gap"
      // note below) — round-tripped as-is so a Theme save can't null out an
      // already-seeded design_tokens.logo value (e.g. Atomic Finds').
      logo: tokens.logo || null,
      favicon: tokens.favicon || null,
      ui_extra: {
        button_radius: tokens.button_radius,
        button_glow: tokens.button_glow,
        card_glow: tokens.card_glow,
        section_spacing: tokens.section_spacing,
        custom_tokens: tokens.custom_tokens,
      },
      updated_at: new Date().toISOString(),
    };

    // Only set on INSERT of a brand-new row (an UPDATE never touches columns
    // it doesn't include, so existing type_scale/spacing survive either way) —
    // this seeds sane values instead of leaving them null for a client that
    // has never had a design_tokens row before. passthroughTypeScale/Spacing
    // can't actually be defined here (they're read off a tokenRow, and a
    // tokenRow with type_scale data also has an id), so this always falls
    // through to the shared default scale — same one getLiveDesignTokens()
    // uses before a row exists.
    if (!rowId) {
      payload.type_scale = passthroughTypeScale ?? DEFAULT_TYPE_SCALE;
      payload.spacing = passthroughSpacing ?? DEFAULT_SPACING;
    }

    if (rowId) {
      const { error } = await supabase
        .from('design_tokens')
        .update(payload)
        .eq('id', rowId);

      if (!error) setSavedSuccess(true);
      else alert('Error updating brand tokens: ' + error.message);
    } else {
      const { error } = await supabase
        .from('design_tokens')
        .insert([payload]);

      if (!error) setSavedSuccess(true);
      else alert('Error creating brand tokens: ' + error.message);
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
        <strong>Site Theme Customizer</strong> — Edit colors, fonts, buttons, glow, and layout spacing tokens. Changes instantly sync across all site blocks and components.
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Controls Column */}
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={16} /> Palette & Color Tokens
            </h3>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Primary Brand Color</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={tokens.primary_color}
                  onChange={e => handleFieldChange('primary_color', e.target.value)}
                  style={{ width: '40px', height: '40px', border: '1px solid #ccc', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={tokens.primary_color}
                  onChange={e => handleFieldChange('primary_color', e.target.value)}
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
                  onChange={e => handleFieldChange('accent_color', e.target.value)}
                  style={{ width: '40px', height: '40px', border: '1px solid #ccc', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={tokens.accent_color}
                  onChange={e => handleFieldChange('accent_color', e.target.value)}
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
                  onChange={e => handleFieldChange('bg_color', e.target.value)}
                  style={{ width: '40px', height: '40px', border: '1px solid #ccc', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={tokens.bg_color}
                  onChange={e => handleFieldChange('bg_color', e.target.value)}
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
                  onChange={e => handleFieldChange('fg_body_color', e.target.value)}
                  style={{ width: '40px', height: '40px', border: '1px solid #ccc', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={tokens.fg_body_color}
                  onChange={e => handleFieldChange('fg_body_color', e.target.value)}
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
                onChange={e => handleFieldChange('font_header', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Body Font Family</label>
              <input
                type="text"
                className="form-control"
                value={tokens.font_body}
                onChange={e => handleFieldChange('font_body', e.target.value)}
              />
            </div>

            <h3 style={{ fontSize: '15px', marginTop: '24px', marginBottom: '16px' }}>Favicon</h3>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Favicon URL</label>
              <input
                type="text"
                className="form-control"
                placeholder="/path/to/favicon.ico"
                value={tokens.favicon}
                onChange={e => handleFieldChange('favicon', e.target.value)}
              />
            </div>

            <h3 style={{ fontSize: '15px', marginTop: '24px', marginBottom: '16px' }}>Buttons, Spacing & Glow</h3>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Button Corner Radius</label>
              <select
                className="form-control"
                value={tokens.button_radius}
                onChange={e => handleFieldChange('button_radius', e.target.value)}
              >
                <option value="0px">Sharp Corners (0px)</option>
                <option value="4px">Slight Rounded (4px)</option>
                <option value="8px">Medium Rounded (8px)</option>
                <option value="16px">Extra Rounded (16px)</option>
                <option value="9999px">Pill / Oval (Full)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Button Glow / Box Shadow</label>
              <select
                className="form-control"
                value={tokens.button_glow}
                onChange={e => handleFieldChange('button_glow', e.target.value)}
              >
                <option value="none">Flat / No Glow</option>
                <option value="0 4px 14px rgba(183,121,31,0.3)">Subtle Glow Accent</option>
                <option value="0 0 20px rgba(183,121,31,0.6)">Neon Intense Glow</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Card Shadow & Elevation</label>
              <select
                className="form-control"
                value={tokens.card_glow}
                onChange={e => handleFieldChange('card_glow', e.target.value)}
              >
                <option value="none">Flat Border Only</option>
                <option value="0 10px 30px rgba(0,0,0,0.06)">Soft Elevated Drop Shadow</option>
                <option value="0 20px 40px rgba(0,0,0,0.12)">Deep Elevated Shadow</option>
              </select>
            </div>

            <h3 style={{ fontSize: '15px', marginTop: '24px', marginBottom: '16px' }}>Custom Brand Tokens</h3>
            <div style={{ marginBottom: '16px' }}>
              {tokens.custom_tokens.map((ct, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold', width: '120px' }}>
                    --{ct.name}
                  </span>
                  <input
                    type="color"
                    value={ct.value}
                    onChange={e => {
                      const updated = [...tokens.custom_tokens];
                      updated[idx].value = e.target.value;
                      handleFieldChange('custom_tokens', updated);
                    }}
                    style={{ width: '32px', height: '32px', padding: 0, border: '1px solid #ccc', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={ct.value}
                    onChange={e => {
                      const updated = [...tokens.custom_tokens];
                      updated[idx].value = e.target.value;
                      handleFieldChange('custom_tokens', updated);
                    }}
                    style={{ fontSize: '12px', fontFamily: 'monospace', flex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => handleRemoveCustomToken(idx)}
                    style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--signal, #C5301A)' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="token_name (e.g. gold)"
                value={newTokenName}
                onChange={e => setNewTokenName(e.target.value)}
                style={{ fontSize: '12px' }}
              />
              <input
                type="color"
                value={newTokenValue}
                onChange={e => setNewTokenValue(e.target.value)}
                style={{ width: '36px', height: '36px', padding: 0, border: '1px solid #ccc', cursor: 'pointer' }}
              />
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleAddCustomToken}
                style={{ whiteSpace: 'nowrap', fontSize: '12px' }}
              >
                + Add Token
              </button>
            </div>
          </div>

          {/* Live Preview Column */}
          <div style={{ background: 'var(--bg)', border: 'var(--border-1)', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>Live UI Preview</h3>
            <div
              style={{
                background: tokens.bg_color,
                color: tokens.fg_body_color,
                padding: '24px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px',
                boxShadow: tokens.card_glow,
                marginBottom: '20px',
              }}
            >
              <h4 style={{ fontFamily: tokens.font_header, fontSize: '22px', margin: '0 0 10px 0', color: tokens.primary_color }}>
                Sample Hero & Component Preview
              </h4>
              <p style={{ fontFamily: tokens.font_body, fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                This live card demonstrates how your background color, primary brand color, heading/body typography, corner radiuses, and button shadows render together.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  style={{
                    background: tokens.primary_color,
                    color: '#FFF',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: tokens.button_radius,
                    boxShadow: tokens.button_glow,
                    fontFamily: tokens.font_body,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Primary Action Button
                </button>
                <button
                  type="button"
                  style={{
                    background: tokens.accent_color,
                    color: '#FFF',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: tokens.button_radius,
                    fontFamily: tokens.font_body,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Accent Badge
                </button>
              </div>
            </div>

            {savedSuccess && (
              <div style={{ padding: '12px', background: '#D4EDDA', color: '#155724', border: '1px solid #C3E6CB', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <CheckCircle size={16} /> Brand theme & UI tokens saved successfully!
              </div>
            )}
          </div>
        </div>

        <div className="form-actions" style={{ marginTop: '24px' }}>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Saving Theme...' : 'Save Theme Tokens'}
          </button>
        </div>
      </form>
    </section>
  );
}
