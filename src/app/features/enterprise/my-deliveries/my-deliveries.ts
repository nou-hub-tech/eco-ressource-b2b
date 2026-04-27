import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ShipmentService } from '../../../core/services/shipment.service';
import { DeliveryOrderService } from '../../../core/services/delivery-order.service';
import { TransportService, Transporter } from '../../../core/services/transport.service';
import { PdfGeneratorService } from '../../../core/services/pdf-generator.service';
import { AuthService, User } from '../../../core/services/auth.service';
import { ShipmentUpdateService } from '../../../core/services/shipment-update.service';
import { Shipment } from '../../../core/models/shipment';
import { DeliveryOrder } from '../../../core/models/delivery-order';
import { StatutExpedition, StatutCommande } from '../../../core/models/statut';

@Component({
    selector: 'app-my-deliveries',
    standalone: false,
    templateUrl: './my-deliveries.html',
    styleUrls: ['./my-deliveries.css']
})
export class MyDeliveries implements OnInit, OnDestroy {
    
    allShipments: Shipment[] = [];
    filteredShipments: Shipment[] = [];
    deliveryOrders: Map<number, DeliveryOrder> = new Map();
    transporters: Map<number, Transporter> = new Map();
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    currentUser: User | null = null;
    currentUserName: string = '';
    private subscriptions: Subscription = new Subscription();
    private refreshInterval: any;
    private migratedShipmentIds: Set<number> = new Set();
    
    // Cache pour éviter les recalculs fréquents
    private productNamesCache: Map<number, string> = new Map();
    private co2Cache: Map<string, string> = new Map();

    constructor(
        private shipmentService: ShipmentService,
        private deliveryOrderService: DeliveryOrderService,
        private transportService: TransportService,
        private pdfGenerator: PdfGeneratorService,
        private authService: AuthService,
        private shipmentUpdateService: ShipmentUpdateService,
        private cd: ChangeDetectorRef,
        private ngZone: NgZone
    ) {}

    ngOnInit(): void {
        console.log('🚚 INITIALISATION DE MYDELIVERIES');
        this.getCurrentUser();
        this.loadDeliveryOrders();
        this.loadTransporters();
        
        // ÉCOUTER LES MISES À JOUR EN TEMPS RÉEL
        this.subscriptions.add(
            this.shipmentUpdateService.shipmentUpdated$.subscribe((data) => {
                this.ngZone.run(() => {
                    console.log('📢 Réception mise à jour:', data);
                    this.onShipmentUpdate(data);
                });
            })
        );

        // Rafraîchissement moins fréquent (10 secondes)
        this.refreshInterval = setInterval(() => {
            this.ngZone.run(() => {
                console.log('🔄 Refresh automatique...');
                this.loadShipments();
                this.loadTransporters();
            });
        }, 10000);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }

    onShipmentUpdate(data: any): void {
        console.log('🔄 Mise à jour détectée:', data);
        
        // Rechargement uniquement si nécessaire
        if (data.transporterId || data.deliveryOrderId) {
            this.loadShipments();
            this.loadTransporters();
        }
        
        if (data.transporterName && data.deliveryOrderId) {
            this.successMessage = `✅ ${data.transporterName} a accepté la livraison`;
            setTimeout(() => {
                this.successMessage = '';
                this.cd.detectChanges();
            }, 3000);
        }
    }

    getCurrentUser(): void {
        const userSub = this.authService.user$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.currentUserName = user.name.toLowerCase().trim();
                console.log('✅ Utilisateur:', this.currentUserName);
                
                if (this.allShipments.length > 0) {
                    this.filterShipmentsByClient();
                } else {
                    this.loadShipments();
                }
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(userSub);
        
        const currentUser = this.authService.currentUser;
        if (currentUser && !this.currentUser) {
            this.currentUser = currentUser;
            this.currentUserName = currentUser.name.toLowerCase().trim();
        }
    }

