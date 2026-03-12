import { createClient } from '@/lib/supabase/server'

const stats = [
  { label: 'Active Facilities',   value: '0', sub: 'No facilities yet' },
  { label: 'Open Validations',    value: '0', sub: 'No validations yet' },
  { label: 'Open Risks',          value: '0', sub: 'No risks logged'    },
  { label: 'Pending Changes',     value: '0', sub: 'No change requests' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome back{user?.email ? `, ${user.email}` : ''}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-surface-card border border-surface-border rounded-2xl p-6">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">{s.label}</p>
            <p className="text-3xl font-semibold text-white">{s.value}</p>
            <p className="text-slate-500 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Lifecycle Stage */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 mb-4">
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Facility Lifecycle</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Strategic Definition','Site Selection','Permitting','Basis of Design',
            'Detailed Design','Construction','Commissioning','Qualification',
            'Validation','Quality System','Operational Readiness','PPQ',
            'PAI Readiness','Commercial Operations','Lifecycle Management'
          ].map((stage, i) => (
            <span
              key={stage}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                i === 0
                  ? 'bg-brand-500/20 border-brand-500/40 text-brand-500'
                  : 'bg-surface border-surface-border text-slate-500'
              }`}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      {/* Prompt bar */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-surface border border-surface-border rounded-xl px-4 py-3 text-slate-500 text-sm">
            Ask anything about your facility, validations, risks, or compliance...
          </div>
          <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors">
            Ask
          </button>
        </div>
      </div>

    </div>
  )
}
