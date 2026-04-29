import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import {
  EventSearchRequest,
  PlatformEventDto,
  PlatformEventRequestPayload,
  EventDocumentDto
} from '../../core/services/admin-api.service';
import { AuthService } from '../../core/services/auth';
import { EventParticipationService } from '../../core/services/event-participation.service';
import { EventService } from '../../core/services/event';
import { GeolocationService } from '../../core/services/geolocation.service';
import { environment } from '../../../environments/environment';
import * as L from 'leaflet';
import html2canvas from 'html2canvas';

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
export class Events implements OnInit, OnDestroy {
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

  editMap: L.Map | null = null;
  editMarker: L.Marker | null = null;
  searchQuery: string = '';

  selectedFiles: File[] = [];
  existingDocuments: EventDocumentDto[] = [];
  documentsLoading = false;

  showNearbyEvents = false;
  radius = 50.0;
  nearbyLoading = false;
  geolocationError: string | null = null;
  readonly radiusOptions = [10, 25, 50, 100, 200];

  searchForm: EventSearchRequest = {
    searchTerm: '',
    statuses: [],
    dateFrom: '',
    dateTo: '',
    minParticipants: undefined,
    maxParticipants: undefined,
    sortBy: 'eventDate',
    sortDirection: 'asc',
    page: 0,
    size: 20
  };
  showSearch = false;

  searchLoading = false;
  searchError: string | null = null;
  totalElements = 0;
  totalPages = 0;
  readonly sortOptions = [
    { value: 'eventDate', label: 'Event Date' },
    { value: 'title', label: 'Title' },
    { value: 'participants', label: 'Participants' },
    { value: 'createdAt', label: 'Created Date' }
  ];
  readonly searchStatusOptions = ['upcoming', 'ongoing', 'done'];

  // Speech-to-text
  isListening = false;
  listenField: string = '';
  private recognition: any = null;

  // AI generation
  generatingDescription = false;

  // Facebook
  facebookConnected = false;
  publishingFacebook = false;
  posterEvent: PlatformEventDto | null = null;

  form: PlatformEventRequestPayload = Events.emptyForm();

