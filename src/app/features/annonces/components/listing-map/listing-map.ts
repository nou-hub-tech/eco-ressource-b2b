import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import * as L from 'leaflet';
import { ListingResponse } from '../../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-listing-map',
  standalone: false,
  templateUrl: './listing-map.html',
  styleUrls: ['./listing-map.css']
})
export class ListingMap implements AfterViewInit, OnChanges, OnDestroy {
  @Input() listings: ListingResponse[] = [];
  @Input() height = 320;
  @Output() listingSelected = new EventEmitter<number>();

  mapId = `listing-map-${Math.random().toString(36).slice(2)}`;
  private map: L.Map | null = null;
  private markers = L.layerGroup();

  get hasPoints(): boolean {
    return this.listings.some(
      (l) => typeof l.latitude === 'number' && typeof l.longitude === 'number'
    );
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.renderMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listings'] && this.map) {
      this.renderMarkers();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    this.map = L.map(this.mapId, {
      center: [34.0, 9.0],
      zoom: 6,
      scrollWheelZoom: false
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);
    this.markers.addTo(this.map);
  }

  private renderMarkers(): void {
    if (!this.map) return;
    this.markers.clearLayers();
    const points = this.listings.filter(
      (l) => typeof l.latitude === 'number' && typeof l.longitude === 'number'
    );
    for (const listing of points) {
      const marker = L.marker([listing.latitude!, listing.longitude!], {
        icon: L.divIcon({
          className: 'lm-marker',
          html: '<span></span>',
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        })
      })
        .bindPopup(`<strong>${this.escape(listing.title)}</strong><br>${this.escape(listing.location || '')}`)
        .on('click', () => this.listingSelected.emit(listing.id));
      this.markers.addLayer(marker);
    }
    if (points.length) {
      const bounds = L.latLngBounds(points.map((p) => [p.latitude!, p.longitude!] as [number, number]));
      this.map.fitBounds(bounds, { padding: [24, 24], maxZoom: 13 });
    }
    setTimeout(() => this.map?.invalidateSize(), 50);
  }

  private escape(value: string): string {
    return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c));
  }
}
