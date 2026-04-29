import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing-module';

/**
 * OrderPage is a standalone component loaded via the
 * EnterpriseRoutingModule. The order-form stub is no longer
 * referenced — order create/edit happens in modal flows on the list page.
 */
@NgModule({
  imports: [CommonModule, OrderRoutingModule],
})
export class OrderModule {}
