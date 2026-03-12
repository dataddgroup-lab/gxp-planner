'use client'

import { useState, useRef } from 'react'

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
  critical: '#ef4444',
  high:     '#f97316',
  medium:   '#eab308',
  low:      '#22d3ee',
}

const PRIORITY_GLOW: Record<Priority, string> = {
  critical: 'rgba(239,68,68,0.5)',
  high:     'rgba(249,115,22,0.4)',
  medium:   'rgba(234,179,8,0.3)',
  low:      'rgba(34,211,238,0.3)',
}

const AVATARS: Record<string, string> = {
  'QA Lead':   'QL',
  'Val Eng':   'VE',
  'Fac Eng':   'FE',
  'Reg Aff':   'RA',
  'QC Analyst':'QC',
}

type Columns = Record<ColId, Card[]>

const INITIAL: Columns = {
  backlog: [
    { id:'b1', title:'Draft URS for Buffer Prep Room',         tag:'Validation', priority:'high',     assignee:'Val Eng',  phase:'Basis of Design',  description:'Write User Requirement Spec covering temp, humidity, ISO class, and cleaning validation scope.' },
    { id:'b2', title:'ICH Q9 Risk Assessment — HVAC Zone 3',   tag:'Risk',       priority:'critical', assignee:'QA Lead',  phase:'Qualification',    description:'Perform quantitative risk ranking on HVAC Zone 3 failure modes. Assess impact on Grade B area.' },
    { id:'b3', title:'Site Inspection Readiness Checklist',    tag:'Compliance', priority:'medium',   assignee:'Reg Aff',  phase:'PAI Readiness',    description:'Complete 120-point FDA pre-approval inspection readiness checklist for primary manufacturing suite.' },
    { id:'b4', title:'Cleanroom Gown Training — Wave 2',       tag:'Training',   priority:'low',      assignee:'QC Analyst',phase:'Operational Readiness','description':'Schedule and complete gowning qualification for 12 new staff. Log in training records.' },
  ],
  inprogress: [
    { id:'i1', title:'IQ Protocol — Lyophilizer Unit 2',       tag:'Validation', priority:'high',     assignee:'Val Eng',  phase:'Commissioning',    description:'Execute Installation Qualification for LYO-002. 47 of 112 checks complete. Target: Friday EOD.' },
    { id:'i2', title:'Change Control — Revised SOP-MFG-014',   tag:'Change',     priority:'medium',   assignee:'QA Lead',  phase:'Commercial Ops',   description:'Impact assessment underway. Revalidation scope TBD. Cross-functional review meeting Thursday.' },
    { id:'i3', title:'Facility Layout — Utilities Corridor',   tag:'Facility',   priority:'high',     assignee:'Fac Eng',  phase:'Detailed Design',  description:'Finalize MEP routing through west corridor. Coordinate with HVAC model for airflow compliance.' },
  ],
  review: [
    { id:'r1', title:'OQ Summary Report — Water System',       tag:'Validation', priority:'high',     assignee:'Val Eng',  phase:'Qualification',    description:'OQ complete. Summary report drafted. QA Lead review required before PQ can begin.' },
    { id:'r2', title:'Risk Matrix Update — Cold Chain',        tag:'Risk',       priority:'medium',   assignee:'QA Lead',  phase:'Validation',       description:'Updated risk scores after deviation DEV-2024-041. Regulatory Affairs review required.' },
    { id:'r3', title:'Supplier Qualification — Filter Media',  tag:'Compliance', priority:'high',     assignee:'Reg Aff',  phase:'Procurement',      description:'Audit report received. 2 minor findings. Corrective action plan under review.' },
  ],
  done: [
    { id:'d1', title:'Phase 1a Schema Deployment',             tag:'Facility',   priority:'high',     assignee:'Fac Eng',  phase:'Build',            description:'9-table GxP schema deployed to Supabase with RLS, audit triggers, and ICH Q9 risk scoring.' },
    { id:'d2', title:'URS — Primary Manufacturing Suite',      tag:'Validation', priority:'critical', assignee:'Val Eng',  phase:'Basis of Design',  description:'URS approved. 214 requirements captured. Linked to FRS-001.' },
    { id:'d3', title:'Risk Register — Initial Population',     tag:'Risk',       priority:'medium',   assignee:'QA Lead',  phase:'Strategic Def.',   description:'63 risks entered. ICH Q9 scoring applied. 4 critical, 11 high priority items flagged.' },
  ]
}

