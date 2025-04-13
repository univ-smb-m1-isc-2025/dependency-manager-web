import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a routerLink="/" class="navbar-item">Dependency Manager</a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a
                *ngIf="!isAuthenticated"
                routerLink="/login"
                class="button is-primary"
              >
                <strong>Connexion</strong>
              </a>
              <a
                *ngIf="!isAuthenticated"
                routerLink="/register"
                class="button is-light"
              >
                Inscription
              </a>
              <button
                *ngIf="isAuthenticated"
                (click)="logout()"
                class="button is-light"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        background-color: #f8f9fa;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .navbar-brand {
        display: flex;
        align-items: center;
      }

      .navbar-item {
        color: #333;
        text-decoration: none;
        padding: 0.5rem 1rem;
      }

      .navbar-menu {
        display: flex;
        justify-content: flex-end;
      }

      .buttons {
        display: flex;
        gap: 0.5rem;
      }

      .button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        text-decoration: none;
        font-size: 1rem;
      }

      .button.is-primary {
        background-color: #007bff;
        color: white;
      }

      .button.is-light {
        background-color: #f8f9fa;
        color: #333;
        border: 1px solid #ddd;
      }

      .button:hover {
        opacity: 0.9;
      }
    `,
  ],
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
