# AUDITOR_GUIDE.md — GxP Facility Planner
_For: Internal auditors, QA leads, compliance reviewers, FDA inspection preparation_
_Last updated: 2026-03-13 | Owner: the Team Lead_

---

## Purpose

This document is the reference for any auditor — internal or external — reviewing the GxP Facility Planner platform. It covers the constitutional constraints, data governance, audit trail architecture, regulatory alignment, and inspection-readiness proof for every feature.

---

## The Four Constitutional Laws (Non-Negotiable)

Every audit starts here. These laws are immutable and enforced synchronously at runtime.

### Law 1 — Process Spine Is Immutable
The Process Spine (roles, tasks, SOPs, documents, instruments, labs, permits, regulations, allowed transitions, required evidence, lifecycle states) is the sole source of regulatory truth. The mesh reads it; it cannot modify it. Any modification to the Spine requires:
- A versioned Change Request
- Human governance review
- the Team Lead sign-off
- Audit log entry with full provenance

**Audit check:** Pull the Spine version history. Every change must have a corresponding change request with approval record.

---

### Law 2 — Absolute Tenant Data Non-Disclosure
Zero exceptions. Tenant data never leaves tenant scope. This includes:
- External API calls
- System logs and telemetry
- Embeddings and model training
- Developer console output
- "Anonymized" aggregates that could be re-identified

**Audit check:** Run Zero Exposure Tests (automated). Review system log samples and assert no tenant content is present. Review all external API calls made by the system and confirm none carry tenant data.

---

### Law 3 — No Invention Rule
The mesh cannot create new regulatory logic. It maps user intent to existing Spine IDs only. If a mapping is ambiguous (confidence < 0.85), it returns null and creates a human review ticket. It never guesses.

**Audit check:** Pull human review ticket log. Every ambiguous mapping must have a corresponding ticket. Verify no tickets were auto-resolved by the system.

---

### Law 4 — Fail-Closed and Auditable
Every ambiguous output, rule violation, or boundary check failure results in: (1) rejection, (2) audit log entry, (3) human review ticket. No silent failures.

**Audit check:** Introduce a known violation in a test environment. Confirm it is rejected, logged, and tickets generated within expected SLA.

---

## Audit Trail Architecture

### What Is Logged
Every mesh action produces an immutable audit log entry containing:

| Field | Description |
|-------|-------------|
| `model_version` | Exact version of AI model used |
| `function_called` | Which of the 9 Allowed Operations was invoked |
| `input_ids` | Spine IDs used as inputs (no raw tenant content) |
| `validator_result` | Pass/fail result of Runtime Boundary Validator |
| `timestamp` | ISO 8601, UTC |
| `operator_id` | Tenant-scoped user ID who triggered the action |
| `spine_references` | Specific spine nodes/edges referenced |
| `tenant_id` | Tenant scope of this action |

### What Cannot Happen to the Audit Log
- No UPDATE operations
- No DELETE operations
- No overwrite of any kind
- Entries are append-only
- Compliant with 21 CFR Part 11 (electronic records integrity)

### Audit Log Retention
- Minimum 5 years per 21 CFR Part 11 requirements
- Accessible to auditors via read-only audit viewer (role-gated)
- Exportable as signed, tamper-evident JSON or CSV

---

## Regulatory Alignment

### 21 CFR Part 11 Compliance
| Requirement | Implementation |
|-------------|---------------|
| Electronic records are trustworthy | Append-only audit log, immutable spine |
| Electronic signatures are attributable | Operator ID on every action, role-verified |
| Records are accurate and reliable | Validator checks on every output |
| Records are protected | Tenant-scoped encryption, RBAC |
| Audit trails for record changes | Every action logged with full provenance |

### FDA CSA (2022) Alignment
- Validation depth follows risk tier (not blanket documentation)
- High-risk functions (batch release, e-signatures) → full validation
- Low-risk UI features → lightweight assessment
- GxP Planner generates CSA-compliant documentation, not legacy CSV paperwork

### FDA AI Credibility Assessment (January 2025)
Every AI feature in GxP Planner has a documented Context of Use (COU):

| AI Feature | Risk Tier | COU | Assessment Required |
|-----------|-----------|-----|---------------------|
| `map_intent_to_step` | Moderate | Maps natural language to spine steps; human reviews all outputs | Targeted |
| Role assistant queue | Moderate | Surfaces next actions; human approves all compliance actions | Targeted |
| AI-generated protocol drafts | High | Draft only; human review + sign-off required before use | Full credibility |
| Readiness forecasting | Moderate-High | Probabilistic estimate; uncertainty quantified in output | Targeted |
| Workflow suggestions | Low | Advisory only; human always decides | Lightweight |

