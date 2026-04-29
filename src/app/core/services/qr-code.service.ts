import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QrCodeService {

    constructor() { }

    generateQrData(orderId: number): string {
        
        return `https://exes-unreal-movable.ngrok-free.dev/api/delivery-orders/update-by-qr/${orderId}`;
    }
}