import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import PagesClient from './PagesClient'

export const dynamic = 'force-dynamic'

export default async function PagesPage() {
  const supabase = await createClient()
  const CLIENT_ID = await getCurrentClientId()
  if (!CLIENT_ID) throw new Error('Client ID is required for pages')

  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false })

  return (
    <div className="ws-page">
      <PagesClient initialPages={pages || []} />
    </div>
  )
}
