import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PlusCircle, Pencil } from 'lucide-react'
import type { Program } from '@/lib/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Programs' }

export default async function AdminProgramsPage() {
  const supabase = await createClient()
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-text">Programs</h1>
          <p className="text-neutral-muted mt-1 text-sm">{programs?.length ?? 0} programs</p>
        </div>
        <Link href="/admin/programs/new" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" /> New Program
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-border bg-neutral-bg">
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Title</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Tagline</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Updated</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs?.map((program: Program) => (
              <tr key={program.id} className="border-b border-neutral-border last:border-0 hover:bg-neutral-bg/50">
                <td className="px-5 py-4">
                  <p className="font-medium text-neutral-text">{program.title}</p>
                  <p className="text-xs text-neutral-muted">/programs/{program.slug}</p>
                </td>
                <td className="px-5 py-4 text-neutral-muted text-sm">{program.tagline}</td>
                <td className="px-5 py-4 text-neutral-muted text-xs">{formatDate(program.updated_at)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/programs/${program.id}/edit`} className="text-neutral-muted hover:text-brand-green transition-colors">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={program.id} endpoint="/api/admin/programs" label="program" />
                  </div>
                </td>
              </tr>
            ))}
            {!programs?.length && (
              <tr><td colSpan={4} className="px-5 py-12 text-center text-neutral-muted">No programs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
