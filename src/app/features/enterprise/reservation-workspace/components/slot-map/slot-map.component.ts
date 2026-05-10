import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import * as L from 'leaflet';
import { ReservationSlot } from '../../reservation-workspace.models';

@Component({
  selector: 'app-slot-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot-map.component.html',
  styleUrl: './slot-map.component.scss'
})
export class SlotMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() slots: ReservationSlot[] = [];

  readonly mapId = `slot-map-${Math.random().toString(36).slice(2, 9)}`;
  private map?: L.Map;
  private layerGroup?: L.LayerGroup;

  ngAfterViewInit(): void {
    this.initMap();
    this.renderMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slots'] && this.map) {
      this.renderMarkers();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    this.map = L.map(this.mapId, {
      zoomControl: false,
      attributionControl: false
    }).setView([36.8065, 10.1815], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    this.layerGroup = L.layerGroup().addTo(this.map);
  }

  private renderMarkers(): void {
    if (!this.map || !this.layerGroup) {
      return;
    }

    this.layerGroup.clearLayers();

    this.slots.forEach((slot) => {
      const color =
        slot.status === 'peak'
          ? '#ef4444'
          : slot.status === 'maintenance'
            ? '#f97316'
            : slot.status === 'balanced'
              ? '#0284c7'
              : '#10b981';

      const marker = L.circleMarker(slot.coordinates, {
        radius: 10,
        color,
        fillColor: color,
        fillOpacity: 0.82,
        weight: 2
      });

      marker
        .bindPopup(
          `<strong>${slot.name}</strong><br/>${slot.city} · ${slot.zone}<br/>Owner: ${slot.ownerCompany}<br/>Occupancy: ${slot.utilizationRate}%<br/>Expected availability: ${slot.predictedAvailability}%`
        )
        .addTo(this.layerGroup!);
    });

    if (this.slots.length) {
      const bounds = L.latLngBounds(this.slots.map((slot) => slot.coordinates));
      this.map.fitBounds(bounds.pad(0.28));
    }
  }
}
