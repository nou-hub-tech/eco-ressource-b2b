import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShipmentService } from '../../../../../core/services/shipment.service';
import { DeliveryOrderService } from '../../../../../core/services/delivery-order.service';
import { Shipment } from '../../../../../core/models/shipment';
import { DeliveryOrder } from '../../../../../core/models/delivery-order';
import { StatutExpedition } from '../../../../../core/models/statut';

@Component({
    selector: 'app-shipment-detail',
    templateUrl: './shipment-detail.component.html',
    styleUrls: ['./shipment-detail.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class ShipmentDetailComponent implements OnInit {
    shipment: Shipment | null = null;
    deliveryOrder: DeliveryOrder | null = null;
    isLoading = true;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shipmentService: ShipmentService,
        private deliveryOrderService: DeliveryOrderService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadShipment(+id);
        }
    }

    loadShipment(id: number): void {
        this.shipmentService.getById(id).subscribe({
            next: (data: any) => {
                this.shipment = data;
                this.loadDeliveryOrder(data.deliveryOrder.idDelivery);
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                this.errorMessage = 'Erreur lors du chargement';
                this.isLoading = false;
            }
        });
    }

    loadDeliveryOrder(id: number): void {
        this.deliveryOrderService.getById(id).subscribe({
            next: (data: any) => {
                this.deliveryOrder = data;
            },
            error: (error: any) => {
                console.error('Erreur chargement commande', error);
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/transporter/shipments']);
    }

    editShipment(): void {
        if (this.shipment) {
            this.router.navigate(['/transporter/shipments/edit', this.shipment.id]);
        }
    }

    getStatutClass(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 'badge badge-warning';
            case StatutExpedition.EN_COURS: return 'badge badge-info';
            case StatutExpedition.LIVREE: return 'badge badge-success';
            default: return 'badge badge-neutral';
        }
    }
}