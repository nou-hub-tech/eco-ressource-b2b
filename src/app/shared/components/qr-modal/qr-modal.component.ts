import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeService } from '../../../core/services/qr-code.service';

declare var QRCode: any;

@Component({
    selector: 'app-qr-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './qr-modal.component.html',
    styleUrls: ['./qr-modal.component.css']
})
export class QrModalComponent implements AfterViewInit {
    @Input() order: any;
    @ViewChild('qrcode') qrcodeElement!: ElementRef;
    
    isLoading = true;
    errorMessage = '';
    showModal = false;

    constructor(private qrCodeService: QrCodeService) {}

    ngAfterViewInit(): void {
        if (this.order) {
            setTimeout(() => this.generateQRCode(), 100);
        }
    }

    open(order: any): void {
        this.order = order;
        this.showModal = true;
        this.isLoading = true;
        setTimeout(() => this.generateQRCode(), 100);
    }

    close(): void {
        this.showModal = false;
        this.isLoading = true;
    }

    generateQRCode(): void {
        try {
            if (this.qrcodeElement?.nativeElement) {
                this.qrcodeElement.nativeElement.innerHTML = '';
                
                const qrData = this.qrCodeService.generateQrData(this.order.idDelivery);
                
                new QRCode(this.qrcodeElement.nativeElement, {
                    text: qrData,
                    width: 200,
                    height: 200,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                this.isLoading = false;
            }
        } catch (error) {
            console.error('Erreur:', error);
            this.errorMessage = 'Erreur lors de la génération du QR code';
            this.isLoading = false;
        }
    }

    downloadQRCode(): void {
        const canvas = this.qrcodeElement?.nativeElement?.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `commande_${this.order.idDelivery}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    }

    printQRCode(): void {
        const canvas = this.qrcodeElement?.nativeElement?.querySelector('canvas');
        if (canvas) {
            const win = window.open();
            win?.document.write(`
                <html>
                    <head><title>QR Code Commande #${this.order.idDelivery}</title>
                    <style>
                        body { font-family: Arial; text-align: center; padding: 20px; }
                        .info { background: #f5f5f5; padding: 10px; margin: 20px 0; }
                    </style>
                    </head>
                    <body>
                        <h1>QR Code - Commande #${this.order.idDelivery}</h1>
                        <div class="info">
                            <p><strong>Client:</strong> ${this.order.nomClient}</p>
                            <p><strong>Adresse:</strong> ${this.order.adresseLivraison}</p>
                        </div>
                        <img src="${canvas.toDataURL()}" />
                        <p>Scannez ce QR code pour valider la livraison</p>
                    </body>
                </html>
            `);
            win?.document.close();
            win?.print();
        }
    }

    getStatutClass(statut: string): string {
        switch(statut) {
            case 'EN_ATTENTE': return 'badge bg-warning';
            case 'EN_COURS': return 'badge bg-info';
            case 'LIVREE': return 'badge bg-success';
            default: return 'badge bg-secondary';
        }
    }
}
