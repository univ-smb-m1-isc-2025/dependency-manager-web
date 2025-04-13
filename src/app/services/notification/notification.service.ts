import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';

export type NotificationType = 'error' | 'success' | 'warning' | 'info';

export interface Notification {
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  handleApiResponse(response: ApiResponse): void {
    if (response.status === 'success') {
      this.showSuccess(response.message);
    } else {
      this.showError(response.message);
    }
  }

  show(notification: Notification): void {
    this.notificationSubject.next(notification);

    // Auto-dismiss if duration is specified
    if (notification.duration) {
      setTimeout(() => {
        this.clear();
      }, notification.duration);
    }
  }

  showError(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'error',
      message,
      title,
      duration: duration || 5000,
    });
  }

  showSuccess(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'success',
      message,
      title,
      duration: duration || 3000,
    });
  }

  showWarning(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'warning',
      message,
      title,
      duration: duration || 4000,
    });
  }

  showInfo(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'info',
      message,
      title,
      duration: duration || 3000,
    });
  }

  clear(): void {
    this.notificationSubject.next(null);
  }
}
