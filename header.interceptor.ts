import { Inject, Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { AUTH_SERVICE } from "../auth/types";
import { AuthService } from "../auth/services/auth.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  public cardRef!: string;
  constructor(@Inject(AUTH_SERVICE) private authService: AuthService) {
    this.authService.signInState$
      .pipe(
        tap((state) => {
          if (state && state?.card?.cardRef) {
            this.cardRef = state?.card?.cardRef;
          }
        })
      )
      .subscribe();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders()
      .set(
        "x-client-id",
        this.authService.clientId ?? environment.auth.clientId
      )
      .set(
        "x-client-secret",
        this.authService.clientSecret ?? environment.auth.clientSecret
      )
      .set("x-card-ref", this.authService.isLoggedIn() ? this.cardRef : "");

    request = request.clone({ headers });
    return next.handle(request);
  }
}

export const HeaderInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HeaderInterceptor,
  multi: true,
};
