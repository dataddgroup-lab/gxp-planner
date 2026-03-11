# Universal GxP Facility Planner
## Roadmap: Wave 2 & 3 Features

**Status:** PLANNED (NOT in MVP April 23)  
**Purpose:** Clarify what comes AFTER MVP launch  
**Funding:** Paid by customer revenue, not MVP budget  

---

## Critical Rule: MVP is Standalone

**MVP (April 23, 2026):**
- ✅ Zero integrations
- ✅ Zero external API dependencies
- ✅ Standalone SaaS product
- ✅ Data export only (CSV, JSON, PDF)
- ✅ Customer can launch immediately

**Why?** Integrations kill timelines, bloat budgets, create dependencies on vendors.

---

## Wave 2: Integration Tools & Basic Integrations (June–September 2026)

### Phase 2a: Data Import/Export Infrastructure (June)
**What we're building:**
- CSV import templates (facility spec, equipment, validation data)
- CSV export functionality (everything can be exported)
- JSON API (for generic data exchange)
- PDF report generation (for compliance)
- Excel export (formatted data for pivot tables)

**Why now?**
- Customers ask: "Can I export to my own systems?"
- Solves 80% of integration needs without deep integrations
- Quick to build, high customer value
- Generates revenue before building costly integrations

**Timeline:** 4 weeks (June)  
**Budget:** $80–$120K  
**Value:** "Export to your other tools" feature

---

### Phase 2b: Trackwise Integration (August)
**What we're building:**
- Two-way sync: GxP Planner ↔ Trackwise
- Change Control records sync (when GxP Planner changes, Trackwise knows)
- Validation status sync (Trackwise sees validation progress)
- Document sync (store validation docs in Trackwise)
- User authentication sync (SSO if possible)

**Why Trackwise first?**
- Trackwise is industry-standard change control
- Customers often have existing Trackwise instance
- Integration solves real workflow pain (validation → change control)
- High-value deal-closer for sales

**Timeline:** 8 weeks (July–August)  
**Budget:** $150–$250K  
**Value:** "Sync with Trackwise" feature

**Who does it?**
- Dedicated integration team (2–3 engineers)
- Trackwise API documentation review
- Test against Trackwise test environment
- Customer pilot (beta integration with first customer)

---

### Phase 2c: LIMS Integration (September)
**What we're building:**
- One-way sync: GxP Planner → LIMS
- Sample/test data sync (when IQ/OQ/PQ tests run, LIMS knows)
- Result import (LIMS test results sync back to GxP Planner)
- Equipment data sync (equipment specs → LIMS instrument master)
- User/role sync (GxP Planner users → LIMS system)

**Why LIMS?**
- Customers use LIMS to manage analytical testing
- Validation generates test results that should go to LIMS
- Integration eliminates manual data entry
- Common customer ask: "Can you sync with our LIMS?"

**Timeline:** 8 weeks (Aug–Sept)  
**Budget:** $120–$200K  
**Value:** "Sync test results with LIMS" feature

**Supported LIMS:**
- Start with: Thermo Fisher LIMS, Abbott LabWare
- Expand to: Custom LIMS via generic API

---

## Wave 3: Enterprise Integrations (October 2026+)

### Phase 3a: SAP/Oracle Integration (October–November)
**What we're building:**
- Plant Master Data sync (facility → SAP plant master)
- Equipment Master Data sync (equipment → SAP asset master)
- Validated Records (GxP Planner validation → SAP validated records)
- Cost tracking (equipment cost → SAP procurement)
- Scheduling (readiness forecast → SAP production planning)

**Why SAP/Oracle?**
- Major pharma uses SAP/Oracle for everything
- Integration enables: "Facility is validated, SAP can begin manufacturing planning"
- High-value enterprise deal-closer
- Expensive to build, but justifies premium pricing

**Timeline:** 12 weeks (Oct–Nov)  
**Budget:** $300–$500K  
**Value:** "SAP integration" enterprise feature

**Risk:** SAP is complex, needs dedicated team, long testing cycle

---

