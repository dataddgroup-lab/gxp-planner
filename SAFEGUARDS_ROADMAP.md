# Safeguards Roadmap — Should Add & Nice to Add
**Last Updated: 2026-03-11 15:15 MDT**

---

## SAFEGUARDS PRIORITY TIERS

### MUST ADD (Before Monday 9 AM)
✅ **Locked in AGENT_FRAMEWORK_COMPLETE.md**
- Section 37: Agent-to-Agent Handoff Protocol
- Section 38: Blocked Work Escalation Path
- Section 39: Build Artifact Versioning & Recovery
- Section 40: Change Control Trigger Detection (In-App)

---

### SHOULD ADD (Week 1–2 Implementation)
**Critical for build coherence & regulatory integrity. Implement during Phase 1a–1b.**

| # | Safeguard | Why | When | Owner | Size |
|---|-----------|-----|------|-------|------|
| 5 | Cross-Phase Dependency Map | Prevents cascading rework when downstream phases need upstream changes | Week 1 (Mar 12–19) | QA Lead | 2h |
| 6 | Regulatory Artifact Audit (Weekly) | Catches URS/FRS↔code drift before it propagates | Week 1 Fridays | Validation Lead | 1h/week |
| 7 | Customer Onboarding Safety Gates | Prevents customers from breaking their own validation post-launch | Phase 2d (Week 10) | UI Agent | 8h |
| 8 | Daily Build Status Email | Catches problems early. Keeps founder aware. Avoids surprises. | Week 1 onwards | Build Orchestrator | Template only |
| 9 | Commit Message Standard | Automatic audit trail. Enforced traceability. | Week 1 (Mar 12) | DevOps Agent | 1h setup |

---

## SHOULD ADD — DETAILED SPECS

### 5. CROSS-PHASE DEPENDENCY MAP

**What:** Document what each phase depends on from prior phases. When downstream needs upstream change, create formal "change request."

**Implementation:**
```
FILE: GxP-Planner/PHASE_DEPENDENCIES.md

Phase 1a depends on:
  - [none, first phase]

Phase 1b depends on:
  - Phase 1a: Database schema + RLS + auth complete
  - Phase 1a: URS v1.0 finalized
  - Impact if 1a changes: Must update FRS + validation tests

Phase 2a depends on:
  - Phase 1b: Facility + Validation engines complete
  - Phase 1a/1b: URS/FRS frozen
  - Impact if 1b changes: Must re-run risk assessment
```

**Mutation Protocol:**
1. Phase 2c discovers Phase 1b needs change
2. Phase 2c creates "change request" packet (what needs to change, why, impact)
3. Phase 1b lead approves or rejects
4. Decision logged in PHASE_DEPENDENCIES.md
5. Both phases updated with decision + rationale

**Timing:** Document during Week 1 Phase planning. Update weekly as dependencies clarify.

---

### 6. REGULATORY ARTIFACT AUDIT (WEEKLY)

**What:** Every Friday gate includes artifact consistency check. Are URS/FRS/Risk/Code aligned?

**Implementation:**
```
FILE: GxP-Planner/AUDIT_REPORTS/regulatory-audit-YYYYMMDD.md

WEEKLY REGULATORY AUDIT
=======================

Date: 2026-03-19 (Friday, Week 1)

1. URS Completeness:
   - v1.0 finalized? YES
   - All 150 requirements documented? YES
   - Traced to FRS? 100%

2. FRS Completeness:
   - v1.0 finalized? YES
   - All 150 functional specs documented? YES
   - Traced to code? 85% (see gaps below)
   - Traced to tests? 90%

3. Risk Assessment:
   - All identified risks documented? YES
   - All risks scored? YES
   - All mitigations assigned? YES
   - Validation impact assessed? 95% (see gaps)

4. Traceability Gaps (if any):
   - FRS → Code: Missing traceability for "admin user management"
   - Risk → Control: Mitigation status unclear for "data breach"

5. Decision:
   - Proceed to next phase? CONDITIONAL
   - Condition: Close 2 traceability gaps by Tuesday

Auditor: Validation Lead
Sign-off: ✓ or ✗
```

**Timing:** Every Friday 3 PM MDT (before 5 PM gate). Takes 1–2 hours. Prepared by Validation Agent.

---

### 7. CUSTOMER ONBOARDING SAFETY GATES

**What:** In-app wizard forces correct sequence. Cannot skip phases.

**Implementation (Phase 2d, Week 10):**

