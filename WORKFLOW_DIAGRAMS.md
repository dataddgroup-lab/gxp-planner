# Universal GxP Facility Planner
## Workflow Diagrams & Flow Charts

---

## 1. VALIDATION LIFECYCLE FLOW

### Overview
The validation lifecycle is the backbone of facility compliance. It follows FDA/EMA standards: URS → FRS → DS → IQ → OQ → PQ → VSR.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      VALIDATION LIFECYCLE                                │
└─────────────────────────────────────────────────────────────────────────┘

   ┌────────────┐
   │   START    │ Facility buildout initiated
   └──────┬─────┘
          │
          ▼
   ┌──────────────────────┐
   │ 1. USER REQUIREMENTS │ QA defines what the facility must do
   │    SPECIFICATION     │ - Scope, capacity, systems
   │    (URS)             │ - Regulatory requirements
   └──────┬───────────────┘ - Acceptance criteria
          │                  Assistant: "Are all 21 CFR 211 requirements covered?"
          │                  Status: Draft → Review → QA Approval → Release
          ▼
   ┌──────────────────────┐
   │ 2. FUNCTIONAL REQS   │ Design team responds to URS
   │    SPECIFICATION     │ - How will we meet each URS requirement?
   │    (FRS)             │ - System architecture
   └──────┬───────────────┘ - Design decisions & trade-offs
          │                  Assistant: "All URS requirements traced?"
          │                  Status: Draft → Design Review → QA Approval
          ▼
   ┌──────────────────────┐
   │ 3. DESIGN SPEC       │ Detailed design of all systems
   │    (DS)              │ - Equipment selections & parameters
   │                      │ - Utility requirements
   └──────┬───────────────┘ - Installation specs
          │                  Assistant: "PQ will test this—is it testable?"
          │                  Status: Draft → Engineering Review → QA Sign-off
          ▼
   ┌──────────────────────┐
   │ 4. INSTALLATION      │ Facility is built to specification
   │    QUALIFICATION     │ - Equipment installed
   │    (IQ)              │ - Utilities commissioned
   └──────┬───────────────┘ - Documentation collected
          │                  Assistant: "All equipment certificates received?"
          │                  Status: In Progress → Documentation → QA Review → Approval
          ▼
   ┌──────────────────────┐
   │ 5. OPERATIONAL       │ Individual systems tested
   │    QUALIFICATION     │ - HVAC performance
   │    (OQ)              │ - Environmental monitoring
   └──────┬───────────────┘ - Utility parameters
          │                  Assistant: "All systems passing acceptance criteria?"
          │                  Status: Test Execution → Data Analysis → QA Approval
          ▼
   ┌──────────────────────┐
   │ 6. PERFORMANCE       │ Facility tested as integrated whole
   │    QUALIFICATION     │ - Full process runs (media fills, monitoring)
   │    (PQ)              │ - Data integrity verification
   └──────┬───────────────┘ - Regulatory readiness
          │                  Assistant: "All data ALCOA+? Ready for inspection?"
          │                  Status: Test Runs → Data Audit → Final QA Approval
          ▼
   ┌──────────────────────┐
   │ 7. VALIDATION SUMMARY│ Comprehensive document binds all evidence
   │    REPORT (VSR)      │ - Traceability matrix (URS → tests → results)
   │                      │ - Deviations & resolutions
   └──────┬───────────────┘ - Regulatory alignment statement
          │                  Assistant: "Inspection ready? Any gaps?"
          │                  Status: Draft → QA Review → Management Approval
          ▼
   ┌──────────────────────┐
   │      RELEASE         │ Facility approved for commercial use
   │   (FDA/EMA Ready)    │ - VSR signed off
   │                      │ - Release document issued
   └──────────────────────┘ - Monitoring begins

