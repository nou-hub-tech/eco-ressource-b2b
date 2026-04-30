import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { AiInsightsPanel } from '../../../features/reservation-center/components/ai-insights-panel/ai-insights-panel';
import { StatusChip } from '../../../features/reservation-center/components/status-chip/status-chip';
import {
  AiInsight,
  EnterpriseContext,
  OrderFormModel,
} from '../../../features/reservation-center/models/reservation-center.models';
import { ReservationCenterAiService } from '../../../features/reservation-center/services/reservation-center-ai.service';
import { ReservationCenterService } from '../../../features/reservation-center/services/reservation-center.service';
import { ReservationCenterState } from '../../../features/reservation-center/state/reservation-center.state';
import {
  BackendEcoOrder,
  BackendOrderStatus,
  EcoOrderRequest,
} from '../../../pages/moduleReservation/shared/api/eco-order-api.service';
import { BackendReservation } from '../../../pages/moduleReservation/shared/api/reservation-api.service';

@Component({
  selector: 'app-enterprise-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, AiInsightsPanel, StatusChip],
  templateUrl: './enterprise-orders.html',
  styleUrls: ['./enterprise-orders.css'],
})
export class EnterpriseOrders implements OnInit {
  loading = true;
  saving = false;
  error = '';
  success = '';
  showForm = false;
  bulkBusy = false;

  context: EnterpriseContext = {
    enterpriseId: null,
    companyName: '',
    role: 'enterprise',
    isAdmin: false,
  };
  orders: BackendEcoOrder[] = [];
  reservations: BackendReservation[] = [];
  aiInsights: AiInsight[] = [];
  selectedOrderId: number | null = null;
  selectedOrderIds = new Set<number>();
  form: OrderFormModel = this.createForm();

  readonly statuses: BackendOrderStatus[] = ['draft', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  constructor(
    private readonly auth: AuthService,
    private readonly state: ReservationCenterState,
    private readonly ai: ReservationCenterAiService,
    private readonly workspace: ReservationCenterService,
  ) {}

  ngOnInit(): void {
    this.context = this.readContext();
    this.refresh();
  }

  get scopedOrders(): BackendEcoOrder[] {
    return this.context.isAdmin
      ? this.orders
      : this.orders.filter(order => (order.enterprise?.id ?? null) === this.context.enterpriseId);
  }

  get confirmedReservations(): BackendReservation[] {
    const confirmed = this.reservations.filter(reservation => reservation.status === 'CONFIRMED');
    return this.context.isAdmin
      ? confirmed
      : confirmed.filter(reservation => (reservation.enterprise?.id ?? reservation.enterpriseId ?? null) === this.context.enterpriseId);
  }

  get analytics() {
    const totalCo2 = this.scopedOrders.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0);
    const avgCo2 = this.scopedOrders.length ? Math.round(totalCo2 / this.scopedOrders.length) : 0;
    const totalQty = this.scopedOrders.reduce((sum, order) => sum + order.qtyKg, 0);

    return {
      totalCo2,
      avgCo2,
      totalQty,
      delivered: this.scopedOrders.filter(order => order.status === 'delivered').length,
    };
  }

  get trends() {
    return this.workspace.buildOrderTrends(this.scopedOrders);
  }

  get selectedOrder(): BackendEcoOrder | null {
    return this.scopedOrders.find(order => order.id === this.selectedOrderId) ?? this.scopedOrders[0] ?? null;
  }

  get selectedBreakdown() {
    return this.selectedOrder ? this.workspace.buildPriceBreakdown(this.selectedOrder) : [];
  }

  get selectedGrandTotal(): number {
    return this.selectedOrder ? this.workspace.orderGrandTotal(this.selectedOrder) : 0;
  }

  get selectedOrders(): BackendEcoOrder[] {
    return this.scopedOrders.filter(order => this.selectedOrderIds.has(order.id));
  }

