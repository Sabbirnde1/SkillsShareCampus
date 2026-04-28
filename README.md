# SkillShareCampus

Turn your skills into campus income. SkillShareCampus is a micro-marketplace built for students to offer services, collaborate, and build real portfolios.

## Overview

SkillShareCampus connects student service providers (tutoring, design, tech help, etc.) with students who need help. The project includes a full-stack TypeScript codebase with an Express API and a React + Vite client. Core features include user profiles, service listings, bookings, reviews, and real-time messaging.

## Highlights / Features

- User profiles and verification (school information)
- Create, list, and search student services
- Bookings and availability management
- Ratings and reviews for services
- Conversations and messaging between users
- Server-rendered client in production; Vite dev server in development

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL compatible (Neon supported via `@neondatabase/serverless`) with Drizzle ORM
- Authentication: OpenID/passport hooks prepared (disabled in local dev in this repo)
- Tooling: Drizzle-kit, Vite, tsx, esbuild

## Repository Structure

- server/ — Express API and server-side setup
- client/ or top-level client files — React app (Vite)
- shared/ — DB schema and shared types (Drizzle)
- .config/.semgrep — (removed from history for push protection) originally contained checks

## Environment Variables

At minimum set the following for production or when connecting a real database:

- `DATABASE_URL` — PostgreSQL connection string (required for DB access)

Example (local .env):

DATABASE_URL=postgres://user:password@localhost:5432/skillshare

Note: Authentication-related variables were intentionally disabled in this repository's local development setup. If enabling auth, add the relevant OIDC/Session variables and update `server/replitAuth.ts`.

## Getting Started (Development)

1. Install dependencies

```bash
npm install
```

2. Start development server (API + Vite dev for client)

```bash
npm run dev
```

The server listens on port `5000` by default and proxies Vite in development. Open http://localhost:5000 to view the app.

## Build & Production

Build the client and bundle the server for production:

```bash
npm run build
npm run start
```

## Database Migrations / Schema

This project uses Drizzle. To push schema changes if you manage the DB locally or via a cloud provider:

```bash
npm run db:push
```

Refer to `shared/schema.ts` for the canonical database schema (users, services, bookings, reviews, conversations, messages).

## Contributing

- Fork the repo and create feature branches
- Open a pull request with a clear description and testing steps
- Keep commits focused and sign-off on any migration changes

If your changes add secrets or keys, ensure they are not committed (use environment variables or secret managers).

## Contact / Owner

Project maintained by the repo owner. For questions or client handoff, contact the repository owner or open an issue in the repository.

## License

This project is licensed under MIT.

