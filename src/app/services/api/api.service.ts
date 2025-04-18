import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { environment } from '../../../environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl =
    environment.apiUrl || 'https://api.dependency-manager.oups.net';

  constructor(
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService,
    private readonly tokenService: TokenService
  ) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
    });

    const token = this.tokenService.getToken();
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  get(endpoint: string): Observable<ApiResponse> {
    const headers = this.getHeaders();
    return this.http
      .get<ApiResponse>(`${this.baseUrl}${endpoint}`, { headers })
      .pipe(
        tap((response) => this.notificationService.handleApiResponse(response))
      );
  }

  post(endpoint: string, data: any): Observable<ApiResponse> {
    console.log(data);
    const headers = this.getHeaders();
    return this.http
      .post<ApiResponse>(`${this.baseUrl}${endpoint}`, data, { headers })
      .pipe(
        tap((response) => this.notificationService.handleApiResponse(response))
      );
  }

  put(endpoint: string, data: any): Observable<ApiResponse> {
    const headers = this.getHeaders();
    return this.http
      .put<ApiResponse>(`${this.baseUrl}${endpoint}`, data, { headers })
      .pipe(
        tap((response) => this.notificationService.handleApiResponse(response))
      );
  }

  delete(endpoint: string): Observable<ApiResponse> {
    const headers = this.getHeaders();
    return this.http
      .delete<ApiResponse>(`${this.baseUrl}${endpoint}`, { headers })
      .pipe(
        tap((response) => this.notificationService.handleApiResponse(response))
      );
  }
}
