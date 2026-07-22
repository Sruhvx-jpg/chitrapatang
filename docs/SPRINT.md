# Chitrapatang Terminal — Project Sprint Roadmap & Backlog

> **4-Sprint Execution Roadmap, Story Point Allocations, Package Targets, and Technical Milestone Tracking.**

---

## 🧭 Navigation
[⬅ Master Documentation Hub](README.md) • [Agile Scrum Guide](SCRUM.md) • [System Design](SYSTEM_DESIGN.md) • [API Reference](API_REFERENCE.md) • [Frontend Design](FRONTEND_DESIGN.md)

---

## Sprint Backlog Summary

```
Total Backlog Points: 93 Story Points
Completed (Sprint 1 & 2): 30 Story Points
In Progress: 8 Story Points
Planned (Sprint 3 & 4): 55 Story Points
```

---

## 🏃 Sprint Breakdown

### Sprint 1: Monorepo Foundation & Core Auth Architecture
- **Goal:** Establish Turborepo workspace structure, authentication tables, cryptography utilities, and Next.js onboarding screens.
- **Status:** `RELEASED` • **Completed Points:** 15 pts

| Ticket ID | Description | Priority | Story Points | Status | Target Package / App |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `CP-101` | Initialize Turborepo & pnpm workspace packages | `P0` | 5 pts | `finished` | `root` & `packages/*` |
| `CP-102` | Implement Base `users` & `refresh_tokens` Drizzle Schemas | `P0` | 5 pts | `finished` | `packages/database` |
| `CP-103` | AES-256-CBC Cryptography & Env Zod Schemas | `P1` | 3 pts | `finished` | `packages/utils` |
| `CP-104` | `/GetStarted` Authentication Screens & Theme Toggle | `P1` | 2 pts | `finished` | `apps/web` |

---

### Sprint 2: Workspace Domain Services & Invitation System
- **Goal:** Implement WorkspaceService, single-table employee invitation claim logic, and manager approval workflows.
- **Status:** `ACTIVE` • **Allocated Points:** 23 pts (15 Completed, 8 In Progress)

| Ticket ID | Description | Priority | Story Points | Status | Target Package / App |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `CP-201` | WorkspaceService & Workspace model reorganization | `P0` | 8 pts | `finished` | `packages/services/workspace` |
| `CP-202` | Single-table `employees` state machine (`pending` → `active`) | `P0` | 7 pts | `finished` | `packages/database` |
| `CP-203` | Real-time Manager Invitation Approval API procedure | `P1` | 5 pts | `working` | `packages/trpc` |
| `CP-204` | Employee onboarding claim screen on `/GetStarted` | `P2` | 3 pts | `working` | `apps/web` |

---

### Sprint 3: High-Throughput Chat Messaging & Channel Hard Cap
- **Goal:** Enforce 4-channel hard cap per workspace, build keyset cursor-based chat pagination, and integrate WebSocket subscriptions.
- **Status:** `PLANNED` • **Allocated Points:** 24 pts

| Ticket ID | Description | Priority | Story Points | Status | Target Package / App |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `CP-301` | Enforce 4-Channel Hard Cap (`channel_threshold = 4`) | `P0` | 5 pts | `planning` | `packages/services` |
| `CP-302` | Keyset (Cursor-Based) Chat Pagination Procedure (`id < cursor`) | `P0` | 8 pts | `planning` | `packages/trpc` |
| `CP-303` | WebSocket Subscriptions for Channel Chat Sync | `P1` | 8 pts | `planning` | `apps/api` |
| `CP-304` | Redis Pub/Sub Adapter for Multi-Node Scaling | `P2` | 3 pts | `planning` | `packages/utils` |

---

### Sprint 4: Interactive Kanban Board, ML Burndown & Desktop App
- **Goal:** Build drag-and-drop Kanban Board, Markdown Documentation Editor (`ticket_docs`), ML Predictive Burndown engine, and Tauri desktop build.
- **Status:** `PLANNED` • **Allocated Points:** 31 pts

| Ticket ID | Description | Priority | Story Points | Status | Target Package / App |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `CP-401` | Interactive Kanban Sprint Board (`assigned` → `working` → `finished`) | `P0` | 8 pts | `planning` | `apps/web/app/dashboard` |
| `CP-402` | Markdown Ticket Documentation Editor (`ticket_docs`) | `P1` | 5 pts | `planning` | `apps/web/components/tickets` |
| `CP-403` | Autonomous AI Scrum Master Agent (Standups & Velocity Tracking) | `P0` | 13 pts | `planning` | `apps/api` & `packages/services` |
| `CP-404` | Predictive ML Burndown & Velocity Forecasting Engine | `P1` | 8 pts | `planning` | `packages/services/ml` |
| `CP-405` | Tauri Desktop Client Integration & Native Build Packaging | `P2` | 5 pts | `planning` | `apps/tauri-app` |

---

## 📈 Capacity & Velocity Strategy

- **Sprint Duration:** 2 Weeks (10 Working Days).
- **Target Team Velocity:** 24–30 Story Points per Sprint.
- **Developer Commitment:** 4–5 Hours / Day solo developer effort (~150–195 total dev hours for full roadmap).

---

*Chitrapatang Terminal — Sprint Execution Roadmap.*
