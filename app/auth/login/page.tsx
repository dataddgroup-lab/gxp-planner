'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) throw authError
      window.location.href = '/dashboard'
    } catch (err: unknown) {
      setError((err as { message?: string })?.message ?? 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    width: '100%',
    padding: '0 16px',
    height: '48px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  } as React.CSSProperties

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', background: '#07070f', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
            </div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.3px' }}>GxP Planner</span>
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}>Welcome back</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Sign in to your facility dashboard</p>
        </div>

        {error && (
          <div style={{ marginBottom: '20px', padding: '14px 16px', borderRadius: '12px', background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)', color: '#f87171', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)' }}>Password</label>
              <Link href="/auth/forgot" style={{ fontSize: '12px', color: '#8b5cf6' }}>Forgot password?</Link>
            </div>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" style={inputStyle} />
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: '8px', height: '48px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.3)', marginTop: '24px' }}>
          No account?{' '}
          <Link href="/auth/signup" style={{ color: '#8b5cf6', fontWeight: 600 }}>Create one →</Link>
        </p>
      </div>
    </div>
  )
}
