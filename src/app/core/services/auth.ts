import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'enterprise' | 'transporter';
  company?: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private userSubject = new BehaviorSubject<User | null>(this.loadUser());
  user$ = this.userSubject.asObservable();

  // Mock users for development (remove when Spring Boot is ready)
  private mockUsers: User[] = [
    { id: '1', name: 'Admin Principal', email: 'admin@eco.tn', role: 'admin', avatar: 'AP' },
    { id: '2', name: 'Slim Ben Ali', email: 'slim@entreprise.tn', role: 'enterprise', company: 'Industrie Slim SARL', avatar: 'SB' },
    { id: '3', name: 'Karim Transport', email: 'karim@transport.tn', role: 'transporter', company: 'Karim Transport', avatar: 'KT' }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  get currentUser(): User | null { return this.userSubject.value; }
private loadUser(): User | null {
  try {
    const stored = localStorage.getItem('eco_user');
    if (!stored) return null;
    const user = JSON.parse(stored);
    // Validate the stored user has required fields
    if (!user.id || !user.role || !user.email) {
      localStorage.removeItem('eco_user');
      return null;
    }
    return user;
  } catch {
    localStorage.removeItem('eco_user');
    return null;
  }
}
  // --- MOCK login (replace with real HTTP call when backend is ready) ---
  login(email: string, password: string): Observable<any> {
    const user = this.mockUsers.find(u => u.email === email);
    if (user) {
      localStorage.setItem('eco_user', JSON.stringify(user));
      this.userSubject.next(user);
      return of({ success: true, user });
    }
    return of({ success: false, message: 'Invalid credentials' });
  }

  // --- REAL login (uncomment when Spring Boot is ready) ---
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
  //     tap(res => {
  //       localStorage.setItem('eco_user', JSON.stringify(res.user));
  //       localStorage.setItem('eco_token', res.token);
  //       this.userSubject.next(res.user);
  //     })
  //   );
  // }

  register(data: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/register`, data);
    const newUser: User = { id: Date.now().toString(), name: data.name, email: data.email, role: 'enterprise', company: data.company, avatar: data.name.substring(0,2).toUpperCase() };
    localStorage.setItem('eco_user', JSON.stringify(newUser));
    this.userSubject.next(newUser);
    return of({ success: true });
  }

  logout(): void {
    localStorage.removeItem('eco_user');
    localStorage.removeItem('eco_token');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }
}