```

### Key Features in System

- **Traceability Matrix:** Each URS requirement automatically linked to FRS, test plans, results, and VSR
- **Dependency Tracking:** URS can't be released until all FRS items map to it
- **Sign-Off Workflows:** Each phase requires appropriate role approval (QA, Engineering, Management)
- **Document Versioning:** Every revision tracked; who changed what, when
- **Readiness Dashboard:** Progress % by phase; forecasted completion date
- **Gap Detection:** Assistant flags unmapped requirements or missing approvals

**Timeline:** 12–18 months (large facility), 6–9 months (mid-market), 3–6 months (startup biotech)

---

## 2. DOCUMENT LIFECYCLE FLOW

### Overview
Every document in GxP has a lifecycle: creation, review, approval, release, usage, updates, archive.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        DOCUMENT LIFECYCLE                                 │
└──────────────────────────────────────────────────────────────────────────┘

   ┌──────────────┐
   │ INITIATION   │ Author creates document in system
   │              │ - Title, scope, regulatory mapping
   └────────┬─────┘ - Initial version (0.1 Draft)
            │        Template auto-fills standard sections
            │        Assistant: "Does this meet 21 CFR 11 requirements?"
            │
            ▼
   ┌──────────────────────┐
   │ DRAFT REVIEW         │ Author's peers/manager review
   │ (Internal QC)        │ - Completeness check
   └────────┬─────────────┘ - Technical accuracy
            │                Assistant: "Are all regulatory mapping complete?"
            │                Reviewer: Add comments → Author revises
            ▼
   ┌──────────────────────┐
   │ QA REVIEW            │ QA/Compliance ensures regulatory alignment
   │ (Regulatory Gate)    │ - Compliance vs. FDA/EMA standards
   └────────┬─────────────┘ - Format (headers, signatures, retention)
            │                Assistant: "Missing Annex 1 reference?"
            │                QA: Approve or request revision
            ▼
   ┌──────────────────────┐
   │ MANAGEMENT APPROVAL  │ Senior sign-off (Director/VP level)
   └────────┬─────────────┘ - Version incremented (0.1 → 1.0)
            │                Signature block auto-populated with date/name
            │
            ▼
   ┌──────────────────────┐
   │ RELEASE              │ Document goes live; distribution tracked
   │ (Published)          │ - Notify all readers
   └────────┬─────────────┘ - Archive previous version
            │                Assistant: "Who needs to read this & acknowledge?"
            │
            ▼
   ┌──────────────────────┐
   │ IN USE               │ Document is operational/binding
   │ (Effective)          │ - Compliance teams reference it
   └────────┬─────────────┘ - Change requests tracked
            │
            │         ┌─────────────────────────────────┐
            │         │ CHANGE REQUEST                  │
            │         │ - Found error? New regulation?  │
            │         │ - Create CR, route for approval │
            │         └──────────┬──────────────────────┘
            │                    │
            │                    ▼
            │         ┌──────────────────────┐
            │         │ IMPACT ASSESSMENT    │
            │         │ - Who's affected?    │
            │         │ - Need revalidation? │
            │         └──────────┬───────────┘
            │                    │
            │                    ▼
            │         ┌──────────────────────┐
            │         │ APPROVAL & REVISION  │
            │         │ - Go through review  │
            │         │ - New version issued │
            │         └──────────┬───────────┘
            │                    │
            └────────────────────┘
                      │
                      ▼
   ┌──────────────────────┐
   │ SUPERSEDED           │ Old version no longer valid
   │ (Archived)           │ - Audit trail preserved
   └──────────────────────┘ - Historical reference only

```

### Key Features in System

- **Template Library:** Pre-built SOP, protocol, test plan, report templates (compliant with 21 CFR 11)
- **Metadata Tracking:** Created by, modified by, approved by, date, regulation/requirement mapped to
- **Revision Control:** Full version history; compare versions side-by-side
- **Distribution Tracking:** Who received document? Who acknowledged? When?
- **Retention Scheduling:** System reminds when document needs renewal/audit
- **Regulatory Mapping:** Each document linked to regulation it satisfies (FDA 211.192, EMA 7.2, etc.)

**Average time in lifecycle:** 2–4 weeks from draft to release

---

## 3. RISK MANAGEMENT LIFECYCLE

