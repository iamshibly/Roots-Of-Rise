import { createClient } from '@/lib/supabase/server'
import { ADMIN_ROLES } from '@/lib/constants'

async function requireEditor(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data } = await supabase.from('users').select('role').eq('id', userId).single()
  return data && ADMIN_ROLES.includes(data.role as never)
}

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ images: data })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (!await requireEditor(supabase, user.id)) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { data, error } = await supabase.from('gallery_images').insert(body).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ image: data }, { status: 201 })
}
