import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    }
  }

  calculateMonthlyEarnings(): void {
    const monthlyMap = new Map<string, { deliveries: number; amount: number; month: string; year: number }>();
    
    this.earnings.forEach(earning => {
      const key = `${earning.year}-${earning.monthIndex}`;
      if (monthlyMap.has(key)) {
        const existing = monthlyMap.get(key)!;
        existing.deliveries++;
        existing.amount += earning.amount;
      } else {
        monthlyMap.set(key, {
          deliveries: 1,
          amount: earning.amount,
          month: earning.month,
          year: earning.year
        });
      }
    });
    
    this.monthlyEarnings = Array.from(monthlyMap.values())
      .sort((a, b) => b.year - a.year)
      .map(item => ({
        periode: item.month,
        livraisons: item.deliveries,
        montant: item.amount,
        statut: 'Payé'
      }));
  }

  getTotalEarnings(): number {
    return this.totalEarnings;
  }

  getTotalDeliveries(): number {
    return this.totalDeliveries;
  }

  clearEarnings(): void {
    if (confirm('Supprimer tout l\'historique des gains ?')) {
      localStorage.removeItem('earnings');
      this.earnings = [];
      this.monthlyEarnings = [];
      this.totalEarnings = 0;
      this.totalDeliveries = 0;
    }
  }
}