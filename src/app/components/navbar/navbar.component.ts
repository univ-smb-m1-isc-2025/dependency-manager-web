import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
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
