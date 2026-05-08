import { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import { LinkedInIcon, FacebookIcon } from '@/components/shared/SocialIcons'
import PageHero from '@/components/shared/PageHero'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'
import ContactForm from '@/components/forms/ContactForm'
import { ORG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact — Roots of Rise',
  description: 'Get in touch with Roots of Rise. We welcome partnerships, collaboration, and community inquiries.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have a question, partnership idea, or want to collaborate? We'd love to hear from you."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <SectionHeading eyebrow="Get in Touch" title="Let's Connect" align="left" />
                <p className="prose-brand mt-4 mb-8">
                  Whether you want to partner with us, support our programs, ask a question, or simply
                  learn more about our work — reach out and we will respond within 48 hours.
                </p>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-green-light rounded-xl flex items-center justify-center text-brand-green flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-text text-sm">Email</p>
                      <a href={`mailto:${ORG.email}`} className="text-brand-green hover:underline">{ORG.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-green-light rounded-xl flex items-center justify-center text-brand-green flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-text text-sm">Location</p>
                      <p className="text-neutral-muted">{ORG.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-green-light rounded-xl flex items-center justify-center text-brand-green flex-shrink-0">
                      <LinkedInIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-text text-sm">LinkedIn</p>
                      <a href={ORG.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline text-sm">Roots of Rise</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-green-light rounded-xl flex items-center justify-center text-brand-green flex-shrink-0">
                      <FacebookIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-text text-sm">Facebook</p>
                      <a href={ORG.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline text-sm">@RootsofRise</a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <div className="card p-8">
                  <h3 className="font-heading text-xl font-bold text-neutral-text mb-6">Send a Message</h3>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
