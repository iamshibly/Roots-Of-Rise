import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate, getProjectStatusColor } from '@/lib/utils'
import { PlusCircle, Pencil } from 'lucide-react'
import type { Project } from '@/lib/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Projects' }

export default async function AdminProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const categoryColors: Record<string, string> = {
    education: 'bg-blue-50 text-blue-700',
    environment: 'bg-brand-green-light text-brand-green',
    social_welfare: 'bg-rose-50 text-rose-700',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-text">Projects</h1>
          <p className="text-neutral-muted mt-1 text-sm">{projects?.length ?? 0} total projects</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-border bg-neutral-bg">
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Title</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Updated</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project: Project) => (
              <tr key={project.id} className="border-b border-neutral-border last:border-0 hover:bg-neutral-bg/50">
                <td className="px-5 py-4">
                  <p className="font-medium text-neutral-text">{project.title}</p>
                  <p className="text-xs text-neutral-muted">/projects/{project.slug}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${categoryColors[project.category]}`}>
                    {project.category.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getProjectStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-5 py-4 text-neutral-muted text-xs">{formatDate(project.updated_at)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/projects/${project.id}/edit`} className="text-neutral-muted hover:text-brand-green transition-colors">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={project.id} endpoint="/api/admin/projects" label="project" />
                  </div>
                </td>
              </tr>
            ))}
            {!projects?.length && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-neutral-muted">No projects yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
