'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Pencil, Search, FileText, PlusCircle, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ORG } from '@/lib/constants'
import type { User as AppUser } from '@/lib/types'

interface Props {
  user: AppUser | null
}

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Profile', href: '/dashboard/profile', icon: <User className="w-4 h-4" /> },
  { label: 'Edit Profile', href: '/dashboard/edit-profile', icon: <Pencil className="w-4 h-4" /> },
  { label: 'Opportunities', href: '/dashboard/opportunities', icon: <Search className="w-4 h-4" /> },
  { label: 'My Applications', href: '/dashboard/applications', icon: <FileText className="w-4 h-4" /> },
  { label: 'Apply Now', href: '/dashboard/apply', icon: <PlusCircle className="w-4 h-4" /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
]

export default function UserSidebar({ user }: Props) {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-border min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-border">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo/roots-of-rise-logo.png" alt="Roots of Rise" width={36} height={36} className="object-contain" />
          <span className="font-heading font-bold text-brand-green text-sm">{ORG.name}</span>
        </Link>
      </div>

      {/* User info */}
      {user?.profiles && (
        <div className="p-4 m-3 bg-brand-green-light rounded-xl">
          <p className="font-semibold text-neutral-text text-sm truncate">
            {(user.profiles as { full_name?: string }).full_name || user.email.split('@')[0]}
          </p>
          <p className="text-xs text-neutral-muted mt-0.5 capitalize">{user.role.replace('_', ' ')}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-brand-green text-white shadow-brand'
                  : 'text-neutral-muted hover:text-brand-green hover:bg-brand-green-light'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-neutral-border">
        <form action="/api/auth/logout" method="post">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-neutral-muted hover:text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
