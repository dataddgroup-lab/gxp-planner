'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LogoutPage() {
  useEffect(() => {
    async function doLogout() {
      const supabase = createClient()
      await supabase.auth.signOut()
      // Clear any stale storage keys
      if (typeof window !== 'undefined') {
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('sb-')) localStorage.removeItem(k)
        })
      }
      window.location.href = '/auth/login'
    }
    doLogout()
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07070f' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px' }}>Signing out…</p>
    </div>
  )
}
