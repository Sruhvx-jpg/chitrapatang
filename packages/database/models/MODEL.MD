# Schema Design Rules
1. Throughout the codebase, table names and fields will follow `snake_case`.
2. High dependency on:
    a. Foreign Key (FK) mapping and constraints.
    b. Many-to-many relationships (e.g. ticket assignments).
3. Normalize the database design (e.g., separating the refresh token table).
4. Use PostgreSQL custom enums to enforce secure state management (e.g. ticket stage).

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

### `employees`
- `user_id`: UUID PRIMARY KEY, references `users(id)` ON DELETE CASCADE
- `role`: VARCHAR, cap at 100, NOT NULL

### `refresh_tokens`
- `user_id`: UUID, references `users(id)` ON DELETE CASCADE, NOT NULL
- `refresh_token`: VARCHAR, cap at 255, NOT NULL
- `access_token`: VARCHAR, cap at 255, NOT NULL
- `expires_at`: TIMESTAMP, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `projects`
- `project_id`: UUID PRIMARY KEY (default: `gen_random_uuid()`)
- `repo`: VARCHAR, link of the GitHub repository, NOT NULL

### `tickets`
- `ticket_id`: UUID PRIMARY KEY (default: `gen_random_uuid()`)
- `project_id`: UUID, references `projects(project_id)` ON DELETE CASCADE, NOT NULL
- `title`: VARCHAR, cap at 100 chars, NOT NULL
- `description`: VARCHAR, cap at 400 chars, NOT NULL
- `repo`: VARCHAR, link of the GitHub repository, NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL

### `ticket_assignments`
- `ticket_id`: UUID, references `tickets(ticket_id)` ON DELETE CASCADE, NOT NULL
- `employee_id`: UUID, references `employees(user_id)` ON DELETE CASCADE, NOT NULL
- `stage`: ENUM `["assigned", "working", "finished"]`, default `"assigned"`, NOT NULL
- `start_date`: TIMESTAMP, default `now()`, NOT NULL
- `deadline`: TIMESTAMP, NULL
- *Composite PRIMARY KEY (`ticket_id`, `employee_id`)*

### `ticket_docs`
- `ticket_id`: UUID PRIMARY KEY, references `tickets(ticket_id)` ON DELETE CASCADE
- `title`: VARCHAR, cap at 100, NOT NULL
- `content_md`: TEXT (10k char application-level cap), NOT NULL
- `created_at`: TIMESTAMP, default `now()`, NOT NULL
- `updated_at`: TIMESTAMP, default `now()`, NOT NULL