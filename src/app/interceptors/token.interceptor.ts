import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { ErrorService } from '../services/error/error.service';
import { TokenService } from '../services/token/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  const tokenService = inject(TokenService);

  if (tokenService.hasToken()) {
    if (!tokenService.isTokenValid()) {
      errorService.handleSessionExpired();
      return EMPTY;
    }
  }

  return next(req);
};
