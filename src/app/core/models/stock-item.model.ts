export interface StockItem {
  idStock?: number;
  quantity: number;
  unitPrice: number;
  status: string;
  location: string;
  unit: string;
  condition: string;
  image?: string;
  expirationDate: string;
  product?: {
    id_product?: number;
    name?: string;
  };
  companyId?: number;
}