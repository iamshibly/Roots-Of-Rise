import { createClient } from '@/lib/supabase/server'

async function requireAdmin(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data } = await supabase.from('users').select('role').eq('id', userId).single()
  return data && ['admin', 'super_admin'].includes(data.role)
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (!await requireAdmin(supabase, user.id)) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ messages: data })
}
