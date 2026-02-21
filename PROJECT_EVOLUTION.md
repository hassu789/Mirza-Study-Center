# Mirza Study Centre — Project Evolution

This file tracks every meaningful change made to the project.
Each entry explains **what** was changed, **why**, and **what you should learn**.

---

## Phase 1: Production Safety & Lead Capture

### 1.1 — Email Notifications on Inquiry (nodemailer + Gmail SMTP)

**What:** When a student submits an inquiry, the admin automatically receives an
email with the student's name, phone, class, subject, and message.

**Why:** Before this, the admin had to keep checking the admin panel to see new
inquiries. Missed inquiries = lost students. Email ensures you never miss a lead.

**What to learn:**
- `nodemailer` is the standard Node.js library for sending emails.
- Gmail SMTP is free for low volume (< 500 emails/day) — perfect for a coaching center.
- You need a **Google App Password** (not your regular password) because Google
  blocks "less secure apps." Generate one at https://myaccount.google.com/apppasswords.
- Email sending is **fire-and-forget** — if it fails, the inquiry is still saved to
  the database. We never let a mailer failure block the user.

**Files changed:**
- `src/lib/mailer.ts` (new) — reusable email utility
- `src/app/api/inquiry/route.ts` — sends email after saving inquiry
- `.env` — added SMTP_EMAIL and SMTP_PASSWORD variables

---

### 1.2 — MongoDB Auto-Indexes on Connection

**What:** Indexes are now created automatically the first time the server connects
to MongoDB. No need to run a separate script.

**Why:** If you forget to run `setup-indexes.ts`, queries are slow and the unique
email constraint doesn't exist (allowing duplicate accounts). Auto-indexing removes
this risk.

**What to learn:**
- MongoDB indexes make queries fast. Without an index on `users.email`, MongoDB scans
  every single document to find one user — O(n). With an index, it's O(log n).
- A `unique` index on email prevents two users from signing up with the same email,
  even if two requests arrive simultaneously (race condition protection).
- `createIndex` is idempotent — calling it on an existing index does nothing. Safe to
  run on every connection.

**Files changed:**
- `src/lib/mongodb.ts` — added `ensureIndexes()` call on first connection

---

### 1.3 — Floating WhatsApp Button

**What:** A green WhatsApp icon appears in the bottom-right corner of every page.
Clicking it opens WhatsApp with a pre-filled message to the center's number.

**Why:** In India, WhatsApp is the #1 way parents contact coaching centers. Making
it one tap to message you removes friction and increases leads.

**What to learn:**
- `https://wa.me/919670212323?text=...` is WhatsApp's official deep-link format.
  The number must include country code (91) without + or spaces.
- The component is added in `layout.tsx` so it appears on every page automatically.
- `fixed bottom-6 right-6` uses Tailwind's fixed positioning — the button stays in
  the corner even when scrolling.

**Files changed:**
- `src/components/WhatsAppButton.tsx` (new)
- `src/app/layout.tsx` — added WhatsAppButton

---

### 1.4 — Google Maps Embed on Inquiry Page

**What:** Replaced the static image on the inquiry page with an interactive
Google Maps iframe showing the center's location.

**Why:** Parents want to know exactly where the center is. An interactive map lets
them zoom, get directions, and see the neighborhood — much more useful than a photo.

**What to learn:**
- Google Maps embeds are free and don't need an API key.
- The `<iframe>` uses `loading="lazy"` so it doesn't slow down the initial page load.
- `allowFullScreen` lets users expand the map to full screen on mobile.

**Files changed:**
- `src/app/inquiry/page.tsx` — replaced Image with iframe

---

### 1.5 — SEO: Sitemap, Robots, JSON-LD Schema

**What:**
- `sitemap.ts` — tells Google which pages exist on your site.
- `robots.ts` — tells crawlers what they can/cannot index.
- JSON-LD `LocalBusiness` schema — gives Google structured data about your business
  (name, address, phone, hours) so it can display rich results in search.

**Why:** Without these, Google doesn't know your site exists or what it's about.
This is the bare minimum SEO setup that every production website needs.

