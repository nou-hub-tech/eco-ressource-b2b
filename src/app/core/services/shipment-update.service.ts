// core/services/shipment-update.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ShipmentUpdateEvent {
    type: 'NEW_SHIPMENT' | 'SHIPMENT_UPDATED' | 'SHIPMENT_COMPLETED' | 'PROBLEME_LIVRAISON' | 'ACCEPTATION_LIVRAISON';
    shipment?: any;
    shipmentId?: number;
    transporterId?: number;
    transporterName?: string;
    deliveryOrderId?: number;
    clientName?: string;
    message?: string;
    problemeType?: string;
    retardMinutes?: number;
    timestamp?: Date;
}

@Injectable({ providedIn: 'root' })
export class ShipmentUpdateService {
    private shipmentUpdatedSource = new Subject<ShipmentUpdateEvent>();
    shipmentUpdated$ = this.shipmentUpdatedSource.asObservable();

    notifyShipmentUpdate(event: ShipmentUpdateEvent): void {
        console.log('📡 Notification envoyée:', event);
        this.shipmentUpdatedSource.next(event);
    }
}