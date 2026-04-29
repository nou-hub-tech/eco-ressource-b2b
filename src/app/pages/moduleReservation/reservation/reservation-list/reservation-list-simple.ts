import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BackendReservation, ReservationApiService } from '../../shared/api/reservation-api.service';

type ReservationStatus = 'confirmed' | 'pending' | 'cancelled';

type ReservationRow = {
  id: number;
  companyName: string;
  machine: string;
  date: string;
  startHour: number;
  hours: number;
  status: ReservationStatus;
  solar?: boolean | null;
  cancelReason?: string | null;
};

@Component({
  selector: 'app-reservation-list-simple',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="eco-page rise">
      <header class="eco-page-head">
        <div>
          <div class="section-label"><span class="ai-dot"></span> Reservations</div>
          <h1>My reservations</h1>
          <p class="sub">View reservations and cancel when needed.</p>
        </div>
        <a routerLink="/enterprise/new-reservation" class="btn primary">+ New reservation</a>
      </header>

      <div class="card">
        <div class="row">
          <label class="field-label">Search</label>
          <input class="input" [(ngModel)]="query" placeholder="machine or company" />
        </div>
        <div class="row">
          <label class="field-label">Status</label>
          <select class="input" [(ngModel)]="statusFilter">
            <option value="">All</option>
            <option value="confirmed">confirmed</option>
            <option value="pending">pending</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>

      <div class="card" *ngIf="error">
        <div class="error">{{ error }}</div>
      </div>

      <div class="card">
        <div *ngIf="loading" class="muted">Loading...</div>
        <table class="table" *ngIf="!loading">
          <thead>
            <tr>
              <th>Company</th>
              <th>Machine</th>
              <th>Date</th>
              <th>Window</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of filtered">
              <td>{{ r.companyName }}</td>
              <td>{{ r.machine }}</td>
              <td>{{ r.date }}</td>
              <td>{{ r.startHour }}:00 → {{ (r.startHour + r.hours) % 24 }}:00</td>
              <td>{{ r.status }}</td>
              <td>
                <button class="btn sm ghost" (click)="cancel(r)">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="!filtered.length" class="muted">No reservations found.</div>
      </div>
    </div>
  `,
})
export class ReservationListSimple implements OnInit {
  loading = true;
  error = '';

  query = '';
  statusFilter: '' | ReservationStatus = '';

  rows: ReservationRow[] = [];

  constructor(private readonly api: ReservationApiService) {}

  ngOnInit(): void {
    this.api.list(false).subscribe({
      next: (data: BackendReservation[]) => {
        this.rows = data.map(r => this.mapRow(r));
        this.loading = false;
      },
      error: (err) => {
        // Keep the UI usable even if the server is down.
        this.error = err?.error?.message ?? 'Failed to load reservations.';
        this.loading = false;
      },
    });
  }

  private mapRow(r: BackendReservation): ReservationRow {
    return {
      id: r.id,
      companyName: r.companyName ?? '',
      machine: (r.machine ?? r.item ?? ''),
      date: r.fromDate,
      startHour: r.startHour ?? 9,
      hours: r.hours ?? 1,
      status: (r.status as ReservationStatus) ?? 'pending',
      solar: r.solar,
      cancelReason: r.cancelReason,
    };
  }

  get filtered(): ReservationRow[] {
    const q = this.query.trim().toLowerCase();
    return this.rows
      .filter(r => !q || r.machine.toLowerCase().includes(q) || r.companyName.toLowerCase().includes(q))
      .filter(r => !this.statusFilter || r.status === this.statusFilter);
  }

  cancel(r: ReservationRow): void {
    const reason = window.prompt('Cancellation reason (optional):', r.cancelReason ?? '') ?? '';
    this.api.cancel(r.id, reason).subscribe({
      next: () => {
        // Soft-cancel (status becomes cancelled) then refresh.
        this.ngOnInit();
      },
      error: (err) => {
        window.alert(err?.error?.message ?? 'Failed to cancel reservation.');
      },
    });
  }
}

