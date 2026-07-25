# CodeCanvas Labs

> Ultra-high-converting dark-mode SaaS landing page with an interactive visual pipeline simulator, pricing matrix, and waitlist onboarding flow.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050?logo=framer)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

- **Hero Section** — Live status pill (`⚡ v2.0 Live`), gradient headline, inline email form, trust matrix
- **Interactive Pipeline Simulator** — 3-tab canvas switching between Visual Graph, Raw JSON Stream, and Terminal Logs
- **Social Proof Marquee** — Infinite-scroll animated partner logos
- **Bento Feature Grid** — 3×2 glassmorphic card layout showcasing Edge Execution, AI Nodes, Zero-Trust Auth, Global CDN, Observability, and Pipeline Branching
- **Pricing Matrix** — Monthly/Annual toggle with Framer Motion animated price counter transitions and 20% discount badge
- **Waitlist Modal** — Animated form with dynamic queue position (`#3,842 in line`), referral code generation, and copy-to-clipboard
- **Mock API** — `POST /api/v1/waitlist` with email validation, duplicate detection, and referral code generation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4 + Custom Glassmorphic Utilities |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Testing | Vitest + React Testing Library |
| Data Store | JSON file (`/data/waitlist.json`) — Supabase/PostgreSQL migration-ready |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/sagorXO/CodeCanvasLabs.git
cd CodeCanvasLabs

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Production build (Vercel-optimized) |
| `npm run start` | Start production server |
| `npm run test` | Run Vitest unit tests |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run lint` | Run Next.js linter |

---

## Project Structure

```
├── data/
│   └── waitlist.json              # JSON data store for waitlist entries
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout, SEO metadata, Google Fonts
│   │   ├── page.tsx               # Landing page assembly
│   │   ├── globals.css            # Tailwind + glassmorphic utilities
│   │   └── api/v1/waitlist/
│   │       └── route.ts           # POST /api/v1/waitlist handler
│   ├── components/
│   │   ├── Navbar.tsx             # Glass sticky nav with anchor links
│   │   ├── HeroSection.tsx        # Status pill, headline, email form
│   │   ├── InteractiveCanvas.tsx  # 3-tab pipeline simulator
│   │   ├── SocialProofMarquee.tsx # Infinite partner logo scroll
│   │   ├── BentoGrid.tsx          # 3×2 feature card grid
│   │   ├── PricingMatrix.tsx      # Monthly/Annual pricing toggle
│   │   ├── WaitlistModal.tsx      # Waitlist form + success card
│   │   └── Footer.tsx             # Footer with system status
│   ├── lib/
│   │   ├── types.ts               # TypeScript interfaces
│   │   └── waitlist.ts            # Waitlist business logic
│   └── __tests__/
│       ├── waitlist-api.test.ts   # Waitlist validation & logic tests
│       └── pipeline-state.test.ts # Pipeline state schema tests
├── architecture/
│   └── landing_page_sop.md        # Architecture SOP & invariants
└── package.json
```

---

## API Reference

### `POST /api/v1/waitlist`

**Request:**
```json
{
  "email": "dev@company.com",
  "role": "Software Engineer",
  "use_case": "Workflow Automation"
}
```

**Response (201 Created):**
```json
{
  "status": 201,
  "success": true,
  "data": {
    "id": "usr_98a7f20c",
    "email": "dev@company.com",
    "waitlist_position": 3842,
    "referral_code": "CANVAS-3842",
    "created_at": "2026-07-25T13:53:42Z"
  }
}
```

---

## License

MIT © CodeCanvas Labs
