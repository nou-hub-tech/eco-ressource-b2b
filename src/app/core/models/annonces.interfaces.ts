export type ListingType = 'SURPLUS' | 'DEMANDE' | 'GROUP_BUYING';
export type ResourceListingStatus = 'ACTIVE' | 'CLOSED' | 'EXPIRED' | 'CANCELLED';
export type GroupPurchaseStatus = 'OPEN' | 'FULL' | 'SUCCESS' | 'FAILED' | 'CLOSED';

export interface CreateListingRequest {
  title: string;
  description: string;
  type: ListingType;
  quantity: number;
  unit: string;
  price?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  productId: number;
  companyId: number;
  attachmentUrls?: string[];
  targetQuantity?: number;
  deadline?: string;
}

export interface ListingResponse {
  id: number;
  title: string;
  description: string;
  type: ListingType;
  status: ResourceListingStatus;
  quantity: number;
  unit: string;
  price: number | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  productId: number;
  productName: string;
  productCategory: string;
  companyId: number;
  companyName?: string | null;
  createdAt: string;
  attachmentUrls: string[];
  groupPurchase: GroupPurchaseResponse | null;
  favoriteCount: number;
  commentCount: number;
}

export interface CreateCommentRequest {
  content: string;
  parentId?: number | null;
}

export interface CommentResponse {
  id: number;
  content: string;
  userId: number;
  userFullName: string;
  listingId: number;
  parentId: number | null;
  createdAt: string;
  replies: CommentResponse[];
}

export interface JoinGroupRequest {
  quantity: number;
  companyId: number;
}

export interface GroupPurchaseResponse {
  id: number;
  listingId: number;
  targetQuantity: number;
  currentQuantity: number;
  remainingQuantity: number;
  deadline: string;
  status: GroupPurchaseStatus;
  participants: ParticipantInfo[];
}

export interface ParticipantInfo {
  id: number;
  companyId: number;
  /** Nom résolu côté API (entreprise ou transporteur). */
  companyName?: string | null;
  quantity: number;
}

export interface FavoriteResponse {
  id: number;
  userId: number;
  listingId: number;
  listingTitle: string;
}

export interface Product {
  idProduct: number;
  name: string;
  category: string | null;
  description: string | null;
  image: string | null;
  materialType: string | null;
  recyclable: boolean;
  companyId: number | null;
}

export interface ProductRequest {
  name: string;
  category?: string;
  description?: string;
  image?: string;
  materialType?: string;
  recyclable: boolean;
  companyId?: number;
}

export interface StockItem {
  idStock: number;
  companyId: number | null;
  itemCondition: string | null;
  expirationDate: string | null;
  image: string | null;
  location: string | null;
  quantity: number;
  status: string | null;
  unit: string | null;
  product: Product | null;
  unitPrice: number;
}

export interface StockItemRequest {
  companyId?: number;
  itemCondition?: string;
  expirationDate?: string;
  image?: string;
  location?: string;
  quantity: number;
  status?: string;
  unit?: string;
  idProduct?: number;
  unitPrice: number;
}

export interface StockMovement {
  id: number;
  description: string | null;
  movementDate: string | null;
  movementType: string | null;
  quantity: number;
  stockItem: StockItem | null;
}

export interface StockMovementRequest {
  description?: string;
  movementDate?: string;
  movementType?: string;
  quantity: number;
  idStock?: number;
}

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  timestamp: string;
}
