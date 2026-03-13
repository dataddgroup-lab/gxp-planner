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
 * Provides userId + tenantId via onAuthStateChange (browser client, localStorage).
 * Redirects to /auth/login if no session found.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ userId: null, tenantId: null, ready: false })
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
    })

    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
