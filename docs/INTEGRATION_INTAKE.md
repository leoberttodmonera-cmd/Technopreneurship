# Python / Advance Programming Intake Checklist

Inspect each member's work in isolation before merging. Preserve the original submission and rubric.

- [ ] Assignment prompt, rubric, author/owner, course deadline, language/runtime rules, porting restrictions, required separate deliverable.
- [ ] Complete source tree, run instructions, Python version, dependencies/lockfile, package/license provenance.
- [ ] Inputs, outputs, files, network endpoints, database access, environment variables, errors, logs, state changes.
- [ ] Synthetic sample inputs/outputs and edge cases; existing tests and known problems.
- [ ] Security review: secrets, unsafe deserialization, shell calls, path traversal, injection, PII/logging, dependency risk.
- [ ] Runtime/memory/CPU/ports and deployment/billing needs.
- [ ] User journey and shared system entities/roles/actions needed; data sensitivity/retention.
- [ ] Reproduce clean run in a separate branch/folder; record commands and results.

After review, document exactly one route: **port/adapt** if simple and the assignment permits; **bounded Python service** only if runtime/assignment needs justify it and API/auth/failure/cost/deployment gates are approved; or **defer/retain coursework artifact** if integration is premature or conflicts with the rubric. Do not force a language choice or merge blindly. Ask the adviser/instructor when academic constraints are unclear.
