import { createClient } from '@/lib/supabase/server'
import { applicationSchema } from '@/lib/validations/application'

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const result = applicationSchema.safeParse(body)

  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }

  const { error } = await supabase.from('volunteer_applications').insert({
    ...result.data,
    user_id: user.id,
    status: 'pending',
  })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true, message: 'Application submitted successfully.' })
}
