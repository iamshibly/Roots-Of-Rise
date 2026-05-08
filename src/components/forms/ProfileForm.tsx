'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X, Plus } from 'lucide-react'
import { profileSchema, type ProfileInput } from '@/lib/validations/profile'
import { EDUCATION_LEVELS, AVAILABILITY_OPTIONS, INTEREST_AREAS } from '@/lib/constants'
import type { Profile } from '@/lib/types'

interface Props {
  profile: Profile | null
  email: string
}

export default function ProfileForm({ profile, email }: Props) {
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [skillInput, setSkillInput] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(profileSchema) as any,
    defaultValues: {
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      city: profile?.city || '',
      bio: profile?.bio || '',
      occupation: profile?.occupation || '',
      institution: profile?.institution || '',
      education_level: profile?.education_level || '',
      availability: profile?.availability || '',
      skills: profile?.skills || [],
      interests: profile?.interests || [],
      social_link: profile?.social_link || '',
    },
  })

  const skills = watch('skills') || []
  const interests = watch('interests') || []

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed) && skills.length < 15) {
      setValue('skills', [...skills, trimmed])
      setSkillInput('')
    }
  }

  const removeSkill = (s: string) => setValue('skills', skills.filter(sk => sk !== s))

  const toggleInterest = (val: string) => {
    if (interests.includes(val)) {
      setValue('interests', interests.filter(i => i !== val))
    } else {
      setValue('interests', [...interests, val])
    }
  }

  const onSubmit = async (data: ProfileInput) => {
    setError('')
    setSaved(false)
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setError(body.error || 'Failed to save profile.')
      return
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
      {/* Personal info */}
      <div className="bg-white rounded-2xl border border-neutral-border p-6 space-y-5">
        <h2 className="font-heading font-semibold text-neutral-text">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input {...register('full_name')} className="input" placeholder="Jane Smith" />
            {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
          </div>
          <div>
            <label className="label">Email</label>
            <input value={email} disabled className="input opacity-60 cursor-not-allowed" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input {...register('phone')} className="input" placeholder="+880 1700-000000" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="label">City</label>
            <input {...register('city')} className="input" placeholder="Dhaka" />
          </div>
        </div>
        <div>
          <label className="label">Bio</label>
          <textarea {...register('bio')} rows={3} className="input resize-none" placeholder="Tell us about yourself..." />
          {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
        </div>
      </div>

      {/* Background */}
      <div className="bg-white rounded-2xl border border-neutral-border p-6 space-y-5">
        <h2 className="font-heading font-semibold text-neutral-text">Background</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Occupation</label>
            <input {...register('occupation')} className="input" placeholder="Student / Teacher / Engineer..." />
          </div>
          <div>
            <label className="label">Institution</label>
            <input {...register('institution')} className="input" placeholder="University / Company name" />
          </div>
          <div>
            <label className="label">Education Level</label>
            <select {...register('education_level')} className="input">
              <option value="">Select level</option>
              {EDUCATION_LEVELS.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Availability</label>
            <select {...register('availability')} className="input">
              <option value="">Select availability</option>
              {AVAILABILITY_OPTIONS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="label">Skills</label>
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }}
              className="input flex-1"
              placeholder="Type a skill and press Enter"
            />
            <button type="button" onClick={addSkill} className="px-3 py-2 bg-brand-green-light text-brand-green rounded-xl hover:bg-brand-green hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map(s => (
                <span key={s} className="flex items-center gap-1 bg-brand-green-light text-brand-green text-xs font-medium px-3 py-1 rounded-full">
                  {s}
                  <button type="button" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Interests */}
        <div>
          <label className="label">Interest Areas</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {INTEREST_AREAS.map(area => (
              <button
                key={area}
                type="button"
                onClick={() => toggleInterest(area)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                  interests.includes(area)
                    ? 'bg-brand-green text-white border-brand-green'
                    : 'border-neutral-border text-neutral-muted hover:border-brand-green hover:text-brand-green'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-white rounded-2xl border border-neutral-border p-6 space-y-4">
        <h2 className="font-heading font-semibold text-neutral-text">Links</h2>
        <div>
          <label className="label">LinkedIn / Portfolio URL</label>
          <input {...register('social_link')} className="input" placeholder="https://linkedin.com/in/..." />
          {errors.social_link && <p className="text-red-500 text-xs mt-1">{errors.social_link.message}</p>}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600 text-sm">
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-sm text-green-600 font-medium"
            >
              <CheckCircle2 className="w-4 h-4" /> Saved successfully
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
