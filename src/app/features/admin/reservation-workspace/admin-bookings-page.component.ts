import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../enterprise/reservation-workspace/dialogs/confirm-dialog/confirm-dialog.component';
import {
  ReservationFormDialogComponent
} from '../../enterprise/reservation-workspace/dialogs/reservation-form-dialog/reservation-form-dialog.component';
import {
  Reservation,
  ReservationConflict,
  ReservationDraft,
  ReservationNotificationEvent,
  ReservationRole,
  ReservationSlot,
  ReservationStatus
} from '../../../shared/reservation-workspace/reservation-workspace.models';
import { ReservationWorkspaceService } from '../../../shared/reservation-workspace/services/reservation-workspace.service';

@Component({
  selector: 'app-admin-bookings-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-bookings-page.component.html',
  styleUrl: './admin-bookings-page.component.scss'
})
export class AdminBookingsPageComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);

  reservations: Reservation[] = [];
  slots: ReservationSlot[] = [];
  conflicts: ReservationConflict[] = [];
  notifications: ReservationNotificationEvent[] = [];

  search = '';
  reservationFocus: 'all' | ReservationRole | 'watch' = 'all';
  selectedReservationId = '';
  viewModalOpen = false;

  private readonly subscription = new Subscription();

  constructor(private readonly workspaceService: ReservationWorkspaceService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.workspaceService.reservations$.subscribe((reservations) => {
        this.reservations = reservations;
        if (!this.selectedReservationId || !reservations.some((item) => item.id === this.selectedReservationId)) {
          this.selectedReservationId = reservations[0]?.id ?? '';
        }
      })
    );
    this.subscription.add(
      this.workspaceService.slots$.subscribe((slots) => {
        this.slots = slots;
      })
    );
    this.subscription.add(
      this.workspaceService.conflicts$.subscribe((conflicts) => {
        this.conflicts = conflicts;
      })
    );
    this.subscription.add(
      this.workspaceService.reservationNotifications$.subscribe((notifications) => {
        this.notifications = notifications;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get filteredReservations(): Reservation[] {
    const query = this.search.trim().toLowerCase();
    return this.reservations.filter((reservation) => {
      const focusMatches =
        this.reservationFocus === 'all'
          ? true
          : this.reservationFocus === 'watch'
            ? reservation.cancellationRisk >= 60
            : reservation.role === this.reservationFocus;
      const queryMatches =
        !query ||
        reservation.code.toLowerCase().includes(query) ||
        reservation.customer.toLowerCase().includes(query) ||
        reservation.city.toLowerCase().includes(query) ||
        reservation.slotName.toLowerCase().includes(query) ||
        reservation.title.toLowerCase().includes(query);
      return focusMatches && queryMatches;
    });
  }

  get topReservationAlert(): Reservation | undefined {
    return this.reservations
      .slice()
      .sort((left, right) => right.cancellationRisk - left.cancellationRisk)[0];
  }

  get selectedReservation(): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === this.selectedReservationId);
  }

  get recentNotifications(): ReservationNotificationEvent[] {
    return this.notifications.slice(0, 4);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ReservationFormDialogComponent, {
      width: '880px',
      maxWidth: 'calc(100vw - 24px)',
      data: { slots: this.slots }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((draft?: ReservationDraft) => {
        if (draft) {
          this.workspaceService.createReservation(draft);
        }
      })
    );
  }

  openEditDialog(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ReservationFormDialogComponent, {
      width: '880px',
      maxWidth: 'calc(100vw - 24px)',
      data: { reservation, slots: this.slots }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((draft?: ReservationDraft) => {
        if (draft) {
          this.workspaceService.updateReservation(reservation.id, draft);
        }
      })
    );
  }

  openReservationDetails(reservation: Reservation): void {
    this.selectedReservationId = reservation.id;
    this.viewModalOpen = true;
  }

  closeReservationModal(): void {
    this.viewModalOpen = false;
  }

  confirmReservation(reservation: Reservation): void {
    if (reservation.status === 'confirmed') {
      return;
    }

    this.workspaceService.updateReservation(reservation.id, {
      ...this.toDraft(reservation),
      status: 'confirmed'
    });
  }

  requestDeleteReservation(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      maxWidth: 'calc(100vw - 24px)',
      data: {
        title: 'Delete booking',
        message: `Remove ${reservation.code} from the admin workspace?`,
        confirmLabel: 'Delete booking',
        tone: 'danger'
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.workspaceService.deleteReservation(reservation.id);
          if (this.selectedReservationId === reservation.id) {
            this.viewModalOpen = false;
          }
        }
      })
    );
  }

  roleLabel(role: ReservationRole): string {
    return role === 'provider' ? 'Host side' : 'Request side';
  }

  reservationStatusLabel(status: ReservationStatus): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'risk':
        return 'Watch';
      default:
        return 'Cancelled';
    }
  }

  private toDraft(reservation: Reservation): ReservationDraft {
    return {
      title: reservation.title,
      customer: reservation.customer,
      resource: reservation.resource,
      slotId: reservation.slotId,
      role: reservation.role,
      city: reservation.city,
      category: reservation.category,
      start: reservation.start,
      end: reservation.end,
      headcount: reservation.headcount,
      amount: reservation.amount,
      status: reservation.status,
      notes: reservation.notes,
      tags: reservation.tags,
      contactName: reservation.contactName,
      contactEmail: reservation.contactEmail,
      contactPhone: reservation.contactPhone,
      notificationChannel: reservation.notificationChannel
    };
  }
}
