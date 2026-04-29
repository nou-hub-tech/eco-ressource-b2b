export {
  ListingService
} from './listing.service';

export interface ListingDto {
  id: number;
  title: string;
  company?: string;
  category: string;
  price: number;
  qty?: string;
  status: string;
  ai?: string;
  views?: number;
  enquiries?: number;
  posted?: string;
  sub?: string;
  initials?: string;
  priceDisplay?: string;
  match: number;
  verified?: boolean;
  rating?: string;
  time?: string;
  enq: number;
  trend?: boolean;
  specs?: Array<{ k: string; v: string }>;
  btnColor?: string;
  tag?: string;
  tagColor?: string;
  titleAccent?: string;
  accentColor?: string;
  coColor?: string;
  location?: string;
  matchColor?: string;
}

export interface CreateListingPayload {
  title: string;
  category: string;
  price: number;
  quantityLabel: string;
  status: string;
  aiInsight?: string;
}

export interface StockItemDto {
  id: number;
  name: string;
  category: string;
  qty: number;
  unit: string;
  condition: string;
  status: string;
  ai: string;
  image?: string;
  location?: string;
  expirationDate?: string;
  unitPrice?: number;
}

export interface ExchangeRequestDto {
  id: string;
  from: string;
  avatar: string;
  item: string;
  type: string;
  from_date: string;
  to_date: string;
  duration: string;
  price: number;
  message: string;
  status: string;
  received: string;
  urgent: boolean;
}

export interface ReservationDto {
  id: string;
  type: string;
  item: string;
  company?: string;
  from: string;
  to: string;
  price: number;
  status: string;
}

export interface WalletTransactionDto {
  id: string;
  label: string;
  type: string;
  amount: number;
  positive: boolean | null;
  status: string;
  date: string;
  from?: string;
  to?: string;
}
