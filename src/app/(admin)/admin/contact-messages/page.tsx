import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { ContactMessage } from '@/lib/types'
import MessageStatusSelect from '@/components/admin/MessageStatusSelect'

export const metadata: Metadata = { title: 'Contact Messages' }

const statusColors: Record<string, string> = {
  new: 'bg-red-100 text-red-700',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
  archived: 'bg-gray-100 text-gray-600',
}

export default async function AdminContactMessagesPage() {
  const supabase = await createClient()
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Contact Messages</h1>
        <p className="text-neutral-muted mt-1 text-sm">{messages?.length ?? 0} messages</p>
      </div>

      <div className="space-y-3">
        {messages?.map((msg: ContactMessage) => (
          <div key={msg.id} className="bg-white rounded-2xl border border-neutral-border p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-semibold text-neutral-text">{msg.name}</p>
                <a href={`mailto:${msg.email}`} className="text-xs text-brand-green hover:underline">{msg.email}</a>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[msg.status]}`}>
                  {msg.status}
                </span>
                <span className="text-xs text-neutral-muted">{formatDate(msg.created_at)}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-text mb-1">{msg.subject}</p>
            <p className="text-sm text-neutral-muted leading-relaxed">{msg.message}</p>
            <div className="mt-4 pt-4 border-t border-neutral-border flex items-center gap-3">
              <MessageStatusSelect id={msg.id} currentStatus={msg.status as ContactMessage['status']} />
              <a
                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                className="text-xs text-brand-green border border-brand-green/30 hover:bg-brand-green-light px-3 py-1.5 rounded-lg transition-colors"
              >
                Reply by Email
              </a>
            </div>
          </div>
        ))}
        {!messages?.length && (
          <div className="text-center text-neutral-muted py-12">No messages yet.</div>
        )}
      </div>
    </div>
  )
}
