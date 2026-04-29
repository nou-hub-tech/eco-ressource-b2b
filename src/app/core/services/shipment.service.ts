import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from '../models/shipment';
import { StatutExpedition } from '../models/statut';

@Injectable({
    providedIn: 'root'
})
export class ShipmentService {
    private apiUrl = '/api/shipments';

    constructor(private http: HttpClient) { }

    // ==================== CRUD ====================
    
    getAll(): Observable<Shipment[]> {
        return this.http.get<Shipment[]>(`${this.apiUrl}/all`);
    }

    getById(id: number): Observable<Shipment> {
        return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
    }

    create(shipment: Shipment): Observable<Shipment> {
        return this.http.post<Shipment>(`${this.apiUrl}/add`, shipment);
    }

    update(id: number, shipment: Shipment): Observable<Shipment> {
        return this.http.put<Shipment>(`${this.apiUrl}/update/${id}`, shipment);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }

    getByDeliveryOrder(deliveryOrderId: number): Observable<Shipment[]> {
        return this.http.get<Shipment[]>(`${this.apiUrl}/delivery-order/${deliveryOrderId}`);
    }

    getByStatut(statut: string): Observable<Shipment[]> {
        return this.http.get<Shipment[]>(`${this.apiUrl}/statut/${statut}`);
    }

    // ==================== RECHERCHE ====================
    
    searchByProduit(produitId: number): Observable<Shipment[]> {
        return this.http.get<Shipment[]>(`${this.apiUrl}/search/produit?produitId=${produitId}`);
    }
    
    // ✅ NOUVEAU: Recherche par quantité
    searchByQuantite(quantite: number): Observable<Shipment[]> {
        return this.http.get<Shipment[]>(`${this.apiUrl}/search/quantite?quantite=${quantite}`);
    }
    
    searchByDate(date: string): Observable<Shipment[]> {
        return this.http.get<Shipment[]>(`${this.apiUrl}/search/date?date=${date}`);
    }
    
    // ==================== TRI ====================
    
    sortBy(field: string, order: string): Observable<Shipment[]> {
        return this.http.get<Shipment[]>(`${this.apiUrl}/sort/${field}?order=${order}`);
    }
    
    // ==================== STATISTIQUES ====================
    
    getStatistiques(): Observable<any> {
        return this.http.get(`${this.apiUrl}/statistiques`);
    }
    
    getStatistiquesByCommande(deliveryOrderId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/statistiques/commande/${deliveryOrderId}`);
    }
}