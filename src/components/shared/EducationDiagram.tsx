'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Users, BookOpen, Star, Lightbulb, ArrowRight, TrendingUp, Target } from 'lucide-react'

const flowSteps = [
  { icon: <Users className="w-5 h-5" />, label: 'Access', sub: 'Reach learners in need', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Learning Support', sub: 'Guided sessions & study', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { icon: <GraduationCap className="w-5 h-5" />, label: 'Mentorship', sub: 'One-on-one guidance', color: 'bg-violet-50 border-violet-200 text-violet-700' },
  { icon: <Star className="w-5 h-5" />, label: 'Confidence', sub: 'Self-belief & growth', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { icon: <Lightbulb className="w-5 h-5" />, label: 'Opportunity', sub: 'Futures unlocked', color: 'bg-rose-50 border-rose-200 text-rose-700' },
]

const breakdown = [
  { label: 'Learning Sessions', value: 78, color: 'bg-blue-500', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Mentorship Hours', value: 62, color: 'bg-emerald-500', icon: <Users className="w-4 h-4" /> },
  { label: 'Digital Literacy', value: 45, color: 'bg-violet-500', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'Resource Support', value: 88, color: 'bg-amber-500', icon: <Target className="w-4 h-4" /> },
]

const modelCards = [
  { step: '01', title: 'Identify Learners', desc: 'Reach students who lack access to quality educational support in the community.', color: 'border-t-blue-400' },
  { step: '02', title: 'Provide Support', desc: 'Deliver structured, volunteer-led learning sessions tailored to each student\'s need.', color: 'border-t-emerald-400' },
  { step: '03', title: 'Mentor Regularly', desc: 'Build ongoing mentorship relationships that go beyond academics to personal growth.', color: 'border-t-violet-400' },
  { step: '04', title: 'Track Progress', desc: 'Measure learning outcomes, confidence levels, and real-world impact over time.', color: 'border-t-amber-400' },
]

export default function EducationDiagram() {
  return (
    <div className="space-y-16">
      {/* Section 1: Impact Flow */}
      <div>
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
            Education Impact Flow
          </span>
          <h3 className="font-heading text-2xl font-bold text-neutral-text">
            How Education Creates Change
          </h3>
          <p className="text-neutral-muted mt-2 text-sm max-w-lg mx-auto">
            Every student we reach follows a journey — from first access to lasting opportunity.
          </p>
        </div>

        {/* Desktop flow */}
        <div className="hidden md:flex items-center justify-center gap-0">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col items-center text-center w-28"
              >
                <div className={`w-14 h-14 rounded-2xl border-2 ${step.color} flex items-center justify-center mb-3 shadow-sm`}>
                  {step.icon}
                </div>
                <p className="font-semibold text-sm text-neutral-text leading-tight">{step.label}</p>
                <p className="text-xs text-neutral-muted mt-1 leading-tight">{step.sub}</p>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.08, duration: 0.3 }}
                  className="origin-left mx-1"
                >
                  <ArrowRight className="w-5 h-5 text-neutral-muted/50" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile flow — vertical */}
        <div className="flex flex-col items-center gap-2 md:hidden">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 ${step.color} w-full max-w-xs`}
              >
                {step.icon}
                <div>
                  <p className="font-semibold text-sm">{step.label}</p>
                  <p className="text-xs opacity-80">{step.sub}</p>
                </div>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <div className="w-px h-4 bg-neutral-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Learning Support Model */}
      <div>
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
            Our Model
          </span>
          <h3 className="font-heading text-2xl font-bold text-neutral-text">
            The Learning Support Model
          </h3>
          <p className="text-neutral-muted mt-2 text-sm max-w-lg mx-auto">
            A four-stage framework for creating meaningful, measurable learning impact.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modelCards.map((card, i) => (
            <motion.div
              key={card.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-white rounded-2xl p-6 border border-neutral-border border-t-4 ${card.color} shadow-sm hover:shadow-md transition-shadow`}
            >
              <span className="text-3xl font-heading font-bold text-neutral-border">{card.step}</span>
              <h4 className="font-heading font-bold text-neutral-text mt-2 mb-2">{card.title}</h4>
              <p className="text-sm text-neutral-muted leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 3: Impact Breakdown */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-3xl p-8 border border-blue-100">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-3">
            Impact Breakdown
          </span>
          <h3 className="font-heading text-2xl font-bold text-neutral-text">
            Education Impact by Activity
          </h3>
          <p className="text-neutral-muted mt-2 text-sm">
            * Relative impact share based on program activity data (demo).
          </p>
        </div>
        <div className="space-y-5 max-w-xl mx-auto">
          {breakdown.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-text">
                  <span className={`w-6 h-6 rounded-lg ${item.color} text-white flex items-center justify-center`}>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                <span className="text-sm font-bold text-neutral-text">{item.value}%</span>
              </div>
              <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
