import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QrCodeService {

    constructor() { }

    generateQrData(orderId: number): string {
        return `http://localhost:8080/api/delivery-orders/update-by-qr/${orderId}`;
    }
}