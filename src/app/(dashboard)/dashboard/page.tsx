import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getProfileCompletion, formatDate, getApplicationStatusColor } from '@/lib/utils'
import { FileText, Search, User, PlusCircle, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import type { VolunteerApplication, Profile } from '@/lib/types'

export const metadata: Metadata = { title: 'Overview' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: userData }, { data: applications }, { data: openOpportunities }] = await Promise.all([
    supabase.from('users').select('*, profiles(*)').eq('id', user.id).single(),
    supabase.from('volunteer_applications').select('*, opportunities(title)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('opportunities').select('id').eq('is_active', true),
  ])

  const profile = userData?.profiles as Profile | null
  const completion = profile ? getProfileCompletion(profile as unknown as Record<string, unknown>) : 0
  const firstName = (profile?.full_name || user.email?.split('@')[0] || 'there').split(' ')[0]

  const quickActions = [
    { label: 'Browse Opportunities', href: '/dashboard/opportunities', icon: Search, color: 'bg-blue-50 text-blue-600' },
    { label: 'Apply Now', href: '/dashboard/apply', icon: PlusCircle, color: 'bg-brand-green-light text-brand-green' },
    { label: 'My Applications', href: '/dashboard/applications', icon: FileText, color: 'bg-purple-50 text-purple-600' },
    { label: 'Edit Profile', href: '/dashboard/edit-profile', icon: User, color: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div className="max-w-4xl space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Welcome back, {firstName}!</h1>
        <p className="text-neutral-muted mt-1">Here&apos;s what&apos;s happening with your volunteer journey.</p>
      </div>

      {/* Profile completion banner */}
      {completion < 80 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <p className="font-semibold text-amber-800 text-sm">Your profile is {completion}% complete</p>
            <p className="text-amber-700 text-xs mt-0.5">Complete your profile to improve your application chances.</p>
            <div className="mt-2 h-1.5 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>
          <Link href="/dashboard/edit-profile" className="btn-primary text-xs py-2 px-4 shrink-0">
            Complete Profile
          </Link>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: applications?.length ?? 0, icon: FileText, color: 'text-purple-600 bg-purple-50' },
          { label: 'Open Opportunities', value: openOpportunities?.length ?? 0, icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
          { label: 'Profile Completion', value: `${completion}%`, icon: User, color: 'text-brand-green bg-brand-green-light' },
          { label: 'Accepted', value: applications?.filter((a: { status: string }) => a.status === 'accepted').length ?? 0, icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-neutral-border">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-neutral-text font-heading">{stat.value}</p>
            <p className="text-xs text-neutral-muted mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-heading font-bold text-neutral-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-neutral-border hover:border-brand-green hover:shadow-md transition-all text-center group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-neutral-text">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-neutral-text">Recent Applications</h2>
          <Link href="/dashboard/applications" className="text-sm text-brand-green hover:underline">View all</Link>
        </div>
        {applications && applications.length > 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-border overflow-hidden">
            {applications.map((app: VolunteerApplication & { opportunities?: { title: string } }, i: number) => (
              <div key={app.id} className={`flex items-center gap-4 p-4 ${i < applications.length - 1 ? 'border-b border-neutral-border' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-brand-green-light flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-brand-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-text truncate">
                    {(app.opportunities as { title: string } | null)?.title || app.preferred_program || 'General Application'}
                  </p>
                  <p className="text-xs text-neutral-muted flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {formatDate(app.created_at)}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getApplicationStatusColor(app.status)}`}>
                  {app.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-border p-8 text-center">
            <FileText className="w-10 h-10 text-neutral-border mx-auto mb-3" />
            <p className="text-neutral-muted text-sm">No applications yet.</p>
            <Link href="/dashboard/apply" className="btn-primary mt-4 inline-flex text-sm">Apply Now</Link>
          </div>
        )}
      </div>
    </div>
  )
}
