import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TeamMemberForm from '@/components/admin/TeamMemberForm'

export const metadata: Metadata = { title: 'Edit Team Member' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditTeamMemberPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: member } = await supabase.from('team_members').select('*').eq('id', id).single()
  if (!member) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/team" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Team
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Edit Team Member</h1>
        <p className="text-neutral-muted mt-1 text-sm">Update details for {member.name}.</p>
      </div>
      <TeamMemberForm mode="edit" id={id} initialData={member} />
    </div>
  )
}
