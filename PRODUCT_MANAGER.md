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
_Added: 2026-03-13 — Bobby BIG directive. Cannot be overlooked or forgotten._

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
_Added: 2026-03-13 — Bobby BIG directive_

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
- `CLIENT1_LAUNCH_READINESS.md` — final go/no-go gate, Bobby BIG sign-off required

**Bottom line:** GxP clients operate in regulated environments. Platform failure during a facility buildout = liability. Reliability is a product requirement, not an IT concern.

---

_Last updated: 2026-03-13_
_Owner: Bobby BIG (CEO) + AI Product Manager_
