import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  // Create loop when init to regulary check token validity

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    const tokenExists = !!token;
    const tokenNotExpired = !this.isTokenExpired(token!);

    return tokenExists && tokenNotExpired;
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp < Date.now() / 1000;
  }
}
