import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          // CORS error or network error
          console.error('CORS or Network Error:', error);
          return throwError(
            () =>
              new Error(
                'Unable to connect to the server. Please check your connection and try again.'
              )
          );
        }

        if (error.status === 401) {
          // Unauthorized - redirect to login
          this.router.navigate(['/login']);
          return throwError(
            () => new Error('Your session has expired. Please log in again.')
          );
        }

        if (error.status === 403) {
          // Forbidden
          return throwError(
            () =>
              new Error('You do not have permission to perform this action.')
          );
        }

        // Handle other errors
        const errorMessage =
          error.error?.message ||
          error.message ||
          'An unexpected error occurred.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
