import React from 'react'
import ClientPageWrapper from '@/components/site/ClientPageWrapper'

export const metadata = {
  title: 'Terms of Service | Platform Compliance',
  description: 'Terms and conditions governing the use of the platform and client sites.',
}

export default function TermsPage() {
  return (
    <ClientPageWrapper title="Terms of Service" subtitle="Last Updated: July 26, 2026">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our websites and services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Use of Services & Content</h2>
        <p className="mb-4">
          All content, brand assets, product catalog listings, and intellectual property remain the property of their respective owners and client tenants.
        </p>
      </section>
    </ClientPageWrapper>
  )
}
