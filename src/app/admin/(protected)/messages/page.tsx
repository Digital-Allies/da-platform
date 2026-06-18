import { createClient } from '@/lib/supabase-server'
import { type ContactSubmission } from '@/lib/types'
import CommandCenter from './CommandCenter'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

async function getMessages(): Promise<ContactSubmission[]> {
  const supabase = await createClient()
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
