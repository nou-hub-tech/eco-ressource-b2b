import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentService } from '../../../../../core/services/shipment.service';
import { DeliveryOrderService } from '../../../../../core/services/delivery-order.service';
import { DeliveryOrder } from '../../../../../core/models/delivery-order';
import { StatutExpedition } from '../../../../../core/models/statut';

@Component({
    selector: 'app-shipment-form',
    templateUrl: './shipment-form.component.html',
    styleUrls: ['./shipment-form.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipmentFormComponent implements OnInit {
    shipmentForm: FormGroup;
    isEditMode = false;
    shipmentId: number | null = null;
    deliveryOrders: DeliveryOrder[] = [];
    isLoading = false;
    errorMessage = '';
    statuts = Object.values(StatutExpedition);
    today: string;

    constructor(
        private fb: FormBuilder,
        private shipmentService: ShipmentService,
        private deliveryOrderService: DeliveryOrderService,
        private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {
        const now = new Date();
        this.today = now.toISOString().slice(0, 16);
        this.shipmentForm = this.createForm();
    }

    ngOnInit(): void {
        this.loadDeliveryOrders();
        
        const id = this.route.snapshot.paramMap.get('id');
        const deliveryOrderId = this.route.snapshot.paramMap.get('deliveryOrderId');
        
        if (id) {
            this.isEditMode = true;
            this.shipmentId = +id;
            this.loadShipment();
        } else if (deliveryOrderId) {
            // Pré-remplir avec l'ID de la commande
            this.shipmentForm.patchValue({
                deliveryOrderId: +deliveryOrderId  // ✅ MODIFIÉ: champ simple
            });
        }
    }

    // ✅ FORMULAIRE SIMPLIFIÉ
    createForm(): FormGroup {
        return this.fb.group({
            deliveryOrderId: ['', Validators.required],  // ✅ Champ simple au lieu d'un groupe
            produitId: ['', [Validators.required, Validators.min(1)]],
            quantite: ['', [Validators.required, Validators.min(0.1)]],
            idTransporter: ['', [Validators.required, Validators.min(1)]],
            dateDepart: ['', [Validators.required, this.validateDate]],
            statut: [StatutExpedition.EN_ATTENTE, Validators.required]
        });
    }

    validateDate(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value) return { 'required': true };
        
        const date = new Date(control.value);
        if (isNaN(date.getTime())) {
            return { 'invalidDate': true };
        }
        
        return null;
    }

    loadDeliveryOrders(): void {
        this.deliveryOrderService.getAll().subscribe({
            next: (data: any) => {
                this.deliveryOrders = data;
                this.cd.markForCheck();
                console.log('Commandes chargées:', this.deliveryOrders);  // Debug
            },
            error: (error: any) => {
                console.error('Erreur chargement commandes:', error);
            }
        });
    }

    loadShipment(): void {
        this.isLoading = true;
        this.shipmentService.getById(this.shipmentId!).subscribe({
            next: (shipment) => {
                const date = new Date(shipment.dateDepart);
                const formattedDate = date.toISOString().slice(0, 16);
                
                this.shipmentForm.patchValue({
                    deliveryOrderId: shipment.deliveryOrder.idDelivery,  // ✅ MODIFIÉ
                    produitId: shipment.produitId,
                    quantite: shipment.quantite,
                    idTransporter: shipment.idTransporter,
                    dateDepart: formattedDate,
                    statut: shipment.statut
                });
                this.isLoading = false;
                this.cd.markForCheck();
            },
            error: (error: any) => {
                this.errorMessage = 'Erreur lors du chargement';
                this.isLoading = false;
            }
        });
    }

    // ✅ GETTERS simplifiés
    get deliveryOrderId(): AbstractControl | null { return this.shipmentForm.get('deliveryOrderId'); }
    get produitId(): AbstractControl | null { return this.shipmentForm.get('produitId'); }
    get quantite(): AbstractControl | null { return this.shipmentForm.get('quantite'); }
    get idTransporter(): AbstractControl | null { return this.shipmentForm.get('idTransporter'); }
    get dateDepart(): AbstractControl | null { return this.shipmentForm.get('dateDepart'); }

    onSubmit(): void {
        // ✅ Debug
        console.log('=== SOUMISSION DU FORMULAIRE ===');
        console.log('Formulaire valide?', this.shipmentForm.valid);
        console.log('Valeurs:', this.shipmentForm.value);
        
        if (this.shipmentForm.invalid) {
            // Afficher les erreurs de chaque champ
            Object.keys(this.shipmentForm.controls).forEach(key => {
                const control = this.shipmentForm.get(key);
                if (control?.invalid) {
                    console.log(`Champ ${key} invalide:`, control.errors);
                }
                control?.markAsTouched();
            });
            return;
        }

        this.isLoading = true;
        const formValue = this.shipmentForm.value;
        
        // Formater la date
        let formattedDate = formValue.dateDepart;
        if (formattedDate) {
            const date = new Date(formattedDate);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString();
            }
        }
        
        // ✅ Construction de l'objet shipment
        let shipment: any;
        if (this.isEditMode) {
            shipment = {
                id: this.shipmentId,
                deliveryOrder: { idDelivery: formValue.deliveryOrderId },
                produitId: formValue.produitId,
                quantite: formValue.quantite,
                idTransporter: formValue.idTransporter,
                dateDepart: formattedDate,
                statut: formValue.statut
            };
        } else {
            shipment = {
                deliveryOrder: { idDelivery: formValue.deliveryOrderId },
                produitId: formValue.produitId,
                quantite: formValue.quantite,
                idTransporter: formValue.idTransporter,
                dateDepart: formattedDate,
                statut: formValue.statut
            };
        }

        console.log('Envoi au backend:', shipment);  // Debug

        const request = this.isEditMode 
            ? this.shipmentService.update(this.shipmentId!, shipment)
            : this.shipmentService.create(shipment);

        request.subscribe({
            next: (response) => {
                console.log('Succès:', response);
                this.isLoading = false;
                this.cd.markForCheck();
                this.router.navigate(['/transporter/shipments']);
            },
            error: (error: any) => {
                console.error('Erreur détaillée:', error);
                this.errorMessage = `Erreur: ${error.error?.message || 'V\u00e9rifiez les donn\u00e9es'}`;
                this.isLoading = false;
                this.cd.markForCheck();
            }
        });
    }

    onCancel(): void {
        this.router.navigate(['/transporter/shipments']);
    }
}