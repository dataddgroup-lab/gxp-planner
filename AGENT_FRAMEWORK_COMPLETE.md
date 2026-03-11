# Regulated Facility OS Agent — Complete Framework
**Last Updated: 2026-03-11 15:15 MDT**

---

## MASTER FRAMEWORK (Sections 1–40)

This document compiles the complete agent framework for building and operating the Universal GxP Facility Planner.

**Three foundational layers:**
1. **Original Prime Directive** (Sections 1–23): Operational discipline, no emotional support, momentum, structure
2. **Phase 2 Overlay** (Sections 24–34): Lifecycle discipline, facility-aware reasoning, artifact consistency, token governance
3. **Gravity of Work** (Sections 35–36): High-stakes discipline, traceability, risk surfacing, no shortcuts

**Four critical safeguards** (Sections 37–40): Agent handoff, blocker escalation, artifact versioning, change control triggers

---

## SECTIONS 1–36
_(Refer to prior documentation: SOUL.md, AGENTS.md, Regulated Facility OS Agent Master Script, Phase 2 Master Overlay, Gravity of Work Module)_

---

## SECTION 37 — AGENT-TO-AGENT HANDOFF PROTOCOL

### PURPOSE
Ensure parallel agents (build, validation, QA, documentation) coordinate work without silent gaps or assumptions.

### HANDOFF MECHANISM

**Every phase transition requires a 3-agent sign-off:**

1. **Build Agent** delivers:
   - Code artifact (linked commit)
   - URS changes (if any)
   - FRS changes (if any)
   - Test count + pass/fail status
   - Coverage delta
   - Known blockers or limitations

2. **Validation Agent** verifies:
   - URS complete for this phase? Y/N
   - FRS complete for this phase? Y/N
   - Traceability URS↔code: % complete
   - Traceability FRS↔tests: % complete
   - Sign-off: "Ready for next phase" OR "Blocked on: [X]"

3. **QA Agent** confirms:
   - Test count: X/X passing
   - Code coverage: Y%
   - Security tests: all passing
   - Compliance tests: all passing
   - Sign-off: "Ready for phase release" OR "Blocked on: [Y]"

### HANDOFF PACKET FORMAT

```
PHASE [N] COMPLETE — HANDOFF PACKET
=====================================

Build Agent:
  Commit: [hash]
  Lines changed: X
  New features: [list]
  Tests added: X
  Coverage delta: +Y%
  Known issues: [list or "none"]

Validation Agent:
  URS completeness: X%
  FRS completeness: X%
  Traceability gaps: [list or "none"]
  Recommendation: PROCEED / BLOCKED

QA Agent:
  Tests passing: X/X
  Code coverage: Y%
  Security tests: PASS/FAIL
  Compliance tests: PASS/FAIL
  Recommendation: PROCEED / BLOCKED

Gate Decision: [APPROVED / REJECTED / CONDITIONAL]
```

### GATE RULE
**No phase advances until all three agents sign "PROCEED" or "CONDITIONAL"**

If any agent says "BLOCKED," the blocker classification (Section 5) applies, and escalation protocol (Section 38) triggers.

---

## SECTION 38 — BLOCKED WORK ESCALATION PATH

### PURPOSE
Prevent silent waits. Route blockers to founder for rapid decision.

### BLOCKER CLASSIFICATION
When an agent hits a blocker, classify it:

- **Technical blocker** (code issue, dependency broken)
- **Decision blocker** (need founder choice)
- **Resource blocker** (missing person/tool)
- **Dependency blocker** (waiting on another phase)
- **Regulatory blocker** (unclear compliance requirement)

### ESCALATION PROTOCOL

**If blocker unresolved for >30 minutes:**

1. **Agent creates escalation packet:**
   ```
   BLOCKER ESCALATION
   ==================
   
   Blocker type: [technical/decision/resource/dependency/regulatory]
   What's blocked: [phase, feature, task]
   Why: [root cause]
   
   Current impact:
     - Work stopped: [N agents idle]
     - Time impact: [estimated delay]
     - Budget impact: [tokens pending]
   
   Proposed solutions:
     1. [Option A - recommended]
     2. [Option B - acceptable]
     3. [Option C - workaround]
   
   Required: Founder decision by [HH:MM MDT]
   ```

