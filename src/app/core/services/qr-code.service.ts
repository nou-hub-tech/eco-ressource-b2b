import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QrCodeService {

    constructor() { }

    generateQrData(orderId: number): string {
                    return `http://192.168.1.181:8080/api/delivery-orders/update-by-qr/${orderId}`;
    }
}