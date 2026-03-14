# Budget-Optimized Implementation Plan
_GxP Facility Planner — Pre-Client-1 Reliability Stack_

---

## Guiding Principle
Spend the minimum required to be safe and GxP-compliant. Don't buy enterprise tier before you have enterprise customers.

---

## Phase 1: Zero Cost Right Now (Do This Week)
_$0/mo additional — use what you already have_

| Task | Tool | Cost |
|------|------|------|
| Move all secrets out of .env | Doppler free tier | $0 |
| Enable Supabase PITR (test) | Supabase dashboard | $0 |
| Set up error alerting | Vercel + email | $0 |
| Enable Supabase access logs | Dashboard toggle | $0 |
| Audit Git history for leaked secrets | `git log -p \| grep -i key` | $0 |
| Make audit_log table append-only (RLS: no UPDATE/DELETE) | SQL migration | $0 |
| Document rollback procedure | Markdown file | $0 |

**Phase 1 cost: $0**
**Outcome:** Secrets protected, GxP audit log locked, baseline safety in place

---

## Phase 2: Pre-Launch Minimum (Before Client 1 Pays)
_Activate 1 week before launch_

| Component | Choice | Monthly Cost |
|-----------|--------|-------------|
| DB: Upgrade Supabase to Pro | Supabase Pro | $25 |
| DB: Enable PITR | Supabase PITR add-on | ~$10 |
| DB: Read Replica | Supabase read replica | $25 |
| App: Vercel Pro | Vercel Pro | $20 |
| Redis: Upstash HA | Upstash Pay-as-you-go | $10–20 |
| Secrets: Doppler | Doppler free/team | $0–10 |
| Monitoring: Grafana Cloud | Free tier | $0 |
| Logging: Logtail | Free tier (1GB/day) | $0 |

**Phase 2 cost: ~$90–$110/mo**
**Outcome:** Multi-AZ DB, PITR, HA Redis, secrets vault, monitoring — all live before first facility client

---

## Phase 3: After Client 1 Is Paying
_Upgrade when revenue covers it_

| Upgrade | When | Est. Cost |
|---------|------|-----------|
| Dedicated DB node | 3–5 clients | +$100–150/mo |
| Extended log retention (5 years GxP) | Any client with FDA obligation | +$20–40/mo |
| Multi-AZ app nodes | If Vercel isn't enough | +$40–60/mo |
| Dedicated Redis | >50 active users | +$20–40/mo |
| Per-tenant encryption keys | Enterprise tier clients | Custom |

**Phase 3 cost: ~$250–$360/mo total**

---

## Full Enterprise Stack (Defer Until 10+ Clients)
- Multi-region DR: +$200–300/mo
- Immutable cold backups with cryptographic signing: +$30–60/mo
- Distributed tracing: +$50–100/mo
- Per-tenant restore workflows: custom build

**Don't build this until you have the revenue to justify it.**

---

## Implementation Order

```
Week 0 (Now):
  1. Secrets → Doppler
  2. Git audit for leaks
  3. Enable all available logging
  4. Make audit_log append-only (RLS migration)
  5. Write rollback procedure

Week -1 (7 days before launch):
  6. Upgrade Supabase to Pro
  7. Enable PITR
  8. Add read replica
  9. Configure Upstash Redis HA
  10. Set up Grafana monitoring + alerts
  11. Test PITR restore in staging
  12. Validate audit log immutability

Launch Day:
  13. Verify all Phase 2 items active
  14. Run full reliability checklist
  15. the Team Lead GxP sign-off
```

---

## Budget Summary

| Phase | When | Monthly Cost |
|-------|------|-------------|
| Phase 1 | Now | $0 |
| Phase 2 | Pre-launch | $90–$110 |
| Phase 3 | Post-Client 1 | $250–$360 |
| Enterprise | 10+ clients | $600+ |