### Overview
Risk is identified, assessed, mitigated, and verified throughout the validation process.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     RISK MANAGEMENT LIFECYCLE                             │
└──────────────────────────────────────────────────────────────────────────┘

   ┌─────────────────────┐
   │ IDENTIFICATION      │ Risks are identified during planning
   │ (Hazard Analysis)   │ - Facility design review
   └──────────┬──────────┘ - FMEA workshops
              │            - Regulatory alignment review
              │            Assistant: "HVAC failure = contamination risk?"
              │            Assistant: "ISO 14644 Class A = cleanroom risk?"
              │
              ▼
   ┌─────────────────────────────────────────────┐
   │ ASSESSMENT & SCORING                        │
   │ (Risk = Likelihood × Severity)              │
   │                                             │
   │ High:   Likelihood H + Severity H = Mitigate
   │ Medium: Likelihood M + Severity M = Control
   │ Low:    Likelihood L + Severity L = Monitor
   └──────────┬──────────────────────────────────┘
              │ Assistant: "This risk threatens schedule. Mitigate now."
              │
              ▼
   ┌─────────────────────┐
   │ MITIGATION PLANNING │ Design or procedural controls reduce risk
   │ (Action Plan)       │ - Equipment redundancy (backup HVAC)
   └──────────┬──────────┘ - Monitoring (daily calibration checks)
              │            - Documentation (training on procedures)
              │            Owner assigned, deadline set, budget allocated
              ▼
   ┌─────────────────────┐
   │ IMPLEMENTATION      │ Control is put in place
   │ (Execution)         │ - Equipment procured & installed
   └──────────┬──────────┘ - Procedures written & trained
              │            - Monitoring systems activated
              ▼
   ┌─────────────────────┐
   │ VERIFICATION        │ Evidence that mitigation is effective
   │ (Closure)           │ - Equipment certified
   └──────────┬──────────┘ - Training records show competency
              │            - Monitoring data shows stable performance
              │            Assistant: "Risk mitigation verified. Close risk."
              ▼
   ┌─────────────────────┐
   │ TRENDING            │ Ongoing monitoring; escalate if risk re-emerges
   │ (Surveillance)      │ - Monthly review of residual risk
   └──────────────────────┘ - Alert if trend worsens

```

### Key Features in System

- **Risk Register:** Centralized list of all identified risks for facility
- **Scoring Matrix:** Likelihood (1–5) × Severity (1–5) = Risk level (1–25)
- **Auto-Recommendations:** System suggests mitigation based on industry standards
- **Traceability:** Risk → Control → Test → Closure evidence
- **Critical Path:** High-risk items surface on dashboards; cascade to QA/Exec
- **Trending Analytics:** Is residual risk trending up or down over time?

**Average risk count per facility:** 30–80 (depends on complexity)  
**Time to close risk:** 2–8 weeks (depends on mitigation complexity)

---

## 4. CHANGE CONTROL WORKFLOW

### Overview
Changes are inevitable. Change Control ensures they're managed, documented, and don't derail compliance.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         CHANGE CONTROL LIFECYCLE                          │
└──────────────────────────────────────────────────────────────────────────┘

   ┌────────────────────────┐
   │ INITIATION             │ Requester identifies need for change
   └────────┬───────────────┘ - "We need to change HVAC setpoint"
            │                - Reason: Regulatory update / Safety issue / Design optimization
            │                Assistant: "Will this change affect validation?"
            │
            ▼
   ┌────────────────────────────────────────┐
   │ CHANGE REQUEST (CR) CREATION           │
   │ - Description of change                │
   │ - Justification & business driver      │
   │ - Proposed implementation date         │
   │ - Estimated impact on schedule/budget  │
   └────────┬───────────────────────────────┘
            │ CR assigned unique ID (CR-001, CR-002, etc.)
            │ Status: New → Routing approval chain
            │
            ▼
   ┌────────────────────────────────────────┐
   │ IMPACT ASSESSMENT                      │
   │ - Regulatory impact? (Need new test?)  │
   │ - Validation impact? (Revalidate?)     │
   │ - Training impact? (Update procedures?)│
   │ - Document impact? (SOP revisions?)    │
   │ - Timeline impact? (Delay release?)    │
   └────────┬───────────────────────────────┘
            │ Assistant: "This may require PQ rerun. Add 6 weeks."
            │ Impact scored: High/Medium/Low
            │
            ▼
   ┌────────────────────────────────────────┐
   │ APPROVAL ROUTING                       │
   │ Low Impact:    QA Approval → Close     │
   │ Medium Impact: Engineering + QA → Ops │
   │ High Impact:   All + Management → CCB │
   │ CCB = Change Control Board             │
   └────────┬───────────────────────────────┘
            │ Each approver sees impact summary + risk assessment
            │ Can request more info → back to requester
            │
            ▼
   ┌────────────────────────────────────────┐
   │ DECISION                               │
   │ ✓ Approved → Implementation            │
   │ ✗ Rejected → Archive CR (with reason)  │
   │ ? On Hold → Waiting for more info      │
   └────────┬───────────────────────────────┘
            │
            ▼
   ┌────────────────────────────────────────┐
   │ IMPLEMENTATION                         │
   │ - Change executed per plan             │
   │ - Work orders issued                   │
   │ - Equipment updated                    │
   │ - Procedures updated & trained         │
   │ - Documentation collected              │
   └────────┬───────────────────────────────┘
            │ Status: In Progress → Awaiting Verification
            │
            ▼
   ┌────────────────────────────────────────┐
   │ VERIFICATION & TESTING                 │
   │ - New equipment certified?             │
   │ - Impact tests completed?              │
   │ - New procedures working?              │
   │ - Training completed?                  │
   │ - Data reviewed & approved?            │
   └────────┬───────────────────────────────┘
            │ Assistant: "All verification evidence in? Ready to close?"
            │
            ▼
   ┌────────────────────────────────────────┐
   │ CLOSURE                                │
   │ - CR marked "Verified & Closed"        │
   │ - All evidence archived                │
   │ - Historical reference for inspection  │
   └────────────────────────────────────────┘

```

