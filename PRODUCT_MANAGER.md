# PRODUCT_MANAGER.md — GxP Facility Planner
_The product vision guardian. Read this before building anything._

---

## THE PRODUCT VISION

**GxP Facility Planner** is an operational intelligence system for regulated industries.

It is a domain-aware platform that reasons across validation, risk, deviations, release readiness, and facility lifecycle. Users interact through a clean, minimal interface — type or speak — and the system handles the reasoning, traceability, and regulatory logic behind the scenes.

**One-liner:** "We're building an operational intelligence system — a platform that understands validation, risk, deviations, and facility operations, and helps teams run their work through a clean, voice-first interface."

**For investors/partners:** "A domain-aware platform that can reason across validation, risk, deviations, release readiness, and facility lifecycle. Not a chatbot — a continuous operational intelligence layer woven throughout the entire platform."

**The architecture:** A builder-agent constructs the product, but the intelligence customers interact with lives entirely inside the SaaS. The system maintains tenant-specific context, understands regulatory frameworks, and can execute multi-step operational tasks by voice or text.

**Why this positioning works:**
- Avoids AGI hype
- Avoids underselling the intelligence
- Credible with enterprise buyers
- Exciting to investors
- Aligned with the actual architecture

**The core promise:** A pharma company building a new facility uses GxP Planner from day one. When FDA shows up for a Pre-Approval Inspection, the customer opens their laptop and has complete, audit-ready proof of everything. No gaps. No scrambling.

---

## DEFINITION OF DONE (Full Product)

The product is DONE when a customer can:

1. **Create a facility** — define type, location, regulatory jurisdictions
2. **Follow the 15-stage lifecycle** — guided step by step from strategic definition to commercial ops
3. **Manage all validations** — IQ/OQ/PQ lifecycle, full traceability URS → FRS → test → result
4. **Manage all risks** — ICH Q9 risk register, live risk score, mitigations
5. **Control all changes** — change control records, impact assessment, QA approval workflow
6. **Manage all documents** — controlled docs, versioning, e-signatures, approval workflow
7. **Track all training** — who is trained on what SOP, when, assessment scores
8. **See the audit trail** — every action, every change, every approval — immutable, Part 11
9. **Get inspection-ready proof** — compliance dashboard showing real-time readiness
10. **Use the AI assistant** — voice + text prompt bar that knows their facility context and answers GxP questions

---

## THE 6 CORE MODULES (ALL REQUIRED FOR MVP)

| Module | Status |
|---|---|
| Facility Management | Schema ✅, UI partial (CRUD done) |
| Validation Lifecycle | Schema ✅, UI not built |
| Risk Register | Schema ✅, UI not built |
| Change Control | Schema ✅, UI not built |
| Document Control | Schema ✅, UI not built |
| Training Records | Schema ✅, UI not built |

**Plus:**
- Compliance Dashboard (inspection readiness proof)
- AI Prompt Bar (voice + text, facility-aware)
- Audit Log viewer

---

## PRODUCT MANAGER RULES

### Before building ANY feature:
1. **Does this serve the 15-stage lifecycle?** If not, why are we building it?
2. **Does this move toward Definition of Done?** If it's a nice-to-have, defer it.
3. **Does this conflict with another module?** Check the full schema before touching data models.
4. **Is this the right sequence?** Don't build Change Control before Validations if Validations are a dependency.

### Build sequence (recommended):
1. ✅ Foundation schema (done)
2. ✅ App scaffold + auth (done)
3. ✅ Facilities CRUD (done)
4. → Risk Register (next — simple, high value)
5. → Validations (core product differentiator)
6. → Documents (controlled doc management)
7. → Change Control (depends on docs + validations)
8. → Training Records
9. → Compliance Dashboard
10. → AI Prompt Bar

### Never do:
- Build UI for a module without checking schema compatibility first
- Add fields to a table without checking if it breaks existing pages
- Build a "nice-to-have" feature before core modules are complete
- Make architectural changes without flagging impact on the full product

