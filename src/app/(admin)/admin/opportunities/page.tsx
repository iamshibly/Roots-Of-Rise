import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PlusCircle, Pencil } from 'lucide-react'
import type { Opportunity } from '@/lib/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Opportunities' }

const statusColors: Record<string, string> = {
  open: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-600',
  draft: 'bg-yellow-100 text-yellow-700',
}

export default async function AdminOpportunitiesPage() {
  const supabase = await createClient()
  const { data: opportunities } = await supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-text">Opportunities</h1>
          <p className="text-neutral-muted mt-1 text-sm">{opportunities?.length ?? 0} listings</p>
        </div>
        <Link href="/admin/opportunities/new" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" /> New Opportunity
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-border bg-neutral-bg">
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Title</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Deadline</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {opportunities?.map((opp: Opportunity) => (
              <tr key={opp.id} className="border-b border-neutral-border last:border-0 hover:bg-neutral-bg/50">
                <td className="px-5 py-4">
                  <p className="font-medium text-neutral-text">{opp.title}</p>
                  {opp.location && <p className="text-xs text-neutral-muted">{opp.location}</p>}
                </td>
                <td className="px-5 py-4 text-neutral-muted capitalize text-xs">{opp.type}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[opp.status]}`}>
                    {opp.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-neutral-muted text-xs">
                  {opp.deadline ? formatDate(opp.deadline) : '—'}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/opportunities/${opp.id}/edit`} className="text-neutral-muted hover:text-brand-green transition-colors">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={opp.id} endpoint="/api/admin/opportunities" label="opportunity" />
                  </div>
                </td>
              </tr>
            ))}
            {!opportunities?.length && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-neutral-muted">No opportunities yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
