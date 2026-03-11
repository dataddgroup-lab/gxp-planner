# Universal GxP Facility Planner
## User & Admin Manuals with Screenshots

**Status:** LOCKED IN  
**Decision Date:** March 11, 2026, 9:41 AM MDT  
**Owner:** Documentation Lead (new role)  
**Timeline:** Weeks 8–14 (Phase 2d onward)  
**Deliverable:** Complete by Week 14 with MVP  

---

## Principle: Documentation Follows the Build

**These manuals are NOT created after launch.**

**They are created IN PARALLEL with UI development** (Phase 2d–4).

Every time a screen is built → Screenshot captured + documented  
Every time a workflow is added → Instructions written + tested  
Every time an onboarding step is added → Tutorial created + verified

**By Week 14:** Complete manuals, screenshot-verified against real UI.

---

## User Manual (For Facility Managers, QA Leads, Operators)

### Purpose
"I just signed up. How do I use this system?"

### Structure

**1. Getting Started (Chapter 1)**
- What is GxP Facility Planner? (1 page)
- System requirements (browsers, internet, devices)
- How to sign up (with screenshot of 3-field signup form)
- How to confirm email (with screenshot of confirmation email)
- How to create first facility (with screenshot showing facility creation form)
- Dashboard overview (with labeled dashboard screenshot)

**2. Creating Your Facility (Chapter 2)**
- Add facility details (name, location, type, size, compliance requirements)
- Screenshots: Facility creation form, facility overview screen
- Common mistakes & how to fix them
- Acceptable facility types (QC lab, sterile suite, biologics, etc.)

**3. Building Your Layout (Chapter 3)**
- Understanding the layout tool (what you can do)
- Screenshot: Empty layout canvas
- How to add equipment (drag-and-drop tutorial with screenshots)
- Understanding compliance warnings (screenshot showing warning example)
- How to fix placement issues (screenshot showing red X vs green checkmark)
- Exporting your design (screenshot showing export dialog, PDF output)

**4. Specifying Equipment (Chapter 4)**
- Searching equipment database
- Screenshot: Equipment search interface
- Understanding equipment attributes (size, power, utilities)
- Filtering equipment (by type, size, cost, lead time)
- Screenshot: Filtered equipment list
- Adding equipment to your facility
- Cost & lead time estimates (screenshot showing estimates)

**5. Defining Your Validation (Chapter 5)**
- Understanding validation workflow (7 phases)
- Screenshot: Validation dashboard with all phases
- Creating your URS (User Requirements Spec)
- Screenshot: URS creation form
- Moving to FRS (Functional Requirements Spec)
- Screenshot: FRS form, phase gates
- IQ/OQ/PQ phases (what they mean, how to track)
- Screenshot: IQ/OQ/PQ test forms
- VSR (Validation Summary Report)

**6. Managing Risk (Chapter 6)**
- Creating risk entries
- Screenshot: Risk creation form
- Risk scoring (how scoring works)
- Screenshot: Risk scoring matrix
- Tracking mitigations
- Screenshot: Mitigation tracking form
- Risk closure workflow

**7. Readiness & Forecasting (Chapter 7)**
- Understanding readiness score (% complete)
- Screenshot: Readiness dashboard
- Forecasting your timeline
- Screenshot: Forecast chart
- What drift detection means
- Screenshot: Drift alert
- Using sensitivity analysis (what-if scenarios)

**8. Inviting Your Team (Chapter 8)**
- Adding team members (email invite)
- Screenshot: Invite form
- Assigning roles (admin, QA, operator)
- Screenshot: Role assignment
- Team member permissions by role (table showing access)
- Removing team members

**9. Integrations (Chapter 9)**
- Connecting to Trackwise (if applicable)
- Exporting data (PDF, DWG, CSV)
- Screenshots for each export type
- Importing data

