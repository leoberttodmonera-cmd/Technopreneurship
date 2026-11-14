# Local API and database — learning prototype

The API is an Express process started with the app by `npm.cmd run dev` (or alone with `npm.cmd run dev:api`). It uses a local SQLite file at `server/data/mpc-safari-demo.sqlite`, created and seeded with fictional content/accounts. The file is excluded from Git. Public GET endpoints are `/api/services`, `/api/announcements`, and `/api/health`. Account endpoints are under `/api/auth`; protected feed, tickets and staff endpoints are `/api/feed`, `/api/tickets`, and `/api/staff`.

Student registration/login uses scrypt password hashes and in-memory opaque demo sessions. Ticket routes restrict students to their own records and staff to their assigned department. These are teaching examples only; the project still lacks production security, operational safeguards and approved real-data governance. Do not expose it to a public network or use real student data.
