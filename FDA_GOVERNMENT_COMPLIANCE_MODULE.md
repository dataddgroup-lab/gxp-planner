# FDA & Government Compliance Module
**Authoritative Reference: Federal Requirements Embedded in App**

**Status:** LOCKED - Mandatory Reference for All Build & Runtime  
**Source:** FDA.gov guidance documents + 21 CFR Part 210/211 + CBER requirements  
**Scope:** Site opening, CGMP, quality systems, inspection readiness  
**Integration:** Every phase of FACILITY_OPENING_WORKFLOW.md enforces one or more of these requirements

---

## FEDERAL REQUIREMENTS HIERARCHY

**The legal stack (federal → state → local):**

```
Product Type Decision Tree
├─ DRUGS (21 CFR 210/211 CGMP)
│  ├─ Commercial manufacturing (full CGMP)
│  ├─ IND manufacturing (21 CFR 312 + CGMP)
│  └─ Clinical trial materials (investigational controls)
├─ BIOLOGICS (21 CFR 600 series)
│  ├─ Plasmapheresis (CBER requirements)
│  ├─ Cell/Gene Therapy (CBER-specific)
│  ├─ Vaccines (CBER requirements)
│  └─ Monoclonal Antibodies (CBER requirements)
├─ DEVICES (21 CFR 807 + 820)
│  ├─ Class I (general controls)
│  ├─ Class II (general + special controls)
│  └─ Class III (PMA pathway)
└─ COMBINATION PRODUCTS (Drug + Device)
   ├─ Primary mode determines primary regulation
   ├─ Both CFR 210/211 + 820 apply
   └─ Special CMC requirements

FOUNDATIONAL (All Products)
├─ 21 CFR 210/211 (CGMP) ← Highest Authority
│  ├─ Facility Design & Construction
│  ├─ Equipment & Utilities
│  ├─ Manufacturing Process Validation
│  ├─ Quality Assurance & Testing
│  ├─ Personnel & Training
│  ├─ Records & Documentation
│  └─ Inspection Readiness
├─ FDA Guidance Documents ← Interpretation & Implementation
│  ├─ Equipment Identification & Qualification
│  ├─ Process Validation
│  ├─ Environmental Monitoring
│  ├─ Analytical Method Validation
│  ├─ Sterile & Non-Sterile Manufacturing
│  ├─ Computer Systems Validation
│  └─ Post-Market Surveillance
└─ State & Local Laws ← Foundation
   ├─ Building Codes
   ├─ Environmental Permits
   ├─ Water & Waste Systems
   ├─ Electrical & Plumbing Codes
   └─ Occupational Safety
```

**In GxP Planner: Every level is enforced by product type.**

---

## PHASE 0: FACILITY REGISTRATION & SITE APPROVAL

### Requirement 1: FDA Site Registration (Federal)

**Federal Law:** 21 U.S.C. § 360 (Food & Drug Administration Act)

**What it requires:**
- New pharmaceutical manufacturing site must be registered with FDA
- Registration includes:
  - Company name and address
  - Facility name and address
  - Type of operations (manufacturing, testing, packaging, labeling, repackaging)
  - Product types manufactured
  - Contact person for regulatory correspondence

**What GxP Planner does:**
- Onboarding wizard collects registration info
- Auto-generates FDA Form 3537 (Establishment Registration)
- Validates state/local pharmacy board registration requirements
- Tracks registration submission deadline (must be registered BEFORE manufacturing)
- Sends customer FDA submission checklist

**Checkpoint in App:**
```
Phase 0, Step 1: Facility Registration
Status: [ ] Registered with FDA
        [ ] State pharmacy board registered
        [ ] Form 3537 submitted
        [ ] Confirmation letter received
Timeline: Must complete BEFORE equipment order
Evidence: Registration confirmation + letter
```

---

### Requirement 2: Site Selection & Infrastructure Compliance

**Federal Law:** 21 CFR 211.42 (Design and construction features)

**What it requires:**
- Building/site designed and constructed to suit pharmaceutical operations
- Adequate space for equipment, materials, personnel movement
- Design prevents contamination or cross-contamination
- Utilities (water, power, compressed air, vacuum) adequate and reliable
- Environmental controls (temperature, humidity) suitable for products
- No sources of contamination nearby (sewage, industrial pollutants)

**What GxP Planner does:**
- Site selection checklist (zoning, utilities, environmental assessment)
- Auto-looks up local building codes for customer's jurisdiction
- Validates utility capacity for facility scope
- Environmental impact assessment template
- State/local permitting roadmap

