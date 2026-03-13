'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface AuthState {
  userId: string | null
  tenantId: string | null
  ready: boolean
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ userId: null, tenantId: null, ready: false })

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user) { setState({ userId: null, tenantId: null, ready: true }); return }

      const user = session.user
      let tenantId = (user.app_metadata?.tenant_id as string) ?? null

      if (!tenantId) {
        const { data: profile } = await supabase
          .from('profiles').select('tenant_id').eq('id', user.id).single()
        tenantId = profile?.tenant_id ?? null
      }

      setState({ userId: user.id, tenantId, ready: true })
    })
  }, [])

  return state
}
