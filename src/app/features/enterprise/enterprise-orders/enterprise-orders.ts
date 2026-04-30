import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import {
  BackendEcoGrade,
  BackendEcoOrder,
  BackendOrderStatus,
  EcoOrderApiService,
  EcoOrderRequest,
} from '../../../pages/moduleReservation/shared/api/eco-order-api.service';
import {
  BackendReservation,
  ReservationApiService,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';

type OrderFormModel = {
  id: number | null;
  ref: string;
  companyName: string;
  material: string;
  qtyKg: number;
  supplier: string;
  distanceKm: number;
  orderDate: string;
  status: BackendOrderStatus;
  grade: BackendEcoGrade;
  co2Saved: number | null;
  waterSaved: number | null;
  wasteAvoided: number | null;
  sourceSolar: boolean;
  sourceDuration: number;
};

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
  savingForm = false;
  showForm = false;
  editMode = false;
  error = '';
  success = '';

  orders: BackendEcoOrder[] = [];
  reservations: BackendReservation[] = [];
  currentEnterpriseId: number | null = null;
  statusDrafts: Record<number, BackendOrderStatus> = {};
  form: OrderFormModel = this.createEmptyForm();

  readonly statuses: BackendOrderStatus[] = ['draft', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  constructor(
    private readonly auth: AuthService,
    private readonly orderApi: EcoOrderApiService,
    private readonly reservationApi: ReservationApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get myOrders(): BackendEcoOrder[] {
    return this.orders
      .filter(order => !order.deleted && this.enterpriseIdForOrder(order) === this.currentEnterpriseId)
      .sort((a, b) => b.orderDate.localeCompare(a.orderDate));
  }

  get marketplaceReservations(): BackendReservation[] {
    return this.reservations
      .filter(reservation => !reservation.deleted && this.enterpriseIdForReservation(reservation) !== this.currentEnterpriseId)
      .filter(reservation => reservation.status !== 'CANCELLED')
      .sort((a, b) => a.date.localeCompare(b.date) || a.startHour - b.startHour);
  }

  get totalCo2Saved(): number {
    return this.myOrders.reduce((sum, order) => sum + this.co2Value(order), 0);
  }

  get averageCo2Saved(): number {
    return this.myOrders.length ? Math.round(this.totalCo2Saved / this.myOrders.length) : 0;
  }

  get lifecycleSummary(): { created: number; processing: number; completed: number } {
    return this.myOrders.reduce(
      (summary, order) => {
        const stage = this.lifecycleStage(order);
        summary[stage] += 1;
        return summary;
      },
      { created: 0, processing: 0, completed: 0 },
    );
  }

  get ecoImpactScore(): { grade: 'A' | 'B' | 'C'; averageCo2: number; message: string } {
    if (!this.myOrders.length) {
      return { grade: 'A', averageCo2: 0, message: 'No order impact to analyze yet.' };
    }

    const avgCo2 = this.averageCo2Saved;
    const avgGradeScore =
      this.myOrders.reduce((sum, order) => sum + this.gradeScore(order.grade), 0) / this.myOrders.length;

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

  get formEcoScore(): { grade: BackendEcoGrade; message: string } {
    const grade = this.gradeFromMetrics(
      this.form.co2Saved ?? 0,
      this.form.distanceKm,
      this.form.sourceSolar,
      this.form.sourceDuration,
    );
    let message = 'Moderate impact profile';
    if (grade === 'A' || grade === 'B') {
      message = this.form.sourceSolar
        ? `Strong eco profile with solar-backed source over ${this.form.sourceDuration} hour(s)`
        : `Strong eco profile over ${this.form.sourceDuration} hour(s)`;
    } else if (grade === 'D' || grade === 'E') {
      message = 'Lower eco score due to limited CO2 savings, low duration, or long distance';
    }

    return { grade, message };
  }

  openCreate(): void {
    this.editMode = false;
    this.showForm = true;
    this.error = '';
    this.success = '';
    this.form = this.createEmptyForm();
    this.recomputeOrderMetrics();
  }

  openEdit(order: BackendEcoOrder): void {
    this.editMode = true;
    this.showForm = true;
    this.error = '';
    this.success = '';
    this.form = {
      id: order.id,
      ref: order.ref,
      companyName: order.companyName,
      material: order.material,
      qtyKg: order.qtyKg,
      supplier: order.supplier,
      distanceKm: order.distanceKm,
      orderDate: order.orderDate,
      status: order.status,
      grade: order.grade,
      co2Saved: order.co2Saved ?? this.derivedCo2Saved(order.qtyKg, order.distanceKm, false, 1),
      waterSaved: order.waterSaved ?? null,
      wasteAvoided: order.wasteAvoided ?? null,
      sourceSolar: false,
      sourceDuration: 1,
    };
  }

  createFromReservation(reservation: BackendReservation): void {
    this.editMode = false;
    this.showForm = true;
    this.error = '';
    this.success = '';
    this.form = {
      id: null,
      ref: '',
      companyName: this.auth.currentUser?.company ?? this.auth.currentUser?.name ?? '',
      material: reservation.machine,
      qtyKg: Math.max(1, reservation.hours * 10),
      supplier: `Reservation ${reservation.id}`,
      distanceKm: 0,
      orderDate: reservation.date,
      status: 'draft',
      grade: 'C',
      co2Saved: reservation.co2Saved ?? this.derivedCo2Saved(
        Math.max(1, reservation.hours * 10),
        0,
        reservation.solar,
        reservation.hours ?? 1,
      ),
      waterSaved: Math.max(0, Math.round(reservation.hours * 8)),
      wasteAvoided: Math.max(0, Math.round(reservation.hours * 4)),
      sourceSolar: reservation.solar,
      sourceDuration: Math.max(1, reservation.hours),
    };
    this.recomputeOrderMetrics();
  }

  closeForm(): void {
    this.showForm = false;
    this.editMode = false;
    this.savingForm = false;
    this.form = this.createEmptyForm();
  }

  recomputeOrderMetrics(): void {
    const co2Saved = this.form.co2Saved ?? this.derivedCo2Saved(
      this.form.qtyKg,
      this.form.distanceKm,
      this.form.sourceSolar,
      this.form.sourceDuration,
    );
    this.form.co2Saved = Math.max(0, Math.round(co2Saved));

    if (this.form.waterSaved == null) {
      this.form.waterSaved = Math.max(0, Math.round(this.form.qtyKg * (this.form.sourceSolar ? 2.5 : 2)));
    }
    if (this.form.wasteAvoided == null) {
      this.form.wasteAvoided = Math.max(0, Math.round(this.form.qtyKg * 0.45));
    }

    this.form.grade = this.gradeFromMetrics(
      this.form.co2Saved,
      this.form.distanceKm,
      this.form.sourceSolar,
      this.form.sourceDuration,
    );
  }

  saveOrder(): void {
    if (this.savingForm) {
      return;
    }
    if (this.currentEnterpriseId == null) {
      this.error = 'Unable to resolve the current enterprise identity.';
      return;
    }
    if (!this.form.companyName.trim() || !this.form.material.trim() || !this.form.supplier.trim()) {
      this.error = 'Company, material, and supplier are required.';
      return;
    }
    if (this.form.qtyKg <= 0) {
      this.error = 'Quantity must be greater than zero.';
      return;
    }

    this.savingForm = true;
    this.error = '';
    this.success = '';
    this.recomputeOrderMetrics();

    const payload: EcoOrderRequest = {
      ref: this.editMode ? this.form.ref : undefined,
      companyName: this.form.companyName.trim(),
      material: this.form.material.trim(),
      qtyKg: this.form.qtyKg,
      supplier: this.form.supplier.trim(),
      distanceKm: this.form.distanceKm,
      orderDate: this.form.orderDate,
      status: this.form.status,
      grade: this.form.grade,
      co2Saved: this.form.co2Saved,
      waterSaved: this.form.waterSaved,
      wasteAvoided: this.form.wasteAvoided,
      enterpriseId: this.currentEnterpriseId,
    };

    const request$ = this.editMode && this.form.id
      ? this.orderApi.update(this.form.id, payload)
      : this.orderApi.create(payload);

    request$.subscribe({
      next: () => {
        this.success = this.editMode ? 'Order updated.' : 'Order created.';
        this.closeForm();
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to save order.';
        this.savingForm = false;
      },
    });
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
      enterpriseId: this.currentEnterpriseId,
    };

    this.savingId = order.id;
    this.error = '';

    this.orderApi.update(order.id, payload).subscribe({
      next: () => {
        this.success = 'Order status updated.';
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to update order status.';
        this.savingId = null;
      },
    });
  }

  cancelOrder(order: BackendEcoOrder): void {
    const reason = window.prompt('Cancellation reason (optional):', order.cancelReason ?? '') ?? '';
    this.savingId = order.id;
    this.error = '';

    this.orderApi.cancel(order.id, reason).subscribe({
      next: () => {
        this.success = 'Order cancelled.';
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to cancel order.';
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
    this.currentEnterpriseId = this.readCurrentEnterpriseId();

    forkJoin({
      orders: this.orderApi.list(false),
      reservations: this.reservationApi.list(false),
    }).subscribe({
      next: ({ orders, reservations }) => {
        this.orders = orders.filter(order => !order.deleted);
        this.reservations = reservations.filter(reservation => !reservation.deleted);
        this.statusDrafts = {};
        for (const order of this.myOrders) {
          this.statusDrafts[order.id] = order.status;
        }
        this.loading = false;
        this.savingId = null;
        this.savingForm = false;
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to load orders.';
        this.loading = false;
        this.savingId = null;
        this.savingForm = false;
      },
    });
  }

  private createEmptyForm(): OrderFormModel {
    return {
      id: null,
      ref: '',
      companyName: this.auth.currentUser?.company ?? this.auth.currentUser?.name ?? '',
      material: '',
      qtyKg: 0,
      supplier: '',
      distanceKm: 0,
      orderDate: new Date().toISOString().slice(0, 10),
      status: 'draft',
      grade: 'C',
      co2Saved: null,
      waterSaved: null,
      wasteAvoided: null,
      sourceSolar: false,
      sourceDuration: 1,
    };
  }

  private readCurrentEnterpriseId(): number | null {
    const raw = (this.auth.currentUser as { enterprise?: { id?: number | string } } | null)?.enterprise?.id
      ?? this.auth.currentUser?.id;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private enterpriseIdForOrder(order: BackendEcoOrder): number | null {
    return order.enterprise?.id ?? null;
  }

  private enterpriseIdForReservation(reservation: BackendReservation): number | null {
    return reservation.enterprise?.id ?? reservation.enterpriseId ?? null;
  }

  private derivedCo2Saved(qtyKg: number, distanceKm: number, solar: boolean, duration: number): number {
    const base = qtyKg * 0.35 - distanceKm * 0.08 + duration * 4;
    return Math.max(0, Math.round(solar ? base + qtyKg * 0.1 : base));
  }

  private gradeFromMetrics(
    co2Saved: number | null,
    distanceKm: number,
    solar: boolean,
    duration: number,
  ): BackendEcoGrade {
    const saved = co2Saved ?? 0;
    const solarBoost = solar ? 20 : 0;
    const durationBoost = duration * 4;
    const score = saved + solarBoost + durationBoost - distanceKm * 0.03;
    if (score >= 180) return 'A';
    if (score >= 120) return 'B';
    if (score >= 70) return 'C';
    if (score >= 30) return 'D';
    return 'E';
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
