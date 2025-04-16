import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { ApiResponse } from '../../models/api-response.model';
import { TokenService } from '../token/token.service';
import { NotificationService } from '../notification/notification.service';

interface RegisterPayload {
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenCheckerInterval: any;
  // Use BehaviorSubject to store and emit authentication state
  private readonly currentUserSubject = new BehaviorSubject<Account | null>(
    null
  );
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly currentTokenSubject = new BehaviorSubject<string | null>(
    null
  );
  public currentToken$ = this.currentTokenSubject.asObservable();

  // Define backend paths
  private readonly loginPath = '/auth/login';
  private readonly registerPath = '/auth/register';
  private readonly mePath = '/accounts/me';
  private readonly logoutPath = '/auth/logout';

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly tokenService: TokenService,
    private readonly notificationService: NotificationService
  ) {
    // Initialize only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserSubject.next(this.getInitialUser());
      this.currentTokenSubject.next(this.getInitialToken());
    }
  }

  private getInitialUser(): Account | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      try {
        return user && user !== 'undefined' ? JSON.parse(user) : null;
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        return null;
      }
    }
    return null;
  }

  private getInitialToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.tokenService.getToken();
    }
    return null;
  }

  public get currentUserValue(): Account | null {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): string | null {
    return this.currentTokenSubject.value;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentTokenValue;
  }

  login(email: string, password: string): Observable<ApiResponse> {
    const response = this.apiService.post(this.loginPath, {
      email,
      password,
    });

    response.subscribe((response) => {
      if (response.status === 'success') {
        this.setSession(response.data.token, response.data.account);
      }
    });
    return response;
  }

  register(payload: RegisterPayload): Observable<ApiResponse> {
    const response = this.apiService.post(this.registerPath, payload);

    response.subscribe((response) => {
      if (response.status === 'success') {
        this.setSession(response.data.token, response.data.account);
      }
    });
    return response;
  }

  loadCurrentUser(): Observable<ApiResponse> {
    return this.apiService.get(this.mePath);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tokenService.removeToken();
      localStorage.removeItem('currentUser');
    }
    this.currentTokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setSession(token: string, user: Account): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tokenService.setToken(token);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentTokenSubject.next(token);
    this.currentUserSubject.next(user);
  }

  private setUser(user: Account): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  setToken(token: string): void {
    this.tokenService.setToken(token);
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }

  removeToken(): void {
    this.tokenService.removeToken();
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }
}
