'use client'

import { useEffect, useRef, useState } from 'react'

// Draws the ethereal orb animation onto a canvas element
function startOrb(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  canvas.width = 64
  canvas.height = 64
  let t = 0
  let raf = 0

  function draw() {
    ctx.clearRect(0, 0, 64, 64)
    t += 0.03
    const cx = 32, cy = 32

    // Outer aura
    for (let i = 3; i >= 1; i--) {
      const r = 24 + Math.sin(t * 0.7) * 3 + i * 4
      const alpha = (0.04 - i * 0.01) * (0.6 + Math.sin(t) * 0.4)
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      g.addColorStop(0, `rgba(139,92,246,${alpha * 2})`)
      g.addColorStop(0.5, `rgba(99,102,241,${alpha})`)
      g.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = g; ctx.fill()
    }

    // Core orb
    const coreR = 14 + Math.sin(t * 1.1) * 1.5
    const cg = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, coreR)
    cg.addColorStop(0, `rgba(220,200,255,${0.9 + Math.sin(t) * 0.1})`)
    cg.addColorStop(0.3, `rgba(167,139,250,0.85)`)
    cg.addColorStop(0.7, `rgba(99,102,241,0.6)`)
    cg.addColorStop(1, `rgba(59,130,246,0.1)`)
    ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2)
    ctx.fillStyle = cg; ctx.fill()

    // Inner shimmer
    const sg = ctx.createRadialGradient(cx - 4, cy - 5, 0, cx - 2, cy - 2, 6 + Math.sin(t * 1.8) * 2)
    sg.addColorStop(0, `rgba(255,255,255,${0.7 + Math.sin(t * 2) * 0.2})`)
    sg.addColorStop(1, 'transparent')
    ctx.beginPath(); ctx.arc(cx - 2, cy - 3, 6 + Math.sin(t * 1.8) * 2, 0, Math.PI * 2)
    ctx.fillStyle = sg; ctx.fill()

    // Orbiting particles
    for (let i = 0; i < 3; i++) {
      const angle = t * (0.8 + i * 0.3) + (i * Math.PI * 2) / 3
      const or = 20 + Math.sin(t + i) * 2
      const px = cx + Math.cos(angle) * or
      const py = cy + Math.sin(angle) * or * 0.6
      const pr = 1.5 + Math.sin(t * 1.5 + i) * 0.5
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(196,181,253,${0.4 + Math.sin(t + i * 2) * 0.3})`
      ctx.fill()
    }

    raf = requestAnimationFrame(draw)
  }

  draw()
  return () => cancelAnimationFrame(raf)
}

export default function GhostAssistant() {
  const triggerRef = useRef<HTMLCanvasElement>(null)
  const panelRef   = useRef<HTMLCanvasElement>(null)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'ghost' | 'user'; text: string }[]>([
    { role: 'ghost', text: "I'm here. Ask me anything about your facility, validations, or risks." }
  ])

  // Trigger orb — always running
  useEffect(() => {
    if (!triggerRef.current) return
    return startOrb(triggerRef.current)
  }, [])

  // Panel orb — only when panel is open
  useEffect(() => {
    if (!open || !panelRef.current) return
    return startOrb(panelRef.current)
  }, [open])

  function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text }])
    setTimeout(() => {
      setMessages(m => [...m, {
        role: 'ghost',
        text: 'Full AI responses available when the intelligence engine is connected.'
      }])
    }, 800)
  }

  return (
    <>
      {/* Panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 96, right: 24, zIndex: 50,
          width: 320, height: 420,
          display: 'flex', flexDirection: 'column',
          background: 'rgba(7,7,15,0.85)',
          border: '1px solid rgba(139,92,246,0.25)',
          borderRadius: 20,
          backdropFilter: 'blur(30px)',
          boxShadow: '0 0 60px rgba(139,92,246,0.15), 0 20px 40px rgba(0,0,0,0.5)',
          animation: 'ghostIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <canvas ref={panelRef} width={40} height={40} style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: 600 }}>Facility Intelligence</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 6px #a78bfa' }} />
                <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Active · Watching</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1rem', padding: 4, lineHeight: 1 }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px', fontSize: '0.8rem', lineHeight: 1.5,
                  borderRadius: m.role === 'ghost' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  background: m.role === 'ghost' ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.05)',
                  border: m.role === 'ghost' ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.07)',
                  color: m.role === 'ghost' ? '#c4b5fd' : '#94a3b8',
                }}>{m.text}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '8px 12px', color: '#e2e8f0', fontSize: '0.8rem', outline: 'none' }}
            />
            <button onClick={send} style={{ background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', borderRadius: 10, padding: '8px 14px', color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>→</button>
          </div>
        </div>
      )}

      {/* Trigger orb — always visible, separate canvas */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 24, zIndex: 51,
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(7,7,15,0.7)',
          border: '1px solid rgba(139,92,246,0.3)',
          backdropFilter: 'blur(20px)',
          cursor: 'pointer', padding: 0,
          boxShadow: open ? '0 0 30px rgba(139,92,246,0.4)' : '0 0 20px rgba(139,92,246,0.2)',
          transition: 'box-shadow 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <canvas ref={triggerRef} width={40} height={40} style={{ width: 40, height: 40, borderRadius: '50%', pointerEvents: 'none' }} />
      </button>

      <style>{`
        @keyframes ghostIn {
          from { opacity:0; transform:translateY(16px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}
