# Versioning and Release Governance
**Mandatory Enforcement at Build Time & Runtime**

**Status:** LOCKED - Applies to All Releases, All Versions  
**Scope:** Product version, GxP ruleset version, agent config version  
**Enforcement:** Separation of duties, risk-based classification, immutable records

---

## VERSION LAYERS

**Three versioning tracks run in parallel:**

### 1. PRODUCT_VERSION: MAJOR.MINOR.PATCH
**Example: 1.2.3**
- **MAJOR** (1): Significant feature addition or breaking change
- **MINOR** (2): New feature, backward compatible
- **PATCH** (3): Bug fix, no feature change

### 2. GXP_RULESET_VERSION: GxP.MAJOR.MINOR
**Example: GxP.1.2**
- **MAJOR** (1): Regulatory requirement changed (FDA updated rule, ICH Q9 revised)
- **MINOR** (2): GxP enforcement rule added/modified (facility design rule, data integrity rule)

### 3. AGENT_CONFIG_VERSION: AGENT.MAJOR.MINOR
**Example: AGENT.1.5**
- **MAJOR** (1): Agent framework section added/replaced (Sections 1–42)
- **MINOR** (5): Agent behavior rule modified (priority changed, constraint clarified)

---

## VERSION RULES

**All changes MUST be classified as:**

### Class 1: Low Impact (PATCH only)
**Characteristics:**
- No GxP impact
- No data model change
- No workflow change
- Bug fix or UI improvement only
- Fully backward compatible
- Regression testing sufficient

**Examples:**
- Fix typo in label
- Improve tooltip text
- Adjust button size
- Refactor internal function (no API change)

**Approval:**
- ✅ Auto-approve if unit tests pass
- No risk assessment required
- No change control required (documented in commit message only)

**Version bump:** PATCH only (1.2.3 → 1.2.4)

---

### Class 2: Moderate Impact (MINOR)
**Characteristics:**
- GxP-aware but not core validation
- Backward compatible data/API
- New feature or enhancement
- Requires risk assessment
- Requires regression tests + new tests
- May require customer communication

**Examples:**
- Add new equipment type to database
- Add new environmental monitoring parameter
- Improve readiness forecast visualization
- Add consultant access control level

**Approval:**
- ⚠️ Requires risk assessment
- Requires impact analysis
- Requires test plan + results
- Requires manager approval (not auto-approved)

**Version bump:** MINOR (1.2.3 → 1.3.0)

---

### Class 3: High Impact (MAJOR)
**Characteristics:**
- GxP-core impact (validation logic, data integrity, workflow)
- Breaking change or data migration
- New compliance requirement
- High risk of customer impact
- Requires full change control
- Requires human approval chain

**Examples:**
- Change validation lifecycle sequencing (URS→FRS order)
- Modify ALCOA+ enforcement (data model change)
- Add new FDA requirement to facility design rules
- Change rollback/disaster recovery strategy

**Approval:**
- ❌ Manual approval required (cannot auto-approve)
- Requires full change control (CCR)
- Requires risk assessment + mitigation
- Requires impact analysis (all modules, all tenants)
- Requires validation testing
- Requires rollback plan
- Requires stakeholder sign-off (Bobby, QA, Validation)

**Version bump:** MAJOR (1.2.3 → 2.0.0)

---

## RELEASE REQUIREMENTS

**No release may be tagged without:**

1. ✅ Change classification (Class 1/2/3)
2. ✅ Risk assessment (if Class 2+)
3. ✅ Validation test plan (if Class 2+)
4. ✅ Test results (pass/fail for each test)
5. ✅ GxP ruleset version reference (which GxP.x.x is locked?)
6. ✅ Agent config version reference (which AGENT.x.x is active?)
7. ✅ Version metadata embedded in all artifacts

**Release package MUST include:**
- Git tag: `v{PRODUCT_VERSION}`
- Release notes: Classes, risk assessments, test results
- Change control records: All CCRs for Class 2+ changes
- Version manifest:
  ```json
  {
    "productVersion": "1.2.3",
    "gxpRulesetVersion": "GxP.1.2",
    "agentConfigVersion": "AGENT.1.5",
    "releaseDate": "2026-03-12T16:00:00Z",
    "changeClasses": [1, 2],
    "testsPassing": 847,
    "coverage": "88%"
  }
  ```

---

## ROLLBACK RULES

