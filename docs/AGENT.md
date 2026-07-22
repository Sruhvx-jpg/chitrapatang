# Agent Guidelines and Rules

> **Engineering Constraints, Design Standards, Monorepo Boundaries, and Conventional Commits.**

---

## 🧭 Navigation
[⬅ Master Documentation Hub](README.md) • [Agile Scrum Guide](SCRUM.md) • [System Design](SYSTEM_DESIGN.md) • [API Reference](API_REFERENCE.md)

---

## 📋 General & Behavioral Rules

1. **Do Not Design Unrequested Features**
   * Do not implement features, design pages, or add logic that the user did not explicitly ask for. Keep changes focused and minimal to the requested scope.
   
2. **Do Not Inspect via Browser Subagent Unnecessarily**
   * Do not keep opening browser windows or subagents to inspect/test UI unless explicitly asked by the user. Rely on compiler checks, type validation, and direct user feedback first.

---

## 🎨 Frontend & UI Design Rules

1. **Theme & Branding**
   * Keep light and dark theme toggling functional using `next-themes` and `GlobalProviders`.
   * Use **Blue** as the primary brand color for highlights, focus states, and primary actions.
   * Match layouts precisely to reference screenshots provided by the user.

2. **No Extraneous Login/Auth Options**
   * Do not include third-party OAuth (such as Google Login) or email dividers on authentication screens unless requested. Keep auth flow focused on email/password.

3. **Centralized React Hooks**
   * All tRPC mutation side effects (like notifications, redirects, and state persistence) must be written inside centralized hooks under `apps/web/hooks/` (e.g., `use-auth.ts`). Do not put inline mutation hooks in page components.

---

## 🔧 Backend & API Design Rules

1. **Flat Schema Design (No Nesting)**
   * Keep tRPC input/output schemas and model responses flat. Do not nest objects inside objects (e.g., avoid returning nested `{ user: { id, email } }` structures; return `{ id, email }` directly).

2. **Environment & Security Configuration**
   * Never hardcode sensitive parameters, crypto keys, or cryptographic algorithms (e.g., AES-256-CBC) directly in source files. All configuration must be loaded from `.env` and validated using the Zod env schemas.

3. **Email and OTP Handling**
   * Explicitly check and throw errors on mail API failures (e.g., Resend SDK response checks) rather than returning them silently.
   * OTP verification codes stored in Redis must be encrypted symmetrically.

---

## 📂 Repository Folder Structure

The project is managed as a monorepo structured via Turborepo and pnpm workspaces:

```
chitrapatang/
├── apps/
│   ├── api/                # Express backend API serving tRPC routes
│   ├── web/                # Next.js web application frontend (UI/components/pages)
│   └── tauri-app/          # Tauri desktop client wrapper using Next.js UI
├── docs/                   # Centralized Documentation directory
│   ├── assets/             # Generated diagrams & visual assets
│   ├── README.md           # Master Documentation Hub & Sitemap
│   ├── SCRUM.md            # Agile Scrum & Product Architecture guide
│   ├── SPRINT.md           # Project Sprint Planning & Roadmap
│   ├── SYSTEM_DESIGN.md    # System Design & Architecture Patterns
│   ├── API_REFERENCE.md    # tRPC Procedures & Router Specification
│   ├── FRONTEND_DESIGN.md  # Design System & Glassmorphism Specs
│   ├── POSTFIX.md          # Mail Server Configuration
│   └── AGENT.md            # Agent Guidelines & Rules
├── packages/
│   ├── trpc/               # Shared tRPC router definitions and client configurations
│   ├── database/           # Drizzle ORM schemas, migration files, and client connection
│   ├── logger/             # Winston logger wrapper module
│   ├── services/           # Core business logic layer (WorkspaceService, UserService, etc.)
│   ├── utils/              # Shared cryptographic, Redis, and email helper utilities
│   ├── eslint-config/      # Shared ESLint configuration rules
│   └── typescript-config/  # Shared TypeScript compiler options
├── README.md               # Getting started instructions and monorepo overview
├── setup.sh                # Setup script
├── turbo.json              # Turborepo task pipeline configuration
└── pnpm-workspace.yaml     # pnpm workspace package definitions
```

---

## 📝 Git & Commit Conventions

This project strictly follows the **Conventional Commits** specification:

```
<type>(<scope>): <description>
```

### Types:
* **feat**: A new feature implementation.
* **fix**: A bug fix.
* **docs**: Documentation updates.
* **refactor**: Code changes that neither fix a bug nor add a feature.
* **style**: Code styling adjustments (formatting, semicolons, spacing, etc.).
* **test**: Adding or correcting tests.
* **chore**: Maintenance tasks, dependency updates, or dev-tool changes.

### Common Scopes:
* **web**: Frontend client.
* **api**: Express API backend.
* **trpc**: Router definitions, client link settings, procedures.
* **database**: Drizzle schema definitions or database migrations.
* **services**: Business logic and service layers.
* **utils**: Cryptography, redis, mail, or validation utilities.
* **docs**: Documentation files.

---

*Chitrapatang Terminal — Agent Guidelines & Rules.*
