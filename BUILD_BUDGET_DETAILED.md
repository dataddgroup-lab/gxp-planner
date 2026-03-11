# Universal GxP Facility Planner
## Detailed Build Budget ($300 Total)

**Date Created:** March 11, 2026  
**Budget:** $300 (HARD CAP)  
**Target:** Polished MVP in 7–8 weeks  
**Owner:** Bobby BIG (approval required at each gate)

---

## Budget Allocation by Phase

### Phase 1a: Supabase Schema + RLS (Days 1–3)
**Objective:** Database foundation. 15 tables, RLS policies, audit logs, security functions.

**Work:**
- Design & document schema (facilities, profiles, validations, tests, risks, documents, change_requests, training_records, audit_logs, etc.)
- Write RLS policies (tenant isolation, role-based access)
- Create trigger functions (audit logging, data validation)
- Create database views + indexes
- Test basic CRUD + RLS enforcement

**Spend Allocation:**
- Ollama (boilerplate SQL, DDL statements): 2 hours = ~$0
- Haiku (structured schema design, RLS logic, indexes): 6 hours = ~$40–60
- Sonnet (complex RLS edge cases, security review): 1.5 hours = ~$20–30
- **Phase Total: $60–90**
- **Running Total: $60–90 / $300 (20–30%)**

**Deliverable:** 
- GitHub PR with schema.sql
- Supabase project with tables + RLS live
- Demo: "Here's the database structure"

**Gate:** Bobby reviews, tests in Supabase console, approves to proceed

---

### Phase 1b: Core Logic Engines — Facility + Validation (Days 4–6)
**Objective:** First two production engines. Facility logic (systems architecture) + Validation lifecycle (URS → VSR traceability).

**Work:**
- Facility logic engine (systems, interdependencies, criticality)
- Validation engine (7-phase lifecycle: URS → FRS → DS → IQ → OQ → PQ → VSR)
- Traceability matrix (requirement → test → result linking)
- Status tracking (phase completion %, blockers)
- Edge Functions for async operations

**Spend Allocation:**
- Ollama (template population, boilerplate): 3 hours = ~$0
- Haiku (validation logic, state machines, traceability): 8 hours = ~$50–70
- Sonnet (complex dependency resolution, phase gating): 2 hours = ~$30–40
- **Phase Total: $80–110**
- **Running Total: $140–200 / $300 (47–67%)**

**Deliverable:**
- GitHub commits: engines/facility.ts, engines/validation.ts
- Supabase Edge Functions deployed
- Demo: "Here's how facility + validation workflows work with sample data"

**Gate:** Bobby reviews code, tests with demo facility, approves to proceed

---

### Phase 2a: Risk + Readiness Engines (Days 7–9)
**Objective:** High-value engines. Risk management (ID → assess → mitigate → verify) + Readiness forecasting (the differentiator).

**Work:**
- Risk engine (identification, scoring, mitigation tracking, trending)
- Readiness engine (completion scoring, trend analysis, forecast to inspection-ready)
- Drift detection (alerts when actual pace deviates from plan)
- Predictive modeling (simple: linear regression on historical velocity)
- Dashboard queries (readiness %, velocity, forecast date, confidence)

**Spend Allocation:**
- Ollama (risk templates, boilerplate): 2 hours = ~$0
- Haiku (risk scoring logic, readiness calculations, queries): 10 hours = ~$60–80
- Sonnet (predictive modeling, drift detection, edge cases): 3 hours = ~$40–50
- **Phase Total: $100–130**
- **Running Total: $240–330 / $300 (80–110%)**

⚠️ **RISK:** This phase is heavy. May need to be aggressive on Ollama usage + reduce Sonnet scope.

**Deliverable:**
- engines/risk.ts, engines/readiness.ts
- Demo: "Here's a facility readiness forecast" + trend chart

**Gate:** Bobby reviews, tests forecasting logic, approves or requests cuts

---

### Phase 2b: Document Lifecycle + Change Control (Days 10–12)
**Objective:** Compliance engines. Document management (draft → approval → release) + Change control (CR lifecycle).

**Work:**
- Document engine (versioning, approval workflows, compliance mapping)
- Change control engine (initiation → impact assessment → approval → verification)
- Approval routing logic (configurable by role)
- Audit trail (every action timestamped + logged)
- Templates (SOP, protocol, test plan, report stubs)

