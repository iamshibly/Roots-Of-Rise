'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Users, Briefcase, FolderOpen,
  BookOpen, BookMarked, ImageIcon, Star, MessageSquare,
  Settings, LogOut, Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ORG } from '@/lib/constants'
import type { UserRole } from '@/lib/types'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  roles: UserRole[]
}

const NAV: NavItem[] = [
  { label: 'Overview', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" />, roles: ['super_admin', 'admin', 'editor', 'volunteer_coordinator'] },
  { label: 'Applications', href: '/admin/applications', icon: <FileText className="w-4 h-4" />, roles: ['super_admin', 'admin', 'volunteer_coordinator'] },
  { label: 'Users', href: '/admin/users', icon: <Users className="w-4 h-4" />, roles: ['super_admin', 'admin', 'volunteer_coordinator'] },
  { label: 'Opportunities', href: '/admin/opportunities', icon: <Briefcase className="w-4 h-4" />, roles: ['super_admin', 'admin', 'volunteer_coordinator'] },
  { label: 'Projects', href: '/admin/projects', icon: <FolderOpen className="w-4 h-4" />, roles: ['super_admin', 'admin', 'editor'] },
  { label: 'Programs', href: '/admin/programs', icon: <Layers className="w-4 h-4" />, roles: ['super_admin', 'admin', 'editor'] },
  { label: 'Blog', href: '/admin/blog', icon: <BookOpen className="w-4 h-4" />, roles: ['super_admin', 'admin', 'editor'] },
  { label: 'Team', href: '/admin/team', icon: <BookMarked className="w-4 h-4" />, roles: ['super_admin', 'admin', 'editor'] },
  { label: 'Gallery', href: '/admin/gallery', icon: <ImageIcon className="w-4 h-4" />, roles: ['super_admin', 'admin', 'editor'] },
  { label: 'Testimonials', href: '/admin/testimonials', icon: <Star className="w-4 h-4" />, roles: ['super_admin', 'admin', 'editor'] },
  { label: 'Messages', href: '/admin/contact-messages', icon: <MessageSquare className="w-4 h-4" />, roles: ['super_admin', 'admin'] },
  { label: 'Settings', href: '/admin/settings', icon: <Settings className="w-4 h-4" />, roles: ['super_admin', 'admin'] },
]

interface Props {
  role: UserRole
  email: string
}

export default function AdminSidebar({ role, email }: Props) {
  const pathname = usePathname()
  const visible = NAV.filter(n => n.roles.includes(role))

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-neutral-text min-h-screen shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo/roots-of-rise-logo.png" alt="Roots of Rise" width={32} height={32} className="object-contain" />
          <span className="font-heading font-bold text-white text-sm">{ORG.name}</span>
        </Link>
        <p className="text-white/40 text-xs mt-1 ml-10">Admin Panel</p>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3">
        <div className="bg-white/10 rounded-xl px-3 py-2">
          <p className="text-white/60 text-xs truncate">{email}</p>
          <p className="text-white text-xs font-semibold capitalize mt-0.5">{role.replace('_', ' ')}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pb-3 space-y-0.5">
        {visible.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-brand-green text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-white/10">
        <form action="/api/auth/logout" method="post">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-red-400 hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