  constructor(
    private readonly auth: AuthService,
    private readonly eventService: EventService,
    private readonly participationService: EventParticipationService,
    private readonly geolocationService: GeolocationService,
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
      latitude: undefined,
      longitude: undefined,
      participants: 0,
      status: 'UPCOMING',
      typeLabel: '',
      description: ''
    };
  }

  ngOnInit(): void {
    this.reloadEvents();
  }

  ngOnDestroy(): void {
    if (this.recognition) {
      this.recognition.abort();
      this.recognition = null;
    }
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
    this.searchQuery = '';
    this.saveError = null;
    this.selectedFiles = [];
    this.existingDocuments = [];
    this.documentsLoading = false;
    this.showModal = true;
    this.requestRender();
    setTimeout(() => this.initEditMap(), 50);
  }

  openEditModal(e: PlatformEventDto): void {
    this.editingId = e.id;
    const st = (e.status ?? '').toUpperCase();
    this.form = {
      title: e.title,
      eventDate: e.eventDate,
      location: e.location,
      latitude: e.latitude,
      longitude: e.longitude,
      participants: e.participants,
      status: this.statusOptions.includes(st as (typeof this.statusOptions)[number])
        ? st
        : 'UPCOMING',
      typeLabel: e.typeLabel,
      description: e.description || ''
    };
    this.searchQuery = '';
    this.saveError = null;
    this.selectedFiles = [];
    this.existingDocuments = [];
    this.loadEventDocuments(e.id);
    this.showModal = true;
    this.requestRender();
    setTimeout(() => this.initEditMap(), 50);
  }

  openDetailModal(e: PlatformEventDto): void {
    this.detailEvent = e;
    this.showDetailModal = true;
    this.existingDocuments = [];
    this.loadEventDocuments(e.id);
    this.requestRender();
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.detailEvent = null;
    this.requestRender();
  }

  closeModal(): void {
    if (this.editMap) {
      this.editMap.remove();
      this.editMap = null;
      this.editMarker = null;
    }
    this.stopListening();
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
      .subscribe({
        next: (savedEvent) => {
          if (this.selectedFiles.length > 0) {
             this.uploadPendingFiles(savedEvent.id);
          } else {
             this.saving = false;
             this.closeModal();
             this.reloadEvents();
             this.requestRender();
          }
        },
        error: () => {
          this.saving = false;
          this.saveError = 'Could not save the event.';
          this.requestRender();
        }
      });
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
    const defaultLng = this.form.longitude || 10.1815;

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
      this.requestRender();
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
          this.requestRender();
        } else {
            this.showToast('Location not found in map search', 'error');
        }
      })
      .catch(() => {
          this.showToast('Error searching location', 'error');
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

  loadNearbyEvents(): void {
    if (!this.geolocationService.isSupported()) {
      this.geolocationError = 'Geolocation is not supported by your browser';
      this.requestRender();
      return;
    }

    this.nearbyLoading = true;
    this.geolocationError = null;
    this.requestRender();

    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        if (position.latitude === 0 && position.longitude === 0) {
          this.geolocationError = 'Could not get your location';
          this.nearbyLoading = false;
          this.requestRender();
          return;
        }

        const userId = this.auth.currentUser?.id;
        const parts$ =
          !this.isAdmin && userId
            ? this.participationService.list(userId)
            : of([] as unknown[]);

        forkJoin({
          events: this.eventService.getNearbyEvents(position.latitude, position.longitude, this.radius),
          parts: parts$
        })
          .pipe(
            finalize(() => {
              this.nearbyLoading = false;
              this.requestRender();
            })
          )
          .subscribe({
            next: ({ events, parts }) => {
              this.displayRows = this.buildRows(
                events,
                parts as Array<Record<string, unknown>>
              );
              this.showNearbyEvents = true;
              this.requestRender();
            },
            error: () => {
              this.geolocationError = 'Unable to load nearby events.';
              this.requestRender();
            }
          });
      },
      error: () => {
        this.geolocationError = 'Unable to get your location. Please enable location services.';
        this.nearbyLoading = false;
        this.requestRender();
      }
    });
  }

  showAllEvents(): void {
    this.showNearbyEvents = false;
    this.geolocationError = null;
    this.reloadEvents();
  }

  formatDistance(distance?: number): string {
    if (distance == null) return '';
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    }
    return `${distance.toFixed(1)} km`;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.resetSearch();
      this.reloadEvents();
    }
  }

  resetSearch(): void {
    this.searchForm = {
      sortBy: 'eventDate',
      sortDirection: 'asc',
      page: 0,
      size: 20
    };
    this.searchError = null;
  }

  performSearch(): void {
    this.searchLoading = true;
    this.searchError = null;
    this.requestRender();

    const userId = this.auth.currentUser?.id;
    const parts$ =
      !this.isAdmin && userId
        ? this.participationService.list(userId)
        : of([] as unknown[]);

    forkJoin({
      search: this.eventService.searchEvents(this.searchForm),
      parts: parts$
    })
      .pipe(
        finalize(() => {
          this.searchLoading = false;
          this.requestRender();
        })
      )
      .subscribe({
        next: ({ search, parts }) => {
          this.displayRows = this.buildRows(
            search.content,
            parts as Array<Record<string, unknown>>
          );
          this.totalElements = search.totalElements;
          this.totalPages = search.totalPages;
          this.requestRender();
        },
        error: () => {
          this.searchError = 'Unable to search events.';
          this.requestRender();
        }
      });
  }

  onPageChange(page: number): void {
    this.searchForm.page = page;
    this.performSearch();
  }

  onSortChange(): void {
    this.searchForm.page = 0;
    this.performSearch();
  }

  loadEventDocuments(eventId: number): void {
    this.documentsLoading = true;
    this.requestRender();
    this.eventService.getEventDocuments(eventId).pipe(
      finalize(() => {
        this.documentsLoading = false;
        this.requestRender();
      })
    ).subscribe({
      next: (docs) => {
        this.existingDocuments = docs;
      },
      error: () => {
        this.showToast('Could not load event documents.', 'error');
      }
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
             this.showToast(`File ${file.name} exceeds 5MB limit.`, 'error');
             continue;
        }
        this.selectedFiles.push(file);
      }
    }
    this.requestRender();
    event.target.value = '';
  }

  removeSelectedFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.requestRender();
  }

  deleteDocument(docId: number): void {
    if (!confirm('Are you sure you want to delete this document?')) return;
    this.eventService.deleteEventDocument(docId).subscribe({
      next: () => {
        this.existingDocuments = this.existingDocuments.filter(d => d.id !== docId);
        this.showToast('Document deleted.', 'success');
        this.requestRender();
      },
      error: () => {
        this.showToast('Could not delete document.', 'error');
      }
    });
  }

  getDownloadUrl(docId: number): string {
    return `${environment.apiUrl}/platform-events/documents/${docId}/download`;
  }

  uploadPendingFiles(eventId: number): void {
    const uploads = this.selectedFiles.map(file => 
      this.eventService.uploadEventDocument(eventId, file).pipe(
        catchError(err => {
          console.error('Failed to upload', file.name, err);
          return of(null);
        })
      )
    );

    forkJoin(uploads).pipe(
      finalize(() => {
        this.saving = false;
        this.selectedFiles = [];
        this.closeModal();
        this.reloadEvents();
        this.requestRender();
      })
    ).subscribe({
      next: (results) => {
        const failures = results.filter((r: unknown) => r === null);
        if (failures.length > 0) {
          this.showToast(`${failures.length} file(s) failed to upload.`, 'error');
        } else {
          this.showToast('Event saved with all documents.', 'success');
        }
      }
    });
  }

  // ───────────────────────────────────────────────
  // Part 1: Google Calendar
  // ───────────────────────────────────────────────
  openGoogleCalendar(e: PlatformEventDto): void {
    const dateStr = (e.eventDate || '').replace(/-/g, '');
    const nextDay = this.getNextDay(e.eventDate);
    const title = encodeURIComponent(e.title || '');
    const location = encodeURIComponent(e.location || '');
    const details = encodeURIComponent(
      (e.description ? e.description + '\n\n' : '') +
      `Type: ${e.typeLabel || ''}\nParticipants: ${e.participants}\nStatus: ${e.status}`
    );
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${nextDay}&location=${location}&details=${details}`;
    window.open(url, '_blank');
  }

  private getNextDay(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}${m}${day}`;
  }

  // ───────────────────────────────────────────────
  // Part 2: Facebook (placeholder)
  // ───────────────────────────────────────────────
  publishToFacebook(e: PlatformEventDto): void {
    this.publishingFacebook = true;
    this.posterEvent = e;
    this.requestRender();

    setTimeout(() => {
      const element = document.getElementById('facebook-poster');
      if (!element) {
        this.publishingFacebook = false;
        this.posterEvent = null;
        this.showToast('Failed to find poster element.', 'error');
        this.requestRender();
        return;
      }

      html2canvas(element, { useCORS: true, scale: 2 }).then(canvas => {
        canvas.toBlob(blob => {
          if (!blob) {
            this.publishingFacebook = false;
            this.posterEvent = null;
            this.showToast('Failed to generate image blob.', 'error');
            this.requestRender();
            return;
          }

          this.eventService.publishToFacebook(e.id, blob).subscribe({
            next: () => {
              this.publishingFacebook = false;
              this.posterEvent = null;
              this.showToast('Event published to Facebook! 🎉', 'success');
              this.requestRender();
            },
            error: (err) => {
              this.publishingFacebook = false;
              this.posterEvent = null;
              this.showToast('Facebook publish failed: ' + (err.error || 'Unknown error'), 'error');
              this.requestRender();
            }
          });
        }, 'image/png');
      }).catch(err => {
        this.publishingFacebook = false;
        this.posterEvent = null;
        this.showToast('Failed to generate poster: ' + err.message, 'error');
        this.requestRender();
      });
    }, 150);
  }

  // ───────────────────────────────────────────────
  // Part 4A: Speech-to-Text
  // ───────────────────────────────────────────────
  toggleSpeechToText(field: string): void {
    if (this.isListening && this.listenField === field) {
      this.stopListening();
      return;
    }
    this.stopListening();
    this.startListening(field);
  }

  private startListening(field: string): void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.showToast('Speech recognition not supported in this browser.', 'error');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      if (transcript) {
        const current = (this.form as any)[field] || '';
        (this.form as any)[field] = current + (current ? ' ' : '') + transcript;
        this.requestRender();
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'aborted') {
        this.showToast('Speech recognition error: ' + event.error, 'error');
      }
      this.isListening = false;
      this.listenField = '';
      this.requestRender();
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.listenField = '';
      this.requestRender();
    };

    this.recognition.start();
    this.isListening = true;
    this.listenField = field;
    this.requestRender();
  }

  private stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
    this.isListening = false;
    this.listenField = '';
    this.requestRender();
  }

  // ───────────────────────────────────────────────
  // Part 4B: AI Description Generation (Groq)
  // ───────────────────────────────────────────────
generateDescription(): void {
  this.generatingDescription = true;
  this.requestRender();

  this.eventService.generateDescription({
    title:              this.form.title       || '',
    typeLabel:          this.form.typeLabel   || '',
    location:           this.form.location    || '',
    eventDate:          this.form.eventDate   || '',
    currentDescription: this.form.description || ''
  }).pipe(
    finalize(() => {
      this.generatingDescription = false;
      this.requestRender();
    })
  ).subscribe({
    next: ({ description }) => {
      if (description) {
        this.form.description = description;
        this.showToast('Description generated successfully!', 'success');
      } else {
        this.showToast('AI returned an empty response.', 'error');
      }
    },
    error: () => {
      this.showToast('Failed to generate description.', 'error');
    }
  });
}
}
