import { Injectable } from '@angular/core';
import { forkJoin, Observable, map } from 'rxjs';
import { DeliveryOrderService } from './delivery-order.service';
import { ShipmentService } from './shipment.service';

export interface DashboardStats {
    totalCommandes: number;
    commandesEnAttente: number;
    commandesEnCours: number;
    commandesLivrees: number;
    commandesEnRetard: number;
    totalExpeditions: number;
    quantiteTotale: number;
    topClients: { nomClient: string; nombreCommandes: number }[];
    topProduits: { produitId: number; nombreExpeditions: number; quantiteTotale: number }[];
    activitesRecentes: { description: string; date: string; statut: string }[];
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    
    constructor(
        private deliveryOrderService: DeliveryOrderService,
        private shipmentService: ShipmentService
    ) { }

    getStats(): Observable<DashboardStats> {
        return forkJoin({
            orders: this.deliveryOrderService.getAll(),
            shipments: this.shipmentService.getAll()
        }).pipe(
            map(({ orders, shipments }) => {
                // 1. Statistiques commandes
                const totalCommandes = orders.length;
                const commandesEnAttente = orders.filter(o => o.statut === 'EN_ATTENTE').length;
                const commandesEnCours = orders.filter(o => o.statut === 'EN_COURS').length;
                const commandesLivrees = orders.filter(o => o.statut === 'LIVREE').length;
                
                // 2. Statistiques expéditions
                const totalExpeditions = shipments.length;
                const quantiteTotale = shipments.reduce((sum, s) => sum + s.quantite, 0);
                
                // 3. Commandes en retard
                const now = new Date();
                const commandesEnRetard = orders.filter(o => 
                    o.statut !== 'LIVREE' && new Date(o.datePrevue) < now
                ).length;
                
                // 4. Top 5 clients
                const clientMap = new Map<string, number>();
                orders.forEach(o => {
                    clientMap.set(o.nomClient, (clientMap.get(o.nomClient) || 0) + 1);
                });
                const topClients = Array.from(clientMap.entries())
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([nomClient, nombreCommandes]) => ({ nomClient, nombreCommandes }));
                
                // 5. Top 5 produits
                const produitMap = new Map<number, { count: number; quantite: number }>();
                shipments.forEach(s => {
                    const existing = produitMap.get(s.produitId) || { count: 0, quantite: 0 };
                    produitMap.set(s.produitId, {
                        count: existing.count + 1,
                        quantite: existing.quantite + s.quantite
                    });
                });
                const topProduits = Array.from(produitMap.entries())
                    .sort((a, b) => b[1].count - a[1].count)
                    .slice(0, 5)
                    .map(([produitId, { count, quantite }]) => ({ 
                        produitId, 
                        nombreExpeditions: count, 
                        quantiteTotale: quantite 
                    }));
                
                // 6. 5 dernières commandes
                const activitesRecentes = [...orders]
                    .sort((a, b) => new Date(b.datePrevue).getTime() - new Date(a.datePrevue).getTime())
                    .slice(0, 5)
                    .map(o => ({
                        description: `Commande #${o.idDelivery} - ${o.nomClient}`,
                        date: new Date(o.datePrevue).toLocaleString(),
                        statut: o.statut
                    }));
                
                return {
                    totalCommandes,
                    commandesEnAttente,
                    commandesEnCours,
                    commandesLivrees,
                    commandesEnRetard,
                    totalExpeditions,
                    quantiteTotale,
                    topClients,
                    topProduits,
                    activitesRecentes
                };
            })
        );
    }
}