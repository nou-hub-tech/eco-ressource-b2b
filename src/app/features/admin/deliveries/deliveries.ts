import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DeliveryOrderService } from '../../../core/services/delivery-order.service';
import { ShipmentService } from '../../../core/services/shipment.service';
import { AlertService } from '../../../core/services/alert.service';
import { PdfGeneratorService } from '../../../core/services/pdf-generator.service';
import { DeliveryOrder } from '../../../core/models/delivery-order';
import { Shipment } from '../../../core/models/shipment';
import { StatutCommande, StatutExpedition } from '../../../core/models/statut';

@Component({
  selector: 'app-deliveries',
  standalone: false,
  templateUrl: './deliveries.html',
  styleUrls: ['./deliveries.css']
})
export class Deliveries implements OnInit, OnDestroy {
  
  // ========== PROPRIÉTÉS COMMUNES ==========
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  activeTab: string = 'orders'; // 'orders' ou 'shipments'
  
  // ========== COMMANDES ==========
  deliveryOrders: DeliveryOrder[] = [];
  filteredOrders: DeliveryOrder[] = [];
  searchFormOrders: FormGroup;
  sortByOrders: string = 'date';
  sortOrderOrders: string = 'desc';
  statutsOrders = Object.values(StatutCommande);
  statistiquesOrders: any = null;
  showStatsOrders = false;
  rechercheActiveOrders = false;
  
  // Pagination Commandes
  currentPageOrders: number = 1;
  itemsPerPageOrders: number = 3;
  totalItemsOrders: number = 0;
  paginatedOrders: DeliveryOrder[] = [];
  
  // ========== EXPÉDITIONS ==========
  shipments: Shipment[] = [];
  filteredShipments: Shipment[] = [];
  deliveryOrdersMap: Map<number, DeliveryOrder> = new Map();
  searchFormShipments: FormGroup;
  sortByShipments: string = 'date';
  sortOrderShipments: string = 'desc';
  statutsShipments = Object.values(StatutExpedition);
  statistiquesShipments: any = null;
  showStatsShipments = false;
  rechercheActiveShipments = false;
  
  // Pagination Expéditions
  currentPageShipments: number = 1;
  itemsPerPageShipments: number = 3;
  totalItemsShipments: number = 0;
  paginatedShipments: Shipment[] = [];
  
  private subscriptions: Subscription = new Subscription();
  private refreshInterval: any;

  constructor(
    private deliveryOrderService: DeliveryOrderService,
    private shipmentService: ShipmentService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private pdfGenerator: PdfGeneratorService
  ) {
    // Formulaire Commandes
    this.searchFormOrders = this.fb.group({
      nomClient: [''],
      adresseLivraison: [''],
      statut: [''],
      datePrevue: ['']
    });
    
    // Formulaire Expéditions
    this.searchFormShipments = this.fb.group({
      produitId: [''],
      quantite: [''],
      statut: [''],
      dateDepart: ['']
    });
  }

