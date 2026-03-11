# Change Control System
**Mandatory Enforcement at Build Time & Runtime**

**Status:** LOCKED - Applies to All Changes, All Deployments  
**Scope:** Every code change, schema change, workflow modification, GxP rule update  
**Enforcement:** CCR creation, approval chain, immutable records, separation of duties

---

## CHANGE CONTROL RECORD (CCR) OBJECT

**Every change generates one CCR with these fields:**

### Identification
- **change_id**: CCR-YYYYMMDD-###
  - Example: CCR-20260312-001, CCR-20260312-002
  - Immutable, unique, auto-generated
- **title**: Brief change description
  - Example: "Add HPLC equipment type"
  - Example: "Fix audit trail timestamp precision"

### Initiator & Context
- **description**: Detailed change rationale
  - Why is this change needed?
  - What problem does it solve?
  - What is the regulatory/operational driver?
- **initiator**: Name + role of who requested change
  - Example: "Build Team (feature development)"
  - Example: "Risk Agent (FDA requirement)"

### Scope & Impact
- **affected_modules**: List of modules changed
  - Example: ["equipment-database", "layout-design", "compliance-dashboard"]
- **change_class**: Class 1 (Low) | Class 2 (Moderate) | Class 3 (High)
  - Assigned by Risk Agent
  - Determines approval requirements

### Risk & Assessment
- **risk_assessment**: Structured assessment
  ```json
  {
    "identification": "What are the potential risks?",
    "analysis": "What is the likelihood × severity?",
    "mitigation": "What controls prevent/detect the risk?",
    "residualRisk": "After mitigation, what remains?"
  }
  ```
- **impact_analysis**: Change impact on:
  - Existing customers (data, workflows, behavior)
  - Data models (schema changes, migrations)
  - Validation logic (does this affect GxP compliance?)
  - Rollback (can we undo this if needed?)

### Validation & Testing
- **validation_requirements**: What must be tested?
  - Example: "Unit tests, integration tests, GxP validation"
- **test_plan**: How will validation occur?
  ```json
  {
    "testName": "Equipment database backward compatibility",
    "testType": "Integration",
    "acceptance": "Existing equipment types load without error",
    "estimatedTime": "15 minutes"
  }
  ```
- **test_results**: What did testing show?
  ```json
  {
    "testsPassing": 12,
    "testsFailing": 0,
    "coverage": "88%",
    "date": "2026-03-12T14:30:00Z",
    "status": "All tests PASSED"
  }
  ```

### Approvals & Authorization
- **approvals**: Who signed off?
  ```json
  [
    {
      "approver": "qa-lead@company.com",
      "role": "QA Manager",
      "decision": "Approved",
      "timestamp": "2026-03-12T15:45:00Z",
      "comment": "Risk assessment is thorough, tests comprehensive"
    },
    {
      "approver": "bobby@company.com",
      "role": "Founder/Compliance Expert",
      "decision": "Approved",
      "timestamp": "2026-03-12T16:00:00Z",
      "comment": "Aligns with GxP principles, rollback plan sound"
    }
  ]
  ```

### Rollback & Reversibility
- **rollback_plan**: How to undo this change?
  ```json
  {
    "reversible": true,
    "steps": [
      "Revert code to previous commit",
      "Execute database rollback script (if needed)",
      "Clear application cache",
      "Verify audit trail integrity"
    ],
    "estimatedTime": "5 minutes",
    "dataImpact": "No data loss (fully reversible)",
    "dependencies": "No downstream changes depend on this"
  }
  ```

### Version Traceability
- **version_links**:
  ```json
  {
    "product_version": "1.3.0",
    "gxp_ruleset_version": "GxP.1.2",
    "agent_config_version": "AGENT.1.5"
  }
  ```
  - Every change links to the versions active at deployment
  - Allows audit trail to connect to exact rules/config

### Status Tracking
- **status**: draft | in_review | approved | rejected | deployed | rolled_back
  - **draft**: CCR created, not yet submitted
  - **in_review**: Risk assessment + testing in progress
  - **approved**: All approvals complete, ready to deploy
  - **rejected**: Risk unacceptable, change deferred or cancelled
  - **deployed**: Change live in production
  - **rolled_back**: Change reverted after deployment

### Audit Trail
- **created_at**: ISO-8601 timestamp (immutable)
- **updated_at**: ISO-8601 timestamp (last status change)
- **audit_log**: Every change to CCR logged with user + timestamp
  - Example: "qa-lead approved at 15:45", "bobby approved at 16:00"

---

## CHANGE CONTROL WORKFLOW

### Stage 1: CCR Creation (Draft)
**Who:** Builder Agent  
**When:** Every code/schema/workflow change  
**Action:**
1. Create CCR object with identification + description
2. Identify affected modules
3. Propose change class (preliminary)
4. Propose version bump
5. Submit for risk assessment

**Gate:** CCR must be complete before proceeding to Stage 2

