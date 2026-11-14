# Local API and database

The API is an Express process started by `npm run dev:api`. It uses a local SQLite file at `server/data/mpc-safari-demo.sqlite`, created and seeded with fictional sample entries on first run. The file is excluded from Git. Public read endpoints are `/api/services`, `/api/announcements`, and `/api/health`.

This database/API is for learning local layers only. It has no login, write endpoints, private messages, backups, or production hardening. Do not expose it to a public network. Choose a managed backend or hosted API only after the team understands its requirements and any cost/billing gate.
