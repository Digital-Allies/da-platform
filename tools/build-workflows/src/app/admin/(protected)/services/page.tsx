'use client'

import { useEffect, useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Pencil, Trash2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { type Service } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

type Editing = null | 'new' | Service

const EMPTY_SVC = { title: '', description: '', price: '', icon: '🎯', display_order: 0 }

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Editing>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const supabase = createClient()
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('client_id', CLIENT_ID)
      .order('display_order')
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function move(id: string, dir: -1 | 1) {
    const idx = items.findIndex((s) => s.id === id)
    if (idx < 0) return
    const next = [...items]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setItems(next)
    const supabase = createClient()
    await Promise.all([
      supabase.from('services').update({ display_order: target }).eq('id', next[target].id),
      supabase.from('services').update({ display_order: idx }).eq('id', next[idx].id),
    ])
  }

  async function remove(id: string) {
    if (!confirm('Delete this department?')) return
    const supabase = createClient()
    await supabase.from('services').delete().eq('id', id)
    setItems(items.filter((s) => s.id !== id))
  }

  async function save(form: typeof EMPTY_SVC) {
    if (!form.title.trim()) return
    setSaving(true)
    setError('')
    const supabase = createClient()

    if (editing === 'new') {
      const { error: e } = await supabase.from('services').insert({
        client_id: CLIENT_ID,
        ...form,
        display_order: items.length,
      })
      if (e) { setError(e.message); setSaving(false); return }
    } else if (editing !== null) {
      const svc = editing
      const { error: e } = await supabase
        .from('services')
        .update({ title: form.title, description: form.description, price: form.price, icon: form.icon })
        .eq('id', svc.id)
      if (e) { setError(e.message); setSaving(false); return }
    }

    await load()
    setEditing(null)
    setSaving(false)
  }

  if (loading) return <div className="apage"><p className="empty">Loading…</p></div>

  if (editing !== null) {
    return <ServiceEditor
      svc={editing === 'new' ? null : editing}
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
          <h1 className="apage__title">The Departments</h1>
          <p className="apage__sub">Four distinct operations. One point of contact.</p>
        </div>
        <div className="apage__actions">
          <button className="abtn abtn--primary" onClick={() => setEditing('new')}>
            <Plus size={14} /> Add department
          </button>
        </div>
      </div>

      <div className="svc-list">
        {items.map((svc, i) => (
          <div key={svc.id} className="svc-item">
            <div className="svc-item__icon">{svc.icon || '🎯'}</div>
            <div className="svc-item__body">
              <div className="svc-item__top">
                <h3>{svc.title}</h3>
                {svc.price && <span className="svc-item__price">{svc.price}</span>}
              </div>
              <p>{svc.description}</p>
            </div>
            <div className="svc-item__ctrls">
              <button className="iconbtn" disabled={i === 0} onClick={() => move(svc.id, -1)} title="Move up">
                <ChevronUp size={15} />
              </button>
              <button className="iconbtn" disabled={i === items.length - 1} onClick={() => move(svc.id, 1)} title="Move down">
                <ChevronDown size={15} />
              </button>
              <button className="iconbtn" onClick={() => setEditing(svc)} title="Edit">
                <Pencil size={14} />
              </button>
              <button className="iconbtn" onClick={() => remove(svc.id)} title="Delete" style={{ color: 'var(--signal)' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="empty">No departments yet. Add the first one.</p>
        )}
      </div>
    </div>
  )
}

function ServiceEditor({
  svc,
  onSave,
  onCancel,
  saving,
  error,
}: {
  svc: Service | null
  onSave: (form: typeof EMPTY_SVC) => void
  onCancel: () => void
  saving: boolean
  error: string
}) {
  const isNew = !svc
  const [form, setForm] = useState({
    title: svc?.title ?? '',
    description: svc?.description ?? '',
    price: svc?.price ?? '',
    icon: svc?.icon ?? '🎯',
    display_order: svc?.display_order ?? 0,
  })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  return (
    <div className="apage apage--narrow">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">{isNew ? 'New department' : 'Edit department'}</h1>
        </div>
        <div className="apage__actions">
          <button className="abtn abtn--ghost" onClick={onCancel}>Cancel</button>
          <button
            className="abtn abtn--primary"
            onClick={() => onSave(form)}
            disabled={saving || !form.title.trim()}
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
        <label className="afield">
          <span className="afield__label">Department name</span>
          <input className="ainput ainput--lg" value={form.title} onChange={set('title')} placeholder="The Design Bureau" />
        </label>
        <label className="afield">
          <span className="afield__label">Icon <em className="afield__hint">(emoji)</em></span>
          <input className="ainput" value={form.icon} onChange={set('icon')} placeholder="🎯" style={{ width: 80 }} />
        </label>
        <label className="afield">
          <span className="afield__label">Description</span>
          <textarea className="ainput" rows={3} value={form.description} onChange={set('description')} />
        </label>
        <label className="afield">
          <span className="afield__label">Price <em className="afield__hint">(use the From $X convention)</em></span>
          <input className="ainput mono" value={form.price} onChange={set('price')} placeholder="From $2,400" />
        </label>
      </div>
    </div>
  )
}
