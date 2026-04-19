import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryOrderService } from '../../../core/services/delivery-order.service';
import { StatutCommande } from '../../../core/models/statut';

@Component({
    selector: 'app-qr-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './qr-modal.component.html',
    styleUrls: ['./qr-modal.component.css']
})
export class QrModalComponent {
    @Input() order: any;

    private readonly cd = inject(ChangeDetectorRef);
    private readonly deliveryOrderService = inject(DeliveryOrderService);

    isLoading = false;
    errorMessage = '';
    showModal = false;
    qrUrl = '';
    lienConfirmation = '';

    open(order: any): void {
        this.order = order;
        this.showModal = true;
        this.isLoading = false;
        this.errorMessage = '';
        
        // Utilise l'URL ngrok
        const ngrokUrl = 'https://exes-unreal-movable.ngrok-free.dev';
        this.lienConfirmation = `${ngrokUrl}/api/delivery-orders/update-by-qr/${this.order.idDelivery}`;
        
        this.qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(this.lienConfirmation)}&size=250`;
        
        this.cd.detectChanges();
    }

    close(): void {
        this.showModal = false;
        this.cd.detectChanges();
    }

    //  Télécharger le QR code
    downloadQRCode(): void {
        const img = document.getElementById('qrCodeImage') as HTMLImageElement;
        if (img && img.src) {
            const link = document.createElement('a');
            link.download = `QR_Code_Commande_${this.order.idDelivery}.png`;
            link.href = img.src;
            link.click();
        } else {
            // Alternative: créer un canvas partir de l'image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const tempImg = new Image();
            tempImg.crossOrigin = 'Anonymous';
            tempImg.onload = () => {
                canvas.width = tempImg.width;
                canvas.height = tempImg.height;
                ctx?.drawImage(tempImg, 0, 0);
                const link = document.createElement('a');
                link.download = `QR_Code_Commande_${this.order.idDelivery}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            };
            tempImg.src = this.qrUrl;
        }
    }

    //  Imprimer  QR code
    printQRCode(): void {
        const img = document.getElementById('qrCodeImage') as HTMLImageElement;
        if (img && img.src) {
            const printWindow = window.open('', '_blank');
            printWindow?.document.write(`
                <html>
                    <head>
                        <title>QR Code Commande #${this.order.idDelivery}</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                text-align: center;
                                padding: 50px;
                            }
                            .qr-code {
                                margin: 30px auto;
                            }
                            .info {
                                margin-top: 30px;
                                font-size: 14px;
                                color: #666;
                            }
                            @media print {
                                .no-print {
                                    display: none;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>QR Code - Commande #${this.order.idDelivery}</h1>
                        <div class="qr-code">
                            <img src="${img.src}" alt="QR Code" width="250" height="250">
                        </div>
                        <div class="info">
                            <p><strong>Client:</strong> ${this.order.nomClient}</p>
                            <p><strong>Adresse:</strong> ${this.order.adresseLivraison}</p>
                            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                        </div>
                        <div class="no-print">
                            <button onclick="window.print()">Imprimer</button>
                            <button onclick="window.close()">Fermer</button>
                        </div>
                        <script>
                            window.print();
                        </script>
                    </body>
                </html>
            `);
            printWindow?.document.close();
        }
    }

    //  Confirmer la livraison avec un clic
    confirmerLivraison(): void {
        if (!this.order) return;
        
        this.isLoading = true;
        this.deliveryOrderService.updateStatut(this.order.idDelivery, StatutCommande.LIVREE).subscribe({
            next: () => {
                this.isLoading = false;
                alert(` Commande #${this.order.idDelivery} livrée avec succès!`);
                this.close();
                window.location.reload();
            },
            error: (error) => {
                console.error('Erreur:', error);
                this.errorMessage = 'Erreur lors de la confirmation';
                this.isLoading = false;
            }
        });
    }

    copierLien(): void {
        navigator.clipboard.writeText(this.lienConfirmation);
        alert('Lien copié!');
    }

    getStatutClass(statut: string): string {
        switch (statut) {
            case 'EN_ATTENTE': return 'badge bg-warning';
            case 'EN_COURS': return 'badge bg-info';
            case 'LIVREE': return 'badge bg-success';
            default: return 'badge bg-secondary';
        }
    }
}