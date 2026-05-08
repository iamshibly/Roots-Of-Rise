import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate, getApplicationStatusColor, getApplicationStatusLabel } from '@/lib/utils'
import { FileText, Clock, PlusCircle } from 'lucide-react'
import type { VolunteerApplication, Opportunity } from '@/lib/types'

export const metadata: Metadata = { title: 'My Applications' }

const statusOrder = ['pending', 'under_review', 'accepted', 'waitlisted', 'rejected']

export default async function ApplicationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  type AppWithOpp = VolunteerApplication & { opportunities?: Pick<Opportunity, 'title' | 'type'> | null }
  const { data: applicationsRaw } = await supabase
    .from('volunteer_applications')
    .select('*, opportunities(title, type)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  const applications = applicationsRaw as AppWithOpp[] | null

  const grouped = statusOrder.reduce<Record<string, AppWithOpp[]>>((acc, s) => {
    acc[s] = (applications || []).filter(a => a.status === s)
    return acc
  }, {})

  const total = applications?.length || 0

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-text">My Applications</h1>
          <p className="text-neutral-muted mt-1 text-sm">{total} application{total !== 1 ? 's' : ''} submitted</p>
        </div>
        <Link href="/dashboard/apply" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" /> Apply Now
        </Link>
      </div>

      {total === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-border p-16 text-center">
          <FileText className="w-12 h-12 text-neutral-border mx-auto mb-4" />
          <p className="font-semibold text-neutral-text">No applications yet</p>
          <p className="text-neutral-muted text-sm mt-1">Browse open opportunities and submit your first application.</p>
          <div className="flex justify-center gap-3 mt-6">
            <Link href="/dashboard/opportunities" className="btn-outline text-sm">View Opportunities</Link>
            <Link href="/dashboard/apply" className="btn-primary text-sm">Apply Now</Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {statusOrder.map(status => {
            const apps = grouped[status]
            if (!apps || apps.length === 0) return null
            return (
              <div key={status}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getApplicationStatusColor(status as VolunteerApplication['status'])}`}>
                    {getApplicationStatusLabel(status as VolunteerApplication['status'])}
                  </span>
                  <span className="text-xs text-neutral-muted">{apps.length}</span>
                </div>
                <div className="space-y-3">
                  {apps.map((app) => (
                    <div key={app.id} className="bg-white rounded-2xl border border-neutral-border p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-text truncate">
                            {app.opportunities?.title || app.preferred_program || 'General Volunteer Application'}
                          </p>
                          {app.opportunities?.type && (
                            <p className="text-xs text-neutral-muted capitalize mt-0.5">{app.opportunities.type.replace('_', ' ')}</p>
                          )}
                          <div className="flex items-center gap-1 text-xs text-neutral-muted mt-2">
                            <Clock className="w-3 h-3" />
                            Submitted {formatDate(app.created_at)}
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${getApplicationStatusColor(app.status)}`}>
                          {getApplicationStatusLabel(app.status)}
                        </span>
                      </div>

                      {app.admin_notes && (
                        <div className="mt-4 pt-4 border-t border-neutral-border">
                          <p className="text-xs font-semibold text-neutral-text mb-1">Note from team</p>
                          <p className="text-sm text-neutral-muted">{app.admin_notes}</p>
                        </div>
                      )}

                      {/* Summary */}
                      <div className="mt-4 pt-4 border-t border-neutral-border grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        {app.availability && (
                          <div>
                            <span className="text-neutral-muted block">Availability</span>
                            <span className="text-neutral-text font-medium">{app.availability}</span>
                          </div>
                        )}
                        {app.interests.length > 0 && (
                          <div>
                            <span className="text-neutral-muted block">Interests</span>
                            <span className="text-neutral-text font-medium">{app.interests.slice(0, 2).join(', ')}{app.interests.length > 2 ? '…' : ''}</span>
                          </div>
                        )}
                        {app.city && (
                          <div>
                            <span className="text-neutral-muted block">City</span>
                            <span className="text-neutral-text font-medium">{app.city}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
