import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'eco_token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    // ✅ IGNORER tous les appels API de gestion livraison
    if (req.url.includes('/api/delivery-orders') || 
        req.url.includes('/api/shipments') ||
        req.url.includes('/api/dashboard')) {
      console.log('[JwtInterceptor] Ignoré - API Gestion Livraison');
      return next.handle(req);
    }
    
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('[JwtInterceptor] Token trouvé:', !!token);
    console.log('[JwtInterceptor] URL:', req.url);
    
    if (!token) {
      console.log('[JwtInterceptor] Pas de token, requête non modifiée');
      return next.handle(req);
    }
    
    console.log('[JwtInterceptor] Ajout du token Bearer');
    const authReq = req.clone({
      setHeaders: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(authReq);
  }
}