# 🚀 Job Portal PRO — Phase 2 Plan (Next-Level Functionality)

> Target audience: beginner→pro implementers using AI tools (ChatGPT, Cursor, Copilot).  
> Goal: Ship production-grade features (jobs CRUD, detail pages, applications with resume upload, search/filters, email notifications, dashboards, admin panel, SEO & analytics).  
> Branching: work in short-lived feature branches; PRs must pass CI (build, lint, basic tests).

---

## 1) Scope & Outcomes

**Business outcomes**

- Increase job seeker conversions (views → applications).
- Reduce admin publishing time (create/edit jobs easily).
- Improve discovery via search, filters, and SEO.

**Technical outcomes**

- Solid, documented API contracts with validation (zod).
- Reusable UI patterns with accessible components.
- Test baseline (unit + integration) and simple CI quality gates.

---

## 2) Architecture Snapshot

```
client (Next.js 14/15, TS, Tailwind)
  ↕ Axios (withCredentials)
server (Express, JWT httpOnly, zod, helmet, rate limiting)
  ↔ MongoDB (Mongoose models: User, Job, Application, Upload)
  ↔ Cloudinary/S3 (resume storage)  ← new
  ↔ Mail provider (Resend/Postmark)  ← new
```

**Notes**

- Current project runs Next 14.x. Optional: upgrade to **Next 15** (see §17).
- Keep `CLIENT_ORIGIN` tightly scoped; cookies remain `httpOnly` + `SameSite=Lax`.
- Add text indexes to Jobs for search.

---

## 3) Phase-2 Backlog (Epics)

1. **Jobs CRUD + Detail Page** (public detail, admin manage).
2. **Search & Filters** (text search, location, company, salary range).
3. **Applications + Resume Upload** (Cloudinary/S3, file validations).
4. **User Dashboard** (profile, saved jobs, my applications).
5. **Admin Panel** (manage jobs, review applications).
6. **Email Notifications** (welcome, job posted, application received).
7. **SEO & Sharing** (OG tags, sitemap.xml, robots.txt, canonical).
8. **Analytics & Monitoring** (basic events, error logging).
9. **Testing & CI** (Vitest, React Testing Library, API integration tests).

---

## 4) Feature: Jobs CRUD & Detail Page

### User Stories

- As a visitor, I can open **/jobs/[id]** to view a detailed job (title, company, description, salary, location, posted date).
- As an admin, I can **create/edit/delete** a job from the dashboard and see my list of jobs.

### DB Changes

- `Job` (already present) – add optional fields:
  - `type` (full-time/part-time/contract), `tags: string[]`, `remote: boolean`, `applyUrl?: string`

### API

- `GET /jobs/:id` → job detail
- `POST /jobs` (admin) → create
- `PUT /jobs/:id` (admin) → edit
- `DELETE /jobs/:id` (admin) → delete

**Request/Response Example**

```http
GET /jobs/662d... 200
{
  "_id": "...",
  "title": "Frontend Engineer",
  "company": "Acme",
  "location": "Islamabad",
  "salary": "150-250k PKR",
  "type": "full-time",
  "tags": ["react","nextjs"],
  "remote": true,
  "description": "Role...",
  "createdAt": "2025-09-05T..."
}
```

### Frontend

- New route: **`client/app/jobs/[id]/page.tsx`**
- Component: `JobDetails.tsx` (title/company/specs/apply button).

### Acceptance Criteria

- Detail page loads server data by `id` and handles **loading/404**.
- Admin can fully CRUD jobs from dashboard forms with validation.
- Error states and success toasts implemented.

### AI Prompt (paste into ChatGPT/Cursor)

> _PROMPT_: _“You are my senior Next.js/Tailwind engineer. Add a job details page at `app/jobs/[id]/page.tsx`. Fetch job by id from `${NEXT_PUBLIC_API_BASE}/jobs/:id`. Render title/company/location/salary/description, add an Apply button linking to `/apply/:id`. Ensure responsive layout and accessible headings. Provide code and file diffs.”_

---

## 5) Feature: Search & Filters

### Stories

- As a visitor, I can search by keywords and filter by **location, type, remote, salary range**.

### DB & Indexes

- Create a **compound text index** on `title, company, description, tags`.
- Consider numeric `salaryMin, salaryMax` for range filters.

### API

- `GET /jobs?query=react&location=Islamabad&type=full-time&remote=true&min=100000&max=250000&page=1&limit=20`

**Server logic**

- Build a dynamic query from params; paginate with `limit/skip`.
- Sort by `createdAt desc` by default.

### UI

- Search bar + filters panel (disclosure on mobile).
- Show applied filters as chips, “clear all”.

### Acceptance Criteria

- Querystring reflects filters; back/forward works.
- Server returns paginated results; “Load more” or pagination controls.