2. **Founder receives notification:**
   - Slack/email summary
   - Full packet attached
   - One recommended action highlighted

3. **Founder responds with decision** (target: <15 min)

4. **Decision logged:**
   ```
   DECISION LOG
   ============
   Blocker: [description]
   Decision: [chosen option]
   Rationale: [why this option]
   Timestamp: [ISO-8601]
   Approver: [founder name]
   ```

5. **Work resumes** immediately after decision

### ESCALATION SLA
- Detection: <5 min
- Escalation: <30 min
- Founder response: <15 min
- Work resumes: <45 min total

**If SLA violated, build halts and blocker becomes public (Friday gate topic).**

---

## SECTION 39 — BUILD ARTIFACT VERSIONING & RECOVERY

### PURPOSE
Ensure every artifact is versioned, every test run is logged, and every phase can be rolled back cleanly if needed.

### ARTIFACT VERSIONING SCHEME

**All deliverables follow this format:**

```
[ARTIFACT]-v[MAJOR].[MINOR]
URS-v1.0
URS-v1.1 (minor fix)
URS-v2.0 (major change)

FRS-v1.0
FRS-v1.2 (two minor updates)

TEST-SUITE-v1.0
(847 tests, pass/fail results logged)
```

### ARTIFACT METADATA

**Every artifact includes:**
```yaml
artifact: URS
version: 1.2
phase: Phase 1a
created: 2026-03-12 09:15 MDT
updated: 2026-03-13 14:30 MDT
author: Validation Lead
approver: Bobby BIG
status: APPROVED
linked_commit: a1b2c3d
linked_tests: TEST-SUITE-v1.0
changes: [list of changes from v1.1]
```

### TEST RUN LOGGING

**Every test run captures:**
```
test_run_id: TR-20260312-001
timestamp: 2026-03-12 09:45 MDT
suite_version: TEST-SUITE-v1.0
test_count: 847
passing: 847
failing: 0
coverage: 88.2%
phase: Phase 1a
linked_commit: a1b2c3d
linked_urs: URS-v1.0
duration_seconds: 412
notes: Initial Phase 1a validation
```

### ROLLBACK PROCEDURE

**If a phase fails late (e.g., Phase 2b finds critical bug):**

1. **Identify last-good-state:**
   ```
   Last APPROVED phase: 1b
   Last passing test run: TR-20260305-042
   Last approved URS: URS-v1.1
   ```

2. **Revert code to last-good commit:**
   ```
   git checkout [commit-hash]
   ```

3. **Verify recovery:**
   - Run full test suite: must pass
   - Check traceability: URS/FRS/code aligned
   - Confirm coverage: ≥88%

4. **Document restart:**
   ```
   PHASE RESTART
   =============
   Phase: 2b
   Restart reason: [bug discovered in Phase 2b]
   Rolled back to: [commit, URS-v1.1, TR-20260305-042]
   Restart time: [ISO-8601]
   Expected recovery: [N hours]
   ```

### VERSIONING STORAGE

**All versions live in:**
- Code: GitHub branch history (`git log`)
- Artifacts (URS/FRS/risk): `/GxP-Planner/artifacts/[phase]/` with version in filename
- Test results: `/GxP-Planner/test-runs/[YYYYMMDD]/` with run ID

**Backup:** Daily snapshots of entire `/artifacts/` and `/test-runs/` directories

---

## SECTION 40 — CHANGE CONTROL TRIGGER DETECTION (IN-APP)

### PURPOSE
Prevent uncontrolled modifications that invalidate validation. Detect significant changes and force deliberate decision-making.

### CHANGE TRIGGER CATEGORIES

**System automatically detects and flags:**

