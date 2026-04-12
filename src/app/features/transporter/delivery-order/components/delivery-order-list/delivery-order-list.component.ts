import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DeliveryOrderService } from '../../../../../core/services/delivery-order.service';
import { AlertService } from '../../../../../core/services/alert.service';
import { DeliveryOrder } from '../../../../../core/models/delivery-order';
import { StatutCommande } from '../../../../../core/models/statut';

declare var QRCode: any;

@Component({
    selector: 'app-delivery-order-list',
    templateUrl: './delivery-order-list.component.html',
    styleUrls: ['./delivery-order-list.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryOrderListComponent implements OnInit, OnDestroy {
    
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
    
    // QR Code properties
    showQrModal = false;
    selectedOrder: DeliveryOrder | null = null;
    @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef;

    constructor(
        private deliveryOrderService: DeliveryOrderService,
        private alertService: AlertService,
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private zone: NgZone
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
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        window.removeEventListener('orderChanged', this.handleOrderChange.bind(this));
    }

    private runZone(fn: () => void): void {
        fn();
        this.cd.markForCheck();
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
                    this.runZone(() => {
                        this.deliveryOrders = data;
                        this.filterOrders();
                        this.isLoading = false;
                    });
                },
                error: (error: any) => {
                    this.runZone(() => {
                        console.error('Erreur recherche nom:', error);
                        this.errorMessage = 'Erreur lors de la recherche par nom';
                        this.isLoading = false;
                    });
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
                    this.runZone(() => {
                        this.deliveryOrders = data;
                        this.filterOrders();
                        this.isLoading = false;
                    });
                },
                error: (error: any) => {
                    this.runZone(() => {
                        console.error('Erreur recherche adresse:', error);
                        this.errorMessage = 'Erreur lors de la recherche par adresse';
                        this.isLoading = false;
                    });
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
                    this.runZone(() => {
                        this.deliveryOrders = data;
                        this.filterOrders();
                        this.isLoading = false;
                    });
                },
                error: (error: any) => {
                    this.runZone(() => {
                        console.error('Erreur recherche statut:', error);
                        this.errorMessage = 'Erreur lors de la recherche par statut';
                        this.isLoading = false;
                    });
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
                        console.log('Recherche par date:', dateStr);
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
                    this.runZone(() => {
                        console.log('Résultats recherche par date:', data);
                        this.deliveryOrders = data;
                        this.filterOrders();
                        this.isLoading = false;
                    });
                },
                error: (error: any) => {
                    this.runZone(() => {
                        console.error('Erreur recherche date:', error);
                        this.errorMessage = 'Erreur lors de la recherche par date: ' + (error.error?.message || error.message);
                        this.isLoading = false;
                    });
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
                this.runZone(() => {
                    this.deliveryOrders = data;
                    this.filterOrders();
                    this.isLoading = false;
                    this.alertService.checkRetardCommandes(data);
                    this.alertService.checkRappelLivraison(data);
                });
            },
            error: (error) => {
                this.runZone(() => {
                    console.error('Erreur chargement:', error);
                    this.errorMessage = 'Erreur lors du chargement';
                    this.isLoading = false;
                });
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
                this.runZone(() => {
                    this.deliveryOrders = data;
                    this.filterOrders();
                    this.isLoading = false;
                });
            },
            error: (error: any) => {
                this.runZone(() => {
                    console.error('Erreur tri:', error);
                    this.errorMessage = 'Erreur lors du tri';
                    this.isLoading = false;
                });
            }
        });
        this.subscriptions.add(sub);
    }

    // ==================== STATISTIQUES ====================
    
    loadStatistiques(): void {
        const sub = this.deliveryOrderService.getStatistiques().subscribe({
            next: (data: any) => {
                this.runZone(() => {
                    this.statistiques = data;
                });
            },
            error: (error: any) => {
                this.runZone(() => {
                    console.error('Erreur chargement statistiques', error);
                });
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

    // ==================== QR CODE CORRIGÉ ====================
    
    openQrCode(order: DeliveryOrder): void {
        this.selectedOrder = order;
        this.showQrModal = true;
        
        setTimeout(() => {
            this.generateQRCode();
        }, 300);
    }
    
    closeQrModal(): void {
        this.showQrModal = false;
        this.selectedOrder = null;
        this.loadDeliveryOrders();
    }
    
    generateQRCode(): void {
        if (!this.qrCanvas || !this.qrCanvas.nativeElement) {
            console.error('qrCanvas non trouvé');
            return;
        }
        
        if (!this.selectedOrder) {
            console.error('Aucune commande sélectionnée');
            return;
        }
        
        try {
            this.qrCanvas.nativeElement.innerHTML = '';
            
            // ✅ Utiliser l'IP du serveur ou localhost selon l'accès
            let baseUrl: string;
            const hostname = window.location.hostname;
            
            if (hostname === 'localhost' || hostname === '127.0.0.1') {
                // Si accès depuis le PC, utiliser l'IP locale pour le téléphone
                baseUrl = 'http://192.168.182.154:8080';
            } else {
                // Si accès depuis le téléphone, utiliser l'IP actuelle
                baseUrl = `http://${hostname}:8080`;
            }
            
            const url = `${baseUrl}/api/delivery-orders/update-by-qr/${this.selectedOrder.idDelivery}`;
            
            console.log('QR code URL:', url);
            
            new QRCode(this.qrCanvas.nativeElement, {
                text: url,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            console.log('QR code généré avec succès');
            
        } catch (error) {
            console.error('Erreur génération QR:', error);
        }
    }

    // ==================== ACTIONS ====================
    
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
                    if (!this.rechercheActive) {
                        this.loadDeliveryOrders();
                    } else {
                        this.loadDeliveryOrders();
                    }
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