**Checkpoint in App:**
```
Phase 0, Step 2: Site Selection & Acquisition
Status: [ ] Zoning permits manufacturing
        [ ] Utilities adequate (water, power, compressed air)
        [ ] Environmental assessment complete
        [ ] No contamination sources identified
        [ ] Building code compliance confirmed (state-specific)
Timeline: Weeks 1–4
Evidence: Zoning confirmation, utility reports, environmental assessment
```

---

## PHASE 1: DESIGN & LAYOUT (21 CFR 211.42–211.50)

### Requirement 3: Facility Layout & Contamination Control

**Federal Law:** 21 CFR 211.42 (General requirements), 211.46 (Washing and toilet facilities), 211.50 (Lighting, ventilation, air handling)

**What it requires:**
- Layout designed to prevent contamination
- Separate areas for different manufacturing activities (material receipt, manufacturing, packaging)
- Cleanroom classifications per ISO 14644
- Unidirectional personnel and material flow
- Pressure differentials maintained (higher pressure in clean areas)
- Cleaning provisions in design
- Personnel hygiene facilities (bathrooms, hand washing, gowning areas)

**What GxP Planner does:**
- 2D layout tool with real-time compliance checking
- ISO 14644 cleanroom class validation (ISO 5/7/8)
- Pressure cascade enforcement (positive differentials verified)
- Unidirectional flow validation (material → equipment → waste)
- Personnel flow zones (dirty → Grade D → Grade C → ISO 5)
- Gowning area requirements (separate by product type)
- Cross-contamination risk scoring (ICH Q9)

**Checkpoint in App:**
```
Phase 1, Step 4: Facility Layout Design
Status: [ ] Layout designed per ISO 14644
        [ ] Cleanroom classification assigned
        [ ] Pressure cascades defined (±10 Pa tolerance)
        [ ] Unidirectional flow confirmed (material + personnel)
        [ ] Cross-contamination risks: [X Risk Items Identified]
        [ ] HVAC zones documented
        [ ] Gowning areas planned
        [ ] Utilities (water, power, air) routed
Timeline: Weeks 5–8
Evidence: Layout drawings, P&ID, contamination control strategy
Standards: 21 CFR 211.42, 211.50, ISO 14644, EMA Annex 1
```

---

### Requirement 4: HVAC, Utilities, Environmental Controls

**Federal Law:** 21 CFR 211.50 (Environmental controls and monitoring), 211.63 (Equipment design and suitability)

**What it requires:**
- HVAC system maintains temperature and humidity per product requirements
- Air handling prevents contamination (HEPA filters, air quality monitoring)
- Utilities (water, power, compressed air, vacuum) designed for reliability
- Environmental monitoring baseline established (ISO Class 5 = <3,520 particles >0.5µm per m³)
- Monitoring data trended (no excursions)
- Utilities qualified and validated

**What GxP Planner does:**
- HVAC specification template (air changes/hour, filtration, monitoring)
- Utility design spec (water purity, compressed air grade, power specs)
- Environmental monitoring plan (sampling locations, frequency, acceptance criteria)
- 30-day baseline monitoring tracker (required before production)
- Trend analysis & alert system (action level/alert level thresholds)

**Checkpoint in App:**
```
Phase 3, Step 11: HVAC & Utilities Commissioning
Status: [ ] HVAC air changes/hour verified
        [ ] Pressure differentials confirmed (±10 Pa)
        [ ] HEPA filter integrity certified
        [ ] Environmental baseline: 30-day monitoring
        [ ] Particle count: [X] particles >0.5µm (vs. <3,520 ISO 5 limit)
        [ ] Microbial: [X] CFU/m³ (vs. <1 CFU ISO 5 limit)
        [ ] Water system qualified & monitored
        [ ] Compressed air: grade confirmed
        [ ] Utilities: backup power tested
Timeline: 30–45 days
Standards: 21 CFR 211.50, ISO 14644 EM requirements
Evidence: Commissioning reports, EM baseline data, certification docs
```

---

## PHASE 2: EQUIPMENT PROCUREMENT & QUALIFICATION

### Requirement 5: Equipment Selection & Suitability (21 CFR 211.63)

**Federal Law:** 21 CFR 211.63 (Equipment design, size, location, and installation)

**What it requires:**
- Equipment suitable for its intended use
- Capacity adequate (not underutilized, not over-strained)
- Design and construction prevents contamination
- Accuracy and precision adequate for manufacturing and testing
- Equipment validated per IQ/OQ/PQ before use
- Maintenance and calibration program documented