---

## REGULATORY ALIGNMENT CHECK (before every feature)

Every feature must answer:
- Which regulatory domain does this touch? (GMP, data integrity, validation, etc.)
- Which lifecycle stage does this support?
- Does this need an audit trail?
- Does this need QA involvement/approval workflow?
- Is this Part 11 relevant?

---

## THE CUSTOMER JOURNEY (never lose sight of this)

```
Discovery → Signup → Guided Setup → Facility Buildout → 
Operational Readiness → Validation → PAI Readiness → 
Commercial Operations → Renewal & Expansion
```

Every feature we build must serve this journey. If it doesn't, we don't build it yet.

---

## GROUNDBREAKING ANALYTICS (Planned)

- Temporal flow maps — risk/validation/readiness as living timelines
- Compliance topology — facility heat map (rooms colored by validation state)
- Readiness radar — PAI readiness spider chart across all 6 domains
- Causal chain graphs — deviation → CAPA → SOP → training → revalidation
- Predictive timeline — AI-projected lifecycle completion with confidence intervals
- Live ICH Q9 risk matrix — updates in real time

## ROLE-BASED TAG-ALONG ASSISTANT (Planned)

Rendered as a beautiful, minimal floating entity — ghostly, ethereal, calm. Think ambient intelligence, not intrusive assistant. Show/hide on demand. Never cheesy. Think less Microsoft Clippy, more a softly glowing presence that feels like it belongs in the interface. Fully custom React component with subtle animation.

Every role gets a context-aware in-app AI assistant that:
- Knows the user's role, current page, and open tasks
- Proactively surfaces relevant alerts and actions
- Answers in role-specific language (QA vs engineer vs executive)
- Executes tasks by voice or text ("log a deviation for line 3")
- Watches and helps without interrupting workflow

This is the core AGI layer — what makes this an intelligence system, not a SaaS tool.

---

---

## 🚨 FDA REGULATORY POSITION — MANDATORY AWARENESS (Non-Negotiable)
_Added: 2026-03-13 — the Team Lead directive. Cannot be overlooked or forgotten._

### 1. FDA Computer Software Assurance (CSA) — Current Position
FDA's 2022 final guidance **replaced CSV (Computer Software Validation) with CSA**. This is the law of the land for all GxP software today.

**What changed:**
- Old (CSV): Document everything. Heavy IQ/OQ/PQ paperwork regardless of risk.
- New (CSA): **Critical thinking first. Test what matters. Risk-based effort.** Documentation follows risk — not the other way around.

**What this means for GxP Planner:**
- Every validation protocol, test, and document we generate must reflect CSA principles
- Risk drives depth: high-risk functions (e.g., batch release, electronic signatures) get full validation; low-risk UI features get lighter treatment
- "Intended use" and "risk to patient" are the primary drivers of validation scope
- GxP Planner must help customers apply CSA — not just generate old-style CSV paperwork
- Our validation lifecycle (URS → IQ → OQ → PQ) must be configurable by risk tier

**Key FDA references:**
- FDA Guidance: "Computer Software Assurance for Production and Quality System Software" (Sept 2022)
- 21 CFR 211.68, 21 CFR 820.70(i)

---

### 2. FDA AI Draft Guidance — January 2025: "Credibility Assessment Framework"
FDA published a formal risk-based framework for assessing AI/ML models used in regulated GxP environments.

**Core concept — Context of Use (COU):**
Every AI model must have a defined COU: what it does, where it's used, and what decisions it influences. GxP Planner's AI features must each have a documented COU.

