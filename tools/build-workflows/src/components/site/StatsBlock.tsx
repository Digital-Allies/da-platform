// Stat strip block — one of the net-new block types added alongside the
// SECTION_REGISTRY (see src/lib/section-registry.ts). Purely presentational,
// no interactivity, so this stays a server component. Tokens only — no
// hardcoded colors, per platform non-negotiables (AGENTS.md).
import type { StatsBlockData } from '@/lib/section-registry'

interface StatsBlockProps {
  data: StatsBlockData
}

export default function StatsBlock({ data }: StatsBlockProps) {
  const stats = data?.stats || []
  if (!stats.length) return null

  return (
    <section className="section" aria-label={data.title || 'Key statistics'}>
      <div className="section-inner">
        {data.title && (
          <h2 className="section-title text-center mb-10" style={{ color: 'var(--tok-text)' }}>
            {data.title}
          </h2>
        )}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ borderTop: '1px solid var(--tok-border)' }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center py-6"
              style={{ borderLeft: i === 0 ? 'none' : '1px solid var(--tok-border)' }}
            >
              <div
                className="font-headline font-bold text-2xl md:text-3xl mb-1"
                style={{ color: 'var(--tok-primary)' }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm"
                style={{ color: 'var(--tok-text-muted)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
