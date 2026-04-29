/**
 * Reservation domain model
 * ------------------------
 * One reservation = a company booking a shared machine for a time window.
 * Eco metrics (CO2, water, waste) are derived — never persisted directly —
 * because grid intensity changes over time and we want re-grading on view.
 */

export type ReservationStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export interface AiTip {
  label: string;
  score?: number;        // 0–100 confidence
}

export interface Reservation {
  id: number;
  company: string;
  machine: string;
  date: string;          // ISO YYYY-MM-DD
  hours: number;
  startHour: number;     // 0–23
  status: ReservationStatus;
  solar: boolean;
  ai: AiTip[];
  deleted?: boolean;     // soft-delete flag
  cancelReason?: string; // captured on soft delete
}
