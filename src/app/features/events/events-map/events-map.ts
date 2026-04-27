import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  PlatformEventDto
} from '../../../core/services/admin-api.service';
import { AuthService } from '../../../core/services/auth';
import { EventParticipationService } from '../../../core/services/event-participation.service';
import { EventService } from '../../../core/services/event';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { ThemeService } from '../../../core/services/theme';
import * as L from 'leaflet';

type EventRow = PlatformEventDto & {
  isJoined: boolean;
  participationId?: number;
};

@Component({
  selector: 'app-events-map',
  standalone: false,
  templateUrl: './events-map.html',
  styleUrls: ['./events-map.css'],
  host: {
    '[class.map-light-mode]': '!isDark',
    '[class.map-dark-mode]': 'isDark'
  }
})
export class EventsMapComponent implements OnInit, OnDestroy {
  events: EventRow[] = [];
  loading = true;
  selectedEventId: number | null = null;
  actionBusyForId: number | null = null;

  private map: L.Map | null = null;
  private markers = new Map<number, L.Marker>();
  private tileLayer: L.TileLayer | null = null;
  private themeSub: Subscription | null = null;
  private userLat = 36.8065;
  private userLng = 10.1815;
  isDark = false;

  constructor(
    private readonly auth: AuthService,
    private readonly eventService: EventService,
    private readonly participationService: EventParticipationService,
    private readonly geolocationService: GeolocationService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly themeService: ThemeService
  ) {}

  get isAdmin(): boolean {
    return this.auth.currentUser?.role === 'admin';
  }

  get totalEvents(): number {
    return this.events.length;
  }

  get joinedEvents(): number {
    return this.events.filter(e => e.isJoined).length;
  }

  get upcomingEvents(): number {
    return this.events.filter(e => (e.status ?? '').toUpperCase() === 'UPCOMING').length;
  }

  get ongoingEvents(): number {
    return this.events.filter(e => (e.status ?? '').toUpperCase() === 'ONGOING').length;
  }

  get mappableEvents(): number {
    return this.events.filter(e => e.latitude != null && e.longitude != null).length;
  }

