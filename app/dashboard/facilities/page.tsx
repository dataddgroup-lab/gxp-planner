'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'

const FACILITY_TYPES = [
  { value: 'drug_manufacturing',   label: 'Drug Manufacturing' },
  { value: 'biologics',            label: 'Biologics' },
  { value: 'sterile_fill_finish',  label: 'Sterile Fill/Finish' },
  { value: 'api_manufacturing',    label: 'API Manufacturing' },
  { value: 'qc_laboratory',        label: 'QC Laboratory' },
  { value: 'multi_product',        label: 'Multi-Product' },
  { value: 'other',                label: 'Other' },
]

const LIFECYCLE_STAGES = [
  { value: 'strategic_definition',   label: 'Strategic Definition' },
  { value: 'site_selection',         label: 'Site Selection' },
  { value: 'permitting',             label: 'Permitting' },
  { value: 'basis_of_design',        label: 'Basis of Design' },
  { value: 'detailed_design',        label: 'Detailed Design' },
  { value: 'construction',           label: 'Construction' },
  { value: 'commissioning',          label: 'Commissioning' },
  { value: 'qualification',          label: 'Qualification' },
  { value: 'validation',             label: 'Validation' },
  { value: 'quality_system_buildout',label: 'Quality System Buildout' },
  { value: 'operational_readiness',  label: 'Operational Readiness' },
  { value: 'ppq',                    label: 'PPQ' },
  { value: 'pai_readiness',          label: 'PAI Readiness' },
  { value: 'commercial_operations',  label: 'Commercial Operations' },
  { value: 'lifecycle_management',   label: 'Lifecycle Management' },
]

const JURISDICTIONS = ['FDA', 'EMA', 'WHO', 'MHRA', 'TGA', 'HC', 'ANVISA', 'PMDA']

const STATUS_COLORS: Record<string, string> = {
  active:    'bg-green-500/15 text-green-400 border-green-500/20',
  on_hold:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  archived:  'bg-slate-500/15 text-slate-400 border-slate-500/20',
}

type Facility = {
  id: string
  company_name: string | null
  name: string
  facility_type: string
  lifecycle_stage: string
  country: string | null
  regulatory_jurisdictions: string[] | null
  status: string
  notes: string | null
}

const empty: Omit<Facility, 'id'> = {
  company_name: '',
  name: '',
  facility_type: 'drug_manufacturing',
  lifecycle_stage: 'strategic_definition',
  country: '',
  regulatory_jurisdictions: [],
  status: 'active',
  notes: '',
}

