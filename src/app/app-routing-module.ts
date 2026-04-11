import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

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
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}