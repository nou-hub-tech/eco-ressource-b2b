import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { DeliveryOrderService } from '../../../../../core/services/delivery-order.service';
import { AlertService } from '../../../../../core/services/alert.service';
import { PdfGeneratorService } from '../../../../../core/services/pdf-generator.service';
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
    successMessage = '';
    searchForm: FormGroup;
    sortBy: string = 'date';
    sortOrder: string = 'desc';
    statuts = Object.values(StatutCommande);
    statistiques: any = null;
    showStats = false;
    rechercheActive = false;
    
    // ========== PROPRIÉTÉS DE PAGINATION ==========
    currentPage: number = 1;
    itemsPerPage: number = 3;
    totalItems: number = 0;
    paginatedOrders: DeliveryOrder[] = [];
    
    private subscriptions: Subscription = new Subscription();
    private refreshInterval: any;

    constructor(
        private deliveryOrderService: DeliveryOrderService,
        private alertService: AlertService,
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private pdfGenerator: PdfGeneratorService
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

    refreshData(): void {
        this.deliveryOrderService.getAll().subscribe({
            next: (data: any) => {
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
        this.updatePagination();
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

    // ============= STATISTIQUES ==============
    
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

    // ==================== PAGINATION ====================
    
    updatePagination(): void {
        this.totalItems = this.filteredOrders.length;
        const maxPage = this.getTotalPages();
        if (this.currentPage > maxPage && maxPage > 0) {
            this.currentPage = maxPage;
        } else if (this.currentPage < 1) {
            this.currentPage = 1;
        }
        this.setPaginatedOrders();
    }
    
    setPaginatedOrders(): void {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedOrders = this.filteredOrders.slice(startIndex, endIndex);
    }
    
    nextPage(): void {
        if (this.currentPage < this.getTotalPages()) {
            this.currentPage++;
            this.setPaginatedOrders();
        }
    }
    
    previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.setPaginatedOrders();
        }
    }
    
    goToPage(page: number): void {
        if (page >= 1 && page <= this.getTotalPages()) {
            this.currentPage = page;
            this.setPaginatedOrders();
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

    // ============ QR CODE =================
    
    async openQrCode(order: DeliveryOrder): Promise<void> {
        if (this.qrModal) {
            await this.qrModal.open(order);
        } else {
            console.error('qrModal not found');
        }
    }

    // ============ GÉNÉRATION PDF =================
    
    async onGeneratePDF(order: DeliveryOrder): Promise<void> {
        try {
            await this.pdfGenerator.generateDeliveryOrderPDF(order);
            this.successMessage = `PDF généré pour la commande #${order.idDelivery}`;
            setTimeout(() => {
                this.successMessage = '';
            }, 3000);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
            this.errorMessage = 'Erreur lors de la génération du PDF';
            setTimeout(() => {
                this.errorMessage = '';
            }, 3000);
        }
    }

    async generateAllPDFs(): Promise<void> {
        if (this.filteredOrders.length === 0) {
            this.errorMessage = 'Aucune commande à exporter';
            setTimeout(() => {
                this.errorMessage = '';
            }, 3000);
            return;
        }

        const confirmation = confirm(`Générer ${this.filteredOrders.length} PDF(s) ?`);
        if (!confirmation) return;

        this.isLoading = true;
        let count = 0;
        let errors = 0;
        
        for (const order of this.filteredOrders) {
            try {
                await this.pdfGenerator.generateDeliveryOrderPDF(order);
                count++;
            } catch (error) {
                console.error(`Erreur PDF pour commande ${order.idDelivery}:`, error);
                errors++;
            }
        }
        
        this.isLoading = false;
        if (errors === 0) {
            this.successMessage = `${count} PDF(s) généré(s) avec succès !`;
        } else {
            this.errorMessage = `${count} PDF(s) généré(s), ${errors} erreur(s)`;
        }
        setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
        }, 3000);
        this.cd.detectChanges();
    }

    // ========= ACTIONS ===============
    
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
                    this.successMessage = 'Commande supprimée avec succès';
                    setTimeout(() => {
                        this.successMessage = '';
                    }, 3000);
                },
                error: () => {
                    this.errorMessage = 'Erreur lors de la suppression';
                    setTimeout(() => {
                        this.errorMessage = '';
                    }, 3000);
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