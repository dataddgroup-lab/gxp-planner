'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export interface AuthState {
  userId: string | null
  tenantId: string | null
  ready: boolean
}

export function useAuth(): AuthState {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({ userId: null, tenantId: null, ready: false })

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      let tenantId = (user.app_metadata?.tenant_id as string) ?? null

      if (!tenantId) {
        const { data: profile } = await supabase
          .from('profiles').select('tenant_id').eq('id', user.id).single()
        tenantId = (profile as { tenant_id: string | null } | null)?.tenant_id ?? null
      }

      setState({ userId: user.id, tenantId, ready: true })
    }
    init()
  }, [router])

  return state
}
