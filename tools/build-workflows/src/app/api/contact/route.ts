import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase-server'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
})

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    const { name, email, phone, subject, message } = parsed.data
    const supabase = await createServiceClient()

    // Save to DB
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      client_id: CLIENT_ID,
      name,
      email,
      phone: phone ?? null,
      subject: subject ?? null,
      message,
      read: false,
    })

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
    }

    // Everything below this point is best-effort notification — the message
    // is already safely saved above, which is the part that actually
    // matters. Email/in-admin-notification failures must never turn into a
    // visitor-facing error for a submission that in fact went through; each
    // is wrapped separately so one failing doesn't take the other down too.

    // Email notification via Resend (optional per deployment)
    const resendKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_FORM_TO_EMAIL
    // Per-tenant sending address — Resend requires the "from" domain to be
    // verified under whichever Resend key/account is actually sending, so
    // this can't be hardcoded to digitalallies.net once other clients get
    // their own Resend keys (see CONTACT_FORM_FROM_EMAIL in .env.local).
    // Falls back to the original DA default so this deployment is unaffected.
    const fromAddress = process.env.CONTACT_FORM_FROM_EMAIL || 'Website Contact Form <noreply@digitalallies.net>'

    if (resendKey && toEmail) {
      try {
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from: fromAddress,
          to: toEmail,
          replyTo: email,
          subject: subject ? `Contact: ${subject}` : `New message from ${name}`,
          text: `Name: ${name}
Email: ${email}
Phone: ${phone ?? 'Not provided'}
Subject: ${subject ?? 'Not provided'}

Message:
${message}`,
        })
      } catch (emailErr) {
        // Common cause: RESEND_API_KEY set but CONTACT_FORM_FROM_EMAIL's
        // domain isn't verified in Resend yet for this tenant. The message
        // itself is already saved, so this must not fail the request.
        console.error('Resend notification failed (message was still saved):', emailErr)
      }
    }

    // In-admin bell notification (AdminShell.tsx) — real-time via Supabase's
    // postgres_changes on INSERT into `notifications`, so this fires the
    // moment the row lands, no polling. Same non-blocking treatment as email.
    try {
      await supabase.from('notifications').insert({
        client_id: CLIENT_ID,
        title: 'New contact form submission',
        message: `${name}: ${message.slice(0, 120)}${message.length > 120 ? '…' : ''}`,
        type: 'activity',
        read_status: false,
      })
    } catch (notifErr) {
      console.error('Admin notification insert failed (message was still saved):', notifErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