**All releases MUST include a rollback plan generated at build time.**

### Rollback Plan MUST Specify

**1. Affected Modules**
```
Class 1 changes:
  - Facility Layout UI (visual only, no data)
  - Help text (no behavior change)

Class 2 changes:
  - Equipment database (add new type, backward compatible)
  - Readiness forecast algorithm (improved calculation, same outputs)

Class 3 changes:
  - Validation lifecycle (URS/FRS ordering enforced at DB level)
  - Data integrity controls (audit trail schema change)
```

**2. Data Model Implications**
- Reversible changes: Data structure unchanged, code logic can revert
- Irreversible changes: Data migration required, cannot fully revert

**Examples:**
- Add column to table = Reversible (drop column on rollback)
- Rename column = Irreversible (historical data lost)
- Add validation rule = Reversible (disable rule on rollback)
- Change data type = Irreversible (conversion required)

**3. Reversible vs Irreversible**
```
Reversible rollback (Class 1/2):
  - Revert code from vX to vX-1 (Git checkout)
  - Cache/state clears automatically
  - No data migration required
  - Estimated rollback time: 5 minutes

Irreversible rollback (Class 3 with data change):
  - Code reverts (Git checkout)
  - Data CANNOT be reverted (marked as irreversible)
  - Partial rollback possible (disable new rules, keep data)
  - Estimated rollback time: 30 minutes + data review
  - Manual intervention required
```

**4. Tenant-Level Rollback**
- Single tenant affected? Rollback only that tenant's data + code state
- Multi-tenant affected? Coordinate rollback across all tenants
- Database-level changes? May require full system rollback

**5. Global Rollback Steps**
```
Step 1: Pause all production transactions (read-only mode)
Step 2: Backup current state (snapshot to restore point)
Step 3: Execute rollback code
Step 4: Verify data consistency (sample queries, audit trail intact)
Step 5: Resume transactions (if successful) or escalate (if failed)
```

**6. No Deploy Without Validated Rollback**
- ❌ Cannot deploy if rollback plan incomplete
- ❌ Cannot deploy if rollback not tested
- ✅ Must have working rollback path verified before release

---

## SEPARATION OF DUTIES

**Conflict of interest prevention:**

### Builder Agent
- ✅ Creates code
- ✅ Proposes version bump
- ✅ Proposes change class
- ❌ **Cannot approve its own changes** (conflict of interest)

### Risk Agent
- ✅ Performs risk assessment
- ✅ Assigns change class
- ✅ Identifies required controls
- ❌ **Cannot modify version numbers** (would hide change magnitude)

### Validation Agent
- ✅ Generates test plan
- ✅ Validates rollback plan
- ✅ Decides if tests passed
- ❌ **Cannot downgrade risk ratings** (would weaken controls)

### Audit Agent
- ✅ Reviews all approvals
- ✅ Certifies completeness
- ✅ Produces change control package
- ❌ **Cannot modify change class or risk assessment**

---

## APPROVAL CHAIN

**Who must sign off for each class:**

### Class 1 (Auto-approve)
- ✅ Build agent commits
- ✅ Tests pass
- ✅ Auto-tagged and released
- No additional approvals needed

### Class 2 (Manager approval)
- Build agent submits CCR
- Risk agent assesses → Risk class assigned
- Validation agent tests → Results reported
- **Manager approves** (QA lead or Validation lead)
- Audit agent certifies
- Release tagged

### Class 3 (Full approval chain)
- Build agent submits CCR
- Risk agent assesses → Risk class assigned (Class 3 flagged)
- Validation agent tests → Full test plan executed
- **Bobby approves** (founder/compliance expert)
- Product lead approves (impact on roadmap)
- Audit agent certifies
- Release tagged

---

## VERSION MANIFEST

**Every release includes version metadata:**

```json
{
  "releaseVersion": "v1.2.3",
  "releaseDate": "2026-03-12T16:00:00Z",
  "productVersion": "1.2.3",
  "gxpRulesetVersion": "GxP.1.2",
  "agentConfigVersion": "AGENT.1.5",
  
  "changes": [
    {
      "id": "CCR-20260312-001",
      "title": "Add HPLC equipment type",
      "class": 2,
      "riskRating": "Moderate",
      "testsPassing": 12,
      "testsFailing": 0,
      "approver": "qa-lead@company.com",
      "approvedAt": "2026-03-12T15:30:00Z"
    }
  ],
  
  "qaMetrics": {
    "testCount": 847,
    "testsPassing": 847,
    "testsFailing": 0,
    "codeCoverage": "88%",
    "securityTests": "34 passing"
  },
  
  "rollback": {
    "plan": "Revert code to v1.2.2, clear cache, verify audit trail",
    "estimatedTime": "5 minutes",
    "reversible": true
  }
}
```

