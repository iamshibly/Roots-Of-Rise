import { createClient } from '@supabase/supabase-js'

// Service role client — bypasses RLS. Never expose to browser.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseAdmin = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