### Phase 3b: Equipment Vendor APIs (December 2026)
**What we're building:**
- HPLC vendor APIs (Waters, Agilent, Shimadzu)
- Equipment performance data sync (real-time equipment status → GxP Planner)
- Calibration data sync (equipment calibration status)
- Preventive maintenance alerts (equipment needs maintenance, triggers GxP Planner alert)

**Why?**
- Customers ask: "Can you pull real equipment data?"
- Integration provides live visibility (equipment working correctly during validation)
- Reduces manual validation (system sees equipment is calibrated, functional)

**Timeline:** 8 weeks (Nov–Dec)  
**Budget:** $150–$250K  
**Value:** "Live equipment monitoring" feature

---

### Phase 3c: ERP Connectors (January 2027)
**What we're building:**
- Microsoft Dynamics integration
- NetSuite integration
- Workday integration
- Custom ERP connectors (customer-specific ERPs)

**Why?**
- Mid-market pharma uses various ERPs
- Need flexible integrations, not just SAP
- Custom connectors generate consulting revenue ($50K–$100K per integration)

**Timeline:** 16 weeks (3 months)  
**Budget:** $400–$600K  
**Value:** "Custom ERP integration" services

---

## Wave 3 Extensions: Advanced Features (2027+)

### Change Control Engine (Wave 2, June–July)
**What it does:**
- GxP Planner changes trigger change control workflows
- Change Control records link to validation evidence
- Approvals required before changes go live
- Impact analysis (changing X affects Y, Z, must re-validate)
- Baseline configuration (save "golden" facility state)

**Why not in MVP?**
- Adds 6 weeks to build
- Change Control is separate concern (though related)
- Better to launch MVP, get customer feedback, build v2

**Timeline:** 6 weeks (June–July)  
**Budget:** $120–$180K  
**Value:** "Change Control" module

---

### Training Management System (Wave 2, June–July)
**What it does:**
- Training records per user
- Training requirement tracking (who needs to be trained on what?)
- Training material distribution (videos, manuals, exams)
- Training certification (proof users are trained)
- Training audit logs (FDA inspection: "who has been trained?")

**Why not in MVP?**
- Different product (LMS-like, not facility planning)
- Can be substituted with external LMS (Cornerstone, Docebo, SAP SuccessFactors)
- Better to integrate WITH LMS than build our own

**Timeline:** 8 weeks  
**Budget:** $150–$250K  
**Value:** "Training tracking" module

---

### Mobile App (Wave 3, 2027)
**What it does:**
- Mobile access to readiness dashboard (check status on phone)
- Mobile workflow approvals (approve URS/FRS on phone)
- Mobile QR codes (scan equipment to view specs)
- Mobile offline mode (access data without internet)
- Mobile push notifications (alerts on breaches, delays)

**Why not in MVP?**
- Adds complexity, testing burden
- Web dashboard responsive (works on tablet/phone)
- Customers can use browser on mobile (good enough for MVP)
- Native app comes later when user base justifies it

**Timeline:** 12 weeks  
**Budget:** $300–$500K  
**Value:** "Mobile app" feature

---

### White-Label Portals (Wave 3, 2027)
**What it does:**
- Consulting firm white-labels GxP Planner
- Customer portal shows consulting firm branding
- Revenue sharing (consulting firm gets 80%, we get 20%)
- Dedicated support (consulting firm supports their customers)
- Custom branding (logo, colors, domain)

**Why not in MVP?**
- Sales & partnership work required (not product work)
- Can start immediately via partner program (no code needed)
- Product stays GxP-Planner branded until partners ready

**Timeline:** 4 weeks (product work) + 12 weeks (sales work)  
**Budget:** $50–$100K  
**Value:** "White-label program" partnership

---

## Revenue Impact: Wave 2 & 3

### Wave 2 (June–Sept): $100K–$200K additional revenue
- CSV export: +$0 (included, no extra charge)
- Trackwise integration: +$500/month per customer (5–10 customers = $2.5K–$5K/month)
- LIMS integration: +$500/month per customer

**Wave 2 revenue impact:** +$5K–$10K/month by Sept

