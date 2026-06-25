# Dooyt ERP — Full-Stack Take-Home Assessment

A frontend-focused full-stack landing page build for the **Dooyt ERP Platform**, powered by a lightweight REST API built with Next.js App Router.

## Stack & Decisions

- **Frontend**: Next.js 15 (App Router, Client & Server Components)
- **Styling**: Tailwind CSS v4 (rich dark mode, modern typography, glassmorphism, responsive grids, custom animations)
- **Backend**: Next.js Route Handlers (`/api/...`)
- **Data & Database**: In-memory store (pre-seeded with `seed.json` on startup)
- **Language**: TypeScript

We selected **Next.js Route Handlers** for the backend API. This allows for a unified, modern JS/TS full-stack architecture, avoiding separate process management, keeping setup simple, and utilizing unified routing schemas.

---

## Features Implemented

### Part 1 — Frontend (Next.js + Tailwind)
- **Responsive Layout**: Designed mobile-first, scales seamlessly to tablet and desktop resolutions.
- **Interactive Navigation**: Sticky header with backdrop blur and responsive mobile hamburger drawer.
- **Dynamic Content Fetching**: Modules, Industries, Pricing, Testimonials, and FAQs are all fetched from the backend API.
- **Interactive Price Toggle**: Toggling between Monthly and Annual billing recomputes prices (applying a 15% discount computed server-side) and showcases the "Save 15%" badge.
- **FAQ Accordion**: Smoothly expands and collapses questions.
- **Testimonial Slider**: Sliding carousel of customer quotes with manual dot pagination, rating stars, and automatic rotation.
- **Demo Request Form**: Fully validated (Full Name + email required, valid email format), submits asynchronously with visual loading spinner and clear success/error toast alerts.
- **Polished States**: Includes visual loading skeleton cards, error boundaries, empty states, and custom hover states.

### Part 2 — Backend API Contract
All specified API routes are built under `/api`:
- `GET /api/modules` - supporting `?search=` and `?category=` queries
- `GET /api/industries` - returning the pre-seeded sector data
- `GET /api/plans` - supporting `?billing=monthly|annual` (server-side discount calculation)
- `GET /api/testimonials` - paginated using the required envelope: `{ data: [...], page: 1, limit: 10, total: 6 }`
- `GET /api/faqs` - returning all accordion questions
- `POST /api/demo-requests` - validates email structure, checks if selection plan exists (returning `422` for unknown plans), and inserts request returning status `201`
- **Protected Routes** (Requires header `X-Api-Key: dooyt-demo-key-2026`):
  - `POST`, `PUT`, `DELETE` to `/api/{modules|plans|testimonials|faqs}/[id]`
  - `GET /api/admin/demo-requests` (paginated list of lead submissions)
  - `PATCH /api/admin/demo-requests/[id]` (updates lead status: `new` / `contacted` / `closed`)

---

## How to Run locally

### Prerequisites
- Node.js (v18.x or later recommended)
- npm (installed with Node)

### Installation
1. Navigate to the project directory:
   ```bash
   cd dooyt
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Development Server
Start the unified Next.js frontend & backend dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the landing page.

### Production Build
Verify that the build compiles correctly without TypeScript or lint issues:
```bash
npm run build
```
Start the production server:
```bash
npm run start
```
