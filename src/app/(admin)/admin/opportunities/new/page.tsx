import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import OpportunityForm from '@/components/admin/OpportunityForm'

export const metadata: Metadata = { title: 'New Opportunity' }

export default function NewOpportunityPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/opportunities" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Opportunities
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">New Opportunity</h1>
        <p className="text-neutral-muted mt-1 text-sm">Create a new volunteer role or opportunity listing.</p>
      </div>
      <OpportunityForm mode="create" />
    </div>
  )
}
