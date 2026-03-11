# cGMP Technical Requirements for GxP Planner
**FDA 21 CFR 210/211 + ICH Q7/Q8/Q9/Q10/Q13 Implementation**

**Last Updated: 2026-03-11 16:03 MDT**

---

## REGULATORY FOUNDATION

**FDA Requirements (21 CFR Parts 210/211):**
- Facility design & layout (prevent contamination, unidirectional flow)
- Cleanroom classifications (ISO 5/7/8 with HVAC)
- Aseptic processing (personnel hygiene, airlocks, environmental monitoring)
- Testing & lab controls (IQ/OQ/PQ validation, in-process controls)
- Documentation (comprehensive audit trail per 21 CFR Part 11)

**ICH Guidelines (Global Harmonization):**
- Q7: Good Manufacturing Practice for APIs
- Q8(R2): Pharmaceutical Development ("Quality by Design")
- Q9: Quality Risk Management
- Q10: Pharmaceutical Quality System (PQS)
- Q13: Continuous Manufacturing

---

## MODULE-BY-MODULE CGMP REQUIREMENTS

### Module 1: Equipment Specification Engine

**What FDA/ICH Requires:**
- Equipment must be suitable for the drug/product being manufactured
- Equipment specifications must include all parameters critical to quality
- Equipment qualification plan (IQ/OQ/PQ) must be defined upfront
- Equipment maintenance procedures documented

**What GxP Planner Must Capture:**

#### Equipment Database
**Required Attributes (per equipment type):**

| Equipment Type | Critical Attributes | cGMP Relevance |
|---|---|---|
| **HPLC** | Column size, flow rate, pressure range, detector type | Analytical method validation per 21 CFR 211.194 |
| **Fermentation Vessel** | Volume, control systems (temp/pH/DO), jacket type | Batch process control per 21 CFR 211.110 |
| **Freeze Dryer** | Shelf area, vacuum system, condenser capacity | Sterile product processing per 21 CFR 211.42 |
| **Filling Machine** | Speed, fill volume accuracy, environmental control | Aseptic processing per 21 CFR 211.42 |
| **Sterilizer (Autoclave)** | Type (gravity/vacuum), load capacity, chamber size | Sterilization validation per 21 CFR 211.63 |
| **Water System (WFI/PW)** | Type (distillation/reverse osmosis), storage, flow | Utility system validation per 21 CFR 211.63 |
| **HVAC System** | Air changes/hour, filter type (HEPA), pressure differential | Environmental control per 21 CFR 211.42(b) |
| **CIP/SIP System** | Flow rates, temperatures, chemical concentrations | Cleaning validation per 21 CFR 211.67 |

**Equipment Suitability Assessment:**
- ✅ Equipment suitable for [drug substance/product type]?
- ✅ Equipment meets [required capacity]?
- ✅ Equipment has [required controls] for [critical process parameters]?
- ✅ Equipment can achieve [required accuracy/resolution]?

**Qualification Plan:**
- IQ approach: Installation documentation, hardware verification
- OQ approach: Performance testing under specified conditions
- PQ approach: Three consecutive successful batches (or equivalent)
- Acceptance criteria: Performance must be within ±X% (defined per equipment)

**Lead Time Tracking:**
- Equipment delivery timeline
- Equipment qualification timeline (typically 8–12 weeks)
- Impact on overall facility readiness forecast

---

### Module 2: Layout Design Tool

**What FDA/ICH Requires:**
- Facility designed to prevent contamination (aseptic processing per 21 CFR 211.42)
- Unidirectional material flow (no backtracking)
- Unidirectional personnel flow (gowning/degowning progression)
- Logical sequence of operations (raw material → production → packaging → quarantine)
- Cleanroom classification per ISO 14644 (ISO 5/7/8 for sterile products)
- Adequate air handling & environmental controls (21 CFR 211.42(b))

**What GxP Planner Must Enforce:**

