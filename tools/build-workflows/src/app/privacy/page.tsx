import React from 'react'
import ClientPageWrapper from '@/components/site/ClientPageWrapper'

export const metadata = {
  title: 'Privacy Policy | Platform Compliance',
  description: 'How we collect, protect, and process user information.',
}

export default function PrivacyPage() {
  return (
    <ClientPageWrapper title="Privacy Policy" subtitle="Last Updated: July 26, 2026">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
        <p className="mb-4">
          We collect contact form submissions (name, email, message) and basic analytics to operate and secure our client services. We do not sell personal data to third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Data Security</h2>
        <p className="mb-4">
          All data stored in Supabase is protected via Row-Level Security (RLS) policies and encrypted in transit and at rest.
        </p>
      </section>
    </ClientPageWrapper>
  )
}
