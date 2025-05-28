import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor funcional para modificar las peticiones HTTP salientes.
 * - Añade la URL base del worker de GitHub.
 * - Establece las cabeceras 'Accept' y 'Content-Type' a 'application/json'.
 *
 * @param req La solicitud HTTP original.
 * @param next El siguiente manejador en la cadena de interceptores.
 * @returns Un Observable del evento HTTP.
 */
export const GithubDataInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  if (!req.url.startsWith('http') || !req.url.startsWith('https')) {
    // Verificar si la URL comienza con 'data/'

    // Cabeceras estándar para las peticiones a la API
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    // Construir la URL completa anteponiendo la URL base del worker
    const url: string = `https://github-worker.zuzki.dev/${req.url}`;

    // Clonar la solicitud original con la nueva URL y cabeceras
    const newRequest: HttpRequest<unknown> = req.clone({ url, headers });

    // Pasar la nueva solicitud al siguiente manejador
    return next(newRequest);
  }

  return next(req);
};
