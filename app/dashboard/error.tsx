'use client'

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 32 }}>
      <div style={{ maxWidth: 400, textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="20" height="20" fill="none" stroke="#f87171" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Something went wrong</h2>
        <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: 24, lineHeight: 1.5 }}>{error.message || 'An unexpected error occurred.'}</p>
        <button onClick={reset} style={{ background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', borderRadius: 12, padding: '10px 24px', color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Try again</button>
      </div>
    </div>
  )
}
