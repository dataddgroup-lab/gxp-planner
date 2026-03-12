'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else { router.push('/dashboard'); router.refresh() }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden px-4">

      {/* Background orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', animationDelay: '1.5s' }} />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full animate-float"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)', animationDelay: '3s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Card */}
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="glass rounded-3xl p-8 glow-border">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 relative"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))', border: '1px solid rgba(139,92,246,0.3)' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 3L29 10V22L16 29L3 22V10L16 3Z" stroke="url(#grad)" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M16 3V29M3 10L29 22M29 10L3 22" stroke="url(#grad)" strokeWidth="1.5" strokeOpacity="0.4"/>
                <defs>
                  <linearGradient id="grad" x1="3" y1="3" x2="29" y2="29">
                    <stop stopColor="#8b5cf6"/>
                    <stop offset="1" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: '0 0 20px rgba(139,92,246,0.3)' }} />
            </div>
            <h1 className="font-display text-2xl font-semibold text-white tracking-tight">GxP Facility Planner</h1>
            <p className="text-muted text-sm mt-1.5">Operational intelligence for regulated facilities</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">Email address</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input-glass w-full px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Password</label>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-glass w-full px-4 py-3 text-sm"
              />
            </div>

            {error && (
              <div className="glass rounded-xl px-4 py-3 text-red-400 text-sm border border-red-500/20">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <span>{loading ? 'Signing in...' : 'Sign in'}</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <a href="/auth/forgot" className="text-sm text-muted hover:text-purple transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-dim mt-5">
          GxP Facility Planner · 21 CFR Part 11 Compliant · SOC 2 Ready
        </p>
      </div>
    </div>
  )
}
