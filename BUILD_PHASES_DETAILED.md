# Universal GxP Facility Planner
## Detailed Build Phases (14 Weeks to MVP)

**Status:** LOCKED IN  
**Budget:** $2,300  
**Team:** 15 agents (parallel execution)  
**Timeline:** March 12 — April 23, 2026  
**Owner:** Bobby BIG  

---

## Executive Summary

**Each phase builds vertically (feature-complete) and horizontally (tested + validated).**

Every week:
- Code is written (Build Team)
- Validation docs are created (Validation Lead)
- Tests are written & executed (QA Team)
- Friday gate checkpoint (approval required before next phase)

**Critical Requirement:** Phase 3 includes **FRICTIONLESS ONBOARDING** as first-class deliverable (not afterthought).

---

## PHASE 1a: Database Foundation + RLS + Audit (Weeks 1–2)

**Owner:** Systems Architect, Validation Lead, QA Team  
**Sprint:** Mon March 12 — Fri March 19

### Deliverables

**Build Team:**
- ✅ Supabase schema (13 tables: facilities, profiles, validations, tests, risks, documents, etc.)
- ✅ Row-Level Security (RLS) policies (tenant isolation, role-based access)
- ✅ Audit triggers (21 CFR Part 11 immutable logs)
- ✅ Auth system (signup, login, password reset, email confirmation)
- ✅ Database deployment to Supabase project

**Validation Lead:**
- ✅ URS for database layer (must support multi-tenant, RLS, audit)
- ✅ FRS for database design (schema + RLS policies)
- ✅ Risk assessment for data isolation (worst-case scenarios)
- ✅ Test plan for database layer

