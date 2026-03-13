'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: signupError } = await supabase.auth.signUp({ email, password })
    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }
    // Trigger fired — tenant + profile created — go to dashboard
    window.location.href = '/dashboard/board'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07070f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 32, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, backdropFilter: 'blur(12px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(220,200,255,0.9), rgba(139,92,246,0.4))', margin: '0 auto 16px', boxShadow: '0 0 30px rgba(139,92,246,0.5)' }} />
          <h1 style={{ color: '#f1f5f9', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Create Account</h1>
          <p style={{ color: '#475569', marginTop: 6, fontSize: '0.875rem' }}>GxP Facility Planner</p>
        </div>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '12px 14px', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none' }}
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '12px 14px', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none' }}
          />
          {error && <p style={{ color: '#f87171', fontSize: '0.825rem', margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', borderRadius: 12, padding: '13px', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
          <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.825rem', margin: 0 }}>
            Already have an account?{' '}
            <a href="/auth/login" style={{ color: '#8b5cf6', textDecoration: 'none' }}>Sign in</a>
          </p>
        </form>
      </div>
    </div>
  )
}
