import React from 'react'
import { Hero, ThreeColumnGrid, TestimonialCarousel, ContactForm, ProductGrid } from '@/components/site'
import { getServices, getTestimonials, getProducts, getCollections, getSiteSettings } from '@/lib/data'
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

  // Fetch dynamic collections & site settings in parallel
  const [services, testimonials, products, collections, siteSettings] = await Promise.all([
    getServices(),
    getTestimonials(),
    getProducts(),
    getCollections(),
    getSiteSettings(),
  ])

  const resolveText = (text: string = '') => {
    if (!text) return ''
    let resolved = text
    resolved = resolved.replace(/{site_title}/g, siteSettings?.site_title || '')
    resolved = resolved.replace(/{tagline}/g, siteSettings?.tagline || '')
    resolved = resolved.replace(/{phone}/g, siteSettings?.phone || '')
    resolved = resolved.replace(/{email}/g, siteSettings?.email || '')
    resolved = resolved.replace(/{address}/g, siteSettings?.address || '')
    resolved = resolved.replace(/{hero_title}/g, siteSettings?.hero_title || '')
    resolved = resolved.replace(/{hero_subtitle}/g, siteSettings?.hero_subtitle || '')
    resolved = resolved.replace(/{about_title}/g, siteSettings?.about_title || '')
    resolved = resolved.replace(/{about_body}/g, siteSettings?.about_body || '')
    resolved = resolved.replace(/{announcement_banner}/g, siteSettings?.announcement_banner || '')
    resolved = resolved.replace(/{shipping_policy}/g, siteSettings?.shipping_policy || '')
    resolved = resolved.replace(/{return_policy}/g, siteSettings?.return_policy || '')
    return resolved
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'hero':
            return (
              <Hero
                key={index}
                title={resolveText(block.data.title || '')}
                subtitle={resolveText(block.data.subtitle || '')}
                ctaText={resolveText(block.data.ctaText || '')}
                ctaHref={block.data.ctaLink}
              />
            )
          case 'richtext':
            return (
              <section key={index} className="section bg-white">
                <div className="section-inner max-w-compact">
                  <div
                    className="prose-da"
                    dangerouslySetInnerHTML={{ __html: resolveText(block.data.content || '') }}
                  />
                </div>
              </section>
            )
          case 'services':
            return (
              <div key={index} id="services">
                <ThreeColumnGrid
                  title={resolveText(block.data.title || 'Services')}
                  items={services}
                />
              </div>
            )
          case 'products':
            return (
              <div key={index} id="products">
                <ProductGrid
                  title={resolveText(block.data.title || 'Featured Finds')}
                  products={products}
                  collections={collections}
                />
              </div>
            )
          case 'testimonials':
            return (
              <div key={index} id="testimonials">
                <TestimonialCarousel
                  title={resolveText(block.data.title || 'What Our Clients Say')}
                  testimonials={testimonials}
                />
              </div>
            )
          case 'cta':
            return (
              <section key={index} className="section bg-charcoal text-white text-center">
                <div className="section-inner max-w-compact">
                  <h2 className="section-title mb-4">{resolveText(block.data.title || 'Ready to elevate?')}</h2>
                  <p className="text-neutral-400 font-details text-sm mb-6">{resolveText(block.data.subtitle || "Let's discuss how we can partner.")}</p>
                  <div className="flex justify-center">
                    <CTAButton href={block.data.buttonLink || '#contact'} variant="primary">
                      {resolveText(block.data.buttonText || 'Contact Us')}
                    </CTAButton>
                  </div>
                </div>
              </section>
            )
          case 'contact':
            return (
              <div key={index} id="contact">
                <ContactForm
                  title={resolveText(block.data.title || 'Get in Touch')}
                  subtitle={resolveText(block.data.subtitle || '')}
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
