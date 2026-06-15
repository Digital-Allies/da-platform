import Image from 'next/image'
import CTAButton from './CTAButton'

interface HeroProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  backgroundImageUrl?: string
}

export default function Hero({
  title,
  subtitle,
  ctaText = 'Get in Touch',
  ctaHref = '#contact',
  backgroundImageUrl,
}: HeroProps) {
  return (
    <section
      className="relative grid-overlay min-h-[70vh] flex items-center"
      aria-label="Hero"
    >
      {backgroundImageUrl && (
        <>
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            priority
            className="object-cover"
            style={{ opacity: 0.12 }}
          />
          <div className="absolute inset-0 bg-canvas/80" />
        </>
      )}

      <div className="relative section w-full">
        <div className="section-inner max-w-3xl">
          <h1
            className="text-3xl md:text-4xl font-headline font-bold text-charcoal mb-5 animate-slide-up"
            style={{ animationFillMode: 'both' }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="text-md md:text-lg text-neutral-600 mb-8 leading-relaxed animate-slide-up"
              style={{ animationDelay: '120ms', animationFillMode: 'both' }}
            >
              {subtitle}
            </p>
          )}

          <div
            className="animate-slide-up"
            style={{ animationDelay: '240ms', animationFillMode: 'both' }}
          >
            <CTAButton href={ctaHref} variant="primary">
              {ctaText}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}
