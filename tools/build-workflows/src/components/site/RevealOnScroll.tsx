'use client'

import { useEffect, useRef } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
}

// Adds IntersectionObserver that toggles the .visible class on .reveal elements.
// Drop this once anywhere in the layout to activate scroll animations globally.
export default function RevealOnScroll({ children, className }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
