# Universal GxP Facility Planner
## Regulatory Compliance Checklist (Build Standard)

**Document Created:** March 11, 2026  
**Standard:** ALL phases will be validated against current regulations  
**Methodology:** Expert team will CONSULT regulations during development (not post-hoc)  
**Owner:** the Team Lead (final approval on regulatory alignment)

---

## Regulatory Frameworks in Scope

### FDA (United States)
- **21 CFR 210** — General manufacture of drug products
- **21 CFR 211** — Current GMP requirements (validation, equipment qualification, training, documentation)
- **21 CFR Part 11** — Electronic records, electronic signatures
- **21 CFR 820** — Quality system regulation (medical devices)
- **FDA Guidance:** Process Validation (2011), CMC Post-Approval Changes (2020)

### EMA (European Union)
- **Annex 1** — Manufacture of sterile medicinal products
- **Annex 11** — Computer systems (validation, security, data integrity)
- **Annex 15** — Qualification and validation
- **EMA Guideline on Process Validation** (2014)
- **EU GMP Volumes 4 & 5** — Supporting guidance

### ICH (International)
- **ICH Q1A–Q1F** — Stability testing
- **ICH Q2(R2)** — Validation of analytical procedures
- **ICH Q3** — Impurities
- **ICH Q6** — Specifications
- **ICH Q7** — Good manufacturing practice
- **ICH Q8(R2)** — Pharmaceutical development
- **ICH Q9(R1)** — Quality risk management
- **ICH Q10(R1)** — Pharmaceutical quality system
- **ICH Q11** — Development of biotechnology-derived pharmaceuticals
- **ICH Q12** — Technical and regulatory considerations for pharmaceutical products

### Other
- **PIC/S** (Pharmaceutical Inspection Co-operation Scheme) standards
- **WHO TRS** (Technical Report Series) recommendations
- **ISO 13485** — Medical devices quality management systems
- **ISO 14644** — Classification of air cleanliness
- **GAMP 5** — Good Automated Manufacturing Practice (system validation)
- **Data Integrity (ALCOA+):** Attributability, Legibility, Contemporaneity, Originality, Accuracy, plus Completeness & Consistency

---

## Regulatory Requirements by Build Phase

### Phase 1a: Supabase Schema + RLS

**Regulatory Standards:**
- **21 CFR Part 11 (Electronic Records):** Records must be authentic, attributable, legible
- **Annex 11 (LIMS/EDMS Requirements):** Data security, audit trails, access control
- **ALCOA+ Data Integrity:** System must ensure data cannot be altered undetectably

**Build Requirements:**
✅ Every table includes: `created_at`, `created_by`, `updated_at`, `updated_by`  
✅ Audit log table tracks ALL changes (INSERT, UPDATE, DELETE) with user attribution  
✅ RLS (Row-Level Security) enforces tenant + role-based access  
✅ No direct table access without RLS policy  
✅ Timestamps use UTC (immutable)  
✅ Soft deletes where appropriate (data never truly deleted, marked as archived)  
✅ Hash verification for critical data (test results, approvals)  

**Regulatory Review Checklist:**
- [ ] Audit logs are immutable (database-level enforcement)
- [ ] No user can modify their own audit trail
- [ ] RLS policies prevent cross-tenant data access
- [ ] Encryption at rest (Supabase built-in)
- [ ] Encryption in transit (TLS 1.2+)

---

### Phase 1b: Facility + Validation Engines

**Regulatory Standards:**
- **21 CFR 211.192 (Validation):** Validation lifecycle (URS → FRS → DS → IQ/OQ/PQ)
- **Annex 15 (Qualification & Validation):** Phase requirements, acceptance criteria, protocol/report structure
- **GAMP 5:** System validation approach (Business, System, Software, Hardware)
- **ICH Q9 (Risk Management):** Risk-based validation (design space, control strategy)

**Build Requirements:**
✅ URS Phase:
  - Requirement traceability ID (REQ-001, REQ-002, etc.)
  - Source regulation (e.g., "21 CFR 211.42 — Design + capacity")
  - Acceptance criteria (measurable)
  - Requirement type (functional, operational, performance)

✅ Validation Lifecycle:
  - FRS → DS → IQ/OQ/PQ → VSR (7-phase structure per FDA/EMA)
  - Each phase has entry + exit criteria
  - Phase cannot advance until previous phase approved
  - Traceability matrix: Requirement → Test → Result

✅ Test Protocol Requirements:
  - Acceptance criteria tied to URS
  - Risk assessment per test (impact if it fails)
  - Test data (representative of actual use)
  - Statistical acceptance (e.g., "3 consecutive successful batches")

