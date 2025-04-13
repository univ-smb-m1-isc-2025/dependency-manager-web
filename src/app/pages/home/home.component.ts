import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <h1>Bienvenue sur Dependency Manager</h1>
      <p>Gérez vos dépendances de projet efficacement</p>
      <div class="buttons">
        <a routerLink="/login" class="button">Connexion</a>
        <a routerLink="/register" class="button">Inscription</a>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        text-align: center;
        padding: 2rem;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
        color: #666;
        margin-bottom: 2rem;
      }

      .buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }

      .button {
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        text-decoration: none;
        color: white;
        background-color: #007bff;
        transition: background-color 0.3s;
      }

      .button:hover {
        background-color: #0056b3;
      }
    `,
  ],
})
export class HomeComponent {}
