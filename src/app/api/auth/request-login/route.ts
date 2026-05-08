import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/lib/validations/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return Response.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email } = result.data
    const supabase = await createClient()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/api/auth/verify`,
        shouldCreateUser: true,
      },
    })

    if (error) {
      if (error.message.includes('rate limit')) {
        return Response.json(
          { error: 'Too many requests. Please wait a few minutes before trying again.' },
          { status: 429 }
        )
      }
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({
      message: 'Magic link sent. Check your email to complete login.',
    })
  } catch {
    return Response.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
