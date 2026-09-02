import React from 'react'
import ClientPageWrapper from '@/components/site/ClientPageWrapper'
import { AccessibilityStatement } from '@da-platform/design-system/components/AccessibilityStatement'
import { getSiteSettings } from '@/lib/data'

export const metadata = {
  title: 'Accessibility Statement | Platform Compliance',
  description: 'Our commitment to digital accessibility and WCAG 2.1 AA compliance.',
}

export default async function AccessibilityPage() {
  const settings = await getSiteSettings()

  return (
    <ClientPageWrapper title="Accessibility Statement" subtitle="WCAG 2.1 AA Conformance Target">
      <AccessibilityStatement
        businessName={settings.site_title}
        contactEmail={settings.email || undefined}
      />
    </ClientPageWrapper>
  )
}
