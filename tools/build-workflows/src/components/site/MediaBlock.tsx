// Image/video block — net-new block type (see src/lib/section-registry.ts).
// Presentational only, server component.
//
// Platform non-negotiable: next/image only, never a raw <img> (AGENTS.md).
// For the image case we use `fill` inside an explicitly-sized aspect-ratio
// container (the block's data shape has no stored width/height, only src/alt).
import Image from 'next/image'
import type { MediaBlockData } from '@/lib/section-registry'

interface MediaBlockProps {
  data: MediaBlockData
}

export default function MediaBlock({ data }: MediaBlockProps) {
  if (!data?.src) return null

  return (
    <section className="section" aria-label={data.caption || 'Media'}>
      <div className="section-inner max-w-compact">
        <figure className="m-0">
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              overflow: 'hidden',
              borderRadius: 'var(--tok-radius)',
              background: 'var(--tok-surface)',
              border: '1px solid var(--tok-border)',
            }}
          >
            {data.mediaType === 'video' ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption -- caption rendered below as <figcaption>
              <video
                src={data.src}
                controls
                aria-label={data.alt || data.caption || 'Video'}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Image
                src={data.src}
                alt={data.alt || ''}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>
          {data.caption && (
            <figcaption
              className="text-sm text-center mt-3"
              style={{ color: 'var(--tok-text-muted)' }}
            >
              {data.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  )
}
