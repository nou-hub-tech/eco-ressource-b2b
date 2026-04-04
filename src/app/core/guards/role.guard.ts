import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    const expected = route.data['role'] as string | undefined;
    const user = this.authService.currentUser;
    if (!expected || !user) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    if (user.role !== expected) {
      this.router.navigate(['/' + user.role]);
      return false;
    }
    return true;
  }
}
