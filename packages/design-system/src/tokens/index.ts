/**
 * Digital Allies CMS - Shared Design Tokens
 * Single source of truth for color palettes, typography, spacing, and CSS custom properties.
 */

export interface ColorToken {
  hex: string;
  cssVar: string;
  label: string;
}

export interface ClientThemeTokens {
  clientId: string;
  clientSlug: string;
  clientName: string;
  colors: {
    primary: ColorToken;
    accent: ColorToken;
    bg: ColorToken;
    surface: ColorToken;
    fgBody: ColorToken;
    fgMuted: ColorToken;
  };
  typography: {
    fontHeader: string;
    fontBody: string;
  };
}

export const DEFAULT_TOKENS: Record<string, ClientThemeTokens> = {
  'digital-allies': {
    clientId: 'digital-allies',
    clientSlug: 'digitalallies',
    clientName: 'Digital Allies',
    colors: {
      primary: { hex: '#B7791F', cssVar: '--tok-primary', label: 'Primary Gold' },
      accent: { hex: '#C5301A', cssVar: '--tok-accent', label: 'Signal Red' },
      bg: { hex: '#F9F6F0', cssVar: '--tok-bg', label: 'Bone White' },
      surface: { hex: '#FFFFFF', cssVar: '--tok-surface', label: 'Pure White' },
      fgBody: { hex: '#2D2D2D', cssVar: '--tok-fg-body', label: 'Charcoal Body' },
      fgMuted: { hex: '#6B6B6B', cssVar: '--tok-fg-muted', label: 'Muted Gray' },
    },
    typography: {
      fontHeader: "'Lexend Deca', sans-serif",
      fontBody: "'JetBrains Mono', monospace",
    },
  },
  'atomic-finds': {
    clientId: '443936d5-f92e-480b-b206-c65cfb52bdfc',
    clientSlug: 'atomic-finds',
    clientName: 'Atomic Finds ATX',
    colors: {
      primary: { hex: '#E06D53', cssVar: '--tok-primary', label: 'Retro Terracotta' },
      accent: { hex: '#F4B942', cssVar: '--tok-accent', label: 'Atomic Gold' },
      bg: { hex: '#1C1C1E', cssVar: '--tok-bg', label: 'Vintage Charcoal' },
      surface: { hex: '#2C2C2E', cssVar: '--tok-surface', label: 'Surface Gray' },
      fgBody: { hex: '#F2F2F7', cssVar: '--tok-fg-body', label: 'Warm White' },
      fgMuted: { hex: '#A1A1A6', cssVar: '--tok-fg-muted', label: 'Mid Gray' },
    },
    typography: {
      fontHeader: "'Bagel Fat One', cursive, sans-serif",
      fontBody: "'DM Sans', sans-serif",
    },
  },
  'healthcare-training-center': {
    clientId: '7896354c-1d34-4649-85f5-51f2e5a7df6c',
    clientSlug: 'healthcare-training-center',
    clientName: 'Healthcare Training Center',
    colors: {
      primary: { hex: '#0066CC', cssVar: '--tok-primary', label: 'Clinical Blue' },
      accent: { hex: '#00A86B', cssVar: '--tok-accent', label: 'Medical Green' },
      bg: { hex: '#F8FAFC', cssVar: '--tok-bg', label: 'Clean Slate' },
      surface: { hex: '#FFFFFF', cssVar: '--tok-surface', label: 'White' },
      fgBody: { hex: '#1E293B', cssVar: '--tok-fg-body', label: 'Slate Dark' },
      fgMuted: { hex: '#64748B', cssVar: '--tok-fg-muted', label: 'Slate Muted' },
    },
    typography: {
      fontHeader: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
    },
  },
};

/**
 * Generate standard CSS custom properties string from client theme tokens
 */
export function generateCssVariables(tokens: ClientThemeTokens): string {
  return `
    :root {
      --tok-primary: ${tokens.colors.primary.hex};
      --tok-accent: ${tokens.colors.accent.hex};
      --tok-bg: ${tokens.colors.bg.hex};
      --tok-surface: ${tokens.colors.surface.hex};
      --tok-fg-body: ${tokens.colors.fgBody.hex};
      --tok-fg-muted: ${tokens.colors.fgMuted.hex};
      --tok-font-header: ${tokens.typography.fontHeader};
      --tok-font-body: ${tokens.typography.fontBody};
    }
  `.trim();
}