  ngOnInit(): void {
    this.loadDeliveryOrders();
    this.loadShipments();
    this.loadStatistiquesOrders();
    this.loadStatistiquesShipments();
    this.setupDynamicSearchOrders();
    this.setupDynamicSearchShipments();
    
    window.addEventListener('orderChanged', this.handleOrderChange.bind(this));
    window.addEventListener('shipmentChanged', this.handleShipmentChange.bind(this));
    window.addEventListener('focus', () => {
      this.loadDeliveryOrders();
      this.loadShipments();
    });
    
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    window.removeEventListener('orderChanged', this.handleOrderChange.bind(this));
    window.removeEventListener('shipmentChanged', this.handleShipmentChange.bind(this));
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  // ========== CHANGEMENT D'ONGLET ==========
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // ========== RAFFRAÎCHISSEMENT ==========
  refreshData(): void {
    this.loadDeliveryOrders();
    this.loadShipments();
  }

  // ==================== COMMANDES ====================
  
  setupDynamicSearchOrders(): void {
    const nomClientSub = this.searchFormOrders.get('nomClient')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (value && value.trim()) {
            this.rechercheActiveOrders = true;
            this.isLoading = true;
            return this.deliveryOrderService.searchByNomClient(value);
          } else if (!this.hasActiveFiltersOrders()) {
            this.rechercheActiveOrders = false;
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
    
    const adresseSub = this.searchFormOrders.get('adresseLivraison')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (value && value.trim()) {
            this.rechercheActiveOrders = true;
            this.isLoading = true;
            return this.deliveryOrderService.searchByAdresse(value);
          } else if (!this.hasActiveFiltersOrders()) {
            this.rechercheActiveOrders = false;
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
    
    const statutSub = this.searchFormOrders.get('statut')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(value => {
          if (value) {
            this.rechercheActiveOrders = true;
            this.isLoading = true;
            return this.deliveryOrderService.getByStatut(value);
          } else if (!this.hasActiveFiltersOrders()) {
            this.rechercheActiveOrders = false;
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
    
    const dateSub = this.searchFormOrders.get('datePrevue')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (value) {
            this.rechercheActiveOrders = true;
            this.isLoading = true;
            return this.deliveryOrderService.searchByDate(value);
          } else if (!this.hasActiveFiltersOrders()) {
            this.rechercheActiveOrders = false;
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
  
  hasActiveFiltersOrders(): boolean {
    const form = this.searchFormOrders.value;
    return !!(form.nomClient || form.adresseLivraison || form.statut || form.datePrevue);
  }
  
  resetFiltersOrders(): void {
    this.searchFormOrders.reset();
    this.rechercheActiveOrders = false;
    this.loadDeliveryOrders();
  }
  
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
    const statutFiltre = this.searchFormOrders.get('statut')?.value;
    if (statutFiltre && !this.rechercheActiveOrders) {
      this.filteredOrders = this.deliveryOrders.filter(
        order => order.statut === statutFiltre
      );
    } else {
      this.filteredOrders = [...this.deliveryOrders];
    }
    this.updatePaginationOrders();
  }
  
  updatePaginationOrders(): void {
    this.totalItemsOrders = this.filteredOrders.length;
    const maxPage = this.getTotalPagesOrders();
    if (this.currentPageOrders > maxPage && maxPage > 0) {
      this.currentPageOrders = maxPage;
    } else if (this.currentPageOrders < 1) {
      this.currentPageOrders = 1;
    }
    this.setPaginatedOrders();
  }
  
  setPaginatedOrders(): void {
    const startIndex = (this.currentPageOrders - 1) * this.itemsPerPageOrders;
    const endIndex = startIndex + this.itemsPerPageOrders;
    this.paginatedOrders = this.filteredOrders.slice(startIndex, endIndex);
  }
  
  nextPageOrders(): void {
    if (this.currentPageOrders < this.getTotalPagesOrders()) {
      this.currentPageOrders++;
      this.setPaginatedOrders();
    }
  }
  
  previousPageOrders(): void {
    if (this.currentPageOrders > 1) {
      this.currentPageOrders--;
      this.setPaginatedOrders();
    }
  }
  
  goToPageOrders(page: number): void {
    if (page >= 1 && page <= this.getTotalPagesOrders()) {
      this.currentPageOrders = page;
      this.setPaginatedOrders();
    }
  }
  
  getTotalPagesOrders(): number {
    return Math.ceil(this.totalItemsOrders / this.itemsPerPageOrders);
  }
  
  getPageNumbersOrders(): number[] {
    const totalPages = this.getTotalPagesOrders();
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  getStartIndexOrders(): number {
    return (this.currentPageOrders - 1) * this.itemsPerPageOrders + 1;
  }
  
  getEndIndexOrders(): number {
    return Math.min(this.currentPageOrders * this.itemsPerPageOrders, this.totalItemsOrders);
  }
  
  sortOrdersByField(field: string): void {
    if (this.sortByOrders === field) {
      this.sortOrderOrders = this.sortOrderOrders === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortByOrders = field;
      this.sortOrderOrders = 'asc';
    }
    
    this.isLoading = true;
    const sub = this.deliveryOrderService.sortBy(field, this.sortOrderOrders).subscribe({
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
  
  loadStatistiquesOrders(): void {
    const sub = this.deliveryOrderService.getStatistiques().subscribe({
      next: (data: any) => {
        this.statistiquesOrders = data;
        this.cd.detectChanges();
      },
      error: (error: any) => {
        console.error('Erreur chargement statistiques commandes', error);
      }
    });
    this.subscriptions.add(sub);
  }
  
  toggleStatsOrders(): void {
    this.showStatsOrders = !this.showStatsOrders;
    if (this.showStatsOrders && !this.statistiquesOrders) {
      this.loadStatistiquesOrders();
    }
  }
  
  getProgressWidthOrders(statut: string): string {
    if (this.statistiquesOrders && this.statistiquesOrders.total > 0) {
      const count = this.statistiquesOrders.parStatut?.[statut] || 0;
      return (count * 100 / this.statistiquesOrders.total) + '%';
    }
    return '0%';
  }
  
  // ========== NAVIGATION COMMANDES ==========
  onViewOrderDetail(id: number): void {
    this.router.navigate(['/admin/delivery-orders/detail', id]);
  }
  
  onEditOrder(id: number): void {
    this.router.navigate(['/admin/delivery-orders/edit', id]);
  }
  
  onCreateOrder(): void {
    this.router.navigate(['/admin/delivery-orders/new']);
  }
  
  onGenerateOrderPDF(order: DeliveryOrder): void {
    this.pdfGenerator.generateDeliveryOrderPDF(order);
    this.successMessage = `PDF généré pour la commande #${order.idDelivery}`;
    setTimeout(() => { this.successMessage = ''; }, 3000);
  }
  
  onDeleteOrder(id: number): void {
    if (confirm('Supprimer cette commande ?')) {
      this.deliveryOrderService.delete(id).subscribe({
        next: () => {
          this.loadDeliveryOrders();
          this.loadStatistiquesOrders();
          this.successMessage = 'Commande supprimée avec succès';
          setTimeout(() => { this.successMessage = ''; }, 3000);
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la suppression';
          setTimeout(() => { this.errorMessage = ''; }, 3000);
        }
      });
    }
  }
  
  generateAllOrdersPDFs(): void {
    if (this.filteredOrders.length === 0) {
      this.errorMessage = 'Aucune commande à exporter';
      return;
    }
    const confirmation = confirm(`Générer ${this.filteredOrders.length} PDF(s) ?`);
    if (!confirmation) return;
    this.isLoading = true;
    let count = 0;
    for (const order of this.filteredOrders) {
      this.pdfGenerator.generateDeliveryOrderPDF(order);
      count++;
    }
    this.isLoading = false;
    this.successMessage = `${count} PDF(s) généré(s) avec succès !`;
    setTimeout(() => { this.successMessage = ''; }, 3000);
    this.cd.detectChanges();
  }
  
  getStatutClassOrder(statut: StatutCommande): string {
    switch(statut) {
      case StatutCommande.EN_ATTENTE: return 'badge badge-warning';
      case StatutCommande.EN_COURS: return 'badge badge-info';
      case StatutCommande.LIVREE: return 'badge badge-success';
      default: return 'badge badge-neutral';
    }
  }

  // ========== GESTION DES LIVRAISONS ================
  
  updateOrderStatus(order: DeliveryOrder, newStatus: StatutCommande): void {
    if (confirm(`Changer le statut de la commande #${order.idDelivery} vers ${newStatus} ?`)) {
      this.deliveryOrderService.updateStatut(order.idDelivery, newStatus).subscribe({
        next: () => {
          this.loadDeliveryOrders();
          this.successMessage = `Statut de la commande #${order.idDelivery} mis à jour`;
          setTimeout(() => { this.successMessage = ''; }, 3000);
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la mise à jour du statut';
          setTimeout(() => { this.errorMessage = ''; }, 3000);
        }
      });
    }
  }

  // ==================== EXPÉDITIONS ====================
  
  setupDynamicSearchShipments(): void {
    const produitSub = this.searchFormShipments.get('produitId')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (value && value.toString().trim()) {
            this.rechercheActiveShipments = true;
            this.isLoading = true;
            return this.shipmentService.searchByProduit(value);
          } else if (!this.hasActiveFiltersShipments()) {
            this.rechercheActiveShipments = false;
            return this.shipmentService.getAll();
          }
          return this.shipmentService.getAll();
        })
      )
      .subscribe({
        next: (data: any) => {
          this.shipments = data;
          this.filterShipments();
          this.isLoading = false;
          this.cd.detectChanges();
        },
        error: (error: any) => {
          console.error('Erreur recherche produit:', error);
          this.errorMessage = 'Erreur lors de la recherche par produit';
          this.isLoading = false;
          this.cd.detectChanges();
        }
      });
    this.subscriptions.add(produitSub);
    
    const quantiteSub = this.searchFormShipments.get('quantite')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (value && value.toString().trim()) {
            this.rechercheActiveShipments = true;
            this.isLoading = true;
            return this.shipmentService.searchByQuantite(value);
          } else if (!this.hasActiveFiltersShipments()) {
            this.rechercheActiveShipments = false;
            return this.shipmentService.getAll();
          }
          return this.shipmentService.getAll();
        })
      )
      .subscribe({
        next: (data: any) => {
          this.shipments = data;
          this.filterShipments();
          this.isLoading = false;
          this.cd.detectChanges();
        },
        error: (error: any) => {
          console.error('Erreur recherche quantité:', error);
          this.errorMessage = 'Erreur lors de la recherche par quantité';
          this.isLoading = false;
          this.cd.detectChanges();
        }
      });
    this.subscriptions.add(quantiteSub);
    
    const statutSub = this.searchFormShipments.get('statut')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(value => {
          if (value) {
            this.rechercheActiveShipments = true;
            this.isLoading = true;
            return this.shipmentService.getByStatut(value);
          } else if (!this.hasActiveFiltersShipments()) {
            this.rechercheActiveShipments = false;
            return this.shipmentService.getAll();
          }
          return this.shipmentService.getAll();
        })
      )
      .subscribe({
        next: (data: any) => {
          this.shipments = data;
          this.filterShipments();
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
    
    const dateSub = this.searchFormShipments.get('dateDepart')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (value) {
            this.rechercheActiveShipments = true;
            this.isLoading = true;
            return this.shipmentService.searchByDate(value);
          } else if (!this.hasActiveFiltersShipments()) {
            this.rechercheActiveShipments = false;
            return this.shipmentService.getAll();
          }
          return this.shipmentService.getAll();
        })
      )
      .subscribe({
        next: (data: any) => {
          this.shipments = data;
          this.filterShipments();
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
  
  hasActiveFiltersShipments(): boolean {
    const form = this.searchFormShipments.value;
    return !!(form.produitId || form.quantite || form.statut || form.dateDepart);
  }
  
  resetFiltersShipments(): void {
    this.searchFormShipments.reset();
    this.rechercheActiveShipments = false;
    this.loadShipments();
  }
  
  loadShipments(): void {
    this.isLoading = true;
    const sub = this.shipmentService.getAll().subscribe({
      next: (data: any) => {
        this.shipments = data;
        this.loadDeliveryOrdersMap();
        this.filterShipments();
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (error: any) => {
        console.error('Erreur chargement:', error);
        this.errorMessage = 'Erreur lors du chargement des expéditions';
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
    this.subscriptions.add(sub);
  }
  
  loadDeliveryOrdersMap(): void {
    const sub = this.deliveryOrderService.getAll().subscribe({
      next: (orders) => {
        orders.forEach(order => {
          this.deliveryOrdersMap.set(order.idDelivery, order);
        });
        this.cd.detectChanges();
      },
      error: (error: any) => {
        console.error('Erreur chargement commandes:', error);
      }
    });
    this.subscriptions.add(sub);
  }
  
  filterShipments(): void {
    const statutFiltre = this.searchFormShipments.get('statut')?.value;
    if (statutFiltre && !this.rechercheActiveShipments) {
      this.filteredShipments = this.shipments.filter(
        shipment => shipment.statut === statutFiltre
      );
    } else {
      this.filteredShipments = [...this.shipments];
    }
    this.updatePaginationShipments();
  }
  
  updatePaginationShipments(): void {
    this.totalItemsShipments = this.filteredShipments.length;
    const maxPage = this.getTotalPagesShipments();
    if (this.currentPageShipments > maxPage && maxPage > 0) {
      this.currentPageShipments = maxPage;
    } else if (this.currentPageShipments < 1) {
      this.currentPageShipments = 1;
    }
    this.setPaginatedShipments();
  }
  
  setPaginatedShipments(): void {
    const startIndex = (this.currentPageShipments - 1) * this.itemsPerPageShipments;
    const endIndex = startIndex + this.itemsPerPageShipments;
    this.paginatedShipments = this.filteredShipments.slice(startIndex, endIndex);
  }
  
  nextPageShipments(): void {
    if (this.currentPageShipments < this.getTotalPagesShipments()) {
      this.currentPageShipments++;
      this.setPaginatedShipments();
    }
  }
  
  previousPageShipments(): void {
    if (this.currentPageShipments > 1) {
      this.currentPageShipments--;
      this.setPaginatedShipments();
    }
  }
  
  goToPageShipments(page: number): void {
    if (page >= 1 && page <= this.getTotalPagesShipments()) {
      this.currentPageShipments = page;
      this.setPaginatedShipments();
    }
  }
  
  getTotalPagesShipments(): number {
    return Math.ceil(this.totalItemsShipments / this.itemsPerPageShipments);
  }
  
  getPageNumbersShipments(): number[] {
    const totalPages = this.getTotalPagesShipments();
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  getStartIndexShipments(): number {
    return (this.currentPageShipments - 1) * this.itemsPerPageShipments + 1;
  }
  
  getEndIndexShipments(): number {
    return Math.min(this.currentPageShipments * this.itemsPerPageShipments, this.totalItemsShipments);
  }
  
  sortShipmentsByField(field: string): void {
    if (this.sortByShipments === field) {
      this.sortOrderShipments = this.sortOrderShipments === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortByShipments = field;
      this.sortOrderShipments = 'asc';
    }
    
    this.isLoading = true;
    const sub = this.shipmentService.sortBy(field, this.sortOrderShipments).subscribe({
      next: (data: any) => {
        this.shipments = data;
        this.filterShipments();
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
  
  loadStatistiquesShipments(): void {
    const sub = this.shipmentService.getStatistiques().subscribe({
      next: (data: any) => {
        this.statistiquesShipments = data;
        this.cd.detectChanges();
      },
      error: (error: any) => {
        console.error('Erreur chargement statistiques expéditions', error);
      }
    });
    this.subscriptions.add(sub);
  }
  
  toggleStatsShipments(): void {
    this.showStatsShipments = !this.showStatsShipments;
    if (this.showStatsShipments && !this.statistiquesShipments) {
      this.loadStatistiquesShipments();
    }
  }
  
  getClientName(deliveryOrderId: number): string {
    const order = this.deliveryOrdersMap.get(deliveryOrderId);
    return order ? order.nomClient : 'Inconnu';
  }
  
  // ========== NAVIGATION EXPÉDITIONS ==========
  onViewShipmentDetail(id: number): void {
    this.router.navigate(['/admin/shipments/detail', id]);
  }
  
  onEditShipment(id: number): void {
    this.router.navigate(['/admin/shipments/edit', id]);
  }
  
  onCreateShipment(): void {
    this.router.navigate(['/admin/shipments/new']);
  }
  
  onDeleteShipment(id: number): void {
    if (confirm('Supprimer cette expédition ?')) {
      this.shipmentService.delete(id).subscribe({
        next: () => {
          this.loadShipments();
          this.loadStatistiquesShipments();
          this.successMessage = 'Expédition supprimée avec succès';
          setTimeout(() => { this.successMessage = ''; }, 3000);
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la suppression';
          setTimeout(() => { this.errorMessage = ''; }, 3000);
        }
      });
    }
  }
  
  onGenerateShipmentPDF(shipmentId: number): void {
    const shipment = this.shipments.find(s => s.id === shipmentId);
    if (!shipment) {
      this.errorMessage = 'Expédition non trouvée';
      return;
    }
    const deliveryOrder = this.deliveryOrdersMap.get(shipment.deliveryOrder.idDelivery) || null;
    this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder);
    this.successMessage = `PDF généré pour l'expédition #${shipment.id}`;
    setTimeout(() => { this.successMessage = ''; }, 3000);
  }
  
  generateAllShipmentsPDFs(): void {
    if (this.filteredShipments.length === 0) {
      this.errorMessage = 'Aucune expédition à exporter';
      return;
    }
    const confirmation = confirm(`Générer ${this.filteredShipments.length} PDF(s) ?`);
    if (!confirmation) return;
    this.isLoading = true;
    let count = 0;
    for (const shipment of this.filteredShipments) {
      const deliveryOrder = this.deliveryOrdersMap.get(shipment.deliveryOrder.idDelivery) || null;
      this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder);
      count++;
    }
    this.isLoading = false;
    this.successMessage = `${count} PDF(s) généré(s) avec succès !`;
    setTimeout(() => { this.successMessage = ''; }, 3000);
    this.cd.detectChanges();
  }
  
  getStatutClassShipment(statut: StatutExpedition): string {
    switch(statut) {
      case StatutExpedition.EN_ATTENTE: return 'badge badge-warning';
      case StatutExpedition.EN_COURS: return 'badge badge-info';
      case StatutExpedition.LIVREE: return 'badge badge-success';
      default: return 'badge badge-neutral';
    }
  }
  
  getProgressWidthShipments(statut: string): string {
    if (this.statistiquesShipments && this.statistiquesShipments.total > 0) {
      const count = this.statistiquesShipments.parStatut?.[statut] || 0;
      return (count * 100 / this.statistiquesShipments.total) + '%';
    }
    return '0%';
  }
  
  handleOrderChange(): void {
    if (!this.rechercheActiveOrders) {
      this.loadDeliveryOrders();
    }
    this.loadStatistiquesOrders();
  }
  
  handleShipmentChange(): void {
    if (!this.rechercheActiveShipments) {
      this.loadShipments();
    }
    this.loadStatistiquesShipments();
  }
}