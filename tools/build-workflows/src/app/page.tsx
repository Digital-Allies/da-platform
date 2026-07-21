import {
  Navigation,
  Hero,
  TwoColumn,
  ThreeColumnGrid,
  TestimonialCarousel,
  ContactForm,
  Footer,
  RevealOnScroll,
  BlockRenderer,
} from '@/components/site'
import SiteTheme from '@/components/site/SiteTheme'
import AtomicFindsHomepage from '@/components/site/atomic-finds/AtomicFindsHomepage'
import { getSiteSettings, getServices, getTestimonials, getPageBySlug, getProducts, getFeaturedReviews } from '@/lib/data'
import { ATOMIC_FINDS_CLIENT_ID } from '@/lib/theme'

export const revalidate = 60 // ISR — refresh every 60 seconds

export default async function HomePage() {
  // Atomic Finds ATX gets its own bespoke homepage (approved design,
  // Claude Design project 29110ac3) — bypasses the generic block renderer
  // below so layout can match that design exactly. See
  // AtomicFindsHomepage.tsx for why this client is special-cased.
  if (process.env.NEXT_PUBLIC_CLIENT_ID === ATOMIC_FINDS_CLIENT_ID) {
    const [products, reviews] = await Promise.all([getProducts(), getFeaturedReviews()])
    // SiteTheme still wraps this: it's what supplies the --tok-* variables
    // ProductGrid (a component shared across clients) depends on. The
    // page's own .af-homepage tokens layer on top for the bespoke sections.
    return (
      <SiteTheme clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
        <AtomicFindsHomepage products={products} reviews={reviews} />
      </SiteTheme>
    )
  }

  const [settings, services, testimonials, dynamicPage] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTestimonials(),
    getPageBySlug('home').then(res => res || getPageBySlug('index')),
  ])

  return (
    <SiteTheme clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Navigation
        logoUrl={settings.logo_url || undefined}
        siteTitle={settings.site_title}
        ctaText={settings.hero_cta_text || 'Get in Touch'}
        ctaHref={settings.hero_cta_link || '#contact'}
      />

      {dynamicPage ? (
        <main>
          <BlockRenderer blocks={dynamicPage.blocks} />
        </main>
      ) : (
        <main>
          <Hero
            title={settings.hero_title}
            subtitle={settings.hero_subtitle || undefined}
            ctaText={settings.hero_cta_text}
            ctaHref={settings.hero_cta_link}
          />

          {/* Services */}
          {services.length > 0 && (
            <RevealOnScroll>
              <div id="services">
                <ThreeColumnGrid
                  title="Services"
                  items={services}
                />
              </div>
            </RevealOnScroll>
          )}

          {/* About */}
          {settings.about_body && (
            <div id="about">
              <TwoColumn
                title={settings.about_title}
                body={settings.about_body}
                imageUrl={settings.about_image_url || undefined}
                imageAlt={`About ${settings.site_title}`}
                imageLeft
                accent
              />
            </div>
          )}

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <TestimonialCarousel testimonials={testimonials} />
          )}

          {/* Contact */}
          <ContactForm
            title="Get in Touch"
            subtitle={settings.phone ? `Call us at ${settings.phone} or fill out the form below.` : undefined}
          />
        </main>
      )}

      <Footer settings={settings} />
    </SiteTheme>
  )
}