**10. Troubleshooting (Chapter 10)**
- "I forgot my password" (reset flow with screenshot)
- "I can't see my team member's updates" (RLS explanation, refresh)
- "Equipment doesn't fit" (constraint explanation)
- "My readiness forecast seems wrong" (how calculation works)
- FAQ section
- Contact support (how to reach support team)

**11. Glossary (Chapter 11)**
- GxP terms (URS, FRS, IQ, OQ, PQ, VSR, RLS, etc.)
- Equipment terminology
- Facility types
- Validation phases

### Format
- **PDF:** 80–100 pages (printable, searchable)
- **HTML:** Web version (clickable screenshots, searchable)
- **Video:** Short tutorials (2–3 min each) for key workflows
- **Screenshots:** Every major screen captured with annotations showing how to use it

### Acceptance Criteria
- [ ] Every screen in the app has a corresponding manual section
- [ ] Screenshots are current (updated each phase)
- [ ] All workflows documented step-by-step
- [ ] No technical jargon without explanation
- [ ] Glossary complete
- [ ] PDF printable (readable in black & white)
- [ ] HTML version responsive (mobile-friendly)
- [ ] Video tutorials cover onboarding, facility creation, layout design, validation setup
- [ ] Tested by 3 external users (can they complete tasks using only manual?)

---

## Admin Manual (For Facility Owners, Administrators)

### Purpose
"I own the facility. How do I manage this system?"

### Structure

