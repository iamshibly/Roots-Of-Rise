import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { MapPin, Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import type { Opportunity } from '@/lib/types'

export const metadata: Metadata = { title: 'Opportunities' }

export default async function OpportunitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: opportunities } = await supabase
    .from('opportunities')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const typeColors: Record<string, string> = {
    full_time: 'bg-blue-50 text-blue-700',
    part_time: 'bg-purple-50 text-purple-700',
    remote: 'bg-green-50 text-green-700',
    on_site: 'bg-amber-50 text-amber-700',
    hybrid: 'bg-pink-50 text-pink-700',
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Open Opportunities</h1>
        <p className="text-neutral-muted mt-1 text-sm">Explore volunteer roles and make an impact with Roots of Rise.</p>
      </div>

      {opportunities && opportunities.length > 0 ? (
        <div className="space-y-4">
          {opportunities.map((opp: Opportunity) => (
            <div key={opp.id} className="bg-white rounded-2xl border border-neutral-border p-6 hover:border-brand-green hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${typeColors[opp.type] || 'bg-neutral-bg text-neutral-muted'}`}>
                      {opp.type.replace('_', ' ')}
                    </span>
                    <span className="bg-brand-green-light text-brand-green text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                      {opp.interest_area.replace('_', ' ')}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-neutral-text text-lg">{opp.title}</h2>
                  {opp.description && (
                    <p className="text-neutral-muted text-sm mt-1 line-clamp-2">{opp.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-neutral-muted">
                    {opp.location && (
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {opp.location}</span>
                    )}
                    {opp.commitment && (
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {opp.commitment}</span>
                    )}
                    {opp.deadline && (
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Deadline: {formatDate(opp.deadline)}</span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/dashboard/apply?opportunity=${opp.id}`}
                  className="btn-primary flex items-center gap-2 text-sm shrink-0"
                >
                  Apply <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {opp.requirements && opp.requirements.length > 0 && (
                <div className="mt-4 pt-4 border-t border-neutral-border">
                  <p className="text-xs font-semibold text-neutral-text mb-1.5">Requirements</p>
                  <ul className="flex flex-wrap gap-2">
                    {opp.requirements.map((r: string) => (
                      <li key={r} className="text-xs bg-neutral-bg text-neutral-muted px-2.5 py-0.5 rounded-full">{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-border p-16 text-center">
          <Search className="w-12 h-12 text-neutral-border mx-auto mb-4" />
          <p className="font-semibold text-neutral-text">No open opportunities right now</p>
          <p className="text-neutral-muted text-sm mt-1">Check back soon — new roles are added regularly.</p>
          <Link href="/dashboard/apply" className="btn-primary mt-6 inline-flex">Submit General Application</Link>
        </div>
      )}
    </div>
  )
}
