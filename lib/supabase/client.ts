import { createClient as _create } from '@supabase/supabase-js'

type Client = ReturnType<typeof _create>
let client: Client | null = null

export function createClient(): Client {
  if (client) return client
  client = _create(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        storageKey: 'gxp-auth',
        storage: typeof window !== 'undefined' ? {
          getItem: (key) => localStorage.getItem(key),
          setItem: (key, value) => localStorage.setItem(key, value),
          removeItem: (key) => localStorage.removeItem(key),
        } : undefined,
      },
    }
  )
  return client
}