#### Facility Zoning Rules
**Production Areas (Sterile):**
- ISO Class 5 (Aseptic Processing): HPLC, filling machines, isolators
  - Air changes: ≥20/hour (high risk operations)
  - Pressure differential: Positive (prevent ingress of contamination)
  - Personnel: Gowned (grade C), entered via ISO 7 area
  - Environmental monitoring: Continuous (air, surface, personnel)
  - Access: Single-pass gowning, no backtracking

- ISO Class 7 (Support Area): Weighing, preparation, quality checks
  - Air changes: ≥15/hour
  - Pressure differential: Positive (relative to non-cleanroom)
  - Personnel: Gowned (grade C)
  - Environmental monitoring: Daily (air, surface)

- ISO Class 8 (Ante-room/Buffer): Gowning area, secondary containment
  - Air changes: ≥12/hour
  - Pressure differential: Positive (relative to non-cleanroom)
  - Personnel: Gowned (grade D)
  - Environmental monitoring: Daily

**QC/Testing Lab:**
- Environmental controls: Stable temperature (20–25°C), humidity (35–65%)
- Lighting: Adequate (≥500 lux) per 21 CFR 211.46
- No contamination risk to sensitive tests
- Segregation from production (prevent interference)

**Quality Unit:**
- Independent location (no direct access from production)
- Secure sample storage (temperature/humidity controlled)
- Documentation: Batch records, test results, COAs

**Support Areas:**
- Raw material storage (segregated by status: released/quarantine/reject)
- Waste storage (segregated, secure)
- Personnel facilities (separate entry, proper gowning sequence)
- Equipment maintenance areas (segregated from production)

#### Contamination Prevention Rules (System Enforcement)
**Rule 1: Unidirectional Flow**
- ✅ Material entry → Production → Packaging → Quarantine (no reverse)
- ✅ Personnel gown progression: Street clothes → Grade D → Grade C → Production
- ❌ Block: Production area adjacent to raw material storage (contamination risk)
- ❌ Block: Personnel shortcut between zones (bypass gowning)

**Rule 2: Pressure Differentials**
- ✅ ISO 5 > ISO 7 > ISO 8 > non-cleanroom (positive cascade)
- ✅ Environmental monitoring confirms pressure maintained
- ❌ Block: ISO 7 adjacent to higher contamination area without airlocks

**Rule 3: Surface Materials**
- ✅ Production/QC areas: Stainless steel, epoxy, smooth (easy to clean)
- ✅ No porous materials (harbor microbes)
- ✅ Coved wall-to-floor joints (prevent dust accumulation)
- ❌ Block: Particle-board, unsealed drywall in cleanroom areas

**Rule 4: Utility Segregation**
- ✅ WFI/PW systems: Segregated, dedicated lines, no cross-contamination
- ✅ Drain systems: Separated (non-contact drainage, no backflow)
- ✅ Air supply: Filtered (HEPA, bacteria/endotoxin removal)
- ❌ Block: Shared drain between production and non-GMP areas

**Rule 5: HVAC Validation**
- ✅ Air changes per hour specified (and tracked)
- ✅ Filter types (HEPA) and change intervals defined
- ✅ Pressure differential monitored (alarms for deviation)
- ✅ Environmental monitoring program (air particulate, microbial, surface)

---

### Module 3: Validation Lifecycle Orchestration

**What FDA/ICH Requires (21 CFR 211.25 + ICH Q8/Q10):**
- Validation Master Plan (approach, scope, responsibilities)
- Design Qualification (DQ): Facility designed per requirements
- Installation Qualification (IQ): Equipment installed per specifications
- Operational Qualification (OQ): Equipment operates as specified
- Performance Qualification (PQ): Consistent performance under actual use conditions
- Validation Summary Report (VSR): Evidence of compliance

**What GxP Planner Must Orchestrate:**

#### Phase Sequencing (Non-Negotiable Order)
1. **URS (User Requirements Spec)** → Define what facility must do
   - FDA requirement: 21 CFR 211.20(b) (facilities must be designed to GMP)
   - ICH Q8: Quality by Design (build quality in from start)
   - Output: 150+ requirements (equipment, layout, utilities, QC, training)

