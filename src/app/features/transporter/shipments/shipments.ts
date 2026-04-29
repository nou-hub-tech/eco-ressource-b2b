import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShipmentService } from '../../../core/services/shipment.service';
import { DeliveryOrderService } from '../../../core/services/delivery-order.service';
import { AuthService } from '../../../core/services/auth.service';
import { TransportService, Transporter } from '../../../core/services/transport.service';
import { ProductService } from '../../../core/services/product';
import { Shipment } from '../../../core/models/shipment';
import { DeliveryOrder } from '../../../core/models/delivery-order';

@Component({ selector: 'app-shipments', standalone: false, templateUrl: './shipments.html', styleUrls: ['./shipments.css'] })
export class Shipments implements OnInit {
  shipments: any[] = [];
  isLoading = true;

  constructor(
    private shipmentService: ShipmentService,
    private deliveryOrderService: DeliveryOrderService,
    private transportService: TransportService,
    private authService: AuthService,
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    console.log('🔄 Début du chargement des shipments...');
    
    try {
      // 1. Get current transporter
      let currentTransporterId = null;
      const currentUser = this.authService.currentUser;
      console.log('👤 Utilisateur courant:', currentUser);
      
      if (currentUser) {
        try {
          const transporters = await this.transportService.getAllTransporters().toPromise() || [];
          console.log(`📡 Transporteurs trouvés: ${transporters.length}`);
          const t = transporters.find(x => String(x.userId) === String(currentUser.id));
          if (t) {
              currentTransporterId = t.id;
              console.log('✅ ID Transporteur identifié:', currentTransporterId);
          } else {
              console.log('⚠️ Aucun transporteur associé à cet utilisateur.');
          }
        } catch(e) {
          console.warn('❌ Erreur lors du chargement des transporteurs', e);
        }
      }

      // 2. Load all delivery orders and map them
      let orders: DeliveryOrder[] = [];
      try {
          orders = await this.deliveryOrderService.getAll().toPromise() || [];
          console.log(`📦 Commandes de livraison trouvées: ${orders.length}`);
      } catch(e) {
          console.warn('❌ Erreur lors du chargement des commandes de livraison', e);
      }
      
      const orderMap = new Map<number, DeliveryOrder>();
      orders.forEach(o => orderMap.set(o.idDelivery, o));

      // 3. Load shipments
      let allShipments: Shipment[] = [];
      try {
          allShipments = await this.shipmentService.getAll().toPromise() || [];
          console.log(`🚚 Shipments totaux trouvés dans la BDD: ${allShipments.length}`);
      } catch(e) {
          console.error('❌ Erreur lors du chargement de /api/shipments/all', e);
      }
      
      // If we found a transporter ID, filter by it.
      if (currentTransporterId) {
        allShipments = allShipments.filter(s => s.idTransporter === currentTransporterId);
        console.log(`🎯 Shipments après filtrage par transporteur (${currentTransporterId}): ${allShipments.length}`);
      } else {
        console.log(`👀 Aucun filtrage appliqué, affichage de tous les shipments`);
      }

      // 4. Map the data
      this.shipments = await Promise.all(allShipments.map(async (s) => {
        const orderId = s.deliveryOrder?.idDelivery;
        const order = orderId ? orderMap.get(orderId) : undefined;

        let productName = `Product #${s.produitId}`;
        try {
          const product = await this.productService.getById(s.produitId).toPromise();
          if (product) productName = product.name;
        } catch (e) { }

        return {
          id: orderId ? `DEL-${orderId}` : `SHIP-${s.id || Math.floor(Math.random()*1000)}`,
          client: order ? order.nomClient : 'Unknown',
          product: `${productName} (${s.quantite}x)`,
          from: 'Entrepôt Central', 
          to: order ? order.adresseLivraison : 'Unknown',
          status: s.statut,
          pickup: s.dateDepart ? new Date(s.dateDepart).toLocaleString() : 'N/A',
          delivery: order?.datePrevue ? new Date(order.datePrevue).toLocaleString() : 'N/A',
          earn: Math.floor(Math.random() * 300 + 100), 
          raw: s
        };
      }));
      
      console.log('✨ Shipments finaux mappés:', this.shipments);
      
    } catch (error) {
      console.error('💥 Erreur CRITIQUE globale dans loadData()', error);
    } finally {
      this.isLoading = false;
      this.cd.detectChanges();
    }
  }

  // QR Code Logic
  selectedQrShipment: any = null;
  qrDataUrl: string = '';

  async showQr(shipment: any) {
    this.selectedQrShipment = shipment;
    try {
      // @ts-ignore
      const QRCode = await import('qrcode');
      this.qrDataUrl = await QRCode.toDataURL(shipment.id, { margin: 2, width: 250, color: { dark: '#000000', light: '#ffffff' }});
      this.cd.detectChanges();
    } catch(err) {
      console.error('Error generating QR', err);
    }
  }

  closeQr() {
    this.selectedQrShipment = null;
    this.qrDataUrl = '';
  }
}