export interface Transporter {
  id: number;
  companyName: string;
  sector?: string;
  taxId?: string;
  listingsCount: number;
  ordersCount: number;
  revenue?: string;
  createdAt: string;
}

// Si vous avez besoin d'une version avec les relations
export interface TransporterWithDetails extends Transporter {
  userId?: number;
  deliveries?: any[];
  transportOffers?: any[];
}