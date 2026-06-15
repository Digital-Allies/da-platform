import Image from 'next/image'
import CTAButton from './CTAButton'

interface TwoColumnProps {
  title: string
  body: string
  imageUrl?: string
  imageAlt?: string
  ctaText?: string
  ctaHref?: string
  imageLeft?: boolean
  accent?: boolean
}

export default function TwoColumn({
  title,
  body,
  imageUrl,
  imageAlt = '',
  ctaText,
  ctaHref,
  imageLeft = false,
  accent = false,
}: TwoColumnProps) {
  return (
    <section className={`section ${accent ? '' : 'bg-white'}`}>
      <div className="section-inner">
        <div className={`flex flex-col md:flex-row gap-12 md:gap-20 items-center ${imageLeft ? 'md:flex-row-reverse' : ''}`}>
          {/* Image */}
          {imageUrl && (
            <div className="w-full md:w-1/2 flex-shrink-0">
              <div className="relative aspect-[4/3] border border-charcoal overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className={imageUrl ? 'md:w-1/2' : 'max-w-2xl'}>
            <h2 className="section-title">{title}</h2>
            <p className="text-neutral-600 text-base leading-relaxed mb-6 whitespace-pre-line">
              {body}
            </p>
            {ctaText && ctaHref && (
              <CTAButton href={ctaHref} variant="secondary">
                {ctaText}
              </CTAButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
