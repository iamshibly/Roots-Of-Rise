export interface ProgramData {
  slug: string
  title: string
  heroTitle: string
  tagline: string
  description: string
  coverImage: string
  activities: string[]
  impactGoals: string[]
  stats: { value: string; label: string }[]
  gallery: { src: string; alt: string }[]
  whyItMatters: string
}

export const PROGRAMS_DATA: ProgramData[] = [
  {
    slug: 'education',
    title: 'Education',
    heroTitle: 'Education for Every Future',
    tagline: 'Empowering Minds, Building Futures',
    description:
      'We believe education is the root of lasting change. Through mentorship, learning support, awareness sessions, and youth-led teaching initiatives, Roots of Rise works to create accessible learning opportunities for communities that need them most. We focus on bridging educational gaps, building confidence, and empowering young people to become leaders in their own right.',
    coverImage:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&h=700&fit=crop&auto=format',
    whyItMatters:
      'In Bangladesh, millions of children face barriers to quality education due to poverty, inequality, and lack of resources. Youth-led mentorship and community learning initiatives have proven to be among the most effective ways to bridge these gaps — building not only knowledge but confidence and long-term potential.',
    activities: [
      'Community learning and tutoring sessions for underprivileged students',
      'Youth mentorship programs pairing students with experienced guides',
      'School support campaigns including stationery and resource distribution',
      'Career awareness and higher education guidance workshops',
      'Digital literacy and online learning support sessions',
      'Educational material and book distribution drives',
    ],
    impactGoals: [
      'Increase access to quality education for marginalized youth',
      'Reduce dropout rates through mentorship and community support',
      'Build digital literacy and 21st-century skills',
      'Empower young people as educators and community leaders',
      'Create sustainable local learning ecosystems',
    ],
    stats: [
      { value: '300+', label: 'Students Supported' },
      { value: '20+', label: 'Workshops Delivered' },
      { value: '30+', label: 'Youth Mentors Trained' },
      { value: '500+', label: 'Materials Distributed' },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop',
        alt: 'Student studying in a community learning session',
      },
      {
        src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
        alt: 'Youth mentorship session at a local school',
      },
      {
        src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop',
        alt: 'Students participating in a learning workshop',
      },
    ],
  },
  {
    slug: 'environmental-sustainability',
    title: 'Environmental Sustainability',
    heroTitle: 'Protecting Our Planet Through Youth Action',
    tagline: 'Protecting Our Planet, Together',
    description:
      'Environmental sustainability is not just a future issue — it is a responsibility we carry today. Roots of Rise mobilizes young people to protect nature, reduce waste, plant trees, and promote environmentally conscious living. We believe youth-led environmental action creates ripple effects that extend far beyond individual campaigns, building a culture of responsibility for generations to come.',
    coverImage:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&h=700&fit=crop&auto=format',
    whyItMatters:
      'Bangladesh is one of the most climate-vulnerable countries in the world. Rising temperatures, floods, and pollution threaten communities across the country. Young people have the energy, creativity, and urgency to lead the environmental response — and Roots of Rise gives them the platform to do it.',
    activities: [
      'Tree plantation drives across local communities and institutions',
      'Clean-up campaigns in neighborhoods, parks, and water bodies',
      'Plastic-free awareness campaigns promoting sustainable alternatives',
      'Recycling awareness workshops for schools and communities',
      'Climate education and environmental literacy sessions',
      'Green campus campaigns encouraging sustainable student institutions',
    ],
    impactGoals: [
      'Plant thousands of trees across communities and green spaces',
      'Reduce plastic waste through youth-led awareness campaigns',
      'Build community capacity for environmental stewardship',
      'Integrate environmental thinking into everyday youth culture',
      'Establish green norms and sustainable habits in institutions',
    ],
    stats: [
      { value: '500+', label: 'Trees Planted' },
      { value: '15+', label: 'Clean-Up Drives' },
      { value: '2,000+', label: 'People Reached' },
      { value: '10+', label: 'Partner Schools' },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        alt: 'Youth volunteers planting trees in a green space',
      },
      {
        src: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&h=400&fit=crop',
        alt: 'Beautiful forest scene representing environmental sustainability',
      },
      {
        src: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=600&h=400&fit=crop',
        alt: 'Community clean-up campaign led by youth volunteers',
      },
    ],
  },
  {
    slug: 'social-welfare',
    title: 'Social Welfare',
    heroTitle: 'Standing Beside Communities With Dignity',
    tagline: 'Compassion in Action',
    description:
      'Roots of Rise believes social welfare should be rooted in dignity, empathy, and organized action. We support vulnerable communities through youth-led welfare initiatives, awareness campaigns, and direct community support. Every act of collective care brings us closer to a society where no one is left behind.',
    coverImage:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=700&fit=crop&auto=format',
    whyItMatters:
      'Millions of families across Bangladesh face extreme poverty, food insecurity, and harsh winter conditions with little support. Youth organizations can respond quickly, compassionately, and with deep community trust — making a real difference in the lives of those most in need.',
    activities: [
      'Winter clothing distribution campaigns for vulnerable families',
      'Food support and emergency meal distribution programs',
      'Community care visits and support for elderly and isolated individuals',
      'Health awareness and hygiene promotion campaigns',
      'Emergency response support during floods and natural disasters',
      'Outreach and support programs for marginalized communities',
    ],
    impactGoals: [
      'Provide essential support to hundreds of vulnerable families',
      'Ensure dignity and compassion in all welfare activities',
      'Build youth capacity for organized community service',
      'Establish long-term partnerships with local community leaders',
      'Create a culture of social responsibility among young volunteers',
    ],
    stats: [
      { value: '200+', label: 'Families Supported' },
      { value: '5+', label: 'Welfare Campaigns' },
      { value: '500+', label: 'Meals Distributed' },
      { value: '300+', label: 'Winter Packages Given' },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
        alt: 'Volunteers working together in a community welfare drive',
      },
      {
        src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop',
        alt: 'Community members receiving support from Roots of Rise volunteers',
      },
      {
        src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop',
        alt: 'Youth-led social welfare campaign serving the community',
      },
    ],
  },
]
