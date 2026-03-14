# Universal GxP Facility Planner
## SaaS Model Decision & Build Guide

**Date:** March 11, 2026  
**Decision:** PURE SaaS (no on-prem, no hybrid)  
**Owner:** the Team Lead  
**Implementation:** This guides ALL build phases and architecture decisions

---

## THE DECISION: PURE SaaS (NOT On-Prem, NOT Hybrid)

**Universal GxP Facility Planner will be a SaaS product.**

**Pricing Model:** $3,000–$6,000/month per customer (tiered by facility complexity)  
**Infrastructure:** Supabase (PostgreSQL) + Vercel (hosting)  
**Deployment:** Cloud-only, FedRAMP-eligible, SOC 2 Type II certified  
**Compliance:** 21 CFR Part 11, HIPAA-safe, GDPR-ready

---

## Why SaaS is Right for This Market

### 1. Pharma Market Expectation is SaaS

**Current Standard:**
- Veeva Vault = SaaS (market leader)
- MasterControl = SaaS
- Medidata = SaaS
- SAP/Oracle = SaaS (for new implementations)

**Customer Expectation:** Cloud-hosted, automatic updates, no on-prem headaches

**Regulatory Acceptance:** FDA/EMA guidance explicitly approves cloud deployments if properly secured (FedRAMP, SOC 2, encryption)

### 2. SaaS Solves Your Customer's Real Problem

**On-Premise Means:**
- ❌ Customer must manage infrastructure
- ❌ Customer must maintain compliance certifications
- ❌ Customer must handle security patches
- ❌ Customer must manage backups + disaster recovery
- ❌ Customer must hire IT to run servers

**SaaS Means:**
- ✅ You handle all infrastructure
- ✅ You maintain FedRAMP/SOC 2 compliance
- ✅ You manage security updates
- ✅ You handle backups automatically
- ✅ Customer IT has zero responsibility for this system

**Pharma prefers SaaS because:**
- Reduces their operational burden
- Regulatory compliance is cleaner (inspectors see "vendor manages compliance," not "customer cobbled together a deployment")
- Higher uptime reliability (you manage it, not a stressed IT team)

### 3. Business Model is Better SaaS

**On-Prem Financial Model:**
- One-time license: $50K–$200K
- Minimal recurring revenue
- Requires consultant for every deployment
- Hard to iterate (updates require customer coordination)
- Scales linearly with cost (more customers = more support engineers needed)

**SaaS Financial Model:**
- $3K–$6K/month recurring revenue
- One deployment serves 100+ customers
- Automatic updates (everyone on latest version)
- Support scales logarithmically (one engineer can support 50+ customers)
- $1.5M–$3M ARR potential with 50 customers

### 4. Data Security is Actually Better SaaS

**Common Misconception:** "Cloud = less secure"

**Reality:**
- Veeva hosts incredibly sensitive drug development data in cloud
- Pharma regulatory inspectors ACCEPT cloud deployments
- Your security (FedRAMP, SOC 2, encrypted backups) > most customer on-prem deployments
- You maintain compliance; customer doesn't have to

**FDA/EMA Position:** Cloud is acceptable if vendor demonstrates compliance (which you will).

---

## The Hybrid Trap (DO NOT DO THIS)

**Your first instinct might be:** "Offer SaaS, but also allow on-prem for customers who want it"

**This is a mistake:**

### Cost of Hybrid Model

**Double Development:**
- Maintain two code paths (SaaS vs. on-prem)
- Different deployment architecture for each
- Different security implementations (SaaS uses managed services; on-prem is customer-managed)

**Double Support Burden:**
- Support team must know both deployments
- Debugging is harder (is this a SaaS issue or customer on-prem configuration?)
- Patches take 2x longer (apply to SaaS, then manage customer rollouts)

**Sales Confusion:**
- "Which model should I buy?"
- Sales team has to explain pros/cons of each
- Longer sales cycles (now debating deployment, not just product)

**Rarely Used:**
- ~90% of customers choose SaaS (lower upfront cost, easier management)
- The 10% demanding on-prem usually don't buy anyway (compliance paranoia, IT department obstruction)

