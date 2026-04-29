import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryOrderRoutingModule } from './delivery-order-routing.module';
import { DeliveryOrderListComponent } from './components/delivery-order-list/delivery-order-list.component';
import { DeliveryOrderFormComponent } from './components/delivery-order-form/delivery-order-form.component';
import { DeliveryOrderDetailComponent } from './components/delivery-order-detail/delivery-order-detail.component';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DeliveryOrderRoutingModule,
        DeliveryOrderFormComponent,
        DeliveryOrderDetailComponent,
        DeliveryOrderListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]  // ← AJOUTE CETTE LIGNE
})
export class DeliveryOrderModule { }