'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { LinkedInIcon, FacebookIcon } from '@/components/shared/SocialIcons'
import type { TeamMember } from '@/lib/types'

interface Props {
  member: TeamMember
}

export default function TeamCard({ member }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="card group text-center p-6"
    >
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-brand-green-light group-hover:ring-brand-green transition-all duration-300">
        <Image
          src={member.photo || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&face`}
          alt={member.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <h3 className="font-heading font-bold text-neutral-text text-lg">{member.name}</h3>
      <p className="text-sm font-medium text-brand-green mt-0.5">{member.role}</p>

      {member.bio && (
        <p className="text-sm text-neutral-muted mt-3 leading-relaxed line-clamp-3">{member.bio}</p>
      )}

      <div className="flex items-center justify-center gap-3 mt-4">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-neutral-bg hover:bg-brand-green hover:text-white flex items-center justify-center text-neutral-muted transition-colors"
            aria-label={`${member.name} on LinkedIn`}
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
        )}
        {member.facebook && (
          <a
            href={member.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-neutral-bg hover:bg-brand-green hover:text-white flex items-center justify-center text-neutral-muted transition-colors"
            aria-label={`${member.name} on Facebook`}
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="w-8 h-8 rounded-lg bg-neutral-bg hover:bg-brand-green hover:text-white flex items-center justify-center text-neutral-muted transition-colors"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
