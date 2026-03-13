'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LogoutPage() {
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.signOut().then(() => {
      window.location.href = '/auth/login'
    })
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07070f' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px' }}>Signing out…</p>
    </div>
  )
}
