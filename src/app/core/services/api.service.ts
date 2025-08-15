import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_TYPE, ApiType } from '../tokens/api-type.token';
import { ApiBody } from '@core/interfaces/api-body.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Realiza una petición GET a la API del Worker
   * @param endpoint Ruta del endpoint sin la URL base
   * @returns Observable con la respuesta
   */
  public getFromWorker<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(endpoint, {
      context: new HttpContext().set(API_TYPE, ApiType.WORKER)
    });
  }

  /**
   * Realiza una petición POST a la API del Worker
   * @param endpoint Ruta del endpoint sin la URL base
   * @param body Cuerpo de la petición
   * @returns Observable con la respuesta
   */
  public postToWorker<T>(endpoint: string, body: ApiBody): Observable<T> {
    return this.http.post<T>(endpoint, body, {
      context: new HttpContext().set(API_TYPE, ApiType.WORKER)
    });
  }

  /**
   * Realiza una petición GET a la API de Make.com
   * @param endpoint Ruta del endpoint sin la URL base
   * @returns Observable con la respuesta
   */
  public getFromMake<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(endpoint, {
      context: new HttpContext().set(API_TYPE, ApiType.MAKE)
    });
  }

  /**
   * Realiza una petición POST a la API de Make.com
   * @param endpoint Ruta del endpoint sin la URL base
   * @param body Cuerpo de la petición
   * @returns Observable con la respuesta
   */
  public postToMake<T>(endpoint: string, body: ApiBody): Observable<T> {
    return this.http.post<T>(endpoint, body, {
      context: new HttpContext().set(API_TYPE, ApiType.MAKE)
    });
  }
}
