# StackLens

**StackLens** is a DevOps discovery platform built with Next.js 15, PostgreSQL, and Tailwind CSS v4. It aggregates tech news from 9 live sources, hosts 30+ technology roadmaps with curated learning resources, and provides certification guides, salary data, and interview prep — all in one place.

---

## Features

### Tech News
- Live aggregation from **9 sources**: Hacker News, Dev.to, TechCrunch, Ars Technica, InfoQ, The Verge, Google News, Techmeme, Slashdot
- Dynamic **Editor's Pick** — always the highest-scored live story
- PostgreSQL sync every **10 minutes** via background in-memory gate
- RSS parsing without any third-party package (custom regex-based parser)

### Roadmaps
- **30+ curated roadmaps** across 7 categories: DevOps & Cloud, AI & ML, Backend, Frontend, Security, Mobile
- Level badges (Beginner / Intermediate / Advanced), time estimates, skill chips
- Category filter tabs via URL params (`?cat=devops`)
- Live search pulling results from roadmap.sh, GitHub, freeCodeCamp, YouTube & Dev.to

### Learning Resources (`/roadmaps/learning`)
- **31 topics** with curated, per-topic resources
- 5 sections per topic: Official Docs · YouTube Playlists · Free Courses · GitHub Repos · Cheat Sheets
- Live GitHub repo results merged with curated data

### Certifications (`/roadmaps/certifications`)
- AWS, Kubernetes (CKA / CKAD / CKS), GCP, Azure, HashiCorp, Linux Foundation, CompTIA certs
- Exam fees, difficulty, validity, free study dump availability

### Salaries (`/roadmaps/salaries`)
- Role-based salary data by region and experience level

### Interview Prep (`/roadmaps/interviews`)
- Top 50 Q&A per stack

### Authentication
- Sign up / sign in with email + password
- Email verification via SMTP (Gmail App Password supported)
- Session management via HttpOnly cookies (30-day expiry)
- Password hashing with bcryptjs (12 salt rounds)

### Other
- Dark / light mode (class-based, persisted)
- Ticker bar with live headlines
- Newsletter subscription
- Resource submission form
- Health check API (`/api/health`)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.5 (App Router) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL 15 |
| ORM | Drizzle ORM 0.45.2 |
| Auth | bcryptjs + HttpOnly session cookies |
| Email | Nodemailer (Gmail SMTP) |
| Icons | Lucide React |
| Runtime | Node.js 22 |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                     # Homepage / resource explorer
│   ├── news/page.tsx                # Live tech news from 9 sources
│   ├── roadmaps/
│   │   ├── page.tsx                 # Roadmaps grid + live search
│   │   ├── learning/page.tsx        # Docs, videos, courses, repos, cheatsheets
│   │   ├── certifications/page.tsx  # Cert guide with fees & tips
│   │   ├── salaries/page.tsx        # Salary insights by role/region
│   │   └── interviews/page.tsx      # Top 50 interview questions per stack
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── verify-email/page.tsx
│   ├── newsletter/page.tsx
│   ├── submit/page.tsx
│   ├── discord/page.tsx
│   ├── resources/[id]/page.tsx
│   ├── resources/external/page.tsx
│   ├── actions.ts                   # Server actions (auth, etc.)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── auth/
│   │   ├── signup-form.tsx          # useActionState client form
│   │   └── signin-form.tsx          # useActionState client form
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── ticker-bar.tsx
│   ├── resource-card.tsx
│   ├── upvote-button.tsx
│   └── newsletter-form.tsx
├── db/
│   ├── index.ts                     # Drizzle + pg pool setup
│   ├── schema.ts                    # Table definitions
│   ├── seed.ts                      # Seed runner
│   ├── seed-data.ts                 # Initial seed content
│   └── ensure-seeded.ts             # SELECT-first idempotent seeder
└── lib/
    ├── auth.ts                      # Session & cookie helpers
    ├── email.ts                     # Nodemailer transporter
    ├── live-news.ts                 # Multi-source news fetcher
    ├── data-sync.ts                 # 10-minute background DB sync
    └── aggregator.ts                # Resource aggregation helpers
```

---

## Database Schema

| Table | Purpose |
|---|---|
| `resources` | Curated & synced DevOps resources (blogs, repos, courses, docs) |
| `users` | User accounts with email verification |
| `sessions` | HttpOnly session tokens (30-day TTL) |
| `bookmarks` | User-saved resources |
| `categories` | Resource category metadata |
| `newsletter_subscribers` | Email newsletter list |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL) or a running PostgreSQL 15 instance
- Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) (for email verification)

### 1. Clone & install

```bash
git clone <repo-url>
cd devops-discovery-platform-saas
npm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

This starts a PostgreSQL 15 container on port `5432` with:
- User: `postgres`
- Password: `password123`
- Database: `opsatlas`

### 3. Configure environment

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://postgres:password123@localhost:5432/opsatlas"

# App URL (used in email verification links)
APP_URL="http://localhost:3000"

# SMTP — Gmail example (use an App Password, not your account password)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your@gmail.com"
SMTP_PASS="xxxx xxxx xxxx xxxx"
SMTP_FROM="StackLens <your@gmail.com>"
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App passwords. Generate one for "Mail".

### 4. Run database migrations

```bash
npx drizzle-kit push
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type check |
| `npx drizzle-kit push` | Push schema to database |
| `npx drizzle-kit studio` | Open Drizzle Studio (DB GUI) |

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — resource explorer with search and filters |
| `/news` | Live tech news from 9 sources with Editor's Pick |
| `/roadmaps` | 30+ roadmaps with category filters and live search |
| `/roadmaps/learning` | Per-topic: docs, YouTube, courses, GitHub repos, cheat sheets |
| `/roadmaps/certifications` | Certification guide with fees and free resources |
| `/roadmaps/salaries` | Salary data by role and region |
| `/roadmaps/interviews` | Top 50 interview questions per stack |
| `/signup` | User registration with email verification |
| `/login` | Sign in — supports `?verified=1` success banner |
| `/verify-email` | Token-based email verification handler |
| `/newsletter` | Newsletter subscription |
| `/submit` | Submit a resource |
| `/discord` | Discord community link |
| `/api/health` | Health check endpoint |

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `APP_URL` | Yes | Base URL for email links (no trailing slash) |
| `SMTP_HOST` | Yes | SMTP server host |
| `SMTP_PORT` | Yes | SMTP port (587 for TLS, 465 for SSL) |
| `SMTP_SECURE` | Yes | `"true"` for port 465, `"false"` for 587 |
| `SMTP_USER` | Yes | SMTP login username |
| `SMTP_PASS` | Yes | SMTP password / App Password |
| `SMTP_FROM` | Yes | From name and address for emails |

---

## Key Implementation Notes

- **Tailwind v4**: Uses `@import "tailwindcss"` syntax. Dark mode via `@variant dark (&:where(.dark, .dark *))`.
- **Drizzle `onConflictDoNothing()`**: Throws in v0.45.2 — the seeder uses a SELECT-first pattern instead.
- **RSS parsing**: No npm packages. Custom `extractField()` + `parseRSS()` functions handle CDATA, Atom feeds, and `<link>` variations.
- **Server component filtering**: Category/topic filters are URL params (`?cat=`, `?topic=`) — no client-side state needed.
- **Data sync gate**: `let lastSyncedAt` in-memory variable prevents re-syncing within 10 minutes per server process. Not distributed — suitable for single-instance deployments.
- **Reddit API**: Blocked server-side since 2023; replaced with RSS-based sources.

---

## License

MIT
