# Chitrapatang Terminal — System Design & Architecture Patterns

> **Comprehensive Overview of System Design Patterns, Database Strategies, and Software Architecture in Chitrapatang Terminal.**

---

## Executive Summary

Chitrapatang Terminal implements industry-standard distributed systems patterns, database normalization, and type-safe API architectures to ensure scalability, fault isolation, and developer ergonomic excellence across web and desktop platforms.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        SYSTEM DESIGN PATTERNS                             │
│                                                                           │
│  1. Monorepo Architecture (Turborepo + pnpm Workspaces)                  │
│  2. Class Table Inheritance (CTI) Database Pattern                        │
│  3. Single-Table State Machine (Employee Invitation Lifecycle)            │
│  4. Keyset (Cursor-Based) Pagination Pattern                              │
│  5. End-to-End Type-Safe RPC (tRPC Layer)                                 │
│  6. Bounded Context & Application Guardrails (4-Channel Hard Cap)        │
│  7. Dynamic Token Authorization & Append-Only Audit Logging               │
│  8. Shared Cross-Platform UI Architecture (Next.js + Tauri Desktop)       │
│  9. Time-Series ML Predictive Burndown & Velocity Engine                  │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Monorepo Architecture (Turborepo + pnpm Workspaces)

### Pattern: Code Reuse & Decoupled Application Boundaries
Chitrapatang isolates business domains into modular internal packages (`packages/`) while serving client apps (`apps/`):

```
chitrapatang/
├── apps/
│   ├── api/                # Express API server hosting tRPC context & endpoints
│   ├── web/                # Next.js 16 Web Application Frontend
│   └── tauri-app/          # Tauri Desktop Client Wrapper
└── packages/
    ├── database/           # Drizzle ORM models (user/, workspace/, etc/)
    ├── services/           # Business logic layer (WorkspaceService, UserService)
    ├── trpc/               # Shared type-safe tRPC routers
    ├── logger/             # Winston structured logging
    └── utils/              # Redis, Resend SDK, & Cryptographic utilities
```

**Benefits:**
- Shared compiler target (`@repo/typescript-config`) & ESLint rules (`@repo/eslint-config`).
- Zero duplicate type definitions: Frontend imports backend router types directly.
- Incremental builds & caching via Turborepo (`turbo.json`).

---

## 2. Class Table Inheritance (CTI) & Database Normalization

### Pattern: Decoupling Credentials from Domain Roles
To prevent credential duplication and maintain 3rd Normal Form (3NF), authentication metadata is strictly separated from workspace-specific roles.

```
                  ┌───────────────────────┐
                  │         users         │
                  │ (Base Auth Metadata)  │
                  └───────────┬───────────┘
                              │ 1
                              │
               ┌──────────────┴──────────────┐
               │ 1..N                        │ 1..N
    ┌──────────▼──────────┐       ┌──────────▼──────────┐
    │   refresh_tokens    │       │      employees      │
    │  (Session Management│       │ (Workspace Role &   │
    └─────────────────────┘       │  Membership State)  │
                                  └─────────────────────┘
```

- **Base Table (`users`):** Contains universal identity (`email`, `password_hash`, `email_verified`, `profile_image_url`).
- **Domain Role (`employees`):** Contains workspace-scoped properties (`role`, `status`, `invite_code`).

---

## 3. Single-Table State Machine (Invitation Lifecycle)

### Pattern: Nullable Foreign Key State Machine
Instead of creating temporary invitation tables or complex join tables, Chitrapatang manages the entire employee onboarding lifecycle within the `employees` table using a PostgreSQL custom enum (`employee_status`).

```
                    ┌────────────────────────┐
                    │      State: PENDING    │
                    │  userId: NULL          │
                    │  inviteCode: "ABC-123" │
                    └───────────┬────────────┘
                                │
                      User Claims Code on /GetStarted
                                │
               ┌────────────────┴────────────────┐
               │                                 │
     Manager Approves                    Manager Rejects
               │                                 │
    ┌──────────▼─────────────┐       ┌───────────▼────────────┐
    │     State: ACTIVE      │       │    State: REJECTED     │
    │ userId: attached       │       │ userId: attached/NULL  │
    │ inviteCode: cleared    │       │ Row kept for audit     │
    └────────────────────────┘       └────────────────────────┘
```