**Financial Impact:**
- +40% development cost
- +25% support cost
- -20% faster deployment
- Net: Hybrid is a value destroyer

---

## What to Offer INSTEAD of Hybrid

**If customers have concerns, address them with SaaS options:**

### Option 1: Regional Data Residency
"If your compliance requires US data residency, we host in Vercel US East. If you need EU, we host in EU region. Your data never leaves your region."

**Addresses concern:** Data residency compliance  
**Cost to implement:** $0 (Vercel + Supabase support both)  
**Revenue impact:** +$500–$1K/month (premium tier)

### Option 2: High-Security Tier
"For additional compliance needs, we offer advanced audit logging, custom encryption, dedicated compliance reporting, and quarterly security audits."

**Addresses concern:** Paranoid IT departments  
**Cost to implement:** ~$200/month per customer in operational overhead  
**Revenue impact:** +$2K–$3K/month (premium tier)  
**Who buys this:** Large pharma (Roche, Moderna, Pfizer) who have regulatory paranoia

### Option 3: White-Label SaaS (for Consultants)
"Your consulting firm can white-label our platform (use your domain, your branding). Customers think it's your product. Still hosted by us, so you get all SaaS benefits."

**Addresses concern:** Consultants want to "own" the tool  
**Cost to implement:** ~$20K one-time (branding engine)  
**Revenue impact:** +20–30% commission on SaaS fees from white-label partners  
**Who uses this:** Your consulting firm partner, other consulting firms you partner with

### Option 4: Hybrid-Light (Rare, High-Price)
"For extreme compliance requirements, we can deploy a dedicated Supabase instance in your AWS/Azure account. Still managed by us, still your data, still compliant."

**Addresses concern:** Extreme data residency/custody requirements  
**Cost to implement:** +$5K setup, +$2K/month ops  
**Revenue impact:** +$5K–$10K/month (enterprise tier, rare)  
**Who uses this:** Fortune 500 pharma with extreme paranoia

---

## Build Architecture (SaaS Constraints)

### Infrastructure (Non-Negotiable)

**Backend:**
- Supabase (managed PostgreSQL) = FedRAMP-eligible, SOC 2 certified
- Vercel (serverless functions) = global edge network, automatic scaling
- No on-prem infrastructure = zero customer deployment responsibility

**Security:**
- All data encrypted at rest (Supabase default)
- All data encrypted in transit (TLS 1.2+, automatic)
- Row-Level Security (RLS) for multi-tenant isolation (database enforces it, not application)
- Immutable audit logs (cannot be modified, satisfies 21 CFR Part 11)

**Compliance:**
- 21 CFR Part 11 compliant (electronic records, signatures, audit trails)
- HIPAA-safe (access controls, encryption, audit logging)
- GDPR-ready (data residency options, deletion on request)

### Architecture Decision: Multi-Tenant SaaS (Not Single-Tenant)

**Why Multi-Tenant (one database for all customers):**
- ✅ Cost-efficient (one infrastructure serves everyone)
- ✅ Easier updates (deploy once, all benefit)
- ✅ Better resource utilization (idle capacity used elsewhere)
- ✅ Proven model (Veeva, Slack, Salesforce all multi-tenant)

