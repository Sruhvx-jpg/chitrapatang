# Schema Design Rules
1. Throughout the codebase, table names and fields will follow `snake_case`.
2. High dependency on:
    a. Foreign Key (FK) mapping and constraints.
    b. Many-to-many relationships (e.g. ticket assignments).
3. Normalize the database design (e.g., separating the refresh token table).
4. Use PostgreSQL custom enums to enforce secure state management (e.g. ticket stage).

# Database Models Architecture

```
models/
├── user/                   # User authentication & token schemas
│   ├── user.ts             # Primary users table model schema
│   └── refreshToken.ts     # User refresh token session model schema
├── workspace/              # Workspace & communication schemas
│   ├── workspace.ts        # Workspace organization model schema
│   ├── workspaceChannel.ts # Workspace communication channel model schema
│   └── message.ts          # Keyset paginated channel messages model schema
├── etc/                    # Auxiliary monorepo entities & ticket tracking
│   ├── employee.ts         # Workspace member & invitation model schema
│   ├── project.ts          # Project repository link model schema
│   └── ticket.ts           # Tickets, assignments, and markdown documentation schemas
└── MODEL.md                # Normalized PostgreSQL schema specification documentation
```

## Option A: Class Table Inheritance (Refined Schemas)

To avoid duplicate credentials, emails, and passwords, we use a base `users` table for authentication, with employee profiles linked via 1-to-1 relationships.

### `users` (Base Auth Table)
- `id`: UUID PRIMARY KEY (default: `gen_random_uuid()`)
- `full_name`: VARCHAR, cap at 88 chars, NOT NULL
- `email`: VARCHAR, cap at 255, NOT NULL & UNIQUE
- `email_verified`: BOOLEAN, default `false`, NOT NULL
- `profile_image_url`: TEXT, NULL
- `password`: VARCHAR, cap at 255, NOT NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `refresh_tokens`
- `user_id`: UUID, references `users(id)` ON DELETE CASCADE, NOT NULL
- `refresh_token`: VARCHAR, cap at 255, NOT NULL
- `access_token`: VARCHAR, cap at 255, NOT NULL
- `expires_at`: TIMESTAMP, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `workspaces`
- `workspace_id`: UUID PRIMARY KEY (default: `gen_random_uuid()`)
- `owner_id`: UUID, references `users(id)` ON DELETE CASCADE, NOT NULL
- `channel_threshold`: INTEGER, default `4`, NOT NULL (managed internally, hard cap)
- `channels_count`: INTEGER, default `0`, NOT NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `workspace_channels`
- `channel_id`: UUID PRIMARY KEY (default: `gen_random_uuid()`)
- `workspace_id`: UUID, references `workspaces(workspace_id)` ON DELETE CASCADE, NOT NULL
- `channel_name`: VARCHAR, cap at 100, NOT NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `messages`
- `id`: BIGSERIAL PRIMARY KEY (incremental ID for keyset pagination)
- `channel_id`: UUID, references `workspace_channels(channel_id)` ON DELETE CASCADE, NOT NULL
- `sender_id`: UUID, references `users(id)` ON DELETE CASCADE, NOT NULL
- `content`: TEXT, NOT NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL

### `employees`
- `id`: UUID PRIMARY KEY (default: `gen_random_uuid()`)
- `workspace_id`: UUID, references `workspaces(workspace_id)` ON DELETE CASCADE, NOT NULL
- `user_id`: UUID, references `users(id)` ON DELETE CASCADE, NULLABLE (attached upon invitation approval)
- `role`: VARCHAR, cap at 100, NOT NULL
- `invite_code`: VARCHAR, cap at 255, UNIQUE, NULLABLE (cleared upon activation)
- `status`: ENUM `["pending", "active", "rejected", "revoked"]`, default `"pending"`, NOT NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `projects`
- `project_id`: UUID PRIMARY KEY (default: `gen_random_uuid()`)
- `workspace_id`: UUID, references `workspaces(workspace_id)` ON DELETE CASCADE, NOT NULL
- `repo`: VARCHAR, link of the GitHub repository, NOT NULL

### `tickets`
- `ticket_id`: UUID PRIMARY KEY (default: `gen_random_uuid()`)
- `project_id`: UUID, references `projects(project_id)` ON DELETE CASCADE, NOT NULL
- `title`: VARCHAR, cap at 100 chars, NOT NULL
- `description`: VARCHAR, cap at 400 chars, NOT NULL
- `repo`: VARCHAR, link of the GitHub repository, NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `ticket_docs`
- `ticket_id`: UUID PRIMARY KEY, references `tickets(ticket_id)` ON DELETE CASCADE
- `title`: VARCHAR, cap at 100, NOT NULL
- `content_md`: TEXT (10k char application-level cap), NOT NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `ticket_assignments`
- `ticket_id`: UUID, references `tickets(ticket_id)` ON DELETE CASCADE, NOT NULL
- `employee_id`: UUID, references `employees(user_id)` ON DELETE CASCADE, NOT NULL
- `stage`: ENUM `["assigned", "working", "finished"]`, default `"assigned"`, NOT NULL
- `start_date`: TIMESTAMP, default `now()`, NOT NULL
- `deadline`: TIMESTAMP, NULL
- *Composite PRIMARY KEY (`ticket_id`, `employee_id`)*