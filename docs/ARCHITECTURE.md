# Architecture — Local Learning Starter

## Current runnable slice

```text
Browser (React components)
   │ fetch('/api/services') / fetch('/api/announcements')
   ▼
Vite development server (port 5173; proxies /api)
   │ HTTP on this computer only
   ▼
Express API (port 3001)
   │ route → repository function
   ▼
SQLite local demo database (server/data/mpc-safari-demo.sqlite)
```

Vite and the API run as two processes with `npm run dev`. Vite's proxy keeps frontend requests same-origin during development. The browser does not open SQLite directly. The API queries the database through repository functions, and routes return JSON.

## Folder boundaries

- `src/app/`: top-level page and shared app styling.
- `src/components/`: reusable UI pieces shared by pages.
- `src/features/`: user-facing feature modules. Each feature owns its view and behavior, not global authorization or ad-hoc SQL.
- `src/data/`: frontend API client; translates UI needs into HTTP calls.
- `src/styles/`: global design defaults, palette and accessibility rules.
- `server/routes/`: HTTP endpoint mapping and response formatting.
- `server/repositories/`: database queries and record retrieval.
- `server/db/`: database creation and demo seed. Local DB file is ignored by Git.
- `server/domain/`: reserved for shared business rules as they are implemented; do not create empty stubs just to fill a diagram.
- `tests/`: executable tests of repository/data behavior.

## Key responsibilities

The UI displays information and captures input. It is not a security control. A future signed-in action must carry trusted actor identity to a backend that checks the actor, department, record and action. Hiding a button is insufficient. This starter has no login, role provisioning, content editing, or private inquiries; do not imply that it does.

SQLite is used only as a local, zero-hosting-cost learning database. It is not the eventual institutional data architecture decision. Its file is generated locally and is not committed. The current API is read-only to avoid creating an unauthenticated write surface.

## Module contract

Before adding a feature, record its purpose, owner, user journey, fields, audience, access rules, input/output shape, error states, test cases, accessibility behavior, dependencies, data retention, deployment/cost, and rollback. Future modules reuse the same identity and department model rather than inventing parallel ones.

## Future integration choices

A Python program can be adapted into the shared runtime only if the assignment permits. Otherwise it can be a bounded service with a documented/versioned API, authentication, timeout/error behavior, data boundaries, deployment and cost approval. Or keep it as a separate coursework artifact/defer integration. Decide only after inspecting its actual source and rubric.
