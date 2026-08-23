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
  // Type scale + spacing scale, keyed freely (e.g. 'xs'..'4xl' / '1'..'24') —
  // whatever keys live in Supabase design_tokens.type_scale / .spacing for a
  // given client. tokensToCssVars() emits one --tok-text-<key> / --tok-space-<key>
  // per entry, so new keys "just work" without a code change.
  typeScale: Record<string, string>
  spacing: Record<string, string>
  // Asset URLs — not CSS vars. Consumers (Navigation/Footer/metadata) read
  // these directly off the resolved DesignTokens object.
  logo: string
  favicon: string
}

// Minimal shared fallback scales. Real values live in Supabase
// design_tokens.type_scale / .spacing (see e.g. Atomic Finds' seeded row) —
// these are only used until a client has its own design_tokens row, or for
// any key a client's row doesn't set.
const DEFAULT_TYPE_SCALE: Record<string, string> = {
  xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
  xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
}
const DEFAULT_SPACING: Record<string, string> = {
  '1': '4px', '2': '8px', '3': '12px', '4': '16px', '6': '24px',
  '8': '32px', '12': '48px', '16': '64px', '24': '96px',
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
  typeScale: DEFAULT_TYPE_SCALE, spacing: DEFAULT_SPACING, logo: '', favicon: '',
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
  typeScale: DEFAULT_TYPE_SCALE, spacing: DEFAULT_SPACING, logo: '', favicon: '',
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
  // Live design_tokens row for Atomic Finds already has real type_scale/spacing/
  // logo values seeded — these are just the pre-Supabase-row fallback.
  typeScale: DEFAULT_TYPE_SCALE, spacing: DEFAULT_SPACING,
  logo: '/atomic-finds/logos/logo-mark-new.png', favicon: '',
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
  typeScale: DEFAULT_TYPE_SCALE, spacing: DEFAULT_SPACING, logo: '', favicon: '',
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
  const vars: Record<string, string> = {
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

  // Type scale → --tok-text-<key> (e.g. --tok-text-xs .. --tok-text-4xl).
  // Keys come straight from design_tokens.type_scale, so a client can add a
  // new step (e.g. "5xl") purely as a data change — no code change needed.
  for (const [key, value] of Object.entries(t.typeScale ?? {})) {
    vars[`--tok-text-${key}`] = value
  }

  // Spacing scale → --tok-space-<key> (e.g. --tok-space-1 .. --tok-space-24).
  for (const [key, value] of Object.entries(t.spacing ?? {})) {
    vars[`--tok-space-${key}`] = value
  }

  return vars
}
