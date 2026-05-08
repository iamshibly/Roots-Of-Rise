// ─── Enum Types ───────────────────────────────────────────────────────────────

export type UserRole = 'member' | 'volunteer_coordinator' | 'editor' | 'admin' | 'super_admin'
export type ApplicationStatus = 'pending' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted'
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on_hold'
export type PostStatus = 'draft' | 'published' | 'archived'
export type OpportunityType = 'volunteer' | 'internship' | 'fellowship' | 'event'
export type OpportunityStatus = 'open' | 'closed' | 'draft'
export type MessageStatus = 'new' | 'read' | 'replied' | 'archived'

// ─── Core Models ──────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  role: UserRole
  is_email_verified: boolean
  created_at: string
  updated_at: string
  last_login_at: string | null
  profiles?: Profile
}

export interface Profile {
  id: string
  user_id: string
  full_name: string | null
  phone: string | null
  city: string | null
  age: number | null
  gender: string | null
  occupation: string | null
  institution: string | null
  education_level: string | null
  skills: string[]
  interests: string[]
  availability: string | null
  bio: string | null
  profile_photo: string | null
  social_link: string | null
  created_at: string
  updated_at: string
}

export interface Opportunity {
  id: string
  title: string
  slug: string
  type: OpportunityType
  description: string | null
  category: string | null
  interest_area: string
  location: string | null
  requirements: string[] | null
  responsibilities: string | null
  commitment: string | null
  status: OpportunityStatus
  is_active: boolean
  deadline: string | null
  created_at: string
  updated_at: string
}

export interface VolunteerApplication {
  id: string
  user_id: string
  opportunity_id: string | null
  full_name: string
  email: string
  phone: string | null
  city: string | null
  age: number | null
  gender: string | null
  occupation: string | null
  institution: string | null
  education_level: string | null
  skills: string[]
  interests: string[]
  availability: string
  motivation: string
  experience: string | null
  preferred_program: string | null
  social_link: string | null
  agree_to_terms: boolean
  status: ApplicationStatus
  admin_notes: string | null
  reviewed_by: string | null
  reviewed_at: string | null
  created_at: string
  updated_at: string
  opportunities?: Opportunity
  users?: User
}

export interface Project {
  id: string
  title: string
  slug: string
  category: 'education' | 'environment' | 'social_welfare'
  short_description: string
  full_description: string | null
  problem: string | null
  solution: string | null
  impact: string | null
  cover_image: string | null
  gallery_images: string[]
  location: string | null
  date: string | null
  status: ProjectStatus
  impact_metrics: Record<string, string | number> | null
  sdg_tags: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  title: string
  slug: string
  tagline: string | null
  description: string
  activities: string[]
  impact_goals: string[]
  cover_image: string | null
  related_project_ids: string[]
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  photo: string | null
  linkedin: string | null
  facebook: string | null
  email: string | null
  display_order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  category: string
  author: string
  status: PostStatus
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string | null
  quote: string
  photo: string | null
  approved: boolean
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  image_url: string
  caption: string | null
  category: string | null
  project_id: string | null
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: MessageStatus
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  created_at: string
}

// ─── Database type shim for Supabase client generics ─────────────────────────

export type Database = {
  public: {
    Tables: {
      users: { Row: User; Insert: Partial<User>; Update: Partial<User> }
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> }
      opportunities: { Row: Opportunity; Insert: Partial<Opportunity>; Update: Partial<Opportunity> }
      volunteer_applications: { Row: VolunteerApplication; Insert: Partial<VolunteerApplication>; Update: Partial<VolunteerApplication> }
      projects: { Row: Project; Insert: Partial<Project>; Update: Partial<Project> }
      programs: { Row: Program; Insert: Partial<Program>; Update: Partial<Program> }
      team_members: { Row: TeamMember; Insert: Partial<TeamMember>; Update: Partial<TeamMember> }
      blog_posts: { Row: BlogPost; Insert: Partial<BlogPost>; Update: Partial<BlogPost> }
      testimonials: { Row: Testimonial; Insert: Partial<Testimonial>; Update: Partial<Testimonial> }
      gallery_images: { Row: GalleryImage; Insert: Partial<GalleryImage>; Update: Partial<GalleryImage> }
      contact_messages: { Row: ContactMessage; Insert: Partial<ContactMessage>; Update: Partial<ContactMessage> }
      site_settings: { Row: SiteSetting; Insert: Partial<SiteSetting>; Update: Partial<SiteSetting> }
      newsletter_subscribers: { Row: NewsletterSubscriber; Insert: Partial<NewsletterSubscriber>; Update: Partial<NewsletterSubscriber> }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_role: UserRole
      application_status: ApplicationStatus
      project_status: ProjectStatus
      post_status: PostStatus
    }
  }
}

// ─── UI / Application Types ───────────────────────────────────────────────────

export interface ImpactStat {
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon?: string
}

export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface Breadcrumb {
  label: string
  href?: string
}

export interface ProgramPillar {
  slug: string
  title: string
  tagline: string
  description: string
  icon: string
  color: string
  category: 'education' | 'environment' | 'social_welfare'
}
