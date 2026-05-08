import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProgramForm from '@/components/admin/ProgramForm'

export const metadata: Metadata = { title: 'New Program' }

export default function NewProgramPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/programs" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Programs
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">New Program</h1>
        <p className="text-neutral-muted mt-1 text-sm">Create a new program pillar entry.</p>
      </div>
      <ProgramForm mode="create" />
    </div>
  )
}
