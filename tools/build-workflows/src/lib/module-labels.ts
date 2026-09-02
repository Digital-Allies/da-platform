// Client-facing module names for the shared admin.
//
// The admin/backend is ONE shared build across every tenant (see
// packages/design-system/PAGE_EDITOR_SPEC.md, "Module naming — generic by
// default, DA jargon only on DA's own tenant"). Digital Allies' own internal
// nicknames for these modules ("The Departments", "Field Notes", "The
// Command Center", "The Press Office", "The Workshop") are DA's own house
// style for DA's own admin instance — every other tenant (Atomic Finds ATX,
// Healthcare Training Center, future clients) must see the plain, generic
// name for the same module.
//
// This is a per-tenant label map over the same nav/module identity, not a
// fork: route paths, DB tables, and component names are unchanged — only
// the display string picked here differs.
import { DA_CLIENT_ID } from './theme'

export function isDigitalAlliesClient(clientId: string | null | undefined): boolean {
  return clientId === DA_CLIENT_ID
}

export const MODULE_LABELS = {
  services: { generic: 'Services', da: 'The Departments' },
  testimonials: { generic: 'Testimonials', da: 'Field Notes' },
  messages: { generic: 'Messages', da: 'The Command Center' },
  content: { generic: 'Blog', da: 'The Press Office' },
  development: { generic: 'Development', da: 'The Workshop' },
} as const

export type ModuleLabelKey = keyof typeof MODULE_LABELS

// Returns the label to display for `key`, given the current admin user's
// resolved client_id (see get-current-client.ts / client-context.tsx).
export function moduleLabel(key: ModuleLabelKey, clientId: string | null | undefined): string {
  const entry = MODULE_LABELS[key]
  return isDigitalAlliesClient(clientId) ? entry.da : entry.generic
}
