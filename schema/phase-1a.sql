-- ============================================================
-- GxP Facility Planner — Phase 1a Foundation Schema
-- Regulatory anchors: 21 CFR 210/211, 21 CFR Part 11, ICH Q10
-- Multi-tenant: RLS-enforced per tenant_id
-- Audit: immutable audit_log, Part 11-aligned
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TENANTS (public, not RLS-protected — managed by service role only)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tenants (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  plan            text NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter','professional','enterprise')),
  status          text NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended','cancelled')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- PROFILES (users, linked to tenants)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id              uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  full_name       text,
  role            text NOT NULL DEFAULT 'viewer' CHECK (role IN (
                    'tenant_admin','qa_lead','validation_engineer',
                    'facility_engineer','regulatory_affairs','qc_analyst',
                    'operations','consultant','viewer'
                  )),
  email           text,
  is_active       boolean NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: tenant isolation"
  ON public.profiles
  FOR ALL
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ============================================================
-- FACILITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.facilities (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name            text NOT NULL,
  facility_type   text NOT NULL CHECK (facility_type IN (
                    'drug_manufacturing','biologics','sterile_fill_finish',
                    'api_manufacturing','qc_laboratory','multi_product','other'
                  )),
  lifecycle_stage text NOT NULL DEFAULT 'strategic_definition' CHECK (lifecycle_stage IN (
                    'strategic_definition','site_selection','permitting',
                    'basis_of_design','detailed_design','construction',
                    'commissioning','qualification','validation',
                    'quality_system_buildout','operational_readiness',
                    'ppq','pai_readiness','commercial_operations','lifecycle_management'
                  )),
  address         text,
  country         text,
  regulatory_jurisdictions text[], -- e.g. ['FDA','EMA','WHO']
  status          text NOT NULL DEFAULT 'active' CHECK (status IN ('active','on_hold','archived')),
  notes           text,
  created_by      uuid REFERENCES public.profiles(id),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "facilities: tenant isolation"
  ON public.facilities
  FOR ALL
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ============================================================
-- DOCUMENTS (controlled documents — URS, FRS, SOPs, protocols, reports)
-- Part 11: versioned, immutable once approved, e-signature ready
-- ============================================================
CREATE TABLE IF NOT EXISTS public.documents (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  facility_id     uuid REFERENCES public.facilities(id) ON DELETE SET NULL,
  doc_number      text NOT NULL, -- e.g. URS-001, SOP-042
  version         text NOT NULL DEFAULT '1.0',
  title           text NOT NULL,
  doc_type        text NOT NULL CHECK (doc_type IN (
                    'urs','frs','ds','sop','protocol','report','risk_assessment',
                    'validation_plan','vmp','change_control','deviation','capa','other'
                  )),
  lifecycle_stage text, -- which facility lifecycle stage this doc supports
  status          text NOT NULL DEFAULT 'draft' CHECK (status IN (
                    'draft','in_review','approved','obsolete','superseded'
                  )),
  content         text, -- document body or summary
  regulatory_refs text[], -- e.g. ['21 CFR 211.68','ICH Q10']
  authored_by     uuid REFERENCES public.profiles(id),
  reviewed_by     uuid REFERENCES public.profiles(id),
  approved_by     uuid REFERENCES public.profiles(id),
  approved_at     timestamptz,
  effective_date  date,
  review_due_date date,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, doc_number, version)
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "documents: tenant isolation"
  ON public.documents
  FOR ALL
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ============================================================
-- VALIDATIONS (validation lifecycle records)
-- IQ → OQ → PQ for equipment; URS → FRS → IQ/OQ/PQ for systems
-- ============================================================
CREATE TABLE IF NOT EXISTS public.validations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  facility_id     uuid NOT NULL REFERENCES public.facilities(id) ON DELETE CASCADE,
  title           text NOT NULL,
  validation_type text NOT NULL CHECK (validation_type IN (
                    'equipment_iq','equipment_oq','equipment_pq',
                    'system_iq','system_oq','system_pq',
                    'process_validation','cleaning_validation',
                    'method_validation','computer_system_validation','other'
                  )),
  status          text NOT NULL DEFAULT 'planned' CHECK (status IN (
                    'planned','in_progress','completed','failed','on_hold'
                  )),
  urs_doc_id      uuid REFERENCES public.documents(id),
  frs_doc_id      uuid REFERENCES public.documents(id),
  protocol_doc_id uuid REFERENCES public.documents(id),
  report_doc_id   uuid REFERENCES public.documents(id),
  planned_start   date,
  planned_end     date,
  actual_start    date,
  actual_end      date,
  assigned_to     uuid REFERENCES public.profiles(id),
  qa_reviewer     uuid REFERENCES public.profiles(id),
  notes           text,
  created_by      uuid REFERENCES public.profiles(id),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.validations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "validations: tenant isolation"
  ON public.validations
  FOR ALL
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ============================================================
-- RISKS (ICH Q9 risk register)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.risks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  facility_id     uuid NOT NULL REFERENCES public.facilities(id) ON DELETE CASCADE,
  title           text NOT NULL,
  description     text,
  risk_category   text CHECK (risk_category IN (
                    'gmp','data_integrity','validation','facility_design',
                    'equipment','process','supply_chain','regulatory','safety','other'
                  )),
  likelihood      int CHECK (likelihood BETWEEN 1 AND 5),
  severity        int CHECK (severity BETWEEN 1 AND 5),
  detectability   int CHECK (detectability BETWEEN 1 AND 5),
  risk_score      int GENERATED ALWAYS AS (likelihood * severity * detectability) STORED,
  mitigation      text,
  residual_risk   text CHECK (residual_risk IN ('low','medium','high','critical')),
  status          text NOT NULL DEFAULT 'open' CHECK (status IN ('open','mitigated','accepted','closed')),
  owner           uuid REFERENCES public.profiles(id),
  qa_reviewer     uuid REFERENCES public.profiles(id),
  reviewed_at     timestamptz,
  created_by      uuid REFERENCES public.profiles(id),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "risks: tenant isolation"
  ON public.risks
  FOR ALL
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ============================================================
-- CHANGE REQUESTS (change control — ICH Q10, 21 CFR 211)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.change_requests (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  facility_id     uuid REFERENCES public.facilities(id) ON DELETE SET NULL,
  ccr_number      text NOT NULL, -- e.g. CCR-2026-001
  title           text NOT NULL,
  description     text,
  change_type     text CHECK (change_type IN (
                    'facility','equipment','process','system','document',
                    'personnel','supplier','regulatory','other'
                  )),
  impact_assessment text,
  validation_required boolean DEFAULT false,
  regulatory_notification_required boolean DEFAULT false,
  status          text NOT NULL DEFAULT 'draft' CHECK (status IN (
                    'draft','under_review','approved','rejected',
                    'implemented','verified','closed'
                  )),
  requested_by    uuid REFERENCES public.profiles(id),
  qa_approver     uuid REFERENCES public.profiles(id),
  approved_at     timestamptz,
  implemented_at  timestamptz,
  verified_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, ccr_number)
);

ALTER TABLE public.change_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "change_requests: tenant isolation"
  ON public.change_requests
  FOR ALL
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ============================================================
-- TRAINING RECORDS (21 CFR 211.68, QMS training requirements)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.training_records (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  profile_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_id     uuid REFERENCES public.documents(id), -- SOP or training material
  training_title  text NOT NULL,
  training_type   text CHECK (training_type IN ('sop','gmp','safety','validation','regulatory','job_specific','other')),
  completed_at    timestamptz,
  due_date        date,
  status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','completed','overdue','waived')),
  assessed_by     uuid REFERENCES public.profiles(id),
  score           numeric,
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.training_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "training_records: tenant isolation"
  ON public.training_records
  FOR ALL
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ============================================================
-- AUDIT LOG (Part 11 immutable audit trail)
-- Insert-only: no UPDATE or DELETE policies
-- ============================================================
CREATE TABLE IF NOT EXISTS public.audit_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id),
  performed_by    uuid REFERENCES public.profiles(id),
  action          text NOT NULL, -- e.g. 'document.approved', 'risk.created', 'validation.status_changed'
  entity_type     text NOT NULL, -- e.g. 'document', 'validation', 'risk'
  entity_id       uuid,
  old_values      jsonb,
  new_values      jsonb,
  ip_address      inet,
  user_agent      text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Read-only for tenant members; inserts via trigger only (never direct user insert)
CREATE POLICY "audit_log: tenant read"
  ON public.audit_log
  FOR SELECT
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ============================================================
-- AUDIT TRIGGER FUNCTION (Part 11 — auto-log changes)
-- ============================================================
CREATE OR REPLACE FUNCTION public.gxp_audit_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _tenant_id uuid;
  _user_id   uuid;
BEGIN
  _user_id := auth.uid();

  IF TG_OP = 'INSERT' THEN
    _tenant_id := NEW.tenant_id;
    INSERT INTO public.audit_log (tenant_id, performed_by, action, entity_type, entity_id, new_values)
    VALUES (_tenant_id, _user_id, lower(TG_TABLE_NAME) || '.created', TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    _tenant_id := NEW.tenant_id;
    INSERT INTO public.audit_log (tenant_id, performed_by, action, entity_type, entity_id, old_values, new_values)
    VALUES (_tenant_id, _user_id, lower(TG_TABLE_NAME) || '.updated', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    _tenant_id := OLD.tenant_id;
    INSERT INTO public.audit_log (tenant_id, performed_by, action, entity_type, entity_id, old_values)
    VALUES (_tenant_id, _user_id, lower(TG_TABLE_NAME) || '.deleted', TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Attach audit triggers to all GxP tables
CREATE TRIGGER audit_facilities
  AFTER INSERT OR UPDATE OR DELETE ON public.facilities
  FOR EACH ROW EXECUTE FUNCTION public.gxp_audit_trigger();

CREATE TRIGGER audit_documents
  AFTER INSERT OR UPDATE OR DELETE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.gxp_audit_trigger();

CREATE TRIGGER audit_validations
  AFTER INSERT OR UPDATE OR DELETE ON public.validations
  FOR EACH ROW EXECUTE FUNCTION public.gxp_audit_trigger();

CREATE TRIGGER audit_risks
  AFTER INSERT OR UPDATE OR DELETE ON public.risks
  FOR EACH ROW EXECUTE FUNCTION public.gxp_audit_trigger();

CREATE TRIGGER audit_change_requests
  AFTER INSERT OR UPDATE OR DELETE ON public.change_requests
  FOR EACH ROW EXECUTE FUNCTION public.gxp_audit_trigger();

CREATE TRIGGER audit_training_records
  AFTER INSERT OR UPDATE OR DELETE ON public.training_records
  FOR EACH ROW EXECUTE FUNCTION public.gxp_audit_trigger();

-- ============================================================
-- INDEXES (performance)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id ON public.profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_facilities_tenant_id ON public.facilities(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documents_tenant_id ON public.documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documents_facility_id ON public.documents(facility_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents(status);
CREATE INDEX IF NOT EXISTS idx_validations_tenant_id ON public.validations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_validations_facility_id ON public.validations(facility_id);
CREATE INDEX IF NOT EXISTS idx_risks_tenant_id ON public.risks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_risks_facility_id ON public.risks(facility_id);
CREATE INDEX IF NOT EXISTS idx_change_requests_tenant_id ON public.change_requests(tenant_id);
CREATE INDEX IF NOT EXISTS idx_training_records_tenant_id ON public.training_records(tenant_id);
CREATE INDEX IF NOT EXISTS idx_training_records_profile_id ON public.training_records(profile_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_tenant_id ON public.audit_log(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON public.audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);

-- ============================================================
-- SCHEMA RELOAD
-- ============================================================
NOTIFY pgrst, 'reload schema';
