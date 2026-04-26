import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
import { StatutExpedition } from '../../../core/models/statut';

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

    constructor(
        private shipmentService: ShipmentService,
        private deliveryOrderService: DeliveryOrderService,
        private transportService: TransportService,
        private pdfGenerator: PdfGeneratorService,
        private authService: AuthService,
        private shipmentUpdateService: ShipmentUpdateService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getCurrentUser();
        this.loadDeliveryOrders();
        this.loadTransporters();
        
        // ÉCOUTER LES MISES À JOUR EN TEMPS RÉEL
        this.subscriptions.add(
            this.shipmentUpdateService.shipmentUpdated$.subscribe((data) => {
                console.log('📢 Réception mise à jour dans my-deliveries:', data);
                this.onShipmentUpdate(data);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onShipmentUpdate(data: any): void {
        console.log('🔄 Mise à jour détectée, rechargement des données...');
        
        // Recharger les expéditions
        this.loadShipments();
        
        // Recharger les transporteurs
        this.loadTransporters();
        
        // Afficher un message de succès
        if (data.type === 'NEW_SHIPMENT' && data.transporterName) {
            this.successMessage = `✅ Nouvelle livraison assignée à ${data.transporterName}`;
        } else {
            this.successMessage = '✅ Mise à jour des livraisons';
        }
        
        setTimeout(() => {
            this.successMessage = '';
            this.cd.detectChanges();
        }, 4000);
    }

    getCurrentUser(): void {
        const userSub = this.authService.user$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.currentUserName = user.name.toLowerCase().trim();
                console.log('✅ Utilisateur connecté:', this.currentUser);
                console.log('📛 Nom pour filtrage:', this.currentUserName);
                
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
        this.isLoading = true;
        const sub = this.shipmentService.getAll().subscribe({
            next: (data: Shipment[]) => {
                console.log('📦 Toutes les expéditions reçues:', data.length);
                this.allShipments = data || [];
                this.filterShipmentsByClient();
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('❌ Erreur chargement shipments:', error);
                this.errorMessage = 'Erreur lors du chargement des expéditions';
                this.isLoading = false;
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(sub);
    }

    filterShipmentsByClient(): void {
        if (this.deliveryOrders.size === 0) {
            console.log('⏳ En attente du chargement des commandes...');
            return;
        }

        if (!this.currentUserName) {
            console.warn('⚠️ Aucun nom d\'utilisateur connecté trouvé');
            this.filteredShipments = [];
            this.cd.detectChanges();
            return;
        }

        this.filteredShipments = this.allShipments.filter(shipment => {
            const orderId = shipment.deliveryOrder?.idDelivery;
            const order = this.deliveryOrders.get(orderId);
            const clientName = order?.nomClient?.toLowerCase().trim() || '';
            
            const isMatch = clientName === this.currentUserName;
            
            if (isMatch) {
                console.log(`✓ Match trouvé: ${clientName} === ${this.currentUserName} (expédition #${shipment.id}, transporteur ID: ${shipment.idTransporter})`);
            }
            
            return isMatch;
        });
        
        console.log(`📊 Expéditions filtrées: ${this.filteredShipments.length} sur ${this.allShipments.length}`);
        console.log(`👤 Client cible: "${this.currentUserName}"`);
        this.cd.detectChanges();
    }

    loadDeliveryOrders(): void {
        const sub = this.deliveryOrderService.getAll().subscribe({
            next: (orders: DeliveryOrder[]) => {
                console.log('📋 Commandes reçues:', orders.length);
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
                console.error('❌ Erreur chargement commandes:', error);
            }
        });
        this.subscriptions.add(sub);
    }

    loadTransporters(): void {
        const sub = this.transportService.getAllTransporters().subscribe({
            next: (transportersList: Transporter[]) => {
                console.log('🚚 Transporteurs reçus:', transportersList.length);
                if (transportersList && transportersList.length > 0) {
                    transportersList.forEach(transporter => {
                        if (transporter && transporter.id) {
                            this.transporters.set(transporter.id, transporter);
                        }
                    });
                }
                console.log('📋 Map des transporteurs:', Array.from(this.transporters.entries()));
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('❌ Erreur chargement transporteurs:', error);
                // Données mockées
                const mockTransporters: Transporter[] = [
                    { id: 1, companyName: 'Transport Express', listingsCount: 0, ordersCount: 0, createdAt: new Date().toISOString() },
                    { id: 2, companyName: 'Logistic Pro', listingsCount: 0, ordersCount: 0, createdAt: new Date().toISOString() },
                    { id: 3, companyName: 'Fast Delivery', listingsCount: 0, ordersCount: 0, createdAt: new Date().toISOString() }
                ];
                mockTransporters.forEach(transporter => {
                    this.transporters.set(transporter.id, transporter);
                });
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(sub);
    }

    // ========== MÉTHODE CLÉ POUR AFFICHER LE TRANSPORTEUR ==========
    getTransporterName(idTransporter: number): string {
        // Si pas de transporteur assigné → afficher "-"
        if (!idTransporter || idTransporter === 0) {
            return '-';
        }
        
        // Chercher le transporteur dans la Map
        const transporter = this.transporters.get(idTransporter);
        if (transporter) {
            return transporter.companyName;
        }
        
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
        if (!quantite) return '0';
        return `${quantite} unité(s)`;
    }

    getStatutClass(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: 
                return 'badge badge-warning';
            case StatutExpedition.EN_COURS: 
                return 'badge badge-info';
            case StatutExpedition.LIVREE: 
                return 'badge badge-success';
            default: 
                return 'badge badge-neutral';
        }
    }

    getStatutText(statut: StatutExpedition): string {
        switch(statut) {
            case StatutExpedition.EN_ATTENTE: 
                return 'En attente';
            case StatutExpedition.EN_COURS: 
                return 'En cours';
            case StatutExpedition.LIVREE: 
                return 'Livrée';
            default: 
                return String(statut);
        }
    }

    getProductName(produitId: number): string {
        const produits: { [key: number]: string } = {
            1: 'Équipements électroniques',
            2: 'Pièces détachées',
            5: 'Textile',
            8: 'Alimentaire',
            50: 'Métaux et acier',
            85: 'Plastique et polymères'
        };
        return produits[produitId] || `Produit #${produitId}`;
    }

    getCO2Saved(quantite: number, distance?: number): string {
        const estimatedDistance = distance || 50;
        const co2 = quantite * estimatedDistance * 0.2;
        return co2 >= 1000 ? `${(co2 / 1000).toFixed(1)} t` : `${Math.round(co2)} kg`;
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

    // ========== MÉTHODES PDF ==========
    onGeneratePDF(shipmentId: number): void {
        const shipment = this.filteredShipments.find(s => s.id === shipmentId);
        
        if (!shipment) {
            console.error('❌ Expédition non trouvée');
            this.errorMessage = 'Impossible de générer le PDF : expédition non trouvée';
            this.clearMessagesAfterDelay();
            return;
        }
        
        const orderId = shipment.deliveryOrder?.idDelivery;
        const deliveryOrder = orderId ? this.deliveryOrders.get(orderId) : null;
        
        try {
            this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder || null);
            this.successMessage = `PDF généré pour l'expédition #${shipmentId}`;
            this.clearMessagesAfterDelay();
        } catch (error) {
            console.error('❌ Erreur lors de la génération du PDF:', error);
            this.errorMessage = 'Erreur lors de la génération du PDF';
            this.clearMessagesAfterDelay();
        }
    }

    generateAllPDFs(): void {
        if (this.filteredShipments.length === 0) {
            this.errorMessage = 'Aucune expédition à exporter';
            this.clearMessagesAfterDelay();
            return;
        }

        const confirmation = confirm(`Générer ${this.filteredShipments.length} PDF(s) ?`);
        if (!confirmation) return;

        this.isLoading = true;
        let count = 0;
        let errors = 0;
        
        this.filteredShipments.forEach((shipment, index) => {
            const deliveryOrder = this.deliveryOrders.get(shipment.deliveryOrder?.idDelivery) || null;
            
            setTimeout(() => {
                try {
                    this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder);
                    count++;
                } catch (error) {
                    console.error(`❌ Erreur PDF pour expédition ${shipment.id}:`, error);
                    errors++;
                }
                
                if (index === this.filteredShipments.length - 1) {
                    this.isLoading = false;
                    if (errors === 0) {
                        this.successMessage = `${count} PDF(s) généré(s) avec succès !`;
                    } else {
                        this.errorMessage = `${count} PDF(s) généré(s), ${errors} erreur(s)`;
                    }
                    this.clearMessagesAfterDelay();
                    this.cd.detectChanges();
                }
            }, index * 300);
        });
    }

    private clearMessagesAfterDelay(): void {
        setTimeout(() => {
            this.errorMessage = '';
            this.successMessage = '';
            this.cd.detectChanges();
        }, 3000);
    }
}