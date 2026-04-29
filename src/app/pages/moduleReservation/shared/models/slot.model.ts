/**
 * ReservationSlot domain model
 * ----------------------------
 * Independent unit of machine availability — published by the machine
 * owner so other companies can reserve it. A slot can be "open" (bookable),
 * "booked" (claimed by a reservation), or "blocked" (maintenance, etc.).
 *
 * Solar slots are flagged for visual prominence + eligible for a discount.
 */

export type SlotStatus = 'OPEN' | 'BOOKED' | 'BLOCKED';

export interface ReservationSlot {
  id: number;
  machine: string;
  date: string;          // ISO YYYY-MM-DD
  startHour: number;     // 0–23
  endHour: number;       // 0–24 (exclusive)
  status: SlotStatus;
  solar: boolean;
  /** % discount applied for solar/off-peak alignment */
  discountPct: number;
  /** Owner / publishing company */
  owner: string;
  /** Reservation that claimed this slot, if any */
  reservedBy?: string;
  deleted?: boolean;
}