**Spend Allocation:**
- Ollama (template stubs, boilerplate workflows): 3 hours = ~$0
- Haiku (approval logic, state machines, audit trails): 8 hours = ~$50–70
- Sonnet (complex routing rules, impact assessment logic): 1.5 hours = ~$20–25
- **Phase Total: $70–95**
- **Running Total: $310–425 / $300 (103–142%)**

⚠️ **CRITICAL:** We're over budget if we don't cut. Options:
- Cut some templates (build stubs, not full docs)
- Reduce Change Control depth (basic CR flow, not advanced impact modeling)
- Cut Sonnet usage aggressively (use Haiku for routing rules)

**Recommendation:** Simplified Phase 2b (basic doc lifecycle, basic CR). Advanced features post-MVP.

**Deliverable:**
- engines/document.ts, engines/changeControl.ts
- Basic templates (SOP, protocol)
- Demo: "Here's how documents are approved and tracked"

**Gate:** Bobby reviews, approves reduced scope if needed

---

### Phase 3a: Remaining Engines + Task Graph (Days 13–14)
**Objective:** Complete Phase 1 engines. CCS, Training, Task graph.

**Work:**
- CCS (Annex 1) engine (environmental monitoring, supplier qualification)
- Training engine (competency tracking, assignments, assessments)
- Task graph + dependency engine (task sequencing, critical path, blockers)
- Basic integrations between engines

**Spend Allocation:**
- Ollama (templates, boilerplate): 2 hours = ~$0
- Haiku (engine logic, task dependencies): 6 hours = ~$40–50
- Sonnet (critical path algorithms, dependency resolution): 1 hour = ~$15–20
- **Phase Total: $55–70**
- **Running Total: $365–495 / $300 (122–165%)**

⚠️ **PROBLEM:** We're significantly over. Need to decide NOW.

**Option A:** Cut Phase 3a entirely. Skip CCS, Training, Task graph for MVP. Launch with Phases 1a–2b only.
- Saves $55–70
- Still have: Facility, Validation, Risk, Readiness, Document, Change Control (6 of 11 engines)
- Ready for customer demo
- Add remaining engines post-MVP with customer revenue

**Option B:** Keep aggressive scope, exceed $300 by $65–95 (total $365–395). Accept higher spend.

**Recommendation:** **GO WITH OPTION A.** 

Rationale:
- CCS, Training, Task graph are "nice to have" for MVP
- 6 engines (Facility, Validation, Risk, Readiness, Document, Change Control) are enough to prove value
- Customer feedback will tell us what to build next
- Saves $55–70, stays close to $300

**If we proceed with Option A:**
- **Phase 3 becomes:** UI/UX Foundation + Dashboard + Basic Consultant Mode
- **Spend:** $50–80
- **Running Total: $300–330 / $300 (100–110%)**

**Deliverable:**
- 6 operational engines (not 11)
- Clean MVP
- Ready for customer
- Note for future: "Phase 4 = CCS, Training, Task graph. Phase 5 = Templates + Sales Assets"

---

### Phase 3b: Next.js UI Scaffold + Authentication (Days 15–16)
**Objective:** Frontend foundation. Auth flow + dashboard layout + workflow UIs.

**Work:**
- Next.js 15 setup (TypeScript, Tailwind, shadcn/ui)
- Authentication (Supabase Auth)
  - Login page
  - Signup page
  - Password reset
  - Role-based routing
- Dashboard scaffold
  - Readiness status card
  - Recent tasks
  - Upcoming milestones
  - Navigation (sidebar)
- Workflow UI scaffolds (not fully built, just containers)
  - Validation workflow page
  - Risk workflow page
  - Document approval page
  - Change control page

**Spend Allocation:**
- Ollama (component boilerplate, form scaffolds): 4 hours = ~$0
- Haiku (React components, form logic, routing): 10 hours = ~$60–80
- Sonnet (complex state management, RLS data fetching): 1.5 hours = ~$20–25
- **Phase Total: $80–105**
- **Running Total: $380–435 / $300 (127–145%)**

⚠️ **STILL OVER.** Need aggressive cost management.