export default function FacilitiesPage() {
  const supabase = createClient()
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<Omit<Facility, 'id'>>(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const { tenantId: authTenantId, ready: authReady } = useAuth()

  useEffect(() => {
    if (authTenantId) setTenantId(authTenantId)
  }, [authTenantId])

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('facilities')
      .select('id,company_name,name,facility_type,lifecycle_stage,country,regulatory_jurisdictions,status,notes')
      .order('created_at', { ascending: false })
    setFacilities(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openAdd() {
    setForm(empty)
    setEditId(null)
    setError('')
    setModalOpen(true)
  }

  function openEdit(f: Facility) {
    setForm({
      company_name: f.company_name ?? '',
      name: f.name,
      facility_type: f.facility_type,
      lifecycle_stage: f.lifecycle_stage,
      country: f.country ?? '',
      regulatory_jurisdictions: f.regulatory_jurisdictions ?? [],
      status: f.status,
      notes: f.notes ?? '',
    })
    setEditId(f.id)
    setError('')
    setModalOpen(true)
  }

  function toggleJurisdiction(j: string) {
    setForm(prev => ({
      ...prev,
      regulatory_jurisdictions: prev.regulatory_jurisdictions?.includes(j)
        ? prev.regulatory_jurisdictions.filter(x => x !== j)
        : [...(prev.regulatory_jurisdictions ?? []), j]
    }))
  }

  async function save() {
    if (!form.name.trim()) { setError('Facility name is required'); return }
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      tenant_id: tenantId,
      company_name: form.company_name || null,
      country: form.country || null,
      notes: form.notes || null,
    }
    if (editId) {
      const { error: e } = await supabase.from('facilities').update(payload).eq('id', editId)
      if (e) { setError(e.message); setSaving(false); return }
    } else {
      const { error: e } = await supabase.from('facilities').insert(payload)
      if (e) { setError(e.message); setSaving(false); return }
    }
    setSaving(false)
    setModalOpen(false)
    load()
  }

  async function confirmDelete() {
    if (!deleteId) return
    await supabase.from('facilities').delete().eq('id', deleteId)
    setDeleteId(null)
    load()
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Facilities</h1>
          <p className="text-slate-400 text-sm mt-1">{facilities.length} facility{facilities.length !== 1 ? 'ies' : 'y'} registered</p>
        </div>
        <button onClick={openAdd} className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Facility
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading...</div>
        ) : facilities.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-sm">No facilities yet</p>
            <p className="text-slate-600 text-xs mt-1">Add your first facility to get started</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Company / Facility</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Type</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Lifecycle Stage</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Jurisdictions</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {facilities.map(f => (
                <tr key={f.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{f.name}</p>
                    {f.company_name && <p className="text-slate-500 text-xs mt-0.5">{f.company_name}</p>}
                    {f.country && <p className="text-slate-600 text-xs">{f.country}</p>}
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {FACILITY_TYPES.find(t => t.value === f.facility_type)?.label ?? f.facility_type}
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {LIFECYCLE_STAGES.find(s => s.value === f.lifecycle_stage)?.label ?? f.lifecycle_stage}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(f.regulatory_jurisdictions ?? []).map(j => (
                        <span key={j} className="px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-500 text-xs border border-brand-500/20">{j}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[f.status] ?? ''}`}>
                      {f.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(f)} className="text-slate-400 hover:text-white transition-colors p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteId(f.id)} className="text-slate-400 hover:text-red-400 transition-colors p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-card border border-surface-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
              <h2 className="text-lg font-medium text-white">{editId ? 'Edit Facility' : 'Add Facility'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Company Name */}
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={form.company_name ?? ''}
                  onChange={e => setForm(p => ({ ...p, company_name: e.target.value }))}
                  placeholder="Acme Pharma Inc."
                  className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              {/* Facility Name */}
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Facility Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Site 1 — Manufacturing"
                  className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              {/* Type + Stage */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Facility Type</label>
                  <select
                    value={form.facility_type}
                    onChange={e => setForm(p => ({ ...p, facility_type: e.target.value }))}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  >
                    {FACILITY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Lifecycle Stage</label>
                  <select
                    value={form.lifecycle_stage}
                    onChange={e => setForm(p => ({ ...p, lifecycle_stage: e.target.value }))}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  >
                    {LIFECYCLE_STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Country + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Country</label>
                  <input
                    type="text"
                    value={form.country ?? ''}
                    onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                    placeholder="United States"
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  >
                    <option value="active">Active</option>
                    <option value="on_hold">On Hold</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Regulatory Jurisdictions */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Regulatory Jurisdictions</label>
                <div className="flex flex-wrap gap-2">
                  {JURISDICTIONS.map(j => {
                    const selected = form.regulatory_jurisdictions?.includes(j)
                    return (
                      <button
                        key={j}
                        type="button"
                        onClick={() => toggleJurisdiction(j)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selected
                            ? 'bg-brand-500/20 border-brand-500/40 text-brand-500'
                            : 'bg-surface border-surface-border text-slate-400 hover:text-white'
                        }`}
                      >
                        {j}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Notes</label>
                <textarea
                  value={form.notes ?? ''}
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Additional context..."
                  rows={3}
                  className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-500 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-surface-border flex gap-3 justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                {saving ? 'Saving...' : editId ? 'Save Changes' : 'Add Facility'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-card border border-surface-border rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-lg font-medium text-white mb-2">Delete Facility?</h2>
            <p className="text-slate-400 text-sm mb-6">This action cannot be undone. All associated data will be removed.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
