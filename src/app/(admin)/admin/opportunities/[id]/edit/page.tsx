import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import OpportunityForm from '@/components/admin/OpportunityForm'

export const metadata: Metadata = { title: 'Edit Opportunity' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditOpportunityPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: opp } = await supabase.from('opportunities').select('*').eq('id', id).single()
  if (!opp) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/opportunities" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Opportunities
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Edit Opportunity</h1>
        <p className="text-neutral-muted mt-1 text-sm truncate max-w-lg">{opp.title}</p>
      </div>
      <OpportunityForm mode="edit" id={id} initialData={opp} />
    </div>
  )
}