### Key Features in System

- **Template:** Standard CR form with all required fields
- **Routing Rules:** Auto-routes based on impact level + department
- **Risk Assessment:** Linked to Risk Register; shows downstream impact
- **Attachment Storage:** All evidence (test reports, certifications, procedures) stored with CR
- **Audit Trail:** Every action (create, approve, reject, implement) timestamped & logged
- **Trending:** Dashboard shows open vs. closed CRs; average time-to-close

**Average CR timeline:** 1–4 weeks (depends on impact)  
**Average CRs per facility buildout:** 40–80

---

## 5. READINESS ENGINE & FORECASTING

### Overview
The Readiness Engine continuously assesses facility completion and forecasts when it will be ready for release.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     READINESS SCORING & FORECASTING                       │
└──────────────────────────────────────────────────────────────────────────┘

INPUTS TO READINESS ENGINE:
├─ Validation Progress (%)
│  ├─ URS: 100% Complete
│  ├─ FRS: 85% Complete
│  ├─ DS: 75% Complete
│  ├─ IQ: 60% Complete
│  ├─ OQ: 40% Complete
│  ├─ PQ: 0% Not Started
│  └─ VSR: 0% Not Started
│
├─ Document Status
│  ├─ SOPs: 18 of 25 Released
│  ├─ Protocols: 12 of 15 Approved
│  ├─ Reports: 8 of 20 Drafted
│  └─ Regulatory Submissions: Pending
│
├─ Risk Management
│  ├─ Open Risks: 3 (1 High, 2 Medium)
│  ├─ Mitigations Due: All on track
│  └─ Residual Risk: Acceptable
│
├─ Change Control
│  ├─ Open CRs: 2 (both approved)
│  ├─ Blocked CRs: 0
│  └─ Implementation: On schedule
│
├─ Training & Competency
│  ├─ Required Training: 100% Assigned
│  ├─ Completed: 75% (18 of 24 people)
│  └─ Reassessments Pending: 6
│
└─ Team & Resource Status
   ├─ Full-time staff: 5 assigned
   ├─ Part-time consultants: 2 assigned
   ├─ Vacancies: 0
   └─ Utilization: 85% (healthy)

                           │
                           ▼