### AI Prompt

> _“Implement a server-side `/jobs` search endpoint supporting `query`, `location`, `type`, `remote`, `min`, `max`, `page`, `limit`. Use Mongoose text index + numeric range on salary. Return `{items, total, page, pageSize}`. Provide route code + model updates.”_

---

## 6) Feature: Applications + Resume Upload

### Stories

- As a signed-in user, I can **apply** to a job with a cover letter + **resume upload** (PDF/DOCX).
- As an admin, I can **view applications** per job.

### Storage

- Choose **Cloudinary** (simpler) or **S3**. Below uses Cloudinary.

### Env (Server)

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAX_FILE_MB=5
ALLOWED_MIME=application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

### API

- `POST /applications` — body: `{ jobId, coverLetter, resumeUrl }`
- `GET /applications/mine` — current user’s applications
- `GET /applications/job/:jobId` (admin) — applications for a job

**Upload flow**

1. Client requests **signed upload** or uses server route to upload to Cloudinary.
2. Server validates **mime/size**; returns `resumeUrl` stored in Application.

### UI

- **/apply/[id]** form with file input. Validate type/size; show progress.
- In dashboard, “My Applications” list; admin sees per-job applications.

### Acceptance Criteria

- Reject files > limit or invalid mime.
- Successful submit creates Application; visible in dashboards.

### AI Prompt

> _“Add Cloudinary-based resume uploads to Express. Validate mime/size with env controls; return a URL stored on the Application model. Provide `POST /uploads/resume` and client code to send multipart form data.”_

---

## 7) Feature: User Dashboard Enhancements

### Stories

- Users edit profile (name, avatar URL, resume default).
- Users can **save jobs** and view **application history**.

### DB

- `User.savedJobs: ObjectId[]`
- Optional `avatarUrl`, `resumeUrlDefault`

### API

- `GET /me` (already) → extend payload
- `POST /users/me` → update profile
- `POST /users/saved/:jobId` / `DELETE /users/saved/:jobId`
- `GET /users/saved`

### UI

- Dashboard tabs: **Profile · Applications · Saved Jobs**.

### Acceptance Criteria

- Saved jobs toggle from JobCard; reflected in dashboard.
- Profile updates persist and re-render.

---

## 8) Feature: Admin Panel

### Stories

- Admin sees table of jobs (edit/delete), applications by job, quick stats.

### API

- `GET /admin/jobs`
- `GET /admin/jobs/:id/applications`

### UI

- `/dashboard/admin` route with tables (sortable), inline edit modal.

### Acceptance Criteria

- Only admins can access; robust 403 behavior.
- Basic stats (count jobs, applications last 7 days).

---

## 9) Feature: Email Notifications

### Provider

- Resend, Postmark, or Nodemailer SMTP.

### Env

```
MAIL_PROVIDER=postmark
MAIL_KEY=
MAIL_FROM=no-reply@yourdomain.com
```

### Triggers

- **Welcome** after register
- **Job posted** (admin confirmation)
- **Application received** (to admin/company + to applicant)

### Acceptance Criteria

- Emails render with brand template
- Failures logged; retries handled gracefully

---

## 10) SEO & Sharing

- Add **dynamic metadata** per job detail (title, description, OG image).
- Generate **sitemap.xml** and **robots.txt**.
- Canonical URLs; breadcrumbs schema.

**Checklist**

- [ ] `<meta name="description">`
- [ ] `og:title`, `og:description`, `og:url`
- [ ] `twitter:card`
- [ ] `sitemap.xml` (regenerate on deploy)
- [ ] `robots.txt` (allow public pages)

---

## 11) Analytics & Monitoring

- Page & event analytics (e.g., Vercel Analytics or Plausible).
- Error logging (console → hosted logging or Sentry).

**Key events**

- `job_view`, `search_submit`, `filter_apply`, `apply_submit`, `signup`, `login`

---

## 12) Testing Plan

**Unit (client)**

- Components: JobCard, forms (validation scenarios).

**Integration (server)**

- Auth routes (register/login), jobs search filters, applications create/list.

**E2E (optional)**

- Playwright/Cypress for “happy path”: register → login → apply.

**Commands**

```bash
# client
npm run test

# server (example using vitest + supertest; to be added)
npm run test
```

---

## 13) Performance & Caching

- Paginate jobs, server-side fetch with caching headers.
- Consider **ISR**/revalidate for marketing pages; SSR for dynamic pages.
- Use indices on frequent queries (createdAt, text).

---

## 14) Security Hardening

- Rate-limit auth & uploads.
- Strict CORS; only production origins in prod.
- Helmet CSP (allow Cloudinary/S3 domains).
- Validate **all** inputs (zod).
- Sanitize HTML if ever rendering rich text.
- Virus scan uploads if moving beyond Cloudinary validation.

