# MPC SAFARI — Complete Local Learning Prototype

This is a modular, local learning prototype for a proposed campus services hub. It includes a React/Vite web client, Express API, SQLite database, fictional student and staff accounts, a signed-in feed, private office ticket workflows, tests, and learning documentation. It is **not MPC-approved, not connected to MPC systems, and not production-ready**.

## Run it on Windows

Requirements: Node.js 22.12+ (Node 24 is expected to work) and Git. If PowerShell blocks `npm`, use `npm.cmd`; do not change the computer's script policy for this project.

```powershell
npm.cmd install
npm.cmd run dev
```

Open the Vite URL shown in the terminal, usually `http://127.0.0.1:5173/`. Vite starts the React frontend and local Express API together. Keep the terminal open while using the site; stop with **Ctrl+C**.

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run check
```

`npm.cmd run check` runs tests and builds the frontend. The API listens on local port 3001 behind Vite's `/api` proxy. The database is created at `server/data/mpc-safari-demo.sqlite`; it is ignored by Git. The schema setup adds missing tables/columns to the earlier starter database without deleting your demo data.

## Fictional test accounts

| Role | Email | Password | Access |
| --- | --- | --- | --- |
| Student | `student@example.test` | `StudentDemo123!` | Public content, signed-in feed, own tickets/replies |
| Registrar demo staff | `staff@example.test` | `StaffDemo123!` | Registrar tickets, replies/status changes, demo announcements |

Students can also create accounts from the Account page. Registration always creates a `student`; there is no public staff registration. These test credentials are seeded into the local SQLite file for learning only. Do not reuse real passwords or add real people/data.

## What is connected

- **Public content:** public service directory, department grouping, public announcements served by Express from SQLite.
- **Accounts:** student registration, sign-in, sign-out and current-user endpoint. Passwords are stored as Node `scrypt` hashes, not plaintext. Opaque session tokens are held in server memory and sent in `HttpOnly; SameSite=Lax` cookies; sessions end when the API restarts or expire.
- **Student feed:** signed-in users can read public and `signed_in` announcements. Students cannot publish official posts.
- **Tickets:** signed-in students submit service inquiries to a department selected from a service. SQLite stores ticket records and replies. Students can see only their tickets; department staff can see only tickets assigned to their department. Staff may reply and change ticket status.
- **Office publishing:** signed-in staff can publish a fictional public or student-audience announcement for their assigned department. The API checks the role; hiding the control in the UI is not the security boundary.
- **Tests:** API-level tests cover public vs protected content, account creation, ticket ownership/department scope, staff authorization, replies/status and announcement visibility.

## Folder map

- `src/app/` composes app views and navigation.
- `src/components/` contains shared navigation/header components.
- `src/features/` holds separate campus service, department, feed, account, student ticket and staff-workspace components.
- `src/data/api.js` is the frontend's HTTP boundary; React never queries SQLite directly.
- `server/routes/` validates requests and applies access guards.
- `server/security/` contains password hashing, local session handling and role guards.
- `server/repositories/` holds SQL queries and domain persistence operations.
- `server/db/` initializes/migrates schema and fictional seed data.
- `tests/` exercises database/API rules.
- `docs/` contains architecture, learning, team, security, integration and prototype guidance.

## Data flow example: student ticket

1. The student submits the form in `src/features/office-inquiries/TicketDesk.jsx`.
2. `src/data/api.js` sends JSON to `POST /api/tickets` using the current same-origin cookie.
3. The Express route checks sign-in, student role and field length.
4. `server/repositories/workflowRepository.js` finds the chosen service's department, inserts the ticket and first message in SQLite.
5. On later reads, SQL restricts student results by account ID or staff results by assigned department.

## Boundaries and remaining limits

This is a local classroom prototype. Session records exist only in server memory; restarting the API signs everyone out. It has no email verification, password reset, account moderation, brute-force throttling, CSRF token strategy, audit log, attachment scanning, encryption-at-rest policy, backup/restore process, legal/privacy approval, or production deployment configuration. Do not use sensitive details, actual student accounts, or confidential case descriptions. Student-feed/public announcements are fictional. Real MPC facts require approval and verification. No paid hosting or services are assumed.

The local sign-in flow is included to demonstrate architecture and role checks. It is not a statement that the product is institutionally approved or safe to operate with real student data. Have advisers/professionals review it before any real use.

## Git collaboration

After edits: `git status`, `git add <files>`, `git commit -m "Describe change"`, then `git push`. Pull before starting a teammate's work. Prefer branches and pull requests; coordinate shared files. Public repositories expose pushed files. Never commit local databases, secrets, real records or personal messages. `.gitignore` excludes dependencies, build output and local SQLite data.
