import { Users, Heart, TrendingUp, Leaf } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

const items = [
  { icon: <Users className="w-5 h-5" />, title: 'Youth-Led', desc: 'Powered by passionate young changemakers' },
  { icon: <Heart className="w-5 h-5" />, title: 'Community-Focused', desc: 'Rooted in the needs of real communities' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Impact-Driven', desc: 'Every action measured against real outcomes' },
  { icon: <Leaf className="w-5 h-5" />, title: 'Sustainability-Oriented', desc: 'Building for long-term, lasting change' },
]

export default function TrustStrip() {
  return (
    <section className="py-8 bg-brand-green">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1} direction="up">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{item.title}</p>
                  <p className="text-xs text-white/70 hidden md:block">{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
