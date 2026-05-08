'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { fadeUpVariants } from '@/lib/constants'

export default function LoginForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<LoginInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(loginSchema) as any,
  })

  const onSubmit = async (data: LoginInput) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/auth/request-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(result.message)
      } else {
        setStatus('error')
        setMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please check your connection.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green-light via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-card-hover p-8 md:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/images/logo/roots-of-rise-logo.png"
              alt="Roots of Rise"
              width={64}
              height={64}
              className="w-16 h-16 object-contain mb-3"
            />
            <h1 className="font-heading text-2xl font-bold text-neutral-text">Welcome Back</h1>
            <p className="text-sm text-neutral-muted mt-1 text-center">
              Sign in to your Roots of Rise account
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-brand-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-brand-green" />
                </div>
                <h2 className="font-heading font-bold text-xl text-neutral-text mb-2">Check Your Email!</h2>
                <p className="text-neutral-muted text-sm mb-2">{message}</p>
                <p className="text-xs text-neutral-muted">
                  We sent a magic link to{' '}
                  <strong className="text-brand-green">{getValues('email')}</strong>
                </p>
                <p className="text-xs text-neutral-muted mt-3">
                  Didn&apos;t receive it? Check your spam folder or{' '}
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-brand-green font-medium hover:underline"
                  >
                    try again
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-5">
                  <label htmlFor="email" className="label">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-muted pointer-events-none" />
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="input pl-10"
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {message}
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
                      Sending Magic Link...
                    </>
                  ) : (
                    <>
                      Send Magic Link
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-neutral-muted mt-5">
                  No password needed. We&apos;ll send a secure login link to your email.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* New user hint */}
        <p className="text-center text-sm text-neutral-muted mt-6">
          New to Roots of Rise?{' '}
          <a href="/join" className="text-brand-green font-semibold hover:underline">
            Join as a Volunteer
          </a>
        </p>
      </motion.div>
    </div>
  )
}
