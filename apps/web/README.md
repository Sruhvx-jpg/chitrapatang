# Chitrapatang Web Application (`apps/web`)

> **Next.js 15+ App Router Web Client powered by tRPC, React 19, and Apple-grade Glassmorphic UI design tokens.**

---

## Overview

The `apps/web` application is the primary frontend user interface for Chitrapatang Terminal. It provides an intuitive, high-performance web client for engineering managers, product owners, and developers to manage agile sprints, track backlog tickets, conduct channel discussions, and visualize predictive ML burndown statistics.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router), React 19, TypeScript
- **State & RPC**: tRPC React Client (`@trpc/react-query`), `@tanstack/react-query`
- **Styling & Tokens**: Tailwind CSS, CSS OKLCH Wide-Gamut Palette, Lucide React Icons
- **Theme Provider**: `next-themes` (Dark/Light mode support with system preference detection)
- **Design System**: Apple-grade glassmorphism formulas, `Geist Sans`, `Geist Mono`, and `Yatra One` font stacks ([docs/FRONTEND_DESIGN.md](../../docs/FRONTEND_DESIGN.md))

---

## 📂 Key Architecture & Routing

```
apps/web/
├── app/
│   ├── (auth)/             # Login, registration, and OTP verification pages
│   ├── GetStarted/         # Workspace onboarding, claim codes & invitation state flow
│   ├── dashboard/          # Interactive Kanban Sprint Board & ML Burndown chart
│   ├── workspace/          # 4-Channel real-time chat & keyset-paginated messaging
│   └── layout.tsx          # Root layout with GlobalProviders and theme wrapper
├── components/
│   ├── ui/                 # Reusable design system primitives (GridBackground, GlassCard, etc.)
│   ├── workspace/          # Workspace creation and employee invitation components
│   └── chat/               # Keyset-paginated message feeds and input controls
├── hooks/                  # Centralized tRPC mutation side-effect hooks (use-auth.ts, etc.)
├── utils/                  # tRPC React client setup and helpers
└── public/                 # Static branding assets and images
```

---

## 🔒 Architectural Rules (Client-Side)

Per project guidelines ([docs/AGENT.md](../../docs/AGENT.md)):

1. **Centralized React Hooks**: All tRPC mutation side-effects (notifications, cookie updates, router redirects) must be encapsulated within custom hooks under `apps/web/hooks/` (e.g. `use-auth.ts`). Do not place inline mutation hooks directly in page view components.
2. **Theme Toggling**: Dark and light themes must be preserved using `next-themes` and `GlobalProviders`.
3. **No Unrequested Auth Providers**: Auth screens adhere strictly to focused Email/Password credentials without unnecessary 3rd-party OAuth clutter.

---

## 🚀 Setup & Development

Run the frontend locally from the root workspace:

```bash
# Start Next.js development server on port 3000
pnpm dev --filter=web

# Build production Next.js application
pnpm build --filter=web

# Start Next.js production server
pnpm --filter=web start
```

---

## 📘 Documentation Links

- 🎨 **[Unified Frontend Design System](../../docs/FRONTEND_DESIGN.md)**
- 🤖 **[Agent Frontend Guidelines](../../docs/AGENT.md)**
- 🏗️ **[System Architecture Patterns](../../docs/SYSTEM_DESIGN.md)**

---

*Chitrapatang Terminal — Web Application Frontend.*

