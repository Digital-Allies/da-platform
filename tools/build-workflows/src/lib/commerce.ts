// ─── Flexible conversion layer (STATUS.md decision #8) ───────────────────────
// Every product CTA resolves through here — components never hard-code a label
// or destination. The conversion path varies per product and stays
// provider-agnostic: outbound listing today, inquiry/direct coordination, and a
// future on-site purchase flow all slot in by extending THIS function only.

import { type Product } from './types'

export interface ProductCta {
  label: string
  href: string
  external: boolean // opens in a new tab (off-site)
}

const DEFAULT_LABELS: Record<Product['selling_state'], string> = {
  listing: 'View Listing',
  inquiry: 'Ask About This Item',
  direct: 'Message to Buy',
  checkout: 'Purchase Options',
}

export function resolveProductCta(product: Product): ProductCta {
  const label = product.cta_label || DEFAULT_LABELS[product.selling_state] || DEFAULT_LABELS.inquiry

  switch (product.selling_state) {
    case 'listing':
      if (product.external_url) return { label, href: product.external_url, external: true }
      // A listing product without a URL degrades to the inquiry flow
      return { label: product.cta_label || DEFAULT_LABELS.inquiry, href: '#contact', external: false }
    case 'checkout':
      // Future purchase flow: external_url carries the checkout link/embed
      // (provider TBD) — same field, no schema change (decision #8).
      if (product.external_url) return { label, href: product.external_url, external: true }
      return { label, href: '#contact', external: false }
    case 'direct':
    case 'inquiry':
    default:
      return { label, href: '#contact', external: false }
  }
}
