import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../http/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpStatus} from '../enums/http-status.enum';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        console.log(error);
        if (error.error instanceof ErrorEvent) {
          /** Client-side error */
          errorMessage = `Error: ${error.error.message}`;
          window.alert(errorMessage);
        } else {
          /** Server-side error */

          /**
           *  Auto logout if 401 Unauthorized response returned from API
           */
          if ([HttpStatus.UNAUTHORIZED].indexOf(error.status) !== -1) {
            this.authService.logout();
            location.reload();
          }
          if ([HttpStatus.FORBIDDEN].indexOf(error.status) !== -1) {
            this.router.navigateByUrl('403');
          }
          if ([HttpStatus.BAD_REQUEST, HttpStatus.NOT_FOUND].indexOf(error.status) !== -1) {
            this.router.navigateByUrl('404');
          }
          if ([HttpStatus.INTERNAL_SERVER_ERROR].indexOf(error.status) !== -1) {
            this.router.navigateByUrl('500');
          }
          console.log(`Error Code: ${error.status}\nMessage: ${error.message}`);
        }
        return throwError(errorMessage);
      })
    );
  }
}
