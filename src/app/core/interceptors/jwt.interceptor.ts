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

    // Ne pas forcer l'Authorization sur l'auth (login/register).
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
      return next.handle(req);
    }

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return next.handle(req);
    }

    // Si la requête envoie un FormData (upload fichier),
    // NE PAS forcer Content-Type — le navigateur le gère automatiquement
    // avec le bon boundary multipart/form-data.
    const isFormData = req.body instanceof FormData;

    const authReq = req.clone({
      setHeaders: isFormData
        ? { Authorization: `Bearer ${token}` }
        : { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });

    return next.handle(authReq);
  }
}
