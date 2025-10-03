import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthHttpAdapter } from '@infrastructure/adapters/secondary/auth/auth-http.adapter';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthHttpAdapter);
  const router = inject(Router);

  // Asegura restauración desde storage y valida expiración del token
  const hasSession = auth.ensureSession();

  return hasSession ? true : router.parseUrl('/login');
};
