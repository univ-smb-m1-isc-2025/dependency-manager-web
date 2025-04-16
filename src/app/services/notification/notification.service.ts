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
    notification.duration = (notification.duration || 5) * 1000;
    // Auto-dismiss if duration is specified
    if (notification.duration) {
      setTimeout(() => {
        this.clear();
      }, notification.duration);
    }
  }

  showError(message: string, title?: string, durationSecond?: number): void {
    this.show({
      type: 'error',
      message,
      title,
      duration: durationSecond,
    });
  }

  showSuccess(message: string, title?: string, durationSecond?: number): void {
    this.show({
      type: 'success',
      message,
      title,
      duration: durationSecond,
    });
  }

  showWarning(message: string, title?: string, durationSecond?: number): void {
    this.show({
      type: 'warning',
      message,
      title,
      duration: durationSecond,
    });
  }

  showInfo(message: string, title?: string, durationSecond?: number): void {
    this.show({
      type: 'info',
      message,
      title,
      duration: durationSecond,
    });
  }

  clear(): void {
    this.notificationSubject.next(null);
  }
}
