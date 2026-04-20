import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ShipmentService } from '../../../../../core/services/shipment.service';
import { DeliveryOrderService } from '../../../../../core/services/delivery-order.service';
import { PdfGeneratorService } from '../../../../../core/services/pdf-generator.service';
import { Shipment } from '../../../../../core/models/shipment';
import { DeliveryOrder } from '../../../../../core/models/delivery-order';
import { StatutExpedition } from '../../../../../core/models/statut';

@Component({
    selector: 'app-shipment-list',
    templateUrl: './shipment-list.component.html',
    styleUrls: ['./shipment-list.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipmentListComponent implements OnInit, OnDestroy {
    shipments: Shipment[] = [];
    filteredShipments: Shipment[] = [];
    deliveryOrders: Map<number, DeliveryOrder> = new Map();
    isLoading = false;
    errorMessage = '';
    searchForm: FormGroup;
    sortBy: string = 'date';
    sortOrder: string = 'desc';
    statuts = Object.values(StatutExpedition);
    statistiques: any = null;
    showStats = false;
    rechercheActive = false;
    
    // ========== PROPRIÉTÉS DE PAGINATION ==========
    currentPage: number = 1;
    itemsPerPage: number = 3;  // 3 éléments par page
    totalItems: number = 0;
    paginatedShipments: Shipment[] = [];
    
    private subscriptions: Subscription = new Subscription();
    private handleShipmentChangeBound = this.handleShipmentChange.bind(this);

    constructor(
        private shipmentService: ShipmentService,
        private deliveryOrderService: DeliveryOrderService,
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private zone: NgZone,
        private pdfGenerator: PdfGeneratorService
    ) {
        this.searchForm = this.fb.group({
            produitId: [''],           
            quantite: [''],            
            statut: [''],
            dateDepart: ['']
        });
    }

    ngOnInit(): void {
        this.loadShipments();
        this.loadDeliveryOrders();
        this.loadStatistiques();
        
        this.setupDynamicSearch();
        
        window.addEventListener('shipmentChanged', this.handleShipmentChangeBound);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        window.removeEventListener('shipmentChanged', this.handleShipmentChangeBound);
    }

    private runZone(fn: () => void): void {
        fn();
        this.cd.markForCheck();
    }

    // ====== RECHERCHE DYNAMIQUE ======
    
    setupDynamicSearch(): void {
        // Recherche par produit
        const produitSub = this.searchForm.get('produitId')?.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    if (value && value.toString().trim()) {
                        this.rechercheActive = true;
                        this.isLoading = true;
                        return this.shipmentService.searchByProduit(value);
                    } else if (!this.hasActiveFilters()) {
                        this.rechercheActive = false;
                        return this.shipmentService.getAll();
                    }
                    return this.shipmentService.getAll();
                })
            )
            .subscribe({
                next: (data: any) => {
                    this.runZone(() => {
                        this.shipments = data;
                        this.filterShipments();
                        this.isLoading = false;
                    });
                },
                error: (error: any) => {
                    this.runZone(() => {
                        console.error('Erreur recherche produit:', error);
                        this.errorMessage = 'Erreur lors de la recherche par produit';
                        this.isLoading = false;
                    });
                }
            });
        this.subscriptions.add(produitSub);
        
        // Recherche par quantité
        const quantiteSub = this.searchForm.get('quantite')?.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    if (value && value.toString().trim()) {
                        this.rechercheActive = true;
                        this.isLoading = true;
                        return this.shipmentService.searchByQuantite(value);
                    } else if (!this.hasActiveFilters()) {
                        this.rechercheActive = false;
                        return this.shipmentService.getAll();
                    }
                    return this.shipmentService.getAll();
                })
            )
            .subscribe({
                next: (data: any) => {
                    this.runZone(() => {
                        this.shipments = data;
                        this.filterShipments();
                        this.isLoading = false;
                    });
                },
                error: (error: any) => {
                    this.runZone(() => {
                        console.error('Erreur recherche quantité:', error);
                        this.errorMessage = 'Erreur lors de la recherche par quantité';
                        this.isLoading = false;
                    });
                }
            });
        this.subscriptions.add(quantiteSub);
        
        // Recherche par statut
        const statutSub = this.searchForm.get('statut')?.valueChanges
            .pipe(
                distinctUntilChanged(),
                switchMap(value => {
                    if (value) {
                        this.rechercheActive = true;
                        this.isLoading = true;
                        return this.shipmentService.getByStatut(value);
                    } else if (!this.hasActiveFilters()) {
                        this.rechercheActive = false;
                        return this.shipmentService.getAll();
                    }
                    return this.shipmentService.getAll();
                })
            )
            .subscribe({
                next: (data: any) => {
                    this.runZone(() => {
                        this.shipments = data;
                        this.filterShipments();
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
        
        // Recherche par date
        const dateSub = this.searchForm.get('dateDepart')?.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    if (value) {
                        this.rechercheActive = true;
                        this.isLoading = true;
                        const dateStr = value;
                        return this.shipmentService.searchByDate(dateStr);
                    } else if (!this.hasActiveFilters()) {
                        this.rechercheActive = false;
                        return this.shipmentService.getAll();
                    }
                    return this.shipmentService.getAll();
                })
            )
            .subscribe({
                next: (data: any) => {
                    this.runZone(() => {
                        this.shipments = data;
                        this.filterShipments();
                        this.isLoading = false;
                    });
                },
                error: (error: any) => {
                    this.runZone(() => {
                        console.error('Erreur recherche date:', error);
                        this.errorMessage = 'Erreur lors de la recherche par date';
                        this.isLoading = false;
                    });
                }
            });
        this.subscriptions.add(dateSub);
    }
    
    hasActiveFilters(): boolean {
        const form = this.searchForm.value;
        return !!(form.produitId || form.quantite || form.statut || form.dateDepart);
    }
    
    resetFilters(): void {
        this.searchForm.reset();
        this.rechercheActive = false;
        this.loadShipments();
    }

    // ========= CHARGEMENT ===========
    
    loadShipments(): void {
        this.isLoading = true;
        const sub = this.shipmentService.getAll().subscribe({
            next: (data: any) => {
                this.runZone(() => {
                    this.shipments = data;
                    this.filterShipments();
                    this.isLoading = false;
                });
            },
            error: (error: any) => {
                this.runZone(() => {
                    this.errorMessage = 'Erreur lors du chargement des expéditions';
                    this.isLoading = false;
                });
                console.error(error);
            }
        });
        this.subscriptions.add(sub);
    }

    loadDeliveryOrders(): void {
        const sub = this.deliveryOrderService.getAll().subscribe({
            next: (orders) => {
                this.runZone(() => {
                    orders.forEach(order => {
                        this.deliveryOrders.set(order.idDelivery, order);
                    });
                });
            },
            error: (error: any) => {
                this.runZone(() => {
                    console.error('Erreur chargement commandes:', error);
                });
            }
        });
        this.subscriptions.add(sub);
    }

    loadStatistiques(): void {
        const sub = this.shipmentService.getStatistiques().subscribe({
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

    filterShipments(): void {
        const statutFiltre = this.searchForm.get('statut')?.value;
        if (statutFiltre && !this.rechercheActive) {
            this.filteredShipments = this.shipments.filter(
                shipment => shipment.statut === statutFiltre
            );
        } else {
            this.filteredShipments = [...this.shipments];
        }
        this.updatePagination(); // Mettre à jour la pagination
    }

    // ============ TRI ================
    
    sortByField(field: string): void {
        if (this.sortBy === field) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortBy = field;
            this.sortOrder = 'asc';
        }
        
        this.isLoading = true;
        const sub = this.shipmentService.sortBy(field, this.sortOrder).subscribe({
            next: (data: any) => {
                this.shipments = data;
                this.filterShipments();
                this.isLoading = false;
            },
            error: (error: any) => {
                console.error('Erreur tri:', error);
                this.errorMessage = 'Erreur lors du tri';
                this.isLoading = false;
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
    
    handleShipmentChange(): void {
        if (!this.rechercheActive) {
            this.loadShipments();
        }
        this.loadStatistiques();
    }

    // ==================== PAGINATION ====================
    
    updatePagination(): void {
        this.totalItems = this.filteredShipments.length;
        // Vérifier si la page actuelle est toujours valide
        const maxPage = this.getTotalPages();
        if (this.currentPage > maxPage && maxPage > 0) {
            this.currentPage = maxPage;
        } else if (this.currentPage < 1) {
            this.currentPage = 1;
        }
        this.setPaginatedShipments();
    }
    
    setPaginatedShipments(): void {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedShipments = this.filteredShipments.slice(startIndex, endIndex);
    }
    
    nextPage(): void {
        if (this.currentPage < this.getTotalPages()) {
            this.currentPage++;
            this.setPaginatedShipments();
        }
    }
    
    previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.setPaginatedShipments();
        }
    }
    
    goToPage(page: number): void {
        if (page >= 1 && page <= this.getTotalPages()) {
            this.currentPage = page;
            this.setPaginatedShipments();
        }
    }
    
    getTotalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }
    
    getPageNumbers(): number[] {
        const totalPages = this.getTotalPages();
        const pages: number[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }
    
    getStartIndex(): number {
        return (this.currentPage - 1) * this.itemsPerPage + 1;
    }
    
    getEndIndex(): number {
        return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    }

    // ==================== ACTIONS ====================
    
    getClientName(deliveryOrderId: number): string {
        const order = this.deliveryOrders.get(deliveryOrderId);
        return order ? order.nomClient : 'Inconnu';
    }

    onEdit(id: number): void {
        this.router.navigate(['/transporter/shipments/edit', id]);
    }

    onViewDetail(id: number): void {
        this.router.navigate(['/shipments/detail', id]);
    }

    onDelete(id: number): void {
        if (confirm('Supprimer cette expédition ?')) {
            const sub = this.shipmentService.delete(id).subscribe({
                next: () => {
                    this.runZone(() => {
                        this.loadShipments();
                        this.loadStatistiques();
                    });
                },
                error: (error: any) => {
                    this.runZone(() => {
                        this.errorMessage = 'Erreur lors de la suppression';
                    });
                    console.error(error);
                }
            });
            this.subscriptions.add(sub);
        }
    }

    onGeneratePDF(shipmentId: number): void {
        const shipment = this.shipments.find(s => s.id === shipmentId);
        
        if (!shipment) {
            console.error('Expédition non trouvée');
            this.errorMessage = 'Impossible de générer le PDF : expédition non trouvée';
            return;
        }
        
        const orderId = shipment.deliveryOrder.idDelivery;
        const deliveryOrder = this.deliveryOrders.get(orderId) || null;
        
        if (!deliveryOrder) {
            console.warn('Commande non trouvée pour l\'ID:', orderId);
        }
        
        try {
            this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
            this.errorMessage = 'Erreur lors de la génération du PDF';
        }
    }

    generateAllPDFs(): void {
        if (this.filteredShipments.length === 0) {
            this.errorMessage = 'Aucune expédition à exporter';
            return;
        }

        const confirmation = confirm(`Générer ${this.filteredShipments.length} PDF(s) ?`);
        if (!confirmation) return;

        this.isLoading = true;
        let count = 0;
        let errors = 0;
        
        this.filteredShipments.forEach((shipment, index) => {
            const deliveryOrder = this.deliveryOrders.get(shipment.deliveryOrder.idDelivery) || null;
            
            setTimeout(() => {
                try {
                    this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder);
                    count++;
                } catch (error) {
                    console.error(`Erreur PDF pour expédition ${shipment.id}:`, error);
                    errors++;
                }
                
                if (index === this.filteredShipments.length - 1) {
                    this.runZone(() => {
                        this.isLoading = false;
                        if (errors === 0) {
                            this.errorMessage = `${count} PDF(s) généré(s) avec succès !`;
                        } else {
                            this.errorMessage = `${count} PDF(s) généré(s), ${errors} erreur(s)`;
                        }
                        setTimeout(() => {
                            this.errorMessage = '';
                        }, 3000);
                    });
                }
            }, index * 300);
        });
    }

    onCreateNew(): void {
        this.router.navigate(['/transporter/shipments/new']);
    }

    getStatutClass(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 'badge badge-warning';
            case StatutExpedition.EN_COURS: return 'badge badge-info';
            case StatutExpedition.LIVREE: return 'badge badge-success';
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