┌──────────────────────────────────────────────────────────────────┐
│ READINESS SCORE CALCULATION                                      │
│                                                                  │
│ Readiness % = Weighted Average of:                              │
│  ├─ Validation Progress: 35% weight (hardest to change)         │
│  ├─ Document Completion: 25% weight                             │
│  ├─ Risk Mitigation: 20% weight (security/compliance)           │
│  ├─ Training Completion: 15% weight                             │
│  └─ Resource Utilization: 5% weight                             │
│                                                                  │
│ TODAY'S READINESS SCORE:  56% (Moderate Progress)              │
│                                                                  │
│ Interpretation:                                                  │
│  ├─ 0–25%:   Just Started (High risk of missing schedule)       │
│  ├─ 25–50%:  Early Stage (On track for nominal timeline)        │
│  ├─ 50–75%:  Mid-Stage (Closing in on PQ)                      │
│  ├─ 75–90%:  Final Stage (Inspection readiness close)           │
│  └─ 90–100%: Inspection Ready (Go/No-Go decision)               │
└──────────────────────────────────────────────────────────────────┘

                           │
                           ▼

┌──────────────────────────────────────────────────────────────────┐
│ TREND ANALYSIS & FORECASTING                                     │
│                                                                  │
│ Historical Trend (last 12 weeks):                                │
│  Week 1:  25%  ✓ Expected                                        │
│  Week 4:  32%  ✓ On track (+7%)                                  │
│  Week 8:  48%  ✓ On track (+16%)                                 │
│  Week 12: 56%  ✓ On track (+8%)                                  │
│                                                                  │
│ Weekly Velocity: +4.7% / week                                    │
│ To reach 90% (inspection ready): 7.2 weeks                       │
│                                                                  │
│ FORECAST: Ready for inspection by [DATE + 7 weeks]              │
│ CONFIDENCE: 78% (based on historical trend)                      │
│                                                                  │
│ IF TRENDS HOLD: ✓ Will meet target release date                 │
│ IF TRENDS SLIP:  ⚠ Will miss by 2–4 weeks                       │
│ CRITICAL ACTION: Accelerate PQ start date by 2 weeks            │
└──────────────────────────────────────────────────────────────────┘

                           │
                           ▼

┌──────────────────────────────────────────────────────────────────┐
│ DRIFT DETECTION & ALERTS                                         │
│                                                                  │
│ WATCH: PQ Phase                                                  │
│  └─ Expected start: 2 weeks → Current plan: 4 weeks             │
│  └─ Risk: OQ completion blocked by equipment delivery           │
│  └─ Recommendation: Expedite equipment procurement              │
│                                                                  │
│ ALERT: Training Competency                                       │
│  └─ 6 of 24 reassessments overdue (25% failure rate)            │
│  └─ Risk: Can't release without 100% competency                 │
│  └─ Recommendation: Prioritize failed reassessments             │
│                                                                  │
│ WATCH: Document Reviews                                          │
│  └─ 7 of 20 reports still in draft (35%)                        │
│  └─ Need QA review before VSR writing                           │
│  └─ Recommendation: Allocate 1 FTE to QA review for 3 weeks     │
│                                                                  │
│ Actions to Stay on Track:                                        │
│  ✓ Accelerate equipment delivery by 1 week                      │
│  ✓ Add temporary QA resource (2 weeks)                          │
│  ✓ Complete training reassessments (next 5 days)                │
│  ✓ Start PQ test runs (move up by 10 days)                      │
└──────────────────────────────────────────────────────────────────┘

                           │
                           ▼

EXECUTIVE SUMMARY (for leadership):
┌──────────────────────────────────────────────────────────────────┐
│ Facility Readiness: 56%                                           │
│ Status: On Track (Moderate Confidence)                            │
│ Inspection Date Target: [DATE + 7 weeks]                          │
│ Budget Variance: -2% (under budget)                               │
│ Schedule Variance: +0% (on schedule)                              │
│ Critical Blockers: Equipment delivery (1 week delay risk)         │
│ Next Milestone: PQ Phase Start (2 weeks)                          │
│                                                                  │
│ Recommendation: Approve equipment expedite. Will add $5K cost    │
│ but save 1 week on timeline + reduce schedule risk.             │
│                                                                  │
│ Approval needed by: [DATE]                                       │
└──────────────────────────────────────────────────────────────────┘

