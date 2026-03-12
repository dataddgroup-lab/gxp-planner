import { createClient } from '@/lib/supabase/server'

const stats = [
  { label: 'Active Facilities',  value: '0', change: 'No facilities yet',  color: '#8b5cf6' },
  { label: 'Open Validations',   value: '0', change: 'No validations yet', color: '#3b82f6' },
  { label: 'Open Risks',         value: '0', change: 'No risks logged',    color: '#f59e0b' },
  { label: 'Pending Changes',    value: '0', change: 'No change requests', color: '#06b6d4' },
]

const lifecycle = [
  'Strategic Definition','Site Selection','Permitting','Basis of Design',
  'Detailed Design','Construction','Commissioning','Qualification',
  'Validation','Quality System','Operational Readiness','PPQ',
  'PAI Readiness','Commercial Operations','Lifecycle Management'
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const name = user?.email?.split('@')[0] ?? 'there'

  return (
    <div className="p-8 min-h-screen relative">

      {/* Background orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <p className="text-sm mb-1" style={{ color: '#8b5cf6' }}>Good morning</p>
        <h1 className="font-display text-3xl font-semibold text-white">
          Welcome back, <span className="gradient-text">{name}</span>
        </h1>
        <p className="text-muted text-sm mt-1.5">Your operational intelligence platform is ready.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={s.label} className="glass glass-hover rounded-2xl p-5 animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">{s.label}</p>
              <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
            </div>
            <p className="font-display text-4xl font-semibold text-white mb-1">{s.value}</p>
            <p className="text-xs text-dim">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Lifecycle tracker */}
      <div className="glass rounded-2xl p-6 mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-sm font-semibold text-white uppercase tracking-wider">Facility Lifecycle</h2>
          <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}>
            Stage 1 of 15
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {lifecycle.map((stage, i) => (
            <span key={stage} className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-default"
              style={i === 0 ? {
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.35)',
                color: '#a78bfa',
                boxShadow: '0 0 12px rgba(139,92,246,0.15)',
              } : {
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#334155',
              }}>
              {i === 0 && <span className="mr-1.5">●</span>}{stage}
            </span>
          ))}
        </div>
      </div>

      {/* AI Prompt bar */}
      <div className="glass rounded-2xl p-4 animate-fade-in" style={{ animationDelay: '0.4s', border: '1px solid rgba(139,92,246,0.15)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))', border: '1px solid rgba(139,92,246,0.25)' }}>
            <svg className="w-4 h-4" style={{ color: '#a78bfa' }} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Ask anything — validations, risks, compliance, facility status..."
            className="flex-1 bg-transparent text-sm outline-none placeholder-dim text-white"
          />
          <button className="btn-primary px-4 py-2 text-sm rounded-xl">
            <span>Ask</span>
          </button>
        </div>
      </div>

    </div>
  )
}
