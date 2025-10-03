import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthHttpAdapter } from '@infrastructure/adapters/secondary/auth/auth-http.adapter';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthHttpAdapter);
  const router = inject(Router);

  // Permite el acceso si está autenticado; si no, redirige a /login
  return auth.isAuthenticated() ? true : router.parseUrl('/login');
};
