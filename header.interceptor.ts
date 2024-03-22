import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AUTH_SERVICE } from '../views/auth/types';
import { AuthService } from '../views/auth/services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  public authToken!: string;
  constructor(@Inject(AUTH_SERVICE) private authService: AuthService) {
    this.authService.signInState$
      .pipe(
        tap((state) => {
          if (state && state?.authToken) {
            this.authToken = state.authToken;
          }
        })
      )
      .subscribe();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (/10000/.test(request.url) || /third-parties/.test(request.url)) {
      const headers = new HttpHeaders().set(
        'authorization',
        request.headers.get('authorization') ?? `Bearer ${this.authToken}` ?? ''
      );

      request = request.clone({ headers });
    }
    if (/auth/.test(request.url)) {
      const headers = new HttpHeaders()
        .set('x-client-id', environment.auth.clientId)
        .set('x-client-secret', environment.auth.clientSecret)
        .set(
          'authorization',
          request.headers.get('authorization') ?? `Bearer ${this.authToken}`
        );

      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}

export const HeaderInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HeaderInterceptor,
  multi: true,
};
