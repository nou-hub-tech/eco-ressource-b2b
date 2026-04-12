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
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('[JwtInterceptor] Token trouvé:', !!token);
    console.log('[JwtInterceptor] URL:', req.url);
    console.log('[JwtInterceptor] Headers avant:', req.headers.keys());
    
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
    console.log('[JwtInterceptor] Headers après:', authReq.headers.get('Authorization'));
    return next.handle(authReq);
  }
}
