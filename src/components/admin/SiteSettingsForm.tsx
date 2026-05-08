'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'

const SETTING_GROUPS = [
  {
    label: 'Impact Statistics',
    keys: [
      { key: 'impact_volunteers', label: 'Volunteers', placeholder: '150' },
      { key: 'impact_projects', label: 'Projects Completed', placeholder: '15' },
      { key: 'impact_communities', label: 'Communities Reached', placeholder: '8' },
      { key: 'impact_lives', label: 'Lives Impacted', placeholder: '2000' },
      { key: 'impact_events', label: 'Events Held', placeholder: '30' },
    ],
  },
  {
    label: 'Social Links',
    keys: [
      { key: 'social_linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/...' },
      { key: 'social_facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
      { key: 'social_instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
      { key: 'social_youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/@...' },
    ],
  },
  {
    label: 'Organization Info',
    keys: [
      { key: 'org_phone', label: 'Phone Number', placeholder: '+880 1XXX-XXXXXX' },
      { key: 'org_address', label: 'Address', placeholder: 'Dhaka, Bangladesh' },
      { key: 'org_email', label: 'Contact Email', placeholder: 'info@rootsofrise.org' },
    ],
  },
]

interface Props {
  initialSettings: Record<string, string>
}

export default function SiteSettingsForm({ initialSettings }: Props) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, string>>(initialSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    const body = Object.entries(values).map(([key, value]) => ({ key, value }))
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSaving(false)
    setSaved(true)
    router.refresh()
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {SETTING_GROUPS.map(group => (
        <div key={group.label} className="bg-white rounded-2xl border border-neutral-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-neutral-text">{group.label}</h2>
          {group.keys.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                value={values[key] || ''}
                onChange={e => handleChange(key, e.target.value)}
                className="input"
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Saved
          </span>
        )}
      </div>
    </div>
  )
}
