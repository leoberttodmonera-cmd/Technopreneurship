# MPC SAFARI — Local Learning Starter

**Status:** educational local reference starter for a student team. It contains a React/Vite web client, a local Express API, and a SQLite database populated with fictional examples. It is not MPC-approved, not connected to any MPC system, and not production-ready.

## What the pieces do

- `src/` is the browser application. React builds the page from components; Vite serves it locally and refreshes the page after edits.
- `server/` is a separate Node/Express process. It exposes read-only JSON endpoints for the current demo services and announcements.
- `server/db/` creates a local SQLite database file the first time the API starts and inserts clearly fictional demo content.
- `server/repositories/` holds database queries, keeping SQL out of the UI.
- `src/data/api.js` is the frontend's API client; it requests `/api/...` instead of directly opening the database.
- `docs/` explains architecture, learning steps, security boundaries, and future module intake.

This is a complete **first vertical slice**, not the full institutional system. Authentication, staff editing, one-to-one message threads, and future modules are described but intentionally not enabled yet. They require a designed and tested authorization model. Do not add sensitive or real student data.

## Requirements

Install Node.js 22.12+ (Node 24 is also expected to work with Vite 8) and Git. On Windows PowerShell, use `npm.cmd` if the `npm` PowerShell shortcut is blocked by execution policy. Do not change the computer's script-execution policy just for this project.

## Start the app

Open a terminal at the project root (the folder containing `package.json`) and run:

```powershell
npm.cmd install
npm.cmd run dev
```

The terminal starts two named processes. Open the printed Vite URL, usually `http://127.0.0.1:5173/`. The API listens locally at `http://127.0.0.1:3001`; its health endpoint is `/api/health`. Keep the terminal open while using the preview. Saving source files refreshes the page. `localhost` is reachable on your own computer; it is not a public/classmate URL.

Stop both processes with **Ctrl+C** in that terminal. To restart, run `npm.cmd run dev` again. The demo database stays local in `server/data/mpc-safari-demo.sqlite` and is ignored by Git. Delete that file only when the API server is stopped if you want the demo seed to regenerate.

## Useful commands

```powershell
npm.cmd test       # run the SQLite/content tests
npm.cmd run build  # produce the static frontend in dist/
npm.cmd run check  # tests, then frontend production build
```

Expected local API responses: `GET /api/services` returns six fictional service cards; `GET /api/announcements` returns two fictional updates. All locations and updates are marked as examples.

## Git and teamwork, briefly

- **Clone** once to make a working copy on a computer.
- **Pull** before starting so you receive teammates' newest committed changes.
- A **branch** is a safe lane for one task.
- A **commit** is a named local checkpoint.
- **Push** sends your branch/commits to GitHub.
- A **pull request** asks teammates to review your change before it joins `main`.

Typical flow after the repository is initialized:

```powershell
git pull
git switch -c feature/my-small-task
# edit and save files
git status
git add src
git commit -m "Describe the change"
git push -u origin feature/my-small-task
```

Open a Pull Request on GitHub. Do not edit the same shared file as a teammate without coordinating. GitHub is not live collaborative editing; VS Code Live Share is optional for real-time co-editing. Never commit secrets or real/sensitive records.

## Suggested four-person starting split

1. **App shell/integration:** `src/app/`, navigation and top-level composition. Coordinate shared contracts.
2. **Campus information:** `src/features/campus-services/` and service content presentation.
3. **Announcements/content:** `src/features/announcements/`; keep sample facts fictional until verified/approved.
4. **Platform/testing/docs:** `server/`, `tests/`, and `docs/`; coordinate backend changes with the app/API owner. Each role should review another person's PR.

This split is a starting suggestion. Rotate roles so all members understand how a browser request reaches the database.

## Data and approval safeguards

Never use real MPC/student data in this local starter. Never commit passwords, API keys, private messages, grades, health/counseling details, or student identifiers. Public factual content requires an approved source; otherwise label it as unverified. The survey and Dean/OSA letters remain drafts until the required reviewers approve them in writing. A local demo is not institutional approval or deployment.

## Next learning increments

1. Change a fictional service card and trace it through SQLite → repository → Express route → frontend API client → React component.
2. Add an API validation test and an accessible form.
3. Design roles and denied-access tests before implementing authentication or inquiries.
4. Review each Advance Programming/Python assignment separately before deciding to port it, wrap it as a bounded service, or keep it as a separate coursework artifact.
5. Choose a real staging/backend provider only after the team's no-budget and account-owner rules are known. Any billing requirement is a stop-and-approve gate.
