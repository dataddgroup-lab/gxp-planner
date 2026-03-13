'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Facility = {
  id: string
  name: string
  company_name: string | null
  facility_type: string
  lifecycle_stage: string
  country: string | null
  regulatory_jurisdictions: string[] | null
  status: string
  notes: string | null
}

const empty = { name: '', company_name: '', facility_type: 'drug_manufacturing', lifecycle_stage: 'strategic_definition', country: '', regulatory_jurisdictions: [] as string[], status: 'active', notes: '' }

const TYPES = ['drug_manufacturing','biologics','sterile_fill_finish','api_manufacturing','qc_laboratory','multi_product','other']
const TYPE_LABELS: Record<string,string> = { drug_manufacturing:'Drug Manufacturing', biologics:'Biologics', sterile_fill_finish:'Sterile Fill/Finish', api_manufacturing:'API Manufacturing', qc_laboratory:'QC Laboratory', multi_product:'Multi-Product', other:'Other' }

const STAGES = ['strategic_definition','site_selection','permitting','basis_of_design','detailed_design','construction','commissioning','qualification','validation','quality_system_buildout','operational_readiness','ppq','pai_readiness','commercial_operations','lifecycle_management']
const STAGE_LABELS: Record<string,string> = { strategic_definition:'Strategic Definition', site_selection:'Site Selection', permitting:'Permitting', basis_of_design:'Basis of Design', detailed_design:'Detailed Design', construction:'Construction', commissioning:'Commissioning', qualification:'Qualification', validation:'Validation', quality_system_buildout:'Quality System Buildout', operational_readiness:'Operational Readiness', ppq:'PPQ', pai_readiness:'PAI Readiness', commercial_operations:'Commercial Operations', lifecycle_management:'Lifecycle Management' }

const JURISDICTIONS = ['FDA','EMA','WHO','MHRA','TGA','HC','ANVISA','PMDA']

