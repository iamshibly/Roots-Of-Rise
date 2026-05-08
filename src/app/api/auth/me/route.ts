import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ user: null })
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*, profiles(*)')
    .eq('id', user.id)
    .single()

  return Response.json({ user: userData })
}
