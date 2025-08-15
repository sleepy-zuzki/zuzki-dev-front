import { HttpErrorResponse } from '@angular/common/http';

/**
 * Error genérico con mensaje opcional.
 */
export interface SimpleError {
  message?: string;
}

/**
 * Tipo de error aceptado por los servicios.
 * Incluye errores HTTP de Angular, errores estándar y un error simple con mensaje.
 */
export type ApiError = HttpErrorResponse | Error | SimpleError;
