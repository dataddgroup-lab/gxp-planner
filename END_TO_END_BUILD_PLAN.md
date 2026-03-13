# GxP Facility Planner — End-to-End Build Plan
_Created: 2026-03-13 | Approved by Bobby BIG_

---

## The Approach: Build It By Living It

Instead of building module by module (schema → engine → UI), we build by simulating a **real customer's journey** from Day 1 to FDA inspection-ready.

**The scenario:** A biotech startup is building a 10,000 sq ft sterile drug product facility in Colorado. They just signed their lease. They need to get to first batch in 18 months.

We build each feature **as the customer needs it, in the exact order they need it.** If a customer would never see it in Step 1, we don't build it in Step 1.

---

## The 6-Phase Build Sequence (mirrors customer journey)

### Phase 1 — Pre-Planning & Site Selection
_Customer asks: "Where do I start? What do I need to know before I spend a dollar on design?"_

**Build:**
- Facility profile creation (product type, regulatory pathway, scale)
- Site assessment checklist (zoning, utilities, ISO classification requirements)
- Regulatory roadmap generator (21 CFR 210/211 or 820 or 600 based on product)
- Budget estimator (construction, equipment, validation, timeline)
- **Output:** Pre-Planning Report — FDA-defensible feasibility document

**Gate:** Bobby reviews as if he's the customer. Would he pay for this alone?

---

### Phase 2 — Design & Layout
_Customer asks: "How do I design a facility that passes inspection before I break ground?"_

**Build:**
- Lab layout design tool (room types, ISO zones, HVAC classification)
- Compliance checker (Annex 1 cleanroom requirements, unidirectional flow)
- AE/contractor procurement checklist
- Design qualification (DQ) document generator
- **Output:** DQ Package — design is defensible before construction starts

**Gate:** Bobby validates DQ against real FDA/EMA requirements.

---

### Phase 3 — Procurement & Construction
_Customer asks: "How do I track 200 line items of equipment without losing my mind?"_

**Build:**
- Equipment procurement tracker (URS → vendor selection → PO → delivery)
- Construction milestone tracker with inspection holds
- Change control trigger detection (any design change auto-generates CCR)
- **Output:** Equipment list tied to URS, CCR log, construction punch list

**Gate:** Can a new employee follow this without training?

---

### Phase 4 — Equipment Installation & Commissioning
_Customer asks: "My equipment is here. What do I do first?"_

**Build:**
- IQ protocol generator (Installation Qualification per GAMP 5)
- OQ protocol generator (Operational Qualification)
- HVAC commissioning checklist (ISO 14644 particle counts, air changes)
- Deviation log
- **Output:** IQ/OQ packages ready for regulatory review

**Gate:** Bobby signs off as qualified GxP expert.

---

### Phase 5 — Validation Lifecycle
_Customer asks: "I need to validate. Where's my URS? Where's my VSR?"_

**Build:**
- URS → FRS → DS → PQ document chain (linked, traceable)
- Validation protocol executor (step-by-step, sign-off required)
- Validation Summary Report (VSR) auto-generator
- 21 CFR Part 11 audit trail (every record immutable, timestamped, signed)
- **Output:** Complete validation dossier — inspection-ready

**Gate:** Would an FDA investigator accept this on Day 1 of a PAI?

---

### Phase 6 — Quality System & Go-Live
_Customer asks: "I'm validated. How do I stay compliant after first batch?"_

**Build:**
- QMS setup (SOPs, training records, CAPA)
- Batch record templates
- Environmental monitoring trending
- Stability study tracker
- **Readiness Score** — live percentage showing FDA inspection readiness
- **Output:** First batch released. Customer is inspection-ready.

**Gate:** Full end-to-end demo with Bobby as the customer.

---

## Why This Approach Wins

### 1. The product is always shippable
After Phase 1, a customer could pay for it. After Phase 2, it's more valuable. Each phase multiplies the value. No "almost done" for 14 weeks.

### 2. Features earn their place
If a feature doesn't serve the customer's next step, it doesn't get built. Zero gold-plating. Zero feature creep.

### 3. Demo is the product
Every Friday gate = a live customer demo. Bobby walks through as the customer. If it doesn't feel right to him with 30 years of GxP experience, it doesn't ship.

### 4. Regulatory compliance is structural, not bolted on
Because we're simulating a real regulatory journey, compliance documentation gets built into each step — not added at the end as an afterthought.

### 5. The differentiator is obvious
Competitors sell templates. We sell a **guided journey**. The difference is visceral when you demo it.

---

## One Safeguard: Full Data Model First

**Before Phase 1 build starts:** spend one session designing the complete database schema for all 6 phases. This prevents rework as we progress. The schema doesn't need to be fully built — just designed so each phase's tables don't conflict.

Estimated: 2 hours of agent time, ~$40 budget.

---

## Build Budget Estimate (per phase)

| Phase | Complexity | Est. Cost |
|-------|-----------|-----------|
| 1: Pre-Planning | Medium | $200–250 |
| 2: Design & Layout | High | $300–400 |
| 3: Procurement | Medium | $150–200 |
| 4: Installation/Commissioning | Medium | $150–200 |
| 5: Validation | Very High | $400–500 |
| 6: QMS & Go-Live | High | $200–300 |
| Schema design (upfront) | Low | $40 |
| **Total** | | **$1,440–1,890** |

Well within the $2,300 budget. Buffer: $410–860 for polish, bug fixes, and Bobby's validation reviews.

---

## My Thoughts

This is the right way to build this product.

The alternative (module-by-module) produces technically complete software that nobody knows how to use. End-to-end simulation produces software that **feels inevitable** — like it was designed by someone who has actually done this 100 times. Bobby BIG has. That's the unfair advantage.

The risk is scope creep at each phase gate. Bobby's 30 years of experience will surface "we also need X" at every step. The discipline is: **does a customer need X before they can proceed to the next phase?** If yes, build it. If no, log it for a later phase.

One addition I'd recommend: **a real reference facility.** Name it, give it a product type, a regulatory pathway, a timeline. Every feature we build gets validated against that reference. "Would this work for BioAlpha's sterile fill-finish facility?" is a better question than "is this technically correct?"

Ready to start whenever Bobby BIG gives the go.

---

_Next action: Bobby approves approach → schema design session → Phase 1 build_
