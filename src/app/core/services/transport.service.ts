import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DeliveryDto {
  id: string;
  product?: string;
  client?: string;
  from?: string;
  to?: string;
  transporter?: string;
  status?: string;
  co2?: string;
  date?: string;
  amount?: string;
  earn?: number;
  pickup?: string;
  delivery?: string;
  route?: string;
  eta?: string;
  cargo?: string;
  weight?: string;
}

export interface TransportOfferPayload {
  fromLocation: string;
  toLocation: string;
  cargoDescription: string;
  weightLabel: string;
  proposedEarn: number;
}

export interface Transporter {
  id: number;
  userId?: number;
  companyName: string;
  sector?: string;
  taxId?: string;
  listingsCount: number;
  ordersCount: number;
  revenue?: string;
  createdAt: string;
}

type TransporterApi = Record<string, any>;

@Injectable({ providedIn: 'root' })
export class TransportService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getEnterpriseDeliveries(): Observable<DeliveryDto[]> {
    return this.http.get<DeliveryDto[]>(
      `${this.apiUrl}/transport/deliveries/enterprise`
    );
  }

  getTransporterDeliveries(): Observable<DeliveryDto[]> {
    return this.http.get<DeliveryDto[]>(
      `${this.apiUrl}/transport/deliveries/transporter`
    );
  }

  createOffer(body: TransportOfferPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transport/offer`, body);
  }

  getAllTransporters(): Observable<Transporter[]> {
    return this.http
      .get<TransporterApi[]>(`${this.apiUrl}/transporters`)
      .pipe(
        map((list) =>
          (list || [])
            .map((t) => {
              const id = Number((t as any).id);
              if (!Number.isFinite(id) || id <= 0) return null;

              const companyName =
                (t as any).company_name ??
                (t as any).companyName ??
                (t as any).company ??
                '';

              const userIdRaw = (t as any).user_id ?? (t as any).userId ?? null;
              const userId =
                userIdRaw === null || userIdRaw === undefined
                  ? undefined
                  : Number(userIdRaw);

              return {
                id,
                userId: Number.isFinite(userId as number) ? (userId as number) : undefined,
                companyName: String(companyName),
                sector: (t as any).sector,
                taxId: (t as any).tax_id ?? (t as any).taxId,
                listingsCount: Number((t as any).listings_count ?? (t as any).listingsCount ?? 0),
                ordersCount: Number((t as any).orders_count ?? (t as any).ordersCount ?? 0),
                revenue: (t as any).revenue,
                createdAt: String((t as any).created_at ?? (t as any).createdAt ?? '')
              } as Transporter;
            })
            .filter((x): x is Transporter => !!x)
        )
      );
  }
}
