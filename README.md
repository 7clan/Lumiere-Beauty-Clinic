# Lumiere Beauty Clinic

Modern full-stack website for Lumiere Beauty Clinic, built with a React frontend and an Express/Prisma backend.

## Stack

- React, TypeScript, Vite, React Router, Tailwind CSS
- React Hook Form, Zod, TanStack Query, Axios
- Node.js, Express, TypeScript
- PostgreSQL, Prisma ORM
- bcrypt password hashing
- JWT auth stored in HTTP-only cookies
- Helmet, CORS, CSRF protection, rate limiting, input sanitization

## Project Structure

- `client/` - Vite + React frontend
- `server/` - Express API, Prisma schema, auth, and booking logic
- `netlify.toml` - Netlify build settings for the frontend

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the backend environment file:

   ```bash
   copy server\.env.example server\.env
   ```

3. Set `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`, and `CSRF_SECRET` in `server/.env`.

4. Generate Prisma client and migrate:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run seed
   ```

5. Start both apps:

   ```bash
   npm run dev
   ```

Frontend: `http://localhost:5173`

Backend: `http://localhost:4000`

The seed creates an admin user:

- Email: `admin@lumiereclinic.com`
- Password: `AdminPass123!`

Change this password before production.

## Netlify Frontend Deploy

This repo includes `netlify.toml` for deploying the React frontend to Netlify.

- Build command: `npm run build:client`
- Publish directory: `client/dist`
- Optional frontend env var: `VITE_API_URL=https://your-backend-domain.com/api`

Netlify static hosting will not run the Express server in `server/`. Deploy the backend separately, or convert it to Netlify Functions before expecting auth and appointments to work in production.
