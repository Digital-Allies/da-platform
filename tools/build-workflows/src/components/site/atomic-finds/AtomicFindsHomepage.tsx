// Atomic Finds ATX — full homepage, ported section-for-section from
// sites/atomic-finds/design_handoff_homepage/index.html (the approved
// design, Claude Design project 29110ac3). Matches that design as closely
// as this stack allows — the only intentional departure is CTA text, which
// resolves per-product through src/lib/commerce.ts's resolveProductCta()
// instead of the handoff's hard-coded "Add to Cart"/"View Details"
// (STATUS.md decision #8: flexible conversion layer).
//
// This is a bespoke page for this one client, not a generic block — it
// bypasses BlockRenderer so the layout can match the approved design
// exactly. Content that's genuinely dynamic (products, reviews) is fetched
// and passed in; content that's fixed brand copy (curators, process steps,
// About/Meet Jennyfer bio) is real copy from the design handoff, not
// placeholder text.

import '@/styles/atomic-finds.css'
import { type Product, type Review } from '@/lib/types'
import { resolveProductCta } from '@/lib/commerce'
import ProductGrid from '@/components/site/ProductGrid'
import GalaxyCard from '@/components/site/GalaxyCard'
import Starfield from './Starfield'
import AtomicContactForm from './AtomicContactForm'
import AtomicNav from './AtomicNav'

const ASSET = '/atomic-finds'

const CURATORS = [
  {
    key: 'daisy', name: 'Daisy', role: 'The Laid-Back Tastemaker', img: `${ASSET}/aliens/alien-daisy.png`,
    bio: 'Curates lounge-worthy hero pieces — peacock chairs, loungers, anything with presence and comfort. "If it makes you exhale, it\'s the one."',
  },
  {
    key: 'milo', name: 'Milo', role: 'The Detail Nerd', img: `${ASSET}/aliens/alien-milo.png`,
    bio: 'Curates craftsmanship-first finds — solid construction, quality materials, honest restorations with a story. "Hand-woven rattan, restored joints, built to outlast us both. I checked."',
  },
  {
    key: 'tatiana', name: 'Tatiana', role: 'The Bold One', img: `${ASSET}/aliens/alien-totiana.png`,
    bio: 'Curates sculptural showstoppers — high-drama silhouettes and pieces with serious character. "Play it safe? In this economy? No."',
  },
  {
    key: 'malibu', name: 'Malibu', role: 'The Host With the Most', img: `${ASSET}/aliens/alien-malibu.png`,
    bio: 'Curates entertaining & social pieces — bar carts, dining sets, seating built for company. "Picture it: friends, this cart, golden hour. You\'re welcome."',
  },
]

const PROCESS_STEPS = [
  { icon: 'Search.png', num: '01', title: 'Browse & Select', body: 'Every piece in the collection is hand-picked by Jennyfer from Austin estate sales, markets, and private collections. What you see is what exists — no warehouse stock.' },
  { icon: 'restoration.png', num: '02', title: 'Restored with Care', body: 'Each item is cleaned, photographed in natural light, and wrapped with archival tissue and moving blankets. Rattan is fragile; we treat it like the heirloom it is.' },
  { icon: 'delivery.png', num: '03', title: 'Local Austin Delivery', body: 'Delivered within the greater Austin metro — typically within 3–5 days of purchase. Carried in, placed where you want it, packaging taken away.' },
  { icon: 'Sustainability.png', num: '04', title: 'You Love It', body: "Every piece is backed by Jennyfer. If something arrives damaged or isn't as described, she'll make it right. No friction, no fine print." },
]

const NEBULA_BACKGROUNDS = [`${ASSET}/patterns/nebula-ochre.webp`, `${ASSET}/patterns/nebula-violet.webp`, `${ASSET}/patterns/nebula-cosmos.webp`]

function initialsOf(name: string) {
  return name.trim().charAt(0).toUpperCase() || '?'
}

