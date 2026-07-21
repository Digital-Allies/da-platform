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
  const state = product.selling_state
  // 'listing'/'checkout' only count as external once a URL actually exists —
  // otherwise both degrade to the inquiry flow, label included, so the button
  // never promises an outbound link (or a live checkout) that isn't there.
  const external = (state === 'listing' || state === 'checkout') && !!product.external_url
  const label = product.cta_label || (external ? DEFAULT_LABELS[state] : DEFAULT_LABELS.inquiry)

  return {
    label,
    href: external ? (product.external_url as string) : '#contact',
    external,
  }
}
