# 🧭 Cursor Implementation Guide — Job Portal PRO

This Markdown contains **copy‑ready prompts and checklists** to harden, test, and polish the project with **Cursor**.  
Open the repo in Cursor, then use the **Master Task Prompt** below in the chat at the repository root.

---

## 🔷 Master Task Prompt (paste into Cursor)

> **SYSTEM/GOAL**  
> You are a senior full‑stack engineer. Given a monorepo with `client` (Next.js App Router + TS + Tailwind) and `server` (Express + MongoDB + JWT), your job is to:
>
> 1. install & run the app locally,
> 2. fix any TypeScript/ESLint/runtime issues,
> 3. verify UX flow: **/jobs → /jobs/[id] → /apply/[id]**, **/login**, **/register**, **/dashboard** (tabs),
> 4. ensure seeded **dummy jobs with images** are visible,
> 5. polish the **header** (sticky/blur/gradient/contrast),
> 6. add **minimal tests** (client & server) and wire to CI,
> 7. output a short **test report** and list of fixes.
>
> **REPOSITORY MAP (key files)**
>
> - Client:
>   - `client/app/page.tsx` (home hero)
>   - `client/app/jobs/page.tsx` (list)
>   - `client/app/jobs/[id]/page.tsx` (detail)
>   - `client/app/apply/[id]/page.tsx` (apply form)
>   - `client/app/login/page.tsx`, `client/app/register/page.tsx`, `client/app/dashboard/page.tsx`
>   - `client/components/Navbar.tsx`, `client/components/JobCard.tsx`
>   - `client/lib/api.ts`, `client/styles/globals.css`
> - Server:
>   - `server/routes/auth.js`, `server/routes/jobs.js`, `server/routes/applications.js`
>   - `server/models/User.js`, `server/models/Job.js`, `server/models/Application.js`
>   - `server/scripts/seed.js`, `server/server.js`
>
> **ENVIRONMENT**
>
> - Server: copy `.env.example` → `.env`, set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN=http://localhost:3000`, `PORT=3001`.
> - Client: copy `.env.example` → `.env.local`, set `NEXT_PUBLIC_API_BASE=http://localhost:3001`.
>
> **TASKS**
> A) **Install & Run**
>
> - Run `npm install` in both `client` and `server`.
> - Start API: `cd server && npm run seed && npm run dev` (verify `/health`).
> - Start app: `cd client && npm run dev` (verify home).
>
> B) **Static Checks**
>
> - Ensure `next lint` passes; fix TS types in pages/components.
> - Confirm Axios base URL/cookies config.
>
> C) **Functional Fixes (if needed)**
>
> - `/jobs` shows seeded jobs (title/company/location/salary/tags/image).
> - Clicking a card opens **/jobs/[id]** (detail page fetches `GET /jobs/:id`).
> - **Apply Now** posts to `/applications` and redirects to **/dashboard**.
> - **Dashboard** tabs switch state and admin can **Create job** (POST `/jobs`).
> - Header is sticky, blurred, gradient, accessible contrast (AA).
>
> D) **Dummy Data**
>
> - Confirm `npm run seed` creates admin and 3 jobs with images.
> - Verify images render and cards truncate descriptions (line‑clamp).
>
> E) **Minimal Tests**
>
> - Client (Vitest + React Testing Library):
>   1. `JobCard` renders company/title/location/tags given a mock job.
>   2. `/jobs` page renders a list given a mocked API (axios mocked).
> - Server (Vitest + Supertest):
>   1. `POST /auth/register` 200 path.
>   2. `GET /jobs` returns array (seed or mock DB).
> - Add npm scripts: `"test"` in both apps; ensure CI runs them.
>
> F) **Accessibility & UX**
>
> - Keyboard focus visible on nav and forms; semantic headings; labels.
> - Contrast check for header & buttons (AA).
>
> G) **Report**
>
> - Produce a final note with: setup steps, encountered issues + fixes, commands used, and **Known Limitations** (if any).
>
> **ACCEPTANCE CRITERIA**
>
> - Dev servers run without runtime errors.
> - `/jobs → /jobs/[id] → /apply/[id]` works; dashboard tabs switch; admin can create jobs.
> - Seeded data shows with images.
> - Tests pass locally and in CI.
> - Provide a concise final diff summary and test report.
>
> **MAKE SMALL COMMITS**
>
> - After each change, show the **git diff** and a clear commit message. Do not bundle unrelated changes.
>
> **DO IT NOW.** Execute tasks sequentially and narrate your steps.
>
> **END OF PROMPT**
>
> _(Cursor: create small PRs/commits with diffs after each subtask.)_
>
> ---
>
> ### 📦 Commands to run
>
> ```bash
> # Server
> cd server
> cp .env.example .env
> npm install
> npm run seed
> npm run dev   # http://localhost:3001/health
>
> # Client
> cd ../client
> cp .env.example .env.local
> npm install
> npm run dev   # http://localhost:3000
> ```
>
> ### ✅ Test scaffolds to add
>
> **client/package.json**
>
> ```json
> { "scripts": { "test": "vitest" } }
> ```
>
> **server/package.json**
>
> ```json
> { "scripts": { "test": "vitest" } }
> ```
>
> **Client tests (examples)**
>
> - `client/__tests__/JobCard.test.tsx`
> - `client/__tests__/jobs-page.test.tsx` (mock axios, assert list renders)
>
> **Server tests (examples)**
>
> - `server/tests/auth.test.js` (`POST /auth/register` happy path with in‑memory Mongo or mocked Mongoose)
> - `server/tests/jobs.test.js` (`GET /jobs` returns array)
>
> **CI**  
> Update `.github/workflows/ci.yml` to run `npm test` in both apps after build.
>
> ### 🔍 Accessibility quick‑check
>
> - Focus rings on nav links and buttons.
> - Header/btn contrast ≥ 4.5:1.
> - Labels on all inputs; descriptive button text.
>
> ### 🧱 Commit plan (sample)
>
> - chore: add vitest + RTL setup (client) & vitest + supertest (server)
> - fix(client): stabilize job detail fetch & apply flow
> - feat(ui): gradient sticky header + glass + AA contrast
> - feat(server): ensure GET /jobs/:id + improve zod errors
> - test: add JobCard and jobs page tests; add auth/jobs API tests
> - ci: run tests in GitHub Actions
>
> ### 🧪 Final deliverables
>
> - Passing dev runs (client & server).
> - Passing tests (local & CI).
> - Short **TEST REPORT** in the chat with any known limitations.
>
> ---
>
> _(Proceed step‑by‑step. After each fix, show the diff and the command result.)_

---

## 🧩 Optional: Follow‑up “Focus Prompts”

- **Lint/TS only**  
  “Run lint and TypeScript checks across client/server. For each error, propose the minimal fix. Apply changes with small commits and show diffs.”

- **Testing only**  
  “Add Vitest + React Testing Library to client and Vitest + Supertest to server. Create one smoke test per area (JobCard render, jobs page render with mocked API, `POST /auth/register`, `GET /jobs`). Wire `npm test` and CI.”

- **Accessibility pass**  
  “Audit header and primary buttons for AA contrast; ensure focus states on nav and form fields; fix any violations with minimal CSS/Tailwind changes.”

## 📚 Notes for Cursor

- Keep responses **concise** and **diff‑first**.
- Don’t introduce new libraries unless necessary.
- Prefer typed fixes to suppressions.
- Always re‑run the app & tests after changes.

---

**Use**: Paste the **Master Task Prompt** in Cursor at the repo root and let it iterate through tasks. Keep commits small, readable, and tied to acceptance criteria.
