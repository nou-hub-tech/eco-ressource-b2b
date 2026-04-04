import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiService } from './admin-api.service';
import { ListingService, WalletTransactionDto } from './listing.service';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(
    private readonly listing: ListingService,
    private readonly adminApi: AdminApiService
  ) {}

  getMyTransactions(): Observable<WalletTransactionDto[]> {
    return this.listing.getWalletTransactions();
  }

  getTreasuryTransactions(): Observable<WalletTransactionDto[]> {
    return this.adminApi.getTreasuryTransactions();
  }
}