**The Credibility Assessment Framework requires:**
| Element | What We Must Do |
|---------|----------------|
| **Risk categorization** | Classify each AI feature by influence on patient safety / regulatory decision |
| **Context of Use (COU)** | Document exactly what each AI model does and doesn't do |
| **Model performance evaluation** | Demonstrate the AI performs reliably within its COU |
| **Uncertainty quantification** | AI outputs must convey confidence levels — no black-box answers |
| **Bias assessment** | Evaluate for bias in training data and outputs |
| **Documentation** | Maintain credibility assessment records per model, per release |

**Risk tiers (FDA framework):**
- **High influence** (AI drives a regulatory decision) → Full credibility assessment required
- **Moderate influence** (AI informs a human decision) → Targeted assessment
- **Low influence** (AI assists workflow, human always decides) → Lightweight assessment

**What this means for GxP Planner's AI features:**
- The Role-Based Tag-Along Assistant → Moderate influence (must have COU + performance eval)
- AI-generated validation protocols → High influence (full credibility assessment required)
- AI readiness forecasting → Moderate to high (must quantify uncertainty in predictions)
- Workflow suggestions → Low influence (lightweight assessment)
- All AI features must include: "This AI recommendation requires human review before regulatory action"

**Key FDA reference:**
- FDA Draft Guidance: "Artificial Intelligence in Drug Manufacturing" (Jan 2025)
- FDA Discussion Paper: "Using Artificial Intelligence and Machine Learning in the Development of Drug and Biological Products"

**Bottom line:** We cannot ship AI features in GxP Planner without a credibility assessment framework baked in. This is not optional. It is the current FDA position and will be enforced.

---

## PRE-CLIENT-1 RELIABILITY REQUIREMENTS (Non-Negotiable)
_Added: 2026-03-13 — the Team Lead directive_

Before any client onboards, the following must be complete. These are not optional.

**Required stack ($90–$110/mo at launch):**
- Multi-AZ DB (primary + sync replica) + PITR
- HA Redis (persistent)
- Secrets vault (no .env in production)
- Monitoring + alerts (CPU, memory, DB lag, error rate)
- Logging with 5-year retention path (21 CFR Part 11)
- Append-only audit log (no UPDATE/DELETE on GxP records)

**Reference documents (all in `/GxP-Planner/`):**
- `PRE_CLIENT1_RELIABILITY_CHECKLIST.md` — every item to verify
- `PRE_CLIENT1_ARCHITECTURE_DIAGRAM.md` — stack diagram + failure scenarios
- `BUDGET_OPTIMIZED_IMPLEMENTATION_PLAN.md` — 3-phase rollout plan
- `TENANT_COST_CALCULATOR.md` — cost/client, break-even analysis (Client 1 = 92% margin)
- `CLIENT1_LAUNCH_READINESS.md` — final go/no-go gate, the Team Lead sign-off required

**Bottom line:** GxP clients operate in regulated environments. Platform failure during a facility buildout = liability. Reliability is a product requirement, not an IT concern.

---

---

## 🧠 PLEXUS — THE HYPER MESH INTELLIGENCE LAYER
_Added: 2026-03-13 — Architecture locked by the Team Lead. This IS the product._

### What PLEXUS Is
**HALO** (internal codename) is the intelligence core of GxP Facility Planner. It is not a chatbot. It is not a dashboard. It is a **living regulatory execution mesh** — a dependency graph of every step, role, action, document, equipment item, permit, and regulation across the entire facility lifecycle, with AI reasoning running on top of it.

Named after HAL from 2001: A Space Odyssey — same omniscience, zero homicidal tendencies. Way less creepy.

**The moat:** the Team Lead's 30 years of GxP knowledge encoded as dependency edges in the mesh. Competitors can clone the UI. They cannot clone the knowledge.

---

### The 7 Intelligence Layers

