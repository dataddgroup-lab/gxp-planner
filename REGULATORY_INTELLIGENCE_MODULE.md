# REGULATORY_INTELLIGENCE_MODULE.md
_Status: SCOPED | Owner: Bobby BIG (Marcus) | Added: 2026-03-14_
_Phase: 2a (Apr 3–16) | Integration: PLEXUS Mesh via Process Spine Queue_

---

## What This Is

A metadata-only regulatory monitoring pipeline that detects changes to FDA, ICH, OSHA, ANSI, EMA, and MHRA guidance — tags them, scores them, maps them to facility modules and spine nodes, and routes them for human review before anything touches the Process Spine.

**Never stores regulatory text. Proposal-only. Human review gates on all spine inputs.**

---

## Architecture Resolutions (Locked)

| ID | Issue | Resolution |
|---|---|---|
| R1 | Daily vs Weekly conflict | Daily = fetch + canonicalize only. Weekly = diff + map + score + package + governance |
| R2 | K8s / Redis / S3 | Translated to Vercel + Supabase Storage + GitHub Actions CI |
| R3 | Local model assumption | Use Claude (OpenClaw) with Budget Confirmation JSON gates |
| R4 | Phase placement | Phase 2a — pairs with Risk engine |
| R5 | PLEXUS integration | Approved events → process_spine_queue → PLEXUS reads via get_required_documents + validate_action |

---

## 8 New Database Tables

All tables require 4 RLS policies (SELECT, INSERT WITH CHECK, UPDATE USING+WITH CHECK, DELETE USING).

```sql
-- 1. regulatory_sources
id, name, source_url, jurisdiction, static_domain_tags, latest_title, latest_date, latest_link, last_checked

-- 2. regulatory_events
id, event_time, source_name, jurisdiction, domain_tags, title, link, date, source_url, human_review_status(pending_review|approved|rejected), impact_score(low|medium|high)

-- 3. consultant_review_tasks
id, created_at, event_id FK, domain_tags, assigned_to, status(open|in_review|completed), priority(low|medium|high)

-- 4. user_alerts
id, created_at, user_id, title, message, link, read(bool)

-- 5. facility_crosslinks
id, event_id FK, facility_module, impact_level, notes

-- 6. domain_to_facility_modules
id, domain_tag, facility_module, default_impact_level
-- Populated: GMP→Cleanrooms/HVAC/Water, GLP→QC Labs, CSV→IT/Data Systems, DI→Data Integrity, EHS→Utilities/Facilities

-- 7. consultant_assignment_rules
id, domain_tag, jurisdiction, assigned_to, default_priority

-- 8. process_spine_queue
id, event_id FK, created_at, status(pending_human_review|approved_for_spine|rejected), approved_by, approved_at, notes
```

---

## 5 Agents + 1 Workflow

- **fetch_public_url**: HTTPS GET, metadata only, robots.txt compliant, no text ingestion
- **regulatory_domain_tagger**: Hybrid tagging — static tags + title inference (sterility→GMP, validation→CSV, data→DI)
- **regulatory_impact_scorer**: Rules-based — GMP/CSV/DI + FDA/EMA → high; GLP/GCP → medium; EHS/Facilities → medium; else low
- **consultant_router**: Looks up consultant_assignment_rules; defaults to regulatory_general_pool if no match
- **regulatory_update_checker**: Orchestrates fetch → tag → score → compare → produce JSON result array
- **check_all_regulatory_updates**: Workflow — calls checker, inserts events, creates tasks, creates alerts, creates crosslinks, queues for spine

---

## CI/CD Pipeline (GitHub Actions)

```yaml
stages: fetch → diff → map → test → governance → canary → rollout

test stage gates (block on failure):
  - zero_exposure_suite (no tenant PII in any artifact)
  - mapping_regression_suite (mapping stability for known clauses)
  - compliance_unit_tests
```

---

## Change Request Schema

```json
{
  "change_request_id": "CR-YYYYMMDD-0001",
  "bundle_version": "vYYYYMMDD.N",
  "source_clause_ids": ["clause:21CFR:211.22"],
  "change_score": 0.78,
  "affected_spine_ids": ["spine:step:1234"],
  "severity": "medium",
  "suggested_action": "update_required_evidence",
  "tests_to_run": ["zero_exposure_suite","regression_211_22"],
  "test_results": {},
  "rollback_plan": "restore_spine_snapshot:vYYYYMMDD.N-1",
  "provenance": {"source_url":"...","agent_version":"reg-agent-v1.0"},
  "status": "pending_review",
  "approvals": []
}
```

---

## Hard Constraints

- Never ingest, store, or display regulatory text
- Never auto-apply changes to any spine element
- Never create or modify process_spine_queue entries via automation (human-only writes to status=approved_for_spine)
- Fail closed on ambiguous mapping (< 0.85 confidence)
- Budget Confirmation JSON required before any Claude/cloud model call
- Cadence: 6-hour cron for monitoring, weekly batch for diff/map/package

---

## Governance Roster (assign before Phase 2a launch)

| Role | Responsibility |
|---|---|
| Regulatory Owner (Bobby BIG) | Clause interpretation, severity review |
| Governance Owner | Final CR approval, spine queue sign-off |
| Release Manager | Packaging, canary, rollback execution |
| QA Owner | Zero-Exposure tests, mapping regression |

---

## Phase 2a Sprint Placement

| Sprint | Week | Work |
|---|---|---|
| 2a-1 | Apr 3–9 | 8 DB tables + RLS, fetch_public_url, regulatory_domain_tagger |
| 2a-2 | Apr 10–16 | impact_scorer, consultant_router, update_checker, check_all_updates workflow, 6hr cron |
| Gate | Apr 16 | Bobby BIG sign-off before Phase 2b |
