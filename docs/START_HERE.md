# Start Here — Apply the Complete Local Prototype

This package is a separate reference copy. It has not been pushed to your GitHub repository or written to your Windows computer. Your public GitHub repository currently contains `src/` and `docs/` files but, in the inspected remote commit, does not contain the root Vite files such as `package.json` and `index.html`. Your local Windows folder may have those files because Vite created them, so check before copying.

## Safe overlay procedure on Windows

1. Stop the current Vite process with Ctrl+C in its terminal.
2. In VS Code, choose File → Save All. In the repository terminal run `git status --short` and make a safety checkpoint of your current work. If you have changes not committed, commit them to a branch or copy the entire folder somewhere safe first.
3. Download and extract the latest `MPC_SAFARI_Clickable_Prototype.zip` (complete local prototype) to a temporary folder.
4. Copy the contents *inside* the extracted `mpc-safari-starter` folder into your existing `Technopreneurship` repository folder. Approve replacing matching source files only after you have saved the checkpoint. Do not copy or replace `.git`; the archive does not contain it.
5. In VS Code, reopen the root folder (the one containing `package.json`). Open a new terminal there and run `npm.cmd install`.
6. Start both local processes with `npm.cmd run dev`. Open the Vite URL shown, normally `http://127.0.0.1:5173/`.
7. In another terminal, run `npm.cmd test` and `npm.cmd run build`.
8. Inspect Source Control changes before committing. Do not push until your team understands the changed files and has reviewed them.

If Vite asks whether to replace files, stop if unsure and compare the existing file with the version in this package first. Never delete `.git` or run `git init` in the existing repo.

## What this changes

The package contains the multi-file React client, Express API, local SQLite synthetic database, tests and learning docs. The complete local learning increment includes demo student registration/login, role-checked student tickets and staff tools. It is still only a fictional local prototype—not MPC-approved, production-ready, or for real student data. Compare/backup existing work before overlaying files.