```

### Key Features in System

- **Real-Time Dashboard:** Readiness % updated daily as team logs progress
- **Predictive Forecasting:** Mathematically projects when 90% readiness will be reached
- **Trend Visualization:** Charts show velocity (progress per week) and confidence
- **Drift Alerts:** Automatic notifications when actual progress diverges from plan
- **Root Cause Analysis:** When drift detected, system suggests which workstream is blocking progress
- **What-If Scenarios:** "If we add 2 people to OQ, when will PQ start?"
- **Executive Summary:** One-page readiness report for leadership (go/no-go decision)

**Update frequency:** Daily (automated from task completion logs)  
**Typical inspection-ready timeline:** 12–24 months (large), 6–12 months (mid-market), 3–6 months (startup)

---

## 6. CONSULTANT MODE WORKFLOW

### Overview
Consultants operate with defined scope, deliverables, and client visibility—but no control bleed.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      CONSULTANT MODE WORKFLOW                             │
└──────────────────────────────────────────────────────────────────────────┘

CONSULTANT ONBOARDING:
┌─────────────────────────────────────────────────┐
│ Step 1: Engagement Initiation                   │
│ - Customer requests consulting engagement      │
│ - Consultant (or firm) sets scope:             │
│   * Which facility? Which workstreams?         │
│   * What's included? What's excluded?          │
│   * Timeline? Budget?                          │
│ - System creates "Engagement" record           │
│   * Consultant assigned to facility + workstreams only
│   * Access token issued (time-limited)         │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Step 2: Access & Scoping                        │
│ - Consultant logs in → sees ONLY assigned:      │
│   * This facility (not customer's other sites) │
│   * This workstream (e.g., "Validation" only)  │
│   * Documents he/she created                    │
│   * Assigned tasks                              │
│ - Customer admin logs in → sees everything      │
│ - Separation enforced by RLS (row-level sec)   │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Step 3: Deliverable Definition                  │
│ - Consultant & customer define deliverables:   │
│   * URS document (draft by consultant)         │
│   * Validation protocol templates              │
│   * Risk register (populated by consultant)    │
│   * Training plan                               │
│   * Final readiness assessment                 │
│ - Each deliverable has:                        │
│   * Owner (consultant or customer)             │
│   * Due date                                    │
│   * Approval chain (QA, Management)            │
│   * Handoff workflow                           │
└────────┬────────────────────────────────────────┘
         │
         ▼

ONGOING CONSULTANT OPERATIONS:

   CONSULTANT WORK                          CUSTOMER VIEW
┌──────────────────────┐                 ┌──────────────────┐
│ Creates URS draft    │   ═════════════> │ Reviews URS      │
│ (visible to him only │                 │ Approves/rejects │
│  until submitted)    │                 │ Requests changes │
└──────────────────────┘                 └──────────────────┘
         │                                       │
         │                                       │
         ├─────────────── SUBMIT for review ────┤
         │                                       │
         └─ STATUS: "Awaiting Customer Review"  │
                                                │
┌──────────────────────────────────────┐       │
│ CONSULTANT DASHBOARD                 │       │
│ - My Facilities: 1                   │       │
│ - My Workstreams: Validation + Risk  │       │
│ - Active Deliverables: 5             │       │
│ - Due This Week: 2                   │       │
│ - Pending Approval: 1 (URS)          │       │
│ - Billable Hours This Month: 40      │       │
│ - Revenue Generated: $5,600 (40 × $140/hr)  │
└──────────────────────────────────────┘       │
         │                                      │
         ▼                                      │
    ┌─────────────────────────────────────────────┐
    │ CONSULTANT TIMESHEET & BILLING              │
    │ - Log hours per deliverable per day        │
    │ - System tracks billable vs. non-billable  │
    │ - Automatically generates invoice          │
    │ - Customer sees:                           │
    │   * Hours worked per deliverable           │
    │   * Results delivered per deliverable      │
    │   * Cost per deliverable (transparency)    │
    │   * ROI calculation                        │
    └─────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ APPROVAL & HANDOFF                           │
│ - Customer QA approves deliverable           │
│ - Deliverable moves from draft → approved    │
│ - Consultant can't edit (read-only from here)│
│ - Customer takes ownership                    │
│ - System records: "Handoff completed [date]" │
│ - Billing can be tied to deliverable or date │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ FUTURE CHANGES TO CONSULTANT WORK            │
│ - If customer changes approved deliverable   │
│ - System notifies consultant (FYI)           │
│ - But consultant CAN'T edit (already approved)
│ - If consultant needs to revise:             │
│   * Creates NEW version (0.2, 0.3, etc.)    │
│   * Goes through approval chain again        │
│   * Previous version archived (audit trail)  │
└──────────────────────────────────────────────┘

```

