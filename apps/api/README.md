# Chitrapatang API Server (`apps/api`)

> **Express 5 API Server hosting tRPC routers, HTTP-only cookie authentication, and OpenAPI documentation endpoints.**

---

## Overview

The `apps/api` package serves as the main HTTP backend server for Chitrapatang Terminal. It mounts shared tRPC routers defined in `@repo/trpc`, initializes database connections via `@repo/database`, manages Redis caching sessions, and executes business logic contained in `@repo/services`.

---

## 🛠️ Tech Stack & Dependencies

- **Server Framework**: Express 5
- **RPC & API Engine**: tRPC v11 (`@trpc/server`)
- **HTTP Middlewares**: `cors`, `cookie-parser`, `express.json()`
- **Build Tool**: `tsup` (TypeScript bundler)
- **Validation**: Zod
- **Logging**: Winston (`@repo/logger`)

---

## 📂 Directory Structure

```
apps/api/
├── src/
│   ├── index.ts        # Express app entrypoint & tRPC middleware initialization
│   ├── server.ts       # HTTP server listener & port binding
│   └── openapi.ts      # OpenAPI / Swagger JSON spec generator
├── tsup.config.ts      # tsup bundle configuration
├── package.json        # Dependencies & scripts
└── tsconfig.json       # TypeScript compiler settings
```

---

## ⚙️ Environment Variables

The API server requires the following environment variables (loaded via root `.env`):

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `4000` | HTTP listening port for Express backend server. |
| `NODE_ENV` | `development` | Runtime environment (`development`, `production`, `test`). |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed client origin for CORS header headers. |
| `DATABASE_URL` | `postgresql://...` | PostgreSQL connection string. |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection URL for OTP and session caching. |
| `JWT_ACCESS_SECRET` | — | Secret key used for signing short-lived JWT access tokens. |
| `JWT_REFRESH_SECRET` | — | Secret key used for signing long-lived JWT refresh tokens. |

---

## 🚀 Running Locally

From the monorepo root:

```bash
# Run in development mode with hot-reloading (via Turborepo)
pnpm dev --filter=@repo/api

# Build production bundle using tsup
pnpm build --filter=@repo/api

# Start production build
pnpm --filter=@repo/api start
```

---

## 📡 Endpoints & tRPC Router

- **tRPC Route Handler**: `GET / POST /trpc/*`
- **Healthcheck Endpoint**: `GET /health` (Returns HTTP 200 OK with uptime and status)
- **OpenAPI JSON Spec**: `GET /openapi.json` (Returns Swagger OpenAPI 3.0 document)

---

## 📘 Documentation Links

- 📡 **[tRPC API Procedure Reference](../../docs/API_REFERENCE.md)**
- 🔌 **[tRPC Routes Structure](../../packages/trpc/docs/ROUTES.md)**
- 🍪 **[Cookie Management](../../packages/trpc/docs/COOKIE.md)**

---

*Chitrapatang Terminal — Express API Application Documentation.*
