-- ============================================================
-- Mission Board: board_items table
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.board_items (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id   uuid REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  title       text NOT NULL,
  tag         text NOT NULL CHECK (tag IN ('Validation','Risk','Facility','Compliance','Training','Change')),
  priority    text NOT NULL CHECK (priority IN ('critical','high','medium','low')),
  assignee    text NOT NULL DEFAULT 'QA Lead',
  phase       text NOT NULL DEFAULT 'Active',
  description text NOT NULL DEFAULT '',
  column_id   text NOT NULL CHECK (column_id IN ('backlog','inprogress','review','done')),
  position    integer NOT NULL DEFAULT 0,
  created_by  uuid REFERENCES auth.users(id),
  created_at  timestamptz DEFAULT now() NOT NULL,
  updated_at  timestamptz DEFAULT now() NOT NULL
);

-- Index for fast tenant queries
CREATE INDEX IF NOT EXISTS board_items_tenant_idx ON public.board_items (tenant_id, column_id, position);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_board_item_timestamp()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS board_items_updated_at ON public.board_items;
CREATE TRIGGER board_items_updated_at
  BEFORE UPDATE ON public.board_items
  FOR EACH ROW EXECUTE FUNCTION public.update_board_item_timestamp();

-- RLS
ALTER TABLE public.board_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "board_items: tenant isolation"
  ON public.board_items FOR ALL
  USING (tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- Seed sample data (runs for the first tenant in the system)
-- Replace the tenant_id value with your actual tenant UUID if needed
DO $$
DECLARE
  v_tenant_id uuid;
  v_user_id   uuid;
BEGIN
  SELECT id INTO v_tenant_id FROM public.tenants LIMIT 1;
  SELECT id INTO v_user_id   FROM auth.users    LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO public.board_items (tenant_id, title, tag, priority, assignee, phase, description, column_id, position, created_by) VALUES
    (v_tenant_id, 'Draft URS for Buffer Prep Room',        'Validation', 'high',     'Val Eng',   'Basis of Design',    'Write URS covering temp, humidity, ISO class, and cleaning validation scope.',                           'backlog',    0, v_user_id),
    (v_tenant_id, 'ICH Q9 Risk Assessment — HVAC Zone 3',  'Risk',       'critical',  'QA Lead',   'Qualification',      'Quantitative risk ranking on HVAC Zone 3 failure modes. Assess impact on Grade B area.',                'backlog',    1, v_user_id),
    (v_tenant_id, 'Site Inspection Readiness Checklist',   'Compliance', 'medium',    'Reg Aff',   'PAI Readiness',      'Complete 120-point FDA pre-approval inspection readiness checklist.',                                  'backlog',    2, v_user_id),
    (v_tenant_id, 'Cleanroom Gown Training — Wave 2',      'Training',   'low',       'QC Analyst','Operational Readiness','Schedule and complete gowning qualification for 12 new staff.',                                    'backlog',    3, v_user_id),
    (v_tenant_id, 'IQ Protocol — Lyophilizer Unit 2',      'Validation', 'high',     'Val Eng',   'Commissioning',      'Execute IQ for LYO-002. 47 of 112 checks complete.',                                                  'inprogress', 0, v_user_id),
    (v_tenant_id, 'Change Control — Revised SOP-MFG-014',  'Change',     'medium',    'QA Lead',   'Commercial Ops',     'Impact assessment underway. Revalidation scope TBD.',                                                 'inprogress', 1, v_user_id),
    (v_tenant_id, 'Facility Layout — Utilities Corridor',  'Facility',   'high',     'Fac Eng',   'Detailed Design',    'Finalize MEP routing through west corridor.',                                                         'inprogress', 2, v_user_id),
    (v_tenant_id, 'OQ Summary Report — Water System',      'Validation', 'high',     'Val Eng',   'Qualification',      'OQ complete. QA Lead review required before PQ can begin.',                                           'review',     0, v_user_id),
    (v_tenant_id, 'Risk Matrix Update — Cold Chain',       'Risk',       'medium',    'QA Lead',   'Validation',         'Updated risk scores after deviation DEV-2024-041.',                                                   'review',     1, v_user_id),
    (v_tenant_id, 'Supplier Qualification — Filter Media', 'Compliance', 'high',     'Reg Aff',   'Procurement',        '2 minor findings. Corrective action plan under review.',                                              'review',     2, v_user_id),
    (v_tenant_id, 'Phase 1a Schema Deployment',            'Facility',   'high',     'Fac Eng',   'Build',              '9-table GxP schema deployed with RLS and audit triggers.',                                            'done',       0, v_user_id),
    (v_tenant_id, 'URS — Primary Manufacturing Suite',     'Validation', 'critical',  'Val Eng',   'Basis of Design',    'URS approved. 214 requirements captured. Linked to FRS-001.',                                        'done',       1, v_user_id),
    (v_tenant_id, 'Risk Register — Initial Population',    'Risk',       'medium',    'QA Lead',   'Strategic Def.',     '63 risks entered. ICH Q9 scoring applied. 4 critical, 11 high priority.',                            'done',       2, v_user_id);
END $$;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
