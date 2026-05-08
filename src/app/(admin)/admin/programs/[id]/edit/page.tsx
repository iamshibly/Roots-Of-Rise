import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProgramForm from '@/components/admin/ProgramForm'

export const metadata: Metadata = { title: 'Edit Program' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProgramPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: program } = await supabase.from('programs').select('*').eq('id', id).single()
  if (!program) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/programs" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Programs
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Edit Program</h1>
        <p className="text-neutral-muted mt-1 text-sm truncate max-w-lg">{program.title}</p>
      </div>
      <ProgramForm mode="edit" id={id} initialData={program} />
    </div>
  )
}
