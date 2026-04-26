import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

// AJOUTEZ CETTE INTERFACE
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

  // AJOUTEZ CETTE MÉTHODE
  getAllTransporters(): Observable<Transporter[]> {
    return this.http.get<Transporter[]>(`${this.apiUrl}/transport/transporters`);
  }
}