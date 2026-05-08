import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate, getApplicationStatusColor, getApplicationStatusLabel } from '@/lib/utils'
import { APPLICATION_STATUSES } from '@/lib/constants'
import ApplicationActions from '@/components/admin/ApplicationActions'
import type { VolunteerApplication } from '@/lib/types'

export const metadata: Metadata = { title: 'Applications' }

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

export default async function AdminApplicationsPage({ searchParams }: PageProps) {
  const { status = 'all', page = '1' } = await searchParams
  const supabase = await createClient()

  const pageNum = parseInt(page)
  const limit = 25
  const offset = (pageNum - 1) * limit

  let query = supabase
    .from('volunteer_applications')
    .select('*, opportunities(title)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data: applications, count } = await query
  const totalPages = Math.ceil((count || 0) / limit)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Applications</h1>
        <p className="text-neutral-muted mt-1 text-sm">{count ?? 0} total applications</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <Link
          href="/admin/applications"
          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
            status === 'all' ? 'bg-neutral-text text-white border-neutral-text' : 'border-neutral-border text-neutral-muted hover:border-brand-green'
          }`}
        >
          All
        </Link>
        {APPLICATION_STATUSES.map((s) => (
          <Link
            key={s.value}
            href={`/admin/applications?status=${s.value}`}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              status === s.value ? 'bg-neutral-text text-white border-neutral-text' : 'border-neutral-border text-neutral-muted hover:border-brand-green'
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border bg-neutral-bg">
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Applicant</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Program / Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Submitted</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications && applications.length > 0 ? (
                applications.map((app: VolunteerApplication & { opportunities?: { title: string } | null }) => (
                  <tr key={app.id} className="border-b border-neutral-border last:border-0 hover:bg-neutral-bg/50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-neutral-text">{app.full_name}</p>
                      <p className="text-xs text-neutral-muted">{app.email}</p>
                      {app.city && <p className="text-xs text-neutral-muted">{app.city}</p>}
                    </td>
                    <td className="px-5 py-4 text-neutral-muted">
                      {app.opportunities?.title || app.preferred_program || <span className="italic">General</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getApplicationStatusColor(app.status)}`}>
                        {getApplicationStatusLabel(app.status)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-neutral-muted text-xs whitespace-nowrap">
                      {formatDate(app.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <ApplicationActions applicationId={app.id} currentStatus={app.status} currentNotes={app.admin_notes || ''} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-neutral-muted">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/applications?status=${status}&page=${p}`}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium border transition-all ${
                p === pageNum
                  ? 'bg-brand-green text-white border-brand-green'
                  : 'border-neutral-border text-neutral-muted hover:border-brand-green'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
