'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [sessionReady, setSessionReady] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setSessionReady(true)
    })
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setSessionReady(true)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setDone(true)
      setTimeout(() => { window.location.href = '/dashboard' }, 2000)
    } catch (err: unknown) {
      setError((err as { message?: string })?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', width: '100%', padding: '0 16px', height: '48px', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' } as React.CSSProperties

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', background: '#07070f', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>
            </div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}>GxP Planner</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Password updated!</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Taking you to your dashboard…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Set new password</h2>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>Choose a strong password for your account</p>
              </div>
              {error && <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)', color: '#f87171', fontSize: '14px' }}>{error}</div>}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>New Password</label>
                <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Confirm Password</label>
                <input type="password" required minLength={8} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password" style={inputStyle} />
              </div>
              <button type="submit" disabled={loading || !sessionReady} style={{ height: '48px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', border: 'none', cursor: 'pointer', opacity: (loading || !sessionReady) ? 0.6 : 1 }}>
                {loading ? 'Updating…' : 'Update Password →'}
              </button>
              {!sessionReady && <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Loading session…</p>}
            </form>
          )}
        </div>
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.3)', marginTop: '20px' }}>
          <Link href="/auth/login" style={{ color: '#8b5cf6' }}>← Back to login</Link>
        </p>
      </div>
    </div>
  )
}
