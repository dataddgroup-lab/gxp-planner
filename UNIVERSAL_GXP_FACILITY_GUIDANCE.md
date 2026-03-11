# Universal GxP Facility Guidance Module
**Mandatory Enforcement at Build Time & Runtime**

**Status:** LOCKED - Applies to All Agents, All Modules, All Workflows  
**Scope:** App build, runtime, consultant workflows, schemas, data models, documents  
**Enforcement:** Non-negotiable, inspection-ready by design  
**Authority:** FDA 21 CFR 210/211, EMA GMP Annex 1/15/11, ICH Q2/Q9/Q10/Q12, ISPE Baseline Guides

---

## MANDATORY MODULE

**This module is not optional. It is enforced at build time and runtime.**

### What This Means

Every agent building GxP Planner MUST comply with these rules:
- ✅ Every line of code must be inspection-ready
- ✅ Every schema must enforce ALCOA+
- ✅ Every workflow must support GMP lifecycles
- ✅ Every output must be regulatory-aligned
- ✅ No simplifications, no creative reinterpretations, no deviations

### What Agents Cannot Do

- ❌ Generate facility layouts that violate GMP flow
- ❌ Create data models that break ALCOA+
- ❌ Produce workflows without validation logic
- ❌ Omit required regulatory elements
- ❌ Generate content that is not inspection-ready

---

## GLOBAL COMPLIANCE RULES

**All outputs MUST align with:**
- FDA 21 CFR 210/211 (U.S. cGMP)
- EMA GMP Annex 1 & 15 (European GMP)
- PIC/S Guidance (Pharmaceutical Inspection Co-operation Scheme)
- WHO Technical Report Series (Global standards)
- ICH Q2, Q9, Q10, Q12 (International harmonization)
- ISPE Baseline Guides 1–7 (Industry best practices)
- ISO 14644 (Cleanroom classification)
- USP/EP/BP (Pharmacopeial standards)

**All decisions MUST be:**
- Risk-based (ICH Q9: identify, analyze, control, review)
- Lifecycle-based (ICH Q10: design → build → qualify → operate → continuous improvement)
- Evidence-based (GAMP 5: testing, traceability, validation)
- ALCOA+-aligned (Attributable, Legible, Contemporaneous, Original, Accurate + Alterable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Equipment functionality, FISH)

---

## FACILITY DESIGN RULES

**All facility design outputs MUST enforce:**

### Cleanroom Classification (ISO 14644)
- ✅ ISO Class 5 (Grade A): Critical aseptic operations
  - Air changes: ≥20/hour (HVAC validated)
  - Pressure: Positive (monitored, alarmed)
  - Personnel: Grade C gowning (trained, qualified)
  - Monitoring: Continuous (air, surface, personnel)

- ✅ ISO Class 7 (Grade B): Support areas
  - Air changes: ≥15/hour
  - Pressure: Positive (relative to non-cleanroom)
  - Personnel: Grade C/D gowning
  - Monitoring: Daily (air, surface)

- ✅ ISO Class 8 (Grade C): Ante-rooms, buffer areas
  - Air changes: ≥12/hour
  - Pressure: Positive (cascade maintained)
  - Personnel: Grade D gowning
  - Monitoring: Daily

### Contamination Control Strategy (Annex 1)
- ✅ Unidirectional personnel flow (no backtracking)
- ✅ Unidirectional material flow (raw → production → packaging → quarantine)
- ✅ Segregation of incompatible materials (potent compounds, biologics, hazardous)
- ✅ Environmental controls (HVAC, temperature, humidity, lighting)
- ✅ Surface finish (stainless steel, epoxy, coved joints in cGMP areas)
- ✅ Segregation for non-GMP or lower-grade areas (separate HVAC, drains, personnel)

