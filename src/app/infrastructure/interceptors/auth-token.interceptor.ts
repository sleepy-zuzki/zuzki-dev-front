import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo aplicamos a POST, PUT y DELETE
  const method = (req.method || '').toUpperCase();
  if (method !== 'POST' && method !== 'PUT' && method !== 'DELETE') {
    return next(req);
  }

  // Evitar acceso a localStorage en SSR
  const platformId = inject(PLATFORM_ID);
  const browser = isPlatformBrowser(platformId);

  let accessToken: string | null = null;
  if (browser) {
    try {
      accessToken = window.localStorage.getItem('access_token');
    } catch {
      accessToken = null;
    }
  }

  // Si no hay token o ya existe Authorization, no modificamos la request
  if (!accessToken || req.headers.has('Authorization')) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return next(authReq);
};
