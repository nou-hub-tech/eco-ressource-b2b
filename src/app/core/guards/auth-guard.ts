import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.currentUser;

    if (!user) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const expectedRole = route.data['role'];
    if (expectedRole && user.role !== expectedRole) {
      this.router.navigate(['/' + user.role]);
      return false;
    }

    return true;
  }
}