const COL_META: Record<ColId, { label: string; accent: string; glow: string }> = {
  backlog:    { label: 'Backlog',     accent: '#475569',  glow: 'rgba(71,85,105,0.15)'  },
  inprogress: { label: 'In Progress', accent: '#8b5cf6',  glow: 'rgba(139,92,246,0.12)' },
  review:     { label: 'In Review',   accent: '#f97316',  glow: 'rgba(249,115,22,0.1)'  },
  done:       { label: 'Complete',    accent: '#22d3ee',  glow: 'rgba(34,211,238,0.1)'  },
}

const COL_ORDER: ColId[] = ['backlog', 'inprogress', 'review', 'done']

export default function BoardPage() {
  const [cols, setCols] = useState<Columns>(INITIAL)
  const [dragging, setDragging] = useState<{ card: Card; fromCol: ColId } | null>(null)
  const [overCol, setOverCol] = useState<ColId | null>(null)
  const [selected, setSelected] = useState<Card | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTag, setNewTag] = useState<Tag>('Validation')
  const [newPriority, setNewPriority] = useState<Priority>('medium')
  const ghostMsg = useRef<string>('')

  const total = COL_ORDER.reduce((s, c) => s + cols[c].length, 0)
  const doneCount = cols.done.length
  const criticalCount = COL_ORDER.flatMap(c => cols[c]).filter(c => c.priority === 'critical').length

  function onDragStart(card: Card, fromCol: ColId) {
    setDragging({ card, fromCol })
  }

  function onDrop(toCol: ColId) {
    if (!dragging || dragging.fromCol === toCol) { setDragging(null); setOverCol(null); return }
    setCols(prev => {
      const next = { ...prev }
      next[dragging.fromCol] = prev[dragging.fromCol].filter(c => c.id !== dragging.card.id)
      next[toCol] = [{ ...dragging.card }, ...prev[toCol]]
      return next
    })
    setDragging(null)
    setOverCol(null)
  }

  function addCard() {
    if (!newTitle.trim()) return
    const card: Card = {
      id: `new-${Date.now()}`,
      title: newTitle.trim(),
      tag: newTag,
      priority: newPriority,
      assignee: 'QA Lead',
      phase: 'Active',
      description: 'Newly created task.',
    }
    setCols(prev => ({ ...prev, backlog: [card, ...prev.backlog] }))
    setNewTitle('')
    setShowAdd(false)
  }

  return (
    <div style={{ padding: '28px 32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 10px rgba(139,92,246,0.8)' }} />
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b' }}>Mission Board</p>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.75rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>
            Facility Intelligence Board
          </h1>
          <p style={{ marginTop: 6, fontSize: '0.875rem', color: '#475569' }}>
            Drag cards across columns · Click any card to inspect · Ghost watches in real time
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Total', value: total, color: '#8b5cf6' },
              { label: 'Done', value: doneCount, color: '#22d3ee' },
              { label: 'Critical', value: criticalCount, color: '#ef4444' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '10px 16px', textAlign: 'center', minWidth: 60 }}>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '0.7rem', color: '#475569', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setShowAdd(true)} style={{
            background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)',
            border: 'none', borderRadius: 12, padding: '10px 18px',
            color: '#fff', fontSize: '0.875rem', fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
          }}>
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>+</span> Add Task
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, alignItems: 'start' }}>
        {COL_ORDER.map(colId => {
          const meta = COL_META[colId]
          const cards = cols[colId]
          const isOver = overCol === colId
          return (
            <div
              key={colId}
              onDragOver={e => { e.preventDefault(); setOverCol(colId) }}
              onDrop={() => onDrop(colId)}
              onDragLeave={() => setOverCol(null)}
              style={{
                background: isOver ? `rgba(139,92,246,0.06)` : 'rgba(255,255,255,0.02)',
                border: isOver ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: 20,
                padding: 16,
                minHeight: 400,
                transition: 'all 0.2s ease',
                boxShadow: isOver ? '0 0 30px rgba(139,92,246,0.1)' : 'none',
              }}
            >
              {/* Column header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: meta.accent, boxShadow: `0 0 8px ${meta.accent}` }} />
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>{meta.label}</span>
                </div>
                <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 100, padding: '2px 10px', fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cards.map(card => {
                  const tc = TAG_COLOR[card.tag]
                  const pc = PRIORITY_COLOR[card.priority]
                  const pg = PRIORITY_GLOW[card.priority]
                  return (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={() => onDragStart(card, colId)}
                      onClick={() => setSelected(card)}
                      style={{
                        background: 'rgba(13,13,26,0.7)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderLeft: `3px solid ${pc}`,
                        borderRadius: 14,
                        padding: '14px 14px 14px 16px',
                        cursor: 'grab',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        backdropFilter: 'blur(10px)',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = 'translateY(-2px)'
                        el.style.borderColor = `rgba(255,255,255,0.12)`
                        el.style.boxShadow = `0 8px 25px rgba(0,0,0,0.3), 0 0 15px ${pg}`
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = 'translateY(0)'
                        el.style.borderColor = 'rgba(255,255,255,0.06)'
                        el.style.boxShadow = 'none'
                      }}
                    >
                      {/* Priority dot */}
                      <div style={{ position: 'absolute', top: 12, right: 12, width: 7, height: 7, borderRadius: '50%', background: pc, boxShadow: `0 0 6px ${pg}` }} />

                      <p style={{ fontSize: '0.825rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4, marginBottom: 10, paddingRight: 16 }}>
                        {card.title}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>
                          {card.tag}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(59,130,246,0.3))', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700, color: '#a78bfa' }}>
                            {AVATARS[card.assignee] || '??'}
                          </div>
                        </div>
                      </div>

                      <p style={{ marginTop: 8, fontSize: '0.65rem', color: '#334155', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {card.phase}
                      </p>
                    </div>
                  )
                })}

                {/* Empty state */}
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
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 520,
              background: 'rgba(10,10,20,0.95)',
              border: `1px solid ${PRIORITY_COLOR[selected.priority]}40`,
              borderLeft: `4px solid ${PRIORITY_COLOR[selected.priority]}`,
              borderRadius: 24, padding: 32,
              boxShadow: `0 0 60px ${PRIORITY_GLOW[selected.priority]}, 0 40px 80px rgba(0,0,0,0.6)`,
              animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
          >
            {/* Tag + priority */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 12px', borderRadius: 100, background: TAG_COLOR[selected.tag].bg, color: TAG_COLOR[selected.tag].text, border: `1px solid ${TAG_COLOR[selected.tag].border}` }}>
                {selected.tag}
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: PRIORITY_COLOR[selected.priority], textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {selected.priority}
              </span>
            </div>

            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3, marginBottom: 12 }}>
              {selected.title}
            </h2>

            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: 24 }}>
              {selected.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Assignee', value: selected.assignee },
                { label: 'Phase', value: selected.phase },
              ].map(f => (
                <div key={f.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px' }}>
                  <p style={{ fontSize: '0.65rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.label}</p>
                  <p style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>{f.value}</p>
                </div>
              ))}
            </div>

            {/* Ghost insight */}
            <div style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(220,200,255,0.9), rgba(139,92,246,0.4))', flexShrink: 0, marginTop: 2, boxShadow: '0 0 12px rgba(139,92,246,0.5)' }} />
              <div>
                <p style={{ fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ghost Intelligence</p>
                <p style={{ fontSize: '0.8rem', color: '#a78bfa', lineHeight: 1.5 }}>
                  {selected.priority === 'critical'
                    ? `This is a critical item. Delay here may cascade to dependent validation phases. Consider escalating to QA Lead today.`
                    : selected.tag === 'Validation'
                    ? `Validation items require IQ→OQ→PQ traceability. Ensure all test records are linked before moving to Review.`
                    : selected.tag === 'Risk'
                    ? `ICH Q9 requires documented risk acceptance rationale. Ensure scoring methodology is captured in audit trail.`
                    : `This task is progressing normally. No regulatory impact flags detected at this time.`
                  }
                </p>
              </div>
            </div>

            <button onClick={() => setSelected(null)} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '10px', color: '#64748b', fontSize: '0.875rem', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAdd && (
        <div onClick={() => setShowAdd(false)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, background: 'rgba(10,10,20,0.97)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 24, padding: 28, boxShadow: '0 0 60px rgba(139,92,246,0.15)', animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>New Task</h3>
            <input
              autoFocus
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCard()}
              placeholder="Task title..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '12px 14px', color: '#e2e8f0', fontSize: '0.875rem', outline: 'none', marginBottom: 12 }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              <select value={newTag} onChange={e => setNewTag(e.target.value as Tag)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '10px 12px', color: '#94a3b8', fontSize: '0.8rem', outline: 'none' }}>
                {(Object.keys(TAG_COLOR) as Tag[]).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={newPriority} onChange={e => setNewPriority(e.target.value as Priority)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '10px 12px', color: '#94a3b8', fontSize: '0.8rem', outline: 'none' }}>
                {(['critical','high','medium','low'] as Priority[]).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '11px', color: '#475569', fontSize: '0.875rem', cursor: 'pointer' }}>Cancel</button>
              <button onClick={addCard} style={{ flex: 1, background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', borderRadius: 12, padding: '11px', color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Add to Backlog</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
