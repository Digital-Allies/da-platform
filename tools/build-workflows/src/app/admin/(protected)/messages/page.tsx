import { createClient } from '@/lib/supabase-server'
import { getCurrentClientId } from '@/lib/get-current-client'
import { moduleLabel } from '@/lib/module-labels'
import { type ContactSubmission } from '@/lib/types'
import CommandCenter from './CommandCenter'

async function getMessages(): Promise<{ messages: ContactSubmission[]; clientId: string | null }> {
  const supabase = await createClient()
  const CLIENT_ID = await getCurrentClientId()
  if (!CLIENT_ID) throw new Error('Client ID is required for messages')
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('client_id', CLIENT_ID)
    .order('created_at', { ascending: false })
  return { messages: data ?? [], clientId: CLIENT_ID }
}

export default async function MessagesPage() {
  const { messages, clientId } = await getMessages()
  return <CommandCenter initialMessages={messages} title={moduleLabel('messages', clientId)} />
}
