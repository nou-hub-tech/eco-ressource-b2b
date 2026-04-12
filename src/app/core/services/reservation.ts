import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiService } from './admin-api.service';
import { ListingService, ReservationDto } from './listing.service';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(
    private readonly listing: ListingService,
    private readonly adminApi: AdminApiService
  ) {}

  getMyReservations(): Observable<ReservationDto[]> {
    return this.listing.getMyReservations();
  }

  getAllReservationsAdmin(): Observable<ReservationDto[]> {
    return this.adminApi.getReservations();
  }
}
