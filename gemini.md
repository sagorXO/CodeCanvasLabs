# Project Constitution & Data Schemas (`gemini.md`)

## 1. Product Requirements Summary
- **Project**: Saied Sagar — Senior AI Systems Architect & Full-Stack Studio (Portfolio Showcase)
- **Framework**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, Three.js (3D WebGL), Lucide Icons
- **Target Audience**: Enterprise Clients, SaaS Founders, Tech Executives seeking $10,000+ custom software engineering
- **Key Features**:
  - Prominent 3D WebGL Hero Canvas with interactive GLSL Simplex noise mesh & particle field
  - Hero section with live availability pill, high-impact typography, dual CTAs, trust matrix
  - Interactive Project Scope & Cost Estimator ($8,000 – $24,000+ budget range calculator)
  - Interactive Case Studies Showcase with system architecture blueprints, code snippets, & performance metrics
  - Live Pipeline Simulator (Visual Graph, Raw JSON Stream, Live Terminal Logs)
  - Real-time Edge Latency Diagnostics Benchmark across global worker clusters
  - Interactive Tech Stack & System Capability Matrix
  - High-converting Multi-step Client Discovery & Proposal Intake Modal

---

## 2. Core Data Schemas (JSON Input/Output)

### 2.1 Client Consultation Inquiry Payload (`/api/v1/waitlist` & `/api/v1/consultation`)
```json
{
  "request": {
    "name": "Alex Vance",
    "email": "alex@enterprise.com",
    "budget_tier": "$10,000 - $25,000",
    "project_type": "AI Workflow Automation",
    "timeline": "3-6 Weeks"
  },
  "response": {
    "status": 201,
    "success": true,
    "data": {
      "id": "req_98a7f20c",
      "email": "alex@enterprise.com",
      "booking_reference": "SAGAR-PROJECT-3842",
      "created_at": "2026-07-26T23:00:00Z"
    }
  }
}
```

---

## 3. Brand & Styling Tokens

- **Studio Name**: Saied Sagar Studio
- **Backdrop**: Dark Obsidian (`#060507`)
- **Card / Surface Background**: Glassmorphic Deep Slate (`#11131F` with `backdrop-blur-xl` & `border-cyan-500/30`)
- **Primary Accent / Glow**: Electric Cyan (`#06B6D4`) & Hyper Blue (`#3B82F6`)
- **Typography Colors**:
  - Headings: Crisp Pure White (`#F9FAFB`)
  - Subtext & Muted Labels: Cool Slate Gray (`#9CA3AF`)
  - Accent Text: Cyan Gradient (`bg-gradient-to-r from-blue-400 to-cyan-400`)

---

## 4. Operational Maintenance Log

- **2026-07-26 23:07**: $10,000 Portfolio & Studio Showcase Redesign initiated with 3D Hero design integration.
