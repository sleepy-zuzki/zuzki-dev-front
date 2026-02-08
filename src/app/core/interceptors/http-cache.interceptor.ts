import { HttpInterceptorFn, HttpResponse, HttpContextToken } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { of, tap } from 'rxjs';
import { HttpCacheService } from '../services/http-cache.service';

export const BYPASS_CACHE = new HttpContextToken(() => false);

export const httpCacheInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const cache = inject(HttpCacheService);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    return next(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
          cache.invalidate();
        }
      })
    );
  }

  if (req.method !== 'GET' || req.context.get(BYPASS_CACHE)) {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);
  if (cachedResponse) {
    return of(cachedResponse.clone());
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.put(req.urlWithParams, event.clone());
      }
    })
  );
};