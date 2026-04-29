import { StatutCommande } from './statut';

export interface DeliveryOrder {
    idDelivery: number;
    nomClient: string;
    telephoneClient: string;
    adresseLivraison: string;
    datePrevue: string;
    statut: StatutCommande;
}
