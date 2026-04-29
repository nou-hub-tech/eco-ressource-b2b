import { Injectable, ApplicationRef } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ChangeDetectionInterceptor implements HttpInterceptor {
  constructor(private appRef: ApplicationRef) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      finalize(() => {
        this.appRef.tick();
      })
    );
  }
}
