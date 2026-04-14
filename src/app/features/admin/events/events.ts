import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  PlatformEventDto,
  PlatformEventRequestPayload
} from '../../../core/services/admin-api.service';
import { EventService } from '../../../core/services/event';

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
  events: PlatformEventDto[] = [];
  loading = false;
  saving = false;
  listError: string | null = null;
  saveError: string | null = null;
  editingId: number | null = null;

  form: PlatformEventRequestPayload = Events.emptyForm();

  constructor(private readonly eventService: EventService) {}

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

  trackById(_index: number, e: PlatformEventDto): number {
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

  reloadEvents(): void {
    this.listError = null;
    this.loading = true;
    this.eventService
      .getPlatformEvents()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: rows => (this.events = rows),
        error: () => (this.listError = 'Unable to load events.')
      });
  }

  openCreateModal(): void {
    this.editingId = null;
    this.form = Events.emptyForm();
    this.saveError = null;
    this.showModal = true;
  }

  openEditModal(e: PlatformEventDto): void {
    this.editingId = e.id;
    this.form = {
      title: e.title,
      eventDate: e.eventDate,
      location: e.location,
      participants: e.participants,
      status: e.status,
      typeLabel: e.typeLabel
    };
    this.saveError = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingId = null;
    this.saveError = null;
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
      this.saveError = 'Please fill all fields; participants must be at least 1.';
      return;
    }

    this.saveError = null;
    this.saving = true;
    const request$ =
      this.editingId != null
        ? this.eventService.updatePlatformEvent(this.editingId, this.form)
        : this.eventService.createPlatformEvent(this.form);

    request$.pipe(finalize(() => (this.saving = false))).subscribe({
      next: () => {
        
        this.closeModal();
      },
      error: () => (this.saveError = 'Could not save the event.')
    });
  }

  deleteEvent(e: PlatformEventDto): void {
    if (!confirm(`Delete "${e.title}"?`)) {
      return;
    }
    this.eventService.deletePlatformEvent(e.id).subscribe({
      next: () => this.reloadEvents(),
      error: () => (this.listError = 'Could not delete the event.')
    });
  }
}
