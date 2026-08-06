import React from 'react'
import ClientPageWrapper from '@/components/site/ClientPageWrapper'

export const metadata = {
  title: 'Accessibility Statement | Platform Compliance',
  description: 'Our commitment to digital accessibility and WCAG 2.1 AA compliance.',
}

export default function AccessibilityPage() {
  return (
    <ClientPageWrapper title="Accessibility Statement" subtitle="WCAG 2.1 AA Conformance Target">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Our Commitment</h2>
        <p className="mb-4">
          We are committed to ensuring digital accessibility for people with disabilities. We continuously improve the user experience for everyone and apply the relevant WCAG 2.1 Level AA accessibility standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Accessibility Standards</h2>
        <p className="mb-4">
          All client site templates feature keyboard navigation support, high-contrast color ratios, semantic HTML headings, screen-reader landmark regions, and customizable focus indicators.
        </p>
      </section>
    </ClientPageWrapper>
  )
}
