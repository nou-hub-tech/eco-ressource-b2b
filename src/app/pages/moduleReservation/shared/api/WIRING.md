# Wiring the Eco Module to the Backend

## TL;DR — what you need to know

1. **API base URL** is already configured: `src/environments/environment.ts` →
   `apiUrl: 'http://localhost:8080/api'`. For prod, edit
   `environment.prod.ts`.

2. **JWT is auto-attached** to every request by `core/interceptors/jwt.interceptor.ts`
   — already registered in `app-module.ts`. As long as the user logged in
   via `AuthService.login()`, every HTTP call carries
   `Authorization: Bearer <token>`.

3. **CORS is open** on the backend for `http://localhost:4200`.

4. **Three new services** ship in
   `pages/moduleReservation/shared/api/`:
   - `ReservationApiService`        → `/api/reservations`
   - `EcoOrderApiService`           → `/api/eco-orders`
   - `ReservationSlotApiService`    → `/api/reservation-slots`

   Their TypeScript types match the backend DTOs field-for-field, so no
   adapter layer is needed.

5. **You log in once before any of this works.** Hit the login screen with
   `slim@entreprise.tn` / `demo123` (or `admin@marketplace.com` /
   `admin123`). The interceptor takes over from there.

---

## Option A — Quick swap (mocks → backend) inside an existing component

Take `reservation-list.ts`. Today it builds an in-memory array. To make it
talk to the backend, change just three things:

```ts
// 1. Inject the API service in the constructor
constructor(
  public ai: AiSuggestionsService,
  private api: ReservationApiService,        // ← new
) {}

// 2. Load on init instead of seeding hardcoded data
ngOnInit(): void {
  this.api.list().subscribe(rows => {
    this.reservations = rows.map(r => ({
      // map BackendReservation → your local Reservation interface
      id: r.id,
      company: r.companyName,
      machine: r.machine ?? r.item,
      date: r.fromDate,
      hours: r.hours ?? 1,
      startHour: r.startHour ?? 9,
      status: r.status.toUpperCase() as any,
      solar: r.solar ?? false,
      ai: this.ai.analyzeReservation({
        machine: r.machine ?? r.item,
        date: r.fromDate,
        startHour: r.startHour ?? 9,
        hours: r.hours ?? 1,
      }),
      deleted: r.deleted ?? false,
      cancelReason: r.cancelReason ?? undefined,
    }));
    this.refreshInsights();
  });
}

// 3. Wire mutations to the API instead of mutating the array
softDelete(r: Reservation): void {
  this.pendingDelete = r;
  this.deleteReason = '';
  this.deleteModal = true;
}

confirmDelete(): void {
  if (!this.pendingDelete) return;
  const r = this.pendingDelete;
  this.api.cancel(r.id, this.deleteReason || 'No reason provided')
    .subscribe(updated => {
      r.status = 'CANCELLED';
      r.deleted = true;
      r.cancelReason = updated.cancelReason ?? this.deleteReason;
      this.deleteModal = false;
      this.pendingDelete = null;
      this.refreshInsights();
    });
}

save(): void {
  const payload: ReservationCreateRequest = {
    typeLabel: 'Machine slot',
    item: this.form.machine,
    companyName: this.form.company,
    fromDate: this.form.date,
    toDate: this.form.date,
    price: 0,
    status: this.form.status.toLowerCase() as any,
    machine: this.form.machine,
    hours: this.form.hours,
    startHour: this.form.startHour,
    solar: this.form.solar,
    co2Saved: this.co2Saved(this.form),
  };
  const op$ = this.editMode
    ? this.api.update(this.form.id, payload)
    : this.api.create(payload);
  op$.subscribe(saved => {
    // refresh list, close modal
    this.ngOnInit();
    this.showModal = false;
  });
}
```

The same pattern applies to the order page (use `EcoOrderApiService`) and
the slot pages (use `ReservationSlotApiService`).

---

## Option B — Background sync (recommended for the slot store)

`SlotStore` already exposes a signal-based API
(`all()`, `create()`, `update()`, `softDelete()`). Wrap it so it
syncs with the backend on every mutation, but keeps the synchronous
signal API the components rely on:

