import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QrCodeService {

    constructor() { }

    generateQrData(orderId: number): string {
        const baseUrl = environment.qrCodeBaseUrl || window.location.origin;
        return `${baseUrl.replace(/\/$/, '')}/api/delivery-orders/update-by-qr/${orderId}`;
    }
}
