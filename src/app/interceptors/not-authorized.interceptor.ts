import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


@Injectable()
export class NotAuthorizedInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService, private cookieService: CookieService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const re = '/login';
    if (request.url.search(re) === -1) {
      return next.handle(request).pipe(
        catchError(err => {
          if ([401].indexOf(err.status) !== -1) {

            this.authSvc._getRefreshToken()
              .pipe(catchError(lerr => {
                console.log(lerr);
                this.authSvc._logout().subscribe(suc => {
                  this.authSvc._uiLogout();
                });
                return throwError(lerr);
              })
              )
              .subscribe(t => {
                if (t === 'successful') {
                  console.log(t);
                  const details: string = this.cookieService.get('is-logged-in');
                  const p = JSON.parse(details);
                  localStorage.setItem('dn', p.display_name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' '));
                  localStorage.setItem('role', p.role.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' '));
                }
              });
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
