# Learning Guide — Follow One Request

## What happens when the page loads?

1. The browser reads `index.html`. Its `root` element is an empty container where React will draw the app.
2. `src/main.jsx` starts React and imports global CSS.
3. `src/app/App.jsx` renders the header and two feature sections. It asks `src/data/api.js` for services and announcements.
4. The API client sends HTTP requests to `/api/services` and `/api/announcements`.
5. During development, Vite forwards `/api` requests to the separate Express process.
6. Express routes call functions in `server/repositories/contentRepository.js`.
7. The repository runs SQL against SQLite. The API sends JSON back; React stores and renders the result.

Try tracing one example by opening those files in that order. This is the core idea of a layered web app: each layer has one job and passes a clear result to the next.

## Why separate files?

A single file can be a useful first experiment, but a project grows easier to change when related responsibilities have named homes. A `ServiceDirectory` component renders the service list; a repository queries records; CSS controls appearance. If a teammate changes the service card, they need not edit the SQL. If a developer changes the database, the UI contract can stay stable.

## Starter exercises

1. In `server/db/database.js`, find the fictional Registrar example and change its description. Restart the API and see the card update.
2. Add another fictional service row to the seed list; ensure its department exists first.
3. In `src/features/campus-services/ServiceDirectory.jsx`, find the search logic and explain what `filter` and `includes` do.
4. In `tests/contentRepository.test.js`, add an assertion that confirms the service count changes as expected.
5. Change a CSS variable and observe the preview. Try keyboard Tab navigation and verify focus is visible.
6. Explain why the browser calls the API rather than opening the SQLite file itself.
7. Before adding login, write down who may read and write each record and create denied-access tests.

## Git concepts by analogy

A repository is the project plus its change history. A branch is a separate working lane. A commit is a named checkpoint. Push sends checkpoints to GitHub; pull brings teammates' checkpoints to your computer. A pull request lets teammates review a branch before merging. None of these is automatic just because you saved in VS Code.
