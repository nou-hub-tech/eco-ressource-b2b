import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService, Alert } from '../../../core/services/alert.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    alerts: Alert[] = [];
    unreadCount = 0;
    showAlerts = false;
    private subscription: Subscription | null = null;  // ✅ Correction: initialisé à null

    constructor(private alertService: AlertService) {}

    ngOnInit(): void {
        this.subscription = this.alertService.alerts$.subscribe(alerts => {
            this.alerts = alerts;
            this.unreadCount = this.alertService.getUnreadCount();
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    toggleAlerts(): void {
        this.showAlerts = !this.showAlerts;
    }

    markAsRead(id: string): void {
        this.alertService.markAsRead(id);
    }

    removeAlert(id: string): void {
        this.alertService.removeAlert(id);
    }

    clearAlerts(): void {
        this.alerts.forEach(a => this.alertService.removeAlert(a.id));
    }

    getAlertIcon(type: string): string {
        switch(type) {
            case 'danger': return 'bi bi-exclamation-triangle-fill text-danger';
            case 'warning': return 'bi bi-exclamation-triangle text-warning';
            case 'info': return 'bi bi-info-circle-fill text-info';
            case 'success': return 'bi bi-check-circle-fill text-success';
            default: return 'bi bi-bell';
        }
    }

    getTimeAgo(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (minutes < 1) return 'à l\'instant';
        if (minutes < 60) return `il y a ${minutes} min`;
        if (hours < 24) return `il y a ${hours} h`;
        return `il y a ${days} j`;
    }
}