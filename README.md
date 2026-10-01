# Lumiere Beauty Clinic

[![Full-stack CI](https://github.com/7clan/Lumiere-Beauty-Clinic/actions/workflows/ci.yml/badge.svg)](https://github.com/7clan/Lumiere-Beauty-Clinic/actions/workflows/ci.yml)

A full-stack clinic booking application built with **React + TypeScript** on the client and **Express + TypeScript + PostgreSQL/Prisma** on the server.

The project covers both customer-facing flows and protected administrative workflows rather than functioning as a static clinic website.

## Core functionality

### Client
- Public home, about, services, and contact pages
- User signup/login and account management
- Appointment booking
- Appointment history and cancellation
- Admin dashboard
- React Query for server state
- React Hook Form + Zod validation
- React Router-based navigation

### Server
- Express REST API
- PostgreSQL persistence through Prisma
- User and admin roles
- Appointment lifecycle and status management
- Service management
- Availability-slot management
- Profile management
- Development database seeding

## Security-oriented design

The backend includes:

- passwords stored as salted **bcrypt** hashes
- JWT authentication stored in **HTTP-only cookies**
- authorization middleware for authenticated/admin routes
- signed CSRF tokens for unsafe HTTP methods
- Helmet security headers
- explicit CORS origin + credential handling
- request-body size limits
- rate limiting on authentication and appointment paths
- Zod request validation
- generic server-error responses instead of leaking internals

The development seed no longer contains a reusable hard-coded admin password. Set `SEED_ADMIN_PASSWORD` locally if you want the seed script to create the development admin account.

## Data model

Prisma models cover:

- `User`
- `Service`
- `Appointment`
- `AvailabilitySlot`

Appointments are linked to both users and clinic services, while role-based middleware separates client behavior from administrative operations.

## Architecture

```text
React / TypeScript client
        |
        | Axios + cookie credentials
        v
Express / TypeScript API
        |
        | authentication / CSRF / validation / authorization
        v
Prisma ORM
        |
        v
PostgreSQL
```

Repository structure:

```text
client/
  src/pages/       application screens
  src/state/       client-side state
  src/lib/         API/client helpers

server/
  src/routes/      auth, appointments, services, admin
  src/middleware/  auth, CSRF, validation, rate limiting
  src/schemas.ts   Zod request contracts
  prisma/          schema and seed
  tests/           automated validation tests
```

## Automated verification

GitHub Actions now performs:

1. dependency installation
2. Prisma client generation
3. TypeScript type checking
4. automated server validation tests
5. full server + client build

The initial automated tests cover password rules, email normalization, login validation, appointment input contracts, and service-update constraints. They are intentionally a starting layer rather than a claim of complete integration coverage.

## Local setup

Requirements:

- Node.js 22+
- PostgreSQL

Install:

```bash
npm install
```

Copy:

```text
server/.env.example -> server/.env
```

Set secure local values for:

```text
DATABASE_URL
JWT_SECRET
COOKIE_SECRET
CSRF_SECRET
SEED_ADMIN_PASSWORD   # optional, development seed only
```

Generate Prisma client and migrate:

```bash
npm run prisma:generate
npm run prisma:migrate
```

Optional seed:

```bash
npm run seed
```

Start both applications:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
API: `http://localhost:4000`

## Useful commands

```bash
npm run typecheck
npm test
npm run build
```

## Deployment note

`netlify.toml` configures the React frontend build. Netlify static hosting does **not** run the Express server, so the API and PostgreSQL database must be deployed separately for full production functionality.

## Current limitations

- Automated coverage currently focuses on validation contracts; full route/database integration coverage is a next step.
- Production deployment still requires a separately hosted API and PostgreSQL instance.
- The repository began as a single large implementation commit, so newer commits now document testing, CI, security cleanup, and maintenance work more explicitly.
