'use client'

// The Showroom — product management for commerce clients (Atomic Finds ATX
// first). Follows the Services module pattern: list + ordering + full CRUD,
// built for a non-technical owner. The "How it sells" section is the flexible
// conversion layer (STATUS.md decision #8): each product picks its selling
// state; the storefront CTA follows via resolveProductCta().

import { useEffect, useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Pencil, Trash2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { type Product, type ProductSellingState } from '@/lib/types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

type Editing = null | 'new' | Product

const SELLING_STATES: Array<{ value: ProductSellingState; label: string; hint: string }> = [
  { value: 'listing', label: 'Outside listing', hint: 'Button opens the listing link (e.g. Facebook Marketplace)' },
  { value: 'inquiry', label: 'Ask about it', hint: 'Button sends shoppers to the contact form' },
  { value: 'direct', label: 'Message to buy', hint: 'Buyer coordinates payment with you directly' },
  { value: 'checkout', label: 'Checkout link', hint: 'Future: opens an online purchase flow' },
]

interface ProductForm {
  title: string
  description: string
  price: string
  original_price: string
  category: string
  condition: string
  tagline: string
  location: string
  listed_label: string
  image_url: string
  selling_state: ProductSellingState
  cta_label: string
  external_url: string
  in_stock: boolean
  featured: boolean
  sku: string
  origin: string
  era: string
  dimensions: string
  attributes_json: string
}

const EMPTY_FORM: ProductForm = {
  title: '', description: '', price: '', original_price: '', category: '',
  condition: '', tagline: '', location: '', listed_label: '', image_url: '',
  selling_state: 'inquiry', cta_label: '', external_url: '', in_stock: true,
  featured: false, sku: '', origin: '', era: '', dimensions: '', attributes_json: '',
}

function productToForm(p: Product): ProductForm {
  return {
    title: p.title,
    description: p.description ?? '',
    price: p.price != null ? String(p.price) : '',
    original_price: p.original_price != null ? String(p.original_price) : '',
    category: p.category ?? '',
    condition: p.condition ?? '',
    tagline: p.tagline ?? '',
    location: p.location ?? '',
    listed_label: p.listed_label ?? '',
    image_url: p.image_url ?? '',
    selling_state: p.selling_state ?? 'inquiry',
    cta_label: p.cta_label ?? '',
    external_url: p.external_url ?? '',
    in_stock: p.in_stock ?? true,
    featured: p.badge === 'featured',
    sku: p.sku ?? '',
    origin: p.origin ?? '',
    era: p.era ?? '',
    dimensions: p.dimensions ?? '',
    attributes_json: p.attributes && Object.keys(p.attributes).length ? JSON.stringify(p.attributes, null, 2) : '',
  }
}

function formToRow(form: ProductForm): { row: Record<string, unknown>; error?: string } {
  const num = (s: string) => {
    if (!s.trim()) return null
    const n = Number(s.replace(/[$,\s]/g, ''))
    return Number.isFinite(n) ? n : NaN
  }
  const price = num(form.price)
  const original = num(form.original_price)
  if (Number.isNaN(price) || Number.isNaN(original)) return { row: {}, error: 'Price must be a number (or left empty for "Inquire").' }

  let attributes: Record<string, unknown> = {}
  if (form.attributes_json.trim()) {
    try {
      const parsed = JSON.parse(form.attributes_json)
      if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error()
      attributes = parsed
    } catch {
      return { row: {}, error: 'Extra details must be valid JSON like {"Drawers": 4} — or leave it empty.' }
    }
  }

  const t = (s: string) => (s.trim() ? s.trim() : null)
  return {
    row: {
      title: form.title.trim(),
      description: t(form.description),
      price,
      original_price: original,
      category: t(form.category),
      condition: t(form.condition),
      tagline: t(form.tagline),
      location: t(form.location),
      listed_label: t(form.listed_label),
      image_url: t(form.image_url),
      selling_state: form.selling_state,
      cta_label: t(form.cta_label),
      external_url: t(form.external_url),
      in_stock: form.in_stock,
      badge: form.featured ? 'featured' : form.in_stock ? 'instock' : null,
      sku: t(form.sku),
      origin: t(form.origin),
      era: t(form.era),
      dimensions: t(form.dimensions),
      attributes,
    },
  }
}

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Editing>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const supabase = createClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('client_id', CLIENT_ID)
      .order('display_order')
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function move(id: string, dir: -1 | 1) {
    const idx = items.findIndex((p) => p.id === id)
    if (idx < 0) return
    const next = [...items]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setItems(next)
    const supabase = createClient()
    await Promise.all([
      supabase.from('products').update({ display_order: target }).eq('id', next[target].id),
      supabase.from('products').update({ display_order: idx }).eq('id', next[idx].id),
    ])
  }

  async function remove(id: string) {
    if (!confirm('Delete this product? (Do this when a piece sells.)')) return
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', id)
    setItems(items.filter((p) => p.id !== id))
  }

  async function save(form: ProductForm) {
    if (!form.title.trim()) return
    const { row, error: formError } = formToRow(form)
    if (formError) { setError(formError); return }
    setSaving(true)
    setError('')
    const supabase = createClient()

    if (editing === 'new') {
      const { error: e } = await supabase.from('products').insert({
        client_id: CLIENT_ID,
        ...row,
        display_order: items.length,
      })
      if (e) { setError(e.message); setSaving(false); return }
    } else if (editing !== null) {
      const { error: e } = await supabase.from('products').update(row).eq('id', editing.id)
      if (e) { setError(e.message); setSaving(false); return }
    }

    await load()
    setEditing(null)
    setSaving(false)
  }

  if (loading) return <div className="apage"><p className="empty">Loading…</p></div>

  if (editing !== null) {
    return <ProductEditor
      product={editing === 'new' ? null : editing}
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
          <h1 className="apage__title">The Showroom</h1>
          <p className="apage__sub">Every piece in the catalog. Add new finds, retire sold ones.</p>
        </div>
        <div className="apage__actions">
          <button className="abtn abtn--primary" onClick={() => setEditing('new')}>
            <Plus size={14} /> Add product
          </button>
        </div>
      </div>

      <div className="svc-list">
        {items.map((p, i) => (
          <div key={p.id} className="svc-item">
            <div className="svc-item__icon" style={{ width: 56, height: 56, overflow: 'hidden', borderRadius: 8, flexShrink: 0 }}>
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span title="No photo yet">📦</span>
              )}
            </div>
            <div className="svc-item__body">
              <div className="svc-item__top">
                <h3>{p.title}</h3>
                <span className="svc-item__price">
                  {p.price != null ? `$${Number(p.price).toLocaleString()}` : 'Inquire'}
                </span>
              </div>
              <p style={{ fontSize: 12 }}>
                {[
                  p.category,
                  SELLING_STATES.find((s) => s.value === p.selling_state)?.label ?? p.selling_state,
                  p.badge === 'featured' ? 'Featured' : null,
                  p.in_stock ? null : 'Out of stock',
                  p.image_url ? null : 'No photo',
                ].filter(Boolean).join(' · ')}
              </p>
            </div>
            <div className="svc-item__ctrls">
              <button className="iconbtn" disabled={i === 0} onClick={() => move(p.id, -1)} title="Move up">
                <ChevronUp size={15} />
              </button>
              <button className="iconbtn" disabled={i === items.length - 1} onClick={() => move(p.id, 1)} title="Move down">
                <ChevronDown size={15} />
              </button>
              <button className="iconbtn" onClick={() => setEditing(p)} title="Edit">
                <Pencil size={14} />
              </button>
              <button className="iconbtn" onClick={() => remove(p.id)} title="Delete (sold)" style={{ color: 'var(--signal)' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="empty">No products yet. Add the first find.</p>
        )}
      </div>
    </div>
  )
}

function ProductEditor({
  product,
  onSave,
  onCancel,
  saving,
  error,
}: {
  product: Product | null
  onSave: (form: ProductForm) => void
  onCancel: () => void
  saving: boolean
  error: string
}) {
  const isNew = !product
  const [form, setForm] = useState<ProductForm>(product ? productToForm(product) : EMPTY_FORM)
  const set = (k: keyof ProductForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))
  const setBool = (k: 'in_stock' | 'featured') => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.checked }))

  const needsUrl = form.selling_state === 'listing' || form.selling_state === 'checkout'

  return (
    <div className="apage apage--narrow">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">{isNew ? 'New product' : 'Edit product'}</h1>
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
          <span className="afield__label">Product title</span>
          <input className="ainput ainput--lg" value={form.title} onChange={set('title')} placeholder="Vintage Peacock Chair" />
        </label>

        <label className="afield">
          <span className="afield__label">Description</span>
          <textarea className="ainput" rows={4} value={form.description} onChange={set('description')} placeholder="What makes this piece special — condition notes, story, pickup details…" />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label className="afield">
            <span className="afield__label">Price ($) <em className="afield__hint">(leave empty to show &quot;Inquire&quot;)</em></span>
            <input className="ainput" value={form.price} onChange={set('price')} placeholder="450" inputMode="decimal" />
          </label>
          <label className="afield">
            <span className="afield__label">Original price ($) <em className="afield__hint">(only when on sale)</em></span>
            <input className="ainput" value={form.original_price} onChange={set('original_price')} placeholder="" inputMode="decimal" />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label className="afield">
            <span className="afield__label">Category <em className="afield__hint">(drives the shop tabs)</em></span>
            <input className="ainput" value={form.category} onChange={set('category')} placeholder="Chairs" />
          </label>
          <label className="afield">
            <span className="afield__label">Condition</span>
            <input className="ainput" value={form.condition} onChange={set('condition')} placeholder="Used - Good" />
          </label>
        </div>

        <label className="afield">
          <span className="afield__label">Photo URL <em className="afield__hint">(leave empty for &quot;Photo coming soon&quot;)</em></span>
          <input className="ainput" value={form.image_url} onChange={set('image_url')} placeholder="/atomic-finds/products/product-peacock-chair-02.png" />
        </label>

        {/* ── How it sells — the flexible conversion layer ─────────────── */}
        <div style={{ border: 'var(--border-1, 1px solid #ccc)', padding: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>How it sells</p>
          <label className="afield">
            <span className="afield__label">Selling method</span>
            <select className="ainput" value={form.selling_state} onChange={set('selling_state')}>
              {SELLING_STATES.map((s) => (
                <option key={s.value} value={s.value}>{s.label} — {s.hint}</option>
              ))}
            </select>
          </label>
          {needsUrl && (
            <label className="afield">
              <span className="afield__label">{form.selling_state === 'listing' ? 'Listing link' : 'Checkout link'}</span>
              <input className="ainput" value={form.external_url} onChange={set('external_url')} placeholder="https://www.facebook.com/marketplace/item/…" />
            </label>
          )}
          <label className="afield">
            <span className="afield__label">Button text <em className="afield__hint">(optional — sensible default per method)</em></span>
            <input className="ainput" value={form.cta_label} onChange={set('cta_label')} placeholder="Claim Me" />
          </label>
          <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
              <input type="checkbox" checked={form.in_stock} onChange={setBool('in_stock')} /> In stock
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
              <input type="checkbox" checked={form.featured} onChange={setBool('featured')} /> Featured
            </label>
          </div>
        </div>

        {/* ── Details ──────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label className="afield">
            <span className="afield__label">Tagline <em className="afield__hint">(short script line)</em></span>
            <input className="ainput" value={form.tagline} onChange={set('tagline')} placeholder="icon of the 70s" />
          </label>
          <label className="afield">
            <span className="afield__label">SKU <em className="afield__hint">(optional)</em></span>
            <input className="ainput" value={form.sku} onChange={set('sku')} placeholder="AF-002" />
          </label>
          <label className="afield">
            <span className="afield__label">Era</span>
            <input className="ainput" value={form.era} onChange={set('era')} placeholder="1970s" />
          </label>
          <label className="afield">
            <span className="afield__label">Origin</span>
            <input className="ainput" value={form.origin} onChange={set('origin')} placeholder="Philippines" />
          </label>
          <label className="afield">
            <span className="afield__label">Dimensions</span>
            <input className="ainput" value={form.dimensions} onChange={set('dimensions')} placeholder={'H 58" x W 40" x D 32"'} />
          </label>
          <label className="afield">
            <span className="afield__label">Location</span>
            <input className="ainput" value={form.location} onChange={set('location')} placeholder="Austin, TX" />
          </label>
          <label className="afield">
            <span className="afield__label">Status label <em className="afield__hint">(shown as-is)</em></span>
            <input className="ainput" value={form.listed_label} onChange={set('listed_label')} placeholder="In stock / 3 days ago" />
          </label>
        </div>

        <label className="afield">
          <span className="afield__label">Extra details <em className="afield__hint">(advanced — JSON key/values, or leave empty)</em></span>
          <textarea className="ainput" rows={3} value={form.attributes_json} onChange={set('attributes_json')} placeholder={'{"Number of Seats": 4}'} style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12 }} />
        </label>
      </div>
    </div>
  )
}
