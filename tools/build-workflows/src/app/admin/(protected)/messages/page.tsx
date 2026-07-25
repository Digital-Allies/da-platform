import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import { type ContactSubmission } from '@/lib/types'
import CommandCenter from './CommandCenter'

async function getMessages(): Promise<ContactSubmission[]> {
  const supabase = await createClient()
  const CLIENT_ID = await getCurrentClientId()
  if (!CLIENT_ID) throw new Error('Client ID is required for messages')
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function MessagesPage() {
  const messages = await getMessages()
  return <CommandCenter initialMessages={messages} />
}
