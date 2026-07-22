// Server-side data fetching helpers — call from Server Components
import { createPublicClient } from './supabase-server'
import { parseSettings, type SiteSettings, type Post, type Service, type Testimonial, type Product, type Review } from './types'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('settings')
    .select('*')
    .eq('client_id', CLIENT_ID)
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

const MOCK_PRODUCTS: Product[] = [
  {
    id: '4ce9505b-37db-4522-b855-97ea5dea938a',
    client_id: '443936d5-f92e-480b-b206-c65cfb52bdfc',
    title: 'Rattan Lounge Chair',
    description: 'Newly restored upholstery in neutral linen. A statement piece that catches light beautifully.',
    price: 145.00,
    original_price: null,
    condition: 'Restored',
    location: 'Austin, TX',
    listed_label: 'In stock',
    attributes: {},
    image_url: '/atomic-finds/products/product-rattan-chair-04.png',
    external_url: 'https://www.facebook.com/marketplace/',
    seller_name: 'Jennyfer Gomez',
    seller_rating: '81 ratings',
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sku: 'AF-004',
    category: 'Chairs',
    tagline: 'vintage find',
    badge: 'featured',
    in_stock: true,
    origin: 'United States',
    era: '1970s',
    dimensions: 'H 34" x W 28" x D 30"',
    selling_state: 'inquiry',
    cta_label: null
  },
  {
    id: 'bcf7e782-ce3f-4151-be12-dbcf848e0cb8',
    client_id: '443936d5-f92e-480b-b206-c65cfb52bdfc',
    title: 'Blue MCM Armchair',
    description: 'Deep blue upholstery on a rattan-accented mid-century base. Unexpected and striking.',
    price: 595.00,
    original_price: null,
    condition: 'Restored',
    location: 'Austin, TX',
    listed_label: 'In stock',
    attributes: {},
    image_url: '/atomic-finds/products/product-blue-mcm-armchair-10.png',
    external_url: 'https://www.facebook.com/marketplace/',
    seller_name: 'Jennyfer Gomez',
    seller_rating: '81 ratings',
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sku: 'AF-010',
    category: 'Chairs',
    tagline: 'plush meets rattan',
    badge: 'instock',
    in_stock: true,
    origin: 'United States',
    era: '1960s',
    dimensions: 'H 30" x W 30" x D 32"',
    selling_state: 'inquiry',
    cta_label: null
  },
  {
    id: 'fed8946d-293c-4b58-9345-85e73cf34e74',
    client_id: '443936d5-f92e-480b-b206-c65cfb52bdfc',
    title: 'Rattan Armchair',
    description: 'A sturdy woven rattan armchair, ready to be your favorite reading spot.',
    price: 195.00,
    original_price: null,
    condition: 'Restored',
    location: 'Austin, TX',
    listed_label: 'In stock',
    attributes: {},
    image_url: '/atomic-finds/products/product-rattan-armchair-08.png',
    external_url: 'https://www.facebook.com/marketplace/',
    seller_name: 'Jennyfer Gomez',
    seller_rating: '81 ratings',
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sku: 'AF-008',
    category: 'Chairs',
    tagline: 'everyday elegance',
    badge: 'instock',
    in_stock: true,
    origin: 'Philippines',
    era: '1970s',
    dimensions: 'H 32" x W 26" x D 28"',
    selling_state: 'inquiry',
    cta_label: null
  },
  {
    id: 'c30c2982-68ab-4530-b283-96799e3ed2a3',
    client_id: '443936d5-f92e-480b-b206-c65cfb52bdfc',
    title: 'Rattan Bookshelf',
    description: 'Open rattan bookshelf — a rare combination of organic material and clean modernism.',
    price: 520.00,
    original_price: null,
    condition: 'Restored',
    location: 'Austin, TX',
    listed_label: 'In stock',
    attributes: {},
    image_url: '/atomic-finds/products/product-rattan-bookshelf-11.png',
    external_url: 'https://www.facebook.com/marketplace/',
    seller_name: 'Jennyfer Gomez',
    seller_rating: '81 ratings',
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sku: 'AF-011',
    category: 'Shelving',
    tagline: 'rattan meets modern',
    badge: 'featured',
    in_stock: true,
    origin: 'United States',
    era: '1970s',
    dimensions: 'H 68" x W 32" x D 12"',
    selling_state: 'inquiry',
    cta_label: null
  }
]

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    client_id: '443936d5-f92e-480b-b206-c65cfb52bdfc',
    reviewer_name: 'Esteban',
    review_date: '2026-07-13',
    rating_type: 'written',
    text: "Jennyfer and her husband are awesome! Wonderful sellers and wonderful people. We live nearby and they even went out of their way to deliver the table so I didn't have to get a U-Haul. Thank you so much!",
    seller_response: null,
    source: 'facebook',
    notable_tags: ['Punctuality', 'Communication', 'Pricing', 'Item Description'],
    featured_on_homepage: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'r2',
    client_id: '443936d5-f92e-480b-b206-c65cfb52bdfc',
    reviewer_name: 'Amanda',
    review_date: '2026-05-24',
    rating_type: 'written',
    text: 'It was great doing business with Jennyfer. The barcart is exactly as described! She was fast to respond and very friendly.',
    seller_response: null,
    source: 'facebook',
    notable_tags: ['Punctuality', 'Communication', 'Pricing', 'Item Description'],
    featured_on_homepage: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'r3',
    client_id: '443936d5-f92e-480b-b206-c65cfb52bdfc',
    reviewer_name: 'Brittney',
    review_date: '2026-04-27',
    rating_type: 'written',
    text: 'Very kind and friendly!! Absolutely loved buying from her and I am OBSESSED with the set I got!! I will most likely be back >:)',
    seller_response: null,
    source: 'facebook',
    notable_tags: ['Punctuality', 'Communication', 'Pricing', 'Item Description'],
    featured_on_homepage: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('client_id', CLIENT_ID)
      .order('display_order', { ascending: true })
    if (error) throw error
    if (!data || data.length === 0) return MOCK_PRODUCTS
    return data
  } catch (error) {
    console.warn('getProducts failed, falling back to mock data:', error)
    return MOCK_PRODUCTS
  }
}

export async function getFeaturedReviews(limit = 6): Promise<Review[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('client_id', CLIENT_ID)
      .eq('featured_on_homepage', true)
      .order('sort_order', { ascending: true })
      .limit(limit)
    if (error) throw error
    if (!data || data.length === 0) return MOCK_REVIEWS
    return data
  } catch (error) {
    console.warn('getFeaturedReviews failed, falling back to mock data:', error)
    return MOCK_REVIEWS
  }
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
