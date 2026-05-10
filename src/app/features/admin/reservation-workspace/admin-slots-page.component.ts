import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../enterprise/reservation-workspace/dialogs/confirm-dialog/confirm-dialog.component';
import { SlotFormDialogComponent } from '../../enterprise/reservation-workspace/dialogs/slot-form-dialog/slot-form-dialog.component';
import {
  ReservationSlot,
  ReservationSlotDraft,
  SlotPortfolio,
  SlotStatus
} from '../../../shared/reservation-workspace/reservation-workspace.models';
import { ReservationWorkspaceService } from '../../../shared/reservation-workspace/services/reservation-workspace.service';

@Component({
  selector: 'app-admin-slots-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-slots-page.component.html',
  styleUrl: './admin-slots-page.component.scss'
})
export class AdminSlotsPageComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);

  slots: ReservationSlot[] = [];

  search = '';
  portfolioFilter: 'all' | SlotPortfolio = 'all';
  statusFilter: 'all' | SlotStatus = 'all';
  selectedSlotId = '';
  viewModalOpen = false;

  private readonly subscription = new Subscription();

  constructor(private readonly workspaceService: ReservationWorkspaceService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.workspaceService.slots$.subscribe((slots) => {
        this.slots = slots;
        if (!this.selectedSlotId || !slots.some((item) => item.id === this.selectedSlotId)) {
          this.selectedSlotId = slots[0]?.id ?? '';
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get filteredSlots(): ReservationSlot[] {
    const query = this.search.trim().toLowerCase();
    return this.slots.filter((slot) => {
      const portfolioMatches =
        this.portfolioFilter === 'all' || slot.portfolio === this.portfolioFilter;
      const statusMatches = this.statusFilter === 'all' || slot.status === this.statusFilter;
      const queryMatches =
        !query ||
        slot.name.toLowerCase().includes(query) ||
        slot.city.toLowerCase().includes(query) ||
        slot.zone.toLowerCase().includes(query) ||
        slot.ownerCompany.toLowerCase().includes(query);
      return portfolioMatches && statusMatches && queryMatches;
    });
  }

  get topPressureSlot(): ReservationSlot | undefined {
    return this.slots.slice().sort((left, right) => right.utilizationRate - left.utilizationRate)[0];
  }

  get selectedSlot(): ReservationSlot | undefined {
    return this.slots.find((slot) => slot.id === this.selectedSlotId);
  }

  get topReliefSlot(): ReservationSlot | undefined {
    return this.slots.slice().sort((left, right) => right.underusedScore - left.underusedScore)[0];
  }

  get openCapacity(): number {
    return this.slots.reduce((sum, slot) => sum + Math.max(slot.capacity - slot.occupied, 0), 0);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(SlotFormDialogComponent, {
      width: '820px',
      maxWidth: 'calc(100vw - 24px)',
      data: {}
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((draft?: ReservationSlotDraft) => {
        if (draft) {
          this.workspaceService.createSlot(draft);
        }
      })
    );
  }

  openEditDialog(slot: ReservationSlot): void {
    const dialogRef = this.dialog.open(SlotFormDialogComponent, {
      width: '820px',
      maxWidth: 'calc(100vw - 24px)',
      data: { slot }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((draft?: ReservationSlotDraft) => {
        if (draft) {
          this.workspaceService.updateSlot(slot.id, draft);
        }
      })
    );
  }

  openSlotDetails(slot: ReservationSlot): void {
    this.selectedSlotId = slot.id;
    this.viewModalOpen = true;
  }

  closeSlotModal(): void {
    this.viewModalOpen = false;
  }

  requestDeleteSlot(slot: ReservationSlot): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      maxWidth: 'calc(100vw - 24px)',
      data: {
        title: 'Delete space',
        message: `Remove ${slot.name} from the admin workspace?`,
        confirmLabel: 'Delete space',
        tone: 'danger'
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.workspaceService.deleteSlot(slot.id);
          if (this.selectedSlotId === slot.id) {
            this.viewModalOpen = false;
          }
        }
      })
    );
  }

  coverImageFor(slot: ReservationSlot): string {
    return this.workspaceService.resolveSlotGallery(slot)[0] ?? '';
  }

  imageCountLabel(slot: ReservationSlot): string {
    const galleryCount = this.workspaceService.resolveSlotGallery(slot).length;
    if (slot.images.length) {
      return `${slot.images.length} uploaded photo${slot.images.length > 1 ? 's' : ''}`;
    }
    return `${galleryCount} sample photo${galleryCount > 1 ? 's' : ''}`;
  }

  statusLabel(status: SlotStatus): string {
    switch (status) {
      case 'available':
        return 'Open';
      case 'balanced':
        return 'Balanced';
      case 'peak':
        return 'Busy';
      default:
        return 'Pause';
    }
  }

  portfolioLabel(slot: Pick<ReservationSlot, 'portfolio'>): string {
    return slot.portfolio === 'owned' ? 'Owned' : 'Partner';
  }
}
