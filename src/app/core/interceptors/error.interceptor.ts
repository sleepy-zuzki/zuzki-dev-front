import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '@core/services';

/**
 * Interceptor global para capturar errores HTTP.
 * Delegamos el manejo visual y de logs al ErrorService.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejamos el error globalmente
      errorService.handleError(error);

      // Re-lanzamos el error por si el store/componente necesita hacer algo específico
      return throwError(() => error);
    })
  );
};
