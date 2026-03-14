# PLEXUS_CONSTITUTION.md — Phase 1 Engineering Brief
_Status: LOCKED | Owner: the Team Lead | Date: 2026-03-13_
_This is the single source of truth for PLEXUS mesh engineering execution._

---

## Purpose

A compact, machine-actionable Phase-1 brief for implementing a hyper-intelligent mesh that is 100.0000% constrained by the Process Spine and enforces an absolute tenant non-disclosure rule, plus dynamic team onboarding and a professional walkthrough.

---

## Immutable System Laws (Constitution)

**Law 1 — Process Spine Is Sole Source of Truth**
Roles, tasks, SOPs, documents, instruments, labs, permits, regulations (21 CFR, predicates), allowed transitions, required evidence, and lifecycle states are immutable to the mesh. The mesh may read and traverse the spine only.

**Law 2 — Absolute Tenant Data Non-Disclosure**
Zero exceptions. The mesh and all AI components must never communicate, transmit, summarize, transform, or expose tenant data outside that tenant's boundary. This includes: emails, SMS, webhooks, external APIs, logs/telemetry that leave tenant scope, analytics, embeddings, model training, developer consoles, error messages, or any "anonymized" form that could be re-identified. Any operation that would cause exposure must fail closed and be audited in-system.

**Law 3 — No Invention Rule**
The mesh cannot create or modify spine elements, rules, roles, tasks, SOPs, regulatory logic, or lifecycle states. Requests requiring new primitives must fail closed and generate a versioned change request for human governance.

**Law 4 — Fail-Closed and Auditable**
Ambiguous mappings, low-confidence outputs, or rule violations are rejected, logged to the system audit store, and routed for human review. No silent failures. No best guesses.

---

## Inputs, Allowed Operations, and Forbidden Actions

### Allowed Inputs
- Process Spine (immutable)
- Tenant roster mapped to spine IDs (structured)
- Operational state (tasks, assignments, priorities, timelines, risks, deviations)
- Contextual signals (role, time, workload, facility)
- Sanitized metadata only

### Allowed Operations API (implement these functions only)

```typescript
list_allowed_tasks(tenant_id, role_id, context_state) -> task_ids[]
get_required_documents(tenant_id, step_id) -> document_ids[]
map_intent_to_step(tenant_id, intent_text) -> { step_id | null, confidence: float }
rank_tasks(tenant_id, task_ids[], context) -> { ranked_task_ids[], scores[] }
group_tasks(tenant_id, task_ids[], pattern_id) -> workflow_id
schedule_tasks(tenant_id, task_ids[], window_start, window_end) -> schedule_entries[] // fail closed if constraints violated
validate_action(tenant_id, action_object) -> { valid: bool, violations[] }
explain_decision(tenant_id, decision_id) -> { explanation, spine_references[] }
render_walkthrough(tenant_id, onboarding_context) -> sanitized_render_asset_id // tenant-scoped, sanitized
```

### Operation Semantics
- Free text maps only to existing spine IDs. Ambiguous or low-confidence (< 0.85 cosine similarity) → return null + create human review ticket.
- Confidence measured via cosine similarity between intent embedding and spine node embeddings.
- Scheduling/reassignment allowed only within spine constraints and role permissions.
- Explanations must cite spine IDs only — no tenant content beyond sanitized IDs and metadata.
- All outputs must pass `validate_action` before any state change or user-facing render.

### Forbidden
- Create/modify spine elements, roles, tasks, SOPs, regulations, or lifecycle states.
- Cross-tenant aggregation, cross-tenant reasoning, or using one tenant's data to affect another.
- Any external communication of tenant data.
- Using tenant data for model training or embeddings without explicit, auditable tenant consent and governance approval.
- External rendering services that receive tenant content (Phase 1).

---

## Enforcement, Validation, Audit, and Security Controls

### Runtime Enforcement
- **Runtime Boundary Validator:** synchronous gate on every AI output and API call. Enforces tenant boundary, permission checks, state transitions, and non-disclosure.
- **Sanitization Layer:** strips tenant content from system logs/telemetry. Blocks outputs that cannot be sanitized without losing required context.
- **Fail-Closed Policy:** ambiguous/low-confidence mappings or rule violations → reject → log → route to human review.

### Tenant Boundary Validator — Synchronous Checklist
Every AI output and API call must pass ALL checks:

