# Chitrapatang Terminal — Agile Scrum Guide

> **AI-Native Agile Project Management for Engineering Teams.**
>
> This document outlines how the Scrum framework is applied within Chitrapatang Terminal — from workspace creation to ticket delivery. Every concept maps directly to the platform's database models, UI components, and service layer.

---

## 1. Scrum Framework Overview

Scrum is an iterative, incremental framework for managing complex product development. It structures work into fixed-length iterations called **Sprints**, each producing a potentially shippable product increment.

![Agile Scrum Framework Cycle](./docs/assets/scrum_sprint_cycle.png)

### The Sprint Cycle

| Phase                    | Purpose                                                                 | Duration         |
|--------------------------|-------------------------------------------------------------------------|------------------|
| **Product Backlog**      | Ordered list of everything needed in the product                        | Ongoing          |
| **Sprint Planning**      | Team selects items from the backlog and defines the Sprint Goal          | ~2 hours/sprint  |
| **Sprint Backlog**       | Subset of backlog items committed for the current sprint                | Sprint duration  |
| **Daily Standup**        | 15-min sync: What did I do? What will I do? Any blockers?               | 15 min/day       |
| **Sprint Review**        | Demonstrate completed work to stakeholders                              | ~1 hour/sprint   |
| **Sprint Retrospective** | Reflect on the sprint process and identify improvements                 | ~1 hour/sprint   |

---

## 2. Scrum Roles

Each workspace in Chitrapatang Terminal maps directly to a Scrum team structure.

![Scrum Roles](./docs/assets/scrum_roles.png)

### Role Mapping in Chitrapatang

| Scrum Role           | Chitrapatang Equivalent          | Database Model                          |
|----------------------|----------------------------------|-----------------------------------------|
| **Product Owner**    | Workspace Owner (`owner_id`)     | `workspaces.owner_id` → `users.id`      |
| **Scrum Master**     | Manager-role Employee            | `employees.role = "Manager"`            |
| **Development Team** | Active Employees                 | `employees.status = "active"`           |

#### How Roles Work

- **Workspace Owner (Product Owner):** Creates the workspace, manages the product backlog (projects & tickets), invites team members, and has final approval authority over employee invitations.
- **Manager (Scrum Master):** Facilitates sprint ceremonies, generates invite codes for new employees, and approves/rejects join requests in real-time.
- **Active Employees (Dev Team):** Self-organizing team members who pick up tickets, transition them through stages, and deliver increments.

---

## 3. Workspace & Team Structure

```
Workspace (workspaces)
├── Owner (users.id → workspaces.owner_id)
├── Channels (workspace_channels) — max 4 per workspace
│   └── Messages (messages) — keyset paginated
├── Employees (employees)
│   ├── Active members (status = "active")
│   ├── Pending invites (status = "pending", inviteCode set)
│   └── Rejected/Revoked (status = "rejected" | "revoked")
└── Projects (projects)
    └── Tickets (tickets)
        ├── Assignments (ticket_assignments)
        └── Documentation (ticket_docs)
```

### Employee Invitation Flow

The single-table invitation system (`employees` table) manages onboarding:

```
Manager creates invite → Employee row created (status="pending", inviteCode set)
                              ↓
User enters invite code → Claim request sent to manager
                              ↓
             ┌──── Manager Approves ────┐
             │                          │
    userId attached to row       status → "active"
    inviteCode cleared           Employee is now part of the team
             │
             └──── Manager Rejects ─────┐
                                        │
                              status → "rejected"
                              Row preserved for audit
```

---

## 4. Ticket Lifecycle & Sprint Board

Tickets are the atomic unit of work in Chitrapatang. Each ticket belongs to a **project**, which belongs to a **workspace**.

### Ticket Stage Lifecycle

![Ticket Lifecycle](./docs/assets/ticket_lifecycle.png)

| Stage        | Enum Value   | Description                                         |
|--------------|-------------|------------------------------------------------------|
| **Assigned** | `assigned`  | Ticket created & employee assigned, work not started  |
| **Working**  | `working`   | Employee actively developing the ticket               |
| **Finished** | `finished`  | Work completed, ready for review                      |