### Key Features in System

- **Scope Definition:** Consultant sees ONLY the facility/workstream assigned (RLS enforced)
- **Deliverable Tracking:** Clear list of what's due, by when, and by whom
- **Approval Workflow:** Consultant submits → Customer reviews → Approves or requests revision
- **Billing Integration:** Hours logged per deliverable; automatic invoice generation
- **Transparency:** Customer sees hours, results, cost per deliverable
- **Change Control:** If deliverable is revised post-approval, change goes through CR workflow
- **Audit Trail:** Every action (create, submit, approve, revise) timestamped and logged
- **No Control Bleed:** Consultant can't see other consultants' work; can't modify approved deliverables

**Typical engagement:** 3–6 months, 200–400 billable hours, $28K–$56K consulting revenue (+ SaaS fees)

---

## 7. HYPER-ASSISTANT INTERACTION FLOW

### Overview
The AI Assistant is always active, anticipatory, and operationally focused.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      HYPER-ASSISTANT INTERACTION FLOW                     │
└──────────────────────────────────────────────────────────────────────────┘

USER: "We're starting PQ next week."
│
▼
ASSISTANT INTERPRETS:
├─ Current facility phase: IQ/OQ nearly complete
├─ Next step: PQ (Performance Qualification)
├─ Regulatory requirement: FDA 21 CFR 211.192 (validation records)
├─ System checks:
│  ├─ Are all OQ results finalized? YES
│  ├─ Is PQ protocol approved? NO (still in QA review)
│  ├─ Is team trained on PQ? NO (4 of 6 people pending)
│  ├─ Is equipment ready for runs? YES
│  └─ Are all risks mitigated? MOSTLY (1 equipment risk in progress)
│
▼
ASSISTANT RESPONDS (Calm, Precise, Operational):

"PQ start is feasible. Three items to resolve first:

1. BLOCKER: PQ protocol awaiting QA approval (due [DATE]). 
   → Recommend: Confirm with QA lead today.

2. RISK: Team training incomplete (4 of 6 not trained). 
   → Recommend: Schedule training for [DATES]. Without it, 
   PQ data won't be defensible at inspection.

3. WATCH: Equipment minor risk (coolant line certification) 
   in progress. Status: On track, due [DATE]. No impact if done by then.

If you resolve items 1 & 2 by [DATE], PQ can start as planned.

Next: Confirm protocol approval. I'll track it."

│
├─ (No fluff. No "Great question!" No speculation.)
├─ (Anticipatory: flagged the training gap before they asked)
└─ (Operational: gave next step)

───────────────────────────────────────────────────────────

USER: (3 days pass, no action)
│
▼
ASSISTANT (Proactive Alert via daily briefing):

"ACTION NEEDED: PQ start in 4 days.

BLOCKER STILL OPEN: PQ protocol approval (QA review + 3 days).
→ If approval doesn't arrive by tomorrow, PQ start shifts to [DATE].
→ Action: Escalate to QA director NOW.

WATCH: Team training not scheduled. 4 people still pending.
→ Need 6 trained before first PQ run. 
→ If training not complete by [DATE], will force 1-week delay.
→ Action: Contact training coordinator today.

Recommendation: Resolve both by [TIME] today to stay on track.
Need approval from: [NAME], [NAME], [NAME]"

│
├─ (Unprompted. Anticipatory. Blocker-first.)
└─ (No negotiation. Facts + required action.)

───────────────────────────────────────────────────────────

USER: "Can we skip the training if people have prior experience?"
│
▼
ASSISTANT RESPONSE (Firm, Regulatory-Aware):

"No.

