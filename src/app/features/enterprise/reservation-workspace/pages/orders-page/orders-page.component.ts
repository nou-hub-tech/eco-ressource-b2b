import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexXAxis
} from 'ng-apexcharts';
import * as QRCode from 'qrcode';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import {
  CURRENT_ENTERPRISE_NAME,
  InsightCard,
  Order,
  OrderDraft,
  OrderLineItem,
  PaymentStatus,
  Reservation,
  ReservationRole,
  ReservationSlot
} from '../../reservation-workspace.models';
import { ReservationWorkspaceService } from '../../services/reservation-workspace.service';

type OrderDetailView = 'overview' | 'tracking' | 'finance' | 'documents';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [ChartCardComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly enterpriseName = CURRENT_ENTERPRISE_NAME;
  readonly editorForm = this.fb.group({
    customer: ['', Validators.required],
    reservationId: ['', Validators.required],
    slotId: ['', Validators.required],
    role: ['provider' as ReservationRole, Validators.required],
    city: ['Tunis', Validators.required],
    tax: [180, [Validators.required, Validators.min(0)]],
    createdAt: ['2026-05-06', Validators.required],
    dueDate: ['2026-05-16', Validators.required],
    status: ['draft' as Order['status'], Validators.required],
    paymentStatus: ['pending' as PaymentStatus, Validators.required],
    items: this.fb.array([])
  });

  orders: Order[] = [];
  reservations: Reservation[] = [];
  slots: ReservationSlot[] = [];
  insights: InsightCard[] = [];
  selectedOrderId = '';
  paymentFilter: 'all' | PaymentStatus = 'all';
  roleFilter: 'all' | ReservationRole = 'all';
  revenueView: 'all' | ReservationRole = 'all';
  paymentMixMode: 'count' | 'value' = 'count';
  activeRevenueDay: string | null = null;
  search = '';
  detailView: OrderDetailView = 'overview';
  editorMode: 'create' | 'edit' | null = null;
  viewModalOpen = false;
  deleteArmedId = '';
  editorErrorMessage = '';
  qrDataUrl = '';

  revenueSeries: ApexAxisChartSeries = [{ name: 'Amount', data: [] }];
  revenueChart: ApexChart = {
    type: 'area',
    height: 280,
    toolbar: { show: false }
  };
  revenueXAxis: ApexXAxis = { categories: [] };

  paymentMixSeries: ApexNonAxisChartSeries = [0, 0, 0];
  paymentMixChart: ApexChart = {
    type: 'donut',
    height: 280,
    toolbar: { show: false }
  };

  constructor(private readonly workspaceService: ReservationWorkspaceService) {
    this.workspaceService.orders$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (orders) => {
        this.orders = orders;
        if (!this.selectedOrderId || !orders.some((item) => item.id === this.selectedOrderId)) {
          this.selectedOrderId = orders[0]?.id ?? '';
        }
        this.syncCharts();
        await this.syncQrCode();
      });

    this.workspaceService.reservations$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((reservations) => {
        this.reservations = reservations;
        if (!this.editorForm.get('reservationId')?.value && reservations.length && this.editorMode !== 'edit') {
          this.editorForm.patchValue({ reservationId: reservations[0].id });
        }
      });

    this.workspaceService.slots$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((slots) => (this.slots = slots));

    this.workspaceService.orderInsights$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((insights) => (this.insights = insights));

    this.editorForm
      .get('reservationId')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((reservationId) => {
        const reservation = this.reservations.find((item) => item.id === reservationId);
        if (!reservation) {
          return;
        }

        this.editorForm.patchValue(
          {
            customer: reservation.customer,
            slotId: reservation.slotId,
            role: reservation.role,
            city: reservation.city
          },
          { emitEvent: false }
        );

        if (this.editorMode === 'create') {
          this.replaceItems([{ label: reservation.resource, quantity: 1, unitPrice: reservation.amount }]);
          this.editorForm.patchValue(
            { tax: +(reservation.amount * 0.19).toFixed(2) },
            { emitEvent: false }
          );
        }
      });
  }

  get items(): FormArray {
    return this.editorForm.get('items') as FormArray;
  }

  get itemControls() {
    return this.items.controls;
  }

  get filteredOrders(): Order[] {
    const query = this.search.trim().toLowerCase();
    return this.orders.filter((order) => {
      const paymentMatches =
        this.paymentFilter === 'all' || order.paymentStatus === this.paymentFilter;
      const roleMatches = this.roleFilter === 'all' || order.role === this.roleFilter;
      const dayMatches = !this.activeRevenueDay || order.createdAt === this.activeRevenueDay;
      const queryMatches =
        !query ||
        order.code.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.invoiceNumber.toLowerCase().includes(query) ||
        order.city.toLowerCase().includes(query);
      return paymentMatches && roleMatches && dayMatches && queryMatches;
    });
  }

  get selectedOrder(): Order | undefined {
    return this.orders.find((order) => order.id === this.selectedOrderId);
  }

  get toCollect(): number {
    return this.orders
      .filter((order) => order.role === 'provider' && order.paymentStatus !== 'paid')
      .reduce((sum, order) => sum + order.total, 0);
  }

  get toPay(): number {
    return this.orders
      .filter((order) => order.role === 'consumer' && order.paymentStatus !== 'paid')
      .reduce((sum, order) => sum + order.total, 0);
  }

  get reviewCount(): number {
    return this.orders.filter((order) => order.paymentStatus === 'review').length;
  }

  get editorSubtotal(): number {
    return this.items.controls.reduce((sum, control) => {
      const quantity = Number(control.get('quantity')?.value ?? 0);
      const unitPrice = Number(control.get('unitPrice')?.value ?? 0);
      return sum + quantity * unitPrice;
    }, 0);
  }

  get editorTotal(): number {
    return +(this.editorSubtotal + Number(this.editorForm.get('tax')?.value ?? 0)).toFixed(2);
  }

  get revenueBadge(): string {
    if (this.activeRevenueDay) {
      return `${this.activeRevenueDay} focus`;
    }

    if (this.revenueView === 'provider') {
      return 'We collect';
    }

    if (this.revenueView === 'consumer') {
      return 'We pay';
    }

    return 'Daily total';
  }

  get paymentMixBadge(): string {
    return this.paymentMixMode === 'count' ? 'Status mix' : 'Amount mix';
  }

  get showOrderModal(): boolean {
    return this.viewModalOpen || this.editorMode !== null;
  }

  get showDeleteModal(): boolean {
    return Boolean(this.deleteArmedId && this.selectedOrder?.id === this.deleteArmedId);
  }

  async selectOrder(id: string): Promise<void> {
    this.selectedOrderId = id;
    this.detailView = 'overview';
    this.editorMode = null;
    this.deleteArmedId = '';
    await this.syncQrCode();
  }

  startCreateOrder(): void {
    this.detailView = 'overview';
    this.editorMode = 'create';
    this.viewModalOpen = false;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
    const reservation = this.reservations[0];
    this.editorForm.reset({
      customer: reservation?.customer ?? '',
      reservationId: reservation?.id ?? '',
      slotId: reservation?.slotId ?? this.slots[0]?.id ?? '',
      role: reservation?.role ?? 'provider',
      city: reservation?.city ?? 'Tunis',
      tax: reservation ? +(reservation.amount * 0.19).toFixed(2) : 180,
      createdAt: '2026-05-06',
      dueDate: '2026-05-16',
      status: 'draft',
      paymentStatus: 'pending'
    });
    this.replaceItems([
      {
        label: reservation?.resource ?? 'Service package',
        quantity: 1,
        unitPrice: reservation?.amount ?? 0
      }
    ]);
  }

  startEditOrder(order: Order): void {
    this.selectedOrderId = order.id;
    this.detailView = 'overview';
    this.editorMode = 'edit';
    this.viewModalOpen = false;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
    this.editorForm.reset({
      customer: order.customer,
      reservationId: order.reservationId,
      slotId: order.slotId,
      role: order.role,
      city: order.city,
      tax: order.tax,
      createdAt: order.createdAt,
      dueDate: order.dueDate,
      status: order.status,
      paymentStatus: order.paymentStatus
    });
    this.replaceItems(order.items);
  }

  saveOrder(): void {
    if (this.editorForm.invalid || this.items.invalid || !this.items.length) {
      this.editorForm.markAllAsTouched();
      this.items.markAllAsTouched();
      this.editorErrorMessage = 'Complete the required order fields and keep at least one line item before saving.';
      return;
    }

    const draft = this.buildDraftFromForm();
    if (this.editorMode === 'edit' && this.selectedOrder) {
      this.workspaceService.updateOrder(this.selectedOrder.id, draft);
    } else {
      this.workspaceService.createOrder(draft);
    }

    this.editorErrorMessage = '';
    this.editorMode = null;
  }

  cancelEditor(): void {
    this.editorErrorMessage = '';
    this.editorMode = null;
    this.viewModalOpen = false;
  }

  addItem(label = '', quantity = 1, unitPrice = 0): void {
    this.items.push(this.createItemGroup({ label, quantity, unitPrice }));
  }

  removeItem(index: number): void {
    if (this.items.length === 1) {
      return;
    }
    this.items.removeAt(index);
  }

  requestDeleteOrder(order: Order): void {
    this.selectedOrderId = order.id;
    this.deleteArmedId = order.id;
    this.viewModalOpen = false;
  }

  closeDeleteModal(): void {
    this.deleteArmedId = '';
  }

  deleteOrder(orderId: string): void {
    this.workspaceService.deleteOrder(orderId);
    this.deleteArmedId = '';
    this.editorMode = null;
    this.viewModalOpen = false;
  }

  advanceOrder(order: Order): void {
    this.workspaceService.advanceOrderStatus(order.id);
  }

  setDetailView(view: OrderDetailView): void {
    this.detailView = view;
  }

  async openOrderDetails(order: Order): Promise<void> {
    this.selectedOrderId = order.id;
    this.detailView = 'overview';
    this.editorMode = null;
    this.deleteArmedId = '';
    this.viewModalOpen = true;
    await this.syncQrCode();
  }

  closeOrderModal(): void {
    this.viewModalOpen = false;
    this.editorMode = null;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
  }

  setRevenueView(view: 'all' | ReservationRole): void {
    this.revenueView = view;
    this.syncCharts();
  }

  setPaymentMixMode(mode: 'count' | 'value'): void {
    this.paymentMixMode = mode;
    this.syncCharts();
  }

  clearRevenueDayFocus(): void {
    this.activeRevenueDay = null;
  }

  async onRevenueChartSelect(event: {
    label: string;
  }): Promise<void> {
    if (!event.label) {
      return;
    }

    this.activeRevenueDay = this.activeRevenueDay === event.label ? null : event.label;
    const focused = this.filteredOrders[0];
    if (focused) {
      await this.selectOrder(focused.id);
    }
  }

  onPaymentMixSelect(event: {
    dataPointIndex: number;
  }): void {
    const paymentStatuses: PaymentStatus[] = ['paid', 'pending', 'review'];
    const selectedStatus = paymentStatuses[event.dataPointIndex];
    if (selectedStatus) {
      this.paymentFilter = this.paymentFilter === selectedStatus ? 'all' : selectedStatus;
    }
  }

  linkedReservation(order: Order): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === order.reservationId);
  }

  linkedSlot(order: Order): ReservationSlot | undefined {
    return this.slots.find((slot) => slot.id === order.slotId);
  }

  roleLabel(order: Pick<Order, 'role'>): string {
    return order.role === 'provider' ? 'We collect' : 'We pay';
  }

  canAdvanceOrder(order: Order): boolean {
    return order.status !== 'fulfilled';
  }

  advanceOrderLabel(order: Order): string {
    switch (order.status) {
      case 'draft':
        return 'Move to follow-up';
      case 'processing':
        return 'Mark invoiced';
      case 'invoiced':
        return 'Close order';
      case 'flagged':
        return 'Resume review';
      default:
        return 'Already closed';
    }
  }

  roleTone(order: Pick<Order, 'role'>): string {
    return order.role === 'provider' ? 'primary' : 'warning';
  }

  paymentStatusLabel(status: PaymentStatus): string {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      default:
        return 'Manual check';
    }
  }

  orderStatusLabel(status: Order['status']): string {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'processing':
        return 'In follow-up';
      case 'invoiced':
        return 'Invoiced';
      case 'fulfilled':
        return 'Closed';
      default:
        return 'Manual check';
    }
  }

  reviewTone(order: Order): 'danger' | 'warning' | 'success' {
    if (order.fraudRisk >= 65) {
      return 'danger';
    }

    if (order.fraudRisk >= 45) {
      return 'warning';
    }

    return 'success';
  }

  completedTrackingSteps(order: Order): number {
    return order.tracking.filter((step) => step.done).length;
  }

  trackingProgress(order: Order): number {
    if (!order.tracking.length) {
      return 0;
    }

    return Math.round((this.completedTrackingSteps(order) / order.tracking.length) * 100);
  }

  lineItemTotal(item: OrderLineItem): number {
    return +(item.quantity * item.unitPrice).toFixed(2);
  }

  private buildDraftFromForm(): OrderDraft {
    const value = this.editorForm.getRawValue();
    const items = (value.items ?? []) as Array<{
      label?: string;
      quantity?: number;
      unitPrice?: number;
    }>;
    return {
      customer: value.customer ?? '',
      reservationId: value.reservationId ?? '',
      slotId: value.slotId ?? '',
      role: value.role as ReservationRole,
      city: value.city ?? '',
      amount: this.editorSubtotal,
      tax: Number(value.tax ?? 0),
      createdAt: value.createdAt ?? '',
      dueDate: value.dueDate ?? '',
      status: value.status as Order['status'],
      paymentStatus: value.paymentStatus as PaymentStatus,
      items: items.map((item) => ({
        label: item.label ?? '',
        quantity: Number(item.quantity ?? 0),
        unitPrice: Number(item.unitPrice ?? 0)
      }))
    };
  }

  private createItemGroup(item?: { label?: string; quantity?: number; unitPrice?: number }) {
    return this.fb.group({
      label: [item?.label ?? '', Validators.required],
      quantity: [item?.quantity ?? 1, [Validators.required, Validators.min(1)]],
      unitPrice: [item?.unitPrice ?? 0, [Validators.required, Validators.min(0)]]
    });
  }

  private replaceItems(items: OrderLineItem[]): void {
    this.items.clear();
    items.forEach((item) => this.addItem(item.label, item.quantity, item.unitPrice));
    if (!items.length) {
      this.addItem();
    }
  }

  private syncCharts(): void {
    const revenueSource =
      this.revenueView === 'all'
        ? this.orders
        : this.orders.filter((order) => order.role === this.revenueView);
    const revenueByDay = new Map<string, number>();
    revenueSource.forEach((order) => {
      revenueByDay.set(order.createdAt, (revenueByDay.get(order.createdAt) ?? 0) + order.total);
    });

    const entries = Array.from(revenueByDay.entries()).sort(([left], [right]) =>
      left.localeCompare(right)
    );
    this.revenueXAxis = {
      categories: entries.map(([date]) => date)
    };
    this.revenueSeries = [{ name: 'Amount', data: entries.map(([, total]) => +total.toFixed(2)) }];

    const paymentSource =
      this.revenueView === 'all'
        ? this.orders
        : this.orders.filter((order) => order.role === this.revenueView);
    const paid = this.paymentMixMode === 'count'
      ? paymentSource.filter((order) => order.paymentStatus === 'paid').length
      : paymentSource
          .filter((order) => order.paymentStatus === 'paid')
          .reduce((sum, order) => sum + order.total, 0);
    const pending = this.paymentMixMode === 'count'
      ? paymentSource.filter((order) => order.paymentStatus === 'pending').length
      : paymentSource
          .filter((order) => order.paymentStatus === 'pending')
          .reduce((sum, order) => sum + order.total, 0);
    const review = this.paymentMixMode === 'count'
      ? paymentSource.filter((order) => order.paymentStatus === 'review').length
      : paymentSource
          .filter((order) => order.paymentStatus === 'review')
          .reduce((sum, order) => sum + order.total, 0);
    this.paymentMixSeries = [paid, pending, review];
  }

  private async syncQrCode(): Promise<void> {
    const selected = this.selectedOrder;
    if (!selected) {
      this.qrDataUrl = '';
      return;
    }

    this.qrDataUrl = await QRCode.toDataURL(selected.qrValue, {
      width: 220,
      margin: 1,
      color: { dark: '#155e75', light: '#ffffff' }
    });
  }
}
