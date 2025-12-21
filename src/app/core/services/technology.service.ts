import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { Technology, CreateTechnologyDto, UpdateTechnologyDto } from '@core/interfaces/technology.interface';
import { ApiConfig } from '@core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    this.baseUrl = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.base);
  }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.baseUrl).pipe(
      catchError(err => {
        console.error('Error fetching technologies:', err);
        return throwError(() => new Error('No se pudieron cargar las tecnologías.'));
      })
    );
  }

  getTechnologyBySlug(slug: string): Observable<Technology> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.bySlug(slug));
    return this.http.get<Technology>(url).pipe(
      catchError(err => {
        console.error(`Error fetching technology with slug ${slug}:`, err);
        return throwError(() => new Error(`No se pudo cargar la tecnología ${slug}.`));
      })
    );
  }

  createTechnology(request: CreateTechnologyDto): Observable<Technology> {
    return this.http.post<Technology>(this.baseUrl, request).pipe(
      catchError(err => {
        console.error('Error creating technology:', err);
        return throwError(() => new Error('No se pudo crear la tecnología.'));
      })
    );
  }

  updateTechnology(id: string, request: UpdateTechnologyDto): Observable<Technology> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.byId(id));
    return this.http.patch<Technology>(url, request).pipe(
      catchError(err => {
        console.error(`Error updating technology ${id}:`, err);
        return throwError(() => new Error('No se pudo actualizar la tecnología.'));
      })
    );
  }

  deleteTechnology(id: string): Observable<{ success: boolean }> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.byId(id));
    return this.http.delete<{ success: boolean }>(url).pipe(
      catchError(err => {
        console.error(`Error deleting technology ${id}:`, err);
        return throwError(() => new Error('No se pudo eliminar la tecnología.'));
      })
    );
  }
}