**What GxP Planner does:**
- Equipment database: 500+ pharma equipment with cGMP attributes
- Suitability assessment tool (matches product to equipment class)
- Qualification plan generator (IQ/OQ/PQ protocols)
- Supplier vetting (quality certifications, references)
- Lead time tracking (critical path item)
- Calibration schedule setup

**Checkpoint in App:**
```
Phase 2, Step 6: Equipment Specification & Procurement
Status: [ ] Equipment type selected (suitability assessed per 21 CFR 211.63)
        [ ] Capacity adequate for scale
        [ ] Supplier quality certifications verified
        [ ] IQ/OQ/PQ plan generated
        [ ] Lead times confirmed (critical path tracked)
        [ ] Calibration schedule: annual
        [ ] Maintenance plan: documented
Timeline: Weeks 9–16
Standards: 21 CFR 211.63, FDA Equipment Guidance
Evidence: Equipment specs, supplier certs, qualification plans
```

---

## PHASE 3: VALIDATION LIFECYCLE (21 CFR 211.110 & 211.192)

### Requirement 6: Process Validation (IQ/OQ/PQ)

**Federal Law:** 21 CFR 211.110 (Validation of manufacturing processes)

**What it requires:**
- Manufacturing process validated before commercial use
- Three-phase approach:
  - **IQ (Installation Qualification):** Equipment installed per specification
  - **OQ (Operational Qualification):** Equipment operates per specification
  - **PQ (Performance Qualification):** Process produces consistent results
- Acceptance criteria defined before testing
- All data documented and traceability maintained
- Deviation investigation & closeout before release

**What GxP Planner does:**
- IQ protocol generator (equipment acceptance criteria)
- OQ protocol generator (operational parameter ranges)
- PQ protocol generator (typically 3 batches, in-process controls)
- Test result data capture (ALCOA+ compliant)
- Acceptance criteria validator (automatic pass/fail)
- Deviation & CAPA tracking
- Validation Summary Report (VSR) auto-compilation

**Checkpoint in App:**
```
Phase 4, Step 12–15: Validation Lifecycle (Non-Negotiable Sequence)
Status: [ ] IQ Complete & signed (serial numbers, installation certs)
        [ ] OQ Complete & signed (operating parameters verified)
        [ ] PQ Complete & signed (3+ batches, consistent results)
        [ ] Deviations: [X] investigated & closed
        [ ] VSR Complete & signed (all data traced to requirements)
Timeline: 12 weeks minimum
Standards: 21 CFR 211.110, FDA Process Validation Guidance
Evidence: IQ/OQ/PQ reports, VSR, batch records from qualification runs
Sequence: IQ → OQ → PQ (CANNOT skip or reverse)
```

---

## PHASE 4: QUALITY MANAGEMENT SYSTEM (21 CFR 211.20)

### Requirement 7: Quality Assurance & Testing

**Federal Law:** 21 CFR 211.20 (Management responsibility for quality), 211.192 (General requirements - testing)

**What it requires:**
- Quality management system (QMS) documented
- Quality assurance (QA) function with authority
- Quality control (QC) function for testing
- Standard operating procedures (SOPs) for all operations
- Records retention (typically 1 year past expiration date)
- Change control procedures
- Deviation/CAPA procedures

**What GxP Planner does:**
- QMS wizard (identifies required SOPs)
- SOP templates (manufacturing, QC, change control, deviation, training, maintenance)
- Document management (version control, approval, distribution)
- Training plan & records
- Change control tracker
- Deviation & CAPA log
- Audit readiness checklist

**Checkpoint in App:**
```
Phase 5, Step 16–18: Quality Management System
Status: [ ] QMS documented (quality policies, responsibilities)
        [ ] QA function established (authority, scope)
        [ ] QC function established (testing, release authority)
        [ ] SOPs written for all critical processes
        [ ] Training: all personnel trained & documented
        [ ] Change control: procedure established & tested
        [ ] Deviation: investigation procedure established
        [ ] Records: retention plan documented
Timeline: Weeks 25–40 (parallel with validation)
Standards: 21 CFR 211.20, 211.192
Evidence: QMS document, SOPs, training records, change log
```

---

### Requirement 8: Analytical Method Validation (ICH Q2(R2))

**Federal Law:** 21 CFR 211.192 (Testing and release for distribution)

**What it requires:**
- All analytical methods used in QC must be validated
- Validation per ICH Q2 parameters:
  - Specificity (method identifies target, not interference)
  - Linearity (accuracy over range)
  - Accuracy (recovery of known amounts)
  - Precision (repeatability & intermediate precision)
  - Range (upper & lower limits)
- Acceptance criteria defined before testing
- Results documented

