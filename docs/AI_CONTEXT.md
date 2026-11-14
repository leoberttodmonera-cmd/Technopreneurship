# MPC SAFARI — AI and Team Context

## Purpose
One modular web-based campus system for MPC stakeholders. Current runnable slice: campus information hub with fictional public service examples and announcements, backed by a local Express API and SQLite demo database.

## Current stage
Beginner team learning from a React + Vite frontend, Node + Express local API, and SQLite demo database. This is a local educational reference, not MPC-approved or production-ready. Authentication and office inquiry writes are intentionally not implemented yet.

## Evidence and approval limits
Discovery includes three student interviews dated November 4, 2026. This is a small sample and not proof of campus-wide prevalence, causes, or impact. Survey and Dean/OSA letters are drafts. Do not distribute surveys, collect real data, or imply approval unless the required written approvals actually exist.

## Data and security
Use fictional demo content only. Never commit passwords, API keys, real student records, private messages, or sensitive information. Clearly label unknown service facts. This local API is read-only and not suitable for online deployment.

## Architecture
React components call `src/data/api.js`. The API routes call repository functions. Repository functions query SQLite. Keep UI, feature behavior, data access, authentication, and authorization responsibilities separated as the project grows. Do not add a real provider/backend or paid hosting without a team/account-owner decision.

## Design and teamwork
Modern vibrant technology direction: blue, black/navy, gray, and white. The team will customize it. Use small changes, feature branches, PRs, peer review, and commits. Assign one accountable owner per feature area; coordinate shared-file edits.

## Future modules
Office inquiry, authentication, staff editing, enrollment, queues, documents, student support/reporting, learning tools, wayfinding, analytics, and AI are future increments. Review actual Python programs and course constraints before selecting port/service/defer.

## Instructions to assisting AI
Inspect files first. Explain changes in beginner-friendly steps. Do not overwrite working files blindly. Keep commands specific to Windows PowerShell when guiding this team. Report tests actually run and maintain the distinction between implemented, demo-only, planned, and approval-gated work.
