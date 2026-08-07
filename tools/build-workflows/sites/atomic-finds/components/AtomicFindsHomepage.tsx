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

import '../styles/atomic-finds.css'
import { type Product, type Review, type SiteSettings } from '@/lib/types'
import { resolveProductCta } from '@/lib/commerce'
import { Facebook, Instagram } from 'lucide-react'
import ProductGrid from '@/components/site/ProductGrid'
import Starfield from './Starfield'
import AtomicContactForm from './AtomicContactForm'
import AtomicNav from './AtomicNav'

const ASSET = '/atomic-finds'

const CURATORS = [
  {
    key: 'daisy', name: 'Daisy', role: 'The Laid-Back Tastemaker', roleEs: 'El Curador Relajado', img: `${ASSET}/aliens/alien-daisy.png`,
    bio: 'Curates lounge-worthy hero pieces — peacock chairs, loungers, anything with presence and comfort. "If it makes you exhale, it\'s the one."', bioEs: 'Cura piezas heroicas dignas de sala — sillas de pavo real, tumbones, cualquier cosa con presencia y comodidad. "Si te hace exhalar, es la indicada."',
  },
  {
    key: 'milo', name: 'Milo', role: 'The Detail Nerd', roleEs: 'El Geek de los Detalles', img: `${ASSET}/aliens/alien-milo.png`,
    bio: 'Curates craftsmanship-first finds — solid construction, quality materials, honest restorations with a story. "Hand-woven rattan, restored joints, built to outlast us both. I checked."', bioEs: 'Cura hallazgos enfocados en la artesanía — construcción sólida, materiales de calidad, restauraciones honestas con historia. "Rattan tejido a mano, juntas restauradas, construido para durar más que ambos. Lo verificué."',
  },
  {
    key: 'tatiana', name: 'Tatiana', role: 'The Bold One', roleEs: 'La Atrevida', img: `${ASSET}/aliens/alien-totiana.png`,
    bio: 'Curates sculptural showstoppers — high-drama silhouettes and pieces with serious character. "Play it safe? In this economy? No."', bioEs: 'Cura piezas escultóricas impresionantes — siluetas dramáticas y piezas con carácter serio. "¿Jugar seguro? ¿En esta economía? No."',
  },
  {
    key: 'malibu', name: 'Malibu', role: 'The Host With the Most', roleEs: 'La Anfitriona Suprema', img: `${ASSET}/aliens/alien-malibu.png`,
    bio: 'Curates entertaining & social pieces — bar carts, dining sets, seating built for company. "Picture it: friends, this cart, golden hour. You\'re welcome."', bioEs: 'Cura piezas de entretenimiento y sociales — carritos de bar, juegos de comedor, asientos construidos para compañía. "Imagínalo: amigos, este carrito, hora dorada. De nada."',
  },
]

const PROCESS_STEPS = [
  { icon: 'Search.png', num: '01', title: 'Browse & Select', titleEs: 'Explora y Selecciona', body: 'Every piece in the collection is hand-picked by Jennyfer from Austin estate sales, markets, and private collections. What you see is what exists — no warehouse stock.', bodyEs: 'Cada pieza en la colección es seleccionada a mano por Jennyfer de ventas de bienes raíces, mercados y colecciones privadas de Austin. Lo que ves es lo que existe — sin stock de almacén.' },
  { icon: 'restoration.png', num: '02', title: 'Restored with Care', titleEs: 'Restaurado con Cuidado', body: 'Each item is cleaned, photographed in natural light, and wrapped with archival tissue and moving blankets. Rattan is fragile; we treat it like the heirloom it is.', bodyEs: 'Cada artículo se limpia, fotografía a la luz natural y se envuelve con papel archival y mantas de mudanza. El rattan es frágil; lo tratamos como la herencia que es.' },
  { icon: 'delivery.png', num: '03', title: 'Local Austin Delivery', titleEs: 'Entrega Local en Austin', body: 'Delivered within the greater Austin metro — typically within 3–5 days of purchase. Carried in, placed where you want it, packaging taken away.', bodyEs: 'Entregado dentro del área metropolitana de Austin — típicamente dentro de 3–5 días de compra. Llevado adentro, colocado donde lo desees, embalaje retirado.' },
  { icon: 'Sustainability.png', num: '04', title: 'You Love It', titleEs: 'Te Encanta', body: "Every piece is backed by Jennyfer. If something arrives damaged or isn't as described, she'll make it right. No friction, no fine print.", bodyEs: "Cada pieza está respaldada por Jennyfer. Si algo llega dañado o no es como se describió, ella lo arreglará. Sin fricción, sin letra pequeña." },
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
  collections?: any[]
  pages?: Array<{ title: string; slug: string }>
  /** From settings.logo_url — falls back to the static brand mark when unset */
  logoUrl?: string
  settings?: SiteSettings
}

