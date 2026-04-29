import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../../../../core/services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    stats: DashboardStats | null = null;
    isLoading = true;
    errorMessage = '';

    constructor(private dashboardService: DashboardService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.loadDashboard();
    }

    loadDashboard(): void {
        this.isLoading = true;
        this.errorMessage = '';
        
        this.dashboardService.getStats().subscribe({
            next: (data: any) => {
                console.log('Dashboard chargé:', data);
                this.stats = data;
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                console.error('Erreur:', error);
                this.errorMessage = 'Erreur de chargement des données';
                this.isLoading = false;
            }
        });
    }

    getStatutClass(statut: string): string {
        switch(statut) {
            case 'EN_ATTENTE': return 'badge badge-warning';
            case 'EN_COURS': return 'badge badge-info';
            case 'LIVREE': return 'badge badge-success';
            default: return 'badge badge-neutral';
        }
    }

    getPourcentage(statut: string): number {
        if (!this.stats || this.stats.totalCommandes === 0) return 0;
        let count = 0;
        if (statut === 'EN_ATTENTE') count = this.stats.commandesEnAttente;
        if (statut === 'EN_COURS') count = this.stats.commandesEnCours;
        if (statut === 'LIVREE') count = this.stats.commandesLivrees;
        return Math.round(count * 100 / this.stats.totalCommandes);
    }
}