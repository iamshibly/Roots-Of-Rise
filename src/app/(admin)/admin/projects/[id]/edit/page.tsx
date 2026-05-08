import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProjectForm from '@/components/admin/ProjectForm'

export const metadata: Metadata = { title: 'Edit Project' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single()
  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Edit Project</h1>
        <p className="text-neutral-muted mt-1 text-sm truncate max-w-lg">{project.title}</p>
      </div>
      <ProjectForm mode="edit" id={id} initialData={project} />
    </div>
  )
}
