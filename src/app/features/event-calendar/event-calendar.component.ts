import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../core/services/event';
import { PlatformEventDto, PlatformEventRequestPayload } from '../../core/services/admin-api.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import { SharedModule } from '../../shared/shared-module';
import { AuthService } from '../../core/services/auth';
import { EventParticipationService } from '../../core/services/event-participation.service';
import { forkJoin, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

type EventRow = PlatformEventDto & {
  isJoined: boolean;
  participationId?: number;
};


@Component({
  selector: 'app-event-calendar',
  standalone: true, 
  imports: [
    CommonModule,       
    FullCalendarModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})


export class EventCalendarComponent implements OnInit {
  platformEvents: EventRow[] = [];
  selectedEvent: EventRow | null = null;
  sidebarCollapsed = true;

  actionBusyForId: number | null = null;
  toastMessage: string | null = null;
  toastKind: 'success' | 'error' = 'success';

  showEditModal = false;
  editingId: number | null = null;
  saveError: string | null = null;
  saving = false;
  form: PlatformEventRequestPayload = {
    title: '', eventDate: '', location: '', latitude: undefined, longitude: undefined, participants: 0, status: 'UPCOMING', typeLabel: ''
  };
  readonly statusOptions = ['UPCOMING', 'ONGOING', 'DONE', 'CANCELLED'] as const;

  editMap: L.Map | null = null;
  editMarker: L.Marker | null = null;
  viewMap: L.Map | null = null;
  searchQuery: string = '';

    //calendarEvents: EventInput[] = [];


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    displayEventTime: false,
    eventDisplay: 'block',
    events: [],
    eventClick: this.handleEventClick.bind(this),
    height: 'auto'
  };

  constructor(
    private readonly eventService: EventService,
    private readonly cdr: ChangeDetectorRef,
    private readonly auth: AuthService,
    private readonly participationService: EventParticipationService
  ) {}

  get isAdmin(): boolean {
    return this.auth.currentUser?.role === 'admin';
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const userId = this.auth.currentUser?.id;
    const parts$ = !this.isAdmin && userId
      ? this.participationService.list(userId)
      : of([] as unknown[]);

    forkJoin({
      events: this.eventService.getPlatformEvents(),
      parts: parts$
    }).subscribe({
      next: ({ events, parts }) => {
        const participations = parts as Array<Record<string, unknown>>;
        const byEventId = new Map<number, number>();
        for (const p of participations) {
          const nested = p['platformEvent'] as Record<string, unknown> | undefined;
          const eid = nested?.['id'];
          const pid = p['id'];
          if (typeof eid === 'number' && typeof pid === 'number') {
            byEventId.set(eid, pid);
          }
        }

        this.platformEvents = events.map(pe => ({
          ...pe,
          isJoined: byEventId.has(pe.id),
          participationId: byEventId.get(pe.id)
        }));

        const mapped: EventInput[] = this.platformEvents.map((event) => ({
          id: event.id.toString(),
          title: event.title,
          start: event.eventDate,  
          color: this.getEventColor(event.status)
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events: mapped
        };

        if (this.selectedEvent) {
            this.selectedEvent = this.platformEvents.find(e => e.id === this.selectedEvent?.id) || null;
        }

        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const eventId = Number(clickInfo.event.id);
    this.selectedEvent =
      this.platformEvents.find((event) => event.id === eventId) || null;
    this.cdr.detectChanges();
    setTimeout(() => this.initViewMap(), 50);
  }

  closeModal(): void {
    if (this.viewMap) {
      this.viewMap.remove();
      this.viewMap = null;
    }
    this.selectedEvent = null;
    this.cdr.detectChanges();
  }

  initViewMap(): void {
    const mapContainer = document.getElementById('view-map');
    if (!mapContainer || !this.selectedEvent || !this.selectedEvent.latitude || !this.selectedEvent.longitude) return;
    if (this.viewMap) {
      this.viewMap.remove();
      this.viewMap = null;
    }
    const lat = this.selectedEvent.latitude;
    const lng = this.selectedEvent.longitude;
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.viewMap = L.map('view-map').setView([lat, lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.viewMap);
    L.marker([lat, lng]).addTo(this.viewMap);
    setTimeout(() => { this.viewMap?.invalidateSize(); }, 100);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  showToast(message: string, kind: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastKind = kind;
    this.cdr.detectChanges();
    window.setTimeout(() => {
      this.toastMessage = null;
      this.cdr.detectChanges();
    }, 3200);
  }

  isTerminalStatus(status: string): boolean {
    const s = (status ?? '').toUpperCase();
    return s === 'DONE' || s === 'CANCELLED';
  }

  canShowJoin(row: EventRow): boolean {
    return !this.isAdmin && !row.isJoined && !this.isTerminalStatus(row.status);
  }

  canShowLeave(row: EventRow): boolean {
    return !this.isAdmin && row.isJoined && row.participationId != null;
  }

  joinEvent(row: EventRow): void {
    if (this.actionBusyForId != null) return;
    const uid = Number(this.auth.currentUser?.id);
    if (!Number.isFinite(uid) || uid <= 0) {
      this.showToast('Missing user id for participation.', 'error');
      return;
    }
    this.actionBusyForId = row.id;
    this.cdr.detectChanges();
    this.participationService.create({ userId: uid, platformEventId: row.id })
      .pipe(finalize(() => { this.actionBusyForId = null; this.cdr.detectChanges(); }))
      .subscribe({
        next: () => {
          this.showToast('You joined the event.', 'success');
          this.reloadEvents();
        },
        error: () => this.showToast('Could not join this event.', 'error')
      });
  }

  leaveEvent(row: EventRow): void {
    if (this.actionBusyForId != null || row.participationId == null) return;
    this.actionBusyForId = row.id;
    this.cdr.detectChanges();
    this.participationService.delete(row.participationId)
      .pipe(finalize(() => { this.actionBusyForId = null; this.cdr.detectChanges(); }))
      .subscribe({
        next: () => {
          this.showToast('You left the event.', 'success');
          this.reloadEvents();
        },
        error: () => this.showToast('Could not cancel participation.', 'error')
      });
  }

  deleteEvent(e: EventRow): void {
    if (!confirm(`Delete "${e.title}"?`)) return;
    this.eventService.deletePlatformEvent(e.id).subscribe({
      next: () => {
        if (this.selectedEvent?.id === e.id) this.closeModal();
        this.reloadEvents();
      },
      error: () => this.showToast('Could not delete the event.', 'error')
    });
  }

  reloadEvents() {
    this.loadEvents();
  }

  openCreateModal(): void {
    this.editingId = null;
    this.form = {
      title: '', eventDate: '', location: '', latitude: undefined, longitude: undefined, participants: 0, status: 'UPCOMING', typeLabel: ''
    };
    this.searchQuery = '';
    this.saveError = null;
    this.showEditModal = true;
    this.cdr.detectChanges();
    setTimeout(() => this.initEditMap(), 50);
  }

  openEditModal(e: EventRow): void {
    this.editingId = e.id;
    const st = (e.status ?? '').toUpperCase();
    this.form = {
      title: e.title,
      eventDate: e.eventDate,
      location: e.location,
      latitude: e.latitude,
      longitude: e.longitude,
      participants: e.participants,
      status: this.statusOptions.includes(st as any) ? st : 'UPCOMING',
      typeLabel: e.typeLabel
    };
    this.searchQuery = '';
    this.saveError = null;
    this.showEditModal = true;
    this.cdr.detectChanges();
    setTimeout(() => this.initEditMap(), 50);
  }

  closeEditModal(): void {
    if (this.editMap) {
      this.editMap.remove();
      this.editMap = null;
      this.editMarker = null;
    }
    this.showEditModal = false;
    this.editingId = null;
    this.saveError = null;
    this.cdr.detectChanges();
  }

  initEditMap(): void {
    const mapContainer = document.getElementById('edit-map');
    if (!mapContainer) return;
    if (this.editMap) {
      this.editMap.remove();
      this.editMap = null;
      this.editMarker = null;
    }

    const defaultLat = this.form.latitude || 36.8065;
    const defaultLng = this.form.longitude || 10.1815; // Tunis default 

    this.editMap = L.map('edit-map').setView([defaultLat, defaultLng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.editMap);
    
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    if (this.form.latitude && this.form.longitude) {
      this.editMarker = L.marker([this.form.latitude, this.form.longitude]).addTo(this.editMap);
    }
    
    this.editMap.on('click', (e: L.LeafletMouseEvent) => {
      this.form.latitude = e.latlng.lat;
      this.form.longitude = e.latlng.lng;
      if (this.editMarker) {
        this.editMarker.setLatLng(e.latlng);
      } else {
        this.editMarker = L.marker(e.latlng).addTo(this.editMap!);
      }
      this.cdr.detectChanges();
    });
    
    setTimeout(() => { this.editMap?.invalidateSize(); }, 100);
  }

  searchLocation(): void {
    if (!this.searchQuery) return;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          this.form.latitude = lat;
          this.form.longitude = lon;
          this.form.location = data[0].display_name.split(',')[0]; 
          if (this.editMap) {
            this.editMap.setView([lat, lon], 14);
            if (this.editMarker) {
              this.editMarker.setLatLng([lat, lon]);
            } else {
              this.editMarker = L.marker([lat, lon]).addTo(this.editMap);
            }
          }
          this.cdr.detectChanges();
        } else {
            this.showToast('Location not found in map search', 'error');
        }
      })
      .catch(() => {
          this.showToast('Error searching location', 'error');
      });
  }

  submitEditModal(): void {
    if (!this.form.title?.trim() || !this.form.eventDate || !this.form.location?.trim() || !this.form.typeLabel?.trim() || !this.form.status || this.form.participants < 1) {
      this.saveError = 'Please fill all fields; participants must be at least 1.';
      this.cdr.detectChanges();
      return;
    }
    this.saveError = null;
    this.saving = true;
    this.cdr.detectChanges();
    
    const request$ = this.editingId != null
        ? this.eventService.updatePlatformEvent(this.editingId, this.form)
        : this.eventService.createPlatformEvent(this.form);

    request$.pipe(finalize(() => { this.saving = false; this.cdr.detectChanges(); }))
      .subscribe({
        next: () => {
          this.closeEditModal();
          this.reloadEvents();
        },
        error: () => {
          this.saveError = 'Could not save the event.';
          this.cdr.detectChanges();
        }
      });
  }

  getEventColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'upcoming':
        return '#3788d8';
      case 'ongoing':
        return '#f39c12';
      case 'completed':
        return '#27ae60';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  }
}