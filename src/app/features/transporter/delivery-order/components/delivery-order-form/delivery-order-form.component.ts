import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryOrderService } from '../../../../../core/services/delivery-order.service';
import { StatutCommande } from '../../../../../core/models/statut';

@Component({
    selector: 'app-delivery-order-form',
    standalone: true,
    templateUrl: './delivery-order-form.component.html',
    styleUrls: ['./delivery-order-form.component.css'],
    imports: [CommonModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryOrderFormComponent implements OnInit {
    deliveryOrderForm: FormGroup;
    isEditMode = false;
    deliveryOrderId: number | null = null;
    isLoading = false;
    errorMessage = '';
    statuts = Object.values(StatutCommande);
    today: string;

    constructor(
        private fb: FormBuilder,
        private deliveryOrderService: DeliveryOrderService,
        private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {
        // ✅ Définir la date minimale (aujourd'hui)
        const now = new Date();
        this.today = now.toISOString().slice(0, 16);
        this.deliveryOrderForm = this.createForm();
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.deliveryOrderId = +id;
            this.loadDeliveryOrder();
        }
    }

    createForm(): FormGroup {
        return this.fb.group({
            nomClient: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            telephoneClient: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
            adresseLivraison: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
            datePrevue: ['', [Validators.required, this.validateDate]],
            statut: [StatutCommande.EN_ATTENTE, Validators.required]
        });
    }

    // ✅ Validateur personnalisé pour la date
    validateDate(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value) return { 'required': true };
        
        const date = new Date(control.value);
        if (isNaN(date.getTime())) {
            return { 'invalidDate': true };
        }
        
        // Vérifier que la date n'est pas trop ancienne (année 1900-2100)
        const year = date.getFullYear();
        if (year < 1900 || year > 2100) {
            return { 'invalidYear': true };
        }
        
        // Vérifier que la date est dans le futur
        const now = new Date();
        if (date < now) {
            return { 'pastDate': true };
        }
        
        return null;
    }

    loadDeliveryOrder(): void {
        this.isLoading = true;
        this.deliveryOrderService.getById(this.deliveryOrderId!).subscribe({
            next: (order: any) => {
                // ✅ Formater la date pour input datetime-local
                const date = new Date(order.datePrevue);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
                
                this.deliveryOrderForm.patchValue({
                    nomClient: order.nomClient,
                    telephoneClient: order.telephoneClient,
                    adresseLivraison: order.adresseLivraison,
                    datePrevue: formattedDate,
                    statut: order.statut
                });
                this.isLoading = false;
                this.cd.markForCheck();
            },
            error: (error) => {
                this.errorMessage = 'Erreur lors du chargement de la commande';
                this.isLoading = false;
                console.error(error);
            }
        });
    }

    // Getters
    get nomClient(): AbstractControl | null { return this.deliveryOrderForm.get('nomClient'); }
    get telephoneClient(): AbstractControl | null { return this.deliveryOrderForm.get('telephoneClient'); }
    get adresseLivraison(): AbstractControl | null { return this.deliveryOrderForm.get('adresseLivraison'); }
    get datePrevue(): AbstractControl | null { return this.deliveryOrderForm.get('datePrevue'); }

    onSubmit(): void {
        if (this.deliveryOrderForm.invalid) {
            Object.keys(this.deliveryOrderForm.controls).forEach(key => {
                this.deliveryOrderForm.get(key)?.markAsTouched();
            });
            return;
        }

        this.isLoading = true;
        const formValue = this.deliveryOrderForm.value;
        
        // ✅ Formater la date en ISO 8601 pour le backend
        let formattedDate = formValue.datePrevue;
        if (formattedDate) {
            const date = new Date(formattedDate);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString();
            } else {
                this.errorMessage = 'Format de date invalide';
                this.isLoading = false;
                return;
            }
        }
        
        // ✅ CORRECTION IMPORTANTE: Pour la création, ne PAS envoyer d'ID
        let deliveryOrder: any;
        if (this.isEditMode) {
            deliveryOrder = {
                idDelivery: this.deliveryOrderId,
                nomClient: formValue.nomClient,
                telephoneClient: formValue.telephoneClient,
                adresseLivraison: formValue.adresseLivraison,
                datePrevue: formattedDate,
                statut: formValue.statut
            };
        } else {
            // ✅ Création: pas d'ID
            deliveryOrder = {
                nomClient: formValue.nomClient,
                telephoneClient: formValue.telephoneClient,
                adresseLivraison: formValue.adresseLivraison,
                datePrevue: formattedDate,
                statut: formValue.statut
            };
        }

        console.log('Envoi:', deliveryOrder);

        const request = this.isEditMode 
            ? this.deliveryOrderService.update(this.deliveryOrderId!, deliveryOrder)
            : this.deliveryOrderService.create(deliveryOrder);

        request.subscribe({
            next: (response: any) => {
                console.log('Succès:', response);
                this.isLoading = false;
                this.cd.markForCheck();
                this.router.navigate(['/transporter/delivery-orders']);
            },
            error: (error: any) => {
                console.error('Erreur détaillée:', error);
                // ✅ Afficher le message d'erreur détaillé
                let errorMsg = 'Erreur inconnue';
                if (error.error?.message) {
                    errorMsg = error.error.message;
                } else if (error.message) {
                    errorMsg = error.message;
                }
                this.errorMessage = `Erreur: ${errorMsg}`;
                this.isLoading = false;
                this.cd.markForCheck();
            }
        });
    }

    onCancel(): void {
        this.router.navigate(['/transporter/delivery-orders']);
    }
}