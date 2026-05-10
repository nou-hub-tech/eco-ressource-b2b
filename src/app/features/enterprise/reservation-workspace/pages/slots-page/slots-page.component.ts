import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexXAxis
} from 'ng-apexcharts';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import { HeatmapComponent } from '../../components/heatmap/heatmap.component';
import { SlotMapComponent } from '../../components/slot-map/slot-map.component';
import {
  CURRENT_ENTERPRISE_NAME,
  HEATMAP_DAYS,
  InsightCard,
  ReservationSlot,
  ReservationSlotDraft,
  SLOT_IMAGE_LIMIT,
  SlotPortfolio,
  SlotStatus
} from '../../reservation-workspace.models';
import { ReservationWorkspaceService } from '../../services/reservation-workspace.service';

@Component({
  selector: 'app-slots-page',
  standalone: true,
  imports: [
    ChartCardComponent,
    CommonModule,
    FormsModule,
    HeatmapComponent,
    ReactiveFormsModule,
    SlotMapComponent
  ],
  templateUrl: './slots-page.component.html',
  styleUrl: './slots-page.component.scss'
})
export class SlotsPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly enterpriseName = CURRENT_ENTERPRISE_NAME;
  readonly editorForm = this.fb.group({
    name: ['', Validators.required],
    zone: ['', Validators.required],
    city: ['Tunis', Validators.required],
    ownerCompany: [CURRENT_ENTERPRISE_NAME, Validators.required],
    portfolio: ['owned' as SlotPortfolio, Validators.required],
    type: ['Storage' as ReservationSlot['type'], Validators.required],
    latitude: [36.8065, Validators.required],
    longitude: [10.1815, Validators.required],
    capacity: [12, [Validators.required, Validators.min(1)]],
    occupied: [4, [Validators.required, Validators.min(0)]],
    status: ['available' as SlotStatus, Validators.required],
    equipment: ['']
  });
  readonly slotImageLimit = SLOT_IMAGE_LIMIT;

  slots: ReservationSlot[] = [];
  insights: InsightCard[] = [];
  selectedSlotId = '';
  selectedSlotImageIndex = 0;
  search = '';
  filter: 'all' | SlotStatus = 'all';
  portfolioFilter: 'all' | SlotPortfolio = 'all';
  utilizationView: 'all' | SlotPortfolio = 'all';
  forecastMode: 'occupancy' | 'free' = 'occupancy';
  availabilityView: 'selected' | 'network' = 'selected';
  editorMode: 'create' | 'edit' | null = null;
  viewModalOpen = false;
  deleteArmedId = '';
  editorErrorMessage = '';
  imageUploadErrorMessage = '';
  uploadingImages = false;
  editorImages: string[] = [];
  private utilizationChartSlots: ReservationSlot[] = [];

  utilizationSeries: ApexAxisChartSeries = [{ name: 'Occupancy', data: [] }];
  utilizationChart: ApexChart = {
    type: 'bar',
    height: 280,
    toolbar: { show: false }
  };
  utilizationXAxis: ApexXAxis = { categories: [] };

  forecastSeries: ApexAxisChartSeries = [{ name: 'Expected occupancy', data: [] }];
  forecastChart: ApexChart = {
    type: 'line',
    height: 280,
    toolbar: { show: false }
  };
  forecastXAxis: ApexXAxis = { categories: HEATMAP_DAYS };

  availabilitySeries: ApexNonAxisChartSeries = [0, 0];
  availabilityChart: ApexChart = {
    type: 'donut',
    height: 280,
    toolbar: { show: false }
  };

  constructor(private readonly workspaceService: ReservationWorkspaceService) {
    this.workspaceService.slots$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((slots) => {
        this.slots = slots;
        if (!this.selectedSlotId || !slots.some((item) => item.id === this.selectedSlotId)) {
          this.selectedSlotId = slots[0]?.id ?? '';
        }
        this.selectedSlotImageIndex = Math.min(
          this.selectedSlotImageIndex,
          Math.max(this.selectedSlotGallery.length - 1, 0)
        );
        this.syncCharts();
      });

    this.workspaceService.slotInsights$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((insights) => (this.insights = insights));

    this.editorForm
      .get('portfolio')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((portfolio) => {
        if (this.editorMode === 'create' && portfolio === 'owned') {
          this.editorForm.patchValue({ ownerCompany: CURRENT_ENTERPRISE_NAME }, { emitEvent: false });
        }
      });
  }

  get filteredSlots(): ReservationSlot[] {
    const query = this.search.trim().toLowerCase();
    return this.slots.filter((slot) => {
      const statusMatches = this.filter === 'all' || slot.status === this.filter;
      const portfolioMatches =
        this.portfolioFilter === 'all' || slot.portfolio === this.portfolioFilter;
      const queryMatches =
        !query ||
        slot.name.toLowerCase().includes(query) ||
        slot.zone.toLowerCase().includes(query) ||
        slot.type.toLowerCase().includes(query) ||
        slot.city.toLowerCase().includes(query) ||
        slot.ownerCompany.toLowerCase().includes(query);
      return statusMatches && portfolioMatches && queryMatches;
    });
  }

  get selectedSlot(): ReservationSlot | undefined {
    return this.slots.find((slot) => slot.id === this.selectedSlotId);
  }

  get selectedSlotGallery(): string[] {
    return this.selectedSlot ? this.workspaceService.resolveSlotGallery(this.selectedSlot) : [];
  }

  get selectedSlotImage(): string {
    return this.selectedSlotGallery[this.selectedSlotImageIndex] ?? this.selectedSlotGallery[0] ?? '';
  }

  get ownedCount(): number {
    return this.slots.filter((slot) => slot.portfolio === 'owned').length;
  }

  get partnerCount(): number {
    return this.slots.filter((slot) => slot.portfolio === 'partner').length;
  }

  get openCapacity(): number {
    return this.slots.reduce((sum, slot) => sum + Math.max(slot.capacity - slot.occupied, 0), 0);
  }

  get utilizationBadge(): string {
    if (this.utilizationView === 'owned') {
      return 'Your offer';
    }

    if (this.utilizationView === 'partner') {
      return 'Partner sites';
    }

    return 'Load view';
  }

  get forecastBadge(): string {
    return this.forecastMode === 'occupancy' ? 'Forecast' : 'Free capacity';
  }

  get availabilityBadge(): string {
    return this.availabilityView === 'selected' ? 'Selected space' : 'Network view';
  }

  get showSlotModal(): boolean {
    return this.viewModalOpen || this.editorMode !== null;
  }

  get showDeleteModal(): boolean {
    return Boolean(this.deleteArmedId && this.selectedSlot?.id === this.deleteArmedId);
  }

  selectSlot(id: string): void {
    this.selectedSlotId = id;
    this.selectedSlotImageIndex = 0;
    this.editorMode = null;
    this.deleteArmedId = '';
    this.imageUploadErrorMessage = '';
    this.editorImages = [];
    this.syncCharts();
  }

  setUtilizationView(view: 'all' | SlotPortfolio): void {
    this.utilizationView = view;
    this.syncCharts();
  }

  setForecastMode(mode: 'occupancy' | 'free'): void {
    this.forecastMode = mode;
    this.syncCharts();
  }

  setAvailabilityView(view: 'selected' | 'network'): void {
    this.availabilityView = view;
    this.syncCharts();
  }

  onUtilizationChartSelect(event: {
    dataPointIndex: number;
  }): void {
    const slot = this.utilizationChartSlots[event.dataPointIndex];
    if (slot) {
      this.selectSlot(slot.id);
    }
  }

  startCreateSlot(): void {
    this.editorMode = 'create';
    this.viewModalOpen = false;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
    this.imageUploadErrorMessage = '';
    this.editorImages = [];
    this.editorForm.reset({
      name: '',
      zone: '',
      city: 'Tunis',
      ownerCompany: CURRENT_ENTERPRISE_NAME,
      portfolio: 'owned',
      type: 'Storage',
      latitude: 36.8065,
      longitude: 10.1815,
      capacity: 12,
      occupied: 4,
      status: 'available',
      equipment: ''
    });
  }

  startEditSlot(slot: ReservationSlot): void {
    this.selectedSlotId = slot.id;
    this.selectedSlotImageIndex = 0;
    this.editorMode = 'edit';
    this.viewModalOpen = false;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
    this.imageUploadErrorMessage = '';
    this.editorImages = [...slot.images];
    this.editorForm.reset({
      name: slot.name,
      zone: slot.zone,
      city: slot.city,
      ownerCompany: slot.ownerCompany,
      portfolio: slot.portfolio,
      type: slot.type,
      latitude: slot.coordinates[0],
      longitude: slot.coordinates[1],
      capacity: slot.capacity,
      occupied: slot.occupied,
      status: slot.status,
      equipment: slot.equipment.join(', ')
    });
  }

  saveSlot(): void {
    if (this.editorForm.invalid) {
      this.editorForm.markAllAsTouched();
      this.editorErrorMessage = 'Complete the required space fields before saving.';
      return;
    }

    const draft = this.buildDraftFromForm();
    if (this.editorMode === 'edit' && this.selectedSlot) {
      this.workspaceService.updateSlot(this.selectedSlot.id, draft);
    } else {
      this.workspaceService.createSlot(draft);
    }

    this.editorErrorMessage = '';
    this.imageUploadErrorMessage = '';
    this.editorImages = [];
    this.editorMode = null;
  }

  cancelEditor(): void {
    this.editorErrorMessage = '';
    this.imageUploadErrorMessage = '';
    this.editorImages = [];
    this.editorMode = null;
    this.viewModalOpen = false;
  }

  requestDeleteSlot(slot: ReservationSlot): void {
    this.selectedSlotId = slot.id;
    this.deleteArmedId = slot.id;
    this.viewModalOpen = false;
  }

  closeDeleteModal(): void {
    this.deleteArmedId = '';
  }

  deleteSlot(slotId: string): void {
    this.workspaceService.deleteSlot(slotId);
    this.deleteArmedId = '';
    this.editorMode = null;
    this.viewModalOpen = false;
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
    return slot.portfolio === 'owned' ? 'Our offer' : 'Partner site';
  }

  availabilityBreakdown(slot: ReservationSlot): string {
    return `${slot.predictedAvailability}% free | ${slot.utilizationRate}% in use`;
  }

  occupancyWidth(slot: ReservationSlot): string {
    return `${slot.utilizationRate}%`;
  }

  galleryImagesFor(slot: ReservationSlot): string[] {
    return this.workspaceService.resolveSlotGallery(slot);
  }

  coverImageFor(slot: ReservationSlot): string {
    return this.galleryImagesFor(slot)[0] ?? '';
  }

  imageCountLabel(slot: ReservationSlot): string {
    const galleryCount = this.galleryImagesFor(slot).length;
    if (slot.images.length) {
      return `${slot.images.length} uploaded photo${slot.images.length > 1 ? 's' : ''}`;
    }
    return `${galleryCount} sample photo${galleryCount > 1 ? 's' : ''}`;
  }

  galleryBadgeLabel(slot: ReservationSlot): string {
    const galleryCount = this.selectedSlotGallery.length || this.galleryImagesFor(slot).length;
    if (slot.images.length) {
      return `${slot.images.length} uploaded`;
    }
    return `${galleryCount} sample photo${galleryCount > 1 ? 's' : ''}`;
  }

  selectSlotImage(index: number): void {
    this.selectedSlotImageIndex = index;
  }

  showPreviousSlotImage(): void {
    if (!this.selectedSlotGallery.length) {
      return;
    }

    this.selectedSlotImageIndex =
      (this.selectedSlotImageIndex - 1 + this.selectedSlotGallery.length) %
      this.selectedSlotGallery.length;
  }

  showNextSlotImage(): void {
    if (!this.selectedSlotGallery.length) {
      return;
    }

    this.selectedSlotImageIndex =
      (this.selectedSlotImageIndex + 1) % this.selectedSlotGallery.length;
  }

  onSlotImageFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const files = Array.from(input?.files ?? []);
    if (!files.length) {
      return;
    }

    const remaining = this.slotImageLimit - this.editorImages.length;
    if (remaining <= 0) {
      this.imageUploadErrorMessage = `You can keep up to ${this.slotImageLimit} space pictures.`;
      if (input) {
        input.value = '';
      }
      return;
    }

    const acceptedFiles = files.slice(0, remaining);
    if (acceptedFiles.length < files.length) {
      this.imageUploadErrorMessage = `Only the first ${remaining} file(s) were kept to stay within the picture limit.`;
    } else {
      this.imageUploadErrorMessage = '';
    }

    this.uploadingImages = true;
    forkJoin(acceptedFiles.map((file) => this.workspaceService.uploadSlotImage(file)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (images) => {
          this.editorImages = [...this.editorImages, ...images].slice(0, this.slotImageLimit);
        },
        error: () => {
          this.uploadingImages = false;
          this.imageUploadErrorMessage = 'The selected pictures could not be added right now.';
          if (input) {
            input.value = '';
          }
        },
        complete: () => {
          this.uploadingImages = false;
          if (input) {
            input.value = '';
          }
        }
      });
  }

  removeEditorImage(index: number): void {
    this.editorImages = this.editorImages.filter((_, imageIndex) => imageIndex !== index);
    this.imageUploadErrorMessage = '';
  }

  openSlotDetails(slot: ReservationSlot): void {
    this.selectedSlotId = slot.id;
    this.selectedSlotImageIndex = 0;
    this.editorMode = null;
    this.deleteArmedId = '';
    this.viewModalOpen = true;
  }

  closeSlotModal(): void {
    this.viewModalOpen = false;
    this.editorMode = null;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
    this.imageUploadErrorMessage = '';
  }

  private buildDraftFromForm(): ReservationSlotDraft {
    const value = this.editorForm.getRawValue();
    return {
      name: value.name ?? '',
      zone: value.zone ?? '',
      city: value.city ?? '',
      ownerCompany: value.ownerCompany ?? '',
      portfolio: value.portfolio as SlotPortfolio,
      type: value.type as ReservationSlot['type'],
      coordinates: [Number(value.latitude ?? 0), Number(value.longitude ?? 0)],
      capacity: Number(value.capacity ?? 0),
      occupied: Number(value.occupied ?? 0),
      status: value.status as SlotStatus,
      equipment: (value.equipment ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      images: [...this.editorImages]
    };
  }

  private syncCharts(): void {
    const utilizationSource =
      this.utilizationView === 'all'
        ? this.slots
        : this.slots.filter((slot) => slot.portfolio === this.utilizationView);
    this.utilizationChartSlots = utilizationSource;
    this.utilizationSeries = [
      {
        name: 'Occupancy',
        data: utilizationSource.map((slot) => slot.utilizationRate)
      }
    ];
    this.utilizationXAxis = {
      categories: utilizationSource.map((slot) => slot.name.replace(' ', '\n'))
    };

    const selected = this.selectedSlot;
    if (!selected) {
      this.forecastSeries = [{ name: 'Expected occupancy', data: [] }];
      this.availabilitySeries = this.availabilityView === 'network'
        ? this.buildNetworkAvailability(utilizationSource)
        : [0, 0];
      return;
    }

    this.forecastSeries = [
      {
        name: this.forecastMode === 'occupancy' ? 'Expected occupancy' : 'Expected free capacity',
        data:
          this.forecastMode === 'occupancy'
            ? selected.forecast
            : selected.forecast.map((value) => Math.max(0, 100 - value))
      }
    ];
    this.availabilitySeries =
      this.availabilityView === 'selected'
        ? [selected.predictedAvailability, 100 - selected.predictedAvailability]
        : this.buildNetworkAvailability(utilizationSource);
  }

  private buildNetworkAvailability(slots: ReservationSlot[]): [number, number] {
    if (!slots.length) {
      return [0, 0];
    }

    const totalCapacity = slots.reduce((sum, slot) => sum + slot.capacity, 0);
    const totalOccupied = slots.reduce((sum, slot) => sum + slot.occupied, 0);
    const freeShare = totalCapacity
      ? Math.round((Math.max(totalCapacity - totalOccupied, 0) / totalCapacity) * 100)
      : 0;
    return [freeShare, Math.max(0, 100 - freeShare)];
  }
}
