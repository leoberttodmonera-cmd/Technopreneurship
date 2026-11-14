# Clickable prototype module map

The app is a local learning prototype. Use `npm.cmd run dev` at the project root, then click the navigation buttons in the page header. Each area is kept in a feature folder so the team can study and change one feature at a time.

| Screen/feature | Main file | What works in this prototype |
| --- | --- | --- |
| Home | `src/app/App.jsx` | Module navigation, project concept summary, preview cards |
| Services | `src/features/campus-services/ServiceDirectory.jsx` | Fetches fictional public examples from the local Express API; search filters the list |
| Departments | `src/features/departments/DepartmentDirectory.jsx` | Groups the API's example service records for browsing |
| Updates feed | `src/features/student-feed/StudentFeed.jsx` | Public visitors see a sign-in prompt; authenticated students see public and signed-in SQLite announcements |
| Tickets | `src/features/office-inquiries/TicketDesk.jsx` | Signed-in students create tickets and view/reply to their own database-backed conversations |
| Account | `src/features/account/AccountPanel.jsx` | Student sign-in/registration/sign-out via API; fictional seeded student/staff test accounts |
| Staff workspace | `src/features/staff/StaffWorkspace.jsx` | Department-scoped ticket queue, status, replies, and staff-only announcement publishing |
| Navigation | `src/components/Header.jsx` | Buttons switch the active view; selected view is indicated accessibly |
| Visual design | `src/styles/app.css`, `src/styles/global.css` | Shared responsive styles and module-specific layout |

## How a ticket travels from form to database

The submit handler sends the selected service, subject and message to `POST /api/tickets`. Express requires a signed-in student, validates fields, and the repository determines the service's department and writes a ticket plus first message in SQLite. Queries constrain student reads to their own account. Staff reads are constrained to their assigned department. Everything remains local on this computer; use fictional text only.

## What is deliberately not connected

The prototype has a local demo authentication flow and server-side role/ownership checks, but it lacks production protections listed in `SECURITY_AND_LIMITATIONS.md`. There is no real MPC identity provider, email verification, password recovery, persistent session store, hosting, or institutional system integration. Content and accounts are synthetic.

## Suggested learning sequence

1. Change a heading in `App.jsx`, save, and observe the browser refresh.
2. Change the service search/presentation in `ServiceDirectory.jsx`.
3. Follow a ticket through `TicketDesk.jsx` → `src/data/api.js` → `server/routes/workflows.js` → repository → SQLite.
4. Log in as staff and inspect department-specific ticket visibility and announcement publishing.
5. Read `tests/workflows.test.js` for allowed and denied cases; add a cross-department staff test.
