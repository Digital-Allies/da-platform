import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import CollectionsClient from './CollectionsClient'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
  const supabase = await createClient()
  const CLIENT_ID = await getCurrentClientId()
  if (!CLIENT_ID) throw new Error('Client ID is required for collections')

  // Fetch collections for current client
  const { data: collections } = await supabase
    .from('collections')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false })

  // Fetch available products for collection assignment
  const { data: products } = await supabase
    .from('products')
    .select('id, title, category, price_usd, image_url')
    .eq('client_id', CLIENT_ID)
    .order('title', { ascending: true })

  return (
    <div className="ws-page">
      <CollectionsClient
        initialCollections={collections || []}
        availableProducts={products || []}
      />
    </div>
  )
}
