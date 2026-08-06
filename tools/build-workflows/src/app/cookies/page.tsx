import React from 'react'
import ClientPageWrapper from '@/components/site/ClientPageWrapper'

export const metadata = {
  title: 'Cookie Policy | Platform Compliance',
  description: 'How cookies and local storage are utilized on client sites.',
}

export default function CookiesPage() {
  return (
    <ClientPageWrapper title="Cookie Policy" subtitle="Last Updated: July 26, 2026">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">1. Use of Cookies & Storage</h2>
        <p className="mb-4">
          We use essential cookies and local storage to remember user preferences (such as language selection and theme configuration) and maintain secure admin dashboard sessions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">2. Managing Preferences</h2>
        <p className="mb-4">
          You can clear or block cookies through your browser settings at any time. Essential cookies are required for administrative login and site theme functionality.
        </p>
      </section>
    </ClientPageWrapper>
  )
}
