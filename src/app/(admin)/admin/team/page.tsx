import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { PlusCircle, Pencil } from 'lucide-react'
import Link from 'next/link'
import type { TeamMember } from '@/lib/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Team' }

export default async function AdminTeamPage() {
  const supabase = await createClient()
  const { data: members } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-text">Team Members</h1>
          <p className="text-neutral-muted mt-1 text-sm">{members?.length ?? 0} members</p>
        </div>
        <Link href="/admin/team/new" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" /> Add Member
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members?.map((member: TeamMember) => (
          <div key={member.id} className="bg-white rounded-2xl border border-neutral-border p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-green-light overflow-hidden shrink-0 relative">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-brand-green">
                    {member.name[0]}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-neutral-text truncate">{member.name}</p>
                <p className="text-xs text-neutral-muted truncate">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-border">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {member.status}
              </span>
              <div className="flex gap-2">
                <Link href={`/admin/team/${member.id}/edit`} className="text-neutral-muted hover:text-brand-green transition-colors">
                  <Pencil className="w-4 h-4" />
                </Link>
                <DeleteButton id={member.id} endpoint="/api/admin/team" label="member" />
              </div>
            </div>
          </div>
        ))}
        {!members?.length && (
          <div className="col-span-full text-center text-neutral-muted py-12">No team members yet.</div>
        )}
      </div>
    </div>
  )
}
