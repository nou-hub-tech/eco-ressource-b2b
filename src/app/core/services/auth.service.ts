import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { API_URL } from '../constants/api-url';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'enterprise' | 'transporter';
  company?: string;
  enterpriseId?: number | null;
  enterprise?: {
    id: number;
    companyName?: string;
  } | null;
  avatar: string;
}

interface JwtResponse {
  token: string;
  type: string;
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    company?: string;
    enterpriseId?: number | null;
    enterprise?: {
      id: number;
      companyName?: string;
    } | null;
    avatar: string;
  };
}

const TOKEN_KEY = 'eco_token';
const USER_KEY = 'eco_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = API_URL;
  private readonly userSubject = new BehaviorSubject<User | null>(this.loadUser());
  readonly user$ = this.userSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; token?: string }> {
    return this.http
      .post<JwtResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.token);
          const u = this.normalizeUser(res.user, res.role);
          localStorage.setItem(USER_KEY, JSON.stringify(u));
          this.userSubject.next(u);
        }),
        map(() => ({ success: true, token: localStorage.getItem(TOKEN_KEY) ?? undefined }))
      );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    companyName: string;
    sector: string;
    taxId: string;
  }): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(`${this.apiUrl}/auth/register`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.token);
          const u = this.normalizeUser(res.user, res.role);
          localStorage.setItem(USER_KEY, JSON.stringify(u));
          this.userSubject.next(u);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getRole(): string | null {
    return this.currentUser?.role ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUser;
  }

  private loadUser(): User | null {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (!stored) {
        return null;
      }
      const user = JSON.parse(stored) as User;
      if (!user.id || !user.role || !user.email) {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
      return user;
    } catch {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  }

  private normalizeUser(
    u: JwtResponse['user'],
    springRole: string
  ): User {
    const routeRole = this.mapSpringRoleToRoute(springRole);
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: routeRole,
      company: u.company,
      enterpriseId: u.enterprise?.id ?? u.enterpriseId ?? null,
      enterprise: u.enterprise ?? null,
      avatar: u.avatar
    };
  }

  private mapSpringRoleToRoute(
    r: string
  ): 'admin' | 'enterprise' | 'transporter' {
    if (r === 'ROLE_ADMIN') {
      return 'admin';
    }
    if (r === 'ROLE_TRANSPORTER') {
      return 'transporter';
    }
    return 'enterprise';
  }
}
