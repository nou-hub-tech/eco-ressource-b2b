// 📊 Résumé Trésorerie
export interface TreasurySummary {
  cashOnHand: number;
  escrowBalance: number;
  receivables: number;
  payables: number;
  netBalance: number;
  daysCashOnHand: number;
}

// 💰 Transaction
export interface FinanceTransaction {
  id?: number;
  project: string;

  type: TransactionType;
  status: TransactionStatus;

  amount: number;
  date: string;
}

// 🔐 Escrow
export interface EscrowEntry {
  id?: number;
  project: string;
  amount: number;

  status: EscrowStatus;

  createdAt: string;
  releaseDate?: string;

  // 🔗 Liaison livraison (renseigné quand intégration active)
  deliveryOrderId?: number;
  linkedInvoiceId?: number;
}

// 🏦 Financement (IMPORTANT ⭐)
export interface FinancingRequest {
  id?: number;
  projectName: string;

  amountRequested: number;
  amountApproved?: number;

  interestRate: number;
  durationMonths: number;

  status: FinancingStatus;
}

// ================= ENUMS =================

// 🔁 Type transaction
export enum TransactionType {
  PAYMENT = 'PAYMENT',
  DISBURSEMENT = 'DISBURSEMENT',
  REFUND = 'REFUND',
  FEE = 'FEE',
  ESCROW = 'ESCROW',
  LOAN = 'LOAN'
}

// 📌 Statut transaction
export enum TransactionStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  LOCKED = 'LOCKED',
  FAILED = 'FAILED'
}

// 🔐 Statut escrow
export enum EscrowStatus {
  LOCKED = 'LOCKED',
  RELEASED = 'RELEASED',
  DISPUTED = 'DISPUTED'
}

// 💸 Statut financement
export enum FinancingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

// 🧾 Facture
export interface Invoice {
  id?: number;
  invoiceNumber: string;
  clientName: string;
  project: string;
  amountHT: number;
  tva: number;
  amountTTC: number;
  status: InvoiceStatus | string;
  issueDate: string;

  // 🔗 Liaison livraison (renseigné quand intégration active)
  deliveryOrderId?: number;   // ID de la commande/livraison associée
  linkedEscrowId?: number;    // ID de l'escrow à libérer lors du paiement
  deliveredAt?: string;       // Date de confirmation de livraison
}

// 📌 Statut facture
export enum InvoiceStatus {
  PAID   = 'PAID',
  UNPAID = 'UNPAID'
}
