import { createClient } from '@/lib/supabase-server'
import ContentClient from './ContentClient'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const supabase = await createClient()
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

  const [articlesRes, calendarRes] = await Promise.all([
    supabase.from('articles').select('*').eq('client_id', CLIENT_ID).order('created_at', { ascending: false }),
    supabase.from('content_calendar').select('*').eq('client_id', CLIENT_ID).order('day', { ascending: true })
  ])

  return (
    <div className="ws-page">
      <ContentClient 
        initialArticles={articlesRes.data || []} 
        initialCalendar={calendarRes.data || []} 
      />
    </div>
  )
}