### Utilities & Systems (ISPE Baseline 4)
- ✅ Purified Water (PW): Source → distribution → sampling → testing
- ✅ Water for Injection (WFI): Distillation or RO → storage → distribution
- ✅ Clean Steam: Boiler → distribution → use (not for product contact unless validated)
- ✅ Compressed Air: Compressor → drying → filtration → distribution
- ✅ Vacuum: Pump → condensate trap → filter → distribution
- ✅ All utilities: Validated, monitored, maintenance documented

### HVAC & Pressure Cascades
- ✅ Pressure differential: ISO 5 > ISO 7 > ISO 8 > non-cleanroom
- ✅ Differential: Minimum ±10 Pa (monitored, alarmed if deviation)
- ✅ Air supply: HEPA filtered (H14, 99.995% @ 0.3µm)
- ✅ Air exhaust: HEPA filtered before release
- ✅ Gowning progression: Dirty → Grade D → Grade C → ISO 5 (unidirectional)

### Environmental Monitoring (EM)
- ✅ Air particulate: Baseline established, action/alert levels set
- ✅ Microbial air: Daily during operations (ISO 5), weekly (ISO 7/8)
- ✅ Surface microbial: Weekly (ISO 5), monthly (ISO 7/8)
- ✅ Personnel microbial: Monitoring hands/garments
- ✅ Data traceability: All EM results linked to batch/equipment
- ✅ Trending: EM data analyzed for drift, nonconformances investigated

### Commissioning & Qualification (ISPE Baseline 5)
- ✅ DQ: Design meets GMP requirements (documented)
- ✅ IQ: Equipment installed per specification (certificates, photos, serial numbers)
- ✅ OQ: Equipment operates per specification (performance tests, acceptance criteria)
- ✅ PQ: Equipment performs consistently (3+ consecutive batches, within specifications)
- ✅ PV: Process produces consistent, safe product (stability, in-process controls)

---

## MANUFACTURING RULES

**All manufacturing logic MUST enforce:**

### Equipment Qualification
- ✅ User Requirements Specification (URS): Define equipment functionality
- ✅ Design Qualification (DQ): Equipment design meets URS
- ✅ Installation Qualification (IQ): Equipment installed correctly
- ✅ Operational Qualification (OQ): Equipment operates within range
- ✅ Performance Qualification (PQ): Consistent performance under use
- ✅ Validation Summary Report (VSR): Evidence of compliance

### Batch Records (ALCOA+)
- ✅ Attributable: Who made entry? (user ID, timestamp, role)
- ✅ Legible: Format clear, no erasures, all changes documented
- ✅ Contemporaneous: Recorded at time of action (not reconstructed)
- ✅ Original: Electronic records protected per 21 CFR Part 11
- ✅ Accurate: No speculation, verified against source data
- ✅ Complete: All required fields present, no gaps
- ✅ Consistent: Same terminology, units, formats
- ✅ Enduring: Readable for retention period
- ✅ Equipment functionality: System validates critical parameters automatically
- ✅ FISH (Freedom From Interference System Health): System integrity verified

### Process Validation
- ✅ Process Validation Master Plan (PVMP): Approach, scope, responsibilities
- ✅ PV Phase 1 (Retrospective): Historical data reviewed (if available)
- ✅ PV Phase 2 (Prospective): 3+ batches manufactured at scale, sampled, tested
- ✅ PV Phase 3 (Continued): Post-validation monitoring, annual trend review
- ✅ Process parameters: CPPs identified, monitored, controlled
- ✅ In-process controls: Acceptance criteria defined, results documented
- ✅ Finished product testing: Multiple lots, multiple time points

### Deviation Management
- ✅ Deviation detected: Logged immediately with date, time, description
- ✅ Deviation classification: Major, minor, critical
- ✅ Investigation: Root cause analysis, impact assessment
- ✅ CAPA: Corrective action, preventive action, verification
- ✅ Closure: Rationale documented, records retained

