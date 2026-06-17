# Security Policy

## Supported Versions

Only the latest version of StackLens receives security updates.

| Version | Supported |
|---------|-----------|
| latest (main branch) | ✅ Active |
| older branches | ❌ Not supported |

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub Issues.**

If you discover a security vulnerability in StackLens, please report it responsibly
by contacting the owner directly:

- **Email**: khaliquezeeshan@gmail.com
- **Subject line**: `[SECURITY] StackLens — <brief description>`

### What to include in your report

Please provide as much of the following information as possible:

- Type of vulnerability (e.g., XSS, SQL injection, authentication bypass, SSRF)
- Full path of the affected file(s)
- Step-by-step instructions to reproduce the issue
- Proof of concept or exploit code (if available)
- Potential impact and attack scenario
- Suggested fix (optional but appreciated)

### Response Timeline

| Stage | Timeframe |
|-------|-----------|
| Acknowledgement of report | Within 48 hours |
| Initial assessment & severity rating | Within 5 business days |
| Fix developed & tested | Within 14 days (critical), 30 days (others) |
| Public disclosure (if applicable) | After fix is deployed |

---

## Security Measures in This Project

### Authentication
- Passwords hashed with **bcryptjs** (12 salt rounds)
- Sessions stored server-side in PostgreSQL with 30-day expiry
- Session tokens transmitted via **HttpOnly cookies** (not accessible from JavaScript)
- Email verification required before account activation

### Data Protection
- All sensitive configuration stored in environment variables (never in code)
- `.env` file is gitignored — never committed to the repository
- Database credentials, SMTP passwords, and session secrets are environment-only

### Dependencies
- All dependencies pinned to specific versions in `package.json`
- Run `npm audit` regularly to detect known vulnerabilities in dependencies
- Avoid installing unverified third-party packages

### Input Handling
- Database queries use Drizzle ORM's parameterized queries (prevents SQL injection)
- User-supplied content is not rendered as raw HTML
- External URLs from RSS feeds are not evaluated or executed

### Infrastructure (AWS Lightsail)
- Application runs behind Nginx reverse proxy (port 80/443 only exposed)
- PostgreSQL is not exposed to the public internet (localhost only)
- SSH access restricted to key-based authentication
- Security groups restrict inbound traffic to ports 22, 80, 443 only

---

## Known Security Considerations

| Area | Note |
|------|------|
| SMTP credentials | Stored in `.env`. Use Gmail App Password — not your account password. Rotate if exposed. |
| Session secrets | Session tokens are random UUIDs. Invalidate all sessions by clearing the `sessions` table if a breach is suspected. |
| RSS feeds | External RSS content is displayed as text only — not rendered as HTML. |
| Rate limiting | No built-in rate limiting on auth endpoints. Recommended: add Nginx rate limiting or use Cloudflare. |
| HTTPS | Production should serve over HTTPS only. Use Let's Encrypt + Certbot with Nginx. |

---

## Responsible Disclosure

We follow a **coordinated disclosure** policy. We ask that you:

1. Give us reasonable time to fix the issue before any public disclosure.
2. Do not exploit the vulnerability or access data beyond what is needed to demonstrate the issue.
3. Do not perform denial-of-service attacks, spam, or social engineering.

We commit to:

1. Acknowledging your report promptly.
2. Keeping you informed of our progress.
3. Crediting your discovery (if you wish) after the fix is deployed.

Thank you for helping keep StackLens secure.
