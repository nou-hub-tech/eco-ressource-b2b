import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import {
  BackendEcoGrade,
  BackendEcoOrder,
  BackendOrderStatus,
  EcoOrderApiService,
  EcoOrderRequest,
} from '../../../pages/moduleReservation/shared/api/eco-order-api.service';

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
};

@Component({
  selector: 'app-enterprise-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-wrapper">
      <div class="page-header">
        <h1>Enterprise Orders</h1>
        <p>Orders attached to your enterprise account.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-bottom:16px">
        <div class="card">
          <h2 style="margin:0 0 10px">CO2 Dashboard</h2>
          <div style="display:flex;justify-content:space-between;color:var(--text2)">
            <span>Total CO2 saved</span>
            <strong>{{ totalCo2Saved }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;color:var(--text2);margin-top:8px">
            <span>Average per order</span>
            <strong>{{ averageCo2Saved }}</strong>
          </div>
        </div>

        <div class="card">
          <h2 style="margin:0 0 10px">Eco Impact Score</h2>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="badge badge-neutral">Grade {{ ecoImpactScore.grade }}</span>
            <strong>{{ ecoImpactScore.averageCo2 }} CO2</strong>
          </div>
          <p style="margin:10px 0 0;color:var(--text2)">{{ ecoImpactScore.message }}</p>
        </div>

        <div class="card">
          <h2 style="margin:0 0 10px">Lifecycle Tracker</h2>
          <div style="display:flex;justify-content:space-between;color:var(--text2)">
            <span>Created</span>
            <strong>{{ lifecycleSummary.created }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;color:var(--text2);margin-top:8px">
            <span>Processing</span>
            <strong>{{ lifecycleSummary.processing }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;color:var(--text2);margin-top:8px">
            <span>Completed</span>
            <strong>{{ lifecycleSummary.completed }}</strong>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap">
          <div>
            <h2 style="margin:0 0 6px">{{ editMode ? 'Update Order' : 'Create Order' }}</h2>
            <p style="margin:0;color:var(--text2)">Create, edit, and cancel orders directly from the enterprise workspace.</p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-primary" type="button" (click)="openCreate()">
              New Order
            </button>
            <button class="btn btn-outline" type="button" *ngIf="showForm" (click)="closeForm()" [disabled]="savingForm">
              Close
            </button>
          </div>
        </div>

        <div *ngIf="showForm" style="margin-top:16px">
          <div class="form-row">
            <div class="form-group">
              <label>Company</label>
              <input type="text" name="companyName" [(ngModel)]="form.companyName" />
            </div>

            <div class="form-group">
              <label>Material</label>
              <input type="text" name="material" [(ngModel)]="form.material" />
            </div>

            <div class="form-group">
              <label>Supplier</label>
              <input type="text" name="supplier" [(ngModel)]="form.supplier" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Quantity (kg)</label>
              <input type="number" min="1" name="qtyKg" [(ngModel)]="form.qtyKg" (ngModelChange)="recomputeOrderMetrics()" />
            </div>

            <div class="form-group">
              <label>Distance (km)</label>
              <input type="number" min="0" name="distanceKm" [(ngModel)]="form.distanceKm" (ngModelChange)="recomputeOrderMetrics()" />
            </div>

            <div class="form-group">
              <label>Order Date</label>
              <input type="date" name="orderDate" [(ngModel)]="form.orderDate" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Status</label>
              <select name="status" [(ngModel)]="form.status">
                <option *ngFor="let status of statuses" [ngValue]="status">{{ status }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>Grade</label>
              <input type="text" [value]="form.grade" disabled />
            </div>

            <div class="form-group">
              <label>CO2 Saved</label>
              <input type="number" name="co2Saved" [(ngModel)]="form.co2Saved" (ngModelChange)="recomputeOrderMetrics()" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Water Saved</label>
              <input type="number" name="waterSaved" [(ngModel)]="form.waterSaved" />
            </div>

            <div class="form-group">
              <label>Waste Avoided</label>
              <input type="number" name="wasteAvoided" [(ngModel)]="form.wasteAvoided" />
            </div>

            <div class="form-group">
              <label>Reference</label>
              <input type="text" name="ref" [(ngModel)]="form.ref" [disabled]="!editMode" />
            </div>
          </div>

          <div class="message error" *ngIf="error">{{ error }}</div>

          <div class="actions-row">
            <button class="btn btn-primary" type="button" (click)="saveOrder()" [disabled]="savingForm">
              {{ savingForm ? 'Saving...' : (editMode ? 'Update Order' : 'Create Order') }}
            </button>
            <button class="btn btn-outline" type="button" (click)="closeForm()" [disabled]="savingForm">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="card" style="padding:0">
        <div class="table-header">
          <h2>Enterprise Orders</h2>
          <span>{{ visibleOrders.length }} order(s)</span>
        </div>

        <div class="table-state error" *ngIf="error">{{ error }}</div>
        <div class="table-state" *ngIf="loading">Loading orders...</div>

        <table class="data-table" *ngIf="!loading && visibleOrders.length">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Company</th>
              <th>Material</th>
              <th>Qty (kg)</th>
              <th>Lifecycle</th>
              <th>Impact</th>
              <th>Status</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of visibleOrders">
              <td>{{ order.ref }}</td>
              <td>{{ order.companyName }}</td>
              <td>{{ order.material }}</td>
              <td>{{ order.qtyKg }}</td>
              <td style="min-width:170px">
                <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text2);margin-bottom:6px">
                  <span>created</span>
                  <span>processing</span>
                  <span>completed</span>
                </div>
                <div style="height:8px;border-radius:999px;background:#e5e7eb;overflow:hidden">
                  <div
                    [style.width.%]="lifecycleProgress(order)"
                    style="height:100%;background:linear-gradient(90deg,#0ea5e9,#16a34a)"
                  ></div>
                </div>
              </td>
              <td>
                <div>{{ impactMessage(order) }}</div>
                <div style="font-size:12px;color:var(--text2)">CO2: {{ estimatedCo2(order) }}</div>
              </td>
              <td><span class="badge badge-neutral">{{ order.status }}</span></td>
              <td>{{ order.grade }}</td>
              <td>
                <div class="status-actions" style="flex-wrap:wrap">
                  <select [(ngModel)]="statusDrafts[order.id]" [name]="'status-' + order.id">
                    <option *ngFor="let status of statuses" [ngValue]="status">{{ status }}</option>
                  </select>
                  <button
                    class="btn btn-primary btn-sm"
                    type="button"
                    (click)="saveStatus(order)"
                    [disabled]="savingId === order.id"
                  >
                    Save
                  </button>
                  <button class="btn btn-outline btn-sm" type="button" (click)="openEdit(order)">
                    Edit
                  </button>
                  <button
                    class="btn btn-outline btn-sm"
                    type="button"
                    (click)="cancelOrder(order)"
                    [disabled]="savingId === order.id || order.status === 'cancelled'"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="table-state" *ngIf="!loading && !visibleOrders.length">
          No orders found for your enterprise.
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./enterprise-orders.css'],
})
export class EnterpriseOrders implements OnInit {
  loading = true;
  savingId: number | null = null;
  savingForm = false;
  showForm = false;
  editMode = false;
  error = '';

  orders: BackendEcoOrder[] = [];
  currentEnterpriseId: number | null = null;
  statusDrafts: Record<number, BackendOrderStatus> = {};
  form: OrderFormModel = this.createEmptyForm();

  readonly statuses: BackendOrderStatus[] = ['draft', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  constructor(
    private readonly auth: AuthService,
    private readonly orderApi: EcoOrderApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get visibleOrders(): BackendEcoOrder[] {
    return this.orders.filter(order =>
      !order.deleted && this.enterpriseIdForOrder(order) === this.currentEnterpriseId,
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

  openCreate(): void {
    this.editMode = false;
    this.showForm = true;
    this.error = '';
    this.form = this.createEmptyForm();
    this.recomputeOrderMetrics();
  }

  openEdit(order: BackendEcoOrder): void {
    this.editMode = true;
    this.showForm = true;
    this.error = '';
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
      co2Saved: order.co2Saved ?? this.derivedCo2Saved(order.qtyKg, order.distanceKm),
      waterSaved: order.waterSaved ?? null,
      wasteAvoided: order.wasteAvoided ?? null,
    };
  }

  closeForm(): void {
    this.showForm = false;
    this.editMode = false;
    this.savingForm = false;
    this.form = this.createEmptyForm();
  }

  recomputeOrderMetrics(): void {
    const co2Saved = this.form.co2Saved ?? this.derivedCo2Saved(this.form.qtyKg, this.form.distanceKm);
    this.form.co2Saved = Math.max(0, Math.round(co2Saved));

    if (this.form.waterSaved == null) {
      this.form.waterSaved = Math.max(0, Math.round(this.form.qtyKg * 2));
    }
    if (this.form.wasteAvoided == null) {
      this.form.wasteAvoided = Math.max(0, Math.round(this.form.qtyKg * 0.45));
    }

    this.form.grade = this.gradeFromMetrics(this.form.co2Saved, this.form.distanceKm);
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
        this.closeForm();
        this.loadData();
      },
      error: (err) => {
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
      next: () => this.loadData(),
      error: (err) => {
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
      next: () => this.loadData(),
      error: (err) => {
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

    this.orderApi.list(false).subscribe({
      next: orders => {
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

  private derivedCo2Saved(qtyKg: number, distanceKm: number): number {
    return Math.max(0, Math.round(qtyKg * 0.4 - distanceKm * 0.08));
  }

  private gradeFromMetrics(co2Saved: number | null, distanceKm: number): BackendEcoGrade {
    const saved = co2Saved ?? 0;
    if (saved >= 180 && distanceKm <= 150) return 'A';
    if (saved >= 120 && distanceKm <= 300) return 'B';
    if (saved >= 70) return 'C';
    if (saved >= 30) return 'D';
    return 'E';
  }

  private co2Value(order: BackendEcoOrder): number {
    if (order.co2Saved != null) {
      return Math.round(Number(order.co2Saved));
    }
    return this.derivedCo2Saved(order.qtyKg, order.distanceKm);
  }

  private gradeScore(grade: string): number {
    if (grade === 'A') return 5;
    if (grade === 'B') return 4;
    if (grade === 'C') return 3;
    if (grade === 'D') return 2;
    return 1;
  }
}
