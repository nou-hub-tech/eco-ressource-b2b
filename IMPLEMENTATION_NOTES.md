# Eco-Ressource B2B — Frontend (eco module)

This module is the Angular frontend for the eco circular-economy
features (Reservation, Order, ReservationSlot). All three entities now
talk to the Spring Boot backend at `/api/...` — no more in-memory mocks.

---

## Backend connection — wired in

| Concern | Where it lives | Status |
|---|---|---|
| API base URL | `src/environments/environment.ts` → `apiUrl: 'http://localhost:8080/api'` | ✓ pre-existing |
| JWT auto-attach | `src/app/core/interceptors/jwt.interceptor.ts` registered in `app-module.ts` | ✓ pre-existing |
| HttpClientModule | `src/app/app-module.ts` | ✓ pre-existing |
| Auth (login/register) | `src/app/core/services/auth.service.ts` | ✓ pre-existing |
| **Reservation API** | `pages/moduleReservation/shared/api/reservation-api.service.ts` | ✓ NEW |
| **EcoOrder API** | `pages/moduleReservation/shared/api/eco-order-api.service.ts` | ✓ NEW |
| **Slot API** | `pages/moduleReservation/shared/api/reservation-slot-api.service.ts` | ✓ NEW |
| **SlotStore** is backend-backed with optimistic updates | `pages/moduleReservation/reservation-slot/slot.store.ts` | ✓ rewired |
| **Reservation list** loads + saves + cancels via API | `reservation-list.ts` | ✓ rewired |
| **Reservation form** posts via API | `reservation-form.ts` | ✓ rewired |
| **Order list** loads + creates + advances + edits + cancels via API | `order-list.ts` | ✓ rewired |
| **Slot list / form** mutate through `SlotStore` (backend-backed) | unchanged components | ✓ inherits |

---

## How data flows now

**Reservation list** (`/enterprise/my-reservations`):
- `ngOnInit` → `api.list()` → `GET /api/reservations` → maps each row through `fromBackend`
- "+ New reservation" button → opens modal → `save()` → `POST /api/reservations`
- Edit button → opens modal → `save()` → `PUT /api/reservations/{id}`
- Cancel button → opens reason modal → `confirmDelete()` → `POST /api/reservations/{id}/cancel`

**Reservation form** (`/enterprise/new-reservation`):
- 4-step wizard, last step "Confirm" → `confirm()` → `POST /api/reservations` → navigates back to list
- Backend errors surface in a banner inside `wizard-panel`

**Order list** (`/enterprise/orders`):
- `ngOnInit` → `api.list()` → `GET /api/eco-orders`
- Configurator → "Confirm order" → `placeOrder()` → `POST /api/eco-orders`
- Per-row "→ NEXT" button → `advanceStatus()` → `POST /api/eco-orders/{id}/advance`
- Edit modal → `saveEdit()` → `PUT /api/eco-orders/{id}`
- Delete with reason → `confirmDelete()` → `POST /api/eco-orders/{id}/cancel`
- PDF generation stays client-side (jsPDF)

**Slot list / form / calendar** (`/enterprise/slot-management`, `/new-slot`, `/edit-slot/:id`, `/slots`):
- All three pages share `SlotStore` which is now backend-backed
- `SlotStore.seedIfEmpty()` triggers `GET /api/reservation-slots` once
- `store.create(slot)` does optimistic insert → `POST /api/reservation-slots` → replaces optimistic row with server response
- `store.update(id, patch)` → `PUT /api/reservation-slots/{id}`
- `store.softDelete(id, reason)` → `POST /api/reservation-slots/{id}/cancel`
- `store.bookSlot(id, company)` → `POST /api/reservation-slots/{id}/book` (used by drag-&-drop)

---

## Resilience

Every API call has `error:` handlers:
- **Optimistic mutations** roll back or refresh on error
- **Reads** show a banner ("Could not reach the server") rather than crashing
- **401 Unauthorized** is detected and surfaced as "Please log in"
- The status-string mismatch (backend lowercase, frontend uppercase) is handled at the boundary in each `fromBackend` / `toBackend` helper

---

## To run

```bash
# Terminal 1 — backend
cd eco-ressource-backend
mvn spring-boot:run                    # API on :8080

# Terminal 2 — frontend
cd eco-ressource-b2b
npm install                            # first time only
npm start                              # dev server on :4200
```

Then in the browser:
1. Open <http://localhost:4200>
2. Log in with `slim@entreprise.tn` / `demo123` (or `admin@marketplace.com` / `admin123`)
3. Navigate to **Reservations**, **Orders**, **Slots Calendar**, or **Slot Inventory** in the sidebar

DevTools → Network shows every `/api/...` call carrying
`Authorization: Bearer …` and returning JSON. The seeded demo data
(11 slots, 4 orders, 2 reservations) appears immediately.

---

## Visual coherence with the parent shell

The eco module shares the parent shell's design language:

- **Theme tokens**: every color comes from the active shell theme
  (`var(--bg)`, `var(--card)`, `var(--text)`, `var(--primary)`, …)
  declared on `body.theme-enterprise`/`theme-admin`/`theme-transporter`.
- **Typography**: same `Syne` (display) / `Space Grotesk` (sans) /
  `DM Mono` (mono) as the rest of the app.
- **Eco accents** are layered on top — forest greens for
  sustainability, solar amber for solar slots, traffic-light demand
  colours, leaf SVG watermarks, pulsing AI dot, animated CO₂ tree.
- Theme-aware overrides under `body.theme-admin .eco-page` and
  `body.theme-transporter .eco-page` ensure the eco accents read
  correctly on dark surfaces too.

Files: `src/app/pages/moduleReservation/shared/eco-theme.css` (the
shared theme bridge) plus per-page CSS files that consume those tokens.

---

## Required features — checklist

| Entity | CRUD | ≥2 advanced features | AI integration |
|---|---|---|---|
| Reservation | ✓ wizard create, card-grid read, modal edit, soft-delete-with-reason — **all wired to backend** | ✓ Real-time CO₂ system + Green leaderboard with gold/silver/bronze | ✓ EcoReservationAI sidebar with confidence scores |
| Order | ✓ configurator create, table read, status-workflow + edit modal, soft-delete-with-reason — **all wired to backend** | ✓ Real jsPDF eco-invoice + Circular bundle builder | ✓ GreenOrderAI alternative callout + transport warnings |
| ReservationSlot | ✓ slot designer create, heatmap+table read, edit form, soft-delete-with-reason — **all wired to backend via SlotStore** | ✓ AI heatmap + Solar discount system + Drag & drop | ✓ EcoSlotAI per-row demand% + cancel% + share tip |

WOW features shipped: animated CO₂ tree, AI sidebar, drag-&-drop calendar, jsPDF invoice.