```ts
// shared/reservation-slot/slot.store.ts
@Injectable({ providedIn: 'root' })
export class SlotStore {
  private _slots = signal<ReservationSlot[]>([]);

  constructor(private api: ReservationSlotApiService) {
    this.refresh();
  }

  refresh(): void {
    this.api.list().subscribe(rows => {
      this._slots.set(rows.map(this.fromBackend));
    });
  }

  create(slot: Omit<ReservationSlot, 'id'>): ReservationSlot {
    // optimistic update
    const optimistic: ReservationSlot = { ...slot, id: -Date.now() };
    this._slots.update(list => [optimistic, ...list]);
    // server-truth replace
    this.api.create(this.toBackend(slot)).subscribe(saved => {
      this._slots.update(list => list.map(
        s => s.id === optimistic.id ? this.fromBackend(saved) : s
      ));
    });
    return optimistic;
  }

  softDelete(id: number, reason: string): void {
    this._slots.update(list =>
      list.map(s => s.id === id ? { ...s, deleted: true, cancelReason: reason } : s)
    );
    this.api.cancel(id, reason).subscribe();
  }

  // ... etc.

  private fromBackend = (s: BackendReservationSlot): ReservationSlot => ({
    id: s.id,
    machine: s.machine,
    date: s.date,
    startHour: s.startHour,
    endHour: s.endHour,
    status: s.status.toUpperCase() as SlotStatus,
    solar: s.solar,
    discountPct: s.discountPct,
    owner: s.owner,
    reservedBy: s.reservedBy ?? undefined,
    deleted: s.deleted ?? false,
  });

  private toBackend(s: Omit<ReservationSlot, 'id'>): SlotRequest {
    return {
      machine: s.machine,
      date: s.date,
      startHour: s.startHour,
      endHour: s.endHour,
      status: s.status.toLowerCase() as BackendSlotStatus,
      solar: s.solar,
      discountPct: s.discountPct,
      owner: s.owner,
      reservedBy: s.reservedBy,
    };
  }
}
```

The components don't change — they keep reading `store.all()` and
calling `store.create()` — but every call now hits the backend.

---

## Verifying it works

1. **Boot the backend:** `mvn spring-boot:run` (or run from IntelliJ).
   API on `:8080`.

2. **Boot the frontend:** `npm start` (or `ng serve`) in the
   `eco-ressource-b2b/` folder. Dev server on `:4200`.

3. **Open the login page** (auto-shown if not authenticated). Use one
   of the seeded accounts:
   - `admin@marketplace.com` / `admin123`
   - `slim@entreprise.tn` / `demo123`

4. **Open the eco module** via the sidebar. The first time, the backend
   seeds 11 slots, 4 orders, and 2 reservations — you should see them
   appear once the API services are wired.

5. **Inspect requests in DevTools → Network**. Every `/api/...` call
   should carry `Authorization: Bearer ...` and return JSON. If you see
   401, the token isn't being sent — check that `JwtInterceptor` is
   still registered in `app-module.ts`.

---

## Common gotchas

| Symptom | Likely cause | Fix |
|---|---|---|
| `CORS error` in the browser console | Backend not running, or running on a different port | Check `application.properties` (`server.port=8080`) and that it matches `environment.apiUrl` |
| `401 Unauthorized` on every call | User not logged in, or token expired | Re-login. The JWT lifetime is 24 h (`app.jwt.expiration=86400000`) |
| `400 Bad Request: Enterprise profile required` | Logged in as admin without `enterpriseId` in body | Either send `enterpriseId` in the request, or log in as the enterprise user |
| Backend response field comes back `null` for `solar`, `co2Saved`, etc. | Existing reservation rows predate the migration | Fresh DB, or run `UPDATE reservations SET solar = false WHERE solar IS NULL` |
| Status string mismatch (`'CONFIRMED'` vs `'confirmed'`) | Backend uses lowercase enums; frontend uses uppercase | Convert at the boundary: `.toUpperCase()` when reading, `.toLowerCase()` when writing |

The status case mismatch is the only conversion you'll do regularly —
all other fields map 1-to-1 between the backend DTOs and your
TypeScript interfaces.
