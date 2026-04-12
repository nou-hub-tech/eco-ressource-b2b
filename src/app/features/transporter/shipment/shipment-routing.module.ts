import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentListComponent } from './components/shipment-list/shipment-list.component';
import { ShipmentFormComponent } from './components/shipment-form/shipment-form.component';
import { ShipmentDetailComponent } from './components/shipment-detail/shipment-detail.component';

const routes: Routes = [
    { path: '', component: ShipmentListComponent },
    { path: 'new', component: ShipmentFormComponent },
    { path: 'new/:deliveryOrderId', component: ShipmentFormComponent },
    { path: 'edit/:id', component: ShipmentFormComponent },
    { path: 'detail/:id', component: ShipmentDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShipmentRoutingModule { }
