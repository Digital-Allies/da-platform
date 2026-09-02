'use client'

// FAQ accordion block — net-new block type (see src/lib/section-registry.ts).
//
// Accessibility (WCAG 2.1 AA, AGENTS.md non-negotiables):
// - Each question is a real <button> (native Enter/Space activation, no
//   custom key handling needed for toggling).
// - aria-expanded reflects open state; aria-controls/id pair the trigger to
//   its panel.
// - Focus is never hidden — :focus-visible gets an explicit token-colored
//   ring instead of `outline: none`.
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqBlockData } from '@/lib/section-registry'

interface FaqBlockProps {
  data: FaqBlockData
  blockIndex?: number
}

export default function FaqBlock({ data, blockIndex = 0 }: FaqBlockProps) {
  const items = data?.items || []
  const [openIndex, setOpenIndex] = useState<number | null>(items.length > 0 ? 0 : null)

  if (!items.length) return null

  return (
    <section className="section" aria-label={data.title || 'Frequently asked questions'}>
      <div className="section-inner max-w-compact">
        {data.title && (
          <h2 className="section-title text-center mb-10" style={{ color: 'var(--tok-text)' }}>
            {data.title}
          </h2>
        )}
        <div style={{ borderTop: '1px solid var(--tok-border)' }}>
          {items.map((item, i) => {
            const isOpen = openIndex === i
            const buttonId = `faq-question-${blockIndex}-${i}`
            const panelId = `faq-answer-${blockIndex}-${i}`
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--tok-border)' }}>
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="faq-trigger"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      textAlign: 'left',
                      padding: '18px 4px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      font: 'inherit',
                      fontWeight: 600,
                      color: 'var(--tok-text)',
                      minHeight: '44px',
                    }}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        color: 'var(--tok-primary)',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 200ms ease',
                      }}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  style={{ padding: isOpen ? '0 4px 18px' : undefined, color: 'var(--tok-text-muted)', lineHeight: 1.6 }}
                >
                  {item.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* Visible focus ring — never suppress outline without a replacement (AGENTS.md a11y rule) */}
      <style>{`
        .faq-trigger:focus-visible {
          outline: 2px solid var(--tok-primary);
          outline-offset: -2px;
          border-radius: var(--tok-radius);
        }
      `}</style>
    </section>
  )
}
