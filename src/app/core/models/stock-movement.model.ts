// models/stock-movement.model.ts
export interface StockMovement {
  id?: number;
  movementType: string;
  quantity: number;
  movementDate: string;
  description: string;
  stockItem?: {
    id_stock?: number;
    product?: { name?: string };
    location?: string;
  };
}