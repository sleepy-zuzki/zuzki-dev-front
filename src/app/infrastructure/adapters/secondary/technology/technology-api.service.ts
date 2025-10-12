import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    this.baseUrl = this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.base);
  }

  getTechnologies(): Observable<TechnologyResponseDto[]> {
    return this.http.get<TechnologyResponseDto[]>(this.baseUrl);
  }

  getTechnologyBySlug(slug: string): Observable<TechnologyResponseDto> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.bySlug(slug));
    return this.http.get<TechnologyResponseDto>(url);
  }

  createTechnology(request: CreateTechnologyRequest): Observable<TechnologyResponseDto> {
    return this.http.post<TechnologyResponseDto>(this.baseUrl, request);
  }

  updateTechnology(id: number, request: UpdateTechnologyRequest): Observable<TechnologyResponseDto> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.byId(id));
    return this.http.patch<TechnologyResponseDto>(url, request);
  }

  deleteTechnology(id: number): Observable<{ success: boolean }> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.byId(id));
    return this.http.delete<{ success: boolean }>(url);
  }
}
