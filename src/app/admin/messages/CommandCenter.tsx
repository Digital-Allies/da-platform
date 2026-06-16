'use client'

import { useState } from 'react'
import { Eye, Trash2, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { type ContactSubmission } from '@/lib/types'

const fmtAgo = (d: string) => {
  const diff = (Date.now() - new Date(d).getTime()) / 1000
  if (diff < 3600) return Math.max(1, Math.floor(diff / 60)) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function CommandCenter({ initialMessages }: { initialMessages: ContactSubmission[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [openId, setOpenId] = useState<string | null>(initialMessages[0]?.id ?? null)

  const active = messages.find((m) => m.id === openId) ?? null

  async function openMessage(id: string) {
    setOpenId(id)
    const msg = messages.find((m) => m.id === id)
    if (!msg?.read) {
      const supabase = createClient()
      await supabase.from('contact_submissions').update({ read: true }).eq('id', id)
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m))
    }
  }

  async function toggleRead(id: string, read: boolean) {
    const supabase = createClient()
    await supabase.from('contact_submissions').update({ read }).eq('id', id)
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read } : m))
  }

  async function deleteMessage(id: string) {
    if (!confirm('Delete this transmission?')) return
    const supabase = createClient()
    await supabase.from('contact_submissions').delete().eq('id', id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (openId === id) setOpenId(messages.find((m) => m.id !== id)?.id ?? null)
  }

  return (
    <div className="apage">
      <div className="apage__head">
        <div>
          <h1 className="apage__title">The Command Center</h1>
          <p className="apage__sub">Transmissions from the contact form arrive here.</p>
        </div>
      </div>

      <div className="cc">
        {/* Left list */}
        <div className="cc__list">
          {messages.map((m) => (
            <button
              key={m.id}
              className={`cc__item${m.id === openId ? ' is-open' : ''}${!m.read ? ' is-unread' : ''}`}
              onClick={() => openMessage(m.id)}
            >
              <div className="cc__item-top">
                <span className="cc__from">
                  {!m.read && <span className="cc__unread" />}
                  {m.name}
                </span>
                <span className="cc__time">{fmtAgo(m.created_at)}</span>
              </div>
              <span className="cc__subj">{m.subject || '(no subject)'}</span>
              <span className="cc__snip">{m.message}</span>
            </button>
          ))}
          {messages.length === 0 && (
            <p className="empty">No transmissions yet.</p>
          )}
        </div>

        {/* Right detail */}
        {active ? (
          <div className="cc__detail">
            <div className="cc__detail-head">
              <div>
                <h3>{active.subject || '(no subject)'}</h3>
                <p className="cc__detail-from">
                  {active.name} ·{' '}
                  <a href={`mailto:${active.email}`}>{active.email}</a>
                  {active.phone && ` · ${active.phone}`}
                </p>
              </div>
              <div className="cc__detail-actions">
                <button
                  className="iconbtn"
                  title={active.read ? 'Mark unread' : 'Mark read'}
                  onClick={() => toggleRead(active.id, !active.read)}
                >
                  <Eye size={15} />
                </button>
                <button
                  className="iconbtn"
                  title="Delete"
                  style={{ color: 'var(--signal)' }}
                  onClick={() => deleteMessage(active.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <p className="cc__body">{active.message}</p>
            <div className="cc__reply">
              <a className="abtn abtn--primary" href={`mailto:${active.email}`}>
                <Mail size={13} /> Reply by email
              </a>
              <span className="cc__received">Received {fmtDate(active.created_at)}</span>
            </div>
          </div>
        ) : (
          <div className="cc__detail cc__detail--empty">
            Select a transmission to read it.
          </div>
        )}
      </div>
    </div>
  )
}
