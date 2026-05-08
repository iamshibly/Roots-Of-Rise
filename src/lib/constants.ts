import type { Variants } from 'framer-motion'

// ─── Framer Motion Variants ───────────────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const staggerSlowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

// ─── Organization Info ────────────────────────────────────────────────────────

export const ORG = {
  name: 'Roots of Rise',
  motto: 'Educate. Empower. Elevate.',
  tagline: 'Growing Change From the Ground Up',
  missionShort: 'A youth-led nonprofit creating impact through education, social welfare, and environmental sustainability.',
  email: 'info@rootsofrise.org',
  phone: '+880 1XXX-XXXXXX',
  address: 'Dhaka, Bangladesh',
  linkedin: 'https://www.linkedin.com/company/roots-of-rise/posts/?feedView=all',
  facebook: 'https://www.facebook.com/RootsofRise',
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Programs', href: '/programs',
    children: [
      { label: 'Education', href: '/programs/education' },
      { label: 'Environmental Sustainability', href: '/programs/environmental-sustainability' },
      { label: 'Social Welfare', href: '/programs/social-welfare' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Impact', href: '/impact' },
  { label: 'Team', href: '/team' },
  { label: 'Stories', href: '/stories' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

// ─── Program Pillars ──────────────────────────────────────────────────────────

export const PROGRAM_PILLARS = [
  {
    slug: 'education',
    title: 'Education',
    tagline: 'Empowering Minds, Building Futures',
    description:
      'Empowering minds and creating accessible learning opportunities through mentorship, awareness campaigns, and community-based education initiatives.',
    icon: 'GraduationCap',
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    category: 'education' as const,
  },
  {
    slug: 'environmental-sustainability',
    title: 'Environmental Sustainability',
    tagline: 'Protecting Our Planet, Together',
    description:
      'Protecting our planet through conscious action, advocacy, tree plantation drives, clean-up campaigns, and sustainable community practices.',
    icon: 'Leaf',
    color: 'from-brand-green to-brand-green-dark',
    bgLight: 'bg-brand-green-light',
    textColor: 'text-brand-green',
    category: 'environment' as const,
  },
  {
    slug: 'social-welfare',
    title: 'Social Welfare',
    tagline: 'Compassion in Action',
    description:
      'Supporting vulnerable communities, promoting dignity, and fostering social equity through welfare programs and direct community support initiatives.',
    icon: 'Heart',
    color: 'from-rose-500 to-rose-700',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-700',
    category: 'social_welfare' as const,
  },
]

// ─── Admin Roles ──────────────────────────────────────────────────────────────

export const ADMIN_ROLES = ['admin', 'super_admin', 'editor', 'volunteer_coordinator'] as const

export const APPLICATION_STATUSES = [
  { value: 'pending', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'waitlisted', label: 'Waitlisted' },
] as const

export const INTEREST_AREAS = [
  'Education',
  'Environmental Sustainability',
  'Social Welfare',
  'Media & Content',
  'Event Management',
  'Fundraising',
  'Research & Documentation',
  'Leadership & Coordination',
  'IT & Technology',
  'Other',
]

export const EDUCATION_LEVELS = [
  'SSC / O-Level',
  'HSC / A-Level',
  'Undergraduate',
  'Graduate',
  'Postgraduate',
  'Other',
]

export const AVAILABILITY_OPTIONS = [
  'Weekdays (Morning)',
  'Weekdays (Afternoon)',
  'Weekdays (Evening)',
  'Weekends',
  'Full-time',
  'Flexible',
]
