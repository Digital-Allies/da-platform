'use client'

// Admin content-tab editor for the `faq` block type. Referenced from
// SECTION_REGISTRY['faq'].AdminForm (src/lib/section-registry.ts) so
// PagesClient.tsx never needs a hardcoded `block.type === 'faq'` branch.
import { Plus, Trash } from 'lucide-react'
import type { FaqBlockData } from '@/lib/section-registry'

interface FaqAdminFormProps {
  data: FaqBlockData
  onChange: (data: FaqBlockData) => void
}

export default function FaqAdminForm({ data, onChange }: FaqAdminFormProps) {
  const items = data?.items || []

  const updateItem = (index: number, key: 'question' | 'answer', value: string) => {
    const next = items.map((it, i) => (i === index ? { ...it, [key]: value } : it))
    onChange({ ...data, items: next })
  }

  const addItem = () => {
    onChange({ ...data, items: [...items, { question: '', answer: '' }] })
  }

  const removeItem = (index: number) => {
    onChange({ ...data, items: items.filter((_, i) => i !== index) })
  }

  return (
    <div>
      <div className="form-group" style={{ marginBottom: '12px' }}>
        <label className="form-label font-bold text-xs uppercase tracking-wider">Section Title</label>
        <input
          type="text"
          className="form-control"
          value={data?.title || ''}
          onChange={e => onChange({ ...data, title: e.target.value })}
        />
      </div>

      {items.map((item, i) => (
        <div key={i} style={{ border: '1px solid var(--charcoal)', padding: '10px', marginBottom: '10px', background: 'var(--bg-alt)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <strong style={{ fontSize: '11px', textTransform: 'uppercase' }}>Question {i + 1}</strong>
            <button type="button" onClick={() => removeItem(i)} aria-label={`Remove question ${i + 1}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--signal)' }}>
              <Trash size={14} />
            </button>
          </div>
          <div className="form-group" style={{ marginBottom: '8px' }}>
            <label className="form-label text-xs">Question</label>
            <input
              type="text"
              className="form-control"
              value={item.question}
              onChange={e => updateItem(i, 'question', e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label text-xs">Answer</label>
            <textarea
              className="form-control"
              rows={3}
              value={item.answer}
              onChange={e => updateItem(i, 'answer', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button type="button" className="btn btn--secondary" onClick={addItem} style={{ padding: '6px 10px', fontSize: '11px' }}>
        <Plus size={12} /> Add Question
      </button>
    </div>
  )
}
