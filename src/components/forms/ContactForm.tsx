'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, AlertCircle, Send } from 'lucide-react'
import { contactSchema, type ContactInput } from '@/lib/validations/contact'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdojerl'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema) as any,
  })

  const onSubmit = async (data: ContactInput) => {
    setStatus('loading')
    setErrorMsg('')
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('subject', data.subject)
      formData.append('message', data.message)

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        const result = await res.json().catch(() => ({}))
        setStatus('error')
        setErrorMsg(result?.errors?.[0]?.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-brand-green-light rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-brand-green" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-neutral-text mb-2">Message Sent!</h3>
          <p className="text-neutral-muted mb-6">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
          <button onClick={() => setStatus('idle')} className="btn-outline">
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="label">Full Name *</label>
              <input {...register('name')} id="name" className="input" placeholder="Your full name" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="label">Email Address *</label>
              <input {...register('email')} id="email" type="email" className="input" placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="label">Subject *</label>
            <input {...register('subject')} id="subject" className="input" placeholder="What is your message about?" />
            {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="label">Message *</label>
            <textarea
              {...register('message')}
              id="message"
              rows={5}
              className="input resize-none"
              placeholder="Tell us more about your inquiry..."
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
          </div>

          {status === 'error' && (
            <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-gradient w-full justify-center py-3"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