  get allOrdersSelected(): boolean {
    return !!this.scopedOrders.length && this.scopedOrders.every(order => this.selectedOrderIds.has(order.id));
  }

  openFromReservation(reservation: BackendReservation): void {
    this.showForm = true;
    this.form = {
      id: null,
      ref: '',
      companyName: this.context.companyName,
      material: reservation.machine,
      qtyKg: Math.max(50, reservation.hours * 20),
      supplier: `Enterprise #${reservation.slotId ?? reservation.enterprise?.id ?? reservation.enterpriseId ?? 'N/A'}`,
      distanceKm: 0,
      orderDate: reservation.date,
      status: 'draft',
      co2Saved: reservation.co2Saved ?? Math.max(10, reservation.hours * 12),
      waterSaved: Math.max(8, reservation.hours * 7),
      wasteAvoided: Math.max(5, reservation.hours * 4),
      enterpriseId: this.context.enterpriseId,
    };
  }

  openAdminCreate(): void {
    if (!this.context.isAdmin) {
      return;
    }
    this.showForm = true;
    this.form = this.createForm();
  }

  edit(order: BackendEcoOrder): void {
    this.showForm = true;
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
      co2Saved: order.co2Saved ?? 0,
      waterSaved: order.waterSaved ?? 0,
      wasteAvoided: order.wasteAvoided ?? 0,
      enterpriseId: order.enterprise?.id ?? this.context.enterpriseId,
    };
  }

  closeForm(): void {
    this.showForm = false;
    this.saving = false;
    this.form = this.createForm();
  }

  saveOrder(): void {
    if (this.saving) {
      return;
    }

    if (!this.form.companyName.trim() || !this.form.material.trim() || !this.form.supplier.trim()) {
      this.error = 'Company, material, and supplier are required.';
      return;
    }

    const payload: EcoOrderRequest = {
      ref: this.form.id ? this.form.ref : undefined,
      companyName: this.form.companyName.trim(),
      material: this.form.material.trim(),
      qtyKg: this.form.qtyKg,
      supplier: this.form.supplier.trim(),
      distanceKm: this.form.distanceKm,
      orderDate: this.form.orderDate,
      status: this.form.status,
      co2Saved: this.form.co2Saved,
      waterSaved: this.form.waterSaved,
      wasteAvoided: this.form.wasteAvoided,
      enterpriseId: this.form.enterpriseId ?? this.context.enterpriseId,
    };

    this.error = '';
    this.saving = true;

    const request$ = this.form.id
      ? this.state.updateOrder(this.form.id, payload)
      : this.state.createOrder(payload);

    request$.subscribe({
      next: () => {
        this.success = this.form.id ? 'Order updated.' : 'Order created from confirmed reservation.';
        this.saving = false;
        this.closeForm();
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to save order.';
        this.saving = false;
      },
    });
  }

  advance(order: BackendEcoOrder): void {
    this.state.advanceOrder(order.id).subscribe({
      next: () => {
        this.success = 'Order advanced in the backend workflow.';
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to advance order.';
      },
    });
  }

  cancel(order: BackendEcoOrder): void {
    const reason = window.prompt('Cancellation reason:', order.cancelReason ?? '') ?? '';
    this.state.cancelOrder(order.id, reason).subscribe({
      next: () => {
        this.success = 'Order cancelled.';
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to cancel order.';
      },
    });
  }

  deleteOrder(order: BackendEcoOrder): void {
    if (!this.context.isAdmin || !window.confirm(`Delete order ${order.ref || order.id}?`)) {
      return;
    }

    this.state.deleteOrder(order.id).subscribe({
      next: () => {
        this.success = 'Order deleted.';
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to delete order.';
      },
    });
  }

  overrideOrder(order: BackendEcoOrder): void {
    if (!this.context.isAdmin) {
      return;
    }

    const nextStatus = (window.prompt(`Force status for order ${order.ref || order.id}:`, order.status) ?? '').trim() as BackendOrderStatus;
    if (!this.statuses.includes(nextStatus)) {
      this.error = 'Invalid order status override.';
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
      co2Saved: order.co2Saved ?? 0,
      waterSaved: order.waterSaved ?? 0,
      wasteAvoided: order.wasteAvoided ?? 0,
      enterpriseId: order.enterprise?.id ?? this.context.enterpriseId,
    };

    this.state.updateOrder(order.id, payload).subscribe({
      next: () => {
        this.success = 'Order status overridden.';
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to override order.';
      },
    });
  }

  toggleOrderSelection(id: number): void {
    if (!this.context.isAdmin) {
      return;
    }

    if (this.selectedOrderIds.has(id)) {
      this.selectedOrderIds.delete(id);
    } else {
      this.selectedOrderIds.add(id);
    }
    this.selectedOrderIds = new Set(this.selectedOrderIds);
  }

  toggleAllOrders(): void {
    if (!this.context.isAdmin) {
      return;
    }

    if (this.allOrdersSelected) {
      this.selectedOrderIds.clear();
    } else {
      this.selectedOrderIds = new Set(this.scopedOrders.map(order => order.id));
    }
  }

  bulkCancelOrders(): void {
    if (!this.context.isAdmin || !this.selectedOrders.length || this.bulkBusy) {
      return;
    }

    this.bulkBusy = true;
    const reason = window.prompt('Reason for bulk cancellation:', '') ?? '';

    forkJoin(this.selectedOrders.map(order => this.state.cancelOrder(order.id, reason))).subscribe({
      next: () => {
        this.success = 'Selected orders cancelled.';
        this.bulkBusy = false;
        this.selectedOrderIds.clear();
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to cancel selected orders.';
        this.bulkBusy = false;
      },
    });
  }

  statusVariant(status: string) {
    return this.workspace.statusVariant(status as 'draft');
  }

  selectOrder(order: BackendEcoOrder): void {
    this.selectedOrderId = order.id;
  }

  applyInsight(_insight: AiInsight): void {
    if (this.confirmedReservations.length) {
      this.openFromReservation(this.confirmedReservations[0]);
    }
  }

  private refresh(): void {
    this.loading = true;
    this.context = this.readContext();

    this.state.loadAll().subscribe({
      next: snapshot => {
        this.orders = snapshot.orders;
        this.reservations = snapshot.reservations;
        this.loading = false;
        this.selectedOrderIds.clear();
        if (this.selectedOrderId == null && this.scopedOrders.length) {
          this.selectedOrderId = this.scopedOrders[0].id;
        }
        this.loadInsights();
      },
      error: error => {
        this.loading = false;
        this.error = error?.error?.message ?? 'Failed to load orders.';
      },
    });
  }

  private loadInsights(): void {
    this.ai.getInsights('orders', this.context).subscribe({
      next: insights => {
        this.aiInsights = insights;
      },
      error: () => {
        this.aiInsights = [];
      },
    });
  }

  private readContext(): EnterpriseContext {
    const currentUser = this.auth.currentUser;
    return {
      enterpriseId: currentUser?.enterprise?.id ?? currentUser?.enterpriseId ?? null,
      companyName:
        currentUser?.enterprise?.companyName ??
        currentUser?.company ??
        currentUser?.name ??
        'Enterprise',
      role: currentUser?.role ?? 'enterprise',
      isAdmin: currentUser?.role === 'admin',
    };
  }

  private createForm(): OrderFormModel {
    return {
      id: null,
      ref: '',
      companyName: this.context.companyName,
      material: '',
      qtyKg: 0,
      supplier: '',
      distanceKm: 0,
      orderDate: new Date().toISOString().slice(0, 10),
      status: 'draft',
      co2Saved: 0,
      waterSaved: 0,
      wasteAvoided: 0,
      enterpriseId: this.context.enterpriseId,
    };
  }
}
