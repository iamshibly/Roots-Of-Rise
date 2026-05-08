export interface TeamMemberData {
  id: string
  name: string
  role: string
  bio: string
  status: 'active'
  display_order: number
  photo: string
  linkedin: string | null
  facebook: string | null
  email: string | null
}

export const TEAM_DATA: TeamMemberData[] = [
  {
    id: 'tm-1',
    name: 'Araf Rahman',
    role: 'Founder & Executive Director',
    bio: 'Leads the vision, strategy, and long-term growth of Roots of Rise. Passionate about creating systemic change through youth-led action.',
    status: 'active',
    display_order: 1,
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format',
    linkedin: '#',
    facebook: '#',
    email: null,
  },
  {
    id: 'tm-2',
    name: 'Nusrat Jahan',
    role: 'Program Coordinator',
    bio: 'Coordinates program planning, volunteer engagement, and project execution across all three pillars of Roots of Rise.',
    status: 'active',
    display_order: 2,
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format',
    linkedin: '#',
    facebook: '#',
    email: null,
  },
  {
    id: 'tm-3',
    name: 'Samiul Hasan',
    role: 'Education Lead',
    bio: 'Works on learning support, mentorship, and educational access initiatives that empower students from underserved communities.',
    status: 'active',
    display_order: 3,
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format',
    linkedin: '#',
    facebook: '#',
    email: null,
  },
  {
    id: 'tm-4',
    name: 'Tanjila Akter',
    role: 'Environmental Sustainability Lead',
    bio: 'Leads environmental awareness, tree plantation, and climate action activities — mobilizing youth to protect the planet.',
    status: 'active',
    display_order: 4,
    photo:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format',
    linkedin: '#',
    facebook: '#',
    email: null,
  },
  {
    id: 'tm-5',
    name: 'Mehedi Islam',
    role: 'Social Welfare Lead',
    bio: 'Coordinates community support, welfare drives, and outreach initiatives that serve vulnerable families with dignity.',
    status: 'active',
    display_order: 5,
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
    linkedin: '#',
    facebook: '#',
    email: null,
  },
  {
    id: 'tm-6',
    name: 'Farhana Rahman',
    role: 'Communications Officer',
    bio: 'Manages storytelling, content creation, branding, and public communication — amplifying the voice and mission of Roots of Rise.',
    status: 'active',
    display_order: 6,
    photo:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&auto=format',
    linkedin: '#',
    facebook: '#',
    email: null,
  },
  {
    id: 'tm-7',
    name: 'Rafi Chowdhury',
    role: 'Volunteer Coordinator',
    bio: 'Helps recruit, guide, and organize youth volunteers for community action — ensuring every volunteer finds meaningful impact.',
    status: 'active',
    display_order: 7,
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&auto=format',
    linkedin: '#',
    facebook: '#',
    email: null,
  },
  {
    id: 'tm-8',
    name: 'Jannatul Ferdous',
    role: 'Community Outreach Officer',
    bio: 'Builds relationships with communities, partners, and local supporters — ensuring Roots of Rise stays rooted in real community needs.',
    status: 'active',
    display_order: 8,
    photo:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&auto=format',
    linkedin: '#',
    facebook: '#',
    email: null,
  },
]
