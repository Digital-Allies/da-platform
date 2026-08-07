'use client'

// Same /api/contact endpoint + validation as the generic ContactForm, styled
// to match the Atomic Finds ATX design (design_handoff_homepage's contact
// form markup) instead of the DA-generic .field/.btn classes.

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Please include a message (10+ characters)'),
})

type FormData = z.infer<typeof schema>

export default function AtomicContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Something went wrong')
      }
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="af-contact-form">
        <h3 data-en="Message sent" data-es="Mensaje enviado">Message sent</h3>
        <p style={{ color: 'var(--fg-body)', fontSize: 14, marginBottom: 16 }} data-en="We'll reply within 24 hours." data-es="Responderemos dentro de 24 horas.">We&apos;ll reply within 24 hours.</p>
        <button type="button" className="af-btn" onClick={() => setStatus('idle')} data-en="Send another message" data-es="Enviar otro mensaje">Send another message</button>
      </div>
    )
  }

  return (
    <form className="af-contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3 data-en="Send a Message" data-es="Envía un Mensaje">Send a Message</h3>
      <div className="af-field">
        <label className="af-label" htmlFor="af-name" data-en="Your Name" data-es="Tu Nombre">Your Name</label>
        <input id="af-name" className="af-input" type="text" placeholder="Jane Smith" {...register('name')} />
        {errors.name && <p style={{ color: 'var(--amber-orange)', fontSize: 12, marginTop: 4 }}>{errors.name.message}</p>}
      </div>
      <div className="af-field">
        <label className="af-label" htmlFor="af-email" data-en="Email Address" data-es="Dirección de Correo">Email Address</label>
        <input id="af-email" className="af-input" type="email" placeholder="jane@example.com" {...register('email')} />
        {errors.email && <p style={{ color: 'var(--amber-orange)', fontSize: 12, marginTop: 4 }}>{errors.email.message}</p>}
      </div>
      <div className="af-field">
        <label className="af-label" htmlFor="af-message" data-en="Message" data-es="Mensaje">Message</label>
        <textarea id="af-message" className="af-textarea" rows={4} placeholder="Tell us what you're looking for, or ask about a specific piece..." {...register('message')} />
        {errors.message && <p style={{ color: 'var(--amber-orange)', fontSize: 12, marginTop: 4 }}>{errors.message.message}</p>}
      </div>
      {status === 'error' && (
        <p style={{ color: 'var(--amber-orange)', fontSize: 13, marginBottom: 12 }}>{errorMessage}</p>
      )}
      <button className="af-btn" type="submit" disabled={status === 'sending'} data-en={status === 'sending' ? 'Sending…' : 'Send Message'} data-es={status === 'sending' ? 'Enviando…' : 'Enviar Mensaje'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
