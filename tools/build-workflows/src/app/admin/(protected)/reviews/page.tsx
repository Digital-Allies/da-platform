'use client'

// Customer Reviews — full CRUD, Services-module pattern. Reusable across
// clients: `source` is a free-text field (facebook/google/yelp/instagram/
// other...), not locked to Facebook, so any client can point it at wherever
// their reviews actually come from.

import { useEffect, useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Pencil, Trash2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { type Review } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

type Editing = null | 'new' | Review

const SOURCE_SUGGESTIONS = ['facebook', 'google', 'yelp', 'instagram', 'other']

interface ReviewForm {
  reviewer_name: string
  review_date: string
  rating_type: 'written' | 'rating_only'
  text: string
  seller_response: string
  source: string
  notable_tags: string
  featured_on_homepage: boolean
}

const EMPTY_FORM: ReviewForm = {
  reviewer_name: '', review_date: '', rating_type: 'written', text: '',
  seller_response: '', source: 'facebook', notable_tags: '', featured_on_homepage: false,
}

function reviewToForm(r: Review): ReviewForm {
  return {
    reviewer_name: r.reviewer_name,
    review_date: r.review_date ?? '',
    rating_type: r.rating_type,
    text: r.text ?? '',
    seller_response: r.seller_response ?? '',
    source: r.source,
    notable_tags: r.notable_tags.join(', '),
    featured_on_homepage: r.featured_on_homepage,
  }
}

function formToRow(form: ReviewForm) {
  return {
    reviewer_name: form.reviewer_name.trim(),
    review_date: form.review_date || null,
    rating_type: form.rating_type,
    text: form.text.trim() || null,
    seller_response: form.seller_response.trim() || null,
    source: form.source.trim() || 'other',
    notable_tags: form.notable_tags.split(',').map((t) => t.trim()).filter(Boolean),
    featured_on_homepage: form.featured_on_homepage,
  }
}

export default function ReviewsAdminPage() {
  const [items, setItems] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Editing>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const supabase = createClient()
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('client_id', CLIENT_ID)
      .order('sort_order')
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function move(id: string, dir: -1 | 1) {
    const idx = items.findIndex((r) => r.id === id)
    if (idx < 0) return
    const next = [...items]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setItems(next)
    const supabase = createClient()
    await Promise.all([
      supabase.from('reviews').update({ sort_order: target }).eq('id', next[target].id),
      supabase.from('reviews').update({ sort_order: idx }).eq('id', next[idx].id),
    ])
  }

  async function remove(id: string) {
    if (!confirm('Delete this review?')) return
    const supabase = createClient()
    await supabase.from('reviews').delete().eq('id', id)
    setItems(items.filter((r) => r.id !== id))
  }

  async function save(form: ReviewForm) {
    if (!form.reviewer_name.trim()) return
    setSaving(true)
    setError('')
    const supabase = createClient()
    const row = formToRow(form)

    if (editing === 'new') {
      const { error: e } = await supabase.from('reviews').insert({
        client_id: CLIENT_ID,
        ...row,
        sort_order: items.length,
      })
      if (e) { setError(e.message); setSaving(false); return }
    } else if (editing !== null) {
      const { error: e } = await supabase.from('reviews').update(row).eq('id', editing.id)
      if (e) { setError(e.message); setSaving(false); return }
    }

    await load()
    setEditing(null)
    setSaving(false)
  }

  if (loading) return <div className="apage"><p className="empty">Loading…</p></div>

  if (editing !== null) {
    return <ReviewEditor
      review={editing === 'new' ? null : editing}
      onSave={save}
      onCancel={() => { setEditing(null); setError('') }}
      saving={saving}
      error={error}
    />
  }

  return (
    <div className="apage">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">Customer Reviews</h1>
          <p className="apage__sub">What people are saying — pulled in from wherever your reviews actually live.</p>
        </div>
        <div className="apage__actions">
          <button className="abtn abtn--primary" onClick={() => setEditing('new')}>
            <Plus size={14} /> Add review
          </button>
        </div>
      </div>

      <div className="svc-list">
        {items.map((r, i) => (
          <div key={r.id} className="svc-item">
            <div className="svc-item__body">
              <div className="svc-item__top">
                <h3>{r.reviewer_name}</h3>
                <span className="svc-item__price">{r.source}</span>
              </div>
              <p style={{ fontSize: 12 }}>
                {[
                  r.rating_type === 'rating_only' ? 'Rating only, no text' : null,
                  r.featured_on_homepage ? 'Featured on homepage' : null,
                  r.review_date,
                ].filter(Boolean).join(' · ')}
              </p>
              {r.text && <p style={{ fontSize: 13, fontStyle: 'italic' }}>&quot;{r.text}&quot;</p>}
            </div>
            <div className="svc-item__ctrls">
              <button className="iconbtn" disabled={i === 0} onClick={() => move(r.id, -1)} title="Move up">
                <ChevronUp size={15} />
              </button>
              <button className="iconbtn" disabled={i === items.length - 1} onClick={() => move(r.id, 1)} title="Move down">
                <ChevronDown size={15} />
              </button>
              <button className="iconbtn" onClick={() => setEditing(r)} title="Edit">
                <Pencil size={14} />
              </button>
              <button className="iconbtn" onClick={() => remove(r.id)} title="Delete" style={{ color: 'var(--signal)' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="empty">No reviews yet. Add the first one.</p>
        )}
      </div>
    </div>
  )
}

function ReviewEditor({
  review,
  onSave,
  onCancel,
  saving,
  error,
}: {
  review: Review | null
  onSave: (form: ReviewForm) => void
  onCancel: () => void
  saving: boolean
  error: string
}) {
  const isNew = !review
  const [form, setForm] = useState<ReviewForm>(review ? reviewToForm(review) : EMPTY_FORM)
  const set = (k: keyof ReviewForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))
  const setBool = (k: 'featured_on_homepage') => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.checked }))

  return (
    <div className="apage apage--narrow">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">{isNew ? 'New review' : 'Edit review'}</h1>
        </div>
        <div className="apage__actions">
          <button className="abtn abtn--ghost" onClick={onCancel}>Cancel</button>
          <button
            className="abtn abtn--primary"
            onClick={() => onSave(form)}
            disabled={saving || !form.reviewer_name.trim()}
          >
            <Save size={13} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ marginBottom: 16, fontSize: 12, color: 'var(--signal)', border: '1px solid var(--signal)', padding: '8px 12px' }}>
          {error}
        </p>
      )}

      <div className="editor-stack">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label className="afield">
            <span className="afield__label">Reviewer name</span>
            <input className="ainput" value={form.reviewer_name} onChange={set('reviewer_name')} placeholder="Jane Smith" />
          </label>
          <label className="afield">
            <span className="afield__label">Date</span>
            <input className="ainput" type="date" value={form.review_date} onChange={set('review_date')} />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label className="afield">
            <span className="afield__label">Source <em className="afield__hint">(where this review came from)</em></span>
            <input className="ainput" list="review-sources" value={form.source} onChange={set('source')} placeholder="facebook" />
            <datalist id="review-sources">
              {SOURCE_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
            </datalist>
          </label>
          <label className="afield">
            <span className="afield__label">Type</span>
            <select className="ainput" value={form.rating_type} onChange={set('rating_type')}>
              <option value="written">Written review</option>
              <option value="rating_only">Rating only (no text)</option>
            </select>
          </label>
        </div>

        <label className="afield">
          <span className="afield__label">Review text <em className="afield__hint">(leave empty for rating-only)</em></span>
          <textarea className="ainput" rows={4} value={form.text} onChange={set('text')} placeholder="What they said…" />
        </label>

        <label className="afield">
          <span className="afield__label">Your response <em className="afield__hint">(optional)</em></span>
          <textarea className="ainput" rows={2} value={form.seller_response} onChange={set('seller_response')} />
        </label>

        <label className="afield">
          <span className="afield__label">Tags <em className="afield__hint">(comma-separated, e.g. Punctuality, Communication)</em></span>
          <input className="ainput" value={form.notable_tags} onChange={set('notable_tags')} placeholder="Punctuality, Communication, Pricing" />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <input type="checkbox" checked={form.featured_on_homepage} onChange={setBool('featured_on_homepage')} /> Featured on homepage
        </label>
      </div>
    </div>
  )
}