| Check | Rule |
|-------|------|
| Tenant Ownership | Every referenced ID belongs to requesting tenant |
| Destination Check | Output destination is tenant-scoped; external channels blocked |
| Permission Check | Role allowed to perform action per spine |
| State Transition Check | Transition follows allowed paths |
| Regulatory Coverage Check | Required regulation/SOP IDs present for compliance actions |
| Data Exposure Check | Output contains no tenant content beyond sanitized IDs/metadata |
| Log Sanitization Check | Any log entry leaving tenant scope is sanitized; otherwise block |
| Fail Closed | Any failed check → reject + log validator result + create human review ticket |
| Provenance Metadata | Attach: model version, function called, input IDs, validator result, timestamp, operator ID to every accepted action |

### Audit & Provenance (in-system)
- All mesh actions logged to system audit store (append-only).
- Each log entry includes: model version, function called, input IDs, validator result, timestamp, operator ID, spine references.
- Every action must be reversible via deterministic rollback paths.

### Security Controls
- Encryption at rest and in transit; tenant-scoped keys where feasible; KMS/HSM usage and automated key rotation.
- Secrets vault with RBAC and just-in-time elevation for privileged access. No secrets in code or logs.
- No training on tenant data unless explicit, auditable tenant consent and governance approval exist.
- Input hardening and prompt injection defenses: sanitize free text; map only to spine IDs; ambiguous inputs fail closed.

### Human-in-the-Loop
- Auto-apply only low-risk operations.
- High-risk or compliance-impacting actions require explicit human approval via versioned change request workflow.

---

## Onboarding Team Feature & Walkthrough UX

### Team Build
- Ingest tenant roster (structured CSV/JSON); map each person to spine role/subrole IDs.
- Allow multiple roles/subroles per person only if roles exist in spine and validators pass.
- Ambiguous mappings create human review tickets.

### Roster Ingestion Format (required)
```json
{
  "tenant_id": "string",
  "person_id": "string",
  "email_hash": "string",
  "display_name_hash": "string",
  "role_candidates": [
    { "spine_role_id": "string", "confidence": 0.92 }
  ]
}
```
- Do not include raw PII in system-wide logs.
- Store PII only in tenant-scoped encrypted storage.
- Confidence threshold: 0.85. Below threshold → human review ticket.

### Dynamic Assignment
- Mesh may propose role assignments and initial task allocations.
- Proposals must pass validators and be human-approved for Client 1.

### Professional Walkthrough
- Render a single professional, non-cartoony animated walkthrough that:
  - Introduces the Process Spine
  - Shows assigned roles (by spine ID)
  - Highlights the first 7 tasks
  - Explains required evidence and regulatory anchors
- Walkthrough assets must contain no tenant data beyond sanitized IDs/metadata.
- No external rendering services may receive tenant content in Phase 1.
- Use in-system renderer (server-side React/Canvas to PNG or sanitized JSON rendered client-side).
- Final onboarding assignments and walkthrough must be human-approved before in-app visibility.

---

## Tests, SLOs, Acceptance Criteria, and Deliverables

### Automated Tests
- **Zero Exposure Tests:** assert no tenant data appears in system logs, telemetry, external outputs, or walkthrough assets. Run on every PR and deployment.
- **Mapping Ambiguity Tests:** assert ambiguous roster entries produce human review tickets.
- **Restore Drills:** scheduled PITR and snapshot restore drills with checksum verification.
- **Chaos Tests:** controlled failover for DB, AZ, cache, and network partitions to exercise validators and rollback.
- **Canary Deployments:** feature flags and auto-rollback thresholds.

### SLOs / SLIs (Phase 1)
| SLO | Target |
|-----|--------|
| Write Durability | 99.99% |
| Replication Lag | 99% within threshold |
| Backup Success Rate | 100% |
| Zero External Exposure | 100% |

### Acceptance Criteria (must pass before Client 1)
- [ ] All 9 Allowed Operations API functions implemented and documented
- [ ] Validation rule set implemented and passing automated tests
- [ ] Runtime Boundary Validator and Sanitization Layer in place and tested
- [ ] System audit logs record provenance metadata for every action
- [ ] Zero Exposure Tests pass
- [ ] One successful restore drill completed and verified
- [ ] Walkthrough renders professional assets and passes human UX review
- [ ] Human approval flow for onboarding validated
- [ ] the Team Lead sign-off on all acceptance criteria

---

## 9 Required Deliverables (Engineering Handoff Artifacts)

