# MPC SAFARI — AI and Team Context

## Purpose
One modular web-based campus system for MPC stakeholders. Current runnable prototype: public service information, departments, announcements, demo student/staff accounts, signed-in feed, and database-backed private office tickets, using a local Express API and SQLite demo database.

## Current stage
Beginner team learning from a React + Vite frontend, Node + Express local API, and SQLite demo database. Local student registration/sign-in and role-checked ticket/staff workflows are implemented as educational examples. This is not MPC-approved or production-ready.

## Evidence and approval limits
Discovery includes three student interviews dated November 4, 2026. This is a small sample and not proof of campus-wide prevalence, causes, or impact. Survey and Dean/OSA letters are drafts. Do not distribute surveys, collect real data, or imply approval unless the required written approvals actually exist.

## Data and security
Use fictional demo content only. Never commit real passwords, API keys, real student records, private messages, or sensitive information. Clearly label unknown service facts. Demo passwords exist in project source and must never be reused. This local API has no production deployment hardening.

## Architecture
React components call `src/data/api.js`. The API routes validate inputs and call role/ownership checks; repositories query SQLite. Passwords are scrypt hashes and sessions are memory-only in this local demo. Keep UI, feature behavior, data access, authentication, and authorization responsibilities separated as the project grows. Do not add a real provider/backend or paid hosting without a team/account-owner decision.

## Design and teamwork
Modern vibrant technology direction: blue, black/navy, gray, and white. The team will customize it. Use small changes, feature branches, PRs, peer review, and commits. Assign one accountable owner per feature area; coordinate shared-file edits.

## Future modules
Advanced enrollment, queues, documents, student support/reporting, learning tools, wayfinding, analytics, and AI are later modules. Production-grade identity, security, and hosting are out of scope. Review actual Python programs and course constraints before selecting port/service/defer.

## Instructions to assisting AI
Inspect files first. Explain changes in beginner-friendly steps. Do not overwrite working files blindly. Keep commands specific to Windows PowerShell when guiding this team. Report tests actually run and maintain the distinction between implemented, demo-only, planned, and approval-gated work.
