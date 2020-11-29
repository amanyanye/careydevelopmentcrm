import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { RouteMessageService } from '../ui/route-message/route-message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router,
    private routeMessageService: RouteMessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let handled: boolean = false;

    return next.handle(request)
    .pipe(
      retry(1),
      catchError((returnedError) => {
        let errorMessage = '';
        if (returnedError.error instanceof ErrorEvent) {
          errorMessage = `Error: ${returnedError.error.message}`;
        } else {
          errorMessage = `Error Status: ${returnedError.status}: ${returnedError.error.error} - ${returnedError.error.message}`;
          handled = this.handleServerSideError(returnedError);
        }

        console.error(errorMessage);
        if (!handled) {
          return throwError(errorMessage);
        } else {
          return of(returnedError);
        }
      })
    )
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled: boolean = false;

    switch (error.status) {
      case 401:
        this.routeMessageService.message = "Please login again.";
        this.authenticationService.logout();
        handled = true;
        break;
      case 403:
        this.routeMessageService.message = "Please login again.";
        this.authenticationService.logout();
        handled = true;
        break;
    }

    return handled;
  }
}