**1. System Overview (Chapter 1)**
- What admins can do (different from regular users)
- Screenshot: Admin dashboard (different view than regular user)
- Compliance responsibilities (you're responsible for validation)
- Audit trail (what's logged, how to access)
- Screenshot: Audit log view

**2. User Management (Chapter 2)**
- Creating user accounts (single vs. bulk import)
- Screenshot: User creation form
- Assigning roles (admin, QA, operator, rider, parent, volunteer, judge)
- Table: Role permissions (what each role can see/do)
- Changing user roles
- Deactivating users (soft delete, not hard delete)
- Screenshot: User management screen
- Setting user permissions (who can approve phases)

**3. Facility Management (Chapter 3)**
- Creating multiple facilities (multi-site management)
- Screenshot: Facility list, adding facility
- Facility settings (name, location, compliance requirements, certifications)
- Screenshot: Facility settings form
- Archive/restore facility (soft delete workflow)
- Facility-level permissions

**4. Validation Governance (Chapter 4)**
- Setting approval requirements (who approves each phase)
- Screenshot: Approval workflow form
- Phase gating (cannot skip phases)
- Approval checklist (what approvers must verify)
- Screenshot: Approval form
- Escalation procedures (what if something doesn't pass)

**5. Risk Management (Chapter 5)**
- Risk governance (who can create risks, who approves)
- Screenshot: Risk governance settings
- Risk scoring thresholds (what counts as HIGH/MEDIUM/LOW)
- Mitigation verification (proof required before closing)
- Screenshot: Mitigation verification form
- Risk trending (how to assess improvement over time)

**6. Compliance & Audit (Chapter 6)**
- Understanding audit logs (what's logged)
- Screenshot: Audit log interface
- Exporting audit trails (for FDA inspection)
- Screenshot: Export dialog
- Immutability verification (how audit logs can't be modified)
- HIPAA compliance (what HIPAA requirements are covered)
- 21 CFR Part 11 compliance (electronic records requirements)

**7. Data Management (Chapter 7)**
- Backup procedures (how to backup facility data)
- Restore procedures (how to restore from backup)
- Data export (PDF, DWG, CSV, XML)
- Screenshot: Export options
- Data retention policy (how long data is kept)
- GDPR compliance (data deletion on request)
- Screenshot: Data deletion workflow

**8. Onboarding New Facilities (Chapter 8)**
- Step-by-step onboarding (first-time setup)
- Screenshot: Initial setup wizard
- Creating sample facility (for training)
- Inviting team (bulk invite vs. one at a time)
- Setting up workflows (approval chains)
- First validation (walkthrough of first URS submission)

**9. Performance & Reporting (Chapter 9)**
- Dashboard metrics (what metrics matter)
- Screenshot: Admin dashboard with KPIs
- Readiness forecasting (how to interpret forecast)
- Team utilization (who's working on what)
- Compliance tracking (status by facility)
- Report generation (canned reports + custom)
- Screenshot: Report generator

**10. Integrations (Chapter 10)**
- Connecting to Trackwise (if applicable)
- Setting up API integrations (if offered)
- Screenshot: Integration settings
- Webhook configuration (for automation)
- Data synchronization (what syncs, when, how often)

**11. Troubleshooting (Chapter 11)**
- "User can't log in" (reset password, MFA, account lockout)
- "Audit log is slow" (explain why, workarounds)
- "Phase gate won't open" (explanation of gating rules)
- "I need to add equipment to the database" (how to contact support)
- Contact support (escalation procedures)
- Admin troubleshooting checklist

**12. Security & Best Practices (Chapter 12)**
- Password policies (requirements, rotation)
- Access control (who should have admin access)
- Audit log monitoring (how often to check)
- Data residency (where data is stored)
- Encryption (data at rest, data in transit)
- Compliance certifications (SOC 2, HIPAA, FedRAMP)
- Incident response (if there's a security issue, what to do)

**13. Glossary (Chapter 13)**
- Admin-specific terms
- Compliance terms
- Integration terminology

### Format
- **PDF:** 100–150 pages (printable, searchable)
- **HTML:** Web version (clickable, searchable)
- **Video:** Admin-focused tutorials (system setup, user management, compliance)
- **Screenshots:** Every admin feature captured with annotations

### Acceptance Criteria
- [ ] Every admin feature documented with screenshot
- [ ] Compliance requirements explained (21 CFR Part 11, HIPAA, GDPR)
- [ ] Troubleshooting section covers common issues
- [ ] Security best practices documented
- [ ] Glossary complete (no unexplained jargon)
- [ ] PDF printable (readable in black & white)
- [ ] HTML responsive
- [ ] Video tutorials cover setup, user management, phase approvals, compliance verification
- [ ] Tested by 3 facility administrators (can they complete tasks using only manual?)

---

## How Manuals are Created (Parallel with Build)

### Phase 2d (Weeks 10–11): UI Polished + Onboarding + MANUAL START
- [ ] Build Team: Completes UI for all major features
- [ ] Documentation Lead (NEW): Captures screenshots of every screen
- [ ] Documentation Lead: Writes step-by-step instructions for every workflow
- [ ] User manual: Chapters 1–5 complete (Getting Started, Facility, Layout, Equipment, Validation)
- [ ] Admin manual: Chapters 1–3 complete (Overview, User Management, Facility Management)

### Phase 3 (Weeks 12–13): Integration + Hardening + MANUAL COMPLETION
- [ ] Build Team: Final features, performance optimization
- [ ] Documentation Lead: Captures new screenshots (risk, readiness, reporting)
- [ ] Documentation Lead: Writes remaining chapters
- [ ] User manual: Chapters 6–11 complete (all chapters)
- [ ] Admin manual: Chapters 4–13 complete (all chapters)
- [ ] Screenshots: All verified against current UI

### Phase 4 (Week 14): Final QA + Deployment + MANUAL SIGN-OFF
- [ ] Documentation Lead: Final proofread
- [ ] Documentation Lead: Screenshots verified (not outdated)
- [ ] Documentation Lead: PDF + HTML versions generated
- [ ] QA Team: Usability testing (10 users read manual, complete tasks)
- [ ] Friday gate: Manuals approved, ready for customer

---

## Manual Deliverables (Week 14)

**Packaged with MVP:**

1. **User Manual (PDF)**
   - 80–100 pages
   - Full screenshots
   - Printable
   - Searchable

2. **User Manual (HTML)**
   - Web version
   - Clickable screenshots
   - Searchable
   - Mobile-friendly

3. **Admin Manual (PDF)**
   - 100–150 pages
   - Full screenshots
   - Printable
   - Searchable

4. **Admin Manual (HTML)**
   - Web version
   - Clickable screenshots
   - Searchable
   - Mobile-friendly

5. **Video Tutorials**
   - "Getting Started" (2 min)
   - "How to Create Your Facility" (3 min)
   - "How to Design Layout" (4 min)
   - "How to Set Up Validation" (5 min)
   - "Admin: How to Manage Users" (4 min)
   - "Admin: How to Set Up Approvals" (5 min)

6. **Quick Reference Cards**
   - 1-page user quick ref (printable laminated card size)
   - 1-page admin quick ref
   - Keyboard shortcuts
   - Common workflows

---

## Quality Assurance (Manuals)

**Before delivery, manuals must pass:**

- [ ] **Accuracy Test:** 3 external users (not on team) follow manual steps, complete tasks without help
- [ ] **Completeness Test:** Every screen in app appears in manual (screenshot or mention)
- [ ] **Clarity Test:** No unexplained jargon (glossary complete)
- [ ] **Screenshots Test:** All screenshots current (match current UI, not outdated)
- [ ] **Video Test:** Videos load, audio clear, visuals match UI
- [ ] **Accessibility Test:** PDF readable in black & white (high contrast), fonts ≥ 11pt
- [ ] **Findability Test:** Glossary, index, search work (PDF search, HTML search)

---

## Cost & Timeline

**Documentation Lead Role (Weeks 8–14):**
- Weeks 8–11 (Phase 2d): 30% allocation (screenshots, Chapter 1–5)
- Weeks 12–13 (Phase 3): 50% allocation (screenshots, Chapters 6–11)
- Week 14 (Phase 4): 70% allocation (final proofread, videos, QA)

**Budget Impact:** $150–$250 tokens (included in Phase 2d–4 budgets)

---

## Friday Gate Deliverable Format

**Every Friday, Documentation Lead submits:**

```
MANUAL PROGRESS REPORT — Week X
═══════════════════════════════════════════

USER MANUAL:
✅ Chapters 1–X complete (Y% done)
✅ Screenshots captured: [#] of [#] screens
✅ Glossary: [terms] documented
⚠️  Outstanding: [sections not yet written]

ADMIN MANUAL:
✅ Chapters 1–X complete (Y% done)
✅ Screenshots captured: [#] of [#] screens
✅ Glossary: [terms] documented
⚠️  Outstanding: [sections not yet written]

VIDEOS:
✅ Videos recorded: [#] of 6
✅ Videos edited: [#]
⚠️  Outstanding: [videos not yet filmed]

QUALITY:
✅ Screenshots current (match latest UI)
✅ No broken links
⚠️  Glossary missing: [terms]

Next Week: [Chapters to complete]
```

---

## Non-Negotiable Rules

1. **Manuals are created IN PARALLEL with UI** (not after launch)
2. **Every screenshot must be current** (not outdated)
3. **No unexplained jargon** (glossary is required)
4. **Tested by external users** (QA approval required)
5. **PDF + HTML versions delivered** (both required)
6. **Videos included** (minimum 6 tutorial videos)
7. **Delivered Week 14 with MVP** (not later)

---

## Why This Matters

**RanchOS:** Users struggle, no manual, support flooded with questions  
**GxP Planner:** Users self-serve using manual, support handles exceptions only

**Result:** Happy customers, reduced support burden, better reviews.

---

## Competitive Advantage

**Competitors:** "Here's the software, good luck"  
**You:** "Here's the software, here's the complete manual with screenshots + videos, and here's admin guide for your IT team"

**That's the difference between "software" and "product."**

---

**This is locked in. Manuals created in parallel with Phases 2d–4. Delivered Week 14.**
