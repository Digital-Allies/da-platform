import React from 'react'

export const metadata = {
  title: 'AI Usage & Ethics Disclosure | Digital Allies Platform',
  description: 'Our policy and disclosures regarding artificial intelligence usage across platform content and workflows.',
}

export default function UseOfAiPage() {
  return (
    <main id="main-content" className="section bg-white min-h-screen py-16 px-6" role="main">
      <article className="max-w-4xl mx-auto prose-da">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--tok-font-heading, sans-serif)' }}>
          AI Usage & Ethics Disclosure
        </h1>
        <p className="text-sm text-neutral-600 mb-8 font-mono">Last Updated: July 26, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">1. Human Supervision & Verification</h2>
          <p className="mb-4">
            Digital Allies utilizes artificial intelligence (AI) to assist with technical development, code auditing, and draft assistance. All client code, technical decisions, and published materials undergo human review and verification.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">2. Data Privacy & Integrity</h2>
          <p className="mb-4">
            No sensitive client data or confidential personal information is used to train public machine learning models.
          </p>
        </section>
      </article>
    </main>
  )
}
