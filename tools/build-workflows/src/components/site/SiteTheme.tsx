// Applies a client's OWN design tokens to the public site as CSS variables.
// Public renderer only — the admin panel stays Digital Allies-branded (decision
// #7). Wrap public page content in this so each client's site looks like itself.
import type React from 'react'
import { getDesignTokens, tokensToCssVars } from '@/lib/theme'

export default function SiteTheme({
  clientId,
  children,
}: {
  clientId: string | undefined
  children: React.ReactNode
}) {
  const tokens = getDesignTokens(clientId)
  return (
    <div
      data-client-theme={tokens.name}
      style={{
        ...(tokensToCssVars(tokens) as React.CSSProperties),
        background: 'var(--tok-bg)',
        color: 'var(--tok-text)',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  )
}
