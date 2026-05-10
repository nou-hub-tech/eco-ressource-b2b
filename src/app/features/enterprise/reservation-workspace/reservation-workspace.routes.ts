import { Routes } from '@angular/router';

export const RESERVATION_WORKSPACE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/workspace-shell/workspace-shell.component').then(
        (module) => module.WorkspaceShellComponent
      ),

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reservations'
      },

      {
        path: 'reservations',
        loadComponent: () =>
          import('./pages/reservations-page/reservations-page.component').then(
            (module) => module.ReservationsPageComponent
          )
      },

      {
        path: 'slots',
        loadComponent: () =>
          import('./pages/slots-page/slots-page.component').then(
            (module) => module.SlotsPageComponent
          )
      },

      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders-page/orders-page.component').then(
            (module) => module.OrdersPageComponent
          )
      }
    ]
  }
];