**What GxP Planner does:**
- Method validation plan template (ICH Q2)
- Protocol generator (specificity, linearity, accuracy, precision tests)
- Test data entry forms
- Acceptance criteria validator
- Method validation report (formal document)
- Method suitability verification tracker

**Checkpoint in App:**
```
Phase 6, Step 20: Analytical Method Validation (QC Lab)
Status: [ ] Method validation plan: ICH Q2
        [ ] Specificity: confirmed
        [ ] Linearity: [X] points, R² = [X]
        [ ] Accuracy: [X]% recovery (acceptance: 90–110%)
        [ ] Precision: RSD = [X]% (acceptance: ≤2%)
        [ ] Range: [X] ppm to [X] ppm
        [ ] Method validation report: signed
Timeline: 4–8 weeks per method
Standards: ICH Q2(R2), 21 CFR 211.192
Evidence: Validation protocol + results + report
```

---

## PHASE 5: BATCH RECORDS & LOT RELEASE (21 CFR 211.188–211.194)

### Requirement 9: Batch Record & ALCOA+ Documentation

**Federal Law:** 21 CFR 211.188 (Batch production and control records)

**What it requires:**
- Complete batch record for every batch (ingredients, equipment, personnel, times, tests)
- Records show what was actually done (not what should have been done)
- Records signed and dated by personnel who performed work
- Electronic records (if used) must be ALCOA+ compliant:
  - **A**ttributable (who did it, when)
  - **L**egible (can read it)
  - **C**ontemporaneous (recorded during operation, not after)
  - **O**riginal (not copies)
  - **A**ccurate (correct data, no corrections without audit trail)
  - **+** Specification (system ensures data integrity)
- Records retained (typically 1 year past product expiration)

**What GxP Planner does:**
- Batch record template (all required fields)
- Electronic batch record system (enforces ALCOA+)
- Immutable audit trail (who changed what, when)
- Electronic signature implementation (timestamp + identity)
- Lot release workflow (all tests must pass before release)
- Batch record archive & retrieval

**Checkpoint in App:**
```
Phase 6, Step 19: Batch Record System
Status: [ ] Batch record template: complete (all fields)
        [ ] Electronic signature: implemented & tested
        [ ] Audit trail: immutable (no deletions, all changes logged)
        [ ] Test results: all linked to batch record
        [ ] Personnel identification: automatic (no anonymous entries)
        [ ] Lot release: QA approval required
        [ ] Archive: retention setup (1 year past expiration)
Timeline: Weeks 41–48+
Standards: 21 CFR 211.188, 21 CFR Part 11 (electronic records)
Evidence: Batch records, audit trail, lot release logs
```

---

## PHASE 6: CGMP COMPLIANCE & INSPECTION READINESS

### Requirement 10: General CGMP Compliance (21 CFR 210/211)

**Federal Law:** 21 CFR Parts 210 & 211 (Current Good Manufacturing Practice)

**Comprehensive Federal Requirements (mapped to GxP Planner modules):**

| Federal Requirement | Area | GxP Planner Module | Checkpoint | Applies To |
|-------------------|------|-------------------|-----------|-----------|
| **21 CFR 210/211** | CGMP Organization | QMS | Phase 5 | All drugs |
| **21 CFR 211.42** | Facility design, contamination | Layout + Commissioning | Phases 1–3 | All drugs |
| **21 CFR 211.50** | HVAC, utilities, utilities | HVAC + commissioning | Phase 3 | All drugs |
| **21 CFR 211.63** | Equipment suitability | Equipment database | Phases 2–3 | All drugs |
| **21 CFR 211.110** | Process validation (IQ/OQ/PQ) | Validation lifecycle | Phase 4 | All drugs |
| **21 CFR 211.188** | Batch records & lot release | Batch record system | Phase 6 | All drugs |
| **21 CFR 600** | Biologics | QMS + CBER specific | Phase 5 | Biologics only |
| **21 CFR 807.85** | Device registration/listing | Device registration | Phase 0 | Devices + Combos |
| **21 CFR 820** | Device quality system | Device QMS | Phases 2–6 | Devices + Combos |
| **21 CFR 4.4** | Combination products | Dual pathway tracking | Phase 0 | Combos only |
| **21 CFR 312.20** | IND CMC submission | IND CMC templates | Phase 0 | INDs only |
| **21 CFR 312.23** | IND manufacturing controls | IND validation tracks | Phases 4–6 | INDs only |
| **ICH Q2(R2)** | Analytical method validation | Method validation | Phase 6 | All drugs |
| **ICH Q9** | Risk management | Risk assessment | Phase 2a | All products |
| **ICH Q13** | Continuous manufacturing | Advanced mfg (Wave 2) | Post-launch | Advanced only |

