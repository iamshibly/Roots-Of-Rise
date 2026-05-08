'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { newsletterSchema, type NewsletterInput } from '@/lib/validations/contact'
import { cn } from '@/lib/utils'

interface Props {
  dark?: boolean
}

export default function NewsletterForm({ dark = false }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(newsletterSchema) as any,
  })

  const onSubmit = async (data: NewsletterInput) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(result.message || 'Subscribed!')
        reset()
      } else {
        setStatus('error')
        setMessage(result.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('flex items-center gap-2 text-sm', dark ? 'text-brand-green-light' : 'text-brand-green')}>
        <CheckCircle className="w-4 h-4" />
        <span>{message}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <input
          {...register('email')}
          type="email"
          placeholder="Your email address"
          className={cn(
            'flex-1 px-4 py-2.5 rounded-lg text-sm outline-none transition-all',
            dark
              ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-white/50'
              : 'bg-white border border-neutral-border text-neutral-text placeholder:text-neutral-muted focus:border-brand-green focus:ring-1 focus:ring-brand-green'
          )}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all',
            dark
              ? 'bg-brand-green-light text-brand-green hover:bg-white'
              : 'bg-brand-green text-white hover:bg-brand-green-dark'
          )}
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
      {errors.email && (
        <p className={cn('text-xs mt-1', dark ? 'text-red-300' : 'text-red-500')}>{errors.email.message}</p>
      )}
      {status === 'error' && (
        <p className={cn('text-xs mt-1', dark ? 'text-red-300' : 'text-red-500')}>{message}</p>
      )}
    </form>
  )
}
