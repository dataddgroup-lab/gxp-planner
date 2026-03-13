'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ orgName: '', fullName: '', email: '', password: '' })

  function update(k: string, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step === 0) { setStep(1); return }

    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
            org_name: form.orgName,
          },
        },
      })
      if (authError) throw authError
      setStep(2)
    } catch (err: unknown) {
      setError((err as { message?: string })?.message ?? 'Something went wrong')
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
    boxSizing: 'border-box',
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

        {/* Step indicators */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
          {['Organization', 'Account', 'Done'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, background: i <= step ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'rgba(255,255,255,0.07)', color: i <= step ? '#fff' : 'rgba(255,255,255,0.25)' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '12px', color: i === step ? '#fff' : 'rgba(255,255,255,0.3)' }}>{s}</span>
              </div>
              {i < 2 && <div style={{ width: '32px', height: '1px', background: i < step ? '#8b5cf6' : 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>

          {/* Step 0 */}
          {step === 0 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Your organization</h2>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>This will be your tenant workspace in GxP Planner</p>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Organization Name</label>
                <input required value={form.orgName} onChange={e => update('orgName', e.target.value)} placeholder="e.g. Acme Pharma Inc." style={inputStyle} />
              </div>
              <button type="submit" style={{ height: '48px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', border: 'none', cursor: 'pointer' }}>
                Continue →
              </button>
            </form>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Create your account</h2>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>Admin for <strong style={{ color: '#8b5cf6' }}>{form.orgName}</strong></p>
              </div>
              {error && (
                <div style={{ padding: '14px 16px', borderRadius: '12px', background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)', color: '#f87171', fontSize: '14px' }}>
                  {error}
                </div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Full Name</label>
                <input required value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Your full name" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Email</label>
                <input required type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Password</label>
                <input required type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min. 8 characters" minLength={8} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setStep(0)} style={{ flex: 1, height: '48px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', color: 'rgba(255,255,255,0.5)', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>← Back</button>
                <button type="submit" disabled={loading} style={{ flex: 2, height: '48px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Creating account…' : 'Create Account →'}
                </button>
              </div>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Check your email</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '6px' }}>Confirmation sent to</p>
              <p style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '24px' }}>{form.email}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginBottom: '32px' }}>Click the link in your email to verify your account, then sign in.</p>
              <Link href="/auth/login" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', textDecoration: 'none' }}>
                Go to Login →
              </Link>
            </div>
          )}
        </div>

        {step < 2 && (
          <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.3)', marginTop: '20px' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#8b5cf6', fontWeight: 600 }}>Sign in →</Link>
          </p>
        )}
      </div>
    </div>
  )
}