Regulation: FDA 21 CFR 211.25(b) requires training on procedures 
relevant to assigned operations. Prior experience doesn't satisfy 
this requirement. 

Data Integrity Rule (ALCOA+): You must demonstrate that all PQ 
personnel were trained on the specific procedures + data handling 
requirements for THIS facility. Without training records, FDA will 
flag data as non-ALCOA+ at inspection.

Consequence: Either complete training before PQ, or accept that 
PQ data will be challenged. There is no third option.

Recommendation: Schedule training. 1 day. 6 people. Cost: ~$2K. 
Worth it to avoid re-running all PQ if inspection fails.

When can training be scheduled?"

│
├─ (No ambiguity. No "maybe." No creative solutions.)
├─ (Cites regulation directly.)
└─ (Explains consequence. Gives path forward.)

───────────────────────────────────────────────────────────

VOICE INTERACTION:

USER: (Speaking to device) "Alexa, ask RanchOS what's blocking PQ?"
│
▼
ASSISTANT: (Voice, same operational tone)

"Three items need resolution. Highest priority: PQ protocol 
approval from QA. Due tomorrow. Second: Team training—4 of 6 
people not scheduled. Must be done before first run. Third: 
Equipment certification—on track, no action needed now.

Would you like me to escalate the protocol approval, or schedule 
the training?"

│
└─ (Answers the question. Offers next step.)

───────────────────────────────────────────────────────────

ROLE-AWARE RESPONSES:

IF EXECUTIVE is asking:
"PQ timeline is on track. One approval blocker (protocol QA). 
One resource gap (training). Both resolvable by [DATE]. Cost 
impact: $2K training, no schedule impact if resolved by EOD 
[DATE]. Recommend proceed."
├─ High-level. Impact-focused. Decision-ready.

IF QA DIRECTOR is asking:
"PQ protocol review: 6 items still pending from engineering. 
Approval release—risk acceptable if training completed first. 
Recommend conditional approval: Protocol approved subject to 
training completion by [DATE]."
├─ Compliance-focused. Risk-aware. Gatekeeping tone.

IF OPERATOR is asking:
"PQ starts [DATE]. Here's the sequence: Setup (Friday), Test Run 1 
(Monday), Test Run 2 (Tuesday), Data Review (Wednesday–Thursday). 
Training is mandatory—[TIME] on [DATE]. Bring [EQUIPMENT], [LOGS]."
├─ Step-by-step. Clear sequencing. No ambiguity.

```

### Key Features in System

- **Always Active:** Monitoring facility progress, regulatory alignment, risks
- **Anticipatory:** Flags issues before they become blockers
- **Operationally Precise:** Never creative, speculative, or informal
- **Regulatory-Aware:** Cites specific regulations; explains consequences
- **Role-Aware:** Tailors response based on user role (executive, QA, operator, consultant)
- **Voice-Ready:** Works via chat + voice interface seamlessly
- **Blocker-First:** Always surfaces highest-priority action
- **Consequence-Clear:** Shows what happens if action not taken
- **Decision-Ready:** Gives yes/no, go/no-go, or clear next step

---

## Summary of Workflows

| Workflow | Key Features | Timeline | Complexity |
|----------|--------------|----------|-----------|
| **Validation Lifecycle** | URS → FRS → DS → IQ → OQ → PQ → VSR; traceability matrix | 6–24 months | High |
| **Document Lifecycle** | Draft → Review → QA → Approval → Release → Archive | 2–4 weeks per doc | Medium |
| **Risk Management** | ID → Score → Mitigate → Verify; trending | 2–8 weeks per risk | High |
| **Change Control** | Initiation → Impact → Approval → Implementation → Verification | 1–4 weeks per change | High |
| **Readiness Engine** | Real-time scoring + predictive forecasting + drift detection | Continuous | Very High |
| **Consultant Mode** | Scoped access + deliverables + billing + transparency | 3–6 months per engagement | High |
| **Hyper-Assistant** | Continuous monitoring + anticipation + blocker alerts + voice | Always active | Very High |

**All workflows are interconnected.** Risk feeds into Validation. Changes trigger Risk review. Readiness integrates all other workflows. Assistant monitors everything.

---

This is the operational backbone of the GxP Facility Planner.