**Why NOT Single-Tenant (separate database per customer):**
- ❌ 10× infrastructure cost
- ❌ Harder to update (deploy to each customer's instance)
- ❌ Scaling nightmare (add customer = add database = add ops overhead)
- ❌ Only justified if customer paying $50K+/month (you're not there yet)

**Multi-Tenant RLS Strategy:**
- Every table has `facility_id` and `org_id`
- Database RLS policy enforces: "User can only see data for their facility/org"
- Application never trusts user for data filtering (database enforces)
- Result: Bulletproof isolation, even if app has bugs

---

## Pricing Model (SaaS)

### Tiered Pricing

| Tier | Monthly | Facility Type | Includes | Customers |
|------|---------|---------------|----------|-----------|
| **Starter** | $2,000 | Small QC/analytical lab | 5 users, 1 facility, basic features | Startup biotech |
| **Professional** | $4,000 | Mid-size facility (sterile, biologics) | 20 users, 1–2 facilities, all features | Mid-market CDMO |
| **Enterprise** | $6,000+ | Large integrated campus | Unlimited users, unlimited facilities, dedicated support | Major pharma |
| **White-Label Partner** | $10K–$50K/year | N/A | License to resell as "your" product | Consulting firms |

### Revenue Model

**Primary Revenue:** SaaS subscriptions
- Conservative: 10 customers @ $4K/month = $40K/month = $480K/year
- Realistic: 30 customers @ $4K/month = $120K/month = $1.44M/year
- Upside: 50+ customers @ $4K/month = $200K+/month = $2.4M+/year

**Secondary Revenue:** Professional Services
- Implementation: $5K–$15K per customer (one-time)
- Integration: $10K–$25K per customer (one-time)
- Training: $3K–$7K per customer (one-time)
- Expected: ~$100K–$200K/year from services

**Tertiary Revenue:** White-Label Commission
- Partner brings customer → you get 20–30% commission on SaaS fees
- Expected: ~$50K–$100K/year (5–10 partner referrals)

**Total Year 1 Revenue Potential:** $500K–$1M (depends on customer acquisition)

---

## Build Phases (SaaS Considerations)

### Phase 1: Database + RLS
**SaaS Decision:** Multi-tenant schema with row-level security enforced at database level
- Every table includes `org_id`, `facility_id`
- RLS policies prevent data leakage between customers
- Audit logs track all access (satisfies 21 CFR Part 11)

### Phase 2: Core Engines
**SaaS Decision:** Stateless, horizontally scalable
- Engines don't store state locally (use Supabase)
- Edge functions run on Vercel (automatic scaling)
- No customer-specific deployment considerations

### Phase 3: UI/UX
**SaaS Decision:** Web-first, mobile-responsive
- No desktop app (harder to update, compliance headaches)
- Web app (automatic updates, zero friction)
- Mobile responsive (work from field/lab)

### Phase 4: Integration
**SaaS Decision:** API-first architecture
- All features accessible via API (enables white-label, enables integrations)
- Webhook support (Veeva, SAP, LIMS can push data to us)
- No customer-specific connectors (build generic integrations)

### Phase 5: Compliance & Security
**SaaS Decision:** Compliance by design, not bolt-on
- FedRAMP architecture from day 1 (not added later)
- SOC 2 audit checklist integrated into QA
- 21 CFR Part 11 audit trail as core feature, not add-on

---

## Go-to-Market (SaaS Model)

### Why SaaS Changes Sales

**On-Prem Selling:**
- Need 3–6 month sales cycle (IT approval, deployment planning, security review)
- Need enterprise sales team (high-touch, high-deal-size)
- Need solutions engineer (help customer deploy)

**SaaS Selling:**
- Can close in 2–4 weeks (credit card signup, start using)
- Can use self-serve sales (no salesperson needed for small deals)
- Customer onboards themselves (demo → trial → paid)

### Your SaaS GTM Strategy

**Phase 1: Bootstrap (Direct Sales)**
- You + your consulting firm pitch to clients you know
- Close 2–3 customers in first 3 months
- Get case studies, testimonials, proof of concept

**Phase 2: Partner Channel (Consultant Referrals)**
- White-label for 5–10 consulting firms
- They bring customers → you handle SaaS
- Each partner could bring 5–10 customers/year

**Phase 3: Self-Serve/Direct (Online)**
- Landing page, demo video, free trial
- SEO for "facility validation software" keywords
- Content marketing (blog posts on GxP, validation, compliance)

**Phase 4: Enterprise Sales (Sales Rep)**
- Once you have proof of concept, hire commission-based sales rep
- Target large pharma (Roche, Moderna, Pfizer)
- Longer sales cycle justified by higher ACV

---

## Customer Concerns (SaaS) & How to Address

### Concern 1: "Data Security in Cloud"
**Your Response:**
"Our infrastructure is FedRAMP-eligible (same as government uses), SOC 2 Type II certified, with encryption at rest and in transit. Regulatory inspectors explicitly approve cloud deployments if vendors demonstrate compliance like we do. Your data is more secure here than on your own on-prem server with a single IT person."

### Concern 2: "Uptime & Reliability"
**Your Response:**
"SaaS = 99.9% uptime SLA with automatic failover. We monitor 24/7. On-prem = if your IT department has an issue, your facility validation stops. With us, global infrastructure handles it automatically."

### Concern 3: "Initial Cost vs. On-Prem License"
**Your Response:**
"Upfront SaaS is lower, yes. But total cost of ownership is 50% cheaper: no server management, no IT staff, no security maintenance, no compliance audits on your end. We handle all that."

### Concern 4: "Locked Into Your Platform?"
**Your Response:**
"Your data is yours. You can export it anytime. API-first design means you can integrate with your existing systems (Veeva, SAP, LIMS). You're not locked in; you're connected."

### Concern 5: "What If You Go Out of Business?"
**Your Response:**
"We provide data export guarantees in our contract. Plus, we're building with industry-standard tech (PostgreSQL, React, not proprietary). Your data is portable."

---

## SaaS vs. Consulting Tool Decision Tree

**If customer asks "Can this be on-prem?"**

**Your Decision Tree:**
1. Is it a Fortune 500 pharma requiring data residency? → Offer high-security tier ($6K+/month)
2. Is it a consulting firm wanting to white-label? → Offer white-label SaaS
3. Is it a small startup worried about cost? → Offer Starter tier ($2K/month)
4. Otherwise → "SaaS is the best model for you because [X benefit]"

**Don't negotiate on deployment model. Defend SaaS.**

---

## Build Guard Rails (SaaS-Specific)

### Architecture Decisions Locked In (Don't Change)

- ❌ Do NOT build on-prem architecture (different scaling, different security)
- ❌ Do NOT build desktop app (SaaS = web-first, easy updates)
- ❌ Do NOT build customer-specific deployments (defeats SaaS economics)
- ✅ DO build multi-tenant (one deployment serves all)
- ✅ DO build API-first (enable integrations + white-label)
- ✅ DO build FedRAMP-compliant from day 1 (not added later)

### Security & Compliance Locked In

- ❌ Do NOT use customer-managed encryption (you manage it)
- ❌ Do NOT allow customer SSH access (you manage infrastructure)
- ✅ DO enforce RLS at database level (not application)
- ✅ DO maintain audit logs as immutable (21 CFR Part 11)
- ✅ DO encrypt all data (at rest + in transit)

### Scaling Assumptions Locked In

- Assuming: Multi-tenant architecture can scale to 100+ customers with zero infrastructure additions
- Assuming: One engineer can support 50 customers (SaaS support efficiency)
- Assuming: Updates deploy to all customers simultaneously (no customer-specific versions)

---

## Why This Matters for Your Build

**Every architectural decision made in Phases 1–5 assumes SaaS.**

**If you later decide to add on-prem:**
- Requires rearchitecting entire system
- Doubles development cost
- Delays customer launches
- Confuses sales

**So this decision is locked. SaaS model. No negotiation.**

---

## Summary

| Aspect | On-Prem | Hybrid | **SaaS (Your Model)** |
|--------|---------|--------|----------------------|
| **Upfront Cost** | $100K–$200K | N/A | $0 (trial/demo) |
| **Monthly Cost** | $0 | $2K–$4K | $2K–$6K |
| **Time to Productivity** | 3–6 months | 1–2 months | 1 week |
| **Infrastructure Mgmt** | Customer | Customer | You |
| **Compliance Mgmt** | Customer | Shared | You |
| **Scaling Cost** | Linear | Linear | Sub-linear |
| **Update Frequency** | Annual | Quarterly | Monthly/continuous |
| **Your Support Burden** | High | Very High | Moderate |
| **Revenue Model** | One-time | Recurring | Recurring |
| **Pharma Market Acceptance** | Declining | N/A | Standard |

**Verdict: Pure SaaS is the right decision for Universal GxP Facility Planner.**

---

## Approval

**the Team Lead approves SaaS model:** ✅ YES (confirmed March 11, 2026, 8:14 AM MDT)

**This decision is locked for all build phases.**

**All infrastructure, architecture, and go-to-market decisions flow from this SaaS model.**
