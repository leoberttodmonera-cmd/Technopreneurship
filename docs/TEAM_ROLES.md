# Suggested Four-Person Ownership

Use actual names only after the team agrees. Each task gets one accountable owner and at least one reviewer. Start with separate files so Git conflicts are easier to understand.

| Role | Main starter folders | First hands-on tasks | Reviewer |
|---|---|---|---|
| 1 — App integrator | `src/app/`, `src/components/` | Trace `App.jsx`, improve shared shell/navigation, keep links and headings consistent | Role 3 |
| 2 — Campus services | `src/features/campus-services/`, service queries in `server/repositories/` | Understand one service from SQLite to card; add only fictional test entries | Role 4 |
| 3 — Announcements and UI content | `src/features/announcements/`, `src/styles/` | Tune content presentation/design; keep demo labels and responsive behavior | Role 1 |
| 4 — Platform, tests, documentation | `server/`, `tests/`, `docs/` | Trace API/database; expand tests; document commands and limitations | Role 2 |

These roles are not silos: every person should understand the complete request path. Before a task crosses folders, agree on its contract with the affected owner. Do not let multiple people edit `package.json`, shared global CSS, `App.jsx`, or data schema at the same time without coordination.

## A simple branch/PR cycle

Each member pulls the latest `main`, creates a branch for one small change, edits their assigned files, runs tests/build, commits, pushes the branch, and opens a pull request. Another member reviews the diff and asks questions before merge. This is not live typing together; use VS Code Live Share only when the team wants a live session.