**What to learn:**
- Next.js App Router has built-in support for `sitemap.ts` and `robots.ts` — just
  export the right function and Next.js generates the XML/txt automatically.
- JSON-LD is invisible to users but tells Google: "This is a coaching center in
  Azamgarh, open Mon-Sat 9-8, phone number is X." Google uses this for the
  Knowledge Panel that appears in search results.
- `@type: EducationalOrganization` is the most accurate schema for a coaching center.

**Files changed:**
- `src/app/sitemap.ts` (new)
- `src/app/robots.ts` (new)
- `src/app/layout.tsx` — added JSON-LD script tag

---

### Already Implemented (Found During Audit)

These features were already present in the codebase before Phase 1:

| Feature | Location | Status |
|---|---|---|
| Rate limiting on login | `src/app/api/auth/login/route.ts` | 5 req/min per IP |
| Rate limiting on signup | `src/app/api/auth/signup/route.ts` | 3 req/min per IP |
| Rate limiting on inquiry | `src/app/api/inquiry/route.ts` | 3 req/min per IP |
| Zod validation (login) | `src/lib/schemas.ts` → `loginSchema` | Active |
| Zod validation (signup) | `src/lib/schemas.ts` → `signupSchema` | Active |
| Zod validation (inquiry) | `src/lib/schemas.ts` → `inquirySchema` | Active |
| MongoDB index script | `scripts/setup-indexes.ts` | Manual (now auto) |

---

## Phase 2: SEO, Security & User Experience

### 2.1 — Security Headers

**What:** Added HTTP security headers that the server sends with every response:
- `X-Frame-Options: SAMEORIGIN` — prevents your site from being embedded in an iframe
  on someone else's domain (clickjacking protection).
- `X-Content-Type-Options: nosniff` — prevents browsers from guessing file types
  (MIME sniffing attack protection).
- `Referrer-Policy` — controls what URL info is sent when users click links.
- `Permissions-Policy` — blocks access to camera, microphone, geolocation.
- `Strict-Transport-Security` — forces HTTPS for 2 years (HSTS).

**Why:** Without these, your site is vulnerable to common attacks. These headers are
the bare minimum security that every production website needs. They cost nothing and
protect your users.

**What to learn:**
- Security headers are configured in `next.config.ts` via the `headers()` function.
- These are sent automatically with every page and API response.
- You can test your headers at https://securityheaders.com after deployment.

**Files changed:**
- `next.config.ts` — added `headers()` config

---

### 2.2 — Per-Page SEO Metadata

**What:** Every public page now has its own unique `<title>` and `<meta description>`
for Google. For example:
- `/about` → "About Us | Mirza Study Centre"
- `/courses` → "Courses | Mirza Study Centre"
- `/inquiry` → "Enquire Now | Mirza Study Centre"

**Why:** Before this, every page showed the same title in Google search results.
Unique titles and descriptions help Google understand what each page is about and
show relevant snippets to users searching for specific things like "coaching center
fees in Azamgarh" or "physics tuition Azamgarh."

**What to learn:**
- In Next.js App Router, `'use client'` pages cannot export `metadata` — it's a
  server-only feature.
- The workaround: create a `layout.tsx` in each route directory that exports metadata
  and passes `children` through. This is the official Next.js pattern.
- The root layout uses `title.template: "%s | Mirza Study Centre"` so each page only
  needs to set its own title (e.g., "About Us") and Next.js appends the site name.

**Files created:**
- `src/app/about/layout.tsx`
- `src/app/courses/layout.tsx`
- `src/app/testimonials/layout.tsx`
- `src/app/faq/layout.tsx`
- `src/app/inquiry/layout.tsx`
- `src/app/login/layout.tsx`
- `src/app/signup/layout.tsx`
- `src/app/forgot-password/layout.tsx`

---

### 2.3 — Loading Skeletons

**What:** Added skeleton loading screens that appear instantly while pages load.
Instead of a blank white screen, users see a grey pulsing outline of the page layout.