2. **FRS (Functional Requirements Spec)** → Define how URS will be met
   - FDA requirement: Design Qualification (equipment, facility design)
   - ICH Q10: PQS elements (control strategy, risk management)
   - Output: 150+ functional specs (equipment selected, layout designed, risks assessed)

3. **Design Specification (DS)** → Detailed design documents
   - Equipment datasheets, P&IDs, facility layout drawings
   - Installation procedures, qualification protocols
   - Output: Design Specification package (reviewed/approved)

4. **Installation Qualification (IQ)** → Verify equipment installed correctly
   - Equipment serial numbers, installation certificates
   - Calibration certificates, functional checks
   - Output: IQ report (equipment ready for testing)

5. **Operational Qualification (OQ)** → Verify equipment operates as specified
   - Performance testing under specified conditions
   - Critical parameters validated within ±5% (typical acceptance)
   - Output: OQ report (equipment operational)

6. **Performance Qualification (PQ)** → Verify consistent performance under use
   - Three consecutive successful batches (or minimum required)
   - Process parameters monitored, in-process controls passed
   - Environmental monitoring data (if sterile product)
   - Output: PQ report (equipment performing consistently)

7. **Validation Summary Report (VSR)** → Overall validation evidence
   - Links: URS ↔ FRS ↔ DS ↔ IQ/OQ/PQ ↔ Risk assessment ↔ Test results
   - Conclusion: "Facility validated per 21 CFR 211 and ICH Q8/Q10"
   - Output: VSR (submitted to FDA for PreCheck approval)

#### Validation Lifecycle Traceability
**Every requirement must be traced:**
- URS Req 1 → FRS Spec 1 → DS Doc 1 → IQ Test 1 → OQ Test 5 → PQ Test 12 → VSR Section 3.1
- If any link missing → Gap in validation → FDA will flag in PreCheck/PAI review