### Change Control
- ✅ Change identified: Description, reason, affected areas
- ✅ Risk assessment: Impact on quality, safety, compliance
- ✅ Implementation plan: Steps, responsibilities, timeline
- ✅ Validation: Testing, qualification, data collection
- ✅ Approval: Sign-off by Quality Assurance
- ✅ Communication: Training, SOP updates, personnel notification

### Cleaning Validation
- ✅ Cleaning procedure defined: Equipment, chemistry, cycles, time
- ✅ Worst-case scenario: Worst residue, longest holdover time
- ✅ Acceptance limits: AQL (Acceptance Quality Limit) per FDA guidance
- ✅ Sampling: Multiple locations, pre and post-cleaning
- ✅ Testing: Residue confirmation (HPLC, ATP, etc.)
- ✅ Revalidation: Annual or after major change

---

## QC LAB RULES

**All QC lab logic MUST enforce:**

### Analytical Method Validation (ICH Q2)
- ✅ Specificity: Method distinguishes analyte from impurities
- ✅ Linearity: Response proportional to concentration (R² ≥0.999)
- ✅ Accuracy: Recovery 98–102% (or ±appropriate %RSD)
- ✅ Precision: Intra-day and inter-day ≤2% RSD (or acceptable range)
- ✅ Range: Minimum and maximum concentration tested
- ✅ Robustness: Method insensitive to minor variations
- ✅ System suitability: Defined criteria verified before each use

### Instrument Qualification (USP <1058>)
- ✅ OQ: Performance confirmed per operating range
- ✅ PQ: Consistency verified under actual use conditions
- ✅ Maintenance: Preventive schedule defined, records maintained
- ✅ Calibration: Frequency, standards, traceability documented
- ✅ Qualification status: Visible, updated upon completion

### Data Integrity (ALCOA+)
- ✅ CDS (Chromatography Data System): Audit trail locked, user access RBAC
- ✅ LIMS (Lab Information Management System): Electronic signatures, change tracking
- ✅ MODA (Modular Optics Data Acquisition): Equipment-to-system integration verified
- ✅ MES (Manufacturing Execution System): Real-time data capture, traceability to batch
- ✅ Backups: Daily, off-site, restore tested
- ✅ Disaster recovery: RTO/RPO defined, tested annually

### Sample Management
- ✅ Chain of custody: Sample receipt, storage, testing, retention documented
- ✅ Storage: Environmental controls maintained (temperature, humidity, light)
- ✅ Stability: Holding time limits established, verified
- ✅ Retention: Samples retained per regulation (usually 1 year past expiration)
- ✅ Disposal: Method documented, records maintained

### Stability Program (ICH Q1)
- ✅ Long-term: Typically 12 months (±5%), quarterly testing
- ✅ Intermediate: 9 months (±5%), if applicable
- ✅ Accelerated: 6 months (25±5°C/60±5% RH), monthly testing
- ✅ Protocol: Parameters, acceptance criteria, failure definition
- ✅ Analysis: Data evaluated, shelf-life recommended
- ✅ Ongoing: Commitment to continued monitoring post-approval

---

## BIOLOGICS-SPECIFIC RULES

**All biologics workflows MUST enforce:**

### Annex 2 & 21 CFR 600–680
- ✅ Cell bank management: Master Cell Bank (MCB), Working Cell Bank (WCB) characterized
- ✅ Viral clearance: Strategy defined, testing completed
- ✅ Aseptic processing: Personnel training, EM baseline, media fill
- ✅ Bioreactor: Control strategy (pH, DO, temp, agitation), in-process monitoring
- ✅ Filtration: Integrity testing (bubble point, water intrusion), validation
- ✅ Chromatography: Column qualification, buffer composition, yield/purity

### Adventitious Agent Testing
- ✅ Mycoplasma: Detection method, frequency
- ✅ Bacteria/fungi: Culture methods, frequency
- ✅ Viruses: Species-appropriate testing
- ✅ Endotoxins: LAL testing (if applicable)

---

## VALIDATION RULES

**All validation logic MUST enforce:**