✅ Results Reporting:
  - Test setup documented
  - Actual results vs. acceptance criteria
  - Deviations (if any) with justification
  - Executive summary (pass/fail)
  - Signatures + dates

**Regulatory Review Checklist:**
- [ ] Lifecycle follows 21 CFR 211.192 + Annex 15 requirements
- [ ] Traceability matrix is 100% (every URS → at least one test)
- [ ] Test protocols include acceptance criteria tied to regulations
- [ ] Results show that acceptance criteria were met
- [ ] No deviations without documented justification

---

### Phase 2a: Risk + Readiness Engines

**Regulatory Standards:**
- **ICH Q9 (Quality Risk Management):** Identify → Analyze → Evaluate → Control → Review
- **FDA Risk-Based Validation Guidance:** Risk score determines validation scope
- **Annex 1 (CCS):** Contamination control strategies tied to identified risks

**Build Requirements:**
✅ Risk Register:
  - Risk ID (RISK-001, etc.)
  - Risk description (what could go wrong)
  - Regulatory consequence (what does FDA/EMA say about this?)
  - Likelihood (1–5: rare to certain)
  - Severity (1–5: minor to critical)
  - Risk Score (L × S)
  - Risk Category (High/Medium/Low based on score + regulatory importance)
  - Mitigation action + owner + deadline
  - Verification evidence (how you proved it was mitigated)

✅ Readiness Scoring:
  - Tracks completion of all validation phases
  - Alerts if any critical phase is lagging
  - Predicts inspection readiness date (based on current velocity)
  - Flags schedule risk if forecast doesn't meet target release date

✅ Regulatory Alignment:
  - High-risk items must have documented mitigation
  - Risk residual score (after mitigation) must be acceptable
  - All risks tied to regulations they come from

**Regulatory Review Checklist:**
- [ ] Risk register follows ICH Q9 approach
- [ ] High-risk items have documented controls + verification
- [ ] Residual risks are acceptable (justification documented)
- [ ] Risk mitigation is tracked to completion
- [ ] Readiness forecast is mathematically sound

---

### Phase 2b: Document Lifecycle + Change Control

**Regulatory Standards:**
- **21 CFR Part 11:** Electronic signatures, authorization, record retention
- **Annex 11:** Change control, access controls, audit trails
- **21 CFR 211.25(b):** SOPs must exist + be followed
- **21 CFR 211.188:** Batch records must be reviewed + approved

**Build Requirements:**
✅ Document Lifecycle:
  - Version control (0.1 draft → 1.0 released → 2.0 revised)
  - Status tracking (Draft → Review → QA → Approval → Released → Superseded)
  - Approval chain (who signs off + when)
  - Signature blocks (name, title, date + timestamp)
  - Regulatory mapping ("This SOP implements 21 CFR 211.25")
  - Retention schedule (e.g., "Retain for 5 years post-supersede")
  - Archive (old versions never deleted, marked archived + non-current)

✅ Electronic Signatures:
  - Unique user ID (not shared login)
  - Timestamp (server-side, immutable)
  - Intent to sign (explicit action)
  - Cannot be repudiated (user logged their signature)

✅ Change Control:
  - CR (Change Request) number + date
  - Description of change + reason
  - Impact assessment (validation? training? revalidation?)
  - Approval chain based on risk level
  - Implementation verification + sign-off
  - Trending (monthly: how many CRs? average time-to-close?)

**Regulatory Review Checklist:**
- [ ] Electronic signatures meet 21 CFR Part 11 requirements
- [ ] Audit trail shows who approved what + when
- [ ] Change control process prevents uncontrolled changes
- [ ] Document versioning prevents ambiguity about "which version is current?"
- [ ] Retention policies are documented + followed

---

### Phase 3: UI/UX + Accessibility

**Standards:**
- **WCAG 2.1 Level AA:** Web accessibility (keyboard navigation, screen readers, color contrast)
- **HIPAA:** If used in healthcare settings, data must be protected
- **Design Best Practices:** Professional, intuitive, reduces user error

**Build Requirements:**
✅ Accessibility:
  - Color contrast ≥ 4.5:1 (AA standard)
  - All form inputs have labels
  - Keyboard navigation (Tab, Enter, Escape work throughout)
  - Screen reader compatible (semantic HTML, ARIA labels)
  - Mobile responsive (works on phone, tablet, desktop)

✅ Data Entry:
  - Input validation (prevents invalid data entry)
  - Error messages are clear + actionable
  - Confirmation before destructive actions
  - Auto-save (prevents loss of data)
  - Undo/revise before submit