    loadShipments(): void {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const sub = this.shipmentService.getAll().subscribe({
            next: (data: Shipment[]) => {
                this.allShipments = data || [];
                this.filterShipmentsByClient();
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('❌ Erreur:', error);
                this.errorMessage = 'Erreur chargement';
                this.isLoading = false;
                setTimeout(() => this.errorMessage = '', 3000);
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(sub);
    }

    filterShipmentsByClient(): void {
        if (this.deliveryOrders.size === 0 || !this.currentUserName) {
            return;
        }

        this.filteredShipments = this.allShipments.filter(shipment => {
            const orderId = shipment.deliveryOrder?.idDelivery;
            const order = this.deliveryOrders.get(orderId);
            const clientName = order?.nomClient?.toLowerCase().trim() || '';
            return clientName === this.currentUserName;
        });
        
        this.cd.detectChanges();
    }

    loadDeliveryOrders(): void {
        const sub = this.deliveryOrderService.getAll().subscribe({
            next: (orders: DeliveryOrder[]) => {
                if (orders && orders.length > 0) {
                    orders.forEach(order => {
                        if (order && order.idDelivery) {
                            this.deliveryOrders.set(order.idDelivery, order);
                        }
                    });
                }
                this.filterShipmentsByClient();
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('❌ Erreur commandes:', error);
            }
        });
        this.subscriptions.add(sub);
    }

    loadTransporters(): void {
        const sub = this.transportService.getAllTransporters().subscribe({
            next: (transportersList: Transporter[]) => {
                this.transporters.clear();
                if (transportersList && transportersList.length > 0) {
                    transportersList.forEach(transporter => {
                        if (transporter && transporter.id) {
                            this.transporters.set(transporter.id, transporter);
                            console.log(`📦 Transporteur: ID=${transporter.id}, Nom=${transporter.companyName}`);
                        }
                    });
                } else {
                    // Mock data uniquement si API échoue
                    this.transporters.set(1, { id: 1, userId: 3, companyName: 'Karim Logistics', listingsCount: 0, ordersCount: 0, createdAt: '' } as Transporter);
                    this.transporters.set(2, { id: 2, userId: 4, companyName: 'linda', listingsCount: 0, ordersCount: 0, createdAt: '' } as Transporter);
                }
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('❌ Erreur chargement transporteurs:', error);
                this.transporters.set(1, { id: 1, userId: 3, companyName: 'Karim Logistics', listingsCount: 0, ordersCount: 0, createdAt: '' } as Transporter);
                this.transporters.set(2, { id: 2, userId: 4, companyName: 'linda', listingsCount: 0, ordersCount: 0, createdAt: '' } as Transporter);
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(sub);
    }

    /**
     * Méthode corrigée : Affiche le nom UNIQUEMENT si la commande a été acceptée
     * @param idTransporter - L'ID du transporteur dans l'expédition
     * @param shipmentStatut - Le statut de l'expédition (EN_ATTENTE, EN_COURS, LIVREE)
     * @param deliveryOrderId - L'ID de la commande pour vérifier son statut
     * @returns Le nom du transporteur ou "-" si non acceptée
     */
    getTransporterName(idTransporter: number, shipmentStatut: StatutExpedition, deliveryOrderId: number): string {
        console.log(`🔍 getTransporterName - ID: ${idTransporter}, Statut Exp: ${shipmentStatut}, OrderId: ${deliveryOrderId}`);
        
        // Récupérer la commande associée
        const order = this.deliveryOrders.get(deliveryOrderId);
        const orderStatut = order?.statut;
        
        console.log(`   → Statut commande: ${orderStatut}`);
        
        // CRITIQUE: Si la commande est EN_ATTENTE (pas encore acceptée) → afficher "-"
        if (orderStatut === StatutCommande.EN_ATTENTE) {
            console.log(`   → Commande non acceptée, affichage "-"`);
            return '-';
        }
        
        // Si l'expédition est en attente → "-"
        if (shipmentStatut === StatutExpedition.EN_ATTENTE) {
            console.log(`   → Expédition en attente, affichage "-"`);
            return '-';
        }
        
        // Si pas de transporteur assigné → "-"
        if (!idTransporter || idTransporter === 0) {
            console.log(`   → Pas de transporteur assigné, affichage "-"`);
            return '-';
        }
        
        // Chercher le transporteur dans la Map
        const transporter = this.transporters.get(idTransporter);
        if (transporter) {
            console.log(`   ✅ Transporteur trouvé: ${transporter.companyName}`);
            return transporter.companyName;
        }
        
        // Fallback
        console.log(`   ⚠️ Transporteur non trouvé pour ID ${idTransporter}`);
        return `Transporteur #${idTransporter}`;
    }

    getClientName(deliveryOrderId: number): string {
        const order = this.deliveryOrders.get(deliveryOrderId);
        return order?.nomClient || 'Client inconnu';
    }

    getClientAddress(deliveryOrderId: number): string {
        const order = this.deliveryOrders.get(deliveryOrderId);
        return order?.adresseLivraison || 'Adresse inconnue';
    }

    getQuantity(quantite: number): string {
        return !quantite ? '0' : `${quantite} unité(s)`;
    }

    getStatutClass(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 'badge badge-warning';
            case StatutExpedition.EN_COURS: return 'badge badge-info';
            case StatutExpedition.LIVREE: return 'badge badge-success';
            default: return 'badge badge-neutral';
        }
    }

    getStatutText(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: return 'En attente';
            case StatutExpedition.EN_COURS: return 'En cours';
            case StatutExpedition.LIVREE: return 'Livrée';
            default: return String(statut);
        }
    }

    getProductName(produitId: number): string {
        if (this.productNamesCache.has(produitId)) {
            return this.productNamesCache.get(produitId)!;
        }
        
        const produits: { [key: number]: string } = {
            1: 'Équipements électroniques',
            2: 'Pièces détachées',
            5: 'Textile',
            8: 'Alimentaire',
            50: 'Métaux et acier',
            85: 'Plastique et polymères'
        };
        const name = produits[produitId] || `Produit #${produitId}`;
        this.productNamesCache.set(produitId, name);
        return name;
    }

    getCO2Saved(quantite: number, distance?: number): string {
        const key = `${quantite}_${distance}`;
        if (this.co2Cache.has(key)) {
            return this.co2Cache.get(key)!;
        }
        
        const estimatedDistance = distance || 50;
        const co2 = quantite * estimatedDistance * 0.2;
        const result = co2 >= 1000 ? `${(co2 / 1000).toFixed(1)} t` : `${Math.round(co2)} kg`;
        this.co2Cache.set(key, result);
        return result;
    }

    getTotalDeliveries(): number {
        return this.filteredShipments.length;
    }

    getCompletedDeliveries(): number {
        return this.filteredShipments.filter(s => s.statut === StatutExpedition.LIVREE).length;
    }

    getPendingDeliveries(): number {
        return this.filteredShipments.filter(s => s.statut === StatutExpedition.EN_ATTENTE).length;
    }

    getInProgressDeliveries(): number {
        return this.filteredShipments.filter(s => s.statut === StatutExpedition.EN_COURS).length;
    }

    onGeneratePDF(shipmentId: number): void {
        const shipment = this.filteredShipments.find(s => s.id === shipmentId);
        if (!shipment) {
            this.errorMessage = 'Expédition non trouvée';
            setTimeout(() => this.errorMessage = '', 3000);
            return;
        }
        
        const orderId = shipment.deliveryOrder?.idDelivery;
        const deliveryOrder = orderId ? this.deliveryOrders.get(orderId) : null;
        
        try {
            this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder || null);
            this.successMessage = `PDF #${shipmentId} généré`;
            setTimeout(() => this.successMessage = '', 3000);
        } catch (error) {
            console.error('❌ Erreur PDF:', error);
            this.errorMessage = 'Erreur génération PDF';
            setTimeout(() => this.errorMessage = '', 3000);
        }
    }

    generateAllPDFs(): void {
        if (this.filteredShipments.length === 0) {
            this.errorMessage = 'Aucune expédition';
            setTimeout(() => this.errorMessage = '', 3000);
            return;
        }

        if (!confirm(`Générer ${this.filteredShipments.length} PDF(s) ?`)) return;

        this.isLoading = true;
        let count = 0;
        
        this.filteredShipments.forEach((shipment, index) => {
            const deliveryOrder = this.deliveryOrders.get(shipment.deliveryOrder?.idDelivery) || null;
            
            setTimeout(() => {
                try {
                    this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder);
                    count++;
                } catch (error) {
                    console.error(`❌ Erreur PDF ${shipment.id}:`, error);
                }
                
                if (index === this.filteredShipments.length - 1) {
                    this.isLoading = false;
                    this.successMessage = `${count} PDF(s) généré(s)`;
                    setTimeout(() => this.successMessage = '', 3000);
                    this.cd.detectChanges();
                }
            }, index * 200);
        });
    }

    // Méthode de diagnostic
    diagnosticTransporteurs(): void {
        console.log('=== DIAGNOSTIC MYDELIVERIES ===');
        console.log('Transporters Map:', Array.from(this.transporters.entries()));
        console.log('Filtered Shipments:', this.filteredShipments.length);
        this.filteredShipments.forEach(s => {
            const order = this.deliveryOrders.get(s.deliveryOrder?.idDelivery);
            console.log(`Shipment #${s.id} - OrderStatut: ${order?.statut} - TransporterID: ${s.idTransporter} - Nom: ${this.getTransporterName(s.idTransporter, s.statut, s.deliveryOrder?.idDelivery)}`);
        });
        alert(`Diagnostic:\nTransporteurs: ${this.transporters.size}\nExpéditions: ${this.filteredShipments.length}`);
    }
}