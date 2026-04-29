import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
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
import { NotificationApiService, NotificationData } from '../../../core/services/notification-api.service';

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
    currentUserId: number = 0;
    private subscriptions: Subscription = new Subscription();
    private refreshInterval: any;
    
    showNotifications: boolean = false;
    notifications: any[] = [];
    
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
        private ngZone: NgZone,
        private notificationApiService: NotificationApiService
    ) {}

    ngOnInit(): void {
        console.log('🚚 INITIALISATION');
        this.getCurrentUser();
        this.loadDeliveryOrders();
        this.loadTransporters();
        
        this.refreshInterval = setInterval(() => {
            this.loadShipments();
            this.loadTransporters();
            this.loadNotifications();
        }, 10000);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        if (this.refreshInterval) clearInterval(this.refreshInterval);
    }

    // ✅ Ouvrir le panneau et charger les notifications
    openNotifications(): void {
        console.log('🔔 Ouverture du panneau de notifications');
        this.showNotifications = true;
        this.loadAllNotifications();
    }

    // ✅ Fermer le panneau
    closeNotifications(): void {
        this.showNotifications = false;
    }

    // ✅ Charger TOUTES les notifications sans filtre
    loadAllNotifications(): void {
        if (this.currentUserId === 0) return;
        
        this.notificationApiService.getAllNotifications(this.currentUserId).subscribe({
            next: (data) => {
                this.notifications = data || [];
                console.log('📬 Notifications chargées:', this.notifications.length);
                this.cd.detectChanges();
            },
            error: (err) => console.error('Erreur:', err)
        });
    }

    // ✅ Recharger uniquement les nouvelles (sans ouvrir le panneau)
    loadNotifications(): void {
        if (this.currentUserId === 0) return;
        
        this.notificationApiService.getUnreadNotifications(this.currentUserId).subscribe({
            next: (data) => {
                if (data && data.length > 0) {
                    // Mettre à jour la liste existante
                    data.forEach(newNotif => {
                        const exists = this.notifications.some(n => n.id === newNotif.id);
                        if (!exists) {
                            this.notifications.unshift(newNotif);
                            console.log('📬 Nouvelle notification:', newNotif.message);
                            // Afficher un toast
                            this.successMessage = `📬 ${newNotif.message.substring(0, 50)}...`;
                            setTimeout(() => this.successMessage = '', 3000);
                        }
                    });
                    this.cd.detectChanges();
                }
            },
            error: (err) => console.error('Erreur:', err)
        });
    }

    markAsRead(id: string): void {
        this.notificationApiService.markAsRead(this.currentUserId, [id]).subscribe({
            next: () => {
                const notif = this.notifications.find(n => n.id === id);
                if (notif) notif.read = true;
                this.cd.detectChanges();
            }
        });
    }

    deleteNotification(id: string): void {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.cd.detectChanges();
    }

    onShipmentUpdate(data: any): void {
        if (data.transporterId || data.deliveryOrderId) {
            this.loadShipments();
            this.loadTransporters();
            this.loadNotifications();
        }
    }

    getCurrentUser(): void {
        const userSub = this.authService.user$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.currentUserName = user.name.toLowerCase().trim();
                this.currentUserId = parseInt(user.id, 10);
                console.log('✅ Utilisateur:', this.currentUserName, 'ID:', this.currentUserId);
                this.loadShipments();
                this.loadAllNotifications();
                this.cd.detectChanges();
            }
        });
        this.subscriptions.add(userSub);
    }

    loadShipments(): void {
        if (this.isLoading) return;
        this.isLoading = true;
        this.shipmentService.getAll().subscribe({
            next: (data) => {
                this.allShipments = data || [];
                this.filterShipmentsByClient();
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error) => {
                console.error('❌ Erreur:', error);
                this.isLoading = false;
            }
        });
    }

    filterShipmentsByClient(): void {
        if (this.deliveryOrders.size === 0 || !this.currentUserName) return;

        this.filteredShipments = this.allShipments.filter(shipment => {
            const orderId = shipment.deliveryOrder?.idDelivery;
            const order = this.deliveryOrders.get(orderId);
            const clientName = order?.nomClient?.toLowerCase().trim() || '';
            return clientName === this.currentUserName;
        });
        this.cd.detectChanges();
    }

    loadDeliveryOrders(): void {
        this.deliveryOrderService.getAll().subscribe({
            next: (orders) => {
                if (orders) {
                    orders.forEach(order => {
                        if (order && order.idDelivery) {
                            this.deliveryOrders.set(order.idDelivery, order);
                        }
                    });
                }
                this.filterShipmentsByClient();
                this.cd.detectChanges();
            },
            error: (error) => console.error('❌ Erreur commandes:', error)
        });
    }

    loadTransporters(): void {
        this.transportService.getAllTransporters().subscribe({
            next: (list) => {
                this.transporters.clear();
                if (list && list.length > 0) {
                    list.forEach(transporter => {
                        if (transporter && transporter.id) {
                            this.transporters.set(transporter.id, transporter);
                        }
                    });
                }
                this.cd.detectChanges();
            },
            error: (error) => console.error('❌ Erreur transporteurs:', error)
        });
    }

    getTransporterName(idTransporter: number, shipmentStatut: StatutExpedition, deliveryOrderId: number): string {
        const order = this.deliveryOrders.get(deliveryOrderId);
        if (order?.statut === StatutCommande.EN_ATTENTE) return '-';
        if (shipmentStatut === StatutExpedition.EN_ATTENTE) return '-';
        if (!idTransporter || idTransporter === 0) return '-';
        const transporter = this.transporters.get(idTransporter);
        return transporter ? transporter.companyName : `Transporteur #${idTransporter}`;
    }

    getClientName(deliveryOrderId: number): string {
        return this.deliveryOrders.get(deliveryOrderId)?.nomClient || 'Client inconnu';
    }

    getClientAddress(deliveryOrderId: number): string {
        return this.deliveryOrders.get(deliveryOrderId)?.adresseLivraison || 'Adresse inconnue';
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
        if (this.productNamesCache.has(produitId)) return this.productNamesCache.get(produitId)!;
        const produits: { [key: number]: string } = {
            1: 'Équipements électroniques', 2: 'Pièces détachées', 5: 'Textile',
            8: 'Alimentaire', 50: 'Métaux et acier', 85: 'Plastique et polymères'
        };
        const name = produits[produitId] || `Produit #${produitId}`;
        this.productNamesCache.set(produitId, name);
        return name;
    }

    getCO2Saved(quantite: number, distance?: number): string {
        const key = `${quantite}_${distance}`;
        if (this.co2Cache.has(key)) return this.co2Cache.get(key)!;
        const estimatedDistance = distance || 50;
        const co2 = quantite * estimatedDistance * 0.2;
        const result = co2 >= 1000 ? `${(co2 / 1000).toFixed(1)} t` : `${Math.round(co2)} kg`;
        this.co2Cache.set(key, result);
        return result;
    }

    getTotalDeliveries(): number { return this.filteredShipments.length; }
    getCompletedDeliveries(): number { return this.filteredShipments.filter(s => s.statut === StatutExpedition.LIVREE).length; }
    getPendingDeliveries(): number { return this.filteredShipments.filter(s => s.statut === StatutExpedition.EN_ATTENTE).length; }
    getInProgressDeliveries(): number { return this.filteredShipments.filter(s => s.statut === StatutExpedition.EN_COURS).length; }

    onGeneratePDF(shipmentId: number): void {
        const shipment = this.filteredShipments.find(s => s.id === shipmentId);
        if (!shipment) return;
        const orderId = shipment.deliveryOrder?.idDelivery;
        const deliveryOrder = orderId ? this.deliveryOrders.get(orderId) : null;
        try {
            this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder || null);
            this.successMessage = `PDF #${shipmentId} généré`;
            setTimeout(() => this.successMessage = '', 3000);
        } catch (error) {
            console.error('❌ Erreur PDF:', error);
        }
    }

    generateAllPDFs(): void {
        if (this.filteredShipments.length === 0) return;
        if (!confirm(`Générer ${this.filteredShipments.length} PDF(s) ?`)) return;
        this.isLoading = true;
        let count = 0;
        this.filteredShipments.forEach((shipment, index) => {
            const deliveryOrder = this.deliveryOrders.get(shipment.deliveryOrder?.idDelivery) || null;
            setTimeout(() => {
                try {
                    this.pdfGenerator.generateShipmentPDF(shipment, deliveryOrder);
                    count++;
                } catch (error) {}
                if (index === this.filteredShipments.length - 1) {
                    this.isLoading = false;
                    this.successMessage = `${count} PDF(s) généré(s)`;
                    setTimeout(() => this.successMessage = '', 3000);
                    this.cd.detectChanges();
                }
            }, index * 200);
        });
    }

    diagnosticTransporteurs(): void {
        alert(`Diagnostic:\nTransporteurs: ${this.transporters.size}\nExpéditions: ${this.filteredShipments.length}`);
    }
}