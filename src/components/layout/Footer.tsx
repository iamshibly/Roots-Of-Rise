import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import { LinkedInIcon, FacebookIcon } from '@/components/shared/SocialIcons'
import { ORG } from '@/lib/constants'
import NewsletterForm from '@/components/forms/NewsletterForm'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Projects', href: '/projects' },
  { label: 'Impact', href: '/impact' },
  { label: 'Team', href: '/team' },
]

const getInvolvedLinks = [
  { label: 'Join as Volunteer', href: '/join' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Stories & Blog', href: '/stories' },
  { label: 'Gallery', href: '/gallery' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-text text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo/roots-of-rise-logo.png"
                alt="Roots of Rise"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div>
                <p className="font-heading font-bold text-lg text-white leading-tight">Roots of Rise</p>
                <p className="text-xs text-white/60">Youth-Led Nonprofit</p>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {ORG.missionShort}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={ORG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-green flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={ORG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-green flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${ORG.email}`}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-green flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5">Get Involved</h3>
            <ul className="space-y-3">
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a href={`mailto:${ORG.email}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                {ORG.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {ORG.address}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-sm text-white/70 mb-4">
              Subscribe to our newsletter for the latest updates on our programs and impact.
            </p>
            <NewsletterForm dark />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50 text-center sm:text-left">
            © {new Date().getFullYear()} Roots of Rise. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