export default function AtomicFindsHomepage({ products, reviews, logoUrl, collections, pages = [], settings }: AtomicFindsHomepageProps) {
  const heroCta = products[0] ? resolveProductCta(products[0]) : null

  return (
    <div className="af-homepage">
      <Starfield />
      <div className="af-weave-fixed" />
      <div className="af-page">

        <AtomicNav logoUrl={logoUrl} pages={pages} />

        {/* HERO */}
        <section className="af-hero" id="home">
          <p className="af-hero-eyebrow" data-en="Far-out finds, down-to-earth prices." data-es="Hallazgos geniales, precios accesibles.">Far-out finds, down-to-earth prices.</p>
          <h1 data-en="Atomic Finds ATX" data-es="Hallazgos Atómicos ATX">Atomic Finds ATX</h1>
          <p className="af-hero-script" data-en="Vintage, Written in the Stars" data-es="Vintage, Escrito en las Estrellas">Vintage, Written in the Stars</p>
          <p className="af-hero-body" data-en="Explore authentic 1970s rattan and bamboo, restored in Austin for a new generation. Timeless design, built to last." data-es="Explora rattan y bambú auténtico de los años 70, restaurado en Austin para una nueva generación. Diseño atemporal, construido para durar.">Explore authentic 1970s rattan and bamboo, restored in Austin for a new generation. Timeless design, built to last.</p>
          <div className="af-hero-ctas">
            <a className="af-btn-solid" href="#shop">{heroCta ? `${heroCta.label} →` : 'Shop the Collection →'}</a>
            <a className="af-btn-outline" href="#process" data-en="How It Works" data-es="Cómo Funciona">How It Works</a>
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
              <span className="af-about-eyebrow" data-en="Our Story" data-es="Nuestra Historia">Our Story</span>
              <h2 data-en="What We Do" data-es="Lo Que Hacemos">What We Do</h2>
              <p>Atomic Finds ATX curates and restores vintage rattan &amp; bamboo furniture for the modern Austin home. Every piece is hand-sourced from estate sales, auctions, and private collectors, then brought back to life before it ever reaches the shop floor — no warehouses, no mass production, just real pieces with real history.</p>
              <div className="af-about-subhead" data-en="Meet Jennyfer" data-es="Conoce a Jennyfer">Meet Jennyfer</div>
              <p>Atomic Finds ATX is a one-woman operation, start to finish. Jennyfer sources every piece herself, then restores each one by hand.</p>
              <p>Her eye is the whole business: an instinct for the pieces worth saving, and the patience to bring 1970s rattan and bamboo back to life. No teams, no warehouses — just Jennyfer, a workshop, and a genuine love for mid-century craftsmanship.</p>
              <a className="af-btn-outline" href="#contact" data-en="Learn Our Story" data-es="Conoce Nuestra Historia">Learn Our Story</a>
            </div>
          </div>
        </section>

        {/* SHOP / COLLECTION */}
        <section className="af-section" id="shop" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow" data-en="Shop the Collection" data-es="Explora la Colección">Shop the Collection</p>
              <h2 className="af-section-title" data-en="The Collection" data-es="La Colección">The Collection</h2>
              <p style={{ fontSize: 18, color: '#ffffff', maxWidth: 560, margin: '16px auto 0' }} data-en="Curated rattan &amp; bamboo for modern living. Every piece is hand-picked, restored, and ready to adopt." data-es="Rattan y bambú curado para la vida moderna. Cada pieza está seleccionada a mano, restaurada y lista para adoptarse.">Curated rattan &amp; bamboo for modern living. Every piece is hand-picked, restored, and ready to adopt.</p>
            </div>
            <ProductGrid title="" products={products} collections={collections} />
          </div>
        </section>

        {/* THE CURATORS */}
        <section className="af-section" style={{ background: 'linear-gradient(180deg, #211C14 0%, #1E1E1E 55%, #16140F 100%)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow" data-en="Meet the Mascots" data-es="Conoce a las Mascotas">Meet the Mascots</p>
              <h2 className="af-section-title" data-en="The Curators" data-es="Los Curadores">The Curators</h2>
            </div>
            <div className="af-curators-grid">
              {CURATORS.map((c) => (
                <div className="af-curator-item" key={c.key}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.name} />
                  <div className="af-curator-name">{c.name}</div>
                  <div className="af-curator-role" data-en={c.role} data-es={c.roleEs}>{c.role}</div>
                  <div className="af-curator-bio" data-en={c.bio} data-es={c.bioEs}>{c.bio}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="af-section" id="process" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="af-section-inner">
            <div className="af-section-head">
              <p className="af-section-eyebrow" data-en="The Process" data-es="El Proceso">The Process</p>
              <h2 className="af-section-title" data-en="How We Deliver" data-es="Cómo Entregamos">How We Deliver</h2>
              <p style={{ fontSize: 18, color: '#ffffff', maxWidth: 560, margin: '16px auto 0' }} data-en="From estate sale to your living room — handled with the same care Jennyfer gives her own home." data-es="Desde la venta de la propiedad hasta tu sala de estar — manejado con el mismo cuidado que Jennyfer da a su propio hogar.">From estate sale to your living room — handled with the same care Jennyfer gives her own home.</p>
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
                      <div className="af-step-title" data-en={s.title} data-es={s.titleEs}>{s.title}</div>
                      <div className="af-step-body" data-en={s.body} data-es={s.bodyEs}>{s.body}</div>
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
              <p className="af-section-eyebrow" data-en="Customer Reviews" data-es="Reseñas de Clientes">Customer Reviews</p>
              <h2 className="af-section-title" data-en="What Austin Is Saying" data-es="Lo Que Austin Está Diciendo">What Austin Is Saying</h2>
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
              <p className="af-section-eyebrow" data-en="Get In Touch" data-es="Ponte en Contacto">Get In Touch</p>
              <h2 className="af-section-title" data-en="Find Us" data-es="Encuéntranos">Find Us</h2>
              <p className="af-section-script" data-en="we reply within 24 hours" data-es="Respondemos dentro de 24 horas">we reply within 24 hours</p>
            </div>
            <div className="af-contact-wrap">
              <div className="af-contact-cards">
                <div className="af-contact-card">
                  <div className="af-c-label" data-en="Based In" data-es="Ubicación">Based In</div>
                  <div className="af-c-value">{settings?.address || 'Austin, TX'}</div>
                  <div className="af-c-sub" data-en={settings?.phone ? `Phone: ${settings.phone}` : 'Local delivery only'} data-es={settings?.phone ? `Teléfono: ${settings.phone}` : 'Entrega local solamente'}>{settings?.phone ? `Phone: ${settings.phone}` : 'Local delivery only'}</div>
                </div>
                <div className="af-contact-card">
                  <div className="af-c-label" data-en="Hours" data-es="Horario">Hours</div>
                  <div className="af-c-value">{settings?.business_hours || 'By Appointment'}</div>
                  <div className="af-c-sub" data-en="Tue – Sat, 10am – 6pm" data-es="Mar – Sab, 10am – 6pm">Tue – Sat, 10am – 6pm</div>
                </div>
                <div className="af-contact-card">
                  <div className="af-c-label" data-en="Direct Contact" data-es="Contacto Directo">Direct Contact</div>
                  <div className="af-c-value">{settings?.email || 'Email Us'}</div>
                  <div className="af-c-sub" data-en={settings?.instagram_url ? '@atomicfindsatx' : 'We reply within 24h'} data-es={settings?.instagram_url ? '@atomicfindsatx' : 'Respondemos dentro de 24h'}>{settings?.instagram_url ? '@atomicfindsatx' : 'We reply within 24h'}</div>
                </div>
              </div>
              <AtomicContactForm />
              <div className="af-social-row">
                {settings?.facebook_url && (
                  <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
                    <Facebook size={24} />
                  </a>
                )}
                {settings?.instagram_url && (
                  <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
                    <Instagram size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FULL-WIDTH TEXT BAND */}
        <section className="af-text-band">
          <div className="af-text-band-title" data-en="Atomic Finds ATX" data-es="Hallazgos Atómicos ATX">Atomic Finds ATX</div>
        </section>

        {/* FOOTER */}
        <footer className="af-footer">
          <div className="af-footer-grid">
            <div>
              <a href="#home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="af-footer-logo" src={`${ASSET}/logos/logo-mark-new.png`} alt="Atomic Finds ATX" />
              </a>
              <p className="af-footer-script" data-en="where vintage meets digital" data-es="donde lo vintage se encuentra con lo digital">where vintage meets digital</p>
              <p className="af-footer-desc" data-en="Curated rattan &amp; bamboo for the modern home. Hand-picked and restored by Jennyfer, delivered with love across Austin, TX." data-es="Rattan y bambú curado para el hogar moderno. Seleccionado a mano y restaurado por Jennyfer, entregado con amor en Austin, TX.">Curated rattan &amp; bamboo for the modern home. Hand-picked and restored by Jennyfer, delivered with love across Austin, TX.</p>
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
              <h4>Legal</h4>
              <a className="af-footer-link" href="/privacy">Privacy Policy</a>
              <a className="af-footer-link" href="/terms">Terms of Service</a>
              <a className="af-footer-link" href="/cookies">Cookie Policy</a>
              <a className="af-footer-link" href="/accessibility">Accessibility</a>
              <a className="af-footer-link" href="/use-of-ai">Use of AI</a>
            </div>
          </div>
          <div className="af-footer-bottom">
            <div>© 2026 Atomic Finds ATX · Curated and restored by Jennyfer · Made with love in Austin, TX</div>
            <div className="af-footer-credit">
              Website made with love by <a href="https://digitalallies.net">Digital Allies</a> <span className="af-da-dot" aria-hidden="true" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
