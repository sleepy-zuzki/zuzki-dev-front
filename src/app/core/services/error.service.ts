import { Injectable, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private toast = inject(HotToastService);

  /**
   * Maneja errores de la API o de la aplicación.
   * @param error Error a procesar.
   * @param customMessage Mensaje opcional para el usuario.
   */
  handleError(error: any, customMessage?: string): void {
    let message = customMessage || 'Ha ocurrido un error inesperado';

    if (error instanceof HttpErrorResponse) {
      // Errores de servidor (API)
      if (error.status === 0) {
        message = 'No se pudo conectar con el servidor. Revisa tu conexión.';
      } else if (error.status === 401) {
        message = 'Sesión expirada o no autorizada.';
      } else if (error.status === 403) {
        message = 'No tienes permisos para realizar esta acción.';
      } else if (error.status === 404) {
        message = 'El recurso solicitado no existe.';
      } else if (error.error && error.error.message) {
        // Mensaje devuelto por el backend
        message = error.error.message;
      }
    } else if (error instanceof Error) {
      // Errores de cliente
      message = error.message;
    }

    console.error('[ErrorService]:', error);
    this.toast.error(message, {
      id: 'global-error-toast', // Evita múltiples toasts idénticos al mismo tiempo
    });
  }
}
