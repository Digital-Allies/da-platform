'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { type Service } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

const EMPTY: Omit<Service, 'id' | 'client_id' | 'created_at'> = {
  title: '',
  description: '',
  price: '',
  icon: '',
  display_order: 0,
}

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
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

  function add() {
    const fake: Service = {
      ...EMPTY,
      id: `new-${Date.now()}`,
      client_id: CLIENT_ID,
      created_at: '',
      display_order: items.length,
    }
    setItems([...items, fake])
  }

  function update(id: string, field: keyof Service, value: string) {
    setItems(items.map((s) => s.id === id ? { ...s, [field]: value } : s))
  }

  async function remove(id: string) {
    if (id.startsWith('new-')) {
      setItems(items.filter((s) => s.id !== id))
      return
    }
    const supabase = createClient()
    await supabase.from('services').delete().eq('id', id)
    setItems(items.filter((s) => s.id !== id))
  }

  async function saveAll() {
    setSaving(true)
    setError('')
    const supabase = createClient()

    for (let i = 0; i < items.length; i++) {
      const item = { ...items[i], display_order: i }
      if (item.id.startsWith('new-')) {
        const { error: e } = await supabase.from('services').insert({
          client_id: CLIENT_ID,
          title: item.title,
          description: item.description,
          price: item.price,
          icon: item.icon,
          display_order: i,
        })
        if (e) { setError(e.message); setSaving(false); return }
      } else {
        const { error: e } = await supabase.from('services').update({
          title: item.title,
          description: item.description,
          price: item.price,
          icon: item.icon,
          display_order: i,
        }).eq('id', item.id)
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
        <h1 className="font-headline font-bold text-xl">Services</h1>
        <div className="flex gap-2">
          <button onClick={add} className="admin-btn-secondary flex items-center gap-1.5 text-xs px-3 py-1.5">
            <Plus size={13} />
            Add Service
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
              <GripVertical size={16} className="text-neutral-300 mt-2 flex-shrink-0" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Title</label>
                  <input className="admin-input" value={item.title} onChange={(e) => update(item.id, 'title', e.target.value)} placeholder="Service name" />
                </div>
                <div>
                  <label className="admin-label">Price <span className="lowercase normal-case text-neutral-400">(optional)</span></label>
                  <input className="admin-input" value={item.price ?? ''} onChange={(e) => update(item.id, 'price', e.target.value)} placeholder="e.g. Starting at $99" />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">Description</label>
                  <textarea className="admin-input resize-none" rows={2} value={item.description ?? ''} onChange={(e) => update(item.id, 'description', e.target.value)} placeholder="Brief description" />
                </div>
                <div>
                  <label className="admin-label">Icon <span className="lowercase normal-case text-neutral-400">(emoji or text)</span></label>
                  <input className="admin-input" value={item.icon ?? ''} onChange={(e) => update(item.id, 'icon', e.target.value)} placeholder="e.g. 🎨" />
                </div>
              </div>
              <button onClick={() => remove(item.id)} className="text-neutral-300 hover:text-alert transition-colors mt-1 flex-shrink-0">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="admin-card text-center py-10">
          <p className="text-sm text-neutral-500 mb-3">No services yet.</p>
          <button onClick={add} className="admin-btn-primary text-xs px-4 py-1.5">Add first service</button>
        </div>
      )}
    </div>
  )
}
