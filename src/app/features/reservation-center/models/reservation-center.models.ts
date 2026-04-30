import {
  BackendReservation,
  BackendReservationStatus,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import {
  BackendReservationSlot,
  BackendSlotStatus,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import {
  BackendEcoOrder,
  BackendOrderStatus,
} from '../../../pages/moduleReservation/shared/api/eco-order-api.service';

export type UiReservationStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED';
export type InsightTone = 'eco' | 'warn' | 'danger' | 'info' | 'neutral';
export type ModuleScope = 'marketplace' | 'slots' | 'reservations' | 'orders';
export type ReservationViewMode = 'enterprise' | 'admin';
export type SlotCalendarMode = 'week' | 'month';

export interface EnterpriseContext {
  enterpriseId: number | null;
  companyName: string;
  role: 'admin' | 'enterprise' | 'transporter';
  isAdmin: boolean;
}

export interface ReservationRelations {
  consumerEnterpriseId: number | null;
  providerEnterpriseId: number | null;
}

export interface ReservationConflict {
  hasConflict: boolean;
  label: string;
  blockingReservations: BackendReservation[];
}

export interface AiInsight {
  id: string;
  title: string;
  message: string;
  tone: InsightTone;
  score?: number | null;
  actionLabel?: string | null;
  meta?: Record<string, string | number | boolean | null>;
}

export interface ReservationTimelineItem {
  label: string;
  status: 'done' | 'active' | 'idle';
  description: string;
}

export interface OrderTrendPoint {
  label: string;
  count: number;
  totalQtyKg: number;
}

export interface PriceBreakdownLine {
  label: string;
  value: number;
  tone?: 'neutral' | 'positive' | 'negative';
}

export interface ReservationDecisionPayload {
  reservation: BackendReservation;
  nextStatus: UiReservationStatus;
  reason?: string;
}

export interface SlotCalendarCell {
  date: string;
  label: string;
  slotCount: number;
  bookedCount: number;
  openCount: number;
  pendingCount: number;
}

export interface SlotHeatmapCell {
  date: string;
  label: string;
  occupancy: number;
  reservationCount: number;
  tone: InsightTone;
}

export interface ReservationFormModel {
  id: number | null;
  slotId: number | null;
  company: string;
  machine: string;
  date: string;
  startHour: number;
  hours: number;
  solar: boolean;
  enterpriseId: number | null;
  status: BackendReservationStatus;
}

export interface SlotFormModel {
  id: number | null;
  machine: string;
  date: string;
  startHour: number;
  endHour: number;
  solar: boolean;
  discountPct: number;
  enterpriseId: number | null;
  status: BackendSlotStatus;
}

export interface OrderFormModel {
  id: number | null;
  ref: string;
  companyName: string;
  material: string;
  qtyKg: number;
  supplier: string;
  distanceKm: number;
  orderDate: string;
  status: BackendOrderStatus;
  co2Saved: number | null;
  waterSaved: number | null;
  wasteAvoided: number | null;
  enterpriseId: number | null;
}

export interface ReservationCenterSnapshot {
  reservations: BackendReservation[];
  slots: BackendReservationSlot[];
  orders: BackendEcoOrder[];
}