**Why:** Perceived performance matters more than actual performance. A skeleton that
appears in 0ms feels faster than a blank screen that loads content in 500ms. This is
used by YouTube, Facebook, LinkedIn, and every major web app.

**What to learn:**
- Next.js App Router has a special `loading.tsx` file convention. When placed in a
  route directory, Next.js automatically shows it while the page is loading.
- `animate-pulse` is a Tailwind utility that creates the subtle pulsing animation.
- The skeleton should roughly match the layout of the actual page — headers, cards,
  sidebars in the same positions.

**Files created:**
- `src/components/LoadingSkeleton.tsx` — reusable `PageSkeleton` and `DashboardSkeleton`
- `src/app/loading.tsx` — root loading state
- `src/app/courses/loading.tsx`
- `src/app/feed/loading.tsx`
- `src/app/admin/loading.tsx`

---

### 2.4 — Global Error Boundary

**What:** Added a user-friendly error page that appears when something crashes. Shows
a "Something went wrong" message with "Try Again" and "Go Home" buttons.

**Why:** Without an error boundary, a crash shows React's ugly default error screen
(or worse, a blank page). The error boundary catches crashes gracefully and gives the
user a way to recover.

**What to learn:**
- `error.tsx` must be a `'use client'` component — this is a Next.js requirement.
- It receives `error` (the error object) and `reset` (a function to retry rendering).
- The `reset()` function re-renders the page without a full page reload — this often
  fixes transient errors like network timeouts.

**Files created:**
- `src/app/error.tsx`

---

### 2.5 — Font Fix (Turbopack Bug Workaround)

**What:** Replaced `next/font/google` with the `geist` npm package for loading fonts.

**Why:** Next.js 16.1.6's Turbopack bundler has a bug where it can't resolve the
internal module `@vercel/turbopack-next/internal/font/google/font`. This caused a
build error on every `next build` and `next dev`.

**What to learn:**
- `next/font/google` makes Turbopack download fonts from Google at build time.
  The `geist` npm package bundles the same font files locally — no download needed.
- The fonts are identical. Same typeface, same weights, same CSS variables.
  Only the source changes (npm package vs Google CDN).
- Always prefer local fonts over Google Fonts for reliability. No external dependency
  means no failure if Google is slow or blocked.

**Files changed:**
- `src/app/layout.tsx` — changed font imports
- `package.json` — added `geist` dependency

---

## Deployment Notes

### MongoDB Connection
The app uses `mongodb+srv://` which requires DNS SRV record resolution. Some local
networks (hotspots, restrictive ISPs) block these DNS queries. The app already overrides
DNS to Google (8.8.8.8) and Cloudflare (1.1.1.1) in both `instrumentation.ts` and
`mongodb.ts`. **On Vercel, this works without issues.**

### Environment Variables Needed on Vercel
```
MONGODB_URI=mongodb+srv://...
MONGODB_DB=StudyCenter
AUTH_SECRET=<random 32-byte base64 string>
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=admin-email@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Gmail App Password Setup
1. Go to https://myaccount.google.com/apppasswords
2. Sign in to your Google account
3. Select "Mail" and "Other (Custom name)" → type "Mirza Study Centre"
4. Click Generate — copy the 16-character password
5. Use that as `SMTP_PASSWORD` in your env variables

---

## Phase 3: Real Student System (Steps 1-3)

### 3.1 — Enrollment System

**What:** Students can now click "Enroll Now" on any course detail page to enroll.
The system creates a record in MongoDB and prevents duplicate enrollments.

**Why:** Before this, "Enroll Now" just linked to the inquiry page. There was no
actual enrollment — no tracking of who is in which course. This is the foundation
for everything (dashboard, attendance, fee tracking).

**Database design:**
```
enrollments collection:
{
  userId:        ObjectId  → references users._id
  courseId:       string    → matches static courses[].id
  enrolledAt:    Date
  progress:      number    → 0-100, updated by admin later
  status:        string    → "active" | "completed"
  paymentStatus: string    → "pending" | "paid"
}

Indexes:
  { userId: 1, courseId: 1 }  UNIQUE  → prevents double enrollment
  { userId: 1 }                       → fast "get my courses" queries
  { courseId: 1 }                      → fast "who's in this course" queries
