'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Please include a message (10+ characters)'),
})

type FormData = z.infer<typeof schema>

interface ContactFormProps {
  title?: string
  subtitle?: string
  toEmail?: string
}

export default function ContactForm({
  title = 'Get in Touch',
  subtitle,
}: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

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

  return (
    <section id="contact" className="section bg-white">
      <div className="section-inner max-w-compact">
        <div className="mb-10">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {status === 'success' ? (
          <div className="p-8 border border-charcoal text-center">
            <p className="font-headline text-lg font-bold mb-2">Message received.</p>
            <p className="text-sm text-neutral-600">We will be in touch shortly.</p>
            <button
              className="mt-6 btn btn-secondary text-sm"
              onClick={() => setStatus('idle')}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className={`field ${errors.name ? 'error' : ''}`}
                placeholder="Jane Smith"
                {...register('name')}
              />
              {errors.name && <p className="mt-1 text-xs text-alert">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`field ${errors.email ? 'error' : ''}`}
                placeholder="jane@example.com"
                {...register('email')}
              />
              {errors.email && <p className="mt-1 text-xs text-alert">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="label" htmlFor="phone">Phone <span className="text-neutral-400 font-normal">(optional)</span></label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className="field"
                placeholder="(555) 000-0000"
                {...register('phone')}
              />
            </div>

            {/* Subject */}
            <div>
              <label className="label" htmlFor="subject">Subject <span className="text-neutral-400 font-normal">(optional)</span></label>
              <input
                id="subject"
                type="text"
                className="field"
                placeholder="How can we help?"
                {...register('subject')}
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="label" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                className={`field resize-none ${errors.message ? 'error' : ''}`}
                placeholder="Tell us about your project..."
                {...register('message')}
              />
              {errors.message && <p className="mt-1 text-xs text-alert">{errors.message.message}</p>}
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="md:col-span-2 p-3 border border-alert bg-red-50 text-alert text-sm">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary min-w-[140px]"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
