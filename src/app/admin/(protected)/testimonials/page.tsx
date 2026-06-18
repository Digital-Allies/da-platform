'use client'

import { useEffect, useState } from 'react'
import { Plus, Save, Pencil } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { type Testimonial } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

type Editing = null | 'new' | Testimonial

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Editing>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const supabase = createClient()
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('client_id', CLIENT_ID)
      .order('display_order')
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save(form: {
    content: string
    author_name: string
    author_role: string
    rating: number
  }) {
    if (!form.content.trim()) return
    setSaving(true)
    setError('')
    const supabase = createClient()

    if (editing === 'new') {
      const { error: e } = await supabase.from('testimonials').insert({
        client_id: CLIENT_ID,
        ...form,
        display_order: items.length,
      })
      if (e) { setError(e.message); setSaving(false); return }
    } else if (editing !== null) {
      const t = editing
      const { error: e } = await supabase
        .from('testimonials')
        .update(form)
        .eq('id', t.id)
      if (e) { setError(e.message); setSaving(false); return }
    }

    await load()
    setEditing(null)
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Delete this field note?')) return
    const supabase = createClient()
    await supabase.from('testimonials').delete().eq('id', id)
    setItems(items.filter((t) => t.id !== id))
  }

  if (loading) return <div className="apage"><p className="empty">Loading…</p></div>

  if (editing !== null) {
    const editingItem = editing === 'new' ? null : editing
    return (
      <NoteEditor
        note={editingItem}
        onSave={save}
        onCancel={() => { setEditing(null); setError('') }}
        onDelete={editingItem ? () => { remove(editingItem.id); setEditing(null) } : undefined}
        saving={saving}
        error={error}
      />
    )
  }

  return (
    <div className="apage">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">Field Notes</h1>
          <p className="apage__sub">Testimonials from the people you have helped.</p>
        </div>
        <div className="apage__actions">
          <button className="abtn abtn--primary" onClick={() => setEditing('new')}>
            <Plus size={14} /> Add note
          </button>
        </div>
      </div>

      <div className="notes-admin">
        {items.map((t) => (
          <button key={t.id} className="note-admin" onClick={() => setEditing(t)}>
            <div className="note-admin__stars">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--signal)" stroke="var(--signal)" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p className="note-admin__quote">&ldquo;{t.content}&rdquo;</p>
            <div className="note-admin__by">
              <strong>{t.author_name}</strong>
              <span>{t.author_role}</span>
            </div>
            <Pencil size={14} className="note-admin__edit" />
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <p className="empty">No field notes yet. Add the first one.</p>
      )}
    </div>
  )
}

function NoteEditor({
  note,
  onSave,
  onCancel,
  onDelete,
  saving,
  error,
}: {
  note: Testimonial | null
  onSave: (form: { content: string; author_name: string; author_role: string; rating: number }) => void
  onCancel: () => void
  onDelete?: () => void
  saving: boolean
  error: string
}) {
  const isNew = !note
  const [form, setForm] = useState({
    content: note?.content ?? '',
    author_name: note?.author_name ?? '',
    author_role: note?.author_role ?? '',
    rating: note?.rating ?? 5,
  })

  return (
    <div className="apage apage--narrow">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">{isNew ? 'New field note' : 'Edit field note'}</h1>
        </div>
        <div className="apage__actions">
          {onDelete && (
            <button className="abtn abtn--danger" onClick={onDelete}>Delete</button>
          )}
          <button className="abtn abtn--ghost" onClick={onCancel}>Cancel</button>
          <button
            className="abtn abtn--primary"
            onClick={() => onSave(form)}
            disabled={saving || !form.content.trim()}
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
          <span className="afield__label">Quote</span>
          <textarea
            className="ainput"
            rows={4}
            value={form.content}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
            placeholder="What did they say?"
          />
        </label>
        <div className="afield-row">
          <label className="afield">
            <span className="afield__label">Author name</span>
            <input
              className="ainput"
              value={form.author_name}
              onChange={(e) => setForm((p) => ({ ...p, author_name: e.target.value }))}
            />
          </label>
          <label className="afield">
            <span className="afield__label">Rating</span>
            <select
              className="ainput ainput--select"
              value={form.rating}
              onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
              style={{ width: '100%' }}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} stars</option>
              ))}
            </select>
          </label>
        </div>
        <label className="afield">
          <span className="afield__label">Author role / business</span>
          <input
            className="ainput"
            value={form.author_role}
            onChange={(e) => setForm((p) => ({ ...p, author_role: e.target.value }))}
            placeholder="Vance & Daughters Hardware · Kingman"
          />
        </label>
      </div>
    </div>
  )
}
