import { ExternalLink } from 'lucide-react'
import { LinkedInIcon, FacebookIcon } from '@/components/shared/SocialIcons'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'
import { ORG } from '@/lib/constants'

export default function SocialSection() {
  return (
    <section className="section">
      <div className="container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Follow Us"
            title="Follow Our Journey"
            subtitle="Stay updated with our latest activities, stories, and announcements on social media."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
          <AnimatedSection direction="left">
            <a
              href={ORG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-center gap-4 group hover:border-blue-500 border-2 border-transparent transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                <LinkedInIcon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-neutral-text group-hover:text-blue-600 transition-colors">LinkedIn</p>
                <p className="text-sm text-neutral-muted">Follow our professional updates</p>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-muted group-hover:text-blue-600 transition-colors" />
            </a>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <a
              href={ORG.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-center gap-4 group hover:border-blue-600 border-2 border-transparent transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                <FacebookIcon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-neutral-text group-hover:text-blue-600 transition-colors">Facebook</p>
                <p className="text-sm text-neutral-muted">Join our community page</p>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-muted group-hover:text-blue-600 transition-colors" />
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
