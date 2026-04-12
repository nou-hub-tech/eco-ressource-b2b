import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryOrder } from '../models/delivery-order';
import { StatutCommande } from '../models/statut';

@Injectable({
    providedIn: 'root'
})
export class DeliveryOrderService {
    private apiUrl = '/api/delivery-orders';

    constructor(private http: HttpClient) { }

    // ==================== CRUD ====================
    
    getAll(): Observable<DeliveryOrder[]> {
        return this.http.get<DeliveryOrder[]>(`${this.apiUrl}/all`);
    }

    getById(id: number): Observable<DeliveryOrder> {
        return this.http.get<DeliveryOrder>(`${this.apiUrl}/${id}`);
    }

    create(deliveryOrder: DeliveryOrder): Observable<DeliveryOrder> {
        return this.http.post<DeliveryOrder>(`${this.apiUrl}/add`, deliveryOrder);
    }

    update(id: number, deliveryOrder: DeliveryOrder): Observable<DeliveryOrder> {
        return this.http.put<DeliveryOrder>(`${this.apiUrl}/update/${id}`, deliveryOrder);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }

    updateStatut(id: number, statut: StatutCommande): Observable<DeliveryOrder> {
        return this.http.patch<DeliveryOrder>(`${this.apiUrl}/update-statut/${id}?statut=${statut}`, {});
    }

    getByStatut(statut: string): Observable<DeliveryOrder[]> {
        return this.http.get<DeliveryOrder[]>(`${this.apiUrl}/statut/${statut}`);
    }

    // ==================== RECHERCHE ====================
    
    searchByNomClient(nomClient: string): Observable<DeliveryOrder[]> {
        return this.http.get<DeliveryOrder[]>(`${this.apiUrl}/search/nom?nomClient=${nomClient}`);
    }
    
    // ✅ RECHERCHE PAR ADRESSE (remplace telephone)
    searchByAdresse(adresse: string): Observable<DeliveryOrder[]> {
        return this.http.get<DeliveryOrder[]>(`${this.apiUrl}/search/adresse?adresse=${adresse}`);
    }
    
    searchByDate(date: string): Observable<DeliveryOrder[]> {
        return this.http.get<DeliveryOrder[]>(`${this.apiUrl}/search/date?date=${date}`);
    }
    
    rechercheAvancee(nomClient?: string, adresse?: string, statut?: string, 
                     date?: string): Observable<DeliveryOrder[]> {
        let params = '';
        if (nomClient) params += `&nomClient=${nomClient}`;
        if (adresse) params += `&adresse=${adresse}`;
        if (statut) params += `&statut=${statut}`;
        if (date) params += `&date=${date}`;
        return this.http.get<DeliveryOrder[]>(`${this.apiUrl}/recherche?${params.substring(1)}`);
    }
    
    // ==================== TRI ====================
    
    sortBy(field: string, order: string): Observable<DeliveryOrder[]> {
        return this.http.get<DeliveryOrder[]>(`${this.apiUrl}/sort/${field}?order=${order}`);
    }
    
    // ==================== STATISTIQUES ====================
    
    getStatistiques(): Observable<any> {
        return this.http.get(`${this.apiUrl}/statistiques`);
    }
    
    getStatistiquesParMois(): Observable<any> {
        return this.http.get(`${this.apiUrl}/statistiques/mois`);
    }
    
    getStatistiquesParSemaine(): Observable<any> {
        return this.http.get(`${this.apiUrl}/statistiques/semaine`);
    }
    
    getStatistiquesParAnnee(): Observable<any> {
        return this.http.get(`${this.apiUrl}/statistiques/annee`);
    }
}