| Category | Triggers | Example |
|----------|----------|---------|
| **Equipment** | Substitution, removal, specification change | Swap HPLC model, change power requirement |
| **Layout** | Redesign, room change, flow modification | Move equipment to different room, change cleanroom classification |
| **Process** | Parameter change, step addition/removal, procedure deviation | Change HPLC temperature setpoint by >5°C, add new process step |
| **Validation** | Phase modification, test removal, requirement change | Remove IQ test, skip OQ phase |
| **Training** | Training requirement change, curriculum update | Change required certifications, add new training module |
| **SOP** | Procedure change, control change, frequency change | Change calibration frequency, modify QC method |
| **Risk** | New risk identified, mitigation changed, control removed | Identify new contamination risk, remove quality check |
| **Data** | Access level change, retention period change | Grant consultant access to restricted data |

### IN-APP CHANGE DETECTION FLOW

**When customer modifies a flagged item:**

```
Customer action: [change type]
↓
System detects: "This looks like a change"
↓
Agent proposes: "This impacts [X]. Create change control? [Yes/No]"
↓
IF YES:
  ├─ Auto-generate change control packet
  ├─ Populate: description, affected items, current state, proposed state
  ├─ Route to: Facility lead for approval
  └─ Lock change until approved
↓
IF NO:
  ├─ Log customer decision: "Declined change control on [action]"
  ├─ Ask for rationale: "Why is this not a change?"
  ├─ Store rationale in audit trail
  └─ Allow modification (with audit record)
```

### CHANGE CONTROL PACKET

**System auto-generates:**

```
CHANGE CONTROL REQUEST
======================

ID: CCR-20260312-001
Facility: [facility name]
Date created: 2026-03-12 14:30 MDT
Created by: [customer name]

WHAT'S CHANGING:
  Type: [equipment/layout/process/validation/training/sop/risk/data]
  Item: [specific item affected]
  Current state: [description]
  Proposed state: [description]
  Reason for change: [customer-provided]

IMPACT ASSESSMENT:
  Affects URS: Y/N
  Affects FRS: Y/N
  Affects validation phases: [list or "none"]
  Affects risk assessment: Y/N
  Affects SOPs: Y/N
  Affects training: Y/N

REQUIRED ACTIONS:
  [ ] Review by facility lead
  [ ] Risk impact assessment
  [ ] Validation impact assessment (if needed)
  [ ] SOP update (if needed)
  [ ] Training update (if needed)
  [ ] Final approval

STATUS: [PENDING / APPROVED / REJECTED / ON HOLD]
```

### CHANGE CONTROL APPROVAL SLA

- **Minor changes** (low risk, low impact): Approval within 4 hours
- **Moderate changes** (medium risk/impact): Approval within 24 hours
- **Major changes** (high risk/impact, validation affected): Approval within 72 hours

**If SLA exceeded, system sends reminder and escalates to facility lead.**

### AUDIT TRAIL

**Every change (approved or declined) records:**
```
AUDIT ENTRY
===========
Change ID: CCR-20260312-001
Action: [change approved/change declined/change initiated]
Timestamp: 2026-03-12 15:45 MDT
Actor: [user name/role]
Decision: [approved/rejected/conditional]
Rationale: [if provided]
```

---

## SUMMARY: SECTIONS 37–40

| Section | Function | Timing |
|---------|----------|--------|
| 37 — Handoff | 3-agent coordination, phase gating | Every phase transition |
| 38 — Escalation | Blocker routing, rapid decisions | When blocker >30 min |
| 39 — Versioning | Artifact tracking, rollback capability | Every code/artifact update |
| 40 — Change Control | Trigger detection, forced decisions | Customer modifies flagged items |

**These four safeguards ensure:**
- No silent assumptions (handoff)
- No hidden blockers (escalation)
- No lost work (versioning)
- No uncontrolled changes (change control)

---

## FRAMEWORK STATUS

**Complete:** Sections 1–40 (Original + Phase 2 + Gravity + Safeguards)

**Ready for:** Monday 2026-03-12, 9:00 AM MDT

**Build phase:** Weeks 1–14, March 12 – June 11, 2026

**Product launch:** June 11, 2026, 5:00 PM MDT
