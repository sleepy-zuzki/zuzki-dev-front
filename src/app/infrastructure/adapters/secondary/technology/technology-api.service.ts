import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateTechnologyDto, UpdateTechnologyDto, TechnologyResponseDto } from '@app/application';
import { ApiConfig } from '../../../config/api.config';

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

  /**
   * Obtiene todas las tecnologías desde la API.
   * @returns Un Observable con un array de DTOs de tecnología.
   */
  getTechnologies(): Observable<TechnologyResponseDto[]> {
    return this.http.get<TechnologyResponseDto[]>(this.baseUrl);
  }

  /**
   * Obtiene una tecnología por su slug.
   * @param slug - El slug de la tecnología.
   * @returns Un Observable con el DTO de la tecnología.
   */
  getTechnologyBySlug(slug: string): Observable<TechnologyResponseDto> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.bySlug(slug));
    return this.http.get<TechnologyResponseDto>(url);
  }

  /**
   * Crea una nueva tecnología.
   * @param createDto - El DTO para crear la tecnología.
   * @returns Un Observable con el DTO de la tecnología creada.
   */
  createTechnology(createDto: CreateTechnologyDto): Observable<TechnologyResponseDto> {
    return this.http.post<TechnologyResponseDto>(this.baseUrl, createDto);
  }

  /**
   * Actualiza una tecnología existente.
   * @param id - El ID de la tecnología a actualizar.
   * @param updateDto - El DTO con los datos para actualizar.
   * @returns Un Observable con el DTO de la tecnología actualizada.
   */
  updateTechnology(id: number, updateDto: UpdateTechnologyDto): Observable<TechnologyResponseDto> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.byId(id));
    return this.http.patch<TechnologyResponseDto>(url, updateDto);
  }

  /**
   * Elimina una tecnología.
   * @param id - El ID de la tecnología a eliminar.
   * @returns Un Observable que notifica la finalización.
   */
  deleteTechnology(id: number): Observable<{ success: boolean }> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.byId(id));
    return this.http.delete<{ success: boolean }>(url);
  }
}