```
ONBOARDING FLOW

Step 1: Create Facility
  └─ Input: Name, location, type
  └─ Creates: Facility record + empty URS
  └─ Gate: Facility must be complete before proceeding

Step 2: Build URS
  └─ Input: Facility requirements (150 items)
  └─ Creates: URS v1.0
  └─ Gate: URS must be ≥80% complete before FRS unlocks
  └─ Red lock icon: "Finish URS before starting FRS"

Step 3: Build FRS
  └─ Input: Functional specs (150 items)
  └─ Creates: FRS v1.0 (linked to URS)
  └─ Gate: FRS must be ≥80% complete before design unlocks
  └─ Red lock icon: "Finish FRS before layout design"

Step 4: Layout Design
  └─ Input: Equipment placement, facility layout
  └─ Creates: Layout v1.0
  └─ Gate: Layout must pass ISO 14644 check before validation starts

Step 5: Validation Planning
  └─ Input: IQ/OQ/PQ test cases
  └─ Creates: Test plan v1.0
  └─ Gate: Test plan must be reviewed before execution

Step 6: Validation Execution
  └─ Input: Run IQ tests, OQ tests, PQ tests
  └─ Creates: Validation results
  └─ Gate: Each phase must pass before next phase starts
```

**Safety Warnings:**
- "Skipping IQ without FRS creates audit gaps." [Continue anyway?]
- "OQ requires completed IQ. You haven't finished IQ." [Allow anyway?]

**If customer clicks "Continue anyway:"**
- System logs choice: "Customer skipped URS completion. Reason: [optional]"
- Agent suggests: "Consultants will need URS to defend results."
- Audit entry created: "Deviation from recommended sequence."

**Timing:** Built Phase 2d (Week 10, May 8–21). Testing Week 2c (May 22–Jun 4).

---

### 8. DAILY BUILD STATUS EMAIL

**What:** End-of-day summary keeps founder aware. Catches problems early.

**Implementation:**

```
EMAIL FORMAT

TO: bobby@dataddgroup.com, qa-lead@[team]
FROM: build-orchestrator@gxp-planner.internal
SUBJECT: GxP Planner Build Status — 2026-03-12
TIME: 18:00 MDT daily

═══════════════════════════════════════════════════

TODAY'S PROGRESS (2026-03-12)

Build Agent:
  ✓ Database schema: 13 tables complete
  ✓ RLS policies: 9/10 implemented
  ✓ Auth flow: 2 endpoints tested
  - Code lines: +487
  - Tests added: 12
  - Coverage: 45% → 47%

Validation Agent:
  ✓ URS v1.0: 150/150 requirements documented
  ✓ Traceability: 30/150 FRS items mapped
  - In progress: Map remaining 120 FRS items

QA Agent:
  ✓ Tests passing: 34/34
  ✓ Security scan: 0 vulnerabilities
  - Code coverage gap: [section] needs 5 more tests

Documentation Agent:
  ✓ Phase 1a spec page: 2,400 words drafted
  - In progress: Screenshots + diagrams

═══════════════════════════════════════════════════

BLOCKERS (if any):
  [List any blockers detected, or "NONE"]

FORECAST FOR TOMORROW:
  ✓ Complete 10 remaining RLS policies
  ✓ Map 50 FRS→code relationships
  ✓ Add 15 integration tests

BUDGET STATUS:
  Week 1 budget: $300 (estimated)
  Spent to date: $75
  Remaining: $225
  Pace: ON TRACK

═══════════════════════════════════════════════════

Questions? Reply to this email.
```

**Timing:** Every day at 18:00 MDT. Takes 15 min to compile. Automated by Build Orchestrator.

---

### 9. COMMIT MESSAGE STANDARD

**What:** Every commit includes metadata. No "fixed stuff" or "work in progress."

**Implementation (Day 1, Week 1):**

```
CI/CD ENFORCES THIS FORMAT:

Format:
  PHASE-[1a/1b/2a/2b/2c/2d/3/4]: [component] [description]
  
  Linked: [URS-version], [FRS-items], [test-cases]
  Tests: X/X passing, +Y% coverage
  Risk: [Low/Medium/High] — [brief risk statement]

Example:
  PHASE-1a: Database — Create 13-table schema with RLS policies
  
  Linked: URS-v1.0, FRS-items-001-through-015
  Tests: 34/34 passing, +2.1% coverage
  Risk: Low — RLS policies reviewed by Validation Lead

Example 2:
  PHASE-2a: Risk Engine — Add ICH Q9 risk scoring algorithm
  
  Linked: URS-v1.2, FRS-v1.1, RISK-module-spec-v1.0
  Tests: 89/89 passing, +0.8% coverage
  Risk: Medium — New scoring logic needs expert validation

CI/CD Enforcement:
  ✗ REJECTED: "fixed stuff"
  ✗ REJECTED: "work in progress"
  ✗ REJECTED: "Phase-1a: database" (wrong format)
  ✓ ACCEPTED: "PHASE-1a: Database — [full description]"
```

**Setup (2h):**
1. Create `.githooks/commit-msg` validator
2. Test with 5 commits
3. Enable in CI/CD pipeline

**Timing:** Week 1, Day 1 (Mar 12). Enforced from first commit.

