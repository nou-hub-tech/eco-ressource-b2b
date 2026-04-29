import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryOrderListComponent } from './components/delivery-order-list/delivery-order-list.component';
import { DeliveryOrderFormComponent } from './components/delivery-order-form/delivery-order-form.component';
import { DeliveryOrderDetailComponent } from './components/delivery-order-detail/delivery-order-detail.component';

const routes: Routes = [
    { path: '', component: DeliveryOrderListComponent },
    { path: 'new', component: DeliveryOrderFormComponent },
    { path: 'edit/:id', component: DeliveryOrderFormComponent },
    { path: 'detail/:id', component: DeliveryOrderDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryOrderRoutingModule { }