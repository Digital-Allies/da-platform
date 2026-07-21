'use client'

// Fixed twinkling starfield background, ported from the design handoff's
// inline script. Generated client-side after mount (not SSR'd) so the
// per-star randomness never causes a hydration mismatch — it's purely
// decorative, so an empty first paint is fine.

import { useEffect, useState } from 'react'

interface Star {
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
  glow: boolean
}

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 90 }, () => {
        const size = Math.random() * 2.2 + 0.4
        return {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          delay: Math.random() * 8,
          duration: Math.random() * 5 + 3,
          opacity: Math.random() * 0.5 + 0.3,
          glow: size > 1.5,
        }
      })
    )
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#fff',
            opacity: s.opacity,
            boxShadow: s.glow ? '0 0 5px rgba(255,255,255,0.7)' : 'none',
            animation: `af-twinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes af-twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.95; } }
        @media (prefers-reduced-motion: reduce) {
          span { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