---

## ENFORCEMENT

**Build pipeline gates:**

### Commit → Build
- ✅ Change class assigned? Yes/No
- ✅ For Class 2+: Risk assessment attached? Yes/No
- ✅ For Class 2+: Test plan defined? Yes/No

### Build → Testing
- ✅ For Class 2+: Tests executed? Yes/No
- ✅ For Class 2+: All tests passing? Yes/No
- ✅ For Class 3: Rollback plan validated? Yes/No

### Testing → Release
- ✅ All approvals complete? Yes/No
- ✅ Version metadata complete? Yes/No
- ✅ Rollback plan in place? Yes/No

### Release
- ✅ Tag created: `v{PRODUCT_VERSION}`
- ✅ Release notes published
- ✅ Version metadata embedded
- ✅ Rollback plan documented

---

## EXAMPLE: CLASS 1 RELEASE

```
Commit: "Fix typo in equipment label (HPLC → HPLC System)"
Classification: Class 1 (UI text, no behavior/data change)
Tests: Unit tests pass (2/2)
Approval: Auto-approved (no manual approval needed)
Release: v1.2.4

Release notes:
  - Bug fix: Correct equipment label text
  - No GxP impact
  - Rollback: v1.2.3 (revert code, cache clear)
```

---

## EXAMPLE: CLASS 2 RELEASE

```
Commit: "Add new equipment type: Freeze Dryer"
Classification: Class 2 (new feature, backward compatible)
Risk assessment: Moderate (equipment database expansion, no validation impact)
Test plan:
  - Equipment type creates successfully (1 test)
  - Facility design accepts freeze dryer placement (2 tests)
  - Readiness forecast includes freeze dryer lead time (1 test)
  - Total: 4 new tests, all passing
Approver: qa-lead@company.com (manual approval)
Released: v1.3.0

Release notes:
  - Feature: Add Freeze Dryer equipment type
  - Impact: Backward compatible (existing layouts unaffected)
  - Risk: Moderate (new database entry, tested)
  - Rollback: v1.2.4 (delete freeze dryer type, existing records unaffected)
```

---

## EXAMPLE: CLASS 3 RELEASE

```
Commit: "Enforce URS before FRS (validation lifecycle)"
Classification: Class 3 (GxP-core, workflow change, requires full review)
Risk assessment: High (validation sequence enforced at system level)
Impact analysis:
  - All customers: Existing facilities with FRS but incomplete URS will be flagged
  - Data model: No migration (backward compatible, but enforced going forward)
  - Validation: 50 new tests (URS completion checks, workflow sequencing)
  - Rollback: Partial (disable enforcement, keep data)
  
Test plan executed:
  - Existing data validated: Can existing facilities be revalidated? Yes (with guidance)
  - New data validated: New facilities must follow sequence? Yes (enforced)
  - Regression: No facility lost data? Correct (data intact, enforcement only)
  - Total: 50 tests, all passing
  
Approvals:
  - Bobby BIG (founder/compliance expert): Approved 2026-03-12 16:00 UTC
  - QA Lead: Approved 2026-03-12 15:45 UTC
  - Product Lead: Approved 2026-03-12 15:50 UTC

Released: v2.0.0

Release notes:
  - Breaking change: Validate URS before FRS (enforcement added)
  - Impact: Customers with incomplete URS must complete before proceeding
  - Migration: Existing data unaffected (backward compatible); new data enforced
  - GxP improvement: Validation lifecycle now guaranteed correct sequence
  - Rollback: v1.9.9 (disable enforcement, existing workflows still valid)
  - Rollback time: 30 minutes (impact analysis required)
```

---

## BOTTOM LINE

**Versioning is the interface between build and governance.**

Every release is classified, assessed, tested, approved, and rollback-validated before shipping. The version metadata tells the story: what changed, why, how it was tested, who approved it, and how to undo it if needed.

This is how regulated systems ship with confidence.

