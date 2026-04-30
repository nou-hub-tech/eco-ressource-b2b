import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
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
export class AppRoutingModule {
    static ɵfac = function AppRoutingModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppRoutingModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppRoutingModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forRoot(routes), RouterModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forRoot(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
