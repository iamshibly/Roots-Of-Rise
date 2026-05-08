import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import VolunteerApplicationForm from '@/components/forms/VolunteerApplicationForm'
import type { Opportunity } from '@/lib/types'

export const metadata: Metadata = { title: 'Apply Now' }

export default async function ApplyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: opportunities } = await supabase
    .from('opportunities')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Apply to Volunteer</h1>
        <p className="text-neutral-muted mt-1 text-sm">
          Complete the form below to submit your volunteer application. We review all applications within 5–7 business days.
        </p>
      </div>
      <VolunteerApplicationForm
        opportunities={opportunities as Opportunity[]}
        email={user.email}
      />
    </div>
  )
}
