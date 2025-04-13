import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Account } from '../models/account.model'; // Assuming you have or will create this model

// Define interfaces for login/register payloads and responses if known
// Example interfaces (adjust based on your backend)
interface AuthResponse {
  token: string; // Example: Assuming JWT
  user: Account; // Example: Backend might return user info
}

interface RegisterPayload {
  email: string;
  password?: string; // Optional if handled differently
  // Add other fields if needed (e.g., name)
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Use BehaviorSubject to store and emit authentication state
  private currentUserSubject = new BehaviorSubject<Account | null>(
    this.getInitialUser()
  );
  public currentUser$ = this.currentUserSubject.asObservable();
  private currentTokenSubject = new BehaviorSubject<string | null>(
    this.getInitialToken()
  );
  public currentToken$ = this.currentTokenSubject.asObservable();

  // Define backend paths (UPDATE THESE WITH ACTUAL PATHS)
  private loginPath = '/api/auth/login'; // <<< Placeholder: Update required
  private registerPath = '/api/auth/register'; // <<< Placeholder: Update required
  private mePath = '/accounts/me'; // From AccountController

  constructor(private apiService: ApiService, private router: Router) {}

  private getInitialUser(): Account | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  private getInitialToken(): string | null {
    return localStorage.getItem('authToken');
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

  // --- Placeholder Login Method ---
  // Update path and response handling based on actual backend
  login(email: string, password: string): Observable<AuthResponse> {
    // Assuming AuthResponse includes token
    return this.apiService
      .post<AuthResponse>(this.loginPath, { email, password })
      .pipe(
        tap((response) => {
          // Assuming response has a token and user object
          if (response && response.token && response.user) {
            this.setSession(response.token, response.user);
          } else {
            // Handle cases where backend response is different
            console.error('Login response missing token or user data');
            throw new Error('Invalid login response from server.');
          }
        })
      );
  }

  // --- Placeholder Register Method ---
  // Update path and payload based on actual backend
  register(payload: RegisterPayload): Observable<any> {
    // Adjust return type as needed
    // Backend might just return success status or the new user object
    return this.apiService.post<any>(this.registerPath, payload);
    // Add .pipe(tap(...)) if you need to handle the response (e.g., auto-login)
  }

  // --- Fetch Current User Info ---
  // Uses the /accounts/me endpoint
  loadCurrentUser(): Observable<Account> {
    return this.apiService.get<Account>(this.mePath).pipe(
      tap((user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        } else {
          // User might not be found if token is valid but user deleted?
          this.logout();
        }
      })
    );
  }

  logout(): void {
    // Remove user from local storage and redirect to login page
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentTokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setSession(token: string, user: Account): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentTokenSubject.next(token);
    this.currentUserSubject.next(user);
  }

  // Add method to get token for HttpInterceptor if using JWT
  getToken(): string | null {
    return this.currentTokenValue;
  }
}
