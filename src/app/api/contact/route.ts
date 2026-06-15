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

    // Send email notification via Resend
    const resendKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_FORM_TO_EMAIL

    if (resendKey && toEmail) {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Website Contact Form <noreply@digitalallies.co>',
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
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
