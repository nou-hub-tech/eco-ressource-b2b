import { StatutExpedition } from './statut';

export interface Shipment {
    id: number;
    deliveryOrder: { idDelivery: number };
    produitId: number;
    quantite: number;
    idTransporter: number;
    dateDepart: string;
    statut: StatutExpedition;
}