| Layer | What It Does | Technology |
|-------|-------------|------------|
| 1. Typed Property Graph | Nodes + weighted edges with temporal properties | PostgreSQL recursive CTEs |
| 2. Vector Embeddings | Semantic similarity — discovers implicit connections | pgvector + OpenAI embeddings |
| 3. Critical Path Engine | Every change recalculates timeline impact instantly | TypeScript + Edge Functions |
| 4. LLM Causal Reasoning | WHY things depend on each other, second-order effects | Claude API (Sonnet) |
| 5. Predictive Risk Engine | Flags risks before they materialize | Rule-based → ML over time |
| 6. Regulatory Intelligence Feed | Auto-flags when regulations change + impacts mapped | Scheduled Edge Functions |
| 7. Cross-Facility Learning | Network effect — more facilities = smarter mesh | Anonymized aggregate patterns |

**All built on Supabase. No Neo4j. No separate vector DB. One codebase.**

---

### The Graph Schema (foundation — build this FIRST)

```
process_nodes     — every step, document, equipment, permit, action
node_edges        — typed connections (blocks | triggers | requires | invalidates)
                    with weight, strength, propagation type
node_status       — per-facility state (pending | in_progress | complete | blocked | failed)
role_actions      — specific actions per role per node
action_completions — who completed what, when, signed
facility_context  — current phase, readiness score, open blockers
llm_usage_log     — token tracking per facility per model (cost control)
```

**This schema IS the product. Build flat forms first = rework everything later. Build mesh first = all 6 phases build cleanly on top.**

---

### The Dependency Mesh (every change propagates)

A design change in Phase 2 → system automatically:
1. Creates change control record
2. Invalidates downstream IQ records (equipment in changed area)
3. Re-triggers validation queue for affected equipment
4. Recalculates critical path (new Phase 3 gate date)
5. Identifies personnel requiring re-training (SOP changed)
6. Flags FDA submission timeline risk
7. Notifies exact roles whose queues are now affected

**One change. System traces the full chain. No consultant needed.**

---

### Role-Based AI Assistants (one per role)

Each user sees only their queue. Each assistant knows their full regulatory scope:

| Role | Assistant Knows |
|------|----------------|
| Project Manager | All open actions across ALL roles, critical path, blockers, timeline risk |
| QA Lead | GMP requirements per step, validation queue, open CAPAs, document review |
| Regulatory Specialist | Which regs apply now, permit status, FDA RFI deadlines, regulatory change alerts |
| EHS Specialist | OSHA compliance, hazard assessments, permit renewals, safety inspections |
| Validation Team | IQ/OQ/PQ status per equipment, calibration schedules, deviation log |
| Documentation Team | Documents required per step, SOP version control, training record gaps |

**User experience:** Clean, calm, ambient. Nothing like Clippy. A softly glowing presence that surfaces the right thing at the right time without being asked.

---

### Cost Control (LLM stays < 0.5% of revenue)

| Strategy | Impact |
|---------|--------|
| Mesh-first: 80-90% of questions answered without LLM | Biggest lever |
| Model tiering: Haiku ($0.001) → Sonnet ($0.01) → Opus ($0.05) | 80% cost reduction |
| Semantic response cache (40-60% hit rate) | 40% cost reduction |
| Batched background processing (nightly risk scan, weekly reg check) | 60% fewer real-time calls |
| Tight prompt engineering + output constraints | 5x token efficiency |

**Hard budget per plan:** $15/mo (Starter), $50/mo (Professional), $150/mo (Enterprise). Track in `llm_usage_log`. Throttle at 100%.

---

### Monday Build Sequence

| Session | What | Cost |
|---------|------|------|
| 1 | Graph schema + pgvector migrations | ~$80 |
| 2 | Propagation engine + critical path algorithm | ~$100 |
| 3 | Role-aware action queue UI | ~$80 |
| 4 | Claude API integration (role assistants) | ~$120 |
| 5–14 | All 6 phases built ON TOP of the mesh | ~$1,500 |

---

### The Master Process Reference

The full end-to-end customer journey is documented in:
- `PROCESS_REFERENCE_V2.md` — 16 roles, 30+ equipment items, 6 phases, dependency mesh map, AI assistant scopes
- `END_TO_END_BUILD_PLAN.md` — scenario-driven build approach (reference facility: biotech startup, sterile fill-finish, Colorado)

