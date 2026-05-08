import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

const mockClient = {
  from: () => mockQueryBuilder,
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

export async function createClient() {
  if (!hasSupabase) return mockClient

  const cookieStore = await cookies()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createServerClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component — cookies are read-only
          }
        },
      },
    }
  )
}
