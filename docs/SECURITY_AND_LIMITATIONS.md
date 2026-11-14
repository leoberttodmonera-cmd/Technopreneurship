# Security and Known Limitations

This is a local learning prototype, not a production service. It currently exposes only read-only public demo endpoints over localhost. It has no authentication, roles, private records, inquiry writes, staff editor, CSRF protection, production server configuration, hosting, backups, monitoring, or institutional data governance.

The project uses only synthetic examples. SQLite is local to the computer running the API. The Vite development server and API bind to loopback; teammates cannot reach them remotely through the local URL. Do not expose the dev server with `--host 0.0.0.0` or port forwarding as a shortcut to sharing private functions.

Before any write or restricted module is implemented, establish trusted identity, authorization, validation, rate limits, safe output rendering, audit needs, retention/deletion, data ownership, secret handling, permission tests for allowed and denied cases, and operational support. Do not rely on UI hiding for access control. Do not store credentials in source control. Never put real student information, messages, grades, health/counseling data, complaints, payment information, or official live feeds in this demo.

The service/announcement demo entries are fictional and their locations are placeholders. Do not present them as verified facts. Survey and Dean/OSA letter drafts have not been approved for distribution. A future public staging deployment requires a separate explicit team/account-owner decision; any billable requirement is a stop-and-approve gate.
