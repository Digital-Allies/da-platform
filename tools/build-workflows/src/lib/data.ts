// Server-side data fetching helpers — call from Server Components
import { createClient } from './supabase-server'
import { parseSettings, type SiteSettings, type Post, type Service, type Testimonial } from './types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('settings')
    .select('*')
    .eq('client_id', CLIENT_ID)
  return parseSettings(data ?? [])
}

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  return data ?? []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient()
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
  const supabase = await createClient()
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('display_order', { ascending: true })
  return data ?? []
}
