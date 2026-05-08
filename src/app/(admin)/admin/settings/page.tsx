import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import SiteSettingsForm from '@/components/admin/SiteSettingsForm'

export const metadata: Metadata = { title: 'Site Settings' }

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .order('key')

  const settingsMap = Object.fromEntries((settings || []).map((s: { key: string; value: string }) => [s.key, s.value]))

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Site Settings</h1>
        <p className="text-neutral-muted mt-1 text-sm">Manage impact counters, social links, and org information.</p>
      </div>
      <SiteSettingsForm initialSettings={settingsMap} />
    </div>
  )
}
