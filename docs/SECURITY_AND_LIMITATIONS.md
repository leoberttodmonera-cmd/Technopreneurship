# Security and Known Limitations

This is a local learning prototype, not a production service. It includes demo student registration/login, role-checked private tickets, department-scoped staff tools, and staff announcement publishing on localhost. Passwords use scrypt hashes; demo sessions are memory-only opaque tokens in HttpOnly/SameSite cookies. It still lacks email verification, account recovery, login rate limiting, persistent session storage, a complete CSRF strategy, production server configuration, hosting, backups, monitoring, and institutional data governance. No real data may be used.

The project uses only synthetic examples. SQLite is local to the computer running the API. The Vite development server and API bind to loopback; teammates cannot reach them remotely through the local URL. Do not expose the dev server with `--host 0.0.0.0` or port forwarding as a shortcut to sharing private functions.

The API checks trusted session identity, student/staff roles, ticket owner/department, and field lengths; tests include allowed and denied cases. UI hiding is not the access control. This is instructional code, not a professional security review. Do not store real credentials in source control. Never put real student information, messages, grades, health/counseling data, complaints, payment information, or official live feeds in this demo.

The service/announcement demo entries are fictional and their locations are placeholders. Do not present them as verified facts. Survey and Dean/OSA letter drafts have not been approved for distribution. A future public staging deployment requires a separate explicit team/account-owner decision; any billable requirement is a stop-and-approve gate.
