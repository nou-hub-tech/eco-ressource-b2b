import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  PlatformEventDto,
  PlatformEventRequestPayload
} from '../../core/services/admin-api.service';
import { AuthService } from '../../core/services/auth';
import { EventParticipationService } from '../../core/services/event-participation.service';
import { EventService } from '../../core/services/event';

type EventRow = PlatformEventDto & {
  isJoined: boolean;
  participationId?: number;
};

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrls: ['./events.css']
})
export class Events implements OnInit {
  readonly statusOptions = [
    'UPCOMING',
    'ONGOING',
    'DONE',
    'CANCELLED'
  ] as const;

  showModal = false;
  showDetailModal = false;
  detailEvent: PlatformEventDto | null = null;

  displayRows: EventRow[] = [];
  loading = false;
  saving = false;
  listError: string | null = null;
  saveError: string | null = null;
  editingId: number | null = null;
  actionBusyForId: number | null = null;

  toastMessage: string | null = null;
  toastKind: 'success' | 'error' = 'success';

  form: PlatformEventRequestPayload = Events.emptyForm();

  constructor(
    private readonly auth: AuthService,
    private readonly eventService: EventService,
    private readonly participationService: EventParticipationService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  get isAdmin(): boolean {
    return this.auth.currentUser?.role === 'admin';
  }

  private requestRender(): void {
    this.cdr.markForCheck();
  }

  private static emptyForm(): PlatformEventRequestPayload {
    return {
      title: '',
      eventDate: '',
      location: '',
      participants: 0,
      status: 'UPCOMING',
      typeLabel: ''
    };
  }

  ngOnInit(): void {
    this.reloadEvents();
  }

  trackById(_index: number, e: EventRow): number {
    return e.id;
  }

  statusBadgeClass(status: string): string {
    const s = (status ?? '').toUpperCase();
    if (s === 'UPCOMING') {
      return 'badge-primary';
    }
    if (s === 'ONGOING') {
      return 'badge-success';
    }
    return 'badge-neutral';
  }

  private buildRows(
    platformEvents: PlatformEventDto[],
    participations: Array<Record<string, unknown>>
  ): EventRow[] {
    const byEventId = new Map<number, number>();
    for (const p of participations) {
      const nested = p['platformEvent'] as Record<string, unknown> | undefined;
      const eid = nested?.['id'];
      const pid = p['id'];
      if (typeof eid === 'number' && typeof pid === 'number') {
        byEventId.set(eid, pid);
      }
    }
    return platformEvents.map(pe => {
      const participationId = byEventId.get(pe.id);
      return {
        ...pe,
        isJoined: participationId != null,
        participationId
      };
    });
  }

  private isTerminalStatus(status: string): boolean {
    const s = (status ?? '').toUpperCase();
    return s === 'DONE' || s === 'CANCELLED';
  }

  canShowJoin(row: EventRow): boolean {
    return !this.isAdmin && !row.isJoined && !this.isTerminalStatus(row.status);
  }

  canShowLeave(row: EventRow): boolean {
    return !this.isAdmin && row.isJoined && row.participationId != null;
  }

  private showToast(message: string, kind: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastKind = kind;
    this.requestRender();
    window.setTimeout(() => {
      this.toastMessage = null;
      this.requestRender();
    }, 3200);
  }

  reloadEvents(): void {
    this.listError = null;
    this.loading = true;
    this.requestRender();

    const userId = this.auth.currentUser?.id;
    const parts$ =
      !this.isAdmin && userId
        ? this.participationService.list(userId)
        : of([] as unknown[]);

    forkJoin({
      events: this.eventService.getPlatformEvents(),
      parts: parts$
    })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.requestRender();
        })
      )
      .subscribe({
        next: ({ events, parts }) => {
          this.displayRows = this.buildRows(
            events,
            parts as Array<Record<string, unknown>>
          );
          this.requestRender();
        },
        error: () => {
          this.listError = 'Unable to load events.';
          this.requestRender();
        }
      });
  }

  openCreateModal(): void {
    this.editingId = null;
    this.form = Events.emptyForm();
    this.saveError = null;
    this.showModal = true;
    this.requestRender();
  }

  openEditModal(e: PlatformEventDto): void {
    this.editingId = e.id;
    const st = (e.status ?? '').toUpperCase();
    this.form = {
      title: e.title,
      eventDate: e.eventDate,
      location: e.location,
      participants: e.participants,
      status: this.statusOptions.includes(st as (typeof this.statusOptions)[number])
        ? st
        : 'UPCOMING',
      typeLabel: e.typeLabel
    };
    this.saveError = null;
    this.showModal = true;
    this.requestRender();
  }

  openDetailModal(e: PlatformEventDto): void {
    this.detailEvent = e;
    this.showDetailModal = true;
    this.requestRender();
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.detailEvent = null;
    this.requestRender();
  }

  closeModal(): void {
    this.showModal = false;
    this.editingId = null;
    this.saveError = null;
    this.requestRender();
  }

  submitModal(): void {
    if (
      !this.form.title?.trim() ||
      !this.form.eventDate ||
      !this.form.location?.trim() ||
      !this.form.typeLabel?.trim() ||
      !this.form.status ||
      this.form.participants < 1
    ) {
      this.saveError =
        'Please fill all fields; participants must be at least 1.';
      return;
    }

    this.saveError = null;
    this.saving = true;
    this.requestRender();
    const request$ =
      this.editingId != null
        ? this.eventService.updatePlatformEvent(this.editingId, this.form)
        : this.eventService.createPlatformEvent(this.form);

    request$
      .pipe(
        finalize(() => {
          this.saving = false;
          this.requestRender();
        })
      )
      .subscribe({
        next: () => {
          this.closeModal();
          this.reloadEvents();
        },
        error: () => {
          this.saveError = 'Could not save the event.';
          this.requestRender();
        }
      });
  }

  deleteEvent(e: PlatformEventDto): void {
    if (!confirm(`Delete "${e.title}"?`)) {
      return;
    }
    this.eventService.deletePlatformEvent(e.id).subscribe({
      next: () => this.reloadEvents(),
      error: () => {
        this.listError = 'Could not delete the event.';
        this.requestRender();
      }
    });
  }

  joinEvent(row: EventRow): void {
    if (this.actionBusyForId != null) {
      return;
    }
    const uid = Number(this.auth.currentUser?.id);
    if (!Number.isFinite(uid) || uid <= 0) {
      this.showToast('Missing user id for participation.', 'error');
      return;
    }
    this.actionBusyForId = row.id;
    this.requestRender();
    this.participationService
      .create({ userId: uid, platformEventId: row.id })
      .pipe(
        finalize(() => {
          this.actionBusyForId = null;
          this.requestRender();
        })
      )
      .subscribe({
        next: () => {
          this.showToast('You joined the event.', 'success');
          this.reloadEvents();
        },
        error: () => {
          this.showToast('Could not join this event.', 'error');
        }
      });
  }

  leaveEvent(row: EventRow): void {
    if (this.actionBusyForId != null || row.participationId == null) {
      return;
    }
    this.actionBusyForId = row.id;
    this.requestRender();
    this.participationService
      .delete(row.participationId)
      .pipe(
        finalize(() => {
          this.actionBusyForId = null;
          this.requestRender();
        })
      )
      .subscribe({
        next: () => {
          this.showToast('You left the event.', 'success');
          this.reloadEvents();
        },
        error: () => {
          this.showToast('Could not cancel participation.', 'error');
        }
      });
  }
}