```

**What to learn:**
- A **compound unique index** `{ userId, courseId }` is better than checking in
  application code because it works even under race conditions (two requests at
  the same millisecond). The database enforces uniqueness, not your code.
- `courseId` is a string (not ObjectId) because courses are still in a static file.
  When we move courses to MongoDB later (Step 4), this stays compatible.
- The "Enroll Now" button checks auth state on the client and either enrolls or
  redirects to login. After enrollment, it changes to "Enrolled — Go to Dashboard."

**Files created/changed:**
- `src/app/api/enroll/route.ts` (new) — POST to enroll, GET to list enrollments
- `src/app/courses/[id]/page.tsx` — real enroll button with auth check
- `src/lib/schemas.ts` — added `enrollSchema`
- `src/lib/mongodb.ts` — added enrollment indexes

---

### 3.2 — Real Dashboard (No More Hardcoded Data)

**What:** The `/feed` dashboard now shows:
- Real enrollment count, active courses, completed courses, average progress
- Real list of enrolled courses with progress bars and payment status
- Recommended courses (only courses the student hasn't enrolled in)
- Payment status summary (paid vs pending)

**Why:** The old dashboard had hardcoded values like "72% progress" and
"7 Day Streak!" that were the same for every user. Now every piece of data
is real and personal.

**What to learn:**
- `Promise.all()` fetches session + enrollments in parallel — faster than
  sequential fetches. The dashboard loads in one network round trip.
- The recommended courses filter uses a `Set` for O(1) lookups instead of
  `.includes()` which is O(n) — a small optimization that matters at scale.
- The empty state ("You haven't enrolled yet") is important UX — tell users
  what to do, don't just show a blank page.

**Files changed:**
- `src/app/feed/page.tsx` — complete rewrite with real data

---

### 3.3 — Student Profile Page

**What:** New `/profile` page where students can:
- See their account info (name, email, join date)
- See stats (enrolled courses count, inquiries count)
- Edit their name (with live update of the session)
- Change their password (requires current password verification)

**Why:** Students need a way to manage their account. Changing name updates the
JWT session immediately so the header shows the new name without re-login.

**What to learn:**
- Password change requires the **current password** as verification — never let
  users change passwords without confirming identity first.
- After updating the name, we call `createSession()` again to refresh the JWT.
  Without this, the old name would show in the header until the session expires.
- The API route handles both name update and password change in a single `PATCH`
  endpoint, differentiated by which fields are present in the body. This is a
  common REST pattern — fewer endpoints, simpler routing.

**Files created/changed:**
- `src/app/api/profile/route.ts` (new) — GET profile, PATCH update name/password
- `src/app/profile/page.tsx` (new) — profile UI
- `src/app/profile/layout.tsx` (new) — SEO metadata
- `src/lib/schemas.ts` — added `updateProfileSchema`, `changePasswordSchema`
- `src/components/Header.tsx` — added "My Profile" link in user dropdown

---

---

### 3.4 — Admin Panel Enhancements (Tabbed Interface)

**What:** Complete rebuild of the admin page with 4 tabs:

1. **Inquiries** — existing functionality (view + update status)
2. **Students** — see all registered users, search by name/email, pagination,
   enrollment count per student
3. **Enrollments** — manage every enrollment: update progress (dropdown 0-100%),
   toggle status (active/completed), toggle payment (pending/paid)
4. **Attendance** — mark daily attendance (present/absent) per enrollment,
   see attendance percentage

**Why:** The old admin page only showed inquiries. The centre owner needs to:
- Know who is enrolled in which course
- Track who has paid
- Mark daily attendance
- Update student progress

All of this in one place without switching between pages.

**Database design:**
```
Admin APIs:
  GET  /api/admin/students     → all users + enrollment counts (paginated)
  GET  /api/admin/enrollments  → all enrollments with student + course details
  PATCH /api/admin/enrollments → update progress / status / paymentStatus
  POST /api/admin/attendance   → mark attendance (upsert per enrollment+date)
  GET  /api/admin/attendance   → get attendance records + summary
