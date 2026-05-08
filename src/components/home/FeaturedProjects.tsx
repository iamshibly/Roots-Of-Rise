import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'
import ProjectCard from '@/components/shared/ProjectCard'
import type { Project } from '@/lib/types'

interface Props {
  projects: Project[] | null
}

export default function FeaturedProjects({ projects }: Props) {
  return (
    <section className="section">
      <div className="container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Projects"
            subtitle="From education campaigns to environmental drives — these are some of the initiatives making a real difference."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects?.slice(0, 3).map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} variant="featured" />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link href="/projects" className="btn-outline inline-flex">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
