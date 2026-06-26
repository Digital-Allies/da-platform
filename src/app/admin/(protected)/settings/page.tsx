'use client'

import { useEffect, useState } from 'react'
import { Save, Upload } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { DEFAULT_SETTINGS, type SiteSettings } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

const SWATCHES = ['#3A7BD5', '#C5301A', '#1F8A5B', '#7A5AE0', '#B7791F', '#0F766E']

const SETTING_GROUPS: Array<{
  title: string
  fields: Array<{
    key: keyof SiteSettings
    label: string
    type?: 'text' | 'textarea' | 'color' | 'url'
    hint?: string
    rows?: number
  }>
}> = [
  {
    title: 'Identity',
    fields: [
      { key: 'site_title', label: 'Business name' },
      { key: 'tagline', label: 'Tagline', type: 'textarea' },
      { key: 'site_description', label: 'Site description (SEO)', type: 'textarea', hint: '1–2 sentences for search results' },
      { key: 'brand_color', label: 'Brand color', type: 'color' },
      { key: 'logo_url', label: 'Logo URL', type: 'url', hint: 'Upload logo file directly or paste URL' },
      { key: 'favicon_url', label: 'Favicon URL', type: 'url', hint: 'Upload favicon file directly or paste URL' },
    ],
  },
  {
    title: 'The Lobby (hero)',
    fields: [
      { key: 'hero_title', label: 'Hero headline', type: 'textarea' },
      { key: 'hero_subtitle', label: 'Hero subheading', type: 'textarea' },
      { key: 'hero_cta_text', label: 'Hero button text' },
      { key: 'hero_cta_link', label: 'Hero button link' },
    ],
  },
  {
    title: 'About',
    fields: [
      { key: 'about_title', label: 'About title' },
      { key: 'about_body', label: 'About text', type: 'textarea', rows: 5 },
      { key: 'about_image_url', label: 'About image URL', type: 'url', hint: 'Upload photo directly or paste URL' },
    ],
  },
  {
    title: 'Contact',
    fields: [
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'address', label: 'Location line', type: 'textarea' },
      { key: 'business_hours', label: 'Business hours', type: 'textarea' },
    ],
  },
  {
    title: 'Social',
    fields: [
      { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
      { key: 'facebook_url', label: 'Facebook URL', type: 'url' },
      { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
      { key: 'twitter_url', label: 'Twitter/X URL', type: 'url' },
    ],
  },
]

export default function SettingsPage() {
  const [values, setValues] = useState<SiteSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('settings')
        .select('key, value')
        .eq('client_id', CLIENT_ID)

      if (data) {
        const map: Partial<SiteSettings> = {}
        data.forEach(({ key, value }) => {
          if (key in DEFAULT_SETTINGS && value !== null) {
            (map as Record<string, string>)[key] = value
          }
        })
        setValues({ ...DEFAULT_SETTINGS, ...map })
      }
      setLoading(false)
    }
    load()
  }, [])

  function update(key: keyof SiteSettings, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setDirty(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: keyof SiteSettings) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${key}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `settings/${fileName}`;

      const { data, error: uploadErr } = await supabase.storage
        .from('client-assets')
        .upload(filePath, file);

      if (uploadErr) {
        alert('Upload failed: ' + uploadErr.message);
      } else if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('client-assets')
          .getPublicUrl(filePath);

        update(key, publicUrl);
      }
    } catch (err: any) {
      alert('Upload exception: ' + err.message);
    }
  };

  async function save() {
    setSaving(true)
    setError('')
    setSaved(false)

    const upserts = Object.entries(values).map(([key, value]) => ({
      client_id: CLIENT_ID,
      key,
      value: String(value),
      updated_at: new Date().toISOString(),
    }))

    const { error: e } = await supabase
      .from('settings')
      .upsert(upserts, { onConflict: 'client_id,key' })

    if (e) {
      setError(e.message)
    } else {
      setSaved(true)
      setDirty(false)
      setTimeout(() => setSaved(false), 2500)
    }
    setSaving(false)
  }

  if (loading) return <div className="apage"><p className="empty">Loading…</p></div>

  return (
    <div className="apage apage--narrow">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">Site Settings</h1>
          <p className="apage__sub">The words and identity of the public site.</p>
        </div>
        <div className="apage__actions">
          {dirty && <span className="dirty-dot">● Unsaved</span>}
          {saved && <span style={{ fontFamily: 'var(--font-details)', fontSize: 11, color: '#1F8A5B' }}>Saved ✓</span>}
          <button className="abtn abtn--primary" onClick={save} disabled={saving || !dirty}>
            <Save size={13} /> {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ marginBottom: 16, fontSize: 12, color: 'var(--signal)', border: '1px solid var(--signal)', padding: '8px 12px' }}>
          {error}
        </p>
      )}

      {SETTING_GROUPS.map((group) => (
        <section className="settings-group" key={group.title}>
          <h2 className="asubhead">{group.title}</h2>
          <div className="settings-card">
            {group.fields.map(({ key, label, type = 'text', hint, rows }) => (
              <label key={key} className="afield">
                <span className="afield__label">
                  {label}
                  {hint && <em className="afield__hint">{hint}</em>}
                </span>
                {type === 'textarea' ? (
                  <textarea
                    rows={rows ?? 2}
                    className="ainput"
                    value={values[key]}
                    onChange={(e) => update(key, e.target.value)}
                  />
                ) : type === 'color' ? (
                  <div className="color-row">
                    <span className="color-chip" style={{ background: values[key] }} />
                    {SWATCHES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`swatch${values[key] === c ? ' is-on' : ''}`}
                        style={{ background: c }}
                        onClick={() => update(key, c)}
                      />
                    ))}
                    <input
                      type="text"
                      className="ainput mono color-hex"
                      value={values[key]}
                      onChange={(e) => update(key, e.target.value)}
                    />
                  </div>
                ) : type === 'url' ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="ainput"
                      value={values[key]}
                      onChange={(e) => update(key, e.target.value)}
                    />
                    {(key === 'logo_url' || key === 'favicon_url' || key === 'about_image_url') && (
                      <label className="abtn" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <Upload size={12}/> Upload
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileUpload(e, key)}
                        />
                      </label>
                    )}
                  </div>
                ) : (
                  <input
                    type={type}
                    className="ainput"
                    value={values[key]}
                    onChange={(e) => update(key, e.target.value)}
                  />
                )}
              </label>
            ))}
          </div>
        </section>
      ))}

      {/* Floating success feedback toast */}
      {saved && (
        <div className="toast">
          <span>✓ Settings saved successfully.</span>
        </div>
      )}
    </div>
  )
}
