# Pre-Client-1 Architecture Diagram
_GxP Facility Planner — Minimum Viable Reliable Stack_

---

```
                          INTERNET
                              |
                    [ Load Balancer / CDN ]
                    Vercel Edge / Cloudfront
                              |
              ┌───────────────┴───────────────┐
              │                               │
        [ App Node A ]                 [ App Node B ]
          AZ-1 (us-east-1a)             AZ-2 (us-east-1b)
          Next.js / Node                Next.js / Node
              │                               │
              └───────────────┬───────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
     [ Redis Cluster ]  [ Secrets Vault ]  [ Object Storage ]
       HA + Persistent    Doppler / Vault   S3 + Versioning
       Sessions / Cache   No .env files     Multi-AZ
       Rate Limiting      Audit log         Soft Delete
                                            5-yr GxP retention
              │
              └──────────────────────────────┐
                                             │
                              ┌──────────────┴──────────────┐
                              │                             │
                   [ Primary DB ]              [ Replica DB ]
                   PostgreSQL (Supabase)        Sync Replica
                   AZ-1                         AZ-2
                   Read + Write                 Read-only / Failover
                   PITR Enabled                 Replication lag <10s
                   Continuous Backups
                   Immutable Audit Log
                              │
                   [ Backup Storage ]
                   PITR + Daily Snapshots
                   30–90 day retention
                   GxP: 5-year minimum
```

---

## Data Flow

```
User Request
  → Load Balancer (health-checked)
    → App Node (stateless, either AZ)
      → Redis (session/cache lookup)
      → Secrets Vault (credentials at runtime)
      → Primary DB (writes) or Replica (reads)
      → Immutable Audit Log (every GxP record change)
      → Object Storage (documents, validation evidence)
  → Response
```

---

## Failure Scenarios & Protection

| Failure | Protection | Recovery Time |
|---------|-----------|---------------|
| Single app node crash | LB routes to other node | <30s (auto) |
| AZ outage (app) | Other node in separate AZ | <30s (auto) |
| DB node failure | Replica promoted to primary | 1–5 min |
| Human error (bad migration) | PITR restores to minute before | 15–60 min |
| Accidental document deletion | Object versioning, soft delete | Minutes |
| Secret leaked | Vault rotation, no .env files | Minutes |
| Bad deploy | Rolling deploy rolls back | <5 min |
| Full AZ outage | Multi-AZ across all layers | 1–5 min |
| Audit log tampered | Append-only + signed log | Detected immediately |

---

## Technology Options

| Layer | Option A (Supabase-native) | Option B (Standalone) |
|-------|--------------------------|----------------------|
| DB Primary + Replica | Supabase Pro + Read Replica | AWS RDS Multi-AZ |
| Backups + PITR | Supabase PITR add-on | AWS RDS automated |
| App Layer | Vercel (auto-scales) | Railway / Render 2-node |
| Redis | Upstash Redis (HA) | AWS ElastiCache |
| Object Storage | Supabase Storage (S3-backed) | AWS S3 |
| Secrets | Doppler ($0–$10/mo) | AWS Secrets Manager |
| Monitoring | Grafana Cloud (free tier) | Datadog |
| Logging | Supabase logs + Logtail | Papertrail / Axiom |
| Audit Trail | Supabase (immutable table + RLS) | Custom append-only log |
