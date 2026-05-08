export interface ProjectData {
  id: string
  slug: string
  title: string
  category: 'education' | 'environment' | 'social_welfare'
  status: 'planning' | 'active' | 'completed' | 'on_hold'
  location: string
  date: string
  cover_image: string
  short_description: string
  full_description: string
  problem: string
  solution: string
  impact: string
  impact_metrics: Record<string, string>
  gallery_images: string[]
  sdg_tags: string[]
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'project-1',
    slug: 'community-learning-support-program',
    title: 'Community Learning Support Program',
    category: 'education',
    status: 'active',
    location: 'Dhaka, Bangladesh',
    date: '2025-03-01',
    cover_image:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop&auto=format',
    short_description:
      'A youth-led learning support initiative helping students build confidence through mentorship and guided educational sessions.',
    full_description:
      'The Community Learning Support Program is a flagship initiative of Roots of Rise that connects youth mentors with students who lack access to quality educational guidance. Through regular learning sessions, one-on-one mentorship, and group workshops, we help students from underprivileged backgrounds develop academic skills, build self-confidence, and discover their potential.',
    problem:
      'Many students in urban and semi-urban areas of Dhaka lack access to personalized educational guidance. Overcrowded classrooms, inadequate teaching resources, and financial constraints prevent families from accessing tutoring or supplementary learning support.',
    solution:
      'Roots of Rise mobilizes university students and educated youth volunteers to provide free, structured learning support in community spaces. Sessions are organized weekly and cover core academic subjects, career awareness, and life skills — all delivered with care and consistency.',
    impact:
      'Since its launch, the program has supported over 300 students across multiple communities in Dhaka. Participants have reported increased academic confidence, better grades, and a stronger sense of direction for their futures.',
    impact_metrics: {
      'Students Supported': '300+',
      'Sessions Held': '150+',
      'Youth Mentors': '30+',
      'Subjects Covered': '6',
    },
    gallery_images: [
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
    ],
    sdg_tags: ['SDG 4: Quality Education', 'SDG 10: Reduced Inequalities'],
  },
  {
    id: 'project-2',
    slug: 'green-tomorrow-tree-plantation-drive',
    title: 'Green Tomorrow Tree Plantation Drive',
    category: 'environment',
    status: 'completed',
    location: 'Narayanganj, Bangladesh',
    date: '2025-01-15',
    cover_image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop&auto=format',
    short_description:
      'A community tree plantation campaign encouraging young people to take responsibility for a greener future.',
    full_description:
      'Green Tomorrow was a large-scale tree plantation initiative organized by Roots of Rise in partnership with local schools and community organizations in Narayanganj. Volunteers planted native tree species across roadsides, open spaces, and institutional grounds — contributing to local biodiversity and environmental awareness.',
    problem:
      'Urban expansion and deforestation in Bangladesh have led to a significant loss of tree cover. Rising temperatures, flooding, and air quality deterioration are directly linked to this loss. Communities lack the organized capacity to restore green cover effectively.',
    solution:
      'Roots of Rise organized a structured plantation drive with community volunteers, providing trees, tools, and training. Post-plantation care was assigned to volunteer teams to ensure long-term survival of planted trees.',
    impact:
      'Over 500 trees were planted across 5 locations in a single campaign day. The event mobilized over 80 youth volunteers and engaged local schools as long-term stewards of planted trees.',
    impact_metrics: {
      'Trees Planted': '500+',
      'Volunteer Participants': '80+',
      'Locations Covered': '5',
      'Partner Schools': '3',
    },
    gallery_images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=300&fit=crop',
    ],
    sdg_tags: ['SDG 13: Climate Action', 'SDG 15: Life on Land'],
  },
  {
    id: 'project-3',
    slug: 'winter-warmth-support-initiative',
    title: 'Winter Warmth Support Initiative',
    category: 'social_welfare',
    status: 'completed',
    location: 'Northern Bangladesh',
    date: '2024-12-10',
    cover_image:
      'https://images.unsplash.com/photo-1459183885421-5cc683b8dbba?w=800&h=500&fit=crop&auto=format',
    short_description:
      'A welfare initiative supporting vulnerable families with warm clothing and essential winter supplies.',
    full_description:
      'The Winter Warmth Support Initiative was organized to provide warm clothing, blankets, and essential winter supplies to vulnerable families in the northern regions of Bangladesh, where winter temperatures can be severely harsh for those without adequate resources.',
    problem:
      'In northern Bangladesh, thousands of low-income families — especially the elderly, children, and daily laborers — face extreme hardship during winter due to lack of warm clothing and shelter resources.',
    solution:
      'Roots of Rise volunteers collected donated clothing and blankets through a community drive, sorted and packaged them hygienically, and distributed them in coordination with local community leaders to ensure they reached those most in need.',
    impact:
      'Over 200 families received warm clothing packages, including 300+ winter items distributed across affected communities. The initiative was completed within two weeks from collection to distribution.',
    impact_metrics: {
      'Families Supported': '200+',
      'Items Distributed': '300+',
      'Volunteer Hours': '400+',
      'Distribution Points': '4',
    },
    gallery_images: [
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop',
    ],
    sdg_tags: ['SDG 1: No Poverty', 'SDG 10: Reduced Inequalities'],
  },
  {
    id: 'project-4',
    slug: 'plastic-free-campus-awareness-campaign',
    title: 'Plastic-Free Campus Awareness Campaign',
    category: 'environment',
    status: 'planning',
    location: 'Dhaka, Bangladesh',
    date: '2026-06-05',
    cover_image:
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop&auto=format',
    short_description:
      'An awareness campaign to reduce single-use plastic and promote sustainable habits among young people.',
    full_description:
      'The Plastic-Free Campus Campaign is an upcoming initiative that aims to inspire young people in educational institutions to eliminate single-use plastic from their daily lives. Through workshops, creative campaigns, and campus challenges, Roots of Rise will build a movement for sustainable everyday habits.',
    problem:
      'Single-use plastic pollution is one of the most visible and damaging environmental challenges in Bangladesh. Rivers, streets, and public spaces are overwhelmed by plastic waste — and much of it originates from disposable items used by young people in schools, colleges, and universities.',
    solution:
      'Roots of Rise will partner with educational institutions to organize plastic-free pledges, creative awareness activities, alternative product showcases, and peer-to-peer sustainability challenges that make going plastic-free fun, meaningful, and community-driven.',
    impact:
      'This campaign is in the planning stage and is expected to engage 1,000+ students across 5 institutions in Dhaka, with measurable reductions in campus plastic consumption tracked over 3 months.',
    impact_metrics: {
      'Target Students': '1,000+',
      'Partner Institutions': '5',
      'Campaign Duration': '3 months',
      'Expected Plastic Reduction': '30%',
    },
    gallery_images: [
      'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400&h=300&fit=crop',
    ],
    sdg_tags: ['SDG 12: Responsible Consumption', 'SDG 14: Life Below Water'],
  },
  {
    id: 'project-5',
    slug: 'girls-education-mentorship-session',
    title: "Girls' Education Mentorship Session",
    category: 'education',
    status: 'active',
    location: 'Bangladesh',
    date: '2025-02-01',
    cover_image:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=500&fit=crop&auto=format',
    short_description:
      'A mentorship-based program designed to support confidence, learning, and leadership among young girls.',
    full_description:
      'This initiative focuses specifically on supporting young girls from underserved communities through mentorship, motivational sessions, and skill-building workshops. Female volunteers and educators from Roots of Rise serve as role models and guides — showing girls that education is their right and leadership is their potential.',
    problem:
      'Despite progress, gender-based educational inequality remains a significant challenge in many parts of Bangladesh. Social norms, early marriage pressures, and lack of female role models prevent many girls from fully realizing their academic and professional potential.',
    solution:
      'Roots of Rise connects girls with accomplished female mentors who share their stories, provide academic guidance, and facilitate group discussions on confidence, rights, and ambition. Sessions are designed to be safe, encouraging, and empowering.',
    impact:
      'The program has reached over 150 girls across multiple sessions, with participants reporting improved confidence, stronger educational aspirations, and a greater belief in their own futures.',
    impact_metrics: {
      'Girls Reached': '150+',
      'Sessions Conducted': '20+',
      'Female Mentors': '15+',
      'Retention Rate': '90%',
    },
    gallery_images: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
    ],
    sdg_tags: ['SDG 4: Quality Education', 'SDG 5: Gender Equality'],
  },
  {
    id: 'project-6',
    slug: 'community-care-food-support-drive',
    title: 'Community Care & Food Support Drive',
    category: 'social_welfare',
    status: 'planning',
    location: 'Bangladesh',
    date: '2026-07-01',
    cover_image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop&auto=format',
    short_description:
      'A community support project focused on food assistance, dignity, and youth-led service.',
    full_description:
      'The Community Care & Food Support Drive is an upcoming project that will organize structured food assistance for vulnerable families, with an emphasis on dignified distribution and personal connection. Volunteers will prepare and distribute food packages while also engaging with communities to understand and respond to their broader needs.',
    problem:
      'Food insecurity affects millions in Bangladesh, particularly in urban slums and flood-prone areas. Quick, organized food support — delivered with care and dignity — can make a profound difference in times of need.',
    solution:
      'Roots of Rise will mobilize volunteers to collect, prepare, and distribute food packages in partnership with local community leaders. The project will prioritize families most in need and maintain respect and dignity throughout the process.',
    impact:
      'This project is in the planning phase and aims to reach 300+ families with food support packages, with volunteer teams providing both material support and human connection.',
    impact_metrics: {
      'Target Families': '300+',
      'Volunteer Teams': '10+',
      'Distribution Points': '5',
      'Expected Launch': 'Mid-2026',
    },
    gallery_images: [
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop',
    ],
    sdg_tags: ['SDG 2: Zero Hunger', 'SDG 3: Good Health & Well-Being'],
  },
  {
    id: 'project-7',
    slug: 'digital-literacy-for-rural-youth',
    title: 'Digital Literacy for Rural Youth',
    category: 'education',
    status: 'planning',
    location: 'Rural Bangladesh',
    date: '2026-08-01',
    cover_image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&auto=format',
    short_description:
      'Bringing basic digital skills to rural youth to bridge the technology gap and expand opportunities.',
    full_description:
      'This initiative will establish mobile digital literacy hubs in rural areas, equipping young people with foundational computer skills, internet safety knowledge, and exposure to digital tools for learning and income generation.',
    problem:
      'The digital divide between urban and rural Bangladesh remains stark. Many rural youth have never used a computer, limiting their access to modern education, employment opportunities, and digital government services.',
    solution:
      'Roots of Rise will deploy volunteer trainers with portable devices to conduct structured digital literacy sessions in community centers, covering device operation, internet navigation, and essential productivity tools.',
    impact:
      'Expected to reach 400+ youth across 8 rural communities, with each participant receiving a certificate of completion and access to follow-up resources.',
    impact_metrics: {
      'Target Youth': '400+',
      'Communities': '8',
      'Training Hours': '20 per participant',
      'Launch': 'August 2026',
    },
    gallery_images: [],
    sdg_tags: ['SDG 4: Quality Education', 'SDG 9: Industry & Innovation'],
  },
  {
    id: 'project-8',
    slug: 'clean-river-campaign',
    title: 'Clean River Campaign',
    category: 'environment',
    status: 'planning',
    location: 'Buriganga River, Dhaka',
    date: '2026-09-15',
    cover_image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format',
    short_description:
      'A river cleanup and awareness drive focused on restoring the Buriganga River ecosystem.',
    full_description:
      'The Clean River Campaign will mobilize youth volunteers for a large-scale cleanup of the Buriganga riverbank combined with a public awareness campaign on industrial and household pollution. The project includes partnerships with local environmental groups and media.',
    problem:
      'The Buriganga River, once the lifeline of Dhaka, is severely polluted by industrial waste, sewage, and plastic. This threatens the health of millions who live along its banks and those who depend on it for their livelihoods.',
    solution:
      'Organized cleanup drives with waste segregation, combined with social media documentation and school awareness programs to create lasting behavioral change in surrounding communities.',
    impact:
      'The campaign aims to remove 5+ tons of waste and reach 10,000+ people through awareness activities, with media coverage amplifying the message.',
    impact_metrics: {
      'Target Waste Removed': '5+ tons',
      'Volunteer Days': '3',
      'Awareness Reach': '10,000+',
      'Launch': 'September 2026',
    },
    gallery_images: [],
    sdg_tags: ['SDG 6: Clean Water', 'SDG 14: Life Below Water'],
  },
  {
    id: 'project-9',
    slug: 'youth-mental-health-awareness-program',
    title: 'Youth Mental Health Awareness Program',
    category: 'social_welfare',
    status: 'planning',
    location: 'Dhaka, Bangladesh',
    date: '2026-10-10',
    cover_image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop&auto=format',
    short_description:
      'Normalizing mental health conversations among young people through open dialogue, peer support, and awareness events.',
    full_description:
      'This program will organize mental health awareness workshops, peer-led support circles, and public awareness campaigns aimed at reducing stigma and encouraging young people to seek help when needed. Trained volunteers and mental health professionals will collaborate to deliver safe, informed sessions.',
    problem:
      'Mental health is severely stigmatized in Bangladesh, and young people facing anxiety, depression, and stress often have no safe space to talk about it. Lack of awareness and professional resources leaves many silently struggling.',
    solution:
      'Roots of Rise will create structured awareness workshops and peer support networks facilitated by trained volunteers, with resource guides distributed at schools and universities.',
    impact:
      'Expected to reach 500+ young people directly and thousands more through online awareness campaigns, creating a more informed and empathetic youth community.',
    impact_metrics: {
      'Target Participants': '500+',
      'Sessions Planned': '10',
      'Partner Organizations': '3',
      'Launch': 'October 2026',
    },
    gallery_images: [],
    sdg_tags: ['SDG 3: Good Health', 'SDG 10: Reduced Inequalities'],
  },
  {
    id: 'project-10',
    slug: 'womens-empowerment-workshop-series',
    title: "Women's Empowerment Workshop Series",
    category: 'social_welfare',
    status: 'planning',
    location: 'Bangladesh',
    date: '2026-11-01',
    cover_image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop&auto=format',
    short_description:
      'Empowering women with skills, knowledge, and networks to lead more independent and dignified lives.',
    full_description:
      "A series of workshops designed to equip women and young girls from underserved communities with practical skills — financial literacy, legal rights awareness, vocational skills, and leadership development. The series will feature women professionals as facilitators and role models.",
    problem:
      'Many women in Bangladesh face barriers to economic independence, legal knowledge, and leadership due to social norms, limited education, and lack of access to professional networks.',
    solution:
      "Monthly workshops over six months featuring expert facilitators, interactive activities, and peer learning. Participants will also receive mentorship connections and access to Roots of Rise's volunteer network.",
    impact:
      'Targeting 200 women across 4 rounds of workshops, with long-term follow-up to track economic and social outcomes for participants.',
    impact_metrics: {
      'Target Participants': '200',
      'Workshop Rounds': '4',
      'Duration': '6 months',
      'Launch': 'November 2026',
    },
    gallery_images: [],
    sdg_tags: ['SDG 5: Gender Equality', 'SDG 8: Decent Work'],
  },
  {
    id: 'project-11',
    slug: 'zero-waste-school-initiative',
    title: 'Zero Waste School Initiative',
    category: 'environment',
    status: 'planning',
    location: 'Dhaka, Bangladesh',
    date: '2027-01-15',
    cover_image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format',
    short_description:
      'Transforming school campuses into zero-waste models through student-led sustainability programs.',
    full_description:
      'The Zero Waste School Initiative will work with partner schools to implement waste reduction systems — composting, recycling stations, and plastic-free canteen policies — while engaging students as sustainability leaders in their own communities.',
    problem:
      'Schools generate significant amounts of waste through food packaging, paper, and disposable materials. There is little structured guidance on how schools can reduce their environmental footprint despite having large, motivated student populations.',
    solution:
      'Roots of Rise will develop a Zero Waste School Toolkit and work with school administrations to implement it over a semester. Student-led Green Committees will be formed to monitor and maintain progress.',
    impact:
      'Aiming to pilot in 3 schools, divert 60% of campus waste from landfill, and create a replicable model that can be scaled to 20+ schools by 2028.',
    impact_metrics: {
      'Pilot Schools': '3',
      'Target Waste Diversion': '60%',
      'Student Leaders': '50+',
      'Launch': 'January 2027',
    },
    gallery_images: [],
    sdg_tags: ['SDG 12: Responsible Consumption', 'SDG 11: Sustainable Cities'],
  },
]
