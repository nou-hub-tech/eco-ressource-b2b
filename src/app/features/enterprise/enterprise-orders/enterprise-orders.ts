import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import {
  BackendEcoOrder,
  BackendOrderStatus,
  EcoOrderApiService,
  EcoOrderRequest,
} from '../../../pages/moduleReservation/shared/api/eco-order-api.service';

@Component({
  selector: 'app-enterprise-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enterprise-orders.html',
  styleUrls: ['./enterprise-orders.css'],
})
export class EnterpriseOrders implements OnInit {
  loading = true;
  savingId: number | null = null;
  error = '';

  orders: BackendEcoOrder[] = [];
  currentEnterpriseId: number | null = null;
  statusDrafts: Record<number, BackendOrderStatus> = {};

  readonly statuses: BackendOrderStatus[] = ['draft', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  constructor(
    private readonly auth: AuthService,
    private readonly orderApi: EcoOrderApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get visibleOrders(): BackendEcoOrder[] {
    return this.orders.filter(
      order => !order.deleted && this.currentEnterpriseId != null && order.enterprise?.id === this.currentEnterpriseId,
    );
  }

  get totalCo2Saved(): number {
    return this.visibleOrders.reduce((sum, order) => sum + this.co2Value(order), 0);
  }

  get averageCo2Saved(): number {
    return this.visibleOrders.length ? Math.round(this.totalCo2Saved / this.visibleOrders.length) : 0;
  }

  get lifecycleSummary(): { created: number; processing: number; completed: number } {
    return this.visibleOrders.reduce(
      (summary, order) => {
        const stage = this.lifecycleStage(order);
        summary[stage] += 1;
        return summary;
      },
      { created: 0, processing: 0, completed: 0 },
    );
  }

  get ecoImpactScore(): { grade: 'A' | 'B' | 'C'; averageCo2: number; message: string } {
    if (!this.visibleOrders.length) {
      return { grade: 'A', averageCo2: 0, message: 'No order impact to analyze yet.' };
    }

    const avgCo2 = this.averageCo2Saved;
    const avgGradeScore =
      this.visibleOrders.reduce((sum, order) => sum + this.gradeScore(order.grade), 0) / this.visibleOrders.length;

    let grade: 'A' | 'B' | 'C' = 'C';
    if (avgGradeScore >= 4) {
      grade = 'A';
    } else if (avgGradeScore >= 3) {
      grade = 'B';
    }

    let message = 'Moderate impact';
    if (avgCo2 >= 200 || grade === 'C') {
      message = 'High environmental impact';
    } else if (avgCo2 < 100 && grade === 'A') {
      message = 'Low environmental impact';
    }

    return { grade, averageCo2: avgCo2, message };
  }

  saveStatus(order: BackendEcoOrder): void {
    const nextStatus = this.statusDrafts[order.id];
    if (!nextStatus || nextStatus === order.status) {
      return;
    }

    const payload: EcoOrderRequest = {
      ref: order.ref,
      companyName: order.companyName,
      material: order.material,
      qtyKg: order.qtyKg,
      supplier: order.supplier,
      distanceKm: order.distanceKm,
      orderDate: order.orderDate,
      status: nextStatus,
      grade: order.grade,
      co2Saved: order.co2Saved ?? null,
      waterSaved: order.waterSaved ?? null,
      wasteAvoided: order.wasteAvoided ?? null,
      enterpriseId: order.enterprise?.id ?? this.currentEnterpriseId ?? undefined,
    };

    this.savingId = order.id;
    this.error = '';

    this.orderApi.update(order.id, payload).subscribe({
      next: () => this.loadData(),
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to update order status.';
        this.savingId = null;
      },
    });
  }

  lifecycleStage(order: BackendEcoOrder): 'created' | 'processing' | 'completed' {
    if (order.status === 'shipped') return 'processing';
    if (order.status === 'delivered') return 'completed';
    return 'created';
  }

  lifecycleProgress(order: BackendEcoOrder): number {
    const stage = this.lifecycleStage(order);
    if (stage === 'completed') return 100;
    if (stage === 'processing') return 66;
    return 33;
  }

  impactMessage(order: BackendEcoOrder): string {
    const co2 = this.co2Value(order);
    const grade = this.gradeScore(order.grade);

    if (co2 >= 200 || grade <= 2) return 'High environmental impact';
    if (co2 >= 100 || grade <= 3) return 'Moderate impact';
    return 'Low environmental impact';
  }

  estimatedCo2(order: BackendEcoOrder): number {
    return this.co2Value(order);
  }

  private loadData(): void {
    this.loading = true;
    this.error = '';

    this.orderApi.list(false).subscribe({
      next: orders => {
        this.currentEnterpriseId = this.resolveEnterpriseId(orders);
        this.orders = orders;
        this.statusDrafts = {};
        for (const order of this.visibleOrders) {
          this.statusDrafts[order.id] = order.status;
        }
        this.loading = false;
        this.savingId = null;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load orders.';
        this.loading = false;
        this.savingId = null;
      },
    });
  }

  private resolveEnterpriseId(orders: BackendEcoOrder[]): number | null {
    const company = this.auth.currentUser?.company?.trim().toLowerCase() || '';
    const match = orders.find(order => (order.enterprise?.companyName ?? '').trim().toLowerCase() === company);
    return match?.enterprise?.id ?? null;
  }

  private co2Value(order: BackendEcoOrder): number {
    if (order.co2Saved != null) {
      return Math.round(Number(order.co2Saved));
    }
    return Math.max(0, Math.round(order.qtyKg * 0.4 - order.distanceKm * 0.08));
  }

  private gradeScore(grade: string): number {
    if (grade === 'A') return 5;
    if (grade === 'B') return 4;
    if (grade === 'C') return 3;
    if (grade === 'D') return 2;
    return 1;
  }
}
