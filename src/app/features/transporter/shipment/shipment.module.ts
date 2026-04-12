import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentListComponent } from './components/shipment-list/shipment-list.component';
import { ShipmentFormComponent } from './components/shipment-form/shipment-form.component';
import { ShipmentDetailComponent } from './components/shipment-detail/shipment-detail.component';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShipmentRoutingModule,
        ShipmentListComponent,
        ShipmentDetailComponent,
        ShipmentFormComponent
    ]
})
export class ShipmentModule { }