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

  // 💳 Stripe / Konnect — référence de paiement (rempli après paiement)
  konnectPaymentRef?: string;
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

  // 🏢 Vendeur (Seller)
  sellerName?: string;          // Raison sociale vendeur
  sellerArticleFiscal?: string; // Matricule fiscal vendeur (ex: 1234567/A/M/000)

  // 🛒 Acheteur (Buyer)
  clientName: string;           // Raison sociale acheteur
  buyerArticleFiscal?: string;  // Matricule fiscal acheteur

  project: string;
  amountHT: number;
  tva: number;
  amountTTC: number;
  status: InvoiceStatus | string;
  issueDate: string;

  // 🔗 Liaison livraison
  deliveryOrderId?: number;
  linkedEscrowId?: number;
  deliveredAt?: string;

  // 🧧 Type de facture
  invoiceType?: InvoiceType | string;
}


// 📌 Statut facture
export enum InvoiceStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
}

// 🧾 Type de facture
export enum InvoiceType {
  VENTE = 'VENTE',  // L'entreprise est vendeur → va encaisser
  ACHAT = 'ACHAT'   // L'entreprise est acheteur → doit payer
}