**QA Team:**
- ✅ RLS isolation tests (User A cannot see User B's data)
- ✅ Audit log immutability tests (cannot delete/modify logs)
- ✅ Auth flow tests (signup, login, reset, confirmation)
- ✅ 34 unit tests written + passing
- ✅ Database coverage: 100%

### Acceptance Criteria

- [ ] Supabase schema deployed & live
- [ ] RLS policies enforce tenant isolation (verified by tests)
- [ ] Audit logs are immutable (verified by tests)
- [ ] Auth flow works end-to-end
- [ ] All 34 tests passing
- [ ] Code coverage: 100% for database layer
- [ ] URS + FRS + risk register complete
- [ ] Friday gate: Bobby approves, proceed to Phase 1b

### Spend Budget
- Build: $60–90
- Validation: $30–50
- QA: $40–60
- **Phase 1a Total: $130–200**
- **Running Total: $130–200 / $2,300**

---

## PHASE 1b: Core Engines + Early Validation (Weeks 3–4)

**Owner:** Process Engineer, Validation Engineer, QA Team  
**Sprint:** Mon March 20 — Fri April 2

### Deliverables

**Build Team:**
- ✅ Facility Engine (parse requirements, store facility specs, multi-site support)
- ✅ Validation Lifecycle Engine (URS → FRS → DS → IQ → OQ → PQ → VSR phase gating)
- ✅ Traceability Matrix (every requirement linked to test + result)
- ✅ Phase approval workflows (approver workflows, sign-off logic)
- ✅ Status tracking (% complete per phase)

**Validation Lead:**
- ✅ FRS for facility + validation engines
- ✅ Risk assessment (phase gating failures, data consistency)
- ✅ Test plan for validation lifecycle
- ✅ Sample facility buildout scenarios (3 different complexity levels)

**QA Team:**
- ✅ 72 validation lifecycle unit tests
- ✅ 24 integration tests (facility → validation flow)
- ✅ Traceability matrix tests (requirement → test → result)
- ✅ Phase gating tests (cannot advance without approval)
- ✅ Database consistency tests

### Acceptance Criteria

- [ ] Facility engine supports multi-site facilities
- [ ] Validation lifecycle fully operational (all 7 phases working)
- [ ] Phase gating enforced (cannot skip/advance prematurely)
- [ ] Traceability matrix functional (every requirement tracked)
- [ ] 96 tests passing (72 unit + 24 integration)
- [ ] Code coverage: 94% for validation logic
- [ ] URS + FRS + risk + test plans complete
- [ ] 3 sample facilities created + tested
- [ ] Friday gate: Bobby approves, proceed to Phase 2a

### Spend Budget
- Build: $80–110
- Validation: $40–60
- QA: $60–90
- **Phase 1b Total: $180–260**
- **Running Total: $310–460 / $2,300**

---

## PHASE 2a: Risk + Readiness Engines (Weeks 5–6)

**Owner:** Risk Specialist, Readiness Analyst, QA Team  
**Sprint:** Mon April 3 — Fri April 16

### Deliverables

**Build Team:**
- ✅ Risk Management Engine (ICH Q9: identify, assess, control, review)
- ✅ Risk scoring (Likelihood × Severity matrix)
- ✅ Mitigation tracking (assign mitigation, track status, verify closure)
- ✅ Readiness Forecasting Engine (% complete, velocity, forecast)
- ✅ Drift detection (actual vs. plan, alerts when off-track)
- ✅ Sensitivity analysis (what-if scenarios)

**Validation Lead:**
- ✅ FRS for risk + readiness engines
- ✅ Risk assessment (what could go wrong with these engines?)
- ✅ Test plan for risk scoring + readiness calculation
- ✅ Sample risk registers (3 facilities, different complexity)

**QA Team:**
- ✅ 40 risk engine unit tests
- ✅ 44 readiness engine unit tests
- ✅ 8 performance tests (readiness calc on 100K data points: <1s)
- ✅ 15 integration tests (risk → validation, readiness → all modules)
- ✅ Sensitivity analysis tests

### Acceptance Criteria

- [ ] Risk scoring algorithm working correctly
- [ ] Mitigation tracking functional
- [ ] Risk closure workflow operational
- [ ] Readiness forecast accurate (trending over time)
- [ ] Drift detection triggers correctly
- [ ] Performance: Readiness calculation <1s on 100K data points
- [ ] 107 tests passing (40 unit + 44 unit + 8 perf + 15 integration)
- [ ] Code coverage: 90%+ for risk + readiness
- [ ] Sample risk registers created + tested
- [ ] Friday gate: Bobby approves, proceed to Phase 2b

### Spend Budget
- Build: $200–250
- Validation: $50–80
- QA: $80–120
- **Phase 2a Total: $330–450**
- **Running Total: $640–910 / $2,300**

---

## PHASE 2b: Equipment Specification Database (Week 7)

**Owner:** Consultant Operations, Systems Architect, QA Team  
**Sprint:** Mon April 17 — Fri April 23

### Deliverables

**Build Team:**
- ✅ Equipment database (HPLC, UV-Vis, GC, LCMS, dissolution, HVAC, water systems, etc.)
- ✅ Equipment attributes (size, power, utilities, cleanroom class, certifications)
- ✅ Equipment filtering (show only equipment meeting requirements)
- ✅ Equipment conflict detection (can A + B both fit in this space?)
- ✅ Cost + lead time estimation (integrated with equipment specs)

**Validation Lead:**
- ✅ FRS for equipment database
- ✅ Risk assessment (equipment database accuracy, conflicts)
- ✅ Test plan for equipment filtering + conflict detection

**QA Team:**
- ✅ 56 equipment database unit tests
- ✅ 18 filtering tests (find equipment meeting constraints)
- ✅ 12 conflict detection tests

### Acceptance Criteria

- [ ] Equipment database has 200+ equipment records
- [ ] Equipment filtering returns relevant results
- [ ] Conflict detection prevents incompatible placements
- [ ] Cost/lead time estimates reasonable
- [ ] 86 tests passing
- [ ] Code coverage: 92%+
- [ ] Friday gate: Bobby approves, proceed to Phase 2c

### Spend Budget
- Build: $50–70
- Validation: $40–60
- QA: $60–90
- **Phase 2b Total: $150–220**
- **Running Total: $790–1,130 / $2,300**

---

## PHASE 2c: Lab Layout Design Tool (Weeks 8–9)

**Owner:** Systems Architect, QA Team  
**Sprint:** Mon April 24 — Fri May 7

### Deliverables

**Build Team:**
- ✅ 2D layout canvas (drag-and-drop equipment placement)
- ✅ Compliance checking (does layout meet ISO 14644? FDA spacing requirements?)
- ✅ Utility routing (can water reach equipment? electrical clearances?)
- ✅ Constraint visualization (show spacing requirements, clearances)
- ✅ Design export (PDF, DWG, CAD formats)
- ✅ Mobile responsiveness (design on tablet)

**Validation Lead:**
- ✅ FRS for layout tool
- ✅ Risk assessment (layout compliance, constraint enforcement)
- ✅ Test plan for drag-and-drop, compliance checking, export

**QA Team:**
- ✅ 56 layout unit tests (placement, spacing, compliance)
- ✅ 18 integration tests (layout → validation)
- ✅ 24 UI tests (Cypress: drag-and-drop, export workflow)
- ✅ 12 accessibility tests (keyboard nav, screen reader)

### Acceptance Criteria

- [ ] Drag-and-drop placement works smoothly
- [ ] Compliance warnings appear in real-time
- [ ] Constraint visualization clear + helpful
- [ ] Export produces valid PDF/DWG files
- [ ] Mobile UI responsive (tablet usable)
- [ ] 110 tests passing (56 unit + 18 integration + 24 UI + 12 accessibility)
- [ ] Code coverage: 88%+
- [ ] UI/accessibility audit complete
- [ ] Friday gate: Bobby approves, proceed to Phase 2d

### Spend Budget
- Build: $150–250
- Validation: $50–80
- QA: $70–110
- **Phase 2c Total: $270–440**
- **Running Total: $1,060–1,570 / $2,300**

---

## PHASE 2d: Polished UI + Frictionless Onboarding (Weeks 10–11)

**Owner:** Systems Architect, QA Team  
**Sprint:** Mon May 8 — Fri May 21

### Deliverables

**Build Team:**
- ✅ Executive dashboard (health score, day-ahead plan, greeter)
- ✅ QA dashboard (phase progress, test results, risk status)
- ✅ Operator dashboards (role-specific views)
- ✅ Consultant portal (facility overview, timeline, team)
- ✅ **FRICTIONLESS ONBOARDING** (Specific Deliverable):
  - ✅ Signup wizard (3 fields: name, email, password ONLY)
  - ✅ Email confirmation flow (one click)
  - ✅ Create first facility (pre-populated options, smart defaults)
  - ✅ Invite team members (email list, auto-send)
  - ✅ Dashboard loads immediately (zero friction)
  - ✅ T&Cs/Privacy accepted in signup (checkbox, not blocking)
  - ✅ DPA auto-generated (no negotiation needed)
  - ✅ Compliance trust badges (SOC 2, HIPAA, FedRAMP, 21 CFR Part 11)
  - ✅ Support chat available (24/7)
  - ✅ Onboarding goal: **<5 minutes from signup to productive**

**Validation Lead:**
- ✅ FRS for all UI + onboarding
- ✅ Risk assessment (onboarding friction points, data entry errors)
- ✅ Test plan for onboarding flow

**QA Team:**
- ✅ 78 UI tests (login, dashboard, workflows)
- ✅ 24 onboarding-specific tests:
  - Signup wizard (3 fields only, validation)
  - Email confirmation
  - Facility creation
  - Team invite workflow
  - Dashboard load time (<2s)
  - T&Cs acceptance
  - DPA generation
  - Trust badges display
  - Support chat available
- ✅ 12 accessibility tests (WCAG 2.1 AA)
- ✅ Mobile responsiveness tests

### Acceptance Criteria (Onboarding Critical)

**Onboarding Flow:**
- [ ] Signup: name, email, password only (3 fields, NOT MORE)
- [ ] Email confirmation: one click, immediate
- [ ] Create facility: pre-filled options, sensible defaults
- [ ] Invite team: email list, auto-send confirmation
- [ ] Dashboard: loads <2 seconds, ready to work
- [ ] T&Cs: checked during signup (not blocking)
- [ ] DPA: auto-generated, downloadable (not negotiable)
- [ ] Trust badges: visible on dashboard
- [ ] Support chat: 24/7 available
- [ ] **Metric:** 10 test users sign up, average time to first facility creation = **<5 minutes**

**General UI:**
- [ ] All dashboards render without JS errors
- [ ] Color contrast ≥ 4.5:1 (accessibility)
- [ ] Keyboard navigation works
- [ ] Mobile responsive (320px to 2560px)
- [ ] 114 tests passing (78 UI + 24 onboarding + 12 accessibility)
- [ ] Code coverage: 85%+ for UI
- [ ] Usability testing complete (10 users, all complete onboarding in <5 min)
- [ ] Friday gate: Bobby approves, proceed to Phase 3

### Spend Budget
- Build: $300–400
- Validation: $80–120
- QA: $100–150
- **Phase 2d Total: $480–670**
- **Running Total: $1,540–2,240 / $2,300**

---

## PHASE 3: Integration + Hardening + Demo Tenant (Weeks 12–13)

**Owner:** Systems Architect, QA Team  
**Sprint:** Mon May 22 — Fri June 4

### Deliverables

**Build Team:**
- ✅ Cross-module integration (all engines working together)
- ✅ Demo tenant (pre-populated with sample facility)
- ✅ Performance optimization (all queries <200ms)
- ✅ Backup/restore testing
- ✅ Security hardening (CORS, CSRF, headers)
- ✅ Error handling (graceful degradation, helpful messages)
- ✅ Monitoring + alerting setup (Sentry for errors)

**Validation Lead:**
- ✅ Final FRS updates (integration points)
- ✅ Risk register review (remaining open risks)
- ✅ Test plan updates (E2E workflows)

**QA Team:**
- ✅ 45 E2E integration tests (full facility buildout workflow)
- ✅ 45 database integrity tests
- ✅ 34 security tests (no SQL injection, XSS, CSRF, RLS)
- ✅ 12 performance tests (load under 1000 concurrent users)
- ✅ 8 backup/restore tests
- [ ] Regression test suite (screenshot comparison)

### Acceptance Criteria

- [ ] All modules integrate seamlessly
- [ ] Demo tenant loads + functions perfectly
- [ ] Performance: API <200ms, DB <100ms, readiness calc <1s
- [ ] Backup/restore tested + working
- [ ] No security vulnerabilities (penetration test passed)
- [ ] Error handling tested (graceful, helpful)
- [ ] Monitoring + alerts functional
- [ ] 144 tests passing
- [ ] Code coverage: 88%+
- [ ] Friday gate: Bobby approves, proceed to Phase 4

### Spend Budget
- Build: $40–120
- Validation: $50–100
- QA: $60–100
- **Phase 3 Total: $150–320**
- **Running Total: $1,690–2,560 / $2,300 (AT BUDGET)**

---

## PHASE 4: Final Validation + Deployment (Week 14)

**Owner:** Validation Lead, QA Team  
**Sprint:** Mon June 5 — Fri June 11

### Deliverables

**Build Team:**
- ✅ Final bug fixes (if any)
- ✅ Production deployment (Vercel, Supabase)
- ✅ Monitoring verification (errors logged, alerts working)

**Validation Lead:**
- ✅ Validation Summary Report (VSR) — all requirements met
- ✅ Compliance sign-off (URS, FRS, risk, tests all complete)
- ✅ Inspection-ready certification
- ✅ Customer documentation (getting started guide, FAQ, support contacts)

**QA Team:**
- ✅ Final regression testing (all 847 tests pass)
- ✅ Production smoke tests (system functions in production)
- ✅ Weekly validation report (final)

### Acceptance Criteria

- [ ] All 847 tests passing
- [ ] Code coverage: 88%+
- [ ] Zero critical/high security vulnerabilities
- [ ] URS fully traced to tests
- [ ] FRS fully implemented
- [ ] Risk register: all risks mitigated or accepted
- [ ] VSR complete + signed
- [ ] Production deployment successful
- [ ] Demo tenant accessible to customers
- [ ] Support system operational
- [ ] **READY FOR FIRST CUSTOMER**

### Spend Budget
- Build: $20–80
- Validation: $50–100
- QA: $60–100
- **Phase 4 Total: $130–280**
- **Running Total: $1,820–2,840 / $2,300**

⚠️ **NOTE:** If Phase 3 spending is at high end, Phase 4 must stay under $200 to avoid overages.

---

## Weekly Gate Checkpoint Format

**Every Friday, 5 PM MDT, Bobby gets:**

```
WEEK X GATE CHECKPOINT
Universal GxP Facility Planner
[Date]

PHASE: [Current Phase]
EXPECTED COMPLETION: [Date]

BUILD STATUS:
✅ Feature X complete
✅ Feature Y in progress (80%)
⚠️  Feature Z blocked (reason: [description])

VALIDATION STATUS:
✅ URS complete for Phase X
✅ FRS 80% complete
⚠️  Risk assessment in progress

QA STATUS:
✅ X tests written, Y tests passing
✅ Code coverage: X%
⚠️  Performance test Z failing (investigating)

SPEND REPORT:
Budget: $2,300 total
Spent to date: $X
Remaining: $Y (X% of budget)
Burn rate: Sustainable / At risk / CRITICAL

BLOCKERS:
[List any blockers preventing progress]

APPROVAL:
[ ] Proceed to next phase
[ ] Request changes (list below)
[ ] Hold (discuss Monday)

Bobby's decision: [Proceed / Changes / Hold]

Next milestone: [Date], [Deliverable]
```

---

## Success Metrics (Week 14 Targets)

| Metric | Target | Actual |
|--------|--------|--------|
| Code Coverage | 88%+ | — |
| Test Pass Rate | 100% (847/847) | — |
| Security Vulnerabilities | 0 critical, 0 high | — |
| Performance: API | <200ms | — |
| Performance: DB | <100ms | — |
| Performance: Readiness | <1s | — |
| URS Traceability | 100% | — |
| FRS Implementation | 100% | — |
| Risk Mitigation | 100% | — |
| Onboarding Time | <5 min per user | — |
| First Customer Demo | [Date] | — |

---

## Budget Tracking (Running Total)

| Phase | Allocated | Spent | Remaining |
|-------|-----------|-------|-----------|
| 1a | $130–200 | — | $2,100–2,170 |
| 1b | $180–260 | — | $1,920–2,070 |
| 2a | $330–450 | — | $1,590–1,960 |
| 2b | $150–220 | — | $1,440–1,810 |
| 2c | $270–440 | — | $1,170–1,540 |
| 2d | $480–670 | — | $500–1,170 |
| 3 | $150–320 | — | $180–1,020 |
| 4 | $130–280 | — | $0–890 |
| **TOTAL** | **$2,300** | **—** | **LOCK TO $0** |

**RULE:** If any phase exceeds budget, cut scope in next phase or reduce Phase 4 timeline. Do NOT exceed $2,300 total.

---

## Key Decisions (Locked In)

✅ **Phase 3 includes FRICTIONLESS ONBOARDING as first-class deliverable**
- Signup: 3 fields only (name, email, password)
- Onboarding: <5 minutes to productive
- T&Cs/Privacy: Auto-accepted in signup (not blocking)
- DPA: Auto-generated (no negotiation)
- Trust badges: Visible on dashboard

✅ **Parallel execution:** Build + Validation + QA all happening simultaneously (not sequential)

✅ **Friday gates:** Bobby must approve before next phase proceeds (mandatory)

✅ **Weekly validation reports:** Every Friday, full testing + compliance status

✅ **Budget hard cap:** $2,300, no exceptions

---

## Ready to Execute

**All phases defined. All deliverables specified. All acceptance criteria locked.**

**Monday, March 12, 9 AM MDT: Build launches.**

**April 23: MVP delivery.**

**May 15: First customer revenue.**

Let's build something groundbreaking.