### Sprint Board View

![Sprint Board](./docs/assets/sprint_board.png)

The sprint board maps directly to the `ticket_assignments.stage` enum:

| Board Column           | Stage Enum | Color   |
|------------------------|-----------|---------|
| **To Do / Assigned**   | `assigned` | Gray    |
| **In Progress / Working** | `working` | Blue |
| **Done / Finished**    | `finished` | Green   |

---

## 5. Scrum Artifacts in Chitrapatang

### Product Backlog → Projects & Tickets

The product backlog is represented by the combination of `projects` and their child `tickets`:

- **Projects** link a workspace to a GitHub repository (`projects.repo`)
- **Tickets** are individual work items with title, description, and optional repo link
- **Ticket Docs** (`ticket_docs`) hold detailed markdown specifications (up to 10k chars)

### Sprint Backlog → Ticket Assignments

When a sprint begins, tickets are assigned to employees via `ticket_assignments`:

- Each assignment has a **composite primary key** (`ticket_id`, `employee_id`)
- Tracks `start_date` and optional `deadline`
- Stage transitions (`assigned` → `working` → `finished`) track progress

### Increment → Finished Tickets

The sprint increment consists of all tickets moved to `finished` stage during the sprint.

---

## 6. Scrum Events & Channels

Workspace channels (`workspace_channels`) facilitate Scrum ceremonies:

| Channel Purpose       | Example Channel Name | Used For                                    |
|-----------------------|---------------------|----------------------------------------------|
| **General**           | `#general`          | Team-wide announcements and discussions       |
| **Daily Standup**     | `#standup`          | Async standup updates and blocker reports     |
| **Sprint Planning**   | `#sprint-planning`  | Sprint goal discussions and backlog grooming  |
| **Retrospective**     | `#retro`            | Post-sprint reflections and improvements      |

> **Note:** Each workspace has a hard cap of **4 channels** (`channel_threshold = 4`), enforced at the application layer. This constraint encourages focused communication.

---

## 7. Data Flow Summary

```
User authenticates
    ↓
Workspace discovered (owned or employee membership)
    ↓
GetStarted → Create Workspace OR Join via Invite Code
    ↓
┌─────────────────────────────────────────────────┐
│                  WORKSPACE                      │
│                                                 │
│  Channels ←──── Messages (real-time chat)       │
│                                                 │
│  Projects ←──── Tickets                         │
│                   ├── Assignments (stage enum)   │
│                   └── Docs (markdown specs)      │
│                                                 │
│  Employees ←──── Invite system (single-table)   │
└─────────────────────────────────────────────────┘
```

---

## 8. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Single-table employee invitations** | Avoids join complexity; `status` enum + nullable `userId` handles the full invite lifecycle in one row |
| **PostgreSQL enums for state** | `employee_status` and `stage` enums enforce valid state transitions at the database level |
| **4-channel hard cap** | Prevents channel sprawl; forces teams to organize communication intentionally |
| **Keyset pagination for messages** | `BIGSERIAL` ID enables efficient cursor-based pagination for high-volume chat |
| **Composite PK on assignments** | Prevents duplicate assignments while enabling many-to-many ticket ↔ employee relationships |
| **Cascading deletes** | Workspace deletion cascades to channels, messages, projects, tickets, and employees — clean teardown |

---

## 9. Sprint Checklist Template

Use this checklist at the start of each sprint:

- [ ] **Sprint Planning** — Define sprint goal and select tickets from backlog
- [ ] **Assign Tickets** — Create `ticket_assignments` for each team member
- [ ] **Set Deadlines** — Populate `deadline` field on critical assignments
- [ ] **Daily Standups** — Post updates in the `#standup` channel
- [ ] **Track Progress** — Move tickets through `assigned` → `working` → `finished`
- [ ] **Sprint Review** — Demo finished tickets to the workspace owner
- [ ] **Retrospective** — Discuss what went well, what to improve in `#retro`

---

*Built with Chitrapatang Terminal — AI-Native Agile for modern engineering teams.*
