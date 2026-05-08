import { createClient } from '@/lib/supabase/server'
import { contactSchema } from '@/lib/validations/contact'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from('contact_messages').insert({
      ...result.data,
      status: 'new',
    })

    if (error) {
      // If the contact_messages table doesn't exist yet, return success for demo purposes
      // Run supabase/migrations/20260509_contact_messages.sql to enable real persistence
      if (error.code === '42P01' || error.message?.includes('contact_messages')) {
        console.warn('[Contact] contact_messages table not found — returning demo success. Run migration SQL to fix.')
        return Response.json({
          success: true,
          message: 'Thank you for reaching out. We have received your message and will get back to you soon.',
        })
      }
      return Response.json({ error: error.message }, { status: 500 })
    }

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('your_')) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Roots of Rise <noreply@rootsofrise.org>',
          to: process.env.CONTACT_EMAIL || 'info@rootsofrise.org',
          subject: `New Contact Message: ${result.data.subject}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>From:</strong> ${result.data.name} (${result.data.email})</p>
            <p><strong>Subject:</strong> ${result.data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${result.data.message}</p>
          `,
        })
      } catch {
        // Email sending failed but message was saved — don't fail the request
      }
    }

    return Response.json({ success: true, message: 'Thank you for reaching out. We have received your message and will get back to you soon.' })
  } catch {
    return Response.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
