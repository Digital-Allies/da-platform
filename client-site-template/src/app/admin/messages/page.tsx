import { createClient } from '@/lib/supabase-server'
import { type ContactSubmission } from '@/lib/types'
import MarkReadButton from './MarkReadButton'

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline font-bold text-xl">Messages</h1>
        <span className="text-xs text-neutral-500">
          {messages.filter((m) => !m.read).length} unread
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="admin-card text-center py-10">
          <p className="text-sm text-neutral-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`admin-card ${!msg.read ? 'border-charcoal' : 'opacity-70'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                    <p className="font-medium text-sm">{msg.name}</p>
                    <span className="text-xs text-neutral-400">{msg.email}</span>
                    {msg.phone && <span className="text-xs text-neutral-400">{msg.phone}</span>}
                  </div>
                  {msg.subject && (
                    <p className="text-xs font-medium text-neutral-600 mb-1">{msg.subject}</p>
                  )}
                  <p className="text-sm text-neutral-700 whitespace-pre-line">{msg.message}</p>
                  <p className="text-xs text-neutral-400 mt-2">
                    {new Date(msg.created_at).toLocaleString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: 'numeric', minute: '2-digit',
                    })}
                  </p>
                </div>
                {!msg.read && <MarkReadButton id={msg.id} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
