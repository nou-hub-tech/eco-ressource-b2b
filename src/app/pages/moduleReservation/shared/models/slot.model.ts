export type SlotStatus = 'OPEN' | 'BOOKED' | 'BLOCKED';

export interface ReservationSlot {
  id: number;
  machine: string;
  date: string;
  startHour: number;
  endHour: number;
  status: SlotStatus;
  solar: boolean;
  discountPct: number;
  enterpriseId?: number | null;
  deleted?: boolean;
}