```

**What to learn:**
- **MongoDB Aggregation Pipeline** (`$group`, `$sum`, `$cond`) is used to
  calculate enrollment counts per student and attendance percentages. This is
  faster than fetching all records and counting in JavaScript.
- **Upsert** (`{ upsert: true }`) in attendance means "create if not exists,
  update if it does." This prevents duplicate attendance records for the same
  day — the admin can safely click "Present" again and it just updates.
- Admin protection uses `getCurrentUser()` + role check in every route. This is
  checked server-side, not client-side — a client can't bypass it by modifying JavaScript.

**Files created/changed:**
- `src/app/api/admin/students/route.ts` (new)
- `src/app/api/admin/enrollments/route.ts` (new)
- `src/app/api/admin/attendance/route.ts` (new)
- `src/app/admin/page.tsx` (rewritten with 4 tabs)
- `src/lib/mongodb.ts` — added attendance indexes

---

### 3.5 — Attendance System

**What:** A basic but complete attendance tracking system:
- **Admin side:** Select date, see all active enrollments, mark Present/Absent.
  See attendance percentage per student.
- **Student side:** Dashboard shows attendance percentage badge per enrolled course.
  Color-coded: green (≥75%), yellow (≥50%), red (<50%).

**Database design:**
```
attendance collection:
{
  enrollmentId: ObjectId  → references enrollments._id
  date:         string    → "YYYY-MM-DD" (normalized)
  status:       string    → "present" | "absent"
  markedBy:     ObjectId  → admin who marked it
  createdAt:    Date
  updatedAt:    Date
}

Indexes:
  { enrollmentId: 1, date: 1 }  UNIQUE  → one record per enrollment per day
  { enrollmentId: 1 }                    → fast lookup for a student's records
```

**Why date is a string (not Date):**
MongoDB `Date` objects include time, which makes equality checks tricky across
timezones. Storing just `"2026-02-22"` as a string makes it timezone-safe and
human-readable in the database.

**What to learn:**
- **Aggregation with conditional sum**: `$sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }`
  counts only matching documents inside a group. This is a common pattern.
- The attendance API returns both individual records AND a summary. This saves
  the frontend from doing the math.

---

### 3.6 — Fee Tracking (Payment Status)

**What:** The `paymentStatus` field was already part of the enrollment model
from Step 1. This step completes the cycle:
- **Admin:** Toggle payment status (pending → paid or vice versa) in Enrollments tab
- **Student dashboard:** Shows payment summary card (X paid, Y pending)
- **Student enrolled courses:** Each course shows a "paid" or "pending" badge

**Why this is enough for now:** A full payment gateway (Razorpay, Stripe) is
overkill for a coaching centre where payments happen in cash or UPI. The admin
simply marks who has paid. When online payments are needed later, the
`paymentStatus` field and UI are already in place — only the payment API needs
to be added.

**What to learn:**
- Start with the simplest solution that works. A boolean toggle is better than
  a complex payment system that nobody uses. Build the foundation now, add
  complexity later.

---

### Architecture Summary — Phase 3

```
Collections:
  users          → { name, email, password, role, createdAt }
  enrollments    → { userId, courseId, progress, status, paymentStatus, enrolledAt }
  attendance     → { enrollmentId, date, status, markedBy }
  inquiries      → { name, email, phone, subject, class, message, status }

API Routes (new):
  POST /api/enroll              → student enrolls in course
  GET  /api/enroll              → student's enrollments + attendance
  GET  /api/profile             → student profile + stats
  PATCH /api/profile            → update name or change password
  GET  /api/admin/students      → all users (admin)
  GET  /api/admin/enrollments   → all enrollments (admin)
  PATCH /api/admin/enrollments  → update enrollment fields (admin)
  POST /api/admin/attendance    → mark attendance (admin)
  GET  /api/admin/attendance    → attendance records (admin/student)

Pages (new):
  /profile   → student profile management
  /feed      → real dashboard (rewritten)
  /admin     → 4-tab admin panel (rewritten)
```
