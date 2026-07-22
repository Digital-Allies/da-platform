// Server-side Supabase client (for Server Components, Route Handlers, Server Actions)
// Next.js 15+: cookies() is async — always await createClient() / createServiceClient().
import { createServerClient, type CookieMethodsServer } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

// Public anon client — no cookies() call, safe for static/ISR rendering.
// Use for public reads gated only by "using (true)" RLS policies (products, reviews,
// settings, services, testimonials, posts, pages). Calling cookies() in those paths
// triggers Next's DYNAMIC_SERVER_USAGE bailout on every static/ISR generation attempt,
// which data.ts's own try/catch was swallowing — permanently baking in mock/fallback
// data instead of ever completing a real static render.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

type CookieToSet = { name: string; value: string; options?: Partial<ResponseCookie> }

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll called from a Server Component — safe to ignore
          }
        },
      },
    }
  )
}

// Service role client — bypasses RLS. Use ONLY in server-side Route Handlers.
export async function createServiceClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )
}
