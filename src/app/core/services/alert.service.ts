import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
    id: string;
    type: 'danger' | 'warning' | 'info' | 'success';
    message: string;
    date: Date;
    read: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private alertsSubject = new BehaviorSubject<Alert[]>([]);
    public alerts$ = this.alertsSubject.asObservable();
    
    private alerts: Alert[] = [];

    constructor() {
        this.loadAlerts();
    }

    addAlert(alert: Alert): void {
        this.alerts.unshift(alert);
        this.saveAlerts();
        this.alertsSubject.next([...this.alerts]);
    }

    markAsRead(id: string): void {
        const alert = this.alerts.find(a => a.id === id);
        if (alert) {
            alert.read = true;
            this.saveAlerts();
            this.alertsSubject.next([...this.alerts]);
        }
    }

    removeAlert(id: string): void {
        this.alerts = this.alerts.filter(a => a.id !== id);
        this.saveAlerts();
        this.alertsSubject.next([...this.alerts]);
    }

    getUnreadCount(): number {
        return this.alerts.filter(a => !a.read).length;
    }

    private saveAlerts(): void {
        localStorage.setItem('alerts', JSON.stringify(this.alerts));
    }

    private loadAlerts(): void {
        const saved = localStorage.getItem('alerts');
        if (saved) {
            this.alerts = JSON.parse(saved);
            this.alertsSubject.next([...this.alerts]);
        }
    }

    // ✅ ALERTE 1: Commande en retard
    checkRetardCommandes(orders: any[]): void {
        const now = new Date();
        orders.forEach(order => {
            if (order.statut !== 'LIVREE') {
                const datePrevue = new Date(order.datePrevue);
                if (datePrevue < now) {
                    const daysLate = Math.floor((now.getTime() - datePrevue.getTime()) / (1000 * 3600 * 24));
                    this.addAlert({
                        id: `retard-${order.idDelivery}-${Date.now()}`,
                        type: 'danger',
                        message: `🚨 Commande #${order.idDelivery} - ${order.nomClient} est en retard de ${daysLate} jour(s)`,
                        date: new Date(),
                        read: false
                    });
                }
            }
        });
    }

    // ✅ ALERTE 2: Rappel livraison (veille)
    checkRappelLivraison(orders: any[]): void {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        orders.forEach(order => {
            const datePrevue = new Date(order.datePrevue);
            const isTomorrow = datePrevue.toDateString() === tomorrow.toDateString();
            
            if (isTomorrow && order.statut !== 'LIVREE') {
                this.addAlert({
                    id: `rappel-${order.idDelivery}-${Date.now()}`,
                    type: 'info',
                    message: `📅 Rappel: Commande #${order.idDelivery} - ${order.nomClient} est prévue pour demain`,
                    date: new Date(),
                    read: false
                });
            }
        });
    }
}
