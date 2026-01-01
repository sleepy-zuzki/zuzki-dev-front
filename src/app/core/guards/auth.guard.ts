import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  // Asegura restauración desde storage y valida expiración del token
  const hasSession = auth.ensureSession();

  return hasSession ? true : router.parseUrl('/login');
};
