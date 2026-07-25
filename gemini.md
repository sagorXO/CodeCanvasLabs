# Project Constitution & Data Schemas (`gemini.md`)

## 1. Product Requirements Summary
- **Project**: CodeCanvas Labs — Ultra-High-Converting Modern Dark-Mode SaaS Landing Page
- **Framework**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Target Audience**: Developers, Tech Leads, Engineering Teams, SaaS Builders
- **Key Features**:
  - Hero section with live status pill, high-impact typography, inline waitlist trigger, trust matrix
  - Interactive Canvas Pipeline Simulator (Visual Graph, Raw JSON Stream, Live Terminal Logs)
  - Infinite Social Proof Marquee (Animated tech partner logos)
  - 3x2 Bento Grid featuring product capability highlights with micro-interactions
  - Interactive Pricing Matrix with Monthly/Annual billing toggle & Framer Motion counter
  - Waitlist Modal Onboarding Flow with position feedback & simulated referral generation
  - Mock API Endpoint `/api/v1/waitlist` with rate-limiting, validation, and `/data/waitlist.json` persistence readiness

---

## 2. Core Data Schemas (JSON Input/Output)

### 2.1 Waitlist Payload (`/api/v1/waitlist`)
```json
{
  "request": {
    "email": "dev@company.com",
    "role": "Software Engineer",
    "use_case": "Workflow Automation"
  },
  "response": {
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
}
```

### 2.2 Node Pipeline Interactive State Schema
```json
{
  "active_tab": "visual",
  "nodes": [
    { "id": "n1", "type": "trigger", "label": "Webhook Ingest", "status": "200 OK" },
    { "id": "n2", "type": "ai_transform", "label": "Gemini Engine Node", "status": "processing" },
    { "id": "n3", "type": "output", "label": "HTTP Response", "status": "ready" }
  ],
  "metrics": { "execution_time_ms": 11, "uptime_percentage": 99.99 }
}
```

---

## 3. Brand & Styling Tokens

- **Backdrop**: Dark Obsidian (`#090A0F`)
- **Card / Surface Background**: Glassmorphic Deep Slate (`#11131F` with `backdrop-blur-md` & `border-white/10`)
- **Primary Glow / Accent**: Electric Blue (`#3B82F6`) & Cyan Neon (`#06B6D4`)
- **Typography Colors**:
  - Headings: Crisp Pure White (`#F9FAFB`)
  - Subtext & Muted Labels: Cool Slate Gray (`#9CA3AF`)
  - Accent Text: Cyan Gradient (`bg-gradient-to-r from-blue-400 to-cyan-400`)
- **Borders**: Micro-line borders (`border-slate-800/80` or `border-cyan-500/20` on hover)

---

## 4. Operational Runbook & Maintenance Log

- **2026-07-25 13:56**: Protocol 0 completed. Data schemas finalized.
- **2026-07-25 13:57**: Phase 1 Blueprint & Competitor Benchmarking initiated.
