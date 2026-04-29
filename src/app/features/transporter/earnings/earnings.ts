import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-earnings',
  standalone: false,
  templateUrl: './earnings.html',
  styleUrls: ['./earnings.css']
})
export class Earnings implements OnInit {

  earnings: any[] = [];
  monthlyEarnings: any[] = [];
  totalEarnings: number = 0;
  totalDeliveries: number = 0;
  selectedMonth: string = '';
  filteredEarnings: any[] = [];
  viewMode: string = 'monthly';

  constructor() {}

  ngOnInit(): void {
    this.loadEarnings();
    this.calculateMonthlyEarnings();
  }

  loadEarnings(): void {
    const saved = localStorage.getItem('earnings');
    if (saved) {
      this.earnings = JSON.parse(saved);
      this.totalDeliveries = this.earnings.length;
      this.totalEarnings = this.earnings.reduce((sum, e) => sum + e.amount, 0);
      this.earnings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  calculateMonthlyEarnings(): void {
    const monthlyMap = new Map<string, { deliveries: number; amount: number; month: string; year: number; earnings: any[] }>();
    this.earnings.forEach(earning => {
      const date = new Date(earning.date);
      const monthName = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const key = `${year}-${monthIndex}`;
      if (monthlyMap.has(key)) {
        const existing = monthlyMap.get(key)!;
        existing.deliveries++;
        existing.amount += earning.amount;
        existing.earnings.push(earning);
      } else {
        monthlyMap.set(key, { deliveries: 1, amount: earning.amount, month: monthName, year, earnings: [earning] });
      }
    });
    this.monthlyEarnings = Array.from(monthlyMap.values())
      .sort((a, b) => b.year - a.year)
      .map(item => ({
        periode: item.month,
        livraisons: item.deliveries,
        montant: item.amount,
        statut: 'Payé',
        earnings: item.earnings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }));
  }

  showMonthDetails(month: any): void {
    this.selectedMonth = month.periode;
    this.filteredEarnings = month.earnings;
  }

  showAllDeliveries(): void {
    this.viewMode = 'all';
    this.selectedMonth = 'Toutes les livraisons';
    this.filteredEarnings = this.earnings;
  }

  showMonthlyView(): void {
    this.viewMode = 'monthly';
    this.selectedMonth = '';
    this.filteredEarnings = [];
  }

  closeDetails(): void {
    this.selectedMonth = '';
    this.filteredEarnings = [];
    this.viewMode = 'monthly';
  }

  clearEarnings(): void {
    if (confirm('Supprimer tout l\'historique des gains ?')) {
      localStorage.removeItem('earnings');
      this.earnings = [];
      this.monthlyEarnings = [];
      this.totalEarnings = 0;
      this.totalDeliveries = 0;
      this.selectedMonth = '';
      this.filteredEarnings = [];
      this.viewMode = 'monthly';
    }
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  getDayName(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'long' });
  }

  getCommandNumber(index: number): number {
    return this.filteredEarnings.length - index;
  }
}
