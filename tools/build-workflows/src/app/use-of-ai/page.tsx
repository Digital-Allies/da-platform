import React from 'react'
import ClientPageWrapper from '@/components/site/ClientPageWrapper'
import { UseOfAI } from '@da-platform/design-system/components/UseOfAI'
import { getSiteSettings } from '@/lib/data'

export const metadata = {
  title: 'Use of AI Disclosure | Platform Compliance',
  description: 'Disclosure on how artificial intelligence is used across site development and content operations.',
}

export default async function UseOfAiPage() {
  const settings = await getSiteSettings()

  return (
    <ClientPageWrapper title="Use of AI Disclosure" subtitle="Transparency & Human Oversight">
      <UseOfAI
        businessName={settings.site_title}
        contactEmail={settings.email || undefined}
      />
    </ClientPageWrapper>
  )
}