---

## NICE TO ADD (Week 3+ Implementation)
**High-value but less critical. Implement after Phase 2a complete (Week 7).**

| # | Safeguard | Why | When | Owner | Size |
|---|-----------|-----|------|-------|------|
| 10 | Consultant Competency Tracking | Prevents unqualified people from invalidating work | Phase 2d (Week 10) | UI Agent | 6h |
| 11 | Readiness Forecast Variance Tracking | Prevents surprise delays. Keeps customer alert. | Phase 2d (Week 10) | Analytics Agent | 8h |
| 12 | Audit Log Immutability Verification | Proves to FDA that logs can't be tampered. | Phase 3 (Week 12) | Security Agent | 4h |
| 13 | Backup & Disaster Recovery State | Gives customer confidence data is protected. | Phase 3 (Week 12) | DevOps Agent | 3h |
| 14 | Escalation Path (In-App) | Reduces time-to-resolution for stuck customers. | Phase 3 (Week 13) | UI Agent | 4h |
| 15 | Regulatory Review Checkpoints (Independent Reviewer) | Prevents building compliant code on non-compliant requirements. | Weeks 2–14 (parallel) | Regulatory Expert | 1h/week |

---

## NICE TO ADD — BRIEF SPECS

### 10. CONSULTANT COMPETENCY TRACKING
**Track consultant training/certifications. Block sign-off if consultant isn't qualified.**

### 11. READINESS FORECAST VARIANCE TRACKING
**Alert if actual completion <10% of forecast. Re-forecast weekly.**

### 12. AUDIT LOG IMMUTABILITY VERIFICATION
**Hash chain. Cryptographic proof logs can't be faked. Export with signature.**

### 13. BACKUP & DISASTER RECOVERY STATE
**Visible backup status. Manual backup trigger. Restore from backup. Audit trail includes backups.**

### 14. ESCALATION PATH (In-App)
**Help button on every screen. Auto-generate issue packet. 4-hour priority SLA.**

### 15. REGULATORY REVIEW CHECKPOINTS (Independent Reviewer)
**Every 2 weeks: Independent reviewer checks if URS/FRS align with FDA 21 CFR 211. Document decisions.**

---

## IMPLEMENTATION SCHEDULE

```
TIMELINE: WEEKS 1–14 (March 12 – June 11, 2026)

MUST ADD (Before Monday 9 AM):
  ✅ Sections 37–40 locked in framework

SHOULD ADD (Week 1–2):
  Week 1 (Mar 12–19):
    ✓ #5 Dependency Map (QA Lead, 2h)
    ✓ #9 Commit Message Standard (DevOps, 2h)
  Week 2 (Mar 20–26):
    ✓ #6 Regulatory Audit (Validation Lead, ongoing)
    ✓ #8 Daily Email (Build Orch, 1h setup)
  Week 10 (May 8–21):
    ✓ #7 Customer Onboarding Gates (UI Agent, 8h)

NICE TO ADD (Week 3+):
  Week 3 (Mar 27–Apr 2):
    ✓ #15 Regulatory Review Checkpoints (Regulatory Expert, 1h/week)
  Week 10 (May 8–21):
    ✓ #10 Consultant Competency (UI Agent, 6h)
    ✓ #11 Readiness Forecast (Analytics Agent, 8h)
  Week 12 (May 22–28):
    ✓ #12 Audit Log Immutability (Security Agent, 4h)
    ✓ #13 Backup & Recovery (DevOps Agent, 3h)
  Week 13 (May 29–Jun 4):
    ✓ #14 Escalation Path (UI Agent, 4h)

GATE CHECKLIST (Every Friday 5 PM):
  ✓ Must Add in place? (Yes/No)
  ✓ Should Add on track? (% complete)
  ✓ Nice to Add planned? (scheduled or deferred?)
```

---

## SUMMARY: LAYERED BUILD QUALITY

| Layer | Items | When | Impact |
|-------|-------|------|--------|
| **Mandatory** | 4 safeguards (37–40) | Before Monday | Prevents chaos during build |
| **Should Add** | 5 safeguards (5–9) | Weeks 1–10 | Prevents silent failures & drift |
| **Nice to Add** | 6 safeguards (10–15) | Weeks 3–13 | Ensures world-class customer experience + regulatory depth |

**Total build overhead:** ~50 hours (9% of 14-week budget)
**Total customer value:** Massive (confidence, safety, auditability, compliance proof)

---

## NEXT STEPS

1. **Monday 9 AM:** Build team starts with Sections 37–40 in place
2. **Week 1 Friday gate:** Confirm dependencies mapped, commits formatted
3. **Weekly gates:** Track Should Add progress
4. **Week 10 gate:** Review Nice to Add roadmap with Bobby
5. **Week 14:** All safeguards verified, ready for customer handoff

**This is the build flow that wins.**