| # | Artifact | Format |
|---|---------|--------|
| 1 | Allowed Operations API Spec | JSON with function signatures, inputs, outputs, failure modes |
| 2 | Validation Rule Set | JSON/YAML implementing referential integrity, permission checks, state transitions, regulatory coverage, tenant boundary checks, fail-closed behavior |
| 3 | Tenant Boundary Enforcement Architecture Diagram | runtime validator, sanitization layer, blocked flows, audit pipeline |
| 4 | Onboarding Flow Spec | roster ingestion format, mapping algorithm, confidence thresholds, human approval UI, walkthrough rendering inputs |
| 5 | Audit & Provenance Schema | system audit log format + sample log entry |
| 6 | Security Controls Checklist | encryption, keys, secrets, no-training policy, telemetry sanitization tests |
| 7 | Test Plan | Zero Exposure Tests, mapping ambiguity tests, restore drills, chaos tests, canary criteria |
| 8 | Acceptance Criteria Checklist | SLOs and pass/fail rules |
| 9 | Phase 1 Implementation Roadmap | milestones, owners, estimated effort |

---

## Sprint Plan

| Week | Milestone | Owner |
|------|-----------|-------|
| Week 1 | Constitutional layer: graph schema, immutable spine storage | Backend |
| Week 2 | Allowed Operations API skeleton + unit tests | Backend |
| Week 3 | Runtime Boundary Validator + Sanitization Layer deployed to staging | Infra |
| Week 4 | Onboarding roster ingestion, mapping algorithm, human review tickets | Backend + Product |
| Week 5 | Walkthrough renderer integration (sanitized assets + UX review) | UX + Backend |
| Week 6 | Zero Exposure tests, restore drill, canary setup, acceptance testing | QA + Infra |

**Estimated effort:** 4–8 engineer-weeks (2–3 engineers parallelizable) + governance owner.
**Pre-Client-1 infra baseline:** $325–$525/month (risk-averse stack).

---

## First Task for Any Midstream Engineer

Implement `map_intent_to_step` end-to-end in staging:

```
intent text → embedding → cosine similarity vs spine nodes → 
validate_action → audit log entry → sanitized explain_decision
```

Run Zero Exposure tests. Demonstrate rollback. If this works, the constitutional layer is proven.

---

## Relationship to PLEXUS Architecture

| PLEXUS (intelligence layers) | PLEXUS Constitution (constraints) |
|---------------------------|--------------------------------|
| What the mesh CAN do | What the mesh MUST NOT do |
| 7 intelligence layers | 4 immutable system laws |
| Dependency propagation engine | Process Spine (read-only) |
| Role assistant capabilities | Allowed Operations API (9 functions only) |
| LLM cost model | Runtime Boundary Validator |

**Together: PLEXUS is the engine. The Constitution is the cage that makes the engine safe for regulated pharma environments.**

---

_This document is the single source of truth for Phase 1 engineering execution._
_Any deviation from the 4 System Laws requires the Team Lead approval and a versioned change request._
_Last updated: 2026-03-13_

---

## REGULATORY INTELLIGENCE INTEGRATION (Added 2026-03-14)

### How Reg Events Enter the PLEXUS Mesh

Regulatory Intelligence is the ONLY approved external data feed into the Process Spine.
The integration path is strictly controlled:

1. Regulatory update detected by monitoring pipeline (metadata only)
2. Domain-tagged, impact-scored, mapped to spine node IDs
3. CI gates pass (Zero-Exposure + mapping regression)
4. Human review: QA/Consultant approves CR → human_review_status = "approved"
5. process_spine_queue.status set to "approved_for_spine" by human action only
6. PLEXUS reads via get_required_documents(step_id) and validate_action(action)
7. No spine element is ever mutated — events are read-only reference inputs

### Law 3 Enforcement for Reg Intel
The regulatory_update_checker agent and check_all_regulatory_updates workflow are FORBIDDEN from:
- Writing to process_spine_queue with status "approved_for_spine" (human-only)
- Modifying any spine node, role, task, SOP, or lifecycle state
- Publishing or transmitting tenant data in any artifact

Any attempted violation must fail closed and write to system audit log.

### Allowed PLEXUS Operations Used by Reg Intel Module
- map_intent_to_step: Maps detected clause to spine step ID (confidence ≥ 0.85 required)
- validate_action: Gate on every reg event before creating crosslinks or alerts
- explain_decision: Provides human-readable audit rationale for all CR decisions
