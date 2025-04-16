import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { AuthService } from '../auth/auth.service';
import { ApiResponse } from '../../models/api-response.model';

export interface ErrorDetails {
  code: string;
  message: string;
  status?: number;
  details?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorMessages: { [key: string]: string } = {
    AUTH_001: 'Email or password is incorrect',
    AUTH_002: 'Account not found',
    AUTH_003: 'Session expired',
    AUTH_004: 'Unauthorized access',
    API_001: 'Communication error with the server',
    API_002: 'Service temporarily unavailable',
    VALIDATION_001: 'Invalid data',
    VALIDATION_002: 'Incorrect data format',
    UNKNOWN: 'An unexpected error has occurred',
  };

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  handleError(error: any): ErrorDetails {
    const errorDetails = this.processError(error);
    this.notificationService.showError(errorDetails.message);
    return errorDetails;
  }

  handleSessionExpired(): void {
    this.authService.logout();
    this.notificationService.showError(
      'Your session has expired. Please log in again.',
      'Session Expired',
      60
    );
  }

  private processError(error: any): ErrorDetails {
    if (error instanceof HttpErrorResponse) {
      return this.handleHttpError(error);
    } else if (error.error && error.error.code) {
      return this.handleApiError(error);
    } else {
      return this.handleUnknownError(error);
    }
  }

  handleApiResponse(response: ApiResponse): void {
    if (response.status === 'success') {
      if (response.message) {
        this.notificationService.showSuccess(response.message);
      }
    } else {
      if (response.message) {
        this.notificationService.showError(response.message);
      } else {
        this.notificationService.showError('Unknow error has occurred');
      }
    }
  }

  private handleHttpError(error: HttpErrorResponse): ErrorDetails {
    const errorDetails: ErrorDetails = {
      code: `HTTP_${error.status}`,
      message: this.getErrorMessage(`HTTP_${error.status}`),
      status: error.status,
      details: error.error,
    };

    switch (error.status) {
      case 401:
        errorDetails.code = 'AUTH_003';
        errorDetails.message = this.getErrorMessage('AUTH_003');
        break;
      case 403:
        errorDetails.code = 'AUTH_004';
        errorDetails.message = this.getErrorMessage('AUTH_004');
        break;
      case 404:
        errorDetails.code = 'API_001';
        errorDetails.message = this.getErrorMessage('API_001');
        break;
      case 500:
        errorDetails.code = 'API_002';
        errorDetails.message = this.getErrorMessage('API_002');
        break;
      default:
        errorDetails.code = 'UNKNOWN';
        errorDetails.message = this.getErrorMessage('UNKNOWN');
        break;
    }

    return errorDetails;
  }

  private handleApiError(error: any): ErrorDetails {
    return {
      code: error.error.code,
      message: this.getErrorMessage(error.error.code) || error.error.message,
      details: error.error.details,
    };
  }

  private handleUnknownError(error: any): ErrorDetails {
    console.error('Unknown error:', error);
    return {
      code: 'UNKNOWN',
      message: this.getErrorMessage('UNKNOWN'),
      details: error,
    };
  }

  private getErrorMessage(code: string): string {
    return this.errorMessages[code] || this.errorMessages['UNKNOWN'];
  }

  addErrorMessage(code: string, message: string): void {
    this.errorMessages[code] = message;
  }
}
