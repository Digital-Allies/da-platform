import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

type CookieToSet = { name: string; value: string; options?: Partial<ResponseCookie> }

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // cms.digitalallies.net's root has no real homepage to show yet — send it
  // straight to the admin login instead of the generic fallback template.
  // Scoped to this hostname only so it never affects a client's own site.
  const host = request.headers.get('host') ?? ''
  if (pathname === '/' && host.startsWith('cms.digitalallies.net')) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    return NextResponse.redirect(loginUrl)
  }

  // Only protect /admin pages that are NOT the login or reset-password page.
  // reset-password must stay unauthenticated at the server level: Supabase's
  // recovery link lands here with the session token in the URL *hash*
  // fragment (#access_token=...&type=recovery), which browsers never send
  // to the server — so getUser() above sees no session on that first
  // request. Gating this route would redirect straight to /admin/login
  // before the page's client-side code ever gets to read the hash and
  // exchange it for a session.
  // When redirecting, copy Supabase session cookies so the token state
  // survives the redirect — without this, the redirect response drops the
  // refreshed tokens and causes an infinite redirect loop.
  const isPublicAdminRoute = pathname === '/admin/login' || pathname === '/admin/reset-password'
  if (pathname.startsWith('/admin') && !isPublicAdminRoute && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    const redirectResponse = NextResponse.redirect(loginUrl)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    return redirectResponse
  }

  return supabaseResponse
}

export const config = {
  // Exclude /admin/login from middleware entirely so it always renders.
  // The login page handles post-auth redirect itself.
  matcher: ['/', '/admin', '/admin/((?!login$).+)'],
}
