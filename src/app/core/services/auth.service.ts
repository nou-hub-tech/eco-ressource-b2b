import { Injectable, NgZone } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'enterprise' | 'transporter';
  company?: string;

  /** Enterprise or transporter id for API payloads (distinct from user id). */
  companyId?: string | number;

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

    companyId?: string | number;

    avatar: string;
  };
}

const TOKEN_KEY = 'eco_token';
const USER_KEY = 'eco_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly userSubject = new BehaviorSubject<User | null>(this.loadUser());
  readonly user$ = this.userSubject.asObservable();


  private focusSyncHandle: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {
    if (typeof window !== 'undefined') {
      /*
       * Même navigateur = un seul localStorage pour tous les onglets.
       * Un 2ᵉ login écrase eco_token : les appels API utilisent déjà ce token (intercepteur),
       * mais user$ restait sur l’ancien compte → nom affiché ≠ auteur réel du commentaire.
       */
      window.addEventListener('storage', (e: StorageEvent) => {
        if (
          e.key !== TOKEN_KEY &&
          e.key !== USER_KEY &&
          e.key !== null
        ) {
          return;
        }
        this.ngZone.run(() => this.applySessionFromBrowserStorage());
      });
      window.addEventListener('focus', () => this.scheduleApplySessionFromStorage());
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.scheduleApplySessionFromStorage();
        }
      });
    }
  }

  private scheduleApplySessionFromStorage(): void {
    if (this.focusSyncHandle) clearTimeout(this.focusSyncHandle);
    this.focusSyncHandle = setTimeout(() => {
      this.focusSyncHandle = null;
      this.ngZone.run(() => this.applySessionFromBrowserStorage());
    }, 80);
  }

  /** Réaligne user$ sur eco_user / eco_token (autre onglet ou retour sur la fenêtre). */
  private applySessionFromBrowserStorage(): void {
    const next = this.loadUser();
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      if (this.userSubject.value !== null) this.userSubject.next(null);
      return;
    }
    const prev = this.userSubject.value;
    if (
      prev?.id === next?.id &&
      prev?.email === next?.email &&
      prev?.role === next?.role &&
      prev?.companyId === next?.companyId
    ) {
      return;
    }
    this.userSubject.next(next);
  }


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


  /**
   * Enterprise or transporter id used by listings, group purchases, etc.
   * Missing after an old login: user must sign in again.
   */
  getCompanyProfileId(): number | null {
    const u = this.currentUser;
    if (!u) return null;
    const raw = u.companyId;
    if (raw === undefined || raw === null || raw === '') return null;
    const n = typeof raw === 'number' ? raw : parseInt(String(raw), 10);
    return Number.isFinite(n) ? n : null;
  }

  /** Rafraîchit eco_user (dont companyId) depuis le backend ; utile après mise à jour de l’API sans nouveau login. */
  refreshProfileFromApi(): Observable<User | null> {
    return this.http.get<JwtResponse['user']>(`${this.apiUrl}/auth/me`).pipe(
      tap((dto) => {
        const prev = this.currentUser;
        const u: User = {
          id: dto.id,
          name: dto.name,
          email: dto.email,
          role: dto.role as User['role'],
          company: dto.company,
          companyId: dto.companyId,
          avatar: dto.avatar
        };
        localStorage.setItem(USER_KEY, JSON.stringify(u));
        this.userSubject.next(u);
      }),
      map(() => this.currentUser)
    );
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

      companyId: u.companyId,

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
