'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  {
    section: 'Overview',
    items: [
      { href: '/dashboard',             label: 'Dashboard',      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { href: '/dashboard/facilities',  label: 'Facilities',     icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    ]
  },
  {
    section: 'Quality & Compliance',
    items: [
      { href: '/dashboard/validations', label: 'Validations',    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { href: '/dashboard/risks',       label: 'Risk Register',  icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
      { href: '/dashboard/changes',     label: 'Change Control', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
      { href: '/dashboard/documents',   label: 'Documents',      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    ]
  },
  {
    section: 'Operations',
    items: [
      { href: '/dashboard/board',       label: 'Mission Board',  icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
      { href: '/dashboard/training',    label: 'Training',       icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.75 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      { href: '/dashboard/audit',       label: 'Audit Log',      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    ]
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col h-full relative"
      style={{ background: 'rgba(13,13,26,0.8)', borderRight: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>

      {/* Subtle purple glow top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />

      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 relative"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))', border: '1px solid rgba(139,92,246,0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <path d="M16 3L29 10V22L16 29L3 22V10L16 3Z" stroke="url(#sg)" strokeWidth="2" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="sg" x1="3" y1="3" x2="29" y2="29">
                <stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#06b6d4"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <p className="font-display text-white text-sm font-semibold leading-tight">GxP Planner</p>
          <p className="text-xs mt-0.5" style={{ color: '#8b5cf6' }}>Operational Intelligence</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {nav.map((group, gi) => (
          <div key={group.section} className={gi > 0 ? 'mt-6' : ''}>
            <p className="text-xs font-medium uppercase tracking-wider px-3 mb-2" style={{ color: '#334155' }}>
              {group.section}
            </p>
            {group.items.map(item => {
              const active = pathname === item.href
              return (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all duration-200 group relative"
                  style={active ? {
                    background: 'rgba(139,92,246,0.12)',
                    color: '#a78bfa',
                    border: '1px solid rgba(139,92,246,0.2)',
                  } : {
                    color: '#64748b',
                    border: '1px solid transparent',
                  }}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                      style={{ background: 'linear-gradient(180deg, #8b5cf6, #3b82f6)' }} />
                  )}
                  <svg className="w-4 h-4 flex-shrink-0 transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/auth/logout"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
          style={{ color: '#334155' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
          onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </Link>
      </div>
    </aside>
  )
}
