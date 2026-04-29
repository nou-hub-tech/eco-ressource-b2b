import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Layout } from './shared/components/layout/layout';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'admin/reservations',
    component: Layout,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/moduleReservation/reservation/reservation-list/reservation-list-simple')
            .then(m => m.ReservationListSimple)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/moduleReservation/reservation/reservation-form/reservation-form')
            .then(m => m.ReservationForm)
      }
    ]
  },
  {
    path: 'admin/slots',
    component: Layout,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/moduleReservation/reservation-slot/slot-calendar/slot-calendar-simple')
            .then(m => m.SlotCalendarSimple)
      },
      {
        path: 'management',
        loadComponent: () =>
          import('./pages/moduleReservation/reservation-slot/slot-list/slot-list')
            .then(m => m.SlotList)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/moduleReservation/reservation-slot/slot-form/slot-form')
            .then(m => m.SlotForm)
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./pages/moduleReservation/reservation-slot/slot-form/slot-form')
            .then(m => m.SlotForm)
      }
    ]
  },
  {
    path: 'admin/orders',
    component: Layout,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/moduleReservation/order/order-list/order-list')
            .then(m => m.OrderPage)
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'enterprise',
    loadChildren: () => import('./features/enterprise/enterprise-module').then(m => m.EnterpriseModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'enterprise' }
  },
  {
    path: 'transporter',
    loadChildren: () => import('./features/transporter/transporter-module').then(m => m.TransporterModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'transporter' }
  },
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
