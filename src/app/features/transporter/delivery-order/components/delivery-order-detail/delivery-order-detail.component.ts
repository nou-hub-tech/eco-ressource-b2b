import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryOrderService } from '../../../../../core/services/delivery-order.service';
import { ShipmentService } from '../../../../../core/services/shipment.service';
import { DeliveryOrder } from '../../../../../core/models/delivery-order';
import { Shipment } from '../../../../../core/models/shipment';
import { StatutCommande, StatutExpedition } from '../../../../../core/models/statut';

@Component({
    selector: 'app-delivery-order-detail',
    standalone: true,
    templateUrl: './delivery-order-detail.component.html',
    styleUrls: ['./delivery-order-detail.component.css'],
    imports: [CommonModule]
})
export class DeliveryOrderDetailComponent implements OnInit {
    deliveryOrder: DeliveryOrder | null = null;
    shipments: Shipment[] = [];
    isLoading = true;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private deliveryOrderService: DeliveryOrderService,
        private shipmentService: ShipmentService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadDeliveryOrder(+id);
            this.loadShipments(+id);
        }
    }

    loadDeliveryOrder(id: number): void {
        this.deliveryOrderService.getById(id).subscribe({
            next: (data: any) => {
                this.deliveryOrder = data;
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                this.errorMessage = 'Erreur lors du chargement de la commande';
                this.isLoading = false;
                this.cd.detectChanges();
                console.error(error);
            }
        });
    }

    loadShipments(deliveryOrderId: number): void {
        this.shipmentService.getByDeliveryOrder(deliveryOrderId).subscribe({
            next: (data: any) => {
                this.shipments = data;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('Erreur chargement expéditions', error);
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/transporter/delivery-orders']);
    }

    getStatutClass(statut: StatutCommande): string {
        switch(statut) {
            case StatutCommande.EN_ATTENTE: return 'badge badge-warning';
            case StatutCommande.EN_COURS: return 'badge badge-info';
            case StatutCommande.LIVREE: return 'badge badge-success';
            default: return 'badge badge-neutral';
        }
    }

    getExpeditionStatutClass(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 'badge badge-warning';
            case StatutExpedition.EN_COURS: return 'badge badge-info';
            case StatutExpedition.LIVREE: return 'badge badge-success';
            default: return 'badge badge-neutral';
        }
    }

    editOrder(): void {
        if (this.deliveryOrder) {
            this.router.navigate(['/transporter/delivery-orders/edit', this.deliveryOrder.idDelivery]);
        }
    }

    addShipment(): void {
        if (this.deliveryOrder) {
            this.router.navigate(['/transporter/shipments/new', this.deliveryOrder.idDelivery]);
        }
    }

    deleteShipment(id: number): void {
        if (confirm('Supprimer cette expédition ?')) {
            this.shipmentService.delete(id).subscribe({
                next: () => {
                    if (this.deliveryOrder) {
                        this.loadShipments(this.deliveryOrder.idDelivery);
                    }
                },
                error: (error) => {
                    console.error('Erreur suppression', error);
                }
            });
        }
    }
}