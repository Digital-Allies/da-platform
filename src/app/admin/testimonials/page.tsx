'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { type Testimonial } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
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

  function add() {
    const fake: Testimonial = {
      id: `new-${Date.now()}`,
      client_id: CLIENT_ID,
      author_name: '',
      author_role: '',
      content: '',
      rating: 5,
      image_url: null,
      display_order: items.length,
      created_at: '',
    }
    setItems([...items, fake])
  }

  function update<K extends keyof Testimonial>(id: string, field: K, value: Testimonial[K]) {
    setItems(items.map((t) => t.id === id ? { ...t, [field]: value } : t))
  }

  async function remove(id: string) {
    if (id.startsWith('new-')) { setItems(items.filter((t) => t.id !== id)); return }
    const supabase = createClient()
    await supabase.from('testimonials').delete().eq('id', id)
    setItems(items.filter((t) => t.id !== id))
  }

  async function saveAll() {
    setSaving(true)
    setError('')
    const supabase = createClient()
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const payload = {
        client_id: CLIENT_ID,
        author_name: item.author_name,
        author_role: item.author_role,
        content: item.content,
        rating: item.rating,
        display_order: i,
      }
      if (item.id.startsWith('new-')) {
        const { error: e } = await supabase.from('testimonials').insert(payload)
        if (e) { setError(e.message); setSaving(false); return }
      } else {
        const { error: e } = await supabase.from('testimonials').update(payload).eq('id', item.id)
        if (e) { setError(e.message); setSaving(false); return }
      }
    }
    await load()
    setSaving(false)
  }

  if (loading) return <p className="text-sm text-neutral-500">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline font-bold text-xl">Testimonials</h1>
        <div className="flex gap-2">
          <button onClick={add} className="admin-btn-secondary flex items-center gap-1.5 text-xs px-3 py-1.5">
            <Plus size={13} />
            Add
          </button>
          <button onClick={saveAll} disabled={saving} className="admin-btn-primary text-xs px-4 py-1.5">
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-xs text-alert border border-alert px-3 py-2">{error}</p>}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="admin-card">
            <div className="flex items-start gap-3">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Author Name</label>
                  <input className="admin-input" value={item.author_name} onChange={(e) => update(item.id, 'author_name', e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Role / Company <span className="lowercase normal-case text-neutral-400">(optional)</span></label>
                  <input className="admin-input" value={item.author_role ?? ''} onChange={(e) => update(item.id, 'author_role', e.target.value)} placeholder="CEO, Acme Co" />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">Quote</label>
                  <textarea className="admin-input resize-none" rows={3} value={item.content} onChange={(e) => update(item.id, 'content', e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Rating</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => update(item.id, 'rating', n)}>
                        <Star
                          size={18}
                          fill={n <= item.rating ? 'currentColor' : 'none'}
                          className={n <= item.rating ? 'text-yellow-400' : 'text-neutral-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => remove(item.id)} className="text-neutral-300 hover:text-alert transition-colors flex-shrink-0">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="admin-card text-center py-10">
          <p className="text-sm text-neutral-500 mb-3">No testimonials yet.</p>
          <button onClick={add} className="admin-btn-primary text-xs px-4 py-1.5">Add first testimonial</button>
        </div>
      )}
    </div>
  )
}
