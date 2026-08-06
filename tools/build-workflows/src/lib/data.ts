// Server-side data fetching helpers — call from Server Components
import { createPublicClient } from './supabase-server'
import { parseSettings, type SiteSettings, type Post, type Service, type Testimonial, type Product, type Review } from './types'
import { getDesignTokens as getStaticDesignTokens, type DesignTokens } from './theme'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

export async function getSiteSettings(clientId: string = CLIENT_ID): Promise<SiteSettings> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('settings')
    .select('*')
    .eq('client_id', clientId)
  return parseSettings(data ?? [])
}

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  return data ?? []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

export async function getServices(): Promise<Service[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getProducts(): Promise<Product[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getFeaturedReviews(limit = 6): Promise<Review[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .eq('featured_on_homepage', true)
    .order('sort_order', { ascending: true })
    .limit(limit)
  return data ?? []
}

export async function getPageBySlug(slug: string): Promise<any | null> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('pages')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  return data
}

export async function getPageBySlugAny(slug: string): Promise<any | null> {
  // Admin preview: fetch pages regardless of status (for draft preview)
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('pages')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .eq('slug', slug)
    .maybeSingle()
  return data
}

export async function getPublishedPages(): Promise<any[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('pages')
    .select('id, title, slug')
    .eq('client_id', CLIENT_ID)
    .eq('status', 'published')
    .order('created_at', { ascending: true })
  return data || []
}

export async function getCollections(): Promise<any[]> {
  try {
    const supabase = createPublicClient()
    const { data } = await supabase
      .from('collections')
      .select('*')
      .eq('client_id', CLIENT_ID)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    return data ?? []
  } catch (error) {
    return []
  }
}

// The public site's actual theme: the client's static brand defaults (see
// lib/theme.ts) with any row saved via the admin Theme Customizer
// (design_tokens.colors / .fonts) layered on top. Before this, SiteTheme.tsx
// called the static getDesignTokens() directly, so the Theme Customizer's
// Save button had zero effect on the live site no matter what was saved.
export async function getLiveDesignTokens(clientId: string | undefined = CLIENT_ID): Promise<DesignTokens> {
  const base = getStaticDesignTokens(clientId)
  if (!clientId) return base
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('design_tokens')
    .select('colors, fonts')
    .eq('client_id', clientId)
    .maybeSingle()
  if (!data) return base
  return {
    ...base,
    colors: { ...base.colors, ...(data.colors ?? {}) },
    fonts: { ...base.fonts, ...(data.fonts ?? {}) },
  }
}

