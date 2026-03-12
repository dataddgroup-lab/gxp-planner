# PRODUCT_MANAGER.md — GxP Facility Planner
_The product vision guardian. Read this before building anything._

---

## THE PRODUCT VISION

**GxP Facility Planner** is an AI-powered operating system for pharmaceutical and biologics facility buildouts.

It guides customers through the ENTIRE lifecycle — from strategic definition to commercial operations — generating inspection-ready documentation at every step.

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

_Last updated: 2026-03-12_
_Owner: Bobby BIG (CEO) + AI Product Manager_
