'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react'
import { applicationSchema, type ApplicationInput } from '@/lib/validations/application'
import { INTEREST_AREAS, EDUCATION_LEVELS, AVAILABILITY_OPTIONS } from '@/lib/constants'
import type { Opportunity } from '@/lib/types'

interface Props {
  opportunities?: Opportunity[] | null
  email?: string
}

const STEPS = ['Personal Info', 'Background', 'Application', 'Review']

export default function VolunteerApplicationForm({ opportunities, email }: Props) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<ApplicationInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(applicationSchema) as any,
    defaultValues: {
      email: email || '',
      skills: [],
      interests: [],
      agree_to_terms: false,
    },
    mode: 'onBlur',
  })

  const { register, handleSubmit, trigger, watch, setValue, getValues, formState: { errors } } = form

  const selectedInterests = watch('interests') || []
  const selectedSkills = watch('skills') || []
  const agreeToTerms = watch('agree_to_terms')

  const toggleInterest = (interest: string) => {
    const current = selectedInterests
    if (current.includes(interest)) {
      setValue('interests', current.filter((i) => i !== interest))
    } else {
      setValue('interests', [...current, interest])
    }
  }

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const val = (e.target as HTMLInputElement).value.trim()
      if (val && !selectedSkills.includes(val)) {
        setValue('skills', [...selectedSkills, val]);
        (e.target as HTMLInputElement).value = ''
      }
    }
  }

  const removeSkill = (skill: string) => {
    setValue('skills', selectedSkills.filter((s) => s !== skill))
  }

  const stepFields: (keyof ApplicationInput)[][] = [
    ['full_name', 'email', 'phone', 'city', 'age', 'gender'],
    ['occupation', 'institution', 'education_level', 'skills', 'interests'],
    ['availability', 'motivation', 'experience', 'preferred_program'],
    ['agree_to_terms'],
  ]

  const nextStep = async () => {
    const valid = await trigger(stepFields[step])
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: ApplicationInput) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 max-w-lg mx-auto"
      >
        <div className="w-24 h-24 bg-brand-green-light rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-brand-green" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-neutral-text mb-4">
          Thank You for Applying!
        </h2>
        <p className="text-neutral-muted leading-relaxed mb-6">
          Thank you for applying to Roots of Rise. Our team will review your application and contact you soon. We look forward to working together!
        </p>
        <a href="/dashboard/applications" className="btn-primary inline-flex">
          View My Applications
        </a>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all ${
              i < step ? 'bg-brand-green text-white' :
              i === step ? 'bg-brand-gradient text-white shadow-brand' :
              'bg-neutral-light text-neutral-muted'
            }`}>
              {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`hidden sm:block ml-2 text-sm font-medium ${
              i === step ? 'text-brand-green' : 'text-neutral-muted'
            }`}>{s}</span>
            {i < STEPS.length - 1 && (
              <div className={`mx-2 sm:mx-4 h-0.5 w-6 sm:w-12 transition-all ${
                i < step ? 'bg-brand-green' : 'bg-neutral-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h3 className="font-heading text-xl font-bold text-neutral-text">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Full Name *</label>
                  <input {...register('full_name')} className="input" placeholder="Your full name" />
                  {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>}
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input {...register('email')} type="email" className="input" placeholder="you@example.com" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="label">Phone Number *</label>
                  <input {...register('phone')} className="input" placeholder="+880 1XXX-XXXXXX" />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="label">City / Area *</label>
                  <input {...register('city')} className="input" placeholder="Dhaka, Chittagong..." />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="label">Age</label>
                  <input {...register('age')} type="number" className="input" placeholder="Your age" min={13} max={120} />
                </div>
                <div>
                  <label className="label">Gender</label>
                  <select {...register('gender')} className="input">
                    <option value="">Prefer not to say</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1: Background */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h3 className="font-heading text-xl font-bold text-neutral-text">Background & Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Occupation</label>
                  <input {...register('occupation')} className="input" placeholder="Student, Teacher, Professional..." />
                </div>
                <div>
                  <label className="label">Institution</label>
                  <input {...register('institution')} className="input" placeholder="University, Company, School..." />
                </div>
              </div>
              <div>
                <label className="label">Education Level</label>
                <select {...register('education_level')} className="input">
                  <option value="">Select level</option>
                  {EDUCATION_LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Skills</label>
                <input
                  className="input"
                  placeholder="Type a skill and press Enter (e.g. Teaching, Photography)"
                  onKeyDown={addSkill}
                />
                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSkills.map((skill) => (
                      <span key={skill} className="badge bg-brand-green-light text-brand-green border border-brand-green-muted gap-1">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="text-brand-green hover:text-red-500 ml-1">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="label">Areas of Interest *</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {INTEREST_AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleInterest(area)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                        selectedInterests.includes(area)
                          ? 'bg-brand-green text-white border-brand-green'
                          : 'bg-white text-neutral-muted border-neutral-border hover:border-brand-green hover:text-brand-green'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                {errors.interests && <p className="text-xs text-red-500 mt-1">{errors.interests.message}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 2: Application Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h3 className="font-heading text-xl font-bold text-neutral-text">Application Details</h3>
              <div>
                <label className="label">Availability *</label>
                <select {...register('availability')} className="input">
                  <option value="">Select your availability</option>
                  {AVAILABILITY_OPTIONS.map((a) => <option key={a}>{a}</option>)}
                </select>
                {errors.availability && <p className="text-xs text-red-500 mt-1">{errors.availability.message}</p>}
              </div>
              {opportunities && opportunities.length > 0 && (
                <div>
                  <label className="label">Preferred Program / Opportunity</label>
                  <select {...register('preferred_program')} className="input">
                    <option value="">General Volunteer</option>
                    {opportunities.map((opp) => (
                      <option key={opp.id} value={opp.title}>{opp.title}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="label">Why do you want to join Roots of Rise? *</label>
                <p className="text-xs text-neutral-muted mb-1.5">Minimum 50 characters</p>
                <textarea
                  {...register('motivation')}
                  rows={4}
                  className="input resize-none"
                  placeholder="Share your motivation, what drives you, and what you hope to contribute..."
                />
                {errors.motivation && <p className="text-xs text-red-500 mt-1">{errors.motivation.message}</p>}
              </div>
              <div>
                <label className="label">Previous Volunteering Experience</label>
                <textarea
                  {...register('experience')}
                  rows={3}
                  className="input resize-none"
                  placeholder="Describe any previous volunteer or community work (optional)"
                />
              </div>
              <div>
                <label className="label">Social Profile (LinkedIn / Facebook)</label>
                <input {...register('social_link')} type="url" className="input" placeholder="https://linkedin.com/in/yourname" />
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h3 className="font-heading text-xl font-bold text-neutral-text">Review Your Application</h3>
              <div className="bg-neutral-bg rounded-2xl p-5 space-y-3 text-sm">
                {[
                  { label: 'Name', value: getValues('full_name') },
                  { label: 'Email', value: getValues('email') },
                  { label: 'Phone', value: getValues('phone') },
                  { label: 'City', value: getValues('city') },
                  { label: 'Availability', value: getValues('availability') },
                  { label: 'Interests', value: selectedInterests.join(', ') },
                  { label: 'Skills', value: selectedSkills.join(', ') || 'Not specified' },
                ].map(({ label, value }) => value && (
                  <div key={label} className="flex gap-3">
                    <span className="text-neutral-muted w-24 flex-shrink-0">{label}:</span>
                    <span className="text-neutral-text font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-brand-green-light rounded-2xl p-5">
                <h4 className="font-semibold text-brand-green mb-2">Your Motivation</h4>
                <p className="text-sm text-neutral-text leading-relaxed">{getValues('motivation')}</p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  {...register('agree_to_terms')}
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-neutral-border text-brand-green focus:ring-brand-green flex-shrink-0"
                />
                <span className="text-sm text-neutral-text leading-relaxed">
                  I agree that Roots of Rise may contact me regarding volunteer opportunities and organizational activities.
                </span>
              </label>
              {errors.agree_to_terms && <p className="text-xs text-red-500">{errors.agree_to_terms.message}</p>}

              {status === 'error' && (
                <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-border">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="btn-outline flex items-center gap-2 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-gradient flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === 'loading' || !agreeToTerms}
              className="btn-gradient flex items-center gap-2 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> Submit Application</>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
