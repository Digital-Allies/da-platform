import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import PagesClient from './PagesClient'

export const dynamic = 'force-dynamic'

export default async function PagesPage() {
  const supabase = await createClient()
  const CLIENT_ID = await getCurrentClientId()
  if (!CLIENT_ID) throw new Error('Client ID is required for pages')

  // Fetch pages for current client
  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false })

  // Fetch connected site settings
  const { data: siteSettings } = await supabase
    .from('site_settings')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .single()

  // Fetch brand design tokens
  const { data: designTokens } = await supabase
    .from('design_tokens')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .single()

  return (
    <div className="ws-page">
      <PagesClient
        initialPages={pages || []}
        siteSettings={siteSettings || {}}
        designTokens={designTokens || {}}
      />
    </div>
  )
}
