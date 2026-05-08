import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { getProfileCompletion } from '@/lib/utils'
import { Pencil, Mail, Phone, MapPin, GraduationCap, Briefcase, Link2 } from 'lucide-react'
import type { Profile } from '@/lib/types'

export const metadata: Metadata = { title: 'My Profile' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*, profiles(*)')
    .eq('id', user.id)
    .single()

  const profile = userData?.profiles as Profile | null
  const completion = profile ? getProfileCompletion(profile as unknown as Record<string, unknown>) : 0

  const infoFields = [
    { label: 'Email', value: user.email, icon: Mail },
    { label: 'Phone', value: profile?.phone, icon: Phone },
    { label: 'City', value: profile?.city, icon: MapPin },
    { label: 'Occupation', value: profile?.occupation, icon: Briefcase },
    { label: 'Education', value: profile?.education_level, icon: GraduationCap },
    { label: 'Social / Portfolio', value: profile?.social_link, icon: Link2 },
  ]

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-neutral-text">My Profile</h1>
        <Link href="/dashboard/edit-profile" className="btn-primary flex items-center gap-2 text-sm">
          <Pencil className="w-4 h-4" /> Edit Profile
        </Link>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-neutral-border p-6">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-brand-green-light shrink-0">
            {profile?.profile_photo ? (
              <Image src={profile.profile_photo} alt="Avatar" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold text-brand-green">
                  {(profile?.full_name || user.email || 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-text">
              {profile?.full_name || user.email?.split('@')[0]}
            </h2>
            <p className="text-neutral-muted text-sm capitalize">{userData?.role?.replace('_', ' ')}</p>
            {profile?.bio && <p className="text-sm text-neutral-muted mt-1 leading-relaxed">{profile.bio}</p>}
          </div>
        </div>

        {/* Completion bar */}
        <div className="mt-5 pt-5 border-t border-neutral-border">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-muted">Profile completion</span>
            <span className="font-semibold text-brand-green">{completion}%</span>
          </div>
          <div className="h-2 bg-neutral-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-green rounded-full transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Info fields */}
      <div className="bg-white rounded-2xl border border-neutral-border divide-y divide-neutral-border">
        {infoFields.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 px-6 py-4">
            <div className="w-8 h-8 rounded-lg bg-brand-green-light flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-brand-green" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-neutral-muted">{label}</p>
              <p className="text-sm font-medium text-neutral-text truncate capitalize">
                {value || <span className="text-neutral-muted italic font-normal">Not provided</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills & Interests */}
      {(profile?.skills?.length || profile?.interests?.length) ? (
        <div className="bg-white rounded-2xl border border-neutral-border p-6 space-y-4">
          {profile.skills?.length ? (
            <div>
              <p className="text-sm font-semibold text-neutral-text mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s: string) => (
                  <span key={s} className="bg-brand-green-light text-brand-green text-xs font-medium px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          ) : null}
          {profile.interests?.length ? (
            <div>
              <p className="text-sm font-semibold text-neutral-text mb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((i: string) => (
                  <span key={i} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full capitalize">{i.replace('_', ' ')}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
