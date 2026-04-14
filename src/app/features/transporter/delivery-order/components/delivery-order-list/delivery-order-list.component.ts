import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { DeliveryOrderService } from '../../../../../core/services/delivery-order.service';
import { AlertService } from '../../../../../core/services/alert.service';
import { DeliveryOrder } from '../../../../../core/models/delivery-order';
import { StatutCommande } from '../../../../../core/models/statut';
import { QrModalComponent } from '../../../../../shared/components/qr-modal/qr-modal.component';

@Component({
    selector: 'app-delivery-order-list',
    templateUrl: './delivery-order-list.component.html',
    styleUrls: ['./delivery-order-list.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, QrModalComponent]
})
export class DeliveryOrderListComponent implements OnInit, OnDestroy {
    
    @ViewChild('qrModal') qrModal!: QrModalComponent;
    
    deliveryOrders: DeliveryOrder[] = [];
    filteredOrders: DeliveryOrder[] = [];
    isLoading = false;
    errorMessage = '';
    searchForm: FormGroup;
    sortBy: string = 'date';
    sortOrder: string = 'desc';
    statuts = Object.values(StatutCommande);
    statistiques: any = null;
    showStats = false;
    rechercheActive = false;
    private subscriptions: Subscription = new Subscription();
    private refreshInterval: any;

    constructor(
        private deliveryOrderService: DeliveryOrderService,
        private alertService: AlertService,
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        this.searchForm = this.fb.group({
            nomClient: [''],
            adresseLivraison: [''],
            statut: [''],
            datePrevue: ['']
        });
    }

    ngOnInit(): void {
        this.loadDeliveryOrders();
        this.loadStatistiques();
        this.setupDynamicSearch();
        window.addEventListener('orderChanged', this.handleOrderChange.bind(this));
        window.addEventListener('focus', () => this.loadDeliveryOrders());
        
        // ✅ METTRE À JOUR AUTOMATIQUEMENT TOUTES LES 5 SECONDES
        this.refreshInterval = setInterval(() => {
            this.refreshData();
        }, 5000);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        window.removeEventListener('orderChanged', this.handleOrderChange.bind(this));
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }

    // ✅ Rafraîchir les données sans perdre les filtres
    refreshData(): void {
        this.deliveryOrderService.getAll().subscribe({
            next: (data: any) => {
                // Vérifier si des changements ont eu lieu
                let hasChanges = false;
                if (this.deliveryOrders.length !== data.length) {
                    hasChanges = true;
                } else {
                    for (let i = 0; i < data.length; i++) {
                        const oldOrder = this.deliveryOrders.find(o => o.idDelivery === data[i].idDelivery);
                        if (oldOrder && oldOrder.statut !== data[i].statut) {
                            hasChanges = true;
                            break;
                        }
                    }
                }
                
                if (hasChanges) {
                    console.log('🔄 Mise à jour automatique détectée');
                    this.deliveryOrders = data;
                    this.filterOrders();
                    this.cd.detectChanges();
                }
            },
            error: (error) => {
                console.error('Erreur refresh:', error);
            }
        });
    }

    // ==================== RECHERCHE DYNAMIQUE ====================
    
    setupDynamicSearch(): void {
        const nomClientSub = this.searchForm.get('nomClient')?.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    if (value && value.trim()) {
                        this.rechercheActive = true;
                        this.isLoading = true;
                        return this.deliveryOrderService.searchByNomClient(value);
                    } else if (!this.hasActiveFilters()) {
                        this.rechercheActive = false;
                        return this.deliveryOrderService.getAll();
                    }
                    return this.deliveryOrderService.getAll();
                })
            )
            .subscribe({
                next: (data: any) => {
                    this.deliveryOrders = data;
                    this.filterOrders();
                    this.isLoading = false;
                    this.cd.detectChanges();
                },
                error: (error: any) => {
                    console.error('Erreur recherche nom:', error);
                    this.errorMessage = 'Erreur lors de la recherche par nom';
                    this.isLoading = false;
                    this.cd.detectChanges();
                }
            });
        this.subscriptions.add(nomClientSub);
        
        const adresseSub = this.searchForm.get('adresseLivraison')?.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    if (value && value.trim()) {
                        this.rechercheActive = true;
                        this.isLoading = true;
                        return this.deliveryOrderService.searchByAdresse(value);
                    } else if (!this.hasActiveFilters()) {
                        this.rechercheActive = false;
                        return this.deliveryOrderService.getAll();
                    }
                    return this.deliveryOrderService.getAll();
                })
            )
            .subscribe({
                next: (data: any) => {
                    this.deliveryOrders = data;
                    this.filterOrders();
                    this.isLoading = false;
                    this.cd.detectChanges();
                },
                error: (error: any) => {
                    console.error('Erreur recherche adresse:', error);
                    this.errorMessage = 'Erreur lors de la recherche par adresse';
                    this.isLoading = false;
                    this.cd.detectChanges();
                }
            });
        this.subscriptions.add(adresseSub);
        
        const statutSub = this.searchForm.get('statut')?.valueChanges
            .pipe(
                distinctUntilChanged(),
                switchMap(value => {
                    if (value) {
                        this.rechercheActive = true;
                        this.isLoading = true;
                        return this.deliveryOrderService.getByStatut(value);
                    } else if (!this.hasActiveFilters()) {
                        this.rechercheActive = false;
                        return this.deliveryOrderService.getAll();
                    }
                    return this.deliveryOrderService.getAll();
                })
            )
            .subscribe({
                next: (data: any) => {
                    this.deliveryOrders = data;
                    this.filterOrders();
                    this.isLoading = false;
                    this.cd.detectChanges();
                },
                error: (error: any) => {
                    console.error('Erreur recherche statut:', error);
                    this.errorMessage = 'Erreur lors de la recherche par statut';
                    this.isLoading = false;
                    this.cd.detectChanges();
                }
            });
        this.subscriptions.add(statutSub);
        
        const dateSub = this.searchForm.get('datePrevue')?.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    if (value) {
                        this.rechercheActive = true;
                        this.isLoading = true;
                        const dateStr = value;
                        return this.deliveryOrderService.searchByDate(dateStr);
                    } else if (!this.hasActiveFilters()) {
                        this.rechercheActive = false;
                        return this.deliveryOrderService.getAll();
                    }
                    return this.deliveryOrderService.getAll();
                })
            )
            .subscribe({
                next: (data: any) => {
                    this.deliveryOrders = data;
                    this.filterOrders();
                    this.isLoading = false;
                    this.cd.detectChanges();
                },
                error: (error: any) => {
                    console.error('Erreur recherche date:', error);
                    this.errorMessage = 'Erreur lors de la recherche par date';
                    this.isLoading = false;
                    this.cd.detectChanges();
                }
            });
        this.subscriptions.add(dateSub);
    }
    
    hasActiveFilters(): boolean {
        const form = this.searchForm.value;
        return !!(form.nomClient || form.adresseLivraison || form.statut || form.datePrevue);
    }
    
    resetFilters(): void {
        this.searchForm.reset();
        this.rechercheActive = false;
        this.loadDeliveryOrders();
    }

    // ==================== CHARGEMENT ====================
    
    loadDeliveryOrders(): void {
        this.isLoading = true;
        const sub = this.deliveryOrderService.getAll().subscribe({
            next: (data: any) => {
                this.deliveryOrders = data;
                this.filterOrders();
                this.isLoading = false;
                this.alertService.checkRetardCommandes(data);
                this.alertService.checkRappelLivraison(data);
                this.cd.detectChanges();
            },
            error: (error) => {
                console.error('Erreur chargement:', error);
                this.errorMessage = 'Erreur lors du chargement';
                this.isLoading = false;
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(sub);
    }

    filterOrders(): void {
        const statutFiltre = this.searchForm.get('statut')?.value;
        if (statutFiltre && !this.rechercheActive) {
            this.filteredOrders = this.deliveryOrders.filter(
                order => order.statut === statutFiltre
            );
        } else {
            this.filteredOrders = [...this.deliveryOrders];
        }
    }

    // ==================== TRI ====================
    
    sortByField(field: string): void {
        if (this.sortBy === field) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortBy = field;
            this.sortOrder = 'asc';
        }
        
        this.isLoading = true;
        const sub = this.deliveryOrderService.sortBy(field, this.sortOrder).subscribe({
            next: (data: any) => {
                this.deliveryOrders = data;
                this.filterOrders();
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('Erreur tri:', error);
                this.errorMessage = 'Erreur lors du tri';
                this.isLoading = false;
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(sub);
    }

    // ==================== STATISTIQUES ====================
    
    loadStatistiques(): void {
        const sub = this.deliveryOrderService.getStatistiques().subscribe({
            next: (data: any) => {
                this.statistiques = data;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('Erreur chargement statistiques', error);
            }
        });
        this.subscriptions.add(sub);
    }
    
    toggleStats(): void {
        this.showStats = !this.showStats;
        if (this.showStats && !this.statistiques) {
            this.loadStatistiques();
        }
    }
    
    handleOrderChange(): void {
        if (!this.rechercheActive) {
            this.loadDeliveryOrders();
        }
        this.loadStatistiques();
    }

    // ==================== QR CODE ====================
    
    openQrCode(order: DeliveryOrder): void {
        if (this.qrModal) {
            this.qrModal.open(order);
        } else {
            console.error('qrModal not found');
        }
    }

    // ================ ACTIONS ===============
    
    onEdit(id: number): void {
        this.router.navigate(['/transporter/delivery-orders/edit', id]);
    }

    onViewDetail(id: number): void {
        this.router.navigate(['/transporter/delivery-orders/detail', id]);
    }

    onDelete(id: number): void {
        if (confirm('Supprimer cette commande ?')) {
            const sub = this.deliveryOrderService.delete(id).subscribe({
                next: () => {
                    this.loadDeliveryOrders();
                    this.loadStatistiques();
                },
                error: () => {
                    this.errorMessage = 'Erreur lors de la suppression';
                }
            });
            this.subscriptions.add(sub);
        }
    }

    onCreateNew(): void {
        this.router.navigate(['/transporter/delivery-orders/new']);
    }

    getStatutClass(statut: StatutCommande): string {
        switch(statut) {
            case StatutCommande.EN_ATTENTE: return 'badge badge-warning';
            case StatutCommande.EN_COURS: return 'badge badge-info';
            case StatutCommande.LIVREE: return 'badge badge-success';
            default: return 'badge badge-neutral';
        }
    }
    
    getProgressWidth(statut: string): string {
        if (this.statistiques && this.statistiques.total > 0) {
            const count = this.statistiques.parStatut?.[statut] || 0;
            return (count * 100 / this.statistiques.total) + '%';
        }
        return '0%';
    }
}