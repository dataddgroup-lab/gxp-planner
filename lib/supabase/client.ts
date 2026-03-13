import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

// Singleton — one instance, session stored in localStorage (not cookies)
// @supabase/ssr browser client uses document.cookie which Safari blocks.
// @supabase/supabase-js uses localStorage which always works.
let client: SupabaseClient | null = null

export function createClient(): SupabaseClient {
  if (client) return client

  client = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        storageKey: 'gxp-auth',
        storage: {
          getItem: (key) => (typeof window !== 'undefined' ? localStorage.getItem(key) : null),
          setItem: (key, value) => { if (typeof window !== 'undefined') localStorage.setItem(key, value) },
          removeItem: (key) => { if (typeof window !== 'undefined') localStorage.removeItem(key) },
        },
      },
    }
  )

  return client
}