**Every feature must map to at least one node in PROCESS_REFERENCE_V2.md. If it doesn't — it doesn't get built.**

---

### The Mission (never lose sight of this)

> *"Every facility that gets built right, every validation that doesn't get skipped, every change control that gets caught before it becomes a deviation — that's a patient who gets a safe drug."*

This is not a project management app. It is a patient safety platform disguised as a facility planning tool. That is the north star for every product decision.

---

---

## 🏛️ PLEXUS CONSTITUTION — PHASE 1 ENGINEERING LAWS
_Added: 2026-03-13. Full spec in `PLEXUS_CONSTITUTION.md`. These are non-negotiable._

**Law 1 — Process Spine Is Immutable**
The mesh reads and traverses the spine only. It cannot create or modify roles, tasks, SOPs, regulations, or lifecycle states. New primitives → versioned change request → the Team Lead approval.

**Law 2 — Absolute Tenant Non-Disclosure**
Zero exceptions. No tenant data leaves tenant scope. Not in logs, not in embeddings, not in telemetry, not in "anonymized" form. Fail closed. Audit everything.

**Law 3 — No Invention Rule**
The mesh cannot invent regulatory logic. If it can't map to a spine ID, it returns null and creates a human review ticket. Never a best guess in a GxP context.

**Law 4 — Fail-Closed and Auditable**
Ambiguous outputs → reject → log → human review. No silent failures.

**The 9 Allowed Operations (implement only these):**
`list_allowed_tasks` · `get_required_documents` · `map_intent_to_step` · `rank_tasks` · `group_tasks` · `schedule_tasks` · `validate_action` · `explain_decision` · `render_walkthrough`

**Acceptance criteria before Client 1:**
All 9 API functions implemented · Boundary Validator live · Zero Exposure Tests passing · Restore drill completed · Walkthrough human-approved · the Team Lead sign-off.

→ Full spec: `PLEXUS_CONSTITUTION.md`

---

_Last updated: 2026-03-13 21:00 MDT_
_Owner: the Team Lead (CEO) + AI Product Manager_

---

## PHASE 2 SPRINT PLAN (Added 2026-03-14)
_Source: GxP System Map — gxp-system-map.html_

### Architecture Resolutions Applied to All Phase 2 Builds
- R1: Daily reg fetch = metadata + canonicalize only. Weekly = diff + map + package + governance.
- R2: All infra is Vercel + Supabase + GitHub Actions. No K8s, Redis, or S3.
- R3: Claude (OpenClaw) used for semantic mapping with Budget Confirmation JSON gates.
- R4: Regulatory Intelligence added to Phase 2a alongside Risk engine.
- R5: Approved reg events feed PLEXUS via process_spine_queue. No spine mutation ever.

### Phase 2a — Risk + Readiness + Regulatory Intelligence (Apr 3–16, ~$105)
Sprint 2a-1 (Apr 3–9):
- Risk Register UI — ICH Q9, severity/likelihood, mitigations, links to reg events (~$20)
- Reg Intel: 8 DB tables + all RLS policies (~$20)
- Reg Intel: fetch_public_url + regulatory_domain_tagger (~$15)

Sprint 2a-2 (Apr 10–16):
- Facility Readiness Engine — score calculator, dashboard card (~$15)
- Reg Intel: impact_scorer + consultant_router + update_checker agents (~$20)
- Reg Intel: check_all_updates workflow + 6hr cron + guardrails (~$15)
→ Gate: the Team Lead approval Apr 16

### Phase 2b — Equipment Database (Apr 17–23, ~$45)
Sprint 2b-1 (Apr 17–23):
- Equipment Master List — IQ/OQ/PQ, calibration, SOP links, training records (~$25)
- Equipment ↔ Facility Crosslinks — feeds Reg Intel (~$10)
- Equipment Regulatory Tagging — auto domain tags (~$10)
→ Gate: the Team Lead approval Apr 19