**Key Advantages:**
- **Zero-Join Onboarding:** Queries filter directly by `invite_code` without complex table joins.
- **Audit Preservation:** Rejected or revoked members retain their state in-place for compliance auditing.

---

## 4. Keyset (Cursor-Based) Pagination Pattern

### Pattern: $O(1)$ Real-Time Chat Message Retrieval
Offset-based pagination (`OFFSET 1000`) degrades performance as tables grow. Chitrapatang uses sequential `BIGSERIAL` primary keys (`id`) on the `messages` table for cursor-based keyset pagination:

```sql
-- Fetching previous 50 messages before cursor ID
SELECT id, channel_id, sender_id, content, created_at
FROM messages
WHERE channel_id = $1 AND id < $cursor_id
ORDER BY id DESC
LIMIT 50;
```

```
           Latest Messages (Highest BIGSERIAL ID)
                           │
             ┌─────────────▼─────────────┐
             │ Message ID: 1000005       │
             │ Message ID: 1000004       │
             │ Message ID: 1000003 (Cursor) ◄── Next fetch starts here
             └─────────────┬─────────────┘
                           │
             ┌─────────────▼─────────────┐
             │ Message ID: 1000002       │
             │ Message ID: 1000001       │
             └───────────────────────────┘
```

**Benefits:**
- Constant time execution $O(1)$ indexed scan regardless of table size (millions of rows).
- Immune to missing or duplicate items when new chat messages arrive concurrently.

---

## 5. End-to-End Type-Safe RPC (tRPC Architecture)

### Pattern: Schema-Less Client-Server Contract
Instead of REST endpoints or GraphQL schema compilation, Chitrapatang exports router types directly from `@repo/trpc`:

```
┌─────────────────────────────────┐       Shared Types        ┌─────────────────────────────────┐
│           Next.js Web           │ ────────────────────────► │        Express API Server       │
│    (apps/web/hooks/use-auth)    │ ◄──────────────────────── │        (packages/trpc)          │
└─────────────────────────────────┘     tRPC Client Call      └─────────────────────────────────┘
```

```typescript
// Shared Server Router Definition (packages/trpc/server/index.ts)
export const serverRouter = router({
  workspace: workspaceRouter,
  user: userRouter,
});

export type ServerRouter = typeof serverRouter;
```

---

## 6. Bounded Context & Application Guardrails

### Pattern: Architectural Constraints as Business Limits
To prevent system misuse and maintain team focus:

1. **4-Channel Hard Cap:**
   - Every workspace is strictly limited to 4 channels (`channel_threshold = 4`).
   - Prevents communication sprawl and forces intentional team channel design.
2. **Markdown Documentation Cap:**
   - `ticket_docs.content_md` enforces an upper bound limit to keep workspace DB footprints lean.

---

## 7. Dynamic Token Security & Append-Only Audit Logging

### Pattern: Sprint-Level Authorization Keys with Dual Logging
Sprint data access is protected by dynamic, cryptographically generated tokens:

- **`read_key`**: Grants read-only visualization rights to sprint boards and ticket documentation.
- **`write_key`**: Grants mutation privileges for ticket stage transitions (`assigned` → `working` → `finished`).

Every read and write request is logged in append-only tables (`read_logs` & `write_logs`) to track user activity, timestamp, and IP signature.

---

## 8. Cross-Platform Desktop & Web Architecture

### Pattern: Single Core UI for Web & Native Desktop
Chitrapatang compiles a unified Next.js codebase that runs seamlessly in modern browsers and inside a native **Tauri Desktop Client** wrapper (`apps/tauri-app`):

```
┌──────────────────────────────────────────────────────────┐
│                   Unified Next.js UI                     │
├────────────────────────────┬─────────────────────────────┤
│   Next.js App Router       │    Tauri Desktop Window     │
│   (Web Browser Mode)       │    (Rust Native Client)     │
└────────────────────────────┴─────────────────────────────┘
```

---

## 9. Machine Learning Predictive Analytics Engine

### Pattern: Time-Series Regression & Velocity Forecasting
Integrated ML regression models analyze historical velocity, ticket story points, commit density, and developer workload:

- **Burndown Prediction:** Compares actual completion rates against ideal linear burndown curves.
- **Burnout Prevention:** Detects individual developer over-allocation before sprint deadlines.

---

*Chitrapatang Terminal — Architectural Specification & System Design Reference.*