  ngOnInit(): void {
    this.isDark = this.themeService.isDark;
    this.themeSub = this.themeService.isDark$.subscribe(dark => {
      this.isDark = dark;
      this.swapTileLayer();
    });
    this.getUserLocationThenLoad();
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  goBack(): void {
    const base = this.isAdmin ? '/admin/events' : '/enterprise/events';
    this.router.navigate([base]);
  }

  selectEvent(event: EventRow): void {
    this.selectedEventId = event.id;
    const marker = this.markers.get(event.id);
    if (marker && this.map) {
      this.map.flyTo(marker.getLatLng(), 15, { duration: 1.2 });
      marker.openPopup();
    }
    this.cdr.markForCheck();
  }

  statusClass(status: string): string {
    const s = (status ?? '').toUpperCase();
    if (s === 'UPCOMING') return 'status-upcoming';
    if (s === 'ONGOING') return 'status-ongoing';
    if (s === 'DONE') return 'status-done';
    return 'status-default';
  }

  // ── Private helpers ──────────────────────────────

  private getUserLocationThenLoad(): void {
    if (this.geolocationService.isSupported()) {
      this.geolocationService.getCurrentPosition().subscribe({
        next: pos => {
          if (pos.latitude !== 0 || pos.longitude !== 0) {
            this.userLat = pos.latitude;
            this.userLng = pos.longitude;
          }
          this.loadEvents();
        },
        error: () => this.loadEvents()
      });
    } else {
      this.loadEvents();
    }
  }

  private loadEvents(): void {
    this.loading = true;
    this.cdr.markForCheck();

    const userId = this.auth.currentUser?.id;
    const parts$ =
      !this.isAdmin && userId
        ? this.participationService.list(userId)
        : of([] as unknown[]);

    forkJoin({
      events: this.eventService.getPlatformEvents(),
      parts: parts$
    })
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: ({ events, parts }) => {
          this.events = this.buildRows(events, parts as Array<Record<string, unknown>>);
          this.cdr.markForCheck();
          setTimeout(() => this.initMap(), 50);
        },
        error: () => {
          this.events = [];
          this.cdr.markForCheck();
        }
      });
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
    return platformEvents.map(pe => ({
      ...pe,
      isJoined: byEventId.has(pe.id),
      participationId: byEventId.get(pe.id)
    }));
  }

  // ── Map ──────────────────────────────────────────

  private initMap(): void {
    const container = document.getElementById('events-map-canvas');
    if (!container) return;
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.markers.clear();
    }

    this.map = L.map('events-map-canvas', {
      zoomControl: false
    }).setView([this.userLat, this.userLng], 11);

    // Zoom control top-right
    L.control.zoom({ position: 'topright' }).addTo(this.map);

    // Tile layer based on current theme
    this.tileLayer = this.createTileLayer(this.isDark);
    this.tileLayer.addTo(this.map);

    // User location marker
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: '<div class="user-dot"><div class="user-dot-pulse"></div></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    L.marker([this.userLat, this.userLng], { icon: userIcon })
      .addTo(this.map)
      .bindPopup('<div style="font-size:12px;font-weight:600;color:#333;">📍 Your location</div>');

    // Event markers
    for (const event of this.events) {
      if (event.latitude == null || event.longitude == null) continue;
      this.addEventMarker(event);
    }

    setTimeout(() => this.map?.invalidateSize(), 200);
  }

  private createTileLayer(dark: boolean): L.TileLayer {
    const url = dark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    return L.tileLayer(url, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });
  }

  private swapTileLayer(): void {
    if (!this.map) return;
    if (this.tileLayer) {
      this.map.removeLayer(this.tileLayer);
    }
    this.tileLayer = this.createTileLayer(this.isDark);
    this.tileLayer.addTo(this.map);
  }

  private addEventMarker(event: EventRow): void {
    if (!this.map || event.latitude == null || event.longitude == null) return;

    const statusColor = this.markerColor(event.status);
    const icon = L.divIcon({
      className: 'event-marker-icon',
      html: `<div class="marker-dot" style="background:${statusColor};box-shadow:0 0 12px ${statusColor}80;">
               <div class="marker-dot-inner"></div>
             </div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -14]
    });

    const marker = L.marker([event.latitude, event.longitude], { icon })
      .addTo(this.map);

    marker.bindPopup(() => this.buildPopupContent(event), {
      maxWidth: 280,
      minWidth: 220,
      className: 'event-popup'
    });

    marker.on('popupopen', () => {
      this.selectedEventId = event.id;
      this.cdr.markForCheck();
      this.attachPopupListeners(event);
    });

    this.markers.set(event.id, marker);
  }

  private markerColor(status: string): string {
    const s = (status ?? '').toUpperCase();
    if (s === 'UPCOMING') return '#60a5fa';
    if (s === 'ONGOING') return '#34d399';
    if (s === 'DONE') return '#94a3b8';
    if (s === 'CANCELLED') return '#f87171';
    return '#a78bfa';
  }

  private buildPopupContent(event: EventRow): string {
    const st = (event.status ?? '').toUpperCase();
    const statusLabel = st || 'UNKNOWN';
    const statusCls = st === 'UPCOMING' ? 'popup-badge-upcoming'
                    : st === 'ONGOING' ? 'popup-badge-ongoing'
                    : st === 'DONE' ? 'popup-badge-done'
                    : 'popup-badge-default';

    const dateStr = event.eventDate
      ? new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';

    const isTerminal = st === 'DONE' || st === 'CANCELLED';
    let actionBtn = '';
    if (!this.isAdmin && !isTerminal) {
      if (event.isJoined && event.participationId != null) {
        actionBtn = `<button id="popup-action-${event.id}" class="popup-btn popup-btn-leave"
                       ${this.actionBusyForId === event.id ? 'disabled' : ''}>
                       ${this.actionBusyForId === event.id ? '…' : 'Cancel participation'}
                     </button>`;
      } else if (!event.isJoined) {
        actionBtn = `<button id="popup-action-${event.id}" class="popup-btn popup-btn-join"
                       ${this.actionBusyForId === event.id ? 'disabled' : ''}>
                       ${this.actionBusyForId === event.id ? '…' : 'Join Event'}
                     </button>`;
      }
    }

    return `
      <div class="popup-card">
        <div class="popup-header">
          <span class="popup-badge ${statusCls}">${statusLabel}</span>
          <span class="popup-type">${event.typeLabel || ''}</span>
        </div>
        <h4 class="popup-title">${event.title}</h4>
        ${event.description
          ? `<p class="popup-desc">${event.description.length > 100
              ? event.description.substring(0, 100) + '…'
              : event.description}</p>`
          : ''}
        <div class="popup-meta">
          <span>📅 ${dateStr}</span>
          <span>📍 ${event.location || ''}</span>
          <span>👥 ${event.participants} participants</span>
        </div>
        ${actionBtn}
      </div>
    `;
  }

  private attachPopupListeners(event: EventRow): void {
    setTimeout(() => {
      const btn = document.getElementById(`popup-action-${event.id}`);
      if (!btn) return;

      btn.onclick = () => {
        if (this.actionBusyForId != null) return;

        if (event.isJoined && event.participationId != null) {
          this.leaveFromPopup(event);
        } else {
          this.joinFromPopup(event);
        }
      };
    }, 50);
  }

  private joinFromPopup(event: EventRow): void {
    const uid = Number(this.auth.currentUser?.id);
    if (!Number.isFinite(uid) || uid <= 0) return;

    this.actionBusyForId = event.id;
    this.refreshPopup(event);
    this.cdr.markForCheck();

    this.participationService
      .create({ userId: uid, platformEventId: event.id })
      .pipe(finalize(() => {
        this.actionBusyForId = null;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (result: any) => {
          event.isJoined = true;
          event.participationId = result?.id;
          this.refreshPopup(event);
          this.cdr.markForCheck();
        },
        error: () => {
          this.refreshPopup(event);
          this.cdr.markForCheck();
        }
      });
  }

  private leaveFromPopup(event: EventRow): void {
    if (event.participationId == null) return;

    this.actionBusyForId = event.id;
    this.refreshPopup(event);
    this.cdr.markForCheck();

    this.participationService
      .delete(event.participationId)
      .pipe(finalize(() => {
        this.actionBusyForId = null;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: () => {
          event.isJoined = false;
          event.participationId = undefined;
          this.refreshPopup(event);
          this.cdr.markForCheck();
        },
        error: () => {
          this.refreshPopup(event);
          this.cdr.markForCheck();
        }
      });
  }

  private refreshPopup(event: EventRow): void {
    const marker = this.markers.get(event.id);
    if (!marker) return;
    const popup = marker.getPopup();
    if (popup && popup.isOpen()) {
      popup.setContent(this.buildPopupContent(event));
      this.attachPopupListeners(event);
    }
  }
}
