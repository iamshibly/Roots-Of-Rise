'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LayoutDashboard, Shield } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import { cn } from '@/lib/utils'
import { NAV_LINKS, ORG } from '@/lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const programsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProgramsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (programsRef.current && !programsRef.current.contains(e.target as Node)) {
        setProgramsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])


  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-green/95 backdrop-blur-md shadow-sm border-b border-brand-green-dark/20'
          : 'bg-transparent'
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/images/logo/roots-of-rise-logo.png"
            alt="Roots of Rise"
            width={44}
            height={44}
            className="w-10 h-10 md:w-11 md:h-11 object-contain"
            priority
          />
          <div className="hidden sm:block">
            <p className="font-heading font-bold text-lg leading-tight transition-colors text-white">
              Roots of Rise
            </p>
            <p className="text-xs leading-none transition-colors text-white/80">
              {ORG.motto}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            if (link.children) {
              return (
                <div key={link.href} ref={programsRef} className="relative">
                  <button
                    onClick={() => setProgramsOpen(!programsOpen)}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10',
                      pathname.startsWith('/programs') && 'text-white font-semibold bg-white/10'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', programsOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {programsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card-hover border border-neutral-border overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-neutral-text hover:text-brand-green hover:bg-brand-green-light transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'text-white/90 hover:text-white hover:bg-white/10',
                  isActive && 'text-white font-semibold bg-white/10'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all text-white hover:bg-white/10'
                    )}
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                    <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', userMenuOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-card-hover border border-neutral-border overflow-hidden"
                      >
                        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-3 text-sm text-neutral-text hover:bg-brand-green-light hover:text-brand-green">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link href="/admin" className="flex items-center gap-2 px-4 py-3 text-sm text-neutral-text hover:bg-brand-green-light hover:text-brand-green">
                          <Shield className="w-4 h-4" /> Admin
                        </Link>
                        <div className="border-t border-neutral-border" />
                        <form action="/api/auth/logout" method="post">
                          <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                            Sign Out
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/join" className="btn-gradient text-sm px-5 py-2.5">
                  Join Us
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            'lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10'
          )}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-neutral-border overflow-hidden"
          >
            <div className="container py-4 space-y-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.href}>
                      <p className="px-3 py-2 text-sm font-semibold text-neutral-muted uppercase tracking-wider">
                        {link.label}
                      </p>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-6 py-2 text-sm text-neutral-text hover:text-brand-green hover:bg-brand-green-light rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                      pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                        ? 'text-brand-green bg-brand-green-light'
                        : 'text-neutral-text hover:text-brand-green hover:bg-brand-green-light'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-3 border-t border-neutral-border flex flex-col gap-2">
                {user ? (
                  <>
                    <Link href="/dashboard" className="btn-outline text-center text-sm py-2.5">
                      Dashboard
                    </Link>
                    <form action="/api/auth/logout" method="post">
                      <button className="w-full text-sm text-red-600 py-2">Sign Out</button>
                    </form>
                  </>
                ) : (
                  <Link href="/join" className="btn-gradient text-center text-sm py-2.5">
                    Join Us
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
