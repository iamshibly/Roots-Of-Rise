import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { Testimonial } from '@/lib/types'
import TestimonialActions from '@/components/admin/TestimonialActions'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Testimonials' }

export default async function AdminTestimonialsPage() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Testimonials</h1>
        <p className="text-neutral-muted mt-1 text-sm">{testimonials?.length ?? 0} testimonials</p>
      </div>

      <div className="space-y-3">
        {testimonials?.map((t: Testimonial) => (
          <div key={t.id} className="bg-white rounded-2xl border border-neutral-border p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-neutral-text">{t.name}</p>
                  {t.role && <p className="text-xs text-neutral-muted">&mdash; {t.role}</p>}
                  <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${t.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {t.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-neutral-muted italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs text-neutral-muted mt-2">{formatDate(t.created_at)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-border">
              <TestimonialActions id={t.id} approved={t.approved} />
              <DeleteButton id={t.id} endpoint="/api/admin/testimonials" label="testimonial" />
            </div>
          </div>
        ))}
        {!testimonials?.length && (
          <div className="text-center text-neutral-muted py-12">No testimonials yet.</div>
        )}
      </div>
    </div>
  )
}
