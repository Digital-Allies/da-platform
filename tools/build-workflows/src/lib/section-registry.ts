// SECTION_REGISTRY — single source of truth for "what page-builder block
// types exist and what they're called."
//
// Implements the pattern proposed in
// packages/design-system/PAGE_EDITOR_SPEC.md ("Component registry pattern"),
// reconciled against the real data shape already live in BlockRenderer.tsx:
// `pages.blocks` is a jsonb array of `{ type, data, customCode? }`, not the
// normalized `Section` rows the spec's first draft assumed.
//
// Consumers:
// - BlockRenderer.tsx (public site) — looks up `SECTION_REGISTRY[block.type]`
//   to decide whether a block type is valid at all, and renders net-new
//   types through `PublicBlock`. The 7 original types keep their existing,
//   unmodified JSX inline in BlockRenderer for zero behavior change; this
//   registry is what makes "does this type exist" and "what's it called"
//   centrally defined instead of duplicated in a second hardcoded list.
// - PagesClient.tsx (admin "add block" picker + content-tab form) — sources
//   its block-type list, per-type default content, and per-type editing UI
//   from this same registry.
//
// Adding a new block type = one entry here, not a new branch in two
// different files.
import type { ComponentType } from 'react'
import { z } from 'zod'
import FaqBlock from '@/components/site/FaqBlock'
import StatsBlock from '@/components/site/StatsBlock'
import QuoteBlock from '@/components/site/QuoteBlock'
import MediaBlock from '@/components/site/MediaBlock'
import FaqAdminForm from '@/components/admin/FaqAdminForm'
import StatsAdminForm from '@/components/admin/StatsAdminForm'

// ─── Admin form field descriptors ───────────────────────────────────────────
// For block types whose `data` is a flat set of scalar strings, PagesClient
// renders a generic form from this descriptor list instead of a hardcoded
// `block.type === '...'` branch. Types with repeatable sub-items (faq, stats)
// provide a full `AdminForm` component instead (see below).
export interface SectionAdminField {
  key: string
  label: string
  kind: 'text' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
}

export interface SectionRegistryEntry<T = any> {
  /** Human label shown in the admin "add block" picker and block list. */
  label: string
  /** Zod schema describing this block type's `data` shape. */
  schema: z.ZodTypeAny
  /** Starter `data` used when a new block of this type is added. */
  defaultContent: T
  /**
   * Renders the block on the public site. Optional for the 7 original block
   * types (hero/richtext/services/products/testimonials/cta/contact) — their
   * rendering stays inline in BlockRenderer.tsx to guarantee zero visual
   * change for existing tenants. Required in practice for every net-new type.
   */
  // blockIndex: this block's position in the page's blocks array — pass
  // through to any DOM ids a block generates (e.g. FaqBlock's per-item
  // aria-controls ids) so two instances of the same block type on one page
  // don't collide on duplicate ids.
  PublicBlock?: ComponentType<{ data: T; blockIndex?: number }>
  /** Generic admin field list (flat scalar `data`, no repeatable items). */
  adminFields?: SectionAdminField[]
  /** Full custom admin editor, for block types with repeatable sub-items. */
  AdminForm?: ComponentType<{ data: T; onChange: (data: T) => void }>
}

// ─── faq ─────────────────────────────────────────────────────────────────
export const FaqItemSchema = z.object({
  question: z.string().default(''),
  answer: z.string().default(''),
})
export const FaqBlockSchema = z.object({
  title: z.string().optional().default(''),
  items: z.array(FaqItemSchema).default([]),
})
export type FaqBlockData = z.infer<typeof FaqBlockSchema>

// ─── stats ───────────────────────────────────────────────────────────────
export const StatItemSchema = z.object({
  value: z.string().default(''),
  label: z.string().default(''),
})
export const StatsBlockSchema = z.object({
  title: z.string().optional().default(''),
  stats: z.array(StatItemSchema).default([]),
})
export type StatsBlockData = z.infer<typeof StatsBlockSchema>

// ─── quote ───────────────────────────────────────────────────────────────
export const QuoteBlockSchema = z.object({
  quote: z.string().default(''),
  attribution: z.string().optional().default(''),
})
export type QuoteBlockData = z.infer<typeof QuoteBlockSchema>

// ─── media ───────────────────────────────────────────────────────────────
// `alt` is required (non-empty) specifically for the image case — a video
// only benefits from alt/aria text, it doesn't need it structurally the way
// an <img>/next/image does for screen readers.
export const MediaBlockSchema = z.discriminatedUnion('mediaType', [
  z.object({
    mediaType: z.literal('image'),
    src: z.string().default(''),
    alt: z.string().min(1, 'Alt text is required for image media blocks'),
    caption: z.string().optional().default(''),
  }),
  z.object({
    mediaType: z.literal('video'),
    src: z.string().default(''),
    alt: z.string().optional().default(''),
    caption: z.string().optional().default(''),
  }),
])
export type MediaBlockData = z.infer<typeof MediaBlockSchema>

// ─── the 7 existing types (schemas only — rendering stays in BlockRenderer) ─
const HeroBlockSchema = z.object({
  title: z.string().optional().default(''),
  subtitle: z.string().optional().default(''),
  ctaText: z.string().optional().default(''),
  ctaLink: z.string().optional().default(''),
}).passthrough()

const RichtextBlockSchema = z.object({
  content: z.string().optional().default(''),
}).passthrough()

