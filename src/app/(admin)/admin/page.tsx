import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Users, FolderOpen, MessageSquare, Star, BookOpen, TrendingUp, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { VolunteerApplication } from '@/lib/types'

export const metadata: Metadata = { title: 'Overview' }

export default async function AdminOverviewPage() {
  const supabase = await createClient()

  const [
    { count: totalApps },
    { count: pendingApps },
    { count: totalUsers },
    { count: totalProjects },
    { count: newMessages },
    { data: recentApps },
  ] = await Promise.all([
    supabase.from('volunteer_applications').select('*', { count: 'exact', head: true }),
    supabase.from('volunteer_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('volunteer_applications').select('id, full_name, email, status, created_at, preferred_program').order('created_at', { ascending: false }).limit(5),
  ])

  const kpis = [
    { label: 'Total Applications', value: totalApps ?? 0, icon: FileText, color: 'bg-purple-50 text-purple-600', href: '/admin/applications' },
    { label: 'Pending Review', value: pendingApps ?? 0, icon: Clock, color: 'bg-amber-50 text-amber-600', href: '/admin/applications?status=pending' },
    { label: 'Total Users', value: totalUsers ?? 0, icon: Users, color: 'bg-blue-50 text-blue-600', href: '/admin/users' },
    { label: 'Projects', value: totalProjects ?? 0, icon: FolderOpen, color: 'bg-brand-green-light text-brand-green', href: '/admin/projects' },
    { label: 'New Messages', value: newMessages ?? 0, icon: MessageSquare, color: 'bg-red-50 text-red-600', href: '/admin/contact-messages' },
    { label: 'Growth', value: '+' + (totalUsers ?? 0), icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600', href: '/admin/users' },
  ]

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    waitlisted: 'bg-purple-100 text-purple-800',
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Admin Overview</h1>
        <p className="text-neutral-muted mt-1 text-sm">Roots of Rise content management dashboard.</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-white rounded-2xl border border-neutral-border p-5 hover:border-brand-green hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-neutral-text font-heading">{kpi.value}</p>
            <p className="text-xs text-neutral-muted mt-0.5">{kpi.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="font-heading font-bold text-neutral-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Blog Posts', href: '/admin/blog', icon: BookOpen },
            { label: 'Team Members', href: '/admin/team', icon: Users },
            { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
            { label: 'Site Settings', href: '/admin/settings', icon: FolderOpen },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-neutral-border hover:border-brand-green transition-all text-center"
            >
              <item.icon className="w-6 h-6 text-brand-green" />
              <span className="text-xs font-medium text-neutral-text">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-neutral-text">Recent Applications</h2>
          <Link href="/admin/applications" className="text-sm text-brand-green hover:underline">View all</Link>
        </div>
        <div className="bg-white rounded-2xl border border-neutral-border overflow-hidden">
          {recentApps && recentApps.length > 0 ? (
            recentApps.map((app: Partial<VolunteerApplication>, i: number) => (
              <div
                key={app.id}
                className={`flex items-center gap-4 px-5 py-4 ${i < recentApps.length - 1 ? 'border-b border-neutral-border' : ''}`}
              >
                <div className="w-9 h-9 rounded-full bg-brand-green-light flex items-center justify-center shrink-0 font-semibold text-brand-green text-sm">
                  {(app.full_name || 'A')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-text truncate">{app.full_name}</p>
                  <p className="text-xs text-neutral-muted truncate">{app.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[app.status!] || ''}`}>
                    {app.status?.replace('_', ' ')}
                  </span>
                  <p className="text-xs text-neutral-muted mt-1">{formatDate(app.created_at!)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-muted text-sm text-center py-8">No applications yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
