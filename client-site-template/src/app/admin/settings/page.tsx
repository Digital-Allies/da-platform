'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { DEFAULT_SETTINGS, type SiteSettings } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

const FIELDS: Array<{
  key: keyof SiteSettings
  label: string
  type?: 'text' | 'textarea' | 'color' | 'url'
  hint?: string
}> = [
  { key: 'site_title', label: 'Business Name' },
  { key: 'tagline', label: 'Tagline', type: 'textarea' },
  { key: 'site_description', label: 'Site Description (SEO)', type: 'textarea', hint: '1–2 sentences for search results' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Contact Email' },
  { key: 'address', label: 'Address', type: 'textarea' },
  { key: 'business_hours', label: 'Business Hours', type: 'textarea' },
  { key: 'brand_color', label: 'Brand Color', type: 'color' },
  { key: 'logo_url', label: 'Logo URL', type: 'url', hint: 'Upload to Supabase Storage and paste the public URL' },
  { key: 'hero_title', label: 'Hero Headline' },
  { key: 'hero_subtitle', label: 'Hero Subheading', type: 'textarea' },
  { key: 'hero_cta_text', label: 'Hero Button Text' },
  { key: 'hero_cta_link', label: 'Hero Button Link' },
  { key: 'about_title', label: 'About Section Title' },
  { key: 'about_body', label: 'About Section Text', type: 'textarea' },
  { key: 'about_image_url', label: 'About Image URL', type: 'url' },
  { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
  { key: 'facebook_url', label: 'Facebook URL', type: 'url' },
  { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
]

export default function SettingsPage() {
  const [values, setValues] = useState<SiteSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('settings')
        .select('key, value')
        .eq('client_id', CLIENT_ID)

      if (data) {
        const map: Partial<SiteSettings> = {}
        data.forEach(({ key, value }) => {
          if (key in DEFAULT_SETTINGS && value) {
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
  }

  async function save() {
    setSaving(true)
    setError('')
    setSaved(false)
    const supabase = createClient()

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
      setTimeout(() => setSaved(false), 2500)
    }
    setSaving(false)
  }

  if (loading) return <p className="text-sm text-neutral-500">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline font-bold text-xl">Site Settings</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-green-600">Saved!</span>}
          <button onClick={save} disabled={saving} className="admin-btn-primary text-xs px-4 py-1.5">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-xs text-alert border border-alert px-3 py-2">{error}</p>}

      <div className="space-y-4">
        {FIELDS.map(({ key, label, type = 'text', hint }) => (
          <div key={key} className="admin-card">
            <label className="admin-label" htmlFor={key}>{label}</label>
            {hint && <p className="text-xs text-neutral-400 mb-1.5">{hint}</p>}
            {type === 'textarea' ? (
              <textarea
                id={key}
                rows={3}
                className="admin-input resize-none"
                value={values[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            ) : type === 'color' ? (
              <div className="flex items-center gap-3 mt-1">
                <input
                  id={key}
                  type="color"
                  className="h-9 w-16 cursor-pointer border border-neutral-300 rounded-sm"
                  value={values[key]}
                  onChange={(e) => update(key, e.target.value)}
                />
                <input
                  type="text"
                  className="admin-input w-32 font-mono text-xs"
                  value={values[key]}
                  onChange={(e) => update(key, e.target.value)}
                />
              </div>
            ) : (
              <input
                id={key}
                type={type}
                className="admin-input"
                value={values[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
