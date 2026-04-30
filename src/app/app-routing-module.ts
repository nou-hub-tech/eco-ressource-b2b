import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { EventCalendarComponent } from './features/event-calendar/event-calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
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
  { path: 'event-calendar', component: EventCalendarComponent },
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
