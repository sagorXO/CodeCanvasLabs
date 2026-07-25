# Task Plan / RFC (`task_plan.md`)

## 🎯 Milestones & Status

- [x] Protocol 0: Project Memory Initialization & Verification
- [x] Phase 1: B - Blueprint (Deep Research & Competitor Benchmarks)
- [ ] Phase 2: L & S - Link & Stitch Auto-Design (UI/UX Flow & Component Mockups)
- [ ] Phase 3: A - Architect (3-Layer Build & TDD Execution)
  - [ ] Layer 1: Architecture SOPs (`architecture/`)
  - [ ] Layer 2: Next.js App Router Structure & State Management (`/src/app`, `/src/lib`)
  - [ ] Layer 3: Modular Components & API Routes (`/src/components`, `/src/app/api`)
- [ ] Phase 4: S - Stylize (Refinement, Framer Motion & AVFL Visual QA)
- [ ] Phase 5: T - Trigger (Audit, Vitest TDD Verification & Vercel Build Verification)

---

## 🏗️ Technical Architecture & Component Map

```
/CodeCanvasLabs
├── /data
│   └── waitlist.json                 # JSON Data Store for waitlist registrations
├── /src
│   ├── /app
│   │   ├── layout.tsx                # Root Layout (Dark Theme, Font Inter, Metadata, SEO)
│   │   ├── page.tsx                  # Main Landing Page Assembly
│   │   ├── globals.css               # Tailwind CSS & Custom Glassmorphic Utilities
│   │   └── /api
│   │       └── /v1
│   │           └── /waitlist
│   │               └── route.ts      # POST /api/v1/waitlist handler
│   ├── /components
│   │   ├── Navbar.tsx                # Glass sticky navbar with logo & CTA
│   │   ├── HeroSection.tsx           # Status badge, headline, inline email form & trust logos
│   │   ├── InteractiveCanvas.tsx     # 3-Tab visual simulator (Graph, Raw JSON, Live Logs)
│   │   ├── SocialProofMarquee.tsx    # Infinite scrolling partner logos marquee
│   │   ├── BentoGrid.tsx             # 3x2 feature grid with glass cards & micro-animations
│   │   ├── PricingMatrix.tsx         # Monthly/Annual billing toggle with animated numbers
│   │   ├── WaitlistModal.tsx         # Animated modal with queue position & referral code
│   │   ├── Footer.tsx                # Footer navigation, branding & copyright
│   │   └── ClickToComponent.tsx      # Onlook visual bridge helper in dev mode
│   ├── /lib
│   │   ├── waitlist.ts               # Waitlist state handler & JSON store persistence helper
│   │   └── types.ts                  # TypeScript interfaces for API & Pipeline state
│   └── /__tests__
│       ├── waitlist-api.test.ts      # Unit tests for waitlist API logic & validation
│       └── pipeline-state.test.ts    # Unit tests for visual pipeline node states
├── architecture
│   └── landing_page_sop.md           # SOP defining architecture invariants & edge cases
├── gemini.md                         # Constitution, Schemas & Brand Tokens
├── findings.md                       # Competitor Benchmarks & Design Patterns
├── progress.md                       # Changelog & Verification Logs
├── package.json                      # Next.js 14, Tailwind, Framer Motion, Vitest
└── tsconfig.json
```

---

## 🔒 Verification Plan

### Automated Testing (TDD)
- **Waitlist API Verification**: Test email validation, duplicate entry handling, referral code generation, and rate limiting logic.
- **Pipeline State Unit Tests**: Verify node state transitions (`trigger` -> `processing` -> `ready`) and execution time calculations.

### Manual & Visual Verification (AVFL)
- Execute `browser-qa` / `playwright` subagent to test:
  1. Sticky navigation scroll.
  2. Tab switches on Interactive Canvas (Visual Graph, Raw JSON Stream, Live Terminal Logs).
  3. Pricing Monthly/Annual toggle state changes.
  4. Waitlist Modal launch, form input, validation error states, and success response with dynamic queue number (`#3,842`).
  5. Responsive layout across Desktop (1440px), Tablet (768px), and Mobile (375px).
