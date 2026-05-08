import { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import AnimatedSection from '@/components/shared/AnimatedSection'

export const metadata: Metadata = { title: 'Terms of Use — Roots of Rise' }

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" breadcrumbs={[{ label: 'Terms of Use' }]} size="sm" backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=400&fit=crop&auto=format" />
      <section className="section">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <div className="space-y-8 text-neutral-muted leading-relaxed">
              <p className="text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              {[
                { title: 'Acceptance of Terms', content: 'By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.' },
                { title: 'Use of Website', content: 'This website is provided for informational purposes and to facilitate volunteer applications for Roots of Rise programs. You agree to use this website only for lawful purposes and in a manner consistent with our values and mission.' },
                { title: 'Volunteer Applications', content: 'By submitting a volunteer application, you agree to provide accurate and complete information. You consent to Roots of Rise contacting you regarding volunteer opportunities and organizational activities.' },
                { title: 'Intellectual Property', content: 'All content on this website, including text, images, and logos, is the property of Roots of Rise and is protected by applicable intellectual property laws.' },
                { title: 'Limitation of Liability', content: 'Roots of Rise shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website.' },
                { title: 'Changes to Terms', content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.' },
                { title: 'Contact', content: 'For questions about these terms, contact us at info@rootsofrise.org.' },
              ].map((s) => (
                <div key={s.title}>
                  <h2 className="font-heading text-xl font-bold text-neutral-text mb-3">{s.title}</h2>
                  <p>{s.content}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
