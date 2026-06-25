import { createClient } from '@/lib/supabase-server'
import PagesClient from './PagesClient'

export const dynamic = 'force-dynamic'

export default async function PagesPage() {
  const supabase = await createClient()
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

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
