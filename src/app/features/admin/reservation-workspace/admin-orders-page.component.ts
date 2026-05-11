import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../enterprise/reservation-workspace/dialogs/confirm-dialog/confirm-dialog.component';
import { OrderFormDialogComponent } from '../../enterprise/reservation-workspace/dialogs/order-form-dialog/order-form-dialog.component';
import {
  Order,
  OrderDraft,
  PaymentStatus,
  Reservation,
  ReservationRole
} from '../../../shared/reservation-workspace/reservation-workspace.models';
import { ReservationSlot } from '../../../shared/reservation-workspace/reservation-workspace.models';
import { ReservationWorkspaceService } from '../../../shared/reservation-workspace/services/reservation-workspace.service';

@Component({
  selector: 'app-admin-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders-page.component.html',
  styleUrl: './admin-orders-page.component.scss'
})
export class AdminOrdersPageComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);

  orders: Order[] = [];
  reservations: Reservation[] = [];
  slots: ReservationSlot[] = [];

  search = '';
  orderFocus: 'all' | PaymentStatus | 'review-heavy' = 'all';
  roleFilter: 'all' | ReservationRole = 'all';
  selectedOrderId = '';
  viewModalOpen = false;

  private readonly subscription = new Subscription();

  constructor(private readonly workspaceService: ReservationWorkspaceService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.workspaceService.orders$.subscribe((orders) => {
        this.orders = orders;
        if (!this.selectedOrderId || !orders.some((item) => item.id === this.selectedOrderId)) {
          this.selectedOrderId = orders[0]?.id ?? '';
        }
      })
    );
    this.subscription.add(
      this.workspaceService.reservations$.subscribe((reservations) => {
        this.reservations = reservations;
      })
    );
    this.subscription.add(
      this.workspaceService.slots$.subscribe((slots) => {
        this.slots = slots;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get filteredOrders(): Order[] {
    const query = this.search.trim().toLowerCase();
    return this.orders.filter((order) => {
      const focusMatches =
        this.orderFocus === 'all'
          ? true
          : this.orderFocus === 'review-heavy'
            ? order.fraudRisk >= 65 || order.paymentStatus === 'review'
            : order.paymentStatus === this.orderFocus;
      const roleMatches = this.roleFilter === 'all' || order.role === this.roleFilter;
      const queryMatches =
        !query ||
        order.invoiceNumber.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.city.toLowerCase().includes(query) ||
        order.code.toLowerCase().includes(query);
      return focusMatches && roleMatches && queryMatches;
    });
  }

  get topOrderAlert(): Order | undefined {
    return this.orders.slice().sort((left, right) => right.fraudRisk - left.fraudRisk)[0];
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

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(OrderFormDialogComponent, {
      width: '920px',
      maxWidth: 'calc(100vw - 24px)',
      data: { reservations: this.reservations, slots: this.slots }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((draft?: OrderDraft) => {
        if (draft) {
          this.workspaceService.createOrder(draft);
        }
      })
    );
  }

  openEditDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderFormDialogComponent, {
      width: '920px',
      maxWidth: 'calc(100vw - 24px)',
      data: { order, reservations: this.reservations, slots: this.slots }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((draft?: OrderDraft) => {
        if (draft) {
          this.workspaceService.updateOrder(order.id, draft);
        }
      })
    );
  }

  openOrderDetails(order: Order): void {
    this.selectedOrderId = order.id;
    this.viewModalOpen = true;
  }

  closeOrderModal(): void {
    this.viewModalOpen = false;
  }

  requestDeleteOrder(order: Order): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      maxWidth: 'calc(100vw - 24px)',
      data: {
        title: 'Delete order',
        message: `Remove ${order.invoiceNumber} from the admin workspace?`,
        confirmLabel: 'Delete order',
        tone: 'danger'
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.workspaceService.deleteOrder(order.id);
          if (this.selectedOrderId === order.id) {
            this.viewModalOpen = false;
          }
        }
      })
    );
  }

  advanceOrder(order: Order): void {
    this.workspaceService.advanceOrderStatus(order.id);
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

  roleLabel(order: Order): string {
    return order.role === 'provider' ? 'Collect' : 'Pay';
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
}
