# Chitrapatang Terminal — Project Sprint Planning

> **Official Development Roadmap & Sprint Execution Plan for Chitrapatang Terminal.**

---

## Sprint Overview & Velocity Strategy

Chitrapatang is developed using 2-week Sprint cycles. Each sprint targets specific epics across the monorepo architecture (`packages/database`, `packages/services`, `packages/trpc`, `apps/web`, `apps/api`, and `apps/tauri-app`).

Tickets and Sprint items are unified in the system model, moving through standard stages: `assigned` → `working` → `finished`.

---

## Sprint 1: Core Monorepo & Database Foundation

**Goal:** Establish the monorepo architecture, database models, directory organization, and authentication structures.

| Ticket ID | Title | Priority | Estimation | Status | Assigned Component |
|-----------|-------|----------|------------|--------|---------------------|
| `CP-101` | Database Schema & Migration Setup | `P0` | 5 pts | `finished` | `packages/database` |
| `CP-102` | Modular Model Restructuring (`user/`, `workspace/`, `etc/`) | `P0` | 3 pts | `finished` | `packages/database/models` |
| `CP-103` | Schema Documentation (`MODEL.md`) & snake_case Standards | `P1` | 2 pts | `finished` | `packages/database/models` |
| `CP-104` | User & Refresh Token Service Layer | `P1` | 5 pts | `finished` | `packages/services/user` |

---

## Sprint 2: Workspace Onboarding & Invitation Infrastructure

**Goal:** Implement the `/GetStarted` onboarding UI, workspace creation/joining dynamic flow, theme toggling, and single-table invitation backend.

| Ticket ID | Title | Priority | Estimation | Status | Assigned Component |
|-----------|-------|----------|------------|--------|---------------------|
| `CP-201` | `/GetStarted` Dynamic Layout Switcher with Loading Transitions | `P0` | 5 pts | `finished` | `apps/web/app/GetStarted` |
| `CP-202` | Reusable Mesh `GridBackground` Component with Light/Dark Support | `P1` | 3 pts | `finished` | `apps/web/components/ui` |
| `CP-203` | Single-Table Employee Invitation System (`employees` schema) | `P0` | 8 pts | `working` | `packages/services/employee` |
| `CP-204` | Workspace Service Layer & tRPC Workspace Router | `P0` | 5 pts | `finished` | `packages/services/workspace` |
| `CP-205` | Workspace Creation Form (Internal 4-Channel Threshold Enforcement) | `P1` | 2 pts | `finished` | `apps/web/components/workspace` |

---

## Sprint 3: Real-Time Messaging & Workspace Channels

**Goal:** Deliver 4-channel workspace communication, keyset-paginated chat messages, and real-time WebSocket sync.

| Ticket ID | Title | Priority | Estimation | Status | Assigned Component |
|-----------|-------|----------|------------|--------|---------------------|
| `CP-301` | Workspace Channels API & Database Queries | `P0` | 5 pts | `assigned` | `packages/services/workspace` |
| `CP-302` | Keyset Paginated Message Fetching (`BIGSERIAL` cursor) | `P0` | 8 pts | `assigned` | `packages/database/models/workspace` |
| `CP-303` | Real-Time Chat Component & Message Input UI | `P1` | 5 pts | `assigned` | `apps/web/components/chat` |
| `CP-304` | Channel Limits & System Guardrails | `P2` | 2 pts | `assigned` | `packages/trpc` |

---

## Sprint 4: Ticket Board, Docs & Autonomous AI Agent Integration

**Goal:** Complete the ticket/sprint board view, markdown document specs editor, and integrate the Chitrapatang Autonomous AI Scrum Master Agent.

| Ticket ID | Title | Priority | Estimation | Status | Assigned Component |
|-----------|-------|----------|------------|--------|---------------------|
| `CP-401` | Interactive Kanban Sprint Board (`assigned` → `working` → `finished`) | `P0` | 8 pts | `assigned` | `apps/web/app/dashboard` |
| `CP-402` | Markdown Ticket Documentation Editor (`ticket_docs`) | `P1` | 5 pts | `assigned` | `apps/web/components/tickets` |
| `CP-403` | Autonomous AI Scrum Master Agent (Standups & Velocity Tracking) | `P0` | 13 pts | `assigned` | `apps/api` & `packages/services` |
| `CP-404` | Predictive ML Burndown & Velocity Forecasting Engine | `P1` | 8 pts | `assigned` | `packages/services/ml` |
| `CP-405` | Tauri Desktop Client Integration | `P2` | 5 pts | `assigned` | `apps/tauri-app` |

---

## Sprint Backlog Summary

```
Total Backlog Points: 93 Story Points
Completed (Sprint 1 & 2): 30 Points
In Progress: 8 Points
Planned (Sprint 3 & 4): 55 Points
```

---

*Chitrapatang Terminal — Internal Sprint Roadmap.*
