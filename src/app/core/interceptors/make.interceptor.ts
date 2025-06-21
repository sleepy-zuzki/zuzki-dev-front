import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_TYPE, ApiType } from '../tokens/api-type.token';

/**
 * Interceptor funcional para modificar las peticiones HTTP salientes hacia la API de Make.com.
 * - Añade la URL base de la API de Make.com.
 * - Establece las cabeceras 'Accept' y 'Content-Type' a 'application/json'.
 * - Solo se aplica a las solicitudes con el contexto ApiType.MAKE.
 *
 * @param req La solicitud HTTP original.
 * @param next El siguiente manejador en la cadena de interceptores.
 * @returns Un Observable del evento HTTP.
 */
export const MakeInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Obtener el tipo de API del contexto de la solicitud
  const apiType = req.context.get(API_TYPE);

  // Solo procesar si el tipo de API es Make y la URL no es absoluta
  if (apiType === ApiType.MAKE && !req.url.startsWith('http') && !req.url.startsWith('https')) {
    // Cabeceras estándar para las peticiones a la API de Make.com
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    // Construir la URL completa anteponiendo la URL base de Make desde el environment
    const url: string = `${environment.makeApiUrl}/${req.url}`;

    // Clonar la solicitud original con la nueva URL y cabeceras
    const newRequest: HttpRequest<unknown> = req.clone({ url, headers });

    // Pasar la nueva solicitud al siguiente manejador
    return next(newRequest);
  }

  return next(req);
};