### GAMP 5 & CSA (Compliant Software Architecture)
- ✅ URS (User Requirements Spec): What facility must do
- ✅ FS (Functional Spec): How requirements will be met
- ✅ DS (Design Spec): Detailed design, architecture, system components
- ✅ IQ: Installation confirmed per specification
- ✅ OQ: Operational parameters within specification
- ✅ PQ: Consistent performance under use
- ✅ PV: Process/system produces compliant results
- ✅ Traceability matrix: Every requirement traced to design, test, result

### Lifecycle Requirements
- ✅ URS → FRS (no gaps, bidirectional traceability)
- ✅ FRS → DS (all functions designed, documented)
- ✅ DS → IQ/OQ/PQ (qualification validates design)
- ✅ IQ/OQ/PQ → VSR (evidence compiled, compliance statement)
- ✅ Periodic review: Annual revalidation, triggered by change/deviation

### Revalidation Logic
- ✅ Trigger: Change, deviation, equipment age, regulatory update
- ✅ Scope: Assess impact; determine if partial or full revalidation needed
- ✅ Data: Use historical data if valid; supplement with new data if needed
- ✅ Approval: Documented, retested, closure recorded

---

## DATA INTEGRITY RULES (ALCOA+)

**All data models and workflows MUST enforce:**

### Attributability
- ✅ Every data point: User ID, timestamp, role
- ✅ All changes: Before/after values, reason for change, approver
- ✅ Electronic signature: Per 21 CFR Part 11 (meaning, intent, uniqueness)

### Legibility
- ✅ Format: Clear, consistent, readable
- ✅ Storage: Permanent medium (not erasable, not temporary)
- ✅ Rendering: System displays original + audit trail

### Contemporaneity
- ✅ Timing: Data recorded at time of action
- ✅ No reconstruction: Historical data marked as such
- ✅ Clock: System time synchronized, drift monitored

### Originality
- ✅ Protection: Original data encrypted, access controlled
- ✅ Copies: Certified copies per 21 CFR 11.65(b)
- ✅ Authenticity: Digital signature, hash verification

### Accuracy
- ✅ Verification: Data checked against source (batch record vs. instrument)
- ✅ Validation: System logic verified (calculations, conversions)
- ✅ Limits: Range checks, outlier flagging

### Completeness
- ✅ Required fields: Cannot be blank (enforced)
- ✅ Mandatory data: All GMP-required data captured
- ✅ Supporting documentation: Attachments, comments, approvals

### Consistency
- ✅ Terminology: Standardized across system
- ✅ Units: Conversion logic verified
- ✅ References: Traceability links maintained

### Endurance
- ✅ Retention: Data stored for regulatory period (usually 3+ years)
- ✅ Readability: Format remains readable over time
- ✅ Media: Migration plan if format becomes obsolete

### Equipment Functionality
- ✅ Critical parameters: System monitors automatically
- ✅ Alarms: Deviation triggers notification
- ✅ Proof: Data integrity verified by system health checks

### FISH (Freedom From Interference System Health)
- ✅ System availability: Uptime monitored, maintenance logged
- ✅ Data protection: Backups, restore tested
- ✅ Security: Access logs, unauthorized access prevented

---

## DOCUMENTATION RULES

**All documents MUST enforce:**

### SOP Structure
- ✅ Purpose: Why this procedure?
- ✅ Scope: When, where, who applies this?
- ✅ Responsibilities: Who does what?
- ✅ Procedure: Step-by-step instructions, decision points
- ✅ Records: What documents/forms result from this procedure?
- ✅ Revision history: Changes tracked, approved

### Forms & Logs
- ✅ ALCOA+ enforcement: All fields required, audit trail enabled
- ✅ Version control: Form version linked to SOP version
- ✅ Approval: Signature/electronic signature required
- ✅ Retention: Filing location, retention period specified

