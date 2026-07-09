'use client'

import { useEffect, useRef } from 'react'

/**
 * CelestialScrollHero — Atomic Finds signature scroll-scrubbed hero.
 *
 * A pinned, full-bleed image sequence: as the visitor scrolls, six 4:5 frames
 * crossfade while a continuous camera push-in zooms toward the subject's face —
 * she turns from gazing at the stars to meeting your eyes.
 *
 * This is the React port of the design-system HTML component
 * (`sites/atomic-finds/scroll-animation-hero-component/celestial-hero.html`).
 * Same smoothness engine: lerped progress + continuous zoom + snappy two-frame
 * dissolves + reduced-motion fallback.
 *
 * Frames must be full-bleed 4:5 photos (NOT transparent cutouts). Default srcs
 * expect the optimized frames copied to `public/{assetsBase}/frame-N.jpg`.
 */

export interface CelestialFrame {
  src: string
  alt: string
  /** vertical framing for object-fit: cover — wider shots sit lower, close-ups higher */
  y?: string
}

export interface CelestialScrollHeroProps {
  frames?: CelestialFrame[]
  /** number of viewport-heights of scroll the animation lasts (lower = faster) */
  screens?: number
  /** camera push-in zoom intensity, 0.15–0.5 */
  push?: number
  /** foreground rising haze */
  mist?: boolean
  mode?: 'hero' | 'about' | 'social'
  eyebrow?: string
  /** headline may contain a <br> — pass as a string with \n for the line break */
  headline?: string
  script?: string
  beat2?: string
  beat3?: string
  ctaText?: string
  ctaHref?: string
}

const DEFAULT_FRAMES: CelestialFrame[] = [
  { src: '/celestial-hero/frame-1.jpg', y: '48%', alt: 'The founder amid night clouds, holding a constellation disc to her temple, gazing out at the stars' },
  { src: '/celestial-hero/frame-2.jpg', y: '44%', alt: 'She begins to turn, the galaxy welling up behind her' },
  { src: '/celestial-hero/frame-3.jpg', y: '40%', alt: 'Three-quarter turn, closer now, constellation disc at her shoulder' },
  { src: '/celestial-hero/frame-4.jpg', y: '38%', alt: 'Closer still, nearly meeting your eyes' },
  { src: '/celestial-hero/frame-5.jpg', y: '36%', alt: 'Close-up, steady direct eye contact' },
  { src: '/celestial-hero/frame-6.jpg', y: '36%', alt: 'Close-up with a warm, welcoming smile' },
]

const smoother = (t: number) => {
  t = t < 0 ? 0 : t > 1 ? 1 : t
  return t * t * t * (t * (t * 6 - 15) + 10)
}
const band = (p: number, a: number, b: number) =>
  Math.min(Math.max((p - a) / (b - a), 0), 1)

