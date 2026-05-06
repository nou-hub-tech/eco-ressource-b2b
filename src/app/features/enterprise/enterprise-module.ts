import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { Layout } from '../../shared/components/layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Marketplace } from './marketplace/marketplace';
import { MyStock } from './my-stock/my-stock';
import { MyDeliveries } from './my-deliveries/my-deliveries';
import { MyListings } from './my-listings/my-listings';
import { MyReservations } from './my-reservations/my-reservations';
import { Transactions } from './transactions/transactions';
import { Reports } from './reports/reports';
import { Requests } from './requests/requests';
import { Events } from '../events/events';
import { Treasury } from './treasury/treasury';
import { Invoices } from './invoices/invoices';
import { InvoiceChatComponent } from './invoices/invoice-chat.component';
import { MyProducts } from './my-products/my-products';
import { MyInventory } from './my-inventory/my-inventory';
import { ProductFinder } from './product-finder/product-finder';
import { MarketChatbot } from './market-chatbot/market-chatbot';
import { MyReclamations } from './my-reclamations/my-reclamations';
import { Solidarity } from './solidarity/solidarity';
import { EventsMapComponent } from '../events/events-map/events-map';
import { FeaturesEventsModule } from '../events/events-module';
import { PaymentSuccessComponent } from './payment/payment-success.component';
import { PaymentFailureComponent } from './payment/payment-failure.component';
import { StripePaymentModalComponent } from './payment/stripe-payment-modal.component';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'marketplace', component: Marketplace },
      { path: 'my-products', component: MyProducts },
      { path: 'my-inventory', component: MyInventory },
      { path: 'my-stock', component: MyStock },
      { path: 'my-deliveries', component: MyDeliveries },
      { path: 'my-listings', component: MyListings },
      { path: 'my-reservations', component: MyReservations },
      { path: 'transactions', component: Transactions },
      { path: 'reports', component: Reports },
      { path: 'requests', component: Requests },
      { path: 'events', component: Events },
      { path: 'events/events-map', component: EventsMapComponent },
      { path: 'treasury', component: Treasury },
      { path: 'invoices', component: Invoices },
      { path: 'product-finder', component: ProductFinder },
      { path: 'market-chatbot', component: MarketChatbot },
      { path: 'my-reclamations', component: MyReclamations },
      { path: 'solidarity', component: Solidarity },
      { path: 'payment/success', component: PaymentSuccessComponent },
      { path: 'payment/failure', component: PaymentFailureComponent },
      {
        path: 'annonces',
        loadChildren: () =>
          import('../annonces/annonces-module').then((m) => m.AnnoncesModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    Dashboard, Marketplace, MyStock, MyProducts, MyInventory,
    MyDeliveries, MyListings, MyReservations,
    Transactions, Reports, Requests, Treasury, Invoices,
    InvoiceChatComponent, ProductFinder, MarketChatbot, MyReclamations,
    Solidarity,
    PaymentSuccessComponent, PaymentFailureComponent, StripePaymentModalComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, FeaturesEventsModule, RouterModule.forChild(routes)],
  providers: [DatePipe, DecimalPipe]
})
export class EnterpriseModule { }
