import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Notification,
  NotificationService,
} from '../../services/notification/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  imports: [CommonModule],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  private subscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService.notification$.subscribe(
      (notification) => {
        this.notification = notification;
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  dismiss(): void {
    this.notificationService.clear();
  }

  getIconClass(): string {
    if (!this.notification) return '';

    switch (this.notification.type) {
      case 'error':
        return 'bi bi-x-circle-fill';
      case 'success':
        return 'bi bi-check-circle-fill';
      case 'warning':
        return 'bi bi-exclamation-triangle-fill';
      case 'info':
        return 'bi bi-info-circle-fill';
      default:
        return '';
    }
  }

  getAlertClass(): string {
    if (!this.notification) return '';

    switch (this.notification.type) {
      case 'error':
        return 'alert-danger';
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return '';
    }
  }
}
