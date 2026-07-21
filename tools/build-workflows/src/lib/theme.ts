// ─── Per-client design tokens ───────────────────────────────────────────────
// The PUBLIC site themes from each client's OWN design system — never Digital
// Allies' (decision #7 in STATUS.md). The admin panel stays DA-branded; this
// layer is for the public renderer only.
//
// Source of truth per client: sites/<site>/CLAUDE.md in the monorepo.
// Add a new client by defining its tokens and mapping its client_id below.

export interface DesignTokens {
  name: string
  colors: {
    bg: string          // page background
    surface: string     // cards / raised surfaces
    text: string        // primary text
    textMuted: string   // secondary text
    primary: string     // primary accent / CTA
    secondary: string   // secondary accent / links
    border: string
  }
  fonts: {
    heading: string     // CSS font-family stack
    body: string
  }
  radius: string        // buttons / inputs
  radiusLg: string      // cards / feature panels
}

// Digital Allies — ruled-paper, square corners, Signal Red (sites/digitalallies/CLAUDE.md)
export const DA_TOKENS: DesignTokens = {
  name: 'Digital Allies',
  colors: {
    bg: '#F9F6F0', surface: '#FCFAED', text: '#2D2D2D', textMuted: '#6B6B6B',
    primary: '#C5301A', secondary: '#3A7BD5', border: '#2D2D2D',
  },
  fonts: { heading: "'Lexend Deca', system-ui, sans-serif", body: "'JetBrains Mono', ui-monospace, monospace" },
  radius: '0', radiusLg: '0',
}

// Healthcare Training Center — warm-credible, navy + teal (sites/healthcare-training-center/CLAUDE.md)
export const HCTC_TOKENS: DesignTokens = {
  name: 'Healthcare Training Center',
  colors: {
    bg: '#F4F6F9', surface: '#FFFFFF', text: '#10243D', textMuted: '#5B6B7F',
    primary: '#1E3A6E', secondary: '#2B8FA9', border: '#E2E8F0',
  },
  fonts: { heading: "'Montserrat', system-ui, sans-serif", body: "'Inter', system-ui, sans-serif" },
  radius: '8px', radiusLg: '16px',
}

// Atomic Finds ATX — celestial-70s dark, rattan + gold (sites/atomic-finds/CLAUDE.md,
// synced 2026-07-21 to the Claude Design system: Bagel Fat One replaced Lilita One,
// Pacifico is the script face — Tilda Script's only copy was a watermarked trial)
export const ATOMIC_TOKENS: DesignTokens = {
  name: 'Atomic Finds ATX',
  colors: {
    bg: '#1E1E1E', surface: '#2A2017', text: '#F0E8D8', textMuted: '#9A8F7D',
    primary: '#F5C842', secondary: '#D4822A', border: 'rgba(245,200,66,0.15)',
  },
  fonts: { heading: "'Bagel Fat One', 'DM Serif Display', Georgia, sans-serif", body: "'DM Sans', system-ui, sans-serif" },
  radius: '12px', radiusLg: '18px',
}

// Neutral fallback for an unknown client — deliberately NOT Digital Allies, so a
// client site can never accidentally wear DA's brand (decision #7).
export const NEUTRAL_TOKENS: DesignTokens = {
  name: 'Neutral',
  colors: {
    bg: '#FFFFFF', surface: '#F8FAFC', text: '#1E293B', textMuted: '#64748B',
    primary: '#0F766E', secondary: '#475569', border: '#E2E8F0',
  },
  fonts: { heading: 'system-ui, sans-serif', body: 'system-ui, sans-serif' },
  radius: '8px', radiusLg: '12px',
}

// Named client IDs — reused wherever code needs to branch per-client
// (e.g. page.tsx picking the Atomic Finds ATX bespoke homepage).
export const DA_CLIENT_ID = '3d76b896-e1fb-49f0-a8db-f62fdd5bc258'
export const HCTC_CLIENT_ID = '7896354c-1d34-4649-85f5-51f2e5a7df6c'
export const ATOMIC_FINDS_CLIENT_ID = '443936d5-f92e-480b-b206-c65cfb52bdfc'

// Map real Supabase client_id → tokens.
export const TOKENS_BY_CLIENT: Record<string, DesignTokens> = {
  [DA_CLIENT_ID]: DA_TOKENS,
  [HCTC_CLIENT_ID]: HCTC_TOKENS,
  [ATOMIC_FINDS_CLIENT_ID]: ATOMIC_TOKENS,
}

export function getDesignTokens(clientId: string | undefined): DesignTokens {
  if (!clientId) return NEUTRAL_TOKENS
  return TOKENS_BY_CLIENT[clientId] ?? NEUTRAL_TOKENS
}

// Turn a token set into CSS custom properties for the public site.
// Also sets `--brand` so existing components pick up the client's primary color.
export function tokensToCssVars(t: DesignTokens): Record<string, string> {
  return {
    '--tok-bg': t.colors.bg,
    '--tok-surface': t.colors.surface,
    '--tok-text': t.colors.text,
    '--tok-text-muted': t.colors.textMuted,
    '--tok-primary': t.colors.primary,
    '--tok-secondary': t.colors.secondary,
    '--tok-border': t.colors.border,
    '--tok-font-heading': t.fonts.heading,
    '--tok-font-body': t.fonts.body,
    '--tok-radius': t.radius,
    '--tok-radius-lg': t.radiusLg,
    '--brand': t.colors.primary,
  }
}
