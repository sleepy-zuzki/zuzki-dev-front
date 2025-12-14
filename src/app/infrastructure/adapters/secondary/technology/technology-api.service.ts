import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { TechnologyResponseDto } from '@app/application';
import { ApiConfig } from '../../../config/api.config';
import { CreateTechnologyRequest, UpdateTechnologyRequest } from '@core/domain';

/**
 * Servicio sin estado para interactuar con la API de Tecnologías.
 * Su única responsabilidad es realizar las llamadas HTTP y devolver los Observables.
 */
@Injectable({
  providedIn: 'root'
})
export class TechnologyApiService {

  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    this.baseUrl = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.base);
  }

  getTechnologies(): Observable<TechnologyResponseDto[]> {
    return this.http.get<TechnologyResponseDto[]>(this.baseUrl).pipe(
      catchError(err => {
        console.error('Error fetching technologies:', err);
        return throwError(() => new Error('No se pudieron cargar las tecnologías.'));
      })
    );
  }

  getTechnologyBySlug(slug: string): Observable<TechnologyResponseDto> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.bySlug(slug));
    return this.http.get<TechnologyResponseDto>(url).pipe(
      catchError(err => {
        console.error(`Error fetching technology with slug ${slug}:`, err);
        return throwError(() => new Error(`No se pudo cargar la tecnología ${slug}.`));
      })
    );
  }

  createTechnology(request: CreateTechnologyRequest): Observable<TechnologyResponseDto> {
    return this.http.post<TechnologyResponseDto>(this.baseUrl, request).pipe(
      catchError(err => {
        console.error('Error creating technology:', err);
        return throwError(() => new Error('No se pudo crear la tecnología.'));
      })
    );
  }

  updateTechnology(id: number, request: UpdateTechnologyRequest): Observable<TechnologyResponseDto> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.byId(id));
    return this.http.patch<TechnologyResponseDto>(url, request).pipe(
      catchError(err => {
        console.error(`Error updating technology ${id}:`, err);
        return throwError(() => new Error('No se pudo actualizar la tecnología.'));
      })
    );
  }

  deleteTechnology(id: number): Observable<{ success: boolean }> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.byId(id));
    return this.http.delete<{ success: boolean }>(url).pipe(
      catchError(err => {
        console.error(`Error deleting technology ${id}:`, err);
        return throwError(() => new Error('No se pudo eliminar la tecnología.'));
      })
    );
  }
}