**GxP Planner enforces:**
- ✅ URS complete before FRS starts (no assumption gaps)
- ✅ FRS complete before equipment purchased (prevents over-spec)
- ✅ DS complete before IQ starts (nothing installed without approved spec)
- ✅ IQ complete before OQ starts (can't test if not installed)
- ✅ OQ complete before PQ starts (can't use if not operational)
- ✅ PQ complete before VSR written (can't declare validation without data)
- ✅ VSR complete before PAI (must have proof ready)

---

### Module 4: Risk Management Engine (ICH Q9)

**What ICH Q9 Requires:**
- Systematic process for risk assessment (identify, analyze, control, review)
- Document all identified risks
- Define mitigations for each risk
- Verify mitigations effective (evidence)
- Review risk management regularly

**What GxP Planner Must Track:**

#### Risk Categories (ICH Q9 Approach)
**Quality Risk Assessment (Severity × Probability):**

| Risk Category | Example | Severity | Probability | Priority | Mitigation |
|---|---|---|---|---|---|
| **Contamination** | Microbial ingress in ISO 5 area | High (product loss) | Medium (uncontrolled HVAC) | Critical | HVAC validation + environmental monitoring |
| **Mix-up** | Wrong batch in production | High (patient safety) | Low (controls in place) | High | RFID tracking + electronic batch records |
| **Equipment Failure** | HPLC detector malfunction mid-batch | High (batch failure) | Medium (age/use) | High | Preventive maintenance + spare parts |
| **Process Deviation** | Temperature excursion in fermentation | Medium (batch quality) | Medium (control drift) | Medium | Alarm systems + operator training |
| **Data Integrity** | Lost/altered batch records | High (regulatory risk) | Low (21 CFR Part 11 controls) | High | Audit trail + user access controls |
| **Personnel Competency** | Unqualified operator performs QC test | High (test validity) | Low (training required) | Medium | Initial + refresher training records |

#### Risk Mitigation Tracking
**For each risk:**
1. **Identified Risk:** What could go wrong?
2. **Risk Score:** Severity (1–5) × Probability (1–5) = Risk Score (1–25)
3. **Mitigation:** What control prevents/detects this risk?
4. **Mitigation Evidence:** What proves mitigation works?
   - Design Specification (equipment suitable)
   - Installation Qualification (equipment installed correctly)
   - Operational Qualification (equipment operates correctly)
   - Performance Qualification (equipment performs consistently)
   - Environmental Monitoring (contamination detected)
   - Personnel Training Records (operator competency)
5. **Residual Risk:** After mitigation, is risk acceptable?
6. **Review Schedule:** When re-assess risk?

#### Risk-Driven Validation
**GxP Planner insight:** Risk assessment drives validation scope.

Example:
- **Risk:** "Contamination in ISO 5 area due to HVAC failure"
- **Mitigation:** HVAC system qualified per specifications
- **Validation Scope:**
  - IQ: HVAC installed per spec (filters, ducting, sensors)
  - OQ: Air changes, filter efficiency, pressure differential verified
  - PQ: Environmental monitoring confirms cleanliness maintained
  - Evidence: HVAC OQ report, environmental monitoring SOP, 30-day baseline data

---

### Module 5: Readiness Forecasting

**What FDA PreCheck Requires:**
- Facility design phase timeline (Weeks X–Y)
- Equipment procurement & lead times (Weeks X–Y)
- Construction/installation phase (Weeks X–Y)
- Validation phase (Weeks X–Y)
- Pre-approval inspection readiness (Week X)

**What GxP Planner Must Track:**

#### Critical Path Analysis
**Example Facility Timeline:**

```
Week 1–2:    Design approved (URS/FRS finalized)
Week 3–4:    Equipment ordered (considering lead times)
Week 5–8:    Construction (facility built, HVAC installed)
Week 9–10:   Equipment installation (IQ protocols executed)
Week 11–12:  Equipment operational testing (OQ protocols executed)
Week 13–14:  Process validation (PQ protocols executed)
Week 15–16:  Environmental monitoring baseline (30 days minimum)
Week 17–18:  Validation Summary Report written + approved
Week 19:     PreCheck submission / PAI readiness

Critical Path Item: Equipment lead time (often longest)
- If equipment lead time = 12 weeks, and procurement delayed 4 weeks
- Then entire timeline slips 4 weeks (16-week facility vs. 19-week)
```

#### Milestone Tracking (PreCheck Phases)
**Facility Readiness Phase (PreCheck Phase 1):**
- Milestone 1: Design approved (URS/FRS finalized)
- Milestone 2: Equipment selected (specifications locked)
- Milestone 3: Facility construction started
- Milestone 4: Equipment installed (IQ complete)
- FDA checkpoint: "Approved to proceed to validation"

**Application Submission Phase (PreCheck Phase 2):**
- Milestone 5: Equipment qualified (OQ complete)
- Milestone 6: Process validated (PQ complete)
- Milestone 7: Environmental baseline established (if sterile product)
- Milestone 8: VSR written + approved
- FDA checkpoint: "Approved for PAI / Ready for drug application"

#### Velocity Tracking
**Question:** "How fast are we progressing toward readiness?"

- Week 1: URS 0% → 50% complete (velocity: +50% per week)
- Week 2: URS 100% → FRS 40% complete (velocity: URS done, FRS starting)
- Week 4: FRS 100% → Equipment ordered
- Week 12: OQ complete → PQ starting
- Week 18: VSR complete → Facility ready

**Drift Detection:**
- Plan: Equipment delivery Week 8
- Actual: Equipment delayed to Week 12 (4-week slip)
- Impact: Facility readiness now Week 23 (not Week 19)
- Early warning: Adjust timeline, notify stakeholders

---

### Module 6: Compliance Dashboard

**What FDA Expects (PreCheck + PAI):**
- Proof of compliance with 21 CFR 210/211
- Proof of compliance with ICH Q8/Q9/Q10
- Proof of validation (URS/FRS/DS/IQ/OQ/PQ/VSR)
- Proof of quality system (procedures, training, change control)
- Proof of environmental monitoring (if sterile product)
- Proof of personnel competency (training records)

**What GxP Planner Must Display (Real-Time):**

#### Compliance Status Card
```
FACILITY COMPLIANCE STATUS
═══════════════════════════════════════

21 CFR Part 210/211:
  Design Requirements ✅ (100% satisfied)
  Equipment Qualification ⚠️ (80% complete - OQ in progress)
  Environmental Monitoring ✅ (Baseline complete)
  Personnel Training ✅ (100% trained + current)

ICH Guidelines:
  Q7 (API Manufacturing) N/A (small molecule)
  Q8 (Quality by Design) ✅ (URS/FRS/DS locked)
  Q9 (Risk Management) ⚠️ (90% complete - residual risks under review)
  Q10 (Quality System) ✅ (SOPs drafted, in review)
  Q13 (Continuous Manufacturing) N/A (batch mode)

Validation Lifecycle:
  URS ✅ (v1.0 approved)
  FRS ✅ (v1.0 approved)
  DS  ✅ (approved)
  IQ  ✅ (approved)
  OQ  ⚠️ (HPLC in progress, 2 of 3 equipment complete)
  PQ  ⏳ (not started, begins Week 15)
  VSR ⏳ (will generate Week 18)

Environmental Monitoring:
  Air Particulate ✅ (ISO 5: 100 particles <0.5µm at baseline)
  Microbial ✅ (30-day baseline: 0 CFU detected)
  Surface ✅ (Swab tests: <100 CFU per plate)

Test Results:
  Total Tests: 847
  Passing: 847 (100%)
  Failing: 0
  Coverage: 88%
  Last Run: 2026-03-11 15:30 UTC

Audit Trail:
  Immutable: YES ✓
  Tamper-proof: YES ✓
  21 CFR Part 11 Compliant: YES ✓

FACILITY READINESS: 82% (Ready for PAI Week 19)
═══════════════════════════════════════
```

#### Downloadable Reports (For FDA Submission)
- Compliance Verification Report (what standards we meet)
- Validation Summary Report (complete evidence)
- Equipment Qualification Report (all equipment qualified)
- Environmental Monitoring Summary (baseline + trending)
- Personnel Training Matrix (who trained, when, on what)
- Change History (what changed, why, approved by whom)
- Risk Register (all identified risks, mitigations, residual status)

---

## BUILD TEAM GUIDANCE: Module Implementation

### Phase 2b: Equipment Database (Weeks 7–8)
**cGMP Requirements to Validate:**
- ✅ Equipment types cover all pharma manufacturing scenarios (lab, small molecule, biologics, sterile)
- ✅ Equipment attributes include all critical quality parameters
- ✅ Equipment suitability assessment criteria match 21 CFR 211.63
- ✅ Qualification plan templates match IQ/OQ/PQ expectations (timelines, acceptance criteria)
- ✅ Lead time tracking impacts critical path forecasting

**Friday Gate Criteria (Week 7):**
- [ ] 500+ equipment types defined
- [ ] Critical attributes documented per equipment type
- [ ] Suitability assessment logic implemented (yes/no/conditional)
- [ ] IQ/OQ/PQ templates cover 90% of equipment types
- [ ] Lead time data sources identified (suppliers, historical)

---

### Phase 2c: Layout Design Tool (Weeks 8–9)
**cGMP Requirements to Validate:**
- ✅ Unidirectional flow enforcement (material + personnel)
- ✅ Cleanroom classification enforcement (ISO 5/7/8 per FDA)
- ✅ Pressure differential enforcement (positive cascade)
- ✅ Surface material enforcement (stainless steel, epoxy in cGMP areas)
- ✅ HVAC/utility segregation enforcement

**Friday Gate Criteria (Week 9):**
- [ ] Unidirectional flow rules implemented (no reverse flow possible)
- [ ] Cleanroom classification rules implemented (air changes, filter types)
- [ ] Pressure differential rules implemented (alarms for deviation)
- [ ] Surface material recommendations generated (per area)
- [ ] HVAC/utility design integrated (no conflicts)
- [ ] Environmental monitoring sampling points suggested

---

### Phase 2d: Onboarding + Manuals (Weeks 10–11)
**cGMP Requirements to Validate:**
- ✅ Customer guidance for validation lifecycle (when to do URS vs. FRS vs. IQ/OQ/PQ)
- ✅ cGMP checklist (what must be addressed per FDA)
- ✅ Risk assessment template (ICH Q9 format)
- ✅ Environmental monitoring SOP guidance
- ✅ PreCheck submission wizard (Type V DMF generation)

**Friday Gate Criteria (Week 11):**
- [ ] Validation lifecycle wizard implemented (step-by-step guidance)
- [ ] cGMP checklist covers 95% of 21 CFR 210/211 requirements
- [ ] Risk assessment template matches ICH Q9 (identify, analyze, control, review)
- [ ] Environmental monitoring SOP template provided (sampling, frequency, action limits)
- [ ] PreCheck wizard tested with real facility scenario

---

## CRITICAL SUCCESS FACTORS

**For GxP Planner to meet FDA expectations:**

1. **Equipment Suitability:** Every equipment recommendation must be defensible per 21 CFR 211.63
2. **Layout Compliance:** Every layout enforcement rule must prevent actual contamination (backed by cGMP science)
3. **Validation Traceability:** Every requirement traced to test, every test result documented
4. **Risk-Driven Scope:** Validation scope determined by identified risks (not guesswork)
5. **Environmental Proof:** Real environmental monitoring data (not simulated)
6. **Personnel Competency:** Training records prove operators are qualified
7. **Change Control:** All facility changes documented + impact assessed
8. **Audit Trail:** Complete immutable record of every action (21 CFR Part 11)

**If any of these fails, FDA will flag it in PreCheck review or PAI.**

---

## REGULATORY IMPACT ON BUILD TIMELINE

**Phase 1b (URS/FRS Templates):**
- ⚠️ **FDA expert review required** (templates must cover 21 CFR 210/211 + ICH Q8/Q10)
- If templates incomplete: Rework in Week 4 (caught by artifact audit)
- If customer follows incomplete templates: Validation gaps discovered Week 10 (rework cascades)

**Phase 2b (Equipment Database):**
- ⚠️ **FDA expert review required** (equipment attributes must be cGMP-relevant)
- If attributes missing: Customer recommends unsuitable equipment (validation fails)
- If qualification protocols wrong: Customer validates wrong parameters (regulatory risk)

**Phase 2c (Layout Rules):**
- ⚠️ **FDA expert review required** (contamination prevention rules must be scientifically sound)
- If rules wrong: Customer designs non-compliant facility (rework before construction)
- If rules missing: Customer misses compliance (discovered at PAI)

**Phase 2d (PreCheck Wizard):**
- ⚠️ **FDA expert review critical** (Type V DMF must be approvable by FDA)
- If DMF incomplete: Customer PreCheck submission rejected (delay + rework)
- If DMF inaccurate: Customer's facility description doesn't match actual design (regulatory risk)

**Recommendation:** FDA expert engagement from Phase 1b through Phase 2d (Weeks 3–11). Non-negotiable for PreCheck credibility.

---

## BOTTOM LINE

**GxP Planner must enforce cGMP by design, not hope.**

Every module (equipment, layout, validation, risk, readiness, compliance) must be built with:
- FDA 21 CFR 210/211 requirements embedded
- ICH Q7/Q8/Q9/Q10/Q13 guidance integrated
- PreCheck/PAI readiness built-in

**If built correctly:** Customer uses GxP Planner, facility validates correctly, FDA approves.

**If built wrong:** Customer uses GxP Planner, discovers gaps Week 10, rework required, delays + costs.

**FDA expert from Week 1 is the difference between correct-by-design and hope-it-works.**

