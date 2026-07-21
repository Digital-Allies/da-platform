import React from 'react'
import { Hero, ThreeColumnGrid, TestimonialCarousel, ContactForm, ProductGrid } from '@/components/site'
import { getServices, getTestimonials, getProducts } from '@/lib/data'
import CTAButton from './CTAButton'

interface Block {
  type: string
  data: any
}

interface BlockRendererProps {
  blocks: Block[] | null | undefined
}

export default async function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || !blocks.length) return null

  // Fetch dynamic collections in parallel
  const [services, testimonials, products] = await Promise.all([
    getServices(),
    getTestimonials(),
    getProducts(),
  ])

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'hero':
            return (
              <Hero
                key={index}
                title={block.data.title || ''}
                subtitle={block.data.subtitle || ''}
                ctaText={block.data.ctaText}
                ctaHref={block.data.ctaLink}
              />
            )
          case 'richtext':
            return (
              <section key={index} className="section bg-white">
                <div className="section-inner max-w-compact">
                  <div
                    className="prose-da"
                    dangerouslySetInnerHTML={{ __html: block.data.content || '' }}
                  />
                </div>
              </section>
            )
          case 'services':
            return (
              <div key={index} id="services">
                <ThreeColumnGrid
                  title={block.data.title || 'Services'}
                  items={services}
                />
              </div>
            )
          case 'products':
            return (
              <div key={index} id="products">
                <ProductGrid
                  title={block.data.title || 'Featured Finds'}
                  products={products}
                />
              </div>
            )
          case 'testimonials':
            return (
              <div key={index} id="testimonials">
                <TestimonialCarousel
                  title={block.data.title || 'What Our Clients Say'}
                  testimonials={testimonials}
                />
              </div>
            )
          case 'cta':
            return (
              <section key={index} className="section bg-charcoal text-white text-center">
                <div className="section-inner max-w-compact">
                  <h2 className="section-title mb-4">{block.data.title || 'Ready to elevate?'}</h2>
                  <p className="text-neutral-400 font-details text-sm mb-6">{block.data.subtitle || "Let's discuss how we can partner."}</p>
                  <div className="flex justify-center">
                    <CTAButton href={block.data.buttonLink || '#contact'} variant="primary">
                      {block.data.buttonText || 'Contact Us'}
                    </CTAButton>
                  </div>
                </div>
              </section>
            )
          case 'contact':
            return (
              <div key={index} id="contact">
                <ContactForm
                  title={block.data.title || 'Get in Touch'}
                  subtitle={block.data.subtitle}
                />
              </div>
            )
          default:
            return null
        }
      })}
    </>
  )
}
