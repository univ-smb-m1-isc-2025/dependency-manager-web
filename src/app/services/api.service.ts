import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Define your backend base URL here
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private formatErrors(error: HttpErrorResponse): Observable<never> {
    console.error('ApiService Error:', error);

    let errorMessage = 'An unknown error occurred!';

    if (error.status === 0) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage =
        'Could not connect to the server. Please ensure it is running and accessible.';
      console.error('Network error:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      const backendMessage = error.error?.message || error.message;
      errorMessage = `Server error (Code: ${error.status}): ${backendMessage}`;
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }

  private extractData<T>(res: ApiResponse<T>): T {
    if (res.status === 'success') {
      return res.data;
    } else {
      // You might want to handle backend-reported errors differently
      // For now, we'll treat non-'success' status as an error
      console.error('API Error Status:', res.status, 'Message:', res.message);
      throw new Error(`API Error: ${res.message || 'Unknown error'}`);
    }
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http
      .get<ApiResponse<T>>(`${this.baseUrl}${path}`, { params })
      .pipe(map(this.extractData), catchError(this.formatErrors));
  }

  post<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .post<ApiResponse<T>>(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(map(this.extractData), catchError(this.formatErrors));
  }

  // Add put, delete methods similarly if needed

  put<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .put<ApiResponse<T>>(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(map(this.extractData), catchError(this.formatErrors));
  }

  delete<T>(path: string): Observable<T> {
    return this.http
      .delete<ApiResponse<T>>(`${this.baseUrl}${path}`)
      .pipe(map(this.extractData), catchError(this.formatErrors));
  }
}
