import React from 'react'

export const metadata = {
  title: 'Terms of Service | Digital Allies Platform',
  description: 'Terms and conditions governing the use of the platform and client sites.',
}

export default function TermsPage() {
  return (
    <main id="main-content" className="section bg-white min-h-screen py-16 px-6" role="main">
      <article className="max-w-4xl mx-auto prose-da">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--tok-font-heading, sans-serif)' }}>
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-600 mb-8 font-mono">Last Updated: July 26, 2026</p>

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
      </article>
    </main>
  )
}