### Stage 2: Risk Assessment (In Review)
**Who:** Risk Agent  
**When:** Immediately after CCR creation  
**Action:**
1. Review change description + affected modules
2. Perform risk identification (what could go wrong?)
3. Assign change class (Class 1/2/3, may override builder's proposal)
4. Perform impact analysis (data, validation, customers)
5. Identify validation requirements
6. Identify required mitigations
7. Submit to Validation Agent

**Gate:** Risk assessment must be complete before testing proceeds

### Stage 3: Validation & Testing (In Review)
**Who:** Validation Agent  
**When:** Parallel with risk assessment  
**Action:**
1. Review risk assessment + validation requirements
2. Create test plan (unit, integration, GxP tests)
3. Execute tests
4. Record test results (pass/fail, coverage)
5. Validate rollback plan (can we undo this?)
6. For Class 2+: Must pass all tests before proceeding
7. Submit to approval chain

**Gate:** All tests passing + rollback plan validated before approval

### Stage 4: Approval (In Review → Approved)
**Who:** Approval chain (varies by class)  
**When:** After risk assessment + validation complete  
**Action:**

**Class 1:**
- Auto-approved (no manual step needed)
- Status: draft → approved (automated)

**Class 2:**
- QA Manager reviews: Is risk mitigation adequate? Tests passed?
- Decision: Approved | Rejected | Conditional
- Status: in_review → approved

**Class 3:**
- Bobby (Compliance Expert) reviews: GxP impact acceptable? Rollback viable?
- Product Lead reviews: Does this align with roadmap?
- QA Manager reviews: Risk assessment thorough? Tests comprehensive?
- Decision: Approved | Rejected | Conditional
- Status: in_review → approved

**Gate:** All required approvals present before deployment

### Stage 5: Deployment (Approved → Deployed)
**Who:** Release Agent (automated)  
**When:** After approval  
**Action:**
1. Tag code with version (v{MAJOR.MINOR.PATCH})
2. Embed CCR ID in release notes
3. Embed version metadata in code
4. Deploy to production
5. Update status: deployed
6. Create audit entry: "Deployed at {timestamp}"

**Gate:** Deployment automated once approved (no manual step)

### Stage 6: Post-Deployment Monitoring (Deployed)
**Who:** Ops + Risk Agent  
**When:** First 24–72 hours after deployment  
**Action:**
1. Monitor system health (errors, latency, availability)
2. Monitor customer impact (support tickets, usage patterns)
3. Verify rollback plan still viable (no surprises)
4. For Class 3: Extra monitoring for 1 week

**Gate:** If critical issues found → Rollback (status: rolled_back)

---

## AGENT RESPONSIBILITIES

### Builder Agent
- **Creates** CCR draft
- **Identifies** affected modules
- **Proposes** version bump
- **Proposes** change class (advisory)
- ❌ **Cannot approve** its own change

### Risk Agent
- **Performs** risk identification + analysis
- **Assigns** change class (final decision)
- **Performs** impact analysis
- **Identifies** validation requirements
- ❌ **Cannot modify** version numbers (would hide impact)

### Validation Agent
- **Creates** test plan
- **Executes** tests
- **Records** test results
- **Validates** rollback plan
- **Blocks** release if tests fail or rollback invalid
- ❌ **Cannot downgrade** risk ratings

### Audit Agent
- **Reviews** all approvals
- **Verifies** CCR completeness
- **Verifies** traceability (CCR → versions → code)
- **Produces** final change control package
- **Certifies** readiness for deployment
- ❌ **Cannot modify** risk assessment

### Release Agent (Automated)
- **Tags** code with version
- **Embeds** version metadata
- **Deploys** to production (if approved)
- **Updates** CCR status
- **Creates** audit entries

---

## NON-NEGOTIABLES

**These rules cannot be bent, reinterpreted, or omitted:**

- ❌ **No change may deploy without a completed CCR**
  - Every change → CCR creation (mandatory)
  - Every CCR must reach "approved" status before deployment
  - No workarounds, no manual overrides

- ❌ **No agent may bypass or override change control**
  - Builder Agent cannot push code without CCR
  - Validation Agent cannot skip testing
  - Approver cannot sign without risk assessment
  - Release Agent only deploys approved CCRs

- ❌ **No change may be reclassified to reduce required controls**
  - Class 3 → Class 2: Not allowed (hiding GxP impact)
  - Class 2 → Class 1: Not allowed (avoiding approval chain)
  - Reclassification only upward (Class 1 → Class 2 if risk discovered)

- ❌ **All changes MUST be traceable to a version and rollback plan**
  - Every deployment tagged with product version
  - Every CCR links to GxP ruleset + agent config versions
  - Every change has validated rollback plan
  - Audit trail connects all pieces (code → CCR → versions → rollback)

---

## ENFORCEMENT AT BUILD TIME

**CI/CD gates prevent deployment without CCR:**

```
Code commit → CCR check
  ✅ CCR exists? → Continue
  ❌ CCR missing? → Block push (force developer to create)

Testing → CCR check
  ✅ All tests passing? → Mark CCR.test_results = PASS
  ❌ Tests failing? → Mark CCR.test_results = FAIL, block release

Approval → CCR check
  ✅ All approvals present? → Status = approved
  ❌ Missing approval? → Block deployment (require reviewer action)

Release → CCR check
  ✅ Status = approved? → Deploy & tag
  ❌ Status ≠ approved? → Block release (prevent unauthorized deployment)
```

---

## ENFORCEMENT AT RUNTIME

**The app enforces change control principles:**

1. **Audit trail:** Every change logged with who, when, why
2. **Rollback capability:** System maintains previous state, can revert
3. **Traceability:** Users can see what version they're running + what changed
4. **Immutability:** CCRs cannot be deleted or modified (only status updates)

---

## EXAMPLE: CLASS 1 CCR

```
CCR-20260312-001
Title: Fix equipment label text (UI typo)

Description:
  Equipment label shows "HPLC" instead of "HPLC System"
  This is a UI text-only change, no behavior impact

Affected modules:
  - Equipment display component

Change class: Class 1 (auto-approved)

Risk assessment:
  - Identification: UI text is updated, no data change
  - Analysis: Risk is none (text-only)
  - Mitigation: Unit test confirms text displays correctly
  - Residual risk: None

Impact analysis:
  - Customer impact: None (UI polish only)
  - Data impact: None (no schema change)
  - Validation impact: None (no logic change)
  - Rollback: Simple code revert

Test plan:
  - Unit test: Equipment label displays "HPLC System" ✅ PASS

Status: deployed
Deployed: 2026-03-12T14:30:00Z
Version: v1.2.4
```

---

## EXAMPLE: CLASS 2 CCR

```
CCR-20260312-002
Title: Add Freeze Dryer equipment type

Description:
  Customers requested Freeze Dryer as equipment option
  Add equipment type to database, update UI to allow selection
  Backward compatible (existing equipment unaffected)

Affected modules:
  - Equipment database
  - Layout design tool
  - Readiness forecast

Change class: Class 2 (manual approval required)

Risk assessment:
  - Identification: New equipment type added, no existing data affected
  - Analysis: Moderate risk (database expansion)
  - Mitigation: Equipment type validated, tests comprehensive
  - Residual risk: Low

Impact analysis:
  - Customer impact: New option available, existing layouts unaffected
  - Data impact: Schema unchanged (add new row), fully reversible
  - Validation impact: Equipment qualified per existing rules
  - Rollback: Delete new equipment type, existing data unaffected

Test plan:
  - Equipment type creates successfully ✅ PASS
  - Facility design accepts freeze dryer ✅ PASS
  - Readiness forecast includes freeze dryer lead time ✅ PASS

Approvals:
  - qa-lead@company.com: Approved (risk acceptable, tests comprehensive)

Status: deployed
Deployed: 2026-03-12T16:00:00Z
Version: v1.3.0
```

---

## EXAMPLE: CLASS 3 CCR

```
CCR-20260312-003
Title: Enforce URS completion before FRS

Description:
  FDA guidance + customer feedback: URS must be complete before FRS
  Implement workflow enforcement: Cannot proceed to FRS until URS ≥95%
  GxP-core change (validation sequence)

Affected modules:
  - Validation lifecycle engine
  - Dashboard (workflow guidance)
  - All validation workflows

Change class: Class 3 (full approval chain required)

Risk assessment:
  - Identification: Validation sequence enforced, existing workflows may be affected
  - Analysis: High risk (core validation logic change)
  - Mitigation: Comprehensive testing, rollback plan sound
  - Residual risk: Low (with mitigations)

Impact analysis:
  - Customer impact: HIGH (existing incomplete URS must be completed before proceeding)
  - Migration plan: Existing facilities with incomplete URS flagged, guidance provided
  - Data impact: No data loss (enforcement-only, backward compatible)
  - Validation impact: Validation sequence now guaranteed correct
  - Rollback: Partial (disable enforcement, existing data untouched)

Test plan:
  - Existing facilities with incomplete URS are flagged ✅ PASS
  - New facilities cannot proceed to FRS without URS ≥95% ✅ PASS
  - All regression tests pass (no facility lost data) ✅ PASS
  - Rollback to v1.9.9 tested (enforcement disabled, data intact) ✅ PASS

Approvals:
  - bobby@company.com (Founder/Compliance): Approved
  - qa-lead@company.com (QA Manager): Approved
  - product-lead@company.com (Product): Approved

Status: deployed
Deployed: 2026-03-12T17:00:00Z
Version: v2.0.0 (MAJOR version bump due to breaking change)
```

---

## BOTTOM LINE

**Change control is the guardrail for safe delivery.**

Every change is documented, assessed, tested, approved, and rollback-validated. The CCR is the immutable record: proof that the change was deliberately made, carefully reviewed, and can be undone if needed.

In a regulated system, this is non-negotiable.

