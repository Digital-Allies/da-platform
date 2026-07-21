// ─── Database Types ───────────────────────────────────────────────────────────

export interface Client {
  id: string
  auth_user_id: string
  business_name: string
  created_at: string
}

export interface Post {
  id: string
  client_id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featured_image_url: string | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  client_id: string
  title: string
  description: string | null
  price: string | null
  icon: string | null
  display_order: number
  created_at: string
}

export interface Testimonial {
  id: string
  client_id: string
  author_name: string
  author_role: string | null
  content: string
  rating: number
  image_url: string | null
  display_order: number
  created_at: string
}

export interface Product {
  id: string
  client_id: string
  title: string
  description: string | null
  price: number | null
  original_price: number | null
  condition: string | null
  location: string | null
  listed_label: string | null
  attributes: Record<string, unknown>
  image_url: string | null
  external_url: string
  seller_name: string | null
  seller_rating: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  client_id: string
  name: string
  role: string | null
  bio: string | null
  image_url: string | null
  display_order: number
  created_at: string
}

export interface GalleryItem {
  id: string
  client_id: string
  title: string | null
  image_url: string
  category: string | null
  display_order: number
  created_at: string
}

export interface Setting {
  id: string
  client_id: string
  key: string
  value: string | null
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  client_id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  read: boolean
  created_at: string
}

// ─── Derived / Helper Types ───────────────────────────────────────────────────

// Settings flattened into a usable object
export interface SiteSettings {
  site_title: string
  site_description: string
  tagline: string
  phone: string
  email: string
  address: string
  brand_color: string
  logo_url: string
  favicon_url: string
  instagram_url: string
  facebook_url: string
  linkedin_url: string
  twitter_url: string
  hero_title: string
  hero_subtitle: string
  hero_cta_text: string
  hero_cta_link: string
  about_title: string
  about_body: string
  about_image_url: string
  business_hours: string
}

export const DEFAULT_SETTINGS: SiteSettings = {
  site_title: 'My Business',
  site_description: '',
  tagline: '',
  phone: '',
  email: '',
  address: '',
  brand_color: '#1A6B8A',
  logo_url: '',
  favicon_url: '',
  instagram_url: '',
  facebook_url: '',
  linkedin_url: '',
  twitter_url: '',
  hero_title: 'Welcome',
  hero_subtitle: '',
  hero_cta_text: 'Get in touch',
  hero_cta_link: '#contact',
  about_title: 'About Us',
  about_body: '',
  about_image_url: '',
  business_hours: '',
}

// Convert flat settings array → object
export function parseSettings(rows: Setting[]): SiteSettings {
  const map: Record<string, string> = {}
  rows.forEach((r) => { if (r.value) map[r.key] = r.value })
  return { ...DEFAULT_SETTINGS, ...map } as SiteSettings
}