✅ Workflow Design:
  - Approval steps are clear (approvers know what they're approving)
  - Sign-off confirmation (user sees what they're signing)
  - Workflow status is visible (where are we in the process?)
  - Audit trail visible (user can see history + who did what)

✅ Professional Polish:
  - Consistent spacing, typography, color
  - Smooth transitions (not jarring)
  - Loading states (user knows something is happening)
  - Error states (clear communication of problems)
  - Success states (confirmation of actions)

**Regulatory Review Checklist:**
- [ ] UI prevents user error (validation, confirmation, undo)
- [ ] Approval workflows are clear + auditable
- [ ] Data cannot be lost due to navigation
- [ ] Accessibility standards met (WCAG 2.1 AA)

---

## Build Process: Regulatory Integration

**During each phase, the Expert Team will:**

1. **Consult Current Regulations**
   - Read relevant FDA/EMA/ICH guidance
   - Document which regulation each feature satisfies
   - Validate against current (2026) standards, not outdated practices

2. **Code Review for Compliance**
   - Every module must have a comment linking to the regulation it implements
   - Example:
     ```typescript
     // ICH Q9: Risk scoring (Likelihood × Severity)
     // Must follow: FDA Risk-Based Validation Guidance (2011)
     function calculateRiskScore(likelihood, severity) {
       return likelihood * severity;
     }
     ```

3. **Audit Trail Validation**
   - Every data change is logged with user attribution
   - Audit logs are reviewed for completeness + immutability
   - Test: "Can user X modify the audit log?" Answer must be NO.

4. **Weekly Compliance Review**
   - Bobby (or nominated QA expert) reviews that week's code
   - Asks: "Is this consistent with regulations?"
   - Approves before proceeding to next phase

---

## Regulatory Compliance Checkpoints

### Gate 1 (End of Phase 1a): Database + RLS
**Questions:**
- [ ] Are audit logs immutable?
- [ ] Can data be modified without leaving a trace?
- [ ] Is RLS enforced at database level (not application level)?
- [ ] Are old records preserved (never truly deleted)?

### Gate 2 (End of Phase 1b): Validation Lifecycle
**Questions:**
- [ ] Does 7-phase structure match 21 CFR 211.192?
- [ ] Is traceability 100% (every URS → at least one test)?
- [ ] Can any phase advance without completing previous phase?
- [ ] Are test results linked to acceptance criteria?

### Gate 3 (End of Phase 2a): Risk Management
**Questions:**
- [ ] Is risk scoring per ICH Q9?
- [ ] Are high-risk items controlled + verified?
- [ ] Is readiness forecast mathematically sound?
- [ ] Are risks tied to regulations they come from?

### Gate 4 (End of Phase 2b): Document Control
**Questions:**
- [ ] Do electronic signatures meet 21 CFR Part 11?
- [ ] Is change control preventing uncontrolled changes?
- [ ] Are documents versioned correctly + never deleted?
- [ ] Is audit trail complete + immutable?

### Gate 5 (End of Phase 3): UI/UX
**Questions:**
- [ ] Is the interface intuitive + professional?
- [ ] Can workflows be completed without user error?
- [ ] Are approval steps clear + auditable?
- [ ] Does it meet accessibility standards (WCAG 2.1 AA)?

---

## Regulatory Documentation (Deliverables)

**By end of Week 7, you'll have:**

1. **Regulatory Mapping Document**
   - Every feature → regulation it satisfies
   - Coverage analysis (which regulations are covered? which are future work?)
   - Gaps identified + remediation plan

2. **Compliance Checklist**
   - Signed-off by Bobby or nominated QA expert
   - Confirms all gates passed

3. **Audit Trail Report**
   - Sample audit log showing immutability
   - Evidence that RLS works correctly
   - Test results showing no unauthorized access

4. **Code Documentation**
   - Every module comments regulation it implements
   - GitHub repo is inspection-ready

---

## Bobby's Role in Regulatory Compliance

**You will:**
- Approve each phase before proceeding (regulatory + quality)
- Review code samples to ensure quality + compliance
- Nominate a QA expert (if needed) to sign off
- Confirm that polish matches standard

**I will:**
- Implement according to regulations
- Document regulatory alignment
- Flag any regulatory gaps or questions
- Request clarification if regulation is ambiguous

---

## Summary

**$350 budget INCLUDES regulatory compliance + polish.**

**You will receive:**
1. ✅ Highest-level code (no shortcuts, no debt)
2. ✅ Fully compliant with FDA/EMA/ICH/ISO standards
3. ✅ Polished UI (beautiful, intuitive, professional)
4. ✅ Audit-ready (inspection-ready from day 1)
5. ✅ Documented regulatory alignment

**No compromises. No cutting corners. Highest standard from day one.**

---

**Ready to start Monday morning. Awaiting Supabase + GitHub credentials.**
