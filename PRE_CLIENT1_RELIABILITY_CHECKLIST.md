# Pre-Client-1 Reliability Checklist
_GxP Facility Planner — Must be complete before first paying customer_

---

## Database
- [ ] Multi-AZ primary database provisioned
- [ ] Synchronous read replica in separate AZ
- [ ] Continuous backups enabled
- [ ] Point-in-time recovery (PITR) tested — confirm restore to a specific minute
- [ ] Backup retention set to minimum 30 days (90 days preferred for GxP audit trail)
- [ ] Replication lag monitored (alert if >10s)
- [ ] Failover tested in staging — replica promoted successfully
- [ ] 21 CFR Part 11 audit log table confirmed immutable (no UPDATE/DELETE)

## Application Layer
- [ ] Minimum 2 app nodes running in separate AZs
- [ ] Load balancer with health checks configured
- [ ] Health check endpoint live (`/api/health` returns 200)
- [ ] Rolling deploy tested — zero downtime during deploy
- [ ] Auto-replace on crash confirmed working

## Redis
- [ ] Redis cluster provisioned (HA mode)
- [ ] Persistence enabled (RDB + AOF)
- [ ] Session storage pointed to Redis (not in-memory)
- [ ] Rate limiting using Redis confirmed
- [ ] Redis failover tested

## Object Storage
- [ ] Bucket versioning enabled (required for 21 CFR Part 11 document control)
- [ ] Soft delete / object lock enabled
- [ ] Multi-AZ redundancy confirmed
- [ ] Lifecycle policy set (GxP records: minimum 5-year retention)

## Secrets Management
- [ ] All secrets moved out of .env files
- [ ] Secrets vault provisioned (Vault, AWS Secrets Manager, Doppler, etc.)
- [ ] CI/CD reads secrets from vault (not from repo)
- [ ] No secrets in Git history — confirmed with `git log` scan
- [ ] Developer access to production secrets revoked / audited

## Monitoring & Alerts
- [ ] CPU alert: >80% for 5 min
- [ ] Memory alert: >85% for 5 min
- [ ] Disk alert: >80%
- [ ] Error rate alert: >1% of requests
- [ ] Latency alert: p99 >2s
- [ ] Replication lag alert: >10s
- [ ] Backup failure alert: any missed backup
- [ ] All alerts routed to Bobby BIG (SMS or email)

## Logging (GxP-Critical)
- [ ] Access logs enabled — minimum 5-year retention (21 CFR Part 11)
- [ ] Error logs enabled — minimum 90-day retention
- [ ] Security/auth logs: all login attempts, permission errors, role changes
- [ ] Audit log: every create/update/delete on validation, risk, deviation, document records
- [ ] Log tamper-protection in place (append-only or signed)
- [ ] Log search working (find specific request or record change by ID)

## Deploy Safety
- [ ] Staging environment mirrors production
- [ ] Database migration tested in staging before production
- [ ] Rollback procedure documented and tested
- [ ] Change control log updated for every production deploy

## GxP-Specific
- [ ] Electronic signature capability confirmed (21 CFR Part 11 §11.50)
- [ ] Audit trail covers all GxP records (who, what, when, why)
- [ ] Data integrity controls validated (ALCOA+: Attributable, Legible, Contemporaneous, Original, Accurate)
- [ ] Tenant data isolation confirmed via RLS policies
- [ ] Bobby BIG GxP validation sign-off completed

## Verification
- [ ] Full disaster recovery drill completed (simulate DB failure → restore)
- [ ] All checklist items signed off by Bobby BIG
- [ ] Sign-off date recorded: _______________

---
_This checklist must be 100% complete before Client 1 onboards. No exceptions._