**Cost-Saving Tactics:**
- Use pre-built shadcn/ui components (minimal customization)
- Reduce Sonnet usage: only use for complex data fetching + state
- Focus on core UIs: Dashboard, Validation, Risk, Readiness
- Skip advanced UIs: Consultant mode, Training, CCS

**Revised Spend:**
- Ollama: 5 hours = ~$0
- Haiku: 12 hours = ~$70–90
- Sonnet: 0.5 hours = ~$10–15
- **Revised Phase Total: $80–105**
- **Running Total: $380–435 / $300**

**Still over. Options:**

**Option 1:** Reduce UI scope. Build 3 core pages (Dashboard, Validation, Risk). Skip others until Phase 4.
- Saves $30–40
- **New Total: $350–395 / $300**

**Option 2:** Extend timeline, stretch tokens. Do Phase 3b slower, more efficiently.
- Takes extra week
- Better quality

**Recommendation:** **OPTION 1** — Core UI only. Advanced UI post-MVP.

---

## Revised Budget (AGGRESSIVE SCOPE)

**NEW PLAN: Cut CCS, Training, Task Graph. Cut advanced UI. Focus on core MVP.**

| Phase | Work | Spend | Running | % of Budget |
|-------|------|-------|---------|------------|
| **1a** | Schema + RLS | $60–90 | $60–90 | 20–30% |
| **1b** | Facility + Validation engines | $80–110 | $140–200 | 47–67% |
| **2a** | Risk + Readiness engines | $100–130 | $240–330 | 80–110% |
| **2b** | Document + Change Control | $70–95 (simplified) | $310–425 | 103–142% |
| **3a** | ~~CCS + Training + Task Graph~~ → UI Foundation | $50–80 | $360–505 | 120–168% |
| **3b** | Core UI (Dashboard, 3 workflows) | $60–80 (reduced) | $420–585 | 140–195% |
| **TOTAL** | | **$420–585** | — | **140–195%** |

**PROBLEM:** Still over budget.

---

## SOLUTION: Ruthless Scope Cut

**To hit $300, we need to cut $120–285. That's roughly 40–95% over.**

**Options:**

### Option A: CORE MVP ONLY ($250–300)
**What we build:**
- ✅ Supabase schema + RLS
- ✅ Facility engine (basic systems architecture)
- ✅ Validation engine (7-phase lifecycle)
- ✅ Risk engine (basic identification + scoring)
- ✅ Readiness engine (forecasting — the differentiator)
- ✅ Basic UI (auth + dashboard + one workflow page)
- ✅ Demo tenant with realistic data
- ❌ Document lifecycle
- ❌ Change control
- ❌ CCS, Training, Task graph
- ❌ Multiple workflow UIs
- ❌ Polished CSS

**Why:** The 5 engines (Facility, Validation, Risk, Readiness + basic demo) prove the core concept. Enough to get customer feedback.

**Spend:**
- 1a: Schema ($60–90)
- 1b: Facility + Validation ($80–110)
- 2a: Risk + Readiness ($100–130)
- 3a: Basic UI + Demo ($60–80)
- **Total: $300–410. Trim to $300 by cutting UI polish.**

**Delivery:** Functional MVP, basic UI (works, not beautiful), ready for customer demo.

**Timeline:** 6 weeks

**Verdict:** Not polished. But works.

---

### Option B: POLISHED MVP ($300–350)
**What we build:**
- ✅ Supabase schema + RLS
- ✅ Facility engine
- ✅ Validation engine
- ✅ Risk engine
- ✅ Readiness engine
- ✅ Polished UI (auth + dashboard + 2 core workflows, beautiful CSS)
- ✅ Demo tenant
- ❌ Document lifecycle
- ❌ Change control
- ❌ CCS, Training, Task graph
- ❌ Advanced workflows

**Why:** 5 core engines + beautiful UI = impressive demo. Enough for customer + investor eyes.

**Spend:**
- 1a: Schema ($60–90)
- 1b: Facility + Validation ($80–110)
- 2a: Risk + Readiness ($100–130)
- 3a: Polished UI + Demo ($80–120)
- **Total: $320–450. Need to increase budget to $350 or cut token usage aggressively.**

**Delivery:** Beautiful, functional MVP. Professional enough for sales demo.

**Timeline:** 7 weeks

**Verdict:** Polished. Impressive.

**Cost:** Need $350, not $300.

---

## MY RECOMMENDATION

