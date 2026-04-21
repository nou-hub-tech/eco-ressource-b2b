import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DistanceService {
    
    constructor(private http: HttpClient) {}
    
    // Calculer la distance entre deux points (formule Haversine)
    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Rayon de la Terre en km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return Math.round(distance * 10) / 10;
    }
    
    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
    
    // Obtenir l'adresse à partir des coordonnées (reverse geocoding)
    getAddressFromCoords(lat: number, lng: number): Observable<any> {
        return this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
    }
    
    // Obtenir les coordonnées à partir d'une adresse
    getCoordsFromAddress(address: string): Observable<any> {
        return this.http.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    }
}