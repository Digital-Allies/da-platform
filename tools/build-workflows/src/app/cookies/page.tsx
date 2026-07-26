import React from 'react'

export const metadata = {
  title: 'Cookie Policy | Digital Allies Platform',
  description: 'Information about how cookies and local storage are used.',
}

export default function CookiesPage() {
  return (
    <main id="main-content" className="section bg-white min-h-screen py-16 px-6" role="main">
      <article className="max-w-4xl mx-auto prose-da">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--tok-font-heading, sans-serif)' }}>
          Cookie Policy
        </h1>
        <p className="text-sm text-neutral-600 mb-8 font-mono">Last Updated: July 26, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">1. Essential Cookies</h2>
          <p className="mb-4">
            We use essential session cookies for authentication, security, and storing language preferences (e.g. <code>NEXT_LOCALE</code>).
          </p>
        </section>
      </article>
    </main>
  )
}
