# Standard Operating Procedure (SOP) — CodeCanvas Labs Landing Page Architecture

## Goal & Mission
Deliver a high-converting, sub-second loading dark-mode landing page with interactive pipeline simulation and functional waitlist lead capture.

## Layer 1: Invariants & Business Logic

### 1. Waitlist Lead Ingest Logic (`/api/v1/waitlist`)
- **Input Parameters**: `email` (string, valid email format), `role` (string), `use_case` (string).
- **Validation**:
  - Email must match pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - Non-null `role` and `use_case`.
- **Response Format**:
  - `status`: 201 Created
  - `success`: true
  - `data`: `{ id, email, waitlist_position, referral_code, created_at }`
- **Error States**:
  - `400 Bad Request`: Email invalid or missing fields.
  - `429 Too Many Requests`: Rate limit exceeded (>5 requests / minute per IP/session).

### 2. Interactive Pipeline Simulator Invariants
- **Tab State Switching**: `visual` | `json` | `logs`.
- **Node States**:
  - `n1` (Webhook Ingest): `200 OK` (Green badge)
  - `n2` (Gemini Engine Node): `processing` (Cyan animated pulse)
  - `n3` (HTTP Response): `ready` (Blue glowing output)
- **Metrics Invariant**: `execution_time_ms: 11`, `uptime_percentage: 99.99`.

### 3. Pricing Matrix Invariants
- **Billing Frequencies**: `monthly` | `annual`.
- **Discount Token**: Annual billing applies a 20% discount badge.
- **Tiers**:
  - Developer: $0/mo (Free Forever)
  - Pro Engine: $29/mo (Monthly) or $23/mo (Annual)
  - Enterprise: Custom / $99/mo (Annual $79/mo)

---

## Layer 2: Routing & State Invariants
- Client components must maintain clean local component state or lightweight state hooks.
- Server API routes encapsulate data persistence to `/data/waitlist.json`.

---

## Layer 3: Component Atomicity Invariants
- All components must remain focused (<400 lines of code).
- All visual elements must support accessible aria attributes and keyboard navigation.
