# Findings & Research Book (`findings.md`)

## 1. Competitor Benchmarking & Human Design References (15 Dev-Tool Champions)

To avoid generic "AI slop" templates and deliver a bespoke, production-grade interface, we analyzed **15 industry-leading developer-focused dark-mode landing pages**:

| # | Benchmark | Key Visual & UX Patterns | Takeaways for CodeCanvas Labs |
|---|---|---|---|
| 1 | **Linear** | Obsidian dark backdrop, ultra-crisp micro-typography, keyboard shortcut chips (`⌘K`), subtle 1px border glows. | Use high-contrast white text (`#F9FAFB`) over `#090A0F` with refined micro-borders (`border-white/10`). |
| 2 | **Vercel** | Dynamic gradient text (`from-blue-400 to-cyan-400`), live terminal preview boxes, glowing status pills. | Implement live status badge ("⚡ CodeCanvas v2.0 Live") and terminal output stream tab. |
| 3 | **Supabase** | Neon accent glows on obsidian, interactive SQL/API code switcher, clear CTA hierarchy. | Use Cyan (`#06B6D4`) & Blue (`#3B82F6`) radial background glows behind key visual components. |
| 4 | **Resend** | Ultra-clean layout, interactive live payload demo box, dark slate cards with backdrop blur. | Build an interactive visual canvas showing real-time execution metrics (11ms execution time). |
| 5 | **Raycast** | Smooth spring animations (Framer Motion), interactive component state previews, floating pill CTA. | Apply Framer Motion spring physics on modal popups and tab switches. |
| 6 | **Railway** | Node-based visual pipeline graph with animated active pulse connection lines. | Build an interactive visual graph node simulator with animated data flow lines. |
| 7 | **Clerk** | Glassmorphic dark cards (`backdrop-blur-md bg-slate-900/60`), glowing borders on hover. | Wrap Bento grid items in glassmorphic container cards with hover radial highlight effects. |
| 8 | **Dub.co** | Real-time animated number counters for analytics metrics, intuitive modal triggers. | Implement animated number counters for waitlist positions and pricing toggles. |
| 9 | **Neon.tech** | High-contrast neon glows, instant branching tabs, developer trust badge matrix. | Add infinite scrolling social proof marquee with tech partner logos (Vercel, Supabase, Next.js, etc.). |
| 10 | **Convex** | Live state stream logs showing JSON input -> execution -> JSON response. | Build a 3-tab canvas (Visual Graph, Raw JSON Stream, Live Terminal Logs). |
| 11 | **PlanetScale** | Schema migration workflow card, interactive toggle controls. | Use clean segmented pill switches for Monthly vs. Annual pricing matrix. |
| 12 | **Stripe Dev** | Tabbed interactive API snippet viewers with copy-to-clipboard feedback. | Include one-click copy button for referral codes and API schemas. |
| 13 | **Turbopack** | Sub-second speed benchmark visualizers, ultra-dense feature matrix. | 3x2 Bento Grid detailing Edge Execution, AI Nodes, Zero-Trust Auth, etc. |
| 14 | **Raycast Web** | Floating glass navbar with backdrop-filter, smooth scroll anchor navigation. | Sticky backdrop-blur navigation bar with quick anchor links and primary "Waitlist" CTA. |
| 15 | **Figma Dev** | Dynamic cursor/node hover states, interactive canvas controls. | Interactive canvas node state triggers with visual feedback. |

---

## 2. Visual & Structural Design Conventions

### 2.1 Color Palette & Light Tokens
- **Background**: `#090A0F` (Obsidian Night)
- **Surface Cards**: `#11131F` / `rgba(17, 19, 31, 0.7)` with `backdrop-blur-lg`
- **Accent 1**: `#3B82F6` (Electric Blue)
- **Accent 2**: `#06B6D4` (Neon Cyan)
- **Status Green**: `#10B981` (Emerald Success)
- **Border Default**: `rgba(255, 255, 255, 0.08)`
- **Border Hover**: `rgba(6, 182, 212, 0.3)` with `shadow-cyan-500/10`

### 2.2 Micro-Interactions & Physics
- **Hover Transitions**: `transition-all duration-300 ease-out`
- **Framer Motion Variants**: Spring physics (`stiffness: 300, damping: 25`) for modal entries, tab switches, and pricing toggle switches.
- **Scroll Behavior**: Smooth scroll to sections via `scroll-smooth`.

---

## 3. Technical Requirements & API Specs

- **Route**: POST `/api/v1/waitlist`
- **Rate-Limiting**: Standard client-side & API memory throttle (prevent duplicate spam submissions).
- **Validation**: Strict email format check using standard regex, non-empty role and use_case fields.
- **Storage**: `/data/waitlist.json` initial file store with fallback mock generator.
