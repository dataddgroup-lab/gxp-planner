'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface AuthState {
  userId: string | null
  tenantId: string | null
  ready: boolean
}

/**
 * useAuth — required on every page that reads or writes to Supabase.
 * Uses getSession() (synchronous localStorage read) — no race condition.
 * Redirects to /auth/login only after confirming no session exists.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ userId: null, tenantId: null, ready: false })
  const supabase = createClient()

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) {
        window.location.href = '/auth/login'
        return
      }

      const user = session.user
      let tenantId = (user.app_metadata?.tenant_id as string) ?? null

      if (!tenantId) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('tenant_id')
          .eq('id', user.id)
          .single()
        tenantId = profile?.tenant_id ?? null
      }

      setState({ userId: user.id, tenantId, ready: true })
    }

    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
