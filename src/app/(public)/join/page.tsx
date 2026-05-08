import { Metadata } from 'next'
import { Users, Leaf, BookOpen, Heart, Megaphone, Calendar, Search, Code, FileText, ExternalLink, ChevronDown } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedSection from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Join Us — Roots of Rise',
  description: 'Join Roots of Rise as a volunteer and help create meaningful impact in education, social welfare, and environmental sustainability.',
}

const roles = [
  { icon: <BookOpen className="w-5 h-5" />, title: 'Education Team', desc: 'Tutor students, design workshops, mentor youth' },
  { icon: <Leaf className="w-5 h-5" />, title: 'Environmental Team', desc: 'Lead clean-up drives, tree plantation, awareness campaigns' },
  { icon: <Heart className="w-5 h-5" />, title: 'Social Welfare Team', desc: 'Organize food drives, clothing campaigns, community support' },
  { icon: <Megaphone className="w-5 h-5" />, title: 'Media & Content', desc: 'Create content, manage social media, document impact' },
  { icon: <Calendar className="w-5 h-5" />, title: 'Event Management', desc: 'Plan and coordinate organizational events and activities' },
  { icon: <Search className="w-5 h-5" />, title: 'Research & Documentation', desc: 'Track impact metrics and prepare organizational reports' },
  { icon: <Code className="w-5 h-5" />, title: 'Fundraising Team', desc: 'Support fundraising drives and donor engagement efforts' },
  { icon: <Users className="w-5 h-5" />, title: 'Community Outreach', desc: 'Build partnerships and reach communities in need' },
]

const faqs = [
  {
    q: 'Do I need prior experience to join?',
    a: 'Not at all! We welcome passionate individuals of all experience levels. What matters most is your dedication, willingness to learn, and commitment to community.',
  },
  {
    q: 'How much time do I need to commit?',
    a: 'Commitment varies by role and project. Many volunteers contribute 2–5 hours per week. We work around your availability and are flexible with students and working professionals.',
  },
  {
    q: 'Is this only for students in Bangladesh?',
    a: 'Our on-ground programs are based in Bangladesh, but we welcome applicants from anywhere — particularly for media, research, and remote support roles.',
  },
  {
    q: 'What happens after I submit the application?',
    a: 'Our team reviews all applications and reaches out within 1–2 weeks. Shortlisted applicants will be invited for a brief orientation call to discuss fit and next steps.',
  },
]

export default function JoinPage() {
  return (
    <>
      <PageHero
        title="Join Roots of Rise"
        subtitle="Your time, skills, and passion can create lasting change. Join a community of dedicated youth changemakers."
        breadcrumbs={[{ label: 'Join Us' }]}
        backgroundImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=600&fit=crop&auto=format"
      />

      {/* Why join */}
      <section className="section bg-neutral-bg">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why Join"
              title="What You'll Gain"
              subtitle="Joining Roots of Rise is more than volunteering — it's joining a family of purpose-driven changemakers."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: '🌱', title: 'Real Impact', desc: 'Work on real projects that affect real communities' },
              { icon: '🤝', title: 'Network', desc: 'Connect with like-minded youth leaders and changemakers' },
              { icon: '📈', title: 'Leadership Skills', desc: 'Develop leadership, teamwork, and project management skills' },
              { icon: '🏆', title: 'Recognition', desc: 'Be recognized for your contributions and growth' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="card p-6 text-center h-full">
                  <span className="text-4xl block mb-3">{item.icon}</span>
                  <h3 className="font-heading font-bold text-neutral-text mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-muted">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Opportunity Areas"
              title="Where You Can Contribute"
              subtitle="We have opportunities across all pillars and functions — find the role that fits your passion."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {roles.map((role, i) => (
              <AnimatedSection key={role.title} delay={i * 0.05}>
                <div className="card p-5 flex items-start gap-3 hover:border-brand-green border-2 border-transparent transition-all h-full">
                  <div className="w-9 h-9 bg-brand-green-light rounded-xl flex items-center justify-center text-brand-green flex-shrink-0">
                    {role.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-neutral-text">{role.title}</h4>
                    <p className="text-xs text-neutral-muted mt-0.5">{role.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA — Option B: Google Form */}
      <section className="section bg-neutral-bg" id="apply">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Apply Now"
              title="Submit Your Application"
              subtitle="Fill out the application form to apply for volunteer roles and other available opportunities at Roots of Rise."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-brand-green-light via-emerald-50 to-green-100 rounded-3xl p-10 text-center border border-brand-green-muted shadow-sm">
              <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-neutral-text mb-3">
                Ready to Make a Difference?
              </h3>
              <p className="text-neutral-muted mb-2 max-w-md mx-auto leading-relaxed">
                Use the application form to express your interest in volunteering, joining a team, or applying for other available opportunities at Roots of Rise.
              </p>
              <p className="text-sm text-neutral-muted mb-8">
                Applications are reviewed within 1–2 weeks. We look forward to hearing from you.
              </p>
              <a
                href="https://forms.gle/uBr4G4Xh4bYafTxE7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base px-10 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Submit Your Application
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-neutral-muted mt-5">
                Opens in a new tab · Hosted on Google Forms · No account required
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
            />
          </AnimatedSection>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 0.08}>
                <div className="card p-6">
                  <div className="flex items-start gap-3">
                    <ChevronDown className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-semibold text-neutral-text mb-2">{faq.q}</h4>
                      <p className="text-sm text-neutral-muted leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