**What GxP Planner does:**
- CGMP compliance checklist (100+ items, linked to regulations)
- Readiness dashboard (% complete, blockers identified)
- Pre-inspection mock audit (simulates FDA investigator perspective)
- Compliance documentation package (organized, inspection-ready)
- Regulatory citation tool (every item links to specific CFR)

**Checkpoint in App:**
```
Phase 6, Step 24: FDA PreCheck & PAI Readiness
Status: [ ] CGMP compliance: [95%] complete
        [ ] All documentation: organized & current
        [ ] All personnel: trained & current on training
        [ ] All equipment: qualified & maintained
        [ ] All processes: validated & documented
        [ ] All batches: released per procedure
        [ ] All testing: methods validated
        [ ] All records: retained per retention plan
        [ ] PreCheck eligibility: assessed
        [ ] Type V DMF: auto-generated & ready
        [ ] Mock audit: [X] findings (all minor)
Timeline: Weeks 41–48 (readiness phase)
Standards: 21 CFR 210/211 (complete)
Evidence: Compliance package (all docs, policies, records)
```

---

## FDA GUIDANCE DOCUMENTS REFERENCED IN APP

**GxP Planner links FDA guidance to specific phases:**

| Guidance | URL | Phase | Topic |
|----------|-----|-------|-------|
| Equipment Identification & Qualification | FDA.gov | Phase 2–3 | Equipment selection, IQ/OQ/PQ |
| Process Validation | FDA.gov | Phase 4 | Validation lifecycle approach |
| Environmental Monitoring | FDA.gov | Phase 3 | EM baseline, alert/action levels |
| Analytical Method Validation | ICH Q2 | Phase 6 | QC method development |
| Cleaning Validation | FDA.gov | Phase 5 | Equipment cleaning procedures |
| Change Control | FDA.gov | Phase 5 | Managing facility changes |
| Computer Systems Validation | 21 CFR Part 11 | Phases 1–6 | Electronic records, ALCOA+ |
| Pharmaceutical cGMPs for the 21st Century | FDA.gov | All | Modern best practices |
| Post-Market Surveillance | FDA.gov | Phase 6 | Customer complaint tracking |

**In-app links:** Every guidance reference is clickable, auto-opens FDA.gov documentation.

---

## CBER-SPECIFIC REQUIREMENTS (If Manufacturing Biologics)

**Federal Law:** 21 CFR 600 series (Biologics regulation)

**If customer manufactures biologics:**

### Requirement 11: CBER-Specific Design & Operations

**What it requires (if biologics):**
- Plasmapheresis facility specific requirements (if collecting plasma)
- Cell processing facility specific requirements (if manufacturing cell products)
- Biological product license application (BLA) requirements
- Investigational product controls (IND manufacturing)
- Master cell bank & working cell bank characterization
- Adventitious agent testing

**What GxP Planner does:**
- Product type selector (identifies if biologics involved)
- CBER-specific SOP templates (if biologics selected)
- Cell bank characterization plan (if applicable)
- BLA readiness checklist (if pursuing BLA)
- Master file preparation (Type II - for cell lines, antigens, etc.)

**Checkpoint in App:**
```
Phase 0, Step 3: Product Type & Regulatory Pathway
Status: [ ] Product type: Biologics (triggers CBER requirements)
        [ ] Specific category: [Plasmapheresis / Cell therapy / Vaccine / Other]
        [ ] Cell banking: [Required / Not required]
        [ ] Master file strategy: decided
        [ ] CBER-specific docs: roadmap created
Timeline: Week 1
Standards: 21 CFR 600 series, FDA CBER Guidance
Evidence: Product classification, regulatory pathway decision
```

---

## INSPECTION READINESS: THE FINAL CHECKPOINT

### Requirement 12: FDA Inspection Preparedness (Mandatory by Law)

**Federal Law:** 21 U.S.C. § 704 (Authority to inspect)

**What FDA can do:**
- Inspect any manufacturing facility without notice
- Review all documentation, batch records, training records
- Observe operations, test product
- Issue Form 483 (list of observations)
- Issue Warning Letter (if serious violations)
- Seek injunction or seizure (if product unsafe)

**What GxP Planner does (Inspection Readiness):**
- Mock audit (simulates FDA investigator scrutiny)
- Document readiness checklist (100+ items)
- Key files organized (quick retrieval)
- Regulatory correspondence file
- CAPA status (all open issues resolved or tracked)
- Personnel training records (current, up-to-date)
- Batch records (complete, traceable, signed)
- Environmental monitoring data (trends reviewed)

