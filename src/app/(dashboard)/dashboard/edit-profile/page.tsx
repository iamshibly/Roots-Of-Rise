import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from '@/components/forms/ProfileForm'
import type { Profile } from '@/lib/types'

export const metadata: Metadata = { title: 'Edit Profile' }

export default async function EditProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*, profiles(*)')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Edit Profile</h1>
        <p className="text-neutral-muted mt-1 text-sm">Keep your profile up to date to improve your application success.</p>
      </div>
      <ProfileForm profile={userData?.profiles as Profile | null} email={user.email!} />
    </div>
  )
}
