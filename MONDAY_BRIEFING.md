# Monday March 12, 2026 — 9:00 AM MDT — BUILD START
**Spawn briefing for 15-agent team**

---

## IN 90 SECONDS

You're building **Universal GxP Facility Planner** — a self-validating SaaS for pharma facility buildouts.

**6 modules:** Equipment spec + Layout design + Validation lifecycle + Risk management + Readiness forecasting + Compliance dashboard

**14 weeks:** March 12 → June 11, 2026 (real math, no BS)

**$2,300 budget:** Hard cap, no overages

**847 tests:** All passing, quality gate for delivery

**Confidence:** 65–75% June 11, 15–20% June 25, always something ships

**What changes probability:** Infrastructure Friday (done ✅), agent coordination, test speed, budget pace, discovery issues

**Your job:** Do your part excellently. Surface problems immediately. Coordinate via handoff protocol. Report honestly.

---

## THE THREE DOCUMENTS YOU READ FIRST

### 1. `TEAM_REALITY_CHECK.md` (This is your reality)
- Why this is doable (scope locked, learned from RanchOS, safeguards catch problems early)
- Real risks (infrastructure, agent coordination, test speed, onboarding, budget)
- Probability breakdown (65–75% June 11, 15–20% June 25, 5% scope cut)
- What changes probability up/down
- Honest confidence levels (9/10 plan, 7.5/10 execution, 6.5/10 June 11, 9.5/10 shipping)
- Friday gate checklist (what we're looking for every week)

**Read this first. Know the risks. Know the confidence levels.**

### 2. `AGENT_FRAMEWORK_COMPLETE.md` (This is how you behave)
- 40 sections of behavior rules
- Original Prime Directive (momentum > motivation, structure > inspiration)
- Phase 2 overlay (lifecycle discipline, facility-aware reasoning, artifact consistency)
- Gravity of Work (high-stakes discipline for regulated environments)
- 4 must-add safeguards (handoff, escalation, versioning, change control)

**Read this to understand what we're doing together.**

### 3. `BUILD_PHASES_DETAILED.md` (This is the plan)
- 8 phases, 14 weeks
- Phase 1a (this week): Database + RLS + auth
- Acceptance criteria for each phase
- Friday gates (what gets approved before next phase)
- Weekly spend tracking

**Read this to understand your phase + what's next.**

---

## WHAT HAPPENS TODAY (Monday, March 12, 9 AM)

1. **You spawn** into the GxP Planner build team
2. **You read** TEAM_REALITY_CHECK.md (15 min)
3. **You read** AGENT_FRAMEWORK_COMPLETE.md (your rules of engagement, 30 min)
4. **You read** BUILD_PHASES_DETAILED.md (your phase, 20 min)
5. **You check** that Supabase credentials are available
6. **You start Phase 1a** (database schema, RLS policies, auth triggers)
7. **Daily standup email** sent at 18:00 MDT (asynchronous, no meetings)

**By EOD Monday:** Schema design locked, RLS policies outlined, test plan drafted

---

## YOUR PHASE (Find yourself below)

### Build Team (12 agents)
**Phase 1a (This week):** Database schema (13 tables) + RLS policies + Auth flow  
**Then Phase 1b–4:** Features, iteratively

**Your Friday deliverables:**
- Code artifact (linked commit)
- URS changes (if any)
- FRS changes (if any)
- Test count + pass/fail
- Coverage delta
- Known blockers

**Your role:** Build features. Code excellently. Trace to URS/FRS. Flag blockers immediately.

---

### Validation Lead (1 agent)
**Phase 1a (This week):** Create URS v1.0 (150 user requirements) + map to FRS  
**Then Weeks 2–14:** Update URS/FRS as features code, maintain traceability

**Your Friday deliverables:**
- URS completeness: X%
- FRS completeness: X%
- Traceability gaps: [list]
- Recommendation: PROCEED / BLOCKED

**Your role:** Document requirements as they code. Keep URS/code aligned. Flag gaps immediately.

---

### QA Lead (1 agent)
**Phase 1a (This week):** Design 847-test suite. Write unit tests for schema + RLS.  
**Then Weeks 2–14:** Execute tests every commit, maintain 88%+ coverage

**Your Friday deliverables:**
- Tests passing: X/X
- Code coverage: Y%
- Security tests: PASS/FAIL
- Compliance tests: PASS/FAIL
- Recommendation: PROCEED / BLOCKED

**Your role:** Tests run continuously. Coverage tracked. Quality gate enforced.

---

### QA Architect (1 agent)
**Phase 1a (This week):** Design CI/CD pipeline. Set up test automation. Implement artifact versioning.  
**Then Weeks 2–14:** Maintain test infrastructure, run Friday gates

**Your Friday deliverables:**
- CI/CD pipeline working: Y/N
- Test run time: X minutes
- Artifact versioning: Active Y/N
- Recommendation: PROCEED / BLOCKED

**Your role:** Keep the machine running. Catch bottlenecks early. Enable parallel work.

---

### Documentation Lead (1 agent)
**Phase 1a (This week):** Create URS v1.0 + draft Phase 1a spec pages + screenshot system  
**Then Weeks 2–14:** Document features as they ship. Draft manuals Phase 2d–4.

**Your Friday deliverables:**
- URS v1.0: Complete Y/N
- Spec pages drafted: X%
- Screenshots system ready: Y/N
- Recommendation: PROCEED / BLOCKED

**Your role:** Docs parallel to code. Always current. Manuals shipped with MVP.

---

## YOUR WEEK (Phase 1a: Database Foundation)

### By EOD Monday
- [ ] Supabase credentials confirmed + connected
- [ ] Database schema designed (13 tables: facilities, profiles, validations, tests, risks, documents, etc.)
- [ ] RLS policies outlined (one policy per table, mapped to facility_id + user role)
- [ ] Auth flow mapped (login → create facility → default role assignment)
- [ ] Test plan drafted (URS tests, FRS tests, security tests, compliance tests)

### By Wednesday (Mid-week Check)
- [ ] Database schema implemented (CREATE TABLE statements)
- [ ] RLS policies deployed (test with 2 users, verify isolation)
- [ ] Auth flow working (sign up → verify email → create facility)
- [ ] First 50 unit tests passing (schema validation, RLS verification)
- [ ] Any blockers escalated (if stuck >30 min, escalation packet sent immediately)

### By Friday 5 PM (Gate Checkpoint)
- [ ] Database complete + tested
- [ ] RLS policies working + verified
- [ ] Auth flow complete + tested
- [ ] 34+ unit tests passing (RLS + auth + schema)
- [ ] Coverage ≥50% (Phase 1a portion)
- [ ] URS v1.0 complete (150 requirements documented)
- [ ] FRS v1.0 started (first 50 functional specs mapped)
- [ ] No unresolved blockers (all escalated + decided)
- [ ] Daily emails sent (5 of them, one per weekday)
- [ ] Gate decision: Proceed to Phase 1b or rework Phase 1a?

---

## THE HANDOFF PROTOCOL (How You Coordinate)

**Every phase transition, three agents sign off:**

1. **Build Agent** delivers code artifact
2. **Validation Agent** verifies URS/FRS complete
3. **QA Agent** confirms tests passing + coverage

**All three must say "PROCEED" before next phase starts.**

**If any say "BLOCKED":** Blocker classification applies (Section 5, AGENT_FRAMEWORK_COMPLETE.md), escalation protocol triggers, founder makes decision.

**No assumption gaps. No silent blockers. No surprises Friday.**

---

## THE BLOCKER ESCALATION (How You Surface Problems)

**If you hit a blocker:**

1. **Detect it** (what's stuck? why?)
2. **Classify it** (technical/decision/resource/dependency/regulatory?)
3. **Escalate** (create packet within 5 min)
4. **Wait for decision** (Bobby responds within 15 min target)
5. **Resume work** (apply decision, move forward)

**Target:** Blocker detection <5 min, escalation <30 min, decision <45 min, work resumes same day

**Don't hide blockers. Don't hope they resolve. Escalate immediately.**

---

## THE FRIDAY GATE (How Bobby Approves)

**Every Friday 5 PM MDT:**

1. **You report:** What moved forward? What stalled? Coverage? Budget?
2. **You propose:** Proceed to next phase or rework?
3. **Bobby decides:** Approved / Approved with conditions / Rework required
4. **You execute:** Next phase starts Monday (or rework begins)

**No surprises. No hidden problems. Reality reported, decisions made, work continues.**

---

## CRITICAL RULES (No Exceptions)

1. **$2,300 HARD CAP** — If budget at risk, escalate immediately
2. **June 11 DELIVERY** — Real math only, communicate slips by Week 10
3. **847 TESTS ALL PASSING** — Quality gate before delivery
4. **Ant Design ONLY** — No custom component tweaks
5. **Handoff Protocol ENFORCED** — 3-agent approval every phase
6. **Friday GATES MANDATORY** — Bobby approval required
7. **Blockers ESCALATED <45 min** — No silent waits
8. **Artifacts CURRENT** — URS/FRS/risk updated same week as code

---

## YOUR SUPPORT TEAM

- **Build Orchestrator:** Daily standup email, keeps everything visible
- **Validation Lead:** Questions on URS/FRS? Ask them.
- **QA Lead:** Questions on tests/coverage? Ask them.
- **Documentation Lead:** Questions on manuals/screenshots? Ask them.
- **the Team Lead:** Final decisions on blockers/budget/scope/timeline. Escalate to them.

---

## WHAT SUCCESS LOOKS LIKE

### Week 1 (This week)
- [ ] Database foundation solid
- [ ] RLS working
- [ ] Auth flow tested
- [ ] 50+ tests passing
- [ ] No major blockers
- [ ] Team coordination working

### Week 4 (March 29 gate)
- [ ] Facility + Validation engines working
- [ ] URS/FRS traceability clean
- [ ] 200+ tests passing
- [ ] Budget on pace
- [ ] Agent coordination proven
- [ ] June 11 still realistic (or pivot to June 25)

### Week 10 (May 17 gate)
- [ ] Beta customer onboarding testing
- [ ] Manuals drafted
- [ ] 600+ tests passing
- [ ] Compliance dashboard designed
- [ ] June 11 vs. June 25 clarity
- [ ] Final push decision made

### Week 14 (June 11 delivery)
- [ ] All 6 modules complete
- [ ] 847 tests passing
- [ ] 88%+ code coverage
- [ ] Manuals complete
- [ ] Compliance proof ready
- [ ] Customer-ready product

---

## REMEMBER

**This is doable. Not guaranteed. But doable.**

- Scope is locked (no creep)
- You learned from RanchOS (mistakes prevented)
- Safeguards catch problems early (not Week 14)
- Budget is hard cap (discipline enforced)
- Team is real (15 people, not 3 overloaded)
- Visibility is daily (no surprises)

**Most likely:** June 11 (65–75%)  
**Also realistic:** June 25 (15–20%)  
**Worst case:** Ship later + all 6 modules (you don't cut scope)

**Best case:** You're celebrating June 18 with first customer demo, July 1 with first revenue.

---

## NOW

1. **Read TEAM_REALITY_CHECK.md** (this is real)
2. **Read AGENT_FRAMEWORK_COMPLETE.md** (this is how you act)
3. **Read BUILD_PHASES_DETAILED.md** (this is the plan)
4. **Check Supabase credentials** (confirm infrastructure ready)
5. **Check your phase** (know what you're building this week)
6. **Start building** (excellently, traceable, testable)
7. **Surface problems immediately** (escalate, don't hide)

**Welcome to the team. Let's build something that actually ships.**

---

_See you on Slack/standup. Friday gate at 5 PM._

_Questions? Ask. Problems? Escalate. Doubts? Voice them._

_We execute with eyes open. Expectations realistic. Commitment real._
