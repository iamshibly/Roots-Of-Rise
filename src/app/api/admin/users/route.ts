import { createClient } from '@/lib/supabase/server'
import { ADMIN_ROLES } from '@/lib/constants'

async function requireAdmin(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data } = await supabase.from('users').select('role').eq('id', userId).single()
  return data && ADMIN_ROLES.includes(data.role as never) ? data.role : null
}

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (!await requireAdmin(supabase, user.id)) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 25
  const offset = (page - 1) * limit

  const { data, count, error } = await supabase
    .from('users')
    .select('*, profiles(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ users: data, total: count, page, limit })
}
