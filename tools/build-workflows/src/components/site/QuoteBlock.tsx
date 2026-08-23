// Pinned/large quote block — net-new block type (see src/lib/section-registry.ts).
// Presentational only, server component. Tokens only, no hardcoded colors.
import type { QuoteBlockData } from '@/lib/section-registry'

interface QuoteBlockProps {
  data: QuoteBlockData
}

export default function QuoteBlock({ data }: QuoteBlockProps) {
  if (!data?.quote) return null

  return (
    <section className="section" aria-label="Quote">
      <div className="section-inner max-w-compact">
        <blockquote
          className="text-xl md:text-2xl font-headline font-semibold leading-snug text-center"
          style={{ color: 'var(--tok-text)', borderLeft: '4px solid var(--tok-primary)', paddingLeft: '24px' }}
        >
          &ldquo;{data.quote}&rdquo;
        </blockquote>
        {data.attribution && (
          <p
            className="text-center text-sm mt-5"
            style={{ color: 'var(--tok-text-muted)' }}
          >
            &mdash; {data.attribution}
          </p>
        )}
      </div>
    </section>
  )
}
