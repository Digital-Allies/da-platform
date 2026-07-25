// Resolves the Supabase client_id for the currently signed-in admin user,
// instead of trusting the build-time NEXT_PUBLIC_CLIENT_ID env var (which is
// the same for every visitor to a given deployment and can't tell a Digital
// Allies login apart from an Atomic Finds login on the shared cms.* admin).
import { cache } from 'react'
import { createClient } from './supabase-server'

// cache() dedupes this within a single request — layout.tsx and the page
// segment beneath it both need it, and each call is an auth + DB round trip.
export const getCurrentClientId = cache(async (): Promise<string | null> => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('clients')
    .select('id')
    .eq('auth_user_id', user.id)
    .maybeSingle()

  if (error) throw error
  return data?.id ?? null
})
