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
    private refreshInterval: any;
    private migratedShipmentIds: Set<number> = new Set();

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
        console.log('🚚 INITIALISATION DE MYDELIVERIES');
        this.getCurrentUser();
        this.loadDeliveryOrders();
        this.loadTransporters(); // Charge les transporteurs
        
        // ÉCOUTER LES MISES À JOUR EN TEMPS RÉEL
        this.subscriptions.add(
            this.shipmentUpdateService.shipmentUpdated$.subscribe((data) => {
                console.log('📢 Réception mise à jour dans my-deliveries:', data);
                this.onShipmentUpdate(data);
            })
        );

        // Rafraîchissement périodique (toutes les 3 secondes)
        this.refreshInterval = setInterval(() => {
            console.log('🔄 Refresh automatique des livraisons...');
            this.loadShipments();
            this.loadTransporters();
        }, 3000);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }

    onShipmentUpdate(data: any): void {
        console.log('🔄 Mise à jour détectée dans my-deliveries:', data);
        
        // Rechargement immédiat des expéditions
        this.loadShipments();
        
        // Rechargement des transporteurs pour s'assurer d'avoir le bon nom
        this.loadTransporters();
        
        // Si on a reçu directement le nom du transporteur, on peut l'utiliser immédiatement
        if (data.transporterName && data.deliveryOrderId) {
            console.log(`📢 Mise à jour directe: Commande #${data.deliveryOrderId} assignée à ${data.transporterName}`);
            
            // Trouver l'expédition correspondante dans la liste actuelle et mettre à jour l'affichage
            const shipmentToUpdate = this.allShipments.find(
                s => s.deliveryOrder?.idDelivery === data.deliveryOrderId
            );
            
            if (shipmentToUpdate && data.transporterId) {
                // Mettre à jour en mémoire
                shipmentToUpdate.idTransporter = data.transporterId;
                
                // S'assurer que le transporteur est dans la Map
                if (!this.transporters.has(data.transporterId)) {
                    // Créer une entrée temporaire
                    this.transporters.set(data.transporterId, {
                        id: data.transporterId,
                        companyName: data.transporterName,
                        userId: data.transporterId,
                        listingsCount: 0,
                        ordersCount: 0,
                        createdAt: new Date().toISOString()
                    } as Transporter);
                }
                
                // Recharger complètement pour être sûr
                setTimeout(() => {
                    this.loadShipments();
                }, 500);
            }
        }
        
        // Afficher un message de succès
        if (data.type === 'NEW_SHIPMENT' && data.transporterName) {
            this.successMessage = `✅ Nouvelle livraison assignée à ${data.transporterName}`;
        } else if (data.type === 'SHIPMENT_UPDATED' && data.transporterName) {
            this.successMessage = `✅ Livraison mise à jour - Transporteur: ${data.transporterName}`;
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
                // Afficher les IDs transporteur pour debug
                data.forEach(s => {
                    if (s.idTransporter && s.idTransporter > 0) {
                        console.log(`🚚 Expédition #${s.id} - Transporteur ID: ${s.idTransporter}`);
                    }
                });
                this.allShipments = data || [];
                this.migrateLegacyTransporterIds(this.allShipments);
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

    private migrateLegacyTransporterIds(shipments: Shipment[]): void {
        if (!shipments || shipments.length === 0) return;
        if (this.transporters.size === 0) return;

        const transporterIdByUserId = new Map<number, number>();
        this.transporters.forEach((t) => {
            if (typeof t.userId === 'number' && t.userId > 0) {
                transporterIdByUserId.set(t.userId, t.id);
            }
        });
        if (transporterIdByUserId.size === 0) return;

        const knownTransporterIds = new Set<number>(Array.from(this.transporters.keys()));

        shipments.forEach((s) => {
            const current = s?.idTransporter ?? 0;
            if (!s?.id || !current || current <= 0) return;
            if (this.migratedShipmentIds.has(s.id)) return;

            if (!knownTransporterIds.has(current) && transporterIdByUserId.has(current)) {
                const correctedTransporterId = transporterIdByUserId.get(current)!;
                const updated: Shipment = {
                    ...s,
                    idTransporter: correctedTransporterId
                };

                this.migratedShipmentIds.add(s.id);
                this.shipmentService.update(s.id, updated).subscribe({
                    next: () => {
                        s.idTransporter = correctedTransporterId;
                        this.cd.detectChanges();
                    },
                    error: (err) => {
                        console.error('❌ Migration idTransporter échouée pour shipment', s.id, err);
                        this.migratedShipmentIds.delete(s.id);
                    }
                });
            }
        });
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
        console.log('🚚 Chargement des transporteurs...');
        const sub = this.transportService.getAllTransporters().subscribe({
            next: (transportersList: Transporter[]) => {
                console.log('🚚 Transporteurs reçus:', transportersList.length);
                this.transporters.clear();
                if (transportersList && transportersList.length > 0) {
                    transportersList.forEach(transporter => {
                        if (transporter && transporter.id) {
                            this.transporters.set(transporter.id, transporter);
                            console.log(`📦 Transporteur enregistré: ID=${transporter.id}, Nom=${transporter.companyName}, userId=${transporter.userId}`);
                        }
                    });
                } else {
                    console.warn('⚠️ Aucun transporteur reçu de l\'API');
                    // Données mock de secours
                    this.transporters.set(1, { id: 1, userId: 3, companyName: 'Karim Logistics', sector: '', taxId: '', listingsCount: 0, ordersCount: 0, revenue: '', createdAt: new Date().toISOString() });
                    this.transporters.set(2, { id: 2, userId: 4, companyName: 'linda', sector: '', taxId: '', listingsCount: 0, ordersCount: 0, revenue: '', createdAt: new Date().toISOString() });
                    console.log('📦 Données mock ajoutées:', Array.from(this.transporters.entries()));
                }
                console.log('📋 Map des transporteurs:', Array.from(this.transporters.entries()));
                if (this.allShipments.length > 0) {
                    this.migrateLegacyTransporterIds(this.allShipments);
                    this.filterShipmentsByClient();
                }
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('❌ Erreur chargement transporteurs:', error);
                // Données mock de secours en cas d'erreur
                this.transporters.clear();
                this.transporters.set(1, { id: 1, userId: 3, companyName: 'Karim Logistics', sector: '', taxId: '', listingsCount: 0, ordersCount: 0, revenue: '', createdAt: new Date().toISOString() });
                this.transporters.set(2, { id: 2, userId: 4, companyName: 'linda', sector: '', taxId: '', listingsCount: 0, ordersCount: 0, revenue: '', createdAt: new Date().toISOString() });
                console.log('📦 Données mock ajoutées (erreur):', Array.from(this.transporters.entries()));
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(sub);
    }

    getTransporterName(idTransporter: number): string {
        console.log(`🔍 getTransporterName appelé avec idTransporter = ${idTransporter}`);
        
        // Si pas de transporteur assigné → afficher "-"
        if (!idTransporter || idTransporter === 0) {
            console.log(`   → Pas de transporteur assigné, affichage "-"`);
            return '-';
        }
        
        // Chercher dans la Map des transporteurs (clé = transporter.id)
        const transporter = this.transporters.get(idTransporter);
        if (transporter) {
            console.log(`   ✅ Transporteur trouvé: ${transporter.companyName}`);
            return transporter.companyName;
        }
        
        // Si non trouvé, afficher "Transporteur #ID"
        console.log(`   ⚠️ Transporteur non trouvé pour ID ${idTransporter}`);
        console.log(`   📋 Clés disponibles dans la Map:`, Array.from(this.transporters.keys()));
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

    // Méthode de diagnostic
    diagnosticTransporteurs(): void {
        console.log('=== DIAGNOSTIC MYDELIVERIES ===');
        console.log('Transporters Map size:', this.transporters.size);
        console.log('Transporters Map content:', Array.from(this.transporters.entries()));
        console.log('All Shipments count:', this.allShipments.length);
        console.log('Filtered Shipments count:', this.filteredShipments.length);
        
        this.filteredShipments.forEach(s => {
            console.log(`Shipment #${s.id} - transporterId: ${s.idTransporter} -> Nom: ${this.getTransporterName(s.idTransporter)}`);
        });
        
        alert(`Diagnostic:\nTransporteurs chargés: ${this.transporters.size}\nExpéditions filtrées: ${this.filteredShipments.length}`);
    }
}