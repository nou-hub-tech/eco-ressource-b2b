export const CURRENT_ENTERPRISE_NAME = 'Eco Ressource Tunisie';

export type ReservationStatus = 'confirmed' | 'pending' | 'risk' | 'cancelled';
export type ReservationRole = 'provider' | 'consumer';
export type SlotStatus = 'available' | 'balanced' | 'peak' | 'maintenance';
export type SlotPortfolio = 'owned' | 'partner';
export type OrderStatus = 'draft' | 'processing' | 'invoiced' | 'fulfilled' | 'flagged';
export type PaymentStatus = 'paid' | 'pending' | 'review';
export type NotificationChannel = 'email' | 'sms' | 'both';
export const SLOT_IMAGE_LIMIT = 5;

export interface ReservationConfirmationNotice {
  channel: NotificationChannel;
  destination: string;
  sentAt: string;
  summary: string;
}

export interface ReservationNotificationEvent extends ReservationConfirmationNotice {
  reservationId: string;
  reservationCode: string;
  customer: string;
}

export interface Reservation {
  id: string;
  code: string;
  title: string;
  customer: string;
  resource: string;
  slotId: string;
  slotName: string;
  role: ReservationRole;
  city: string;
  category: 'Machine' | 'Space' | 'Storage' | 'Production';
  providerCompany: string;
  consumerCompany: string;
  start: string;
  end: string;
  headcount: number;
  amount: number;
  status: ReservationStatus;
  notes: string;
  tags: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notificationChannel: NotificationChannel;
  confirmationNotice: ReservationConfirmationNotice | null;
  color: string;
  cancellationRisk: number;
  recommendedTime: string;
  bookingSuggestion: string;
  readinessScore?: number;
  serviceBrief?: string;
  coordinationChecklist?: string[];
  messageDraft?: string;
  ecoNote?: string;
}

export interface ReservationSlot {
  id: string;
  name: string;
  zone: string;
  city: string;
  ownerCompany: string;
  portfolio: SlotPortfolio;
  type: 'Dock' | 'Storage' | 'Meeting' | 'Production';
  coordinates: [number, number];
  capacity: number;
  occupied: number;
  status: SlotStatus;
  equipment: string[];
  images: string[];
  heatmap: number[][];
  forecast: number[];
  utilizationRate: number;
  predictedAvailability: number;
  underusedScore: number;
  recoveryAction: string;
  quietWindow?: string;
  bestUseMode?: string;
  spotlightMessage?: string;
  activationChecklist?: string[];
  ecoFitNote?: string;
}

export interface OrderLineItem {
  label: string;
  quantity: number;
  unitPrice: number;
}

export interface TrackingStep {
  label: string;
  timestamp: string;
  done: boolean;
}

export interface Order {
  id: string;
  code: string;
  invoiceNumber: string;
  customer: string;
  reservationId: string;
  slotId: string;
  role: ReservationRole;
  city: string;
  buyerCompany: string;
  sellerCompany: string;
  amount: number;
  tax: number;
  total: number;
  createdAt: string;
  dueDate: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderLineItem[];
  qrValue: string;
  tracking: TrackingStep[];
  fraudRisk: number;
  spendingCluster: string;
  paymentInsight: string;
  settlementPriority?: string;
  nextBestAction?: string;
  followUpDraft?: string;
  financeChecklist?: string[];
  relationshipTone?: string;
}

export interface ReservationConflict {
  reservationIds: string[];
  slotId: string;
  slotName: string;
  overlapLabel: string;
  severity: 'high' | 'medium';
}

export interface ActivityCenterItem {
  id: string;
  audience: 'enterprise' | 'admin' | 'both';
  entity: 'reservation' | 'slot' | 'order' | 'system';
  tone: 'info' | 'success' | 'warning' | 'danger';
  badge: string;
  title: string;
  description: string;
  occurredAt: string;
  route?: string;
  actionLabel?: string;
}

export interface WorkspaceSummary {
  hostedReservations: number;
  requestedReservations: number;
  receivableTotal: number;
  payableTotal: number;
  conflictCount: number;
  occupancySignal: number;
  flaggedOrders: number;
  bestWindow: string;
}

export interface InsightCard {
  title: string;
  description: string;
  badge: string;
  tone: 'info' | 'success' | 'warning' | 'danger';
}

export interface ReservationDraft {
  title: string;
  customer: string;
  resource: string;
  slotId: string;
  role: ReservationRole;
  city: string;
  category: Reservation['category'];
  start: string;
  end: string;
  headcount: number;
  amount: number;
  status: ReservationStatus;
  notes: string;
  tags: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notificationChannel: NotificationChannel;
}

export interface ReservationSlotDraft {
  name: string;
  zone: string;
  city: string;
  ownerCompany: string;
  portfolio: SlotPortfolio;
  type: ReservationSlot['type'];
  coordinates: [number, number];
  capacity: number;
  occupied: number;
  status: SlotStatus;
  equipment: string[];
  images: string[];
}

export interface OrderDraft {
  customer: string;
  reservationId: string;
  slotId: string;
  role: ReservationRole;
  city: string;
  amount: number;
  tax: number;
  createdAt: string;
  dueDate: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderLineItem[];
}

export const HEATMAP_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const HEATMAP_HOURS = ['07h', '09h', '11h', '13h', '15h', '17h', '19h'];