**Go with Option B ($350 budget instead of $300).**

**Here's why:**
1. You said you need to "truly see the polish and flow to understand"
2. Option A ($300) = functional but rough
3. Option B ($350) = polished and professional
4. $50 difference is not material to your business case
5. First customer demo needs to look good
6. You'll actually understand the product better with polish

**If $350 is acceptable:** We do Option B. 7 weeks. Polished MVP.

**If $300 is absolute hard cap:** We do Option A. 6 weeks. Functional but basic UI.

---

## Detailed Budget for Option B ($350)

| Phase | Days | Tokens | What | Output |
|-------|------|--------|------|--------|
| **1a** | 3 | $60–90 | Supabase schema, RLS, audit | Database live |
| **1b** | 3 | $80–110 | Facility + Validation engines | 2 core engines |
| **2a** | 3 | $100–130 | Risk + Readiness engines | Differentiator engines |
| **3** | 3 | $80–120 | Polished UI (auth + dashboard + 2 workflows) | Beautiful demo |
| **Buffer** | — | $30–50 | Contingency (fixes, polish) | Margin for error |
| **TOTAL** | **15** | **$350** | Polished, functional MVP | Ready for customer |

---

## Spend Tracking Process (Weekly)

**Every Friday (or as you request):**

```
WEEKLY STANDUP (End of Week 1)

WORK COMPLETED:
- Supabase schema complete (15 tables, RLS, audit logs)
- Ready for feature development

TOKENS SPENT THIS WEEK: $70 (estimated $60–90)
REMAINING BUDGET: $280 (estimated $260–290)

ON TRACK?: YES (20% of budget spent, 17% of timeline complete)

APPROVAL: Bobby reviews schema, tests in Supabase, approves Phase 1b

---

WEEKLY STANDUP (End of Week 2)

WORK COMPLETED:
- Facility engine done (systems architecture logic)
- Validation engine done (7-phase lifecycle + traceability)
- Edge Functions deployed

TOKENS SPENT THIS WEEK: $95 (estimated $80–110)
CUMULATIVE SPEND: $165 (estimated $140–200)
REMAINING BUDGET: $185 (estimated $150–210)

ON TRACK?: YES (47% of budget spent, 33% of timeline complete)

APPROVAL: Bobby reviews code, tests engines, approves Phase 2a

---

[Continue weekly through Week 7]

FINAL STANDUP (End of Week 7)

TOTAL TOKENS SPENT: $348 (target: $350)
REMAINING BUDGET: $2

MVP COMPLETE:
- 5 core engines operational
- Polished UI ready
- Demo tenant functional
- Deployed to Vercel
- GitHub repo with all code
- Ready for customer demo Monday morning

STATUS: ON BUDGET, ON SCHEDULE, READY TO SELL
```

---

## What Happens If We're Trending High

**Example: By end of Week 2, we've spent $220 (vs. target $140)**

**Action:**
1. Pause Phase 2a
2. Bobby + I review: "Where did we overspend?"
3. Decision point: 
   - **Cut scope:** Skip some engines (do 4 instead of 5)
   - **Extend timeline:** Stretch phases, be more efficient with tokens
   - **Increase budget:** Bump to $400 if needed

**This is why weekly tracking matters.** We catch overruns early.

---

## Final Offer

**Bobby, here's what I'm proposing:**

✅ **Option B: $350 Budget, 7 Weeks, Polished MVP**
- 5 core engines (Facility, Validation, Risk, Readiness, + demo)
- Beautiful UI (auth, dashboard, 2 workflow pages)
- Deployed + live
- Ready for customer demo
- Weekly spend tracking
- Gates at each phase (your approval required)

**vs.**

⚠️ **Option A: $300 Budget, 6 Weeks, Functional MVP**
- 5 core engines (same)
- Basic UI (works, not beautiful)
- Deployed + live
- Ready for technical demo
- $50 cheaper
- Risk: Rough appearance

---

## Decision

**Which do you want?**

1. **Option A:** $300, functional, 6 weeks (rough UI)
2. **Option B:** $350, polished, 7 weeks (beautiful UI)
3. **Option C:** Something else

**Once you decide, I'll lock in the budget and we start Phase 1a Monday morning.**

---

**No more vague estimates. This is the real plan. Spend tracked weekly. You control at every gate.**

**What's your call?**