**Checkpoint in App:**
```
Phase 6, Step 24: FDA Inspection Readiness
Status: [ ] Mock audit complete: [X] findings
        [ ] All findings: corrected or mitigated
        [ ] Documentation: organized, retrievable
        [ ] Key personnel: available for interview
        [ ] Facility tour: ready (clean, organized)
        [ ] Batch record system: operational, ALCOA+ verified
        [ ] EM data: trending normal, no excursions
        [ ] Training: all personnel current
        [ ] Equipment: maintenance current, no outstanding issues
        [ ] Type V DMF: complete & submitted (if PreCheck)
Timeline: Final week before anticipated FDA visit
Evidence: Mock audit report, readiness checklist (100% pass)
Confidence: Inspection-ready
```

---

## 21 CFR PART 807: DEVICE ESTABLISHMENT REGISTRATION & LISTING

**Applies if:** Manufacturing medical devices or combination products (drug + device)

### Requirement 13: Device Establishment Registration (21 CFR 807.85)

**Federal Law:** 21 CFR Part 807 (Establishment registration and device listing)

**What it requires:**
- Every device manufacturing facility must register with FDA
- Registration includes:
  - Company name, address, manufacturing site
  - Contact person for regulatory communications
  - Device types manufactured (product list, FDA classification)
  - Responsible person (must be present on-site or available)
- Annual re-registration required
- Updates within 30 days of changes

**What GxP Planner does (if product type = device or combo):**
- Product type selector triggers device pathway
- Device registration form generator (FDA Form 2891)
- Classification lookup (Class I/II/III per device type)
- Annual renewal tracking (sends reminder 60 days before expiration)
- Responsible person validation (role + authority)

**Checkpoint in App:**
```
Phase 0, Step 1b: Device Registration (if applicable)
Status: [ ] Device type identified + classified (Class I/II/III)
        [ ] FDA Form 2891 generated
        [ ] Registered with FDA
        [ ] Responsible person designated
        [ ] Annual re-registration: [date]
Timeline: Must complete BEFORE manufacturing
Standards: 21 CFR 807.85
Evidence: Device registration confirmation letter
```

---

### Requirement 14: Quality System for Devices (21 CFR 820)

**Federal Law:** 21 CFR Part 820 (Quality System Regulation)

**What it requires:**
- Device manufacturers must have documented quality system
- Elements include:
  - Management responsibility + authority
  - Design control (if applicable)
  - Document controls
  - Production + process controls (equivalent to CGMP)
  - Equipment, utilities, facilities (same as drug CGMP)
  - Personnel training
  - Identification + traceability
  - Production + process validation
  - Acceptance criteria & testing
  - Nonconforming product procedures
  - Corrective/preventive actions (CAPA)
  - Labeling & packaging controls
  - Handling, storage, distribution
  - Records management
  - Complaint files + medical device reporting (MDR)

**What GxP Planner does (if device manufacturing):**
- QMS generator for device-specific SOPs
- Design control templates (if new device)
- Production process validation (similar to drug validation)
- Device-specific testing protocols
- Complaint tracking + MDR reporting procedures
- Traceability system (device serial numbers, batch linkage)

**Checkpoint in App:**
```
Phase 5, Step 16: Device Quality System (if applicable)
Status: [ ] QMS established per 21 CFR 820
        [ ] Design control: [complete / not applicable]
        [ ] Production & process controls: validated
        [ ] Acceptance criteria: defined & met
        [ ] Complaint file: system established
        [ ] MDR reporting: procedure in place
Timeline: Weeks 25–40 (parallel with validation)
Standards: 21 CFR 820 (complete quality system)
Evidence: Device QMS documentation
```

---

### Requirement 15: Combination Products (Drug + Device)

**Federal Law:** 21 CFR 4.4 (Determination by primary mode of action)

**What it requires (if both drug + device components):**
- FDA determines primary mode of action (drug or device?)
- Both 21 CFR 210/211 (CGMP) AND 21 CFR 820 (Device QS) apply
- All requirements for both pathways must be met
- Special CMC section required (Chemistry, Manufacturing & Controls)
- Labeling must address both components
- Post-market surveillance for both components

**What GxP Planner does (if combination product detected):**
- Product type: "Combination (Drug + Device)" triggers dual pathway
- Dual compliance roadmap (both 210/211 + 820)
- CMC section templates (manufacturing for both components)
- Labeling review checklist (both drug + device aspects)
- Dual audit readiness (both pathways)

