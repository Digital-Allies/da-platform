import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Digital Allies Platform',
  description: 'How we collect, protect, and process user information.',
}

export default function PrivacyPage() {
  return (
    <main id="main-content" className="section bg-white min-h-screen py-16 px-6" role="main">
      <article className="max-w-4xl mx-auto prose-da">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--tok-font-heading, sans-serif)' }}>
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-600 mb-8 font-mono">Last Updated: July 26, 2026</p>

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
      </article>
    </main>
  )
}
