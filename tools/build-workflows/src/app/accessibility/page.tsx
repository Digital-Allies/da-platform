import React from 'react'

export const metadata = {
  title: 'Accessibility Statement | WCAG 2.1 AA Compliance',
  description: 'Our commitment to digital accessibility in compliance with WCAG 2.1 AA standards.',
}

export default function AccessibilityPage() {
  return (
    <main id="main-content" className="section bg-white min-h-screen py-16 px-6" role="main">
      <article className="max-w-4xl mx-auto prose-da">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--tok-font-heading, sans-serif)' }}>
          Accessibility Statement
        </h1>
        <p className="text-sm text-neutral-600 mb-8 font-mono">
          Last Updated: July 26, 2026 · Standard: WCAG 2.1 Level AA
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Our Commitment to Accessibility</h2>
          <p className="mb-4">
            Digital Allies and its platform clients are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards, specifically <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Measures Supported</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Contrast Ratios:</strong> Minimum 4.5:1 contrast ratio for all standard body text and 3:1 for large text/UI components.</li>
            <li><strong>Keyboard Navigation:</strong> Logical tab navigation and high-visibility focus indicators across all interactive controls.</li>
            <li><strong>Screen Reader Compatibility:</strong> Proper HTML5 semantic landmarks (<code>main</code>, <code>nav</code>, <code>contentinfo</code>) and descriptive ARIA labels.</li>
            <li><strong>Text Scalability:</strong> Full support for browser zoom and text resizing without breaking layout integrity.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Feedback & Contact</h2>
          <p className="mb-4">
            We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers, please let us know:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Email:</strong> <a href="mailto:support@digitalallies.net" className="underline text-amber-700">support@digitalallies.net</a></li>
            <li><strong>Response Time:</strong> We aim to respond to accessibility inquiries within 2 business days.</li>
          </ul>
        </section>
      </article>
    </main>
  )
}
