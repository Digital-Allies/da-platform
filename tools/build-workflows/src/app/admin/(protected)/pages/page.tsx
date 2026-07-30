import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import { parseSettings } from '@/lib/types'
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

  // Fetch connected site settings — `settings` is the real key-value table
  // (see settings/page.tsx and lib/data.ts's getSiteSettings). There is no
  // `site_settings` table; querying it here silently returned {} and broke
  // every "Connect to Data" binding in the Pages editor.
  const { data: settingsRows } = await supabase
    .from('settings')
    .select('*')
    .eq('client_id', CLIENT_ID)
  const siteSettings = parseSettings(settingsRows ?? [])

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
