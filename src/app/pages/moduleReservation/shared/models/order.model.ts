/**
 * Order domain model
 * ------------------
 * Procurement order tied to a material + supplier.
 * Status flows: DRAFT -> CONFIRMED -> SHIPPED -> DELIVERED.
 * Soft delete keeps the row for audit (eco metrics may matter for reporting).
 */

export type OrderStatus = 'DRAFT' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';
export type EcoGrade = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Order {
  id: number;
  ref: string;             // human-friendly ref e.g. ORD-2041
  company: string;
  material: string;
  qtyKg: number;
  supplier: string;
  distanceKm: number;
  date: string;            // ISO
  status: OrderStatus;
  grade: EcoGrade;
  deleted?: boolean;
  cancelReason?: string;
}

export interface Supplier {
  name: string;
  distanceKm: number;
  pricePerKg: number;
  local: boolean;          // < 150 km
}