const ServicesBlockSchema = z.object({
  title: z.string().optional().default(''),
}).passthrough()

const ProductsBlockSchema = z.object({
  title: z.string().optional().default(''),
}).passthrough()

const TestimonialsBlockSchema = z.object({
  title: z.string().optional().default(''),
}).passthrough()

const CtaBlockSchema = z.object({
  title: z.string().optional().default(''),
  subtitle: z.string().optional().default(''),
  buttonText: z.string().optional().default(''),
  buttonLink: z.string().optional().default(''),
}).passthrough()

const ContactBlockSchema = z.object({
  title: z.string().optional().default(''),
  subtitle: z.string().optional().default(''),
}).passthrough()

export const SECTION_REGISTRY: Record<string, SectionRegistryEntry> = {
  hero: {
    label: 'Hero',
    schema: HeroBlockSchema,
    defaultContent: { title: '{hero_title}', subtitle: '{hero_subtitle}', ctaText: 'Shop Collection', ctaLink: '#showroom' },
    adminFields: [
      { key: 'title', label: 'Headline', kind: 'text' },
      { key: 'subtitle', label: 'Subheading', kind: 'text' },
      { key: 'ctaText', label: 'CTA Button Text', kind: 'text' },
      { key: 'ctaLink', label: 'CTA Button Link', kind: 'text' },
    ],
  },
  richtext: {
    label: 'Richtext',
    schema: RichtextBlockSchema,
    defaultContent: { content: '<p>Welcome to {site_title}. Edit this copy or connect to live data variables.</p>' },
    adminFields: [
      { key: 'content', label: 'HTML / Text Content', kind: 'textarea' },
    ],
  },
  services: {
    label: 'Services',
    schema: ServicesBlockSchema,
    defaultContent: { title: 'Our Services', description: 'Curated solutions' },
    adminFields: [
      { key: 'title', label: 'Section Title', kind: 'text' },
    ],
  },
  testimonials: {
    label: 'Reviews',
    schema: TestimonialsBlockSchema,
    defaultContent: { title: 'Customer Reviews', description: 'What buyers say' },
    adminFields: [
      { key: 'title', label: 'Section Title', kind: 'text' },
    ],
  },
  products: {
    label: 'Catalog',
    schema: ProductsBlockSchema,
    defaultContent: { title: 'Featured Finds Catalog' },
    adminFields: [
      { key: 'title', label: 'Section Title', kind: 'text' },
    ],
  },
  cta: {
    label: 'CTA',
    schema: CtaBlockSchema,
    defaultContent: { title: 'Ready to Order?', subtitle: 'Contact our store team today', buttonText: 'Contact Us', buttonLink: '#contact' },
    adminFields: [
      { key: 'title', label: 'Headline', kind: 'text' },
      { key: 'subtitle', label: 'Subheading', kind: 'text' },
      { key: 'buttonText', label: 'Button Text', kind: 'text' },
      { key: 'buttonLink', label: 'Button Link', kind: 'text' },
    ],
  },
  contact: {
    label: 'Contact Form',
    schema: ContactBlockSchema,
    defaultContent: { title: 'Get in Touch', subtitle: 'Call us at {phone} or send a message below.' },
    adminFields: [
      { key: 'title', label: 'Headline', kind: 'text' },
      { key: 'subtitle', label: 'Subheading', kind: 'text' },
    ],
  },

  // ─── net-new (packages/design-system/PAGE_EDITOR_SPEC.md) ────────────────
  faq: {
    label: 'FAQ',
    schema: FaqBlockSchema,
    defaultContent: { title: 'Frequently Asked Questions', items: [{ question: '', answer: '' }] },
    PublicBlock: FaqBlock,
    AdminForm: FaqAdminForm,
  },
  stats: {
    label: 'Stats',
    schema: StatsBlockSchema,
    defaultContent: { title: '', stats: [{ value: '', label: '' }] },
    PublicBlock: StatsBlock,
    AdminForm: StatsAdminForm,
  },
  quote: {
    label: 'Pinned Quote',
    schema: QuoteBlockSchema,
    defaultContent: { quote: '', attribution: '' },
    PublicBlock: QuoteBlock,
    adminFields: [
      { key: 'quote', label: 'Quote', kind: 'textarea' },
      { key: 'attribution', label: 'Attribution (optional)', kind: 'text' },
    ],
  },
  media: {
    label: 'Media',
    schema: MediaBlockSchema,
    // alt can't default to '' — MediaBlockSchema requires it non-empty for
    // mediaType: 'image', and BlockRenderer's safeParse silently drops any
    // block that fails validation. A placeholder here means a freshly-added
    // block renders (with a visible cue to replace it) instead of vanishing
    // the moment an admin adds one.
    defaultContent: { mediaType: 'image', src: '', alt: 'Add descriptive alt text', caption: '' },
    PublicBlock: MediaBlock,
    adminFields: [
      { key: 'mediaType', label: 'Media Type', kind: 'select', options: [{ value: 'image', label: 'Image' }, { value: 'video', label: 'Video' }] },
      { key: 'src', label: 'Media URL', kind: 'text' },
      { key: 'alt', label: 'Alt Text (required for images)', kind: 'text' },
      { key: 'caption', label: 'Caption (optional)', kind: 'text' },
    ],
  },
}

export type SectionType = keyof typeof SECTION_REGISTRY

export function getSectionEntry(type: string): SectionRegistryEntry | undefined {
  return SECTION_REGISTRY[type]
}
