'use client'

// Admin content-tab editor for the `stats` block type. Referenced from
// SECTION_REGISTRY['stats'].AdminForm (src/lib/section-registry.ts) so
// PagesClient.tsx never needs a hardcoded `block.type === 'stats'` branch.
import { Plus, Trash } from 'lucide-react'
import type { StatsBlockData } from '@/lib/section-registry'

interface StatsAdminFormProps {
  data: StatsBlockData
  onChange: (data: StatsBlockData) => void
}

export default function StatsAdminForm({ data, onChange }: StatsAdminFormProps) {
  const stats = data?.stats || []

  const updateStat = (index: number, key: 'value' | 'label', value: string) => {
    const next = stats.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    onChange({ ...data, stats: next })
  }

  const addStat = () => {
    onChange({ ...data, stats: [...stats, { value: '', label: '' }] })
  }

  const removeStat = (index: number) => {
    onChange({ ...data, stats: stats.filter((_, i) => i !== index) })
  }

  return (
    <div>
      <div className="form-group" style={{ marginBottom: '12px' }}>
        <label className="form-label font-bold text-xs uppercase tracking-wider">Section Title (optional)</label>
        <input
          type="text"
          className="form-control"
          value={data?.title || ''}
          onChange={e => onChange({ ...data, title: e.target.value })}
        />
      </div>

      {stats.map((stat, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', marginBottom: '10px' }}>
          <div className="form-group" style={{ marginBottom: 0, flex: '0 0 100px' }}>
            <label className="form-label text-xs">Value</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 250+"
              value={stat.value}
              onChange={e => updateStat(i, 'value', e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
            <label className="form-label text-xs">Label</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Projects delivered"
              value={stat.label}
              onChange={e => updateStat(i, 'label', e.target.value)}
            />
          </div>
          <button type="button" onClick={() => removeStat(i)} aria-label={`Remove stat ${i + 1}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--signal)', padding: '8px' }}>
            <Trash size={14} />
          </button>
        </div>
      ))}

      <button type="button" className="btn btn--secondary" onClick={addStat} style={{ padding: '6px 10px', fontSize: '11px' }}>
        <Plus size={12} /> Add Stat
      </button>
    </div>
  )
}
