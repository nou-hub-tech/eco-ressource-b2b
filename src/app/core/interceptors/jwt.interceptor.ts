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

    // Ne pas forcer application/json sur multipart (ex. POST listing-images avec FormData) :
    // le navigateur doit définir multipart/form-data; boundary=...
    const setHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`
    };
    if (!(req.body instanceof FormData)) {
      setHeaders['Content-Type'] = 'application/json';
    }

    const authReq = req.clone({ setHeaders });
    return next.handle(authReq);
  }
}
