'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Priority = 'critical' | 'high' | 'medium' | 'low'
type Tag = 'Validation' | 'Risk' | 'Facility' | 'Compliance' | 'Training' | 'Change'
type ColId = 'backlog' | 'inprogress' | 'review' | 'done'

interface Card {
  id: string
  title: string
  tag: Tag
  priority: Priority
  assignee: string
  phase: string
  description: string
  column_id: ColId
  position: number
}

interface Props {
  initialItems: Card[]
  tenantId: string | null
  userId: string
}

const TAG_COLOR: Record<Tag, { bg: string; text: string; border: string }> = {
  Validation:  { bg: 'rgba(139,92,246,0.12)', text: '#a78bfa', border: 'rgba(139,92,246,0.25)' },
  Risk:        { bg: 'rgba(239,68,68,0.1)',   text: '#f87171', border: 'rgba(239,68,68,0.25)'  },
  Facility:    { bg: 'rgba(59,130,246,0.1)',  text: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
  Compliance:  { bg: 'rgba(6,182,212,0.1)',   text: '#22d3ee', border: 'rgba(6,182,212,0.25)'  },
  Training:    { bg: 'rgba(16,185,129,0.1)',  text: '#34d399', border: 'rgba(16,185,129,0.25)' },
  Change:      { bg: 'rgba(251,191,36,0.1)',  text: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
}

const PRIORITY_COLOR: Record<Priority, string> = {
  critical: '#ef4444', high: '#f97316', medium: '#eab308', low: '#22d3ee',
}
const PRIORITY_GLOW: Record<Priority, string> = {
  critical: 'rgba(239,68,68,0.5)', high: 'rgba(249,115,22,0.4)', medium: 'rgba(234,179,8,0.3)', low: 'rgba(34,211,238,0.3)',
}
const AVATARS: Record<string, string> = {
  'QA Lead': 'QL', 'Val Eng': 'VE', 'Fac Eng': 'FE', 'Reg Aff': 'RA', 'QC Analyst': 'QC',
}
const COL_META: Record<ColId, { label: string; accent: string }> = {
  backlog:    { label: 'Backlog',     accent: '#475569' },
  inprogress: { label: 'In Progress', accent: '#8b5cf6' },
  review:     { label: 'In Review',   accent: '#f97316' },
  done:       { label: 'Complete',    accent: '#22d3ee' },
}
const COL_ORDER: ColId[] = ['backlog', 'inprogress', 'review', 'done']

type Columns = Record<ColId, Card[]>

function groupByCol(cards: Card[]): Columns {
  const cols: Columns = { backlog: [], inprogress: [], review: [], done: [] }
  for (const c of cards) { if (cols[c.column_id]) cols[c.column_id].push(c) }
  for (const c of COL_ORDER) cols[c].sort((a, b) => a.position - b.position)
  return cols
}

export default function BoardClient({ initialItems }: Props) {
  const supabase = createClient()
  const [cols, setCols] = useState<Columns>(() => groupByCol(initialItems))
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string>('')
  const [authLoading, setAuthLoading] = useState(true)
  const [dragging, setDragging] = useState<{ card: Card; fromCol: ColId } | null>(null)
  const [overCol, setOverCol] = useState<ColId | null>(null)
  const [selected, setSelected] = useState<Card | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTag, setNewTag] = useState<Tag>('Validation')
  const [newPriority, setNewPriority] = useState<Priority>('medium')
  const [saving, setSaving] = useState(false)
  const [insertError, setInsertError] = useState('')

  useEffect(() => {
    async function loadAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setAuthLoading(false); return }
      setUserId(user.id)
      const tid = (user.app_metadata?.tenant_id as string) ?? null
      setTenantId(tid)
      if (tid) {
        const { data: items } = await supabase
          .from('board_items')
          .select('*')
          .eq('tenant_id', tid)
          .order('position', { ascending: true })
        if (items) setCols(groupByCol(items as Card[]))
      }
      setAuthLoading(false)
    }
    loadAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const total = COL_ORDER.reduce((s, c) => s + cols[c].length, 0)
  const doneCount = cols.done.length
  const criticalCount = COL_ORDER.flatMap(c => cols[c]).filter(c => c.priority === 'critical').length

  async function onDrop(toCol: ColId) {
    if (!dragging || dragging.fromCol === toCol) { setDragging(null); setOverCol(null); return }
    const card = dragging.card
    const fromCol = dragging.fromCol
    setDragging(null); setOverCol(null)
    setCols(prev => {
      const next = { ...prev }
      next[fromCol] = prev[fromCol].filter(c => c.id !== card.id)
      next[toCol] = [{ ...card, column_id: toCol }, ...prev[toCol]]
      return next
    })
    await supabase.from('board_items').update({ column_id: toCol, position: 0 }).eq('id', card.id)
  }

  async function addCard() {
    if (!newTitle.trim()) return
    if (!tenantId) { setInsertError('No tenant linked to your account. Contact support.'); return }
    setSaving(true)
    setInsertError('')
    const { data, error } = await supabase
      .from('board_items')
      .insert({
        tenant_id: tenantId,
        title: newTitle.trim(),
        tag: newTag,
        priority: newPriority,
        assignee: 'QA Lead',
        phase: 'Active',
        description: 'Newly created task.',
        column_id: 'backlog',
        position: cols.backlog.length,
        created_by: userId,
      })
      .select()
      .single()
    if (error) { setInsertError(error.message); setSaving(false); return }
    if (data) setCols(prev => ({ ...prev, backlog: [data as Card, ...prev.backlog] }))
    setNewTitle(''); setShowAdd(false); setSaving(false)
  }

  if (authLoading) {
    return (
      <div style={{ padding: '28px 32px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#475569', fontSize: '0.875rem' }}>Loading board...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '28px 32px', minHeight: '100vh' }}>
      {/* No-tenant warning */}
      {!tenantId && (
        <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', fontSize: '0.875rem' }}>
          ⚠️ Your account is not linked to a tenant. Board items cannot be saved. Run the profile setup SQL in Supabase.
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 10px rgba(139,92,246,0.8)' }} />
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b' }}>Mission Board</p>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.75rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>Facility Intelligence Board</h1>
          <p style={{ marginTop: 6, fontSize: '0.875rem', color: '#475569' }}>Drag cards to move · Click to inspect · Persisted to Supabase</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ label: 'Total', value: total, color: '#8b5cf6' }, { label: 'Done', value: doneCount, color: '#22d3ee' }, { label: 'Critical', value: criticalCount, color: '#ef4444' }].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '10px 16px', textAlign: 'center', minWidth: 60 }}>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '0.7rem', color: '#475569', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setShowAdd(true)} style={{ background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', borderRadius: 12, padding: '10px 18px', color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 20px rgba(139,92,246,0.3)' }}>
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>+</span> Add Task
          </button>
        </div>
      </div>

      {/* Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, alignItems: 'start' }}>
        {COL_ORDER.map(colId => {
          const meta = COL_META[colId]
          const cards = cols[colId]
          const isOver = overCol === colId
          return (
            <div key={colId}
              onDragOver={e => { e.preventDefault(); setOverCol(colId) }}
              onDrop={() => onDrop(colId)}
              onDragLeave={() => setOverCol(null)}
              style={{ background: isOver ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.02)', border: isOver ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 16, minHeight: 400, transition: 'all 0.2s ease', boxShadow: isOver ? '0 0 30px rgba(139,92,246,0.1)' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: meta.accent, boxShadow: `0 0 8px ${meta.accent}` }} />
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{meta.label}</span>
                </div>
                <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 100, padding: '2px 10px', fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>{cards.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cards.map(card => {
                  const tc = TAG_COLOR[card.tag]
                  const pc = PRIORITY_COLOR[card.priority]
                  const pg = PRIORITY_GLOW[card.priority]
                  return (
                    <div key={card.id} draggable
                      onDragStart={() => setDragging({ card, fromCol: colId })}
                      onClick={() => setSelected(card)}
                      style={{ background: 'rgba(13,13,26,0.7)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${pc}`, borderRadius: 14, padding: '14px 14px 14px 16px', cursor: 'grab', transition: 'all 0.2s ease', position: 'relative', backdropFilter: 'blur(10px)' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-2px)'; el.style.boxShadow=`0 8px 25px rgba(0,0,0,0.3), 0 0 15px ${pg}` }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(0)'; el.style.boxShadow='none' }}
                    >
                      <div style={{ position: 'absolute', top: 12, right: 12, width: 7, height: 7, borderRadius: '50%', background: pc, boxShadow: `0 0 6px ${pg}` }} />
                      <p style={{ fontSize: '0.825rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4, marginBottom: 10, paddingRight: 16 }}>{card.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>{card.tag}</span>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(59,130,246,0.3))', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700, color: '#a78bfa' }}>
                          {AVATARS[card.assignee] || '??'}
                        </div>
                      </div>
                      <p style={{ marginTop: 8, fontSize: '0.65rem', color: '#334155', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{card.phase}</p>
                    </div>
                  )
                })}
                {cards.length === 0 && (
                  <div style={{ border: '1px dashed rgba(255,255,255,0.06)', borderRadius: 14, padding: '28px 16px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: '#1e293b' }}>Drop cards here</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Card Detail Modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 520, background: 'rgba(10,10,20,0.95)', border: `1px solid ${PRIORITY_COLOR[selected.priority]}40`, borderLeft: `4px solid ${PRIORITY_COLOR[selected.priority]}`, borderRadius: 24, padding: 32, boxShadow: `0 0 60px ${PRIORITY_GLOW[selected.priority]}, 0 40px 80px rgba(0,0,0,0.6)`, animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 12px', borderRadius: 100, background: TAG_COLOR[selected.tag].bg, color: TAG_COLOR[selected.tag].text, border: `1px solid ${TAG_COLOR[selected.tag].border}` }}>{selected.tag}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: PRIORITY_COLOR[selected.priority], textTransform: 'uppercase', letterSpacing: '0.08em' }}>{selected.priority}</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3, marginBottom: 12 }}>{selected.title}</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: 24 }}>{selected.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[{ label: 'Assignee', value: selected.assignee }, { label: 'Phase', value: selected.phase }].map(f => (
                <div key={f.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px' }}>
                  <p style={{ fontSize: '0.65rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.label}</p>
                  <p style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>{f.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(220,200,255,0.9), rgba(139,92,246,0.4))', flexShrink: 0, marginTop: 2, boxShadow: '0 0 12px rgba(139,92,246,0.5)' }} />
              <div>
                <p style={{ fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ghost Intelligence</p>
                <p style={{ fontSize: '0.8rem', color: '#a78bfa', lineHeight: 1.5 }}>
                  {selected.priority === 'critical' ? 'Critical item — delay may cascade to dependent validation phases. Consider escalating today.'
                    : selected.tag === 'Validation' ? 'Ensure IQ→OQ→PQ traceability is linked before moving to Review.'
                    : selected.tag === 'Risk' ? 'ICH Q9 requires documented risk acceptance rationale in the audit trail.'
                    : 'Progressing normally. No regulatory impact flags detected.'}
                </p>
              </div>
            </div>
            <button onClick={() => setSelected(null)} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '10px', color: '#64748b', fontSize: '0.875rem', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAdd && (
        <div onClick={() => setShowAdd(false)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, background: 'rgba(10,10,20,0.97)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 24, padding: 28, boxShadow: '0 0 60px rgba(139,92,246,0.15)', animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>New Task</h3>
            <input autoFocus value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCard()} placeholder="Task title..." style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '12px 14px', color: '#e2e8f0', fontSize: '0.875rem', outline: 'none', marginBottom: 12 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <select value={newTag} onChange={e => setNewTag(e.target.value as Tag)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '10px 12px', color: '#94a3b8', fontSize: '0.8rem', outline: 'none' }}>
                {(Object.keys(TAG_COLOR) as Tag[]).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={newPriority} onChange={e => setNewPriority(e.target.value as Priority)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '10px 12px', color: '#94a3b8', fontSize: '0.8rem', outline: 'none' }}>
                {(['critical','high','medium','low'] as Priority[]).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            {insertError && <p style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: 12 }}>{insertError}</p>}
            {!tenantId && <p style={{ color: '#fbbf24', fontSize: '0.8rem', marginBottom: 12 }}>⚠️ No tenant — profile not linked</p>}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '11px', color: '#475569', fontSize: '0.875rem', cursor: 'pointer' }}>Cancel</button>
              <button onClick={addCard} disabled={saving} style={{ flex: 1, background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', borderRadius: 12, padding: '11px', color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : 'Add to Backlog'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn { from { opacity:0; transform:scale(0.92) translateY(16px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>
    </div>
  )
}
