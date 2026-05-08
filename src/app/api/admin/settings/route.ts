import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_settings').select('*').order('key')
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ settings: data })
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (!userData || !['admin', 'super_admin'].includes(userData.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body: { key: string; value: string }[] = await request.json()

  for (const { key, value } of body) {
    await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  }

  return Response.json({ success: true })
}
