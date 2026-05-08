import { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import AnimatedSection from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Privacy Policy — Roots of Rise',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" breadcrumbs={[{ label: 'Privacy Policy' }]} size="sm" backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=400&fit=crop&auto=format" />
      <section className="section">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <div className="prose prose-neutral max-w-none space-y-8 text-neutral-muted leading-relaxed">
              <div>
                <p className="text-sm text-neutral-muted">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              {[
                { title: 'Information We Collect', content: 'We collect information you provide directly to us, including your name, email address, phone number, and other information you submit through our volunteer application form or contact form. We also collect information about how you use our website through analytics tools.' },
                { title: 'How We Use Your Information', content: 'We use the information we collect to process volunteer applications, communicate with you about our programs and activities, send newsletters (if you subscribe), improve our website and services, and comply with legal obligations.' },
                { title: 'Information Sharing', content: 'We do not sell, trade, or otherwise transfer your personally identifiable information to third parties. We may share information with trusted partners who assist us in operating our website and programs, as long as those parties agree to keep this information confidential.' },
                { title: 'Email Authentication', content: 'Our website uses email-based authentication (magic links). When you log in, we send a secure link to your email address. These links expire after a short period and can only be used once.' },
                { title: 'Data Security', content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
                { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information. You may also unsubscribe from our newsletter at any time. To exercise these rights, contact us at info@rootsofrise.org.' },
                { title: 'Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at info@rootsofrise.org.' },
              ].map((section) => (
                <div key={section.title}>
                  <h2 className="font-heading text-xl font-bold text-neutral-text mb-3">{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
