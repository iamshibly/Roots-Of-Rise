import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProjectForm from '@/components/admin/ProjectForm'

export const metadata: Metadata = { title: 'New Project' }

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">New Project</h1>
        <p className="text-neutral-muted mt-1 text-sm">Add a new project or initiative.</p>
      </div>
      <ProjectForm mode="create" />
    </div>
  )
}