### Wave 3 (Oct+): $500K–$2M additional revenue
- SAP integration: +$2K–$5K/month per customer (enterprise deals)
- Equipment vendor APIs: +$1K–$2K/month per customer
- ERP connectors: Custom services ($50K–$100K per integration)
- White-label partnerships: 20–30% of partner revenue

**Wave 3 revenue impact:** +$50K–$100K/month by Q1 2027

---

## Funding Model

### MVP (April) — $2,300 budget (from Bobby)
**Source:** Upfront investment  
**Payback:** First customer revenue (May 15) starts payback

### Wave 2 (June–Sept) — $350K–$550K budget
**Source:** Customer revenue + Bobby (if needed)  
**Payback:** Wave 2 features generate additional revenue (Trackwise, LIMS integrations are add-on sales)

### Wave 3 (Oct+) — $500K–$1M+ budget
**Source:** Customer revenue (should be fully funded by then)  
**Payback:** Enterprise integrations command premium pricing, ROI in months

---

## Roadmap Timeline (Visual)

```
2026:
┌────────────────────────────────────────────────────────┐
│ APR          MAY          JUN          JUL       AUG    │
│  MVP        Launch    Wave 2a       2b Start   2b Done │
│ (standalone) (first    (export)      (TW)       (LIMS) │
│             customer)   tools                           │
│                                                         │
│ SEP          OCT          NOV          DEC       2027   │
│ Wave 2       Wave 3a      Wave 3a      Wave 3b   Q1    │
│ Complete     (SAP)        (SAP cont)   (ERP)    (ERP   │
│              Start        Pilot        Start    Done)  │
└────────────────────────────────────────────────────────┘

Each wave starts when previous wave customer revenue is in place.
No wave overlaps to prevent team split focus.
```

---

## Decision Rules for Wave Planning

**Wave 2 starts:**
- ✅ MVP launched (April 23)
- ✅ First customer signed (April 28)
- ✅ MVP revenue flowing (May 15)

**Wave 3 starts:**
- ✅ 10+ customers live
- ✅ Revenue exceeds $50K/month
- ✅ MVP team stable (no critical bugs)

**Never:**
- ❌ Start Wave 2 before MVP launches (delays MVP)
- ❌ Start Wave 3 before Wave 2 ships (spreads team thin)
- ❌ Add integrations to MVP (kills launch timeline)
- ❌ Build features customers don't request (build on demand)

---

## FAQ

### Q: Why no integrations in MVP?
**A:** Integrations add 6–8 weeks, delay April 23 launch to June/July. First customer revenue slips from May to August. Not worth it. Better to launch standalone, get paying customers, fund integrations with their revenue.

### Q: What if customer needs Trackwise integration immediately?
**A:** CSV export covers 80% of integration needs. Customer can manually import CSV into Trackwise (takes 30 min weekly). We prioritize Trackwise integration (Wave 2, Aug). Not ideal, but doesn't block launch.

### Q: Can we do "quick and dirty" integration for MVP?
**A:** NO. Quick integrations = fragile integrations = customer outages = support burden. Better to wait, do it right in Wave 2, with proper testing and support.

### Q: What if SAP/Oracle integration is critical for enterprise deals?
**A:** Honest answer: "Integration coming Oct/Nov. Want to pilot with us?" High-value customers will wait if product is great (and it will be). Plus, SAP/Oracle implementations take months anyway; customer's timeline usually aligns with Wave 3.

### Q: Can we start Wave 2 before MVP launches?
**A:** No. Two-front war = losing both battles. Focus everything on MVP until April 23. Wave 2 starts June 1 (Week 12 of first customer). Not before.

---

## Success Criteria

**MVP (April 23):** ✅ Launch standalone, zero integrations  
**Wave 2 (Sept 30):** ✅ Trackwise + LIMS integrations shipping  
**Wave 3 (Dec 31):** ✅ SAP/Oracle/ERP integrations in pilot phase  
**By Year-End 2026:** ✅ 30–50 customers, multiple integrations live, $1.4M–$2.4M ARR  

---

**Bottom line: MVP is standalone. Integrations come after. Revenue funds Wave 2. Wave 2 funds Wave 3. Scale up gradually, not all at once.**