**All AI outputs include:** "This AI recommendation requires human review before regulatory action."

---

## Tenant Boundary Enforcement — Auditor Verification

### Runtime Boundary Validator — 9 Synchronous Checks
Run on every API call and AI output. All 9 must pass or the action is rejected:

1. Tenant Ownership — all IDs belong to requesting tenant
2. Destination Check — output is tenant-scoped; external channels blocked
3. Permission Check — role allowed per spine
4. State Transition Check — follows allowed paths only
5. Regulatory Coverage Check — required regulation/SOP IDs present
6. Data Exposure Check — no tenant content beyond sanitized IDs/metadata
7. Log Sanitization Check — logs leaving tenant scope are sanitized
8. Fail-Closed — any failure → reject + log + review ticket
9. Provenance Metadata — attached to every accepted action

**Audit check:** Request validator test run logs. Every rejected action must show which check failed and the corresponding audit entry.

---

## Pre-Client-1 Audit Gates

Before any client onboards, the following must be verified and signed off by the Team Lead:

| Gate | Verification Method | Status |
|------|---------------------|--------|
| All 9 Allowed Operations API implemented | Code review + API spec doc | Pending |
| Validation rule set implemented + tested | Automated test results | Pending |
| Runtime Boundary Validator live | Staging test run | Pending |
| Sanitization Layer live | Zero Exposure test results | Pending |
| Audit logs append-only + provenance complete | DB schema review + sample entries | Pending |
| Zero Exposure Tests passing | CI/CD test report | Pending |
| Restore drill completed + verified | Drill report with checksum | Pending |
| Walkthrough human-approved | UX review sign-off | Pending |
| Human approval flow for onboarding validated | End-to-end test | Pending |
| the Team Lead final sign-off | Explicit approval in writing | Pending |

---

## Change Control for Spine Modifications

Any change to the Process Spine follows this workflow:

1. Change request created (versioned, immutable)
2. Impact assessment: which tenants, which steps, which regulations affected
3. QA Lead review and sign-off
4. Regulatory Specialist review and sign-off
5. the Team Lead final approval
6. Spine version incremented
7. All affected tenants notified (in-app)
8. Change logged to audit store with full provenance
9. Downstream mesh nodes re-evaluated for impact

**Audit check:** Every spine version must have a complete change record. No gaps in version history.

---

## Security Controls Summary

| Control | Implementation |
|---------|---------------|
| Encryption at rest | AES-256, tenant-scoped keys |
| Encryption in transit | TLS 1.3 |
| Key management | KMS/HSM with automated rotation |
| Secrets | Vault with RBAC + just-in-time elevation |
| No secrets in code | Enforced via CI/CD scan |
| No tenant training | Policy + technical controls |
| Input hardening | Free text sanitized before processing |
| Prompt injection defense | All free text maps to spine IDs only; ambiguous = null |

---

## SLOs (Service Level Objectives)

| SLO | Target | Current Status |
|-----|--------|----------------|
| Write Durability | 99.99% | Pending |
| Replication Lag | 99% within threshold | Pending |
| Backup Success Rate | 100% | Pending |
| Zero External Exposure | 100% | Pending |

---

## Key Reference Documents

| Document | Purpose |
|----------|---------|
| `PLEXUS_CONSTITUTION.md` | Full Phase 1 engineering spec |
| `PROCESS_REFERENCE_V2.md` | Master process reference (all roles, steps, regulations) |
| `PRODUCT_MANAGER.md` | Product vision + build sequence |
| `QA_TESTING_INFRASTRUCTURE.md` | Full test plan including Zero Exposure + chaos tests |
| `PRE_CLIENT1_RELIABILITY_CHECKLIST.md` | Infrastructure reliability gates |
| `FDA_GOVERNMENT_COMPLIANCE_MODULE.md` | FDA regulatory alignment details |
| `CHANGE_CONTROL_SYSTEM.md` | Change control workflow |
| `VERSIONING_AND_RELEASE_GOVERNANCE.md` | Versioning and release rules |

---

_This document is the auditor's starting point. Every claim in this document is backed by a referenced artifact._
_Questions or gaps → the Team Lead (dataddgroup@gmail.com)_
_Last updated: 2026-03-13_