function formatReviewDate(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

interface AtomicFindsHomepageProps {
  products: Product[]
  reviews: Review[]
  /** From settings.logo_url — falls back to the static brand mark when unset */
  logoUrl?: string
}

export default function AtomicFindsHomepage({ products, reviews, logoUrl }: AtomicFindsHomepageProps) {
  // Temporary: photo-less featured products fall back to a "coming soon" state
  // that doesn't work for the Galaxy Card's hero-image treatment — skip them
  // until real photography is in, same rule as ProductGrid's standard cards.
  const featured = products.filter((p) => p.badge === 'featured' && p.image_url).slice(0, 3)
  const heroCta = products[0] ? resolveProductCta(products[0]) : null

  return (
    <div className="af-homepage">
      <Starfield />
      <div className="af-weave-fixed" />
      <div className="af-page">

        <AtomicNav logoUrl={logoUrl} />

        {/* HERO */}
        <section className="af-hero" id="home">
          <p className="af-hero-eyebrow">Far-out finds, down-to-earth prices.</p>
          <h1>Atomic Finds ATX</h1>
          <p className="af-hero-script">Vintage, Written in the Stars</p>
          <p className="af-hero-body">Explore authentic 1970s rattan and bamboo, restored in Austin for a new generation. Timeless design, built to last.</p>
          <div className="af-hero-ctas">
            <a className="af-btn-solid" href="#shop">{heroCta ? `${heroCta.label} →` : 'Shop the Collection →'}</a>
            <a className="af-btn-outline" href="#process">How It Works</a>
          </div>
        </section>

        {/* ABOUT / MEET JENNYFER */}
        <section className="af-section" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="af-section-inner af-about-grid">
            <div className="af-about-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${ASSET}/team/jennyfer-gomez-atx.webp`} alt="Jennyfer Gomez" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <span className="af-about-eyebrow">Our Story</span>
              <h2>What We Do</h2>
              <p>Atomic Finds ATX curates and restores vintage rattan &amp; bamboo furniture for the modern Austin home. Every piece is hand-sourced from estate sales, auctions, and private collectors, then brought back to life before it ever reaches the shop floor — no warehouses, no mass production, just real pieces with real history.</p>
              <div className="af-about-subhead">Meet Jennyfer</div>
              <p>Atomic Finds ATX is a one-woman operation, start to finish. Jennyfer sources every piece herself, then restores each one by hand.</p>
              <p>Her eye is the whole business: an instinct for the pieces worth saving, and the patience to bring 1970s rattan and bamboo back to life. No teams, no warehouses — just Jennyfer, a workshop, and a genuine love for mid-century craftsmanship.</p>
              <a className="af-btn-outline" href="#contact">Learn Our Story</a>
            </div>
          </div>
        </section>

        {/* SHOP / COLLECTION */}
        <section className="af-section" id="shop" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow">Shop the Collection</p>
              <h2 className="af-section-title">The Collection</h2>
              <p style={{ fontSize: 18, color: '#ffffff', maxWidth: 560, margin: '16px auto 0' }}>Curated rattan &amp; bamboo for modern living. Every piece is hand-picked, restored, and ready to adopt.</p>
            </div>
            <ProductGrid title="" products={products} />
          </div>
        </section>

        {/* THE CURATORS */}
        <section className="af-section" style={{ background: 'linear-gradient(180deg, #211C14 0%, #1E1E1E 55%, #16140F 100%)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow">Meet the Mascots</p>
              <h2 className="af-section-title">The Curators</h2>
            </div>
            <div className="af-curators-grid">
              {CURATORS.map((c) => (
                <div className="af-curator-item" key={c.key}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.name} />
                  <div className="af-curator-name">{c.name}</div>
                  <div className="af-curator-role">{c.role}</div>
                  <div className="af-curator-bio">{c.bio}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED GALAXY CARDS */}
        <section className="af-section" id="featured" style={{ background: 'linear-gradient(180deg, #16140F 0%, #1a160f 100%)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow">✦ Featured Products ✦</p>
              <h2 className="af-section-title">In the Spotlight</h2>
              <p className="af-section-script">click to explore each piece</p>
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--amber-orange)', maxWidth: 560, margin: '16px auto 0' }}>Vintage rattan that has already outlasted three generations of trends. Built for another 50 years.</p>
            </div>
            <div className="af-featured-root">
              {featured.map((p, i) => (
                <GalaxyCard key={p.id} product={p} bg={NEBULA_BACKGROUNDS[i % NEBULA_BACKGROUNDS.length]} />
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="af-section" id="process" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow">The Process</p>
              <h2 className="af-section-title">How We Deliver</h2>
              <p style={{ fontSize: 18, color: '#ffffff', maxWidth: 560, margin: '16px auto 0' }}>From estate sale to your living room — handled with the same care Jennyfer gives her own home.</p>
            </div>
            <div className="af-process-grid">
              <div>
                {PROCESS_STEPS.map((s, i) => (
                  <div className="af-step" key={s.num} style={i === PROCESS_STEPS.length - 1 ? { marginBottom: 0 } : undefined}>
                    <div className="af-step-icon">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${ASSET}/icons/${s.icon}`} alt="" />
                    </div>
                    <div>
                      <div className="af-step-num">{s.num}</div>
                      <div className="af-step-title">{s.title}</div>
                      <div className="af-step-body">{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="af-delivery-card">
                <div className="af-delivery-head">
                  <div className="af-step-icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${ASSET}/icons/Made in Austin.png`} alt="" />
                  </div>
                  <div>
                    <div className="af-step-title" style={{ margin: '0 0 4px' }}>Austin Metro Delivery</div>
                    <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--amber-orange)' }}>3–5 days · White-glove · Free over $100</div>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: '#ffffff', lineHeight: 1.7 }}>Jennyfer doesn&apos;t drop it at the curb — she brings it inside, positions it where you want it, and hauls away all the packaging. If you&apos;re not thrilled, she&apos;ll make it right.</p>
                <div className="af-delivery-stats">
                  <div className="af-delivery-stat"><b>3–5</b><span>Day delivery</span></div>
                  <div className="af-delivery-stat"><b>100%</b><span>Satisfaction</span></div>
                  <div className="af-delivery-stat"><b>ATX</b><span>Local only</span></div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="af-delivery-truck-big" src={`${ASSET}/icons/delivery.png`} alt="Local Austin delivery" />
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="af-section" id="reviews" style={{ background: 'linear-gradient(180deg, #16140F 0%, #1a160f 100%)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow">Customer Reviews</p>
              <h2 className="af-section-title">What Austin Is Saying</h2>
              <p className="af-section-script">5.0 ★ — {reviews.length > 0 ? `${reviews.length}+ ` : ''}reviews</p>
            </div>
            <div className="af-reviews-grid">
              {reviews.map((r) => (
                <div className="af-review-card" key={r.id}>
                  <div className="af-review-top">
                    <div className="af-review-avatar">{initialsOf(r.reviewer_name)}</div>
                    <div>
                      <div className="af-review-name">{r.reviewer_name}</div>
                      <div className="af-review-stars">★★★★★</div>
                      <div className="af-review-meta">{formatReviewDate(r.review_date)}</div>
                    </div>
                  </div>
                  {r.text && <p className="af-review-text">&quot;{r.text}&quot;</p>}
                  {r.notable_tags.length > 0 && <div className="af-review-tags">{r.notable_tags.join(' · ')}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="af-section" id="contact" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow">Get In Touch</p>
              <h2 className="af-section-title">Find Us</h2>
              <p className="af-section-script">we reply within 24 hours</p>
            </div>
            <div className="af-contact-wrap">
              <div className="af-contact-cards">
                <div className="af-contact-card"><div className="af-c-label">Based In</div><div className="af-c-value">Austin, TX</div><div className="af-c-sub">Local delivery only</div></div>
                <div className="af-contact-card"><div className="af-c-label">Hours</div><div className="af-c-value">By Appointment</div><div className="af-c-sub">Tue – Sat, 10am – 6pm</div></div>
                <div className="af-contact-card"><div className="af-c-label">Social</div><div className="af-c-value">Instagram</div><div className="af-c-sub">@atomicfindsatx</div></div>
              </div>
              <AtomicContactForm />
              <div className="af-social-row"><a href="#">Facebook</a><a href="#">Instagram</a></div>
            </div>
          </div>
        </section>

        {/* FULL-WIDTH TEXT BAND */}
        <section className="af-text-band">
          <div className="af-text-band-title">Atomic Finds ATX</div>
        </section>

        {/* FOOTER */}
        <footer className="af-footer">
          <div className="af-footer-grid">
            <div>
              <a href="#home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="af-footer-logo" src={`${ASSET}/logos/logo-mark-new.png`} alt="Atomic Finds ATX" />
              </a>
              <p className="af-footer-script">where vintage meets digital</p>
              <p className="af-footer-desc">Curated rattan &amp; bamboo for the modern home. Hand-picked and restored by Jennyfer, delivered with love across Austin, TX.</p>
            </div>
            <div className="af-footer-col">
              <h4>Shop</h4>
              <a className="af-footer-link" href="#shop">The Collection</a>
              <a className="af-footer-link" href="#shop">Chairs</a>
              <a className="af-footer-link" href="#shop">Shelving</a>
              <a className="af-footer-link" href="#shop">Lighting</a>
            </div>
            <div className="af-footer-col">
              <h4>About</h4>
              <a className="af-footer-link" href="#home">Our Story</a>
              <a className="af-footer-link" href="#process">How We Source</a>
              <a className="af-footer-link" href="#process">Local Delivery</a>
              <a className="af-footer-link" href="#contact">FAQ</a>
            </div>
            <div className="af-footer-col">
              <h4>Connect</h4>
              <a className="af-footer-link" href="#">Facebook</a>
              <a className="af-footer-link" href="#">Instagram</a>
              <a className="af-footer-link" href="#reviews">Reviews</a>
              <a className="af-footer-link" href="#contact">Contact Us</a>
            </div>
          </div>
          <div className="af-footer-bottom">
            <div>© 2026 Atomic Finds ATX · Curated and restored by Jennyfer · Made with love in Austin, TX</div>
            <div className="af-footer-credit">
              Website made with love by <a href="https://digitalallies.com">Digital Allies</a> <span className="af-da-dot" aria-hidden="true" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
