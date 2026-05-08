export interface StoryData {
  id: string
  slug: string
  title: string
  category: string
  author: string
  excerpt: string
  content: string
  cover_image: string
  status: 'published'
  featured: boolean
  created_at: string
}

export const STORIES_DATA: StoryData[] = [
  {
    id: 'story-1',
    slug: 'why-youth-leadership-matters-in-community-change',
    title: 'Why Youth Leadership Matters in Community Change',
    category: 'Volunteer Stories',
    author: 'Roots of Rise Team',
    excerpt:
      'Young people are not just the future — they are active agents of change today. This story explores why youth-led approaches to community development are uniquely powerful and why Roots of Rise was built with this belief at its core.',
    cover_image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop&auto=format',
    status: 'published',
    featured: true,
    created_at: '2026-04-15T10:00:00Z',
    content: `When Roots of Rise was founded, the founding team had a simple but powerful conviction: young people don't need to wait for permission to create change. They can lead it — right now, in their own communities, with their own hands.

This belief has shaped everything we do. Our programs are youth-designed and youth-led. Our volunteers don't just carry out instructions — they identify problems, propose solutions, and take ownership of outcomes. And the results speak for themselves.

Why does youth leadership matter so much in community work?

First, young people carry energy and urgency. When a teenager sees a problem in their neighborhood, they feel it personally. They're not calculating risk or waiting for a budget cycle. They act. That urgency translates into drive, creativity, and follow-through.

Second, youth are trusted by communities in ways that formal institutions sometimes are not. A young person from the same area, speaking the same language, understanding the same daily struggles — they connect in ways that external organizations struggle to replicate. Trust is the foundation of effective community work, and youth often have it natively.

Third, young leaders grow through the work. Every program we run creates not just community impact but personal transformation. A volunteer who organizes their first awareness session becomes a more confident, more empathetic, more capable human being. That person carries those qualities with them for the rest of their life — multiplying the impact far beyond any single project.

At Roots of Rise, we believe youth leadership is not a nice-to-have. It is the most powerful engine of sustainable, community-rooted change. And we are just getting started.`,
  },
  {
    id: 'story-2',
    slug: 'a-day-at-our-tree-plantation-drive',
    title: 'A Day at Our Tree Plantation Drive',
    category: 'Environment',
    author: 'Environmental Sustainability Team',
    excerpt:
      'Last month, over 80 youth volunteers gathered at dawn to plant 500 trees across five locations in Narayanganj. Here is what that day looked like — and what it meant to everyone involved.',
    cover_image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop&auto=format',
    status: 'published',
    featured: false,
    created_at: '2026-03-22T09:00:00Z',
    content: `The morning started before sunrise. By 6:30 AM, volunteers were already gathering at the assembly point — some arriving by rickshaw, some on foot, all of them carrying the same quiet excitement that comes with doing something meaningful together.

Our team had spent two weeks organizing the Green Tomorrow Tree Plantation Drive: sourcing saplings, coordinating with local authorities, identifying suitable planting sites, and training volunteers on proper planting techniques. All that preparation was about to become action.

The five locations we covered ranged from a local school compound to a roadside stretch near a community market. Each team of volunteers was assigned a location, given saplings and tools, and guided by a team lead who had practiced the planting protocol.

What struck us most was how naturally people fell into it. Some dug. Some planted. Some poured water. Others held saplings steady while teammates filled in the soil. Without instruction, people organized themselves. That is what community action looks like when it is genuine.

By noon, over 500 trees had been planted. But the numbers only tell part of the story. What mattered more was watching a group of young people — many of them strangers at the start of the day — work together with shared purpose and leave as a community.

We assigned each school a tree-care team, responsible for watering and monitoring the plants over the coming months. Three months later, survival rates are above 85%.

This was not just a day of planting trees. It was a day of planting values — responsibility, collective action, and care for the world around us.`,
  },
  {
    id: 'story-3',
    slug: 'education-as-a-tool-for-social-change',
    title: 'Education as a Tool for Social Change',
    category: 'Education',
    author: 'Education Team',
    excerpt:
      'When we run learning support sessions, we are not just helping students with math or English. We are changing what they believe is possible for themselves. This is what education as community transformation looks like.',
    cover_image:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=450&fit=crop&auto=format',
    status: 'published',
    featured: false,
    created_at: '2026-02-28T10:00:00Z',
    content: `One of our education volunteers recently shared a moment that stayed with us.

She had been running weekly learning sessions for a group of students aged 12 to 16 in a community in Dhaka for three months. The students came from families where parents worked as daily laborers, where books were a luxury, and where the idea of going to university felt like a fantasy from another world.

One afternoon, a 14-year-old student named Riya — usually quiet and withdrawn — raised her hand and said: "Apu, can I become a doctor?"

That question changed the session. The volunteer said yes. And then she told Riya exactly how — what subjects to focus on, what exams to take, what path to follow. The room went quiet as every other student listened.

That is what education as social change looks like. It is not just about scores or grades. It is about changing the internal story that a child tells themselves about what they are capable of.

When young people from disadvantaged communities believe that education is for them — that it can be their path, not just a privilege for others — everything shifts. Ambitions grow. Families begin to see education differently. Communities change.

Our Community Learning Support Program has supported over 300 students. We track attendance and academic improvement, yes. But we also track confidence. We track questions asked. We track moments where a student says, for the first time, "I think I can."

Those are the metrics that define what education as social change truly means.`,
  },
  {
    id: 'story-4',
    slug: 'supporting-communities-through-collective-action',
    title: 'Supporting Communities Through Collective Action',
    category: 'Social Welfare',
    author: 'Social Welfare Team',
    excerpt:
      'Our Winter Warmth Initiative was more than a clothing distribution drive. It was a reminder that care, when organized and intentional, can reach the people who need it most — and do it with dignity.',
    cover_image:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=450&fit=crop&auto=format',
    status: 'published',
    featured: false,
    created_at: '2026-01-20T10:00:00Z',
    content: `Collective action is not just a phrase. When practiced well, it is one of the most powerful forces for human good.

This past winter, our Social Welfare team organized the Winter Warmth Support Initiative — a project to collect, sort, and distribute warm clothing and blankets to vulnerable families in northern Bangladesh. The project was completed in two weeks from the moment of first announcement to final distribution.

How? Because collective action works.

Within three days of our call for donations, over 400 items of warm clothing had been collected. Volunteers sorted and cleaned every item — carefully, with attention to quality. Nothing would be distributed that we would not ourselves wear.

Packaging was done with dignity in mind: items were neatly folded, placed in clean bags, and tagged. When families received their packages, they were not receiving charity in a transaction. They were receiving care — from young people who saw their neighbors and chose to act.

The distributions were led by local community leaders who knew each family personally. This was intentional. We did not want to show up as outsiders. We wanted to be part of the community's support network — trusted, consistent, and present.

Over 200 families received packages. Many said it was the first time in years they felt genuinely supported by organized youth action.

What this experience reinforced for us: organized collective action, grounded in dignity and community trust, is one of the most powerful tools we have. It does not require massive resources. It requires intention, coordination, and care.

That is what we bring — and that is what we will keep building.`,
  },
  {
    id: 'story-5',
    slug: 'building-a-culture-of-responsible-volunteering',
    title: 'Building a Culture of Responsible Volunteering',
    category: 'Volunteer Stories',
    author: 'Roots of Rise Team',
    excerpt:
      'Not all volunteering is the same. We have learned — sometimes the hard way — what makes volunteer culture truly effective, sustainable, and meaningful. Here is what responsible volunteering looks like at Roots of Rise.',
    cover_image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=450&fit=crop&auto=format',
    status: 'published',
    featured: false,
    created_at: '2025-12-10T10:00:00Z',
    content: `We believe that how you volunteer matters as much as that you volunteer.

In the early days of Roots of Rise, we made some of the mistakes that many young organizations make. We showed up to communities with energy and good intentions — but without enough preparation, community understanding, or follow-through. We organized events that looked good on social media but did not create lasting impact. We sometimes prioritized our own enthusiasm over what communities actually needed.

We learned from that. And those lessons shaped the culture we are building today.

Responsible volunteering at Roots of Rise means several things:

It means listening first. Before we design any program, we ask: What does this community actually need? What would be most helpful? We resist the urge to impose our ideas and instead try to respond to real expressed needs.

It means following through. A one-time gesture is better than nothing, but consistency is transformative. When volunteers commit to a program, they commit to showing up — not just once, but regularly, reliably, over time. That reliability is what builds trust.

It means reflecting and improving. After every project, we debrief. What worked? What did not? What would we do differently? This culture of reflection keeps us honest and keeps us growing.

It means caring about impact, not just activity. We track outcomes, not just outputs. Not how many events we ran, but what changed because of them.

Building this culture takes time. It requires training, honest conversation, and sometimes uncomfortable feedback. But it is the foundation of everything meaningful we do.

If you are thinking about volunteering with us — this is what you are joining. Not just an activity. A way of working, a standard of care, and a community of people who take both action and responsibility seriously.`,
  },
]