### Phase 2c — Lab Layout Design Tool (Apr 24 – May 7, ~$100)
Sprint 2c-1 (Apr 24–30):
- Layout Data Model — rooms, zones, equipment placement (~$15)
- Visual Room/Zone Builder — Ant Design, no custom components (~$30)
- GMP/GLP Zone Classification — links to facility_crosslinks (~$10)

Sprint 2c-2 (May 1–7):
- HVAC/Utilities Tracking — maintenance status, commissioning state (~$15)
- Layout Compliance Check — PLEXUS validate_action, violations logged (~$20)
- Layout Export — PDF/JSON for FDA inspection package (~$10)
→ Gate: the Team Lead approval May 3

### Phase 2d — UI Polish + Onboarding + Manuals Start (May 8–21, ~$130)
Sprint 2d-1 (May 8–14):
- Premium Onboarding Flow — <5 min, 3 fields, auto-DPA (~$25)
- Type V DMF Auto-Generation — per TYPE_V_DMF_GENERATION_SPEC.md (~$30)
- Governance Dashboard MVP — CR queue, approve/reject, audit log (~$30)

Sprint 2d-2 (May 15–21):
- UI Polish Pass — all 6 modules, Ant Design only (~$20)
- User Manual Draft Start — per USER_ADMIN_MANUALS_SPEC.md (~$15)
- Reg Intel: Budget Enforcement — Budget Confirmation JSON in CI (~$10)
→ Gate: the Team Lead approval May 17

### Phase 2 Total: ~$380
### Ref: GxP-Planner/REGULATORY_INTELLIGENCE_MODULE.md, gxp-system-map.html

---

## PHASE 1 SPRINT PLAN (Added 2026-03-14)
_Status: IN PROGRESS — Phase 1a started Mar 12, gate Mar 15_

### Phase 1a — Database + RLS + Auth (Mar 12–19, ~$50)
Sprint 1a-1 (Mar 12–15):
- 13-table schema — facilities, validations, risks, documents, change_requests, training_records, audit_logs + support tables (~$15)
- RLS policies — all 4 per table (SELECT, INSERT WITH CHECK, UPDATE, DELETE). Manual test in SQL Editor required before any UI (~$20)
- Auth flow + role-based routing — window.location.href on all redirects (NOT router.push) (~$10)
→ Mid-gate: the Team Lead Mar 15

Sprint 1a-2 (Mar 16–19):
- 21 CFR Part 11 audit triggers — immutable audit_log on all state-changing ops, who/what/when/before/after (~$15)
- Section 37: 3-agent handoff packet format (~$5)
- Section 38: Blocker escalation path (<5 min detect, <45 min resolution) (~$5)
→ Gate: the Team Lead Mar 19

### Phase 1b — Facility + Validation Engines (Mar 20 – Apr 2, ~$80)
Sprint 1b-1 (Mar 20–26):
- Validation Lifecycle UI — URS→FRS→DS→PQ→VSR chain, traceability matrix, protocol sign-off (~$25)
- Document Control UI — controlled docs, versioning, e-signatures, approval workflow (~$20)
- Change Control UI — requests, impact assessment, QA approval routing, closure (~$20)
→ Gate: the Team Lead Mar 22

Sprint 1b-2 (Mar 27 – Apr 2):
- Training Records UI — SOP training assignments, assessments, completion tracking (~$20)
- Audit Log Viewer — immutable, exportable, Part 11, who/what/when/before/after (~$15)
- CI Baseline + Test Suite Start — GitHub Actions, TypeScript 0-errors gate (~$10)
→ Gate: the Team Lead Mar 29

### Phase 1 Total: ~$130
### Ref: gxp-system-map.html (Phase 1a/1b tabs in Phase 2 Sprints section)
