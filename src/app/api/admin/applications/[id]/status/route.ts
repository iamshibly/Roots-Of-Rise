import { createClient } from '@/lib/supabase/server'
import { ADMIN_ROLES } from '@/lib/constants'
import { z } from 'zod'

const statusSchema = z.object({
  status: z.enum(['pending', 'under_review', 'accepted', 'rejected', 'waitlisted']),
  admin_notes: z.string().optional(),
})

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (!userData || !ADMIN_ROLES.includes(userData.role as never)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const body = await request.json()
  const result = statusSchema.safeParse(body)
  if (!result.success) return Response.json({ error: result.error.flatten() }, { status: 400 })

  const { error } = await supabase
    .from('volunteer_applications')
    .update({
      status: result.data.status,
      admin_notes: result.data.admin_notes,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
