import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../http/authentication.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        console.log(error);
        if (error.error instanceof ErrorEvent) {
          /** Client-side error */
          errorMessage = `Error: ${error.error.message}`;
        } else {
          /** Server-side error */

          /**
           *  Auto logout if 401 Unauthorized response returned from API
           */
          if ([401].indexOf(error.status) !== -1) {
            this.authService.logout();
            location.reload();
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }
        if (errorMessage) {
          window.alert(errorMessage);
        }
        return throwError(errorMessage);
      })
    );
  }
}
