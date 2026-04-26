// core/services/shipment-update.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShipmentUpdateService {
    private shipmentUpdatedSource = new Subject<any>();
    shipmentUpdated$ = this.shipmentUpdatedSource.asObservable();

    notifyShipmentUpdate(data: any): void {
        console.log('🔔 Notification de mise à jour des expéditions:', data);
        this.shipmentUpdatedSource.next(data);
    }
}