**Checkpoint in App:**
```
Phase 0, Step 2: Combination Product Classification
Status: [ ] Product type: Combination (Drug + Device)
        [ ] Primary mode of action: [Drug / Device]
        [ ] Both CGMP (210/211) + Device QS (820) required
        [ ] Dual pathway compliance roadmap: created
        [ ] CMC section: covers both components
        [ ] Labeling: addresses both drug + device claims
Timeline: Week 1 (determines entire pathway)
Standards: 21 CFR 4.4 (primary mode), 210/211 + 820
Evidence: Combination product determination letter (if obtained from FDA)
```

---

## 21 CFR PART 312: INVESTIGATIONAL NEW DRUG (IND) MANUFACTURING

**Applies if:** Manufacturing investigational products for clinical trials

### Requirement 16: IND Application & CMC (21 CFR 312.20)

**Federal Law:** 21 CFR Part 312 (Investigational New Drug Application)

**What it requires:**
- Before clinical trials begin, company must submit IND application to FDA
- IND includes chemistry, manufacturing & controls (CMC) section
- CMC for IND is less detailed than NDA but must show drug can be made reliably
- Includes:
  - Drug substance (synthesis, characterization, controls, stability)
  - Drug product (formulation, manufacturing process, controls, stability)
  - Analytical methods (must be validated)
  - Environmental assessment (if applicable)
  - Previous human experience (if available)

**What GxP Planner does (if product type = IND):**
- Product type selector triggers IND pathway
- IND CMC templates (drug substance + drug product sections)
- Analytical method validation plan (ICH Q2 for early development)
- Stability protocol (ICH Q1A, abbreviated for IND)
- Manufacturing process summary (simplified for early phase)
- Chemistry & controls submission checklist (FDA requirements)

**Checkpoint in App:**
```
Phase 0, Step 3: Investigational Product (IND) Pathway
Status: [ ] Product type: Investigational (IND)
        [ ] IND CMC section: development plan created
        [ ] Drug substance: characterization plan
        [ ] Drug product: formulation documented
        [ ] Analytical methods: validation plan
        [ ] Stability: protocol (abbreviated for IND)
        [ ] IND submission target: [date]
Timeline: Week 1
Standards: 21 CFR 312.20 (CMC content), ICH Q2/Q1A
Evidence: IND CMC draft sections
```

---

### Requirement 17: IND Manufacturing Controls (21 CFR 312.23)

**Federal Law:** 21 CFR 312.23 (CMC in IND for early-phase manufacturing)

**What it requires:**
- IND manufacturing has relaxed controls vs. commercial CGMP
- BUT must ensure safety, identity, strength, quality, purity
- Typical controls for early IND:
  - Process description (may be less detailed than NDA)
  - In-process controls (simplified, not full process validation)
  - Finished product specifications (simplified test panel)
  - Stability data (may be ongoing during clinical trials)
  - Batch records (CGMP compliant, ALCOA+)
  - Changes to CMC require notification to FDA (if significant)
- As trials progress (Phase II → Phase III), controls become stricter
- By NDA submission, full CGMP required

**What GxP Planner does (if IND manufacturing):**
- IND-specific CGMP templates (lighter than commercial but compliant)
- Phase-based escalation (Phase I → Phase II → Phase III controls increase)
- In-process control templates (simplified for early phase)
- Finished product test panels (Phase I minimal, Phase III comprehensive)
- Manufacturing change notification checklist (when to notify FDA)
- Transition plan to full CGMP (when moving to commercial)

**Checkpoint in App:**
```
Phase 4, Step 12–15: IND-Phase Manufacturing Validation
Status: [ ] Manufacturing process: documented (IND-appropriate)
        [ ] In-process controls: Phase [I/II/III] level
        [ ] Finished product specs: Phase [I/II/III] appropriate
        [ ] Batch records: ALCOA+ compliant
        [ ] Stability: ongoing per IND protocol
        [ ] CMC changes: FDA notification plan
        [ ] Phase escalation: timeline & control increases
Timeline: Varies by clinical phase
Standards: 21 CFR 312.23 (IND CMC controls)
Evidence: IND manufacturing documentation, batch records, FDA correspondence
Escalation: Full CGMP (210/211) required for NDA/BLA submission
```

---

### Requirement 18: IND Compliance vs. NDA Compliance (Escalation Path)

**Federal Law:** 21 CFR 312 (IND) vs. 21 CFR 314/601 (NDA/BLA)

**Key difference:**
- **IND phase:** Relaxed controls, ongoing development
- **NDA/BLA phase:** Full CGMP, locked controls, commercial standards
- **Transition point:** When moving from clinical trials to commercial launch

