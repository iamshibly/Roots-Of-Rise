import { createClient } from '@supabase/supabase-js'

const hasSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

// A mock query builder that always returns { data: null, error: null }
const emptyResult = { data: null, error: null, count: null, status: 200, statusText: 'OK' }
const mockQueryBuilder: any = new Proxy({}, { // eslint-disable-line @typescript-eslint/no-explicit-any
  get(target, prop) {
    if (prop === 'then') {
      return (resolve: (v: typeof emptyResult) => void) => resolve(emptyResult)
    }
    return () => mockQueryBuilder
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockAdminClient = { from: () => mockQueryBuilder } as any

// Service role client — bypasses RLS. Never expose to browser.
/* eslint-disable @typescript-eslint/no-explicit-any */
export const supabaseAdmin: any = hasSupabase
  ? createClient<any>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  : mockAdminClient
/* eslint-enable @typescript-eslint/no-explicit-any */
