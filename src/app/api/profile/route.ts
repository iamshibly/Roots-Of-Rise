import { createClient } from '@/lib/supabase/server'
import { profileSchema } from '@/lib/validations/profile'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ profile: data })
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const result = profileSchema.safeParse(body)

  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }

  const { error } = await supabase
    .from('profiles')
    .update({ ...result.data, updated_at: new Date().toISOString() })
    .eq('user_id', user.id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