export default function FacilitiesPage() {
  const router = useRouter()
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push('/auth/login'); return }
      let tid = (user.app_metadata?.tenant_id as string) ?? null
      if (!tid) {
        const { data: p } = await supabase.from('profiles').select('tenant_id').eq('id', user.id).single()
        tid = (p as { tenant_id: string } | null)?.tenant_id ?? null
      }
      setTenantId(tid)
    })
  }, [router])

  const load = useCallback(async () => {
    if (!tenantId) return
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('facilities').select('*').eq('tenant_id', tenantId).order('created_at', { ascending: false })
    setFacilities((data ?? []) as Facility[])
    setLoading(false)
  }, [tenantId])

  useEffect(() => { load() }, [load])

  function openAdd() { setForm({ ...empty }); setEditId(null); setError(''); setModal(true) }
  function openEdit(f: Facility) { setForm({ name: f.name, company_name: f.company_name ?? '', facility_type: f.facility_type, lifecycle_stage: f.lifecycle_stage, country: f.country ?? '', regulatory_jurisdictions: f.regulatory_jurisdictions ?? [], status: f.status, notes: f.notes ?? '' }); setEditId(f.id); setError(''); setModal(true) }

  async function save() {
    if (!form.name.trim()) { setError('Facility name is required'); return }
    if (!tenantId) { setError('No tenant found — please sign out and sign in again'); return }
    setSaving(true); setError('')
    const supabase = createClient()
    const payload = { ...form, tenant_id: tenantId }
    if (editId) {
      const { error: e } = await supabase.from('facilities').update(payload).eq('id', editId)
      if (e) { setError(e.message); setSaving(false); return }
    } else {
      const { error: e } = await supabase.from('facilities').insert(payload)
      if (e) { setError(e.message); setSaving(false); return }
    }
    setSaving(false); setModal(false); load()
  }

  async function confirmDelete() {
    if (!deleteId) return
    const supabase = createClient()
    await supabase.from('facilities').delete().eq('id', deleteId)
    setDeleteId(null); load()
  }

  function toggle(j: string) {
    setForm(p => ({ ...p, regulatory_jurisdictions: p.regulatory_jurisdictions?.includes(j) ? p.regulatory_jurisdictions.filter(x => x !== j) : [...(p.regulatory_jurisdictions ?? []), j] }))
  }

  const inp: React.CSSProperties = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 14, width: '100%', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ padding: 32, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Facilities</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>{facilities.length} registered</p>
        </div>
        <button onClick={openAdd} style={{ background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', borderRadius: 10, padding: '10px 18px', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          + Add Facility
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>Loading…</div>
        ) : facilities.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>No facilities yet</p>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 4 }}>Add your first facility to get started</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Facility','Type','Stage','Jurisdictions','Status',''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {facilities.map(f => (
                <tr key={f.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <p style={{ color: '#fff', fontSize: 14, fontWeight: 500, margin: 0 }}>{f.name}</p>
                    {f.company_name && <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 }}>{f.company_name}</p>}
                  </td>
                  <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{TYPE_LABELS[f.facility_type] ?? f.facility_type}</td>
                  <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{STAGE_LABELS[f.lifecycle_stage] ?? f.lifecycle_stage}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {(f.regulatory_jurisdictions ?? []).map(j => (
                        <span key={j} style={{ padding: '2px 8px', borderRadius: 6, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa', fontSize: 11 }}>{j}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: f.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.06)', color: f.status === 'active' ? '#4ade80' : 'rgba(255,255,255,0.4)', border: `1px solid ${f.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)'}` }}>
                      {f.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button onClick={() => openEdit(f)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', marginRight: 8, fontSize: 13 }}>Edit</button>
                    <button onClick={() => setDeleteId(f.id)} style={{ background: 'none', border: 'none', color: 'rgba(248,113,113,0.5)', cursor: 'pointer', fontSize: 13 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
          <div style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>{editId ? 'Edit Facility' : 'Add Facility'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>

            {error && <div style={{ marginBottom: 16, padding: '12px 14px', borderRadius: 10, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', fontSize: 13 }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Company Name</label>
                <input value={form.company_name ?? ''} onChange={e => setForm(p => ({ ...p, company_name: e.target.value }))} placeholder="Acme Pharma Inc." style={inp} /></div>

              <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Facility Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Site 1 — Manufacturing" style={inp} /></div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Type</label>
                  <select value={form.facility_type} onChange={e => setForm(p => ({ ...p, facility_type: e.target.value }))} style={{ ...inp, appearance: 'none' as const }}>
                    {TYPES.map(t => <option key={t} value={t} style={{ background: '#111120' }}>{TYPE_LABELS[t]}</option>)}
                  </select></div>
                <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Stage</label>
                  <select value={form.lifecycle_stage} onChange={e => setForm(p => ({ ...p, lifecycle_stage: e.target.value }))} style={{ ...inp, appearance: 'none' as const }}>
                    {STAGES.map(s => <option key={s} value={s} style={{ background: '#111120' }}>{STAGE_LABELS[s]}</option>)}
                  </select></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Country</label>
                  <input value={form.country ?? ''} onChange={e => setForm(p => ({ ...p, country: e.target.value }))} placeholder="United States" style={inp} /></div>
                <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={{ ...inp, appearance: 'none' as const }}>
                    <option value="active" style={{ background: '#111120' }}>Active</option>
                    <option value="on_hold" style={{ background: '#111120' }}>On Hold</option>
                    <option value="archived" style={{ background: '#111120' }}>Archived</option>
                  </select></div>
              </div>

              <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Regulatory Jurisdictions</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {JURISDICTIONS.map(j => {
                    const sel = form.regulatory_jurisdictions?.includes(j)
                    return <button key={j} type="button" onClick={() => toggle(j)} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', background: sel ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${sel ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.1)'}`, color: sel ? '#a78bfa' : 'rgba(255,255,255,0.5)' }}>{j}</button>
                  })}
                </div>
              </div>

              <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Notes</label>
                <textarea value={form.notes ?? ''} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3} placeholder="Optional notes…" style={{ ...inp, resize: 'vertical' as const }} /></div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={() => setModal(false)} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ flex: 2, padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Facility'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28, maxWidth: 400, width: '100%' }}>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Delete facility?</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 24 }}>This cannot be undone.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '10px', borderRadius: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '10px', borderRadius: 10, background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
