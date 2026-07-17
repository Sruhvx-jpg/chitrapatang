# Chitrapatang

Chitrapatang is an agile scrum management software designed specifically for Managers and Tech Leads to streamline workflows, track project milestones, and coordinate scrum tasks efficiently.

## Folder Structure

This project is structured as a monorepo managed via Turborepo and pnpm workspaces:

```
chitrapatang/
├── apps/
│   ├── api/                # Express backend API serving tRPC routes
│   ├── web/                # Next.js web application frontend (UI/components/pages)
│   └── tauri-app/          # Tauri desktop client wrapper using a Next.js UI
├── packages/
│   ├── trpc/               # Shared tRPC router definitions and client configurations
│   ├── database/           # Drizzle ORM schemas, migration files, and client connection
│   ├── logger/             # Winston logger wrapper module
│   ├── services/           # Core business logic layer (e.g., UserService)
│   ├── utils/              # Shared cryptographic, Redis, and email (Resend SDK) helper utilities
│   ├── eslint-config/      # Shared ESLint configuration rules
│   └── typescript-config/  # Shared TypeScript compiler options
├── AGENT.md                # Agent guidelines, rules, structure, and commit conventions
├── README.md               # Getting started instructions and monorepo overview
├── turbo.json              # Turborepo task pipeline configuration
└── pnpm-workspace.yaml     # pnpm workspace package definitions
```

## Requirements

- Node.js 18 or later
- `pnpm` package manager

## Setup

1. Make the setup script executable and run it to inject environment values where needed:

   ```bash
   chmod +x ./setup.sh
   ./setup.sh
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:

   - The root `.env` configures local environment settings (e.g., database, Redis, Resend API key, and encryption settings).

## Run the project

### Start everything at once

```bash
pnpm dev
```

This uses Turbo to run the workspace apps in parallel.

### Run a single app

- API:
  ```bash
  pnpm --filter @repo/api dev
  ```

- Web frontend:
  ```bash
  pnpm --filter web dev
  ```

- Tauri app:
  ```bash
  pnpm --filter tauri-app dev
  ```

## Build

- Build all packages and apps:

  ```bash
  pnpm build
  ```

- Build a single app:

  ```bash
  pnpm --filter web build
  ```

## Useful commands

- Lint the repo:
  ```bash
  pnpm lint
  ```

- Format files:
  ```bash
  pnpm format
  ```

- Check TypeScript types:
  ```bash
  pnpm check-types
  ```

## Code of Conduct

### Our Pledge
We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community. We commit to showing respect and professional integrity to all contributors, maintainers, and team members.

### Our Standards
Examples of behavior that contributes to a positive environment include:
- Using welcoming and inclusive language.
- Being respectful of differing viewpoints and experiences.
- Gracefully accepting constructive criticism.
- Focusing on what is best for the team and community.
- Showing empathy towards other community members.

Examples of unacceptable behavior include:
- The use of sexualized language or imagery, and unwelcome sexual attention or advances.
- Trolling, insulting or derogatory comments, and personal or political attacks.
- Public or private harassment.
- Publishing others' private information, such as a physical or email address, without their explicit permission.
- Other conduct which could reasonably be considered inappropriate in a professional setting.
