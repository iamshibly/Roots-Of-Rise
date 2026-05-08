import { createClient } from '@/lib/supabase/server'
import { newsletterSchema } from '@/lib/validations/contact'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = newsletterSchema.safeParse(body)

    if (!result.success) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: result.data.email })

    if (error) {
      if (error.code === '23505') {
        return Response.json({ message: 'You are already subscribed!' })
      }
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, message: 'Successfully subscribed to our newsletter!' })
  } catch {
    return Response.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