### Reports
- ✅ Objective: Data presented without bias
- ✅ Rationale: Conclusions explained with evidence
- ✅ Risk assessment: Impact on quality, safety, compliance evaluated
- ✅ Traceability: References to source data, supporting documentation
- ✅ Approval: Sign-off by appropriate authority

---

## CONSULTANT INTEGRATION RULES

**All consultant workflows MUST enforce:**

### First-Class Actor Status
- ✅ RBAC: Consultants assigned roles with explicit permissions
- ✅ Audit trail: All consultant actions logged with timestamp, role, rationale
- ✅ Workflow: Consultant proposes → Internal approval → Consultant implements
- ✅ Segregation: Critical decisions reserved for internal staff

### Constraint Enforcement
- ✅ Cannot override: Regulatory constraints enforced even for consultants
- ✅ Must propose: Changes routed through change control (not bypassed)
- ✅ Must document: Rationale for every recommendation recorded
- ✅ Must follow: Same strict-mode rules as all agents

### Data Access
- ✅ Read: Assigned areas only
- ✅ Write: Proposal mode, requires approval
- ✅ Confidentiality: Segregation of sensitive data (e.g., product formula)
- ✅ Retention: Consultant access revoked upon engagement end

---

## NON-NEGOTIABLES

**These rules cannot be bent, reinterpreted, or omitted:**

- ❌ No facility layouts that violate GMP flow (unidirectional)
- ❌ No data models that break ALCOA+ (audit trail, attributability)
- ❌ No workflows without validation logic (test, qualification, verification)
- ❌ No missing regulatory elements (required documents, approvals, records)
- ❌ No content that is not inspection-ready (audit-ready by design)

**Violation consequence:**
- Code review: Rejected
- Build gate: Blocked
- Runtime: System prevents action
- Audit: Non-conformance logged

---

## ENFORCEMENT AT BUILD TIME

**Every agent generating code, schema, workflow, or document MUST:**
1. Check this module
2. Verify alignment with applicable rules
3. Document compliance in code comments
4. Submit for review (all critical elements must pass)

**Build pipeline gates:**
- Schema: ALCOA+ enforced? Yes/No
- Workflow: Validation logic present? Yes/No
- Document: Inspection-ready format? Yes/No
- Procedure: GMP structure present? Yes/No

---

## ENFORCEMENT AT RUNTIME

**The app MUST:**
1. Inherit all constraints from this module
2. Prevent actions that violate rules
3. Log all violations
4. Alert users when constraints are approached/violated
5. Provide clear guidance on compliant path forward

**Example:**
- Rule: "Batch records MUST be ALCOA+"
- App enforcement: User cannot submit batch record without timestamp, user ID, signature
- App alert: "Batch record incomplete. Missing fields: Operator signature, equipment ID."
- App guidance: "Complete these fields before you can submit."

---

## COMPLIANCE VERIFICATION

**Before delivery (Week 14 gate), verify:**
- ✅ All facility layouts comply with ISO 14644 + GMP contamination rules
- ✅ All data models enforce ALCOA+ (audit trail, access control, encryption)
- ✅ All workflows include validation logic (URS→FRS→DS→IQ/OQ/PQ→VSR)
- ✅ All documents follow GMP structure (purpose, scope, procedure, records)
- ✅ All consultant features respect constraints (no override, all logged)
- ✅ App prevents violations at runtime (no way to skip required fields/approvals)

**Audit readiness check:**
- Can FDA inspect this app? YES/NO
- Is every action documented? YES/NO
- Is every change justified? YES/NO
- Is every decision evidenced? YES/NO
- Is every user tracked? YES/NO

**If any NO: Not ready for delivery.**

---

## BOTTOM LINE

**GxP Planner is not just a facility planner. It's a regulatory discipline system.**

All code, all schemas, all workflows, all documents, all user actions enforce these rules by design. The app does not suggest compliance. It enforces compliance.

This module is the source of truth. Follow it strictly. Deviation is not permitted.

---

**LOCKED. MANDATORY. INSPECTION-READY BY DESIGN.**

