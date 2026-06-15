import { type Service } from '@/lib/types'

interface ThreeColumnGridProps {
  title?: string
  subtitle?: string
  items: Service[]
}

export default function ThreeColumnGrid({
  title = 'Services',
  subtitle,
  items,
}: ThreeColumnGridProps) {
  if (!items.length) return null

  return (
    <section className="section grid-overlay">
      <div className="section-inner">
        {(title || subtitle) && (
          <div className="mb-12">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={item.id} className="card reveal" data-delay={String(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              {item.icon && (
                <div
                  className="w-8 h-8 mb-4 text-2xl"
                  aria-hidden="true"
                  style={{ color: 'var(--brand)' }}
                >
                  {item.icon}
                </div>
              )}
              <h3 className="font-headline font-bold text-lg mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              )}
              {item.price && (
                <p className="mt-3 text-sm font-medium" style={{ color: 'var(--brand)' }}>
                  {item.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
