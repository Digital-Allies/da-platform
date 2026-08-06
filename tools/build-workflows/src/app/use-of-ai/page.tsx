import React from 'react'
import ClientPageWrapper from '@/components/site/ClientPageWrapper'

export const metadata = {
  title: 'Use of AI Disclosure | Platform Compliance',
  description: 'Disclosure on how artificial intelligence is used across site development and content operations.',
}

export default function UseOfAiPage() {
  return (
    <ClientPageWrapper title="Use of AI Disclosure" subtitle="Transparency & Human Oversight">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Human Control & Oversight</h2>
        <p className="mb-4">
          Artificial intelligence tools are utilized to assist with initial code scaffolding, accessibility auditing, and layout design generation. All final code, content, and client site configurations undergo human review and verification.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Data Privacy & Integrity</h2>
        <p className="mb-4">
          No private client data or confidential database information is fed into public AI training models without explicit consent.
        </p>
      </section>
    </ClientPageWrapper>
  )
}
