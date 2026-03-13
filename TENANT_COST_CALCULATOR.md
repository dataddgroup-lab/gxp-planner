# Tenant-Based Cost Calculator
_GxP Facility Planner — Infrastructure cost per facility client as you scale_

---

## Fixed Costs (Regardless of Tenant Count)

| Component | Monthly Cost |
|-----------|-------------|
| Supabase Pro (DB + Auth + Storage) | $25 |
| Supabase Read Replica | $25 |
| Supabase PITR | ~$10 |
| Vercel Pro | $20 |
| Upstash Redis (HA) | $10–20 |
| Doppler (Secrets) | $0–10 |
| Grafana Cloud (Monitoring) | $0 |
| Logtail (Logging) | $0 |
| **Fixed Total** | **~$90–$110/mo** |

---

## Variable Costs (Scale With Usage)

| Driver | Unit | Est. Cost |
|--------|------|-----------|
| DB storage | per GB/mo | $0.125 (Supabase) |
| Supabase bandwidth | per GB | $0.09 |
| Object storage (validation docs) | per GB/mo | $0.021 |
| Object storage transfers | per GB out | $0.09 |
| Redis commands | per 100K requests | ~$0.20 (Upstash) |

---

## Cost Per Facility Client (Estimated)

Assumptions per active client per month:
- 1 facility, 10–20 users (QA, engineers, management)
- ~200MB DB storage (validations, risks, deviations, documents)
- ~2GB file storage (SOPs, protocols, evidence packages)
- ~1M Redis commands

| Clients | Fixed Cost | Variable Cost | Total/mo | Cost/Client |
|---------|-----------|--------------|----------|------------|
| 1 | $100 | $15 | **$115** | **$115** |
| 3 | $100 | $45 | **$145** | **$48** |
| 5 | $100 | $75 | **$175** | **$35** |
| 10 | $100 | $150 | **$250** | **$25** |
| 25 | $150* | $375 | **$525** | **$21** |
| 50 | $250* | $750 | **$1,000** | **$20** |

*Infrastructure upgrade needed at 25+ clients (larger DB node)

---

## Break-Even Analysis

Assuming $1,500/mo per client (Starter tier):

| Clients | Revenue | Infra Cost | Gross Margin |
|---------|---------|-----------|-------------|
| 1 | $1,500 | $115 | $1,385 (92%) |
| 3 | $4,500 | $145 | $4,355 (97%) |
| 5 | $7,500 | $175 | $7,325 (98%) |
| 10 | $15,000 | $250 | $14,750 (98%) |
| 25 | $37,500 | $525 | $36,975 (99%) |

**Break-even: Client 1.**
**At 5 clients: 98% gross margin on infrastructure.**

---

## Pricing Tier Targets

| Tier | Price/mo | Target Client | Margin at 5 clients |
|------|----------|--------------|---------------------|
| Starter | $1,500 | Single facility, early buildout | 98% |
| Professional | $3,000 | Multi-suite, active validation | 98% |
| Enterprise | $6,000 | Multi-facility, CDMO, consulting firm | 99% |

---

## Key Insight
GxP clients pay premium prices. Infrastructure is nearly free relative to revenue.
**Even at $1,500/mo (entry tier), you're at 92% gross margin from day one.**
This is an extremely capital-efficient SaaS.
