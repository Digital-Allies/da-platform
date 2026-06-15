'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { type Testimonial } from '@/lib/types'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  title?: string
}

export default function TestimonialCarousel({
  testimonials,
  title = 'What Our Clients Say',
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0)

  if (!testimonials.length) return null

  const current = testimonials[index]
  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section className="section bg-white">
      <div className="section-inner max-w-compact">
        <h2 className="section-title text-center mb-12">{title}</h2>

        <div className="relative">
          {/* Card */}
          <div className="border border-charcoal p-8 md:p-12 text-center">
            {/* Stars */}
            {current.rating > 0 && (
              <div className="flex justify-center gap-1 mb-5" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < current.rating ? 'var(--brand)' : 'none'}
                    stroke={i < current.rating ? 'var(--brand)' : '#ccc'}
                  />
                ))}
              </div>
            )}

            {/* Quote */}
            <blockquote className="text-base md:text-md text-charcoal italic leading-relaxed mb-6 max-w-2xl mx-auto">
              &ldquo;{current.content}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              {current.image_url && (
                <Image
                  src={current.image_url}
                  alt={current.author_name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              )}
              <div className="text-left">
                <p className="font-headline font-bold text-sm">{current.author_name}</p>
                {current.author_role && (
                  <p className="text-xs text-neutral-500">{current.author_role}</p>
                )}
              </div>
            </div>
          </div>

          {/* Nav */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prev}
                className="p-2 border border-charcoal hover:bg-neutral-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex gap-2" role="tablist">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => setIndex(i)}
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{ background: i === index ? 'var(--brand)' : '#D1D5DB' }}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 border border-charcoal hover:bg-neutral-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