export default function CelestialScrollHero({
  frames = DEFAULT_FRAMES,
  screens = 8,
  push = 0.34,
  mist = true,
  mode = 'hero',
  eyebrow = 'Atomic Finds ATX',
  headline = 'Vintage, written\nin the stars',
  script = 'handpicked under night skies',
  beat2 = 'Curated rattan & bamboo treasures, restored in Austin — and sent your way from across the galaxy.',
  beat3 = 'Every piece has a name, a past, and a place in your orbit.',
  ctaText = '[ Meet the Family ]',
  ctaHref = '#collection',
}: CelestialScrollHeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const framesRef = useRef<HTMLDivElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const beat1Ref = useRef<HTMLDivElement>(null)
  const beat2Ref = useRef<HTMLDivElement>(null)
  const beat3Ref = useRef<HTMLDivElement>(null)

  const screensClamped = Math.max(4, screens)
  const pushClamped = Math.min(0.6, Math.max(0.1, push))

  useEffect(() => {
    const root = rootRef.current
    const framesEl = framesRef.current
    if (!root || !framesEl) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const imgs = Array.from(framesEl.querySelectorAll<HTMLImageElement>('img'))

    const render = (p: number) => {
      const N = imgs.length
      // Continuous camera push-in (eased across the whole track)
      framesEl.style.transform = `scale(${(1 + smoother(p) * pushClamped).toFixed(4)})`

      // Snappy two-frame crossfade — hold, then dissolve in a narrow window
      const fpos = p * (N - 1)
      let i = Math.floor(fpos)
      if (i >= N - 1) i = N - 2
      if (i < 0) i = 0
      const f = smoother(Math.min(Math.max((fpos - i - 0.35) / 0.3, 0), 1))
      for (let k = 0; k < N; k++) {
        let o = k === i ? 1 - f : k === i + 1 ? f : 0
        if (p >= 1 && k === N - 1) o = 1
        imgs[k].style.opacity = String(o)
      }

      if (mist && mistRef.current) {
        mistRef.current.style.transform = `translateY(${(p * 16).toFixed(2)}%)`
        mistRef.current.style.opacity = Math.max(0, 0.8 - p * 1.3).toFixed(3)
      }

      const b1 = beat1Ref.current
      const b2 = beat2Ref.current
      const b3 = beat3Ref.current
      if (b1) {
        const o1 = 1 - band(p, 0.14, 0.3)
        b1.style.opacity = String(o1)
        b1.style.transform = `translateY(${(-p * 80).toFixed(1)}px)`
        b1.style.pointerEvents = o1 > 0.1 ? 'auto' : 'none'
      }
      if (b2) {
        b2.style.opacity = String(band(p, 0.4, 0.5) * (1 - band(p, 0.66, 0.74)))
        b2.style.transform = `translateY(${((1 - band(p, 0.4, 0.52)) * 22).toFixed(1)}px)`
      }
      if (b3) {
        const o3 = band(p, 0.8, 0.9)
        b3.style.opacity = String(o3)
        b3.style.transform = `translateY(${((1 - o3) * 26).toFixed(1)}px)`
        b3.style.pointerEvents = o3 > 0.5 ? 'auto' : 'none'
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = String(Math.min(Math.max(1 - p * 6, 0), 1))
      }
    }

    // Per-frame vertical framing (from the y prop)
    imgs.forEach((img) => {
      const y = img.getAttribute('data-cf-y')
      if (y) img.style.objectPosition = `50% ${y}`
    })

    if (reduced) {
      root.style.height = '100svh'
      framesEl.style.transform = `scale(${(1 + pushClamped).toFixed(3)})`
      imgs.forEach((img, k) => (img.style.opacity = k === imgs.length - 1 ? '1' : '0'))
      if (beat1Ref.current) beat1Ref.current.style.opacity = '0'
      if (beat2Ref.current) beat2Ref.current.style.opacity = '0'
      if (beat3Ref.current) {
        beat3Ref.current.style.opacity = '1'
        beat3Ref.current.style.pointerEvents = 'auto'
      }
      return
    }

    root.style.height = `${screensClamped * 100}vh`

    let smoothP = 0
    let running = false
    let inView = true
    let rafId = 0

    const progress = () => {
      const rect = root.getBoundingClientRect()
      const total = root.offsetHeight - window.innerHeight
      if (total <= 0) return 0
      return Math.min(Math.max(-rect.top / total, 0), 1)
    }

    const tick = () => {
      const target = progress()
      smoothP += (target - smoothP) * 0.12
      if (Math.abs(target - smoothP) < 0.0002) smoothP = target
      render(smoothP)
      if (inView || Math.abs(target - smoothP) > 0.0002) {
        rafId = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }
    const start = () => {
      if (running) return
      running = true
      rafId = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting
        if (inView) start()
      },
      { threshold: 0 }
    )
    io.observe(root)
    const onResize = () => {
      root.style.height = `${screensClamped * 100}vh`
      start()
    }
    window.addEventListener('resize', onResize)
    start()

    return () => {
      io.disconnect()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [frames, screensClamped, pushClamped, mist])

  const [line1, line2] = headline.split('\n')

  return (
    <>
      <style>{CF_CSS}</style>
      <section ref={rootRef} className="cf-hero" data-cf-mode={mode}>
        <div className="cf-hero__stage">
          <div className="cf-hero__canvas">
            <div ref={framesRef} className="cf-hero__frames">
              {frames.map((fr, idx) => (
                <img
                  key={idx}
                  src={fr.src}
                  alt={fr.alt}
                  data-cf-y={fr.y}
                  style={idx === 0 ? { opacity: 1 } : undefined}
                />
              ))}
            </div>

            {mist && <div ref={mistRef} className="cf-hero__mist" />}
            <div className="cf-hero__scrim" />

            <div className="cf-hero__beats">
              <div ref={beat1Ref} className="cf-hero__beat cf-hero__beat--1" style={{ opacity: 1 }}>
                <div className="cf-hero__panel">
                  {eyebrow && <div className="cf-hero__eyebrow">{eyebrow}</div>}
                  <h1 className="cf-hero__h1">
                    {line1}
                    {line2 && (
                      <>
                        <br />
                        {line2}
                      </>
                    )}
                  </h1>
                  {script && <div className="cf-hero__script">{script}</div>}
                </div>
              </div>

              <div ref={beat2Ref} className="cf-hero__beat cf-hero__beat--2">
                <p className="cf-hero__body">{beat2}</p>
              </div>

              <div ref={beat3Ref} className="cf-hero__beat cf-hero__beat--3">
                <p className="cf-hero__body">{beat3}</p>
                {ctaText && (
                  <a className="cf-hero__cta" href={ctaHref}>
                    {ctaText}
                  </a>
                )}
              </div>
            </div>

            <div ref={cueRef} className="cf-hero__cue">
              <span>Scroll</span>
              <i />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* Scoped CSS — mirrors the design-system HTML component. */
const CF_CSS = `
.cf-hero{--cf-ink:var(--bone-white,#F0E8D8);--cf-gold:var(--celestial-yellow,#F5C842);--cf-amber:var(--amber-orange,#D4822A);--cf-night:#121016;--cf-ease:var(--ease-out,cubic-bezier(0.16,1,0.3,1));--cf-font-display:var(--font-display,'Lilita One',cursive);--cf-font-script:var(--font-script,'Tilda Script','Brush Script MT',cursive);--cf-font-body:var(--font-body,'DM Sans',system-ui,sans-serif);position:relative;background:var(--cf-night);font-family:var(--cf-font-body);color:var(--cf-ink)}
.cf-hero,.cf-hero *{box-sizing:border-box}
.cf-hero__stage{position:sticky;top:0;height:100svh;overflow:hidden;background:var(--cf-night)}
.cf-hero:not([data-cf-mode="social"]) .cf-hero__canvas{position:absolute;inset:0}
.cf-hero__frames{position:absolute;inset:0;z-index:10;transform-origin:50% 38%;will-change:transform}
.cf-hero__frames img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 38%;opacity:0;will-change:opacity;-webkit-user-drag:none;user-select:none}
.cf-hero__scrim{position:absolute;inset:0;z-index:20;pointer-events:none;background:radial-gradient(120% 90% at 50% 42%,transparent 44%,rgba(18,16,22,0.34) 100%),linear-gradient(180deg,rgba(18,16,22,0.55) 0%,transparent 22%,transparent 55%,rgba(18,16,22,0.82) 100%)}
.cf-hero__mist{position:absolute;inset:-12% 0 0 0;z-index:30;pointer-events:none;opacity:.8;background:linear-gradient(180deg,rgba(18,16,22,0) 38%,rgba(18,16,22,0.5) 74%,rgba(18,16,22,0.96) 100%);will-change:transform,opacity}
.cf-hero__beats{position:absolute;inset:0;z-index:40}
.cf-hero__beat{position:absolute;opacity:0;will-change:opacity,transform}
.cf-hero__eyebrow{font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--cf-amber)}
.cf-hero__beat--1{inset:0;display:flex;align-items:center}
.cf-hero__beat--1 .cf-hero__panel{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:560px;padding:44px;margin-left:4vw;background:linear-gradient(90deg,rgba(18,16,22,0.55),rgba(18,16,22,0));border-radius:24px}
.cf-hero__h1{margin:0;font-family:var(--cf-font-display);font-weight:400;font-size:clamp(46px,5.4vw,84px);line-height:1.02;color:var(--cf-gold);text-shadow:0 0 22px rgba(245,200,66,0.5)}
.cf-hero__script{font-family:var(--cf-font-script);font-size:clamp(24px,2.6vw,38px);color:var(--cf-amber);text-shadow:0 0 12px rgba(212,130,42,0.55)}
.cf-hero__beat--2,.cf-hero__beat--3{left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;gap:24px;padding:0 24px 12vh;text-align:center}
.cf-hero__body{margin:0;max-width:640px;font-size:clamp(20px,2vw,28px);line-height:1.5;text-shadow:0 2px 20px rgba(18,16,22,0.92)}
.cf-hero__beat--3 .cf-hero__body{font-size:clamp(22px,2.2vw,32px);line-height:1.4}
.cf-hero__cta{display:inline-flex;align-items:center;gap:8px;padding:15px 30px;border:0;border-radius:999px;cursor:pointer;font-family:var(--cf-font-body);font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--cf-night);background:var(--cf-gold);box-shadow:0 0 16px rgba(245,200,66,0.5);transition:transform .3s var(--cf-ease),box-shadow .3s var(--cf-ease),background .3s var(--cf-ease);text-decoration:none}
.cf-hero__cta:hover{transform:translateY(-2px);box-shadow:0 0 30px rgba(245,200,66,0.65);background:#ffd766}
.cf-hero__cue{position:absolute;left:0;right:0;bottom:26px;z-index:50;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;will-change:opacity}
.cf-hero__cue span{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--cf-amber)}
.cf-hero__cue i{display:block;width:1px;height:34px;background:linear-gradient(180deg,var(--cf-gold),rgba(245,200,66,0));animation:cf-cue 2s var(--cf-ease) infinite}
@keyframes cf-cue{0%,100%{transform:translateY(0);opacity:.9}50%{transform:translateY(8px);opacity:.4}}
.cf-hero[data-cf-mode="social"] .cf-hero__stage{display:flex;align-items:center;justify-content:center;background:radial-gradient(120% 120% at 50% 30%,#241d2e 0%,#121016 70%)}
.cf-hero[data-cf-mode="social"] .cf-hero__canvas{position:relative;height:100svh;aspect-ratio:9/16;max-height:100svh;overflow:hidden;border-radius:18px;box-shadow:0 0 40px rgba(245,200,66,0.25)}
@media (prefers-reduced-motion:reduce){.cf-hero__mist,.cf-hero__cue{display:none}}
`
