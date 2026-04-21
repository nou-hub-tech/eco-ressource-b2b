import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  
  getCurrentPosition(): Observable<GeolocationPosition> {
    if (!navigator.geolocation) {
      return of({ latitude: 0, longitude: 0 });
    }

    return new Observable<GeolocationPosition>(observer => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          observer.complete();
        },
        (error) => {
          observer.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    }).pipe(
      catchError(error => {
        console.warn('Geolocation error:', error);
        return of({ latitude: 0, longitude: 0 });
      })
    );
  }

  isSupported(): boolean {
    return 'geolocation' in navigator;
  }
}