---

## 15) Accessibility QA

- Color contrast ≥ AA.
- Focus states, skip links, semantic headings.
- Keyboard operable filters and forms.
- Proper `<label>` and `aria-*` on form fields.

---

## 16) Release & CI/CD

**GitHub Actions**

- Build client/server, run lints & unit tests.
- On `main` push: deploy client → Vercel; server → Render/Heroku.

**Env promotion**

- `.env.production` secrets in platform dashboards.
- Rotate JWT secret on incident; invalidate via cookie clear.

---

## 17) Optional: Upgrade to Next.js 15

**Steps**

1. Update `next` to `^15.x`, `eslint-config-next`, `typescript` if needed.
2. Fix any `app/` router warnings.
3. Run `next build` & resolve breaking changes.
4. Verify `metadata` API & dynamic routes behavior.

```bash
cd client
npm i next@latest eslint-config-next@latest typescript -D
npm run build
```

---

## 18) API Contract Summary (Additions)

```
GET   /jobs/:id
GET   /jobs?query=&location=&type=&remote=&min=&max=&page=&limit=
POST  /jobs                 (admin)
PUT   /jobs/:id             (admin)
DEL   /jobs/:id             (admin)

POST  /applications         (auth) { jobId, coverLetter, resumeUrl }
GET   /applications/mine    (auth)
GET   /applications/job/:id (admin)

POST  /users/me             (auth)  body: { name?, avatarUrl?, resumeUrlDefault? }
POST  /users/saved/:jobId   (auth)
DEL   /users/saved/:jobId   (auth)
GET   /users/saved          (auth)

POST  /uploads/resume       (auth)  (multipart) → { url }
```

All bodies validated with **zod**. Errors return `{ message }` or zod `.flatten()`.

---

## 19) Prompts Library (Copy‑Paste)

**Jobs Detail Page (client)**

> “Add `app/jobs/[id]/page.tsx`. Fetch job via Axios from `${NEXT_PUBLIC_API_BASE}/jobs/:id`. Create `JobDetails` component with title/company/location/salary/description + Apply button → `/apply/[id]`. Provide code + diff.”

**Search & Filters (server)**

> “Extend `/jobs` to support text search (Mongoose text index on title, company, description, tags) and filters (location, type, remote, min/max salary). Return paginated `{ items, total, page, pageSize }`.”

**Resume Upload (server)**

> “Implement Cloudinary resume upload endpoint `POST /uploads/resume`. Validate `ALLOWED_MIME` and `MAX_FILE_MB`. Return `{ url }` to store in Application.”

**Dashboard (client)**

> “Create dashboard tabs: Profile, Applications, Saved Jobs. Implement profile update form and saved jobs list (toggle from JobCard).”

**Admin Panel**

> “Build `/dashboard/admin`: jobs table with edit/delete, applications per job, and basic stats. Enforce admin-only access.”

**Emails**

> “Add mail service with provider env. Send Welcome (on register), Job Posted (on admin create), Application Received (to admin & applicant). Template with brand styles.”

---

## 20) Milestones & Definition of Done

**M1 — Jobs Detail + CRUD (3–4 days)**

- UI detail page + admin CRUD + tests + docs.

**M2 — Search/Filters (3–4 days)**

- Server search endpoint + UI filters + pagination + tests.

**M3 — Applications + Upload (3–5 days)**

- Cloudinary upload + apply flow + dashboards + tests.

**M4 — Admin Panel + Email (3–5 days)**

- Tables, stats, notification flows + tests.

**M5 — SEO/Analytics + Release (2–3 days)**

- OG tags, sitemap, robots, events + deploy + checklist.

**Definition of Done (each feature)**

- ✅ API contract documented; validation in place.
- ✅ UI accessible and responsive.
- ✅ Tests added (unit + integration).
- ✅ CI green; no TODOs left in code.
- ✅ README updated; envs documented.

---

## 21) Commands Quick Reference

```bash
# text index (mongo shell)
db.jobs.createIndex({ title: "text", company: "text", description: "text", tags: "text" })

# run all
(cd server && npm run dev) & (cd client && npm run dev)
```

---

### Appendix: File TODOs (where to implement)

- `client/app/jobs/[id]/page.tsx` — detail page
- `client/app/apply/[id]/page.tsx` — application form
- `client/app/dashboard/page.tsx` — tabs for profile/saved/apps
- `client/components/Filters.tsx` — search & filters UI
- `server/routes/jobs.js` — add GET:/:id + search filters
- `server/routes/applications.js` — ensure list + admin list
- `server/routes/uploads.js` — new (Cloudinary)
- `server/models/User.js` — add savedJobs, avatarUrl, resumeUrlDefault
