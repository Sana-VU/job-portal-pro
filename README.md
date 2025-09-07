# Job Portal PRO (Next.js + Express + MongoDB)

A professional, production-ready job posting website built with **Next.js 14 (App Router)** on the frontend and **Express + MongoDB** on the backend. Includes JWT auth (httpOnly cookies), admin job management, user job browsing and applications, and CI-ready configs.

## 🔧 Tech Stack
- Frontend: Next.js 14, TypeScript, Tailwind CSS, React Hook Form, Axios, Zustand
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, zod
- Tooling: ESLint, Prettier, GitHub Actions
- Deploy: Vercel (client) + Render/Heroku (server) + MongoDB Atlas

## ▶️ Quick Start
1. **Server**
   ```bash
   cd server
   cp .env.example .env
   # fill in values
   npm install
   npm run dev
   ```
2. **Client**
   ```bash
   cd client
   cp .env.example .env.local
   # set NEXT_PUBLIC_API_BASE (e.g., http://localhost:3001)
   npm install
   npm run dev
   ```

Open the site at **http://localhost:3000**.

## 🔐 Environment Variables
- `server/.env`:
  - `MONGODB_URI=`
  - `JWT_SECRET=`
  - `CLIENT_ORIGIN=http://localhost:3000`
  - `PORT=3001`
  - `NODE_ENV=development`
- `client/.env.local`:
  - `NEXT_PUBLIC_API_BASE=http://localhost:3001`

## 🧪 Test Accounts
Create an admin by updating the `role` of your user in MongoDB to `"admin"` after registration.

## 🧱 Features
- Auth (register/login/logout) with **httpOnly** cookies
- Admin: create/update/delete jobs
- Users: browse jobs, view details, apply
- Dashboard stubs for both roles
- Clean, accessible UI (Tailwind)

## 🚀 Production Checklist
- [ ] Set PROD envs
- [ ] Enforce HTTPS
- [ ] CORS locked to domain
- [ ] Configure database indexes
- [ ] Add monitoring (e.g., Logtail/Sentry)

