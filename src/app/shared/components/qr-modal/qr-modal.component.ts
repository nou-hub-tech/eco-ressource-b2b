import { ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import QRCode from 'qrcode';
import { QrCodeService } from '../../../core/services/qr-code.service';

@Component({
    selector: 'app-qr-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './qr-modal.component.html',
    styleUrls: ['./qr-modal.component.css']
})
export class QrModalComponent {
    @Input() order: any;

    @ViewChild('qrCanvas') qrCanvas?: ElementRef<HTMLCanvasElement>;

    private readonly cd = inject(ChangeDetectorRef);
    private readonly qr = inject(QrCodeService);

    isLoading = true;
    errorMessage = '';
    showModal = false;
    private canvasResolveAttempts = 0;

    open(order: any): void {
        this.order = order;
        this.showModal = true;
        this.isLoading = true;
        this.errorMessage = '';
        this.canvasResolveAttempts = 0;
        this.cd.detectChanges();
        queueMicrotask(() => void this.paintQrWhenReady());
    }

    close(): void {
        this.showModal = false;
        this.isLoading = true;
        this.cd.detectChanges();
    }

    private paintQrWhenReady(): void {
        const canvas = this.qrCanvas?.nativeElement;
        if (!canvas && this.canvasResolveAttempts < 30) {
            this.canvasResolveAttempts++;
            setTimeout(() => this.paintQrWhenReady(), 20);
            return;
        }
        void this.paintQr(canvas ?? null);
    }

    private async paintQr(canvas: HTMLCanvasElement | null): Promise<void> {
        if (!canvas || !this.order) {
            this.errorMessage = 'Erreur technique';
            this.isLoading = false;
            this.cd.detectChanges();
            return;
        }

        const url = this.qr.generateQrData(this.order.idDelivery);
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        try {
            await QRCode.toCanvas(canvas, url, {
                width: 250,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                },
                errorCorrectionLevel: 'H'
            });
            this.isLoading = false;
            this.errorMessage = '';
        } catch (error) {
            console.error('QR generation failed', error);
            this.errorMessage = 'Erreur lors de la génération du QR code';
            this.isLoading = false;
        }
        this.cd.detectChanges();
    }

    private getCanvas(): HTMLCanvasElement | null {
        return this.qrCanvas?.nativeElement ?? null;
    }

    private getDataUrl(): string | null {
        const canvas = this.getCanvas();
        if (!canvas) {
            return null;
        }
        try {
            return canvas.toDataURL('image/png');
        } catch {
            return null;
        }
    }

    downloadQRCode(): void {
        const dataUrl = this.getDataUrl();
        if (!dataUrl || !this.order) {
            return;
        }
        const link = document.createElement('a');
        link.download = `commande_${this.order.idDelivery}.png`;
        link.href = dataUrl;
        link.click();
    }

    printQRCode(): void {
        const dataUrl = this.getDataUrl();
        if (!dataUrl || !this.order) {
            return;
        }
        const win = window.open();
        if (!win) {
            return;
        }
        win.document.write(`
                <html>
                    <head>
                        <title>QR Code Commande #${this.order.idDelivery}</title>
                        <style>
                            body { font-family: Arial; text-align: center; padding: 20px; }
                            .info { background: #f5f5f5; padding: 10px; margin: 20px 0; border-radius: 8px; }
                        </style>
                    </head>
                    <body>
                        <h1>QR Code - Commande #${this.order.idDelivery}</h1>
                        <div class="info">
                            <p><strong>Client:</strong> ${this.order.nomClient}</p>
                            <p><strong>Adresse:</strong> ${this.order.adresseLivraison}</p>
                            <p><strong>Statut:</strong> ${this.order.statut}</p>
                        </div>
                        <img src="${dataUrl}" alt="QR" />
                        <p>Scannez ce QR code pour valider la livraison</p>
                        <button onclick="window.close()">Fermer</button>
                    </body>
                </html>
            `);
        win.document.close();
        win.print();
    }

    getStatutClass(statut: string): string {
        switch (statut) {
            case 'EN_ATTENTE':
                return 'badge bg-warning';
            case 'EN_COURS':
                return 'badge bg-info';
            case 'LIVREE':
                return 'badge bg-success';
            default:
                return 'badge bg-secondary';
        }
    }
}
