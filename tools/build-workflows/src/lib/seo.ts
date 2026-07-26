/**
 * Search Engine Optimization (SEO) & Answer Engine Optimization (AEO) Helpers
 * Structured JSON-LD schemas for Google, Bing, Perplexity, Claude, ChatGPT, and SearchGPT.
 */

import { type SiteSettings, type Product, type Post } from './types'

export function generateOrganizationSchema(settings: SiteSettings, domain: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.site_title || 'Digital Allies',
    url: `https://${domain}`,
    logo: settings.logo_url || `https://${domain}/logo.png`,
    description: settings.site_description || settings.tagline,
    email: settings.email,
    telephone: settings.phone,
    address: settings.address ? {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
    } : undefined,
    sameAs: [
      settings.instagram_url,
      settings.facebook_url,
      settings.linkedin_url,
      settings.twitter_url,
    ].filter(Boolean),
  }
}

export function generateLocalBusinessSchema(settings: SiteSettings, domain: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.site_title,
    url: `https://${domain}`,
    image: settings.logo_url || settings.about_image_url,
    telephone: settings.phone,
    email: settings.email,
    address: settings.address ? {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
    } : undefined,
    openingHours: settings.business_hours || undefined,
  }
}

export function generateProductSchema(product: Product, domain: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || undefined,
    image: product.image_url ? [`https://${domain}${product.image_url}`] : undefined,
    sku: product.sku || product.id,
    category: product.category || undefined,
    offers: product.price != null ? {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://${domain}/#products`,
    } : undefined,
  }
}

export function generateArticleSchema(post: Post, domain: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${domain}/learn/${post.slug}`,
    },
    author: {
      '@type': 'Organization',
      name: 'Digital Allies',
    },
  }
}

export function generateAeoFaqSchema(faqList: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
