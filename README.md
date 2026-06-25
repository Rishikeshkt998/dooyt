# Dooyt ERP — Marketing Landing Page

A full-stack marketing site for **Dooyt**, a customizable ERP platform. Built with **Next.js 16 (App Router)** using a unified codebase where the frontend and backend API co-exist in the same project.

---

## 🏗️ Backend Stack

| Layer | Choice |
|---|---|
| Runtime | **Next.js 16 Route Handlers** (App Router) |
| Language | **TypeScript** |
| Data layer | **In-memory store** (`src/lib/store.ts`) seeded from `src/data/seed.json` |
| Auth | API-key header (`x-api-key`) validated in `src/lib/auth.ts` |
| Validation | Custom validators in `src/lib/validators.ts` |

There is **no external database**. All data (modules, industries, plans, testimonials, FAQs, demo requests) lives in a singleton in-memory store that is seeded once at server start from `seed.json`. This makes the project fully self-contained with zero external dependencies.

### API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET` | `/api/modules` | Public | List all ERP modules |
| `GET` | `/api/industries` | Public | List all supported industries |
| `GET` | `/api/plans` | Public | List pricing plans (`?billing=monthly\|annual`) |
| `GET` | `/api/testimonials` | Public | List testimonials |
| `GET` | `/api/faqs` | Public | List FAQs |
| `POST` | `/api/demo-requests` | Public | Submit a demo request |
| `GET` | `/api/admin/demo-requests` | 🔒 API key | List demo requests (paginated) |
| `PATCH` | `/api/admin/demo-requests/:id` | 🔒 API key | Update demo request status |

**Status codes:** `201` Created · `200` OK · `401` Bad/missing key · `404` Unknown ID · `422`/`400` Validation error

**Admin API key** — set via `ADMIN_API_KEY` environment variable (see [Environment Setup](#-environment-setup) below).

---

## 🚀 Running the Project

### Prerequisites

- **Node.js** `>= 18`
- **npm** (comes with Node)

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

This starts **both** the frontend and the backend API simultaneously on:

```
http://localhost:3000
```

> The frontend and backend are part of the same Next.js process — there is no separate server to start.

### Other commands

```bash
# Build for production
npm run build

# Start production server (after build)
npm start

# Run ESLint
npm run lint
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                  # ← Backend: Route Handlers
│   │   ├── modules/
│   │   ├── industries/
│   │   ├── plans/
│   │   ├── testimonials/
│   │   ├── faqs/
│   │   ├── demo-requests/
│   │   └── admin/
│   ├── layout.tsx
│   └── page.tsx
├── components/               # ← Frontend: React components
│   ├── forms/
│   ├── layout/
│   └── sections/
├── data/
│   └── seed.json             # ← Seed data for the in-memory store
├── hooks/
│   └── useFetch.ts
├── lib/
│   ├── store.ts              # ← In-memory data store
│   ├── auth.ts               # ← API key validation
│   ├── validators.ts
│   └── constants.ts
├── types/                    # ← Shared TypeScript types
└── utils/                    # ← Shared utilities & UI config
```

---

## 🔑 Environment Setup

Copy the example file and fill in your values — **never commit real secrets**:

```bash
cp .env.example .env.local
```

`.env.example` (safe to commit, no real values):

```env
# Admin API key for protected routes (choose any strong random string)
ADMIN_API_KEY=your-secret-key-here
```

The server reads `process.env.ADMIN_API_KEY` in `src/lib/auth.ts`. Set a strong random value before deploying.

---

## 🧪 Testing the API (curl examples)

```bash
# List modules
curl http://localhost:3000/api/modules

# List plans (annual billing)
curl "http://localhost:3000/api/plans?billing=annual"

# Submit a demo request
curl -X POST http://localhost:3000/api/demo-requests \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Jane Doe","email":"jane@example.com"}'

# List demo requests (admin, protected)
curl http://localhost:3000/api/admin/demo-requests \
  -H "x-api-key: $ADMIN_API_KEY"
```
