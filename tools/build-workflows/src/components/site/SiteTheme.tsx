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
      className="site-theme-scope"
      data-client-theme={tokens.name}
      style={{
        ...(tokensToCssVars(tokens) as React.CSSProperties),
        background: 'var(--tok-bg)',
        color: 'var(--tok-text)',
        fontFamily: 'var(--tok-font-body)',
        minHeight: '100vh',
      }}
    >
      {/* Headings adopt the client's heading font within the public scope */}
      <style>{`.site-theme-scope :where(h1,h2,h3,h4,h5,h6){font-family:var(--tok-font-heading)}`}</style>
      {children}
    </div>
  )
}