**What GxP Planner does (if transitioning from IND → NDA/BLA):**
- Escalation tracker (automatic Phase III → NDA transition)
- Control tightening checklist (Phase III CGMP gaps → Phase IV full CGMP)
- Process validation upgrade (Phase III validation → Phase IV commercial)
- Stability upgrade (Phase III ongoing → Phase IV long-term data)
- CMC update template (for NDA/BLA submission)
- Full CGMP readiness checkpoint

**Checkpoint in App:**
```
Transition: IND → NDA/BLA (When Clinical Efficacy Proven)
Status: [ ] Phase III CGMP controls: complete
        [ ] Full CGMP gaps identified: [X items]
        [ ] Equipment validation: Phase III adequate? (may need PQ upgrade)
        [ ] Process validation: Phase III adequate? (may need scale-up validation)
        [ ] Stability data: Phase III sufficient? (may need long-term data)
        [ ] CMC update: drafted for NDA/BLA
        [ ] Regulatory pathway: IND → NDA/BLA decided
Timeline: ~6-12 months before NDA/BLA submission
Standards: 21 CFR 312 (IND) → 21 CFR 314/601 (NDA/BLA)
Evidence: Comparative CMC documentation, validation reports
Critical: No surprises at FDA review (escalation done properly)
```

---

## BOTTOM LINE: FEDERAL REQUIREMENTS ARE EMBEDDED

**GxP Planner doesn't just track facility opening. It enforces federal law.**

Every module (equipment, layout, validation, quality, records) is tied to specific federal requirements (21 CFR 210/211, FDA guidance, CBER specifics).

**Customer never asks:** "Are we compliant with FDA requirements?"
**Customer knows:** "The system won't let us proceed until we are."

---

## INTEGRATION WITH FACILITY OPENING WORKFLOW

**How this module connects:**

```
FACILITY_OPENING_WORKFLOW.md (24 customer-facing steps)
             ↓ (powered by)
FDA_GOVERNMENT_COMPLIANCE_MODULE.md (federal requirements)
             ↓ (enforces)
UNIVERSAL_GXP_FACILITY_GUIDANCE.md (FDA/EMA/ICH/ISPE standards)
             ↓ (structured by)
CHANGE_CONTROL_SYSTEM.md (versioning & approval gates)
             ↓ (monitored by)
In-App Compliance Dashboard (real-time proof of compliance)
             ↓ (delivers)
Type V DMF Auto-Generated (FDA PreCheck submission package)
             ↓ (results in)
Inspection-Ready Facility (customer prepared for FDA visit)
```

---

## DOCUMENTS REFERENCED

**Primary:**
- 21 CFR Parts 210 & 211 (Current Good Manufacturing Practice)
- 21 CFR Part 600 (Biologics)
- 21 CFR Part 11 (Electronic Records)

**FDA Guidance (FDA.gov):**
- Equipment Identification & Qualification
- Process Validation (General Principles)
- Environmental Monitoring
- Analytical Procedures & Methods Validation
- Cleaning Validation
- Change Control
- Computer Systems Validation

**ICH Guidelines:**
- ICH Q2(R2) — Analytical Method Validation
- ICH Q7 — Good Manufacturing Practice for Active Ingredients
- ICH Q8 — Pharmaceutical Development
- ICH Q9 — Risk Management
- ICH Q10 — Pharmaceutical Quality System

**Regulatory Framework:**
- 21 U.S.C. § 360 (Establishment Registration)
- 21 U.S.C. § 704 (Authority to Inspect)
- EMA Annex 1, 11, 15 (EU requirements)
- ISPE Baseline Guides (industry best practices)

---

## INSPECTOR'S PERSPECTIVE: HOW FDA SEES IT

**When FDA inspector arrives:**

```
"I'm here to verify you're manufacturing safely and that your product is pure, potent, and labeled correctly. I'll review:

1. Organization & Personnel (Who's in charge? Are they trained?)
2. Buildings (Is it clean? Can you prevent contamination?)
3. Equipment (Is it suitable? When was it qualified?)
4. Utilities (Is water safe? Is air clean?)
5. Production (Are processes validated? Can you prove consistency?)
6. Testing (Are methods validated? Are tests reliable?)
7. Warehousing (Is product stored correctly? Is EM data good?)
8. Records (Do batch records exist? Are they complete & signed?)

If I see gaps in any category, I'll ask questions. If patterns emerge (not one gap but many), I'll issue Form 483. If gaps are serious (patient safety risk), I'll recommend action."
```

**GxP Planner's job:** Make sure inspector finds no gaps.

---

**LOCKED. FEDERAL REQUIREMENTS EMBEDDED IN EVERY PHASE OF CUSTOMER JOURNEY.**

